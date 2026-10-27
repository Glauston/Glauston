# G|E Secure — Red Team Arena + Auditoria Técnica Preliminar
**Data:** 27/10/2026  
**Alvo:** G|E Secure Agent Control MVP (Node.js)  
**Ambiente:** servidor HTTP efêmero `127.0.0.1` em GitHub Actions, banco `MemoryStore`, tenants/identidades 100% sintéticos  
**Status:** correções básicas RETESTADAS; **NÃO HOMOLOGADO PARA PRODUÇÃO**.

## 1. Escopo, autorização e limites
- Exercício solicitado pelo proprietário do projeto para validar controles de segurança em um ambiente de teste isolado.
- Não houve exploração de infraestrutura real de clientes, ataques de rede externos, coleta de dados reais, credential stuffing, ransomware ou varredura de terceiros.
- O alvo foi a API real do MVP, executada dentro do runner temporário de CI.
- A verificação é interna e limitada ao escopo dos cenários automatizados; **não é pentest independente, certificação ISO, auditoria externa nem prova de proteção integral**.

## 2. Cadeia de defesa executada
1. **Hacker / Red Team:** criou a arena isolada com contas falsas, acessou a API por identidade simulada e tentou ações fora do perfil.
2. **Achados:** dois desvios reproduzíveis de autorização de operações administrativas.
3. **Guardian / remediação:** adicionou validação server-side dos perfis e vinculação criptográfica da função à identidade do trusted proxy; alterou apenas a branch draft.
4. **Hacker / reteste:** cenários originais executados novamente e ampliados.
5. **AUDIT / revisão preliminar:** analisou evidências de CI, código modificado, regressão e riscos remanescentes; recomendou manter gate de produção **REPROVADO até auditoria independente**.

## 3. Evidência antes da correção — reproduções no laboratório
Execução [CI #48](https://github.com/Glauston/Glauston/actions/runs/40551666987), commit `6388ccc62431ec1c9920063b31642bee56cb2ff8`.

| Teste | Esperado | Observado antes | Classificação para release |
|---|---|---|---|
| RT-01 anônimo acessa auditoria | 401 | 401 | protegido no cenário |
| RT-02 adulteração de identidade assinada | 401 | 401 | protegido no cenário |
| RT-03 identidade tenant B consulta tenant A | 404 | 404 | protegido no cenário |
| **RT-04 viewer publica política** | **403** | **201** | **P0: autenticação sem autorização administrativa** |
| **RT-05 viewer desativa Kill Switch** | **403** | **200** | **P0: controle de incidente pode ser desativado por ator indevido** |

**Resultado inicial:** 18 testes executados; 16 passaram e 2 reprovaram. Os dois P0 significam risco de liberação **caso endpoints equivalentes sejam expostos num deployment sem proteção compensatória**. Não há alegação de que um atacante externo tenha explorado um ambiente publicado.

### Causa-raiz
A implementação do modo `trusted-proxy` autenticava tenant/actor com HMAC, mas não propagava uma função assinada nem exigia verificação de RBAC server-side nas rotas sensíveis. Assim, uma identidade autenticada do mesmo tenant podia acionar operações administrativas sem autorização por papel.

## 4. Guardian — remediação nesta branch
Commit de correção: `60e561da2b86cbc9f41af2c25ee89acb04588b6d`; testes ampliados até commit `e54ceafc91c8f8fa44879addbd4c6d45a40a7d9e`.

- Novo `actorRole` obrigatório com conjunto permitido: `VIEWER`, `OPERATOR`, `SECURITY_ADMIN`, `APPROVER`, `AUDITOR`.
- A assertion HMAC trusted-proxy agora autentica `tenantId.actorId.actorRole.ts`; alterar a função sem reassiná-la deve gerar 401.
- `SECURITY_ADMIN` administra políticas, cadastro, Kill Switch; `APPROVER` avalia aprovações; `AUDITOR` vê evidências; `OPERATOR` avalia/executa ações; `VIEWER` não recebe acesso a rotas privilegiadas.
- Tentativas de executar funções fora do papel recebem 403.
- Exige adaptação do gateway/IdP para emitir e assinar o papel; a mudança de contrato é **incompatível com as assertions anteriores** e deve ser homologada antes de implantar.
- O `AUTH_MODE=dev` lê função via cabeçalho exclusivamente em laboratório, **nunca é identidade confiável em rede externa/produção**.

## 5. Reteste — evidência
Execução [CI #52](https://github.com/Glauston/Glauston/actions/runs/40551962366), commit `e54ceafc91c8f8fa44879addbd4c6d45a40a7d9e`.

- `npm run check`: **aprovado**.
- `npm test`: **23/23 aprovados**, incluindo os casos iniciais de vulnerabilidade e cenários adicionais:
  - RT-06: viewer não consegue ler auditoria;
  - RT-07: alteração de papel numa identidade assinada é rejeitada;
  - RT-08: administrador válido consegue publicar política;
  - RT-09: viewer não consegue executar ferramenta;
  - RT-10: tenant B não pode desativar Kill Switch do tenant A.
- O controle de acesso reforçado foi comprovado **nesses cenários de teste**, não em todos os fluxos possíveis.

## 6. Matriz de riscos residuais e gate
| Item pendente | Prioridade | Evidência exigida para avançar |
|---|---|---|
| Confiar apenas no gateway IdP que autentica e autoriza o papel, sem headers falsificáveis | P0 | teste com IdP/proxy corporativo, TLS, RBAC externo e segregação de funções |
| Persistência de estados, aprovações e log fora do `MemoryStore` | P0 | Postgres transacional + RLS + restauração + controles de concorrência |
| Gestão de segredos e rotação/replay da assertion (janela 5 minutos) | P0 | cofre, rotação, audiência, proteção contra replay quando aplicável |
| Restrições granulares por missão, recurso, tenant, owner, finalidade e ação, além de papel | P0/P1 | matriz ABAC executada em API e ferramentas |
| Idempotência distribuída e corrida entre verificação e execução (TOCTOU) | P1 | testes concorrentes, locks e revogação durante execução |
| Injeção de prompt via OCR, arquivo, e-mail, memória e MCP | P1 | red-team com dados sintéticos e isolamento |
| Controle de egress, sandbox, rede e credenciais efêmeras | P1 | laboratório de contenção e telemetria |
| SAST, SCA, SBOM, pentest externo, privacidade/LGPD, continuidade | P1 | resultados assinados, tratamento de achados e reteste |

## 7. Parecer G|E AUDIT (preliminar, sem independência formal)
**Resultado técnico restrito:** melhoria implementada e retestada com sucesso em CI, incluindo regressões anteriores.  
**Gate de homologação:** adequado para **continuar testes controlados em staging isolado**.  
**Gate de produção:** **REPROVADO/PENDENTE** até resolver P0, validar ambiente real e obter auditoria independente.  
**Aceite de risco:** não realizado; depende do responsável humano competente.  
**Conformidade:** nenhuma certificação alegada.

## 8. Próxima rodada sugerida (somente sistemas próprios/autorizados)
- Validar fluxos de operadores e aprovadores com múltiplos tenants e estado da missão.
- Executar ataques controlados de BOLA/IDOR, prompt injection indireto e tool-result injection com entradas sintéticas.
- Exercitar contenção por rede isolada, interrupção, retenção e recuperação.
- Submeter relatório e provas a revisor independente antes de liberar qualquer ambiente comercial.

**Referências de código:** `src/server.js`, `tests/red-team-arena.test.js` e `tests/core.test.js`.
