# G|E Ecosystem Evolution Roadmap — Radar-Driven Architecture

Atualização: 05/10/2026

## Objetivo
Transformar descobertas do G|E RADAR GLOBAL em uma arquitetura coerente, versionada e comercializável, evitando proliferação de módulos isolados.

## Princípio central
O ecossistema G|E deve operar como um closed loop:

RADAR detecta mudança → Legal/Regulatory Watch valida → MAESTRO cria missão → motor especializado interpreta/aplica → Secure Agent Control autoriza → Guardian observa/contém → Data Core preserva estado/linhagem/evidência → AUDIT comprova → NEXUS acompanha cliente/impacto → melhoria retorna ao roadmap.

---

## Camadas do ecossistema

### 1. NEXUS — relacionamento, clientes e impacto
Responsabilidades:
- visão 360° de clientes públicos e privados;
- carteira, funil, produtos, atividades, faturamento e histórico;
- identificação de clientes impactados por mudança regulatória;
- abertura e acompanhamento de tratativas;
- integração com MAESTRO, Fiscal ONE e demais produtos;
- multiempresa, RBAC/ABAC e trilha de acesso.

### 2. MAESTRO — orchestration & durable execution
Evolução prioritária:
- Durable Agent Runtime;
- mission state + checkpoint + event queue;
- idempotency key por efeito externo;
- retry, resume, compensate e rollback;
- human approval gates;
- model-agnostic orchestration;
- Closed-Loop Agent Operations;
- Fleet/Agent Inventory;
- Multi-Agent Composite Authority;
- capability risk tiering;
- model placement LOCAL / PRIVATE / PUBLIC CLOUD.

### 3. G|E Secure Agent Control — autoridade e governança
Componentes prioritários:
- Agent Identity Passport;
- Delegated Human Authority;
- Authority Continuity Engine;
- Purpose-Bound Agent Permissions;
- READ / REASON / ACT / EXPORT / DELEGATE separation;
- Capability Broker / Capability Cloaking;
- Credential Broker com credenciais efêmeras;
- Privileged Agent Access Management (PAAM);
- Just-in-Time Authority;
- Financial Commit Authority;
- Physical Action Authority;
- External Authorization Boundary;
- Agent Network Control Plane;
- Data Egress Guard;
- Skill / Plugin / MCP Supply-Chain Security;
- Agent Gateway Security Boundary;
- Agent Privacy & Consent Control Plane;
- Consent Propagation;
- Crypto & Identity Inventory;
- Crypto-Agility / PQC Readiness.

### 4. Guardian — independent enforcement & runtime defense
Diretriz: Agent != Security Authority.

Capacidades:
- Independent Guardian Plane;
- out-of-band enforcement;
- behavior analytics / behavioral baseline;
- drift detection;
- egress/network anomaly detection;
- kill switch individual e por árvore de delegação;
- quarantine / revoke / reduce capability;
- sandbox escape containment;
- disposable agent environments;
- physical safety boundary;
- independent telemetry/evidence;
- agent incident detection;
- trajectory forensics.

### 5. G|E Data Core — governed state, lineage & evidence
Evolução:
- Agent Data Capsules;
- memory classes: semantic / episodic / procedural / operational;
- Evidence Trust / Provenance Layer;
- immutable/versioned evidence;
- cryptographic lineage;
- regulatory version lineage;
- consent/deletion propagation lineage;
- Payment ↔ Tax Reconciliation Ledger;
- Tax Deduction Ledger;
- tenant isolation;
- data products with policy-as-data;
- metering/billing for data/API/agent usage.

### 6. G|E AUDIT — assurance, evidence & readiness
Pacotes:
- Agent Security Assessment;
- Agent Exposure Assessment;
- AI Gateway & Runtime Assessment;
- Agent Workaround Testing;
- Sandbox Escape Assessment;
- Agent Incident Readiness;
- Agent Privacy & LGPD Readiness;
- PQC Readiness Assessment;
- Physical AI Safety Assessment;
- Regulatory Calculation Evidence;
- immutable audit evidence packages.

---

## Fiscal ONE / Contábil — Tax & Regulatory Decision Infrastructure

### Núcleo
- Client Tax DNA;
- Deterministic Tax Rules Engine;
- Tax Legal Knowledge Engine;
- Regulatory Knowledge Graph;
- Tax Decision Intelligence;
- Fiscal/Contábil integration;
- versioned official-source rules;
- legal/technical evidence;
- human review for critical decisions.

### Priority regulatory engines
1. National DFe Regulatory Gateway:
   - NF-e / NFC-e / NFS-e / CT-e / MDF-e / NFCom / BP-e / NF3-e / NFAg / NFGas.
