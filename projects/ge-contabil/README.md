# G|E CONTÁBIL

Plataforma contábil-fiscal multiempresa orientada por agentes, auditoria e automação segura.

## O que esta fundação já entrega
- Cadastro multiempresa/multicliente com segregação por tenant.
- Perfis: Administrador, Contador, Supervisor, Operacional e Consulta.
- Carteira de clientes e visão 360°.
- Obrigações com competência, vencimento, risco, responsável e status.
- Solicitações de documentos e histórico de cobranças.
- Agente operacional determinístico para priorizar pendências e sugerir ações.
- Geração de rascunhos de e-mail para cobrança, sempre com aprovação humana por padrão.
- Motor de regras tributárias versionado por vigência.
- Trilha de auditoria.
- Painel web simples, responsivo e sem etapa de build.
- Docker Compose com PostgreSQL.
- Estrutura de conectores oficiais para EFD-Reinf, eSocial e MIT/DCTFWeb.

## Execução local
1. Copie `.env.example` para `.env`.
2. Execute `docker compose up --build`.
3. Acesse `http://localhost:8000`.

## Usuários de demonstração
- admin@demo.local / Admin@123
- contador@demo.local / Contador@123
- operacional@demo.local / Operacional@123

**Importante:** as credenciais acima existem apenas para ambiente de demonstração/QA. Em produção devem ser removidas e substituídas por identidade corporativa, 2FA e política de senha.

## Estado de produção
Esta versão é uma fundação operacional para homologação funcional. Antes de receber dados reais de clientes, concluir os controles descritos em `docs/PRODUCTION_READINESS.md`, especialmente identidade/2FA, criptografia e cofre de segredos, backup/restore, observabilidade, LGPD, homologação dos conectores oficiais e testes de carga/segurança.
