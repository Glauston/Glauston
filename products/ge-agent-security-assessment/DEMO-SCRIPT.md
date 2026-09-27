# G|E Agent Security — Roteiro de Demonstração Enterprise

## Objetivo
Demonstrar, em ambiente autorizado e controlado, como uma organização pode ganhar visibilidade e capacidade de investigação sobre ações executadas por agentes de IA. Nunca executar demonstrações destrutivas ou testes fora do escopo autorizado.

## Duração sugerida: 30–45 minutos

### Abertura — 3 min
Apresentar o problema: um agente corporativo recebeu uma tarefa legítima, utiliza ferramentas e acessa dados. A pergunta não é apenas se a IA respondeu corretamente, mas se a organização consegue provar como a ação ocorreu e interrompê-la quando necessário.

### Cena 1 — Discover — 5 min
Mostrar inventário de agentes, ferramentas, MCPs/APIs, sistemas, identidades, credenciais e fontes/destinos de dados do ambiente de demonstração.

Pergunta ao cliente: **Você sabe quantos agentes têm capacidade de agir sobre seus sistemas hoje?**

### Cena 2 — Credential Exposure — 5 min
Demonstrar, com credenciais sintéticas, como o assessment identifica credenciais persistentes, permissões excessivas e relações agente-identidade-ferramenta que precisam de revisão.

Pergunta: **Qual credencial efetivamente autorizou esta ação?**

### Cena 3 — Runtime Authorization — 5 min
O agente solicita uma ação permitida e outra fora da política. Mostrar decisão de autorização e registro da política aplicada.

Pergunta: **A autorização acontece apenas no login ou também no momento da ação?**

### Cena 4 — Data Egress — 5 min
Usar dados fictícios para demonstrar rastreabilidade de acesso e tentativa de envio para destino não permitido. O cenário deve ser seguro, sem exfiltração real.

Pergunta: **Qual dado saiu, para onde e por quê?**

### Cena 5 — Containment — 5 min
Simular comportamento fora da política e demonstrar interrupção/revogação em ambiente de laboratório.

Perguntas: **Quem interrompeu? Quanto tempo levou? A ação foi reversível?**

### Cena 6 — Incident Reconstruction — 5 min
Reconstruir a cadeia: usuário/serviço → agente → identidade → credencial → MCP/API → ferramenta → dado → ação → destino → política → resposta.

Pergunta: **Conseguimos reproduzir e explicar o incidente sem depender da memória das pessoas?**

### Cena 7 — Audit Evidence — 5 min
Mostrar pacote de evidências e relatório executivo/técnico de exemplo: inventário, achados, timestamps, decisões de autorização, eventos de containment e recomendações.

Pergunta: **Essa evidência seria suficiente para Segurança, Auditoria, Risco e Compliance trabalharem juntos?**

## Fechamento comercial
Apresentar jornada em três etapas:
1. Assessment pago.
2. Piloto controlado.
3. Proteção contínua com componentes G|E aplicáveis.

## Regras da demonstração
- ambiente isolado e autorizado;
- dados e credenciais sintéticos;
- nenhuma exploração destrutiva;
- nenhuma alegação de cobertura que não tenha sido tecnicamente comprovada;
- registrar limitações conhecidas;
- preservar evidências da própria demonstração;
- separar claramente funcionalidades disponíveis, piloto e roadmap.
