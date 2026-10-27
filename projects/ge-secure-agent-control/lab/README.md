# G|E Hacker — Juice Shop Exposure Lab
**Ambiente de teste isolado e explicitamente autorizado.** Este script executa apenas duas requisições GET no Juice Shop local, porta 3000, sem varredura genérica, autenticação forçada, mudança de dados ou tráfego a hosts públicos.

## Prerrequisitos
- Codespace do repositório `Glauston/Glauston` aberto no navegador.
- Docker com o Juice Shop iniciado: `docker ps` mostra `ge-juice-lab`.
- Porta 3000 com visibilidade **Private**.
- Node.js 22+ disponível (`node --version`).

## Executar sem mudar a branch main
No Terminal do Codespaces (não no chat do Copilot), execute:

```bash
git fetch origin design/ge-secure-fortress-v3-20261020
git show FETCH_HEAD:projects/ge-secure-agent-control/lab/juice-shop-exposure.mjs > /tmp/ge-juice-shop-exposure.mjs
node /tmp/ge-juice-shop-exposure.mjs
```

Saída esperada se o Juice Shop tiver a exposição de treino ativa:
- `LAB-002A: HTTP 200 | marcador encontrado | ACHADO CONFIRMADO`
- `LAB-002B: HTTP 200 | marcador encontrado | ACHADO CONFIRMADO`
- `Total de achados confirmados: 2/2`.

Resultados diferentes exigem investigação, não devem ser interpretados automaticamente como sucesso ou falha de segurança.

## Evidência do AUDIT
O script grava **somente no próprio Codespace** o arquivo `/tmp/ge-juice-shop-audit.json`.
Para visualizar:

```bash
cat /tmp/ge-juice-shop-audit.json
```

O arquivo contém status HTTP, timestamp, checks, marcadores e SHA-256 da resposta. **Não guarda o documento acessado**, credenciais ou dados reais. Os conteúdos servidos pelo Juice Shop são propositalmente sintéticos. Preserve a URL do Codespace/conta ao compartilhar evidências e não suba relatórios locais sensíveis para repositórios públicos.

## Limites e auditoria
- O teste automatiza a reprodução de uma falha conhecida, **não descobre falhas arbitrárias**.
- HTTP 200 sozinho não prova acesso indevido; a indicação de confidencialidade no corpo e a ausência de autenticação devem ser avaliadas em conjunto.
- Recomendação do Guardian para aplicativos de produção: bloquear listagem pública e servir documentos confidenciais apenas fora do webroot e mediante autenticação/autorização.
- O G|E AUDIT deve marcar como **exposição intencional reproduzida em laboratório**; nenhuma correção foi aplicada ao Juice Shop, que foi criado para permanecer vulnerável.
- Os testes unitários do probe rodam em CI por `npm test`, sem acessar o Codespace do usuário.

Evidência de CI do código do probe: https://github.com/Glauston/Glauston/actions/runs/40575222415
