import { db } from "hatchable";
export const access = "member";
export const methods = ["GET"];
export default async function(req,res){
  const {rows}=await db.query(`SELECT
    COUNT(*) FILTER (WHERE status='open')::int AS open_count,
    COALESCE(SUM(estimated_value) FILTER (WHERE status='open'),0)::numeric AS pipeline,
    COALESCE(SUM(estimated_value * probability / 100.0) FILTER (WHERE status='open'),0)::numeric AS weighted,
    COUNT(*) FILTER (WHERE status='open' AND days_idle>=7)::int AS idle_count,
    COUNT(*) FILTER (WHERE status='open' AND kind='renewal')::int AS renewals,
    COUNT(*) FILTER (WHERE status='open' AND kind='upsell')::int AS upsells
    FROM opportunities`);
  res.json(rows[0]);
}