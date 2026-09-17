# G|E SOFTWARE EXCELLENCE AGENT

> Norma corporativa obrigatória para todos os sistemas G|E.
> Este arquivo deve ser tratado por agentes de código, arquitetos, desenvolvedores e revisores como instrução de nível máximo do repositório.

## 1. Missão
Construir e manter produtos de software com padrão profissional e qualidade internacional, com excelência em arquitetura, experiência do usuário, segurança, qualidade, entrega e operação.

O objetivo não é apenas “fazer funcionar”. O objetivo é entregar software que seja:
- correto;
- simples de usar;
- seguro;
- auditável;
- escalável;
- resiliente;
- observável;
- manutenível;
- testável;
- integrável;
- multiempresa/white label quando aplicável;
- preparado para evolução sem regressão.

## 2. Referenciais mínimos
Aplicar, de forma proporcional ao risco e ao contexto do produto:
- ISO/IEC 25010:2023 — modelo de qualidade de produto de software;
- WCAG 2.2 nível AA — acessibilidade para interfaces Web quando aplicável;
- OWASP ASVS 5.0 — verificação de segurança de aplicações Web;
- NIST SSDF SP 800-218 — práticas de desenvolvimento seguro;
- práticas DevSecOps, SRE, CI/CD, observabilidade e gestão de mudanças;
- princípios de privacy/security by design e least privilege.

Esses referenciais orientam a governança. Não substituir requisitos legais, regulatórios ou contratuais específicos do produto.

## 3. Conselho obrigatório
Toda entrega relevante deve ser avaliada por cinco papéis permanentes. Um mesmo agente pode executar vários papéis, mas deve realizar as avaliações separadamente e registrar os resultados.

### 3.1 Software Architect — ARQUITETO DE SOFTWARE
Autoridade técnica do produto.

Responsabilidades:
- arquitetura lógica, física e de implantação;
- modularidade, baixo acoplamento e alta coesão;
- modelo de dados, integridade e rastreabilidade;
- APIs, contratos, versionamento e integrações;
- multi-tenancy, multiempresa e white label;
- extensibilidade e substituição de provedores;
- segurança arquitetural;
- estratégia de cache, filas, jobs e concorrência quando aplicável;
- performance, disponibilidade, backup e recuperação;
- observabilidade;
- migração e compatibilidade retroativa;
- ADRs para decisões arquiteturais relevantes;
- prevenção de dívida técnica acidental.

Pergunta obrigatória do Arquiteto:
> Se este produto crescer 100x, receber novos clientes, novas marcas, novos provedores e novas integrações, esta decisão ainda é sustentável?

O Arquiteto tem poder de BLOQUEAR release.

### 3.2 UX — USER EXPERIENCE
Responsável pela jornada completa do usuário.

Responsabilidades:
- mapear a jornada por persona/perfil;
- reduzir passos, cliques e retrabalho;
- tornar o próximo passo sempre evidente;
- mensagens de erro úteis e acionáveis;
- prevenção de erros antes de ocorrerem;
- continuidade entre WEB e APP/mobile;
- acessibilidade e usabilidade;
- consistência de termos e linguagem;
- estados de vazio, loading, erro, sucesso, bloqueio e confirmação;
- recuperação segura após interrupção da jornada;
- validação de fluxos críticos com cenários reais.

Regra UX:
> Se o usuário precisa descobrir sozinho como concluir uma tarefa básica, a experiência não está pronta.

UX tem poder de BLOQUEAR release por jornada incompleta.

### 3.3 UI — USER INTERFACE
Responsável pelo padrão visual e interação de interface.

Responsabilidades:
- design system e componentes reutilizáveis;
- hierarquia visual, grids, espaçamento e tipografia;
- consistência de cores e estados;
- responsividade;
- formulários estáveis;
- máscaras, datas, números e moeda adequados à localidade;
- foco, teclado, contraste e legibilidade;
- feedback de ações assíncronas;
- prevenção de double-submit;
- interfaces sem saltos, corrupção de input ou perda de cursor;
- compatibilidade com navegadores suportados.

UI tem poder de BLOQUEAR release por falha que comprometa uso, clareza ou acessibilidade.

### 3.4 PMO / PRODUCT DELIVERY
Responsável por escopo, rastreabilidade e previsibilidade.

Responsabilidades:
- manter requisitos e critérios de aceite;
- Definition of Ready (DoR);
- Definition of Done (DoD);
- matriz de funcionalidades por perfil;
- dependências e riscos;
- priorização e impacto;
- registro de decisões;
- controle de mudança;
- roadmap e releases;
- impedir perda de requisito já homologado;
- garantir documentação mínima de negócio e técnica;
- separar claramente: desenvolvimento, homologação, produção.

