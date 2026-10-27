# G|E SECURE 3.0 — FORTRESS
**RFC de arquitetura / proposta não homologada — 2026-10-20**

> Estado: DESIGN ONLY. Este documento não comprova implementação, segurança em produção, certificação, execução de testes ou desempenho. Não contém segredos, políticas privadas, detalhes exploráveis nem infraestrutura de clientes.

## Objetivo
Evoluir o ecossistema já documentado G|E Hacker → Guardian → AUDIT, com Secure Agent Control e Data Core, para proteção independente de agentes autônomos, incluindo ações, dados, ferramentas, efeitos coletivos e consequências de negócio.

### Invariantes inegociáveis
1. Agentes nunca decidem a própria autoridade; o Policy Enforcement Point (PEP) é independente do modelo e do prompt.
2. Negação por padrão, escopo mínimo, identidade verificável, autorização por missão e tenant, autorização a cada ação relevante.
3. Identidade humana ≠ identidade do agente; delegação explícita tem expiração, finalidade e revogação.
4. A autoridade coletiva de um swarm não pode superar a autorização delegada; recursão de delegação limitada.
5. Operação financeira, alteração de privilégio, exportação sensível, publicação, exclusão e ação irreversível requerem política forte e, conforme risco, aprovação humana.
6. Dados, memória, documentos, ferramentas MCP e mensagens de terceiros não se tornam instruções de sistema por serem recuperados ou resumidos por IA.
7. Falha na avaliação de políticas para operações críticas resulta em bloqueio; interrupção/desativação deve funcionar sem depender do agente.
8. Auditoria independente; evidência íntegra, proteção de dados e cadeia de custódia; nenhuma certificação presumida.
9. Hacker testa exclusivamente ativos próprios/expressamente autorizados, com escopo, contas sintéticas, staging, limites e aprovação; sem exfiltração ou indisponibilidade.
10. Preservar todas as baselines homologadas e testar regressão antes de publicar; sem merge/deploy automático.

## A. 21 camadas em sete domínios

| ID | Domínio | Camada | Controle verificável |
|---|---|---|---|
| L01 | Identidade | Inventário e ownership | registry, shadow agent discovery, owner humano, última recertificação |
| L02 | Identidade | Identidade criptográfica | identidade workload e agente, credenciais curtas e rotação |
| L03 | Identidade | Delegação por missão | grants assinados, finalidade, expiração e delegador |
| L04 | Autoridade | PEP/PDP contextual | ação, argumento, risco, tenant, estado e purpose |
| L05 | Autoridade | JIT capabilities | TTL, audiência, limite de uso, revogação |
| L06 | Autoridade | Gateway de ferramentas | allowlist de API/MCP, schema, OAuth audience binding |
| L07 | Isolamento | Execution sandbox | OS/container isolation, recursos, timeout, sem host bypass |
| L08 | Isolamento | Network egress | destinos permitidos, DNS/IP/URL e detecção exfil |
| L09 | Isolamento | Data boundary | classificação, minimização, DLP, tenant isolation |
| L10 | Integridade IA | Trusted input boundary | separar comando de dado e tratar prompt injection |
| L11 | Integridade IA | Context/memory integrity | proveniência, TTL, assinaturas, write guards e quarentena |
| L12 | Integridade IA | Deterministic output validation | schemas, regras críticas e validações externas ao modelo |
| L13 | Consequências | Economic/operational guardrails | orçamento, contagem, taxa, valor, uso físico quando aplicável |
| L14 | Consequências | Collective authority graph | delegações transitivas e limites coletivos para swarm |
| L15 | Consequências | Behavioral detection | anomalia, desvio de missão, velocidade e drift |
| L16 | Resposta | Multi-signal threat correlation | eventos, regra, proveniência, severidade, detecção correlata |
| L17 | Resposta | Progressive containment | restrict > reduce > isolate > quarantine > kill, por policy |
| L18 | Resposta | Recovery and compensation | snapshot/rollback, compensação aprovada, RTO/RPO |
| L19 | Prova | Evidence & receipts | ledger append-only, hash, trace, timestamp, access controls |
| L20 | Prova | Supply-chain provenance | SBOM, signed builds, attestations, policy admission |
| L21 | Prova | Independent continuous assurance | AUDIT retests, evidence mapping, license to operate |

## B. 16 cápsulas reutilizáveis
Cada cápsula é uma boundary implementável com `capsule_id`, `tenant_id`, owner, policy_version, expiry, decisão `allow/deny/escalate`, telemetria, limites e negative tests. Não são meras etiquetas.

