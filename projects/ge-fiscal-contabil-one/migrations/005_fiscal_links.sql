CREATE TABLE IF NOT EXISTS fiscal_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fuel_transaction_id UUID NOT NULL REFERENCES fuel_transactions(id) ON DELETE CASCADE,
  fiscal_document_id UUID NOT NULL REFERENCES fiscal_documents(id) ON DELETE CASCADE,
  match_score NUMERIC(5,2) NOT NULL DEFAULT 0,
  match_status TEXT NOT NULL DEFAULT 'pending',
  divergence_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(fuel_transaction_id, fiscal_document_id)
)