# Arquitetura — G|E Secure Agent Control

## 1. Separação principal
### Control Plane
Administração de agentes, políticas, aprovações, tenants, integrações, custos e segurança.

### Execution Plane
Recebe solicitações de ação dos agentes, valida identidade/política/risco, obtém segredo efêmero e executa a integração permitida.

Essa separação reduz impacto caso um agente, modelo ou conector seja comprometido.

## 2. Componentes
- API Gateway
- Auth Service
- Tenant Service
- Agent Registry
- Tool & Integration Registry
- Policy Engine
- Context / Attribute Resolver
- Risk Engine
- Action Gateway
- Approval Orchestrator
- Secrets Broker
- Audit Ledger
- Event Bus
- Notification Service
- Observability / SIEM Export
- FinOps Service
- Kill Switch Controller

## 3. Estados de uma ação
REQUESTED → EVALUATING → DENIED | APPROVAL_REQUIRED | AUTHORIZED → EXECUTING → SUCCEEDED | FAILED | CANCELLED | EXPIRED

Toda transição deve gerar evento de auditoria.

## 4. Decisão de política
Entrada mínima:
- tenant;
- usuário/serviço solicitante;
- agent_id + agent_version;
- action_id;
- resource;
- data_classification;
- environment;
- destination;
- monetary_value, quando aplicável;
- risk signals;
- time/context;
- approval state.

Saída:
- ALLOW;
- DENY;
- REQUIRE_APPROVAL;
- REQUIRE_STEP_UP_AUTH;
- LIMIT / MASK / REDACT.

## 5. Risk Score
Score contextual de 0–100. O score não substitui política.

Sinais iniciais:
- ação destrutiva;
- movimentação financeira;
- envio externo;
- dado sensível;
- novo destino;
- volume anômalo;
- horário incomum;
- agente recém-alterado;
- falhas consecutivas;
- tentativa de ampliar escopo.

Faixas iniciais:
- 0–29: baixo;
- 30–59: moderado;
- 60–79: alto;
- 80–100: crítico.

A política pode elevar a exigência independentemente da faixa.

## 6. Aprovação humana
A aprovação deve ser vinculada ao hash do payload autorizado. Qualquer alteração material invalida a aprovação.

Possibilidades:
- 1 aprovador;
- dupla aprovação;
- aprovação por valor;
- aprovação por tipo de dado;
- aprovação por destino;
- aprovação por ambiente;
- expiração automática.

## 7. Segredos
O agente nunca recebe credencial persistente. O Secrets Broker fornece credencial de curta duração diretamente ao executor autorizado.

## 8. Auditoria
Registrar:
- request_id e trace_id;
- tenant/user/agent;
- política e versão;
- atributos avaliados;
- score e sinais de risco;
- decisão;
- aprovação e justificativa;
- ferramenta chamada;
- hash da entrada/saída;
- duração;
- custo;
- erro/resultado;
- origem e destino.

Dados sensíveis não devem ser gravados em claro no log.

## 9. Resiliência
- idempotência;
- retry controlado;
- circuit breaker;
- timeout;
- fila de reprocessamento;
- dead-letter queue;
- rate limit;
- isolamento por tenant;
- degraded mode seguro: na dúvida, negar ações críticas.

## 10. Implantação
Ambientes separados: dev, homologação e produção.

Produção exige:
- MFA administrativo;
- segregação de funções;
- backup testado;
- rotação de segredo;
- observabilidade;
- alertas;
- política de retenção;
- revisão periódica de permissões.
