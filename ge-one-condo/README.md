# G|E ONE Condo

**Seu condomínio. Uma operação inteligente.**

Projeto de plataforma modular para condomínios, iniciando pelo **G|E BOX**, solução de gestão inteligente de encomendas que conecta portaria, moradores, síndicos e administradoras.

## Visão
Não ser apenas um smart locker. O G|E ONE administra a jornada completa da encomenda — recebimento, identificação, armazenamento, comunicação, retirada, exceções e auditoria — inclusive volumes fora do locker.

## Proposta de valor
- Menos trabalho e menos erro para a portaria.
- Mais conveniência e transparência para o morador.
- Gestão por exceção e indicadores para o síndico.
- Visão multi-condomínio para administradoras.
- Segurança, segregação de dados e auditoria desde a arquitetura.

## Primeiro produto: G|E BOX
Principais capacidades planejadas:
1. Recebimento rápido assistido por câmera/OCR.
2. Identificação de unidade/morador com confirmação humana em ambiguidades.
3. Sugestão de compartimento conforme tamanho/disponibilidade.
4. BOX Anywhere para volumes fora do locker.
5. Notificação por WhatsApp e canais configuráveis, sem app obrigatório.
6. Retirada por QR/PIN/credencial conforme implantação.
7. G|E Trust: cadeia de custódia digital e trilha de auditoria.
8. Central de Exceções para portaria/síndico.
9. Autopilot: lembretes, alertas operacionais e escalonamentos configuráveis.
10. Discovery: diagnóstico da operação antes de dimensionar hardware.
11. Capacity AI: previsão de ocupação e recomendação de capacidade quando houver dados suficientes.
12. ONE Admin: visão multi-condomínio para administradoras.
13. Return: fluxo de logística reversa no roadmap.
14. APIs e camada de integração com lockers e sistemas existentes.

## Princípios de produto
- UX por persona: Porteiro, Morador, Síndico, Administradora e Suporte.
- Poucas ações por tela; operação por exceção.
- Mobile-first para moradores; operação rápida para portaria.
- IA assistiva, explicável e com confirmação humana em decisões sensíveis.
- Multi-tenant, RBAC, MFA administrativo, criptografia, auditoria, backups e LGPD by design.
- Hardware desacoplado: software deve poder operar com locker próprio, compatível ou estrutura física convencional.
- Arquitetura modular para evolução do G|E ONE.

## Módulos futuros
BOX, ACCESS, CARE, BOOK, TALK, DOCS, SUPPLIERS, ASSEMBLY, ANALYTICS e AI.

## Estrutura deste repositório
- `docs/PRODUCT.md` — visão funcional e diferenciais.
- `docs/SALES.md` — playbook comercial e demonstração.
- `docs/TRAINING.md` — treinamento por persona.
- `docs/MARKETING.md` — posicionamento, campanhas e mensagens.
- `docs/SECURITY-ARCHITECTURE.md` — requisitos de arquitetura e segurança.

## Regra de homologação
Nenhuma capacidade deve ser anunciada como implementada antes de estar desenvolvida, testada e homologada. Funcionalidades deste repositório representam produto-alvo/roadmap até que o status técnico indique produção.
