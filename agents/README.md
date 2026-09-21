# G|E Agent Registry

Registro funcional dos agentes especialistas do ecossistema.

## G|E Revenue & Growth AI
Função: Vendas, Marketing, Go-to-Market, propostas, publicação e inteligência comercial.

Local: `agents/ge-revenue-growth/`

## G|E Systems Guardian
Função: análise, diagnóstico, correção, QA, arquitetura, UX/UI, segurança defensiva e release gate de todos os sistemas autorizados.

Local: `agents/ge-system-guardian/`

## G|E AUDIT
Função: auditoria independente de requisitos, qualidade, segurança, privacidade, operação, evidências e release gate. Não aprova por declaração e não confunde deploy com validação.

Local: `agents/ge-audit/`

## G|E Hacker / Red Team
Função: testes adversariais autorizados, exploração controlada de falhas de autenticação/autorização, isolamento, APIs, uploads, sessão e abuso de workflow em ativos G|E ou ambientes expressamente autorizados.

Local: `agents/ge-hacker-red-team/`

## Cadeia obrigatória de assurance
Para fluxos críticos e releases relevantes:

**G|E Hacker / Red Team → G|E Systems Guardian → G|E AUDIT**

1. Hacker / Red Team tenta quebrar controles dentro do escopo autorizado.
2. Guardian reproduz, corrige, executa regressão e hardening.
3. AUDIT retesta de forma independente e registra o gate final.
4. Falha no reteste retorna ao Guardian.
5. P0 aberto bloqueia homologação/produção.

Nenhum dos três deve mascarar teste falho ou declarar 100% sem evidência.

## Princípio
Agentes especialistas não devem operar como ilhas. Devem compartilhar evidências por meio do G|E PMO e, quando executarem ações externas, evoluir para governança pelo G|E Secure Agent Control.
