# G|E Fiscal ONE — DUIMP / CBS / IBS Intelligence

Status: product increment / commercial validation
Date: 2026-09-26

## Commercial hypothesis
Importers, trading companies, B2B/B2G operators and ERP/integration providers need to adapt import workflows to the Brazilian tax reform while preserving traceability between source ERP data, legal basis, tax simulation, DUIMP responses and audit evidence.

The G|E Fiscal ONE should complement — not replace — official Siscomex services.

## Proposed flow
ERP / Import Operation -> G|E Data Core -> Item/NCM + consumption location -> Fiscal ONE Tax Decision Intelligence -> legal-basis mapping -> CBS/IBS simulation -> Siscomex adapter -> official CST/cClassTrib response -> reconciliation -> G|E AUDIT evidence.

## MVP capabilities
1. Import-operation intake with item, NCM, UF and municipality of consumption.
2. Versioned legal-basis catalog with effective dates and source reference.
3. CBS/IBS simulation separated from official tax determination.
4. Adapter contract for official Siscomex/DUIMP APIs; no scraping and no credential storage.
5. Capture of official CST/cClassTrib response and divergence detection.
6. Evidence chain: input hash, rule/version, legal basis, decision, official response, actor/agent and timestamp.
7. Exception queue for missing/changed legal basis and required calculation-memory attachments.
8. Reconciliation dashboard and exportable audit package.

## G|E ecosystem integration
- Data Core: canonical import/tax data and evidence fingerprints.
- Secure Agent Control: authorization, endpoint/MCP governance and credential-exposure inventory for integration credentials.
- Guardian: anomaly detection for unusual legal-basis, destination or credential behavior.
- AUDIT: independent evidence and control validation.
- MAESTRO/NEXUS: workflow, SLA, client case, exception and implementation follow-up.

## Security rules
- Never persist Siscomex/API passwords, tokens or certificates in application records.
- Reference secrets through an approved vault/credential broker.
- Inventory only non-reversible fingerprints and metadata in Credential Exposure Inventory.
- Require least privilege, rotation/revocation evidence and tenant isolation.
- High-impact tax overrides require explicit authorization and immutable evidence.

## Initial offer
**DUIMP + CBS/IBS 2027 Readiness & Integration Assessment**

Deliverables: data-field readiness, integration/API readiness, legal-basis mapping, simulation/reconciliation proof, security review, credential-exposure review and AUDIT evidence pack.

## Validation gates
- Validate official API/layout contracts against current government documentation before production integration.
- Pilot with synthetic/non-production import data first.
- Obtain tax/legal review for rule interpretation; the engine must preserve source and version for every rule.
- Measure: integration coverage, unresolved exceptions, simulated-vs-official divergence, remediation lead time and audit completeness.

## Commercial next step
Recruit one import-heavy client or ERP/integrator as design partner. Run a bounded readiness assessment before building broader automation. Convert repeated requirements into the production API module only after validation.
