INSERT INTO regulatory_sources (source_code,name,authority,jurisdiction,official_url,status,last_verified_at)
VALUES
('RFB_RTC','Reforma Tributária do Consumo — Receita Federal','Receita Federal do Brasil','federal','https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/reforma-tributaria-do-consumo','active',now()),
('CGIBS','Comitê Gestor do IBS','CGIBS','nacional','https://cgibs.gov.br/','active',now()),
('NFS_E_NACIONAL','NFS-e Padrão Nacional','Receita Federal / CGSN','nacional','https://www.gov.br/nfse/','active',now()),
('SISCOMEX_DUIMP','Portal Único Siscomex — Duimp','Receita Federal do Brasil','federal','https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/manuais/despacho-de-importacao/sistemas/duimp/rtc','active',now())
ON CONFLICT (source_code) DO UPDATE SET last_verified_at=now(),official_url=EXCLUDED.official_url,status='active';

INSERT INTO regulatory_events (source_id,external_ref,title,summary,source_url,published_at,effective_from,urgency,status,affected_domains,official_payload,created_by_agent_id)
SELECT s.id,'RFB-CBS-API-2026-09-14','Novas APIs de apuração da CBS','Documentação técnica prevê consultas incrementais e disponibilização gradual de serviços de consulta de débitos/créditos, pagamentos/recolhimentos e emissão relacionada de DARF.','https://www.gov.br/receitafederal/pt-br/assuntos/noticias/2026/setembro/receita-federal-publica-nova-documentacao-tecnica-das-apis-de-apuracao-de-cbs/','2026-09-14T09:39:00-03:00','2026-10-01','preparar_adequacao','verified','["CBS","API","apuração","DARF","integração"]'::jsonb,'{"baseline":"2026-09-24","source_type":"official"}'::jsonb,a.id
FROM regulatory_sources s JOIN agent_identities a ON a.agent_key='legal-watch' WHERE s.source_code='RFB_RTC'
ON CONFLICT (source_id,external_ref) DO NOTHING;

INSERT INTO regulatory_events (source_id,external_ref,title,summary,source_url,published_at,effective_from,urgency,status,affected_domains,official_payload,created_by_agent_id)
SELECT s.id,'CGSN-191-2026-NFSE','NFS-e Nacional obrigatória para ME e EPP','ME e EPP optantes pelo Simples Nacional que prestem serviços sujeitos à NFS-e devem utilizar o Emissor Nacional a partir de 1º de novembro de 2026.','https://www.gov.br/receitafederal/pt-br/assuntos/noticias/2026/agosto/simples-nacional-nfs-e-nacional-sera-obrigatoria-para-me-e-epp-a-partir-de-1o-de-novembro-de-2026','2026-08-14T18:24:00-03:00','2026-11-01','preparar_adequacao','verified','["NFS-e","Simples Nacional","ME","EPP","API"]'::jsonb,'{"resolution":"CGSN 191/2026","source_type":"official"}'::jsonb,a.id
FROM regulatory_sources s JOIN agent_identities a ON a.agent_key='legal-watch' WHERE s.source_code='NFS_E_NACIONAL'
ON CONFLICT (source_id,external_ref) DO NOTHING;

INSERT INTO regulatory_events (source_id,external_ref,title,summary,source_url,published_at,effective_from,urgency,status,affected_domains,official_payload,created_by_agent_id)
SELECT s.id,'RFB-CGIBS-SPLIT-PAYMENT-2026','Plataforma Pública do Split Payment','RFB e CGIBS disponibilizaram documentação técnica, Manual de Integração e especificação OpenAPI/Swagger para a Plataforma Pública do Split Payment.','https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/reforma-tributaria-do-consumo/legislacao/atos-conjuntos/','2026-05-27T00:00:00-03:00',NULL,'monitorar','verified','["Split Payment","IBS","CBS","pagamentos","OpenAPI"]'::jsonb,'{"ato_conjunto":"RFB/CGIBS 2/2026","ato_tecnico":"RFB/CGIBS 4/2026","source_type":"official"}'::jsonb,a.id
FROM regulatory_sources s JOIN agent_identities a ON a.agent_key='legal-watch' WHERE s.source_code='CGIBS'
ON CONFLICT (source_id,external_ref) DO NOTHING;

INSERT INTO regulatory_events (source_id,external_ref,title,summary,source_url,published_at,effective_from,urgency,status,affected_domains,official_payload,created_by_agent_id)
SELECT s.id,'DUIMP-RTC-2026-09-27','Campos de IBS/CBS na Duimp em produção','Alterações da Reforma Tributária do Consumo na Duimp, incluindo novos campos e tributação de CBS/IBS por item, têm disponibilização em produção prevista para 27 de setembro de 2026.','https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/manuais/despacho-de-importacao/sistemas/duimp/rtc','2026-08-19T16:05:00-03:00','2026-09-27','prazo_iminente','verified','["Duimp","importação","CBS","IBS","Siscomex"]'::jsonb,'{"source_type":"official"}'::jsonb,a.id
FROM regulatory_sources s JOIN agent_identities a ON a.agent_key='legal-watch' WHERE s.source_code='SISCOMEX_DUIMP'
ON CONFLICT (source_id,external_ref) DO NOTHING;

INSERT INTO regulatory_events (source_id,external_ref,title,summary,source_url,published_at,effective_from,urgency,status,affected_domains,official_payload,created_by_agent_id)
SELECT s.id,'SIMPLES-OPCAO-2026-09','Janela de opção do Simples e recolhimento IBS/CBS para 2027','Empresas abrangidas devem observar a janela de setembro de 2026 para opção pelo Simples Nacional e/ou escolha da forma de recolhimento de IBS e CBS para 2027 conforme sua situação.','https://www.gov.br/receitafederal/pt-br/assuntos/noticias/2026/setembro/receita-federal-alerta-comeca-hoje-o-prazo-para-opcao-pelo-simples-nacional-e-para-a-escolha-do-modelo-de-recolhimento-do-ibs-e-da-cbs-em-2027/','2026-09-01T10:18:00-03:00','2026-09-30','prazo_iminente','verified','["Simples Nacional","IBS","CBS","opção tributária"]'::jsonb,'{"deadline":"2026-09-30","source_type":"official"}'::jsonb,a.id
FROM regulatory_sources s JOIN agent_identities a ON a.agent_key='legal-watch' WHERE s.source_code='RFB_RTC'
ON CONFLICT (source_id,external_ref) DO NOTHING;