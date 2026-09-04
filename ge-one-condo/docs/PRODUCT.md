# Produto — G|E ONE Condo / G|E BOX

## Objetivo
Construir uma experiência de encomendas que moradores tenham prazer em usar, porteiros considerem mais simples que o processo manual e síndicos/administradoras percebam como instrumento de controle.

## Personas e experiência
### Portaria
- Tela principal focada em `Receber`, `Entregar`, `Pendências` e `Ocorrências`.
- Captura de etiqueta por câmera/OCR.
- Busca por nome, unidade, torre/bloco e identificadores permitidos.
- Confirmação humana quando houver baixa confiança/ambiguidade.
- Sugestão de locker/local disponível.
- BOX Anywhere para volume especial.
- Registro de evidências conforme política do condomínio.
- Operação degradada/offline prevista no desenho técnico, com sincronização segura quando aplicável.

### Morador
- Notificação imediata por canal habilitado.
- Sem obrigação de instalar aplicativo para o fluxo básico.
- Link seguro/PWA opcional para histórico e ações.
- QR/PIN/credencial temporária conforme implantação.
- Autorização de retirada por terceiro conforme regras do condomínio.
- Histórico de recebimentos/retiradas.
- Lembretes configuráveis sem excesso de mensagens.
- Fluxo de devolução/logística reversa no roadmap.

### Síndico
- Home por exceção: normalidade primeiro, problemas acionáveis em destaque.
- Ocupação atual, encomendas pendentes, permanência, incidentes e disponibilidade do equipamento.
- Cadeia de custódia G|E Trust.
- Relatórios e exportação.
- Políticas configuráveis de notificação, retenção e operação.
- Indicadores de adoção e eficiência.
- Assistente G|E AI para consultas sobre dados autorizados, com respostas rastreáveis.

### Administradora
- ONE Admin multi-condomínio.
- Saúde operacional da carteira.
- Alertas e exceções por condomínio.
- Comparativos e indicadores sem expor dados além das permissões.
- Gestão delegada por perfis e escopos.

## Diferenciais estruturais
### 1. BOX Anywhere
Gerencia a encomenda mesmo quando ela não cabe em um locker. O ativo central é a jornada/rastreabilidade, não a porta física.

### 2. Discovery antes do hardware
Modo diagnóstico para medir volume, tamanhos, horários, permanência e picos antes de recomendar configuração física.

### 3. Capacity Intelligence
Com histórico suficiente, previsão de ocupação, análise de dimensionamento e recomendações operacionais. Toda previsão deve informar nível de confiança e nunca ser apresentada como certeza.

### 4. Gestão por exceção
O sistema evita transformar milhares de operações normais em trabalho administrativo. Pessoas recebem aquilo que precisa de decisão.

### 5. G|E Trust
Linha do tempo auditável: recebimento, identificação, armazenamento, notificações, autenticação, abertura e retirada.

### 6. Autopilot controlado
Regras configuráveis para lembretes, encomendas antigas, falhas de notificação, ocupação, equipamento indisponível e eventos anômalos. Automação não substitui autorização humana em ações sensíveis.

### 7. Hardware desacoplado
Camada de integração para G|E BOX próprio, retrofit tecnicamente homologado e equipamentos de terceiros via API/adaptadores quando suportados.

### 8. Plataforma modular
BOX é a porta de entrada do G|E ONE. Evolução planejada para ACCESS, CARE, BOOK, TALK, DOCS, SUPPLIERS, ASSEMBLY, ANALYTICS e AI.

## Fluxo principal
1. Entrega chega.
2. Identificação assistida.
3. Sistema resolve unidade/destinatário ou pede confirmação.
4. Sugere armazenamento.
5. Operador/entregador autorizado deposita.
6. G|E Trust registra o evento.
7. Morador é notificado.
8. Autopilot acompanha prazo/ocupação.
9. Morador se autentica e retira.
10. Sistema encerra e mantém auditoria conforme retenção.

## Exceções obrigatórias
- etiqueta ilegível;
- destinatário não encontrado/ambíguo;
- morador inativo;
- locker cheio;
- volume grande;
- porta não abriu/não fechou;
- internet indisponível;
- notificação falhou;
- QR/PIN inválido/expirado;
- retirada por terceiro;
- pacote contestado;
- equipamento offline;
- necessidade de suporte/manutenção.

## KPIs
Tempo médio de recebimento, tempo de permanência, % retiradas dentro do prazo, ocupação máxima, taxa de sucesso das notificações, taxa de sucesso das retiradas, incidentes por 1.000 operações, disponibilidade do hardware, tempo de resolução, adoção por unidades e NPS/CSAT por persona.

## Critério de excelência
Uma funcionalidade só entra em produção após teste funcional, permissões, auditoria, falhas, responsividade, acessibilidade, segurança, telemetria e recuperação terem sido validadas.
