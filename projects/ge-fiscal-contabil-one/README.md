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
- docs/FISCAL_ONE_START_MEI_AND_NFSE_GATEWAY.md
- schemas/tax-rule.schema.json
- schemas/client-tax-profile.schema.json

Ambiente operacional atual: Hatchable. Código e especificações são versionados neste diretório.

## Fundação v7 — segurança, agentes e inteligência regulatória (24/09/2026)

A v7 adiciona, sem substituir os fluxos existentes:
- contexto de organização/tenant e preparação para row-scoping;
- identidade e política de agentes;
- aprovação humana obrigatória para ações críticas/de alto risco;
- G|E AUDIT, Guardian, Hacker/Red Team, Legal Watch, Fiscal Brain e Reconciliation Agent;
- Audit Ledger append-only com encadeamento por hash;
- Regulatory Sources + Regulatory Events com fonte oficial, vigência e urgência;
- versionamento de regras tributárias e gate de publicação;
- idempotency registry para integrações críticas;
- security posture API e trilha de decisões de agentes.

### Regra de segurança dos agentes
Nenhum agente publica regra tributária crítica, altera cálculo, executa teste ativo de segurança, altera acesso, executa pagamento externo ou elimina evidência sem passar pela política e, quando aplicável, por aprovação humana.

### Baseline regulatório v7
O produto passa a modelar explicitamente CBS APIs, NFS-e Nacional, Split Payment, Duimp/RTC e janela do Simples/IBS/CBS, sempre mantendo a fonte oficial como verdade e a IA apenas como camada de interpretação.

## Fundação v8 — Fiscal ONE Start/MEI, Simples e NFS-e National Gateway (28/09/2026)

A v8 amplia o Fiscal ONE para atender desde o microempreendedor até operações enterprise sem fragmentar o produto.

### Fiscal ONE Start / MEI
Experiência mobile-first e de baixa complexidade operacional, com:
- cadastro simplificado de empresa, clientes, serviços e produtos;
- emissão e organização de documentos fiscais aplicáveis ao perfil do negócio;
- faturamento, contas a receber/pagar e despesas;
- conciliação e visão de caixa;
- alertas de limite, obrigações e pendências;
- organização de documentos para contador;
- trilha de evolução MEI → ME → EPP sem perda de histórico.

### Fiscal ONE Simples
Camada para ME/EPP e operações do Simples Nacional, com:
- NFS-e Nacional via gateway/API;
- regras municipais versionadas;
- parametrização por serviço, NBS, cClassTrib, indOp, regime e vigência;
- preparação para IBS/CBS e demais regras de transição;
- conciliação fiscal/financeira;
- integração com ERP e sistemas próprios;
- evidência de regra aplicada e histórico de versões.

### Fiscal ONE Enterprise / API
Camada para software houses, ERPs, BPOs, integradores e grandes operações, com:
- API fiscal única e estável;
- NFS-e National Gateway & Regulatory Adapter;
- expansão progressiva para NF-e, NFC-e, CT-e e MDF-e;
- motor fiscal e tributário desacoplado do ERP do cliente;
- multiempresa/multitenant;
- observabilidade, SLA, segurança, auditoria e integração enterprise.

### NFS-e National Gateway & Regulatory Adapter
A lógica municipal e nacional deve ser dirigida por configuração e versão, nunca por regra fixa espalhada no código do ERP.

Modelo mínimo:
Município → vigência → regime → serviço → NBS → cClassTrib → indOp → IBS/CBS/ISS → versão de tabela → API/leiaute → homologação/produção → regra anterior → evidência.

Fluxo de referência:
Empresa → Regime → Município → Operação → Serviço/NBS → Regra vigente → Cálculo → DPS → SEFIN Nacional/API → NFS-e → XML/DANFSe → Financeiro → Contábil → Data Core → AUDIT.

### Regulatory Auto-Update Engine
O G|E RADAR GLOBAL passa a alimentar um fluxo operacional de adequação:
Radar detecta alteração oficial → MAESTRO abre demanda → Legal Watch valida fonte/vigência → Fiscal ONE recebe nova versão de regra/leiaute → testes automatizados → homologação → publicação controlada → Data Core preserva versão/evidência → AUDIT registra decisão → NEXUS identifica clientes impactados e acompanha tratativas.

### Princípio de produto
O pequeno empresário não deve precisar conhecer a complexidade fiscal interna. A experiência deve traduzir intenção de negócio em operação fiscal assistida, mantendo revisão humana e fonte oficial como autoridade para decisões críticas.
