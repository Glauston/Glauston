CREATE TABLE IF NOT EXISTS fiscal_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_type TEXT NOT NULL DEFAULT 'NFE',
  access_key TEXT,
  issuer_name TEXT,
  issuer_tax_id TEXT,
  recipient_name TEXT,
  recipient_tax_id TEXT,
  issue_date DATE,
  total_value NUMERIC(14,2) NOT NULL DEFAULT 0,
  tax_value NUMERIC(14,2) NOT NULL DEFAULT 0,
  source TEXT NOT NULL DEFAULT 'manual',
  status TEXT NOT NULL DEFAULT 'received',
  raw_text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
)