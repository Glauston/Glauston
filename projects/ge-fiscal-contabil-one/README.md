# G|E Fiscal ONE — Tax Decision Intelligence

Plataforma fiscal, tributária, contábil, faturamento e integração enterprise para o Brasil, independente e comercializável, com inteligência por CNAE, NCM/NBS/CEST, regime tributário, UF, município, operação e vigência.

## Missão
Responder continuamente:
- o que mudou na legislação;
- quais clientes foram afetados;
- qual o impacto financeiro e operacional;
- quais caminhos tributários lícitos são aplicáveis;
- qual evidência legal sustenta a recomendação;
- o que precisa ser feito, por quem e até quando.

## Núcleos v6
- Client Tax DNA
- Tax Legal Knowledge Engine
- Deterministic Tax Rules Engine
- Tax Scenario & Regime Simulator
- Fiscal Match Engine
- DFe Hub
- Credit & Recovery Intelligence
- Compliance Radar
- Reform Transition Engine
- Legal Watch & Impact Engine
- Decision Center
- Audit & Evidence Vault
- Integration Health
- Plano de contas e centros de custo
- Lançamentos contábeis
- Billing Engine
- Central de Pendências e Alertas

## Especialização Brasil
O motor deve considerar simultaneamente:
CNPJ/estabelecimento + CNAE/atividade efetiva + regime + NCM/CEST/NBS + UF/município + origem/destino + tipo de operação + cliente/fornecedor + benefício/regime especial + competência/vigência.

## Reforma Tributária
Suporte de coexistência e transição para PIS/Cofins, ICMS, ISS, IPI aplicável, CBS, IBS e Imposto Seletivo, incluindo cronogramas de documentos fiscais, APIs oficiais e regras do Simples Nacional.

## Governança fiscal
- fonte oficial obrigatória;
- regras versionadas;
- vigência explícita;
- testes de regressão;
- revisão humana para decisões críticas;
- rollback;
- trilha de auditoria;
- IA nunca é fonte legal de verdade;
- planejamento lícito separado de evasão/fraude.

## Independência comercial
O Fiscal ONE deve possuir autenticação, banco, APIs, backup/restore, observabilidade, CI/CD, exportação, documentação, licenciamento e operação próprios. NEXUS, Recupera, Data Core e outros produtos são integrações opcionais.

## Segurança
- tenant isolation;
- RBAC + ABAC;
- segregação operador/revisor/aprovador/admin;
- MFA/SSO em produção;
- queries parametrizadas;
- validação server-side;
- audit log append-only;
- secret scanning/SAST/dependency scanning;
- backup e restore testados;
- ambientes DEV/HML/PRD segregados.

## Documentação-chave
- docs/FISCAL_ONE_V6_BLUEPRINT.md
- docs/TAX_DECISION_INTELLIGENCE.md
- docs/LEGAL_WATCH_AND_IMPACT_ENGINE.md
- docs/TAX_RECOMMENDATION_POLICY.md
- docs/LEGAL_BASELINE_2026-09-20.md
- docs/SECURITY_ARCHITECTURE.md
- docs/ROADMAP.md
- schemas/tax-rule.schema.json
- schemas/client-tax-profile.schema.json

Ambiente operacional atual: Hatchable. Código e especificações são versionados neste diretório.
