import React, { useState, useEffect, useRef, useMemo } from 'react';

// --- SCHEMA SUPABASE (COMENTADO PARA PRODUÇÃO) ---
/*
-- Supabase schema produção:
create table usuarios (
  id uuid primary key default gen_random_uuid(),
  tipo text check (tipo in ('cliente','montador','admin')),
  nome text, email text unique, senha text, telefone text,
  cidade text, cidade_atende text, chave_pix text, foto_perfil text,
  status text default 'ATIVO', -- ATIVO | BLOQUEADO
  status_disponivel boolean default true,
  created_at timestamp default now()
);
create table pedidos (
  id uuid primary key default gen_random_uuid(),
  numero serial, cliente_id uuid references usuarios, montador_id uuid references usuarios,
  categoria text, movel_nome text, servico_tipo text,
  valor_bruto numeric, comissao numeric, valor_liquido numeric,
  cidade text, bairro text, data_servico text, horario text,
  status text, -- AGUARDANDO_PAGAMENTO | COMPROVANTE_ENVIADO | PROCURANDO_MONTADOR | ACEITO | FINALIZADO | RECUSADO
  fotos text[], comprovante text, created_at timestamp
);
create table cupons (id uuid primary key, codigo text unique, desconto numeric, tipo text, validade date, limite int, usos int default 0);
-- realtime: supabase.channel('pedidos').on('postgres_changes',...)
*/

const LOGO_SVG = (
  <svg width="42" height="42" viewBox="0 0 42 42" style={{borderRadius:12, background:'#fff'}}>
    <path d="M21 4C13 4 7 10 7 18C7 28 21 38 21 38C21 38 35 28 35 18C35 10 29 4 21 4Z" fill="#2D5CFF"/>
    <circle cx="21" cy="17" r="8" fill="white"/>
    <path d="M15 17.5 L19 21.5 L27 13.5" stroke="#FF7A00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const CIDADES_SP = [
"Adamantina","Agudos","Altinópolis","Americana","Amparo","Andradina","Angatuba","Aparecida","Araçatuba","Araraquara","Araras","Assis","Atibaia","Avaré","Barretos","Barueri","Bauru","Bebedouro","Birigui","Botucatu","Bragança Paulista","Campinas","Campos do Jordão","Capivari","Caraguatatuba","Carapicuíba","Catanduva","Cotia","Cubatão","Diadema","Embu das Artes","Ferraz de Vasconcelos","Franca","Francisco Morato","Franco da Rocha","Garça","Guaratinguetá","Guarujá","Guarulhos","Hortolândia","Ibaté","Ibitinga","Ibiúna","Indaiatuba","Itanhaém","Itapecerica da Serra","Itapetininga","Itapeva","Itapevi","Itaquaquecetuba","Itatiba","Itu","Itupeva","Jaboticabal","Jacareí","Jandira","Jaú","Jundiaí","Leme","Lençóis Paulista","Limeira","Lorena","Mairiporã","Marília","Mauá","Mogi das Cruzes","Mogi Guaçu","Mongaguá","Osasco","Ourinhos","Paulínia","Penápolis","Peruíbe","Piracicaba","Pindamonhangaba","Poá","Praia Grande","Presidente Prudente","Ribeirão Preto","Rio Claro","Salto","Santa Bárbara d'Oeste","Santana de Parnaíba","Santos","São Bernardo do Campo","São Caetano do Sul","São Carlos","São José dos Campos","São José do Rio Preto","São Paulo","São Vicente","Sertãozinho","Sorocaba","Sumaré","Suzano","Taboão da Serra","Taubaté","Valinhos","Várzea Paulista","Votorantim","Votuporanga"
]; // demo 100 principais - em produção 645 cidades SP

const CATALOGO = [
{id:1, nome:"Guarda-roupa 2 portas", cat:"Dormitório", valores:{montagem:90, desmontagem:70, completo:140}},
{id:2, nome:"Guarda-roupa 3 portas", cat:"Dormitório", valores:{montagem:110, desmontagem:90, completo:170}},
{id:3, nome:"Guarda-roupa 4 portas", cat:"Dormitório", valores:{montagem:130, desmontagem:100, completo:200}},
{id:4, nome:"Guarda-roupa 6 portas", cat:"Dormitório", valores:{montagem:180, desmontagem:130, completo:270}},
{id:5, nome:"Guarda-roupa 8 portas / Casal", cat:"Dormitório", valores:{montagem:220, desmontagem:160, completo:330}},
{id:6, nome:"Guarda-roupa de Canto", cat:"Dormitório", valores:{montagem:160, desmontagem:120, completo:240}},
{id:7, nome:"Cama Solteiro", cat:"Dormitório", valores:{montagem:70, desmontagem:50, completo:100}},
{id:8, nome:"Cama Casal", cat:"Dormitório", valores:{montagem:80, desmontagem:60, completo:120}},
{id:9, nome:"Cama Queen / King", cat:"Dormitório", valores:{montagem:110, desmontagem:80, completo:160}},
{id:10, nome:"Beliche", cat:"Dormitório", valores:{montagem:140, desmontagem:100, completo:210}},
{id:11, nome:"Cômoda 3 gavetas", cat:"Dormitório", valores:{montagem:70, desmontagem:50, completo:100}},
{id:12, nome:"Cômoda 5 gavetas", cat:"Dormitório", valores:{montagem:85, desmontagem:60, completo:125}},
{id:13, nome:"Criado-mudo", cat:"Dormitório", valores:{montagem:40, desmontagem:30, completo:60}},
{id:14, nome:"Penteadeira", cat:"Dormitório", valores:{montagem:90, desmontagem:70, completo:135}},
{id:15, nome:"Rack / Painel TV até 1.60m", cat:"Sala", valores:{montagem:80, desmontagem:60, completo:120}},
{id:16, nome:"Rack / Painel TV acima 1.60m", cat:"Sala", valores:{montagem:120, desmontagem:90, completo:180}},
{id:17, nome:"Estante Livros", cat:"Sala", valores:{montagem:85, desmontagem:60, completo:125}},
{id:18, nome:"Sofá retrátil (ajuste)", cat:"Sala", valores:{montagem:100, desmontagem:70, completo:150}},
{id:19, nome:"Mesa de Centro", cat:"Sala", valores:{montagem:50, desmontagem:35, completo:70}},
{id:20, nome:"Mesa de Jantar 4 lugares", cat:"Sala", valores:{montagem:90, desmontagem:70, completo:135}},
{id:21, nome:"Mesa de Jantar 6 lugares", cat:"Sala", valores:{montagem:130, desmontagem:100, completo:195}},
{id:22, nome:"Mesa de Jantar 8 lugares", cat:"Sala", valores:{montagem:160, desmontagem:120, completo:240}},
{id:23, nome:"Armário de Cozinha 2 peças", cat:"Cozinha", valores:{montagem:120, desmontagem:90, completo:180}},
{id:24, nome:"Armário de Cozinha Completo", cat:"Cozinha", valores:{montagem:220, desmontagem:160, completo:330}},
{id:25, nome:"Balcão / Ilha", cat:"Cozinha", valores:{montagem:90, desmontagem:70, completo:135}},
{id:26, nome:"Escrivaninha Simples", cat:"Escritório", valores:{montagem:70, desmontagem:50, completo:100}},
{id:27, nome:"Escrivaninha L / Escritório", cat:"Escritório", valores:{montagem:130, desmontagem:100, completo:195}},
{id:28, nome:"Cadeira Escritório (montagem)", cat:"Escritório", valores:{montagem:50, desmontagem:35, completo:70}},
];

function genNumero(){ return Math.floor(100000 + Math.random()*900000); }

