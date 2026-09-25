import { MemoryStore } from './store.js';
import { evaluateRisk } from './risk-engine.js';
import { evaluatePolicy } from './policy-engine.js';
import { assert, sha256, uuid } from './security.js';
import { normalizeAgentContract, evaluateRuntimeBoundary } from './runtime-governance.js';

export class AgentControl {
  constructor({store=new MemoryStore(), executors={}}={}) { this.store=store; this.executors=executors; }

  registerAgent(ctx, input) {
    assert(input.name && input.ownerUserId && input.version, 'INVALID_AGENT', 'name, ownerUserId and version are required');
    const agent={id:input.id||uuid(), tenantId:ctx.tenantId, name:input.name, ownerUserId:input.ownerUserId, version:input.version, environment:input.environment||'dev', status:input.status||'DRAFT', riskTier:input.riskTier||'STANDARD', contract:input.contract?normalizeAgentContract(input.contract):null};
    this.store.put(this.store.agents, ctx.tenantId, agent); this.audit(ctx,'AGENT_REGISTERED','AGENT',agent.id,{status:agent.status}); return agent;
  }
  registerAction(ctx,input){
    assert(input.code && input.operationType, 'INVALID_ACTION', 'code and operationType are required');
    const action={id:input.id||uuid(),tenantId:ctx.tenantId,code:input.code,integrationId:input.integrationId||'internal',operationType:input.operationType,dataClassification:input.dataClassification||'INTERNAL',baseRisk:Number(input.baseRisk||0),reversible:Boolean(input.reversible),status:'ACTIVE'};
    this.store.put(this.store.actions,ctx.tenantId,action); this.audit(ctx,'ACTION_REGISTERED','ACTION',action.id,{code:action.code}); return action;
  }
  publishPolicy(ctx,input){
    assert(Array.isArray(input.rules) && input.rules.length, 'INVALID_POLICY', 'At least one rule is required');
    const policy={id:input.id||uuid(),tenantId:ctx.tenantId,name:input.name||'Policy',version:input.version||1,status:'ACTIVE',priority:Number(input.priority||0),rules:input.rules};
    this.store.put(this.store.policies,ctx.tenantId,policy); this.audit(ctx,'POLICY_PUBLISHED','POLICY',policy.id,{version:policy.version}); return policy;
  }
  activateKillSwitch(ctx,{scopeType,scopeId='*',reason}){
    assert(reason, 'REASON_REQUIRED', 'Kill switch reason is required');
    const ks={id:uuid(),tenantId:ctx.tenantId,scopeType,scopeId,status:'ACTIVE',reason,activatedBy:ctx.actorId,activatedAt:new Date().toISOString()};
    this.store.put(this.store.killSwitches,ctx.tenantId,ks); this.audit(ctx,'KILL_SWITCH_ACTIVATED','KILL_SWITCH',ks.id,{scopeType,scopeId,reason}); return ks;
  }
  deactivateKillSwitch(ctx,id,reason){ const ks=this.store.get(this.store.killSwitches,ctx.tenantId,id); assert(reason,'REASON_REQUIRED','Reason required'); ks.status='INACTIVE'; ks.deactivatedBy=ctx.actorId; ks.deactivatedAt=new Date().toISOString(); this.store.put(this.store.killSwitches,ctx.tenantId,ks); this.audit(ctx,'KILL_SWITCH_DEACTIVATED','KILL_SWITCH',id,{reason}); return ks; }
  isKilled(tenantId, agentId, actionId, environment){ return this.store.list(this.store.killSwitches,tenantId).some(k=>k.status==='ACTIVE' && (k.scopeType==='GLOBAL'||k.scopeType==='TENANT'||(k.scopeType==='AGENT'&&k.scopeId===agentId)||(k.scopeType==='ACTION'&&k.scopeId===actionId)||(k.scopeType==='ENVIRONMENT'&&k.scopeId===environment))); }

