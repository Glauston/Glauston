# REGULA — Autorização Externa

## Objetivo
Criar um mecanismo formal de aprovação externa para decisões sensíveis do REGULA, permitindo que uma ação seja solicitada dentro da plataforma e aprovada por uma pessoa autorizada fora da sessão operacional.

## Casos de uso iniciais
- Aprovação de desconto fora da política comercial.
- Aprovação de cláusula contratual excepcional.
- Liberação de plano Enterprise ou funcionalidade restrita.
- Aprovação de alteração de regra regulatória crítica.
- Aprovação de publicação em produção.
- Aprovação de integração com provedor de pagamentos.
- Aprovação de tratamento de incidente relevante.

## Princípios
1. Nenhuma aprovação externa altera dados sem autenticação forte.
2. A autorização deve ser vinculada a uma solicitação única, com expiração.
3. O aprovador deve visualizar exatamente o que está aprovando.
4. Toda decisão gera evidência auditável.
5. A aprovação pode exigir MFA, reautenticação ou dupla aprovação conforme criticidade.
6. O solicitante não pode aprovar a própria solicitação quando houver segregação de função.
7. Tokens de aprovação nunca devem carregar segredos ou dados completos em URL.

## Fluxo
1. Usuário ou agente cria `AuthorizationRequest`.
2. Sistema classifica criticidade: LOW, MEDIUM, HIGH, CRITICAL.
3. Política define aprovadores elegíveis e quantidade mínima de aprovações.
4. REGULA envia link seguro ou notificação ao aprovador.
5. Aprovador autentica-se.
6. Tela exibe resumo, impacto, evidências e prazo.
7. Aprovador escolhe APPROVE, REJECT ou REQUEST_CHANGES.
8. Resultado é assinado logicamente e registrado no Audit Log.
9. A ação só executa se todas as condições de aprovação forem satisfeitas.

## Entidades mínimas
- AuthorizationRequest
- AuthorizationPolicy
- AuthorizationApprover
- AuthorizationDecision
- AuthorizationEvidence
- AuthorizationExecution

## Estados
DRAFT → PENDING → PARTIALLY_APPROVED → APPROVED → EXECUTED
                         ↘ REJECTED
                         ↘ EXPIRED
                         ↘ CANCELLED

## Segurança
- IDs não sequenciais.
- Expiração curta para links sensíveis.
- MFA para HIGH/CRITICAL.
- Rate limiting.
- Device/IP metadata apenas para segurança e auditoria, respeitando LGPD.
- Revogação imediata de solicitações.
- Idempotência na execução.
- Assinatura de integridade das evidências.
- Segregação de função configurável por tenant.

## Regra de ouro
Autorização externa não substitui governança. Ela formaliza e registra decisões humanas que o REGULA não deve tomar sozinho.
