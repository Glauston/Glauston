import test from 'node:test';
import assert from 'node:assert/strict';
import { AgentControl } from '../src/control-plane.js';

const ctx=(tenant='red-team',actor='attacker')=>({tenantId:tenant,actorId:actor,actorType:'USER'});
function target(){
  const c=new AgentControl({executors:{internal:async({payload})=>({ok:true,payload})}});
  c.registerAgent(ctx('red-team','admin'),{
    id:'agent-secure',name:'Protected Agent',ownerUserId:'owner',version:'1.0.0',environment:'production',status:'ACTIVE',
    contract:{goal:'Execute approved business API actions',goalBoundary:{allowedMethods:['API'],forbiddenMethods:['SHELL'],allowedResources:['invoice'],allowedDestinations:['trusted-api'],maxMonetaryValue:1000},endpointPolicy:{allowedHosts:['runner-01'],allowedDirectories:['/workspace/safe'],allowedShellCommands:[],allowedNetworkDestinations:['trusted-api'],browserAllowed:false,localSecretAccess:false,processCreationAllowed:false,downloadsAllowed:false,packageInstallAllowed:false},trustedInputPolicy:{minimumTrustLevel:'VERIFIED',requireProvenanceForCritical:true}}
  });
  c.registerAction(ctx('red-team','admin'),{id:'act',code:'invoice.send',integrationId:'internal',operationType:'WRITE',dataClassification:'CONFIDENTIAL',baseRisk:5,reversible:true});
  c.publishPolicy(ctx('red-team','admin'),{rules:[{effect:'ALLOW',when:{actionCode:'invoice.send'}}]});
  return c;
}
const attack=(c,input)=>c.evaluateAction(ctx(),{agentId:'agent-secure',actionId:'act',payload:{probe:true},...input});

test('HACKER: generic ALLOW cannot bypass forbidden shell',()=>{const r=attack(target(),{method:'SHELL'});assert.equal(r.decision,'DENY');assert.ok(r.reasonCodes.includes('FORBIDDEN_METHOD'));});
test('HACKER: cannot pivot to unapproved resource or destination',()=>{const r=attack(target(),{method:'API',resource:'admin-users',destination:'evil-api'});assert.equal(r.decision,'DENY');assert.ok(r.reasonCodes.includes('RESOURCE_OUTSIDE_GOAL_BOUNDARY'));assert.ok(r.reasonCodes.includes('DESTINATION_OUTSIDE_GOAL_BOUNDARY'));});
test('HACKER: cannot exceed economic mandate',()=>{const r=attack(target(),{method:'API',resource:'invoice',destination:'trusted-api',monetaryValue:1001});assert.equal(r.decision,'DENY');assert.ok(r.reasonCodes.includes('ECONOMIC_AUTHORITY_EXCEEDED'));});
test('HACKER: cannot escape endpoint to developer laptop or filesystem',()=>{const r=attack(target(),{executionHost:'developer-laptop',directory:'/home/user/.ssh'});assert.equal(r.decision,'DENY');assert.ok(r.reasonCodes.includes('ENDPOINT_NOT_ALLOWED'));assert.ok(r.reasonCodes.includes('FILESYSTEM_SCOPE_VIOLATION'));});
test('HACKER: cannot request browser local secrets process download or package install',()=>{const r=attack(target(),{browserRequested:true,localSecretRequested:true,processCreationRequested:true,downloadRequested:true,packageInstallRequested:true});assert.equal(r.decision,'DENY');for(const code of ['BROWSER_NOT_ALLOWED','LOCAL_SECRET_ACCESS_NOT_ALLOWED','PROCESS_CREATION_NOT_ALLOWED','DOWNLOAD_NOT_ALLOWED','PACKAGE_INSTALL_NOT_ALLOWED']) assert.ok(r.reasonCodes.includes(code));});
test('HACKER: poisoned external context cannot authorize action',()=>{const r=attack(target(),{method:'API',resource:'invoice',destination:'trusted-api',inputContext:{trustLevel:'EXTERNAL',provenance:'web-to-lead'}});assert.equal(r.decision,'DENY');assert.ok(r.reasonCodes.includes('INPUT_TRUST_TOO_LOW'));});
test('HACKER: critical context without provenance is stopped',()=>{const r=attack(target(),{method:'API',resource:'invoice',destination:'trusted-api',scopeExpansionAttempt:true,inputContext:{trustLevel:'VERIFIED'}});assert.equal(r.decision,'DENY');assert.ok(r.reasonCodes.includes('CRITICAL_INPUT_PROVENANCE_REQUIRED'));});
test('HACKER: cross-tenant agent lookup fails',()=>{const c=target();assert.throws(()=>c.evaluateAction(ctx('other-tenant'),{agentId:'agent-secure',actionId:'act',payload:{}}),/Resource not found/);});
test('HACKER: kill switch wins after prior authorization',()=>{const c=target();c.activateKillSwitch(ctx('red-team','guardian'),{scopeType:'AGENT',scopeId:'agent-secure',reason:'red-team containment'});const r=attack(c,{method:'API',resource:'invoice',destination:'trusted-api',inputContext:{trustLevel:'VERIFIED',provenance:'signed:test'}});assert.equal(r.decision,'DENY');assert.deepEqual(r.reasonCodes,['KILL_SWITCH_ACTIVE']);});
test('HACKER: payload cannot mutate after approval',async()=>{const c=target();c.publishPolicy(ctx('red-team','admin'),{priority:100,rules:[{effect:'REQUIRE_APPROVAL',when:{actionCode:'invoice.send'}}]});const e=c.evaluateAction(ctx(),{agentId:'agent-secure',actionId:'act',method:'API',resource:'invoice',destination:'trusted-api',inputContext:{trustLevel:'VERIFIED',provenance:'signed:test'},payload:{amount:10}});if(e.approvalRequestId){c.approve(ctx('red-team','approver'),e.approvalRequestId,{justification:'red team approval'});await assert.rejects(()=>c.executeApproved(ctx(),{requestId:e.requestId,payload:{amount:999}}),/Payload changed/);}else assert.fail('approval expected');});
