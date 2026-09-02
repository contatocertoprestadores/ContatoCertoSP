
import React, { useState, useRef } from 'react'
import { NOVO_CATALOGO } from './lib/novoCatalogo.js'
import { CIDADES_SP } from './lib/cidades.js'

const PIX = 'contatocerto.prestadores@gmail.com'
const WHATSAPP = '5518991488302'

function normalize(s){ return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim() }

export default function App(){
  const [view,setView]=useState('home')
  const [catSel,setCatSel]=useState(null)
  const [movelSel,setMovelSel]=useState(null)
  const [servSel,setServSel]=useState(null)
  const [busca,setBusca]=useState('')
  const [filtro,setFiltro]=useState('Todas')
  const [user,setUser]=useState(()=>{try{return JSON.parse(localStorage.getItem('ccsp_user')||'null')}catch{return null}})
  const [pedidos,setPedidos]=useState(()=>{try{return JSON.parse(localStorage.getItem('ccsp_pedidos')||'[]')}catch{return []}})
  const [usuarios,setUsuarios]=useState(()=>{try{return JSON.parse(localStorage.getItem('ccsp_usuarios')||'[]')}catch{return []}})
  const [toast,setToast]=useState('')
  const [form,setForm]=useState({cidade:'',bairro:'',rua:'',numero:'',data:'',horario:''})
  const [fotosMoveis,setFotosMoveis]=useState([])
  const [fotoPerfil,setFotoPerfil]=useState(null)
  const [tipoCadastro,setTipoCadastro]=useState('CLIENTE')
  const [adminClicks,setAdminClicks]=useState(0)
  const [showAdmin,setShowAdmin]=useState(false)
  const lastClick=useRef(0)

  function t(msg){ setToast(msg); setTimeout(()=>setToast(''),3000) }
  function handleLogo(){ const now=Date.now(); if(now-lastClick.current>3000) setAdminClicks(1); else setAdminClicks(c=>c+1); lastClick.current=now; if(adminClicks+1>=5){ setShowAdmin(true); setAdminClicks(0) } }
  function handleFotos(e){ const files=Array.from(e.target.files); if(files.length+fotosMoveis.length>3){ t('Máximo 3 fotos'); return } files.forEach(file=>{ if(file.size>5*1024*1024){ t('Foto muito grande (max 5MB)'); return } const reader=new FileReader(); reader.onload=(ev)=>{ setFotosMoveis(prev=>[...prev,{id:Date.now()+Math.random(),name:file.name,data:ev.target.result}]) }; reader.readAsDataURL(file); }) }
  function handleFotoPerfil(e){ const file=e.target.files[0]; if(!file) return; if(file.size>5*1024*1024){ t('Foto muito grande'); return } const reader=new FileReader(); reader.onload=(ev)=> setFotoPerfil(ev.target.result); reader.readAsDataURL(file) }

  function criarPedido(){
    if(!movelSel||!servSel){ t('Selecione serviço'); return }
    if(!form.cidade){ t('Informe cidade'); return }
    const valorNum = servSel==='novo'?movelSel.novoNum:servSel==='usado'?movelSel.usadoNum:movelSel.desmontarNum
    const valorTxt = servSel==='novo'?movelSel.novo:servSel==='usado'?movelSel.usado:movelSel.desmontar
    const pedido={ id:Date.now().toString(), numero:Math.floor(100000+Math.random()*900000), cliente_id:user.id, cliente_nome:user.nome, categoria:catSel.categoria, movel_nome:movelSel.nome, servico_tipo:servSel, servico_label:servSel==='novo'?'Montar Novo':servSel==='usado'?'Montar Usado':'Desmontar', valor_txt:valorTxt, valor_num:valorNum, valor_bruto:valorNum, comissao:Math.round(valorNum*0.10), valor_liquido:Math.round(valorNum*0.90), cidade:form.cidade, bairro:form.bairro, rua:form.rua, numero_end:form.numero, data:form.data, horario:form.horario, fotos:fotosMoveis.map(f=>f.data), status:'AGUARDANDO_PAGAMENTO', created_at:new Date().toISOString() }
    const novos=[...pedidos,pedido]; setPedidos(novos); localStorage.setItem('ccsp_pedidos',JSON.stringify(novos)); setMovelSel({...movelSel,_ultimo:pedido}); setFotosMoveis([]); setView('pagamento'); t('Pedido #'+pedido.numero+' criado!')
  }

  const buscaNorm=normalize(busca)
  const moveisBusca=buscaNorm?NOVO_CATALOGO.flatMap(c=>c.moveis.filter(m=>normalize(m.nome).includes(buscaNorm)||normalize(c.categoria).includes(buscaNorm)).map(m=>({...m,categoria:c.categoria,icone:c.icone}))):null
  const catsFiltradas=NOVO_CATALOGO.filter(c=>filtro==='Todas'||c.categoria===filtro)

  return (
    <div style={{minHeight:'100vh',background:'#F5F7FA',fontFamily:'Poppins'}}>
      <header style={{background:'#fff',padding:'12px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',position:'sticky',top:0,zIndex:50,boxShadow:'0 2px 10px rgba(0,0,0,.05)'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}} onClick={handleLogo}>
          <img src="/logo.jpg" alt="logo" style={{width:42,height:42,borderRadius:12,objectFit:'cover',background:'#fff'}} />
          <div><div style={{fontWeight:800,color:'#0A2A6B',fontSize:13}}>CONTATO CERTO SP</div><div style={{fontSize:9,color:'#FF7A00',fontWeight:600}}>Seu montador no lugar certo</div></div>
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          {!user && <><button onClick={()=>setView('login')} style={{background:'#0A2A6B',color:'#fff',border:'none',borderRadius:8,padding:'8px 12px',fontSize:12}}>Entrar</button><button onClick={()=>{setTipoCadastro('CLIENTE'); setView('cadastro')}} style={{background:'#FF7A00',color:'#fff',border:'none',borderRadius:8,padding:'8px 12px',fontSize:12}}>Cadastro</button></>}
          {user && <><span style={{fontSize:11}}>{user.nome}</span><button onClick={()=>{setUser(null);localStorage.removeItem('ccsp_user');setView('home')}} style={{background:'#eee',border:'none',borderRadius:8,padding:'6px 10px',fontSize:11}}>Sair</button></>}
        </div>
      </header>

      {toast && <div style={{position:'fixed',bottom:20,left:'50%',transform:'translateX(-50%)',background:'#0A2A6B',color:'#fff',padding:'12px 20px',borderRadius:12,zIndex:200,fontSize:13}}>{toast}</div>}

      {view==='home' && (
        <div style={{maxWidth:1100,margin:'0 auto',padding:16}}>
          {!user && (
            <div style={{background:'#fff',borderRadius:16,padding:20,textAlign:'center',border:'2px solid #FF7A00',marginBottom:16}}>
              <h2 style={{fontSize:18,color:'#0A2A6B'}}>Para continuar, faça seu cadastro obrigatório</h2>
              <p style={{fontSize:12,opacity:.7,marginTop:4}}>Escolha seu perfil para acessar o catálogo completo</p>
              <div style={{display:'flex',gap:12,marginTop:16,justifyContent:'center',flexWrap:'wrap'}}>
                <button onClick={()=>{setTipoCadastro('CLIENTE'); setView('cadastro')}} style={{background:'#0A2A6B',color:'#fff',padding:'20px 30px',borderRadius:12,border:'none',fontWeight:700,fontSize:16,cursor:'pointer'}}>👤 Sou Cliente</button>
                <button onClick={()=>{setTipoCadastro('MONTADOR'); setView('cadastro')}} style={{background:'#FF7A00',color:'#fff',padding:'20px 30px',borderRadius:12,border:'none',fontWeight:700,fontSize:16,cursor:'pointer'}}>🔧 Sou Montador</button>
              </div>
              <div style={{marginTop:12}}><span onClick={()=>setView('login')} style={{color:'#0A2A6B',fontSize:13,cursor:'pointer',textDecoration:'underline'}}>Já tenho cadastro</span></div>
            </div>
          )}

          <div style={{background:'linear-gradient(135deg,#0A2A6B 0%,#1a4db5 100%)',color:'#fff',borderRadius:16,padding:24}}>
            <h1 style={{fontSize:22,fontWeight:800}}>ENCONTRE UM MONTADOR EM QUALQUER CIDADE DE SP</h1>
            <p style={{marginTop:8,fontSize:13,opacity:.9}}>Catálogo profissional: categoria → móvel (sem preço) → escolha serviço com valor exato.</p>
          </div>
          <div style={{marginTop:16,display:'flex',gap:8,flexWrap:'wrap'}}>
            <input placeholder="Buscar móvel: guarda roupa, cama, rack..." value={busca} onChange={e=>setBusca(e.target.value)} style={{flex:1,minWidth:220,padding:'12px 16px',borderRadius:12,border:'1px solid #ddd'}}/>
            <select value={filtro} onChange={e=>setFiltro(e.target.value)} style={{padding:'12px',borderRadius:12,border:'1px solid #ddd'}}>
              <option>Todas</option>{NOVO_CATALOGO.map(c=><option key={c.categoria} value={c.categoria}>{c.icone} {c.categoria}</option>)}
            </select>
          </div>
          {moveisBusca ? (
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:10,marginTop:16}}>
              {moveisBusca.map(m=>(
                <div key={m.id} style={{background:'#fff',borderRadius:16,padding:14,display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer',boxShadow:'0 4px 20px rgba(10,42,107,.08)'}} onClick={()=>{ if(!user){ t('Faça cadastro para continuar'); setView('cadastro'); return } setCatSel({categoria:m.categoria}); setMovelSel(m); setServSel(null);}}>
                  <div><div style={{fontWeight:600,fontSize:13}}>{m.icone} {m.nome}</div><div style={{fontSize:10,background:'#E8EDF5',padding:'4px 8px',borderRadius:20,display:'inline-block',marginTop:4}}>{m.categoria}</div></div>
                  <div style={{color:'#FF7A00',fontWeight:700,fontSize:12}}>Selecionar ▸</div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:12,marginTop:16}}>
                {catsFiltradas.map(cat=>(
                  <div key={cat.categoria} style={{background:'#fff',borderRadius:16,padding:16,textAlign:'center',cursor:'pointer',boxShadow:'0 4px 20px rgba(10,42,107,.08)'}} onClick={()=>{ if(!user){ t('Faça cadastro obrigatório'); setView('cadastro'); return } setCatSel(cat); setBusca('');}}>
                    <div style={{fontSize:32}}>{cat.icone}</div><div style={{fontWeight:700,fontSize:13,marginTop:8}}>{cat.categoria}</div><div style={{fontSize:11,opacity:.6,marginTop:4}}>{cat.moveis.length} móveis</div>
                  </div>
                ))}
              </div>
              {catSel && (
                <div style={{background:'#fff',borderRadius:16,padding:16,marginTop:20}}>
                  <div style={{display:'flex',justifyContent:'space-between'}}><h3>{catSel.icone} {catSel.categoria}</h3><button onClick={()=>setCatSel(null)} style={{background:'#eee',border:'none',borderRadius:8,padding:'6px 10px',fontSize:11}}>Fechar</button></div>
                  <div style={{display:'grid',gap:8,marginTop:12}}>
                    {catSel.moveis.map(m=>(
                      <div key={m.id} style={{background:'#F5F7FA',borderRadius:12,padding:12,display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer'}} onClick={()=>{setMovelSel(m); setServSel(null);}}>
                        <div><div style={{fontWeight:600,fontSize:13}}>▸ {m.nome}</div><div style={{fontSize:10,background:'#E8EDF5',padding:'4px 8px',borderRadius:20,display:'inline-block',marginTop:4}}>{catSel.categoria}</div></div>
                        <div style={{background:'#0A2A6B',color:'#fff',padding:'6px 12px',borderRadius:8,fontSize:11,fontWeight:600}}>Selecionar</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {movelSel && !movelSel._ultimo && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:100,padding:16}} onClick={()=>{setMovelSel(null); setServSel(null);}}>
          <div style={{background:'#fff',borderRadius:20,padding:20,maxWidth:480,width:'100%',maxHeight:'90vh',overflowY:'auto'}} onClick={e=>e.stopPropagation()}>
            <div style={{display:'flex',justifyContent:'space-between'}}><h3>{movelSel.nome}</h3><button onClick={()=>{setMovelSel(null); setServSel(null);}} style={{background:'#eee',border:'none',borderRadius:8,padding:'6px 10px'}}>X</button></div>
            <div style={{marginTop:16,fontWeight:700}}>Escolha o serviço:</div>
            <div onClick={()=>setServSel('novo')} style={{border:'2px solid '+(servSel==='novo'?'#FF7A00':'#E8EDF5'),background:servSel==='novo'?'#fff7ed':'#fff',borderRadius:12,padding:14,marginTop:10,cursor:'pointer'}}><div style={{display:'flex',justifyContent:'space-between'}}><span><input type="radio" checked={servSel==='novo'} readOnly/> Montar Novo</span><b style={{color:'#FF7A00'}}>{movelSel.novo}</b></div></div>
            <div onClick={()=>setServSel('usado')} style={{border:'2px solid '+(servSel==='usado'?'#FF7A00':'#E8EDF5'),background:servSel==='usado'?'#fff7ed':'#fff',borderRadius:12,padding:14,marginTop:10,cursor:'pointer'}}><div style={{display:'flex',justifyContent:'space-between'}}><span><input type="radio" checked={servSel==='usado'} readOnly/> Montar Usado</span><b style={{color:'#FF7A00'}}>{movelSel.usado}</b></div></div>
            <div onClick={()=>setServSel('desmontar')} style={{border:'2px solid '+(servSel==='desmontar'?'#FF7A00':'#E8EDF5'),background:servSel==='desmontar'?'#fff7ed':'#fff',borderRadius:12,padding:14,marginTop:10,cursor:'pointer'}}><div style={{display:'flex',justifyContent:'space-between'}}><span><input type="radio" checked={servSel==='desmontar'} readOnly/> Desmontar</span><b style={{color:'#FF7A00'}}>{movelSel.desmontar}</b></div></div>
            {servSel && <div style={{marginTop:16,background:'#F5F7FA',padding:14,borderRadius:12}}><div style={{fontWeight:800}}>{movelSel.nome} - {servSel==='novo'?'Montar Novo':servSel==='usado'?'Montar Usado':'Desmontar'}</div><div style={{fontWeight:800,fontSize:22,color:'#FF7A00',marginTop:6}}>{servSel==='novo'?movelSel.novo:servSel==='usado'?movelSel.usado:movelSel.desmontar}</div></div>}
            <button onClick={()=>{ if(!user){ setView('cadastro'); t('Faça cadastro para continuar'); return } const el=document.getElementById('endereco-form'); if(el) el.scrollIntoView({behavior:'smooth'}) }} disabled={!servSel} style={{width:'100%',marginTop:16,background:'#FF7A00',color:'#fff',border:'none',borderRadius:12,padding:'14px',fontWeight:700,opacity:servSel?1:0.5}}>{servSel ? `Confirmar serviço - ${servSel==='novo'?movelSel.novo:servSel==='usado'?movelSel.usado:movelSel.desmontar}` : 'Selecione um serviço'}</button>
            {user && user.tipo==='CLIENTE' && servSel && (
              <div id="endereco-form" style={{marginTop:20,borderTop:'1px solid #eee',paddingTop:16}}>
                <h4>Endereço do serviço</h4>
                <div style={{display:'grid',gap:8,marginTop:10}}>
                  <select value={form.cidade} onChange={e=>setForm({...form,cidade:e.target.value})} style={{padding:12,borderRadius:10,border:'1px solid #ddd'}}><option value="">Cidade (645 disponíveis)</option>{CIDADES_SP.map(c=><option key={c} value={c}>{c}</option>)}</select>
                  <div style={{display:'flex',gap:8}}><input placeholder="Bairro" value={form.bairro} onChange={e=>setForm({...form,bairro:e.target.value})} style={{flex:1,padding:12,borderRadius:10,border:'1px solid #ddd'}}/><input placeholder="Rua" value={form.rua} onChange={e=>setForm({...form,rua:e.target.value})} style={{flex:1,padding:12,borderRadius:10,border:'1px solid #ddd'}}/></div>
                  <div style={{display:'flex',gap:8}}><input placeholder="Nº" value={form.numero} onChange={e=>setForm({...form,numero:e.target.value})} style={{width:80,padding:12,borderRadius:10,border:'1px solid #ddd'}}/><input type="date" value={form.data} onChange={e=>setForm({...form,data:e.target.value})} style={{flex:1,padding:12,borderRadius:10,border:'1px solid #ddd'}}/><input type="time" value={form.horario} onChange={e=>setForm({...form,horario:e.target.value})} style={{flex:1,padding:12,borderRadius:10,border:'1px solid #ddd'}}/></div>
                  <div style={{marginTop:8,border:'2px dashed #E8EDF5',borderRadius:12,padding:12}}><label style={{fontWeight:700,fontSize:13}}>📸 Foto do móvel (opcional)</label><input type="file" accept="image/*" multiple onChange={handleFotos} style={{marginTop:6,width:'100%'}}/><div style={{display:'flex',gap:8,marginTop:8,flexWrap:'wrap'}}>{fotosMoveis.map(f=>(<div key={f.id} style={{position:'relative'}}><img src={f.data} style={{width:80,height:80,borderRadius:8,objectFit:'cover'}}/><button onClick={()=>setFotosMoveis(fotosMoveis.filter(x=>x.id!==f.id))} style={{position:'absolute',top:-6,right:-6,background:'#ff4444',color:'#fff',border:'none',borderRadius:'50%',width:20,height:20,fontSize:10}}>X</button></div>))}</div></div>
                  <button onClick={criarPedido} style={{background:'#0A2A6B',color:'#fff',border:'none',borderRadius:12,padding:'12px',fontWeight:600}}>Criar pedido</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {view==='cadastro' && (
        <div style={{maxWidth:500,margin:'20px auto',padding:16}}>
          <div style={{background:'#fff',borderRadius:16,padding:20}}>
            <h2>Cadastro Obrigatório</h2>
            <form onSubmit={(e)=>{
              e.preventDefault(); const fd=new FormData(e.target); const email=fd.get('email'); if(usuarios.find(u=>u.email===email)){ t('Email já cadastrado'); return }
              const tipo=fd.get('tipo')
              if(tipo==='MONTADOR'){ if(!fd.get('cidade_atende')){ t('Cidade que atende obrigatória'); return } if(!fd.get('chave_pix')){ t('Chave PIX obrigatória para montador'); return } if(!fotoPerfil){ t('Foto de perfil obrigatória'); return } }
              const novo={ id:Date.now().toString(), tipo:tipo, nome:fd.get('nome'), email, senha:fd.get('senha'), cidade:fd.get('cidade'), cidade_atende:fd.get('cidade_atende')||'', telefone:fd.get('telefone')||'', chave_pix:fd.get('chave_pix')||'', foto_perfil:fotoPerfil, status:tipo==='MONTADOR'?'PENDENTE':'ATIVO' }
              const novos=[...usuarios,novo]; setUsuarios(novos); localStorage.setItem('ccsp_usuarios',JSON.stringify(novos)); setFotoPerfil(null); t('Cadastro realizado! Faça login'); setView('login')
            }} style={{display:'grid',gap:10,marginTop:12}}>
              <select name="tipo" value={tipoCadastro} onChange={e=>setTipoCadastro(e.target.value)} style={{padding:12,borderRadius:10,border:'1px solid #ddd'}}><option value="CLIENTE">Sou Cliente</option><option value="MONTADOR">Sou Montador</option></select>
              <input name="nome" required placeholder="Nome completo" style={{padding:12,borderRadius:10,border:'1px solid #ddd'}}/>
              <input name="email" required placeholder="E-mail" style={{padding:12,borderRadius:10,border:'1px solid #ddd'}}/>
              <input name="senha" required type="password" placeholder="Senha" style={{padding:12,borderRadius:10,border:'1px solid #ddd'}}/>
              <input name="telefone" placeholder="WhatsApp/Telefone" style={{padding:12,borderRadius:10,border:'1px solid #ddd'}}/>
              <select name="cidade" required style={{padding:12,borderRadius:10,border:'1px solid #ddd'}}><option value="">Cidade onde mora (645)</option>{CIDADES_SP.map(c=><option key={c} value={c}>{c}</option>)}</select>
              {tipoCadastro==='MONTADOR' && (
                <div style={{display:'grid',gap:10,background:'#fff7ed',padding:12,borderRadius:10,border:'1px solid #FF7A00'}}>
                  <div style={{fontWeight:700,fontSize:12}}>Campos obrigatórios para Montador</div>
                  <select name="cidade_atende" required style={{padding:12,borderRadius:10,border:'1px solid #ddd'}}><option value="">Cidade que atende (obrigatório)</option>{CIDADES_SP.map(c=><option key={c} value={c}>{c}</option>)}</select>
                  <div><label style={{fontSize:12,fontWeight:600}}>📸 Foto de perfil (obrigatório - galeria)</label><input type="file" accept="image/*" onChange={handleFotoPerfil} style={{marginTop:6,width:'100%'}}/>{fotoPerfil && <img src={fotoPerfil} style={{width:80,height:80,borderRadius:50,marginTop:8,objectFit:'cover'}}/>}</div>
                  <input name="chave_pix" required placeholder="Chave PIX no seu próprio nome (obrigatório)" style={{padding:12,borderRadius:10,border:'1px solid #ddd'}}/>
                  <div style={{fontSize:10,opacity:.6}}>A chave PIX deve estar no seu nome para receber os valores</div>
                </div>
              )}
              <button style={{background:'#FF7A00',color:'#fff',border:'none',borderRadius:12,padding:'14px',fontWeight:700}}>Finalizar Cadastro</button>
              <div style={{textAlign:'center'}}><span onClick={()=>setView('login')} style={{color:'#0A2A6B',fontSize:12,cursor:'pointer',textDecoration:'underline'}}>Já tenho cadastro</span></div>
            </form>
          </div>
        </div>
      )}

      {view==='login' && (
        <div style={{maxWidth:400,margin:'20px auto',padding:16}}>
          <div style={{background:'#fff',borderRadius:16,padding:20}}>
            <h2>Entrar</h2>
            <form onSubmit={(e)=>{ e.preventDefault(); const fd=new FormData(e.target); const email=fd.get('email'), senha=fd.get('senha'); if((email==='AndreSousa84'||email==='andre@contatocertosp.com.br')&&senha==='Contato@2026SP'){ const admin={id:'admin',tipo:'ADMIN',nome:'Andre'}; setUser(admin); localStorage.setItem('ccsp_user',JSON.stringify(admin)); setView('admin'); return } const u=usuarios.find(x=>x.email===email&&x.senha===senha); if(!u){ t('E-mail ou senha inválidos'); return } setUser(u); localStorage.setItem('ccsp_user',JSON.stringify(u)); if(u.tipo==='CLIENTE') setView('home'); else if(u.tipo==='MONTADOR') setView('montador'); else setView('admin'); t('Bem-vindo '+u.nome); }} style={{display:'grid',gap:10,marginTop:12}}>
              <input name="email" placeholder="E-mail" style={{padding:12,borderRadius:10,border:'1px solid #ddd'}}/>
              <input name="senha" type="password" placeholder="Senha" style={{padding:12,borderRadius:10,border:'1px solid #ddd'}}/>
              <button style={{background:'#0A2A6B',color:'#fff',border:'none',borderRadius:12,padding:'12px'}}>Entrar</button>
              <div style={{textAlign:'center'}}><span onClick={()=>{setTipoCadastro('CLIENTE'); setView('cadastro')}} style={{color:'#0A2A6B',fontSize:12,cursor:'pointer',textDecoration:'underline'}}>Ainda não tenho cadastro</span></div>
            </form>
          </div>
        </div>
      )}

      {view==='pagamento' && movelSel && movelSel._ultimo && (
        <div style={{maxWidth:480,margin:'20px auto',padding:16}}>
          <div style={{background:'#fff',borderRadius:16,padding:20,textAlign:'center'}}>
            <h3>Pagamento PIX</h3>
            <div style={{background:'#F5F7FA',padding:16,borderRadius:12,margin:'16px 0'}}>
              <div style={{fontSize:12}}>Chave PIX oficial (só aparece aqui):</div>
              <div style={{fontWeight:800,wordBreak:'break-all'}}>{PIX}</div>
              <button onClick={()=>{navigator.clipboard.writeText(PIX); t('PIX copiado!')}} style={{marginTop:10,background:'#0A2A6B',color:'#fff',border:'none',borderRadius:8,padding:'8px 12px'}}>📋 COPIAR CHAVE PIX</button>
            </div>
            <div style={{textAlign:'left',fontSize:13,background:'#fff7ed',padding:12,borderRadius:10}}>Pedido #{movelSel._ultimo.numero}<br/>{movelSel._ultimo.movel_nome} - {movelSel._ultimo.servico_label}<br/>Valor: <b>{movelSel._ultimo.valor_txt}</b><br/>Cidade: {movelSel._ultimo.cidade}</div>
            <button onClick={()=>{ const p=movelSel._ultimo; const msg=`Olá! Enviando comprovante pedido Nº ${p.numero}. Cliente: ${p.cliente_nome} Serviço: ${p.movel_nome} - ${p.servico_label} Valor: ${p.valor_txt} Cidade: ${p.cidade}`; window.open(`https://wa.me/${WHATSAPP}?text=${msg}`,'_blank'); const novos=pedidos.map(x=>x.id===p.id?{...x,status:'COMPROVANTE_ENVIADO'}:x); setPedidos(novos); localStorage.setItem('ccsp_pedidos',JSON.stringify(novos)); t('Comprovante enviado!') }} style={{width:'100%',marginTop:16,background:'#FF7A00',color:'#fff',border:'none',borderRadius:12,padding:'14px',fontWeight:700}}>📲 ENVIAR COMPROVANTE WHATSAPP</button>
            <button onClick={()=>setView('home')} style={{background:'none',border:'none',marginTop:12,color:'#0A2A6B'}}>Voltar</button>
          </div>
        </div>
      )}

      {view==='cliente' && user && (
        <div style={{maxWidth:800,margin:'0 auto',padding:16}}><h2>Meu Painel - Cliente</h2><p>Olá {user.nome}!</p><button onClick={()=>setView('home')} style={{marginTop:10,background:'#0A2A6B',color:'#fff',border:'none',borderRadius:8,padding:'8px 12px'}}>Ver Catálogo e Fazer Pedido</button>
        <div style={{marginTop:16}}>{pedidos.filter(p=>p.cliente_id===user.id).map(p=>(<div key={p.id} style={{background:'#fff',padding:12,borderRadius:10,marginBottom:8}}><div>#{p.numero} {p.movel_nome} {p.valor_txt} - {p.status}</div>{p.fotos&&p.fotos.length>0&&<div>📸 {p.fotos.length} foto(s)</div>}</div>))}</div></div>
      )}

      {view==='montador' && user && (
        <div style={{maxWidth:800,margin:'0 auto',padding:16}}><h2>Painel Montador - {user.nome}</h2><div style={{background:'#fff',padding:12,borderRadius:10,marginBottom:12,display:'flex',gap:10,alignItems:'center'}}>{user.foto_perfil&&<img src={user.foto_perfil} style={{width:50,height:50,borderRadius:25}}/>}<div><div>{user.nome}</div><div style={{fontSize:11}}>Atende: {user.cidade_atende} | PIX: {user.chave_pix}</div></div></div><div>{pedidos.filter(p=>p.status==='PROCURANDO_MONTADOR').map(p=>(<div key={p.id} style={{background:'#fff',padding:12,borderRadius:10,marginBottom:8}}><div>#{p.numero} {p.movel_nome} {p.valor_txt} {p.cidade}</div>{p.fotos&&p.fotos.length>0&&<div style={{display:'flex',gap:6,marginTop:6}}>{p.fotos.map((f,i)=><img key={i} src={f} style={{width:60,height:60,borderRadius:8,objectFit:'cover'}}/>)}</div>}<button onClick={()=>{ if(pedidos.find(x=>x.id===p.id).status!=='PROCURANDO_MONTADOR'){ t('Este serviço acabou de ser aceito por outro montador.'); return } const novos=pedidos.map(x=>x.id===p.id?{...x,status:'ACEITO',montador_id:user.id}:x); setPedidos(novos); localStorage.setItem('ccsp_pedidos',JSON.stringify(novos)); t('Pedido aceito!') }} style={{marginTop:8,background:'#FF7A00',color:'#fff',border:'none',borderRadius:8,padding:'6px 12px',fontSize:11}}>ACEITAR</button></div>))}</div></div>
      )}

      <button style={{position:'fixed',bottom:80,right:20,zIndex:90,background:'#0A2A6B',color:'#fff',borderRadius:50,padding:'12px 18px',boxShadow:'0 4px 20px rgba(0,0,0,.3)',display:'flex',alignItems:'center',gap:8,fontSize:13,fontWeight:600,border:'none',cursor:'pointer'}} onClick={()=>t('App em breve na Play Store! Use pelo navegador e adicione à tela inicial')}>📲 Baixar App</button>

      <footer style={{background:'#0A2A6B',color:'#fff',padding:24,marginTop:40,textAlign:'center',fontSize:11}}><div style={{fontWeight:800}}>CONTATO CERTO SP</div><div>Atendimento: (18) 99148-8302 • 645 cidades SP • 77 móveis</div></footer>
    </div>
  )
}
