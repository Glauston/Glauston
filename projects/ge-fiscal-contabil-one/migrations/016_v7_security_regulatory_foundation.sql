INSERT INTO organizations (name,tax_id,status)
SELECT 'G|E Cliente Zero',NULL,'active'
WHERE NOT EXISTS (SELECT 1 FROM organizations);

ALTER TABLE fiscal_findings ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE;
ALTER TABLE fiscal_links ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE;

UPDATE fiscal_documents SET organization_id=(SELECT id FROM organizations WHERE status='active' ORDER BY created_at LIMIT 1) WHERE organization_id IS NULL;
UPDATE fuel_transactions SET organization_id=(SELECT id FROM organizations WHERE status='active' ORDER BY created_at LIMIT 1) WHERE organization_id IS NULL;
UPDATE billing_batches SET organization_id=(SELECT id FROM organizations WHERE status='active' ORDER BY created_at LIMIT 1) WHERE organization_id IS NULL;
UPDATE public_fleet_contracts SET organization_id=(SELECT id FROM organizations WHERE status='active' ORDER BY created_at LIMIT 1) WHERE organization_id IS NULL;
UPDATE operational_alerts SET organization_id=(SELECT id FROM organizations WHERE status='active' ORDER BY created_at LIMIT 1) WHERE organization_id IS NULL;
UPDATE fiscal_findings f SET organization_id=COALESCE(d.organization_id,(SELECT id FROM organizations WHERE status='active' ORDER BY created_at LIMIT 1)) FROM fiscal_documents d WHERE f.document_id=d.id AND f.organization_id IS NULL;
UPDATE fiscal_findings SET organization_id=(SELECT id FROM organizations WHERE status='active' ORDER BY created_at LIMIT 1) WHERE organization_id IS NULL;
UPDATE fiscal_links l SET organization_id=COALESCE(t.organization_id,d.organization_id,(SELECT id FROM organizations WHERE status='active' ORDER BY created_at LIMIT 1)) FROM fuel_transactions t, fiscal_documents d WHERE l.fuel_transaction_id=t.id AND l.fiscal_document_id=d.id AND l.organization_id IS NULL;

CREATE TABLE IF NOT EXISTS member_organization_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id TEXT NOT NULL,
  member_handle TEXT,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  access_role TEXT NOT NULL DEFAULT 'member',
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(member_id,organization_id)
);

CREATE TABLE IF NOT EXISTS audit_ledger (
  sequence_no BIGSERIAL PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  actor_kind TEXT NOT NULL CHECK (actor_kind IN ('member','agent','system','integration')),
  actor_id TEXT NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  correlation_id TEXT,
  detail JSONB NOT NULL DEFAULT '{}'::jsonb,
  prev_hash TEXT,
  event_hash TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION block_audit_ledger_mutation()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  RAISE EXCEPTION 'audit_ledger is append-only';
END $$;

DROP TRIGGER IF EXISTS audit_ledger_no_update_delete ON audit_ledger;
CREATE TRIGGER audit_ledger_no_update_delete
BEFORE UPDATE OR DELETE ON audit_ledger
FOR EACH ROW EXECUTE FUNCTION block_audit_ledger_mutation();

CREATE TABLE IF NOT EXISTS agent_identities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  purpose TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','paused','retired')),
  risk_ceiling TEXT NOT NULL DEFAULT 'medium' CHECK (risk_ceiling IN ('low','medium','high','critical')),
  allowed_actions JSONB NOT NULL DEFAULT '[]'::jsonb,
  requires_human_approval BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS agent_action_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  agent_id UUID NOT NULL REFERENCES agent_identities(id),
  action_type TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id TEXT,
  risk_level TEXT NOT NULL CHECK (risk_level IN ('low','medium','high','critical')),
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  rationale TEXT,
  status TEXT NOT NULL DEFAULT 'pending_approval' CHECK (status IN ('approved','pending_approval','rejected','blocked','executed','failed','cancelled')),
  requested_by_member_id TEXT,
  requested_by_handle TEXT,
  requested_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  decided_at TIMESTAMPTZ,
  executed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS agent_approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL UNIQUE REFERENCES agent_action_requests(id) ON DELETE CASCADE,
  decision TEXT NOT NULL CHECK (decision IN ('approved','rejected')),
  decided_by_member_id TEXT NOT NULL,
  decided_by_handle TEXT,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS regulatory_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  authority TEXT NOT NULL,
  jurisdiction TEXT NOT NULL,
  official_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  last_verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS regulatory_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id UUID NOT NULL REFERENCES regulatory_sources(id),
  external_ref TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  source_url TEXT NOT NULL,
  published_at TIMESTAMPTZ,
  effective_from DATE,
  effective_to DATE,
  urgency TEXT NOT NULL DEFAULT 'monitorar' CHECK (urgency IN ('monitorar','preparar_adequacao','prazo_iminente')),
  status TEXT NOT NULL DEFAULT 'verified' CHECK (status IN ('detected','verified','classified','impacted','modeled','tested','reviewed','approved','published','monitored','rejected','duplicate','superseded','rolled_back')),
  affected_domains JSONB NOT NULL DEFAULT '[]'::jsonb,
  official_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  source_hash TEXT,
  created_by_agent_id UUID REFERENCES agent_identities(id),
  reviewed_by TEXT,
  approved_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(source_id,external_ref)
);

