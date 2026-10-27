/**
 * G|E Hacker -> AUDIT: non-destructive Juice Shop exposure probe.
 * STRICT SCOPE: only loopback HTTP services in an owned lab. No brute force or enumeration.
 * Evidence contains status/hash/markers, never contents of a confidential document.
 */
import { createHash } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const checks = [
  { id: 'LAB-002A', path: '/ftp/', marker: 'acquisitions.md', label: 'Listagem nao autenticada do diretorio' },
  { id: 'LAB-002B', path: '/ftp/acquisitions.md', marker: 'This document is confidential!', label: 'Documento confidencial servido sem login' }
];

function validateLocalUrl(value) {
  const url = new URL(value);
  if (url.protocol !== 'http:' || !['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)) {
    throw new Error('LAB_SCOPE_DENIED: somente http://127.0.0.1 ou localhost em laboratorio proprio');
  }
  if (url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('LAB_SCOPE_DENIED: use apenas a origem do laboratorio, sem caminho/credenciais');
  }
  return url;
}

export async function runScan(baseUrl = 'http://127.0.0.1:3000/', request = fetch) {
  const base = validateLocalUrl(baseUrl);
  const results = [];
  for (const entry of checks) {
    const target = new URL(entry.path, base);
    const response = await request(target, {
      method: 'GET',
      redirect: 'manual',
      headers: { accept: 'text/plain, text/html' },
      signal: AbortSignal.timeout(5000)
    });
    const data = await response.text();
    const markerFound = data.includes(entry.marker);
    results.push({
      id: entry.id,
      path: entry.path,
      label: entry.label,
      httpStatus: response.status,
      markerFound,
      findingConfirmed: response.status === 200 && markerFound,
      bodySha256: createHash('sha256').update(data).digest('hex'),
      bodyBytes: Buffer.byteLength(data, 'utf8')
    });
  }
  return {
    tool: 'G|E Hacker - Juice Shop Exposure Probe',
    target: 'laboratorio local 127.0.0.1 (somente caminhos autorizados)',
    capturedAt: new Date().toISOString(),
    actions: 'GET somente leitura /ftp/ e /ftp/acquisitions.md',
    checks: results,
    findingsConfirmed: results.filter(r => r.findingConfirmed).length,
    auditStatus: results.every(r => r.findingConfirmed)
      ? 'EVIDENCIA_CONFIRMADA_NO_LABORATORIO'
      : 'VERIFICACAO_PARCIAL_REVISAR_RESULTADOS',
    recommendation: 'Em sistemas de producao: armazenar documentos sensiveis fora do webroot; aplicar autenticacao e autorizacao por recurso; negar listagem publica; retestar'
  };
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  try {
    const report = await runScan(process.env.GE_LAB_URL || 'http://127.0.0.1:3000/');
    const output = '/tmp/ge-juice-shop-audit.json';
    await writeFile(output, JSON.stringify(report, null, 2) + '\n', {mode:0o600});
    console.log('\n=== G|E Hacker / AUDIT: laboratorio local ===');
    for (const item of report.checks) {
      console.log(`${item.id}: HTTP ${item.httpStatus} | marcador ${item.markerFound ? 'encontrado' : 'nao encontrado'} | ${item.findingConfirmed ? 'ACHADO CONFIRMADO' : 'NAO CONFIRMADO'}`);
    }
    console.log(`Total de achados confirmados: ${report.findingsConfirmed}/${report.checks.length}`);
    console.log(`Relatorio de evidencias: ${output}`);
    console.log('Nenhum conteudo confidencial foi escrito no relatorio.\n');
  } catch (error) {
    console.error('Falha no teste de laboratorio:', error.message);
    process.exitCode = 2;
  }
}
