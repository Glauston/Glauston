CREATE TABLE IF NOT EXISTS fuel_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_transaction_id TEXT NOT NULL UNIQUE,
  organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  vehicle_plate TEXT,
  driver_name TEXT,
  station_name TEXT,
  station_tax_id TEXT,
  fuel_type TEXT,
  liters NUMERIC(14,3) NOT NULL DEFAULT 0,
  unit_price NUMERIC(14,4) NOT NULL DEFAULT 0,
  total_value NUMERIC(14,2) NOT NULL DEFAULT 0,
  transaction_at TIMESTAMPTZ,
  odometer NUMERIC(14,1),
  status TEXT NOT NULL DEFAULT 'awaiting_fiscal',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
)