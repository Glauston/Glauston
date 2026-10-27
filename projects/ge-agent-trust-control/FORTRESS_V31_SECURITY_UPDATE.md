# G|E SECURE FORTRESS 3.1 — Atualização de Segurança Verificável
**RFC incremental — 27/10/2026 | Status: EM REVISÃO / NÃO HOMOLOGADO**

> Complementa `FORTRESS_V3_ARCHITECTURE.md`. Mantém **21 camadas, 7 domínios e 16 cápsulas**. Não equivale a implantação integral, certificação, auditoria independente ou produção segura. Alterações de implementação só podem avançar mediante testes, revisão de arquitetura e gates documentados.

## 1. Objetivo
Converter a arquitetura FORTRESS 3.0 em controles verificáveis durante a execução, inspirados por avanços publicados em 2026. Segurança é **capacidade de impor limites mesmo quando a instrução do agente é maliciosa ou uma proteção interna falha**, não apenas detectar conteúdo adversarial.

**Cadeia obrigatória:** Hacker autorizado (evidencia) -> Guardian (corrige/contém) -> AUDIT independente (retesta e decide) -> aprovação humana de release. O agente não pode alterar, aprovar e certificar suas próprias políticas.

## 2. Atualizações internacionais aplicáveis e alcance
| Referência | Publicação | Aprendizado para o produto |
|---|---|---|
| OpenAI, contenção de ambientes de modelos | 23/10/2026 | Defense-in-depth com VM/sandbox, egress, perímetro cloud e testes partindo da hipótese de falha da sandbox; verificar canais indiretos de comunicação |
| OWASP GenAI Red Teaming Manual v1.0 | 20/10/2026 | Método em oito fases, evidência reproduzível, risco e remediação; executar somente em staging autorizado |
| OWASP Agent Control Standard (ACS) | 01/09/2026 | Hooks de enforcement, políticas declarativas independentes do agente/framework e controles em runtime |
| NIST NCCoE agent identity | 29/09/2026 | Identidade, autenticação e delegação de software/agentes comprováveis; identidade humana não substitui a do agente |
| NIST IR 8547 | 10/2026 | Inventário criptográfico e migração planejada para criptografia pós-quântica, por criticidade |

Fontes primárias:
- https://openai.com/index/securing-our-frontier-model-training-environment/
- https://genai.owasp.org/resource/genai-red-teaming-manual-version-1-0/
- https://genai.owasp.org/resource/agent-control-standard-acs/
- https://www.nist.gov/news-events/news/2026/09/comments-software-and-agentic-ai-identity-concept-paper
- https://csrc.nist.gov/pubs/ir/8547/final

## 3. Cinco mudanças prioritárias — sem aumentar camadas por marketing
### F31-01 Autoridade por missão, propósito e estado de processo [L02-L06; C01-C04]
- Cada missão futura exigirá `agent_id`, identidade do delegador, `tenant_id`, `mission_id`, propósito, ferramentas permitidas, limites de ação/valor, estado válido, `issued_at`, `expires_at`, versão de política e revogação.
- PDP/PEP fora do modelo; decisão `allow/deny/escalate` verificada imediatamente antes da execução e após mudanças de contexto relevantes.
- Reavaliar após troca de política, revogação de grant, mudança de papel, suspensão do agente ou expiração de aprovação.
- Plano de implementação: token/capability efêmero vinculado a audiência, contexto e missão; não transformar texto de prompt em permissão.
- **Estado:** modelo de missão completa ainda projetado, NÃO implementado integralmente.

### F31-02 Contenção externa à sandbox e testes de falha assumida [L07-L09,L16-L18; C05-C07,C12,C16]
- Controles independentes por isolamento de processo/VM, rede de saída com allowlist, proteção cloud/tenant e deteção em múltiplas camadas; aplicabilidade condicionada à infraestrutura usada.
- Testes não ofensivos em ambiente de laboratório simulam comprometimento interno prévio para provar que egress, credenciais e perímetro externo continuam bloqueando comunicação proibida.
- Negar por padrão acesso a metadados cloud, endpoints internos não autorizados, redes de outros tenants e ferramentas fora da missão.
- Interrupção independente do agente, contenção progressiva e ensaio de recuperação; não executar ataques contra infraestruturas de terceiros.
- **Estado:** arquitetura/testes especificados; implantação de VM e isolamento físico/rede NÃO comprovada.

