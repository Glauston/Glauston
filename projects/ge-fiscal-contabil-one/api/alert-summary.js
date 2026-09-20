import { db } from "hatchable";
export const access="member";
export const methods=["GET"];
export default async function(req,res){
  const {rows}=await db.query(`SELECT
    COUNT(*) FILTER (WHERE status='open')::int AS open_count,
    COUNT(*) FILTER (WHERE status='open' AND severity='critical')::int AS critical_count,
    COUNT(*) FILTER (WHERE status='open' AND severity='high')::int AS high_count,
    COUNT(*) FILTER (WHERE status='open' AND due_at IS NOT NULL AND due_at < now())::int AS overdue_count
    FROM operational_alerts`);
  res.json(rows[0]);
}