C01 Identity [L01-L03]; C02 Mission [L03-L04]; C03 Privilege [L04-L05]; C04 Tool [L06]; C05 Execution [L07]; C06 Network [L08]; C07 Data [L09]; C08 Memory [L11]; C09 Context [L10-L12]; C10 Financial [L13]; C11 Swarm [L14]; C12 Behavior [L15-L16]; C13 Evidence [L19]; C14 Recovery [L18]; C15 Supply Chain [L20]; C16 Continuity [L17-L18,L21].

Toda cápsula tem contrato de entrada/saída, enforcement fora do LLM, testes de negativa, métricas, fail-safe documentado, revogação, política de logs e limites de custo.

## C. Quatro motores
- **Hacker / Authorized Adversarial Intelligence**: inventário de superfície autorizada, testes negativos de RBAC/tenant, abuso de ferramenta, prompt injection indireto, memória manipulada, cadeias multiagentes e falhas de integração; dados sintéticos, rate limits, evidência reproduzível, sem varredura irrestrita.
- **Guardian / Autonomous Defensive Engine**: sinais de runtime, PDP/PEP, detecção, circuit breakers, contenção progressiva, kill switch fora do agente, correção via PR sujeito a revisão, regressão.
- **AUDIT / Continuous Independent Assurance**: matriz de controles, mapeamento de evidências, gates, riscos residuais, relatórios assináveis, recertificação por mudança, revisão humana, sem autoproclamar ISO/LGPD certificados.
- **Foresight / Predictive Consequence Engine (experimental)**: simulação não destrutiva de sequência de ações, limites de delegação, grafo de efeitos e verificação de reversibilidade; apenas assistivo até comprovar taxa de detecção e falsos positivos.

## D. Fluxo obrigatório por ação de risco
`Human/owner request -> agent identity -> mission grant -> contextual PDP -> tool broker -> capsule checks -> execution/approval -> Guardian telemetry/containment -> verifiable receipt -> AUDIT evidence/retest`.
- Ledger `agent_id, owner_id, tenant_id, mission_id, purpose, policy_id/version, tool_id, capability_id, input/output hashes, trace_id, risk_score, decision, approver, timestamp, effect, compensation_reference`.
- Não gravar prompts completos ou PII em logs sem base, necessidade e controles de acesso; preferir redaction, hashes e retenção definida.
- Mudança de estado entre avaliação e execução exige revalidar (TOCTOU); operações críticas preferem transação ou controle idempotente.
- Se o componente de segurança estiver indisponível, negar mutações críticas e preservar uma via de recuperação administrativa auditada.

## E. P&D diferenciador (hipóteses, não características comprovadas)
- **Proof of Delegated Intent**: associação verificável usuário→missão→limites→consentimento→ação.
- **Consequence Twin**: simulação prévia de possíveis efeitos com dados sintéticos, sem promessa de previsão perfeita.
- **Collective Authority Budget**: orçamento de permissões e consequências para cadeias de agentes, impedindo acumulação indevida.
- **Cryptographic Evidence Receipt**: recibo verificável com hash, proveniência, decisão de policy e referência de execução.
- **Self-expiring Agent License to Operate**: autorização temporária revogada por alterações relevantes de modelo, ferramentas, perfil de risco ou ambiente.
- **Confidential Agent Capsule (pesquisa)**: TEE/remote attestation para workloads sensíveis, somente onde custo e suporte da plataforma justificarem.
- **PQC readiness (planejamento)**: inventário criptográfico e plano para padrões NIST FIPS 203/204/205, sem implementação precipitada.

Nenhum componente acima deve ser anunciado como inédito no mundo ou já implementado.

## F. Testes e portas de qualidade
- T01 negação anônima/sem privilégio; T02 zero acesso cross-tenant; T03 impossibilidade de falsificar identidade/owner; T04 token errado de audiência bloqueado; T05 missão expirada/revogada bloqueada; T06 tool não autorizada bloqueada; T07 shell/filesystem/network fora do sandbox bloqueados.
- T08 prompt injection em documento recuperado não altera autoridade; T09 memória envenenada não vira política; T10 secret não aparece em resposta/log/export; T11 orçamento de ação e finanças não ultrapassado; T12 swarm não amplia autoridade.
- T13 falha de PDP bloqueia operação crítica; T14 kill switch revoga em testes; T15 correção tem reteste independente; T16 nenhuma perda de dados existentes, backup/restore testado.
- T17 evidência de log preserva integridade e segredo; T18 operações críticas geram trilha e aprovação; T19 carga e latência dentro do SLO validado; T20 simulador experimental não autoriza ação automaticamente.
- Medir cobertura por cenário, tempo médio de detecção/contensão, falso bloqueio, ausência de cross-tenant leakage em teste, precisão de detecção e custo por 1.000 decisões. Não usar "100% seguro".

