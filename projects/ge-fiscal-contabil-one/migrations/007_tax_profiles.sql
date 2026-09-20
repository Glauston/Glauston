CREATE TABLE IF NOT EXISTS tax_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  tax_regime TEXT NOT NULL,
  state_code TEXT,
  city_code TEXT,
  cnae_primary TEXT,
  fiscal_year INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM now())::int,
  cbs_ibs_enabled BOOLEAN NOT NULL DEFAULT true,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
)