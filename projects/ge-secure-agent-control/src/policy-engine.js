function matches(rule, ctx) {
  const w = rule.when || {};
  return Object.entries(w).every(([key, expected]) => {
    const actual = ctx[key];
    if (Array.isArray(expected)) return expected.includes(actual);
    if (expected && typeof expected === 'object') {
      if ('$gte' in expected && !(Number(actual) >= Number(expected.$gte))) return false;
      if ('$lte' in expected && !(Number(actual) <= Number(expected.$lte))) return false;
      if ('$in' in expected && !expected.$in.includes(actual)) return false;
      return true;
    }
    return actual === expected;
  });
}

const rank = { DENY: 100, REQUIRE_STEP_UP_AUTH: 90, REQUIRE_APPROVAL: 80, REDACT: 70, MASK: 60, LIMIT: 50, ALLOW: 10 };

export function evaluatePolicy(policies, context) {
  const applicable = policies
    .filter(p => p.status === 'ACTIVE')
    .flatMap(p => (p.rules || []).filter(r => matches(r, context)).map(r => ({...r, policyId: p.id, version: p.version, priority: p.priority || 0})));
  if (!applicable.length) return { decision: 'DENY', reasonCodes: ['DENY_BY_DEFAULT'], policy: null };
  const denies = applicable.filter(r => r.effect === 'DENY');
  const selected = (denies.length ? denies : applicable).sort((a,b) => ((rank[b.effect] || 0) - (rank[a.effect] || 0)) || (b.priority - a.priority))[0];
  return { decision: selected.effect, reasonCodes: selected.reasonCodes || ['POLICY_MATCH'], policy: { id: selected.policyId, version: selected.version } };
}
