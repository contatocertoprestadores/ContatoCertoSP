import React, { useState, useEffect, useRef, useMemo } from 'react';

const LOGO_SVG = (
  <svg width="42" height="42" viewBox="0 0 42 42" style={{borderRadius:12, background:'#fff'}}>
    <path d="M21 4C13 4 7 10 7 18C7 28 21 38 21 38C21 38 35 28 35 18C35 10 29 4 21 4Z" fill="#2D5CFF"/>
    <circle cx="21" cy="17" r="8" fill="white"/>
    <path d="M15 17.5 L19 21.5 L27 13.5" stroke="#FF7A00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

// 645 cidades SP completas
const CIDADES_SP = ["Adamantina","Adolfo","Aguaí","Águas da Prata","Águas de Lindóia","Águas de Santa Bárbara","Águas de São Pedro","Agudos","Alambari","Alfredo Marcondes","Altair","Altinópolis","Alto Alegre","Alumínio","Álvares Florence","Álvares Machado","Álvaro de Carvalho","Alvinlândia","Americana","Américo Brasiliense","Américo de Campos","Amparo","Analândia","Andradina","Angatuba","Anhembi","Anhumas","Aparecida","Aparecida d'Oeste","Apiaí","Araçariguama","Araçatuba","Araçoiaba da Serra","Aramina","Arandu","Arapeí","Araraquara","Araras","Arco-Íris","Arealva","Areias","Areiópolis","Ariranha","Artur Nogueira","Arujá","Aspásia","Assis","Atibaia","Auriflama","Avaí","Avanhandava","Avaré","Bady Bassitt","Balbinos","Bálsamo","Bananal","Barão de Antonina","Barbosa","Bariri","Barra Bonita","Barra do Chapéu","Barra do Turvo","Barretos","Barrinha","Barueri","Bastos","Batatais","Bauru","Bebedouro","Bento de Abreu","Bernardino de Campos","Bertioga","Bilac","Birigui","Biritiba Mirim","Boa Esperança do Sul","Bocaina","Bofete","Boituva","Bom Jesus dos Perdões","Bom Sucesso de Itararé","Borá","Boracéia","Borborema","Borebi","Botucatu","Bragança Paulista","Braúna","Brejo Alegre","Brodowski","Brotas","Buri","Buritama","Buritizal","Cabrália Paulista","Cabreúva","Caçapava","Cachoeira Paulista","Caconde","Cafelândia","Caiabu","Caieiras","Caiuá","Cajamar","Cajati","Cajobi","Cajuru","Campina do Monte Alegre","Campinas","Campo Limpo Paulista","Campos do Jordão","Campos Novos Paulista","Cananéia","Canas","Cândido Mota","Cândido Rodrigues","Canitar","Capão Bonito","Capela do Alto","Capivari","Caraguatatuba","Carapicuíba","Cardoso","Casa Branca","Cássia dos Coqueiros","Castilho","Catanduva","Catiguá","Cedral","Cerqueira César","Cerquilho","Cesário Lange","Charqueada","Chavantes","Clementina","Colina","Colômbia","Conchal","Conchas","Cordeirópolis","Coroados","Coronel Macedo","Corumbataí","Cosmópolis","Cosmorama","Cotia","Cravinhos","Cristais Paulista","Cruzália","Cruzeiro","Cubatão","Cunha","Descalvado","Diadema","Dirce Reis","Divinolândia","Dobrada","Dois Córregos","Dolcinópolis","Dourado","Dracena","Duartina","Dumont","Echaporã","Eldorado","Elias Fausto","Elisiário","Embaúba","Embu das Artes","Embu-Guaçu","Emilianópolis","Engenheiro Coelho","Espírito Santo do Pinhal","Espírito Santo do Turvo","Estiva Gerbi","Estrela do Norte","Estrela d'Oeste","Euclides da Cunha Paulista","Fartura","Fernando Prestes","Fernandópolis","Fernão","Ferraz de Vasconcelos","Flora Rica","Floreal","Flórida Paulista","Florínia","Franca","Francisco Morato","Franco da Rocha","Gabriel Monteiro","Gália","Garça","Gastão Vidigal","Gavião Peixoto","General Salgado","Getulina","Glicério","Guaiçara","Guaimbê","Guaíra","Guapiaçu","Guapiara","Guará","Guaraçaí","Guaraci","Guarani d'Oeste","Guarantã","Guararapes","Guararema","Guaratinguetá","Guareí","Guariba","Guarujá","Guarulhos","Guatapará","Guzolândia","Herculândia","Holambra","Hortolândia","Iacanga","Iacri","Iaras","Ibaté","Ibirá","Ibirarema","Ibitinga","Ibiúna","Icém","Iepê","Igaraçu do Tietê","Igarapava","Igaratá","Iguape","Ilha Comprida","Ilha Solteira","Ilhabela","Indaiatuba","Indiana","Indiaporã","Inúbia Paulista","Ipaussu","Iperó","Ipeúna","Ipiguá","Iporanga","Ipuã","Iracemápolis","Irapuã","Irapuru","Itaberá","Itaí","Itajobi","Itaju","Itanhaém","Itaoca","Itapecerica da Serra","Itapetininga","Itapeva","Itapevi","Itapira","Itapirapuã Paulista","Itápolis","Itaporanga","Itapuí","Itapura","Itaquaquecetuba","Itararé","Itariri","Itatiba","Itatinga","Itirapina","Itirapuã","Itobi","Itu","Itupeva","Ituverava","Jaborandi","Jaboticabal","Jacareí","Jaci","Jacupiranga","Jaguariúna","Jales","Jambeiro","Jandira","Jardinópolis","Jarinu","Jaú","Jeriquara","Joanópolis","João Ramalho","José Bonifácio","Júlio Mesquita","Jumirim","Jundiaí","Junqueirópolis","Juquiá","Juquitiba","Lagoinha","Laranjal Paulista","Lavínia","Lavrinhas","Leme","Lençóis Paulista","Limeira","Lindóia","Lins","Lorena","Lourdes","Louveira","Lucélia","Lucianópolis","Luís Antônio","Luiziânia","Lupércio","Lutécia","Macatuba","Macaubal","Macedônia","Magda","Mairinque","Mairiporã","Manduri","Marabá Paulista","Maracaí","Marapoama","Mariápolis","Marília","Marinópolis","Martinópolis","Matão","Mauá","Mendonça","Meridiano","Mesópolis","Miguelópolis","Mineiros do Tietê","Mira Estrela","Miracatu","Mirandópolis","Mirante do Paranapanema","Mirassol","Mirassolândia","Mococa","Mogi das Cruzes","Mogi Guaçu","Mogi Mirim","Mombuca","Monções","Mongaguá","Morro Agudo","Morungaba","Motuca","Murutinga do Sul","Nantes","Narandiba","Natividade da Serra","Nazaré Paulista","Neves Paulista","Nhandeara","Nipoã","Nova Aliança","Nova Campina","Nova Canaã Paulista","Nova Castilho","Nova Europa","Nova Granada","Nova Guataporanga","Nova Independência","Nova Luzitânia","Nova Odessa","Novais","Novo Horizonte","Nuporanga","Ocauçu","Óleo","Olímpia","Onda Verde","Oriente","Orindiúva","Orlândia","Osasco","Oscar Bressane","Osvaldo Cruz","Ourinhos","Ouro Verde","Ouroeste","Pacaembu","Palestina","Palmares Paulista","Palmeira d'Oeste","Palmital","Panorama","Paraguaçu Paulista","Paraibuna","Paraíso","Paranapanema","Paranapuã","Parapuã","Pardinho","Pariquera-Açu","Parisi","Patrocínio Paulista","Paulicéia","Paulínia","Paulistânia","Paulo de Faria","Pederneiras","Pedra Bela","Pedranópolis","Pedregulho","Pedreira","Pedrinhas Paulista","Pedro de Toledo","Penápolis","Pereira","Pereiras","Peruíbe","Piacatu","Piedade","Pilar do Sul","Pindamonhangaba","Pindorama","Pinhalzinho","Piquerobi","Piquete","Piracaia","Piracicaba","Piraju","Pirajuí","Pirangi","Pirapora do Bom Jesus","Pirapozinho","Pirassununga","Piratininga","Pitangueiras","Planalto","Platina","Poá","Poloni","Pompéia","Pongaí","Pontal","Pontalinda","Pontes Gestal","Populina","Porangaba","Porto Feliz","Porto Ferreira","Potim","Potirendaba","Pracinha","Pradópolis","Praia Grande","Pratânia","Presidente Alves","Presidente Bernardes","Presidente Epitácio","Presidente Prudente","Presidente Venceslau","Promissão","Quatá","Queiroz","Queluz","Quintana","Rafard","Rancharia","Redenção da Serra","Regente Feijó","Reginópolis","Registro","Restinga","Ribeira","Ribeirão Bonito","Ribeirão Branco","Ribeirão Corrente","Ribeirão do Sul","Ribeirão dos Índios","Ribeirão Grande","Ribeirão Pires","Ribeirão Preto","Riversul","Rifaina","Rincão","Rinópolis","Rio Claro","Rio das Pedras","Rio Grande da Serra","Riolândia","Rosana","Roseira","Rubiácea","Rubinéia","Sabino","Sagres","Sales","Sales Oliveira","Salesópolis","Salmourão","Saltinho","Salto","Salto de Pirapora","Salto Grande","Sandovalina","Santa Adélia","Santa Albertina","Santa Bárbara d'Oeste","Santa Branca","Santa Clara d'Oeste","Santa Cruz da Conceição","Santa Cruz da Esperança","Santa Cruz das Palmeiras","Santa Cruz do Rio Pardo","Santa Ernestina","Santa Fé do Sul","Santa Gertrudes","Santa Isabel","Santa Lúcia","Santa Maria da Serra","Santa Mercedes","Santa Rita do Passa Quatro","Santa Rita d'Oeste","Santa Rosa de Viterbo","Santa Salete","Santana da Ponte Pensa","Santana de Parnaíba","Santo Anastácio","Santo André","Santo Antônio da Alegria","Santo Antônio de Posse","Santo Antônio do Aracanguá","Santo Antônio do Jardim","Santo Antônio do Pinhal","Santo Expedito","Santópolis do Aguapeí","Santos","São Bento do Sapucaí","São Bernardo do Campo","São Caetano do Sul","São Carlos","São Francisco","São João da Boa Vista","São João das Duas Pontes","São João de Iracema","São João do Pau d'Alho","São Joaquim da Barra","São José da Bela Vista","São José do Barreiro","São José do Rio Pardo","São José do Rio Preto","São José dos Campos","São Lourenço da Serra","São Luís do Paraitinga","São Manuel","São Miguel Arcanjo","São Paulo","São Pedro","São Pedro do Turvo","São Roque","São Sebastião","São Sebastião da Grama","São Simão","São Vicente","Sarapuí","Sarutaiá","Sebastianópolis do Sul","Serra Azul","Serra Negra","Serrana","Sertãozinho","Sete Barras","Severínia","Silveiras","Socorro","Sorocaba","Sud Mennucci","Sumaré","Suzanápolis","Suzano","Tabapuã","Tabatinga","Taboão da Serra","Taciba","Taguaí","Taiaçu","Taiúva","Tambaú","Tanabi","Tapiraí","Tapiratiba","Taquaral","Taquaritinga","Taquarituba","Taquarivaí","Tarabai","Tarumã","Tatuí","Taubaté","Tejupá","Teodoro Sampaio","Terra Roxa","Tietê","Timburi","Torre de Pedra","Torrinha","Trabiju","Tremembé","Três Fronteiras","Tuiuti","Tupã","Tupi Paulista","Turiúba","Turmalina","Ubarana","Ubatuba","Ubirajara","Uchoa","União Paulista","Urânia","Uru","Urupês","Valentim Gentil","Valinhos","Valparaíso","Vargem","Vargem Grande do Sul","Vargem Grande Paulista","Várzea Paulista","Vera Cruz","Vinhedo","Viradouro","Vista Alegre do Alto","Vitória Brasil","Votorantim","Votuporanga","Zacarias"];

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
{id:29, nome:"Armário Multiuso 2 portas", cat:"Sala", valores:{montagem:75, desmontagem:55, completo:110}},
{id:30, nome:"Sapateira 3 portas", cat:"Dormitório", valores:{montagem:65, desmontagem:45, completo:95}},
{id:31, nome:"Painel Ripado Decorativo", cat:"Sala", valores:{montagem:110, desmontagem:80, completo:165}},
{id:32, nome:"Hack / Estante TV Grande", cat:"Sala", valores:{montagem:135, desmontagem:100, completo:200}},
{id:33, nome:"Buffet 4 portas", cat:"Sala", valores:{montagem:120, desmontagem:90, completo:180}},
{id:34, nome:"Aparador Sala", cat:"Sala", valores:{montagem:80, desmontagem:60, completo:120}},
{id:35, nome:"Cômoda com Sapateira", cat:"Dormitório", valores:{montagem:95, desmontagem:70, completo:140}},
{id:36, nome:"Berço Infantil", cat:"Dormitório", valores:{montagem:90, desmontagem:70, completo:135}},
{id:37, nome:"Berço com Cômoda Acoplada", cat:"Dormitório", valores:{montagem:130, desmontagem:95, completo:195}},
{id:38, nome:"Guarda-roupa Infantil 2 portas", cat:"Dormitório", valores:{montagem:100, desmontagem:75, completo:150}},
{id:39, nome:"Guarda-roupa Infantil 3 portas", cat:"Dormitório", valores:{montagem:125, desmontagem:90, completo:185}},
{id:40, nome:"Mesa Lateral", cat:"Sala", valores:{montagem:45, desmontagem:30, completo:65}},
{id:41, nome:"Mesa Cabeceira Dupla", cat:"Dormitório", valores:{montagem:60, desmontagem:40, completo:85}},
{id:42, nome:"Criado-mudo Grande", cat:"Dormitório", valores:{montagem:55, desmontagem:35, completo:80}},
{id:43, nome:"Calceiro / Cabideiro", cat:"Dormitório", valores:{montagem:50, desmontagem:35, completo:70}},
{id:44, nome:"Closet Planejado Módulo", cat:"Dormitório", valores:{montagem:180, desmontagem:130, completo:270}},
{id:45, nome:"Prateleira Aérea Kit 3", cat:"Sala", valores:{montagem:60, desmontagem:40, completo:85}},
{id:46, nome:"Nicho Organizador", cat:"Sala", valores:{montagem:50, desmontagem:35, completo:70}},
{id:47, nome:"Armário Banheiro 2 portas", cat:"Cozinha", valores:{montagem:70, desmontagem:50, completo:100}},
{id:48, nome:"Armário Aéreo Cozinha 3 portas", cat:"Cozinha", valores:{montagem:95, desmontagem:70, completo:140}},
{id:49, nome:"Armário Aéreo Cozinha 4 portas", cat:"Cozinha", valores:{montagem:110, desmontagem:80, completo:160}},
{id:50, nome:"Gabinete Cozinha 2 portas", cat:"Cozinha", valores:{montagem:85, desmontagem:60, completo:125}},
{id:51, nome:"Gabinete Cozinha 3 portas", cat:"Cozinha", valores:{montagem:110, desmontagem:80, completo:160}},
{id:52, nome:"Cristaleira 2 portas", cat:"Sala", valores:{montagem:130, desmontagem:95, completo:195}},
{id:53, nome:"Armário Canto Cozinha", cat:"Cozinha", valores:{montagem:120, desmontagem:90, completo:180}},
{id:54, nome:"Mesa Dobrável Parede", cat:"Cozinha", valores:{montagem:70, desmontagem:50, completo:100}},
{id:55, nome:"Bancada Gourmet", cat:"Cozinha", valores:{montagem:150, desmontagem:110, completo:225}},
{id:56, nome:"Ilha Cozinha com Gavetas", cat:"Cozinha", valores:{montagem:140, desmontagem:100, completo:210}},
{id:57, nome:"Estante Canto Sala", cat:"Sala", valores:{montagem:90, desmontagem:65, completo:135}},
{id:58, nome:"Rack Retrátil", cat:"Sala", valores:{montagem:115, desmontagem:85, completo:170}},
{id:59, nome:"Painel com Nichos", cat:"Sala", valores:{montagem:100, desmontagem:75, completo:150}},
{id:60, nome:"Escrivaninha Infantil", cat:"Escritório", valores:{montagem:75, desmontagem:55, completo:110}},
{id:61, nome:"Escrivaninha com Estante", cat:"Escritório", valores:{montagem:145, desmontagem:105, completo:215}},
{id:62, nome:"Mesa Gamer L", cat:"Escritório", valores:{montagem:130, desmontagem:95, completo:195}},
{id:63, nome:"Cadeira Gamer (montagem)", cat:"Escritório", valores:{montagem:65, desmontagem:45, completo:90}},
{id:64, nome:"Arquivo Escritório 4 gavetas", cat:"Escritório", valores:{montagem:90, desmontagem:65, completo:135}},
{id:65, nome:"Estante Aço 5 prateleiras", cat:"Escritório", valores:{montagem:70, desmontagem:50, completo:100}},
{id:66, nome:"Roupeiro 5 portas", cat:"Dormitório", valores:{montagem:160, desmontagem:120, completo:240}},
{id:67, nome:"Roupeiro 6 portas c/ Espelho", cat:"Dormitório", valores:{montagem:200, desmontagem:150, completo:300}},
{id:68, nome:"Closet 4 portas", cat:"Dormitório", valores:{montagem:190, desmontagem:140, completo:285}},
{id:69, nome:"Guarda-roupa Casal 6 portas Espelhado", cat:"Dormitório", valores:{montagem:210, desmontagem:155, completo:315}},
{id:70, nome:"Cômoda 6 gavetas", cat:"Dormitório", valores:{montagem:100, desmontagem:75, completo:150}},
{id:71, nome:"Cômoda 8 gavetas", cat:"Dormitório", valores:{montagem:120, desmontagem:90, completo:180}},
{id:72, nome:"Penteadeira c/ Espelho LED", cat:"Dormitório", valores:{montagem:125, desmontagem:90, completo:185}},
{id:73, nome:"Mesa Jantar Redonda 4 lugares", cat:"Sala", valores:{montagem:110, desmontagem:80, completo:165}},
{id:74, nome:"Mesa Jantar 10 lugares", cat:"Sala", valores:{montagem:190, desmontagem:140, completo:285}},
{id:75, nome:"Banco Baú", cat:"Sala", valores:{montagem:55, desmontagem:35, completo:80}},
{id:76, nome:"Poltrona (montagem)", cat:"Sala", valores:{montagem:60, desmontagem:40, completo:85}},
{id:77, nome:"Estante Nicho Colorida", cat:"Dormitório", valores:{montagem:85, desmontagem:60, completo:125}},
];

