# Modelo de Segurança

## Modelo mental
Agente de IA é tratado como workload não confiável por padrão. Ele recebe apenas a capacidade necessária para executar a tarefa aprovada.

## Controles P0
### Identidade
- identidade única por agente;
- versão registrada;
- owner obrigatório;
- expiração de credenciais;
- revogação imediata.

### Autorização
Combinação RBAC + ABAC:
- papel define capacidade base;
- atributos refinam por tenant, ambiente, cliente, valor, horário, classificação de dado e destino.

### Proteção contra escalada
- agente não altera a própria política;
- agente não cria credenciais;
- agente não se autoaprova;
- agente não remove logs;
- agente não amplia seu escopo de ferramenta.

### Dados
Classificação mínima:
PUBLIC | INTERNAL | CONFIDENTIAL | RESTRICTED

Políticas podem:
- mascarar;
- bloquear;
- limitar campos;
- impedir saída externa;
- exigir aprovação;
- exigir justificativa.

### Ferramentas
Toda integração deve ser cadastrada com:
- owner;
- finalidade;
- ações disponíveis;
- escopo;
- risco;
- ambientes;
- credenciais;
- limites;
- destinos permitidos.

### Kill Switch
Níveis:
1. ação;
2. agente;
3. integração;
4. tenant;
5. ambiente;
6. global.

Ao acionar:
- negar novas execuções;
- cancelar filas elegíveis;
- revogar credenciais/sessões;
- registrar evento crítico;
- notificar responsáveis.

## Threat model inicial
Cobrir pelo menos:
- prompt injection;
- tool abuse;
- privilege escalation;
- data exfiltration;
- confused deputy;
- secret exposure;
- poisoned context;
- replay;
- duplicate execution;
- approval bypass;
- tenant escape;
- audit tampering;
- runaway cost/loop;
- unsafe model/tool update.

## Regras de desenvolvimento seguro
- SAST/secret scanning/dependency scanning no CI;
- nenhuma chave no código;
- validação de schema;
- queries parametrizadas;
- outputs codificados;
- logs sem segredo;
- testes de autorização negativos;
- testes de isolamento entre tenants;
- revisão de dependências;
- SBOM;
- ambientes separados;
- backup e restore testados.

## Testes de segurança
O produto deve suportar diagnóstico e correção defensiva. Exploração ativa não ocorre automaticamente e depende de autorização explícita, ativo definido e escopo aprovado.
