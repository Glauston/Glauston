import { db } from "hatchable";
export const access = "admin";
export const methods = ["POST"];
const KINDS=new Set(["lead","proposal","renewal","upsell","inactive","collection"]);
const STAGES=new Set(["identified","contacted","qualified","proposal","negotiation","won","lost"]);
const safeText=(v,max)=>{const s=String(v??"").trim();return s.length<=max?s:null};
const num=(v,min,max)=>{const n=Number(v);return Number.isFinite(n)&&n>=min&&n<=max?n:null};
export default async function(req,res){
  const b=req.body||{};
  const company=safeText(b.company_name,160);
  const kind=KINDS.has(b.kind)?b.kind:"lead";
  const stage=STAGES.has(b.stage)?b.stage:"identified";
  const value=num(b.estimated_value??0,0,1000000000);
  const probability=num(b.probability??50,0,100);
  const idle=num(b.days_idle??0,0,3650);
  const contact=safeText(b.contact_name,160);
  const nextAction=safeText(b.next_action,500);
  const owner=safeText(b.owner_name,160);
  const source=safeText(b.source||"manual",40);
  if(!company) return res.status(400).json({error:"invalid_company_name"});
  if(value===null||probability===null||idle===null) return res.status(400).json({error:"invalid_numeric_field"});
  if(contact===null||nextAction===null||owner===null||source===null) return res.status(400).json({error:"field_too_long"});
  const {rows}=await db.query(
    "INSERT INTO opportunities (company_name,contact_name,source,kind,stage,estimated_value,probability,days_idle,next_action,next_action_at,owner_name) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *",
    [company,contact||null,source||"manual",kind,stage,value,probability,idle,nextAction||null,b.next_action_at||null,owner||null]
  );
  return res.status(201).json(rows[0]);
}