### F31-03 Entrada, memória e MCP como dados não confiáveis [L06,L10-L12; C04,C08-C09]
- Fontes recuperadas, anexos, OCR, e-mails, pesquisas, memória e respostas MCP não podem modificar políticas nem instruções de sistema.
- Exigir proveniência e versão de ferramenta, schema de argumentos, confirmação de destino, redaction e validação externa ao LLM.
- Aplicar quarentena a material suspeito, revogar capability em ferramenta comprometida e evitar propagação para outros agentes.
- **Estado:** testes de prompt injection, memory poisoning e tool-result injection A DEFINIR/EXECUTAR.

### F31-04 Limite coletivo e consequências [L13-L15; C10-C12]
- Autoridade coletiva de um swarm nunca supera delegação original: quotas, limitação de profundidade, fan-out, orçamento e finalidade.
- Para finanças, fiscal, publicações, deleção e ações difíceis de reverter, exigir análise de consequência e aprovação humana apropriada.
- Guardrail comportamental não substitui controle determinístico por endpoint.
- **Estado:** desenho; orçamento coletivo e grafo de consequências não homologados.

### F31-05 Recibo verificável e auditoria contínua [L19-L21; C13-C16]
- Evidência minimizada com `trace_id`, ator, agente, tenant, missão, policy/version, destino, hash de argumentos, decisão, aprovador, motivo, timestamp e resultado.
- Separar integridade por hash de imutabilidade real: armazenamento transacional, segregação de acesso e trilha protegida continuam pré-requisitos.
- AUDIT deve validar os gates após mudança de modelo, política, MCP, integrador, tenant ou infraestrutura.
- **Estado:** ledger em memória encadeado já existe no MVP, mas persistência imutável/externa e validação independente permanecem pendentes.

## 4. Incremento técnico introduzido nesta branch (escopo estrito)
Em `projects/ge-secure-agent-control`:
- `executeAuthorized` verifica novamente decisão original, status do agente e da ação e política vigente antes de chamar um executor;
- nega autorização antiga se houver nova negação ou alteração da regra/política selecionada;
- exige aprovação vigente e não expirada no momento da execução, inclusive após ter sido previamente aprovada;
- preserva kill switch e idempotência existentes;
- novos testes negativos automatizados para autorização negada, revogação posterior, aprovação expirada e kill switch após aprovação.

