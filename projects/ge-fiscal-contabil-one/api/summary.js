import { db } from "hatchable";
export const access="member";
export const methods=["GET"];
export default async function(req,res){
  const {rows}=await db.query(`SELECT
    COUNT(*)::int AS documents,
    COALESCE(SUM(total_value),0)::numeric AS total_value,
    COALESCE(SUM(tax_value),0)::numeric AS tax_value,
    COUNT(*) FILTER (WHERE status='review')::int AS review_count
    FROM fiscal_documents`);
  const f=await db.query("SELECT COUNT(*)::int AS open_findings FROM fiscal_findings WHERE status='open'");
  res.json({...rows[0],open_findings:f.rows[0].open_findings});
}