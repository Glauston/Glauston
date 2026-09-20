# Contrato de API P0 — G|E Secure Agent Control

Base sugerida: `/api/v1`

## Convenções
- JSON.
- OAuth2/OIDC para usuários.
- Identidade de workload para agentes/serviços.
- `X-Tenant-Id` derivado do token quando possível.
- `Idempotency-Key` obrigatório para ações executáveis.
- `X-Request-Id` e `X-Trace-Id` em todas as respostas.
- Nenhum endpoint retorna segredo.

## Agent Registry
### POST /agents
Cria agente.

### GET /agents
Lista agentes do tenant.

### GET /agents/{agent_id}
Consulta agente.

### PATCH /agents/{agent_id}
Altera metadados permitidos.

### POST /agents/{agent_id}/activate
Ativa agente após validações.

### POST /agents/{agent_id}/suspend
Suspende agente.

## Policies
### POST /policies
Cria política em DRAFT.

### POST /policies/{policy_id}/versions
Cria nova versão.

### POST /policies/{policy_id}/simulate
Avalia sem executar.

### POST /policies/{policy_id}/publish
Publica versão após validação e controle de acesso.

## Action Gateway
### POST /actions/evaluate
Avalia identidade, permissão, política e risco sem executar.

Request mínimo:
```json
{
  "agent_id": "uuid",
  "agent_version": "1.0.0",
  "action_code": "customer.update",
  "environment": "production",
  "resource": {"type":"customer","id":"123"},
  "destination": "crm",
  "data_classification": "CONFIDENTIAL",
  "monetary_value": null,
  "payload": {}
}
```

Resposta:
```json
{
  "request_id": "uuid",
  "decision": "ALLOW",
  "risk": {"score": 22, "level": "LOW"},
  "requirements": [],
  "expires_at": "ISO-8601"
}
```

### POST /actions/execute
Entrada idêntica à avaliação, acrescida de `Idempotency-Key`.

Possíveis respostas:
- 200/202: autorizada ou em processamento;
- 403: negada;
- 409: duplicidade/idempotência;
- 423: Kill Switch ativo;
- 428: aprovação necessária.

Quando aprovação for necessária:
```json
{
  "request_id": "uuid",
  "decision": "REQUIRE_APPROVAL",
  "approval_request_id": "uuid",
  "payload_hash": "sha256:...",
  "risk": {"score": 76, "level": "HIGH"}
}
```

## Approvals
### GET /approvals?status=PENDING
Fila do Approval Center.

### GET /approvals/{id}
Detalhes, risco, política, agente, recurso, destino e payload sanitizado.

### POST /approvals/{id}/approve
Requer justificativa configurável e step-up auth quando aplicável.

### POST /approvals/{id}/reject
Requer justificativa.

Regra: o hash aprovado deve ser exatamente o mesmo hash da execução.

## Audit
### GET /audit/events
Filtros:
- request_id
- trace_id
- agent_id
- action_code
- risk_level
- event_type
- date range

### GET /audit/events/{id}
Detalhe do evento sanitizado.

### POST /audit/export
Gera exportação autorizada, com trilha de quem solicitou.

## Kill Switch
### POST /kill-switches
Ativa bloqueio.

Request:
```json
{
  "scope_type": "AGENT",
  "scope_id": "uuid",
  "reason": "Comportamento anômalo"
}
```

### POST /kill-switches/{id}/deactivate
Desativa mediante permissão forte e justificativa.

## Risk
### POST /risk/evaluate
Uso interno/controlado para cálculo de risco.

### GET /risk/signals
Catálogo de sinais de risco.

## FinOps
### GET /usage
Uso por agente, período e modelo.

### GET /budgets
Limites.

### PUT /budgets/{id}
Altera orçamento conforme autorização.

## Incidents
### GET /incidents
Lista incidentes.

### POST /incidents
Abre incidente manual ou via automação autorizada.

## Erros padronizados
```json
{
  "error": {
    "code": "POLICY_DENIED",
    "message": "Ação negada pela política aplicável.",
    "request_id": "uuid",
    "details": []
  }
}
```

## Regras de segurança da API
1. Deny-by-default.
2. Autorização é validada no backend, nunca apenas na interface.
3. Tenant vem da identidade autenticada; não confiar cegamente em parâmetro do cliente.
4. Payload deve respeitar schema registrado da ação.
5. Destino deve estar em allowlist.
6. Rate limit por tenant, agente e ação.
7. Timeout e circuit breaker por integração.
8. Nunca registrar token, segredo ou credencial.
9. Ação financeira ou irreversível pode exigir dupla aprovação.
10. Toda resposta operacional carrega request/trace para auditoria.
