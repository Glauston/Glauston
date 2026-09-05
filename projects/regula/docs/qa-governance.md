# REGULA QA — Governança de Qualidade

## Missão
Garantir que nenhuma versão do REGULA seja promovida para homologação ou produção sem evidência suficiente de qualidade funcional, regulatória, técnica, de segurança e experiência do usuário.

## Escopo do QA
- Regras PAT/VA/VR e respectivos cenários de borda.
- APIs e contratos de integração.
- Fluxos Free, Pro, Business e Enterprise.
- Onboarding, autenticação, permissões e multiempresa.
- Contract AI e respostas explicáveis.
- Trilhas de auditoria e evidências.
- Pagamentos, upgrade, downgrade e cancelamento.
- REGULA Agent e limites de autonomia.
- App mobile, web e responsividade.
- Performance, disponibilidade e observabilidade.
- Segurança, LGPD e segregação de dados.

## Gates obrigatórios
### Gate 1 — Build
- Compilação sem erro.
- Lint e testes unitários aprovados.
- Sem segredo versionado.

### Gate 2 — Funcional
- Cenários críticos aprovados.
- Zero defeitos bloqueadores.
- Evidências de teste anexadas.

### Gate 3 — Regulatório
- Toda regra alterada possui fonte, versão, vigência, teste positivo e teste negativo.
- Nenhuma regra crítica pode ser ativada sem revisão.

### Gate 4 — Segurança
- Autorização e autenticação validadas.
- Tenant isolation validado.
- Testes contra IDOR, privilege escalation, injection e exposição indevida.
- Logs não armazenam segredos ou dados excessivos.

### Gate 5 — UX
- Fluxos principais testados em mobile e desktop.
- Erros acionáveis e compreensíveis.
- Nenhum dead-end nos fluxos essenciais.

### Gate 6 — Release
- Smoke tests aprovados.
- Plano de rollback disponível.
- Migração de banco reversível ou mitigada.
- Monitoramento ativo.

## Severidade
- P0 Blocker: risco de segurança, corrupção de dados, erro regulatório material, indisponibilidade total. Bloqueia release.
- P1 Critical: fluxo essencial quebrado, autorização incorreta, cobrança incorreta. Bloqueia release.
- P2 Major: impacto relevante com workaround. Exige decisão formal para release.
- P3 Minor: impacto limitado. Pode seguir com backlog.

## Critério para produção
Produção somente com P0=0 e P1=0. P2 exige aceite documentado e responsável definido.

## REGULA QA Agent
O agente de QA poderá:
1. Gerar casos de teste a partir de requisitos e regras.
2. Comparar comportamento esperado x observado.
3. Detectar regressões.
4. Produzir relatório de release.
5. Abrir issues automaticamente com evidências.
6. Recomendar bloqueio de release.

O agente NÃO poderá sozinho:
- aprovar mudança regulatória crítica;
- ignorar P0/P1;
- alterar evidências de teste;
- promover produção sem gate humano/configurado.

## Matriz mínima de testes por regra regulatória
Cada regra precisa conter:
- identificador único;
- fonte normativa;
- vigência;
- condição de aplicação;
- resultado esperado conforme;
- resultado esperado não conforme;
- limites e arredondamentos;
- teste de ausência de dados;
- teste de dados inválidos;
- teste de regressão.

## Definition of Done
Uma funcionalidade só está concluída quando código, testes, documentação, observabilidade e regras de acesso estiverem consistentes.
