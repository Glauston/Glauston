const API="/api";const brl=v=>Number(v||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const esc=v=>String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
async function refresh(){
  const [s,i]=await Promise.all([fetch(API+"/summary").then(r=>r.json()),fetch(API+"/insights").then(r=>r.json())]);
  pipeline.textContent=brl(s.pipeline);weighted.textContent=brl(s.weighted);open.textContent=s.open_count||0;idle.textContent=s.idle_count||0;
  rows.innerHTML=(i.top||[]).length?(i.top||[]).map(x=>"<tr><td class='score "+(x.score>=70?"hot":"")+"'>"+x.score+"</td><td><b>"+esc(x.company_name)+"</b></td><td><span class='tag'>"+esc(x.kind)+"</span></td><td>"+brl(x.estimated_value)+"</td><td>"+esc(x.reason)+"</td><td>"+esc(x.next_action||"Definir ação")+"</td></tr>").join(""):"<tr><td colspan='6' class='muted'>Cadastre a primeira oportunidade para iniciar o radar.</td></tr>";
}
form.addEventListener("submit",async e=>{
  e.preventDefault();
  const data=Object.fromEntries(new FormData(e.currentTarget).entries());
  const r=await fetch(API+"/opportunities-add",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(data)});
  if(r.status===403){alert("Somente administradores podem cadastrar oportunidades.");return;}
  if(!r.ok){alert("Dados inválidos ou não foi possível salvar.");return;}
  e.currentTarget.reset();e.currentTarget.probability.value=50;e.currentTarget.days_idle.value=0;await refresh();
});
refresh();