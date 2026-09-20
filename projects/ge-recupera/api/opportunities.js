import { db } from "hatchable";
export const access = "member";
export const methods = ["GET"];
export default async function(req,res){
  const {rows}=await db.query("SELECT * FROM opportunities WHERE status <> 'archived' ORDER BY estimated_value DESC, created_at DESC LIMIT 200");
  return res.json(rows);
}