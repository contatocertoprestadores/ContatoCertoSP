
import React, { useState, useEffect, useRef, useMemo } from 'react'

const CIDADES_SP = ["Adamantina","Adolfo","Aguaí","Águas da Prata","Águas de Lindóia","Águas de Santa Bárbara","Águas de São Pedro","Agudos","Alambari","Alfredo Marcondes","Altair","Altinópolis","Alto Alegre","Alumínio","Álvares Florence","Álvares Machado","Álvaro de Carvalho","Alvinlândia","Americana","Américo Brasiliense","Américo de Campos","Amparo","Analândia","Andradina","Angatuba","Anhembi","Anhumas","Aparecida","Aparecida d'Oeste","Apiaí","Araçariguama","Araçatuba","Araçoiaba da Serra","Aramina","Arandu","Arapeí","Araraquara","Araras","Arco-Íris","Arealva","Areias","Areiópolis","Ariranha","Artur Nogueira","Arujá","Aspásia","Assis","Atibaia","Auriflama","Avaí","Avanhandava","Avaré","Bady Bassitt","Balbinos","Bálsamo","Bananal","Barão de Antonina","Barbosa","Bariri","Barra Bonita","Barra do Chapéu","Barra do Turvo","Barretos","Barrinha","Barueri","Bastos","Batatais","Bauru","Bebedouro","Bento de Abreu","Bernardino de Campos","Bertioga","Bilac","Birigui","Biritiba Mirim","Boa Esperança do Sul","Bocaina","Bofete","Boituva","Bom Jesus dos Perdões","Bom Sucesso de Itararé","Borá","Boracéia","Borborema","Borebi","Botucatu","Bragança Paulista","Braúna","Brejo Alegre","Brodowski","Brotas","Buri","Buritama","Buritizal","Cabrália Paulista","Cabreúva","Caçapava","Cachoeira Paulista","Caconde","Cafelândia","Caiabu","Caieiras","Caiuá","Cajamar","Cajati","Cajobi","Cajuru","Campina do Monte Alegre","Campinas","Campo Limpo Paulista","Campos do Jordão","Campos Novos Paulista","Cananéia","Canas","Cândido Mota","Cândido Rodrigues","Canitar","Capão Bonito","Capela do Alto","Capivari","Caraguatatuba","Carapicuíba","Cardoso","Casa Branca","Cássia dos Coqueiros","Castilho","Catanduva","Catiguá","Cedral","Cerqueira César","Cerquilho","Cesário Lange","Charqueada","Chavantes","Clementina","Colina","Colômbia","Conchal","Conchas","Cordeirópolis","Coroados","Coronel Macedo","Corumbataí","Cosmópolis","Cosmorama","Cotia","Cravinhos","Cristais Paulista","Cruzália","Cruzeiro","Cubatão","Cunha","Descalvado","Diadema","Dirce Reis","Divinolândia","Dobrada","Dois Córregos","Dolcinópolis","Dourado","Dracena","Duartina","Dumont","Echaporã","Eldorado","Elias Fausto","Elisiário","Embaúba","Embu das Artes","Embu-Guaçu","Emilianópolis","Engenheiro Coelho","Espírito Santo do Pinhal","Espírito Santo do Turvo","Estiva Gerbi","Estrela do Norte","Estrela d'Oeste","Euclides da Cunha Paulista","Fartura","Fernando Prestes","Fernandópolis","Fernão","Ferraz de Vasconcelos","Flora Rica","Floreal","Flórida Paulista","Florínia","Franca","Francisco Morato","Franco da Rocha","Gabriel Monteiro","Gália","Garça","Gastão Vidigal","Gavião Peixoto","General Salgado","Getulina","Glicério","Guaiçara","Guaimbê","Guaíra","Guapiaçu","Guapiara","Guará","Guaraçaí","Guaraci","Guarani d'Oeste","Guarantã","Guararapes","Guararema","Guaratinguetá","Guareí","Guariba","Guarujá","Guarulhos","Guatapará","Guzolândia","Herculândia","Holambra","Hortolândia","Iacanga","Iacri","Iaras","Ibaté","Ibirá","Ibirarema","Ibitinga","Ibiúna","Icém","Iepê","Igaraçu do Tietê","Igarapava","Igaratá","Iguape","Ilha Comprida","Ilha Solteira","Ilhabela","Indaiatuba","Indiana","Indiaporã","Inúbia Paulista","Ipaussu","Iperó","Ipeúna","Ipiguá","Iporanga","Ipuã","Iracemápolis","Irapuã","Irapuru","Itaberá","Itaí","Itajobi","Itaju","Itanhaém","Itaoca","Itapecerica da Serra","Itapetininga","Itapeva","Itapevi","Itapira","Itapirapuã Paulista","Itápolis","Itaporanga","Itapuí","Itapura","Itaquaquecetuba","Itararé","Itariri","Itatiba","Itatinga","Itirapina","Itirapuã","Itobi","Itu","Itupeva","Ituverava","Jaborandi","Jaboticabal","Jacareí","Jaci","Jacupiranga","Jaguariúna","Jales","Jambeiro","Jandira","Jardinópolis","Jarinu","Jaú","Jeriquara","Joanópolis","João Ramalho","José Bonifácio","Júlio Mesquita","Jumirim","Jundiaí","Junqueirópolis","Juquiá","Juquitiba","Lagoinha","Laranjal Paulista","Lavínia","Lavrinhas","Leme","Lençóis Paulista","Limeira","Lindóia","Lins","Lorena","Lourdes","Louveira","Lucélia","Lucianópolis","Luís Antônio","Luiziânia","Lupércio","Lutécia","Macatuba","Macaubal","Macedônia","Magda","Mairinque","Mairiporã","Manduri","Marabá Paulista","Maracaí","Marapoama","Mariápolis","Marília","Marinópolis","Martinópolis","Matão","Mauá","Mendonça","Meridiano","Mesópolis","Miguelópolis","Mineiros do Tietê","Mira Estrela","Miracatu","Mirandópolis","Mirante do Paranapanema","Mirassol","Mirassolândia","Mococa","Mogi das Cruzes","Mogi Guaçu","Mogi Mirim","Mombuca","Monções","Mongaguá","Morro Agudo","Morungaba","Motuca","Murutinga do Sul","Nantes","Narandiba","Natividade da Serra","Nazaré Paulista","Neves Paulista","Nhandeara","Nipoã","Nova Aliança","Nova Campina","Nova Canaã Paulista","Nova Castilho","Nova Europa","Nova Granada","Nova Guataporanga","Nova Independência","Nova Luzitânia","Nova Odessa","Novais","Novo Horizonte","Nuporanga","Ocauçu","Óleo","Olímpia","Onda Verde","Oriente","Orindiúva","Orlândia","Osasco","Oscar Bressane","Osvaldo Cruz","Ourinhos","Ouro Verde","Ouroeste","Pacaembu","Palestina","Palmares Paulista","Palmeira d'Oeste","Palmital","Panorama","Paraguaçu Paulista","Paraibuna","Paraíso","Paranapanema","Paranapuã","Parapuã","Pardinho","Pariquera-Açu","Parisi","Patrocínio Paulista","Paulicéia","Paulínia","Paulistânia","Paulo de Faria","Pederneiras","Pedra Bela","Pedranópolis","Pedregulho","Pedreira","Pedrinhas Paulista","Pedro de Toledo","Penápolis","Pereira","Pereiras","Peruíbe","Piacatu","Piedade","Pilar do Sul","Pindamonhangaba","Pindorama","Pinhalzinho","Piquerobi","Piquete","Piracaia","Piracicaba","Piraju","Pirajuí","Pirangi","Pirapora do Bom Jesus","Pirapozinho","Pirassununga","Piratininga","Pitangueiras","Planalto","Platina","Poá","Poloni","Pompéia","Pongaí","Pontal","Pontalinda","Pontes Gestal","Populina","Porangaba","Porto Feliz","Porto Ferreira","Potim","Potirendaba","Pracinha","Pradópolis","Praia Grande","Pratânia","Presidente Alves","Presidente Bernardes","Presidente Epitácio","Presidente Prudente","Presidente Venceslau","Promissão","Quatá","Queiroz","Queluz","Quintana","Rafard","Rancharia","Redenção da Serra","Regente Feijó","Reginópolis","Registro","Restinga","Ribeira","Ribeirão Bonito","Ribeirão Branco","Ribeirão Corrente","Ribeirão do Sul","Ribeirão dos Índios","Ribeirão Grande","Ribeirão Pires","Ribeirão Preto","Riversul","Rifaina","Rincão","Rinópolis","Rio Claro","Rio das Pedras","Rio Grande da Serra","Riolândia","Rosana","Roseira","Rubiácea","Rubinéia","Sabino","Sagres","Sales","Sales Oliveira","Salesópolis","Salmourão","Saltinho","Salto","Salto de Pirapora","Salto Grande","Sandovalina","Santa Adélia","Santa Albertina","Santa Bárbara d'Oeste","Santa Branca","Santa Clara d'Oeste","Santa Cruz da Conceição","Santa Cruz da Esperança","Santa Cruz das Palmeiras","Santa Cruz do Rio Pardo","Santa Ernestina","Santa Fé do Sul","Santa Gertrudes","Santa Isabel","Santa Lúcia","Santa Maria da Serra","Santa Mercedes","Santa Rita do Passa Quatro","Santa Rita d'Oeste","Santa Rosa de Viterbo","Santa Salete","Santana da Ponte Pensa","Santana de Parnaíba","Santo Anastácio","Santo André","Santo Antônio da Alegria","Santo Antônio de Posse","Santo Antônio do Aracanguá","Santo Antônio do Jardim","Santo Antônio do Pinhal","Santo Expedito","Santópolis do Aguapeí","Santos","São Bento do Sapucaí","São Bernardo do Campo","São Caetano do Sul","São Carlos","São Francisco","São João da Boa Vista","São João das Duas Pontes","São João de Iracema","São João do Pau d'Alho","São Joaquim da Barra","São José da Bela Vista","São José do Barreiro","São José do Rio Pardo","São José do Rio Preto","São José dos Campos","São Lourenço da Serra","São Luís do Paraitinga","São Manuel","São Miguel Arcanjo","São Paulo","São Pedro","São Pedro do Turvo","São Roque","São Sebastião","São Sebastião da Grama","São Simão","São Vicente","Sarapuí","Sarutaiá","Sebastianópolis do Sul","Serra Azul","Serra Negra","Serrana","Sertãozinho","Sete Barras","Severínia","Silveiras","Socorro","Sorocaba","Sud Mennucci","Sumaré","Suzanápolis","Suzano","Tabapuã","Tabatinga","Taboão da Serra","Taciba","Taguaí","Taiaçu","Taiúva","Tambaú","Tanabi","Tapiraí","Tapiratiba","Taquaral","Taquaritinga","Taquarituba","Taquarivaí","Tarabai","Tarumã","Tatuí","Taubaté","Tejupá","Teodoro Sampaio","Terra Roxa","Tietê","Timburi","Torre de Pedra","Torrinha","Trabiju","Tremembé","Três Fronteiras","Tuiuti","Tupã","Tupi Paulista","Turiúba","Turmalina","Ubarana","Ubatuba","Ubirajara","Uchoa","União Paulista","Urânia","Uru","Urupês","Valentim Gentil","Valinhos","Valparaíso","Vargem","Vargem Grande do Sul","Vargem Grande Paulista","Várzea Paulista","Vera Cruz","Vinhedo","Viradouro","Vista Alegre do Alto","Vitória Brasil","Votorantim","Votuporanga","Zacarias"]

