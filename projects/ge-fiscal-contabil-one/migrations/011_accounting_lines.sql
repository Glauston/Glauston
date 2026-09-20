CREATE TABLE IF NOT EXISTS accounting_lines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_id UUID NOT NULL REFERENCES accounting_entries(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES chart_accounts(id),
  cost_center_id UUID REFERENCES cost_centers(id) ON DELETE SET NULL,
  debit NUMERIC(14,2) NOT NULL DEFAULT 0,
  credit NUMERIC(14,2) NOT NULL DEFAULT 0,
  memo TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (debit >= 0 AND credit >= 0),
  CHECK (NOT (debit > 0 AND credit > 0))
)