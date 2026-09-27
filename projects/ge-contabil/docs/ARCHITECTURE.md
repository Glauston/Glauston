# Arquitetura — G|E CONTÁBIL

## Princípios
1. Multi-tenant desde a primeira tabela; toda consulta operacional deve ser filtrada por `tenant_id`.
2. Menor privilégio e segregação de funções.
3. Nenhuma transmissão fiscal crítica é silenciosa: preparar -> validar -> aprovar -> transmitir -> registrar protocolo.
4. Regras tributárias são versionadas por vigência e base legal; nunca sobrescrever histórico.
5. Agentes não podem autoaprovar o próprio trabalho.
6. Documentos e eventos importantes geram trilha de auditoria imutável no plano lógico.
7. Integrações oficiais são adaptadores isolados, com ambiente de homologação e idempotência.

## Domínios
- Identidade e Acesso
- Clientes e Carteiras
- Fiscal
- Contábil
- Obrigações e Calendário
- Documentos e Cobranças
- Motor Tributário
- Agentes e Auditoria de IA
- Integrações Governamentais
- Comunicação
- Relatórios/BI
- Auditoria e Compliance

## Agentes
- Charly Operacional: priorização e rotina.
- Charly Fiscal: validação de apuração e obrigações.
- Charly Contábil: conciliação/fechamento.
- Charly Atendimento: cobrança e retorno ao cliente.
- Charly Auditor: segunda checagem independente.
- Charly Legal: alterações normativas e vigência.
- Charly Gestor: SLA, gargalos, produtividade e risco.

## Segurança mínima para produção
- OIDC/SAML ou provedor de identidade corporativa.
- 2FA obrigatório para perfis privilegiados; recomendado para todos.
- Criptografia em trânsito e em repouso.
- Segredos em cofre (não em `.env` de produção).
- Certificados digitais protegidos por KMS/HSM ou solução equivalente.
- Row-level security ou camada de autorização equivalente no banco/API.
- Logs imutáveis com retenção e correlação.
- Backup automatizado e teste recorrente de restauração.
- Política LGPD: finalidade, retenção, descarte, exportação e incidente.

## Integrações oficiais
Cada integração deve implementar: `validate_payload`, `sign`, `submit`, `query_status`, `download_receipt`, `reconcile`.

### EFD-Reinf
Conector WebService com certificado e homologação antes de produção.

### eSocial
Conector conforme leiaute/XSD vigente e ambiente de Produção Restrita.

### DCTFWeb / MIT
Gerador/validador do JSON no leiaute vigente e fluxo de importação/integração permitido pela Receita.

## Dados de alto volume
Para escritório com muitos clientes: índices por tenant/client/competência/status/vencimento; jobs assíncronos; fila; object storage para XML/PDF; busca por metadados; cache somente para leitura não sensível; particionamento de auditoria quando volume justificar.