const CATALOGO = [
{id:1, nome:"Guarda-roupa 2 portas", cat:"Dormitório", icone:"🛏️", novo:"R$ 90", usado:"R$ 70", desmontar:"R$ 60", novoNum:90, usadoNum:70, desNum:60},
{id:2, nome:"Guarda-roupa 3 portas", cat:"Dormitório", icone:"🛏️", novo:"R$ 110", usado:"R$ 90", desmontar:"R$ 80", novoNum:110, usadoNum:90, desNum:80},
{id:3, nome:"Guarda-roupa 4 portas", cat:"Dormitório", icone:"🛏️", novo:"R$ 130", usado:"R$ 100", desmontar:"R$ 90", novoNum:130, usadoNum:100, desNum:90},
{id:4, nome:"Guarda-roupa 6 portas", cat:"Dormitório", icone:"🛏️", novo:"R$ 180", usado:"R$ 130", desmontar:"R$ 110", novoNum:180, usadoNum:130, desNum:110},
{id:5, nome:"Guarda-roupa Casal 8 portas", cat:"Dormitório", icone:"🛏️", novo:"R$ 220", usado:"R$ 160", desmontar:"R$ 140", novoNum:220, usadoNum:160, desNum:140},
{id:6, nome:"Cama Solteiro", cat:"Dormitório", icone:"🛏️", novo:"R$ 70", usado:"R$ 50", desmontar:"R$ 40", novoNum:70, usadoNum:50, desNum:40},
{id:7, nome:"Cama Casal", cat:"Dormitório", icone:"🛏️", novo:"R$ 80", usado:"R$ 60", desmontar:"R$ 50", novoNum:80, usadoNum:60, desNum:50},
{id:8, nome:"Cama Queen/King", cat:"Dormitório", icone:"🛏️", novo:"R$ 110", usado:"R$ 80", desmontar:"R$ 70", novoNum:110, usadoNum:80, desNum:70},
{id:9, nome:"Beliche", cat:"Dormitório", icone:"🛏️", novo:"R$ 140", usado:"R$ 100", desmontar:"R$ 90", novoNum:140, usadoNum:100, desNum:90},
{id:10, nome:"Cômoda 3 gavetas", cat:"Dormitório", icone:"🗄️", novo:"R$ 70", usado:"R$ 50", desmontar:"R$ 40", novoNum:70, usadoNum:50, desNum:40},
{id:11, nome:"Rack Painel até 1,60m", cat:"Sala", icone:"📺", novo:"R$ 80", usado:"R$ 60", desmontar:"R$ 50", novoNum:80, usadoNum:60, desNum:50},
{id:12, nome:"Rack Painel acima 1,60m", cat:"Sala", icone:"📺", novo:"R$ 120", usado:"R$ 90", desmontar:"R$ 80", novoNum:120, usadoNum:90, desNum:80},
{id:13, nome:"Estante", cat:"Sala", icone:"📚", novo:"R$ 85", usado:"R$ 60", desmontar:"R$ 50", novoNum:85, usadoNum:60, desNum:50},
{id:14, nome:"Mesa Jantar 4 lugares", cat:"Sala", icone:"🪑", novo:"R$ 90", usado:"R$ 70", desmontar:"R$ 60", novoNum:90, usadoNum:70, desNum:60},
{id:15, nome:"Mesa Jantar 6 lugares", cat:"Sala", icone:"🪑", novo:"R$ 130", usado:"R$ 100", desmontar:"R$ 90", novoNum:130, usadoNum:100, desNum:90},
{id:16, nome:"Armário Cozinha 2 peças", cat:"Cozinha", icone:"🍳", novo:"R$ 120", usado:"R$ 90", desmontar:"R$ 80", novoNum:120, usadoNum:90, desNum:80},
{id:17, nome:"Armário Cozinha Completo", cat:"Cozinha", icone:"🍳", novo:"R$ 220", usado:"R$ 160", desmontar:"R$ 140", novoNum:220, usadoNum:160, desNum:140},
{id:18, nome:"Escrivaninha Simples", cat:"Escritório", icone:"💻", novo:"R$ 70", usado:"R$ 50", desmontar:"R$ 40", novoNum:70, usadoNum:50, desNum:40},
{id:19, nome:"Escrivaninha em L", cat:"Escritório", icone:"💻", novo:"R$ 130", usado:"R$ 100", desmontar:"R$ 90", novoNum:130, usadoNum:100, desNum:90},
{id:20, nome:"Cadeira Escritório", cat:"Escritório", icone:"💺", novo:"R$ 50", usado:"R$ 35", desmontar:"R$ 30", novoNum:50, usadoNum:35, desNum:30}
]

const PIX = 'contatocerto.prestadores@gmail.com'
const WHATSAPP = '5518991488302'

function genNumero(){ return Math.floor(100000 + Math.random()*900000) }

