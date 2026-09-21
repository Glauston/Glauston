# Legal Watch & Impact Engine

## Objetivo
Manter o Fiscal ONE continuamente atualizado sem transformar notícias ou respostas de IA em regra de produção.

## Estados do evento legal
DETECTED → VERIFIED → CLASSIFIED → IMPACTED → MODELED → TESTED → REVIEWED → APPROVED → PUBLISHED → MONITORED

Estados de exceção:
REJECTED, DUPLICATE, SUPERSEDED, ROLLED_BACK.

## Evento monitorado
Um evento pode ser:
- lei complementar/ordinária;
- decreto;
- medida provisória;
- instrução normativa;
- resolução;
- ato conjunto/técnico;
- nota técnica de DF-e;
- solução de consulta;
- convênio/protocolo/ajuste SINIEF;
- decisão administrativa relevante;
- regra estadual;
- regra municipal;
- nova API/layout/schema oficial;
- alteração de prazo;
- alteração de benefício;
- cronograma da Reforma Tributária.

## Impact Analysis
Para cada alteração:
1. identificar vigência e competência;
2. identificar jurisdição;
3. mapear tributo;
4. mapear CNAE/NCM/NBS/CEST/atividade;
5. mapear regimes afetados;
6. mapear operações afetadas;
7. localizar tenants compatíveis;
8. estimar materialidade financeira;
9. gerar casos de teste;
10. abrir decisão técnica/fiscal.

## Publicação segura
Nenhuma regra entra em produção sem:
- fonte oficial;
- versionamento;
- vigência;
- diff;
- teste unitário;
- teste de regressão;
- validação por revisor;
- rollback possível.

## Priorização
P0: risco de cálculo incorreto, emissão rejeitada, obrigação iminente ou impacto financeiro alto.
P1: mudança com vigência próxima e clientes afetados.
P2: orientação/aperfeiçoamento sem obrigação imediata.
P3: conteúdo informativo.

## Alertas por cliente
Formato:
- mudança;
- fundamento;
- data de publicação;
- início de vigência;
- empresas/estabelecimentos afetados;
- produtos/serviços afetados;
- impacto estimado;
- ação necessária;
- prazo;
- responsável;
- status.

## Reforma Tributária — baseline operacional 20/09/2026
O monitor deve acompanhar, entre outros:
- cronogramas oficiais de documentos fiscais;
- atualizações de APIs de apuração da CBS;
- regulamentações e atos do CGIBS;
- regras de opção/operacionalização do Simples Nacional;
- alterações da transição IBS/CBS/IS;
- regras estaduais e municipais coexistentes até o fim da transição.

## Fontes de verdade
A fonte primária deve ser oficial. Conteúdo editorial, imprensa, blogs e IA podem acionar investigação, mas não podem publicar regra tributária.

## SLA interno
- P0: análise imediata e bloqueio preventivo quando necessário;
- P1: análise e modelagem antes da vigência;
- P2/P3: fila programada.

## Auditoria
Registrar source_url, source_hash, captured_at, published_at, effective_from, effective_to, reviewer, approver, rules_changed, tests, tenants_impacted, rollback_target e correlation_id.
