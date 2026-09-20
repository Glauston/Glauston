import { db } from "hatchable";
export const access="member";
export const methods=["GET"];
export default async function(req,res){
  const {rows}=await db.query(`SELECT * FROM operational_alerts
    WHERE status='open'
    ORDER BY CASE severity WHEN 'critical' THEN 1 WHEN 'high' THEN 2 WHEN 'medium' THEN 3 ELSE 4 END,
             due_at NULLS LAST, last_seen_at DESC
    LIMIT 300`);
  res.json(rows);
}