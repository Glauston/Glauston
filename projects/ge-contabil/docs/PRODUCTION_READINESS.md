# Gate de Produção — G|E CONTÁBIL

Não cadastrar dados reais de clientes até os itens críticos abaixo estarem aprovados em homologação.

## P0 — obrigatórios antes de produção
- [ ] Identidade corporativa + MFA/2FA.
- [ ] Matriz RBAC completa e testes negativos por perfil.
- [ ] Isolamento multi-tenant testado automaticamente.
- [ ] Criptografia de dados sensíveis e cofre de segredos.
- [ ] Política e implementação LGPD.
- [ ] Backup, restore e RPO/RTO validados.
- [ ] Observabilidade: logs, métricas, alertas, rastreamento.
- [ ] Auditoria imutável para alterações críticas.
- [ ] WAF/rate limiting e revisão OWASP.
- [ ] Teste de carga representando a carteira real.
- [ ] Plano de migração/importação com reconciliação e rollback.
- [ ] Ambiente separado: dev, homologação e produção.
- [ ] Homologação de certificados e conectores oficiais.
- [ ] Aprovação do responsável contábil/jurídico para regras e fluxos.
- [ ] Plano de incidente e continuidade.

## P1 — operacionalização completa
- [ ] Ingestão de XML NF-e/NFS-e e documentos.
- [ ] Open Finance/conciliação quando contratado e autorizado.
- [ ] Calendário fiscal parametrizável.
- [ ] E-mails/WhatsApp por provedor oficial com consentimento e trilha.
- [ ] Portal do cliente e upload seguro.
- [ ] Versionamento de regras tributárias com workflow de aprovação.
- [ ] Relatórios contábeis/fiscais homologados.
- [ ] Exportações e integrações com legado.
- [ ] Painel de SLA e produtividade.

## P2 — agentes avançados
- [ ] Classificação de documentos com confiança e revisão humana.
- [ ] Auditor IA independente da IA executora.
- [ ] Explicabilidade: evidência, regra e origem do alerta.
- [ ] Avaliação contínua de qualidade e taxa de falso positivo.
- [ ] Bloqueio explícito de decisões fiscais críticas sem aprovação humana.

## Migração da empresa de 16+ anos
1. Inventariar clientes ativos/inativos, regimes, filiais, usuários e históricos.
2. Definir fonte de verdade por domínio.
3. Exportar legado em lotes versionados.
4. Validar CNPJ, competência, saldo, obrigação e documento.
5. Rodar sistema antigo e novo em paralelo por período definido pela empresa.
6. Conciliar divergências e registrar aceite.
7. Migrar por ondas, nunca todos os clientes de uma vez.
