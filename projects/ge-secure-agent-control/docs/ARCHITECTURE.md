# Arquitetura — G|E Secure Agent Control

## Fluxo
Usuário/Agente → Agent Gateway → Identity → Policy Engine → Approval (quando exigido) → Tool/API/MCP → Audit/Event Store → Monitoring/FinOps.

## Entidades mínimas
tenant; user; agent; agent_version; identity; role; policy; permission; tool; connector; mcp_server; data_scope; action_request; approval; execution; audit_event; incident; risk_finding; cost_event.

## Políticas
A decisão deve ser determinística e explicável: ALLOW, DENY ou REQUIRE_APPROVAL. A IA pode auxiliar classificação e investigação, mas não substitui o Policy Engine.

## Segurança
SSO/OIDC, MFA, RBAC+ABAC, secrets manager, TLS, encryption at rest, append-only audit, rate limits, signed events, tenant isolation, environment separation, backup/restore, CI security scanning.

## Integrações prioritárias
G|E Data Core; NEXUS; Fiscal ONE; Recupera; GitHub; clouds; IdP corporativo; SIEM; APIs e MCPs.
