import { db } from "hatchable";
export const access="admin";
export const methods=["POST"];
const safe=(v,max)=>{const s=String(v??"").trim();return s.length<=max?s:null};
const num=(v,min,max)=>{const n=Number(v);return Number.isFinite(n)&&n>=min&&n<=max?n:null};
export default async function(req,res){
  const b=req.body||{};
  const ext=safe(b.external_transaction_id,120),plate=safe(b.vehicle_plate,20),driver=safe(b.driver_name,160),station=safe(b.station_name,200),stationTax=String(b.station_tax_id??"").replace(/\D/g,""),fuel=safe(b.fuel_type,80);
  const liters=num(b.liters,0.001,10000),unit=num(b.unit_price,0,100000),total=num(b.total_value,0.01,1000000000),odo=num(b.odometer??0,0,10000000);
  if(!ext||!plate||!station||!fuel||liters===null||unit===null||total===null||odo===null) return res.status(400).json({error:"invalid_transaction"});
  if(stationTax && stationTax.length!==14) return res.status(400).json({error:"invalid_station_tax_id"});
  const {rows}=await db.query("INSERT INTO fuel_transactions (external_transaction_id,organization_id,vehicle_plate,driver_name,station_name,station_tax_id,fuel_type,liters,unit_price,total_value,transaction_at,odometer) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *",[ext,b.organization_id||null,plate.toUpperCase(),driver||null,station,stationTax||null,fuel,liters,unit,total,b.transaction_at||null,odo]);
  res.status(201).json(rows[0]);
}