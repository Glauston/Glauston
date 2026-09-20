CREATE TABLE IF NOT EXISTS recovery_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id UUID NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL,
  note TEXT,
  outcome TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
)