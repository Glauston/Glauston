# Security Baseline 2026 — G|E Secure Agent Control

## Objetivo
Transformar referências de mercado em controles verificáveis do produto. Compliance documental não substitui teste.

## OWASP Agentic AI 2026 — controles incorporados
- Identidade própria por agente/workload.
- Menor privilégio e deny-by-default.
- Tool governance por catálogo de ações.
- Bloqueio de ampliação de escopo e classificação crítica do sinal.
- Aprovação humana vinculada ao hash do payload.
- Dupla aprovação para risco crítico.
- Segregação entre owner do agente e aprovador.
- Kill Switch.
- Idempotência contra replay/execução duplicada.
- Redação de segredos em auditoria.
- Audit Ledger encadeado por hash.
- Isolamento por tenant no domínio e RLS no PostgreSQL.

## NIST AI RMF / GenAI Profile
O produto organiza evidências para governança, mapeamento, medição e gestão de risco: inventário de agentes, owner, finalidade, políticas, risk score, aprovações, logs, incidentes e métricas operacionais.

## MCP / integrações
Integrações MCP/API devem passar pelo Action Gateway. Autorização externa deve validar issuer/audience/state/PKCE conforme o protocolo aplicável. Tokens e segredos não entram no contexto do agente nem no Audit Ledger.

## Autenticação do MVP
- `AUTH_MODE=dev`: somente desenvolvimento/homologação isolada.
- Produção rejeita `AUTH_MODE=dev`.
- `AUTH_MODE=trusted-proxy`: identidade validada por gateway/IdP externo e protegida por assertion HMAC entre proxy e serviço.
- O segredo da assertion deve possuir ao menos 32 caracteres e ficar em secret manager.
- Assertion expira em 5 minutos.

## Gates antes de produção comercial
1. Integrar IdP corporativo (OIDC/SAML via gateway ou serviço dedicado).
2. Substituir MemoryStore pelo repositório PostgreSQL transacional.
3. Aplicar schema/RLS e role de aplicação não proprietária.
4. Cofre de segredos gerenciado (KMS/Vault/cloud secret manager).
5. TLS ponta a ponta e rotação de chaves.
6. SAST, secret scan, dependency scan e SBOM no pipeline.
7. Testes de carga e chaos/failure modes.
8. Backup/restore testado.
9. Pentest defensivo autorizado e correção das evidências.
10. Revisão LGPD, retenção, DPA e requisitos contratuais do cliente.

## Regra de verdade
O MVP não deve ser chamado de “produção pronta” enquanto qualquer gate acima permanecer sem evidência objetiva.
