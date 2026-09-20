# Security Architecture

## Controles mínimos
- Tenant isolation no backend e no banco.
- RBAC + ABAC; segregação operador/revisor/aprovador/admin.
- SSO/OIDC + MFA para produção.
- TLS; criptografia em repouso; secrets manager; rotação de chaves.
- Auditoria append-only: tenant, usuário/agente, ação, before/after, IP, user-agent, correlation_id, timestamp.
- Upload privado com antivírus/sandbox e validação de tipo/tamanho.
- Rate limiting, CORS restrito, CSP e validação server-side.
- SAST, dependency scanning, secret scanning e testes de autorização no CI.
- Backup criptografado e restore testado.
- DEV/HML/PRD isolados.

## IA segura
- agentes possuem identidade e escopo explícito;
- ferramentas allowlist;
- dados mínimos necessários;
- proteção contra prompt injection em documentos externos;
- decisões tributárias críticas exigem aprovação humana;
- logs de prompt/contexto/ferramenta sem expor segredos;
- kill switch por agente/tenant.

Exploração ofensiva não é automatizada; testes ativos somente mediante autorização explícita.
