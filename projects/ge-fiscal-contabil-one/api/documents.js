import { db } from "hatchable";
export const access="member";
export const methods=["GET"];
export default async function(req,res){
  const {rows}=await db.query("SELECT * FROM fiscal_documents ORDER BY created_at DESC LIMIT 200");
  return res.json(rows);
}