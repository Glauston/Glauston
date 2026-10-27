import test from 'node:test';
import assert from 'node:assert/strict';
import { runScan } from '../lab/juice-shop-exposure.mjs';

test('Juice Shop probe checks only two known synthetic lab paths and creates no content dump', async () => {
  const seen = [];
  const request = async (url, opts) => {
    seen.push([url.pathname, opts.method, opts.redirect]);
    if (url.pathname === '/ftp/') return new Response('directory list: acquisitions.md', {status:200});
    if (url.pathname === '/ftp/acquisitions.md') return new Response('This document is confidential! Do not distribute!', {status:200});
    throw new Error('Unexpected path');
  };
  const report = await runScan('http://127.0.0.1:3000/', request);
  assert.deepEqual(seen, [['/ftp/','GET','manual'],['/ftp/acquisitions.md','GET','manual']]);
  assert.equal(report.findingsConfirmed,2);
  assert.equal(report.checks[1].httpStatus,200);
  assert.equal(report.checks[1].markerFound,true);
  const evidence = JSON.stringify(report);
  assert.ok(!evidence.includes('Do not distribute!'), 'Audit evidence must not dump document bodies');
  assert.ok(/^[a-f0-9]{64}$/.test(report.checks[1].bodySha256));
});

test('Juice Shop probe rejects public and nonlocal destinations', async () => {
  for (const url of ['https://example.com/','http://192.0.2.1:3000/','http://127.0.0.1:3000/ftp/']) {
    await assert.rejects(runScan(url, async () => {throw new Error('Should not request')}), /LAB_SCOPE_DENIED/);
  }
});

test('Juice Shop probe does not claim a finding if the resource is protected', async () => {
  const request = async () => new Response('Forbidden', {status:403});
  const report = await runScan('http://localhost:3000/', request);
  assert.equal(report.findingsConfirmed,0);
  assert.ok(report.checks.every(x => x.findingConfirmed===false));
});
