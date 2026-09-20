import { db } from "hatchable";
export const access="member";
export const methods=["GET"];
export default async function(req,res){
  const {rows}=await db.query("SELECT f.*, d.document_type, d.access_key, d.issuer_name, d.total_value FROM fiscal_findings f LEFT JOIN fiscal_documents d ON d.id=f.document_id WHERE f.status='open' ORDER BY CASE f.severity WHEN 'critical' THEN 1 WHEN 'high' THEN 2 WHEN 'medium' THEN 3 ELSE 4 END, f.created_at DESC LIMIT 200");
  return res.json(rows);
}