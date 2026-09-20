import { db } from "hatchable";
export const access="member";
export const methods=["GET"];
export default async function(req,res){
  const tx=await db.query("SELECT COUNT(*)::int total, COUNT(*) FILTER (WHERE status='fiscal_validated')::int validated, COUNT(*) FILTER (WHERE status LIKE 'fiscal_%' AND status<>'fiscal_validated')::int exceptions, COUNT(*) FILTER (WHERE status='awaiting_fiscal')::int awaiting FROM fuel_transactions");
  const docs=await db.query("SELECT COUNT(*)::int total FROM fiscal_documents");
  const links=await db.query("SELECT COUNT(*)::int total, COALESCE(AVG(match_score),0)::numeric avg_score FROM fiscal_links");
  res.json({transactions:tx.rows[0],documents:docs.rows[0],reconciliations:links.rows[0]});
}