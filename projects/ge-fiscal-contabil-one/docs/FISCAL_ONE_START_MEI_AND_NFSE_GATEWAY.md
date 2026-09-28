# G|E Fiscal ONE — Start/MEI + NFS-e National Gateway

Data de consolidação: 28/09/2026.

## Objetivo
Ampliar o Fiscal ONE para atender microempreendedores, ME/EPP, software houses, ERPs, BPOs e operações enterprise usando o mesmo core fiscal, com experiência progressiva, regras regulatórias versionadas e integração nacional de NFS-e.

## Estratégia de produto
O Fiscal ONE não será dividido em sistemas independentes. Haverá três experiências comerciais sobre o mesmo motor:

1. Fiscal ONE Start / MEI
2. Fiscal ONE Simples
3. Fiscal ONE Enterprise / API

O cliente deve poder crescer entre as camadas sem perder histórico, cadastros, documentos, conciliações, evidências ou integrações.

## 1. Fiscal ONE Start / MEI

### Proposta
Entregar uma experiência simples, mobile-first e orientada à intenção do usuário, escondendo a complexidade fiscal sempre que possível.

### Capacidades
- onboarding simplificado;
- cadastro de empresa, clientes, serviços e produtos;
- emissão e organização de documentos fiscais aplicáveis ao perfil;
- faturamento e recebimentos;
- despesas e contas a pagar;
- visão de caixa;
- conciliação básica;
- alertas de limite, pendências e obrigações;
- organização de documentos para contador;
- histórico completo para migração MEI → ME → EPP.

### Regra de UX
O usuário pequeno não deve precisar dominar NBS, cClassTrib, indOp, leiautes, endpoints ou regras municipais para realizar uma operação cotidiana. O sistema deve traduzir a intenção operacional em fluxo fiscal assistido, preservando confirmação humana quando a decisão for crítica.

## 2. Fiscal ONE Simples

### Público
ME e EPP do Simples Nacional, empresas com operação em múltiplos municípios e negócios com ERP próprio/legado.

### Capacidades
- NFS-e Nacional via gateway/API;
- parametrização municipal e nacional versionada;
- regras por regime, município, serviço, NBS, cClassTrib, indOp e vigência;
- preparação para regras de transição IBS/CBS;
- conciliação fiscal/financeira;
- integração ERP;
- evidência de regra aplicada;
- alertas de alteração regulatória e impacto por cliente.

## 3. Fiscal ONE Enterprise / API

### Público
Software houses, ERPs, BPOs fiscais/contábeis, integradores, grupos econômicos e operações B2B/B2G complexas.

### Capacidades
- API fiscal única e estável;
- NFS-e National Gateway;
- expansão progressiva para NF-e, NFC-e, CT-e e MDF-e;
- motor fiscal desacoplado do ERP;
- multiempresa/multitenant;
- idempotência e reconciliação;
- observabilidade e health checks;
- SLA e trilha de auditoria;
- segurança e segregação por tenant;
- conectores e webhooks enterprise.

## NFS-e National Gateway & Regulatory Adapter

### Princípio arquitetural
Nunca espalhar regras municipais específicas pelo código de integração do cliente. O ERP deve falar com uma interface estável do Fiscal ONE; o adapter absorve diferenças regulatórias, de leiaute, tabela, endpoint, versão e vigência.

### Modelo regulatório mínimo
Município → vigência → regime → serviço → NBS → cClassTrib → indOp → IBS/CBS/ISS → versão da tabela → API/leiaute → ambiente → regra anterior → evidência.

### Fluxo de referência
Empresa → Regime → Município → Operação → Serviço/NBS → Regra vigente → Cálculo → DPS → SEFIN Nacional/API → NFS-e → XML/DANFSe → Financeiro → Contábil → Data Core → AUDIT.

