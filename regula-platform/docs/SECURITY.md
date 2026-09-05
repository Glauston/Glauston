# REGULA — Security Baseline

## Objetivos

REGULA deve ser projetado para ambiente corporativo e dados sensíveis desde a primeira versão.

## Controles mínimos

- OIDC/OAuth2 e MFA quando suportado pelo IdP.
- RBAC por papel e escopo organizacional.
- autorização deny-by-default.
- segregação multi-tenant em todas as consultas e comandos.
- criptografia TLS em trânsito.
- criptografia de dados sensíveis em repouso.
- rotação e gestão externa de segredos.
- trilha de auditoria para autenticação, mudanças de regra, decisões e evidências.
- rate limiting e proteção contra abuso de API.
- validação de payload e proteção contra mass assignment.
- upload de documentos com antivírus, tipo/tamanho permitido e quarentena.
- headers e políticas seguras no frontend.
- dependency scanning, SAST e secret scanning no CI.

## LGPD

- coletar apenas dados necessários para a finalidade regulatória.
- classificar PII e dados sensíveis.
- registrar base/finalidade de tratamento aplicável ao cliente.
- oferecer políticas de retenção e descarte.
- suportar anonimização/pseudonimização quando possível.
- evitar uso de PII em prompts sem necessidade.

## IA

- nenhuma credencial ou segredo em prompts.
- saída de IA tratada como recomendação, não como fonte normativa primária.
- toda resposta regulatória deve referenciar evidência/fonte interna aprovada.
- registrar modelo, prompt/template versionado e contexto relevante para auditoria quando necessário.
- proteção contra prompt injection em documentos carregados.

## Threat model inicial

Principais riscos:

1. vazamento entre tenants.
2. alteração indevida de regra regulatória.
3. fraude ou adulteração de evidência.
4. credenciais expostas.
5. ingestão maliciosa de arquivo.
6. abuso de permissões internas.
7. decisão de IA sem sustentação normativa.
8. falha de idempotência gerando análise duplicada.

## Regra de ouro

Nenhuma conclusão crítica pode existir sem `tenant + rule_version + source_data + evidence + timestamp + actor`.