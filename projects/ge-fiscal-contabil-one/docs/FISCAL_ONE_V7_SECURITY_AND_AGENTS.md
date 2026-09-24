# G|E Fiscal ONE v7 — Security, Agent Governance & Regulatory Intelligence

Data: 24/09/2026

## Objetivo
Elevar o Fiscal ONE de aplicação fiscal operacional para plataforma enterprise auditável, com governança de agentes, inteligência regulatória oficial, segregação por organização e controles seguros de mudança.

## Agentes registrados
- Fiscal Brain: simulação e recomendação explicável; não publica regra de produção.
- Legal Watch: captura/classificação/impacto de fontes oficiais.
- G|E AUDIT: auditoria, evidências e achados.
- Guardian: postura defensiva e bloqueios; ações de alto risco exigem humano.
- Hacker / Red Team: testes ativos somente sob autorização explícita.
- Reconciliation Agent: conciliação fiscal e exceções.

## Controles v7
- agent_identities e allowlist de ações;
- risk ceiling por agente;
- agent_action_requests + agent_approvals;
- human-in-the-loop para ações críticas;
- audit_ledger append-only com encadeamento por hash;
- tenant context e grants por organização;
- regulatory_sources e regulatory_events;
- tax_rule_versions;
- idempotency_records;
- source/effective date/status para mudanças regulatórias.

## Política de execução
Ações automaticamente bloqueadas ou submetidas a aprovação humana quando incluírem publicação de regra fiscal, alteração de cálculo, teste ativo de segurança, lançamento financeiro, pagamento externo, alteração de acesso ou eliminação de evidência.

## Fluxo regulatório
Fonte oficial → evento verificado → classificação → impacto → modelagem → testes → revisão → aprovação → publicação de regra → monitoramento/rollback.

## Baseline oficial modelado em 24/09/2026
- novas APIs de apuração da CBS;
- obrigatoriedade de NFS-e Nacional para ME/EPP;
- Plataforma Pública do Split Payment;
- alterações RTC na Duimp;
- janela do Simples Nacional e escolha de recolhimento IBS/CBS para 2027.

## Segurança
A v7 preserva o princípio: IA interpreta, explica e propõe; cálculo de produção é determinístico/versionado; decisão crítica é humana e auditável.