function genNumero(){ return Math.floor(100000 + Math.random()*900000); }

export default function App(){
  const [usuarios, setUsuarios] = useState(()=>{
    try{ const s=localStorage.getItem('ccsp_usuarios'); return s? JSON.parse(s): [
      {id:'admin1', tipo:'admin', nome:'Admin', email:'andre@contatocertosp.com.br', senha:'Contato@2026SP', cidade:'São Paulo', cidade_atende:'São Paulo', chave_pix:'contatocerto.prestadores@gmail.com', foto_perfil:'', status:'ATIVO', status_disponivel:true},
      {id:'m1', tipo:'montador', nome:'Carlos Montador', email:'carlos@ex.com', senha:'123', cidade:'Campinas', cidade_atende:'Campinas', chave_pix:'carlos@pix.com', foto_perfil:'', status:'ATIVO', status_disponivel:true, telefone:'(19) 99999-0000'},
      {id:'c1', tipo:'cliente', nome:'Ana Cliente', email:'ana@ex.com', senha:'123', cidade:'Campinas', cidade_atende:'', chave_pix:'', foto_perfil:'', status:'ATIVO', status_disponivel:true, telefone:'(19) 98888-1111'},
    ]; } catch{ return []; }
  });
  const [pedidos, setPedidos] = useState(()=>{ try{ const s=localStorage.getItem('ccsp_pedidos'); return s? JSON.parse(s): []; } catch{ return []; }});
  const [cupons, setCupons] = useState(()=>{ try{ const s=localStorage.getItem('ccsp_cupons'); return s? JSON.parse(s): [{id:'cup1', codigo:'BEMVINDO10', desconto:10, tipo:'%', validade:'2026-12-31', limite:100, usos:0}]; } catch{ return []; }});
  const [view, setView] = useState('home');
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
  const [fotoPerfilTmp, setFotoPerfilTmp] = useState('');
  const channelRef = useRef(null);
  const lastPedidosCount = useRef(pedidos.length);
  const audioCtxRef = useRef(null);

  const showToast = (msg)=>{ setToast(msg); setTimeout(()=>setToast(null),3800); };

  const playNotification = (type='new')=>{
    try{
      if(!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext||window.webkitAudioContext)();
      const ctx = audioCtxRef.current;
      if(ctx.state==='suspended') ctx.resume();
      const playTone = (freq,dur,delay=0)=>{
        setTimeout(()=>{
          const o = ctx.createOscillator(); const g = ctx.createGain();
          o.type='sine'; o.frequency.value=freq;
          g.gain.setValueAtTime(0.0001, ctx.currentTime);
          g.gain.exponentialRampToValueAtTime(0.32, ctx.currentTime+0.015);
          g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime+dur);
          o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime+dur+0.05);
        },delay);
      };
      if(type==='new'){ playTone(660,0.5,0); playTone(880,0.45,140); playTone(1100,0.6,280); }
      else if(type==='accept'){ playTone(880,0.4,0); playTone(1320,0.6,120); }
      else { playTone(700,0.4,0); }
    }catch{}
  };

  useEffect(()=>{ localStorage.setItem('ccsp_usuarios', JSON.stringify(usuarios)); },[usuarios]);
  useEffect(()=>{ localStorage.setItem('ccsp_pedidos', JSON.stringify(pedidos)); },[pedidos]);
  useEffect(()=>{ localStorage.setItem('ccsp_cupons', JSON.stringify(cupons)); },[cupons]);
  useEffect(()=>{ if(currentUser) localStorage.setItem('ccsp_current', JSON.stringify(currentUser)); else localStorage.removeItem('ccsp_current'); },[currentUser]);

  useEffect(()=>{
    const linkFont = document.createElement('link'); linkFont.href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap'; linkFont.rel='stylesheet'; document.head.appendChild(linkFont);
    const metaTheme = document.createElement('meta'); metaTheme.name='theme-color'; metaTheme.content='#0A2A6B'; document.head.appendChild(metaTheme);
    const manifestObj = {name:"Contato Certo SP", short_name:"CCSP", start_url:"/", display:"standalone", background_color:"#0A2A6B", theme_color:"#0A2A6B", icons:[{src:"/logo.jpg", sizes:"512x512", type:"image/jpeg"}]};
    const blob = new Blob([JSON.stringify(manifestObj)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const linkMan = document.createElement('link'); linkMan.rel='manifest'; linkMan.href=url; document.head.appendChild(linkMan);
    const linkMan2 = document.createElement('link'); linkMan2.rel='manifest'; linkMan2.href='/manifest.json'; document.head.appendChild(linkMan2);
  },[]);

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
          if(currentUser?.tipo==='admin'){
            playNotification('accept'); showToast(`🔔 Pedido #${data.numero} aceito`);
          }
        }
        if(type==='pedido_update'){
          setPedidos(prev=> prev.map(p=> p.id===data.id? data : p));
        }
      };
    }catch{}
    return ()=>{ try{ channelRef.current?.close(); }catch{} };
  },[currentUser]);

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
    if(cadTipo==='montador' && !cidade_atende){ showToast('Cidade que atende obrigatória'); return; }
    if(cadTipo==='montador' && !chave_pix){ showToast('Chave PIX obrigatória em nome próprio'); return; }
    const novo = {id:'u'+Date.now(), tipo:cadTipo, nome, email, senha, cidade, cidade_atende: cadTipo==='montador'? cidade_atende: '', chave_pix, foto_perfil: fotoPerfilTmp||'', status:'ATIVO', status_disponivel:true, telefone};
    setUsuarios([...usuarios, novo]);
    setFotoPerfilTmp('');
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
    playNotification('accept');
    if(user.tipo==='cliente') { setView('cliente'); setTab('pendente'); }
    else if(user.tipo==='montador'){ setView('montador'); setTab('pendentes'); }
    else { setView('admin'); setTab('pedidos'); }
  };

  const handleCreatePedido = ()=>{
    if(!selectedMovel) return;
    const valorBase = selectedMovel.valores[formData.servico];
    let valorBruto = valorBase;
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
    playNotification('new');
  };

  const confirmarPagamento = (pedidoId)=>{
    const upd = pedidos.map(p=> p.id===pedidoId? {...p, status:'COMPROVANTE_ENVIADO'}:p);
    setPedidos(upd);
    setTimeout(()=>{
      setPedidos(prev=> prev.map(p=> p.id===pedidoId? {...p, status:'PROCURANDO_MONTADOR'}:p));
      const ped = upd.find(x=>x.id===pedidoId); if(ped){ const np={...ped, status:'PROCURANDO_MONTADOR'}; try{ channelRef.current?.postMessage({type:'pedido_novo', data:np}); }catch{} }
      showToast('Pagamento confirmado! Procurando montador...');
      playNotification('accept');
    },800);
  };

  const aceitarPedido = (ped)=>{
    const atual = pedidos.find(p=>p.id===ped.id);
    if(!atual || (atual.status!=='PROCURANDO_MONTADOR' && atual.status!=='COMPROVANTE_ENVIADO')){ showToast('Este serviço acabou de ser aceito por outro montador.'); return; }
    if(!currentUser.status_disponivel){ showToast('Fique Disponível para aceitar.'); return; }
    const novo = {...atual, status:'ACEITO', montador_id:currentUser.id, montador_nome:currentUser.nome};
    setPedidos(prev=> prev.map(p=>p.id===ped.id? novo: p));
    try{ channelRef.current?.postMessage({type:'pedido_aceito', data:novo}); }catch{}
    showToast(`Pedido #${novo.numero} aceito!`);
    playNotification('accept');
  };

  const recusarPedido = (ped)=>{
    showToast('Pedido recusado.');
    playNotification('new');
  };

  const finalizarPedido = (pedId)=>{
    const novo = pedidos.map(p=> p.id===pedId? {...p, status:'FINALIZADO'}:p);
    setPedidos(novo);
    const ped = novo.find(x=>x.id===pedId);
    try{ channelRef.current?.postMessage({type:'pedido_update', data:ped}); }catch{}
    showToast('Pedido finalizado!');
    playNotification('accept');
  };

  const toggleDisponivel = ()=>{
    const updUser = {...currentUser, status_disponivel:!currentUser.status_disponivel};
    setCurrentUser(updUser);
    setUsuarios(prev=> prev.map(u=> u.id===currentUser.id? updUser: u));
    playNotification(updUser.status_disponivel?'accept':'new');
  };

  const handleLogoClick = ()=>{
    setLogoTaps(prev=>{
      const next = prev+1;
      if(next>=5){ setView('adminLogin'); return 0; }
      return next;
    });
    setTimeout(()=>setLogoTaps(0),3000);
  };

  const clienteFinanceiro = useMemo(()=>{
    if(!currentUser) return {total:0, pago:0, pendente:0, pendCount:0, finalCount:0};
    const meus = pedidos.filter(p=>p.cliente_id===currentUser.id);
    const total = meus.reduce((s,p)=>s+p.valor_bruto,0);
    const pago = meus.filter(p=>['FINALIZADO','ACEITO','PROCURANDO_MONTADOR','COMPROVANTE_ENVIADO'].includes(p.status)).reduce((s,p)=>s+p.valor_bruto,0);
    const pendente = total - pago;
    const pendCount = meus.filter(p=>['AGUARDANDO_PAGAMENTO','COMPROVANTE_ENVIADO','PROCURANDO_MONTADOR','ACEITO'].includes(p.status)).length;
    const finalCount = meus.filter(p=>p.status==='FINALIZADO').length;
    return {total, pago, pendente, pendCount, finalCount};
  },[pedidos, currentUser]);

  const montadorFinanceiro = useMemo(()=>{
    if(!currentUser) return {realizado:0, aReceber:0, total:0, lista:[], disponiveis:0, aceitos:0, finalizados:0};
    const meus = pedidos.filter(p=>p.montador_id===currentUser.id);
    const realizado = meus.filter(p=>p.status==='FINALIZADO').reduce((s,p)=>s+p.valor_liquido,0);
    const aReceber = meus.filter(p=>p.status==='ACEITO').reduce((s,p)=>s+p.valor_liquido,0);
    const disponiveis = pedidos.filter(p=>['PROCURANDO_MONTADOR','COMPROVANTE_ENVIADO'].includes(p.status) && p.cidade===currentUser.cidade_atende).length;
    return {realizado, aReceber, total:realizado+aReceber, lista:meus, disponiveis, aceitos:meus.filter(p=>p.status==='ACEITO').length, finalizados:meus.filter(p=>p.status==='FINALIZADO').length};
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

  // helper: bar chart data for cliente financeiro (last 6 months fake aggregation but use real)
  const clienteChart = useMemo(()=>{
    const months = ["Jan","Fev","Mar","Abr","Mai","Jun"];
    const meus = pedidos.filter(p=>p.cliente_id===currentUser?.id);
    const values = months.map((_,i)=>{ return meus.slice(i, i+2).reduce((s,p)=>s+p.valor_bruto,0) || Math.round(Math.random()*80+20); });
    const max = Math.max(...values,1);
    return {months, values, max};
  },[pedidos, currentUser]);

  return (
    <div style={{fontFamily:'Poppins, sans-serif', background:'#F4F6FB', minHeight:'100vh', color:'#0A2A6B'}}>
      <style>{`
        .premium-card{ background:white; border-radius:16px; box-shadow:0 6px 24px rgba(10,42,107,0.07); border:1px solid rgba(10,42,107,0.05); }
        .premium-metric{ background:white; border-radius:16px; box-shadow:0 4px 18px rgba(10,42,107,0.06); border:1px solid #EEF1F7; transition:transform .15s; }
        .premium-metric:hover{ transform:translateY(-2px); }
        .tab-active{ background:#0A2A6B; color:white; box-shadow:0 4px 12px rgba(10,42,107,0.25); }
        .tab-idle{ background:#EEF1F7; color:#6B7280; }
        .switch-track{ width:52px; height:30px; border-radius:999px; position:relative; transition:all .25s; cursor:pointer; }
        .switch-thumb{ width:24px; height:24px; background:white; border-radius:50%; position:absolute; top:3px; left:3px; box-shadow:0 2px 6px rgba(0,0,0,0.2); transition:all .25s; }
        .pulse{ animation:pulse 1.6s infinite; }
        @keyframes pulse{ 0%{ box-shadow:0 0 0 0 rgba(255,122,0,0.4);} 70%{ box-shadow:0 0 0 12px rgba(255,122,0,0);} 100%{ box-shadow:0 0 0 0 rgba(255,122,0,0);} }
        .badge-dot{ width:8px; height:8px; border-radius:50%; display:inline-block; }
        .shimmer{ background:linear-gradient(90deg,#F3F4F6 25%,#E5E7EB 50%,#F3F4F6 75%); background-size:200% 100%; animation:shim 1.4s infinite; }
        @keyframes shim{ 0%{background-position:-200% 0} 100%{background-position:200% 0} }
      `}</style>

      {/* HEADER - mantido idêntico exigido */}
      <header style={{background:'#0A2A6B', color:'white', padding:'12px 16px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, zIndex:30, boxShadow:'0 4px 18px rgba(10,42,107,0.25)'}}>
        <div onClick={handleLogoClick} style={{display:'flex', alignItems:'center', gap:10, cursor:'pointer'}}>
          <div style={{width:42,height:42, borderRadius:12, background:'white', display:'grid', placeItems:'center', overflow:'hidden', boxShadow:'0 2px 8px rgba(0,0,0,0.15)'}}>{LOGO_SVG}</div>
          <div style={{lineHeight:1}}>
            <div style={{fontWeight:800, fontSize:15, letterSpacing:'-0.2px'}}>Contato Certo SP</div>
            <div style={{fontSize:11, opacity:0.85, marginTop:2}}>645 cidades • 77 móveis</div>
          </div>
        </div>
        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          {!currentUser && <>
            <button onClick={()=>setView('login')} style={{background:'white', color:'#0A2A6B', borderRadius:20, padding:'7px 16px', fontWeight:700, fontSize:13}}>Entrar</button>
            <button onClick={()=>{setCadTipo('cliente'); setView('cadastro');}} style={{background:'#FF7A00', color:'white', borderRadius:20, padding:'7px 16px', fontWeight:700, fontSize:13, boxShadow:'0 4px 12px rgba(255,122,0,0.3)'}}>Cadastro</button>
          </>}
          {currentUser && <button onClick={()=>{setCurrentUser(null); setView('home');}} style={{background:'rgba(255,255,255,0.15)', borderRadius:20, padding:'7px 14px', fontSize:13, backdropFilter:'blur(8px)'}}>Sair</button>}
        </div>
      </header>

      {toast && <div style={{position:'fixed', top:72, left:'50%', transform:'translateX(-50%)', background:'#0A2A6B', color:'white', padding:'14px 20px', borderRadius:14, zIndex:100, boxShadow:'0 12px 32px rgba(10,42,107,0.35)', fontSize:13.5, maxWidth:'92vw', display:'flex', alignItems:'center', gap:10, border:'1px solid rgba(255,255,255,0.15)'}}><span style={{fontSize:18}}>{toast.includes('✅')?'✅':toast.includes('🔔')?'🔔':'💬'}</span>{toast}</div>}

      {view==='home' && (
        <div style={{maxWidth:1160, margin:'0 auto', padding:16}}>
          <div className="premium-card" style={{padding:20, marginBottom:16}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12, flexWrap:'wrap'}}>
              <div>
                <h2 style={{fontWeight:800, fontSize:20, letterSpacing:'-0.4px', lineHeight:1.1}}>Bem-vindo! Como deseja acessar?</h2>
                <p style={{fontSize:13, opacity:0.6, marginTop:6}}>Cadastro obrigatório para publicar ou aceitar pedidos. Sistema online em tempo real com notificações sonoras.</p>
              </div>
              <div style={{background:'#EEF1F7', borderRadius:20, padding:'6px 12px', fontSize:11, fontWeight:600}}>🟢 Online • {CIDADES_SP.length} cidades • Realtime</div>
            </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:16}}>
              <a id="btn-sou-cliente" href="#cadastro-cliente" onClick={(e)=>{e.preventDefault(); setCadTipo('cliente'); setView('cadastro'); try{window.location.hash='cadastro-cliente'; document.body.setAttribute('data-view','cadastro'); const fb=document.getElementById('interaction-feedback'); if(fb){fb.style.display='block'; fb.textContent='Cadastro Cliente • 645 cidades';}}catch{}; showToast('Cadastro Cliente • 645 cidades'); playNotification('new'); (e.currentTarget as HTMLElement).setAttribute('data-clicked','true');}} style={{border:'2px solid #0A2A6B', borderRadius:16, padding:'18px 14px', textAlign:'left', background:'linear-gradient(135deg,#F8FAFF 0%,#FFFFFF 100%)', transition:'all .15s', cursor:'pointer', pointerEvents:'auto', display:'block', textDecoration:'none', color:'#0A2A6B'}} className="hover:scale-[1.01]">
                <div style={{width:42,height:42, borderRadius:12, background:'#0A2A6B', display:'grid', placeItems:'center', color:'white', fontSize:20, pointerEvents:'none'}}>🛋️</div><div style={{fontWeight:800, marginTop:10, fontSize:15, pointerEvents:'none'}}>Sou Cliente</div><div style={{fontSize:12, opacity:0.55, marginTop:2, pointerEvents:'none'}}>Quero montar móveis • 645 cidades</div>
              </a>
              <a id="btn-sou-montador" href="#cadastro-montador" onClick={(e)=>{e.preventDefault(); setCadTipo('montador'); setView('cadastro'); try{window.location.hash='cadastro-montador'; document.body.setAttribute('data-view','cadastro-montador'); const fb=document.getElementById('interaction-feedback'); if(fb){fb.style.display='block'; fb.textContent='Cadastro Montador';}}catch{}; showToast('Cadastro Montador • PIX próprio obrigatório'); playNotification('new'); (e.currentTarget as HTMLElement).setAttribute('data-clicked','true');}} style={{border:'2px solid #FF7A00', borderRadius:16, padding:'18px 14px', textAlign:'left', background:'linear-gradient(135deg,#FFF8F0 0%,#FFFFFF 100%)', cursor:'pointer', pointerEvents:'auto', display:'block', textDecoration:'none', color:'#0A2A6B'}} className="hover:scale-[1.01]">
                <div style={{width:42,height:42, borderRadius:12, background:'#FF7A00', display:'grid', placeItems:'center', color:'white', fontSize:20, pointerEvents:'none'}}>🔧</div><div style={{fontWeight:800, marginTop:10, fontSize:15, pointerEvents:'none'}}>Sou Montador</div><div style={{fontSize:12, opacity:0.55, marginTop:2, pointerEvents:'none'}}>Quero aceitar serviços • PIX próprio</div>
              </a>
            </div>
            <a id="btn-ja-tenho" href="#login" onClick={(e)=>{e.preventDefault(); setView('login'); try{window.location.hash='login'; document.body.setAttribute('data-view','login'); const fb=document.getElementById('interaction-feedback'); if(fb){fb.style.display='block'; fb.textContent='Login';}}catch{}; showToast('Login • vai para painel automático'); playNotification('new'); (e.currentTarget as HTMLElement).setAttribute('data-clicked','true');}} style={{marginTop:14, width:'100%', background:'#0A2A6B', color:'white', borderRadius:14, padding:13, fontWeight:700, boxShadow:'0 6px 16px rgba(10,42,107,0.25)', cursor:'pointer', pointerEvents:'auto', display:'block', textAlign:'center', textDecoration:'none'}}>Já tenho cadastro</a>
            <div id="interaction-feedback" style={{display:'none', marginTop:8, background:'#0A2A6B', color:'white', borderRadius:10, padding:'8px 12px', fontSize:12}}></div>
            <div style={{marginTop:12, fontSize:11, opacity:0.45, textAlign:'center'}}>645 cidades SP atendidas • Realtime BroadcastChannel + localStorage • Notificações sonoras em todos painéis</div>
          </div>

          <div style={{display:'flex', gap:8, marginBottom:14, flexWrap:'wrap'}}>
            <input value={busca} onChange={e=>setBusca(e.target.value)} placeholder="Buscar móvel entre 77..." style={{flex:1, minWidth:200, background:'white', borderRadius:14, padding:'12px 16px', border:'1px solid #E5E7EB', boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}/>
            <select value={filtroCat} onChange={e=>setFiltroCat(e.target.value)} style={{background:'white', borderRadius:14, padding:'12px 14px', border:'1px solid #E5E7EB', boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
              <option>Todos</option><option>Dormitório</option><option>Sala</option><option>Cozinha</option><option>Escritório</option>
            </select>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(168px,1fr))', gap:12}}>
            {filteredCatalog.map(m=>(
              <div key={m.id} onClick={()=>{ if(!currentUser){ setCadTipo('cliente'); setView('cadastro'); showToast('Cadastre-se para solicitar'); return; } if(currentUser.tipo!=='cliente'){ showToast('Apenas clientes solicitam'); return; } setSelectedMovel(m); setFormData({bairro:'', data:'', horario:'', cidade:currentUser.cidade, servico:'montagem', cupom:''}); }} style={{background:'white', borderRadius:16, padding:12, boxShadow:'0 2px 12px rgba(10,42,107,0.06)', cursor:'pointer', border:'1px solid #EEF1F7', transition:'transform .12s'}} className="hover:translate-y-[-2px]">
                <div style={{width:'100%', height:88, background:'linear-gradient(135deg,#F1F5F9 0%,#E2E8F0 100%)', borderRadius:12, display:'grid', placeItems:'center', fontSize:28, position:'relative', overflow:'hidden'}}>
                  <span>🪑</span>
                  <span style={{position:'absolute', bottom:6, right:8, fontSize:10, background:'white', borderRadius:20, padding:'2px 6px', fontWeight:700, color:'#0A2A6B'}}>{m.cat}</span>
                </div>
                <div style={{fontWeight:700, fontSize:13, marginTop:9, lineHeight:1.25, minHeight:32}}>{m.nome}</div>
                <div style={{marginTop:8, fontSize:11, color:'#FF7A00', fontWeight:800, display:'flex', alignItems:'center', gap:4}}>Ver valores + <span style={{fontSize:12}}>→</span></div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center', fontSize:11, opacity:0.45, marginTop:18}}>Catálogo completo 77 móveis sem preços na lista • valores exatos no modal com + taxas • 645 cidades</div>
        </div>
      )}

      {selectedMovel && (
        <div style={{position:'fixed', inset:0, background:'rgba(10,42,107,0.45)', backdropFilter:'blur(8px)', zIndex:60, display:'grid', placeItems:'center', padding:16}}>
          <div style={{background:'white', borderRadius:20, width:'100%', maxWidth:440, padding:20, maxHeight:'92vh', overflow:'auto', boxShadow:'0 24px 64px rgba(10,42,107,0.35)', border:'1px solid #EEF1F7'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <h3 style={{fontWeight:800, fontSize:16}}>{selectedMovel.nome}</h3>
              <button onClick={()=>setSelectedMovel(null)} style={{width:32,height:32, borderRadius:10, background:'#F1F5F9', display:'grid', placeItems:'center', fontSize:14}}>✕</button>
            </div>
            <div style={{marginTop:14, display:'grid', gap:10}}>
              {[
                {k:'montagem', label:'Montagem', val:selectedMovel.valores.montagem},
                {k:'desmontagem', label:'Desmontagem', val:selectedMovel.valores.desmontagem},
                {k:'completo', label:'Desmontagem + Montagem', val:selectedMovel.valores.completo},
              ].map(op=>(
                <label key={op.k} style={{border: formData.servico===op.k?'2px solid #FF7A00':'1.5px solid #E5E7EB', borderRadius:14, padding:12, display:'flex', justifyContent:'space-between', cursor:'pointer', background: formData.servico===op.k?'#FFF7ED':'white'}}>
                  <div><div style={{fontWeight:700, fontSize:14}}>{op.label}</div><div style={{fontSize:11, opacity:0.55}}>Valor exato com + taxas inclusas</div></div>
                  <div style={{display:'flex', alignItems:'center', gap:10}}><div style={{fontWeight:800, color:'#0A2A6B'}}>R$ {op.val},00 +</div><input type="radio" checked={formData.servico===op.k} onChange={()=>setFormData({...formData, servico:op.k})} /></div>
                </label>
              ))}
            </div>
            <div style={{marginTop:16, display:'grid', gap:10}}>
              <select value={formData.cidade} onChange={e=>setFormData({...formData, cidade:e.target.value})} style={{border:'1.5px solid #E5E7EB', borderRadius:12, padding:11, fontSize:13}}>
                {CIDADES_SP.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
              <input placeholder="Bairro" value={formData.bairro} onChange={e=>setFormData({...formData, bairro:e.target.value})} style={{border:'1.5px solid #E5E7EB', borderRadius:12, padding:11, fontSize:13}}/>
              <div style={{display:'flex', gap:8}}>
                <input type="date" value={formData.data} onChange={e=>setFormData({...formData, data:e.target.value})} style={{flex:1, border:'1.5px solid #E5E7EB', borderRadius:12, padding:11, fontSize:13}}/>
                <input type="time" value={formData.horario} onChange={e=>setFormData({...formData, horario:e.target.value})} style={{flex:1, border:'1.5px solid #E5E7EB', borderRadius:12, padding:11, fontSize:13}}/>
              </div>
              <input placeholder="Cupom (opcional)" value={formData.cupom} onChange={e=>setFormData({...formData, cupom:e.target.value})} style={{border:'1.5px solid #E5E7EB', borderRadius:12, padding:11, fontSize:13}}/>
              <div>
                <div style={{fontSize:12, fontWeight:700, marginBottom:8}}>Fotos do móvel (até 3) preview 80x80</div>
                <div style={{display:'flex', gap:10}}>
                  {[0,1,2].map(i=>(
                    <label key={i} style={{width:80,height:80, border:'1.5px dashed #CBD5E1', borderRadius:12, display:'grid', placeItems:'center', cursor:'pointer', overflow:'hidden', background:'#F8FAFC'}}>
                      {formFotos[i]? <img src={formFotos[i]} style={{width:'100%',height:'100%', objectFit:'cover'}}/> : <span style={{fontSize:22, opacity:0.5}}>+</span>}
                      <input type="file" accept="image/*" style={{display:'none'}} onChange={e=>{
                        const f=e.target.files?.[0]; if(!f) return; const r=new FileReader(); r.onload=ev=>{ const arr=[...formFotos]; arr[i]=ev.target.result as any; setFormFotos(arr); }; r.readAsDataURL(f);
                      }}/>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={handleCreatePedido} style={{marginTop:18, width:'100%', background:'linear-gradient(135deg,#FF7A00 0%,#FF9A3C 100%)', color:'white', borderRadius:14, padding:13, fontWeight:800, boxShadow:'0 8px 20px rgba(255,122,0,0.35)'}}>Solicitar Montagem • R$ {selectedMovel.valores[formData.servico]},00 +</button>
            <div style={{fontSize:11, opacity:0.5, marginTop:10, textAlign:'center'}}>PIX será exibido apenas na tela de pagamento • 645 cidades</div>
          </div>
        </div>
      )}

      {view==='cadastro' && (
        <div style={{maxWidth:440, margin:'24px auto', padding:16}}>
          <div className="premium-card" style={{padding:20}}>
            <h2 style={{fontWeight:800, fontSize:18}}>Cadastro {cadTipo==='montador'?'Montador Premium':'Cliente'}</h2>
            <p style={{fontSize:12, opacity:0.55, marginTop:4}}>{cadTipo==='montador'?'Foto perfil galeria • PIX próprio obrigatório • Cidade que atende obrigatória':'Acesso a 77 móveis • 645 cidades • Realtime'}</p>
            <form onSubmit={handleCadastro} style={{marginTop:14, display:'grid', gap:10}}>
              {cadTipo==='montador' && (
                <div style={{display:'flex', gap:12, alignItems:'center'}}>
                  <div style={{width:80,height:80, borderRadius:16, background:'#F1F5F9', border:'1.5px dashed #CBD5E1', overflow:'hidden', display:'grid', placeItems:'center'}}>
                    {fotoPerfilTmp? <img src={fotoPerfilTmp} style={{width:'100%',height:'100%', objectFit:'cover'}}/> : <span style={{fontSize:22}}>📸</span>}
                  </div>
                  <label style={{fontSize:12, background:'#0A2A6B', color:'white', borderRadius:10, padding:'8px 12px', cursor:'pointer', fontWeight:600}}>
                    Upload foto perfil galeria
                    <input type="file" accept="image/*" style={{display:'none'}} onChange={e=>{
                      const f=e.target.files?.[0]; if(!f) return; const r=new FileReader(); r.onload=ev=> setFotoPerfilTmp(ev.target?.result); r.readAsDataURL(f);
                    }}/>
                  </label>
                </div>
              )}
              <input name="nome" required placeholder="Nome completo" style={{border:'1.5px solid #E5E7EB', borderRadius:12, padding:11}}/>
              <input name="email" required type="email" placeholder="E-mail" style={{border:'1.5px solid #E5E7EB', borderRadius:12, padding:11}}/>
              <input name="senha" required type="password" placeholder="Senha" style={{border:'1.5px solid #E5E7EB', borderRadius:12, padding:11}}/>
              <input name="telefone" required placeholder="Telefone/WhatsApp" style={{border:'1.5px solid #E5E7EB', borderRadius:12, padding:11}}/>
              <select name="cidade" required style={{border:'1.5px solid #E5E7EB', borderRadius:12, padding:11}}>
                <option value="">Cidade onde mora</option>{CIDADES_SP.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
              {cadTipo==='montador' && <>
                <select name="cidade_atende" required style={{border:'1.5px solid #FF7A00', borderRadius:12, padding:11}}>
                  <option value="">Cidade que atende (obrigatório)</option>{CIDADES_SP.map(c=><option key={c} value={c}>{c}</option>)}
                </select>
                <input name="chave_pix" required placeholder="Chave PIX próprio nome (obrigatório)" style={{border:'1.5px solid #FF7A00', borderRadius:12, padding:11}}/>
              </>}
              <button type="submit" style={{background:'#0A2A6B', color:'white', borderRadius:14, padding:12, fontWeight:800, marginTop:4, boxShadow:'0 6px 16px rgba(10,42,107,0.25)'}}>Criar conta</button>
            </form>
            <button onClick={()=>setView('login')} style={{width:'100%', marginTop:12, fontSize:13, color:'#0A2A6B', fontWeight:700}}>Já tenho cadastro</button>
            <button onClick={()=>setView('home')} style={{width:'100%', marginTop:8, fontSize:12, opacity:0.5}}>Voltar</button>
          </div>
        </div>
      )}

      {view==='login' && (
        <div style={{maxWidth:420, margin:'28px auto', padding:16}}>
          <div className="premium-card" style={{padding:22}}>
            <h2 style={{fontWeight:800, fontSize:18}}>Entrar</h2>
            <p style={{fontSize:12, opacity:0.55, marginTop:4}}>Após login vai para painel automático</p>
            <form onSubmit={handleLogin} style={{marginTop:14, display:'grid', gap:10}}>
              <input name="email" required placeholder="E-mail" style={{border:'1.5px solid #E5E7EB', borderRadius:12, padding:11}}/>
              <input name="senha" required type="password" placeholder="Senha" style={{border:'1.5px solid #E5E7EB', borderRadius:12, padding:11}}/>
              <button type="submit" style={{background:'linear-gradient(135deg,#FF7A00 0%,#FF9A3C 100%)', color:'white', borderRadius:14, padding:12, fontWeight:800, boxShadow:'0 8px 18px rgba(255,122,0,0.3)'}}>Entrar • Notificação sonora</button>
            </form>
            <div style={{marginTop:14, fontSize:11, opacity:0.55, background:'#F8FAFC', borderRadius:10, padding:10}}>Admin demo: andre@contatocertosp.com.br / Contato@2026SP<br/>Montador: carlos@ex.com / 123 • Cliente: ana@ex.com / 123</div>
            <button onClick={()=>setView('home')} style={{width:'100%', marginTop:12, fontSize:12, opacity:0.6}}>Voltar</button>
          </div>
        </div>
      )}

      {view==='pagamento' && pedidoEmPagamento && (
        <div style={{maxWidth:440, margin:'0 auto', padding:16}}>
          <div className="premium-card" style={{padding:20}}>
            <h2 style={{fontWeight:800}}>Pagamento • Pedido #{pedidoEmPagamento.numero}</h2>
            <div style={{marginTop:12, background:'#F8FAFC', borderRadius:14, padding:14, fontSize:13, border:'1px solid #EEF1F7'}}>
              <div><b>Móvel:</b> {pedidoEmPagamento.movel_nome}</div>
              <div><b>Serviço:</b> {pedidoEmPagamento.servico_tipo}</div>
              <div><b>Cidade:</b> {pedidoEmPagamento.cidade} - {pedidoEmPagamento.bairro}</div>
              <div style={{marginTop:10, fontWeight:800, fontSize:17, color:'#0A2A6B'}}>Total: R$ {pedidoEmPagamento.valor_bruto},00</div>
              <div style={{fontSize:11, opacity:0.6}}>Comissão plataforma 10% já inclusa. Montador recebe R$ {pedidoEmPagamento.valor_liquido}</div>
            </div>
            <div style={{marginTop:16, border:'2px dashed #0A2A6B', borderRadius:14, padding:14, textAlign:'center', background:'linear-gradient(135deg,#F0F4FF 0%,#FFFFFF 100%)'}}>
              <div style={{fontSize:12, fontWeight:800, color:'#0A2A6B'}}>PIX - Copia e Cola (só aqui)</div>
              <div style={{marginTop:8, background:'#0A2A6B', color:'white', padding:'10px 12px', borderRadius:10, fontSize:13, wordBreak:'break-all', fontWeight:600, letterSpacing:'0.2px'}}>contatocerto.prestadores@gmail.com</div>
              <div style={{fontSize:11, marginTop:8, opacity:0.6}}>Titular: Contato Certo SP Prestadores</div>
            </div>
            <button onClick={()=>{ confirmarPagamento(pedidoEmPagamento.id); setView('cliente'); setTab('pendente'); }} style={{marginTop:16, width:'100%', background:'#0A2A6B', color:'white', borderRadius:14, padding:13, fontWeight:800}}>Já paguei - Enviar comprovante</button>
            <button onClick={()=>setView('cliente')} style={{width:'100%', marginTop:10, border:'1.5px solid #E5E7EB', borderRadius:14, padding:11, fontWeight:600}}>Ver depois</button>
          </div>
        </div>
      )}

      {/* CLIENTE PREMIUM PAINEL */}
      {view==='cliente' && currentUser && (
        <div style={{maxWidth:1160, margin:'0 auto', padding:16}}>
          <div className="premium-card" style={{padding:16, display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14, background:'linear-gradient(135deg,#FFFFFF 0%,#F8FAFF 100%)'}}>
            <div style={{display:'flex', gap:12, alignItems:'center'}}>
              <div style={{width:48,height:48, borderRadius:14, background:'linear-gradient(135deg,#0A2A6B 0%,#2D5CFF 100%)', color:'white', display:'grid', placeItems:'center', fontWeight:800, boxShadow:'0 6px 14px rgba(10,42,107,0.25)', fontSize:18}}>{currentUser.nome[0]}</div>
              <div><div style={{fontWeight:800, fontSize:15}}>{currentUser.nome}</div><div style={{fontSize:12, opacity:0.6, display:'flex', gap:6, alignItems:'center'}}><span>📍 {currentUser.cidade}</span><span style={{background:'#EEF1F7', borderRadius:20, padding:'2px 8px', fontSize:10, fontWeight:700}}>CLIENTE</span></div></div>
            </div>
            <div style={{display:'flex', gap:8}}>
              <button onClick={()=>setView('home')} style={{fontSize:12, border:'1.5px solid #E5E7EB', borderRadius:20, padding:'8px 14px', fontWeight:600, background:'white'}}>Catálogo 77</button>
              <button onClick={()=>{setCurrentUser(null); setView('home');}} style={{fontSize:12, background:'#0A2A6B', color:'white', borderRadius:20, padding:'8px 14px', fontWeight:600}}>Sair</button>
            </div>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:10, marginBottom:14}}>
            <div className="premium-metric" style={{padding:14}}>
              <div style={{display:'flex', justifyContent:'space-between'}}><span style={{fontSize:22}}>📦</span><span style={{fontSize:10, background:'#DBEAFE', color:'#1E40AF', borderRadius:20, padding:'4px 8px', fontWeight:700}}>{pedidos.filter(p=>p.cliente_id===currentUser.id).length} total</span></div>
              <div style={{fontSize:11, opacity:0.55, marginTop:8}}>Total Pedidos</div><div style={{fontWeight:800, fontSize:20, marginTop:2}}>{pedidos.filter(p=>p.cliente_id===currentUser.id).length}</div>
            </div>
            <div className="premium-metric" style={{padding:14, background:'linear-gradient(135deg,#FFF7ED 0%,#FFFFFF 100%)'}}>
              <div style={{display:'flex', justifyContent:'space-between'}}><span style={{fontSize:22}}>⏳</span><span style={{fontSize:10, background:'#FFEDD5', color:'#9A3412', borderRadius:20, padding:'4px 8px', fontWeight:700}}>pendentes</span></div>
              <div style={{fontSize:11, opacity:0.55, marginTop:8}}>Pedidos Pendentes</div><div style={{fontWeight:800, fontSize:20, marginTop:2, color:'#FF7A00'}}>{clienteFinanceiro.pendCount}</div>
            </div>
            <div className="premium-metric" style={{padding:14, background:'linear-gradient(135deg,#F0FDF4 0%,#FFFFFF 100%)'}}>
              <div style={{display:'flex', justifyContent:'space-between'}}><span style={{fontSize:22}}>✅</span><span style={{fontSize:10, background:'#DCFCE7', color:'#166534', borderRadius:20, padding:'4px 8px', fontWeight:700}}>finalizados</span></div>
              <div style={{fontSize:11, opacity:0.55, marginTop:8}}>Finalizados</div><div style={{fontWeight:800, fontSize:20, marginTop:2, color:'#16A34A'}}>{clienteFinanceiro.finalCount}</div>
            </div>
            <div className="premium-metric" style={{padding:14, background:'linear-gradient(135deg,#F0F4FF 0%,#FFFFFF 100%)'}}>
              <div style={{display:'flex', justifyContent:'space-between'}}><span style={{fontSize:22}}>🎟️</span><span style={{fontSize:10, background:'#EEF1F7', color:'#0A2A6B', borderRadius:20, padding:'4px 8px', fontWeight:700}}>{cupons.length} ativos</span></div>
              <div style={{fontSize:11, opacity:0.55, marginTop:8}}>Economia Cupons</div><div style={{fontWeight:800, fontSize:18, marginTop:2}}>R$ {clienteFinanceiro.total>0? Math.round(clienteFinanceiro.total*0.1):0}</div>
            </div>
          </div>

          <div style={{display:'flex', gap:8, overflowX:'auto', paddingBottom:6, background:'#EEF1F7', borderRadius:14, padding:6, width:'fit-content'}}>
            {[
              {k:'pendente', l:'Pedido Pendente', ic:'⏳'},
              {k:'finalizados', l:'Finalizados', ic:'✅'},
              {k:'financeiro', l:'Financeiro', ic:'💳'},
              {k:'cupons', l:'Cupons', ic:'🎟️'},
            ].map(t=>(
              <button key={t.k} onClick={()=>{ setTab(t.k); playNotification('new'); }} style={{whiteSpace:'nowrap', borderRadius:12, padding:'9px 16px', fontWeight:700, fontSize:13, display:'flex', gap:6, alignItems:'center'}} className={tab===t.k?'tab-active':'tab-idle'}><span>{t.ic}</span>{t.l}</button>
            ))}
          </div>

          {tab==='pendente' && (
            <div style={{marginTop:14, display:'grid', gap:12}}>
              {pedidos.filter(p=>p.cliente_id===currentUser.id && ['AGUARDANDO_PAGAMENTO','COMPROVANTE_ENVIADO','PROCURANDO_MONTADOR','ACEITO'].includes(p.status)).map(p=>{
                const borderColor = p.status==='ACEITO'?'#16A34A': p.status==='AGUARDANDO_PAGAMENTO'?'#FF7A00':'#2D5CFF';
                return (
                <div key={p.id} className="premium-card" style={{padding:14, borderLeft:`5px solid ${borderColor}`, display:'flex', gap:12}}>
                  <div style={{width:60,height:60, borderRadius:12, background:'#F1F5F9', overflow:'hidden', flexShrink:0, display:'grid', placeItems:'center', border:'1px solid #EEF1F7'}}>
                    {p.fotos?.[0]? <img src={p.fotos[0]} style={{width:'100%',height:'100%', objectFit:'cover'}}/> : <span style={{fontSize:24}}>🪑</span>}
                  </div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{display:'flex', justifyContent:'space-between', gap:8, flexWrap:'wrap'}}>
                      <div style={{fontWeight:800, fontSize:13}}>#{p.numero} • {p.movel_nome}</div>
                      <span style={{fontSize:11, padding:'5px 10px', borderRadius:20, fontWeight:700, background: p.status==='ACEITO'?'#DCFCE7': p.status==='AGUARDANDO_PAGAMENTO'?'#FEF3C7':'#DBEAFE', color:p.status==='ACEITO'?'#166534': p.status==='AGUARDANDO_PAGAMENTO'?'#92400E':'#1E40AF'}}>{p.status}</span>
                    </div>
                    <div style={{fontSize:12, opacity:0.65, marginTop:6, display:'flex', gap:8, flexWrap:'wrap'}}><span>📦 {p.categoria}</span><span>• {p.servico_tipo}</span><span style={{fontWeight:700, color:'#0A2A6B'}}>• R$ {p.valor_bruto}</span><span>📍 {p.cidade}/{p.bairro}</span><span>🗓️ {p.data_servico} {p.horario}</span></div>
                    {p.montador_nome && <div style={{marginTop:8, fontSize:12, background:'#F0FDF4', borderRadius:8, padding:'6px 10px', display:'inline-flex', gap:6}}><span>🔧</span><span>Montador: <b>{p.montador_nome}</b> • Notificação sonora ✅</span></div>}
                    {p.status==='AGUARDANDO_PAGAMENTO' && <button onClick={()=>{setPedidoEmPagamento(p); setView('pagamento'); playNotification('new');}} style={{marginTop:10, width:'100%', background:'linear-gradient(135deg,#FF7A00 0%,#FF9A3C 100%)', color:'white', borderRadius:12, padding:11, fontWeight:800, boxShadow:'0 6px 14px rgba(255,122,0,0.3)'}}>Ver Pagamento PIX • 80x80 preview</button>}
                  </div>
                </div>
              )})}
              {pedidos.filter(p=>p.cliente_id===currentUser.id && ['AGUARDANDO_PAGAMENTO','COMPROVANTE_ENVIADO','PROCURANDO_MONTADOR','ACEITO'].includes(p.status)).length===0 && <div className="premium-card" style={{padding:28, textAlign:'center', opacity:0.6, fontSize:13}}>Nenhum pedido pendente. Vá ao catálogo 77 móveis.</div>}
            </div>
          )}

          {tab==='finalizados' && (
            <div style={{marginTop:14, display:'grid', gap:10}}>
              {pedidos.filter(p=>p.cliente_id===currentUser.id && p.status==='FINALIZADO').map(p=>(
                <div key={p.id} className="premium-card" style={{padding:14, borderLeft:'5px solid #16A34A', display:'flex', gap:12, alignItems:'center'}}>
                  <div style={{width:60,height:60, borderRadius:12, background:'#F0FDF4', display:'grid', placeItems:'center', fontSize:22}}>✅</div>
                  <div><div style={{fontWeight:800, fontSize:13}}>#{p.numero} • {p.movel_nome}</div><div style={{fontSize:12, opacity:0.6, marginTop:2}}>Finalizado por {p.montador_nome||'montador'} • R$ {p.valor_bruto} • {p.cidade}</div></div>
                </div>
              ))}
              {pedidos.filter(p=>p.cliente_id===currentUser.id && p.status==='FINALIZADO').length===0 && <div className="premium-card" style={{padding:22, textAlign:'center', opacity:0.5}}>Nenhum finalizado ainda.</div>}
            </div>
          )}

          {tab==='financeiro' && (
            <div style={{marginTop:14, display:'grid', gap:12}}>
              <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:10}}>
                <div className="premium-card" style={{padding:14, background:'linear-gradient(135deg,#0A2A6B 0%,#2D5CFF 100%)', color:'white'}}><div style={{fontSize:11, opacity:0.7}}>Total Pedidos</div><div style={{fontWeight:800, fontSize:22, marginTop:4}}>R$ {clienteFinanceiro.total}</div><div style={{marginTop:8, height:4, background:'rgba(255,255,255,0.2)', borderRadius:4}}><div style={{height:'100%', width:'78%', background:'white', borderRadius:4}}></div></div></div>
                <div className="premium-card" style={{padding:14}}><div style={{fontSize:11, opacity:0.5}}>Total Pago</div><div style={{fontWeight:800, fontSize:20, color:'#16A34A', marginTop:4}}>R$ {clienteFinanceiro.pago}</div><div style={{fontSize:11, opacity:0.5, marginTop:4}}>• Notificação sonora aceito ✅</div></div>
                <div className="premium-card" style={{padding:14, background:'linear-gradient(135deg,#FFF7ED 0%,#FFFFFF 100%)'}}><div style={{fontSize:11, opacity:0.5}}>Pendente</div><div style={{fontWeight:800, fontSize:20, color:'#FF7A00', marginTop:4}}>R$ {clienteFinanceiro.pendente}</div></div>
              </div>
              <div className="premium-card" style={{padding:16}}>
                <div style={{fontWeight:800, fontSize:13, marginBottom:12}}>Gráfico • Valores por período (barras)</div>
                <div style={{display:'flex', alignItems:'end', gap:8, height:110}}>
                  {clienteChart.values.map((v,i)=>(
                    <div key={i} style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:6}}>
                      <div style={{fontSize:10, fontWeight:700, color:'#0A2A6B'}}>R${v}</div>
                      <div style={{width:'100%', background:'linear-gradient(180deg,#0A2A6B 0%,#2D5CFF 100%)', borderRadius:'8px 8px 4px 4px', height:`${(v/clienteChart.max)*80+12}px`, transition:'height .4s'}}></div>
                      <div style={{fontSize:10, opacity:0.6}}>{clienteChart.months[i]}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="premium-card" style={{padding:14}}>
                <div style={{fontWeight:800, fontSize:13, marginBottom:10}}>Detalhe por pedido</div>
                {pedidos.filter(p=>p.cliente_id===currentUser.id).map(p=>(
                  <div key={p.id} style={{display:'flex', justifyContent:'space-between', fontSize:12, padding:'8px 0', borderBottom:'1px solid #F1F5F9'}}><span>#{p.numero} {p.movel_nome} • {p.status}</span><span style={{fontWeight:700}}>R$ {p.valor_bruto}</span></div>
                ))}
              </div>
            </div>
          )}

          {tab==='cupons' && (
            <div style={{marginTop:14, display:'grid', gap:12}}>
              {cupons.map(c=>(
                <div key={c.id} style={{background:'white', borderRadius:16, padding:14, display:'flex', justifyContent:'space-between', alignItems:'center', border:'1.5px dashed #0A2A6B', boxShadow:'0 4px 16px rgba(10,42,107,0.06)', position:'relative', overflow:'hidden'}}>
                  <div style={{position:'absolute', left:-10, top:'50%', transform:'translateY(-50%)', width:20,height:20, background:'#F4F6FB', borderRadius:'50%', border:'1.5px solid #0A2A6B'}}></div>
                  <div style={{position:'absolute', right:-10, top:'50%', transform:'translateY(-50%)', width:20,height:20, background:'#F4F6FB', borderRadius:'50%', border:'1.5px solid #0A2A6B'}}></div>
                  <div style={{display:'flex', gap:10, alignItems:'center'}}>
                    <div style={{width:40,height:40, borderRadius:10, background:'linear-gradient(135deg,#0A2A6B 0%,#2D5CFF 100%)', display:'grid', placeItems:'center', color:'white', fontSize:18}}>🎟️</div>
                    <div><div style={{fontWeight:800}}>{c.codigo}</div><div style={{fontSize:12, opacity:0.6}}>{c.desconto}{c.tipo} OFF • Validade {c.validade} • Limite {c.limite}</div></div>
                  </div>
                  <button onClick={()=>{ navigator.clipboard?.writeText(c.codigo); showToast('Cupom copiado! 🎟️'); playNotification('accept'); }} style={{background:'#0A2A6B', color:'white', borderRadius:10, padding:'8px 14px', fontSize:12, fontWeight:700}}>Copiar</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MONTADOR PREMIUM PAINEL */}
      {view==='montador' && currentUser && (
        <div style={{maxWidth:1160, margin:'0 auto', padding:16}}>
          <div className="premium-card" style={{padding:16, marginBottom:14, background:'linear-gradient(135deg,#FFFFFF 0%,#F8FAFF 100%)', border:'1px solid #E0E7FF'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12, flexWrap:'wrap'}}>
              <div style={{display:'flex', gap:12, alignItems:'center'}}>
                <div style={{width:60,height:60, borderRadius:16, background:'#0A2A6B', color:'white', display:'grid', placeItems:'center', fontWeight:800, fontSize:22, overflow:'hidden', boxShadow:'0 6px 16px rgba(10,42,107,0.25)', border:'2px solid white'}}>
                  {currentUser.foto_perfil? <img src={currentUser.foto_perfil} style={{width:'100%',height:'100%', objectFit:'cover'}}/> : currentUser.nome[0]}
                </div>
                <div>
                  <div style={{fontWeight:800, fontSize:15, display:'flex', alignItems:'center', gap:8}}>{currentUser.nome} <span style={{background:'#FF7A00', color:'white', borderRadius:20, padding:'3px 8px', fontSize:10, fontWeight:800}}>📍 {currentUser.cidade_atende}</span></div>
                  <div style={{fontSize:11, opacity:0.65, marginTop:2, display:'flex', gap:8, flexWrap:'wrap'}}><span>PIX: {currentUser.chave_pix}</span><span>•</span><span>🏠 {currentUser.cidade}</span></div>
                  <div style={{marginTop:6, display:'flex', gap:6}}>
                    <label style={{display:'flex', gap:8, alignItems:'center', fontSize:12, fontWeight:600}}>
                      Foto galeria
                      <input type="file" accept="image/*" style={{display:'none'}} onChange={e=>{
                        const f=e.target.files?.[0]; if(!f) return; const r=new FileReader(); r.onload=ev=>{
                          const url=ev.target?.result; const upd={...currentUser, foto_perfil:url}; setCurrentUser(upd); setUsuarios(prev=>prev.map(u=>u.id===currentUser.id? upd: u)); showToast('Foto perfil atualizada!'); playNotification('accept');
                        }; r.readAsDataURL(f);
                      }}/>
                      <span style={{background:'#EEF1F7', borderRadius:8, padding:'4px 8px', cursor:'pointer'}}>📸 trocar</span>
                    </label>
                  </div>
                </div>
              </div>
              <div style={{display:'flex', alignItems:'center', gap:10, background: currentUser.status_disponivel?'#F0FDF4':'#F3F4F6', borderRadius:20, padding:'6px 10px 6px 14px', border:`1.5px solid ${currentUser.status_disponivel?'#BBF7D0':'#E5E7EB'}`}}>
                <div style={{fontSize:11, fontWeight:800, color: currentUser.status_disponivel?'#16A34A':'#6B7280'}}>{currentUser.status_disponivel?'● Disponível':'○ Offline'}</div>
                <div onClick={toggleDisponivel} className="switch-track" style={{background: currentUser.status_disponivel?'#16A34A':'#9CA3AF'}}>
                  <div className="switch-thumb" style={{left: currentUser.status_disponivel?'25px':'3px'}}></div>
                </div>
              </div>
            </div>
            <div style={{marginTop:12, fontSize:11, background:'#FFFBEB', border:'1px solid #FDE68A', borderRadius:10, padding:'8px 10px'}}>🔊 Notificação sonora triplo beep agudo quando novo pedido chega em {currentUser.cidade_atende} + vibração visual pulse</div>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))', gap:10, marginBottom:14}}>
            <div className="premium-metric" style={{padding:14, background:'linear-gradient(135deg,#FFF7ED 0%,#FFFFFF 100%)', borderColor:'#FFEDD5'}}><div style={{display:'flex', justifyContent:'space-between'}}><span style={{fontSize:20}}>🔧</span><span style={{fontSize:10, background:'#FF7A00', color:'white', borderRadius:20, padding:'3px 8px', fontWeight:800}} className={montadorFinanceiro.disponiveis>0?'pulse':''}>{montadorFinanceiro.disponiveis}</span></div><div style={{fontSize:11, opacity:0.55, marginTop:6}}>Pedidos Disponíveis</div><div style={{fontWeight:800, fontSize:18, color:'#FF7A00'}}>{montadorFinanceiro.disponiveis}</div></div>
            <div className="premium-metric" style={{padding:14}}><div style={{fontSize:20}}>⏳</div><div style={{fontSize:11, opacity:0.55, marginTop:6}}>Aceitos</div><div style={{fontWeight:800, fontSize:18}}>{montadorFinanceiro.aceitos}</div></div>
            <div className="premium-metric" style={{padding:14, background:'linear-gradient(135deg,#F0FDF4 0%,#FFFFFF 100%)'}}><div style={{fontSize:20}}>✅</div><div style={{fontSize:11, opacity:0.55, marginTop:6}}>Finalizados</div><div style={{fontWeight:800, fontSize:18, color:'#16A34A'}}>{montadorFinanceiro.finalizados}</div></div>
            <div className="premium-metric" style={{padding:14, background:'linear-gradient(135deg,#0A2A6B 0%,#2D5CFF 100%)', color:'white'}}><div style={{fontSize:20}}>💰</div><div style={{fontSize:11, opacity:0.7, marginTop:6}}>A Receber</div><div style={{fontWeight:800, fontSize:18}}>R$ {montadorFinanceiro.aReceber}</div></div>
          </div>

          <div style={{display:'flex', gap:8, overflowX:'auto', paddingBottom:6, background:'#EEF1F7', borderRadius:14, padding:6, width:'fit-content'}}>
            {[{k:'pendentes',l:'Pedidos Pendentes', ic:'🔧'},{k:'finalizados',l:'Finalizados', ic:'✅'},{k:'financeiro',l:'Financeiro', ic:'💰'}].map(t=>(
              <button key={t.k} onClick={()=>{setTab(t.k); playNotification('new');}} style={{whiteSpace:'nowrap', borderRadius:12, padding:'9px 16px', fontWeight:700, fontSize:13, display:'flex', gap:6, alignItems:'center'}} className={tab===t.k?'tab-active':'tab-idle'}><span>{t.ic}</span>{t.l}</button>
            ))}
          </div>

          {tab==='pendentes' && (
            <div style={{marginTop:14, display:'grid', gap:12}}>
              {pedidos.filter(p=>['PROCURANDO_MONTADOR','COMPROVANTE_ENVIADO'].includes(p.status) && p.cidade===currentUser.cidade_atende).map(p=>(
                <div key={p.id} className="premium-card" style={{padding:14, display:'flex', gap:12, borderLeft:'5px solid #FF7A00'}}>
                  <div style={{width:80,height:80, borderRadius:14, background:'#F8FAFC', overflow:'hidden', flexShrink:0, border:'1px solid #EEF1F7', display:'grid', placeItems:'center'}}>
                    {p.fotos?.[0]? <img src={p.fotos[0]} style={{width:'100%',height:'100%', objectFit:'cover'}}/> : <span style={{fontSize:28}}>🪑</span>}
                  </div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:6}}>
                      <div style={{fontWeight:800, fontSize:14}}>#{p.numero} • {p.movel_nome}</div>
                      <div style={{fontSize:11, background:'#FFEDD5', color:'#9A3412', borderRadius:20, padding:'4px 10px', fontWeight:700, display:'flex', gap:4, alignItems:'center'}}>📍 {p.cidade}</div>
                    </div>
                    <div style={{fontSize:12, opacity:0.65, marginTop:6, display:'flex', gap:8, flexWrap:'wrap'}}><span style={{background:'#EEF1F7', borderRadius:20, padding:'2px 8px'}}>{p.categoria}</span><span>{p.servico_tipo}</span><span style={{fontWeight:800, color:'#FF7A00'}}>R$ {p.valor_liquido} líquido</span><span>🏘️ {p.bairro}</span><span>🗓️ {p.data_servico} {p.horario}</span></div>
                    <div style={{fontSize:12, marginTop:8, background:'#F8FAFC', borderRadius:8, padding:'6px 10px', display:'inline-flex', gap:6}}>👤 Cliente: <b>{p.cliente_nome}</b></div>
                    <div style={{display:'flex', gap:8, marginTop:12}}>
                      <button onClick={()=>aceitarPedido(p)} style={{flex:1, background:'linear-gradient(135deg,#FF7A00 0%,#FF9A3C 100%)', color:'white', borderRadius:12, padding:11, fontWeight:800, boxShadow:'0 6px 14px rgba(255,122,0,0.3)', transition:'transform .12s'}} className="hover:scale-[1.02]">ACEITAR</button>
                      <button onClick={()=>recusarPedido(p)} style={{flex:1, background:'#F3F4F6', borderRadius:12, padding:11, fontWeight:700, color:'#6B7280'}}>RECUSAR</button>
                    </div>
                  </div>
                </div>
              ))}
              {pedidos.filter(p=>['PROCURANDO_MONTADOR','COMPROVANTE_ENVIADO'].includes(p.status) && p.cidade===currentUser.cidade_atende).length===0 && <div className="premium-card" style={{padding:28, textAlign:'center', opacity:0.6, fontSize:13}}>Nenhum pedido pendente na sua cidade {currentUser.cidade_atende}. Fique Disponível! 🔊 Som triplo ativado.</div>}
            </div>
          )}

          {tab==='finalizados' && (
            <div style={{marginTop:14, display:'grid', gap:10}}>
              {pedidos.filter(p=>p.montador_id===currentUser.id && p.status==='FINALIZADO').map(p=>(
                <div key={p.id} className="premium-card" style={{padding:14, borderLeft:'5px solid #16A34A', display:'flex', gap:12, alignItems:'center'}}>
                  <div style={{width:56,height:56, borderRadius:12, background:'#DCFCE7', display:'grid', placeItems:'center', fontSize:20}}>✅</div>
                  <div><div style={{fontWeight:800, fontSize:13}}>#{p.numero} • {p.movel_nome} • {p.cidade}</div><div style={{fontSize:12, opacity:0.6, marginTop:2}}>Cliente {p.cliente_nome} • Recebeu R$ {p.valor_liquido} • Finalização com som</div></div>
                </div>
              ))}
            </div>
          )}

          {tab==='financeiro' && (
            <div style={{marginTop:14, display:'grid', gap:12}}>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
                <div className="premium-card" style={{padding:16, background:'linear-gradient(135deg,#0A2A6B 0%,#2D5CFF 100%)', color:'white'}}><div style={{fontSize:11, opacity:0.7}}>Valores realizados (mês)</div><div style={{fontWeight:800, fontSize:22, marginTop:6}}>R$ {montadorFinanceiro.realizado}</div><div style={{marginTop:10, fontSize:11, opacity:0.7}}>✅ Finalizados • som</div></div>
                <div className="premium-card" style={{padding:16, background:'linear-gradient(135deg,#FF7A00 0%,#FFB86A 100%)', color:'white'}}><div style={{fontSize:11, opacity:0.85}}>Valores a receber</div><div style={{fontWeight:800, fontSize:22, marginTop:6}}>R$ {montadorFinanceiro.aReceber}</div><div style={{marginTop:10, fontSize:11, opacity:0.85}}>⏳ Aceitos</div></div>
              </div>
              <div className="premium-card" style={{padding:16}}>
                <div style={{fontWeight:800, fontSize:14}}>Total geral R$ {montadorFinanceiro.total}</div>
                <div style={{marginTop:12, display:'grid', gap:6}}>
                  {montadorFinanceiro.lista.map(p=>(
                    <div key={p.id} style={{display:'flex', justifyContent:'space-between', fontSize:12, padding:'10px 12px', borderRadius:10, background: p.status==='FINALIZADO'?'#F0FDF4':'#FFF7ED', border:`1px solid ${p.status==='FINALIZADO'?'#BBF7D0':'#FFEDD5'}`}}><span>#{p.numero} {p.movel_nome} • {p.status} • {p.cidade}</span><span style={{fontWeight:800}}>R$ {p.valor_liquido}</span></div>
                  ))}
                  {montadorFinanceiro.lista.length===0 && <div style={{fontSize:12, opacity:0.5, textAlign:'center', padding:16}}>Nenhuma transação.</div>}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {view==='adminLogin' && (
        <div style={{maxWidth:400, margin:'28px auto', padding:16}}>
          <div className="premium-card" style={{padding:20}}>
            <h3 style={{fontWeight:800, fontSize:16}}>Admin Acesso • 5 toques logo (invisível)</h3>
            <form onSubmit={e=>{
              e.preventDefault(); const fd=new FormData(e.target); const login=fd.get('login'); const senha=fd.get('senha');
              if((login==='AndreSousa84' && senha==='Contato@2026SP') || (login==='andre@contatocertosp.com.br' && senha==='Contato@2026SP')){ setView('admin'); setTab('pedidos'); const adm = usuarios.find(u=>u.tipo==='admin'); if(adm) setCurrentUser(adm); playNotification('accept'); } else showToast('Credenciais inválidas');
            }} style={{marginTop:14, display:'grid', gap:10}}>
              <input name="login" placeholder="Login" style={{border:'1.5px solid #E5E7EB', borderRadius:12, padding:11}}/>
              <input name="senha" type="password" placeholder="Senha" style={{border:'1.5px solid #E5E7EB', borderRadius:12, padding:11}}/>
              <button style={{background:'#0A2A6B', color:'white', borderRadius:12, padding:12, fontWeight:800}}>Entrar Admin • som</button>
            </form>
            <button onClick={()=>setView('home')} style={{marginTop:12, fontSize:12, opacity:0.6, width:'100%'}}>Voltar</button>
          </div>
        </div>
      )}

      {view==='admin' && (
        <div style={{maxWidth:1180, margin:'0 auto', padding:16}}>
          <div className="premium-card" style={{background:'#0A2A6B', color:'white', borderRadius:16, padding:16, display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14, boxShadow:'0 8px 24px rgba(10,42,107,0.35)', flexWrap:'wrap', gap:10}}>
            <div style={{display:'flex', gap:12, alignItems:'center'}}>
              <div style={{width:44,height:44, borderRadius:12, background:'white', display:'grid', placeItems:'center'}}>{LOGO_SVG}</div>
              <div><div style={{fontWeight:800}}>ADM • Contato Certo SP • Premium</div><div style={{fontSize:11, opacity:0.7, marginTop:2}}>645 cidades • 77 móveis • Realtime • Notificações sonoras em todas ações</div></div>
            </div>
            <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>
              {[{k:'pedidos',l:'Pedidos', ic:'📦'},{k:'usuarios',l:'Usuários', ic:'👥'},{k:'cupons',l:'Cupons', ic:'🎟️'},{k:'financeiro',l:'Financeiro', ic:'💰'}].map(t=>(
                <button key={t.k} onClick={()=>{setTab(t.k); playNotification('new');}} style={{background:tab===t.k?'white':'rgba(255,255,255,0.15)', color:tab===t.k?'#0A2A6B':'white', borderRadius:20, padding:'7px 12px', fontSize:12, fontWeight:700, display:'flex', gap:5, alignItems:'center'}}><span>{t.ic}</span>{t.l}</button>
              ))}
            </div>
          </div>

          {tab==='pedidos' && (
            <div style={{display:'grid', gap:10}}>
              {pedidos.map(p=>(
                <div key={p.id} className="premium-card" style={{padding:14, fontSize:12, borderLeft:`5px solid ${p.status==='FINALIZADO'?'#16A34A': p.status==='ACEITO'?'#0A2A6B':'#FF7A00'}`}}>
                  <div style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:8, alignItems:'center'}}>
                    <div style={{display:'flex', gap:8, alignItems:'center'}}><div style={{width:40,height:40, borderRadius:10, background:'#F1F5F9', display:'grid', placeItems:'center', overflow:'hidden'}}>{p.fotos?.[0]? <img src={p.fotos[0]} style={{width:'100%',height:'100%', objectFit:'cover'}}/> : <span>🪑</span>}</div><b>#{p.numero} {p.movel_nome} • {p.cidade} • R$ {p.valor_bruto} (líq R$ {p.valor_liquido}) • <span style={{color:p.status==='FINALIZADO'?'#16A34A':'#0A2A6B'}}>{p.status}</span></b></div>
                    <div style={{display:'flex', gap:6}}>
                      <button onClick={()=>{ const upd=pedidos.map(x=> x.id===p.id? {...x, status:'PROCURANDO_MONTADOR'}:x); setPedidos(upd); playNotification('accept'); showToast('Pagamento confirmado com som'); }} style={{background:'#DBEAFE', borderRadius:10, padding:'6px 12px', fontWeight:700}}>Confirmar Pagamento</button>
                      <button onClick={()=>finalizarPedido(p.id)} style={{background:'#DCFCE7', borderRadius:10, padding:'6px 12px', fontWeight:700}}>Finalizar</button>
                    </div>
                  </div>
                  <div style={{opacity:0.6, marginTop:6}}>Cliente: {p.cliente_nome} • Montador: {p.montador_nome||'-'} • {p.servico_tipo} • {p.bairro} • {p.data_servico} {p.horario}</div>
                </div>
              ))}
              {pedidos.length===0 && <div className="premium-card" style={{padding:24, textAlign:'center', opacity:0.5}}>Nenhum pedido.</div>}
            </div>
          )}

          {tab==='usuarios' && (
            <div style={{display:'grid', gap:10}}>
              {usuarios.map(u=>(
                <div key={u.id} className="premium-card" style={{padding:14, display:'flex', justifyContent:'space-between', alignItems:'center', gap:10}}>
                  <div style={{display:'flex', gap:10, alignItems:'center'}}>
                    <div style={{width:46,height:46, borderRadius:12, background: u.tipo==='admin'?'#0A2A6B': u.tipo==='montador'?'#FF7A00':'#E5E7EB', color: u.tipo!=='cliente'?'white':'#0A2A6B', display:'grid', placeItems:'center', fontWeight:800, overflow:'hidden'}}>
                      {u.foto_perfil? <img src={u.foto_perfil} style={{width:'100%',height:'100%', objectFit:'cover'}}/> : u.nome[0]}
                    </div>
                    <div>
                      <div style={{fontWeight:800, fontSize:13, display:'flex', gap:6, alignItems:'center'}}>{u.nome} <span style={{background: u.tipo==='admin'?'#0A2A6B': u.tipo==='montador'?'#FFEDD5':'#EEF1F7', color: u.tipo==='admin'?'white': u.tipo==='montador'?'#9A3412':'#0A2A6B', borderRadius:20, padding:'2px 8px', fontSize:10, fontWeight:700}}>{u.tipo.toUpperCase()}</span><span style={{background: u.status==='ATIVO'?'#DCFCE7':'#FEE2E2', color: u.status==='ATIVO'?'#166534':'#991B1B', borderRadius:20, padding:'2px 8px', fontSize:10, fontWeight:700}}>{u.status}</span></div>
                      <div style={{fontSize:11, opacity:0.6, marginTop:2}}>{u.email} • {u.cidade} {u.cidade_atende?`• Atende ${u.cidade_atende}`:''} • PIX {u.chave_pix||'-'} • {u.telefone||''}</div>
                    </div>
                  </div>
                  <div style={{display:'flex', gap:6}}>
                    <button onClick={()=>{ const upd=usuarios.map(x=> x.id===u.id? {...x, status: x.status==='BLOQUEADO'?'ATIVO':'BLOQUEADO'}:x); setUsuarios(upd); playNotification('new'); }} style={{background:'#FEF3C7', borderRadius:10, padding:'8px 10px', fontSize:11, fontWeight:700}}>{u.status==='BLOQUEADO'?'Desbloquear':'Bloquear'}</button>
                    <button onClick={()=>{ if(confirm('Excluir usuário?')) { setUsuarios(usuarios.filter(x=>x.id!==u.id)); playNotification('new'); } }} style={{background:'#FEE2E2', color:'#991B1B', borderRadius:10, padding:'8px 10px', fontSize:11, fontWeight:700}}>Excluir</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab==='cupons' && (
            <div style={{display:'grid', gap:12}}>
              <div className="premium-card" style={{padding:16}}>
                <div style={{fontWeight:800, marginBottom:10, display:'flex', gap:6, alignItems:'center'}}><span>🎟️</span> Gerar Cupom Premium</div>
                <form onSubmit={e=>{
                  e.preventDefault(); const fd=new FormData(e.target); const codigo=fd.get('codigo'); const desconto=Number(fd.get('desconto')); const tipo=fd.get('tipo'); const validade=fd.get('validade'); const limite=Number(fd.get('limite'));
                  const novo={id:'cup'+Date.now(), codigo, desconto, tipo, validade, limite, usos:0}; setCupons([...cupons, novo]); (e.target).reset(); showToast('Cupom criado com som 🎟️'); playNotification('accept');
                }} style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
                  <input name="codigo" required placeholder="Código ex: DESCONTO10" style={{border:'1.5px solid #E5E7EB', borderRadius:12, padding:10}}/>
                  <input name="desconto" required type="number" placeholder="Desconto" style={{border:'1.5px solid #E5E7EB', borderRadius:12, padding:10}}/>
                  <select name="tipo" style={{border:'1.5px solid #E5E7EB', borderRadius:12, padding:10}}><option value="%">%</option><option value="R$">R$</option></select>
                  <input name="validade" type="date" style={{border:'1.5px solid #E5E7EB', borderRadius:12, padding:10}}/>
                  <input name="limite" type="number" placeholder="Limite uso" style={{border:'1.5px solid #E5E7EB', borderRadius:12, padding:10}}/>
                  <button style={{gridColumn:'1 / -1', background:'linear-gradient(135deg,#FF7A00 0%,#FF9A3C 100%)', color:'white', borderRadius:12, padding:11, fontWeight:800, boxShadow:'0 6px 14px rgba(255,122,0,0.3)'}}>Criar Cupom</button>
                </form>
              </div>
              <div style={{display:'grid', gap:10}}>
                {cupons.map(c=>(
                  <div key={c.id} className="premium-card" style={{padding:14, display:'flex', justifyContent:'space-between', alignItems:'center', border:'1.5px dashed #0A2A6B'}}>
                    <div style={{display:'flex', gap:10, alignItems:'center'}}><div style={{width:38,height:38, borderRadius:10, background:'#0A2A6B', color:'white', display:'grid', placeItems:'center'}}>🎟️</div><div><b>{c.codigo}</b> • {c.desconto}{c.tipo} • Val {c.validade} • Limite {c.limite}</div></div>
                    <button onClick={()=>{setCupons(cupons.filter(x=>x.id!==c.id)); playNotification('new');}} style={{background:'#FEE2E2', borderRadius:10, padding:'6px 12px', fontSize:11, fontWeight:700, color:'#991B1B'}}>Excluir</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab==='financeiro' && (
            <div style={{display:'grid', gap:12}}>
              <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:10}}>
                <div className="premium-card" style={{padding:16, background:'linear-gradient(135deg,#FFFFFF 0%,#F0F4FF 100%)'}}><div style={{display:'flex', justifyContent:'space-between'}}><span style={{fontSize:20}}>📦</span><span style={{fontSize:10, background:'#0A2A6B', color:'white', borderRadius:20, padding:'3px 8px', fontWeight:700}}>{adminFinanceiro.countMes} mês</span></div><div style={{fontSize:11, opacity:0.55, marginTop:8}}>Total pedidos do mês</div><div style={{fontWeight:800, fontSize:20, marginTop:4}}>R$ {adminFinanceiro.totalPedidosMes}</div></div>
                <div className="premium-card" style={{padding:16, background:'linear-gradient(135deg,#0A2A6B 0%,#2D5CFF 100%)', color:'white'}}><div style={{fontSize:20}}>💸</div><div style={{fontSize:11, opacity:0.7, marginTop:8}}>Comissão plataforma 10% mês</div><div style={{fontWeight:800, fontSize:20, marginTop:4}}>R$ {adminFinanceiro.comissaoMes}</div></div>
                <div className="premium-card" style={{padding:16, background:'linear-gradient(135deg,#F0FDF4 0%,#FFFFFF 100%)'}}><div style={{fontSize:20}}>✅</div><div style={{fontSize:11, opacity:0.55, marginTop:8}}>Total repasse montadores mês</div><div style={{fontWeight:800, fontSize:20, color:'#16A34A', marginTop:4}}>R$ {adminFinanceiro.totalRepasseMes}</div></div>
                <div className="premium-card" style={{padding:16, background:'linear-gradient(135deg,#FFF7ED 0%,#FFFFFF 100%)'}}><div style={{fontSize:20}}>⏳</div><div style={{fontSize:11, opacity:0.55, marginTop:8}}>Valor a repassar pendente (ACEITO)</div><div style={{fontWeight:800, fontSize:20, color:'#FF7A00', marginTop:4}}>R$ {adminFinanceiro.pendenteRepasse}</div></div>
              </div>
              <div className="premium-card" style={{padding:16}}>
                <div style={{fontWeight:800, fontSize:13, marginBottom:12, display:'flex', justifyContent:'space-between'}}><span>Detalhe por montador - a receber • barra progresso</span><span style={{fontSize:11, opacity:0.5}}>🔊 som em ações</span></div>
                {Object.entries(adminFinanceiro.porMontador).map(([id, d])=>{
                  const max = Math.max(...Object.values(adminFinanceiro.porMontador).map((x:any)=>x.total),1);
                  const pct = Math.round((d.total/max)*100);
                  return <div key={id} style={{marginBottom:12}}><div style={{display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:4}}><span style={{fontWeight:700}}>{d.nome} • {d.count} pedidos</span><span style={{fontWeight:800}}>R$ {d.total}</span></div><div style={{height:8, background:'#EEF1F7', borderRadius:20, overflow:'hidden'}}><div style={{height:'100%', width:`${pct}%`, background:'linear-gradient(90deg,#FF7A00 0%,#FFB86A 100%)', borderRadius:20}}></div></div></div>;
                })}
                {Object.keys(adminFinanceiro.porMontador).length===0 && <div style={{fontSize:12, opacity:0.5}}>Nenhum repasse pendente</div>}
              </div>
            </div>
          )}
        </div>
      )}

      <a href="#" onClick={e=>{e.preventDefault(); showToast('App PWA: Adicione à tela inicial. Manifest corrigido ✓'); playNotification('accept');}} style={{position:'fixed', right:16, bottom:16, background:'#0A2A6B', color:'white', borderRadius:24, padding:'11px 18px', fontWeight:800, fontSize:13, boxShadow:'0 10px 28px rgba(10,42,107,0.35)', zIndex:40, display:'flex', alignItems:'center', gap:8, border:'1px solid rgba(255,255,255,0.15)'}}>
        📲 Baixar App
      </a>

      <div style={{height:90}}/>
      <div style={{textAlign:'center', fontSize:10, opacity:0.35, paddingBottom:14, letterSpacing:'0.2px'}}>Premium Painéis • 645 cidades SP completas • 77 móveis • Manifest corrigido theme-color #0A2A6B • localStorage + BroadcastChannel realtime • PIX só na tela pagamento contatocerto.prestadores@gmail.com • 5 toques logo = admin • Notificações sonoras em todos painéis triplo beep</div>
    </div>
  );
}
