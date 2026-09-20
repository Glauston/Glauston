# Backlog MVP — Cliente Zero

## Epic 01 — Fundação multitenant
- tenant, usuário, time e ambientes;
- isolamento de dados;
- MFA administrativo;
- trilha de auditoria administrativa.

## Epic 02 — Agent Registry
- criar/editar/desativar agente;
- owner, finalidade, modelo, versão, ambiente;
- status: DRAFT | PILOT | ACTIVE | SUSPENDED | RETIRED;
- inventário de ferramentas autorizadas.

## Epic 03 — Policy Engine
- RBAC;
- ABAC;
- deny-by-default;
- policy versioning;
- simulador/dry-run;
- teste de impacto antes de publicar.

## Epic 04 — Action Gateway
- endpoint único de execução;
- idempotency key;
- schema validation;
- rate limits;
- timeout;
- retry/circuit breaker;
- allowlist de destinos.

## Epic 05 — Risk Engine
- score contextual;
- catálogo de sinais;
- regras de override;
- score antes e depois de enriquecimento de contexto.

## Epic 06 — Approval Center
- fila de aprovações;
- aprovar/rejeitar;
- justificativa;
- validade;
- hash do payload;
- dupla aprovação configurável;
- step-up authentication para alto risco.

## Epic 07 — Secrets Broker
- referências de segredo;
- emissão efêmera;
- rotação;
- revogação;
- nunca retornar segredo à camada do agente.

## Epic 08 — Audit Ledger
- eventos append-only;
- correlação request/trace;
- exportação;
- retenção;
- proteção contra alteração;
- filtros por tenant/agente/ação/risco.

## Epic 09 — Kill Switch
- níveis agente/integrador/tenant/global;
- revogação;
- cancelamento seguro;
- alerta e registro.

## Epic 10 — Observability + FinOps
- erros;
- latência;
- volume;
- tokens;
- custo;
- orçamento;
- quota;
- anomalias.

## Epic 11 — UX/UI
Telas P0:
- Command Center;
- Agents;
- Policies;
- Approvals;
- Actions;
- Audit;
- Integrations;
- Risks;
- Costs;
- Incidents;
- Settings.

## Gate para homologação
- testes unitários;
- integração;
- autorização negativa;
- isolamento multitenant;
- idempotência;
- aprovação adulterada rejeitada;
- Kill Switch;
- segredo não exposto;
- logs íntegros;
- restore validado;
- UAT de fluxo completo.

## Gate para produção
Somente após evidência dos testes acima e homologação do Cliente Zero.
