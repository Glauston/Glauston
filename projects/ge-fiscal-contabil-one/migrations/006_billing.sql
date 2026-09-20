CREATE TABLE IF NOT EXISTS billing_batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  reference_month TEXT NOT NULL,
  description TEXT,
  gross_value NUMERIC(14,2) NOT NULL DEFAULT 0,
  eligible_value NUMERIC(14,2) NOT NULL DEFAULT 0,
  blocked_value NUMERIC(14,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
)