Regra PMO:
> Nenhuma demanda entra em implementação sem requisito minimamente testável e nenhuma demanda sai como pronta sem evidência de aceite.

### 3.5 QA — QUALITY ASSURANCE
Responsável por tentar quebrar o sistema antes do usuário.

Obrigatório testar, quando aplicável:
- caminho feliz;
- caminhos alternativos;
- campos vazios;
- dados inválidos;
- limites e extremos;
- edição e reedição;
- salvar e continuar depois;
- logout/login e persistência;
- permissões positivas e negativas;
- duplicidade;
- concorrência;
- cálculos, casas decimais e arredondamentos;
- uploads/anexos e substituição;
- OCR e fallback manual;
- integrações indisponíveis;
- latência/timeout;
- WEB e APP/mobile;
- navegadores suportados;
- responsividade;
- relatórios e exportações;
- histórico/auditoria;
- regressão de fluxos homologados;
- segurança funcional básica;
- recuperação de erro.

QA tem poder de BLOQUEAR release.

## 4. Funções técnicas de apoio

### Security / DevSecOps
- threat modeling proporcional ao risco;
- least privilege;
- segregação de tenants/empresas;
- proteção de dados sensíveis;
- secrets fora do código;
- validação de entrada/saída;
- proteção contra classes OWASP relevantes;
- dependências e supply chain;
- logs sem exposição indevida;
- trilha de auditoria;
- revisão de autorização server-side;
- backup e recuperação testados.

### Data & Integration Architecture
- fonte de verdade definida;
- IDs canônicos e idempotência;
- contratos de integração versionados;
- reconciliação;
- tratamento de duplicidade;
- tolerância a indisponibilidade externa;
- migrations reversíveis ou estratégia de rollback;
- qualidade e lineage de dados quando aplicável.

### SRE / Observability
- health checks úteis;
- logs estruturados;
- métricas de erro, latência e disponibilidade;
- tracing quando necessário;
- alertas acionáveis;
- SLOs/SLIs para fluxos críticos quando em produção;
- runbooks para incidentes relevantes.

## 5. Ciclo obrigatório de entrega

### Gate 0 — Descoberta
- problema e público definidos;
- objetivo mensurável;
- regra de negócio conhecida;
- restrições registradas.

### Gate 1 — Ready for Development
Exigir:
- requisito;
- personas/perfis afetados;
- jornada;
- critérios de aceite;
- impactos em dados, permissões, relatórios e integrações;
- riscos conhecidos.

### Gate 2 — Architecture & UX Review
Antes de implementar:
- arquitetura revisada;
- modelo de dados revisado;
- APIs/integrações revisadas;
- fluxo UX revisado;
- estados de erro definidos;
- segurança considerada.

### Gate 3 — Implementation
Implementar com:
- separação de responsabilidades;
- código legível;
- validações server-side;
- testes adequados;
- logs/auditoria quando aplicável;
- documentação mínima.

### Gate 4 — Technical QA
Executar:
- testes unitários quando aplicáveis;
- testes de integração;
- testes de contrato para integrações relevantes;
- testes E2E dos fluxos críticos;
- regressão;
- matriz WEB/mobile;
- segurança funcional;
- relatório/exportação.

### Gate 5 — Ready for Business Homologation
Só usar status PRONTO PARA HOMOLOGAÇÃO se:
- nenhum P0 aberto;
- nenhum fluxo crítico quebrado;
- nenhum botão sem ação;
- nenhum dado perdido;
- nenhuma regressão crítica conhecida;
- evidências do QA disponíveis;
- checklist de release aprovado.

### Gate 6 — Business Homologation
Usuários validam regra operacional. NOKs retornam para desenvolvimento e DEVEM ser retestados.

### Gate 7 — Production
Produção exige:
- homologação concluída;
- migration/rollback avaliados;
- segurança e permissões revisadas;
- observabilidade mínima ativa;
- backup/recovery adequados;
- release notes;
- plano de rollback.

## 6. Estados oficiais
- EM DESENVOLVIMENTO — ainda não liberado para usuários.
- QA INTERNO — em validação técnica.
- PRONTO PARA HOMOLOGAÇÃO — gates técnicos aprovados.
- EM HOMOLOGAÇÃO — usuários de negócio testando.
- HOMOLOGADO — cenários críticos aprovados e NOKs bloqueantes corrigidos/retestados.
- PRODUÇÃO — release aprovado e operável.

Nunca afirmar “100% funcionando”, “validado”, “pronto” ou equivalente apenas porque houve deploy.

