using System.Collections.Concurrent;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddSingleton<ComplianceRuleRegistry>();

var app = builder.Build();

app.MapOpenApi();

app.MapGet("/health", () => Results.Ok(new
{
    service = "REGULA API",
    status = "healthy",
    version = "0.1.0"
}));

app.MapGet("/api/v1/rules", (ComplianceRuleRegistry registry) =>
    Results.Ok(registry.GetAll()));

app.MapPost("/api/v1/compliance/evaluate", (ComplianceEvaluationRequest request, ComplianceRuleRegistry registry) =>
{
    var result = registry.Evaluate(request);
    return Results.Ok(result);
});

app.Run();

public sealed record ComplianceEvaluationRequest(
    string TenantId,
    string RuleCode,
    decimal? FeePercent,
    int? SettlementDays,
    string? MerchantCategory,
    string? CorrelationId);

public sealed record ComplianceEvaluationResult(
    string TenantId,
    string RuleCode,
    string Status,
    string Severity,
    string Explanation,
    string EvidenceReference,
    DateTimeOffset EvaluatedAtUtc);

public sealed record ComplianceRule(
    string Code,
    string Domain,
    string Version,
    string Description,
    string Severity,
    bool Active);

public sealed class ComplianceRuleRegistry
{
    private readonly ConcurrentDictionary<string, ComplianceRule> _rules = new(StringComparer.OrdinalIgnoreCase)
    {
        ["PAT-MDR-001"] = new("PAT-MDR-001", "PAT", "0.1", "Monitora percentual informado de MDR conforme parâmetro regulatório configurado.", "high", true),
        ["PAT-SETTLEMENT-001"] = new("PAT-SETTLEMENT-001", "PAT", "0.1", "Monitora prazo informado de liquidação conforme parâmetro regulatório configurado.", "high", true)
    };

    public IReadOnlyCollection<ComplianceRule> GetAll() => _rules.Values.OrderBy(r => r.Code).ToArray();

    public ComplianceEvaluationResult Evaluate(ComplianceEvaluationRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.TenantId))
            throw new ArgumentException("TenantId is required.");

        if (!_rules.TryGetValue(request.RuleCode, out var rule) || !rule.Active)
        {
            return Build(request, "NOT_EVALUATED", "medium", "Regra inexistente ou inativa.");
        }

        return rule.Code switch
        {
            "PAT-MDR-001" when request.FeePercent is null =>
                Build(request, "INSUFFICIENT_DATA", rule.Severity, "Percentual de MDR não informado."),

            "PAT-MDR-001" when request.FeePercent <= 3.6m =>
                Build(request, "COMPLIANT", "info", "Percentual informado está dentro do parâmetro configurado para esta versão da regra."),

            "PAT-MDR-001" =>
                Build(request, "POTENTIAL_NON_COMPLIANCE", rule.Severity, "Percentual informado excede o parâmetro configurado para esta versão da regra."),

            "PAT-SETTLEMENT-001" when request.SettlementDays is null =>
                Build(request, "INSUFFICIENT_DATA", rule.Severity, "Prazo de liquidação não informado."),

            "PAT-SETTLEMENT-001" when request.SettlementDays <= 15 =>
                Build(request, "COMPLIANT", "info", "Prazo informado está dentro do parâmetro configurado para esta versão da regra."),

            "PAT-SETTLEMENT-001" =>
                Build(request, "POTENTIAL_NON_COMPLIANCE", rule.Severity, "Prazo informado excede o parâmetro configurado para esta versão da regra."),

            _ => Build(request, "NOT_EVALUATED", "medium", "Regra reconhecida, mas ainda sem avaliador implementado.")
        };
    }

    private static ComplianceEvaluationResult Build(
        ComplianceEvaluationRequest request,
        string status,
        string severity,
        string explanation) =>
        new(
            request.TenantId,
            request.RuleCode,
            status,
            severity,
            explanation,
            request.CorrelationId ?? Guid.NewGuid().ToString("N"),
            DateTimeOffset.UtcNow);
}
