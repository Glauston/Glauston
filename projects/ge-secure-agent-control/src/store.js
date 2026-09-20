import { sha256, uuid, assert, redact } from './security.js';

export class MemoryStore {
  constructor() {
    this.agents = new Map(); this.actions = new Map(); this.policies = new Map(); this.requests = new Map();
    this.approvals = new Map(); this.executions = new Map(); this.killSwitches = new Map(); this.idempotency = new Map();
    this.audit = []; this.auditTail = 'GENESIS';
  }
  key(tenantId, id) { return `${tenantId}:${id}`; }
  put(map, tenantId, value) { map.set(this.key(tenantId, value.id), structuredClone(value)); return value; }
  get(map, tenantId, id, code='NOT_FOUND') { const value = map.get(this.key(tenantId,id)); assert(value, code, 'Resource not found', 404); return structuredClone(value); }
  list(map, tenantId) { return [...map.entries()].filter(([k]) => k.startsWith(`${tenantId}:`)).map(([,v]) => structuredClone(v)); }
  auditEvent({tenantId, requestId=null, traceId=null, eventType, actorType, actorId, agentId=null, resourceType=null, resourceId=null, metadata={}}) {
    const event = { id: uuid(), tenantId, sequenceNumber: this.audit.length + 1, requestId, traceId, eventType, actorType, actorId, agentId, resourceType, resourceId, metadata: redact(metadata), previousEventHash: this.auditTail, createdAt: new Date().toISOString() };
    event.eventHash = sha256(event);
    this.auditTail = event.eventHash; this.audit.push(Object.freeze(event)); return event;
  }
  verifyAuditChain() {
    let prev='GENESIS';
    for (const event of this.audit) { const {eventHash, ...withoutHash}=event; if (event.previousEventHash !== prev || sha256(withoutHash) !== eventHash) return false; prev=eventHash; }
    return true;
  }
}
