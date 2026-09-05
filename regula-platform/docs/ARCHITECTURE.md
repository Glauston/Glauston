# REGULA — Arquitetura v0.1

## Objetivo arquitetural

Construir uma plataforma regulatória desacoplada, auditável e extensível, capaz de receber novos domínios sem reescrever o núcleo.

## Visão lógica

```text
[ Web / Mobile / White-label ]
            |
       [ API Gateway ]
            |
  +---------+----------+
  |                    |
[Identity]        [REGULA API]
                       |
    +------------------+-------------------+
    |                  |                   |
[Rules Engine] [Case/Risk Engine] [Evidence Engine]
    |                  |                   |
[Rule Store]      [Workflow]          [Audit Ledger]
    |                  |                   |
    +---------+--------+-------------------+
              |
        [Data Platform]
              |
   +----------+-----------+--------------+
   |                      |              |
Transactions           Contracts      Merchants
   |                      |              |
   +---------- Integrations / ETL -------+
```

## Stack inicial recomendada

- Backend: .NET 9 / ASP.NET Core.
- Banco transacional: PostgreSQL.
- Cache: Redis.
- Eventos: abstraction de event bus; Kafka/RabbitMQ em escala.
- Frontend: Next.js + TypeScript.
- Object storage: S3-compatible para documentos/evidências.
- Observabilidade: OpenTelemetry.
- Autenticação: OIDC/OAuth2, preparada para SSO corporativo.

## Bounded contexts

### Identity & Tenant
Organizações, usuários, papéis, escopos, políticas e segregação multi-tenant.

### Regulatory Knowledge
Normas, fontes, artigos, obrigações, vigência, versões e relacionamentos.

### Rules Engine
Regras executáveis, parâmetros, versão, vigência, severidade, explicação e testes.

### Transactions
Ingestão, normalização, validação e análise de transações, taxas e liquidações.

### Contracts
Documentos, cláusulas extraídas, obrigações, divergências e revisão humana.

### Cases & Risks
Ocorrências, score, exposição, responsáveis, SLA, workflow e resolução.

### Evidence & Audit
Evidências vinculadas a cada decisão, hash, origem, versão da regra, usuário/agente e timestamp.

### AI
RAG regulatório, explicação, classificação e recomendação com guardrails. A IA não altera regra oficial silenciosamente.

## Segurança

- tenant_id obrigatório em entidades de negócio.
- autorização deny-by-default.
- RBAC + políticas contextuais.
- criptografia em trânsito e em repouso.
- secrets fora do código.
- PII minimizada e tokenizada quando possível.
- logs de segurança separados de logs funcionais.
- trilha append-only para eventos regulatórios críticos.
- importações com validação, quarantine e idempotência.

## Modelo de decisão

Toda ocorrência deve conseguir responder:

1. Qual regra foi aplicada?
2. Qual versão estava vigente?
3. Qual dado acionou a regra?
4. Qual evidência sustenta a conclusão?
5. Qual foi a severidade e o impacto?
6. Houve intervenção humana?
7. Quem alterou o status e quando?

## Extensibilidade

O núcleo não deve conhecer PAT por código fixo. PAT será um pacote de domínio carregado pelo Rules Engine. Isso permitirá futuros pacotes como pagamentos, frotas, contratos públicos ou outras regulações.
