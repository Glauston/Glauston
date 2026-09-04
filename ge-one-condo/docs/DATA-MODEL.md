# G|E ONE Condo — Modelo de Dados MVP

## Princípio
Toda entidade operacional deve pertencer explicitamente a um `tenant_id` (condomínio ou administradora, conforme escopo). Nenhuma consulta multi-tenant deve depender apenas de filtros de interface.

## Entidades principais

### Tenant
- id
- type: condominium | administrator
- legal_name
- display_name
- status
- timezone
- created_at

### Condominium
- id
- tenant_id
- administrator_tenant_id (opcional)
- name
- address
- policy_id
- status

### Unit
- id
- tenant_id
- condominium_id
- tower/block
- number
- status

### Resident
- id
- tenant_id
- unit_id
- name
- preferred_channel
- phone/email mascaráveis por perfil
- status
- consent/preferences quando aplicável

### User
- id
- tenant_id
- name
- role_id
- status
- mfa_enabled
- last_login_at

### Role / Permission
Perfis iniciais: PORTER, CONCIERGE, MANAGER, ADMINISTRATOR, RESIDENT, SUPPORT.
Permissões granulares por ação, nunca apenas por menu.

### Package
- id
- tenant_id
- condominium_id
- unit_id
- resident_id
- tracking_reference opcional
- size: P | M | G | XG
- status
- received_at
- received_by
- storage_location_id
- source: manual | ocr | integration
- evidence_policy_applied
- created_at / updated_at

### StorageLocation
- id
- tenant_id
- condominium_id
- type: SMART_LOCKER | SHELF | ROOM | OTHER
- code
- size
- status: AVAILABLE | OCCUPIED | BLOCKED | MAINTENANCE | OFFLINE
- hardware_provider opcional
- hardware_reference opcional

### PackageEvent (G|E Trust)
Registro append-only para eventos operacionais.
- id
- tenant_id
- package_id
- event_type
- actor_type / actor_id
- occurred_at
- location_id
- metadata minimizada
- correlation_id

Eventos iniciais:
RECEIVED, IDENTIFIED, STORED, NOTIFIED, NOTIFICATION_FAILED, REMINDER_SENT, AUTHORIZED, OPENED, PICKED_UP, RETURN_REQUESTED, RETURN_STORED, RETURN_COLLECTED, EXCEPTION_CREATED, EXCEPTION_RESOLVED.

### Notification
- id
- tenant_id
- package_id
- resident_id
- channel
- template
- provider_reference
- status
- sent_at / delivered_at / failed_at
- failure_reason

### Exception
- id
- tenant_id
- package_id opcional
- type
- severity
- status
- assigned_to
- due_at
- resolution

### AuditLog
Ações administrativas e de segurança, separadas da cadeia de custódia da encomenda.
- tenant_id
- actor
- action
- target_type / target_id
- timestamp
- source_ip/device quando permitido
- result

## Estados da encomenda
RECEIVED -> IDENTIFIED -> STORED -> NOTIFIED -> READY_FOR_PICKUP -> PICKED_UP -> CLOSED

Estados alternativos:
- IDENTIFICATION_REQUIRED
- STORAGE_REQUIRED
- NOTIFICATION_FAILED
- OVERDUE
- EXCEPTION
- RETURN_FLOW
- CANCELLED

## Regras críticas
1. Nenhuma encomenda pode trocar de tenant.
2. Alteração de unidade/morador após armazenamento gera evento de auditoria.
3. Retirada exige método de autorização configurado pelo condomínio.
4. Exclusão física de eventos de custódia não é permitida pela aplicação comum.
5. Evidências e imagens obedecem política de retenção e minimização.
6. Suporte G|E usa acesso temporário, rastreado e limitado por escopo.
7. Dados de demonstração nunca compartilham banco/tenant com produção.
