# G|E Secure Agent Control

Central enterprise de governança, identidade, segurança, auditoria e controle para agentes de IA, automações e integrações.

## Missão
Permitir que empresas usem agentes de IA com visibilidade e controle: quem é o agente, quem o criou, quais dados e sistemas acessa, quais ações pode executar, qual risco representa, quanto custa e quem aprovou ações críticas.

## Princípios obrigatórios
- Zero Trust.
- Deny by default.
- Menor privilégio.
- Identidade própria para cada agente.
- Toda ação sensível passa pelo Action Gateway.
- Aprovação humana para ações críticas.
- Segredos nunca ficam expostos ao agente.
- Logs de auditoria protegidos contra alteração e exclusão.
- Kill Switch global, por tenant, por agente e por integração.
- Nenhuma exploração ofensiva automática. Testes ativos somente em ativos autorizados e quando explicitamente solicitados.
- Multiempresa/multitenant desde a arquitetura.
- LGPD e segregação de dados por design.

## Fluxo canônico
Usuário/Evento → Agent Registry → Identity → Policy Engine → Risk Engine → Action Gateway → Approval Center (quando necessário) → Tool/API/MCP → Audit Ledger → Observability.

## Núcleo
1. Agent Registry — cadastro, dono, finalidade, versão, modelo, ambiente e status.
2. Identity & Access — identidade do agente + RBAC/ABAC + escopos.
3. Action Gateway — ponto único de saída para ferramentas, APIs e MCP.
4. Policy Engine — regras de autorização e limites.
5. Risk Engine — score contextual antes da execução.
6. Approval Center — aprovação, rejeição, justificativa, expiração e dupla aprovação quando exigido.
7. Secrets Broker — credenciais entregues somente no momento da execução, sem exposição ao agente.
8. Audit Ledger / Evidence Vault — trilha completa de decisão e execução.
9. Runtime Monitoring — métricas, erros, latência e comportamento.
10. AI FinOps — orçamento por agente/tenant e limites de consumo.
11. Kill Switch — interrupção imediata e revogação de sessões.
12. Simulation / Dry Run — avaliar políticas e impacto sem executar ação real.

## Plataforma universal e agnóstica
O G|E Secure Agent Control não é limitado ao ecossistema G|E. Ele é uma camada independente de controle para agentes, automações e integrações de qualquer organização, fornecedor ou stack tecnológico.

Conectores suportados/planejados:
- REST / GraphQL / Webhooks;
- MCP;
- filas e eventos;
- bancos de dados;
- ERP, CRM, fiscal, financeiro, RH, logística e sistemas públicos;
- RPA e automações;
- agentes próprios ou de terceiros;
- modelos de IA de qualquer fornecedor;
- aplicações legadas por adapters controlados.

O produto não exige que o sistema protegido seja desenvolvido pela G|E.

## Integrações do ecossistema G|E — Cliente Zero
- G|E Secure: vulnerabilidades, postura e resposta.
- G|E Data Core: dados e trilha de origem.
- G|E Fiscal ONE: ações fiscais/contábeis reguladas por política.
- NEXUS: agentes comerciais e operacionais.
- G|E Recupera: ações financeiras e recuperação de receita.
- G|E PMO: governança do portfólio e entregáveis.

## Cliente Zero
O ecossistema G|E será o primeiro ambiente real de homologação, não o limite do produto. Nenhum agente do Cliente Zero deve executar ação externa crítica sem estar registrado e passar pelo controle.

A arquitetura comercial deve funcionar da mesma forma para qualquer tenant externo, sem dependência de código, banco, identidade ou infraestrutura G|E.

### Escopo P0
- cadastro de agentes;
- autenticação de usuários e workloads;
- RBAC + ABAC;
- catálogo de ações;
- políticas allow/deny/approval;
- Risk Score;
- Approval Center;
- Audit Ledger;
- Kill Switch;
- quotas e limites de custo;
- dashboard operacional;
- API para integração com agentes e sistemas.

## Critério de sucesso
Para qualquer ação realizada por um agente, deve ser possível responder:
**quem solicitou, qual agente decidiu, qual política autorizou, qual risco foi calculado, quais dados foram usados, qual ferramenta foi chamada, quem aprovou e qual foi o resultado.**

## Objetivo comercial
Produto B2B recorrente e plataforma de infraestrutura de segurança para organizações que utilizem agentes de IA, automações ou sistemas capazes de executar ações. Pode ser comercializado como SaaS, private cloud, on-premises ou camada de controle integrada à infraestrutura do cliente.

Status: **MVP P0 executável — pronto para homologação técnica do Cliente Zero; produção comercial depende dos gates de segurança documentados.**


## Implementação atual
O branch do MVP contém:
- runtime Node.js sem dependências externas no núcleo;
- Agent Registry;
- catálogo de ações;
- Policy Engine com deny-by-default e precedência de negação;
- Risk Engine contextual 0–100;
- Action Gateway;
- Approval Center com hash de payload, dupla aprovação crítica e proibição de autoaprovação;
- idempotência contra execução duplicada;
- Kill Switch;
- Audit Ledger encadeado por hash e redação de segredos;
- isolamento lógico por tenant;
- Command Center web;
- baseline PostgreSQL com Row Level Security;
- autenticação de desenvolvimento e modo de produção atrás de gateway/IdP confiável;
- Dockerfile;
- pipeline CI;
- testes automatizados de segurança e regras críticas.

## Execução local
```bash
cd projects/ge-secure-agent-control
npm test
AUTH_MODE=dev PORT=8080 npm start
```

No modo de desenvolvimento, envie `x-tenant-id` e `x-actor-id`. O modo `dev` é bloqueado quando `NODE_ENV=production`.

## Produção
Não confundir MVP homologável com produção comercial. Antes de produção devem existir evidências para persistência PostgreSQL transacional, IdP corporativo, secret manager/KMS, TLS, backup/restore, observabilidade, SAST/secret/dependency scanning, SBOM, teste de carga e pentest defensivo autorizado.

Veja `docs/security-baseline-2026.md`.
