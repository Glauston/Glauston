import { sha256 } from './security.js';

const arr = value => Array.isArray(value) ? value : [];
const included = (allowed, value) => !allowed.length || allowed.includes(value);

export function normalizeAgentContract(input={}) {
  const goalBoundary=input.goalBoundary||{};
  const endpointPolicy=input.endpointPolicy||{};
  return {
    goal: input.goal||null,
    goalBoundary:{
      allowedMethods:arr(goalBoundary.allowedMethods),
      forbiddenMethods:arr(goalBoundary.forbiddenMethods),
      allowedResources:arr(goalBoundary.allowedResources),
      allowedDestinations:arr(goalBoundary.allowedDestinations),
      maxMonetaryValue:goalBoundary.maxMonetaryValue == null ? null : Number(goalBoundary.maxMonetaryValue),
      retryLimit:goalBoundary.retryLimit == null ? null : Number(goalBoundary.retryLimit),
      escalationCondition:goalBoundary.escalationCondition||'HUMAN_APPROVAL',
      stopCondition:goalBoundary.stopCondition||'HALT'
    },
    endpointPolicy:{
      allowedHosts:arr(endpointPolicy.allowedHosts),
      allowedDirectories:arr(endpointPolicy.allowedDirectories),
      allowedShellCommands:arr(endpointPolicy.allowedShellCommands),
      allowedNetworkDestinations:arr(endpointPolicy.allowedNetworkDestinations),
      browserAllowed:endpointPolicy.browserAllowed !== false,
      localSecretAccess:Boolean(endpointPolicy.localSecretAccess),
      processCreationAllowed:endpointPolicy.processCreationAllowed !== false,
      downloadsAllowed:endpointPolicy.downloadsAllowed !== false,
      packageInstallAllowed:Boolean(endpointPolicy.packageInstallAllowed)
    },
    trustedInputPolicy:{
      minimumTrustLevel:input.trustedInputPolicy?.minimumTrustLevel||'UNTRUSTED',
      requireProvenanceForCritical:Boolean(input.trustedInputPolicy?.requireProvenanceForCritical ?? true)
    }
  };
}

const trustRank={UNTRUSTED:0,EXTERNAL:1,VERIFIED:2,TRUSTED:3};

export function evaluateRuntimeBoundary(agent,input,risk={level:'LOW'}) {
  const contract=agent.contract;
  if(!contract) return {decision:'PASS',reasonCodes:[],signals:[]};
  const reasons=[], signals=[];
  const deny=(code,detail)=>{reasons.push(code);signals.push({code,detail});};
  const g=contract.goalBoundary||{}, e=contract.endpointPolicy||{}, t=contract.trustedInputPolicy||{};

  if(input.method && arr(g.forbiddenMethods).includes(input.method)) deny('FORBIDDEN_METHOD',input.method);
  if(input.method && !included(arr(g.allowedMethods),input.method)) deny('METHOD_OUTSIDE_GOAL_BOUNDARY',input.method);
  if(input.resource && !included(arr(g.allowedResources),input.resource)) deny('RESOURCE_OUTSIDE_GOAL_BOUNDARY',input.resource);
  if(input.destination && !included(arr(g.allowedDestinations),input.destination)) deny('DESTINATION_OUTSIDE_GOAL_BOUNDARY',input.destination);
  if(g.maxMonetaryValue != null && Number(input.monetaryValue||0)>g.maxMonetaryValue) deny('ECONOMIC_AUTHORITY_EXCEEDED',input.monetaryValue);

  if(input.executionHost && !included(arr(e.allowedHosts),input.executionHost)) deny('ENDPOINT_NOT_ALLOWED',input.executionHost);
  if(input.directory && !included(arr(e.allowedDirectories),input.directory)) deny('FILESYSTEM_SCOPE_VIOLATION',input.directory);
  if(input.shellCommand && !included(arr(e.allowedShellCommands),input.shellCommand)) deny('SHELL_COMMAND_NOT_ALLOWED',input.shellCommand);
  if(input.networkDestination && !included(arr(e.allowedNetworkDestinations),input.networkDestination)) deny('NETWORK_DESTINATION_NOT_ALLOWED',input.networkDestination);
  if(input.browserRequested && e.browserAllowed===false) deny('BROWSER_NOT_ALLOWED',true);
  if(input.localSecretRequested && e.localSecretAccess!==true) deny('LOCAL_SECRET_ACCESS_NOT_ALLOWED',true);
  if(input.processCreationRequested && e.processCreationAllowed===false) deny('PROCESS_CREATION_NOT_ALLOWED',true);
  if(input.downloadRequested && e.downloadsAllowed===false) deny('DOWNLOAD_NOT_ALLOWED',true);
  if(input.packageInstallRequested && e.packageInstallAllowed!==true) deny('PACKAGE_INSTALL_NOT_ALLOWED',true);

  const source=input.inputContext||{};
  const trust=source.trustLevel||'UNTRUSTED';
  const minimum=t.minimumTrustLevel||'UNTRUSTED';
  if((trustRank[trust]??0)<(trustRank[minimum]??0)) deny('INPUT_TRUST_TOO_LOW',trust);
  if(t.requireProvenanceForCritical && risk.level==='CRITICAL' && !source.provenance) deny('CRITICAL_INPUT_PROVENANCE_REQUIRED',true);

  return {decision:reasons.length?'DENY':'PASS',reasonCodes:reasons,signals,contractHash:sha256(contract)};
}
