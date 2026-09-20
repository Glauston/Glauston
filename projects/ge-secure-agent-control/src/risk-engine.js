const LEVELS = [[80, 'CRITICAL'], [60, 'HIGH'], [30, 'MODERATE'], [0, 'LOW']];

export function evaluateRisk(input) {
  const signals = [];
  let score = Number(input.baseRisk ?? 0);
  const add = (points, code, detail) => { score += points; signals.push({ code, points, detail }); };
  if (['DELETE', 'FINANCIAL'].includes(input.operationType)) add(25, 'SENSITIVE_OPERATION', input.operationType);
  if (input.dataClassification === 'RESTRICTED') add(25, 'RESTRICTED_DATA', 'Restricted data');
  else if (input.dataClassification === 'CONFIDENTIAL') add(12, 'CONFIDENTIAL_DATA', 'Confidential data');
  if (Number(input.monetaryValue || 0) >= 10000) add(25, 'HIGH_VALUE', input.monetaryValue);
  else if (Number(input.monetaryValue || 0) > 0) add(10, 'MONETARY_ACTION', input.monetaryValue);
  if (input.newDestination) add(20, 'NEW_DESTINATION', input.destination);
  if (input.unusualTime) add(10, 'UNUSUAL_TIME', true);
  if (input.recentAgentChange) add(15, 'RECENT_AGENT_CHANGE', true);
  if (Number(input.consecutiveFailures || 0) >= 3) add(15, 'REPEATED_FAILURES', input.consecutiveFailures);
  if (input.scopeExpansionAttempt) { add(50, 'SCOPE_EXPANSION_ATTEMPT', true); score = Math.max(score, 85); }
  score = Math.max(0, Math.min(100, score));
  return { score, level: LEVELS.find(([min]) => score >= min)[1], signals };
}
