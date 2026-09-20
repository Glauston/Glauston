import { createHash, randomUUID } from 'node:crypto';

export const uuid = () => randomUUID();

export function canonicalize(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(',')}]`;
  return `{${Object.keys(value).sort().map(k => `${JSON.stringify(k)}:${canonicalize(value[k])}`).join(',')}}`;
}

export function sha256(value) {
  return `sha256:${createHash('sha256').update(typeof value === 'string' ? value : canonicalize(value)).digest('hex')}`;
}

const sensitiveKey = /token|secret|password|authorization|cookie|api[_-]?key|credential|cpf|cnpj/i;
export function redact(value, depth = 0) {
  if (depth > 8) return '[TRUNCATED]';
  if (Array.isArray(value)) return value.map(v => redact(v, depth + 1));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, sensitiveKey.test(k) ? '[REDACTED]' : redact(v, depth + 1)]));
  }
  return value;
}

export function assert(condition, code, message, status = 400) {
  if (!condition) {
    const error = new Error(message);
    error.code = code;
    error.status = status;
    throw error;
  }
}