**Limites conhecidos:** MVP usa `MemoryStore`, não é gateway distribuído/transacional, nem aplica ainda identidade de workload forte, política de missão completa, egress via rede ou enforcement em todos os conectores. A validação de autorizações administrativas e integração corporativa com IdP/PAM são gates P0; este incremento não resolve essa integração. O CI automatizado passou no GitHub Actions em 27/10/2026 (\`npm run check\` e \`npm test\`; [execução #45](https://github.com/Glauston/Glauston/actions/runs/40539894848)). Isso comprova apenas as verificações da suíte atual, não a homologação de segurança ou de produção.

## 5. Matriz de aceitação para Hacker, Guardian e AUDIT
| ID | Cenário autorizado de teste | Resultado exigido | Prioridade |
|---|---|---|---|
| FT01 | Requisição negada tenta executar posteriormente | Deny; zero execução | P0 |
| FT02 | Uma política é revogada após decisão inicial | Deny e necessidade de reavaliação | P0 |
| FT03 | Aprovação expira entre autorização e execução | Deny; trilha registrada | P0 |
| FT04 | Kill switch é ativado após aprovação | Nenhuma nova chamada à ferramenta | P0 |
| FT05 | Agente ou ação é desativado | Negar execução | P0 |
| FT06 | Tenant A tenta acessar ação/registro do tenant B | Deny, sem vazamento | P0 |
| FT07 | Um usuário não autorizado tenta publicar política ou desligar contenção | Deny server-side | P0 |
| FT08 | Política indisponível em operação crítica | Fail closed | P0 |
| FT09 | Documento/anexo/OCR contém instrução de escalada | Tratar como dado; sem ampliação de authority | P1 |
| FT10 | Ferramenta MCP retorna instruções não confiáveis | Rejeitar mudança de política/destino | P1 |
| FT11 | Sandbox interna hipoteticamente falhou | Perímetro e egress ainda negam destinos proibidos | P1 |
| FT12 | Comunicação não autorizada entre agentes/tenants | Bloqueio em rede, ferramenta e armazenamento | P1 |
| FT13 | Swarm tenta repartir uma operação acima da quota | Rejeitar soma excedente | P1 |
| FT14 | Segredo aparece em resultado, log ou erro | Redaction e incidente rastreado | P1 |
| FT15 | Update de dependência/artifact não atestado | Bloquear publicação pelo gate | P1 |
| FT16 | Simulação de restore e compensação | Evidência de RTO/RPO, integridade e reversibilidade | P1 |
| FT17 | Inventário de certificados, TLS e assinaturas | Plano PQC priorizado aprovado | P2 |

Legenda: os testes FT01–FT04 são adicionados ao código do MVP nesta branch; **a execução automatizada foi concluída com sucesso no GitHub Actions (run #45)**. FT05–FT17 são **itens de backlog**, não testes comprovadamente executados.

## 6. Release gates e sequência de implantação
- **G0 — Inventário real:** versão, código, env, branches, CI, dependências, fluxos de privilégio e dados; evidenciar lacunas.
- **G1 — Threat model:** fronteiras, atores, missão, integrações MCP, classes de dados, superfície cross-tenant, modelo de consequências e RACI.
- **G2 — Implementação mínima segura:** RBAC administrativo server-side; persistência transacional; PEP fora do LLM; privilégios mínimos; credenciais efêmeras; logs protegidos.
- **G3 — Testes:** FT01–FT17 conforme escopo, SAST, SCA, SBOM, regressão e demonstrações negativas com dados sintéticos.
- **G4 — Auditoria independente:** Hacker entrega evidências; Guardian corrige; AUDIT retesta. P0 aberto bloqueia.
- **G5 — Piloto restrito:** começar com 1–3 agentes de baixo impacto e efeitos reversíveis em staging Cliente Zero.
- **G6 — Produção controlada:** aprovação humana de release, rollback testado, plano de incidentes, SLO e monitoramento.

Nenhum teste ofensivo é autorizado por este documento por si só. Não usar ambientes, dados ou credenciais de clientes sem escopo e consentimento específicos.

## 7. Prioridades e entregáveis
1. **P0 imediato — Segurança de execução:** verificar CI e cobertura, reforçar autorização administrativa, revalidação de grants e workflow de aprovação, documentar evidências e corrigir qualquer regressão.
2. **P0 — Fundamentos de produção:** IdP, RLS, PostgreSQL transacional, gestão de segredos, backups e observabilidade; sem auto-merge.
3. **P1 — Cápsulas de isolamento e confiança:** tool/MCP boundary, memória/dados não confiáveis, egress/network, contenção em laboratório.
4. **P1 — AUDIT demonstrável:** evidence pack por produto e gatilho de recertificação por mudança.
5. **P2 — PQC e inovação:** crypto-inventory, prova de conceito de migração, Consequence Twin experimental, simulações multiagentes com critérios mensuráveis.

### Métricas mínimas
- % de chamadas críticas cobertas por PEP, % de políticas com owner e vencimento;
- FT pass/fail com hash de commit, ambiente e timestamp;
- MTTA/MTTC em exercícios autorizados, falso bloqueio, falhas de deny-by-default;
- cobertura de auditoria e tempo de revogação efetiva;
- zero conclusões de conformidade ou certificação sem prova auditável.

## 8. Estado de aprovação
**Design aprovado como direção de trabalho não significa código testado ou ambiente homologado.**
Registro: RFC no PR #20, manter como **draft** até evidência de testes CI e revisão de arquitetura, privacidade e AUDIT. Não publicar em produção nem promover para certificado automaticamente.
