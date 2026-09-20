import { db } from "hatchable";
export const access="admin";
export const methods=["POST"];
const SEV=new Set(["low","medium","high","critical"]);
const safe=(v,max)=>{const s=String(v??"").trim();return s.length<=max?s:null};
export default async function(req,res){
  const b=req.body||{}; const severity=SEV.has(b.severity)?b.severity:"medium";
  const category=safe(b.category,80),title=safe(b.title,200),detail=safe(b.detail,4000);
  if(!category||!title||detail===null) return res.status(400).json({error:"invalid_finding"});
  if(b.document_id){const d=await db.query("SELECT id FROM fiscal_documents WHERE id=$1",[b.document_id]); if(!d.rows.length)return res.status(404).json({error:"document_not_found"});}
  const {rows}=await db.query("INSERT INTO fiscal_findings (document_id,severity,category,title,detail,status) VALUES ($1,$2,$3,$4,$5,'open') RETURNING *",[b.document_id||null,severity,category,title,detail||null]);
  res.status(201).json(rows[0]);
}