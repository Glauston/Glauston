# G|E Data Core — Production Readiness v1.0

**Release alvo:** v1.0 Enterprise Production Ready  
**Issue mestre:** #18

## Checklist de Go-Live

### 1. Criptografia e Cofre
- [ ] KMS/HSM real integrado
- [ ] BYOK validado
- [ ] HYOK validado quando aplicável
- [ ] Rotação de chaves testada
- [ ] Revogação e recuperação testadas
- [ ] Operações críticas com aprovação/quórum

**Evidência mínima:** teste automatizado + log + procedimento de recuperação.

### 2. Backup e Recuperação
- [ ] Backup automático configurado
- [ ] Criptografia de backup
- [ ] Restore integral testado
- [ ] Restore granular testado
- [ ] Política de retenção documentada

**Evidência mínima:** relatório de restore com data, duração, resultado e integridade.

### 3. Disaster Recovery
- [ ] RPO definido
- [ ] RTO definido
- [ ] Ambiente/estratégia de contingência
- [ ] Failover testado
- [ ] Retorno ao ambiente primário testado

**Evidência mínima:** relatório de exercício de DR.

### 4. Privacidade e Proteção de Dados
- [ ] PII discovery automático
- [ ] Classificação de dados sensíveis
- [ ] Masking dinâmico
- [ ] Tokenização
- [ ] Retenção e descarte
- [ ] Registro de finalidade/base legal quando aplicável

**Evidência mínima:** suíte de testes com dados sintéticos e relatório de cobertura.

### 5. Governança de IA
- [ ] Identidade de agente
- [ ] Escopo mínimo por agente
- [ ] Aprovação para ações críticas
- [ ] Auditoria de prompts/ações conforme política
- [ ] Segregação de tenants
- [ ] Proteção contra exfiltração e abuso de ferramentas
- [ ] Kill switch / revogação

**Evidência mínima:** testes positivos/negativos e trilha de auditoria.

### 6. Segurança Ofensiva e Defensiva
- [ ] SAST
- [ ] DAST
- [ ] SCA/dependências
- [ ] Secret scanning
- [ ] Pentest independente
- [ ] Red Team autorizado
- [ ] Correção de achados críticos/altos

**Evidência mínima:** relatório de segurança, CVSS/criticidade, correções e reteste.

### 7. Resiliência e Performance
- [ ] Teste de carga
- [ ] Teste de stress
- [ ] Teste de endurance
- [ ] Chaos/falha controlada
- [ ] Rate limiting validado
- [ ] Idempotência validada
- [ ] Observabilidade e alertas validados

**Evidência mínima:** relatório com SLOs, erros, latência e capacidade.

### 8. Compliance e Operação
- [ ] LGPD — políticas e responsabilidades
- [ ] SLA/SLO
- [ ] Incident Response
- [ ] Gestão de vulnerabilidades
- [ ] Gestão de mudanças
- [ ] Controle de acesso e revisão periódica
- [ ] Matriz de responsabilidade

**Evidência mínima:** documentos versionados + aprovação formal.

### 9. Release e Comercialização
- [ ] Versionamento semântico
- [ ] Changelog
- [ ] OpenAPI publicado
- [ ] Guia de implantação
- [ ] Guia de administração
- [ ] Guia de integração
- [ ] Termos/SLA comercial
- [ ] Plano de suporte
- [ ] Onboarding de cliente piloto

**Evidência mínima:** pacote de release reproduzível e documentação publicada.

## Política de bloqueio

Qualquer item crítico pendente mantém o produto em `Commercial Pilot Ready`. O selo `Enterprise Production Ready` só pode ser emitido após validação do G|E AUDIT e evidências anexadas à issue mestre #18.
