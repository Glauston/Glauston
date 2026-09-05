# REGULA — Produto v0.1

## Proposta de valor

REGULA reduz o tempo entre mudança normativa e ação operacional ao transformar regras em controles verificáveis e auditáveis.

## Público-alvo inicial

- Operadoras e emissores de benefícios.
- Adquirentes e processadores.
- Grandes empregadores.
- Jurídico, Compliance, Risco, Financeiro e Operações.
- Parceiros que desejem white-label ou API.

## Jornada executiva

1. Usuário entra na organização.
2. Visualiza Compliance Score e principais riscos.
3. Abre uma ocorrência crítica.
4. Vê regra, motivo, transações/documentos afetados e impacto.
5. Consulta evidências e explicação da IA.
6. Define responsável e prazo.
7. Executa correção ou registra justificativa.
8. Revalida a ocorrência.
9. Encerra com trilha completa de auditoria.

## Dashboard v0.1

Indicadores previstos:

- Compliance Score geral.
- transações analisadas.
- percentual aderente.
- ocorrências críticas, altas, médias e baixas.
- exposição financeira estimada.
- contratos com possível divergência.
- liquidações fora de SLA.
- estabelecimentos com alerta.
- regras alteradas recentemente.
- ocorrências vencendo SLA.

## Central de riscos

Cada ocorrência deve possuir:

- código único.
- tenant/organização.
- regra aplicada e versão.
- severidade.
- confiança da detecção.
- impacto financeiro estimado.
- objetos afetados.
- evidências.
- responsável.
- SLA.
- status.
- histórico.
- justificativa de aceite de risco, quando aplicável.

## Estados iniciais

`DETECTED → TRIAGE → IN_REVIEW → ACTION_REQUIRED → REMEDIATED → REVALIDATED → CLOSED`

Estados auxiliares: `FALSE_POSITIVE`, `RISK_ACCEPTED`, `BLOCKED`.

## REGULA AI

Funções permitidas na v0.1:

- explicar uma ocorrência em linguagem executiva.
- resumir norma e contexto.
- sugerir ações corretivas.
- priorizar análise por impacto.
- auxiliar na leitura de contratos.

Guardrail: a IA não cria, ativa ou altera uma regra regulatória oficial sem versionamento e aprovação humana.

## Critério de sucesso do MVP

Um executivo deve conseguir entender em menos de 5 minutos:

- onde está o risco;
- por que o sistema sinalizou;
- quanto pode impactar;
- qual norma/regra está relacionada;
- qual ação é recomendada;
- quais evidências sustentam a análise.
