CREATE TABLE IF NOT EXISTS fiscal_findings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES fiscal_documents(id) ON DELETE CASCADE,
  severity TEXT NOT NULL DEFAULT 'medium',
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  detail TEXT,
  status TEXT NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
)