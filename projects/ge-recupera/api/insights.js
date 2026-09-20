import { db } from "hatchable";
export const access = "member";
export const methods = ["GET"];
export default async function(req,res){
  const {rows}=await db.query("SELECT * FROM opportunities WHERE status='open' ORDER BY estimated_value DESC, days_idle DESC LIMIT 200");
  const ranked=rows.map(o=>{
    const value=Number(o.estimated_value||0);
    const idle=Number(o.days_idle||0);
    const prob=Number(o.probability||0);
    const urgency=Math.min(100, idle*4 + (o.kind==='renewal'?22:0) + (o.kind==='proposal'?15:0));
    const score=Math.round((Math.min(value/10000,100)*0.35)+(prob*0.35)+(urgency*0.30));
    let reason="Oportunidade ativa";
    if(idle>=14) reason="Sem interação há mais de 14 dias";
    else if(o.kind==='renewal') reason="Renovação exige ação preventiva";
    else if(o.kind==='upsell') reason="Potencial de expansão de receita";
    else if(o.kind==='proposal') reason="Proposta aberta precisa de follow-up";
    return {...o,score,reason,weighted_value:value*prob/100};
  }).sort((a,b)=>b.score-a.score);
  const total=ranked.reduce((s,x)=>s+x.weighted_value,0);
  res.json({generated_at:new Date().toISOString(),recoverable_weighted:total,top:ranked.slice(0,20)});
}