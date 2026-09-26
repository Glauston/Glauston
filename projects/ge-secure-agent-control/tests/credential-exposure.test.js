import test from 'node:test';
import assert from 'node:assert/strict';
import { CredentialExposureInventory } from '../src/credential-exposure.js';

test('inventory stores fingerprint metadata without raw credential', () => {
  const i = new CredentialExposureInventory({clock:()=> '2026-09-26T12:00:00Z'});
  const r = i.observe({tenantId:'t1'}, {credentialFingerprint:'opaque-discovery-fingerprint',agentId:'a1',endpointId:'e1',mcpServer:'tax-mcp',credentialType:'API_KEY',scope:['duimp:read'],ownerRef:'fiscal-integration',source:'MCP_CONFIG',exposureState:'EXPOSED'});
  assert.match(r.fingerprint,/^sha256:/);
  assert.equal(r.credentialFingerprint, undefined);
  assert.equal(r.exposureState,'EXPOSED');
});

test('raw secrets are rejected', () => {
  const i = new CredentialExposureInventory();
  assert.throws(()=>i.observe({tenantId:'t1'},{credentialFingerprint:'x',rawSecret:'never-store-me'}),/forbidden/);
});

test('tenant isolation prevents inventory disclosure', () => {
  const i = new CredentialExposureInventory();
  i.observe({tenantId:'t1'},{credentialFingerprint:'x',endpointId:'e1'});
  assert.equal(i.list({tenantId:'t2'}).length,0);
});

test('rotation or revoke creates remediation evidence', () => {
  const i = new CredentialExposureInventory();
  const r=i.observe({tenantId:'t1'},{credentialFingerprint:'x',endpointId:'e1',exposureState:'EXPOSED'});
  const fixed=i.remediate({tenantId:'t1'},r.id,{rotationState:'ROTATED',evidenceRef:'audit://rotation/1'});
  assert.equal(fixed.exposureState,'REMEDIATED');
  assert.equal(fixed.evidenceRef,'audit://rotation/1');
  assert.ok(i.events.some(e=>e.type==='CREDENTIAL_EXPOSURE_REMEDIATED'));
});
