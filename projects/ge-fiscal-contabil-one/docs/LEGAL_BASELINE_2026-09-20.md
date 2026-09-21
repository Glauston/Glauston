# Baseline legal e técnico — 20/09/2026

Este arquivo é um índice técnico. O texto legal e a documentação oficial vigente permanecem a fonte de verdade.

## Reforma Tributária do Consumo
- LC 214/2025: institui IBS, CBS e Imposto Seletivo.
- 2026 é ano de teste de CBS/IBS conforme orientações oficiais da Receita Federal.
- A transição exige coexistência de regras legadas e novas regras até a implantação integral do novo modelo.
- O Fiscal ONE deve versionar regras por competência e nunca sobrescrever histórico.

## Documentos fiscais
- A Receita Federal/CGIBS mantém cronograma oficial de documentos fiscais eletrônicos relacionados à RTC.
- Ato Conjunto RFB/CGIBS nº 4/2026 deve integrar o registry de fontes do Legal Watch.
- NF-e/NFC-e/CT-e/NFS-e e demais documentos devem ser acompanhados por versão de leiaute/nota técnica e data de obrigatoriedade.

## Simples Nacional
- Em 01/09/2026 a Receita Federal informou janela de 1º a 30/09/2026 para ingresso no Simples em 2027 e escolha do modelo de recolhimento de IBS/CBS para empresas abrangidas.
- Resoluções CGSN nº 190 e nº 191/2026 atualizaram regras do Simples para adaptação à RTC.
- A mudança do regime de caixa para apuração do Simples, divulgada oficialmente em agosto/2026, deve ser modelada por data de produção de efeitos e perfil do contribuinte.

## APIs CBS
- Em 14/09/2026 a Receita Federal publicou nova documentação técnica das APIs de apuração da CBS.
- O cronograma divulgado prevê consultas de débitos/créditos no início de outubro/2026, pagamentos/recolhimentos como adquirente no início de novembro/2026 e emissão de DARF relacionada no final de novembro/2026.
- A arquitetura do Fiscal ONE deve suportar sincronização incremental e idempotente dessas APIs quando disponíveis.

## CGIBS
- O Fiscal ONE deve monitorar continuamente resoluções, regulamentos, atos conjuntos e atos técnicos do CGIBS.
- Em 15/09/2026 o portal do CGIBS registrou a Resolução CGIBS nº 18/2026; o conteúdo deve passar pelo pipeline de captura/classificação antes de qualquer efeito em regra.
- Em 18/09/2026 RFB/CGIBS publicaram orientação sobre opção por regime específico de IBS/CBS para sociedades cooperativas.

## Importação
- A Receita Federal informou alterações de RTC na Duimp com disponibilização em produção prevista para 27/09/2026, incluindo campos de UF/município do local de operação de consumo e tributação de CBS/IBS por item.

## Pipeline obrigatório
Toda alteração normativa/técnica deve gerar:
1. captura da fonte oficial;
2. hash/versão/data de publicação;
3. vigência/competência;
4. diff contra versão anterior;
5. classificação por jurisdição/tributo/CNAE/NCM/NBS/regime/operação;
6. identificação de tenants afetados;
7. simulação de impacto;
8. testes automatizados/regressão;
9. revisão humana;
10. homologação;
11. publicação;
12. reprocessamento;
13. alerta;
14. trilha de auditoria;
15. rollback.

Nunca alterar cálculo de produção diretamente a partir de notícia, IA ou fonte não oficial.

## Fontes oficiais prioritárias
Receita Federal, Planalto, CGIBS, CONFAZ, SPED, Portal NF-e, Portal NFS-e, Simples Nacional, SEFAZ estaduais/DF, legislação municipal e demais órgãos competentes conforme o tributo/operação.
