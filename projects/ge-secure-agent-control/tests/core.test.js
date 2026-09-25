import test from 'node:test'; import assert from 'node:assert/strict'; import { AgentControl } from '../src/control-plane.js';
const ctx=(tenant='t1',actor='admin')=>({tenantId:tenant,actorId:actor,actorType:'USER'});
function setup(){ const c=new AgentControl({executors:{internal:async({payload})=>({accepted:true,payload})}}); const agent=c.registerAgent(ctx(),{id:'a1',name:'Fiscal Agent',ownerUserId:'owner',version:'1.0.0',environment:'production',status:'ACTIVE'}); const action=c.registerAction(ctx(),{id:'act1',code:'invoice.send',integrationId:'internal',operationType:'WRITE',dataClassification:'CONFIDENTIAL',baseRisk:5,reversible:true}); return {c,agent,action}; }

test('deny by default',()=>{ const {c}=setup(); const r=c.evaluateAction(ctx(),{agentId:'a1',actionId:'act1',payload:{x:1}}); assert.equal(r.decision,'DENY'); });
test('explicit allow executes and idempotency prevents duplicate effect',async()=>{ const {c}=setup(); c.publishPolicy(ctx(),{rules:[{effect:'ALLOW',when:{actionCode:'invoice.send'}}]}); const one=await c.executeAction(ctx(),{agentId:'a1',actionId:'act1',payload:{x:1},idempotencyKey:'k1'}); const two=await c.executeAction(ctx(),{agentId:'a1',actionId:'act1',payload:{x:999},idempotencyKey:'k1'}); assert.equal(one.status,'SUCCEEDED'); assert.deepEqual(two,one); });
test('critical risk escalates allow to approval and requires two distinct approvers with step-up',()=>{ const {c}=setup(); c.publishPolicy(ctx(),{rules:[{effect:'ALLOW',when:{actionCode:'invoice.send'}}]}); const e=c.evaluateAction(ctx(),{agentId:'a1',actionId:'act1',scopeExpansionAttempt:true,payload:{x:1},dataClassification:'RESTRICTED'}); assert.equal(e.decision,'REQUIRE_APPROVAL'); const a=c.approve(ctx('t1','approver1'),e.approvalRequestId,{justification:'validated',stepUpVerified:true}); assert.equal(a.status,'PENDING'); const b=c.approve(ctx('t1','approver2'),e.approvalRequestId,{justification:'validated independently',stepUpVerified:true}); assert.equal(b.status,'APPROVED'); });
test('agent owner cannot self approve critical action',()=>{ const {c}=setup(); c.publishPolicy(ctx(),{rules:[{effect:'REQUIRE_APPROVAL',when:{actionCode:'invoice.send'}}]}); const e=c.evaluateAction(ctx(),{agentId:'a1',actionId:'act1',payload:{x:1}}); assert.throws(()=>c.approve(ctx('t1','owner'),e.approvalRequestId,{justification:'self',stepUpVerified:true}),/own critical action/); });
test('payload change after approval is rejected',async()=>{ const {c}=setup(); c.publishPolicy(ctx(),{rules:[{effect:'REQUIRE_APPROVAL',when:{actionCode:'invoice.send'}}]}); const e=c.evaluateAction(ctx(),{agentId:'a1',actionId:'act1',payload:{amount:10}}); c.approve(ctx('t1','approver1'),e.approvalRequestId,{justification:'ok'}); await assert.rejects(()=>c.executeApproved(ctx(),{requestId:e.requestId,payload:{amount:11}}),/Payload changed/); });
test('kill switch overrides allow',()=>{ const {c}=setup(); c.publishPolicy(ctx(),{rules:[{effect:'ALLOW',when:{actionCode:'invoice.send'}}]}); c.activateKillSwitch(ctx(),{scopeType:'AGENT',scopeId:'a1',reason:'incident'}); const r=c.evaluateAction(ctx(),{agentId:'a1',actionId:'act1',payload:{}}); assert.equal(r.decision,'DENY'); assert.deepEqual(r.reasonCodes,['KILL_SWITCH_ACTIVE']); });
test('tenant isolation prevents cross tenant lookup',()=>{ const {c}=setup(); assert.throws(()=>c.evaluateAction(ctx('t2'),{agentId:'a1',actionId:'act1',payload:{}}),/Resource not found/); });
test('audit chain remains valid and secrets are redacted',()=>{ const {c}=setup(); c.audit(ctx(),'SECRET_TEST','TEST','1',{apiKey:'abc',nested:{password:'123'}}); assert.equal(c.store.verifyAuditChain(),true); const last=c.store.audit.at(-1); assert.equal(last.metadata.apiKey,'[REDACTED]'); assert.equal(last.metadata.nested.password,'[REDACTED]'); });
test('deny rule overrides allow rule regardless of priority',()=>{ const {c}=setup(); c.publishPolicy(ctx(),{priority:999,rules:[{effect:'ALLOW',when:{actionCode:'invoice.send'}}]}); c.publishPolicy(ctx(),{priority:0,rules:[{effect:'DENY',when:{actionCode:'invoice.send'},reasonCodes:['EXPLICIT_DENY']}]}); const r=c.evaluateAction(ctx(),{agentId:'a1',actionId:'act1',payload:{}}); assert.equal(r.decision,'DENY'); assert.deepEqual(r.reasonCodes,['EXPLICIT_DENY']); });