  evaluateAction(ctx,input){
    const agent=this.store.get(this.store.agents,ctx.tenantId,input.agentId,'AGENT_NOT_FOUND');
    const action=this.store.list(this.store.actions,ctx.tenantId).find(a=>a.id===input.actionId||a.code===input.actionCode); assert(action,'ACTION_NOT_FOUND','Action not found',404);
    assert(agent.status==='ACTIVE','AGENT_INACTIVE','Agent is not active',403);
    const requestId=input.requestId||uuid(), traceId=input.traceId||uuid(), payloadHash=sha256(input.payload||{});
    if(this.isKilled(ctx.tenantId,agent.id,action.id,input.environment||agent.environment)) return this.decision(ctx,{requestId,traceId,agent,action,input,payloadHash},'DENY',{score:100,level:'CRITICAL',signals:[{code:'KILL_SWITCH',points:100}]},['KILL_SWITCH_ACTIVE']);
    const risk=evaluateRisk({baseRisk:action.baseRisk,operationType:action.operationType,dataClassification:input.dataClassification||action.dataClassification,monetaryValue:input.monetaryValue,destination:input.destination,newDestination:input.newDestination,unusualTime:input.unusualTime,recentAgentChange:input.recentAgentChange,consecutiveFailures:input.consecutiveFailures,scopeExpansionAttempt:input.scopeExpansionAttempt});
    const boundary=evaluateRuntimeBoundary(agent,input,risk);
    if(boundary.decision==='DENY') {
      const boundaryRisk={...risk,score:Math.max(risk.score,85),level:'CRITICAL',signals:[...risk.signals,...boundary.signals.map(s=>({code:s.code,points:0,detail:s.detail}))]};
      return this.decision(ctx,{requestId,traceId,agent,action,input,payloadHash},'DENY',boundaryRisk,boundary.reasonCodes,null,boundary.contractHash);
    }
    const p=evaluatePolicy(this.store.list(this.store.policies,ctx.tenantId),{agentId:agent.id,actionId:action.id,actionCode:action.code,operationType:action.operationType,dataClassification:input.dataClassification||action.dataClassification,environment:input.environment||agent.environment,riskLevel:risk.level,riskScore:risk.score,destination:input.destination,monetaryValue:Number(input.monetaryValue||0)});
    let final=p.decision;
    if(risk.level==='CRITICAL' && final==='ALLOW') final='REQUIRE_APPROVAL';
    return this.decision(ctx,{requestId,traceId,agent,action,input,payloadHash},final,risk,p.reasonCodes,p.policy,boundary.contractHash);
  }
  decision(ctx,b,decision,risk,reasonCodes,policy=null,contractHash=null){
    const req={id:uuid(),tenantId:ctx.tenantId,requestId:b.requestId,traceId:b.traceId,agentId:b.agent.id,agentVersion:b.agent.version,actionId:b.action.id,actionCode:b.action.code,environment:b.input.environment||b.agent.environment,payloadHash:b.payloadHash,payload:b.input.payload||{},destination:b.input.destination||null,monetaryValue:Number(b.input.monetaryValue||0),risk,decision,reasonCodes,policy,contractHash,status:decision==='DENY'?'DENIED':decision==='REQUIRE_APPROVAL'?'APPROVAL_REQUIRED':'AUTHORIZED',createdAt:new Date().toISOString()};
    this.store.put(this.store.requests,ctx.tenantId,req); this.audit({...ctx,requestId:req.requestId,traceId:req.traceId,agentId:req.agentId},'ACTION_EVALUATED','ACTION_REQUEST',req.id,{decision,risk,reasonCodes,policy});
    let approvalRequestId=null;
    if(decision==='REQUIRE_APPROVAL'||decision==='REQUIRE_STEP_UP_AUTH'){
      const ap={id:uuid(),tenantId:ctx.tenantId,actionRequestId:req.id,payloadHash:req.payloadHash,requiredApprovals:risk.level==='CRITICAL'?2:1,status:'PENDING',decisions:[],expiresAt:new Date(Date.now()+15*60*1000).toISOString(),createdAt:new Date().toISOString()};
      this.store.put(this.store.approvals,ctx.tenantId,ap); approvalRequestId=ap.id; this.audit(ctx,'APPROVAL_REQUESTED','APPROVAL',ap.id,{requestId:req.requestId,requiredApprovals:ap.requiredApprovals});
    }
    return {requestId:req.requestId,traceId:req.traceId,decision,risk,reasonCodes,approvalRequestId,payloadHash:req.payloadHash};
  }
  approve(ctx,approvalId,{decision='APPROVE',justification='',stepUpVerified=false}={}){
    const ap=this.store.get(this.store.approvals,ctx.tenantId,approvalId,'APPROVAL_NOT_FOUND'); assert(ap.status==='PENDING','APPROVAL_CLOSED','Approval is not pending',409); assert(new Date(ap.expiresAt)>new Date(),'APPROVAL_EXPIRED','Approval expired',409); assert(justification,'JUSTIFICATION_REQUIRED','Justification required');
    const req=this.store.get(this.store.requests,ctx.tenantId,ap.actionRequestId); const agent=this.store.get(this.store.agents,ctx.tenantId,req.agentId); assert(ctx.actorId!==agent.ownerUserId,'SELF_APPROVAL_FORBIDDEN','Agent owner cannot approve its own critical action',403);
    assert(!ap.decisions.some(d=>d.approverUserId===ctx.actorId),'DUPLICATE_APPROVER','Approver already decided',409); if(req.risk.level==='CRITICAL') assert(stepUpVerified,'STEP_UP_REQUIRED','Step-up authentication required',403);
    ap.decisions.push({approverUserId:ctx.actorId,decision,justification,stepUpVerified,decidedAt:new Date().toISOString()});
    if(decision==='REJECT') ap.status='REJECTED'; else if(ap.decisions.filter(d=>d.decision==='APPROVE').length>=ap.requiredApprovals) ap.status='APPROVED';
    this.store.put(this.store.approvals,ctx.tenantId,ap); this.audit(ctx,decision==='REJECT'?'APPROVAL_REJECTED':'APPROVAL_RECORDED','APPROVAL',ap.id,{status:ap.status}); return ap;
  }
  async executeAction(ctx,input){
    assert(input.idempotencyKey,'IDEMPOTENCY_REQUIRED','idempotencyKey required'); const idemKey=`${ctx.tenantId}:${input.idempotencyKey}`; if(this.store.idempotency.has(idemKey)) return structuredClone(this.store.idempotency.get(idemKey));
    const evaluation=this.evaluateAction(ctx,input); if(evaluation.decision==='DENY') { const e=new Error('Action denied'); e.code='POLICY_DENIED'; e.status=403; throw e; }
    if(evaluation.approvalRequestId){ const pending={...evaluation,status:'APPROVAL_REQUIRED'}; this.store.idempotency.set(idemKey,pending); return pending; }
    return this.executeAuthorized(ctx,evaluation.requestId,input.idempotencyKey);
  }
  async executeApproved(ctx,{requestId,idempotencyKey,payload}){
    const req=this.store.list(this.store.requests,ctx.tenantId).find(r=>r.requestId===requestId); assert(req,'REQUEST_NOT_FOUND','Request not found',404); assert(sha256(payload??req.payload)===req.payloadHash,'PAYLOAD_CHANGED','Payload changed after approval',409);
    const ap=this.store.list(this.store.approvals,ctx.tenantId).find(a=>a.actionRequestId===req.id); assert(ap&&ap.status==='APPROVED','APPROVAL_REQUIRED','Approved authorization required',428); assert(ap.payloadHash===req.payloadHash,'APPROVAL_HASH_MISMATCH','Approval hash mismatch',409); return this.executeAuthorized(ctx,requestId,idempotencyKey||requestId);
  }
  async executeAuthorized(ctx,requestId,idempotencyKey){
    const idemKey=`${ctx.tenantId}:${idempotencyKey}`; if(this.store.idempotency.has(idemKey)&&this.store.idempotency.get(idemKey).status==='SUCCEEDED') return structuredClone(this.store.idempotency.get(idemKey));
    const req=this.store.list(this.store.requests,ctx.tenantId).find(r=>r.requestId===requestId); assert(req,'REQUEST_NOT_FOUND','Request not found',404); assert(!this.isKilled(ctx.tenantId,req.agentId,req.actionId,req.environment),'KILL_SWITCH_ACTIVE','Kill switch active',423);
    const action=this.store.get(this.store.actions,ctx.tenantId,req.actionId); const executor=this.executors[action.integrationId]||this.executors.default; assert(executor,'EXECUTOR_NOT_CONFIGURED','No executor configured',503);
    this.audit({...ctx,requestId:req.requestId,traceId:req.traceId,agentId:req.agentId},'EXECUTION_STARTED','ACTION_REQUEST',req.id,{actionCode:req.actionCode});
    const started=Date.now(); const output=await executor({action,request:req,payload:req.payload}); const result={requestId:req.requestId,traceId:req.traceId,status:'SUCCEEDED',output,outputHash:sha256(output),latencyMs:Date.now()-started}; this.store.idempotency.set(idemKey,result); this.audit({...ctx,requestId:req.requestId,traceId:req.traceId,agentId:req.agentId},'EXECUTION_SUCCEEDED','ACTION_REQUEST',req.id,{outputHash:result.outputHash,latencyMs:result.latencyMs}); return result;
  }
  getCommandCenter(ctx){
    const agents=this.store.list(this.store.agents,ctx.tenantId); const approvals=this.store.list(this.store.approvals,ctx.tenantId); const requests=this.store.list(this.store.requests,ctx.tenantId); const switches=this.store.list(this.store.killSwitches,ctx.tenantId);
    return {
      metrics:{activeAgents:agents.filter(a=>a.status==='ACTIVE').length,pendingApprovals:approvals.filter(a=>a.status==='PENDING').length,blockedActions:requests.filter(r=>r.status==='DENIED').length,highCriticalRisk:requests.filter(r=>['HIGH','CRITICAL'].includes(r.risk?.level)).length,activeKillSwitches:switches.filter(k=>k.status==='ACTIVE').length},
      recentActivity:this.getAudit(ctx).slice(-20).reverse(),
      riskQueue:requests.filter(r=>['HIGH','CRITICAL'].includes(r.risk?.level)).slice(-10).reverse(),
      approvalQueue:approvals.filter(a=>a.status==='PENDING').slice(-10).reverse(),
      auditChainValid:this.store.verifyAuditChain()
    };
  }
  listApprovals(ctx){ return this.store.list(this.store.approvals,ctx.tenantId); }
  getAudit(ctx){ return this.store.audit.filter(e=>e.tenantId===ctx.tenantId); }
  audit(ctx,eventType,resourceType,resourceId,metadata){ return this.store.auditEvent({tenantId:ctx.tenantId,requestId:ctx.requestId,traceId:ctx.traceId,eventType,actorType:ctx.actorType||'USER',actorId:ctx.actorId,agentId:ctx.agentId,resourceType,resourceId,metadata}); }
}