### Release gates
**G0** escopo e threat model aprovados; **G1** requisitos/arquitetura/privacidade; **G2** Hacker autorizado encontra falhas; **G3** Guardian corrige e documenta; **G4** regressão completa; **G5** AUDIT independente retesta e valida; **G6** aprovação humana, backups/rollback, liberação gradual/monitoramento. P0 aberto bloqueia. P1 bloqueia produção salvo exceção extraordinária documentada pela autoridade competente e controles compensatórios aceitáveis.

## G. Roadmap proposto (prazo sujeito a inventário/estimativa da engenharia)
- P0, semanas 1–2: inventariar o código real e testes CI, mapear gaps por camada, traçar threats e evidências; não alterar produção.
- P1, semanas 3–6: protótipo com agent registry, PDP/PEP, identity/delegation, mission, tool gateway, logs e testes negativos.
- P2, semanas 7–10: egress/data capsules, limites financeiros, controle de swarm, containment e Kill Switch em sandbox.
- P3, semanas 11–14: Evidence Ledger/receipt, AUDIT retest/release gate, recovery drill, pilotos autorizados.
- P4, futuro: behavioral models, predictive consequence twin, confidential computing e PQC readiness somente com POC e métricas.

### RACI inicial sugerido
Product Owner (responsável pela aprovação de escopo), Security Architect (arquitetura), DevSecOps/Backend (implementação), IAM (identidade), SRE (continuidade), Data/Privacy (privacidade), Hacker (testes adversariais), Guardian (correções), AUDIT independente (gate), Jurídico/Compliance (normas), CISO/sponsor (aceite de risco). Não usar o mesmo agente para criar, aprovar e certificar um controle.

## H. Produto comercial proposto
1. Discovery & Exposure Assessment pago com inventário/risco/lacunas sem precisar de engine pronta;
2. piloto controlado de 1–3 agentes, com cenário mensurável de bloqueio, evidência e recuperação;
3. assinatura por tenant + faixa de agentes protegidos + volume de decisões/eventos + retenção de evidências;
4. implantação privada/air-gapped opcional sujeita a engenharia e SLA;
5. relatório de governança contínua **não** equivale a certificação independente.

### Posicionamento e honestidade
Sem benchmark comparável ou pentest independente, não afirmar "o mais seguro do mundo". Separar documentação, protótipo, implementado, testado em staging, validado externamente e produção. Não expor políticas de detecção, infraestrutura de cliente ou detalhes de exploração neste documento público.

## I. Fontes normativas e técnicas (consultadas em 2026-10-20)
- OWASP Top 10 for Agentic Applications 2026: https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/
- OWASP Agent Control Standard / 2026 update: https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/
- NIST Agent Security Initiative: https://www.nist.gov/news-events/news/2026/02/announcing-ai-agent-standards-initiative-interoperable-and-secure
- NIST Agent Identity & Authority: https://www.nist.gov/news-events/news/2026/02/new-concept-paper-identity-and-authority-software-agents
- MITRE ATLAS: https://atlas.mitre.org/
- MCP authorization: https://modelcontextprotocol.io/specification/
- SPIFFE/SPIRE: https://spiffe.io/
- Software provenance/Sigstore: https://docs.sigstore.dev/
- GitHub artifact attestations: https://docs.github.com/en/actions/how-tos/secure-your-work/use-artifact-attestations
- Confidential Computing Consortium: https://confidentialcomputing.io/
- NIST PQC migration: https://pages.nist.gov/nccoe-migration-post-quantum-cryptography/


## J. Evolução incremental FORTRESS 3.1 — 27/10/2026
**Referência complementar:** [FORTRESS 3.1 — atualização de segurança verificável](./FORTRESS_V31_SECURITY_UPDATE.md).

A versão 3.1 **preserva 21 camadas / 7 domínios / 16 cápsulas**, prioriza revalidação da autorização no último momento, aprovação não expirada, contenção independente, políticas OWASP ACS, red teaming OWASP 2026, identidade NIST e plano de migração PQC. Um incremento limitado do Secure Agent Control foi implementado **na branch de revisão**, com testes automatizados aprovados no [CI #45](https://github.com/Glauston/Glauston/actions/runs/40539894848). Demais controles dependem dos gates G0–G6. Manter PR em draft até avaliação de segurança, privacidade e AUDIT; não fazer deploy/merge automático.
