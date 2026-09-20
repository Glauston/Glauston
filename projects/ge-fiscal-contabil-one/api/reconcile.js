import { db } from "hatchable";
export const access="admin";
export const methods=["POST"];
const pct=(a,b)=>b===0?0:Math.max(0,100-Math.abs(a-b)/Math.max(Math.abs(b),1)*100);
export default async function(req,res){
  const b=req.body||{};
  if(!b.fuel_transaction_id||!b.fiscal_document_id) return res.status(400).json({error:"ids_required"});
  const txq=await db.query("SELECT * FROM fuel_transactions WHERE id=$1",[b.fuel_transaction_id]);
  const dfq=await db.query("SELECT * FROM fiscal_documents WHERE id=$1",[b.fiscal_document_id]);
  if(!txq.rows.length||!dfq.rows.length) return res.status(404).json({error:"not_found"});
  const tx=txq.rows[0], d=dfq.rows[0];
  let score=0; const reasons=[];
  const valueScore=pct(Number(d.total_value||0),Number(tx.total_value||0)); score+=valueScore*0.45;
  if(tx.station_tax_id && d.issuer_tax_id){if(tx.station_tax_id===d.issuer_tax_id) score+=25; else reasons.push("CNPJ do posto difere do emitente");}
  else reasons.push("CNPJ insuficiente para conferência");
  if(d.issue_date && tx.transaction_at){const dd=String(d.issue_date),td=String(tx.transaction_at).slice(0,10); if(dd===td) score+=15; else reasons.push("Data fiscal difere da transação");}
  else reasons.push("Data insuficiente para conferência");
  if(String(d.document_type).toUpperCase()==="NFCE") score+=15; else reasons.push("Documento não é NFC-e");
  score=Math.min(100,Math.round(score*100)/100);
  const status=score>=90?"matched":score>=70?"review":"blocked";
  await db.query("INSERT INTO fiscal_links (fuel_transaction_id,fiscal_document_id,match_score,match_status,divergence_reason) VALUES ($1,$2,$3,$4,$5) ON CONFLICT (fuel_transaction_id,fiscal_document_id) DO UPDATE SET match_score=$3,match_status=$4,divergence_reason=$5",[tx.id,d.id,score,status,reasons.join("; ")||null]);
  await db.query("UPDATE fuel_transactions SET status=$2 WHERE id=$1",[tx.id,status==="matched"?"fiscal_validated":"fiscal_"+status]);
  res.json({fuel_transaction_id:tx.id,fiscal_document_id:d.id,match_score:score,match_status:status,divergences:reasons});
}