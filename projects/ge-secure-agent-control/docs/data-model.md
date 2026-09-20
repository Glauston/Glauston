# Modelo de Dados P0 — G|E Secure Agent Control

## Princípios
- Multi-tenant obrigatório.
- Todo registro de negócio carrega `tenant_id`.
- IDs técnicos em UUID.
- Eventos de auditoria são append-only.
- Segredos são referenciados, nunca persistidos em claro.
- Toda ação é rastreável de ponta a ponta por `request_id` e `trace_id`.
- Aprovação é vinculada ao hash exato do payload.

## Entidades principais

### tenants
- id
- legal_name
- display_name
- status
- data_region
- created_at
- updated_at

### users
- id
- tenant_id
- name
- email
- status
- mfa_required
- created_at
- updated_at

### roles
- id
- tenant_id
- code
- name
- description

### user_roles
- tenant_id
- user_id
- role_id
- scope_type
- scope_id

### agents
- id
- tenant_id
- name
- description
- owner_user_id
- business_purpose
- model_provider
- model_name
- version
- environment
- status: DRAFT | PILOT | ACTIVE | SUSPENDED | RETIRED
- risk_tier
- created_at
- updated_at

### agent_identities
- id
- tenant_id
- agent_id
- identity_type
- credential_reference
- issued_at
- expires_at
- revoked_at

### integrations
- id
- tenant_id
- name
- type
- owner_user_id
- base_url_reference
- environment
- status
- secret_reference
- allowed_destinations
- rate_limit_policy

### actions_catalog
- id
- tenant_id
- integration_id
- code
- name
- description
- operation_type: READ | WRITE | DELETE | EXECUTE | FINANCIAL
- data_classification
- base_risk
- reversible
- schema_version
- request_schema
- response_schema
- status

### agent_action_permissions
- id
- tenant_id
- agent_id
- action_id
- effect: ALLOW | DENY | REQUIRE_APPROVAL
- conditions
- valid_from
- valid_until

### policies
- id
- tenant_id
- code
- name
- description
- status: DRAFT | ACTIVE | RETIRED
- priority
- created_by
- created_at

### policy_versions
- id
- tenant_id
- policy_id
- version
- rules
- checksum
- published_by
- published_at

### action_requests
- id
- tenant_id
- request_id
- trace_id
- agent_id
- agent_version
- requested_by_type
- requested_by_id
- action_id
- environment
- resource_reference
- destination
- data_classification
- monetary_value
- payload_hash
- idempotency_key
- status
- created_at
- expires_at

### risk_assessments
- id
- tenant_id
- action_request_id
- score
- level: LOW | MODERATE | HIGH | CRITICAL
- signals
- calculated_at
- engine_version

### policy_decisions
- id
- tenant_id
- action_request_id
- policy_version_id
- decision: ALLOW | DENY | REQUIRE_APPROVAL | REQUIRE_STEP_UP_AUTH | LIMIT | MASK | REDACT
- reason_codes
- evaluated_attributes
- decided_at

### approval_requests
- id
- tenant_id
- action_request_id
- payload_hash
- approval_rule
- required_approvals
- status: PENDING | APPROVED | REJECTED | EXPIRED | CANCELLED
- expires_at
- created_at

### approvals
- id
- tenant_id
- approval_request_id
- approver_user_id
- decision: APPROVE | REJECT
- justification
- step_up_verified
- decided_at

### executions
- id
- tenant_id
- action_request_id
- integration_id
- executor_identity
- started_at
- finished_at
- result_status
- output_hash
- error_code
- latency_ms
- cost_amount

### audit_events
- id
- tenant_id
- sequence_number
- request_id
- trace_id
- event_type
- actor_type
- actor_id
- agent_id
- resource_type
- resource_id
- metadata_redacted
- previous_event_hash
- event_hash
- created_at

### kill_switches
- id
- tenant_id
- scope_type: ACTION | AGENT | INTEGRATION | TENANT | ENVIRONMENT | GLOBAL
- scope_id
- reason
- activated_by
- activated_at
- deactivated_by
- deactivated_at
- status

### budgets
- id
- tenant_id
- scope_type
- scope_id
- period
- hard_limit
- soft_limit
- currency

### usage_events
- id
- tenant_id
- agent_id
- request_id
- provider
- model
- input_tokens
- output_tokens
- cost_amount
- recorded_at

### incidents
- id
- tenant_id
- severity
- category
- source
- title
- description
- status
- related_request_id
- related_agent_id
- opened_at
- closed_at

## Regras de integridade
1. Um agente não pode aprovar a própria ação.
2. Alteração do payload após aprovação invalida a aprovação.
3. Ação crítica sem política explícita = DENY.
4. Execução exige decisão válida e não expirada.
5. Kill Switch ativo prevalece sobre ALLOW.
6. `tenant_id` deve ser validado em toda consulta e mutação.
7. `idempotency_key` impede execução duplicada.
8. Segredo nunca aparece em `action_requests`, `audit_events` ou resposta da API.
9. Evento de auditoria não pode ser atualizado nem excluído via aplicação.
10. Produção deve usar isolamento lógico forte e controles de banco compatíveis com RLS.

## Índices mínimos
- action_requests(tenant_id, request_id)
- action_requests(tenant_id, agent_id, created_at)
- audit_events(tenant_id, sequence_number)
- audit_events(tenant_id, trace_id)
- approval_requests(tenant_id, status, expires_at)
- policy_versions(tenant_id, policy_id, version)
- kill_switches(tenant_id, scope_type, scope_id, status)
- usage_events(tenant_id, agent_id, recorded_at)

## Retenção
A política de retenção é configurável por tenant, respeitando requisitos legais, contratuais e LGPD. Logs nunca devem armazenar segredo ou dado pessoal desnecessário.
