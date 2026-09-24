CREATE TABLE IF NOT EXISTS client_fit_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  prospect_name TEXT NOT NULL,
  segment TEXT NOT NULL,
  company_size TEXT,
  current_erp TEXT,
  documents_month INTEGER NOT NULL DEFAULT 0,
  states_count INTEGER NOT NULL DEFAULT 1,
  municipalities_count INTEGER NOT NULL DEFAULT 1,
  uses_nfse BOOLEAN NOT NULL DEFAULT false,
  uses_nfe_nfce BOOLEAN NOT NULL DEFAULT false,
  uses_cte_mdfe BOOLEAN NOT NULL DEFAULT false,
  has_fleet_reconciliation BOOLEAN NOT NULL DEFAULT false,
  has_government_contracts BOOLEAN NOT NULL DEFAULT false,
  needs_cbs_ibs BOOLEAN NOT NULL DEFAULT true,
  needs_split_payment BOOLEAN NOT NULL DEFAULT false,
  needs_accounting BOOLEAN NOT NULL DEFAULT false,
  pain_points JSONB NOT NULL DEFAULT '[]'::jsonb,
  fit_score INTEGER NOT NULL,
  fit_band TEXT NOT NULL CHECK (fit_band IN ('low','medium','high','strategic')),
  recommended_modules JSONB NOT NULL DEFAULT '[]'::jsonb,
  implementation_complexity TEXT NOT NULL CHECK (implementation_complexity IN ('low','medium','high')),
  next_action TEXT NOT NULL,
  created_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_client_fit_created ON client_fit_assessments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_client_fit_band ON client_fit_assessments(fit_band,segment);