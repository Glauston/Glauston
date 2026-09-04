# Arquitetura e Segurança — Requisitos G|E ONE

> Documento de requisitos. Não representa controles já implementados.

## Arquitetura alvo
- SaaS multi-tenant com tenant_id obrigatório e isolamento testado.
- API-first para web/PWA, notificações, OCR/IA e hardware.
- Adaptadores de hardware desacoplados do domínio.
- filas/eventos para notificações e telemetria;
- banco transacional + armazenamento de objetos controlado;
- observabilidade centralizada;
- ambientes separados dev/test/staging/prod.

## Identidade e acesso
- RBAC + escopo por condomínio/carteira;
- menor privilégio;
- MFA para perfis administrativos;
- sessões expiradas/revogáveis;
- políticas de senha/SSO conforme evolução;
- contas de serviço separadas de usuários humanos;
- revisão periódica de acessos.

## Dados/LGPD
- minimização e finalidade;
- classificação de dados;
- criptografia em trânsito e repouso;
- retenção e descarte definidos;
- exportação/portabilidade quando aplicável;
- registro de bases/consentimentos quando necessários;
- atendimento a direitos do titular;
- contratos e subprocessadores mapeados;
- privacy by design.

## Auditoria G|E Trust
Eventos críticos append-only/logicamente imutáveis, com timestamp confiável, ator, tenant, ação, recurso, resultado e correlação. Acesso aos logs também deve ser auditado.

## Hardware
- identidade única por dispositivo;
- autenticação mútua/segura com backend;
- comandos de abertura autorizados e expiráveis;
- proteção contra replay;
- firmware/versões inventariados;
- telemetria de porta, energia e conectividade quando disponível;
- modo de contingência definido por hardware homologado;
- atualização remota somente com mecanismo seguro e testado.

## Segurança de aplicação
- validação server-side;
- proteção contra enumeração de unidades/encomendas;
- rate limiting;
- tokens de retirada curtos/expiráveis e não armazenados em texto puro;
- URLs assinadas para mídia;
- upload com validação;
- gestão de segredos fora do código;
- dependências monitoradas;
- testes SAST/DAST/dependências no pipeline quando a stack for definida.

## Backup/DR
Definir RPO/RTO comercialmente compatíveis, backup automatizado, cópia protegida, restauração testada e runbook de desastre. Backup não homologado não deve ser prometido comercialmente.

## IA/OCR
- confiança mínima configurável;
- baixa confiança exige confirmação humana;
- não inferir dados sensíveis desnecessários;
- mascarar/minimizar dados enviados a provedores;
- registrar modelo/provedor/versão quando relevante à auditoria;
- impedir que saída de IA execute abertura física sem política/autorização apropriada.

## Critérios para Base44 ou qualquer plataforma low-code
Só aprovar produção após comprovar: isolamento multi-tenant, RBAC, MFA, logs, exportação, backups/restauração, região/processamento de dados, APIs/webhooks, gestão de segredos, limites, SLA, observabilidade, integração de hardware, política de incidentes e capacidade de migração. Se um requisito crítico não puder ser comprovado, usar a plataforma apenas para protótipo ou substituir o componente.

## Gates antes do primeiro cliente
1. threat model;
2. matriz de permissões testada;
3. testes de isolamento entre tenants;
4. teste de restauração;
5. teste de falhas de hardware/rede;
6. revisão LGPD/contratos;
7. pentest/revisão de segurança proporcional ao risco;
8. monitoramento/alertas;
9. runbooks de incidente e suporte;
10. homologação funcional e de acessibilidade.
