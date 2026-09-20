# Universal Integration Model — G|E Secure Agent Control

## Purpose
Define a vendor-neutral integration contract so the control plane can govern agents, automations and executable systems without depending on G|E technology.

## Integration principle
Every external execution is treated as a governed capability. The protected system can be SaaS, on-premises, private cloud, legacy, custom software or third-party platform.

## Connector classes

### 1. HTTP Adapter
For REST, GraphQL and webhook destinations.
Capabilities:
- destination allowlist;
- method/path restrictions;
- schema validation;
- timeout/retry/circuit breaker;
- credential reference;
- response redaction;
- idempotency.

### 2. MCP Adapter
For MCP servers/tools.
Capabilities:
- server identity;
- tool allowlist;
- per-tool risk;
- argument schema validation;
- authorization context;
- result sanitization;
- tool invocation audit.

### 3. Event Adapter
For queues and event buses.
Examples: Kafka-compatible, AMQP-compatible, cloud queues and internal buses.
Capabilities:
- topic/queue allowlist;
- producer/consumer scopes;
- message schema;
- correlation/request ID;
- replay protection;
- dead-letter governance.

### 4. Database Adapter
For controlled data operations.
Rules:
- never expose raw database credentials to the agent;
- prefer service/API mediation;
- query templates or parameterized statements;
- read/write separation;
- row/tenant constraints;
- destructive operations require explicit policy.

### 5. Enterprise System Adapter
For ERP, CRM, fiscal, finance, HR, logistics and public-sector systems.
Uses a normalized action contract while the adapter translates to each vendor API.

### 6. Legacy/RPA Adapter
For systems without modern APIs.
Rules:
- RPA runs as a controlled executor identity;
- screen actions are modeled as catalogued capabilities;
- screenshots/logs follow data-classification rules;
- irreversible UI actions can require approval.

## Normalized action contract
Every connector maps its operations to:
- integration_id
- action_code
- operation_type
- resource_type
- resource_id
- destination
- data_classification
- reversible
- monetary_value when applicable
- request_schema
- response_schema
- base_risk
- required_scopes

The Policy Engine and Risk Engine operate on this normalized contract rather than vendor-specific semantics.

## Universal execution flow
External Agent/System
→ Agent/Workload Identity
→ Action Gateway
→ Normalization
→ Policy Engine
→ Risk Engine
→ Approval Center when required
→ Secrets Broker
→ Connector Adapter
→ External System
→ Result Sanitizer
→ Audit Ledger / Observability

## SDK / Adapter Kit
The P1 SDK should expose:
- registerIntegration()
- registerAction()
- evaluate()
- execute()
- executeApproved()
- reportResult()
- heartbeat()
- revoke()
- activateKillSwitch()

It must provide language-neutral OpenAPI/JSON Schema contracts first, then optional SDKs.

## Deployment modes
- SaaS control plane;
- single-tenant private cloud;
- on-premises;
- hybrid control plane + customer-side execution gateway.

For regulated customers, the execution gateway may remain inside the customer's network while only policy/audit metadata allowed by contract crosses environments.

## Vendor neutrality tests
A release cannot claim universal integration until the same policy/risk/approval flow is proven with:
1. one G|E system;
2. one external REST system;
3. one MCP tool/server;
4. one event/queue integration or simulator;
5. one legacy/adapter scenario.

## Non-negotiable rule
No connector can bypass Policy Engine, Risk Engine, Approval controls or Audit Ledger for protected actions.
