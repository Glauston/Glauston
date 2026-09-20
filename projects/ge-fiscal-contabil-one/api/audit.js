import { db } from "hatchable";
export const access="admin";
export const methods=["POST"];
export default async function(req,res){
  const b=req.body||{};
  if(!b.document_id) return res.status(400).json({error:"document_id is required"});
  const {rows}=await db.query("SELECT * FROM fiscal_documents WHERE id=$1",[b.document_id]);
  if(!rows.length) return res.status(404).json({error:"document_not_found"});
  const d=rows[0]; const findings=[];
  if(!d.access_key && ["NFE","NFCE","CTE"].includes(String(d.document_type).toUpperCase())) findings.push({severity:"high",category:"document",title:"Chave de acesso ausente",detail:"Documento eletrônico sem chave de acesso informada."});
  if(Number(d.total_value||0)<=0) findings.push({severity:"high",category:"value",title:"Valor total inválido",detail:"O valor total deve ser maior que zero."});
  if(!d.issuer_tax_id) findings.push({severity:"medium",category:"registration",title:"CNPJ/CPF do emitente ausente",detail:"Identificação fiscal do emitente não informada."});
  if(!d.issue_date) findings.push({severity:"medium",category:"date",title:"Data de emissão ausente",detail:"Data de emissão necessária para escrituração e competência."});
  for(const f of findings){
    await db.query("INSERT INTO fiscal_findings (document_id,severity,category,title,detail) SELECT $1,$2,$3,$4,$5 WHERE NOT EXISTS (SELECT 1 FROM fiscal_findings WHERE document_id=$1 AND title=$4 AND status='open')",[d.id,f.severity,f.category,f.title,f.detail]);
  }
  await db.query("UPDATE fiscal_documents SET status=$2 WHERE id=$1",[d.id,findings.length?"review":"validated"]);
  const result=await db.query("SELECT * FROM fiscal_findings WHERE document_id=$1 AND status='open' ORDER BY created_at DESC",[d.id]);
  res.json({document_id:d.id,status:findings.length?"review":"validated",findings:result.rows});
}