## 7. Definition of Done corporativa
Uma funcionalidade só pode ser considerada DONE quando todos os itens aplicáveis abaixo forem verdadeiros:
- regra de negócio implementada;
- critérios de aceite atendidos;
- persistência correta;
- autorização/permissão correta;
- edição/correção funciona;
- erros são tratados;
- dados não se perdem ao recarregar/reentrar;
- histórico/auditoria preservados;
- WEB validado;
- APP/mobile validado quando aplicável;
- responsividade validada;
- acessibilidade relevante validada;
- relatório reflete a alteração;
- exportação reflete a alteração;
- integrações refletem a alteração;
- regressão executada;
- segurança revisada;
- documentação atualizada;
- QA aprovou.

## 8. Severidade de defeitos

### P0 — Bloqueante
Exemplos:
- perda/corrupção de dados;
- autorização indevida;
- exposição de dados;
- cálculo financeiro incorreto;
- fluxo principal impossível de concluir;
- upload/documento perdido;
- regressão que quebra funcionalidade homologada;
- falha que impeça operação crítica.

P0 bloqueia homologação e produção.

### P1 — Alta
Impacto relevante com workaround inadequado. Deve ser corrigido antes de produção, salvo aceite formal de risco.

### P2 — Média
Não bloqueia fluxo principal, mas prejudica eficiência, consistência ou UX.

### P3 — Baixa
Cosmético ou melhoria sem risco operacional.

## 9. Release Gate — bloqueios automáticos conceituais
NÃO liberar se houver:
- botão sem função;
- ação principal escondida ou ausente;
- beco sem saída;
- formulário que perde/corrompe entrada;
- valor monetário interpretado incorretamente;
- data/localidade incorreta;
- perda de dados ao editar/recarregar;
- permissão incorreta;
- validação somente no front-end para regra crítica;
- cálculo divergente;
- arquivo/comprovante não persistido;
- histórico inconsistente;
- funcionalidade homologada removida/quebrada;
- divergência crítica WEB x APP;
- relatório/exportação divergente da operação;
- erro P0 aberto.

## 10. Regressão obrigatória
Toda mudança deve considerar explicitamente:
1. o que mudou;
2. o que pode quebrar por consequência;
3. quais fluxos anteriores precisam ser retestados;
4. quais relatórios/exportações são impactados;
5. quais perfis/permissões são impactados;
6. quais integrações são impactadas.

Correção pontual sem regressão é proibida em fluxo crítico.

## 11. Matriz mínima de validação por feature
Para cada feature registrar:
- ID/requisito;
- objetivo;
- personas;
- telas;
- APIs;
- entidades/tabelas;
- permissões;
- happy path;
- negative paths;
- estados vazios/erro/loading;
- desktop;
- mobile;
- relatório;
- exportação;
- auditoria;
- testes automatizados;
- evidência manual;
- resultado final.

## 12. Qualidade de experiência
Toda jornada deve buscar:
- menor número razoável de passos;
- nomenclatura de negócio clara;
- defaults seguros;
- feedback imediato;
- confirmação de ações destrutivas;
- prevenção de duplicidade;
- recuperação de falhas;
- continuidade entre dispositivos;
- visibilidade do status;
- rastreabilidade 360°.

## 13. Multiempresa e White Label
Quando aplicável, projetar desde o início para:
- tenant/empresa como contexto explícito;
- isolamento de dados;
- identidade visual configurável;
- políticas por empresa;
- perfis e hierarquias por empresa;
- integrações por tenant;
- feature flags/módulos por cliente;
- domínios/configurações próprias;
- nenhuma regra de marca hard-coded no núcleo.

## 14. Integrações futuras
Provedores externos devem ser conectados por abstrações/adapters, evitando dependência rígida de fornecedor. Isso se aplica a pagamentos, cartões, OCR, ERP, mensageria, autenticação, e-mail, WhatsApp e demais integrações.

## 15. Evidência antes da afirmação
Antes de declarar uma função pronta, o agente deve possuir evidência suficiente de que:
- foi implementada;
- foi exercitada;
- persistiu dados corretamente;
- produziu o estado seguinte esperado;
- não quebrou fluxo crítico relacionado.

Sem evidência, comunicar como “implementado, pendente de validação” — nunca como “validado”.

## 16. Regra permanente para agentes de IA
Agentes de IA trabalhando nos sistemas G|E devem:
- ler este arquivo antes de alterar código;
- preservar requisitos previamente aprovados;
- não remover funcionalidade silenciosamente;
- não mascarar limitação com texto de sucesso;
- não confundir deploy com QA;
- explicar riscos técnicos relevantes;
- propor refatoração quando dívida técnica ameaçar confiabilidade;
- executar revisão de regressão antes de concluir;
- atuar criticamente, não apenas obedecer a alteração superficial.

## 17. Princípio final
> Software profissional não é o que apenas abre a tela. É o que resolve a jornada corretamente, protege o dado, registra o que aconteceu, suporta crescimento e continua funcionando depois da próxima mudança.
