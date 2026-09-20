CREATE TABLE IF NOT EXISTS operational_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  alert_key TEXT NOT NULL UNIQUE,
  alert_type TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'medium',
  title TEXT NOT NULL,
  detail TEXT,
  source_type TEXT,
  source_id TEXT,
  recommended_action TEXT,
  owner_name TEXT,
  due_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'open',
  first_seen_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  resolved_at TIMESTAMPTZ
)