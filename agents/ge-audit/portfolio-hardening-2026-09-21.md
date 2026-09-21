# G|E AUDIT — Portfolio Hardening Register — 2026-09-21

## Escopo
Primeira rodada de hardening transversal do portfólio G|E, com foco em autenticação, autorização, isolamento, uploads e evidência de gates.

## Cadeia
G|E Hacker / Red Team → G|E Systems Guardian → G|E AUDIT.

## Status por sistema

### Gestão de Despesas — versão 25
- Auth de usuário final: ativa, invite-only.
- API de estado: RBAC server-side por papel mestre.
- Escopo por solicitação: colaborador/gestor/controladoria/financeiro.
- Self-test de autorização: 8/8.
- Upload de comprovante: limite 10 MB, MIME permitido, SHA-256, caminho por usuário, assinatura/magic bytes e extensão definida pelo servidor.
- Upload anônimo: bloqueado.
- Health-check público: intencional.
- Gate atual: APROVADO PARA CONTINUAR HOMOLOGAÇÃO DE SEGURANÇA; não equivale a certificação nem aprovação final de produção.

### G|E Aliança Lima — versão 2
- Auth de usuário final: ativa.
- workspace_members: read/write own declarado.
- /api/state anônimo: bloqueado.
- Pendente: visibilidade do projeto permanece personal; se o produto for para clientes externos, o owner deve mudar a visibilidade no console.
- Gate atual: APROVADO PARA CONTINUAR HOMOLOGAÇÃO.

### G|E DATA CORE
- Auth: ativa, invite-only.
- tenant_memberships: own/own.
- Rotas principais usam req.user e escopo por tenant.
- /api/dashboard anônimo: bloqueado.
- Export e API keys restritos a owner/admin no app.
- Pendente: ampliar matriz negativa de BOLA/tenant isolation e revisar todas as rotas com API key.
- Gate atual: EM HARDENING / RETESTE PENDENTE.

### G|E Férias ONE
- APIs internas protegidas por collaborator access=member.
- /api/dashboard anônimo: bloqueado; member funciona.
- Pendente P1: RBAC funcional por papel de negócio (colaborador, supervisor, coordenador, gestor, RH/admin) e escopo de dados por usuário/equipe.
- Gate atual: NÃO APROVADO PARA PRODUÇÃO.

### G|E Fiscal & Contábil ONE
- Leituras sensíveis protegidas por member.
- Escritas críticas/auditoria protegidas por admin.
- Teste: /api/summary anônimo 401; member 200; /api/audit como member 403.
- Pendente P1: tenancy/app-level RBAC, segregação por organização, trilha completa e requisitos fiscais por integração.
- Gate atual: NÃO APROVADO PARA PRODUÇÃO.

### G|E Recupera
- Leituras protegidas por member.
- Escritas críticas protegidas por admin.
- Teste: oportunidades anônimo 401; member 200.
- Pendente: app-level RBAC, isolamento por carteira/empresa e trilha de alterações.
- Gate atual: HOMOLOGAÇÃO CONTROLADA.

### G|E Secure
- Dashboard/findings protegidos por member.
- Teste: dashboard anônimo 401; member 200.
- Pendente: restringir operações mutáveis por papel administrativo e formalizar segregação de organizações.
- Gate atual: HOMOLOGAÇÃO CONTROLADA.

### Nazareno Philadelphia
- Auth de usuário final: ativa, invite-only.
- Tabelas pessoais sermons/sermon_ideas/app_profiles: own/own.
- /api/bootstrap anônimo: bloqueado.
- Rotas de dados usam perfil e ownership quando aplicável.
- Pendente: revisão completa de permissões ministeriais, junta, financeiro e dados sensíveis de membros.
- Gate atual: HOMOLOGAÇÃO CONTROLADA.

### G|E Billing & Integration Hub
- Projeto sem aplicação implantada (versão 0).
- Não há superfície funcional para pentest.
- Gate atual: NÃO AUDITÁVEL AINDA.

## Bloqueadores transversais para produção
1. P0/P1 de autorização devem estar fechados e retestados.
2. Cada SaaS multiempresa deve provar isolamento de tenant.
3. RoPA, base legal, retenção, direitos do titular e fornecedores precisam existir por produto.
4. Backup/restore e DR precisam de evidência executada.
5. Logs de segurança e operações críticas precisam de retenção e revisão.
6. Release deve manter changelog, rollback e evidência de testes.
7. Termo "certificado ISO" só pode ser usado com certificação formal válida no escopo.

## Próxima ordem de correção
1. Gestão de Despesas — concluir Red Team e pacote LGPD/evidence.
2. Férias ONE — implementar RBAC de negócio.
3. Fiscal & Contábil ONE — tenancy + RBAC + trilha fiscal.
4. DATA CORE — BOLA/tenant isolation + API keys/webhooks.
5. Nazareno — papéis e privacidade de membros/financeiro.
6. Recupera e Secure — app-level RBAC e isolamento.
7. Billing Hub — construir baseline segura desde o primeiro endpoint.
