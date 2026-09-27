# G|E Data Core — Security Architecture v1.0

## Princípios

1. Zero Trust por padrão
2. Menor privilégio
3. Segregação forte entre tenants
4. Criptografia em trânsito e em repouso
5. Segredos fora do código-fonte
6. Auditoria imutável de ações críticas
7. Segurança por finalidade de uso do dado
8. Resiliência e recuperação comprováveis
9. Controles específicos para agentes de IA
10. Evidência técnica para cada controle crítico

## Camadas

### Identidade e acesso
- Identidade única para usuários, serviços e agentes
- RBAC/ABAC conforme necessidade
- Escopos mínimos
- MFA para perfis administrativos
- Sessões e chaves revogáveis

### Proteção de dados
- G|E Cofre / Cápsulas Seguras
- KMS/HSM como gate de produção
- BYOK/HYOK para clientes elegíveis
- Tokenização e masking para dados sensíveis
- Passaporte do Dado para origem, classificação, finalidade e eventos relevantes

### API e integração
- API Keys protegidas
- Rate limiting e quotas
- Idempotência
- Validação de schema
- Autorização por tenant e escopo
- OpenAPI como contrato versionado

### Auditoria
- Trilha de ações administrativas
- Trilha de acessos a dados sensíveis
- Evidências de alteração de política/chaves
- Correlação de eventos de segurança
- Retenção conforme política

### Agentes de IA
- Identidade própria
- Escopos específicos
- Acesso temporário quando possível
- Aprovação humana em operações críticas
- Logs de execução e ferramentas acionadas
- Kill switch/revogação
- Proteção contra exfiltração entre tenants

### Resiliência
- Backup criptografado
- Restore testado
- RPO/RTO documentados
- Failover e DR exercitados
- Observabilidade e alertas

## Integrações do ecossistema

- **G|E Guardian:** monitoramento defensivo, anomalias e resposta
- **G|E Secure:** testes ofensivos autorizados e validação de superfícies
- **G|E AUDIT:** conformidade, evidências e autorização de Go-Live
- **G|E Secure Agent Control:** governança de identidades, permissões e ações de agentes

## Regra de independência comercial

O Data Core e cada componente associado devem possuir contratos de integração bem definidos e poder ser comercializados separadamente. A integração do ecossistema aumenta a cobertura, mas não deve criar dependência técnica desnecessária entre produtos.
