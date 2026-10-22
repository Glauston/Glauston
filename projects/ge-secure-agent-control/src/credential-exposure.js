import crypto from 'node:crypto';

const sha256 = value => `sha256:${crypto.createHash('sha256').update(String(value)).digest('hex')}`;

/**
 * Metadata-only credential exposure inventory.
 * Raw credentials MUST NOT be persisted. Discovery adapters must submit only
 * a one-way fingerprint plus non-secret metadata.
 */
export class CredentialExposureInventory {
  constructor({ clock = () => new Date().toISOString() } = {}) {
    this.clock = clock;
    this.records = new Map();
    this.events = [];
  }

  observe(ctx, finding) {
    if (!ctx?.tenantId) throw new Error('tenantId required');
    if (!finding?.credentialFingerprint) throw new Error('credentialFingerprint required');
    if (finding.rawSecret || finding.secret || finding.token || finding.password) {
      throw new Error('raw credential material is forbidden');
    }
    const id = sha256(`${ctx.tenantId}:${finding.credentialFingerprint}:${finding.endpointId || ''}:${finding.agentId || ''}:${finding.mcpServer || ''}`);
    const previous = this.records.get(id);
    const now = this.clock();
    const record = {
      id,
      tenantId: ctx.tenantId,
      agentId: finding.agentId || null,
      endpointId: finding.endpointId || null,
      mcpServer: finding.mcpServer || null,
      credentialType: finding.credentialType || 'UNKNOWN',
      fingerprint: sha256(finding.credentialFingerprint),
      scope: finding.scope || [],
      ownerRef: finding.ownerRef || null,
      source: finding.source || 'UNKNOWN',
      exposureState: finding.exposureState || 'OBSERVED',
      firstSeenAt: previous?.firstSeenAt || now,
      lastSeenAt: now,
      rotationState: finding.rotationState || previous?.rotationState || 'UNKNOWN',
      revokeState: finding.revokeState || previous?.revokeState || 'UNKNOWN',
      evidenceRef: finding.evidenceRef || previous?.evidenceRef || null
    };
    this.records.set(id, record);
    this.events.push({ type: 'CREDENTIAL_EXPOSURE_OBSERVED', at: now, tenantId: ctx.tenantId, recordId: id, exposureState: record.exposureState });
    return structuredClone(record);
  }

  remediate(ctx, id, { rotationState, revokeState, evidenceRef } = {}) {
    const record = this.records.get(id);
    if (!record || record.tenantId !== ctx?.tenantId) throw new Error('Resource not found');
    if (rotationState) record.rotationState = rotationState;
    if (revokeState) record.revokeState = revokeState;
    if (evidenceRef) record.evidenceRef = evidenceRef;
    record.exposureState = (rotationState === 'ROTATED' || revokeState === 'REVOKED') ? 'REMEDIATED' : record.exposureState;
    record.lastSeenAt = this.clock();
    this.events.push({ type: 'CREDENTIAL_EXPOSURE_REMEDIATED', at: record.lastSeenAt, tenantId: ctx.tenantId, recordId: id, rotationState: record.rotationState, revokeState: record.revokeState });
    return structuredClone(record);
  }

  list(ctx) {
    return [...this.records.values()].filter(r => r.tenantId === ctx?.tenantId).map(structuredClone);
  }
}