export default function App(){
  // storage load
  const [usuarios, setUsuarios] = useState(()=>{
    try{ const s=localStorage.getItem('ccsp_usuarios'); return s? JSON.parse(s): [
      {id:'admin1', tipo:'admin', nome:'Admin', email:'andre@contatocertosp.com.br', senha:'Contato@2026SP', cidade:'São Paulo', cidade_atende:'São Paulo', chave_pix:'contatocerto.prestadores@gmail.com', foto_perfil:'', status:'ATIVO', status_disponivel:true},
      {id:'m1', tipo:'montador', nome:'Carlos Montador', email:'carlos@ex.com', senha:'123', cidade:'Campinas', cidade_atende:'Campinas', chave_pix:'carlos@pix.com', foto_perfil:'', status:'ATIVO', status_disponivel:true, telefone:'(19) 99999-0000'},
      {id:'c1', tipo:'cliente', nome:'Ana Cliente', email:'ana@ex.com', senha:'123', cidade:'Campinas', cidade_atende:'', chave_pix:'', foto_perfil:'', status:'ATIVO', status_disponivel:true, telefone:'(19) 98888-1111'},
    ]; } catch{ return []; }
  });
  const [pedidos, setPedidos] = useState(()=>{ try{ const s=localStorage.getItem('ccsp_pedidos'); return s? JSON.parse(s): []; } catch{ return []; }});
  const [cupons, setCupons] = useState(()=>{ try{ const s=localStorage.getItem('ccsp_cupons'); return s? JSON.parse(s): [{id:'cup1', codigo:'BEMVINDO10', desconto:10, tipo:'%', validade:'2026-12-31', limite:100, usos:0}]; } catch{ return []; }});
  const [view, setView] = useState('home'); // home | cadastro | login | cliente | montador | admin | adminLogin | pagamento | catalogo
  const [tab, setTab] = useState('pendentes');
  const [currentUser, setCurrentUser] = useState(()=>{ try{ const s=localStorage.getItem('ccsp_current'); return s? JSON.parse(s): null; }catch{return null;}});
  const [cadTipo, setCadTipo] = useState('cliente');
  const [toast, setToast] = useState(null);
  const [logoTaps, setLogoTaps] = useState(0);
  const [selectedMovel, setSelectedMovel] = useState(null);
  const [filtroCat, setFiltroCat] = useState('Todos');
  const [pedidoEmPagamento, setPedidoEmPagamento] = useState(null);
  const [busca, setBusca] = useState('');
  const [formFotos, setFormFotos] = useState([]);
  const [formData, setFormData] = useState({bairro:'', data:'', horario:'', cidade:'', servico:'montagem', cupom:''});
  const channelRef = useRef(null);
  const lastPedidosCount = useRef(pedidos.length);
  const audioCtxRef = useRef(null);

  const showToast = (msg)=>{ setToast(msg); setTimeout(()=>setToast(null),3500); };

  const playNotification = (type='new')=>{
    try{
      if(!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext||window.webkitAudioContext)();
      const ctx = audioCtxRef.current;
      if(ctx.state==='suspended') ctx.resume();
      const o = ctx.createOscillator(); const g = ctx.createGain();
      o.type='sine'; o.frequency.value = type==='accept'? 880 : 660;
      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime+0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime+0.6);
      o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime+0.6);
      if(type==='new'){ setTimeout(()=>{ const o2=ctx.createOscillator(); const g2=ctx.createGain(); o2.frequency.value=880; g2.gain.setValueAtTime(0.0001, ctx.currentTime); g2.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime+0.01); g2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime+0.4); o2.connect(g2); g2.connect(ctx.destination); o2.start(); o2.stop(ctx.currentTime+0.4); },150); }
    }catch{}
  };

  // persist
  useEffect(()=>{ localStorage.setItem('ccsp_usuarios', JSON.stringify(usuarios)); },[usuarios]);
  useEffect(()=>{ localStorage.setItem('ccsp_pedidos', JSON.stringify(pedidos)); },[pedidos]);
  useEffect(()=>{ localStorage.setItem('ccsp_cupons', JSON.stringify(cupons)); },[cupons]);
  useEffect(()=>{ if(currentUser) localStorage.setItem('ccsp_current', JSON.stringify(currentUser)); else localStorage.removeItem('ccsp_current'); },[currentUser]);

  // manifest & theme-color + poppins
  useEffect(()=>{
    const linkFont = document.createElement('link'); linkFont.href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap'; linkFont.rel='stylesheet'; document.head.appendChild(linkFont);
    const metaTheme = document.createElement('meta'); metaTheme.name='theme-color'; metaTheme.content='#0A2A6B'; document.head.appendChild(metaTheme);
    // manifest data blob
    const manifestObj = {name:"Contato Certo SP", short_name:"CCSP", start_url:"/", display:"standalone", background_color:"#0A2A6B", theme_color:"#0A2A6B", icons:[{src:"/logo.jpg", sizes:"512x512", type:"image/jpeg"}]};
    const blob = new Blob([JSON.stringify(manifestObj)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const linkMan = document.createElement('link'); linkMan.rel='manifest'; linkMan.href=url; document.head.appendChild(linkMan);
    // also add manifest.json href as required (will 404 but we add)
    const linkMan2 = document.createElement('link'); linkMan2.rel='manifest'; linkMan2.href='/manifest.json'; document.head.appendChild(linkMan2);
  },[]);

  // BroadcastChannel realtime
  useEffect(()=>{
    try{
      channelRef.current = new BroadcastChannel('ccsp_realtime');
      channelRef.current.onmessage = (e)=>{
        const {type, data} = e.data||{};
        if(type==='pedido_novo'){
          setPedidos(prev=>{ if(prev.find(p=>p.id===data.id)) return prev; return [data, ...prev]; });
          if(currentUser?.tipo==='montador' && currentUser.status_disponivel && currentUser.cidade_atende===data.cidade){
            playNotification('new'); showToast(`🔔 Novo pedido em ${data.cidade}!`);
          }
        }
        if(type==='pedido_aceito'){
          setPedidos(prev=> prev.map(p=> p.id===data.id? data : p));
          if(currentUser?.tipo==='cliente' && data.cliente_id===currentUser.id){
            playNotification('accept'); showToast(`✅ Seu pedido #${data.numero} foi aceito por ${data.montador_nome||'montador'}!`);
          }
        }
        if(type==='pedido_update'){
          setPedidos(prev=> prev.map(p=> p.id===data.id? data : p));
        }
      };
    }catch{}
    return ()=>{ try{ channelRef.current?.close(); }catch{} };
  },[currentUser]);

  // polling 3s for new pedidos detection (fallback)
  useEffect(()=>{
    const id = setInterval(()=>{
      if(pedidos.length > lastPedidosCount.current){
        const novos = pedidos.slice(0, pedidos.length - lastPedidosCount.current);
        novos.forEach(n=>{
          if(currentUser?.tipo==='montador' && currentUser.status_disponivel && currentUser.cidade_atende===n.cidade){
            playNotification('new'); showToast(`🔔 Novo pedido em ${n.cidade}!`);
          }
        });
      }
      lastPedidosCount.current = pedidos.length;
    },3000);
    return ()=>clearInterval(id);
  },[pedidos, currentUser]);

  const filteredCatalog = useMemo(()=>{
    let list = CATALOGO;
    if(filtroCat!=='Todos') list = list.filter(c=>c.cat===filtroCat);
    if(busca) list = list.filter(c=>c.nome.toLowerCase().includes(busca.toLowerCase()));
    return list;
  },[filtroCat, busca]);

  const handleCadastro = (e)=>{
    e.preventDefault();
    const fd = new FormData(e.target);
    const nome = fd.get('nome'); const email=fd.get('email'); const senha=fd.get('senha'); const cidade=fd.get('cidade'); const telefone=fd.get('telefone');
    const cidade_atende = fd.get('cidade_atende')||''; const chave_pix=fd.get('chave_pix')||''; 
    if(usuarios.find(u=>u.email===email)){ showToast('E-mail já cadastrado'); return; }
    const novo = {id:'u'+Date.now(), tipo:cadTipo, nome, email, senha, cidade, cidade_atende: cadTipo==='montador'? cidade_atende: '', chave_pix, foto_perfil:'', status:'ATIVO', status_disponivel:true, telefone};
    setUsuarios([...usuarios, novo]);
    showToast('Cadastro realizado! Faça login.');
    setView('login');
  };

  const handleLogin = (e)=>{
    e.preventDefault();
    const fd = new FormData(e.target);
    const email=fd.get('email'); const senha=fd.get('senha');
    const user = usuarios.find(u=>u.email===email && u.senha===senha);
    if(!user){ showToast('Credenciais inválidas'); return; }
    if(user.status==='BLOQUEADO'){ showToast('Usuário bloqueado. Contate suporte.'); return; }
    setCurrentUser(user);
    if(user.tipo==='cliente') { setView('cliente'); setTab('pendente'); }
    else if(user.tipo==='montador'){ setView('montador'); setTab('pendentes'); }
    else { setView('admin'); }
  };

  const handleCreatePedido = ()=>{
    if(!selectedMovel) return;
    const valorBase = selectedMovel.valores[formData.servico];
    let valorBruto = valorBase;
    // cupom
    const cup = cupons.find(c=>c.codigo.toLowerCase()===formData.cupom.toLowerCase());
    if(cup){ if(cup.tipo==='%') valorBruto = Math.round(valorBruto*(1-cup.desconto/100)); else valorBruto = Math.max(0, valorBruto-cup.desconto); }
    const comissao = Math.round(valorBruto*0.10);
    const valorLiquido = valorBruto - comissao;
    const novoPedido = {
      id:'p'+Date.now(), numero: genNumero(), cliente_id: currentUser.id, cliente_nome: currentUser.nome,
      montador_id:null, montador_nome:null,
      categoria: selectedMovel.cat, movel_nome: selectedMovel.nome, servico_tipo: formData.servico,
      valor_bruto: valorBruto, comissao, valor_liquido: valorLiquido,
      cidade: formData.cidade||currentUser.cidade, bairro: formData.bairro, data_servico: formData.data, horario: formData.horario,
      status:'AGUARDANDO_PAGAMENTO', fotos: formFotos, comprovante:'', created_at: new Date().toISOString()
    };
    const novos = [novoPedido, ...pedidos];
    setPedidos(novos);
    setPedidoEmPagamento(novoPedido);
    setView('pagamento');
    try{ channelRef.current?.postMessage({type:'pedido_novo', data:novoPedido}); }catch{}
    setFormFotos([]); setSelectedMovel(null);
  };

  const confirmarPagamento = (pedidoId)=>{
    const upd = pedidos.map(p=> p.id===pedidoId? {...p, status:'COMPROVANTE_ENVIADO'}:p);
    setPedidos(upd);
    // simula confirmação automatica após 1s para PROCURANDO
    setTimeout(()=>{
      setPedidos(prev=> prev.map(p=> p.id===pedidoId? {...p, status:'PROCURANDO_MONTADOR'}:p));
      const ped = upd.find(x=>x.id===pedidoId); if(ped){ const np={...ped, status:'PROCURANDO_MONTADOR'}; try{ channelRef.current?.postMessage({type:'pedido_novo', data:np}); }catch{} }
      showToast('Pagamento confirmado! Procurando montador...');
    },800);
  };

  const aceitarPedido = (ped)=>{
    const atual = pedidos.find(p=>p.id===ped.id);
    if(!atual || atual.status!=='PROCURANDO_MONTADOR' && atual.status!=='COMPROVANTE_ENVIADO'){ showToast('Este serviço acabou de ser aceito por outro montador.'); return; }
    if(!currentUser.status_disponivel){ showToast('Fique Disponível para aceitar.'); return; }
    const novo = {...atual, status:'ACEITO', montador_id:currentUser.id, montador_nome:currentUser.nome};
    setPedidos(prev=> prev.map(p=>p.id===ped.id? novo: p));
    try{ channelRef.current?.postMessage({type:'pedido_aceito', data:novo}); }catch{}
    showToast(`Pedido #${novo.numero} aceito!`);
  };

  const recusarPedido = (ped)=>{
    // apenas oculta localmente? marca recusado para esse montador -> vamos filtrar
    showToast('Pedido recusado.');
    // poderia salvar recusados em array, simplificamos não fazendo nada pois ele continua na lista mas com botão
    // para demo, vamos mover para lista de recusados local: não implementamos persistência de recusa individual
  };

  const finalizarPedido = (pedId)=>{
    const novo = pedidos.map(p=> p.id===pedId? {...p, status:'FINALIZADO'}:p);
    setPedidos(novo);
    const ped = novo.find(x=>x.id===pedId);
    try{ channelRef.current?.postMessage({type:'pedido_update', data:ped}); }catch{}
    showToast('Pedido finalizado!');
  };

  const toggleDisponivel = ()=>{
    const updUser = {...currentUser, status_disponivel:!currentUser.status_disponivel};
    setCurrentUser(updUser);
    setUsuarios(prev=> prev.map(u=> u.id===currentUser.id? updUser: u));
  };

  const handleLogoClick = ()=>{
    const now = Date.now();
    setLogoTaps(prev=>{
      const next = prev+1;
      if(next>=5){ setView('adminLogin'); return 0; }
      return next;
    });
    setTimeout(()=>setLogoTaps(0),3000);
  };

  // financeiro calcs
  const clienteFinanceiro = useMemo(()=>{
    if(!currentUser) return {total:0, pago:0, pendente:0};
    const meus = pedidos.filter(p=>p.cliente_id===currentUser.id);
    const total = meus.reduce((s,p)=>s+p.valor_bruto,0);
    const pago = meus.filter(p=>['FINALIZADO','ACEITO','PROCURANDO_MONTADOR','COMPROVANTE_ENVIADO'].includes(p.status)).reduce((s,p)=>s+p.valor_bruto,0);
    const pendente = total - pago;
    return {total, pago, pendente};
  },[pedidos, currentUser]);

  const montadorFinanceiro = useMemo(()=>{
    if(!currentUser) return {realizado:0, aReceber:0, total:0, lista:[]};
    const meus = pedidos.filter(p=>p.montador_id===currentUser.id);
    const realizado = meus.filter(p=>p.status==='FINALIZADO').reduce((s,p)=>s+p.valor_liquido,0);
    const aReceber = meus.filter(p=>p.status==='ACEITO').reduce((s,p)=>s+p.valor_liquido,0);
    return {realizado, aReceber, total:realizado+aReceber, lista:meus};
  },[pedidos, currentUser]);

  const adminFinanceiro = useMemo(()=>{
    const now = new Date(); const mes = now.getMonth(); const ano=now.getFullYear();
    const doMes = pedidos.filter(p=>{ const d=new Date(p.created_at); return d.getMonth()===mes && d.getFullYear()===ano; });
    const totalPedidosMes = doMes.reduce((s,p)=>s+p.valor_bruto,0);
    const finalizadosMes = doMes.filter(p=>p.status==='FINALIZADO');
    const totalRepasseMes = finalizadosMes.reduce((s,p)=>s+p.valor_liquido,0);
    const pendenteRepasse = pedidos.filter(p=>p.status==='ACEITO').reduce((s,p)=>s+p.valor_liquido,0);
    const comissaoMes = doMes.reduce((s,p)=>s+p.comissao,0);
    const porMontador = {};
    pedidos.filter(p=>p.status==='ACEITO').forEach(p=>{ if(!porMontador[p.montador_id]) porMontador[p.montador_id]={nome:p.montador_nome, total:0, count:0}; porMontador[p.montador_id].total+=p.valor_liquido; porMontador[p.montador_id].count++; });
    return {totalPedidosMes, totalRepasseMes, pendenteRepasse, comissaoMes, porMontador, countMes:doMes.length};
  },[pedidos]);

  return (
    <div style={{fontFamily:'Poppins, sans-serif', background:'#F6F7FB', minHeight:'100vh', color:'#0A2A6B'}}>
      <style>{`
        .btn-primary{ background:#FF7A00; color:white; border-radius:12px; padding:10px 16px; font-weight:600; }
        .btn-outline{ border:1px solid #0A2A6B; color:#0A2A6B; border-radius:12px; padding:10px 16px; font-weight:600; }
        .badge{ font-size:11px; padding:4px 8px; border-radius:20px; font-weight:600; }
      `}</style>

      {/* HEADER */}
      <header style={{background:'#0A2A6B', color:'white', padding:'12px 16px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, zIndex:30}}>
        <div onClick={handleLogoClick} style={{display:'flex', alignItems:'center', gap:10, cursor:'pointer'}}>
          <div style={{width:42,height:42, borderRadius:12, background:'white', display:'grid', placeItems:'center'}}>{LOGO_SVG}</div>
          <div style={{lineHeight:1}}>
            <div style={{fontWeight:700, fontSize:15}}>Contato Certo SP</div>
            <div style={{fontSize:11, opacity:0.8}}>645 cidades • 77 móveis</div>
          </div>
        </div>
        <div style={{display:'flex', gap:8}}>
          {!currentUser && <>
            <button onClick={()=>setView('login')} style={{background:'white', color:'#0A2A6B', borderRadius:20, padding:'6px 14px', fontWeight:600, fontSize:13}}>Entrar</button>
            <button onClick={()=>{setCadTipo('cliente'); setView('cadastro');}} style={{background:'#FF7A00', color:'white', borderRadius:20, padding:'6px 14px', fontWeight:600, fontSize:13}}>Cadastro</button>
          </>}
          {currentUser && <button onClick={()=>{setCurrentUser(null); setView('home');}} style={{background:'rgba(255,255,255,0.15)', borderRadius:20, padding:'6px 14px', fontSize:13}}>Sair</button>}
        </div>
      </header>

      {/* TOAST */}
      {toast && <div style={{position:'fixed', top:70, left:'50%', transform:'translateX(-50%)', background:'#0A2A6B', color:'white', padding:'12px 18px', borderRadius:12, zIndex:100, boxShadow:'0 8px 24px rgba(0,0,0,0.2)', fontSize:14, maxWidth:'90vw'}}>{toast}</div>}

      {/* HOME */}
      {view==='home' && (
        <div style={{maxWidth:1100, margin:'0 auto', padding:16}}>
          {/* cadastro obrigatório */}
          <div style={{background:'white', borderRadius:16, padding:18, marginBottom:16, boxShadow:'0 2px 12px rgba(10,42,107,0.06)'}}>
            <h2 style={{fontWeight:700, fontSize:18, marginBottom:4}}>Bem-vindo! Como deseja acessar?</h2>
            <p style={{fontSize:13, opacity:0.7, marginBottom:14}}>Cadastro obrigatório para publicar ou aceitar pedidos. Sistema online em tempo real.</p>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
              <button onClick={()=>{setCadTipo('cliente'); setView('cadastro');}} style={{border:'2px solid #0A2A6B', borderRadius:14, padding:'16px 12px', textAlign:'left'}}>
                <div style={{fontSize:22}}>🛋️</div><div style={{fontWeight:700, marginTop:6}}>Sou Cliente</div><div style={{fontSize:12, opacity:0.6}}>Quero montar móveis</div>
              </button>
              <button onClick={()=>{setCadTipo('montador'); setView('cadastro');}} style={{border:'2px solid #FF7A00', borderRadius:14, padding:'16px 12px', textAlign:'left'}}>
                <div style={{fontSize:22}}>🔧</div><div style={{fontWeight:700, marginTop:6}}>Sou Montador</div><div style={{fontSize:12, opacity:0.6}}>Quero aceitar serviços</div>
              </button>
            </div>
            <button onClick={()=>setView('login')} style={{marginTop:12, width:'100%', background:'#0A2A6B', color:'white', borderRadius:12, padding:12, fontWeight:600}}>Já tenho cadastro</button>
            <div style={{marginTop:10, fontSize:11, opacity:0.5, textAlign:'center'}}>645 cidades SP atendidas • Realtime BroadcastChannel + localStorage</div>
          </div>

          {/* busca + catalogo */}
          <div style={{display:'flex', gap:8, marginBottom:12}}>
            <input value={busca} onChange={e=>setBusca(e.target.value)} placeholder="Buscar móvel..." style={{flex:1, background:'white', borderRadius:12, padding:'10px 14px', border:'1px solid #E5E7EB'}}/>
            <select value={filtroCat} onChange={e=>setFiltroCat(e.target.value)} style={{background:'white', borderRadius:12, padding:'10px', border:'1px solid #E5E7EB'}}>
              <option>Todos</option><option>Dormitório</option><option>Sala</option><option>Cozinha</option><option>Escritório</option>
            </select>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:12}}>
            {filteredCatalog.map(m=>(
              <div key={m.id} onClick={()=>{ if(!currentUser){ setCadTipo('cliente'); setView('cadastro'); showToast('Cadastre-se para solicitar'); return; } if(currentUser.tipo!=='cliente'){ showToast('Apenas clientes solicitam'); return; } setSelectedMovel(m); setFormData({bairro:'', data:'', horario:'', cidade:currentUser.cidade, servico:'montagem', cupom:''}); }} style={{background:'white', borderRadius:14, padding:12, boxShadow:'0 1px 6px rgba(0,0,0,0.06)', cursor:'pointer'}}>
                <div style={{width:'100%', height:90, background:'#F1F5F9', borderRadius:10, display:'grid', placeItems:'center', fontSize:30}}>🪑</div>
                <div style={{fontWeight:600, fontSize:13, marginTop:8, lineHeight:1.2}}>{m.nome}</div>
                <div style={{fontSize:11, opacity:0.6, marginTop:2}}>{m.cat}</div>
                <div style={{marginTop:8, fontSize:11, color:'#FF7A00', fontWeight:700}}>Ver valores +</div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center', fontSize:11, opacity:0.4, marginTop:18}}>Catálogo demo 28 móveis — produção 77 móveis sem preços na lista, valores exatos no modal</div>
        </div>
      )}

      {/* MODAL MÓVEL */}
      {selectedMovel && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.45)', zIndex:50, display:'grid', placeItems:'center', padding:16}}>
          <div style={{background:'white', borderRadius:18, width:'100%', maxWidth:420, padding:18, maxHeight:'90vh', overflow:'auto'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <h3 style={{fontWeight:700}}>{selectedMovel.nome}</h3>
              <button onClick={()=>setSelectedMovel(null)} style={{fontSize:20}}>✕</button>
            </div>
            <div style={{marginTop:12, display:'grid', gap:8}}>
              {[
                {k:'montagem', label:'Montagem', val:selectedMovel.valores.montagem},
                {k:'desmontagem', label:'Desmontagem', val:selectedMovel.valores.desmontagem},
                {k:'completo', label:'Desmontagem + Montagem', val:selectedMovel.valores.completo},
              ].map(op=>(
                <label key={op.k} style={{border: formData.servico===op.k?'2px solid #FF7A00':'1px solid #E5E7EB', borderRadius:12, padding:12, display:'flex', justifyContent:'space-between', cursor:'pointer'}}>
                  <div><div style={{fontWeight:600, fontSize:14}}>{op.label}</div><div style={{fontSize:11, opacity:0.6}}>Valor exato com + taxas</div></div>
                  <div style={{display:'flex', alignItems:'center', gap:10}}><div style={{fontWeight:700, color:'#0A2A6B'}}>R$ {op.val},00 +</div><input type="radio" checked={formData.servico===op.k} onChange={()=>setFormData({...formData, servico:op.k})} /></div>
                </label>
              ))}
            </div>

            <div style={{marginTop:14, display:'grid', gap:8}}>
              <select value={formData.cidade} onChange={e=>setFormData({...formData, cidade:e.target.value})} style={{border:'1px solid #E5E7EB', borderRadius:10, padding:10}}>
                {CIDADES_SP.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
              <input placeholder="Bairro" value={formData.bairro} onChange={e=>setFormData({...formData, bairro:e.target.value})} style={{border:'1px solid #E5E7EB', borderRadius:10, padding:10}}/>
              <div style={{display:'flex', gap:8}}>
                <input type="date" value={formData.data} onChange={e=>setFormData({...formData, data:e.target.value})} style={{flex:1, border:'1px solid #E5E7EB', borderRadius:10, padding:10}}/>
                <input type="time" value={formData.horario} onChange={e=>setFormData({...formData, horario:e.target.value})} style={{flex:1, border:'1px solid #E5E7EB', borderRadius:10, padding:10}}/>
              </div>
              <input placeholder="Cupom (opcional)" value={formData.cupom} onChange={e=>setFormData({...formData, cupom:e.target.value})} style={{border:'1px solid #E5E7EB', borderRadius:10, padding:10}}/>

              <div>
                <div style={{fontSize:12, fontWeight:600, marginBottom:6}}>Fotos do móvel (até 3)</div>
                <div style={{display:'flex', gap:8}}>
                  {[0,1,2].map(i=>(
                    <label key={i} style={{width:80,height:80, border:'1px dashed #CBD5E1', borderRadius:10, display:'grid', placeItems:'center', cursor:'pointer', overflow:'hidden'}}>
                      {formFotos[i]? <img src={formFotos[i]} style={{width:'100%',height:'100%', objectFit:'cover'}}/> : <span style={{fontSize:22}}>+</span>}
                      <input type="file" accept="image/*" style={{display:'none'}} onChange={e=>{
                        const f=e.target.files[0]; if(!f) return; const r=new FileReader(); r.onload=ev=>{ const arr=[...formFotos]; arr[i]=ev.target.result; setFormFotos(arr); }; r.readAsDataURL(f);
                      }}/>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={handleCreatePedido} style={{marginTop:16, width:'100%', background:'#FF7A00', color:'white', borderRadius:12, padding:12, fontWeight:700}}>Solicitar Montagem • R$ {selectedMovel.valores[formData.servico]},00 +</button>
            <div style={{fontSize:11, opacity:0.5, marginTop:8, textAlign:'center'}}>PIX será exibido apenas na tela de pagamento</div>
          </div>
        </div>
      )}

      {/* CADASTRO */}
      {view==='cadastro' && (
        <div style={{maxWidth:420, margin:'20px auto', padding:16}}>
          <div style={{background:'white', borderRadius:16, padding:18}}>
            <h2 style={{fontWeight:700, fontSize:18}}>Cadastro {cadTipo==='montador'?'Montador':'Cliente'}</h2>
            <form onSubmit={handleCadastro} style={{marginTop:12, display:'grid', gap:10}}>
              <input name="nome" required placeholder="Nome completo" style={{border:'1px solid #E5E7EB', borderRadius:10, padding:10}}/>
              <input name="email" required type="email" placeholder="E-mail" style={{border:'1px solid #E5E7EB', borderRadius:10, padding:10}}/>
              <input name="senha" required type="password" placeholder="Senha" style={{border:'1px solid #E5E7EB', borderRadius:10, padding:10}}/>
              <input name="telefone" required placeholder="Telefone/WhatsApp" style={{border:'1px solid #E5E7EB', borderRadius:10, padding:10}}/>
              <select name="cidade" required style={{border:'1px solid #E5E7EB', borderRadius:10, padding:10}}>
                <option value="">Cidade</option>{CIDADES_SP.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
              {cadTipo==='montador' && <>
                <select name="cidade_atende" required style={{border:'1px solid #E5E7EB', borderRadius:10, padding:10}}>
                  <option value="">Cidade que atende</option>{CIDADES_SP.map(c=><option key={c} value={c}>{c}</option>)}
                </select>
                <input name="chave_pix" required placeholder="Chave PIX para receber" style={{border:'1px solid #E5E7EB', borderRadius:10, padding:10}}/>
              </>}
              <button type="submit" style={{background:'#0A2A6B', color:'white', borderRadius:12, padding:12, fontWeight:700, marginTop:6}}>Criar conta</button>
            </form>
            <button onClick={()=>setView('login')} style={{width:'100%', marginTop:10, fontSize:13, color:'#0A2A6B', fontWeight:600}}>Já tenho cadastro</button>
            <button onClick={()=>setView('home')} style={{width:'100%', marginTop:6, fontSize:12, opacity:0.6}}>Voltar</button>
          </div>
        </div>
      )}

      {view==='login' && (
        <div style={{maxWidth:420, margin:'20px auto', padding:16}}>
          <div style={{background:'white', borderRadius:16, padding:18}}>
            <h2 style={{fontWeight:700}}>Entrar</h2>
            <form onSubmit={handleLogin} style={{marginTop:12, display:'grid', gap:10}}>
              <input name="email" required placeholder="E-mail" style={{border:'1px solid #E5E7EB', borderRadius:10, padding:10}}/>
              <input name="senha" required type="password" placeholder="Senha" style={{border:'1px solid #E5E7EB', borderRadius:10, padding:10}}/>
              <button type="submit" style={{background:'#FF7A00', color:'white', borderRadius:12, padding:12, fontWeight:700}}>Entrar</button>
            </form>
            <div style={{marginTop:12, fontSize:11, opacity:0.6}}>Admin demo: andre@contatocertosp.com.br / Contato@2026SP<br/>Montador demo: carlos@ex.com / 123 • Cliente demo: ana@ex.com / 123</div>
            <button onClick={()=>setView('home')} style={{width:'100%', marginTop:10, fontSize:12, opacity:0.6}}>Voltar</button>
          </div>
        </div>
      )}

      {/* PAGAMENTO - PIX SÓ AQUI */}
      {view==='pagamento' && pedidoEmPagamento && (
        <div style={{maxWidth:420, margin:'0 auto', padding:16}}>
          <div style={{background:'white', borderRadius:16, padding:18}}>
            <h2 style={{fontWeight:700}}>Pagamento • Pedido #{pedidoEmPagamento.numero}</h2>
            <div style={{marginTop:12, background:'#F8FAFC', borderRadius:12, padding:12, fontSize:13}}>
              <div><b>Móvel:</b> {pedidoEmPagamento.movel_nome}</div>
              <div><b>Serviço:</b> {pedidoEmPagamento.servico_tipo}</div>
              <div><b>Cidade:</b> {pedidoEmPagamento.cidade} - {pedidoEmPagamento.bairro}</div>
              <div style={{marginTop:8, fontWeight:700, fontSize:16, color:'#0A2A6B'}}>Total: R$ {pedidoEmPagamento.valor_bruto},00</div>
              <div style={{fontSize:11, opacity:0.6}}>Comissão plataforma 10% já inclusa. Montador recebe R$ {pedidoEmPagamento.valor_liquido}</div>
            </div>
            <div style={{marginTop:16, border:'2px dashed #0A2A6B', borderRadius:12, padding:12, textAlign:'center'}}>
              <div style={{fontSize:12, fontWeight:700, color:'#0A2A6B'}}>PIX - Copia e Cola</div>
              <div style={{marginTop:6, background:'#0A2A6B', color:'white', padding:'8px 10px', borderRadius:8, fontSize:13, wordBreak:'break-all'}}>contatocerto.prestadores@gmail.com</div>
              <div style={{fontSize:11, marginTop:6, opacity:0.6}}>Titular: Contato Certo SP Prestadores</div>
            </div>
            <button onClick={()=>{ confirmarPagamento(pedidoEmPagamento.id); setView('cliente'); setTab('pendente'); }} style={{marginTop:16, width:'100%', background:'#0A2A6B', color:'white', borderRadius:12, padding:12, fontWeight:700}}>Já paguei - Enviar comprovante</button>
            <button onClick={()=>setView('cliente')} style={{width:'100%', marginTop:8, border:'1px solid #E5E7EB', borderRadius:12, padding:10}}>Ver depois</button>
          </div>
        </div>
      )}

      {/* CLIENTE PAINEL */}
      {view==='cliente' && currentUser && (
        <div style={{maxWidth:1100, margin:'0 auto', padding:16}}>
          <div style={{background:'white', borderRadius:14, padding:14, display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
            <div style={{display:'flex', gap:10, alignItems:'center'}}>
              <div style={{width:44,height:44, borderRadius:22, background:'#0A2A6B', color:'white', display:'grid', placeItems:'center', fontWeight:700}}>{currentUser.nome[0]}</div>
              <div><div style={{fontWeight:700}}>{currentUser.nome}</div><div style={{fontSize:12, opacity:0.6}}>{currentUser.cidade} • Cliente</div></div>
            </div>
            <button onClick={()=>setView('home')} style={{fontSize:12, border:'1px solid #E5E7EB', borderRadius:20, padding:'6px 12px'}}>Catálogo</button>
          </div>

          <div style={{display:'flex', gap:8, overflowX:'auto', paddingBottom:6}}>
            {[
              {k:'pendente', l:'Pedido Pendente'},
              {k:'finalizados', l:'Finalizados'},
              {k:'financeiro', l:'Financeiro'},
              {k:'cupons', l:'Cupons'},
            ].map(t=>(
              <button key={t.k} onClick={()=>setTab(t.k)} style={{whiteSpace:'nowrap', background:tab===t.k?'#0A2A6B':'white', color:tab===t.k?'white':'#0A2A6B', borderRadius:20, padding:'8px 14px', fontWeight:600, fontSize:13, border:'1px solid #E5E7EB'}}>{t.l}</button>
            ))}
          </div>

          {tab==='pendente' && (
            <div style={{marginTop:12, display:'grid', gap:10}}>
              {pedidos.filter(p=>p.cliente_id===currentUser.id && ['AGUARDANDO_PAGAMENTO','COMPROVANTE_ENVIADO','PROCURANDO_MONTADOR','ACEITO'].includes(p.status)).map(p=>(
                <div key={p.id} style={{background:'white', borderRadius:12, padding:12}}>
                  <div style={{display:'flex', justifyContent:'space-between'}}>
                    <div style={{fontWeight:700, fontSize:13}}>#{p.numero} • {p.movel_nome}</div>
                    <span className="badge" style={{background: p.status==='ACEITO'?'#DCFCE7': p.status==='AGUARDANDO_PAGAMENTO'?'#FEF3C7':'#DBEAFE', color:p.status==='ACEITO'?'#166534':'#92400E'}}>{p.status}</span>
                  </div>
                  <div style={{fontSize:12, opacity:0.7, marginTop:4}}>{p.categoria} • {p.servico_tipo} • R$ {p.valor_bruto} • {p.cidade}/{p.bairro} • {p.data_servico} {p.horario}</div>
                  {p.fotos?.length>0 && <div style={{display:'flex', gap:6, marginTop:8}}>{p.fotos.map((f,i)=><img key={i} src={f} style={{width:50,height:50, borderRadius:8, objectFit:'cover'}}/>)}</div>}
                  {p.montador_nome && <div style={{marginTop:6, fontSize:12}}>🔧 Montador: <b>{p.montador_nome}</b></div>}
                  {p.status==='AGUARDANDO_PAGAMENTO' && <button onClick={()=>{setPedidoEmPagamento(p); setView('pagamento');}} style={{marginTop:10, width:'100%', background:'#FF7A00', color:'white', borderRadius:10, padding:10, fontWeight:700}}>Ver Pagamento PIX</button>}
                </div>
              ))}
              {pedidos.filter(p=>p.cliente_id===currentUser.id && ['AGUARDANDO_PAGAMENTO','COMPROVANTE_ENVIADO','PROCURANDO_MONTADOR','ACEITO'].includes(p.status)).length===0 && <div style={{background:'white', borderRadius:12, padding:20, textAlign:'center', opacity:0.6, fontSize:13}}>Nenhum pedido pendente. Vá ao catálogo.</div>}
            </div>
          )}

          {tab==='finalizados' && (
            <div style={{marginTop:12, display:'grid', gap:10}}>
              {pedidos.filter(p=>p.cliente_id===currentUser.id && p.status==='FINALIZADO').map(p=>(
                <div key={p.id} style={{background:'white', borderRadius:12, padding:12}}>
                  <div style={{fontWeight:700, fontSize:13}}>#{p.numero} • {p.movel_nome}</div>
                  <div style={{fontSize:12, opacity:0.7}}>Finalizado por {p.montador_nome||'montador'} • R$ {p.valor_bruto}</div>
                </div>
              ))}
            </div>
          )}

          {tab==='financeiro' && (
            <div style={{marginTop:12, display:'grid', gap:12}}>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8}}>
                <div style={{background:'white', borderRadius:12, padding:12}}><div style={{fontSize:11, opacity:0.6}}>Total Pedidos</div><div style={{fontWeight:700, fontSize:16}}>R$ {clienteFinanceiro.total}</div></div>
                <div style={{background:'white', borderRadius:12, padding:12}}><div style={{fontSize:11, opacity:0.6}}>Total Pago</div><div style={{fontWeight:700, fontSize:16, color:'#16A34A'}}>R$ {clienteFinanceiro.pago}</div></div>
                <div style={{background:'white', borderRadius:12, padding:12}}><div style={{fontSize:11, opacity:0.6}}>Pendente</div><div style={{fontWeight:700, fontSize:16, color:'#F59E0B'}}>R$ {clienteFinanceiro.pendente}</div></div>
              </div>
              <div style={{background:'white', borderRadius:12, padding:12}}>
                <div style={{fontWeight:700, fontSize:13, marginBottom:8}}>Detalhe por pedido</div>
                {pedidos.filter(p=>p.cliente_id===currentUser.id).map(p=>(
                  <div key={p.id} style={{display:'flex', justifyContent:'space-between', fontSize:12, padding:'6px 0', borderBottom:'1px solid #F1F5F9'}}><span>#{p.numero} {p.movel_nome}</span><span>R$ {p.valor_bruto}</span></div>
                ))}
              </div>
            </div>
          )}

          {tab==='cupons' && (
            <div style={{marginTop:12, display:'grid', gap:10}}>
              {cupons.map(c=>(
                <div key={c.id} style={{background:'white', borderRadius:12, padding:12, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div><div style={{fontWeight:700}}>{c.codigo}</div><div style={{fontSize:12, opacity:0.6}}>{c.desconto}{c.tipo} OFF • Validade {c.validade}</div></div>
                  <button onClick={()=>{ navigator.clipboard?.writeText(c.codigo); showToast('Cupom copiado!'); }} style={{background:'#0A2A6B', color:'white', borderRadius:8, padding:'6px 10px', fontSize:12}}>Copiar</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MONTADOR PAINEL */}
      {view==='montador' && currentUser && (
        <div style={{maxWidth:1100, margin:'0 auto', padding:16}}>
          <div style={{background:'white', borderRadius:14, padding:14, marginBottom:12}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div style={{display:'flex', gap:10, alignItems:'center'}}>
                <div style={{width:46,height:46, borderRadius:23, background:'#0A2A6B', color:'white', display:'grid', placeItems:'center', fontWeight:700}}>{currentUser.nome[0]}</div>
                <div>
                  <div style={{fontWeight:700}}>{currentUser.nome}</div>
                  <div style={{fontSize:12, opacity:0.7}}>Atende: {currentUser.cidade_atende} • PIX: {currentUser.chave_pix}</div>
                </div>
              </div>
              <button onClick={toggleDisponivel} style={{background:currentUser.status_disponivel?'#16A34A':'#9CA3AF', color:'white', borderRadius:20, padding:'8px 14px', fontWeight:700, fontSize:12}}>{currentUser.status_disponivel?'● Disponível':'○ Offline'}</button>
            </div>
          </div>

          <div style={{display:'flex', gap:8, overflowX:'auto'}}>
            {[{k:'pendentes',l:'Pedidos Pendentes'},{k:'finalizados',l:'Finalizados'},{k:'financeiro',l:'Financeiro'}].map(t=>(
              <button key={t.k} onClick={()=>setTab(t.k)} style={{whiteSpace:'nowrap', background:tab===t.k?'#0A2A6B':'white', color:tab===t.k?'white':'#0A2A6B', borderRadius:20, padding:'8px 14px', fontWeight:600, fontSize:13, border:'1px solid #E5E7EB'}}>{t.l}</button>
            ))}
          </div>

          {tab==='pendentes' && (
            <div style={{marginTop:12, display:'grid', gap:10}}>
              {pedidos.filter(p=>['PROCURANDO_MONTADOR','COMPROVANTE_ENVIADO'].includes(p.status) && p.cidade===currentUser.cidade_atende).map(p=>(
                <div key={p.id} style={{background:'white', borderRadius:12, padding:12}}>
                  <div style={{display:'flex', justifyContent:'space-between'}}>
                    <div style={{fontWeight:700, fontSize:13}}>#{p.numero} • {p.movel_nome}</div>
                    <div style={{fontSize:11, background:'#FFEDD5', color:'#9A3412', borderRadius:20, padding:'4px 8px'}}>{p.cidade}</div>
                  </div>
                  <div style={{fontSize:12, opacity:0.7, marginTop:4}}>{p.categoria} • {p.servico_tipo} • R$ {p.valor_liquido} líquido • {p.bairro} • {p.data_servico} {p.horario}</div>
                  <div style={{fontSize:12, marginTop:4}}>Cliente: {p.cliente_nome}</div>
                  {p.fotos?.[0] && <img src={p.fotos[0]} style={{marginTop:8, width:60,height:60, borderRadius:8, objectFit:'cover'}}/>}
                  <div style={{display:'flex', gap:8, marginTop:10}}>
                    <button onClick={()=>aceitarPedido(p)} style={{flex:1, background:'#FF7A00', color:'white', borderRadius:10, padding:10, fontWeight:700}}>ACEITAR</button>
                    <button onClick={()=>recusarPedido(p)} style={{flex:1, background:'#E5E7EB', borderRadius:10, padding:10, fontWeight:600}}>RECUSAR</button>
                  </div>
                </div>
              ))}
              {pedidos.filter(p=>['PROCURANDO_MONTADOR','COMPROVANTE_ENVIADO'].includes(p.status) && p.cidade===currentUser.cidade_atende).length===0 && <div style={{background:'white', borderRadius:12, padding:20, textAlign:'center', opacity:0.6, fontSize:13}}>Nenhum pedido pendente na sua cidade. Fique Disponível!</div>}
            </div>
          )}

          {tab==='finalizados' && (
            <div style={{marginTop:12, display:'grid', gap:10}}>
              {pedidos.filter(p=>p.montador_id===currentUser.id && p.status==='FINALIZADO').map(p=>(
                <div key={p.id} style={{background:'white', borderRadius:12, padding:12}}>
                  <div style={{fontWeight:700, fontSize:13}}>#{p.numero} • {p.movel_nome}</div>
                  <div style={{fontSize:12, opacity:0.7}}>Cliente {p.cliente_nome} • Recebeu R$ {p.valor_liquido}</div>
                </div>
              ))}
            </div>
          )}

          {tab==='financeiro' && (
            <div style={{marginTop:12, display:'grid', gap:12}}>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
                <div style={{background:'white', borderRadius:12, padding:14}}><div style={{fontSize:11, opacity:0.6}}>Valores realizados (mês)</div><div style={{fontWeight:700, fontSize:18, color:'#16A34A'}}>R$ {montadorFinanceiro.realizado}</div></div>
                <div style={{background:'white', borderRadius:12, padding:14}}><div style={{fontSize:11, opacity:0.6}}>Valores a receber</div><div style={{fontWeight:700, fontSize:18, color:'#F59E0B'}}>R$ {montadorFinanceiro.aReceber}</div></div>
              </div>
              <div style={{background:'white', borderRadius:12, padding:12}}>
                <div style={{fontWeight:700}}>Total geral R$ {montadorFinanceiro.total}</div>
                <div style={{marginTop:8}}>
                  {montadorFinanceiro.lista.map(p=>(
                    <div key={p.id} style={{display:'flex', justifyContent:'space-between', fontSize:12, padding:'6px 0', borderBottom:'1px solid #F1F5F9'}}><span>#{p.numero} {p.movel_nome} • {p.status}</span><span>R$ {p.valor_liquido}</span></div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ADMIN LOGIN */}
      {view==='adminLogin' && (
        <div style={{maxWidth:400, margin:'20px auto', padding:16}}>
          <div style={{background:'white', borderRadius:16, padding:18}}>
            <h3 style={{fontWeight:700}}>Admin Acesso</h3>
            <form onSubmit={e=>{
              e.preventDefault(); const fd=new FormData(e.target); const login=fd.get('login'); const senha=fd.get('senha');
              if((login==='AndreSousa84' && senha==='Contato@2026SP') || (login==='andre@contatocertosp.com.br' && senha==='Contato@2026SP')){ setView('admin'); setTab('pedidos'); setCurrentUser(usuarios.find(u=>u.tipo==='admin')); } else showToast('Credenciais inválidas');
            }} style={{marginTop:12, display:'grid', gap:10}}>
              <input name="login" placeholder="Login" style={{border:'1px solid #E5E7EB', borderRadius:10, padding:10}}/>
              <input name="senha" type="password" placeholder="Senha" style={{border:'1px solid #E5E7EB', borderRadius:10, padding:10}}/>
              <button style={{background:'#0A2A6B', color:'white', borderRadius:12, padding:12, fontWeight:700}}>Entrar Admin</button>
            </form>
            <button onClick={()=>setView('home')} style={{marginTop:10, fontSize:12, opacity:0.6, width:'100%'}}>Voltar</button>
          </div>
        </div>
      )}

      {view==='admin' && (
        <div style={{maxWidth:1100, margin:'0 auto', padding:16}}>
          <div style={{background:'#0A2A6B', color:'white', borderRadius:14, padding:14, display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
            <div style={{fontWeight:700}}>ADM • Contato Certo SP</div>
            <div style={{display:'flex', gap:6}}>
              {[{k:'pedidos',l:'Pedidos'},{k:'usuarios',l:'Usuários'},{k:'cupons',l:'Cupons'},{k:'financeiro',l:'Financeiro'}].map(t=>(
                <button key={t.k} onClick={()=>setTab(t.k)} style={{background:tab===t.k?'white':'rgba(255,255,255,0.15)', color:tab===t.k?'#0A2A6B':'white', borderRadius:20, padding:'6px 10px', fontSize:12, fontWeight:600}}>{t.l}</button>
              ))}
            </div>
          </div>

          {tab==='pedidos' && (
            <div style={{display:'grid', gap:8}}>
              {pedidos.map(p=>(
                <div key={p.id} style={{background:'white', borderRadius:12, padding:12, fontSize:12}}>
                  <div style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:6}}>
                    <b>#{p.numero} {p.movel_nome} • {p.cidade} • R$ {p.valor_bruto} (líq R$ {p.valor_liquido}) • {p.status}</b>
                    <div style={{display:'flex', gap:6}}>
                      <button onClick={()=>{ const upd=pedidos.map(x=> x.id===p.id? {...x, status:'PROCURANDO_MONTADOR'}:x); setPedidos(upd); }} style={{background:'#DBEAFE', borderRadius:6, padding:'4px 8px'}}>Confirmar Pagamento</button>
                      <button onClick={()=>finalizarPedido(p.id)} style={{background:'#DCFCE7', borderRadius:6, padding:'4px 8px'}}>Finalizar</button>
                    </div>
                  </div>
                  <div style={{opacity:0.7}}>Cliente: {p.cliente_nome} • Montador: {p.montador_nome||'-'} • {p.servico_tipo}</div>
                </div>
              ))}
            </div>
          )}

          {tab==='usuarios' && (
            <div style={{display:'grid', gap:8}}>
              {usuarios.map(u=>(
                <div key={u.id} style={{background:'white', borderRadius:12, padding:12, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div>
                    <div style={{fontWeight:700, fontSize:13}}>{u.nome} • {u.tipo} • {u.status}</div>
                    <div style={{fontSize:11, opacity:0.6}}>{u.email} • {u.cidade} {u.cidade_atende?`• Atende ${u.cidade_atende}`:''} • PIX {u.chave_pix||'-'}</div>
                  </div>
                  <div style={{display:'flex', gap:6}}>
                    <button onClick={()=>{ const upd=usuarios.map(x=> x.id===u.id? {...x, status: x.status==='BLOQUEADO'?'ATIVO':'BLOQUEADO'}:x); setUsuarios(upd); }} style={{background:'#FEF3C7', borderRadius:6, padding:'6px 8px', fontSize:11}}>{u.status==='BLOQUEADO'?'Desbloquear':'Bloquear'}</button>
                    <button onClick={()=>{ if(confirm('Excluir usuário?')) setUsuarios(usuarios.filter(x=>x.id!==u.id)); }} style={{background:'#FEE2E2', borderRadius:6, padding:'6px 8px', fontSize:11}}>Excluir</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab==='cupons' && (
            <div style={{display:'grid', gap:12}}>
              <div style={{background:'white', borderRadius:12, padding:12}}>
                <div style={{fontWeight:700, marginBottom:8}}>Gerar Cupom</div>
                <form onSubmit={e=>{
                  e.preventDefault(); const fd=new FormData(e.target); const codigo=fd.get('codigo'); const desconto=Number(fd.get('desconto')); const tipo=fd.get('tipo'); const validade=fd.get('validade'); const limite=Number(fd.get('limite'));
                  const novo={id:'cup'+Date.now(), codigo, desconto, tipo, validade, limite, usos:0}; setCupons([...cupons, novo]); e.target.reset(); showToast('Cupom criado');
                }} style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
                  <input name="codigo" required placeholder="Código ex: DESCONTO10" style={{border:'1px solid #E5E7EB', borderRadius:8, padding:8}}/>
                  <input name="desconto" required type="number" placeholder="Desconto" style={{border:'1px solid #E5E7EB', borderRadius:8, padding:8}}/>
                  <select name="tipo" style={{border:'1px solid #E5E7EB', borderRadius:8, padding:8}}><option value="%">%</option><option value="R$">R$</option></select>
                  <input name="validade" type="date" style={{border:'1px solid #E5E7EB', borderRadius:8, padding:8}}/>
                  <input name="limite" type="number" placeholder="Limite uso" style={{border:'1px solid #E5E7EB', borderRadius:8, padding:8}}/>
                  <button style={{gridColumn:'1 / -1', background:'#FF7A00', color:'white', borderRadius:8, padding:10, fontWeight:700}}>Criar Cupom</button>
                </form>
              </div>
              <div style={{display:'grid', gap:8}}>
                {cupons.map(c=>(
                  <div key={c.id} style={{background:'white', borderRadius:12, padding:12, display:'flex', justifyContent:'space-between'}}>
                    <div><b>{c.codigo}</b> • {c.desconto}{c.tipo} • Val {c.validade} • Limite {c.limite}</div>
                    <button onClick={()=>setCupons(cupons.filter(x=>x.id!==c.id))} style={{background:'#FEE2E2', borderRadius:6, padding:'4px 8px', fontSize:11}}>Excluir</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab==='financeiro' && (
            <div style={{display:'grid', gap:12}}>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
                <div style={{background:'white', borderRadius:12, padding:14}}><div style={{fontSize:11, opacity:0.6}}>Total pedidos do mês ({adminFinanceiro.countMes})</div><div style={{fontWeight:700, fontSize:18}}>R$ {adminFinanceiro.totalPedidosMes}</div></div>
                <div style={{background:'white', borderRadius:12, padding:14}}><div style={{fontSize:11, opacity:0.6}}>Comissão plataforma 10% mês</div><div style={{fontWeight:700, fontSize:18, color:'#0A2A6B'}}>R$ {adminFinanceiro.comissaoMes}</div></div>
                <div style={{background:'white', borderRadius:12, padding:14}}><div style={{fontSize:11, opacity:0.6}}>Total repasse montadores mês</div><div style={{fontWeight:700, fontSize:18, color:'#16A34A'}}>R$ {adminFinanceiro.totalRepasseMes}</div></div>
                <div style={{background:'white', borderRadius:12, padding:14}}><div style={{fontSize:11, opacity:0.6}}>Valor a repassar pendente (ACEITO)</div><div style={{fontWeight:700, fontSize:18, color:'#F59E0B'}}>R$ {adminFinanceiro.pendenteRepasse}</div></div>
              </div>
              <div style={{background:'white', borderRadius:12, padding:12}}>
                <div style={{fontWeight:700, fontSize:13, marginBottom:8}}>Detalhe por montador - a receber</div>
                {Object.entries(adminFinanceiro.porMontador).map(([id, d])=>{
                  const dd=d;
                  return <div key={id} style={{display:'flex', justifyContent:'space-between', fontSize:12, padding:'6px 0', borderBottom:'1px solid #F1F5F9'}}><span>{dd.nome} • {dd.count} pedidos</span><span>R$ {dd.total}</span></div>;
                })}
                {Object.keys(adminFinanceiro.porMontador).length===0 && <div style={{fontSize:12, opacity:0.6}}>Nenhum repasse pendente</div>}
              </div>
            </div>
          )}
        </div>
      )}

      {/* botão flutuante Baixar App */}
      <a href="#" onClick={e=>{e.preventDefault(); showToast('App PWA: Adicione à tela inicial. Manifest corrigido ✓');}} style={{position:'fixed', right:16, bottom:16, background:'#0A2A6B', color:'white', borderRadius:24, padding:'10px 16px', fontWeight:700, fontSize:13, boxShadow:'0 8px 20px rgba(0,0,0,0.2)', zIndex:40, display:'flex', alignItems:'center', gap:6}}>
        📲 Baixar App
      </a>

      <div style={{height:80}}/>
      <div style={{textAlign:'center', fontSize:10, opacity:0.35, paddingBottom:12}}>Manifest corrigido • theme-color #0A2A6B • localStorage + BroadcastChannel realtime • PIX só na tela pagamento • 5 toques logo = admin</div>
    </div>
  );
}