2. Municipal Regulatory Overlay Engine.
3. DeRE & Special Tax Regimes Engine.
4. Split Payment Integration Gateway.
5. Payment ↔ Tax Reconciliation Ledger.
6. Simples Hybrid Decision Engine / Simples 2027 Simulator.
7. Global Minimum Tax / GloBE Engine.
8. Logistics Regulatory Engine / ANTT Freight Compliance.
9. Regulatory Trigger Engine.
10. High-Volume Fiscalization layer for platforms/marketplaces when officially defined.

### Fiscal operating rule
AI interprets/orchestrates; deterministic, versioned engines calculate and enforce critical fiscal rules.

---

## Private / Sovereign AI deployment

Supported target modes:
- G|E Cloud;
- Private Cloud;
- Customer Datacenter;
- Sovereign/Air-Gapped;
- G|E Private Agent Node.

Requirements:
- no mandatory external-cloud dependency;
- local model support;
- private runtime;
- policy-controlled egress;
- local evidence and audit;
- hardware-agnostic deployment;
- optional integration with NVIDIA/OpenShell/DPUs or equivalent controls.

---

## Commercial packages

### G|E Agent Security Enterprise
Secure Agent Control + Guardian + AUDIT + Data Core telemetry.

### G|E Agent Exposure Assessment
Discover agents, MCPs, tools, owners, privileges, credentials, data access, egress and kill-switch readiness.

### G|E Private AI Appliance
Validated hardware + local models + MAESTRO + Secure + Guardian + Data Core + AUDIT.

### G|E Fiscal ONE Start / MEI
Simple onboarding, fiscal docs, billing, receivables/payables, expenses, cash view and accountant-ready organization.

### G|E Fiscal ONE Simples
NFS-e/API, municipal rules, IBS/CBS preparation, reconciliation, simulator and evidence.

### G|E Fiscal ONE Enterprise / Embedded API
Tax engine + DFe Gateway + DeRE + Split Payment + reconciliation + audit for ERPs, software houses, BPOs, integrators and PSPs.

### G|E GloBE Readiness & Calculation
For multinational tax teams, advisors and BPOs.

### G|E Logistics Regulatory API
ANTT floor price, CIOT-related controls, temporal rule versioning and evidence.

---

## Priority sequence

### P0 — build / harden now
- Agent Identity Passport;
- Delegated Human Authority;
- Durable Agent Runtime;
- Independent Guardian Plane;
- Data Egress Guard;
- Agent Network Control;
- Agent Data Capsules;
- National DFe Regulatory Gateway;
- Split Payment Gateway;
- Payment ↔ Tax Reconciliation Ledger;
- DeRE Adapter;
- Municipal Regulatory Overlay;
- Regulatory Auto-Update workflow;
- QA/regression gates;
- immutable evidence.

### P1 — next commercialization wave
- Agent Exposure Assessment;
- AI Gateway & Runtime Assessment;
- Agent Incident Readiness;
- Simples 2027 Simulator;
- Fiscal ONE Embedded/API;
- partner model for accountants/BPOs/ERPs/PSPs;
- Private Agent Node.

### P2 — strategic expansion
- GloBE Engine;
- Financial Regulatory Packs;
- Physical AI Safety;
- PQC/Crypto Agility;
- Advanced/Hybrid Compute Provider Layer;
- industry packs (telecom, utilities, logistics, financial services).

---

## Architecture gates

### Security Gate
No critical agent action without identity, authority, policy, runtime controls and evidence.

### Fiscal Gate
No production rule without official source, version, effective date, test, review, approval and rollback.

### Financial Gate
No payment/split workflow without deterministic reconciliation, idempotency, recovery semantics and audit evidence.

### Agentic SDLC Gate
Builder Agent != Reviewer Agent != Security Agent != Release Authority for critical changes.

### Data Gate
No cross-tenant or cross-purpose data reuse without explicit policy and lineage.

### Commercial Gate
No module promoted as product without target user, pain, proof-of-value, pricing hypothesis, operational readiness and support plan.

---

## KPIs de evolução
- % de ações críticas com authority proof;
- % de agent runs com durable checkpoints;
- % de egress coberto por policy;
- % de dados com lineage;
- % de regras regulatórias com source + version + effective date;
- tempo RADAR → regra homologada;
- taxa de regressão fiscal;
- incident containment time;
- % de clientes impactados automaticamente identificados;
- receita recorrente por API/tenant/agent/work unit;
- número de pilotos convertidos em produção.

---

## Diretriz permanente do RADAR
Toda descoberta deve cair em uma das categorias:
1. incorporar agora;
2. preparar arquitetura;
3. monitorar;
4. descartar por falta de materialidade.

Nenhuma tendência entra no produto só por novidade. Deve resolver problema real, fortalecer segurança/compliance, gerar eficiência mensurável ou abrir receita defensável.