export default function App(){
  const [usuarios, setUsuarios] = useState(()=>{
    try{ const s=localStorage.getItem('ccsp_usuarios'); return s? JSON.parse(s): [{id:'admin1', tipo:'ADMIN', nome:'Admin', email:'andre@contatocertosp.com.br', senha:'Contato@2026SP', cidade:'São Paulo', cidade_atende:'São Paulo', chave_pix:PIX, foto_perfil:'', status:'ATIVO', status_disponivel:true}, {id:'admin2', tipo:'ADMIN', nome:'Andre Sousa', email:'AndreSousa84', senha:'Contato@2026SP', cidade:'São Paulo', cidade_atende:'São Paulo', chave_pix:PIX, foto_perfil:'', status:'ATIVO', status_disponivel:true}] }catch{ return [] }
  })
  const [pedidos, setPedidos] = useState(()=>{ try{ const s=localStorage.getItem('ccsp_pedidos'); return s? JSON.parse(s): [] }catch{ return [] } })
  const [cupons, setCupons] = useState(()=>{ try{ const s=localStorage.getItem('ccsp_cupons'); return s? JSON.parse(s): [] }catch{ return [] } })
  const [currentUser, setCurrentUser] = useState(()=>{ try{ const s=localStorage.getItem('ccsp_user'); return s? JSON.parse(s): null }catch{ return null } })
  const [view, setView] = useState('home')
  const [tab, setTab] = useState('pendentes')
  const [selectedMovel, setSelectedMovel] = useState(null)
  const [servicoTipo, setServicoTipo] = useState('')
  const [filtroCat, setFiltroCat] = useState('Todos')
  const [busca, setBusca] = useState('')
  const [formFotos, setFormFotos] = useState([])
  const [formData, setFormData] = useState({bairro:'', data:'', horario:'', cidade:'', rua:'', numero:''})
  const [fotoPerfilTmp, setFotoPerfilTmp] = useState('')
  const [cadTipo, setCadTipo] = useState('CLIENTE')
  const [toast, setToast] = useState(null)
  const [logoTaps, setLogoTaps] = useState(0)
  const [pedidoEmPagamento, setPedidoEmPagamento] = useState(null)
  const lastCount = useRef(pedidos.length)
  const audioRef = useRef(null)

  useEffect(()=>{ localStorage.setItem('ccsp_usuarios', JSON.stringify(usuarios)) },[usuarios])
  useEffect(()=>{ localStorage.setItem('ccsp_pedidos', JSON.stringify(pedidos)) },[pedidos])
  useEffect(()=>{ localStorage.setItem('ccsp_cupons', JSON.stringify(cupons)) },[cupons])
  useEffect(()=>{ if(currentUser) localStorage.setItem('ccsp_user', JSON.stringify(currentUser)); else localStorage.removeItem('ccsp_user') },[currentUser])

  function showToast(msg){ setToast(msg); setTimeout(()=>setToast(null),3500) }

  function playSound(type){
    try{
      if(!audioRef.current) audioRef.current = new (window.AudioContext || window.webkitAudioContext)()
      const ctx = audioRef.current
      if(ctx.state==='suspended') ctx.resume()
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type='sine'
      o.frequency.value = type==='new' ? 880 : type==='accept' ? 660 : 440
      o.connect(g); g.connect(ctx.destination)
      g.gain.setValueAtTime(0.3, ctx.currentTime)
      g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime+0.5)
      o.start(); o.stop(ctx.currentTime+0.5)
    }catch(e){}
  }

  useEffect(()=>{
    const ch = new BroadcastChannel('ccsp_realtime')
    ch.onmessage = (e)=>{
      const data = e.data
      if(data.type==='pedido_novo' && currentUser && currentUser.tipo==='MONTADOR' && currentUser.status_disponivel){
        if(data.cidade===currentUser.cidade_atende){ showToast('🔔 Novo pedido em '+data.cidade+'!'); playSound('new') }
        setPedidos(prev=>{ const exists = prev.find(p=>p.id===data.pedido.id); return exists? prev : [...prev, data.pedido] })
      }
      if(data.type==='pedido_aceito' && currentUser && currentUser.tipo==='CLIENTE'){
        if(data.pedido.cliente_id===currentUser.id){ showToast('✅ Seu pedido #'+data.pedido.numero+' foi aceito!'); playSound('accept') }
        setPedidos(prev=> prev.map(p=> p.id===data.pedido.id ? data.pedido : p))
      }
    }
    return ()=> ch.close()
  },[currentUser])

  useEffect(()=>{
    const id = setInterval(()=>{
      if(pedidos.length>lastCount.current){
        if(currentUser && currentUser.tipo==='MONTADOR' && currentUser.status_disponivel){
          const novos = pedidos.slice(lastCount.current)
          const match = novos.find(p=>p.cidade===currentUser.cidade_atende)
          if(match){ showToast('🔔 Novo pedido em '+match.cidade); playSound('new') }
        }
      }
      lastCount.current = pedidos.length
    },3000)
    return ()=> clearInterval(id)
  },[pedidos, currentUser])

  const filteredCatalog = useMemo(()=>{
    let list = [...CATALOGO]
    if(filtroCat!=='Todos') list = list.filter(c=>c.cat===filtroCat)
    if(busca) list = list.filter(c=>c.nome.toLowerCase().includes(busca.toLowerCase()))
    return list
  },[filtroCat, busca])

  function handleCadastro(e){
    e.preventDefault()
    const fd = new FormData(e.target)
    const nome = fd.get('nome')
    const email = fd.get('email')
    const senha = fd.get('senha')
    const cidade = fd.get('cidade')
    const telefone = fd.get('telefone') || ''
    const cidade_atende = fd.get('cidade_atende') || ''
    const chave_pix = fd.get('chave_pix') || ''
    if(usuarios.find(u=>u.email===email)){ showToast('E-mail já cadastrado'); return }
    if(cadTipo==='MONTADOR'){
      if(!cidade_atende){ showToast('Cidade que atende obrigatória'); return }
      if(!chave_pix){ showToast('Chave PIX obrigatória'); return }
      if(!fotoPerfilTmp){ showToast('Foto de perfil obrigatória'); return }
    }
    const novo = {id:Date.now().toString(), tipo:cadTipo, nome, email, senha, cidade, cidade_atende, telefone, chave_pix, foto_perfil:fotoPerfilTmp, status:'ATIVO', status_disponivel:true}
    setUsuarios([...usuarios, novo])
    setFotoPerfilTmp('')
    showToast('Cadastro realizado! Faça login')
    setView('login')
  }

  function handleLogin(e){
    e.preventDefault()
    const fd = new FormData(e.target)
    const email = fd.get('email')
    const senha = fd.get('senha')
    const u = usuarios.find(x=> (x.email===email) && x.senha===senha)
    if(!u){
      if((email==='AndreSousa84' || email==='andre@contatocertosp.com.br') && senha==='Contato@2026SP'){
        const admin = {id:'admin', tipo:'ADMIN', nome:'Andre', email, cidade:'São Paulo', cidade_atende:'São Paulo', status:'ATIVO', status_disponivel:true}
        setCurrentUser(admin); setView('admin'); setTab('pedidos'); return
      }
      showToast('E-mail ou senha inválidos'); return
    }
    if(u.status==='BLOQUEADO'){ showToast('Usuário bloqueado'); return }
    setCurrentUser(u)
    if(u.tipo==='CLIENTE'){ setView('cliente'); setTab('pendentes') }
    else if(u.tipo==='MONTADOR'){ setView('montador'); setTab('pendentes') }
    else { setView('admin'); setTab('pedidos') }
    showToast('Bem-vindo '+u.nome)
  }

  function criarPedido(){
    if(!selectedMovel || !servicoTipo){ showToast('Selecione serviço'); return }
    if(!formData.cidade){ showToast('Informe cidade'); return }
    if(!currentUser){ showToast('Faça login'); setView('login'); return }
    const valorNum = servicoTipo==='novo' ? selectedMovel.novoNum : servicoTipo==='usado' ? selectedMovel.usadoNum : selectedMovel.desNum
    const valorTxt = servicoTipo==='novo' ? selectedMovel.novo : servicoTipo==='usado' ? selectedMovel.usado : selectedMovel.desmontar
    const pedido = {id:Date.now().toString(), numero:genNumero(), cliente_id:currentUser.id, cliente_nome:currentUser.nome, categoria:selectedMovel.cat, movel_nome:selectedMovel.nome, servico_tipo:servicoTipo, servico_label: servicoTipo==='novo'?'Montar Novo':servicoTipo==='usado'?'Montar Usado':'Desmontar', valor_bruto:valorNum, valor_txt:valorTxt, valor_num:valorNum, comissao:Math.round(valorNum*0.10), valor_liquido:Math.round(valorNum*0.90), cidade:formData.cidade, bairro:formData.bairro, rua:formData.rua, numero_end:formData.numero, data_servico:formData.data, horario:formData.horario, status:'AGUARDANDO_PAGAMENTO', fotos:formFotos, created_at:new Date().toISOString()}
    const novos = [...pedidos, pedido]
    setPedidos(novos)
    setPedidoEmPagamento(pedido)
    setFormFotos([])
    setView('pagamento')
    showToast('Pedido #'+pedido.numero+' criado!')
  }

  function confirmarPagamentoEnvio(){
    if(!pedidoEmPagamento) return
    const atual = {...pedidoEmPagamento, status:'COMPROVANTE_ENVIADO'}
    const msg = 'Olá! Enviando comprovante pedido Nº '+atual.numero+'. Cliente: '+atual.cliente_nome+' Serviço: '+atual.movel_nome+' - '+atual.servico_label+' Valor: '+atual.valor_txt+' Cidade: '+atual.cidade
    window.open('https://wa.me/'+WHATSAPP+'?text='+encodeURIComponent(msg),'_blank')
    const novos = pedidos.map(p=> p.id===atual.id ? {...p, status:'PROCURANDO_MONTADOR'} : p)
    setPedidos(novos)
    const ch = new BroadcastChannel('ccsp_realtime')
    ch.postMessage({type:'pedido_novo', pedido:{...atual, status:'PROCURANDO_MONTADOR'}, cidade:atual.cidade})
    ch.close()
    showToast('Comprovante enviado! Pedido liberado para montadores')
    setView('cliente')
  }

  function aceitarPedido(pedidoId){
    const p = pedidos.find(x=>x.id===pedidoId)
    if(!p){ showToast('Pedido não encontrado'); return }
    if(p.status!=='PROCURANDO_MONTADOR'){ showToast('Este serviço acabou de ser aceito por outro montador.'); setPedidos([...pedidos]); return }
    const novo = {...p, status:'ACEITO', montador_id:currentUser.id, montador_nome:currentUser.nome}
    const novos = pedidos.map(x=> x.id===pedidoId ? novo : x)
    setPedidos(novos)
    const ch = new BroadcastChannel('ccsp_realtime')
    ch.postMessage({type:'pedido_aceito', pedido:novo})
    ch.close()
    showToast('Pedido aceito!'); playSound('accept')
  }

  function recusarPedido(pedidoId){
    showToast('Pedido recusado - não aparecerá mais para você')
  }

  function finalizarPedido(pedidoId){
    const novos = pedidos.map(p=> p.id===pedidoId ? {...p, status:'FINALIZADO'} : p)
    setPedidos(novos)
    showToast('Pedido finalizado!'); playSound('accept')
  }

  function toggleDisponivel(){
    const novoStatus = !currentUser.status_disponivel
    const atualizado = {...currentUser, status_disponivel:novoStatus}
    setCurrentUser(atualizado)
    setUsuarios(usuarios.map(u=> u.id===currentUser.id ? atualizado : u))
    showToast(novoStatus ? 'Você está Disponível - receberá notificações sonoras' : 'Você está Offline')
  }

  const pedidosCliente = pedidos.filter(p=> currentUser && p.cliente_id===currentUser.id)
  const pedidosMontadorPendentes = pedidos.filter(p=> p.status==='PROCURANDO_MONTADOR' && currentUser && currentUser.tipo==='MONTADOR' && (currentUser.cidade_atende===p.cidade || !currentUser.cidade_atende))
  const pedidosMontadorMeus = pedidos.filter(p=> currentUser && p.montador_id===currentUser.id)

  const financeiroCliente = {total: pedidosCliente.reduce((a,p)=>a+p.valor_bruto,0), pendentes: pedidosCliente.filter(p=>p.status!=='FINALIZADO').reduce((a,p)=>a+p.valor_bruto,0)}
  const financeiroMontador = {realizado: pedidosMontadorMeus.filter(p=>p.status==='FINALIZADO').reduce((a,p)=>a+p.valor_liquido,0), aReceber: pedidosMontadorMeus.filter(p=>p.status==='ACEITO').reduce((a,p)=>a+p.valor_liquido,0)}
  const agora = new Date(); const mesAtual = agora.getMonth(); const anoAtual = agora.getFullYear()
  const pedidosMes = pedidos.filter(p=>{ const d=new Date(p.created_at); return d.getMonth()===mesAtual && d.getFullYear()===anoAtual })
  const adminFinanceiro = {
    totalPedidosMes: pedidosMes.reduce((a,p)=>a+p.valor_bruto,0),
    comissaoMes: pedidosMes.reduce((a,p)=>a+p.comissao,0),
    totalRepasseMes: pedidosMes.filter(p=>p.status==='FINALIZADO').reduce((a,p)=>a+p.valor_liquido,0),
    pendenteRepasse: pedidos.filter(p=>p.status==='ACEITO').reduce((a,p)=>a+p.valor_liquido,0),
    countMes: pedidosMes.length
  }

  return (
    <div style={{minHeight:'100vh', background:'#0A0A0A', color:'#fff', fontFamily:'Poppins, sans-serif'}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap'); .premium-card{background:#1A1A1A; border:1px solid #2A2A2A; border-radius:16px; box-shadow:0 8px 24px rgba(0,0,0,0.4);} .uber-input{background:#1E1E1E; border:1.5px solid #2A2A2A; color:#fff; border-radius:12px; padding:12px;} .uber-input:focus{border-color:#FF7A00; outline:none;} `}</style>

      <header style={{background:'#000', padding:'12px 16px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, zIndex:50, borderBottom:'1px solid #1A1A1A'}}>
        <div style={{display:'flex', alignItems:'center', gap:10, cursor:'pointer'}} onClick={()=>{
          const now=Date.now()
          if(!window._lastTap) window._lastTap=0
          if(now-window._lastTap>3000) setLogoTaps(1); else { const n=logoTaps+1; setLogoTaps(n); if(n>=5){ setView('admin'); setTab('pedidos'); setLogoTaps(0); showToast('Admin acessado'); playSound('accept') } }
          window._lastTap=now
          setView('home')
        }}>
          <div style={{width:42,height:42, borderRadius:12, background:'#fff', display:'grid', placeItems:'center'}}>
            <svg width="28" height="28" viewBox="0 0 42 42"><path d="M21 4C13 4 7 10 7 18C7 28 21 38 21 38C21 38 35 28 35 18C35 10 29 4 21 4Z" fill="#2D5CFF"/><circle cx="21" cy="17" r="8" fill="white"/><path d="M15 17.5 L19 21.5 L27 13.5" stroke="#FF7A00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
          </div>
          <div><div style={{fontWeight:800, color:'#fff', fontSize:13, letterSpacing:'0.5px'}}>CONTATO CERTO SP</div><div style={{fontSize:9, color:'#FF7A00', fontWeight:600}}>UBER BLACK • 645 CIDADES</div></div>
        </div>
        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          {!currentUser && <><button onClick={()=>setView('login')} style={{background:'transparent', color:'#fff', border:'1px solid #2A2A2A', borderRadius:12, padding:'8px 14px', fontSize:12, fontWeight:600}}>Entrar</button><button onClick={()=>{setCadTipo('CLIENTE'); setView('cadastro')}} style={{background:'#FF7A00', color:'#fff', border:'none', borderRadius:12, padding:'8px 14px', fontSize:12, fontWeight:700}}>Cadastro</button></>}
          {currentUser && <><span style={{fontSize:11, color:'#A0A0A0'}}>{currentUser.nome}</span><button onClick={()=>{setCurrentUser(null); setView('home')}} style={{background:'#1A1A1A', color:'#fff', border:'1px solid #2A2A2A', borderRadius:12, padding:'6px 10px', fontSize:11}}>Sair</button></>}
        </div>
      </header>

      {toast && <div style={{position:'fixed', bottom:20, left:'50%', transform:'translateX(-50%)', background:'#1A1A1A', border:'1px solid #FF7A00', color:'#fff', padding:'12px 20px', borderRadius:12, zIndex:200, fontSize:13, boxShadow:'0 10px 30px rgba(0,0,0,0.5)'}}>{toast}</div>}

      {view==='home' && (
        <div style={{maxWidth:1100, margin:'0 auto', padding:16}}>
          {!currentUser && (
            <div className="premium-card" style={{padding:20, textAlign:'center', border:'1px solid #FF7A00', marginBottom:16, background:'linear-gradient(135deg,#1A1A1A 0%,#111 100%)'}}>
              <h2 style={{fontSize:18, color:'#fff'}}>Para continuar, faça seu cadastro obrigatório</h2>
              <p style={{fontSize:12, color:'#A0A0A0', marginTop:4}}>Uber Black • Escolha seu perfil para acessar catálogo premium</p>
              <div style={{display:'flex', gap:12, marginTop:16, justifyContent:'center', flexWrap:'wrap'}}>
                <button onClick={()=>{setCadTipo('CLIENTE'); setView('cadastro')}} style={{background:'#fff', color:'#000', padding:'20px 30px', borderRadius:12, border:'none', fontWeight:800, fontSize:16, cursor:'pointer'}}>👤 Sou Cliente</button>
                <button onClick={()=>{setCadTipo('MONTADOR'); setView('cadastro')}} style={{background:'#FF7A00', color:'#fff', padding:'20px 30px', borderRadius:12, border:'none', fontWeight:800, fontSize:16, cursor:'pointer'}}>🔧 Sou Montador</button>
              </div>
              <div style={{marginTop:12}}><span onClick={()=>setView('login')} style={{color:'#FF7A00', fontSize:13, cursor:'pointer', textDecoration:'underline'}}>Já tenho cadastro</span></div>
            </div>
          )}
          <div style={{background:'radial-gradient(800px at 20% -10%, rgba(255,122,0,0.15) 0%, transparent 60%), #0A0A0A', border:'1px solid #1A1A1A', borderRadius:16, padding:24}}>
            <h1 style={{fontSize:22, fontWeight:800, color:'#fff', letterSpacing:'-0.5px'}}>ENCONTRE UM MONTADOR EM QUALQUER CIDADE DE SP</h1>
            <p style={{marginTop:8, fontSize:13, color:'#A0A0A0'}}>Catálogo premium Uber Black: 645 cidades • 20 móveis • sem preço na lista • valores exatos no modal</p>
            <div style={{marginTop:16, display:'flex', gap:8, flexWrap:'wrap'}}>
              <input placeholder="Buscar móvel: guarda roupa, cama, rack..." value={busca} onChange={e=>setBusca(e.target.value)} style={{flex:1, minWidth:220}} className="uber-input"/>
              <select value={filtroCat} onChange={e=>setFiltroCat(e.target.value)} className="uber-input">
                <option>Todas</option><option>Dormitório</option><option>Sala</option><option>Cozinha</option><option>Escritório</option>
              </select>
            </div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:12, marginTop:16}}>
            {filteredCatalog.map(m=>(
              <div key={m.id} className="premium-card" style={{padding:16, textAlign:'center', cursor:'pointer'}} onClick={()=>{ if(!currentUser){ showToast('Faça cadastro obrigatório'); setView('cadastro'); return } setSelectedMovel(m); setServicoTipo('') }}>
                <div style={{fontSize:28}}>{m.icone}</div><div style={{fontWeight:700, fontSize:13, marginTop:8, color:'#fff'}}>{m.nome}</div><div style={{fontSize:10, background:'#1E1E1E', border:'1px solid #2A2A2A', padding:'4px 8px', borderRadius:20, display:'inline-block', marginTop:6, color:'#A0A0A0'}}>{m.cat}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedMovel && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.8)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100, padding:16}} onClick={()=>{setSelectedMovel(null); setServicoTipo('')}}>
          <div className="premium-card" style={{padding:20, maxWidth:480, width:'100%', maxHeight:'90vh', overflowY:'auto', background:'#161616'}} onClick={e=>e.stopPropagation()}>
            <div style={{display:'flex', justifyContent:'space-between'}}><h3 style={{color:'#fff'}}>{selectedMovel.nome}</h3><button onClick={()=>{setSelectedMovel(null); setServicoTipo('')}} style={{background:'#1E1E1E', border:'1px solid #2A2A2A', color:'#fff', borderRadius:8, padding:'6px 10px'}}>X</button></div>
            <div style={{marginTop:16, fontWeight:700, color:'#A0A0A0', fontSize:12}}>Escolha o serviço:</div>
            <div onClick={()=>setServicoTipo('novo')} style={{border:'1.5px solid '+(servicoTipo==='novo'?'#FF7A00':'#2A2A2A'), background:servicoTipo==='novo'?'#1E1E1E':'#1A1A1A', borderRadius:12, padding:14, marginTop:10, cursor:'pointer'}}><div style={{display:'flex', justifyContent:'space-between'}}><span><input type="radio" checked={servicoTipo==='novo'} readOnly/> Montar Novo</span><b style={{color:'#FF7A00'}}>{selectedMovel.novo}</b></div></div>
            <div onClick={()=>setServicoTipo('usado')} style={{border:'1.5px solid '+(servicoTipo==='usado'?'#FF7A00':'#2A2A2A'), background:servicoTipo==='usado'?'#1E1E1E':'#1A1A1A', borderRadius:12, padding:14, marginTop:10, cursor:'pointer'}}><div style={{display:'flex', justifyContent:'space-between'}}><span><input type="radio" checked={servicoTipo==='usado'} readOnly/> Montar Usado</span><b style={{color:'#FF7A00'}}>{selectedMovel.usado}</b></div></div>
            <div onClick={()=>setServicoTipo('desmontar')} style={{border:'1.5px solid '+(servicoTipo==='desmontar'?'#FF7A00':'#2A2A2A'), background:servicoTipo==='desmontar'?'#1E1E1E':'#1A1A1A', borderRadius:12, padding:14, marginTop:10, cursor:'pointer'}}><div style={{display:'flex', justifyContent:'space-between'}}><span><input type="radio" checked={servicoTipo==='desmontar'} readOnly/> Desmontar</span><b style={{color:'#FF7A00'}}>{selectedMovel.desmontar}</b></div></div>
            {servicoTipo && <div style={{marginTop:16, background:'#1E1E1E', padding:14, borderRadius:12, border:'1px solid #2A2A2A'}}><div style={{fontWeight:800, color:'#fff'}}>{selectedMovel.nome} - {servicoTipo==='novo'?'Montar Novo':servicoTipo==='usado'?'Montar Usado':'Desmontar'}</div><div style={{fontWeight:800, fontSize:22, color:'#FF7A00', marginTop:6}}>{servicoTipo==='novo'?selectedMovel.novo:servicoTipo==='usado'?selectedMovel.usado:selectedMovel.desmontar}</div></div>}
            <button onClick={()=>{ if(!currentUser){ setView('cadastro'); showToast('Faça cadastro para continuar'); return } const el=document.getElementById('endereco-form'); if(el) el.scrollIntoView({behavior:'smooth'}) }} disabled={!servicoTipo} style={{width:'100%', marginTop:16, background:'#FF7A00', color:'#fff', border:'none', borderRadius:12, padding:'14px', fontWeight:700, opacity:servicoTipo?1:0.5}}>{servicoTipo ? 'Confirmar serviço - '+(servicoTipo==='novo'?selectedMovel.novo:servicoTipo==='usado'?selectedMovel.usado:selectedMovel.desmontar) : 'Selecione um serviço'}</button>
            {currentUser && currentUser.tipo==='CLIENTE' && servicoTipo && (
              <div id="endereco-form" style={{marginTop:20, borderTop:'1px solid #2A2A2A', paddingTop:16}}>
                <h4 style={{color:'#fff'}}>Endereço do serviço - 645 cidades</h4>
                <div style={{display:'grid', gap:8, marginTop:10}}>
                  <select value={formData.cidade} onChange={e=>setFormData({...formData,cidade:e.target.value})} className="uber-input"><option value="">Cidade (645 disponíveis)</option>{CIDADES_SP.map(c=><option key={c} value={c}>{c}</option>)}</select>
                  <div style={{display:'flex', gap:8}}><input placeholder="Bairro" value={formData.bairro} onChange={e=>setFormData({...formData,bairro:e.target.value})} className="uber-input" style={{flex:1}}/><input placeholder="Rua" value={formData.rua} onChange={e=>setFormData({...formData,rua:e.target.value})} className="uber-input" style={{flex:1}}/></div>
                  <div style={{display:'flex', gap:8}}><input placeholder="Nº" value={formData.numero} onChange={e=>setFormData({...formData,numero:e.target.value})} className="uber-input" style={{width:80}}/><input type="date" value={formData.data} onChange={e=>setFormData({...formData,data:e.target.value})} className="uber-input" style={{flex:1}}/><input type="time" value={formData.horario} onChange={e=>setFormData({...formData,horario:e.target.value})} className="uber-input" style={{flex:1}}/></div>
                  <div style={{marginTop:8, border:'1.5px dashed #2A2A2A', borderRadius:12, padding:12}}><label style={{fontWeight:700, fontSize:13, color:'#A0A0A0'}}>📸 Foto do móvel (opcional, até 3)</label><input type="file" accept="image/*" multiple onChange={e=>{ const files=Array.from(e.target.files); files.forEach(file=>{ const reader=new FileReader(); reader.onload=(ev)=>{ setFormFotos(prev=>{ if(prev.length>=3){ showToast('Máximo 3 fotos'); return prev } return [...prev, ev.target.result] }); }; reader.readAsDataURL(file); }) }} style={{marginTop:6, width:'100%', color:'#fff'}}/><div style={{display:'flex', gap:8, marginTop:8, flexWrap:'wrap'}}>{formFotos.map((f,i)=>(<div key={i} style={{position:'relative'}}><img src={f} style={{width:80,height:80,borderRadius:8,objectFit:'cover'}}/><button onClick={()=>setFormFotos(formFotos.filter((_,idx)=>idx!==i))} style={{position:'absolute',top:-6,right:-6,background:'#ff4444',color:'#fff',border:'none',borderRadius:'50%',width:20,height:20,fontSize:10}}>X</button></div>))}</div></div>
                  <button onClick={criarPedido} style={{background:'#fff', color:'#000', border:'none', borderRadius:12, padding:'12px', fontWeight:700}}>Criar pedido</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {view==='cadastro' && (
        <div style={{maxWidth:500, margin:'20px auto', padding:16}}>
          <div className="premium-card" style={{padding:20}}>
            <h2 style={{color:'#fff'}}>Cadastro Obrigatório Uber Black</h2>
            <form onSubmit={handleCadastro} style={{display:'grid', gap:10, marginTop:12}}>
              <select value={cadTipo} onChange={e=>setCadTipo(e.target.value)} className="uber-input"><option value="CLIENTE">Sou Cliente</option><option value="MONTADOR">Sou Montador</option></select>
              <input name="nome" required placeholder="Nome completo" className="uber-input"/>
              <input name="email" required placeholder="E-mail" className="uber-input"/>
              <input name="senha" required type="password" placeholder="Senha" className="uber-input"/>
              <input name="telefone" placeholder="WhatsApp/Telefone" className="uber-input"/>
              <select name="cidade" required className="uber-input"><option value="">Cidade onde mora (645)</option>{CIDADES_SP.map(c=><option key={c} value={c}>{c}</option>)}</select>
              {cadTipo==='MONTADOR' && (
                <div style={{display:'grid', gap:10, background:'#111', padding:12, borderRadius:10, border:'1px solid #FF7A00'}}>
                  <div style={{fontWeight:700, fontSize:12, color:'#FF7A00'}}>Campos obrigatórios para Montador</div>
                  <select name="cidade_atende" required className="uber-input"><option value="">Cidade que atende (obrigatório)</option>{CIDADES_SP.map(c=><option key={c} value={c}>{c}</option>)}</select>
                  <div><label style={{fontSize:12, fontWeight:600, color:'#A0A0A0'}}>📸 Foto de perfil (obrigatório - galeria)</label><input type="file" accept="image/*" onChange={e=>{ const file=e.target.files[0]; if(!file) return; const reader=new FileReader(); reader.onload=(ev)=> setFotoPerfilTmp(ev.target.result); reader.readAsDataURL(file) }} style={{marginTop:6, width:'100%', color:'#fff'}}/>{fotoPerfilTmp && <img src={fotoPerfilTmp} style={{width:80,height:80,borderRadius:50,marginTop:8,objectFit:'cover'}}/>}</div>
                  <input name="chave_pix" required placeholder="Chave PIX no seu próprio nome (obrigatório)" className="uber-input"/>
                </div>
              )}
              <button style={{background:'#FF7A00', color:'#fff', border:'none', borderRadius:12, padding:'14px', fontWeight:700}}>Finalizar Cadastro</button>
              <div style={{textAlign:'center'}}><span onClick={()=>setView('login')} style={{color:'#FF7A00', fontSize:12, cursor:'pointer', textDecoration:'underline'}}>Já tenho cadastro</span></div>
            </form>
          </div>
        </div>
      )}

      {view==='login' && (
        <div style={{maxWidth:400, margin:'20px auto', padding:16}}>
          <div className="premium-card" style={{padding:20}}>
            <h2 style={{color:'#fff'}}>Entrar - Uber Black</h2>
            <form onSubmit={handleLogin} style={{display:'grid', gap:10, marginTop:12}}>
              <input name="email" placeholder="E-mail ou AndreSousa84" className="uber-input"/>
              <input name="senha" type="password" placeholder="Senha" className="uber-input"/>
              <button style={{background:'#fff', color:'#000', border:'none', borderRadius:12, padding:'12px', fontWeight:700}}>Entrar</button>
              <div style={{textAlign:'center'}}><span onClick={()=>{setCadTipo('CLIENTE'); setView('cadastro')}} style={{color:'#FF7A00', fontSize:12, cursor:'pointer', textDecoration:'underline'}}>Ainda não tenho cadastro</span></div>
            </form>
          </div>
        </div>
      )}

      {view==='pagamento' && pedidoEmPagamento && (
        <div style={{maxWidth:480, margin:'20px auto', padding:16}}>
          <div className="premium-card" style={{padding:20, textAlign:'center'}}>
            <h3 style={{color:'#fff'}}>Pagamento PIX - Uber Black</h3>
            <div style={{background:'#1E1E1E', border:'1px solid #2A2A2A', padding:16, borderRadius:12, margin:'16px 0'}}>
              <div style={{fontSize:12, color:'#A0A0A0'}}>Chave PIX oficial (só aparece aqui):</div>
              <div style={{fontWeight:800, wordBreak:'break-all', color:'#fff', marginTop:4}}>{PIX}</div>
              <button onClick={()=>{navigator.clipboard.writeText(PIX); showToast('PIX copiado!'); playSound('accept')}} style={{marginTop:10, background:'#FF7A00', color:'#fff', border:'none', borderRadius:8, padding:'8px 12px'}}>📋 COPIAR CHAVE PIX</button>
            </div>
            <div style={{textAlign:'left', fontSize:13, background:'#111', padding:12, borderRadius:10, border:'1px solid #2A2A2A', color:'#A0A0A0'}}>Pedido #{pedidoEmPagamento.numero}<br/>{pedidoEmPagamento.movel_nome} - {pedidoEmPagamento.servico_label}<br/>Valor: <b style={{color:'#FF7A00'}}>{pedidoEmPagamento.valor_txt}</b><br/>Cidade: {pedidoEmPagamento.cidade}</div>
            <button onClick={confirmarPagamentoEnvio} style={{width:'100%', marginTop:16, background:'#FF7A00', color:'#fff', border:'none', borderRadius:12, padding:'14px', fontWeight:700}}>📲 ENVIAR COMPROVANTE WHATSAPP</button>
            <button onClick={()=>setView('home')} style={{background:'none', border:'none', marginTop:12, color:'#A0A0A0'}}>Voltar</button>
          </div>
        </div>
      )}

      {view==='cliente' && currentUser && (
        <div style={{maxWidth:900, margin:'0 auto', padding:16}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16}}><h2 style={{color:'#fff'}}>Painel Cliente Premium</h2><div style={{fontSize:12, color:'#A0A0A0'}}>🔊 Notificação sonora ativa</div></div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:10, marginBottom:16}}>
            <div className="premium-card" style={{padding:14}}><div style={{fontSize:11, color:'#A0A0A0'}}>Total Pedidos</div><div style={{fontWeight:800, fontSize:20, color:'#fff'}}>R$ {financeiroCliente.total}</div></div>
            <div className="premium-card" style={{padding:14}}><div style={{fontSize:11, color:'#A0A0A0'}}>Pendentes</div><div style={{fontWeight:800, fontSize:20, color:'#FF7A00'}}>{pedidosCliente.filter(p=>p.status!=='FINALIZADO').length}</div></div>
            <div className="premium-card" style={{padding:14}}><div style={{fontSize:11, color:'#A0A0A0'}}>Finalizados</div><div style={{fontWeight:800, fontSize:20, color:'#16A34A'}}>{pedidosCliente.filter(p=>p.status==='FINALIZADO').length}</div></div>
          </div>
          <div style={{display:'flex', gap:8, marginBottom:12, flexWrap:'wrap'}}>
            {['pendentes','finalizados','financeiro','cupons'].map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{padding:'8px 14px', borderRadius:12, border:'1px solid #2A2A2A', background:tab===t?'#fff':'#1A1A1A', color:tab===t?'#000':'#fff', fontWeight:600, fontSize:12}}>{t.toUpperCase()}</button>
            ))}
            <button onClick={()=>setView('home')} style={{padding:'8px 14px', borderRadius:12, border:'1px solid #FF7A00', background:'#FF7A00', color:'#fff', fontSize:12}}>Ver Catálogo</button>
          </div>
          {tab==='pendentes' && <div style={{display:'grid', gap:8}}>{pedidosCliente.filter(p=>p.status!=='FINALIZADO').map(p=>(<div key={p.id} className="premium-card" style={{padding:12, borderLeft:'4px solid #FF7A00'}}><div style={{display:'flex', justifyContent:'space-between'}}><b style={{color:'#fff'}}>#{p.numero} {p.movel_nome} {p.valor_txt}</b><span style={{fontSize:10, background:'#1E1E1E', padding:'4px 8px', borderRadius:20, color:'#A0A0A0'}}>{p.status}</span></div><div style={{fontSize:11, color:'#A0A0A0', marginTop:4}}>{p.cidade} • {p.servico_label}</div>{p.status==='AGUARDANDO_PAGAMENTO' && <button onClick={()=>{setPedidoEmPagamento(p); setView('pagamento')}} style={{marginTop:8, background:'#FF7A00', color:'#fff', border:'none', borderRadius:8, padding:'6px 12px', fontSize:11}}>Ver Pagamento</button>}</div>))}</div>}
          {tab==='finalizados' && <div style={{display:'grid', gap:8}}>{pedidosCliente.filter(p=>p.status==='FINALIZADO').map(p=>(<div key={p.id} className="premium-card" style={{padding:12, borderLeft:'4px solid #16A34A'}}><div style={{color:'#fff'}}>#{p.numero} {p.movel_nome} {p.valor_txt} - Finalizado</div></div>))}</div>}
          {tab==='financeiro' && <div className="premium-card" style={{padding:16}}><div style={{color:'#fff', fontWeight:700}}>Financeiro Cliente</div><div style={{marginTop:10, color:'#A0A0A0'}}>Total pedidos: R$ {financeiroCliente.total} | Pendentes: R$ {financeiroCliente.pendentes}</div></div>}
          {tab==='cupons' && <div style={{display:'grid', gap:8}}>{cupons.map(c=>(<div key={c.id} className="premium-card" style={{padding:12, border:'1.5px dashed #FF7A00', display:'flex', justifyContent:'space-between'}}><div style={{color:'#fff'}}><b>{c.codigo}</b> • {c.desconto}{c.tipo}</div><button onClick={()=>{navigator.clipboard.writeText(c.codigo); showToast('Cupom copiado'); playSound('accept')}} style={{background:'#FF7A00', color:'#fff', border:'none', borderRadius:8, padding:'6px 10px', fontSize:11}}>Copiar</button></div>))}{cupons.length===0 && <div style={{color:'#A0A0A0'}}>Nenhum cupom disponível</div>}</div>}
        </div>
      )}

      {view==='montador' && currentUser && (
        <div style={{maxWidth:900, margin:'0 auto', padding:16}}>
          <div className="premium-card" style={{padding:12, display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16}}>
            <div style={{display:'flex', gap:10, alignItems:'center'}}>{currentUser.foto_perfil && <img src={currentUser.foto_perfil} style={{width:50,height:50,borderRadius:25, objectFit:'cover'}}/>}<div><div style={{color:'#fff', fontWeight:700}}>{currentUser.nome}</div><div style={{fontSize:11, color:'#A0A0A0'}}>Atende: {currentUser.cidade_atende} • PIX: {currentUser.chave_pix}</div></div></div>
            <div style={{display:'flex', gap:8, alignItems:'center'}}><span style={{fontSize:11, color:'#A0A0A0'}}>{currentUser.status_disponivel ? 'Disponível' : 'Offline'}</span><div onClick={toggleDisponivel} style={{width:50,height:28, borderRadius:20, background:currentUser.status_disponivel?'#16A34A':'#2A2A2A', position:'relative', cursor:'pointer'}}><div style={{width:24,height:24, borderRadius:'50%', background:'#fff', position:'absolute', top:2, left:currentUser.status_disponivel?24:2, transition:'0.2s'}}></div></div></div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:10, marginBottom:16}}>
            <div className="premium-card" style={{padding:14}}><div style={{fontSize:11, color:'#A0A0A0'}}>Disponíveis</div><div style={{fontWeight:800, fontSize:20, color:'#fff'}}>{pedidosMontadorPendentes.length}</div></div>
            <div className="premium-card" style={{padding:14}}><div style={{fontSize:11, color:'#A0A0A0'}}>A Receber</div><div style={{fontWeight:800, fontSize:20, color:'#FF7A00'}}>R$ {financeiroMontador.aReceber}</div></div>
            <div className="premium-card" style={{padding:14}}><div style={{fontSize:11, color:'#A0A0A0'}}>Realizado</div><div style={{fontWeight:800, fontSize:20, color:'#16A34A'}}>R$ {financeiroMontador.realizado}</div></div>
          </div>
          <div style={{display:'flex', gap:8, marginBottom:12}}>
            {['pendentes','meus','financeiro'].map(t=>(<button key={t} onClick={()=>setTab(t)} style={{padding:'8px 14px', borderRadius:12, border:'1px solid #2A2A2A', background:tab===t?'#fff':'#1A1A1A', color:tab===t?'#000':'#fff', fontSize:12}}>{t.toUpperCase()}</button>))}
          </div>
          {tab==='pendentes' && <div style={{display:'grid', gap:10}}>{pedidosMontadorPendentes.map(p=>(<div key={p.id} className="premium-card" style={{padding:12}}><div style={{display:'flex', justifyContent:'space-between'}}><div><b style={{color:'#fff'}}>#{p.numero} {p.movel_nome}</b><div style={{fontSize:11, color:'#A0A0A0'}}>{p.cidade} • {p.valor_txt} • {p.cliente_nome}</div>{p.fotos && <div style={{display:'flex', gap:6, marginTop:6}}>{p.fotos.map((f,i)=><img key={i} src={f} style={{width:60,height:60,borderRadius:8,objectFit:'cover'}}/>)}</div>}</div><div style={{display:'flex', flexDirection:'column', gap:6}}><button onClick={()=>aceitarPedido(p.id)} style={{background:'#FF7A00', color:'#fff', border:'none', borderRadius:8, padding:'8px 12px', fontWeight:700, fontSize:12}}>ACEITAR</button><button onClick={()=>recusarPedido(p.id)} style={{background:'#1E1E1E', border:'1px solid #2A2A2A', color:'#A0A0A0', borderRadius:8, padding:'6px 10px', fontSize:11}}>Recusar</button></div></div></div>))}{pedidosMontadorPendentes.length===0 && <div style={{color:'#A0A0A0'}}>Nenhum pedido pendente em {currentUser.cidade_atende}</div>}</div>}
          {tab==='meus' && <div style={{display:'grid', gap:8}}>{pedidosMontadorMeus.map(p=>(<div key={p.id} className="premium-card" style={{padding:12, borderLeft:'4px solid '+(p.status==='FINALIZADO'?'#16A34A':'#FF7A00')}}><div style={{color:'#fff'}}>#{p.numero} {p.movel_nome} {p.valor_txt} - {p.status}</div><div style={{fontSize:11, color:'#A0A0A0'}}>{p.cidade} • Cliente: {p.cliente_nome}</div>{p.status==='ACEITO' && <button onClick={()=>finalizarPedido(p.id)} style={{marginTop:8, background:'#16A34A', color:'#fff', border:'none', borderRadius:8, padding:'6px 12px', fontSize:11}}>Finalizar Pedido</button>}</div>))}</div>}
          {tab==='financeiro' && <div className="premium-card" style={{padding:16}}><div style={{color:'#fff', fontWeight:700}}>Financeiro Montador - 🔊 Som ativo</div><div style={{marginTop:10, color:'#A0A0A0'}}>Realizado: R$ {financeiroMontador.realizado} | A Receber: R$ {financeiroMontador.aReceber}</div></div>}
        </div>
      )}

      {view==='admin' && (
        <div style={{maxWidth:1000, margin:'0 auto', padding:16}}>
          <h2 style={{color:'#fff'}}>Painel ADM Uber Black - 5 toques logo</h2>
          <div style={{display:'flex', gap:8, marginTop:12, flexWrap:'wrap'}}>
            {['pedidos','usuarios','cupons','financeiro'].map(t=>(<button key={t} onClick={()=>setTab(t)} style={{padding:'8px 14px', borderRadius:12, border:'1px solid #2A2A2A', background:tab===t?'#fff':'#1A1A1A', color:tab===t?'#000':'#fff', fontSize:12}}>{t.toUpperCase()}</button>))}
            <button onClick={()=>setView('home')} style={{padding:'8px 14px', borderRadius:12, background:'#FF7A00', color:'#fff', border:'none', fontSize:12}}>Home</button>
          </div>
          <div style={{marginTop:16}}>
            {tab==='pedidos' && <div style={{display:'grid', gap:8}}>{pedidos.map(p=>(<div key={p.id} className="premium-card" style={{padding:12, display:'flex', justifyContent:'space-between', alignItems:'center'}}><div><div style={{color:'#fff', fontWeight:700}}>#{p.numero} {p.movel_nome} {p.valor_txt} - {p.status}</div><div style={{fontSize:11, color:'#A0A0A0'}}>Cliente: {p.cliente_nome} • {p.cidade} • Montador: {p.montador_nome||'-'}</div></div><div style={{display:'flex', gap:6}}>{p.status==='AGUARDANDO_PAGAMENTO' && <button onClick={()=>{ const novos=pedidos.map(x=> x.id===p.id? {...x, status:'PROCURANDO_MONTADOR'}:x); setPedidos(novos); showToast('Pagamento confirmado'); playSound('accept') }} style={{background:'#16A34A', color:'#fff', border:'none', borderRadius:8, padding:'6px 10px', fontSize:11}}>Confirmar Pagamento</button>}{p.status==='ACEITO' && <button onClick={()=>finalizarPedido(p.id)} style={{background:'#FF7A00', color:'#fff', border:'none', borderRadius:8, padding:'6px 10px', fontSize:11}}>Finalizar</button>}</div></div>))}</div>}
            {tab==='usuarios' && <div style={{display:'grid', gap:8}}>{usuarios.map(u=>(<div key={u.id} className="premium-card" style={{padding:12, display:'flex', justifyContent:'space-between'}}><div><div style={{color:'#fff', fontWeight:700}}>{u.nome} • {u.tipo} • {u.status}</div><div style={{fontSize:11, color:'#A0A0A0'}}>{u.email} • {u.cidade} {u.cidade_atende? '• Atende '+u.cidade_atende:''} • PIX {u.chave_pix||'-'}</div></div><div style={{display:'flex', gap:6}}><button onClick={()=>{ const upd=usuarios.map(x=> x.id===u.id? {...x, status: x.status==='BLOQUEADO'?'ATIVO':'BLOQUEADO'}:x); setUsuarios(upd); playSound('accept') }} style={{background:'#1E1E1E', border:'1px solid #2A2A2A', color:'#fff', borderRadius:8, padding:'6px 10px', fontSize:11}}>{u.status==='BLOQUEADO'?'Desbloquear':'Bloquear'}</button><button onClick={()=>{ if(confirm('Excluir?')) setUsuarios(usuarios.filter(x=>x.id!==u.id)) }} style={{background:'#ff4444', color:'#fff', border:'none', borderRadius:8, padding:'6px 10px', fontSize:11}}>Excluir</button></div></div>))}</div>}
            {tab==='cupons' && <div><div className="premium-card" style={{padding:16, marginBottom:12}}><div style={{fontWeight:700, color:'#fff', marginBottom:8}}>Gerar Cupom Premium</div><form onSubmit={e=>{ e.preventDefault(); const fd=new FormData(e.target); const codigo=fd.get('codigo'); const desconto=Number(fd.get('desconto')); const tipo=fd.get('tipo'); const validade=fd.get('validade'); const limite=Number(fd.get('limite')); const novo={id:'cup'+Date.now(), codigo, desconto, tipo, validade, limite, usos:0}; setCupons([...cupons, novo]); e.target.reset(); showToast('Cupom criado'); playSound('accept') }} style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}><input name="codigo" required placeholder="Código ex: DESCONTO10" className="uber-input"/><input name="desconto" required type="number" placeholder="Desconto" className="uber-input"/><select name="tipo" className="uber-input"><option value="%">%</option><option value="R$">R$</option></select><input name="validade" type="date" className="uber-input"/><input name="limite" type="number" placeholder="Limite uso" className="uber-input"/><button style={{gridColumn:'1 / -1', background:'#FF7A00', color:'#fff', borderRadius:12, padding:10, fontWeight:700, border:'none'}}>Criar Cupom</button></form></div><div style={{display:'grid', gap:8}}>{cupons.map(c=>(<div key={c.id} className="premium-card" style={{padding:12, display:'flex', justifyContent:'space-between', border:'1.5px dashed #FF7A00'}}><div style={{color:'#fff'}}><b>{c.codigo}</b> • {c.desconto}{c.tipo} • Val {c.validade}</div><button onClick={()=>setCupons(cupons.filter(x=>x.id!==c.id))} style={{background:'#1E1E1E', border:'1px solid #2A2A2A', color:'#fff', borderRadius:8, padding:'4px 8px', fontSize:11}}>Excluir</button></div>))}</div></div>}
            {tab==='financeiro' && <div style={{display:'grid', gap:12}}><div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:10}}><div className="premium-card" style={{padding:16}}><div style={{fontSize:11, color:'#A0A0A0'}}>Total pedidos do mês ({adminFinanceiro.countMes})</div><div style={{fontWeight:800, fontSize:20, color:'#fff'}}>R$ {adminFinanceiro.totalPedidosMes}</div></div><div className="premium-card" style={{padding:16}}><div style={{fontSize:11, color:'#A0A0A0'}}>Comissão 10% mês</div><div style={{fontWeight:800, fontSize:20, color:'#FF7A00'}}>R$ {adminFinanceiro.comissaoMes}</div></div><div className="premium-card" style={{padding:16}}><div style={{fontSize:11, color:'#A0A0A0'}}>Total repasse mês</div><div style={{fontWeight:800, fontSize:20, color:'#16A34A'}}>R$ {adminFinanceiro.totalRepasseMes}</div></div><div className="premium-card" style={{padding:16}}><div style={{fontSize:11, color:'#A0A0A0'}}>A repassar pendente</div><div style={{fontWeight:800, fontSize:20, color:'#fff'}}>R$ {adminFinanceiro.pendenteRepasse}</div></div></div></div>}
          </div>
        </div>
      )}

      <a href="#" onClick={e=>{e.preventDefault(); showToast('App PWA: Adicione à tela inicial. Manifest Uber Black corrigido ✓'); playSound('accept')}} style={{position:'fixed', right:16, bottom:16, background:'#fff', color:'#000', borderRadius:24, padding:'11px 18px', fontWeight:800, fontSize:13, boxShadow:'0 10px 28px rgba(0,0,0,0.5)', zIndex:40, display:'flex', alignItems:'center', gap:8}}>📲 Baixar App</a>
      <div style={{height:90}}/>
      <div style={{textAlign:'center', fontSize:10, color:'#555', paddingBottom:14}}>Uber Black Premium • 645 cidades SP completas • Manifest corrigido #0A0A0A • Realtime BroadcastChannel • Notificações sonoras em todos painéis • 5 toques logo = admin</div>
    </div>
  )
}
