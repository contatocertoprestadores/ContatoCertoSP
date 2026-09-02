
-- BANCO DE DADOS CONTATO CERTO SP - SUPABASE REALTIME
create table usuarios (
  id uuid primary key default gen_random_uuid(),
  tipo text check (tipo in ('CLIENTE','MONTADOR','ADMIN')),
  nome text, email text unique, senha text, telefone text,
  cidade text, cidade_atende text, chave_pix text, foto_perfil text,
  status text default 'ATIVO',
  status_disponivel boolean default true,
  created_at timestamp default now()
);
create table pedidos (
  id uuid primary key default gen_random_uuid(),
  numero bigint, cliente_id uuid references usuarios(id), montador_id uuid references usuarios(id),
  categoria text, movel_nome text, servico_tipo text,
  valor_bruto numeric, comissao numeric, valor_liquido numeric,
  cidade text, bairro text, rua text, numero_end text, data_servico text, horario text,
  status text, fotos text[], created_at timestamp default now()
);
create table cupons (
  id uuid primary key default gen_random_uuid(),
  codigo text unique, desconto numeric, tipo text, validade date, limite int, usos int default 0
);
-- habilitar realtime
alter publication supabase_realtime add table pedidos, usuarios, cupons;
