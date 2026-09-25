# Runtime Governance Evolution — 2026-09-25

Status: **arquitetura aprovada / implementação incremental**.

Este documento registra a evolução do G|E Secure Agent Control sem substituir o MVP P0 existente. Controles abaixo só devem ser marcados como implementados após código, testes e evidências.

## Princípios
- Autonomia termina onde termina a autorização.
- Autorizar o objetivo não autoriza qualquer método.
- Credencial nunca é memória do agente.
- Detectar em um lugar; conter em todos os controles autorizados.
- Toda ação relevante deve provar quem executou, sob qual autoridade e o que mudou.
- O executor não deve ser a única fonte de prova da própria execução.
- Contexto não confiável não constitui autorização válida.

## 1. Agent Contract e Goal Boundary
Campos-alvo: goal, allowed_methods, forbidden_methods, allowed_resources, allowed_side_effects, success_condition, failure_condition, retry_limit, escalation_condition, stop_condition.

Dead-End Escalation: NORMAL -> RESTRICTED -> HUMAN_APPROVAL -> HALT.

## 2. Intent x Data Runtime Policy
Decisão contextual:
Agent Identity + Mandate/Intent + Action + Data Classification + Destination + Tool/MCP + Economic Authority + Context/Risk -> ALLOW | DENY | REQUIRE_APPROVAL.

Integração: Data Core classifica e fornece provenance/usage rights; Secure decide autoridade.

## 3. Credential Broker / JIT
Credenciais críticas temporárias, scoped, revogáveis e fora de prompt/memória. Fluxo: Identity -> Context -> Policy -> Credential Broker -> Execute/Approval/Deny -> Evidence.

## 4. MCP, Tool e Supply-Chain Governance
MCP Registry com owner, endpoint/domain, região, software/version, TLS/cert, tools, permissions, data classes, agent identities, integrity/fingerprint, validation time e risk state.
Mudança material -> QUARANTINE -> Guardian -> aprovação humana.
Princípios: No Unknown MCP; No Permanent Trust; Destination Matters.

## 5. Endpoint Governance
O execution host passa a ser recurso governado:
execution_host, device_identity, allowed_directories, filesystem_scope, allowed_shell_commands, network_destinations, browser_permissions, local_secret_access, process_creation_policy, download_policy, package_install_policy, endpoint_risk_state.

## 6. Trusted Input, Memory e Prompt-Injection Boundary
Classificar origem e confiança de mensagens, RAG, tool results e business data. Campos: origin, content_hash, previous_hash, signature, trust_level, retention_policy.
Contexto adulterado -> UNTRUSTED -> suspender ação crítica -> Guardian/AUDIT.

## 7. Behavioral Baseline e Guardian
Expected Behavior Baseline: Goal -> Expected Actions -> Tools -> Network -> Data -> Sequence.
Testes permanentes planejados:
- Impossible Goal Test
- Goal Persistence / Refusal Circumvention
- Memory Poisoning Test
- MCP Supply-Chain Takeover Test
- Agentic Endpoint Escape Test
- Kill-Switch Propagation Test

Testes ativos somente em ambiente/ativos autorizados e com solicitação explícita.

## 8. Security Signal Bus e Cross-Control Response
Evento canônico: signal_id, source, agent_id, identity, session, severity, finding, resource, recommended_action, policy_decision, controls_notified, containment_result, evidence.
Resposta possível: Guardian detecta -> Secure revoga -> Gateway bloqueia -> Data Core restringe -> MAESTRO pausa -> NEXUS alerta -> AUDIT preserva evidência.

## 9. Delegation Graph / A2A
Registrar delegator, delegatee, task, authority transferred, data, duration, max cost, result, evidence.
Revogação deve avaliar descendentes: KEEP | RESTRICT | REVOKE | HUMAN_REVIEW.

## 10. Verifiable Execution Evidence e State Lineage
Evidência-alvo: execution_id, agent_identity, mandate_hash, policy_hash, action_request, policy_decision, capability, state_before_hash, state_after_hash, previous_evidence_hash, timestamp, signature, verifier.
Guardian/Secure também devem produzir evidência quando bloqueiam ou remedeiam.

## 11. Agent Trust Chain e Crypto Agility
Organization -> Human Authority -> Model Identity/Version -> Agent Identity -> Contract -> Runtime Environment -> Tool/MCP/Device -> Signed Action -> Evidence.
Campos-alvo: model_hash, agent_version, signer, certificate, trust_anchor, attestation, revocation_status, crypto_profile, pqc_readiness.
Sem criar criptografia própria; arquitetura agnóstica e integrável a PKI/HSM/TPM/KMS.

## 12. Execution Environment / Residency
Política por data_region, execution_region, allowed_models, allowed_clouds, external_processing, sandbox_required e data_classification.
Verify-before-decrypt para cargas altamente sensíveis quando houver confidential computing compatível.

## 13. Agent Economics e Portfolio Governance
Inventário deve relacionar Owner -> Purpose -> Business Process -> Cost -> Usage -> Outcome -> Risk -> Incidents -> Human Interventions -> Business KPI -> ROI -> Lifecycle.
Lifecycle: DISCOVERED -> ASSESSED -> APPROVED -> PILOT -> PRODUCTION -> RESTRICTED -> RETIRE.
Integração: MAESTRO fornece processo/resultado; NEXUS contexto; Data Core dados; Secure autoridade; Guardian comportamento; AUDIT evidência.

## 14. Physical Agent Readiness
Preparar agent_type = SOFTWARE | PHYSICAL, sem construir robótica.
Agentes físicos adicionam device_identity, location, allowed_zone, actuator/tool, safety_policy, network, firmware e emergency_stop.

## 15. Critério de evolução
Nenhuma descoberta do Radar cria automaticamente novo produto. Ela entra somente se melhorar proteção, automação, diferenciação ou receita e deve reutilizar os ativos G|E existentes.

## Gates de implementação
P1: Agent Contract + Goal Boundary + Endpoint Policy + Trusted Input.
P2: MCP Registry + JIT Credential Broker + Security Signal Bus + Delegation Graph.
P3: State Lineage + Verifiable Evidence + independent verification.
P4: Agent Economics/Lifecycle + Trust Chain/attestation + residency/confidential-computing adapters.
P5: Physical-agent governance readiness.

Cada gate exige: threat model, schema/API, testes, evidência Guardian, revisão G|E AUDIT, documentação e aprovação humana antes de produção.
