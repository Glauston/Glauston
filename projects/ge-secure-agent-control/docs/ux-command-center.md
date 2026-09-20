# UX P0 — Command Center e Approval Center

## Objetivo
Permitir que um gestor entenda em segundos:
- quais agentes estão ativos;
- o que estão fazendo;
- o que foi bloqueado;
- o que precisa de aprovação;
- onde há risco;
- quanto está sendo consumido;
- se existe incidente;
- como interromper uma operação com segurança.

## Navegação principal
1. Command Center
2. Agents
3. Policies
4. Approvals
5. Actions
6. Audit
7. Integrations
8. Risks
9. Costs
10. Incidents
11. Settings

Evitar excesso de menus. Informações técnicas profundas entram por drill-down.

## Command Center
### Faixa superior
- Agents Active
- Pending Approvals
- Blocked Actions
- High/Critical Risk
- Open Incidents
- Cost vs Budget

### Centro
**Live Activity**
- hora
- agente
- ação
- sistema
- decisão
- risco
- duração
- status

**Risk Radar**
- principais sinais nas últimas 24h
- anomalias
- mudanças relevantes de comportamento

**Approval Queue**
- ações mais urgentes
- SLA restante
- risco
- impacto
- solicitante
- agente

### Área crítica
Kill Switch sempre visível para perfis autorizados, mas protegido contra acionamento acidental:
1. selecionar escopo;
2. informar motivo;
3. confirmar impacto;
4. autenticação reforçada;
5. executar;
6. registrar incidente e auditoria.

## Agents
Cada agente deve mostrar:
- status;
- owner;
- finalidade;
- versão;
- ambiente;
- modelo;
- ferramentas;
- permissões;
- risco atual;
- custo;
- último evento;
- incidentes;
- botão suspender, conforme permissão.

### Agent 360
Abas:
- Overview
- Permissions
- Tools
- Policies
- Activity
- Risk
- Cost
- Versions
- Audit

## Approval Center
A tela deve evitar aprovação cega.

Cada item mostra:
- o que o agente quer fazer;
- por que quer fazer;
- em qual sistema;
- qual recurso será afetado;
- quais campos sensíveis existem;
- valor financeiro, se houver;
- score + sinais de risco;
- política que exigiu aprovação;
- reversibilidade;
- prazo de validade;
- hash do payload;
- histórico de aprovações.

Ações:
- Aprovar
- Rejeitar
- Solicitar mais contexto
- Abrir detalhes
- Abrir auditoria relacionada

### Dupla aprovação
Quando necessária, exibir:
- aprovação 1/2;
- quem já aprovou;
- quem pode ser o segundo aprovador;
- expiração.

## Policies
Fluxo:
DRAFT → SIMULATE → REVIEW → PUBLISH

Nunca publicar regra crítica diretamente sem simulação e permissão apropriada.

O simulador deve mostrar:
- quantas ações históricas seriam permitidas;
- quantas seriam bloqueadas;
- quantas exigiriam aprovação;
- mudanças de risco;
- possíveis impactos operacionais.

## Audit
Timeline compreensível:
Solicitação → Identidade validada → Política avaliada → Risco calculado → Aprovação → Execução → Resultado

Usuário pode alternar entre:
- visão executiva;
- visão técnica;
- evidência para auditoria.

## UX de segurança
- Vermelho visual apenas para risco/incidente real, não para decoração.
- Confirmações proporcionais ao impacto.
- Nunca esconder motivo de bloqueio do usuário autorizado.
- Nunca expor segredo.
- Mostrar diferença entre "bloqueado por política", "bloqueado por risco", "bloqueado por Kill Switch" e "falha técnica".
- Toda ação administrativa relevante mostra quem executou e quando.
- A interface não concede permissão; backend é a fonte de verdade.

## Mobile
Prioridade no mobile:
- aprovações;
- alertas;
- incidentes;
- Kill Switch emergencial;
- consulta rápida de agente/ação.

Configuração detalhada de políticas permanece otimizada para web no P0.

## Critério de sucesso de UX
Um gestor autorizado deve conseguir responder em até 3 cliques:
1. o que aconteceu;
2. qual agente fez;
3. qual sistema foi afetado;
4. por que foi permitido ou negado;
5. qual foi o risco;
6. quem aprovou;
7. qual evidência existe.
