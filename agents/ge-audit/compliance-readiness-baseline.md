# G|E AUDIT — Security, Privacy, ISO & LGPD Readiness Baseline

## Objetivo
Estabelecer a baseline obrigatória para preparar produtos G|E para auditorias de segurança, privacidade, qualidade, continuidade e operação.

Esta baseline produz **readiness/aderência e evidências**. Ela não autoriza declarar certificação ISO. Certificação formal depende do escopo organizacional aplicável, implementação do sistema de gestão e auditoria por organismo certificador competente.

## Referenciais corporativos

### Núcleo obrigatório
1. **ISO/IEC 27001:2022** — Sistema de Gestão de Segurança da Informação (SGSI/ISMS).
2. **ISO/IEC 27002:2022** — controles e boas práticas de segurança da informação.
3. **ISO/IEC 27701:2025** — Sistema de Gestão de Informação de Privacidade (PIMS).
4. **LGPD (Lei nº 13.709/2018)** + regulamentações e orientações vigentes da ANPD.
5. **OWASP ASVS**, **OWASP Top 10** e **OWASP API Security Top 10**.
6. **NIST SSDF** — Secure Software Development Framework.
7. **ISO/IEC 25010:2023** — qualidade de produto de software.
8. **WCAG 2.2 AA** — acessibilidade Web quando aplicável.

### Cloud/SaaS
9. **ISO/IEC 27017:2026** — controles de segurança específicos para serviços em nuvem.
10. **ISO/IEC 27018:2025** — proteção de PII/dados pessoais em nuvem pública quando o provedor atua como operador/processador.
11. **ISO/IEC 27036-4** — segurança no relacionamento com fornecedores de cloud, quando aplicável.

### Gestão, continuidade e operação
12. **ISO 22301:2019** — continuidade de negócios enquanto a edição vigente estiver em vigor; acompanhar revisão em desenvolvimento.
13. **ISO/IEC 20000-1:2018** — gestão de serviços de TI.
14. **ISO 9001:2026** — sistema de gestão da qualidade.
15. **ISO 31000:2018** — gestão de riscos como guia; não é norma certificável.

### Complementares condicionais
Aplicar somente quando o produto/cliente/contrato exigir:
- PCI DSS, se houver armazenamento/processamento/transmissão de dados de cartão;
- requisitos BACEN/CMN, SUSEP, saúde, fiscal, trabalhista ou outros reguladores;
- requisitos de contratação pública;
- SOC 2/controles equivalentes para clientes que exigirem assurance adicional;
- políticas específicas de residência e transferência internacional de dados.

## Programa de conformidade obrigatório

### 1. Governança e SGSI
Manter:
- escopo do SGSI;
- política corporativa de segurança;
- responsáveis e papéis;
- inventário de ativos;
- classificação da informação;
- matriz de riscos;
- plano de tratamento;
- declaração de aplicabilidade (SoA) quando estruturado para ISO 27001;
- indicadores e revisão periódica;
- gestão de exceções e aceite formal de risco;
- auditoria interna;
- melhoria contínua.

### 2. Identity & Access Management
Exigir:
- identidade individual;
- proibição de conta compartilhada para funções críticas;
- MFA para administradores e acessos privilegiados;
- RBAC/ABAC server-side;
- least privilege;
- segregação de funções;
- ciclo joiner/mover/leaver;
- revisão periódica de acessos;
- sessão segura;
- revogação de sessão;
- política de autenticação;
- proteção contra brute force e enumeração;
- trilha de alterações de privilégios.

### 3. Segurança de aplicação
Exigir:
- validação server-side;
- autorização em todos os endpoints;
- proteção contra IDOR/BOLA;
- proteção contra mass assignment;
- proteção contra injeções;
- proteção XSS/CSRF quando aplicável;
- SSRF e path traversal quando aplicável;
- headers e CORS adequados;
- rate limiting;
- upload controlado por tipo, tamanho, conteúdo e armazenamento;
- tratamento seguro de erros;
- secrets fora do código;
- dependências verificadas;
- SAST/SCA/secret scanning;
- DAST/pentest em escopo autorizado;
- testes negativos de autorização.

### 4. Segurança de dados
Exigir:
- criptografia em trânsito;
- criptografia em repouso quando suportada/necessária;
- minimização;
- segregação por tenant/empresa;
- controle de acesso a banco;
- mascaramento/redação de dados sensíveis em logs;
- backup;
- restore testado;
- retenção;
- descarte seguro;
- integridade;
- rastreabilidade;
- reconciliação quando houver valores financeiros.

### 5. LGPD e Privacy by Design
Para cada produto, manter:
- definição de controlador, operador e suboperadores;
- inventário/registro das operações de tratamento (RoPA);
- finalidade e base legal por tratamento;
- categorias de titulares e dados;
- dados pessoais sensíveis identificados;
- minimização e necessidade;
- avisos de privacidade;
- gestão de consentimento somente quando consentimento for a base adequada;
- atendimento aos direitos dos titulares;
- canal do encarregado/DPO quando aplicável;
- retenção e eliminação;
- compartilhamentos;
- transferências internacionais;
- contratos/DPA com operadores;
- avaliação de fornecedores;
- privacy by default;
- RIPD/DPIA quando o risco justificar ou quando exigido;
- processo de incidentes envolvendo dados pessoais;
- registro de decisões e accountability.

