# Roadmap — G|E Fiscal ONE

## Fase 0 — Fundação Standalone
Data model multi-tenant, identidade, tenant isolation, auditoria, central de pendências, observabilidade, migrations, backup/restore e CI/CD seguro.

## Fase 0.5 — Tax Knowledge Foundation
- Client Tax DNA;
- schema de regra fiscal versionada;
- registry de fontes legais;
- vigência/competência;
- jurisdição federal/estadual/municipal;
- Tax Legal Knowledge Engine;
- Legal Watch & Impact Engine;
- testes fiscais de regressão;
- trilha de publicação e rollback.

## Fase 1 — MVP Tax Decision
Importação XML/CSV/API; cadastro fiscal; motor de cenários; regimes; CBS/IBS/IS; créditos; dashboard de impacto; evidência legal; aprovação; Recommendation Engine.

## Fase 2 — Reforma Tributária Operations
- coexistência legado + RTC;
- cronogramas de DF-e;
- integrações com APIs oficiais disponíveis;
- Simples Nacional;
- regimes específicos/diferenciados;
- alertas por vigência;
- simulação atual x transição x futuro.

## Fase 3 — Fiscal Operations
NF-e/NFC-e/NFS-e/CT-e/MDF-e; conciliação; billing; fechamento; alertas; obrigações; integrações ERP e frotas.

## Fase 4 — Recupera
Detecção de oportunidades, dossiê de evidências, workflow de validação e integração opcional com G|E Recupera.

## Fase 5 — Enterprise Brasil
SSO/SCIM, conectores SAP/TOTVS, APIs, SLA, FinOps, white-label, observabilidade avançada, pacote de auditoria, políticas por tenant e catálogo nacional de conectores estaduais/municipais.

## Gate fiscal
Nenhuma regra de produção sem fonte oficial, vigência, teste, revisão, aprovação e rollback.

## Gate comercial
Antes de ampliar cada fase: problema quantificado, cliente-alvo, piloto, métrica de valor, hipótese de preço e validação de operação standalone.
