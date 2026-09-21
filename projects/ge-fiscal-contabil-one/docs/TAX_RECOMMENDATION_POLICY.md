# Tax Recommendation Policy

## Objetivo
Garantir que o Fiscal ONE sugira economia tributária de forma lícita, explicável, reproduzível e auditável.

## Classes de recomendação
1. Compliance: corrigir erro/omissão.
2. Efficiency: reduzir retrabalho/custo operacional.
3. Credit: identificar crédito permitido.
4. Regime: comparar regimes tributários aplicáveis.
5. Incentive: identificar benefício/incentivo/regime especial.
6. Structure: avaliar reorganização operacional com substância econômica.
7. Reform: preparar transição IBS/CBS/IS.
8. Recovery: avaliar recuperação de pagamento indevido/maior.

## Score de evidência
A — texto normativo direto e aplicável.
B — texto normativo + regulamentação/orientação oficial.
C — interpretação suportada por solução de consulta/precedentes relevantes.
D — hipótese que exige parecer especializado adicional.
Recomendação crítica com score D não pode ser tratada como ação pronta.

## Bloqueios
O sistema não deve recomendar:
- ocultação de receita;
- documento fiscal falso;
- classificação artificial sem substância;
- simulação de operação;
- interposição fraudulenta;
- uso de benefício sem requisitos;
- alteração retroativa sem base;
- evasão/sonegação.

## Saída padrão
- título;
- problema/oportunidade;
- cliente/estabelecimento;
- regra atual;
- regra alternativa;
- elegibilidade;
- economia estimada;
- risco;
- evidência;
- premissas;
- prazo;
- dependências;
- recomendação de validação;
- aprovação requerida;
- versão do motor.

## Human-in-the-loop
Requer aprovação qualificada quando houver:
- mudança de regime;
- tese tributária;
- recuperação material;
- benefício/regime especial;
- interpretação controvertida;
- reorganização societária/operacional;
- impacto financeiro acima do threshold do tenant.
