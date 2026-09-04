# G|E ONE Condo — Roadmap do MVP

## Objetivo do MVP
Colocar um condomínio piloto em operação com segurança, medindo o ciclo real de encomendas antes de acoplar hardware proprietário.

## Release Demo 0.1 — Comercial
Status: EM CONSTRUÇÃO
- Navegação por persona.
- Portaria: recebimento assistido simulado.
- BOX Anywhere.
- Síndico: gestão por exceção.
- Administradora: visão multi-condomínio.
- G|E Trust: cadeia de custódia demonstrativa.
- Discovery: indicadores de dimensionamento.

## Release MVP 0.2 — Operacional sem locker eletrônico
- Login e segregação por condomínio.
- Cadastro de condomínio, blocos, unidades, moradores e operadores.
- Perfis e permissões.
- Recebimento manual + foto/etiqueta.
- Identificação assistida e confirmação humana.
- Armazenamento em prateleira/sala/armário numerado.
- Notificação transacional.
- Retirada com PIN/QR conforme política.
- G|E Trust real.
- Central de exceções.
- Relatórios básicos.
- Exportação de dados.

## Release MVP 0.3 — Autopilot
- Lembretes configuráveis.
- SLA por encomenda.
- Escalonamento de pendências.
- Falha de notificação vira exceção.
- Alertas de ocupação e indisponibilidade.
- Painel de saúde operacional.

## Release 0.4 — Discovery & Capacity
- Classificação de tamanho.
- Curva de chegada/retirada.
- Ocupação por horário/dia.
- Recomendação de capacidade baseada em histórico.
- Simulação P/M/G/XG.

## Release 0.5 — Hardware Adapter
- API/camada desacoplada para lockers.
- Eventos de porta aberta/fechada.
- Estado online/offline.
- Bloqueio preventivo de compartimento.
- Driver por fabricante/protocolo.
- Modo de contingência quando hardware estiver offline.

## Gates obrigatórios antes do primeiro piloto pagante
- [ ] Tenant isolation testado.
- [ ] RBAC testado.
- [ ] MFA para perfis administrativos.
- [ ] TLS e criptografia aplicáveis.
- [ ] Backup e restauração testados.
- [ ] Auditoria de ações críticas.
- [ ] Política de retenção/LGPD definida.
- [ ] Exportação e portabilidade de dados.
- [ ] Monitoramento de erros e disponibilidade.
- [ ] Plano de contingência de retirada.
- [ ] Termos, privacidade e papéis LGPD revisados.
- [ ] Testes mobile/desktop e acessibilidade básica.

## Critérios de sucesso do piloto
- Tempo mediano de recebimento.
- % de identificações sem retrabalho.
- % de notificações entregues.
- Tempo médio até retirada.
- % de encomendas >24h.
- Incidentes por 1.000 encomendas.
- Ações manuais por encomenda.
- Satisfação de porteiro, síndico e morador.
- Disponibilidade do serviço.

## North Star inicial
**Percentual de encomendas concluídas sem intervenção excepcional.**

A meta deve ser calibrada com dados do piloto; não deve ser inventada para marketing antes da medição real.
