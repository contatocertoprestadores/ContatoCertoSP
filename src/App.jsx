
import React, { useState, useEffect, useRef } from 'react'
import { supabase, safeInsert } from './lib/supabase.js'
import { CIDADES_SP } from './lib/cidades.js'
import { SERVICOS, CATEGORIAS } from './lib/servicos.js'

const PIX_OFICIAL = 'contatocerto.prestadores@gmail.com'
const WHATSAPP = '5518991488302'
const COMISSAO = 0.10

function normalize(s){ return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9 ]/g,'').trim() }

export default function App(){
  const [view, setView] = useState('home') // home, login, cadastro, cliente, montador, admin
  const [tipoCadastro, setTipoCadastro] = useState('CLIENTE')
  const [user, setUser] = useState(()=> JSON.parse(localStorage.getItem('ccsp_user')||'null'))
  const [pedidos, setPedidos] = useState(()=> JSON.parse(localStorage.getItem('ccsp_pedidos')||'[]'))
  const [usuarios, setUsuarios] = useState(()=> JSON.parse(localStorage.getItem('ccsp_usuarios')||'[]'))
  const [busca, setBusca] = useState('')
  const [cidadeFiltro, setCidadeFiltro] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas')
  const [toast, setToast] = useState('')
  const [adminClicks, setAdminClicks] = useState(0)
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [supabaseStatus, setSupabaseStatus] = useState('testando')
  const lastClickRef = useRef(0)

  // novo pedido state
  const [novoPedido, setNovoPedido] = useState({
    servico_id:'', categoria:'', movel:'', quantidade:1, marca:'', modelo:'', observacoes:'',
    cep:'', cidade:'', bairro:'', rua:'', numero:'', complemento:'', ponto:'',
    data:'', horario:'', fotos:[]
  })

  useEffect(()=>{
    localStorage.setItem('ccsp_pedidos', JSON.stringify(pedidos))
  },[pedidos])
  useEffect(()=>{
    localStorage.setItem('ccsp_usuarios', JSON.stringify(usuarios))
  },[usuarios])
  useEffect(()=>{
    if(user) localStorage.setItem('ccsp_user', JSON.stringify(user))
  },[user])

  useEffect(()=>{
    async function test(){
      try{
        const { error } = await supabase.from('cidades_sp').select('id').limit(1)
        setSupabaseStatus(error ? 'fallback: '+error.message : 'conectado ☁️')
      }catch(e){ setSupabaseStatus('offline - usando localStorage') }
    }
    test()
  },[])

  function showToast(msg){ setToast(msg); setTimeout(()=>setToast(''), 3000) }

  function handleLogoClick(){
    const now = Date.now()
    if(now - lastClickRef.current > 3000) setAdminClicks(1)
    else setAdminClicks(c=>c+1)
    lastClickRef.current = now
    if(adminClicks+1>=5){ setShowAdminLogin(true); setAdminClicks(0); showToast('Acesso admin') }
  }

  function handleCadastro(e){
    e.preventDefault()
    const fd = new FormData(e.target)
    const email = fd.get('email')
    if(usuarios.find(u=>u.email===email)){ showToast('Email já cadastrado'); return }
    const novo = {
      id: Date.now().toString(),
      tipo: tipoCadastro,
      nome: fd.get('nome'),
      email,
      senha: fd.get('senha'),
      cpf: fd.get('cpf'),
      telefone: fd.get('telefone'),
      whatsapp: fd.get('whatsapp'),
      cidade: fd.get('cidade'),
      endereco: fd.get('endereco'),
      status: tipoCadastro==='MONTADOR' ? 'PENDENTE' : 'ATIVO',
      chave_pix: fd.get('chave_pix')||'',
      municipios: fd.get('municipios')||'',
      created_at: new Date().toISOString()
    }
    setUsuarios([...usuarios, novo])
    safeInsert('usuarios', { tipo:novo.tipo, nome:novo.nome, email:novo.email, senha_hash:novo.senha, cpf:novo.cpf, telefone:novo.telefone, whatsapp:novo.whatsapp, cidade:novo.cidade, status:novo.status })
    setUser(novo)
    showToast('Cadastro realizado!')
    setView(novo.tipo==='CLIENTE' ? 'cliente' : 'montador')
  }

  function handleLogin(e){
    e.preventDefault()
    const fd = new FormData(e.target)
    const email = fd.get('email'), senha = fd.get('senha')
    if(email==='AndreSousa84' || email==='andre@contatocertosp.com.br'){
      if(senha==='Contato@2026SP' || senha==='AndreSousa84'){ 
        const admin = { id:'admin', tipo:'ADMIN', nome:'Andre Sousa', email }
        setUser(admin); setView('admin'); showToast('Admin logado'); return
      }
    }
    const u = usuarios.find(x=>x.email===email && x.senha===senha)
    if(!u){ showToast('Login inválido'); return }
    if(u.status==='BLOQUEADO'){ showToast('Usuário bloqueado'); return }
    setUser(u)
    setView(u.tipo==='CLIENTE' ? 'cliente' : u.tipo==='MONTADOR' ? 'montador' : 'admin')
  }

  function criarPedido(){
    if(!novoPedido.servico_id){ showToast('Selecione o serviço'); return }
    const serv = SERVICOS.find(s=>s.id===novoPedido.servico_id)
    const valor = serv.preco * novoPedido.quantidade
    const pedido = {
      id: Date.now().toString(),
      numero: Math.floor(100000 + Math.random()*900000),
      cliente_id: user.id,
      cliente_nome: user.nome,
      servico_id: serv.id,
      categoria: serv.categoria,
      movel: serv.movel,
      tipo: serv.tipo,
      caracteristicas: serv.caracteristicas,
      servico: serv.servico,
      quantidade: novoPedido.quantidade,
      valor_bruto: valor,
      comissao: Math.round(valor*COMISSAO),
      valor_liquido: Math.round(valor*(1-COMISSAO)),
      cidade: novoPedido.cidade,
      cep: novoPedido.cep,
      bairro: novoPedido.bairro,
      rua: novoPedido.rua,
      numero: novoPedido.numero,
      complemento: novoPedido.complemento,
      data: novoPedido.data,
      horario: novoPedido.horario,
      observacoes: novoPedido.observacoes,
      marca: novoPedido.marca,
      status: 'AGUARDANDO_PAGAMENTO',
      created_at: new Date().toISOString(),
      historico: [{status:'AGUARDANDO_PAGAMENTO', data:new Date().toISOString(), desc:'Pedido criado'}]
    }
    const novos = [...pedidos, pedido]
    setPedidos(novos)
    safeInsert('pedidos', { cliente_id:user.id, servico_id:serv.id, cidade:pedido.cidade, valor_bruto:valor, status:'AGUARDANDO_PAGAMENTO' })
    showToast('Pedido criado! Nº '+pedido.numero)
    setView('pagamento')
    setNovoPedido(p=>({...p, _ultimo: pedido}))
  }

  function copiarPix(){
    navigator.clipboard.writeText(PIX_OFICIAL)
    showToast('Chave PIX copiada: '+PIX_OFICIAL)
  }

  function enviarComprovante(pedido){
    const p = pedido || novoPedido._ultimo
    if(!p) return
    const msg = `Olá! Estou enviando o comprovante de pagamento do pedido Nº ${p.numero}.%0ACliente: ${p.cliente_nome}%0AServiço: ${p.categoria} - ${p.movel}%0AValor: R$ ${p.valor_bruto}%0ACidade: ${p.cidade}`
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank')
    // atualiza status
    const atual = pedidos.map(x=> x.id===p.id ? {...x, status:'COMPROVANTE_ENVIADO', historico:[...x.historico, {status:'COMPROVANTE_ENVIADO', data:new Date().toISOString(), desc:'Comprovante enviado'}]} : x)
    setPedidos(atual)
    showToast('Comprovante enviado! Aguarde confirmação admin')
  }

  function confirmarPagamentoAdmin(id){
    const atual = pedidos.map(p=> p.id===id ? {...p, status:'PROCURANDO_MONTADOR', tempo_aceite_inicio:new Date().toISOString(), historico:[...p.historico, {status:'CONFIRMADO', data:new Date().toISOString(), desc:'Pagamento confirmado pelo admin'}, {status:'PROCURANDO_MONTADOR', data:new Date().toISOString(), desc:'Entrando na fila de montadores'}]} : p)
    setPedidos(atual)
    showToast('Pagamento confirmado! Pedido na fila')
  }

  function aceitarPedido(id){
    const pedido = pedidos.find(p=>p.id===id)
    if(!pedido || pedido.status!=='PROCURANDO_MONTADOR'){ showToast('Este serviço acabou de ser aceito por outro montador.'); return }
    // lock otimista
    const atual = pedidos.map(p=> p.id===id ? {...p, status:'ACEITO', montador_id:user.id, montador_nome:user.nome, historico:[...p.historico, {status:'ACEITO', data:new Date().toISOString(), desc:`Aceito por ${user.nome}`}]} : p)
    setPedidos(atual)
    showToast('Serviço aceito com sucesso!')
  }

  const servicosFiltrados = SERVICOS.filter(s=>{
    const b = normalize(busca)
    if(!b) return true
    const txt = normalize(`${s.categoria} ${s.movel} ${s.tipo} ${s.caracteristicas} ${s.servico}`)
    return txt.includes(b)
  }).filter(s=> categoriaFiltro==='Todas' || s.categoria===categoriaFiltro)

  const meusPedidos = pedidos.filter(p=>p.cliente_id===user?.id)
  const pedidosDisponiveis = pedidos.filter(p=> p.status==='PROCURANDO_MONTADOR' && (user?.status==='APROVADO' || user?.tipo==='ADMIN') && (!cidadeFiltro || p.cidade===cidadeFiltro))

  return (
    <div style={{minHeight:'100vh', background:'#F5F7FA'}}>
      {/* HEADER */}
      <header style={{background:'#fff', padding:'12px 16px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, zIndex:50, boxShadow:'0 2px 10px rgba(0,0,0,.05)'}}>
        <div style={{display:'flex', alignItems:'center', gap:12}} onClick={handleLogoClick}>
          <img src="/logo.jpg" alt="logo" style={{width:42, height:42, borderRadius:10, objectFit:'cover'}} />
          <div>
            <div style={{fontWeight:800, color:'#0A2A6B', lineHeight:1}}>CONTATO CERTO SP</div>
            <div style={{fontSize:10, color:'#FF7A00', fontWeight:600}}>Seu montador no lugar certo</div>
          </div>
        </div>
        <div style={{display:'flex', gap:8}}>
          {!user && <>
            <button className="btn-primary" style={{padding:'8px 14px', fontSize:13}} onClick={()=>setView('login')}>Entrar</button>
            <button className="btn-orange" style={{padding:'8px 14px', fontSize:13}} onClick={()=>{setTipoCadastro('CLIENTE'); setView('cadastro')}}>Cadastrar</button>
          </>}
          {user && <><span style={{fontSize:12, alignSelf:'center'}}>{user.nome} • {supabaseStatus}</span><button onClick={()=>{setUser(null); localStorage.removeItem('ccsp_user'); setView('home')}} style={{marginLeft:8, background:'#eee', border:'none', borderRadius:8, padding:'6px 10px'}}>Sair</button></>}
        </div>
      </header>

      {toast && <div style={{position:'fixed', bottom:20, left:'50%', transform:'translateX(-50%)', background:'#0A2A6B', color:'#fff', padding:'12px 20px', borderRadius:12, zIndex:100, fontSize:14}}>{toast}</div>}

      {view==='home' && (
        <div style={{maxWidth:1100, margin:'0 auto', padding:'16px'}}>
          <div className="card" style={{padding:24, background:'linear-gradient(135deg, #0A2A6B 0%, #1a4db5 100%)', color:'#fff'}}>
            <h1 style={{fontSize:28, fontWeight:800, lineHeight:1.1}}>ENCONTRE UM MONTADOR DE MÓVEIS EM QUALQUER CIDADE DE SÃO PAULO</h1>
            <p style={{marginTop:12, opacity:.9}}>Informe o móvel que precisa montar, escolha o serviço e solicite atendimento. Após a confirmação do pagamento, seu pedido será disponibilizado para montadores aptos a atender sua região.</p>
            <div style={{display:'flex', gap:12, marginTop:20, flexWrap:'wrap'}}>
              <button className="btn-orange" onClick={()=>{setTipoCadastro('CLIENTE'); setView('cadastro')}}>🔧 ENCONTRAR MONTADOR</button>
              <button className="btn-primary" style={{background:'#fff', color:'#0A2A6B'}} onClick={()=>{setTipoCadastro('MONTADOR'); setView('cadastro')}}>👷 QUERO SER MONTADOR</button>
            </div>
            <div style={{marginTop:16, fontSize:12, display:'flex', gap:12, flexWrap:'wrap', opacity:.8}}>
              <span>✓ Atendimento em todo SP</span><span>✓ {CIDADES_SP.length} cidades</span><span>✓ Status em tempo real</span><span>✓ {SERVICOS.length} serviços</span>
            </div>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(140px,1fr))', gap:12, marginTop:16}}>
            {[['Escolha o serviço','Guarda-roupa, cozinha, cama...'],['Informe o local','Cidade, CEP, bairro'],['Data e horário','Escolha quando'],['PIX obrigatório','Chave oficial'],['Admin confirma','Libera fila'],['Montador aceita','10 min tempo real']].map(([t,d],i)=><div key={i} className="card" style={{padding:14}}><div style={{fontWeight:700, fontSize:13}}>{i+1}. {t}</div><div style={{fontSize:11, opacity:.7, marginTop:4}}>{d}</div></div>)}
          </div>

          <div style={{marginTop:24}}>
            <div style={{display:'flex', gap:10, flexWrap:'wrap', marginBottom:12}}>
              <input placeholder="Buscar: guarda roupa, cama, montagem..." value={busca} onChange={e=>setBusca(e.target.value)} style={{flex:1, minWidth:220, padding:'12px 16px', borderRadius:12, border:'1px solid #ddd'}} />
              <select value={categoriaFiltro} onChange={e=>setCategoriaFiltro(e.target.value)} style={{padding:'12px', borderRadius:12, border:'1px solid #ddd'}}>
                <option>Todas</option>{CATEGORIAS.map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px,1fr))', gap:12}}>
              {servicosFiltrados.slice(0,24).map(s=>(
                <div key={s.id} className="card" style={{padding:14, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div><div style={{fontWeight:600, fontSize:13}}>{s.categoria} - {s.movel}</div><div style={{fontSize:11, opacity:.7}}>{s.tipo} • {s.caracteristicas} • {s.servico}</div></div>
                  <div style={{fontWeight:800, color:'#FF7A00'}}>R$ {s.preco}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {view==='cadastro' && (
        <div style={{maxWidth:480, margin:'20px auto', padding:16}}>
          <div className="card" style={{padding:20}}>
            <h2 style={{fontWeight:700}}>Cadastro {tipoCadastro}</h2>
            <div style={{display:'flex', gap:8, margin:'12px 0'}}>
              <button onClick={()=>setTipoCadastro('CLIENTE')} className={tipoCadastro==='CLIENTE'?'btn-primary':'btn-orange'} style={{flex:1, background: tipoCadastro==='CLIENTE'?'#0A2A6B':'#eee', color: tipoCadastro==='CLIENTE'?'#fff':'#333'}}>Sou Cliente</button>
              <button onClick={()=>setTipoCadastro('MONTADOR')} className={tipoCadastro==='MONTADOR'?'btn-primary':'btn-orange'} style={{flex:1, background: tipoCadastro==='MONTADOR'?'#0A2A6B':'#eee', color: tipoCadastro==='MONTADOR'?'#fff':'#333'}}>Sou Montador</button>
            </div>
            <form onSubmit={handleCadastro} style={{display:'grid', gap:10}}>
              <input name="nome" required placeholder="Nome completo" style={{padding:12, borderRadius:10, border:'1px solid #ddd'}} />
              <input name="cpf" required placeholder="CPF" style={{padding:12, borderRadius:10, border:'1px solid #ddd'}} />
              <input name="telefone" required placeholder="Telefone" style={{padding:12, borderRadius:10, border:'1px solid #ddd'}} />
              <input name="whatsapp" required placeholder="WhatsApp" style={{padding:12, borderRadius:10, border:'1px solid #ddd'}} />
              <input name="email" type="email" required placeholder="E-mail" style={{padding:12, borderRadius:10, border:'1px solid #ddd'}} />
              <input name="senha" type="password" required placeholder="Senha" style={{padding:12, borderRadius:10, border:'1px solid #ddd'}} />
              <select name="cidade" required style={{padding:12, borderRadius:10, border:'1px solid #ddd'}}>
                <option value="">Selecione sua cidade (645 disponíveis)</option>
                {CIDADES_SP.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
              <input name="endereco" placeholder="Endereço" style={{padding:12, borderRadius:10, border:'1px solid #ddd'}} />
              {tipoCadastro==='MONTADOR' && <>
                <input name="chave_pix" required placeholder="Chave PIX para receber" style={{padding:12, borderRadius:10, border:'1px solid #ddd'}} />
                <input name="municipios" placeholder="Municípios que atende (separados por vírgula)" style={{padding:12, borderRadius:10, border:'1px solid #ddd'}} />
              </>}
              <button type="submit" className="btn-orange">Criar conta e entrar</button>
              <button type="button" onClick={()=>setView('login')} style={{background:'none', border:'none', color:'#0A2A6B', fontSize:13}}>Já tenho conta</button>
            </form>
          </div>
        </div>
      )}

      {view==='login' && (
        <div style={{maxWidth:400, margin:'20px auto', padding:16}}>
          <div className="card" style={{padding:20}}>
            <h2>Login</h2>
            <form onSubmit={handleLogin} style={{display:'grid', gap:12, marginTop:12}}>
              <input name="email" required placeholder="E-mail ou AndreSousa84 (admin)" style={{padding:12, borderRadius:10, border:'1px solid #ddd'}} />
              <input name="senha" type="password" required placeholder="Senha" style={{padding:12, borderRadius:10, border:'1px solid #ddd'}} />
              <button className="btn-primary">Entrar</button>
              <div style={{fontSize:11, opacity:.6}}>Admin: AndreSousa84 / Contato@2026SP • Toque 5x na logo para acesso discreto</div>
            </form>
          </div>
        </div>
      )}

      {view==='cliente' && user && (
        <div style={{maxWidth:1000, margin:'0 auto', padding:16}}>
          <h2>Painel Cliente - {user.nome}</h2>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(120px,1fr))', gap:10, margin:'12px 0'}}>
            <div className="card" style={{padding:12, textAlign:'center'}}><div style={{fontSize:20, fontWeight:800}}>{meusPedidos.length}</div><div style={{fontSize:11}}>Total</div></div>
            <div className="card" style={{padding:12, textAlign:'center'}}><div style={{fontSize:20, fontWeight:800}}>{meusPedidos.filter(p=>p.status==='AGUARDANDO_PAGAMENTO').length}</div><div style={{fontSize:11}}>Aguard. Pagamento</div></div>
            <div className="card" style={{padding:12, textAlign:'center'}}><div style={{fontSize:20, fontWeight:800}}>{meusPedidos.filter(p=>p.status==='PROCURANDO_MONTADOR').length}</div><div style={{fontSize:11}}>Procurando Montador</div></div>
            <div className="card" style={{padding:12, textAlign:'center'}}><div style={{fontSize:20, fontWeight:800}}>{meusPedidos.filter(p=>p.status==='CONCLUIDO').length}</div><div style={{fontSize:11}}>Concluídos</div></div>
          </div>

          <div className="card" style={{padding:16, marginTop:12}}>
            <h3>Novo Pedido</h3>
            <div style={{display:'grid', gap:10, marginTop:10}}>
              <select value={novoPedido.servico_id} onChange={e=>setNovoPedido({...novoPedido, servico_id:e.target.value})} style={{padding:12, borderRadius:10, border:'1px solid #ddd'}}>
                <option value="">Selecione o serviço ({SERVICOS.length} disponíveis)</option>
                {SERVICOS.map(s=><option key={s.id} value={s.id}>{s.categoria} - {s.movel} - {s.tipo} - R$ {s.preco}</option>)}
              </select>
              <div style={{display:'flex', gap:8}}>
                <input type="number" min="1" value={novoPedido.quantidade} onChange={e=>setNovoPedido({...novoPedido, quantidade:parseInt(e.target.value)||1})} style={{width:80, padding:12, borderRadius:10, border:'1px solid #ddd'}} />
                <input placeholder="CEP" value={novoPedido.cep} onChange={e=>setNovoPedido({...novoPedido, cep:e.target.value})} style={{flex:1, padding:12, borderRadius:10, border:'1px solid #ddd'}} />
                <select value={novoPedido.cidade} onChange={e=>setNovoPedido({...novoPedido, cidade:e.target.value})} style={{flex:1, padding:12, borderRadius:10, border:'1px solid #ddd'}}>
                  <option value="">Cidade</option>{CIDADES_SP.map(c=><option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div style={{display:'flex', gap:8}}>
                <input placeholder="Bairro" value={novoPedido.bairro} onChange={e=>setNovoPedido({...novoPedido, bairro:e.target.value})} style={{flex:1, padding:12, borderRadius:10, border:'1px solid #ddd'}} />
                <input placeholder="Rua" value={novoPedido.rua} onChange={e=>setNovoPedido({...novoPedido, rua:e.target.value})} style={{flex:1, padding:12, borderRadius:10, border:'1px solid #ddd'}} />
                <input placeholder="Nº" value={novoPedido.numero} onChange={e=>setNovoPedido({...novoPedido, numero:e.target.value})} style={{width:80, padding:12, borderRadius:10, border:'1px solid #ddd'}} />
              </div>
              <div style={{display:'flex', gap:8}}>
                <input type="date" value={novoPedido.data} onChange={e=>setNovoPedido({...novoPedido, data:e.target.value})} style={{flex:1, padding:12, borderRadius:10, border:'1px solid #ddd'}} />
                <input type="time" value={novoPedido.horario} onChange={e=>setNovoPedido({...novoPedido, horario:e.target.value})} style={{flex:1, padding:12, borderRadius:10, border:'1px solid #ddd'}} />
              </div>
              <textarea placeholder="Observações, marca, modelo" value={novoPedido.observacoes} onChange={e=>setNovoPedido({...novoPedido, observacoes:e.target.value})} style={{padding:12, borderRadius:10, border:'1px solid #ddd'}} />
              <button className="btn-orange" onClick={criarPedido}>Criar pedido - validar preço oficial</button>
            </div>
          </div>

          <div style={{marginTop:16}}>
            <h3>Meus Pedidos</h3>
            <div style={{display:'grid', gap:10, marginTop:10}}>
              {meusPedidos.map(p=>(
                <div key={p.id} className="card" style={{padding:12}}>
                  <div style={{display:'flex', justifyContent:'space-between'}}><b>#{p.numero} - {p.categoria}</b><span className="badge" style={{background:'#0A2A6B', color:'#fff'}}>{p.status}</span></div>
                  <div style={{fontSize:12, marginTop:6}}>{p.movel} • {p.cidade} • R$ {p.valor_bruto} • {p.data} {p.horario}</div>
                  <div style={{fontSize:11, marginTop:6, opacity:.7}}>{p.historico?.map(h=>`${h.status} ${new Date(h.data).toLocaleTimeString()}`).join(' → ')}</div>
                  {p.status==='AGUARDANDO_PAGAMENTO' && <button className="btn-orange" style={{marginTop:8, padding:'8px 12px', fontSize:12}} onClick={()=>{setNovoPedido(p=>({...p, _ultimo: p})); setView('pagamento')}}>Pagar PIX</button>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {view==='pagamento' && (
        <div style={{maxWidth:500, margin:'20px auto', padding:16}}>
          <div className="card" style={{padding:20, textAlign:'center'}}>
            <h2>Pagamento PIX Obrigatório</h2>
            <div style={{background:'#F5F7FA', padding:16, borderRadius:12, margin:'16px 0'}}>
              <div style={{fontSize:12}}>Chave PIX oficial:</div>
              <div style={{fontWeight:800, fontSize:16, margin:'8px 0', wordBreak:'break-all'}}>{PIX_OFICIAL}</div>
              <button className="btn-primary" onClick={copiarPix}>📋 COPIAR CHAVE PIX</button>
            </div>
            <div style={{textAlign:'left', fontSize:13, background:'#fff7ed', padding:12, borderRadius:10, border:'1px solid #FF7A00'}}>
              Pedido: <b>#{novoPedido._ultimo?.numero}</b><br/>Valor: <b>R$ {novoPedido._ultimo?.valor_bruto}</b><br/>Cliente: {novoPedido._ultimo?.cliente_nome}<br/>Cidade: {novoPedido._ultimo?.cidade}
            </div>
            <button className="btn-orange" style={{width:'100%', marginTop:16}} onClick={()=>enviarComprovante()}>📲 ENVIAR COMPROVANTE NO WHATSAPP</button>
            <div style={{fontSize:11, marginTop:10, opacity:.6}}>WhatsApp admin: (18) 99148-8302 • Pedido ficará bloqueado até confirmação manual</div>
            <button style={{marginTop:12, background:'none', border:'none', color:'#0A2A6B'}} onClick={()=>setView('cliente')}>Voltar ao painel</button>
          </div>
        </div>
      )}

      {view==='montador' && user && (
        <div style={{maxWidth:1000, margin:'0 auto', padding:16}}>
          <h2>Painel Montador - {user.nome} - Status: {user.status}</h2>
          {user.status!=='APROVADO' && <div className="card" style={{padding:12, marginTop:12, background:'#fff7ed'}}>Aguardando aprovação do administrador. Você não pode receber pedidos ainda.</div>}
          <div style={{marginTop:16}}>
            <h3>Pedidos Disponíveis (tempo real - 10 min para aceitar)</h3>
            <select value={cidadeFiltro} onChange={e=>setCidadeFiltro(e.target.value)} style={{padding:10, borderRadius:10, border:'1px solid #ddd', margin:'10px 0'}}>
              <option value="">Todas cidades</option>{CIDADES_SP.map(c=><option key={c} value={c}>{c}</option>)}
            </select>
            <div style={{display:'grid', gap:10}}>
              {pedidosDisponiveis.map(p=>{
                const inicio = p.tempo_aceite_inicio ? new Date(p.tempo_aceite_inicio).getTime() : Date.now()
                const diff = Math.max(0, 600 - Math.floor((Date.now()-inicio)/1000))
                const mm = String(Math.floor(diff/60)).padStart(2,'0')
                const ss = String(diff%60).padStart(2,'0')
                return (
                  <div key={p.id} className="card" style={{padding:14}}>
                    <div style={{display:'flex', justifyContent:'space-between'}}><b>#{p.numero} - {p.categoria} - {p.movel}</b><span style={{color: diff<60?'red':'#0A2A6B', fontWeight:700}}>{mm}:{ss}</span></div>
                    <div style={{fontSize:12, marginTop:6}}>{p.cidade} • {p.data} {p.horario} • Bruto R$ {p.valor_bruto} • Líquido R$ {p.valor_liquido} (10% comissão)</div>
                    <div style={{display:'flex', gap:8, marginTop:10}}>
                      <button className="btn-orange" onClick={()=>aceitarPedido(p.id)}>ACEITAR SERVIÇO</button>
                      <button className="btn-primary" style={{background:'#eee', color:'#333'}} onClick={()=>showToast('Recusado')}>Recusar</button>
                    </div>
                  </div>
                )
              })}
              {pedidosDisponiveis.length===0 && <div style={{fontSize:13, opacity:.6}}>Nenhum pedido disponível para sua cidade. Pedidos só aparecem após pagamento confirmado.</div>}
            </div>

            <h3 style={{marginTop:20}}>Meus Aceitos</h3>
            <div style={{display:'grid', gap:10, marginTop:10}}>
              {pedidos.filter(p=>p.montador_id===user.id).map(p=>(
                <div key={p.id} className="card" style={{padding:12}}>
                  <div style={{display:'flex', justifyContent:'space-between'}}><b>#{p.numero}</b><span>{p.status}</span></div>
                  <div style={{fontSize:12}}>{p.cidade} - {p.rua}, {p.numero}</div>
                  <div style={{display:'flex', gap:8, marginTop:8}}>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.rua+' '+p.numero+' '+p.cidade)}`} target="_blank" rel="noreferrer" style={{background:'#0A2A6B', color:'#fff', padding:'6px 10px', borderRadius:8, fontSize:12, textDecoration:'none'}}>Abrir Google Maps</a>
                    <a href={`https://waze.com/ul?q=${encodeURIComponent(p.rua+' '+p.numero+' '+p.cidade)}`} target="_blank" rel="noreferrer" style={{background:'#33ccff', color:'#fff', padding:'6px 10px', borderRadius:8, fontSize:12, textDecoration:'none'}}>Abrir Waze</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {view==='admin' && (
        <div style={{maxWidth:1100, margin:'0 auto', padding:16}}>
          <h2>Admin - {supabaseStatus}</h2>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(140px,1fr))', gap:10, margin:'12px 0'}}>
            <div className="card" style={{padding:12}}><div style={{fontSize:18, fontWeight:800}}>{usuarios.filter(u=>u.tipo==='CLIENTE').length}</div><div style={{fontSize:11}}>Clientes</div></div>
            <div className="card" style={{padding:12}}><div style={{fontSize:18, fontWeight:800}}>{usuarios.filter(u=>u.tipo==='MONTADOR').length}</div><div style={{fontSize:11}}>Montadores</div></div>
            <div className="card" style={{padding:12}}><div style={{fontSize:18, fontWeight:800}}>{pedidos.filter(p=>p.status==='AGUARDANDO_PAGAMENTO').length}</div><div style={{fontSize:11}}>Aguard. Pag</div></div>
            <div className="card" style={{padding:12}}><div style={{fontSize:18, fontWeight:800}}>{pedidos.filter(p=>p.status==='COMPROVANTE_ENVIADO').length}</div><div style={{fontSize:11}}>Comprovantes</div></div>
            <div className="card" style={{padding:12}}><div style={{fontSize:18, fontWeight:800}}>{pedidos.filter(p=>p.status==='PROCURANDO_MONTADOR').length}</div><div style={{fontSize:11}}>Na fila</div></div>
          </div>

          <div className="card" style={{padding:14, marginTop:12}}>
            <h3>Supabase SQL - Rode no Dashboard &gt; SQL Editor</h3>
            <pre style={{fontSize:10, background:'#0A2A6B', color:'#fff', padding:10, borderRadius:8, overflow:'auto', maxHeight:200}}>{`create extension if not exists "pgcrypto";
-- copie todo schema.sql de /supabase/schema.sql
-- depois rode inserts de cidades e servicos`}</pre>
            <a href="/supabase/schema.sql" target="_blank" style={{fontSize:12}}>Abrir schema.sql</a>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:12}}>
            <div className="card" style={{padding:12}}>
              <h4>Montadores Pendentes</h4>
              {usuarios.filter(u=>u.tipo==='MONTADOR' && u.status==='PENDENTE').map(u=>(
                <div key={u.id} style={{display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #eee', fontSize:12}}>
                  <span>{u.nome} - {u.cidade} - PIX {u.chave_pix}</span>
                  <button className="btn-primary" style={{padding:'4px 8px', fontSize:11}} onClick={()=>{ setUsuarios(usuarios.map(x=> x.id===u.id ? {...x, status:'APROVADO'}:x)); showToast('Aprovado')}}>Aprovar</button>
                </div>
              ))}
            </div>
            <div className="card" style={{padding:12}}>
              <h4>Pagamentos para Confirmar</h4>
              {pedidos.filter(p=>['COMPROVANTE_ENVIADO','AGUARDANDO_PAGAMENTO'].includes(p.status)).map(p=>(
                <div key={p.id} style={{padding:'8px 0', borderBottom:'1px solid #eee', fontSize:12}}>
                  <div>#{p.numero} - {p.cliente_nome} - R$ {p.valor_bruto} - {p.cidade} - {p.status}</div>
                  <button className="btn-orange" style={{padding:'4px 8px', fontSize:11, marginTop:4}} onClick={()=>confirmarPagamentoAdmin(p.id)}>CONFIRMAR PAGAMENTO - Liberar fila</button>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{padding:12, marginTop:12}}>
            <h4>Todos Pedidos</h4>
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%', fontSize:11, borderCollapse:'collapse'}}>
                <thead><tr style={{background:'#F5F7FA'}}><th>Nº</th><th>Cliente</th><th>Serviço</th><th>Cidade</th><th>Valor</th><th>Status</th><th>Montador</th></tr></thead>
                <tbody>{pedidos.map(p=><tr key={p.id} style={{borderBottom:'1px solid #eee'}}><td>{p.numero}</td><td>{p.cliente_nome}</td><td>{p.categoria}</td><td>{p.cidade}</td><td>R$ {p.valor_bruto}</td><td>{p.status}</td><td>{p.montador_nome||'-'}</td></tr>)}</tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {showAdminLogin && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100}}>
          <div className="card" style={{padding:20, width:320}}>
            <h3>Login Admin Discreto</h3>
            <form onSubmit={(e)=>{ e.preventDefault(); const fd=new FormData(e.target); const email=fd.get('email'), senha=fd.get('senha'); if((email==='AndreSousa84'||email==='andre@contatocertosp.com.br')&&(senha==='Contato@2026SP'||senha==='AndreSousa84')){ setUser({id:'admin', tipo:'ADMIN', nome:'Andre'}); setView('admin'); setShowAdminLogin(false); showToast('Admin OK')} else showToast('Inválido') }} style={{display:'grid', gap:10, marginTop:10}}>
              <input name="email" placeholder="Usuário" style={{padding:10, borderRadius:8, border:'1px solid #ddd'}} />
              <input name="senha" type="password" placeholder="Senha" style={{padding:10, borderRadius:8, border:'1px solid #ddd'}} />
              <button className="btn-primary">Entrar</button>
              <button type="button" onClick={()=>setShowAdminLogin(false)} style={{background:'none', border:'none', fontSize:12}}>Fechar</button>
            </form>
          </div>
        </div>
      )}

      <footer style={{background:'#0A2A6B', color:'#fff', padding:24, marginTop:40, textAlign:'center', fontSize:12}}>
        <img src="/logo.jpg" style={{width:40, height:40, borderRadius:8}} alt="logo" /><div style={{fontWeight:800, marginTop:8}}>CONTATO CERTO SP</div><div>Conectando clientes a montadores em todo o Estado de São Paulo.</div><div style={{marginTop:8}}>WhatsApp: (18) 99148-8302 • PIX: {PIX_OFICIAL} • {CIDADES_SP.length} cidades • {SERVICOS.length} serviços</div>
      </footer>
    </div>
  )
}
