# G|E Fiscal ONE — Tax Decision Intelligence

## Missão
Transformar dados fiscais, tributários, contábeis e operacionais em decisões auditáveis, específicas para cada cliente e sustentadas por evidência legal versionada.

## Princípios
- Fonte oficial e vigência são obrigatórias para toda regra.
- O contexto fiscal é multidimensional: CNAE não decide sozinho.
- A atividade efetivamente exercida deve ser confrontada com cadastro, produto/serviço e operação.
- Regra determinística calcula; IA interpreta, explica, investiga anomalias e organiza evidências.
- Nenhuma recomendação fiscal crítica é executada automaticamente.
- Toda simulação registra versão das regras, entradas, saídas, premissas e responsável.
- Multi-tenant, menor privilégio, segregação de funções e auditoria append-only.
- Atualizações legais entram por pipeline controlado: detectar → verificar → classificar → modelar → testar → revisar → homologar → publicar → reprocessar impactos.
- Ecossistema por integração, nunca por dependência.

## Client Tax DNA
Cada cliente deve possuir perfil tributário versionado contendo:
- CNPJ/estabelecimentos;
- CNAEs e atividades efetivas;
- regimes e histórico;
- faturamento/folha/margens;
- UFs/municípios;
- NCM/CEST/NBS e serviços;
- clientes/fornecedores/origem/destino;
- benefícios/regimes especiais;
- obrigações;
- créditos/saldos;
- importação/exportação;
- exposição à Reforma Tributária.

## MVP comercial
1. Client Tax DNA.
2. Tax Legal Knowledge Engine.
3. Tax Scenario Engine: atual x transição x futuro; CBS, IBS, IS, créditos, caixa e margem.
4. Fiscal Match Engine: operação ↔ documento ↔ contrato ↔ pagamento.
5. DFe Hub: NF-e, NFC-e, NFS-e, CT-e/MDF-e e XML/eventos.
6. Credit Intelligence: oportunidades e evidências para G|E Recupera.
7. Compliance Radar: pendências, severidade, SLA, responsável e ação.
8. Reform Transition Engine.
9. Legal Watch & Impact Engine.
10. Decision Center: recomendações com evidência, risco, confiança e aprovação humana.
11. Integration Health: ERP/SEFAZ/RFB/CGIBS/NFS-e/SISATEC/Gestão/NEXUS.
12. Audit & Evidence Vault.

## Modelo da regra tributária
Cada regra deve registrar, no mínimo:
jurisdição, tributo, incidência, CNAE/atividade, NCM/CEST/NBS, regime, origem/destino, operação, base, alíquota, redução, crédito, vedação, benefício, vigência, fundamento oficial, versão/hash, evidência, revisor e testes.

## Recomendação
Toda recomendação deve trazer:
- situação atual;
- alternativa;
- elegibilidade;
- economia/impacto;
- caixa/margem;
- requisitos;
- riscos;
- fundamento;
- vigência;
- evidências;
- ações;
- aprovação;
- próxima revisão.

## Arquitetura
Fiscal ONE deve operar standalone.

Integrações opcionais:
G|E Data Core ↔ Fiscal ONE ↔ G|E Recupera / NEXUS

G|E Secure pode atuar transversalmente em identidade, RBAC/ABAC, segredos, auditoria, detecção e políticas, sem ser dependência obrigatória do produto.

## Guardrails
- Sem credenciais ou .env no Git.
- MFA/SSO em produção; TLS; secrets manager; criptografia em repouso.
- DEV/HML/PRD separados; migrations versionadas; backup/restore testado.
- Idempotência, retries, dead-letter queue e correlation_id nas integrações.
- Aprovação de contador/tributarista para decisões críticas.
- Não usar LLM como fonte de verdade legal.
- Bloquear recomendação de evasão, fraude, ocultação, classificação artificial ou benefício sem requisitos.
- Toda regra publicada deve permitir rollback.

## Métricas
valor de créditos identificados/validados/recuperados; economia projetada/realizada; risco evitado; divergências; tempo de fechamento; documentos conciliados; pendências vencidas; taxa de automação; precisão das regras; alterações legais tratadas; recomendações aceitas/rejeitadas; custo por tenant; ROI.
