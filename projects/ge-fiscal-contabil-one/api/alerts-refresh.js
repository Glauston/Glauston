import { db } from "hatchable";
export const access="admin";
export const methods=["POST"];
async function upsert(key,type,severity,title,detail,sourceType,sourceId,action,dueAt){
  await db.query(`INSERT INTO operational_alerts
    (alert_key,alert_type,severity,title,detail,source_type,source_id,recommended_action,due_at,status,last_seen_at)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'open',now())
    ON CONFLICT (alert_key) DO UPDATE SET
      alert_type=$2,severity=$3,title=$4,detail=$5,source_type=$6,source_id=$7,
      recommended_action=$8,due_at=$9,status='open',last_seen_at=now(),resolved_at=NULL`,
    [key,type,severity,title,detail,sourceType,sourceId,action,dueAt||null]);
}
export default async function(req,res){
  const seen=[];
  const tx=await db.query("SELECT id,external_transaction_id,vehicle_plate,station_name,total_value,transaction_at,status FROM fuel_transactions WHERE status<>'fiscal_validated'");
  for(const x of tx.rows){
    const type=x.status==='awaiting_fiscal'?'missing_nfce':'reconciliation_exception';
    const sev=x.status==='fiscal_blocked'?'critical':x.status==='fiscal_review'?'high':'medium';
    const key='fuel:'+x.id; seen.push(key);
    const title=x.status==='awaiting_fiscal'?'Abastecimento aguardando NFC-e':'Abastecimento com divergência fiscal';
    const detail=`${x.external_transaction_id} • ${x.vehicle_plate||'-'} • ${x.station_name||'-'} • R$ ${Number(x.total_value||0).toFixed(2)}`;
    const action=x.status==='awaiting_fiscal'?'Capturar/receber a NFC-e e executar a conciliação.':'Revisar CNPJ, data, valor, tipo de documento e divergências do match.';
    const due=x.transaction_at?new Date(new Date(x.transaction_at).getTime()+24*60*60*1000).toISOString():null;
    await upsert(key,type,sev,title,detail,'fuel_transaction',String(x.id),action,due);
  }
  const bills=await db.query("SELECT id,reference_month,blocked_value,status FROM billing_batches WHERE blocked_value>0 AND status<>'closed'");
  for(const x of bills.rows){
    const key='billing:'+x.id; seen.push(key);
    await upsert(key,'billing_blocked','high','Faturamento com valor bloqueado',`Competência ${x.reference_month} • R$ ${Number(x.blocked_value||0).toFixed(2)} bloqueados`,'billing_batch',String(x.id),'Resolver exceções fiscais antes da liberação do lote.',null);
  }
  const obs=await db.query("SELECT id,obligation_type,reference_period,due_date,status,risk_level FROM fiscal_obligations WHERE status NOT IN ('done','delivered','cancelled')");
  for(const x of obs.rows){
    const key='obligation:'+x.id; seen.push(key);
    const due=x.due_date?new Date(String(x.due_date)+'T23:59:59Z'):null;
    const days=due?Math.ceil((due-Date.now())/86400000):9999;
    if(days<=15){
      const sev=days<0?'critical':days<=3?'high':'medium';
      await upsert(key,'fiscal_obligation',sev,`${x.obligation_type} • ${x.reference_period}`,days<0?'Obrigação vencida.':`Vencimento em ${days} dia(s).`,'fiscal_obligation',String(x.id),'Revisar documentos, apuração e protocolo da obrigação.',due?due.toISOString():null);
    }
  }
  const finds=await db.query("SELECT id,severity,category,title,detail FROM fiscal_findings WHERE status='open'");
  for(const x of finds.rows){
    const key='finding:'+x.id; seen.push(key);
    await upsert(key,'fiscal_finding',x.severity||'medium',x.title,x.detail||x.category,'fiscal_finding',String(x.id),'Analisar o achado e registrar a correção/evidência.',null);
  }
  if(seen.length){
    await db.query("UPDATE operational_alerts SET status='resolved',resolved_at=now() WHERE status='open' AND NOT (alert_key = ANY($1::text[]))",[seen]);
  }else{
    await db.query("UPDATE operational_alerts SET status='resolved',resolved_at=now() WHERE status='open'");
  }
  const count=await db.query("SELECT COUNT(*)::int AS open_count FROM operational_alerts WHERE status='open'");
  res.json({open_count:count.rows[0].open_count});
}