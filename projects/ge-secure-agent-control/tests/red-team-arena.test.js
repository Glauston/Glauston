// G|E Red Team Arena: isolated in-process HTTP lab. No external services, no real data.
// Only attacks the locally created test server using synthetic actors and tenants.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { AgentControl } from '../src/control-plane.js';
import { createServer } from '../src/server.js';

const SECRET = 'ge-red-team-arena-test-secret-never-for-production-2026';
process.env.AUTH_PROXY_SECRET = SECRET;
const tenant = 'arena-company-a', outsider = 'arena-company-b';

async function arena(t) {
  const control = new AgentControl({executors: {internal: async () => ({synthetic: true})}});
  const server = createServer(control, {authMode:'trusted-proxy'});
  await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  t.after(async () => {await new Promise(resolve => server.close(resolve));});
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  const administrator = {tenantId:tenant,actorId:'synthetic-sec-admin',actorType:'USER'};
  const agent = control.registerAgent(administrator,{id:'arena-agent',name:'Arena Agent',ownerUserId:'synthetic-owner',version:'0.0.0-test',status:'ACTIVE'});
  const action = control.registerAction(administrator,{id:'arena-action',code:'arena.read',integrationId:'internal',operationType:'READ'});
  const emergency = control.activateKillSwitch(administrator,{scopeType:'AGENT',scopeId:agent.id,reason:'Synthetic containment exercise'});
  return {control,baseUrl,agent,action,emergency};
}

function signedHeaders({tenantId=tenant,actorId='synthetic-reader',role='VIEWER'}={}) {
  const ts = String(Math.floor(Date.now()/1000));
  // Stage 2: role is part of the authenticated claim to prevent client-side escalation.
  const sig = createHmac('sha256',SECRET).update(`${tenantId}.${actorId}.${role}.${ts}`).digest('hex');
  return {'content-type':'application/json','x-tenant-id':tenantId,'x-actor-id':actorId,'x-actor-role':role,'x-auth-ts':ts,'x-auth-signature':sig};
}

async function probe(baseUrl,path,{method='GET',body=null,headers=null}={}) {
  const resp=await fetch(baseUrl+path,{
    method,
    headers:headers??signedHeaders(),
    ...(body===null?{}:{body:JSON.stringify(body)})
  });
  let data={};try{data=await resp.json();}catch{}
  return {status:resp.status,data};
}

test('RT-01: unauthenticated identity cannot access the audit endpoint',async t=>{
  const {baseUrl}=await arena(t);
  const r=await probe(baseUrl,'/api/v1/audit/events',{headers:{}});
  assert.equal(r.status,401);
});

test('RT-02: signed identity tampering is rejected',async t=>{
  const {baseUrl}=await arena(t);
  const signed=signedHeaders({actorId:'authorized'});
  signed['x-actor-id']='forged-actor';
  const r=await probe(baseUrl,'/api/v1/command-center',{headers:signed});
  assert.equal(r.status,401);
});

test('RT-03: different tenant cannot access arena agent',async t=>{
  const {baseUrl}=await arena(t);
  const r=await probe(baseUrl,'/api/v1/actions/evaluate',{
    method:'POST',headers:signedHeaders({tenantId:outsider,role:'OPERATOR'}),
    body:{agentId:'arena-agent',actionId:'arena-action',payload:{test:true}}
  });
  assert.equal(r.status,404);
});

test('RT-04 P0: viewer cannot publish an authorization policy',async t=>{
  const {baseUrl}=await arena(t);
  const r=await probe(baseUrl,'/api/v1/policies',{method:'POST',
    headers:signedHeaders({role:'VIEWER'}),
    body:{name:'unauthorized-policy',rules:[{effect:'ALLOW',when:{actionCode:'arena.read'}}]}
  });
  assert.equal(r.status,403,'AUTHZ_BYPASS: viewer published security policy instead of being denied');
});

test('RT-05 P0: viewer cannot disable emergency kill switch',async t=>{
  const {baseUrl,emergency}=await arena(t);
  const r=await probe(baseUrl,`/api/v1/kill-switches/${emergency.id}/deactivate`,{
    method:'POST',headers:signedHeaders({role:'VIEWER'}),
    body:{reason:'attempted unauthorized override'}
  });
  assert.equal(r.status,403,'AUTHZ_BYPASS: viewer disabled kill switch instead of being denied');
});

test('RT-06: read-only viewer cannot view audit records',async t=>{
  const {baseUrl}=await arena(t);
  const r=await probe(baseUrl,'/api/v1/audit/events',{headers:signedHeaders({role:'VIEWER'})});
  assert.equal(r.status,403);
});

test('RT-07: changing role on a signed assertion is rejected',async t=>{
  const {baseUrl}=await arena(t);
  const identity=signedHeaders({role:'VIEWER'});
  identity['x-actor-role']='SECURITY_ADMIN';
  const r=await probe(baseUrl,'/api/v1/command-center',{headers:identity});
  assert.equal(r.status,401);
});

test('RT-08: authorized security administrator can publish synthetic policy',async t=>{
  const {baseUrl}=await arena(t);
  const r=await probe(baseUrl,'/api/v1/policies',{
    method:'POST',headers:signedHeaders({actorId:'synthetic-sec-admin',role:'SECURITY_ADMIN'}),
    body:{name:'synthetic-allow',rules:[{effect:'ALLOW',when:{actionCode:'arena.read'}}]}
  });
  assert.equal(r.status,201);
});

test('RT-09: viewer cannot execute a tool',async t=>{
  const {baseUrl}=await arena(t);
  const r=await probe(baseUrl,'/api/v1/actions/execute',{
    method:'POST',headers:signedHeaders({role:'VIEWER'}),
    body:{agentId:'arena-agent',actionId:'arena-action',idempotencyKey:'test-viewer-execute'}
  });
  assert.equal(r.status,403);
});

test('RT-10: tenant B cannot deactivate tenant A emergency kill switch',async t=>{
  const {baseUrl,emergency}=await arena(t);
  const r=await probe(baseUrl,`/api/v1/kill-switches/${emergency.id}/deactivate`,{
    method:'POST',headers:signedHeaders({tenantId:outsider,actorId:'synthetic-admin-b',role:'SECURITY_ADMIN'}),
    body:{reason:'cross tenant attempt'}
  });
  assert.equal(r.status,404);
});
