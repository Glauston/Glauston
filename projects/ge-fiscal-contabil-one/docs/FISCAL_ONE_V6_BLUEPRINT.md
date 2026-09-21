# G|E Fiscal ONE v6 — Tax Intelligence Operating System

## Visão
O Fiscal ONE é um sistema fiscal/tributário brasileiro independente, multi-tenant e comercializável. Sua função não é apenas apurar tributos: é entender o DNA fiscal de cada cliente, detectar mudanças legais, simular impactos, sugerir caminhos lícitos e auditáveis, apoiar execução e manter evidências.

## Princípio central
Toda decisão depende do contexto:
CNPJ → estabelecimentos → CNAE principal/secundários → atividade efetiva → regime tributário → UF/município → produtos NCM/CEST → serviços NBS/LC 116 → operação → cliente/fornecedor → destino → benefício/regime especial → período de vigência.

## Núcleos
1. Client Tax DNA
2. Legal & Regulatory Knowledge Graph
3. Deterministic Tax Rules Engine
4. Tax Scenario & Regime Simulator
5. Fiscal Match & DFe Hub
6. Credits & Recovery Intelligence
7. Compliance Radar
8. Reform Transition Engine
9. Decision Center
10. Legal Watch & Impact Engine
11. Audit & Evidence Vault
12. Integration Hub

## Client Tax DNA
Perfil mínimo por tenant/empresa:
- CNPJ e estabelecimentos;
- CNAEs e atividades efetivamente exercidas;
- regime atual e histórico;
- faturamento, folha e margens por atividade;
- UFs e municípios de operação;
- NCM/CEST/NBS/serviços;
- mix B2B/B2C/B2G;
- cadeia de fornecedores e clientes;
- incentivos, regimes especiais e benefícios;
- créditos fiscais e saldos;
- importação/exportação;
- documentos fiscais emitidos/recebidos;
- obrigações acessórias;
- histórico de fiscalizações, autuações e contingências;
- parâmetros da Reforma Tributária.

## Motor de conhecimento tributário
Cada regra precisa conter:
- jurisdição: federal/UF/município;
- tributo;
- hipótese de incidência;
- base de cálculo;
- alíquota;
- reduções, isenções e imunidades;
- créditos permitidos;
- vedações;
- atividade/CNAE;
- NCM/CEST/NBS;
- origem/destino;
- regime tributário;
- data inicial/final de vigência;
- fundamento legal oficial;
- versão/hash;
- precedência e conflito;
- nível de confiança;
- revisor responsável;
- testes automatizados vinculados.

IA pode interpretar e explicar. Cálculo de produção deve ser determinístico e versionado.

## Recommendation Engine
Toda recomendação deve informar:
- cenário atual;
- alternativa simulada;
- economia/impacto estimado;
- impacto de caixa;
- impacto em margem;
- requisitos operacionais;
- riscos e incertezas;
- fundamento normativo;
- vigência;
- evidências;
- ações necessárias;
- aprovação humana exigida;
- data de reavaliação.

Nunca classificar fraude/evasão como planejamento. O sistema deve bloquear sugestões sem suporte normativo suficiente.

## Reforma Tributária
O motor deve coexistir com regras legadas e novas regras durante a transição:
- PIS/Cofins;
- ICMS;
- ISS;
- IPI aplicável;
- CBS;
- IBS;
- Imposto Seletivo;
- regimes específicos/diferenciados;
- Simples Nacional;
- cronogramas de DF-e;
- apuração assistida e APIs oficiais.

Cada simulação deve suportar comparação "regime atual x transição x cenário futuro".

## Legal Watch
Fluxo:
captura → normalização → classificação → verificação da fonte → diff → análise de impacto → tenants afetados → sandbox de regras → testes → revisão humana → publicação → reprocessamento → alerta → auditoria → rollback.

Fontes oficiais prioritárias:
- Receita Federal;
- Planalto;
- CGIBS;
- CONFAZ;
- Portal NF-e/NFC-e/CT-e/MDF-e;
- Portal NFS-e;
- SPED;
- Simples Nacional;
- SEFAZ dos 26 estados + DF;
- legislação e portais tributários municipais;
- PGFN quando aplicável;
- CARF e soluções de consulta para interpretação, sem substituir texto normativo.

## Experiência do usuário
Home deve responder:
1. O que mudou?
2. Quem é afetado?
3. Quanto isso custa/economiza?
4. Qual o risco?
5. O que precisa ser feito?
6. Até quando?
7. Qual a base legal?
8. Quem deve aprovar?

## Telas prioritárias
- Visão Executiva Fiscal;
- DNA Tributário;
- Reforma Tributária;
- Cenários & Regimes;
- Obrigações & Prazos;
- Documentos Fiscais;
- Créditos & Recuperação;
- Pendências & Riscos;
- Radar Legislativo;
- Decision Center;
- Auditoria & Evidências;
- Integrações.

## Independência comercial
Fiscal ONE deve ter autenticação, banco, API, observabilidade, backup/restore, exportação, CI/CD, documentação e licenciamento próprios. Integrações com NEXUS, Recupera, Data Core ou outros produtos são opcionais.

## Requisitos enterprise
- tenant isolation;
- RBAC + ABAC;
- segregação operador/revisor/aprovador;
- SSO/OIDC/MFA;
- trilha append-only;
- idempotência e correlation_id;
- encryption at rest/in transit;
- secret manager;
- data retention configurável;
- backups testados;
- versionamento de regras;
- replay/reprocessamento;
- feature flags;
- rollback de regras;
- SAST/dependency/secret scanning;
- testes fiscais de regressão.

## Métricas de valor
- carga tributária efetiva por atividade;
- créditos identificados/validados/recuperados;
- economia projetada/realizada;
- obrigações em risco;
- divergências documentais;
- tempo de fechamento;
- risco fiscal monetizado;
- alterações legais detectadas e tratadas;
- recomendações aceitas/rejeitadas;
- precisão das regras;
- ROI por cliente.