### Requisitos técnicos
- configuração versionada;
- validação por schema;
- compatibilidade com múltiplas versões;
- feature flags por vigência;
- ambiente DEV/HML/PRD;
- idempotency key para emissão/cancelamento/substituição;
- retry com backoff para integrações externas;
- dead-letter/reconciliation queue;
- captura de protocolo e payload normalizado;
- trilha de versão da regra aplicada;
- testes de regressão por mudança regulatória;
- rollback controlado;
- observabilidade por município/endpoint/versão.

## Regulatory Auto-Update Engine

### Objetivo
Transformar inteligência regulatória em fluxo operacional de software e atendimento ao cliente.

### Pipeline
G|E RADAR GLOBAL detecta alteração oficial
→ Legal Watch registra fonte, ato, data, vigência, escopo e urgência
→ MAESTRO cria demanda técnica/comercial
→ Fiscal ONE cria nova versão de regra/tabela/leiaute
→ testes automatizados e regressão
→ homologação
→ gate humano quando crítico
→ publicação controlada
→ Data Core preserva versão e linhagem
→ AUDIT registra aprovação, deploy e evidências
→ NEXUS identifica clientes afetados, responsáveis, SLA e tratativas.

### Estrutura sugerida do evento regulatório
- regulatory_event_id
- authority
- source_url
- act_type
- act_number
- publication_date
- effective_date
- deadline
- jurisdiction
- affected_regimes
- affected_documents
- affected_operations
- urgency
- technical_change_type
- schema_or_table_version
- impacted_connectors
- impacted_tenants
- required_tests
- approval_status
- deployment_status
- evidence_hash

## Integração com o ecossistema G|E

### Data Core
- versionamento regulatório;
- linhagem de dados;
- evidência imutável;
- histórico de payloads, tabelas e decisões.

### G|E AUDIT
- trilha de mudança;
- fonte oficial;
- quem aprovou;
- quando entrou em produção;
- quais testes foram executados;
- qual regra foi aplicada em cada documento.

### MAESTRO
- demanda automática por alteração regulatória;
- responsável;
- prioridade;
- prazo;
- dependências;
- checklist técnico e jurídico.

### NEXUS
- clientes afetados;
- carteira;
- tratativas;
- alertas;
- comunicação;
- SLA;
- oportunidade comercial de adequação.

### Guardian / Secure Agent Control
- controle de agentes que interpretam alterações regulatórias;
- bloqueio de publicação automática de regra crítica;
- segregação entre interpretação, proposta, revisão e publicação;
- evidência da decisão e do agente envolvido.

## Estratégia comercial

### Entrada Start / MEI
Oferta simples e de baixo atrito para organização fiscal/financeira. A monetização pode evoluir por automação, conciliação, financeiro, integrações, relatórios, contador e serviços de crescimento.

### Entrada Simples
Adequação NFS-e, integração via API, regras municipais e preparação para transição tributária.

### Entrada Enterprise/API
Venda como motor fiscal e camada de integração para quem não deseja substituir o ERP atual.

### Expansão
Start/MEI → Simples → Enterprise/API, preservando todo o histórico e aumentando ARPU conforme a complexidade do cliente cresce.

## Gates de segurança e conformidade
- IA não é fonte legal de verdade;
- toda regra crítica precisa de fonte oficial e vigência explícita;
- nenhuma regra crítica vai para produção sem teste e gate de aprovação;
- ações fiscais sensíveis devem possuir trilha append-only;
- mudanças devem suportar rollback;
- ambientes devem permanecer segregados;
- dados fiscais e contábeis seguem tenant isolation e least privilege.

## Próximos passos técnicos
1. Definir contrato canônico da API NFS-e do Fiscal ONE.
2. Criar schema de Regulatory Adapter e versionamento de tabelas.
3. Modelar o fluxo Start/MEI sem duplicar o core fiscal.
4. Criar testes de regressão para municípios e versões de leiaute.
5. Conectar RADAR/Legal Watch ao MAESTRO.
6. Criar evento de impacto para NEXUS e Data Core.
7. Implantar gate AUDIT/Guardian para publicação regulatória crítica.
8. Preparar PoC comercial com ERP externo consumindo uma única API Fiscal ONE.
