import http from 'node:http';
import { URL, fileURLToPath } from 'node:url';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { redact } from './security.js';

const readJson = req => new Promise((resolve,reject)=>{ let body=''; req.on('data',c=>{body+=c;if(body.length>1_000_000) reject(Object.assign(new Error('Payload too large'),{status:413,code:'PAYLOAD_TOO_LARGE'}));}); req.on('end',()=>{try{resolve(body?JSON.parse(body):{});}catch{reject(Object.assign(new Error('Invalid JSON'),{status:400,code:'INVALID_JSON'}));}}); });
const send=(res,status,data)=>{ const body=JSON.stringify(data); res.writeHead(status,{'content-type':'application/json; charset=utf-8','content-length':Buffer.byteLength(body),'cache-control':'no-store','x-content-type-options':'nosniff','content-security-policy':"default-src 'none'",'referrer-policy':'no-referrer'}); res.end(body); };
const fail=(code,message,status=401)=>Object.assign(new Error(message),{code,status});
const root=join(dirname(fileURLToPath(import.meta.url)),'..','web');
const staticFiles={'/':['index.html','text/html; charset=utf-8'],'/app.js':['app.js','text/javascript; charset=utf-8'],'/styles.css':['styles.css','text/css; charset=utf-8']};
const sendStatic=(res,path)=>{const [name,type]=staticFiles[path];const body=readFileSync(join(root,name));res.writeHead(200,{'content-type':type,'content-length':body.length,'cache-control':'no-store','x-content-type-options':'nosniff','content-security-policy':"default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; frame-ancestors 'none'",'referrer-policy':'no-referrer'});res.end(body);};

function resolveIdentity(req,authMode){
  const tenantId=String(req.headers['x-tenant-id']||''); const actorId=String(req.headers['x-actor-id']||'');
  if(authMode==='dev'){ if(!tenantId||!actorId) throw fail('DEV_IDENTITY_REQUIRED','x-tenant-id and x-actor-id required'); return {tenantId,actorId,actorType:'USER'}; }
  if(authMode==='trusted-proxy'){
    const secret=process.env.AUTH_PROXY_SECRET||''; if(secret.length<32) throw fail('AUTH_MISCONFIGURED','Trusted proxy authentication is not configured',503);
    const ts=String(req.headers['x-auth-ts']||''); const sig=String(req.headers['x-auth-signature']||''); if(!tenantId||!actorId||!ts||!sig) throw fail('AUTH_REQUIRED','Verified identity headers required');
    const seconds=Number(ts); if(!Number.isFinite(seconds)||Math.abs(Date.now()/1000-seconds)>300) throw fail('AUTH_EXPIRED','Identity assertion expired');
    const expected=createHmac('sha256',secret).update(`${tenantId}.${actorId}.${ts}`).digest('hex');
    const a=Buffer.from(sig); const b=Buffer.from(expected); if(a.length!==b.length||!timingSafeEqual(a,b)) throw fail('AUTH_INVALID','Invalid identity assertion');
    return {tenantId,actorId,actorType:'USER'};
  }
  throw fail('AUTH_MODE_UNSUPPORTED','Unsupported authentication mode',503);
}

export function createServer(control,{authMode=process.env.AUTH_MODE||'dev'}={}){
  if(process.env.NODE_ENV==='production'&&authMode==='dev') throw new Error('AUTH_MODE=dev is forbidden in production');
  return http.createServer(async(req,res)=>{
    try{
      const url=new URL(req.url,'http://localhost'); if(url.pathname==='/health') return send(res,200,{status:'ok'});
      const ctx=resolveIdentity(req,authMode); if(req.method==='GET'&&staticFiles[url.pathname]) return sendStatic(res,url.pathname); const body=['POST','PUT','PATCH'].includes(req.method)?await readJson(req):{};
      if(req.method==='GET'&&url.pathname==='/api/v1/command-center') return send(res,200,control.getCommandCenter(ctx));
      if(req.method==='POST'&&url.pathname==='/api/v1/agents') return send(res,201,control.registerAgent(ctx,body));
      if(req.method==='POST'&&url.pathname==='/api/v1/actions/catalog') return send(res,201,control.registerAction(ctx,body));
      if(req.method==='POST'&&url.pathname==='/api/v1/policies') return send(res,201,control.publishPolicy(ctx,body));
      if(req.method==='POST'&&url.pathname==='/api/v1/actions/evaluate') return send(res,200,control.evaluateAction(ctx,body));
      if(req.method==='POST'&&url.pathname==='/api/v1/actions/execute') return send(res,200,await control.executeAction(ctx,{...body,idempotencyKey:req.headers['idempotency-key']||body.idempotencyKey}));
      if(req.method==='POST'&&url.pathname==='/api/v1/actions/execute-approved') return send(res,200,await control.executeApproved(ctx,{...body,idempotencyKey:req.headers['idempotency-key']||body.idempotencyKey}));
      if(req.method==='GET'&&url.pathname==='/api/v1/approvals') return send(res,200,{items:control.listApprovals(ctx)});
      let m=url.pathname.match(/^\/api\/v1\/approvals\/([^/]+)\/(approve|reject)$/); if(req.method==='POST'&&m) return send(res,200,control.approve(ctx,m[1],{...body,decision:m[2]==='approve'?'APPROVE':'REJECT'}));
      if(req.method==='GET'&&url.pathname==='/api/v1/audit/events') return send(res,200,{items:control.getAudit(ctx),chainValid:control.store.verifyAuditChain()});
      if(req.method==='POST'&&url.pathname==='/api/v1/kill-switches') return send(res,201,control.activateKillSwitch(ctx,body));
      m=url.pathname.match(/^\/api\/v1\/kill-switches\/([^/]+)\/deactivate$/); if(req.method==='POST'&&m) return send(res,200,control.deactivateKillSwitch(ctx,m[1],body.reason));
      return send(res,404,{error:{code:'NOT_FOUND',message:'Route not found'}});
    }catch(error){ send(res,error.status||500,{error:{code:error.code||'INTERNAL_ERROR',message:error.status&&error.status<500?error.message:'Internal error',details:redact(error.details||[])}}); }
  });
}
