import { db } from "hatchable";
export const access = "admin";
export const methods = ["POST"];
const TYPES=new Set(["call","email","meeting","proposal","renewal","collection","note","other"]);
const safe=(v,max)=>{const s=String(v??"").trim();return s.length<=max?s:null};
export default async function(req,res){
  const b=req.body||{};
  const type=TYPES.has(b.action_type)?b.action_type:null;
  const note=safe(b.note,2000);
  const outcome=safe(b.outcome,1000);
  const nextAction=safe(b.next_action,500);
  if(!b.opportunity_id||!type) return res.status(400).json({error:"invalid_action"});
  if(note===null||outcome===null||nextAction===null) return res.status(400).json({error:"field_too_long"});
  const found=await db.query("SELECT id FROM opportunities WHERE id=$1",[b.opportunity_id]);
  if(!found.rows.length) return res.status(404).json({error:"opportunity_not_found"});
  const {rows}=await db.query("INSERT INTO recovery_actions (opportunity_id,action_type,note,outcome) VALUES ($1,$2,$3,$4) RETURNING *",[b.opportunity_id,type,note||null,outcome||null]);
  await db.query("UPDATE opportunities SET days_idle=0, updated_at=now(), next_action=$2 WHERE id=$1",[b.opportunity_id,nextAction||null]);
  res.status(201).json(rows[0]);
}