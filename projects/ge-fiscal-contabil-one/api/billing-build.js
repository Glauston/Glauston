import { db } from "hatchable";
export const access="admin";
export const methods=["POST"];
const REF=/^\d{4}-\d{2}$/;
export default async function(req,res){
  const b=req.body||{};
  if(!REF.test(String(b.reference_month||""))) return res.status(400).json({error:"invalid_reference_month"});
  const start=b.reference_month+"-01";
  const end=new Date(start+"T00:00:00Z"); end.setUTCMonth(end.getUTCMonth()+1);
  const endIso=end.toISOString().slice(0,10);
  const q=await db.query(
    "SELECT COALESCE(SUM(total_value),0)::numeric AS gross, COALESCE(SUM(total_value) FILTER (WHERE status='fiscal_validated'),0)::numeric AS eligible, COALESCE(SUM(total_value) FILTER (WHERE status<>'fiscal_validated'),0)::numeric AS blocked FROM fuel_transactions WHERE transaction_at >= $1 AND transaction_at < $2",
    [start,endIso]
  );
  const m=q.rows[0]; const gross=Number(m.gross||0),eligible=Number(m.eligible||0),blocked=Number(m.blocked||0);
  const {rows}=await db.query("INSERT INTO billing_batches (organization_id,reference_month,description,gross_value,eligible_value,blocked_value,status) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",[b.organization_id||null,b.reference_month,b.description||"Faturamento de abastecimentos conciliados",gross,eligible,blocked,blocked>0?"review":"ready"]);
  res.status(201).json(rows[0]);
}