CREATE TABLE IF NOT EXISTS opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  contact_name TEXT,
  source TEXT NOT NULL DEFAULT 'manual',
  kind TEXT NOT NULL DEFAULT 'lead',
  stage TEXT NOT NULL DEFAULT 'identified',
  estimated_value NUMERIC(14,2) NOT NULL DEFAULT 0,
  probability INTEGER NOT NULL DEFAULT 50,
  days_idle INTEGER NOT NULL DEFAULT 0,
  next_action TEXT,
  next_action_at TIMESTAMPTZ,
  owner_name TEXT,
  status TEXT NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
)