test('P1 agent contract denies forbidden method even when policy allows action',()=>{
  const {c}=setup();
  c.store.agents.get('t1:a1').contract={goal:'Send approved invoice',goalBoundary:{allowedMethods:['API'],forbiddenMethods:['SHELL'],allowedResources:[],allowedDestinations:[],maxMonetaryValue:null},endpointPolicy:{allowedHosts:[],allowedDirectories:[],allowedShellCommands:[],allowedNetworkDestinations:[],browserAllowed:true,localSecretAccess:false,processCreationAllowed:true,downloadsAllowed:true,packageInstallAllowed:false},trustedInputPolicy:{minimumTrustLevel:'UNTRUSTED',requireProvenanceForCritical:true}};
  c.publishPolicy(ctx(),{rules:[{effect:'ALLOW',when:{actionCode:'invoice.send'}}]});
  const r=c.evaluateAction(ctx(),{agentId:'a1',actionId:'act1',method:'SHELL',payload:{}});
  assert.equal(r.decision,'DENY'); assert.ok(r.reasonCodes.includes('FORBIDDEN_METHOD'));
});
test('P1 endpoint policy denies unapproved host and local secret access',()=>{
  const {c}=setup();
  c.store.agents.get('t1:a1').contract={goal:'Send invoice',goalBoundary:{allowedMethods:[],forbiddenMethods:[],allowedResources:[],allowedDestinations:[],maxMonetaryValue:null},endpointPolicy:{allowedHosts:['runner-01'],allowedDirectories:[],allowedShellCommands:[],allowedNetworkDestinations:[],browserAllowed:true,localSecretAccess:false,processCreationAllowed:true,downloadsAllowed:true,packageInstallAllowed:false},trustedInputPolicy:{minimumTrustLevel:'UNTRUSTED',requireProvenanceForCritical:true}};
  c.publishPolicy(ctx(),{rules:[{effect:'ALLOW',when:{actionCode:'invoice.send'}}]});
  const r=c.evaluateAction(ctx(),{agentId:'a1',actionId:'act1',executionHost:'developer-laptop',localSecretRequested:true,payload:{}});
  assert.equal(r.decision,'DENY'); assert.ok(r.reasonCodes.includes('ENDPOINT_NOT_ALLOWED')); assert.ok(r.reasonCodes.includes('LOCAL_SECRET_ACCESS_NOT_ALLOWED'));
});
test('P1 trusted input requires configured trust and critical provenance',()=>{
  const {c}=setup();
  c.store.agents.get('t1:a1').contract={goal:'Fiscal action',goalBoundary:{allowedMethods:[],forbiddenMethods:[],allowedResources:[],allowedDestinations:[],maxMonetaryValue:null},endpointPolicy:{allowedHosts:[],allowedDirectories:[],allowedShellCommands:[],allowedNetworkDestinations:[],browserAllowed:true,localSecretAccess:false,processCreationAllowed:true,downloadsAllowed:true,packageInstallAllowed:false},trustedInputPolicy:{minimumTrustLevel:'VERIFIED',requireProvenanceForCritical:true}};
  c.publishPolicy(ctx(),{rules:[{effect:'ALLOW',when:{actionCode:'invoice.send'}}]});
  const low=c.evaluateAction(ctx(),{agentId:'a1',actionId:'act1',inputContext:{trustLevel:'EXTERNAL'},payload:{}});
  assert.equal(low.decision,'DENY'); assert.ok(low.reasonCodes.includes('INPUT_TRUST_TOO_LOW'));
  const critical=c.evaluateAction(ctx(),{agentId:'a1',actionId:'act1',scopeExpansionAttempt:true,inputContext:{trustLevel:'VERIFIED'},payload:{}});
  assert.equal(critical.decision,'DENY'); assert.ok(critical.reasonCodes.includes('CRITICAL_INPUT_PROVENANCE_REQUIRED'));
});
test('P1 approved boundary preserves normal allow behavior',async()=>{
  const {c}=setup();
  c.store.agents.get('t1:a1').contract={goal:'Send invoice',goalBoundary:{allowedMethods:['API'],forbiddenMethods:['SHELL'],allowedResources:['invoice'],allowedDestinations:['tax-api'],maxMonetaryValue:1000},endpointPolicy:{allowedHosts:['runner-01'],allowedDirectories:[],allowedShellCommands:[],allowedNetworkDestinations:['tax-api'],browserAllowed:false,localSecretAccess:false,processCreationAllowed:false,downloadsAllowed:false,packageInstallAllowed:false},trustedInputPolicy:{minimumTrustLevel:'VERIFIED',requireProvenanceForCritical:true}};
  c.publishPolicy(ctx(),{rules:[{effect:'ALLOW',when:{actionCode:'invoice.send'}}]});
  const r=await c.executeAction(ctx(),{agentId:'a1',actionId:'act1',method:'API',resource:'invoice',destination:'tax-api',executionHost:'runner-01',networkDestination:'tax-api',inputContext:{trustLevel:'VERIFIED',provenance:'signed:test'},payload:{x:1},idempotencyKey:'p1-ok'});
  assert.equal(r.status,'SUCCEEDED');
});
