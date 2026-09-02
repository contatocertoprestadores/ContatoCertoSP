
import React, { useState, useEffect, useRef, useMemo } from 'react'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || ''
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''
const supabase = SUPABASE_URL && SUPABASE_KEY ? createClient(SUPABASE_URL, SUPABASE_KEY) : null

// ============ CONFIGURAÇÕES ============
const PIX = 'contatocerto.prestadores@gmail.com'
const WHATSAPP = '5518991488302'
const ADMIN_USER = 'AndreSousa84'
const ADMIN_PASS = '20112024'
const ADMIN_EMAIL = 'andre@contatocertosp.com.br'

function genNumero(){ return Math.floor(100000 + Math.random()*900000) }
function normTel(t){ return (t||'').replace(/\D/g,'') }
function normEmail(e){ return (e||'').toLowerCase().trim() }

const CIDADES_SP = ["Adamantina","Adolfo","Aguaí","Águas da Prata","Águas de Lindóia","Águas de Santa Bárbara","Águas de São Pedro","Agudos","Alambari","Alfredo Marcondes","Altair","Altinópolis","Alto Alegre","Alumínio","Álvares Florence","Álvares Machado","Álvaro de Carvalho","Alvinlândia","Americana","Américo Brasiliense","Américo de Campos","Amparo","Analândia","Andradina","Angatuba","Anhembi","Anhumas","Aparecida","Aparecida d'Oeste","Apiaí","Araçariguama","Araçatuba","Araçoiaba da Serra","Aramina","Arandu","Arapeí","Araraquara","Araras","Arco-Íris","Arealva","Areias","Areiópolis","Ariranha","Artur Nogueira","Arujá","Aspásia","Assis","Atibaia","Auriflama","Avaí","Avanhandava","Avaré","Bady Bassitt","Balbinos","Bálsamo","Bananal","Barão de Antonina","Barbosa","Bariri","Barra Bonita","Barra do Chapéu","Barra do Turvo","Barretos","Barrinha","Barueri","Bastos","Batatais","Bauru","Bebedouro","Bento de Abreu","Bernardino de Campos","Bertioga","Bilac","Birigui","Biritiba Mirim","Boa Esperança do Sul","Bocaina","Bofete","Boituva","Bom Jesus dos Perdões","Bom Sucesso de Itararé","Borá","Boracéia","Borborema","Borebi","Botucatu","Bragança Paulista","Braúna","Brejo Alegre","Brodowski","Brotas","Buri","Buritama","Buritizal","Cabrália Paulista","Cabreúva","Caçapava","Cachoeira Paulista","Caconde","Cafelândia","Caiabu","Caieiras","Caiuá","Cajamar","Cajati","Cajobi","Cajuru","Campina do Monte Alegre","Campinas","Campo Limpo Paulista","Campos do Jordão","Campos Novos Paulista","Cananéia","Canas","Cândido Mota","Cândido Rodrigues","Canitar","Capão Bonito","Capela do Alto","Capivari","Caraguatatuba","Carapicuíba","Cardoso","Casa Branca","Cássia dos Coqueiros","Castilho","Catanduva","Catiguá","Cedral","Cerqueira César","Cerquilho","Cesário Lange","Charqueada","Chavantes","Clementina","Colina","Colômbia","Conchal","Conchas","Cordeirópolis","Coroados","Coronel Macedo","Corumbataí","Cosmópolis","Cosmorama","Cotia","Cravinhos","Cristais Paulista","Cruzália","Cruzeiro","Cubatão","Cunha","Descalvado","Diadema","Dirce Reis","Divinolândia","Dobrada","Dois Córregos","Dolcinópolis","Dourado","Dracena","Duartina","Dumont","Echaporã","Eldorado","Elias Fausto","Elisiário","Embaúba","Embu das Artes","Embu-Guaçu","Emilianópolis","Engenheiro Coelho","Espírito Santo do Pinhal","Espírito Santo do Turvo","Estiva Gerbi","Estrela do Norte","Estrela d'Oeste","Euclides da Cunha Paulista","Fartura","Fernando Prestes","Fernandópolis","Fernão","Ferraz de Vasconcelos","Flora Rica","Floreal","Flórida Paulista","Florínia","Franca","Francisco Morato","Franco da Rocha","Gabriel Monteiro","Gália","Garça","Gastão Vidigal","Gavião Peixoto","General Salgado","Getulina","Glicério","Guaiçara","Guaimbê","Guaíra","Guapiaçu","Guapiara","Guará","Guaraçaí","Guaraci","Guarani d'Oeste","Guarantã","Guararapes","Guararema","Guaratinguetá","Guareí","Guariba","Guarujá","Guarulhos","Guatapará","Guzolândia","Herculândia","Holambra","Hortolândia","Iacanga","Iacri","Iaras","Ibaté","Ibirá","Ibirarema","Ibitinga","Ibiúna","Icém","Iepê","Igaraçu do Tietê","Igarapava","Igaratá","Iguape","Ilha Comprida","Ilha Solteira","Ilhabela","Indaiatuba","Indiana","Indiaporã","Inúbia Paulista","Ipaussu","Iperó","Ipeúna","Ipiguá","Iporanga","Ipuã","Iracemápolis","Irapuã","Irapuru","Itaberá","Itaí","Itajobi","Itaju","Itanhaém","Itaoca","Itapecerica da Serra","Itapetininga","Itapeva","Itapevi","Itapira","Itapirapuã Paulista","Itápolis","Itaporanga","Itapuí","Itapura","Itaquaquecetuba","Itararé","Itariri","Itatiba","Itatinga","Itirapina","Itirapuã","Itobi","Itu","Itupeva","Ituverava","Jaborandi","Jaboticabal","Jacareí","Jaci","Jacupiranga","Jaguariúna","Jales","Jambeiro","Jandira","Jardinópolis","Jarinu","Jaú","Jeriquara","Joanópolis","João Ramalho","José Bonifácio","Júlio Mesquita","Jumirim","Jundiaí","Junqueirópolis","Juquiá","Juquitiba","Lagoinha","Laranjal Paulista","Lavínia","Lavrinhas","Leme","Lençóis Paulista","Limeira","Lindóia","Lins","Lorena","Lourdes","Louveira","Lucélia","Lucianópolis","Luís Antônio","Luiziânia","Lupércio","Lutécia","Macatuba","Macaubal","Macedônia","Magda","Mairinque","Mairiporã","Manduri","Marabá Paulista","Maracaí","Marapoama","Mariápolis","Marília","Marinópolis","Martinópolis","Matão","Mauá","Mendonça","Meridiano","Mesópolis","Miguelópolis","Mineiros do Tietê","Mira Estrela","Miracatu","Mirandópolis","Mirante do Paranapanema","Mirassol","Mirassolândia","Mococa","Mogi das Cruzes","Mogi Guaçu","Mogi Mirim","Mombuca","Monções","Mongaguá","Morro Agudo","Morungaba","Motuca","Murutinga do Sul","Nantes","Narandiba","Natividade da Serra","Nazaré Paulista","Neves Paulista","Nhandeara","Nipoã","Nova Aliança","Nova Campina","Nova Canaã Paulista","Nova Castilho","Nova Europa","Nova Granada","Nova Guataporanga","Nova Independência","Nova Luzitânia","Nova Odessa","Novais","Novo Horizonte","Nuporanga","Ocauçu","Óleo","Olímpia","Onda Verde","Oriente","Orindiúva","Orlândia","Osasco","Oscar Bressane","Osvaldo Cruz","Ourinhos","Ouro Verde","Ouroeste","Pacaembu","Palestina","Palmares Paulista","Palmeira d'Oeste","Palmital","Panorama","Paraguaçu Paulista","Paraibuna","Paraíso","Paranapanema","Paranapuã","Parapuã","Pardinho","Pariquera-Açu","Parisi","Patrocínio Paulista","Paulicéia","Paulínia","Paulistânia","Paulo de Faria","Pederneiras","Pedra Bela","Pedranópolis","Pedregulho","Pedreira","Pedrinhas Paulista","Pedro de Toledo","Penápolis","Pereira","Pereiras","Peruíbe","Piacatu","Piedade","Pilar do Sul","Pindamonhangaba","Pindorama","Pinhalzinho","Piquerobi","Piquete","Piracaia","Piracicaba","Piraju","Pirajuí","Pirangi","Pirapora do Bom Jesus","Pirapozinho","Pirassununga","Piratininga","Pitangueiras","Planalto","Platina","Poá","Poloni","Pompéia","Pongaí","Pontal","Pontalinda","Pontes Gestal","Populina","Porangaba","Porto Feliz","Porto Ferreira","Potim","Potirendaba","Pracinha","Pradópolis","Praia Grande","Pratânia","Presidente Alves","Presidente Bernardes","Presidente Epitácio","Presidente Prudente","Presidente Venceslau","Promissão","Quatá","Queiroz","Queluz","Quintana","Rafard","Rancharia","Redenção da Serra","Regente Feijó","Reginópolis","Registro","Restinga","Ribeira","Ribeirão Bonito","Ribeirão Branco","Ribeirão Corrente","Ribeirão do Sul","Ribeirão dos Índios","Ribeirão Grande","Ribeirão Pires","Ribeirão Preto","Riversul","Rifaina","Rincão","Rinópolis","Rio Claro","Rio das Pedras","Rio Grande da Serra","Riolândia","Rosana","Roseira","Rubiácea","Rubinéia","Sabino","Sagres","Sales","Sales Oliveira","Salesópolis","Salmourão","Saltinho","Salto","Salto de Pirapora","Salto Grande","Sandovalina","Santa Adélia","Santa Albertina","Santa Bárbara d'Oeste","Santa Branca","Santa Clara d'Oeste","Santa Cruz da Conceição","Santa Cruz da Esperança","Santa Cruz das Palmeiras","Santa Cruz do Rio Pardo","Santa Ernestina","Santa Fé do Sul","Santa Gertrudes","Santa Isabel","Santa Lúcia","Santa Maria da Serra","Santa Mercedes","Santa Rita do Passa Quatro","Santa Rita d'Oeste","Santa Rosa de Viterbo","Santa Salete","Santana da Ponte Pensa","Santana de Parnaíba","Santo Anastácio","Santo André","Santo Antônio da Alegria","Santo Antônio de Posse","Santo Antônio do Aracanguá","Santo Antônio do Jardim","Santo Antônio do Pinhal","Santo Expedito","Santópolis do Aguapeí","Santos","São Bento do Sapucaí","São Bernardo do Campo","São Caetano do Sul","São Carlos","São Francisco","São João da Boa Vista","São João das Duas Pontes","São João de Iracema","São João do Pau d'Alho","São Joaquim da Barra","São José da Bela Vista","São José do Barreiro","São José do Rio Pardo","São José do Rio Preto","São José dos Campos","São Lourenço da Serra","São Luís do Paraitinga","São Manuel","São Miguel Arcanjo","São Paulo","São Pedro","São Pedro do Turvo","São Roque","São Sebastião","São Sebastião da Grama","São Simão","São Vicente","Sarapuí","Sarutaiá","Sebastianópolis do Sul","Serra Azul","Serra Negra","Serrana","Sertãozinho","Sete Barras","Severínia","Silveiras","Socorro","Sorocaba","Sud Mennucci","Sumaré","Suzanápolis","Suzano","Tabapuã","Tabatinga","Taboão da Serra","Taciba","Taguaí","Taiaçu","Taiúva","Tambaú","Tanabi","Tapiraí","Tapiratiba","Taquaral","Taquaritinga","Taquarituba","Taquarivaí","Tarabai","Tarumã","Tatuí","Taubaté","Tejupá","Teodoro Sampaio","Terra Roxa","Tietê","Timburi","Torre de Pedra","Torrinha","Trabiju","Tremembé","Três Fronteiras","Tuiuti","Tupã","Tupi Paulista","Turiúba","Turmalina","Ubarana","Ubatuba","Ubirajara","Uchoa","União Paulista","Urânia","Uru","Urupês","Valentim Gentil","Valinhos","Valparaíso","Vargem","Vargem Grande do Sul","Vargem Grande Paulista","Várzea Paulista","Vera Cruz","Vinhedo","Viradouro","Vista Alegre do Alto","Vitória Brasil","Votorantim","Votuporanga","Zacarias"]

