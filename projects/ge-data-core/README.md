# G|E DATA CORE

**Trusted Data & Decision Infrastructure**

G|E DATA CORE is the shared trust layer of the G|E ecosystem, designed to provide secure multi-tenant data services, validation, rule execution, auditability and API-based integration without coupling products to one another.

## Current status

- Commercial API: **v1**
- Environment: **pilot / controlled commercialization**
- Tenant isolation: enforced by credential-derived tenant context
- Authentication: hashed API keys with scopes, expiry and revocation
- Controls: monthly quotas, per-minute rate limits and idempotency
- Observability: request metrics by tenant/route, latency and status
- Billing foundation: plan catalog, subscriptions, usage counters and commercial status
- Audit: persistent business/security events
- API documentation: OpenAPI endpoint
- Data region: Brazil configuration available

## Commercial API

The v1 API exposes high-level capabilities for:

- credential/plan introspection
- trusted data objects
- active business rules
- rule evaluation
- usage and quota visibility
- service health

Sensitive source code, credentials, customer data and production internals remain private.

## Product principle

Every G|E product remains independently deployable. DATA CORE is an optional shared infrastructure layer, not a hard dependency.

## Commercial-readiness gate

The current release is prepared for a controlled pilot. Broader commercialization requires production visibility/domain configuration, customer-specific legal/commercial onboarding, backup/restore evidence, incident procedures and final operational acceptance.
