# G|E Aliança Lima Transportes — Controle Operacional

PWA mobile-first criada a partir dos controles operacionais existentes da G|E Aliança Lima Transportes.

## Módulos
- Dashboard executivo
- Fretes e custo por km
- Pedágios e reembolsos
- Recebíveis por app/empresa
- Combustível, km/l e custo por km
- Fluxo de caixa
- Clientes
- Manutenção
- Parcelas da Strada
- Agenda
- Parâmetros da operação
- Backup/importação em JSON

## Parâmetros iniciais
- Custo operacional estimado: R$ 0,65/km
- Custos fixos mensais: R$ 2.660
- Meta mensal de faturamento: R$ 12.800
- Meta mensal de lucro: R$ 10.000
- Veículo: Fiat Strada 2014 Cabine Estendida

## Persistência
A versão 1 salva dados no `localStorage` do navegador para permitir uso imediato e offline.
Para uso simultâneo por mais de um aparelho, conectar a uma base online com autenticação (ex.: Supabase/Postgres) sem alterar a UX do frontend.

## Publicação
Conteúdo estático e pronto para Vercel, Netlify ou GitHub Pages.
