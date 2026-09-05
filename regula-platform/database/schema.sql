create extension if not exists pgcrypto;

create table tenants (
    id uuid primary key default gen_random_uuid(),
    legal_name text not null,
    trade_name text,
    status text not null default 'active',
    created_at timestamptz not null default now()
);

create table regulatory_sources (
    id uuid primary key default gen_random_uuid(),
    domain text not null,
    source_type text not null,
    title text not null,
    authority text,
    source_uri text,
    published_at date,
    effective_from date,
    effective_to date,
    content_hash text,
    created_at timestamptz not null default now()
);

create table regulatory_rules (
    id uuid primary key default gen_random_uuid(),
    code text not null,
    domain text not null,
    version text not null,
    title text not null,
    description text not null,
    severity text not null,
    effective_from date,
    effective_to date,
    active boolean not null default false,
    source_id uuid references regulatory_sources(id),
    rule_definition jsonb not null,
    approved_by text,
    approved_at timestamptz,
    created_at timestamptz not null default now(),
    unique(code, version)
);

create table transactions (
    id uuid primary key default gen_random_uuid(),
    tenant_id uuid not null references tenants(id),
    external_id text not null,
    transaction_at timestamptz not null,
    amount numeric(18,2) not null,
    benefit_type text,
    merchant_id text,
    merchant_category text,
    fee_percent numeric(8,4),
    settlement_days integer,
    raw_reference text,
    created_at timestamptz not null default now(),
    unique(tenant_id, external_id)
);

create table compliance_cases (
    id uuid primary key default gen_random_uuid(),
    tenant_id uuid not null references tenants(id),
    case_number text not null,
    rule_id uuid not null references regulatory_rules(id),
    status text not null,
    severity text not null,
    confidence numeric(5,2),
    estimated_financial_exposure numeric(18,2),
    explanation text not null,
    owner_user_id text,
    due_at timestamptz,
    opened_at timestamptz not null default now(),
    closed_at timestamptz,
    unique(tenant_id, case_number)
);

create table case_objects (
    case_id uuid not null references compliance_cases(id),
    object_type text not null,
    object_id text not null,
    primary key(case_id, object_type, object_id)
);

create table evidence (
    id uuid primary key default gen_random_uuid(),
    tenant_id uuid not null references tenants(id),
    case_id uuid references compliance_cases(id),
    evidence_type text not null,
    source_reference text not null,
    content_hash text,
    metadata jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now()
);

create table audit_events (
    id uuid primary key default gen_random_uuid(),
    tenant_id uuid not null references tenants(id),
    event_type text not null,
    entity_type text not null,
    entity_id text not null,
    actor_type text not null,
    actor_id text not null,
    correlation_id text,
    payload jsonb not null default '{}'::jsonb,
    occurred_at timestamptz not null default now()
);

create index ix_transactions_tenant_time on transactions(tenant_id, transaction_at desc);
create index ix_cases_tenant_status on compliance_cases(tenant_id, status, severity);
create index ix_audit_tenant_entity on audit_events(tenant_id, entity_type, entity_id, occurred_at desc);
