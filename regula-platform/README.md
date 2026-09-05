# REGULA

**Regulatory Intelligence Platform**

> Da norma à conformidade, automaticamente.

REGULA é uma plataforma de inteligência regulatória projetada para transformar normas, contratos e dados operacionais em regras verificáveis, riscos explicáveis, evidências de auditoria e ações corretivas.

## Primeiro domínio: PAT / VA / VR

O primeiro pacote regulatório será focado no Programa de Alimentação do Trabalhador e no ecossistema de vale-alimentação e vale-refeição.

## Princípios do produto

1. **API-first** — grandes players podem integrar sem substituir seus sistemas.
2. **Multi-tenant** — segregação lógica por organização desde a origem.
3. **Rules-as-data** — regras regulatórias são versionadas e não ficam presas à interface.
4. **Evidence-first** — toda conclusão relevante deve apontar regra, dado analisado, versão e evidência.
5. **Explainable AI** — IA recomenda e explica; decisão regulatória crítica deve permanecer rastreável.
6. **Security by design** — RBAC/ABAC, criptografia, logs, LGPD e princípio do menor privilégio.
7. **Human-in-the-loop** — ocorrências podem exigir revisão e aprovação humana.
8. **Auditability** — histórico imutável de regras, análises, decisões e correções.

## Módulos

- REGULA Executive — score, riscos, exposição e prioridades.
- REGULA Engine — motor de regras regulatórias versionadas.
- REGULA Transactions — análise de transações e liquidações.
- REGULA Contracts — análise contratual assistida por IA.
- REGULA Merchants — elegibilidade, categorização e risco de estabelecimentos.
- REGULA Audit — evidências, histórico e pacotes de auditoria.
- REGULA AI — agente regulatório e explicação das ocorrências.
- REGULA API — integração com emissores, adquirentes, empregadores e parceiros.

## Estrutura inicial

```text
regula-platform/
├── README.md
├── docs/
│   ├── ARCHITECTURE.md
│   ├── PRODUCT.md
│   └── SECURITY.md
├── rules/
│   └── pat/
│       └── v0.1/
├── src/
│   └── Regula.Api/
└── database/
    └── schema.sql
```

## Status

**v0.1 — Fundação**

Objetivo: disponibilizar a primeira jornada demonstrável completa:

`empresa → dashboard → ocorrência → regra → evidência → impacto → ação → responsável → resolução → auditoria`

## Roadmap

- v0.1: fundação + PAT rules engine + API + dados simulados.
- v0.2: dashboard executivo + central de riscos + auditoria.
- v0.3: Contract AI + merchant intelligence.
- v0.4: integrações e importação em lote.
- v0.5: piloto corporativo.
- v1.0: produção, observabilidade, SSO, governança e controles enterprise.

---

Projeto privado e estratégico G|E. Não inserir dados reais, segredos ou credenciais no repositório.