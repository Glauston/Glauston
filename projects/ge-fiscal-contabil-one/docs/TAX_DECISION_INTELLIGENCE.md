# G|E Fiscal ONE — Tax Decision Intelligence

## Missão
Transformar dados fiscais, contábeis e operacionais em decisões tributárias auditáveis, com evidência legal versionada e aprovação humana para decisões críticas.

## Princípios
- Fonte oficial e vigência são obrigatórias para toda regra.
- Nenhuma recomendação fiscal crítica é executada automaticamente.
- Regra determinística calcula; IA explica, investiga anomalias e organiza evidências.
- Toda simulação registra versão das regras, entradas, saídas e responsável.
- Multi-tenant, menor privilégio, segregação de funções e auditoria append-only.
- Atualizações legais entram por pipeline controlado: detectar → revisar → homologar → publicar → reprocessar impactos.

## MVP comercial
1. Tax Scenario Engine: atual x 2027+; CBS, IBS, IS, créditos, caixa e margem.
2. Fiscal Match Engine: operação ↔ documento ↔ contrato ↔ pagamento.
3. DFe Hub: NF-e, NFC-e, NFS-e, CT-e/MDF-e e XML/eventos.
4. Credit Intelligence: oportunidades e evidências para G|E Recupera.
5. Compliance Radar: pendências, severidade, SLA, responsável e ação.
6. Decision Center: recomendações com evidência, confiança e aprovação humana.
7. Integration Health: ERP/SEFAZ/RFB/CGIBS/NFS-e/SISATEC/Gestão/NEXUS.
8. Audit & Evidence Vault: trilha imutável e pacote de evidências.

## Arquitetura
G|E Data Core → Rules/Legal Knowledge → Fiscal ONE → G|E Recupera / NEXUS
G|E Secure atua transversalmente em identidade, RBAC/ABAC, segredos, auditoria, detecção e políticas.

## Guardrails
- Sem credenciais ou .env no Git.
- MFA/SSO em produção; TLS; secrets manager; criptografia em repouso.
- DEV/HML/PRD separados; migrations versionadas; backup/restore testado.
- Idempotência, retries, dead-letter queue e correlation_id nas integrações.
- Aprovação de contador/tributarista para decisões classificadas como críticas.
- Não usar LLM como fonte de verdade legal.

## Métricas
valor de créditos identificados; economia/risco evitado; divergências; tempo de fechamento; documentos conciliados; pendências vencidas; taxa de automação; precisão das regras; custo por tenant; ROI.
