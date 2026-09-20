import { db } from "hatchable";
export const access="member";
export const methods=["GET"];
export default async function(req,res){
  const {rows}=await db.query("SELECT * FROM billing_batches ORDER BY created_at DESC LIMIT 100");
  res.json(rows);
}