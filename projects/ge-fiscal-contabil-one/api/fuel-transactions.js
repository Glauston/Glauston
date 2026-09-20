import { db } from "hatchable";
export const access="member";
export const methods=["GET"];
export default async function(req,res){
  const {rows}=await db.query("SELECT * FROM fuel_transactions ORDER BY transaction_at DESC NULLS LAST, created_at DESC LIMIT 300");
  res.json(rows);
}