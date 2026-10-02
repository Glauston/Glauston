# Gestão de Despesas de Viagens — QA e Homologação

Atualização: 2026-10-02

## Status atual

**NÃO HOMOLOGADO** até conclusão dos critérios abaixo.

## Regra de homologação

Nenhuma funcionalidade será considerada homologada apenas por teste isolado. Cada funcionalidade deve passar por, no mínimo, 5 possibilidades:

1. Fluxo normal / caminho feliz.
2. Erro de preenchimento ou regra de negócio.
3. Devolução, correção e reenvio.
4. Exceção operacional / cenário de limite.
5. Regressão, segurança, segregação de perfil, persistência e impacto em módulos relacionados.

Qualquer falha de regra, persistência, segurança, regressão, deploy ou segregação de acesso bloqueia a homologação.

## Fluxo ponta a ponta obrigatório

Solicitação de Adiantamento → Gestor → Controladoria → Financeiro → Depósito + Comprovante → Prestação de Contas → Lançamento de Despesas/RDV → Gestor → Controladoria → Ajustes/Glosas/Devoluções → Financeiro → Reembolso ou Devolução de Saldo → Comprovante → Conclusão.

O teste integrado deve cruzar também:

- Cartões corporativos;
- Frota / reserva de veículos;
- Empresas;
- Centros de custos;
- Políticas de gastos;
- Comprovantes e anexos;
- Mensagens e histórico;
- Perfis de acesso;
- Dados bancários;
- Limite de 2 prestações de contas em aberto por colaborador;
- Persistência de dados e trilha de estados.

## Bloqueadores P0 identificados na homologação

### 1. Comprovante obrigatório

- Comprovante deve ser obrigatório conforme regra definida para o lançamento.
- Validar salvamento em rascunho e envio para aprovação de acordo com a regra vigente.
- Mensagem de erro deve ser clara e impedir persistência inválida.

### 2. Valor acima da política

Quando o colaborador informar valor acima do limite da política:

- manter o valor originalmente informado para rastreabilidade;
- limitar o valor reconhecido/aprovável ao teto da política;
- destacar o excedente;
- exigir justificativa/observação;
- não confundir essa trava com o valor geral do adiantamento.

### 3. Fluxo do rascunho

Rascunho deve permitir a jornada:

Editar → Salvar → Anexar documentos → Enviar ao Gestor.

Após envio, o status deve mudar para **Aguardando Gestor**.

### 4. QA insuficiente / regressão

As correções acima só podem ser consideradas concluídas após repetição dos 5 cenários por funcionalidade e execução do fluxo ponta a ponta.

## Critério de saída

A homologação só poderá ser marcada como concluída quando:

- todos os P0 estiverem corrigidos;
- os 5 cenários de cada funcionalidade passarem;
- o fluxo ponta a ponta passar;
- perfis e segregação de dados passarem;
- regressão integrada entre adiantamentos, RDV, cartões e frota passar;
- nenhuma correção quebrar funcionalidade já existente;
- evidências de teste estiverem registradas.

## Diretriz permanente

A partir desta versão, toda evolução do Gestão de Despesas de Viagens deve incluir análise de impacto e regressão antes de ser considerada pronta para homologação ou produção.
