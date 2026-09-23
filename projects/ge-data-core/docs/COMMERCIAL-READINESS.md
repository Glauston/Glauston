# G|E DATA CORE — Commercial Readiness

## Release
v1 commercial API / platform deployment v5

## Implemented controls

- API keys stored as one-way hashes
- one-time key disclosure
- key scopes
- expiry and revocation
- tenant derived from credential, never from request payload
- monthly API quota
- monthly rule-execution quota
- per-minute rate limiting
- idempotency for write/evaluation calls
- request IDs
- no-store response headers on protected resources
- persistent audit events
- persistent commercial API request telemetry
- plan catalog and subscription state
- pilot provisioning workflow
- automatic cleanup for short-lived rate/idempotency records

## Homologation evidence

Validated scenarios:
1. valid API credential accepted
2. invalid credential rejected with 401
3. insufficient scope rejected with 403
4. rate limit rejected with 429
5. tenant A data invisible to tenant B
6. object upsert and read successful
7. idempotent replay does not duplicate the object
8. rule evaluation executes and records usage
9. usage/billing counters are returned
10. admin observability summarizes API traffic

## Remaining production gates

- project visibility/domain must be explicitly opened when the owner approves external access
- onboard the selected real pilot customer
- define commercial pricing for non-pilot plans
- execute backup/restore evidence test
- formalize incident-response/SLA and LGPD operational procedures
- final controlled external penetration test before broad release

No secrets or customer data are stored in this public portfolio documentation.
