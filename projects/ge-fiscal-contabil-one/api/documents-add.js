import { db } from "hatchable";
export const access="admin";
export const methods=["POST"];
const TYPES=new Set(["NFE","NFCE","NFSE","CTE","RECIBO","OUTRO"]);
const SOURCES=new Set(["manual","ocr","api","xml"]);
const safe=(v,max)=>{const s=String(v??"").trim();return s.length<=max?s:null};
const money=v=>{const n=Number(v??0);return Number.isFinite(n)&&n>=0&&n<=1000000000?n:null};
const taxid=v=>{const s=String(v??"").replace(/\D/g,"");return !s||s.length===11||s.length===14?s:null};
const key=v=>{const s=String(v??"").replace(/\D/g,"");return !s||s.length===44?s:null};
export default async function(req,res){
 const b=req.body||{}; const type=TYPES.has(b.document_type)?b.document_type:null; const source=SOURCES.has(b.source)?b.source:"manual";
 const accessKey=key(b.access_key); const issuer=safe(b.issuer_name,200); const issuerTax=taxid(b.issuer_tax_id);
 const recipient=safe(b.recipient_name,200); const recipientTax=taxid(b.recipient_tax_id);
 const total=money(b.total_value); const tax=money(b.tax_value); const raw=safe(b.raw_text,20000);
 if(!type) return res.status(400).json({error:"invalid_document_type"});
 if(accessKey===null||issuer===null||issuerTax===null||recipient===null||recipientTax===null||raw===null) return res.status(400).json({error:"invalid_text_field"});
 if(total===null||tax===null||tax>total) return res.status(400).json({error:"invalid_value"});
 if(b.issue_date && !/^\d{4}-\d{2}-\d{2}$/.test(String(b.issue_date))) return res.status(400).json({error:"invalid_issue_date"});
 const {rows}=await db.query("INSERT INTO fiscal_documents (document_type,access_key,issuer_name,issuer_tax_id,recipient_name,recipient_tax_id,issue_date,total_value,tax_value,source,status,raw_text) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *",[type,accessKey||null,issuer||null,issuerTax||null,recipient||null,recipientTax||null,b.issue_date||null,total,tax,source,"received",raw||null]);
 res.status(201).json(rows[0]);
}