const CATALOGO = [
{id:1, nome:"Guarda-roupa 2 portas", cat:"Dormitório", icone:"🛏️", novo:"R$ 90", usado:"R$ 70", desmontar:"R$ 60", novoNum:90, usadoNum:70, desNum:60},
{id:2, nome:"Guarda-roupa 3 portas", cat:"Dormitório", icone:"🛏️", novo:"R$ 110", usado:"R$ 90", desmontar:"R$ 80", novoNum:110, usadoNum:90, desNum:80},
{id:3, nome:"Guarda-roupa 4 portas", cat:"Dormitório", icone:"🛏️", novo:"R$ 130", usado:"R$ 100", desmontar:"R$ 90", novoNum:130, usadoNum:100, desNum:90},
{id:4, nome:"Guarda-roupa 6 portas", cat:"Dormitório", icone:"🛏️", novo:"R$ 180", usado:"R$ 130", desmontar:"R$ 110", novoNum:180, usadoNum:130, desNum:110},
{id:5, nome:"Guarda-roupa 8 portas Casal", cat:"Dormitório", icone:"🛏️", novo:"R$ 220", usado:"R$ 160", desmontar:"R$ 140", novoNum:220, usadoNum:160, desNum:140},
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

export default function App(){
  // ============ ESTADOS ORGANIZADOS ============
  const [usuarios, setUsuarios] = useState(()=>{
    try{ 
      const s=localStorage.getItem('ccsp_usuarios'); 
      if(s) return JSON.parse(s)
      return [
        {id:'admin1', tipo:'ADMIN', nome:'Andre ADM', email:normEmail(ADMIN_EMAIL), senha:ADMIN_PASS, cidade:'São Paulo', cidades_atende:['São Paulo'], cidade_atende:'São Paulo', chave_pix:PIX, foto_perfil:'', status:'ATIVO', status_disponivel:true, telefone:'18991488302'},
        {id:'admin2', tipo:'ADMIN', nome:'Andre Sousa', email:normEmail(ADMIN_USER), senha:ADMIN_PASS, cidade:'São Paulo', cidades_atende:['São Paulo'], cidade_atende:'São Paulo', chave_pix:PIX, foto_perfil:'', status:'ATIVO', status_disponivel:true, telefone:''}
      ]
    }catch{ return [] }
  })
  const [pedidos, setPedidos] = useState(()=>{ try{ const s=localStorage.getItem('ccsp_pedidos'); return s? JSON.parse(s): [] }catch{ return [] } })
  const [cupons, setCupons] = useState(()=>{ try{ const s=localStorage.getItem('ccsp_cupons'); return s? JSON.parse(s): [] }catch{ return [] } })
  const [currentUser, setCurrentUser] = useState(()=>{ try{ const s=localStorage.getItem('ccsp_user'); return s? JSON.parse(s): null }catch{ return null } })
  const [view, setView] = useState(()=>{
    try{
      const savedView = localStorage.getItem('ccsp_view')
      const userStr = localStorage.getItem('ccsp_user')
      if(savedView && userStr){
        const u = JSON.parse(userStr)
        if(u.tipo==='CLIENTE' && ['cliente','home','pagamento'].includes(savedView)) return savedView
        if(u.tipo==='MONTADOR' && ['montador','home'].includes(savedView)) return savedView
        if(u.tipo==='ADMIN' && ['admin','home'].includes(savedView)) return savedView
        if(u.tipo==='CLIENTE') return 'cliente'
        if(u.tipo==='MONTADOR') return 'montador'
        if(u.tipo==='ADMIN') return 'admin'
      }
      return 'home'
    }catch{ return 'home' }
  })
  const [tab, setTab] = useState(()=> localStorage.getItem('ccsp_tab') || 'pendentes')
  const [selectedMovel, setSelectedMovel] = useState(null)
  const [servicoTipo, setServicoTipo] = useState('')
  const [filtroCat, setFiltroCat] = useState('Todos')
  const [busca, setBusca] = useState('')
  const [formFotos, setFormFotos] = useState([])
  const [formData, setFormData] = useState({bairro:'', data:'', horario:'', cidade:'', rua:'', numero:''})
  const [fotoPerfilTmp, setFotoPerfilTmp] = useState('')
  const [cadTipo, setCadTipo] = useState('CLIENTE')
  const [cidadesAtende, setCidadesAtende] = useState([])
  const [toast, setToast] = useState(null)
  const [logoTaps, setLogoTaps] = useState(0)
  const [pedidoEmPagamento, setPedidoEmPagamento] = useState(null)
  const lastCount = useRef(pedidos.length)
  const audioRef = useRef(null)

  // ============ PERSISTÊNCIA ============
  useEffect(()=>{ localStorage.setItem('ccsp_usuarios', JSON.stringify(usuarios)) },[usuarios])
  useEffect(()=>{ localStorage.setItem('ccsp_pedidos', JSON.stringify(pedidos)) },[pedidos])
  useEffect(()=>{ localStorage.setItem('ccsp_cupons', JSON.stringify(cupons)) },[cupons])
  useEffect(()=>{ if(currentUser) localStorage.setItem('ccsp_user', JSON.stringify(currentUser)); else localStorage.removeItem('ccsp_user') },[currentUser])
  useEffect(()=>{ localStorage.setItem('ccsp_view', view) },[view])
  useEffect(()=>{ localStorage.setItem('ccsp_tab', tab) },[tab])
  useEffect(()=>{
    if(currentUser && view==='home'){
      if(currentUser.tipo==='CLIENTE') setView('cliente')
      else if(currentUser.tipo==='MONTADOR') setView('montador')
      else if(currentUser.tipo==='ADMIN') setView('admin')
    }
  },[])

  // ============ SOM EM TODOS OS PAINÉIS ============
  function showToast(msg){ setToast(msg); setTimeout(()=>setToast(null),4000) }
  function playSound(tipo){
    try{
      if(!audioRef.current) audioRef.current = new (window.AudioContext || window.webkitAudioContext)()
      const ctx = audioRef.current
      if(ctx.state==='suspended') ctx.resume()
      const now = ctx.currentTime
      const play = (freq, dur, delay=0, vol=0.3)=>{
        const o = ctx.createOscillator()
        const g = ctx.createGain()
        o.type='sine'; o.frequency.value=freq
        o.connect(g); g.connect(ctx.destination)
        g.gain.setValueAtTime(vol, now+delay)
        g.gain.exponentialRampToValueAtTime(0.01, now+delay+dur)
        o.start(now+delay); o.stop(now+delay+dur)
      }
      if(tipo==='new'){
        play(880,0.25,0,0.4); play(1100,0.25,0.3,0.4); play(1320,0.4,0.6,0.4)
      } else if(tipo==='comprovante'){
        play(660,0.3,0,0.4); play(880,0.3,0.35,0.4); play(660,0.5,0.7,0.4)
      } else if(tipo==='accept'){
        play(523,0.2,0); play(659,0.2,0.2); play(784,0.4,0.4)
      } else if(tipo==='alert'){
        play(440,0.6,0,0.5)
      }
    }catch(e){}
  }

  // ============ REALTIME ONLINE REAL - MONTADORES VEEM PEDIDOS ============
  useEffect(()=>{
    let bc = null
    try{
      bc = new BroadcastChannel('ccsp_realtime')
      bc.onmessage = (e)=>{
        const d = e.data
        if(d.type==='novo_pedido'){
          setPedidos(prev=> prev.find(p=>p.id===d.pedido.id) ? prev : [d.pedido, ...prev])
        }
        if(d.type==='update_pedido'){
          setPedidos(prev=> prev.map(p=> p.id===d.pedido.id ? d.pedido : p))
        }
      }
    }catch{}

    let sbChannel = null
    let poll = null
    if(supabase){
      const load = async ()=>{
        try{
          const {data} = await supabase.from('pedidos').select('*').order('created_at',{ascending:false}).limit(200)
          if(data && data.length>0){
            setPedidos(prev=>{
              const map = new Map(prev.map(p=>[p.id,p]))
              data.forEach(p=> map.set(p.id,p))
              return Array.from(map.values()).sort((a,b)=> new Date(b.created_at)-new Date(a.created_at))
            })
          }
        }catch{}
      }
      load()
      sbChannel = supabase.channel('pedidos-v3')
        .on('postgres_changes',{event:'INSERT', schema:'public', table:'pedidos'}, p=>{
          const novo = p.new
          setPedidos(prev=> prev.find(x=>x.id===novo.id) ? prev : [novo, ...prev])
          // Notificação sonora para ADM quando comprovante enviado
          if(novo.status==='COMPROVANTE_ENVIADO'){
            if(!currentUser || currentUser.tipo==='ADMIN'){
              showToast('💰 Novo comprovante para aprovar! Pedido #'+novo.numero)
              playSound('comprovante')
            }
          }
          // Notificação para montador quando ADM aprova
          if(novo.status==='PROCURANDO_MONTADOR'){
            if(currentUser && currentUser.tipo==='MONTADOR' && currentUser.status_disponivel){
              const atende = currentUser.cidades_atende || [currentUser.cidade_atende]
              if(atende.includes(novo.cidade)){
                showToast('🔔 Novo pedido em '+novo.cidade+'! #'+novo.numero)
                playSound('new')
              }
            }
          }
        })
        .on('postgres_changes',{event:'UPDATE', schema:'public', table:'pedidos'}, p=>{
          const upd = p.new
          setPedidos(prev=> prev.map(x=> x.id===upd.id ? upd : x))
        })
        .subscribe()

      poll = setInterval(async ()=>{
        try{
          const {data} = await supabase.from('pedidos').select('*').in('status',['COMPROVANTE_ENVIADO','PROCURANDO_MONTADOR']).order('created_at',{ascending:false}).limit(100)
          if(data){
            setPedidos(prev=>{
              const map = new Map(prev.map(p=>[p.id,p]))
              let temNovoComprovante=false
              let temNovoParaMontador=false
              data.forEach(p=>{
                const exist = map.get(p.id)
                if(!exist){ 
                  map.set(p.id,p)
                  if(p.status==='COMPROVANTE_ENVIADO') temNovoComprovante=true
                  if(p.status==='PROCURANDO_MONTADOR') temNovoParaMontador=true
                } else if(exist.status!==p.status){
                  map.set(p.id,p)
                  if(p.status==='COMPROVANTE_ENVIADO') temNovoComprovante=true
                  if(p.status==='PROCURANDO_MONTADOR') temNovoParaMontador=true
                }
              })
              if(temNovoComprovante && (!currentUser || currentUser.tipo==='ADMIN')){
                showToast('💰 Comprovante novo para aprovar!')
                playSound('comprovante')
              }
              if(temNovoParaMontador && currentUser && currentUser.tipo==='MONTADOR' && currentUser.status_disponivel){
                const novos = data.filter(d=> d.status==='PROCURANDO_MONTADOR' && !prev.find(pr=>pr.id===d.id) || (prev.find(pr=>pr.id===d.id)?.status!==d.status))
                const paraMim = novos.filter(n=> {
                  const atende = currentUser.cidades_atende || [currentUser.cidade_atende]
                  return atende.includes(n.cidade)
                })
                if(paraMim.length>0){ showToast('🔔 '+paraMim.length+' novo(s) pedido(s) em sua região!'); playSound('new') }
              }
              return Array.from(map.values()).sort((a,b)=> new Date(b.created_at)-new Date(a.created_at))
            })
          }
        }catch{}
      },4000)
    }

    return ()=>{ if(bc) bc.close(); if(sbChannel && supabase) supabase.removeChannel(sbChannel); if(poll) clearInterval(poll) }
  },[])

  // Notificação sonora para cliente quando aceito
  useEffect(()=>{
    if(!currentUser || currentUser.tipo!=='CLIENTE') return
    pedidos.forEach(p=>{
      if(p.cliente_id===currentUser.id && p.status==='ACEITO'){
        const key='notified_accept_'+p.id
        if(!sessionStorage.getItem(key)){
          showToast('✅ Pedido #'+p.numero+' aceito por '+p.montador_nome+'!')
          playSound('accept')
          sessionStorage.setItem(key,'1')
        }
      }
    })
  },[pedidos])

  // ============ FILTROS CATÁLOGO ============
  const filteredCatalog = useMemo(()=>{
    let list = [...CATALOGO]
    if(filtroCat!=='Todos') list = list.filter(c=>c.cat===filtroCat)
    if(busca) list = list.filter(c=>c.nome.toLowerCase().includes(busca.toLowerCase()))
    return list
  },[filtroCat, busca])

  // ============ CADASTRO COM ANTI-DUPLICIDADE ============
  async function handleCadastro(e){
    e.preventDefault()
    const fd = new FormData(e.target)
    const nome = (fd.get('nome')||'').toString().trim()
    const emailRaw = (fd.get('email')||'').toString().trim()
    const email = normEmail(emailRaw)
    const senha = (fd.get('senha')||'').toString()
    const cidade = (fd.get('cidade')||'').toString()
    const telefoneRaw = (fd.get('telefone')||'').toString()
    const tel = normTel(telefoneRaw)
    const chave_pix = (fd.get('chave_pix')||'').toString().trim()

    if(!nome || !email || !senha || !cidade){ showToast('Preencha nome, email, senha e cidade'); return }

    // Validação anti-duplicidade local
    if(usuarios.find(u=> normEmail(u.email)===email)){ showToast('❌ E-mail já cadastrado'); playSound('alert'); return }
    if(tel && usuarios.find(u=> normTel(u.telefone)===tel && normTel(u.telefone)!=='')){ showToast('❌ Telefone já cadastrado'); playSound('alert'); return }

    // Validação no Supabase se configurado
    if(supabase){
      try{
        const {data:exEmail} = await supabase.from('usuarios').select('id').ilike('email', email).limit(1)
        if(exEmail && exEmail.length>0){ showToast('❌ E-mail já existe no banco'); playSound('alert'); return }
      }catch{}
    }

    if(cadTipo==='MONTADOR'){
      if(cidadesAtende.length===0){ showToast('Selecione pelo menos 1 cidade que atende (até 5)'); return }
      if(!chave_pix){ showToast('Chave PIX obrigatória no seu nome'); return }
      if(!fotoPerfilTmp){ showToast('Foto de perfil obrigatória'); return }
    }

    const novo = {
      id:Date.now().toString(),
      tipo:cadTipo,
      nome, email, senha, cidade,
      cidades_atende: cadTipo==='MONTADOR' ? cidadesAtende : [cidade],
      cidade_atende: cadTipo==='MONTADOR' ? cidadesAtende[0] : cidade,
      telefone:telefoneRaw,
      telefone_norm:tel,
      chave_pix,
      foto_perfil:fotoPerfilTmp,
      status:'ATIVO',
      status_disponivel:true,
      created_at:new Date().toISOString()
    }
    setUsuarios([...usuarios, novo])
    if(supabase){
      try{
        await supabase.from('usuarios').insert([{
          id:novo.id,
          tipo:novo.tipo,
          nome:novo.nome,
          email:novo.email,
          telefone:novo.telefone,
          senha:novo.senha,
          cidade:novo.cidade,
          cidade_atende:novo.cidades_atende.join(','),
          cidades_atende:novo.cidades_atende,
          chave_pix:novo.chave_pix,
          foto_perfil:novo.foto_perfil,
          status:'ATIVO',
          status_disponivel:true
        }])
      }catch(err){ console.log('supabase usuario insert', err) }
    }
    setFotoPerfilTmp(''); setCidadesAtende([])
    showToast('✅ Cadastro realizado! Faça login')
    playSound('accept')
    setView('login')
  }

  function handleLogin(e){
    e.preventDefault()
    const fd = new FormData(e.target)
    const emailRaw = (fd.get('email')||'').toString().trim()
    const email = normEmail(emailRaw)
    const senha = (fd.get('senha')||'').toString()

    // ADM fixo AndreSousa84 / 20112024
    if((email===normEmail(ADMIN_USER) || email===normEmail(ADMIN_EMAIL)) && senha===ADMIN_PASS){
      const admin = {id:'admin', tipo:'ADMIN', nome:'Andre ADM', email:ADMIN_EMAIL, cidade:'São Paulo', cidades_atende:['São Paulo'], cidade_atende:'São Paulo', status:'ATIVO', status_disponivel:true}
      setCurrentUser(admin); setView('admin'); setTab('comprovantes'); showToast('Admin logado'); playSound('accept'); return
    }

    const u = usuarios.find(x=> normEmail(x.email)===email && x.senha===senha)
    if(!u){ showToast('❌ E-mail ou senha inválidos'); playSound('alert'); return }
    if(u.status==='BLOQUEADO'){ showToast('Usuário bloqueado'); playSound('alert'); return }
    setCurrentUser(u)
    if(u.tipo==='CLIENTE'){ setView('cliente'); setTab('pendentes') }
    else if(u.tipo==='MONTADOR'){ setView('montador'); setTab('pendentes') }
    else { setView('admin'); setTab('comprovantes') }
    showToast('Bem-vindo '+u.nome)
    playSound('accept')
  }

  // ============ FLUXO PEDIDOS CORRIGIDO ORGANIZADO ============
  // AGUARDANDO_PAGAMENTO -> COMPROVANTE_ENVIADO -> (ADM APROVA) -> PROCURANDO_MONTADOR -> ACEITO -> FINALIZADO
  //                                    -> (ADM REPROVA) -> AGUARDANDO_PAGAMENTO

  async function criarPedido(){
    if(!selectedMovel || !servicoTipo){ showToast('Selecione serviço'); return }
    if(!formData.cidade){ showToast('Informe cidade'); return }
    if(!currentUser){ showToast('Faça login'); setView('login'); return }
    const valorNum = servicoTipo==='novo' ? selectedMovel.novoNum : servicoTipo==='usado' ? selectedMovel.usadoNum : selectedMovel.desNum
    const valorTxt = servicoTipo==='novo' ? selectedMovel.novo : servicoTipo==='usado' ? selectedMovel.usado : selectedMovel.desmontar
    const pedido = {
      id:Date.now().toString(),
      numero:genNumero(),
      cliente_id:currentUser.id,
      cliente_nome:currentUser.nome,
      cliente_telefone:currentUser.telefone||'',
      categoria:selectedMovel.cat,
      movel_nome:selectedMovel.nome,
      servico_tipo:servicoTipo,
      servico_label: servicoTipo==='novo'?'Montar Novo':servicoTipo==='usado'?'Montar Usado':'Desmontar',
      valor_bruto:valorNum,
      valor_txt:valorTxt,
      comissao:Math.round(valorNum*0.10),
      valor_liquido:Math.round(valorNum*0.90),
      cidade:formData.cidade,
      bairro:formData.bairro,
      rua:formData.rua,
      numero_end:formData.numero,
      data_servico:formData.data,
      horario:formData.horario,
      status:'AGUARDANDO_PAGAMENTO',
      fotos:formFotos,
      created_at:new Date().toISOString()
    }
    const novos = [pedido, ...pedidos]
    setPedidos(novos)
    setPedidoEmPagamento(pedido)
    setFormFotos([])
    setView('pagamento')
    showToast('Pedido #'+pedido.numero+' criado! Faça o PIX')
    playSound('accept')
    if(supabase){ try{ await supabase.from('pedidos').insert([pedido]) }catch(e){} }
  }

  async function enviarComprovante(){
    if(!pedidoEmPagamento) return
    const msg = 'Olá! Comprovante pedido Nº '+pedidoEmPagamento.numero+' - Cliente: '+pedidoEmPagamento.cliente_nome+' - '+pedidoEmPagamento.movel_nome+' '+pedidoEmPagamento.servico_label+' - '+pedidoEmPagamento.valor_txt+' - Cidade: '+pedidoEmPagamento.cidade
    window.open('https://wa.me/'+WHATSAPP+'?text='+encodeURIComponent(msg),'_blank')
    const atualizado = {...pedidoEmPagamento, status:'COMPROVANTE_ENVIADO', comprovante_enviado_em:new Date().toISOString()}
    setPedidos(prev=> prev.map(p=> p.id===atualizado.id ? atualizado : p))
    setPedidoEmPagamento(atualizado)
    if(supabase){ try{ await supabase.from('pedidos').update({status:'COMPROVANTE_ENVIADO'}).eq('id', atualizado.id) }catch{} }
    // Notificar ADM via Broadcast
    try{
      const bc = new BroadcastChannel('ccsp_realtime')
      bc.postMessage({type:'novo_comprovante', pedido:atualizado})
      bc.close()
    }catch{}
    showToast('Comprovante enviado! Aguarde aprovação do ADM - som no ADM 🔊')
    playSound('comprovante')
    setView('cliente')
  }

  async function aprovarComprovante(pedidoId){
    const p = pedidos.find(x=>x.id===pedidoId)
    if(!p) return
    const novo = {...p, status:'PROCURANDO_MONTADOR', aprovado_em:new Date().toISOString(), aprovado_por:currentUser.nome}
    setPedidos(prev=> prev.map(x=> x.id===pedidoId ? novo : x))
    if(supabase){ try{ await supabase.from('pedidos').update({status:'PROCURANDO_MONTADOR'}).eq('id', pedidoId) }catch{} }
    try{ const bc = new BroadcastChannel('ccsp_realtime'); bc.postMessage({type:'novo_pedido', pedido:novo}); bc.close() }catch{}
    showToast('✅ Comprovante aprovado! Pedido liberado para montadores de '+novo.cidade)
    playSound('accept')
  }

  async function reprovarComprovante(pedidoId){
    const motivo = prompt('Motivo da reprovação (opcional):') || 'Comprovante inválido'
    const p = pedidos.find(x=>x.id===pedidoId)
    if(!p) return
    const novo = {...p, status:'AGUARDANDO_PAGAMENTO', motivo_reprova:motivo}
    setPedidos(prev=> prev.map(x=> x.id===pedidoId ? novo : x))
    if(supabase){ try{ await supabase.from('pedidos').update({status:'AGUARDANDO_PAGAMENTO'}).eq('id', pedidoId) }catch{} }
    showToast('❌ Comprovante reprovado. Cliente deve reenviar')
    playSound('alert')
  }

  async function aceitarPedido(pedidoId){
    const p = pedidos.find(x=>x.id===pedidoId)
    if(!p){ showToast('Pedido não encontrado'); return }
    if(p.status!=='PROCURANDO_MONTADOR'){ showToast('Este serviço acabou de ser aceito por outro montador.'); playSound('alert'); return }
    const novo = {...p, status:'ACEITO', montador_id:currentUser.id, montador_nome:currentUser.nome, montador_telefone:currentUser.telefone, aceito_em:new Date().toISOString()}
    setPedidos(prev=> prev.map(x=> x.id===pedidoId ? novo : x))
    if(supabase){ try{ await supabase.from('pedidos').update({status:'ACEITO', montador_id:currentUser.id, montador_nome:currentUser.nome}).eq('id', pedidoId) }catch{} }
    try{ const bc = new BroadcastChannel('ccsp_realtime'); bc.postMessage({type:'update_pedido', pedido:novo}); bc.close() }catch{}
    showToast('✅ Pedido aceito! Entre em contato com cliente')
    playSound('accept')
  }

  function finalizarPedido(pedidoId){
    const novo = pedidos.find(x=>x.id===pedidoId)
    if(!novo) return
    const atualizado = {...novo, status:'FINALIZADO', finalizado_em:new Date().toISOString()}
    setPedidos(prev=> prev.map(x=> x.id===pedidoId ? atualizado : x))
    if(supabase){ try{ supabase.from('pedidos').update({status:'FINALIZADO'}).eq('id', pedidoId) }catch{} }
    showToast('Pedido finalizado!')
    playSound('accept')
  }

  function toggleDisponivel(){
    const novoStatus = !currentUser.status_disponivel
    const atualizado = {...currentUser, status_disponivel:novoStatus}
    setCurrentUser(atualizado)
    setUsuarios(usuarios.map(u=> u.id===currentUser.id ? atualizado : u))
    if(supabase){ try{ supabase.from('usuarios').update({status_disponivel:novoStatus}).eq('id', currentUser.id) }catch{} }
    showToast(novoStatus ? '✅ Disponível - receberá pedidos com som 🔊' : '⏸️ Offline')
    playSound(novoStatus ? 'accept' : 'alert')
  }

  // ============ DADOS PARA PAINÉIS ============
  const pedidosCliente = pedidos.filter(p=> currentUser && p.cliente_id===currentUser.id)
  const pedidosParaAprovar = pedidos.filter(p=> p.status==='COMPROVANTE_ENVIADO')
  const pedidosMontadorPendentes = pedidos.filter(p=>{
    if(p.status!=='PROCURANDO_MONTADOR') return false
    if(!currentUser || currentUser.tipo!=='MONTADOR') return false
    const atende = currentUser.cidades_atende || (currentUser.cidade_atende ? [currentUser.cidade_atende] : [])
    if(atende.length===0) return true
    return atende.includes(p.cidade)
  })
  const pedidosMontadorMeus = pedidos.filter(p=> currentUser && p.montador_id===currentUser.id)
  const financeiroCliente = {total: pedidosCliente.reduce((a,p)=>a+p.valor_bruto,0)}
  const financeiroMontador = {realizado: pedidosMontadorMeus.filter(p=>p.status==='FINALIZADO').reduce((a,p)=>a+p.valor_liquido,0), aReceber: pedidosMontadorMeus.filter(p=>p.status==='ACEITO').reduce((a,p)=>a+p.valor_liquido,0)}
  const agora = new Date(); const mesAtual = agora.getMonth(); const anoAtual = agora.getFullYear()
  const pedidosMes = pedidos.filter(p=>{ const d=new Date(p.created_at); return d.getMonth()===mesAtual && d.getFullYear()===anoAtual })
  const adminFinanceiro = {
    totalPedidosMes: pedidosMes.reduce((a,p)=>a+p.valor_bruto,0),
    comissaoMes: pedidosMes.reduce((a,p)=>a+p.comissao,0),
    totalRepasseMes: pedidosMes.filter(p=>p.status==='FINALIZADO').reduce((a,p)=>a+p.valor_liquido,0),
    pendenteRepasse: pedidos.filter(p=>p.status==='ACEITO').reduce((a,p)=>a+p.valor_liquido,0),
    countMes: pedidosMes.length,
    aguardandoAprovacao: pedidosParaAprovar.length
  }

  // ============ RENDER ============
  return (
    <div style={{minHeight:'100vh', background:'#0A0A0A', color:'#fff', fontFamily:'Poppins, sans-serif'}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap'); .premium-card{background:#1A1A1A; border:1px solid #2A2A2A; border-radius:16px; box-shadow:0 8px 24px rgba(0,0,0,0.4);} .uber-input{background:#1E1E1E; border:1.5px solid #2A2A2A; color:#fff; border-radius:12px; padding:12px; width:100%; box-sizing:border-box;} .uber-input:focus{border-color:#FF7A00; outline:none;} .status-badge{font-size:10px; padding:4px 8px; border-radius:20px; font-weight:700;}`}</style>

      <header style={{background:'#000', padding:'12px 16px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, zIndex:50, borderBottom:'1px solid #1A1A1A'}}>
        <div style={{display:'flex', alignItems:'center', gap:10, cursor:'pointer'}} onClick={()=>{
          const now=Date.now()
          if(!window._lastTap) window._lastTap=0
          if(now-window._lastTap>3000) setLogoTaps(1); else { const n=logoTaps+1; setLogoTaps(n); if(n>=5){ setView('admin'); setTab('comprovantes'); setLogoTaps(0); showToast('🔐 Admin acessado - Som ativo 🔊'); playSound('comprovante') } }
          window._lastTap=now
          if(currentUser){
            if(currentUser.tipo==='CLIENTE') setView('cliente')
            else if(currentUser.tipo==='MONTADOR') setView('montador')
            else setView('admin')
          } else setView('home')
        }}>
          <div style={{width:42,height:42, borderRadius:12, background:'#fff', display:'grid', placeItems:'center'}}>
            <svg width="28" height="28" viewBox="0 0 42 42"><path d="M21 4C13 4 7 10 7 18C7 28 21 38 21 38C21 38 35 28 35 18C35 10 29 4 21 4Z" fill="#2D5CFF"/><circle cx="21" cy="17" r="8" fill="white"/><path d="M15 17.5 L19 21.5 L27 13.5" stroke="#FF7A00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
          </div>
          <div><div style={{fontWeight:800, color:'#fff', fontSize:13}}>CONTATO CERTO SP</div><div style={{fontSize:9, color:'#FF7A00', fontWeight:600}}>UBER BLACK • 645 CIDADES • FLUXO ORGANIZADO</div></div>
        </div>
        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          {!currentUser && <><button onClick={()=>setView('login')} style={{background:'transparent', color:'#fff', border:'1px solid #2A2A2A', borderRadius:12, padding:'8px 14px', fontSize:12, fontWeight:600}}>Entrar</button><button onClick={()=>{setCadTipo('CLIENTE'); setView('cadastro')}} style={{background:'#FF7A00', color:'#fff', border:'none', borderRadius:12, padding:'8px 14px', fontSize:12, fontWeight:700}}>Cadastro</button></>}
          {currentUser && <><span style={{fontSize:11, color:'#A0A0A0'}}>{currentUser.nome} • {currentUser.tipo}</span><button onClick={()=>{setCurrentUser(null); localStorage.removeItem('ccsp_user'); localStorage.removeItem('ccsp_view'); setView('home')}} style={{background:'#1A1A1A', color:'#fff', border:'1px solid #2A2A2A', borderRadius:12, padding:'6px 10px', fontSize:11}}>Sair</button></>}
        </div>
      </header>

      {toast && <div style={{position:'fixed', bottom:20, left:'50%', transform:'translateX(-50%)', background:'#1A1A1A', border:'1px solid #FF7A00', color:'#fff', padding:'12px 20px', borderRadius:12, zIndex:200, fontSize:13, boxShadow:'0 10px 30px rgba(0,0,0,0.5)', maxWidth:'90%', textAlign:'center'}}>{toast}</div>}

      {view==='home' && (
        <div style={{maxWidth:1100, margin:'0 auto', padding:16}}>
          {!currentUser && (
            <div className="premium-card" style={{padding:20, textAlign:'center', border:'1px solid #FF7A00', marginBottom:16, background:'linear-gradient(135deg,#1A1A1A 0%,#111 100%)'}}>
              <h2 style={{fontSize:18, color:'#fff'}}>Cadastro Obrigatório para acessar</h2>
              <p style={{fontSize:12, color:'#A0A0A0', marginTop:4}}>Fluxo organizado: PIX → Comprovante → ADM aprova → Montador aceita • Som em todos painéis 🔊</p>
              <div style={{display:'flex', gap:12, marginTop:16, justifyContent:'center', flexWrap:'wrap'}}>
                <button onClick={()=>{setCadTipo('CLIENTE'); setView('cadastro')}} style={{background:'#fff', color:'#000', padding:'20px 30px', borderRadius:12, border:'none', fontWeight:800, fontSize:16, cursor:'pointer'}}>👤 Sou Cliente</button>
                <button onClick={()=>{setCadTipo('MONTADOR'); setView('cadastro')}} style={{background:'#FF7A00', color:'#fff', padding:'20px 30px', borderRadius:12, border:'none', fontWeight:800, fontSize:16, cursor:'pointer'}}>🔧 Sou Montador (até 5 cidades)</button>
              </div>
              <div style={{marginTop:12}}><span onClick={()=>setView('login')} style={{color:'#FF7A00', fontSize:13, cursor:'pointer', textDecoration:'underline'}}>Já tenho cadastro</span></div>
            </div>
          )}
          <div style={{background:'radial-gradient(800px at 20% -10%, rgba(255,122,0,0.15) 0%, transparent 60%), #0A0A0A', border:'1px solid #1A1A1A', borderRadius:16, padding:24}}>
            <h1 style={{fontSize:22, fontWeight:800, color:'#fff'}}>MONTADOR EM 645 CIDADES DE SP - UBER BLACK</h1>
            <p style={{marginTop:8, fontSize:13, color:'#A0A0A0'}}>Catálogo sem preço na lista • Valores exatos no modal • Montador escolhe até 5 cidades • ADM aprova comprovante antes de liberar</p>
            <div style={{marginTop:16, display:'flex', gap:8, flexWrap:'wrap'}}>
              <input placeholder="Buscar: guarda roupa, cama, rack..." value={busca} onChange={e=>setBusca(e.target.value)} style={{flex:1, minWidth:220}} className="uber-input"/>
              <select value={filtroCat} onChange={e=>setFiltroCat(e.target.value)} className="uber-input" style={{width:160}}><option>Todos</option><option>Dormitório</option><option>Sala</option><option>Cozinha</option><option>Escritório</option></select>
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
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100, padding:16}} onClick={()=>{setSelectedMovel(null); setServicoTipo('')}}>
          <div className="premium-card" style={{padding:20, maxWidth:520, width:'100%', maxHeight:'90vh', overflowY:'auto', background:'#161616'}} onClick={e=>e.stopPropagation()}>
            <div style={{display:'flex', justifyContent:'space-between'}}><h3 style={{color:'#fff'}}>{selectedMovel.nome}</h3><button onClick={()=>{setSelectedMovel(null); setServicoTipo('')}} style={{background:'#1E1E1E', border:'1px solid #2A2A2A', color:'#fff', borderRadius:8, padding:'6px 10px'}}>X</button></div>
            <div style={{marginTop:16, fontWeight:700, color:'#A0A0A0', fontSize:12}}>Escolha o serviço (valores exatos):</div>
            {[
              {id:'novo', label:'Montar Novo', valor:selectedMovel.novo},
              {id:'usado', label:'Montar Usado', valor:selectedMovel.usado},
              {id:'desmontar', label:'Desmontar', valor:selectedMovel.desmontar}
            ].map(opt=>(
              <div key={opt.id} onClick={()=>setServicoTipo(opt.id)} style={{border:'1.5px solid '+(servicoTipo===opt.id?'#FF7A00':'#2A2A2A'), background:servicoTipo===opt.id?'#1E1E1E':'#1A1A1A', borderRadius:12, padding:14, marginTop:10, cursor:'pointer', display:'flex', justifyContent:'space-between'}}><span style={{color:'#fff'}}><input type="radio" checked={servicoTipo===opt.id} readOnly/> {opt.label}</span><b style={{color:'#FF7A00'}}>{opt.valor}</b></div>
            ))}
            {servicoTipo && <div style={{marginTop:16, background:'#1E1E1E', padding:14, borderRadius:12, border:'1px solid #2A2A2A'}}><div style={{fontWeight:800, color:'#fff'}}>{selectedMovel.nome} - {servicoTipo==='novo'?'Novo':servicoTipo==='usado'?'Usado':'Desmontar'}</div><div style={{fontWeight:800, fontSize:22, color:'#FF7A00', marginTop:6}}>{servicoTipo==='novo'?selectedMovel.novo:servicoTipo==='usado'?selectedMovel.usado:selectedMovel.desmontar}</div><div style={{fontSize:11, color:'#A0A0A0', marginTop:4}}>Fluxo: PIX → Comprovante → ADM aprova → Montador</div></div>}
            {currentUser && currentUser.tipo==='CLIENTE' && servicoTipo && (
              <div id="endereco-form" style={{marginTop:20, borderTop:'1px solid #2A2A2A', paddingTop:16}}>
                <h4 style={{color:'#fff'}}>Endereço do serviço - 645 cidades</h4>
                <div style={{display:'grid', gap:8, marginTop:10}}>
                  <select value={formData.cidade} onChange={e=>setFormData({...formData,cidade:e.target.value})} className="uber-input"><option value="">Cidade do serviço (645)</option>{CIDADES_SP.map(c=><option key={c} value={c}>{c}</option>)}</select>
                  <div style={{display:'flex', gap:8}}><input placeholder="Bairro" value={formData.bairro} onChange={e=>setFormData({...formData,bairro:e.target.value})} className="uber-input"/><input placeholder="Rua" value={formData.rua} onChange={e=>setFormData({...formData,rua:e.target.value})} className="uber-input"/></div>
                  <div style={{display:'flex', gap:8}}><input placeholder="Nº" value={formData.numero} onChange={e=>setFormData({...formData,numero:e.target.value})} className="uber-input" style={{width:80}}/><input type="date" value={formData.data} onChange={e=>setFormData({...formData,data:e.target.value})} className="uber-input" style={{flex:1}}/><input type="time" value={formData.horario} onChange={e=>setFormData({...formData,horario:e.target.value})} className="uber-input" style={{flex:1}}/></div>
                  <div style={{marginTop:8, border:'1.5px dashed #2A2A2A', borderRadius:12, padding:12}}><label style={{fontWeight:700, fontSize:13, color:'#A0A0A0'}}>📸 Foto do móvel (até 3)</label><input type="file" accept="image/*" multiple onChange={e=>{ const files=Array.from(e.target.files); files.forEach(file=>{ const reader=new FileReader(); reader.onload=(ev)=>{ setFormFotos(prev=>{ if(prev.length>=3){ showToast('Máximo 3 fotos'); return prev } return [...prev, ev.target.result] }); }; reader.readAsDataURL(file); }) }} style={{marginTop:6, width:'100%', color:'#fff'}}/><div style={{display:'flex', gap:8, marginTop:8, flexWrap:'wrap'}}>{formFotos.map((f,i)=>(<div key={i} style={{position:'relative'}}><img src={f} style={{width:80,height:80,borderRadius:8,objectFit:'cover'}}/><button onClick={()=>setFormFotos(formFotos.filter((_,idx)=>idx!==i))} style={{position:'absolute',top:-6,right:-6,background:'#ff4444',color:'#fff',border:'none',borderRadius:'50%',width:20,height:20,fontSize:10}}>X</button></div>))}</div></div>
                  <button onClick={criarPedido} style={{background:'#fff', color:'#000', border:'none', borderRadius:12, padding:'12px', fontWeight:700, cursor:'pointer'}}>Criar pedido - ir para PIX</button>
                </div>
              </div>
            )}
            {!currentUser && servicoTipo && <div style={{marginTop:12, textAlign:'center'}}><button onClick={()=>setView('cadastro')} style={{background:'#FF7A00', color:'#fff', border:'none', borderRadius:12, padding:'12px 20px', fontWeight:700}}>Faça cadastro para continuar</button></div>}
          </div>
        </div>
      )}

      {view==='cadastro' && (
        <div style={{maxWidth:560, margin:'20px auto', padding:16}}>
          <div className="premium-card" style={{padding:20}}>
            <h2 style={{color:'#fff'}}>Cadastro Obrigatório Uber Black</h2>
            <p style={{fontSize:11, color:'#A0A0A0'}}>Anti-duplicidade: email e telefone únicos • Montador até 5 cidades</p>
            <form onSubmit={handleCadastro} style={{display:'grid', gap:10, marginTop:12}}>
              <select value={cadTipo} onChange={e=>setCadTipo(e.target.value)} className="uber-input"><option value="CLIENTE">Sou Cliente</option><option value="MONTADOR">Sou Montador (até 5 cidades)</option></select>
              <input name="nome" required placeholder="Nome completo" className="uber-input"/>
              <input name="email" required placeholder="E-mail (único)" className="uber-input"/>
              <input name="senha" required type="password" placeholder="Senha" className="uber-input"/>
              <input name="telefone" required placeholder="WhatsApp/Telefone (único)" className="uber-input"/>
              <select name="cidade" required className="uber-input"><option value="">Cidade onde mora (645)</option>{CIDADES_SP.map(c=><option key={c} value={c}>{c}</option>)}</select>
              {cadTipo==='MONTADOR' && (
                <div style={{display:'grid', gap:10, background:'#111', padding:12, borderRadius:10, border:'1px solid #FF7A00'}}>
                  <div style={{fontWeight:700, fontSize:12, color:'#FF7A00'}}>Montador - até 5 cidades que atende (obrigatório)</div>
                  <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>
                    <select onChange={e=>{ const cid=e.target.value; if(!cid) return; if(cidadesAtende.includes(cid)){ showToast('Cidade já adicionada'); return } if(cidadesAtende.length>=5){ showToast('Máximo 5 cidades'); return } setCidadesAtende([...cidadesAtende, cid]) }} className="uber-input" style={{flex:1}}>
                      <option value="">+ Adicionar cidade que atende</option>{CIDADES_SP.map(c=><option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>{cidadesAtende.map((c,i)=><span key={c} style={{background:'#1E1E1E', border:'1px solid #FF7A00', padding:'6px 10px', borderRadius:20, fontSize:12, display:'flex', alignItems:'center', gap:6}}>{c} <b onClick={()=>setCidadesAtende(cidadesAtende.filter((_,idx)=>idx!==i))} style={{cursor:'pointer', color:'#ff4444'}}>×</b></span>)}{cidadesAtende.length===0 && <span style={{fontSize:11, color:'#A0A0A0'}}>Nenhuma cidade selecionada</span>}</div>
                  <div style={{fontSize:11, color:'#A0A0A0'}}>{cidadesAtende.length}/5 cidades selecionadas</div>
                  <div><label style={{fontSize:12, fontWeight:600, color:'#A0A0A0'}}>📸 Foto de perfil (obrigatório)</label><input type="file" accept="image/*" onChange={e=>{ const file=e.target.files[0]; if(!file) return; const r=new FileReader(); r.onload=(ev)=> setFotoPerfilTmp(ev.target.result); r.readAsDataURL(file) }} style={{marginTop:6, width:'100%', color:'#fff'}}/>{fotoPerfilTmp && <img src={fotoPerfilTmp} style={{width:80,height:80,borderRadius:50,marginTop:8,objectFit:'cover'}}/>}</div>
                  <input name="chave_pix" required placeholder="Chave PIX no seu próprio nome (obrigatório)" className="uber-input"/>
                </div>
              )}
              <button style={{background:'#FF7A00', color:'#fff', border:'none', borderRadius:12, padding:'14px', fontWeight:700, cursor:'pointer'}}>Finalizar Cadastro - Anti-duplicidade ativo</button>
              <div style={{textAlign:'center'}}><span onClick={()=>setView('login')} style={{color:'#FF7A00', fontSize:12, cursor:'pointer', textDecoration:'underline'}}>Já tenho cadastro</span></div>
            </form>
          </div>
        </div>
      )}

      {view==='login' && (
        <div style={{maxWidth:400, margin:'20px auto', padding:16}}>
          <div className="premium-card" style={{padding:20}}>
            <h2 style={{color:'#fff'}}>Entrar - Uber Black</h2>
            <p style={{fontSize:11, color:'#A0A0A0'}}>ADM: AndreSousa84 / 20112024 • Som em todos painéis 🔊</p>
            <form onSubmit={handleLogin} style={{display:'grid', gap:10, marginTop:12}}>
              <input name="email" placeholder="E-mail ou AndreSousa84" className="uber-input"/>
              <input name="senha" type="password" placeholder="Senha (ADM 20112024)" className="uber-input"/>
              <button style={{background:'#fff', color:'#000', border:'none', borderRadius:12, padding:'12px', fontWeight:700, cursor:'pointer'}}>Entrar</button>
              <div style={{textAlign:'center'}}><span onClick={()=>{setCadTipo('CLIENTE'); setView('cadastro')}} style={{color:'#FF7A00', fontSize:12, cursor:'pointer', textDecoration:'underline'}}>Ainda não tenho cadastro</span></div>
            </form>
          </div>
        </div>
      )}

      {view==='pagamento' && pedidoEmPagamento && (
        <div style={{maxWidth:480, margin:'20px auto', padding:16}}>
          <div className="premium-card" style={{padding:20, textAlign:'center'}}>
            <h3 style={{color:'#fff'}}>Pagamento PIX - Uber Black</h3>
            <p style={{fontSize:11, color:'#A0A0A0'}}>Após pagar, envie comprovante → ADM aprova com som 🔊 → libera para montadores</p>
            <div style={{background:'#1E1E1E', border:'1px solid #FF7A00', padding:16, borderRadius:12, margin:'16px 0'}}>
              <div style={{fontSize:12, color:'#A0A0A0'}}>Chave PIX oficial (só aparece aqui):</div>
              <div style={{fontWeight:800, wordBreak:'break-all', color:'#fff', marginTop:4, fontSize:14}}>{PIX}</div>
              <button onClick={()=>{navigator.clipboard.writeText(PIX); showToast('PIX copiado!'); playSound('accept')}} style={{marginTop:10, background:'#FF7A00', color:'#fff', border:'none', borderRadius:8, padding:'8px 12px', cursor:'pointer'}}>📋 COPIAR PIX</button>
            </div>
            <div style={{textAlign:'left', fontSize:13, background:'#111', padding:12, borderRadius:10, border:'1px solid #2A2A2A', color:'#A0A0A0'}}>Pedido #{pedidoEmPagamento.numero}<br/>{pedidoEmPagamento.movel_nome} - {pedidoEmPagamento.servico_label}<br/>Valor: <b style={{color:'#FF7A00'}}>{pedidoEmPagamento.valor_txt}</b><br/>Cidade: {pedidoEmPagamento.cidade}<br/>Status: {pedidoEmPagamento.status}</div>
            <button onClick={enviarComprovante} style={{width:'100%', marginTop:16, background:'#25D366', color:'#fff', border:'none', borderRadius:12, padding:'14px', fontWeight:700, cursor:'pointer'}}>📲 ENVIAR COMPROVANTE WHATSAPP + NOTIFICAR ADM 🔊</button>
            <button onClick={()=>setView('cliente')} style={{background:'none', border:'none', marginTop:12, color:'#A0A0A0', cursor:'pointer'}}>Voltar ao painel</button>
          </div>
        </div>
      )}

      {view==='cliente' && currentUser && (
        <div style={{maxWidth:900, margin:'0 auto', padding:16}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16}}><h2 style={{color:'#fff'}}>Painel Cliente Premium 🔊</h2><div style={{fontSize:12, color:'#A0A0A0'}}>Som ativo: pedido aceito</div></div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:10, marginBottom:16}}>
            <div className="premium-card" style={{padding:14}}><div style={{fontSize:11, color:'#A0A0A0'}}>Total Pedidos</div><div style={{fontWeight:800, fontSize:20, color:'#fff'}}>R$ {financeiroCliente.total}</div></div>
            <div className="premium-card" style={{padding:14}}><div style={{fontSize:11, color:'#A0A0A0'}}>Pendentes</div><div style={{fontWeight:800, fontSize:20, color:'#FF7A00'}}>{pedidosCliente.filter(p=>p.status!=='FINALIZADO').length}</div></div>
            <div className="premium-card" style={{padding:14}}><div style={{fontSize:11, color:'#A0A0A0'}}>Finalizados</div><div style={{fontWeight:800, fontSize:20, color:'#16A34A'}}>{pedidosCliente.filter(p=>p.status==='FINALIZADO').length}</div></div>
          </div>
          <div style={{display:'flex', gap:8, marginBottom:12, flexWrap:'wrap'}}>
            {['pendentes','comprovantes','finalizados','financeiro'].map(t=>(<button key={t} onClick={()=>setTab(t)} style={{padding:'8px 14px', borderRadius:12, border:'1px solid #2A2A2A', background:tab===t?'#fff':'#1A1A1A', color:tab===t?'#000':'#fff', fontWeight:600, fontSize:12, cursor:'pointer'}}>{t.toUpperCase()}</button>))}
            <button onClick={()=>setView('home')} style={{padding:'8px 14px', borderRadius:12, border:'1px solid #FF7A00', background:'#FF7A00', color:'#fff', fontSize:12, cursor:'pointer'}}>Ver Catálogo</button>
          </div>
          {tab==='pendentes' && <div style={{display:'grid', gap:8}}>{pedidosCliente.filter(p=>['AGUARDANDO_PAGAMENTO','COMPROVANTE_ENVIADO','PROCURANDO_MONTADOR','ACEITO'].includes(p.status)).map(p=>(<div key={p.id} className="premium-card" style={{padding:12, borderLeft:'4px solid '+(p.status==='COMPROVANTE_ENVIADO'?'#2D5CFF':p.status==='PROCURANDO_MONTADOR'?'#FF7A00':p.status==='ACEITO'?'#16A34A':'#555')}}><div style={{display:'flex', justifyContent:'space-between'}}><b style={{color:'#fff'}}>#{p.numero} {p.movel_nome} {p.valor_txt}</b><span className="status-badge" style={{background:p.status==='COMPROVANTE_ENVIADO'?'#2D5CFF':p.status==='PROCURANDO_MONTADOR'?'#FF7A00':p.status==='ACEITO'?'#16A34A':'#333', color:'#fff'}}>{p.status}</span></div><div style={{fontSize:11, color:'#A0A0A0', marginTop:4}}>{p.cidade} • {p.servico_label} {p.motivo_reprova? '• Reprovado: '+p.motivo_reprova:''}</div>{p.status==='AGUARDANDO_PAGAMENTO' && <button onClick={()=>{setPedidoEmPagamento(p); setView('pagamento')}} style={{marginTop:8, background:'#FF7A00', color:'#fff', border:'none', borderRadius:8, padding:'6px 12px', fontSize:11, cursor:'pointer'}}>Ver Pagamento PIX</button>}</div>))}{pedidosCliente.filter(p=>['AGUARDANDO_PAGAMENTO','COMPROVANTE_ENVIADO','PROCURANDO_MONTADOR','ACEITO'].includes(p.status)).length===0 && <div style={{color:'#A0A0A0'}}>Nenhum pedido pendente</div>}</div>}
          {tab==='comprovantes' && <div style={{display:'grid', gap:8}}>{pedidosCliente.filter(p=>p.status==='COMPROVANTE_ENVIADO').map(p=>(<div key={p.id} className="premium-card" style={{padding:12, background:'#1E1E1E', border:'1px solid #2D5CFF'}}><div style={{color:'#fff'}}>#{p.numero} {p.movel_nome} - Aguardando aprovação ADM 🔊</div><div style={{fontSize:11, color:'#A0A0A0'}}>Enviado em {new Date(p.comprovante_enviado_em||p.created_at).toLocaleString()}</div></div>))}</div>}
          {tab==='finalizados' && <div style={{display:'grid', gap:8}}>{pedidosCliente.filter(p=>p.status==='FINALIZADO').map(p=>(<div key={p.id} className="premium-card" style={{padding:12, borderLeft:'4px solid #16A34A'}}><div style={{color:'#fff'}}>#{p.numero} {p.movel_nome} {p.valor_txt} - Finalizado por {p.montador_nome||'-'}</div></div>))}{pedidosCliente.filter(p=>p.status==='FINALIZADO').length===0 && <div style={{color:'#A0A0A0'}}>Nenhum finalizado</div>}</div>}
          {tab==='financeiro' && <div className="premium-card" style={{padding:16}}><div style={{color:'#fff', fontWeight:700}}>Financeiro Cliente 🔊</div><div style={{marginTop:10, color:'#A0A0A0'}}>Total: R$ {financeiroCliente.total} | Pedidos: {pedidosCliente.length}</div></div>}
        </div>
      )}

      {view==='montador' && currentUser && (
        <div style={{maxWidth:900, margin:'0 auto', padding:16}}>
          <div className="premium-card" style={{padding:12, display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16, flexWrap:'wrap', gap:10}}>
            <div style={{display:'flex', gap:10, alignItems:'center'}}>{currentUser.foto_perfil && <img src={currentUser.foto_perfil} style={{width:50,height:50,borderRadius:25, objectFit:'cover'}}/>}<div><div style={{color:'#fff', fontWeight:700}}>{currentUser.nome} 🔊</div><div style={{fontSize:11, color:'#A0A0A0'}}>Atende: {(currentUser.cidades_atende||[currentUser.cidade_atende]).join(', ')} • PIX: {currentUser.chave_pix}</div></div></div>
            <div style={{display:'flex', gap:8, alignItems:'center'}}><span style={{fontSize:11, color:currentUser.status_disponivel?'#16A34A':'#A0A0A0'}}>{currentUser.status_disponivel ? 'Disponível - Som ativo 🔊' : 'Offline'}</span><div onClick={toggleDisponivel} style={{width:50,height:28, borderRadius:20, background:currentUser.status_disponivel?'#16A34A':'#2A2A2A', position:'relative', cursor:'pointer'}}><div style={{width:24,height:24, borderRadius:'50%', background:'#fff', position:'absolute', top:2, left:currentUser.status_disponivel?24:2, transition:'0.2s'}}></div></div></div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:10, marginBottom:16}}>
            <div className="premium-card" style={{padding:14}}><div style={{fontSize:11, color:'#A0A0A0'}}>Disponíveis na sua região</div><div style={{fontWeight:800, fontSize:20, color:'#fff'}}>{pedidosMontadorPendentes.length}</div><div style={{fontSize:10, color:'#A0A0A0'}}>Som triplo beep ativo</div></div>
            <div className="premium-card" style={{padding:14}}><div style={{fontSize:11, color:'#A0A0A0'}}>A Receber</div><div style={{fontWeight:800, fontSize:20, color:'#FF7A00'}}>R$ {financeiroMontador.aReceber}</div></div>
            <div className="premium-card" style={{padding:14}}><div style={{fontSize:11, color:'#A0A0A0'}}>Realizado</div><div style={{fontWeight:800, fontSize:20, color:'#16A34A'}}>R$ {financeiroMontador.realizado}</div></div>
          </div>
          <div style={{display:'flex', gap:8, marginBottom:12}}>
            {['pendentes','meus','financeiro'].map(t=>(<button key={t} onClick={()=>setTab(t)} style={{padding:'8px 14px', borderRadius:12, border:'1px solid #2A2A2A', background:tab===t?'#fff':'#1A1A1A', color:tab===t?'#000':'#fff', fontSize:12, cursor:'pointer'}}>{t.toUpperCase()} {t==='pendentes' && pedidosMontadorPendentes.length>0 ? '('+pedidosMontadorPendentes.length+')' : ''}</button>))}
          </div>
          {tab==='pendentes' && <div style={{display:'grid', gap:10}}>{pedidosMontadorPendentes.map(p=>(<div key={p.id} className="premium-card" style={{padding:12, borderLeft:'4px solid #FF7A00'}}><div style={{display:'flex', justifyContent:'space-between', gap:10}}><div><b style={{color:'#fff'}}>#{p.numero} {p.movel_nome} {p.valor_txt}</b><div style={{fontSize:11, color:'#A0A0A0'}}>{p.cidade} • {p.bairro||''} {p.rua||''} • {p.servico_label} • Cliente: {p.cliente_nome} {p.cliente_telefone}</div>{p.fotos && <div style={{display:'flex', gap:6, marginTop:6}}>{p.fotos.map((f,i)=><img key={i} src={f} style={{width:60,height:60,borderRadius:8,objectFit:'cover'}}/>)}</div>}</div><div style={{display:'flex', flexDirection:'column', gap:6}}><button onClick={()=>aceitarPedido(p.id)} style={{background:'#FF7A00', color:'#fff', border:'none', borderRadius:8, padding:'10px 14px', fontWeight:700, fontSize:12, cursor:'pointer'}}>✅ ACEITAR - SOM 🔊</button></div></div></div>))}{pedidosMontadorPendentes.length===0 && <div style={{color:'#A0A0A0', textAlign:'center', padding:20}}>Nenhum pedido pendente em {(currentUser.cidades_atende||[currentUser.cidade_atende]).join(', ')}.<br/>Deixe Disponível ON com som ativo 🔊</div>}</div>}
          {tab==='meus' && <div style={{display:'grid', gap:8}}>{pedidosMontadorMeus.map(p=>(<div key={p.id} className="premium-card" style={{padding:12, borderLeft:'4px solid '+(p.status==='FINALIZADO'?'#16A34A':'#FF7A00')}}><div style={{color:'#fff', fontWeight:700}}>#{p.numero} {p.movel_nome} {p.valor_txt} - {p.status}</div><div style={{fontSize:11, color:'#A0A0A0'}}>{p.cidade} • Cliente: {p.cliente_nome} {p.cliente_telefone} • {p.bairro} {p.rua}</div>{p.status==='ACEITO' && <button onClick={()=>finalizarPedido(p.id)} style={{marginTop:8, background:'#16A34A', color:'#fff', border:'none', borderRadius:8, padding:'6px 12px', fontSize:11, cursor:'pointer'}}>Finalizar Pedido</button>}</div>))}{pedidosMontadorMeus.length===0 && <div style={{color:'#A0A0A0'}}>Nenhum pedido aceito ainda</div>}</div>}
          {tab==='financeiro' && <div className="premium-card" style={{padding:16}}><div style={{color:'#fff', fontWeight:700}}>Financeiro Montador 🔊 Som ativo</div><div style={{marginTop:10, color:'#A0A0A0'}}>Realizado: R$ {financeiroMontador.realizado} | A Receber: R$ {financeiroMontador.aReceber} | Pedidos: {pedidosMontadorMeus.length}</div></div>}
        </div>
      )}

      {view==='admin' && (
        <div style={{maxWidth:1100, margin:'0 auto', padding:16}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}><h2 style={{color:'#fff'}}>Painel ADM Uber Black 🔊</h2><div style={{fontSize:11, color:'#FF7A00'}}>Admin: AndreSousa84 / 20112024 • 5 toques logo</div></div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:10, marginTop:12}}>
            <div className="premium-card" style={{padding:12, background: adminFinanceiro.aguardandoAprovacao>0 ? '#2D5CFF' : '#1A1A1A', border: adminFinanceiro.aguardandoAprovacao>0 ? '2px solid #FF7A00' : '1px solid #2A2A2A'}}><div style={{fontSize:11, color:'#fff'}}>💰 Comprovantes p/ aprovar</div><div style={{fontWeight:800, fontSize:24, color:'#fff'}}>{adminFinanceiro.aguardandoAprovacao}</div><div style={{fontSize:10, color:'#fff'}}>{adminFinanceiro.aguardandoAprovacao>0 ? '🔊 Som ativo - aprovar!' : 'Nenhum pendente'}</div></div>
            <div className="premium-card" style={{padding:12}}><div style={{fontSize:11, color:'#A0A0A0'}}>Total pedidos mês ({adminFinanceiro.countMes})</div><div style={{fontWeight:800, fontSize:20, color:'#fff'}}>R$ {adminFinanceiro.totalPedidosMes}</div></div>
            <div className="premium-card" style={{padding:12}}><div style={{fontSize:11, color:'#A0A0A0'}}>Comissão 10% mês</div><div style={{fontWeight:800, fontSize:20, color:'#FF7A00'}}>R$ {adminFinanceiro.comissaoMes}</div></div>
            <div className="premium-card" style={{padding:12}}><div style={{fontSize:11, color:'#A0A0A0'}}>A repassar pendente</div><div style={{fontWeight:800, fontSize:20, color:'#fff'}}>R$ {adminFinanceiro.pendenteRepasse}</div></div>
          </div>
          <div style={{display:'flex', gap:8, marginTop:16, flexWrap:'wrap'}}>
            {['comprovantes','pedidos','usuarios','cupons','financeiro'].map(t=>(<button key={t} onClick={()=>setTab(t)} style={{padding:'8px 14px', borderRadius:12, border:'1px solid #2A2A2A', background:tab===t?'#fff':'#1A1A1A', color:tab===t?'#000':'#fff', fontSize:12, fontWeight:600, cursor:'pointer'}}>{t.toUpperCase()} {t==='comprovantes' && adminFinanceiro.aguardandoAprovacao>0 ? '('+adminFinanceiro.aguardandoAprovacao+') 🔊' : ''}</button>))}
            <button onClick={()=>setView('home')} style={{padding:'8px 14px', borderRadius:12, background:'#FF7A00', color:'#fff', border:'none', fontSize:12, cursor:'pointer'}}>Home</button>
          </div>
          <div style={{marginTop:16}}>
            {tab==='comprovantes' && (
              <div style={{display:'grid', gap:10}}>
                <div style={{background:'#1E1E1E', border:'1px solid #FF7A00', borderRadius:12, padding:12}}><div style={{fontWeight:700, color:'#FF7A00'}}>💰 COMPROVANTES PARA APROVAR/REPROVAR ANTES DE IR PARA MONTADORES 🔊 Som ativo</div><div style={{fontSize:11, color:'#A0A0A0', marginTop:4}}>Fluxo organizado: Cliente envia comprovante → ADM aprova com som → libera para montadores da cidade</div></div>
                {pedidos.filter(p=>p.status==='COMPROVANTE_ENVIADO').map(p=>(
                  <div key={p.id} className="premium-card" style={{padding:14, border:'2px solid #2D5CFF', background:'#1E1E1E'}}>
                    <div style={{display:'flex', justifyContent:'space-between', gap:10, flexWrap:'wrap'}}>
                      <div><div style={{color:'#fff', fontWeight:800}}>#{p.numero} {p.movel_nome} {p.valor_txt} - {p.cidade}</div><div style={{fontSize:12, color:'#A0A0A0', marginTop:4}}>Cliente: {p.cliente_nome} {p.cliente_telefone} • {p.servico_label} • {p.bairro} {p.rua}<br/>Enviado: {new Date(p.comprovante_enviado_em||p.created_at).toLocaleString()} • Status: COMPROVANTE_ENVIADO</div>{p.fotos && <div style={{display:'flex', gap:6, marginTop:8}}>{p.fotos.map((f,i)=><img key={i} src={f} style={{width:70,height:70,borderRadius:8,objectFit:'cover'}}/>)}</div>}</div>
                      <div style={{display:'flex', gap:8, alignItems:'flex-start'}}><button onClick={()=>aprovarComprovante(p.id)} style={{background:'#16A34A', color:'#fff', border:'none', borderRadius:10, padding:'12px 18px', fontWeight:800, cursor:'pointer'}}>✅ APROVAR E LIBERAR P/ MONTADORES 🔊</button><button onClick={()=>reprovarComprovante(p.id)} style={{background:'#ff4444', color:'#fff', border:'none', borderRadius:10, padding:'12px 14px', fontWeight:700, cursor:'pointer'}}>❌ REPROVAR</button></div>
                    </div>
                  </div>
                ))}
                {pedidos.filter(p=>p.status==='COMPROVANTE_ENVIADO').length===0 && <div style={{textAlign:'center', padding:30, color:'#A0A0A0'}}><div style={{fontSize:40}}>✅</div><div>Nenhum comprovante pendente para aprovar</div><div style={{fontSize:11, marginTop:4}}>Quando cliente enviar comprovante, aparece aqui com som 🔊</div></div>}
              </div>
            )}
            {tab==='pedidos' && <div style={{display:'grid', gap:8}}>{pedidos.map(p=>(<div key={p.id} className="premium-card" style={{padding:12, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:8}}><div><div style={{color:'#fff', fontWeight:700}}>#{p.numero} {p.movel_nome} {p.valor_txt} - <span style={{color:p.status==='COMPROVANTE_ENVIADO'?'#2D5CFF':p.status==='PROCURANDO_MONTADOR'?'#FF7A00':p.status==='ACEITO'?'#16A34A':'#A0A0A0'}}>{p.status}</span></div><div style={{fontSize:11, color:'#A0A0A0'}}>Cliente: {p.cliente_nome} • {p.cidade} • Montador: {p.montador_nome||'-'} • {new Date(p.created_at).toLocaleString()}</div></div><div style={{display:'flex', gap:6}}>{p.status==='COMPROVANTE_ENVIADO' && <button onClick={()=>aprovarComprovante(p.id)} style={{background:'#16A34A', color:'#fff', border:'none', borderRadius:8, padding:'6px 10px', fontSize:11, cursor:'pointer'}}>Aprovar</button>}{p.status==='ACEITO' && <button onClick={()=>finalizarPedido(p.id)} style={{background:'#FF7A00', color:'#fff', border:'none', borderRadius:8, padding:'6px 10px', fontSize:11, cursor:'pointer'}}>Finalizar</button>}</div></div>))}</div>}
            {tab==='usuarios' && <div style={{display:'grid', gap:8}}>{usuarios.map(u=>(<div key={u.id} className="premium-card" style={{padding:12, display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:8}}><div><div style={{color:'#fff', fontWeight:700}}>{u.nome} • {u.tipo} • {u.status}</div><div style={{fontSize:11, color:'#A0A0A0'}}>{u.email} • Tel: {u.telefone||'-'} • {u.cidade} {u.cidades_atende? '• Atende: '+u.cidades_atende.join(', '): u.cidade_atende? '• Atende: '+u.cidade_atende:''} • PIX {u.chave_pix||'-'}</div></div><div style={{display:'flex', gap:6}}><button onClick={()=>{ const upd=usuarios.map(x=> x.id===u.id? {...x, status: x.status==='BLOQUEADO'?'ATIVO':'BLOQUEADO'}:x); setUsuarios(upd); playSound('accept') }} style={{background:'#1E1E1E', border:'1px solid #2A2A2A', color:'#fff', borderRadius:8, padding:'6px 10px', fontSize:11, cursor:'pointer'}}>{u.status==='BLOQUEADO'?'Desbloquear':'Bloquear'}</button><button onClick={()=>{ if(confirm('Excluir '+u.nome+'?')) setUsuarios(usuarios.filter(x=>x.id!==u.id)) }} style={{background:'#ff4444', color:'#fff', border:'none', borderRadius:8, padding:'6px 10px', fontSize:11, cursor:'pointer'}}>Excluir</button></div></div>))}</div>}
            {tab==='cupons' && <div><div className="premium-card" style={{padding:16, marginBottom:12}}><div style={{fontWeight:700, color:'#fff', marginBottom:8}}>🎟️ Gerar Cupom Premium 🔊</div><form onSubmit={e=>{ e.preventDefault(); const fd=new FormData(e.target); const codigo=fd.get('codigo'); const desconto=Number(fd.get('desconto')); const tipo=fd.get('tipo'); const validade=fd.get('validade'); const limite=Number(fd.get('limite')); const novo={id:'cup'+Date.now(), codigo, desconto, tipo, validade, limite, usos:0}; setCupons([...cupons, novo]); e.target.reset(); showToast('Cupom criado'); playSound('accept') }} style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}><input name="codigo" required placeholder="Código ex: DESCONTO10" className="uber-input"/><input name="desconto" required type="number" placeholder="Desconto" className="uber-input"/><select name="tipo" className="uber-input"><option value="%">%</option><option value="R$">R$</option></select><input name="validade" type="date" className="uber-input"/><input name="limite" type="number" placeholder="Limite uso" className="uber-input"/><button style={{gridColumn:'1 / -1', background:'#FF7A00', color:'#fff', borderRadius:12, padding:10, fontWeight:700, border:'none', cursor:'pointer'}}>Criar Cupom</button></form></div><div style={{display:'grid', gap:8}}>{cupons.map(c=>(<div key={c.id} className="premium-card" style={{padding:12, display:'flex', justifyContent:'space-between', border:'1.5px dashed #FF7A00'}}><div style={{color:'#fff'}}><b>{c.codigo}</b> • {c.desconto}{c.tipo} • Val {c.validade}</div><button onClick={()=>setCupons(cupons.filter(x=>x.id!==c.id))} style={{background:'#1E1E1E', border:'1px solid #2A2A2A', color:'#fff', borderRadius:8, padding:'4px 8px', fontSize:11, cursor:'pointer'}}>Excluir</button></div>))}</div></div>}
            {tab==='financeiro' && <div style={{display:'grid', gap:12}}><div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:10}}><div className="premium-card" style={{padding:16}}><div style={{fontSize:11, color:'#A0A0A0'}}>Total pedidos mês ({adminFinanceiro.countMes})</div><div style={{fontWeight:800, fontSize:20, color:'#fff'}}>R$ {adminFinanceiro.totalPedidosMes}</div></div><div className="premium-card" style={{padding:16}}><div style={{fontSize:11, color:'#A0A0A0'}}>Comissão 10% mês</div><div style={{fontWeight:800, fontSize:20, color:'#FF7A00'}}>R$ {adminFinanceiro.comissaoMes}</div></div><div className="premium-card" style={{padding:16}}><div style={{fontSize:11, color:'#A0A0A0'}}>Total repasse mês</div><div style={{fontWeight:800, fontSize:20, color:'#16A34A'}}>R$ {adminFinanceiro.totalRepasseMes}</div></div><div className="premium-card" style={{padding:16}}><div style={{fontSize:11, color:'#A0A0A0'}}>A repassar pendente</div><div style={{fontWeight:800, fontSize:20, color:'#fff'}}>R$ {adminFinanceiro.pendenteRepasse}</div></div></div></div>}
          </div>
        </div>
      )}

      <a href="#" onClick={e=>{e.preventDefault(); showToast('App PWA Uber Black - Adicione à tela inicial ✓ Som em todos painéis 🔊'); playSound('accept')}} style={{position:'fixed', right:16, bottom:16, background:'#fff', color:'#000', borderRadius:24, padding:'11px 18px', fontWeight:800, fontSize:13, boxShadow:'0 10px 28px rgba(0,0,0,0.5)', zIndex:40, display:'flex', alignItems:'center', gap:8}}>📲 Baixar App 🔊</a>
      <div style={{height:90}}/>
      <div style={{textAlign:'center', fontSize:10, color:'#555', paddingBottom:14}}>Uber Black Reorganizado • Fluxo: PIX → Comprovante → ADM aprova (som 🔊) → Montadores (até 5 cidades) → Som em todos painéis • 5 toques logo = admin AndreSousa84 / 20112024 • 645 cidades • Anti-duplicidade email/tel</div>
    </div>
  )
}
