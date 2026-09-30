# G|E Agent Stack Standard — Arquitetura Corporativa Obrigatória

## 1. Regra corporativa
Todo sistema, app, API, automação, agente ou produto digital G|E deve nascer e evoluir sob esta stack de especialistas. Não é opcional para fluxos críticos.

A stack existe para impedir que produto, engenharia, UX, segurança, integração, dados, processos, qualidade e compliance sejam tratados como etapas isoladas ou lembrados apenas no fim.

## 2. Conselho permanente
### Produto e negócio
- G|E Product Owner — requisito, personas, regras, critérios de aceite, backlog e valor.
- G|E Lean Six Sigma Black Belt — processo AS-IS/TO-BE, desperdício, causa raiz, FMEA, indicadores e melhoria contínua.
- G|E Revenue & Growth AI — posicionamento, comercialização e promessa compatível com o estágio real.

### Engenharia e experiência
- G|E Principal Software Engineer — arquitetura, implementação, dados, APIs, compatibilidade e escalabilidade.
- G|E UX/UI Experience — jornada, usabilidade, acessibilidade, responsividade e design system.
- G|E Integration Architect — APIs, adapters, contratos, idempotência, retry, reconciliação e resiliência.
- G|E Data & AI Governance — source of truth, qualidade, lineage, LGPD e governança de IA.

### Qualidade, entrega e operação
- G|E QA Excellence — testes funcionais, negativos, integração, E2E, regressão e evidências.
- G|E PMO & Delivery — escopo, risco, prioridade, estado real, releases e evidências.
- G|E Release & DevSecOps — CI/CD, ambientes, build, versão publicada, migrations e rollback.
- G|E SRE & Observability — SLI/SLO, logs, métricas, alertas, capacidade, backup/restore e incidentes.

### Segurança, auditoria e conformidade
- G|E Security Architect & DevSecOps — security/privacy by design e controles preventivos.
- G|E Hacker / Red Team — teste adversarial autorizado.
- G|E Systems Guardian — diagnóstico, correção, hardening e orquestração técnica.
- G|E AUDIT — verificação independente e gate final baseado em evidência.
- G|E ISO & QMS Readiness — ISO 9001:2026 e demais referenciais aplicáveis, QMS, CAPA, auditoria interna e readiness.
- G|E Secure Agent Control — governança das permissões e ações externas dos agentes quando integrado.

## 3. Sequência mínima para nova feature ou correção crítica
DISCOVERY / VOC
→ PRODUCT OWNER
→ LEAN SIX SIGMA / PROCESS REVIEW
→ ARCHITECTURE / ENGINEERING
→ UX/UI
→ DATA & INTEGRATION REVIEW
→ SECURITY ARCHITECTURE
→ IMPLEMENTATION
→ QA EXCELLENCE
→ RED TEAM quando aplicável
→ GUARDIAN FIX / HARDENING
→ QA REGRESSION
→ RED TEAM RETEST quando aplicável
→ SRE / DEVSECOPS RELEASE READINESS
→ ISO/QMS + AUDIT EVIDENCE REVIEW
→ BUSINESS HOMOLOGATION
→ PRODUCTION
→ MONITOR / IMPROVE

## 4. Baseline não regressiva
Tudo o que foi homologado torna-se baseline. Qualquer nova alteração precisa declarar:
1. o que mudou;
2. o que pode quebrar;
3. funções anteriores afetadas;
4. personas/perfis afetados;
5. dados/tabelas afetados;
6. permissões afetadas;
7. APIs/integrações afetadas;
8. relatórios/exportações afetados;
9. riscos e rollback;
10. testes de regressão executados.

Correção pontual sem análise de impacto é proibida em fluxo crítico.

## 5. Gates obrigatórios
### Gate A — Ready for Development
PO + processo + arquitetura + UX + riscos definidos.

### Gate B — Ready for QA
Código, migrations, contratos, logs, testes e documentação mínima disponíveis.

### Gate C — Ready for Homologation
Sem P0; P1 tratado/aceito formalmente; regressão executada; segurança e persistência verificadas; evidências reunidas.

### Gate D — Ready for Production
Homologação concluída; release verificável; rollback/restore; observabilidade; segurança; auditoria; documentação e responsáveis definidos.

## 6. Bloqueios automáticos conceituais
Release deve parar em caso de:
- perda/corrupção de dados;
- acesso indevido ou isolamento rompido;
- cálculo financeiro/fiscal incorreto;
- fluxo crítico quebrado;
- regressão de funcionalidade homologada;
- integração crítica sem fallback/reconciliação aplicável;
- migration insegura sem estratégia de rollback;
- versão publicada diferente da aprovada;
- botão/ação crítica sem efeito;
- relatório/exportação divergente da operação;
- segredo exposto;
- P0 aberto;
- ausência de evidência suficiente.

## 7. Evidence Pack por release
Cada release relevante deve manter, conforme aplicabilidade:
- requisitos e critérios de aceite;
- matriz de personas/permissões;
- análise de impacto;
- arquitetura/ADR;
- FMEA/riscos;
- testes e resultados;
- regressão;
- segurança/Red Team;
- logs e evidências de deploy;
- migration/rollback;
- backup/restore;
- homologação;
- riscos residuais;
- decisão dos gates;
- release notes.

## 8. ISO e certificações
O agente interno pode avaliar readiness e aderência. Nenhum produto ou empresa deve ser declarado 'certificado' sem certificado formal válido emitido no escopo aplicável por organismo competente.

A referência principal de QMS é ISO 9001:2026. Demais referenciais devem ser selecionados pelo risco e contexto do produto.

## 9. Herança para novos produtos
Novo produto G|E deve iniciar com:
- AGENTS/agent-stack reference;
- README de produto e estágio real;
- matriz de personas;
- arquitetura inicial;
- modelo de dados;
- segurança básica;
- estratégia de integração;
- plano de testes e regressão;
- observabilidade mínima;
- CI/CD e versionamento;
- documentação e Evidence Pack;
- plano de backup/restore quando houver dados persistentes.

## 10. Princípio final
Nenhum agente substitui os demais e nenhum 'verde' isolado prova qualidade completa. O objetivo é que cada produto G|E seja construído, testado, protegido, auditado e operado como produto profissional desde o nascimento.