CREATE TABLE IF NOT EXISTS tax_rule_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  rule_code TEXT NOT NULL,
  version_no INTEGER NOT NULL,
  jurisdiction TEXT NOT NULL,
  tax_type TEXT NOT NULL,
  effective_from DATE NOT NULL,
  effective_to DATE,
  rule_payload JSONB NOT NULL,
  source_event_id UUID REFERENCES regulatory_events(id),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','review','approved','published','rolled_back','superseded')),
  evidence_grade TEXT CHECK (evidence_grade IN ('A','B','C','D')),
  created_by TEXT NOT NULL,
  approved_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at TIMESTAMPTZ,
  UNIQUE(organization_id,rule_code,version_no)
);

CREATE TABLE IF NOT EXISTS idempotency_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  idempotency_key TEXT NOT NULL,
  operation TEXT NOT NULL,
  response_snapshot JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ,
  UNIQUE(organization_id,idempotency_key,operation)
);

CREATE INDEX IF NOT EXISTS idx_documents_org_created ON fiscal_documents(organization_id,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_findings_org_status ON fiscal_findings(organization_id,status,severity);
CREATE INDEX IF NOT EXISTS idx_fuel_org_status ON fuel_transactions(organization_id,status,transaction_at DESC);
CREATE INDEX IF NOT EXISTS idx_billing_org_created ON billing_batches(organization_id,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_alerts_org_status ON operational_alerts(organization_id,status,severity,due_at);
CREATE INDEX IF NOT EXISTS idx_ledger_org_created ON audit_ledger(organization_id,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_agent_actions_org_status ON agent_action_requests(organization_id,status,requested_at DESC);
CREATE INDEX IF NOT EXISTS idx_reg_events_effective ON regulatory_events(effective_from,urgency,status);

INSERT INTO agent_identities (agent_key,name,purpose,risk_ceiling,allowed_actions,requires_human_approval)
VALUES
('fiscal-brain','Fiscal Brain','Simular cenários tributários e gerar recomendações explicáveis sem publicar regra automaticamente.','medium','["read","simulate","recommend"]'::jsonb,false),
('legal-watch','Legal Watch','Monitorar fontes oficiais, classificar eventos regulatórios e preparar análise de impacto.','medium','["read","ingest_regulatory_event","classify_regulatory_event","impact_analysis"]'::jsonb,false),
('ge-audit','G|E AUDIT','Auditar controles, conformidade, evidências e produzir achados rastreáveis.','medium','["read","audit","create_finding","evidence_pack"]'::jsonb,false),
('guardian','Guardian','Monitorar postura defensiva, recomendar controles e bloquear operações quando política permitir.','high','["read","monitor","recommend_control","block_operation"]'::jsonb,true),
('red-team','Hacker / Red Team','Executar testes de segurança somente sob autorização explícita e registrar evidências.','high','["read","active_security_test","report_finding"]'::jsonb,true),
('reconciliation-agent','Reconciliation Agent','Conciliar transações e documentos fiscais, pontuar divergências e encaminhar exceções.','medium','["read","reconcile_document","flag_exception"]'::jsonb,false)
ON CONFLICT (agent_key) DO UPDATE SET
name=EXCLUDED.name,purpose=EXCLUDED.purpose,risk_ceiling=EXCLUDED.risk_ceiling,
allowed_actions=EXCLUDED.allowed_actions,requires_human_approval=EXCLUDED.requires_human_approval,status='active';