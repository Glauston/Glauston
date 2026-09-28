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

## Fase 1.5 — Fiscal ONE Start / MEI
- experiência mobile-first;
- onboarding simplificado;
- cadastro de clientes, serviços e produtos;
- emissão/organização dos documentos fiscais aplicáveis;
- faturamento, recebimentos, despesas e visão de caixa;
- alertas de limite, obrigações e pendências;
- organização para contador;
- evolução MEI → ME → EPP sem perda de histórico.

## Fase 2 — Reforma Tributária Operations
- coexistência legado + RTC;
- cronogramas de DF-e;
- integrações com APIs oficiais disponíveis;
- Simples Nacional;
- regimes específicos/diferenciados;
- alertas por vigência;
- simulação atual x transição x futuro.

## Fase 2.5 — NFS-e National Gateway & Regulatory Adapter
- API fiscal estável para ERP/software house/BPO;
- integração com NFS-e Nacional;
- parametrização municipal versionada;
- município + vigência + regime + serviço + NBS + cClassTrib + indOp;
- IBS/CBS/ISS e regras transitórias;
- controle de versões de tabelas, leiautes, endpoints e ambientes;
- homologação/produção;
- XML/DANFSe/protocolo;
- idempotência e reconciliação;
- histórico de regra anterior e evidência de alteração;
- testes automatizados por versão regulatória.

## Fase 2.6 — Regulatory Auto-Update Engine
- G|E RADAR GLOBAL detecta mudança material;
- Legal Watch registra fonte oficial, vigência e impacto;
- MAESTRO cria demanda técnica/comercial;
- Fiscal ONE gera nova versão da regra/leiaute;
- testes de regressão e homologação;
- gate humano para publicação crítica;
- Data Core preserva versão, linhagem e evidências;
- AUDIT registra decisões e publicação;
- NEXUS identifica clientes afetados e acompanha tratativas.

## Fase 3 — Fiscal Operations
NF-e/NFC-e/NFS-e/CT-e/MDF-e; conciliação; billing; fechamento; alertas; obrigações; integrações ERP e frotas.

## Fase 3.5 — Fiscal ONE Simples
- ME/EPP do Simples Nacional;
- NFS-e Nacional/API;
- regras municipais versionadas;
- preparação IBS/CBS;
- conciliação fiscal e financeira;
- integração ERP;
- evidência de regra aplicada;
- dashboards de obrigação, risco e impacto.

## Fase 4 — Recupera
Detecção de oportunidades, dossiê de evidências, workflow de validação e integração opcional com G|E Recupera.

## Fase 5 — Enterprise Brasil
SSO/SCIM, conectores SAP/TOTVS, APIs, SLA, FinOps, white-label, observabilidade avançada, pacote de auditoria, políticas por tenant e catálogo nacional de conectores estaduais/municipais.

### Fiscal ONE Enterprise / API
- API fiscal única;
- NFS-e National Gateway;
- expansão progressiva para NF-e/NFC-e/CT-e/MDF-e;
- motor tributário desacoplado do ERP do cliente;
- multiempresa/multitenant;
- observabilidade, segurança, SLA e auditoria;
- conectores para ERP, software houses, BPOs e integradores.

## Gate fiscal
Nenhuma regra de produção sem fonte oficial, vigência, teste, revisão, aprovação e rollback.

## Gate comercial
Antes de ampliar cada fase: problema quantificado, cliente-alvo, piloto, métrica de valor, hipótese de preço e validação de operação standalone.

## Prioridade de execução — 28/09/2026
1. Consolidar NFS-e National Gateway & Regulatory Adapter.
2. Implementar trilha Start/MEI sem fragmentar o core.
3. Estruturar Fiscal ONE Simples para ME/EPP.
4. Conectar RADAR → MAESTRO → Legal Watch → Fiscal ONE → Data Core/AUDIT → NEXUS.
5. Preparar oferta API para software houses, ERPs, BPOs e integradores.
6. Manter regras fiscais sempre versionadas e dirigidas por configuração.
