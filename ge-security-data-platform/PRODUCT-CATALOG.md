# G|E Security & Data Platform — Catálogo Técnico-Comercial

## G|E Agent Security
**Problema:** empresas adotam agentes sem conseguir reconstruir com segurança quem executou uma ação, ferramenta usada, dado acessado, credencial autorizadora e contenção aplicada.
**Oferta:** assessment de segurança, contenção e incident readiness para agentes.
**Entregáveis:** inventário/fluxos avaliados; cenários de abuso autorizados; matriz de controles; gaps; evidências; plano de remediação; relatório executivo/técnico.
**Prova de valor:** demonstrar, em ambiente autorizado, rastreabilidade de agente→ação→ferramenta→dado→credencial→controle→evidência.
**Modelo comercial:** assessment, piloto e expansão contínua.

## G|E Guardian
**Problema:** controles fragmentados e baixa capacidade de detectar/conter comportamento anômalo.
**Oferta:** camada defensiva para políticas, telemetria, detecção, resposta e contenção.
**Integrações-alvo:** IAM, SIEM/SOC, aplicações, APIs, Data Core e Agent Security.
**Modelo comercial:** implantação + assinatura/serviço gerenciado, após homologação das capacidades contratadas.

## G|E AUDIT
**Problema:** dificuldade de demonstrar controles, governança, evidências e conformidade de sistemas e IA.
**Oferta:** assurance e auditoria orientada a riscos, controles e evidências.
**Escopo:** segurança, privacidade/LGPD, governança, continuidade, SDLC, APIs, terceiros e IA; mapeamento normativo por aplicabilidade.
**Entregáveis:** matriz de controles, evidências, achados, riscos, plano de ação e trilha de auditoria.
**Modelo comercial:** assessment/auditoria recorrente e assurance contínuo.

## G|E Data Core
**Problema:** dados/evidências espalhados, dependência de sistemas externos e baixa rastreabilidade.
**Oferta:** fundação de dados e evidências para produtos G|E e integrações empresariais.
**Capacidades-alvo:** segregação lógica, políticas de acesso, trilhas, retenção, versionamento, integridade, APIs e observabilidade.
**Modelo comercial:** infraestrutura/plataforma modular; capacidade e SLA definidos por implantação.

## G|E Secure Agent Control
**Problema:** agentes recebem ferramentas e privilégios sem governança granular suficiente.
**Oferta:** policy enforcement para identidade do agente, autorização contextual, ferramentas permitidas, limites e aprovação humana quando aplicável.
**Entregáveis:** catálogo de agentes/ferramentas, políticas, trilhas de decisão e integrações.
**Modelo comercial:** módulo do Agent Security ou produto independente para ambientes multiagentes.

## G|E Credential Exposure
**Problema:** secrets, tokens, chaves e credenciais podem estar expostos ou possuir privilégios excessivos.
**Oferta:** assessment e gestão de exposição de credenciais, com descoberta autorizada, classificação, ownership, criticidade, rotação/remediação e evidências.
**Limites:** não armazenar segredo em claro em relatórios; testes somente em escopo autorizado.
**Modelo comercial:** assessment pontual + monitoramento contínuo integrado a Guardian/AUDIT.

# Diferenciação da família
O valor do portfólio não é apenas detectar uma vulnerabilidade, mas conectar **identidade + autorização + ação + dado + credencial + contenção + evidência + auditoria**.

# Requisitos para declarar “pronto para produção”
Cada produto deve possuir: versão; owner; arquitetura; threat model; controles; testes funcionais; testes de segurança; política de dados; LGPD aplicável; logging; backup/DR quando aplicável; SLA/SLO; suporte; runbook; critérios de aceite; evidências de homologação; documentação de implantação e contrato/escopo comercial.