
-- =========================================
-- CONTATO CERTO SP - UBER BLACK PREMIUM
-- BANCO DE DADOS COMPLETO SUPABASE REALTIME
-- =========================================

-- 1. USUÁRIOS (clientes, montadores, admin)
create table public.usuarios (
  id uuid primary key default gen_random_uuid(),
  tipo text not null check (tipo in ('CLIENTE','MONTADOR','ADMIN')),
  nome text not null,
  email text unique not null,
  senha text not null,
  telefone text,
  cidade text, -- onde mora
  cidade_atende text, -- só montador - obrigatório
  chave_pix text, -- só montador - no próprio nome - obrigatório
  foto_perfil text, -- base64 ou url - obrigatório montador
  status text default 'ATIVO' check (status in ('ATIVO','BLOQUEADO','PENDENTE')),
  status_disponivel boolean default true, -- botão Disponível/Offline montador
  created_at timestamp with time zone default now()
);

-- 2. PEDIDOS
create table public.pedidos (
  id uuid primary key default gen_random_uuid(),
  numero bigint not null,
  cliente_id uuid references public.usuarios(id) on delete cascade,
  montador_id uuid references public.usuarios(id),
  cliente_nome text,
  montador_nome text,
  categoria text,
  movel_nome text,
  servico_tipo text check (servico_tipo in ('novo','usado','desmontar')),
  servico_label text,
  valor_bruto numeric not null,
  valor_txt text,
  comissao numeric, -- 10% plataforma
  valor_liquido numeric, -- 90% montador
  cidade text not null,
  bairro text,
  rua text,
  numero_end text,
  data_servico text,
  horario text,
  status text not null check (status in ('AGUARDANDO_PAGAMENTO','COMPROVANTE_ENVIADO','PROCURANDO_MONTADOR','ACEITO','FINALIZADO','RECUSADO')),
  fotos text[], -- até 3 fotos do móvel base modelo
  comprovante text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 3. CUPONS (gerados pelo admin)
create table public.cupons (
  id uuid primary key default gen_random_uuid(),
  codigo text unique not null,
  desconto numeric not null,
  tipo text not null check (tipo in ('%','R$')),
  validade date,
  limite int default 100,
  usos int default 0,
  created_at timestamp with time zone default now()
);

-- 4. FINANCEIRO (log de repasses)
create table public.financeiro (
  id uuid primary key default gen_random_uuid(),
  pedido_id uuid references public.pedidos(id),
  montador_id uuid references public.usuarios(id),
  valor_bruto numeric,
  comissao numeric,
  valor_liquido numeric,
  status_repasse text default 'PENDENTE' check (status_repasse in ('PENDENTE','PAGO')),
  mes_ref text, -- YYYY-MM
  created_at timestamp default now()
);

-- 5. NOTIFICAÇÕES (para som em todos painéis)
create table public.notificacoes (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid references public.usuarios(id),
  tipo text check (tipo in ('NOVO_PEDIDO','PEDIDO_ACEITO','PAGAMENTO_CONFIRMADO')),
  pedido_id uuid references public.pedidos(id),
  lida boolean default false,
  created_at timestamp default now()
);

-- HABILITAR REALTIME
alter publication supabase_realtime add table public.pedidos, public.usuarios, public.cupons, public.financeiro, public.notificacoes;

-- POLÍTICAS RLS (abertas para demo - em produção restrinja)
alter table public.usuarios enable row level security;
alter table public.pedidos enable row level security;
alter table public.cupons enable row level security;
alter table public.financeiro enable row level security;
alter table public.notificacoes enable row level security;

create policy "allow all" on public.usuarios for all using (true) with check (true);
create policy "allow all" on public.pedidos for all using (true) with check (true);
create policy "allow all" on public.cupons for all using (true) with check (true);
create policy "allow all" on public.financeiro for all using (true) with check (true);
create policy "allow all" on public.notificacoes for all using (true) with check (true);

-- ÍNDICES
create index idx_pedidos_cidade on public.pedidos(cidade);
create index idx_pedidos_status on public.pedidos(status);
create index idx_pedidos_cliente on public.pedidos(cliente_id);
create index idx_pedidos_montador on public.pedidos(montador_id);
create index idx_usuarios_tipo on public.usuarios(tipo);
create index idx_usuarios_cidade_atende on public.usuarios(cidade_atende);

-- ADMIN SEED
insert into public.usuarios (tipo, nome, email, senha, cidade, status) values
('ADMIN','Andre','andre@contatocertosp.com.br','Contato@2026SP','São Paulo','ATIVO'),
('ADMIN','Andre Sousa','AndreSousa84','Contato@2026SP','São Paulo','ATIVO');
