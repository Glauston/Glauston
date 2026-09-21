# G|E Product Independence Standard

## Regra arquitetural central
Cada sistema/produto deve conseguir ser desenvolvido, implantado, vendido, licenciado, operado, atualizado e suportado de forma independente.

Nenhum produto pode depender obrigatoriamente de outro produto G|E para executar sua função principal.

## O que "independente" significa

Cada produto deve possuir, quando aplicável:

- aplicação própria;
- configuração própria;
- banco de dados próprio ou schema isolado com contrato explícito;
- autenticação própria ou integração configurável com IdP;
- autorização própria;
- API própria;
- migrações próprias;
- logs próprios;
- observabilidade própria;
- backup/restore próprio;
- documentação própria;
- pipeline CI/CD próprio;
- versionamento próprio;
- deployment próprio;
- licenciamento/plano comercial próprio;
- usuários e tenants próprios;
- exportação/importação de dados;
- health check;
- runbook de operação;
- política de segurança;
- contrato de integração.

## Integrações entre produtos
Integrações devem ser opcionais e desacopladas.

Padrões aceitos:
- REST/GraphQL;
- Webhooks;
- eventos/filas;
- MCP quando aplicável;
- SDKs;
- adapters.

Padrões proibidos como requisito comercial:
- acesso direto ao banco de outro produto;
- dependência de tabela interna de outro sistema;
- código compartilhado sem versionamento;
- autenticação dependente de outro produto G|E sem fallback/configuração;
- chamadas síncronas obrigatórias para funcionalidade central sem modo degradado;
- uso de IDs internos de outro produto como chave primária local.

## Ecossistema opcional
Produtos G|E podem ganhar capacidades extras quando conectados:

- NEXUS: CRM e relacionamento;
- G|E PMO: portfólio e gestão;
- G|E Revenue & Growth: inteligência comercial;
- G|E Systems Guardian: qualidade e release gate;
- G|E Secure Agent Control: governança de agentes/ações;
- G|E Data Core: integração/linhagem quando contratado;
- G|E Secure: postura e segurança.

Essas integrações não podem impedir o funcionamento standalone do produto.

## Modos comerciais
Cada produto deve poder ser ofertado em pelo menos um destes modelos, conforme sua natureza:
- SaaS multitenant;
- SaaS single-tenant;
- private cloud;
- on-premises;
- híbrido;
- licenciamento por usuário;
- licenciamento por volume/uso;
- assinatura por empresa/tenant;
- serviço gerenciado.

## Dados
O cliente deve conseguir identificar claramente:
- onde seus dados ficam;
- quais serviços externos recebem dados;
- como exportar dados;
- como excluir/retê-los conforme contrato;
- como migrar para outro ambiente.

Integrações opcionais devem ser ativadas explicitamente.

## Dependências internas
Bibliotecas compartilhadas são permitidas somente quando:
- versionadas;
- semanticamente compatíveis;
- publicadas como pacote/componente;
- com changelog;
- sem criar dependência circular;
- sem exigir acesso a infraestrutura de outro produto.

## Identidade
Cada produto deve suportar identidade independente.

Pode integrar:
- login próprio;
- OIDC;
- SAML;
- Google/Microsoft corporativo;
- outro IdP compatível.

O uso do G|E Secure Agent Control ou NEXUS não pode ser requisito para autenticar usuários.

## Resiliência
Se uma integração opcional estiver indisponível:
- o produto deve continuar executando sua função principal;
- eventos podem ficar em fila;
- sincronizações podem entrar em retry;
- o usuário deve receber status claro;
- não deve haver corrupção de dados.

## Critério para comercialização independente
Um produto só recebe o selo interno **Standalone Ready** quando comprovar:

1. instalação/deploy isolado;
2. login independente;
3. operação principal sem outro produto G|E;
4. banco/configuração isolados;
5. API/integrações documentadas;
6. backup/restore;
7. exportação de dados;
8. monitoramento;
9. testes;
10. segurança;
11. documentação de implantação;
12. plano/licenciamento comercial;
13. suporte/runbook;
14. desligamento das integrações opcionais sem quebrar o core.

## Pacote comercial mínimo
Cada sistema deverá possuir:
- Product Card;
- ficha técnica;
- proposta de valor;
- ICP;
- demonstração;
- manual;
- política de implantação;
- requisitos técnicos;
- SLA disponível;
- política de backup;
- segurança;
- integração/API;
- tabela ou modelo de preço;
- contrato/termos aplicáveis;
- roadmap separado do que já existe.

## Regra para o portfólio atual
O G|E Systems Guardian deve auditar cada produto existente contra este padrão.

O G|E Revenue & Growth só poderá classificar um produto como **comercializável standalone** quando o Guardian registrar evidência do Standalone Ready.

## Princípio final
**Ecossistema por integração, nunca por dependência.**

Os produtos podem ser melhores juntos, mas devem ser vendáveis e utilizáveis separados.
