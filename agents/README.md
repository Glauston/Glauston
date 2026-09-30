# G|E Agent Registry

Registro funcional oficial dos agentes especialistas do ecossistema G|E.

Norma obrigatória da stack: `architecture/ge-agent-stack-standard.md`.
Norma geral de excelência de software: `AGENTS.md`.

## Produto, processo e negócio
### G|E Product Owner
Requisitos, personas, regras de negócio, critérios de aceite, backlog, priorização e homologação.
Local: `agents/ge-product-owner/`

### G|E Lean Six Sigma Black Belt
DMAIC, SIPOC, VOC/CTQ, VSM, FMEA, causa raiz, desperdício, variação, indicadores e melhoria contínua.
Local: `agents/ge-lean-six-sigma-black-belt/`

### G|E Revenue & Growth AI
Vendas, Marketing, Go-to-Market, propostas, publicação e inteligência comercial, sempre respeitando o estágio técnico real.
Local: `agents/ge-revenue-growth/`

## Engenharia, UX, dados e integrações
### G|E Principal Software Engineer
Arquitetura, backend, frontend, banco, APIs, escalabilidade, migrations, compatibilidade e qualidade de engenharia.
Local: `agents/ge-principal-software-engineer/`

### G|E UX/UI Experience
Jornadas, design system, usabilidade, acessibilidade, responsividade e consistência WEB/mobile.
Local: `agents/ge-ux-ui-experience/`

### G|E Integration Architect
Contratos, adapters, APIs, webhooks, idempotência, retry, reconciliação, resiliência e observabilidade de integrações.
Local: `agents/ge-integration-architect/`

### G|E Data & AI Governance
Source of truth, qualidade, lineage, LGPD, retenção, segregação e governança de IA/agentes.
Local: `agents/ge-data-ai-governance/`

## Qualidade, entrega e operação
### G|E QA Excellence
Quality Engineering, testes positivos/negativos, integração, E2E, regressão, permissões, persistência e evidências.
Local: `agents/ge-qa-excellence/`

### G|E PMO & Delivery
Portfólio, backlog, risco, prioridade, releases, evidências, status real e controle de mudança.
Local: `agents/ge-pmo-delivery/`

### G|E Release & DevSecOps
CI/CD, ambientes, build, migrations, smoke tests, versão publicada, segurança do pipeline e rollback.
Local: `agents/ge-release-devsecops/`

### G|E SRE & Observability
Confiabilidade, SLI/SLO, logs, métricas, tracing, alertas, capacidade, backup/restore, incidentes e recovery.
Local: `agents/ge-sre-observability/`

## Segurança, assurance e conformidade
### G|E Security Architect & DevSecOps
Security/privacy by design, autenticação, autorização, multitenancy, secrets, AppSec, supply chain e hardening preventivo.
Local: `agents/ge-security-architect-devsecops/`

### G|E Hacker / Red Team
Testes adversariais autorizados, autenticação/autorização, IDOR/BOLA, isolamento, APIs, uploads, sessão e abuso de workflow.
Local: `agents/ge-hacker-red-team/`

### G|E Systems Guardian
Orquestra diagnóstico, correção, hardening, regressão e evolução técnica de sistemas autorizados.
Local: `agents/ge-system-guardian/`

### G|E AUDIT
Auditoria independente de requisitos, qualidade, segurança, privacidade, operação, evidências e release gate.
Local: `agents/ge-audit/`

### G|E ISO & QMS Readiness
ISO 9001:2026, sistemas de gestão, auditorias internas, CAPA, Evidence Pack, gap assessment e preparação para certificações aplicáveis.
Local: `agents/ge-iso-qms-readiness/`

### G|E Secure Agent Control
Control plane para governança futura das permissões, ferramentas, escopo e ações externas dos agentes.
Projeto: `projects/ge-secure-agent-control/`

## Cadeia corporativa obrigatória
Para features e releases relevantes:

**Product Owner → Lean Six Sigma → Principal Engineer → UX/UI → Data/Integration → Security Architect → Implementation → QA Excellence → Red Team (quando aplicável) → Systems Guardian → QA Regression → Red Team Retest → SRE/Release → ISO/QMS Readiness + AUDIT → Homologação → Produção → Monitoramento**

P0 aberto, regressão de requisito homologado, perda de dados, autorização indevida ou evidência insuficiente bloqueiam o release.

## Princípio
Agentes não operam como ilhas. Evidências devem ser compartilhadas pelo PMO, controladas por gates e, quando houver ações externas automatizadas, governadas pelo G|E Secure Agent Control.

Deploy não é homologação. CI verde parcial não é validação integral. Nenhum agente deve declarar 100% sem evidência reproduzível.