### 6. Resposta a incidentes
Manter:
- classificação de incidentes;
- papéis e contatos;
- triagem;
- contenção;
- preservação de evidências;
- investigação;
- erradicação;
- recuperação;
- post-mortem;
- lições aprendidas;
- avaliação específica de incidente com dados pessoais;
- fluxo para decisão sobre comunicação à ANPD e aos titulares quando aplicável;
- exercícios/tabletop periódicos.

### 7. Continuidade e recuperação
Manter:
- BIA;
- serviços críticos;
- RTO/RPO;
- backup;
- restore;
- DR;
- plano de continuidade;
- dependências críticas;
- fornecedores críticos;
- exercícios de recuperação;
- evidências do resultado.

### 8. Secure SDLC / DevSecOps
Exigir:
- requisitos de segurança desde o desenho;
- threat modeling proporcional ao risco;
- revisão de arquitetura;
- code review;
- branch protection quando disponível;
- CI/CD controlado;
- testes automatizados;
- testes de regressão;
- scanning de dependências;
- gestão de vulnerabilidades;
- versionamento;
- changelog;
- aprovação de release;
- rollback;
- separação DEV/HML/PROD;
- dados reais proibidos em teste salvo processo formal e proteção adequada.

### 9. Logs, auditoria e observabilidade
Exigir:
- logs de autenticação;
- falhas de autorização;
- alteração de privilégios;
- operações financeiras;
- alterações de cadastro crítico;
- aprovações/reprovações;
- upload/substituição/exclusão de documentos;
- mudanças de política/configuração;
- identificação de ator, data/hora, origem e objeto;
- logs resistentes a alteração indevida;
- retenção definida;
- alertas de segurança;
- monitoramento de disponibilidade, erro e latência.

### 10. Fornecedores e supply chain
Exigir:
- inventário de terceiros;
- criticidade;
- requisitos contratuais de segurança e privacidade;
- DPA quando aplicável;
- suboperadores;
- SLA;
- continuidade;
- notificação de incidente;
- direito/evidência de auditoria proporcional;
- avaliação periódica;
- plano de saída/portabilidade.

### 11. Gestão de mudanças
Toda mudança relevante deve registrar:
- requisito;
- risco;
- impacto;
- aprovação;
- teste;
- regressão;
- segurança;
- evidência;
- deploy;
- rollback;
- responsável.

### 12. Pessoas e processos
Exigir:
- política de segurança;
- treinamento;
- confidencialidade;
- onboarding/offboarding;
- segregação de função;
- processo disciplinar aplicável;
- canal de incidentes;
- responsabilidades documentadas.

## Evidence Pack
Cada sistema deve manter um pacote auditável contendo:
- arquitetura;
- diagrama de dados;
- inventário de APIs;
- matriz de perfis/permissões;
- inventário de dados pessoais;
- RoPA;
- matriz de riscos;
- SoA/readiness map;
- políticas;
- procedimentos;
- registros de testes;
- pentest/red-team;
- vulnerabilidades e correções;
- evidências de backup/restore;
- evidências de DR;
- logs de auditoria;
- relatório de fornecedores;
- incident response plan;
- relatório de acessibilidade;
- release checklist;
- aprovação G|E AUDIT.

## Matriz de maturidade
Para cada controle:
- 0 — inexistente;
- 1 — definido informalmente;
- 2 — documentado;
- 3 — implementado;
- 4 — testado com evidência;
- 5 — monitorado e melhorado continuamente.

Produção de alto risco deve buscar nível 4 nos controles aplicáveis e nível 5 nos controles críticos.

## Gate de conformidade
### BLOQUEIO
Não aprovar produção se houver:
- P0;
- bypass de autenticação/autorização;
- isolamento de tenant não comprovado;
- dados pessoais sem controle de acesso;
- operação financeira crítica sem trilha;
- backup sem capacidade de restore comprovada;
- segredo exposto;
- ausência de resposta a incidente para sistema crítico;
- tratamento relevante de dados pessoais sem inventário/base legal/responsabilidade definida.

### Aprovável com evidência
O sistema pode receber readiness quando:
- controles aplicáveis foram mapeados;
- lacunas têm risco/responsável/prazo;
- testes foram executados;
- evidências estão anexadas;
- Red Team não deixou P0/P1 bloqueante;
- Guardian corrigiu os achados;
- G|E AUDIT executou reteste independente.

## Regra de comunicação
Termos permitidos conforme evidência:
- "alinhado à baseline G|E";
- "preparado para auditoria";
- "ISO 27001 readiness";
- "controles mapeados";
- "aderência interna verificada".

Termos proibidos sem auditoria/certificação externa aplicável:
- "certificado ISO";
- "possui ISO";
- "homologado pela ISO";
- "100% conforme todas as normas".

## Aplicação à Gestão de Despesas
A Gestão de Despesas deve priorizar:
- RBAC server-side por Colaborador, Gestor, Controladoria, Financeiro e Administrador;
- segregação entre empresas/tenants;
- proteção de dados bancários e documentos fiscais;
- trilha imutável de aprovação, correção, glosa e pagamento;
- upload seguro de comprovantes;
- logs de visualização/alteração de dados sensíveis;
- política de retenção;
- RoPA e base legal;
- processo de titular;
- resposta a incidente;
- backup/restore;
- testes Red Team;
- evidência G|E AUDIT antes de produção.
