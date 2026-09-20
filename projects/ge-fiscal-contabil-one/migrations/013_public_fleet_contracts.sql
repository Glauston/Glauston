CREATE TABLE IF NOT EXISTS public_fleet_contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  external_contract_id TEXT,
  agency_name TEXT NOT NULL,
  agency_tax_id TEXT,
  contract_number TEXT,
  valid_from DATE,
  valid_to DATE,
  requires_nfce_per_fueling BOOLEAN NOT NULL DEFAULT false,
  requires_transaction_document_link BOOLEAN NOT NULL DEFAULT true,
  billing_rule TEXT NOT NULL DEFAULT 'validated_only',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
)