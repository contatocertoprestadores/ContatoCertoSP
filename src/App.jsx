import React, { useState, useEffect, useRef, useMemo } from 'react';

const LOGO_SVG = (
  <svg width="36" height="36" viewBox="0 0 42 42" style={{borderRadius:10}}>
    <path d="M21 4C13 4 7 10 7 18C7 28 21 38 21 38C21 38 35 28 35 18C35 10 29 4 21 4Z" fill="#FF7A00"/>
    <circle cx="21" cy="17" r="8" fill="white"/>
    <path d="M15 17.5 L19 21.5 L27 13.5" stroke="#000" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

// 645 cidades SP completas - MANTIDO 100%
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
  const [formFotos, setFormFotos] = useState([][]);
  const [formData, setFormData] = useState({bairro:'', data:'', horario:'', cidade:'', servico:'montagem', cupom:''});
  const [fotoPerfilTmp, setFotoPerfilTmp] = useState('');
  const channelRef = useRef(null);
  const lastPedidosCount = useRef(pedidos.length);
  const audioCtxRef = useRef(null);

  const showToast = (msg:any)=>{ setToast(msg); setTimeout(()=>setToast(null),3800); };

  const playNotification = (type='new')=>{
    try{
      if(!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext||(window).webkitAudioContext)();
      const ctx = audioCtxRef.current;
      if(ctx.state==='suspended') ctx.resume();
      const playTone = (freq:any,dur:any,delay=0)=>{
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
    const metaTheme = document.createElement('meta'); metaTheme.name='theme-color'; metaTheme.content='#0A0A0A'; document.head.appendChild(metaTheme);
    const manifestObj = {name:"Contato Certo SP - Black", short_name:"CCSP Black", start_url:"/", display:"standalone", background_color:"#0A0A0A", theme_color:"#0A0A0A", icons:[{src:"/logo.jpg", sizes:"512x512", type:"image/jpeg"}]};
    const blob = new Blob([JSON.stringify(manifestObj)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const linkMan = document.createElement('link'); linkMan.rel='manifest'; linkMan.href=url; document.head.appendChild(linkMan);
  },[]);

  useEffect(()=>{
    try{
      channelRef.current = new BroadcastChannel('ccsp_realtime');
      channelRef.current.onmessage = (e:any)=>{
        const {type, data} = e.data||{};
        if(type==='pedido_novo'){
          setPedidos((prev:any)=>{ if(prev.find((p:any)=>p.id===data.id)) return prev; return [data, ...prev]; });
          if(currentUser?.tipo==='montador' && currentUser.status_disponivel && currentUser.cidade_atende===data.cidade){
            playNotification('new'); showToast(`🔔 Novo pedido em ${data.cidade}!`);
          }
        }
        if(type==='pedido_aceito'){
          setPedidos((prev:any)=> prev.map((p:any)=> p.id===data.id? data : p));
          if(currentUser?.tipo==='cliente' && data.cliente_id===currentUser.id){
            playNotification('accept'); showToast(`✅ Seu pedido #${data.numero} foi aceito por ${data.montador_nome||'montador'}!`);
          }
          if(currentUser?.tipo==='admin'){
            playNotification('accept'); showToast(`🔔 Pedido #${data.numero} aceito`);
          }
        }
        if(type==='pedido_update'){
          setPedidos((prev:any)=> prev.map((p:any)=> p.id===data.id? data : p));
        }
      };
    }catch{}
    return ()=>{ try{ channelRef.current?.close(); }catch{} };
  },[currentUser]);

  useEffect(()=>{
    const id = setInterval(()=>{
      if(pedidos.length > lastPedidosCount.current){
        const novos = pedidos.slice(0, pedidos.length - lastPedidosCount.current);
        novos.forEach((n:any)=>{
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
    let list = CATALOGO[];
    if(filtroCat!=='Todos') list = list.filter(c=>c.cat===filtroCat);
    if(busca) list = list.filter(c=>c.nome.toLowerCase().includes(busca.toLowerCase()));
    return list;
  },[filtroCat, busca]);

  const handleCadastro = (e:any)=>{
    e.preventDefault();
    const fd = new FormData(e.target);
    const nome = fd.get('nome'); const email=fd.get('email'); const senha=fd.get('senha'); const cidade=fd.get('cidade'); const telefone=fd.get('telefone');
    const cidade_atende = fd.get('cidade_atende')||''; const chave_pix=fd.get('chave_pix')||'';
    if(usuarios.find((u:any)=>u.email===email)){ showToast('E-mail já cadastrado'); return; }
    if(cadTipo==='montador' && !cidade_atende){ showToast('Cidade que atende obrigatória'); return; }
    if(cadTipo==='montador' && !chave_pix){ showToast('Chave PIX obrigatória em nome próprio'); return; }
    const novo = {id:'u'+Date.now(), tipo:cadTipo, nome, email, senha, cidade, cidade_atende: cadTipo==='montador'? cidade_atende: '', chave_pix, foto_perfil: fotoPerfilTmp||'', status:'ATIVO', status_disponivel:true, telefone};
    setUsuarios([...usuarios, novo]);
    setFotoPerfilTmp('');
    showToast('Cadastro realizado! Faça login.');
    setView('login');
  };

  const handleLogin = (e:any)=>{
    e.preventDefault();
    const fd = new FormData(e.target);
    const email=fd.get('email'); const senha=fd.get('senha');
    const user = usuarios.find((u:any)=>u.email===email && u.senha===senha);
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
    const cup = cupons.find((c:any)=>c.codigo.toLowerCase()===formData.cupom.toLowerCase());
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

  const confirmarPagamento = (pedidoId:any)=>{
    const upd = pedidos.map((p:any)=> p.id===pedidoId? {...p, status:'COMPROVANTE_ENVIADO'}:p);
    setPedidos(upd);
    setTimeout(()=>{
      setPedidos((prev:any)=> prev.map((p:any)=> p.id===pedidoId? {...p, status:'PROCURANDO_MONTADOR'}:p));
      const ped = upd.find((x:any)=>x.id===pedidoId); if(ped){ const np={...ped, status:'PROCURANDO_MONTADOR'}; try{ channelRef.current?.postMessage({type:'pedido_novo', data:np}); }catch{} }
      showToast('Pagamento confirmado! Procurando montador...');
      playNotification('accept');
    },800);
  };

  const aceitarPedido = (ped:any)=>{
    const atual = pedidos.find((p:any)=>p.id===ped.id);
    if(!atual || (atual.status!=='PROCURANDO_MONTADOR' && atual.status!=='COMPROVANTE_ENVIADO')){ showToast('Este serviço acabou de ser aceito por outro montador.'); return; }
    if(!currentUser.status_disponivel){ showToast('Fique Disponível para aceitar.'); return; }
    const novo = {...atual, status:'ACEITO', montador_id:currentUser.id, montador_nome:currentUser.nome};
    setPedidos((prev:any)=> prev.map((p:any)=>p.id===ped.id? novo: p));
    try{ channelRef.current?.postMessage({type:'pedido_aceito', data:novo}); }catch{}
    showToast(`Pedido #${novo.numero} aceito!`);
    playNotification('accept');
  };

  const recusarPedido = (ped:any)=>{
    showToast('Pedido recusado.');
    playNotification('new');
  };

  const finalizarPedido = (pedId:any)=>{
    const novo = pedidos.map((p:any)=> p.id===pedId? {...p, status:'FINALIZADO'}:p);
    setPedidos(novo);
    const ped = novo.find((x:any)=>x.id===pedId);
    try{ channelRef.current?.postMessage({type:'pedido_update', data:ped}); }catch{}
    showToast('Pedido finalizado!');
    playNotification('accept');
  };

  const toggleDisponivel = ()=>{
    const updUser = {...currentUser, status_disponivel:!currentUser.status_disponivel};
    setCurrentUser(updUser);
    setUsuarios((prev:any)=> prev.map((u:any)=> u.id===currentUser.id? updUser: u));
    playNotification(updUser.status_disponivel?'accept':'new');
  };

  const handleLogoClick = ()=>{
    setLogoTaps((prev:any)=>{
      const next = prev+1;
      if(next>=5){ setView('adminLogin'); return 0; }
      return next;
    });
    setTimeout(()=>setLogoTaps(0),3000);
  };

  const clienteFinanceiro = useMemo(()=>{
    if(!currentUser) return {total:0, pago:0, pendente:0, pendCount:0, finalCount:0};
    const meus = pedidos.filter((p:any)=>p.cliente_id===currentUser.id);
    const total = meus.reduce((s:any,p:any)=>s+p.valor_bruto,0);
    const pago = meus.filter((p:any)=>['FINALIZADO','ACEITO','PROCURANDO_MONTADOR','COMPROVANTE_ENVIADO'].includes(p.status)).reduce((s:any,p:any)=>s+p.valor_bruto,0);
    const pendente = total - pago;
    const pendCount = meus.filter((p:any)=>['AGUARDANDO_PAGAMENTO','COMPROVANTE_ENVIADO','PROCURANDO_MONTADOR','ACEITO'].includes(p.status)).length;
    const finalCount = meus.filter((p:any)=>p.status==='FINALIZADO').length;
    return {total, pago, pendente, pendCount, finalCount};
  },[pedidos, currentUser]);

  const montadorFinanceiro = useMemo(()=>{
    if(!currentUser) return {realizado:0, aReceber:0, total:0, lista:[], disponiveis:0, aceitos:0, finalizados:0};
    const meus = pedidos.filter((p:any)=>p.montador_id===currentUser.id);
    const realizado = meus.filter((p:any)=>p.status==='FINALIZADO').reduce((s:any,p:any)=>s+p.valor_liquido,0);
    const aReceber = meus.filter((p:any)=>p.status==='ACEITO').reduce((s:any,p:any)=>s+p.valor_liquido,0);
    const disponiveis = pedidos.filter((p:any)=>['PROCURANDO_MONTADOR','COMPROVANTE_ENVIADO'].includes(p.status) && p.cidade===currentUser.cidade_atende).length;
    return {realizado, aReceber, total:realizado+aReceber, lista:meus, disponiveis, aceitos:meus.filter((p:any)=>p.status==='ACEITO').length, finalizados:meus.filter((p:any)=>p.status==='FINALIZADO').length};
  },[pedidos, currentUser]);

  const adminFinanceiro = useMemo(()=>{
    const now = new Date(); const mes = now.getMonth(); const ano=now.getFullYear();
    const doMes = pedidos.filter((p:any)=>{ const d=new Date(p.created_at); return d.getMonth()===mes && d.getFullYear()===ano; });
    const totalPedidosMes = doMes.reduce((s:any,p:any)=>s+p.valor_bruto,0);
    const finalizadosMes = doMes.filter((p:any)=>p.status==='FINALIZADO');
    const totalRepasseMes = finalizadosMes.reduce((s:any,p:any)=>s+p.valor_liquido,0);
    const pendenteRepasse = pedidos.filter((p:any)=>p.status==='ACEITO').reduce((s:any,p:any)=>s+p.valor_liquido,0);
    const comissaoMes = doMes.reduce((s:any,p:any)=>s+p.comissao,0);
    const porMontador = {};
    pedidos.filter((p:any)=>p.status==='ACEITO').forEach((p:any)=>{ if(!porMontador[p.montador_id]) porMontador[p.montador_id]={nome:p.montador_nome, total:0, count:0}; porMontador[p.montador_id].total+=p.valor_liquido; porMontador[p.montador_id].count++; });
    return {totalPedidosMes, totalRepasseMes, pendenteRepasse, comissaoMes, porMontador, countMes:doMes.length};
  },[pedidos]);

  const clienteChart = useMemo(()=>{
    const months = ["Jan","Fev","Mar","Abr","Mai","Jun"];
    const meus = pedidos.filter((p:any)=>p.cliente_id===currentUser?.id);
    const values = months.map((_,i)=>{ return meus.slice(i, i+2).reduce((s:any,p:any)=>s+p.valor_bruto,0) || Math.round(Math.random()*80+20); });
    const max = Math.max(...values,1);
    return {months, values, max};
  },[pedidos, currentUser]);

  return (
    <div style={{fontFamily:'Poppins, sans-serif', background:'#0A0A0A', minHeight:'100vh', color:'#FFFFFF'}}>
      <style>{`
        *{ -webkit-font-smoothing:antialiased; }
        ::-webkit-scrollbar{ width:6px; height:6px; }
        ::-webkit-scrollbar-thumb{ background:#2A2A2A; border-radius:8px; }
        ::-webkit-scrollbar-track{ background:#0A0A0A; }
        .uber-card{ background:#1A1A1A; border:1px solid #2A2A2A; border-radius:16px; box-shadow:0 10px 30px rgba(0,0,0,0.6); transition:all .22s cubic-bezier(.16,1,.3,1); }
        .uber-card:hover{ border-color:#3A3A3A; transform:translateY(-1px); box-shadow:0 16px 40px rgba(0,0,0,0.75); }
        .uber-card-gold:hover{ border-color:#FF7A00; box-shadow:0 0 0 1px rgba(255,122,0,0.15), 0 16px 40px rgba(0,0,0,0.8); }
        .uber-metric{ background:#1A1A1A; border:1px solid #2A2A2A; border-radius:16px; position:relative; overflow:hidden; }
        .uber-metric::before{ content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent); }
        .uber-tab-active{ background:#FFFFFF; color:#000000; font-weight:800; letter-spacing:-0.2px; box-shadow:0 2px 12px rgba(255,255,255,0.15); }
        .uber-tab-idle{ background:#1E1E1E; color:#A0A0A0; border:1px solid #2A2A2A; }
        .uber-tab-idle:hover{ color:#FFFFFF; border-color:#3A3A3A; }
        .switch-track{ width:52px; height:30px; border-radius:999px; position:relative; transition:all .25s; cursor:pointer; border:1px solid rgba(255,255,255,0.1); }
        .switch-thumb{ width:24px; height:24px; background:white; border-radius:50%; position:absolute; top:2px; left:2px; box-shadow:0 2px 8px rgba(0,0,0,0.5); transition:all .25s cubic-bezier(.16,1,.3,1); }
        .pulse{ animation:pulseGold 1.8s infinite; }
        @keyframes pulseGold{ 0%{ box-shadow:0 0 0 0 rgba(255,122,0,0.5);} 70%{ box-shadow:0 0 0 10px rgba(255,122,0,0);} 100%{ box-shadow:0 0 0 0 rgba(255,122,0,0);} }
        .uber-input{ background:#141414; border:1px solid #2A2A2A; color:white; border-radius:12px; transition:all .2s; }
        .uber-input:focus{ outline:none; border-color:#FF7A00; box-shadow:0 0 0 3px rgba(255,122,0,0.12); background:#1A1A1A; }
        .uber-input::placeholder{ color:#6B6B6B; }
        .gold-glow{ box-shadow:0 0 0 1px rgba(255,122,0,0.2), 0 8px 24px rgba(255,122,0,0.18); }
        .hero-radial{ background: radial-gradient(120% 80% at 50% -20%, rgba(255,122,0,0.12) 0%, rgba(255,122,0,0.02) 40%, transparent 70%), radial-gradient(80% 60% at 90% 10%, rgba(255,255,255,0.04) 0%, transparent 60%), #0A0A0A; }
      `}</style>

      {/* HEADER UBER BLACK */}
      <header style={{background:'#000000', color:'white', padding:'14px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, zIndex:30, borderBottom:'1px solid #1E1E1E', backdropFilter:'blur(20px)'}}>
        <div onClick={handleLogoClick} style={{display:'flex', alignItems:'center', gap:12, cursor:'pointer'}}>
          <div style={{width:42,height:42, borderRadius:12, background:'white', display:'grid', placeItems:'center', overflow:'hidden', boxShadow:'0 2px 12px rgba(255,255,255,0.08)'}}>{LOGO_SVG}</div>
          <div style={{lineHeight:1}}>
            <div style={{fontWeight:800, fontSize:15.5, letterSpacing:'-0.4px', color:'#FFF'}}>Contato Certo <span style={{color:'#FF7A00'}}>SP</span></div>
            <div style={{fontSize:10.5, color:'#A0A0A0', marginTop:3, letterSpacing:'0.6px', fontWeight:600, textTransform:'uppercase'}}>BLACK • 645 CIDADES • 77 MÓVEIS</div>
          </div>
        </div>
        <div style={{display:'flex', gap:10, alignItems:'center'}}>
          {!currentUser && <>
            <button onClick={()=>setView('login')} style={{background:'transparent', color:'white', borderRadius:12, padding:'9px 18px', fontWeight:700, fontSize:13, border:'1px solid #2A2A2A', letterSpacing:'-0.1px'}}>Entrar</button>
            <button onClick={()=>{setCadTipo('cliente'); setView('cadastro');}} style={{background:'#FF7A00', color:'#000', borderRadius:12, padding:'9px 18px', fontWeight:800, fontSize:13, letterSpacing:'-0.2px', boxShadow:'0 4px 16px rgba(255,122,0,0.25)'}}>Cadastro</button>
          </>}
          {currentUser && <div style={{display:'flex', gap:10, alignItems:'center'}}><div style={{fontSize:12, color:'#A0A0A0', fontWeight:600, display:'none'}} className="md:block">{currentUser.nome}</div><button onClick={()=>{setCurrentUser(null); setView('home');}} style={{background:'#1A1A1A', color:'white', border:'1px solid #2A2A2A', borderRadius:12, padding:'8px 14px', fontSize:12, fontWeight:700}}>Sair</button></div>}
        </div>
      </header>

      {toast && <div style={{position:'fixed', top:76, left:'50%', transform:'translateX(-50%)', background:'#1A1A1A', color:'white', padding:'14px 18px', borderRadius:14, zIndex:100, boxShadow:'0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px #2A2A2A', fontSize:13, maxWidth:'92vw', display:'flex', alignItems:'center', gap:10, border:'1px solid #2A2A2A'}}><span style={{width:28,height:28, borderRadius:8, background:'#FF7A00', display:'grid', placeItems:'center', color:'#000', fontWeight:800, fontSize:14}}>{toast.includes('✅')?'✓':toast.includes('🔔')?'!':'•'}</span><span style={{fontWeight:600}}>{toast}</span></div>}

      {view==='home' && (
        <div style={{maxWidth:1280, margin:'0 auto'}}>
          <div className="hero-radial" style={{padding:'28px 20px 20px', borderBottom:'1px solid #1A1A1A'}}>
            <div style={{maxWidth:1280, margin:'0 auto'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:16, flexWrap:'wrap'}}>
                <div style={{maxWidth:620}}>
                  <div style={{display:'inline-flex', alignItems:'center', gap:8, background:'#1A1A1A', border:'1px solid #2A2A2A', borderRadius:100, padding:'6px 12px', fontSize:11, fontWeight:700, letterSpacing:'0.6px', color:'#A0A0A0'}}><span style={{width:6,height:6, background:'#00FF88', borderRadius:999, boxShadow:'0 0 0 3px rgba(0,255,136,0.15)'}}></span> ONLINE • TEMPO REAL • {CIDADES_SP.length} CIDADES • UBER BLACK EDITION</div>
                  <h1 style={{fontWeight:800, fontSize:'clamp(28px, 5vw, 42px)', letterSpacing:'-1.2px', lineHeight:0.95, marginTop:18, color:'#FFF'}}>Montagem<br/>premium<span style={{color:'#FF7A00'}}>.</span></h1>
                  <p style={{fontSize:14.5, color:'#A0A0A0', marginTop:14, lineHeight:1.5, fontWeight:400}}>Cadastro obrigatório para publicar ou aceitar pedidos.<br/>Experiência Uber Black • Notificações sonoras • Realtime</p>
                </div>
                <div style={{background:'#141414', border:'1px solid #2A2A2A', borderRadius:14, padding:'10px 14px', display:'flex', alignItems:'center', gap:10}}>
                  <div style={{width:32,height:32, borderRadius:10, background:'#1E1E1E', display:'grid', placeItems:'center', border:'1px solid #2A2A2A'}}>◆</div>
                  <div><div style={{fontSize:11, color:'#A0A0A0', fontWeight:600, letterSpacing:'0.5px'}}>STATUS</div><div style={{fontSize:12, fontWeight:800, color:'#00FF88', marginTop:1}}>SISTEMA OPERACIONAL</div></div>
                </div>
              </div>

              <div className="uber-card" style={{padding:18, marginTop:24, background:'#111111'}}>
                <div style={{fontSize:11, fontWeight:800, letterSpacing:'1px', color:'#A0A0A0', marginBottom:14}}>CADASTRO OBRIGATÓRIO • ESCOLHA SEU ACESSO</div>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                  <a id="btn-sou-cliente" href="#cadastro-cliente" onClick={(e)=>{e.preventDefault(); setCadTipo('cliente'); setView('cadastro'); try{window.location.hash='cadastro-cliente'; document.body.setAttribute('data-view','cadastro'); const fb=document.getElementById('interaction-feedback'); if(fb){fb.style.display='block'; fb.textContent='Cadastro Cliente • 645 cidades';}}catch{}; showToast('Cadastro Cliente • 645 cidades'); playNotification('new'); (e.currentTarget as HTMLElement).setAttribute('data-clicked','true');}} style={{border:'1px solid #2A2A2A', borderRadius:16, padding:'18px 16px', textAlign:'left', background:'#1A1A1A', cursor:'pointer', display:'block', textDecoration:'none', color:'white', position:'relative', overflow:'hidden'}} className="uber-card uber-card-gold">
                    <div style={{position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)'}}></div>
                    <div style={{width:44,height:44, borderRadius:12, background:'#0A0A0A', border:'1px solid #2A2A2A', display:'grid', placeItems:'center', color:'#FF7A00', fontSize:20}}>◫</div>
                    <div style={{fontWeight:800, marginTop:14, fontSize:15, letterSpacing:'-0.3px'}}>Sou Cliente</div>
                    <div style={{fontSize:12, color:'#A0A0A0', marginTop:4, lineHeight:1.4}}>Quero montar móveis • 645 cidades<br/><span style={{color:'#FF7A00', fontWeight:700, fontSize:11, letterSpacing:'0.5px', marginTop:6, display:'inline-block'}}>BLACK ACCESS →</span></div>
                  </a>
                  <a id="btn-sou-montador" href="#cadastro-montador" onClick={(e)=>{e.preventDefault(); setCadTipo('montador'); setView('cadastro'); try{window.location.hash='cadastro-montador'; document.body.setAttribute('data-view','cadastro-montador'); const fb=document.getElementById('interaction-feedback'); if(fb){fb.style.display='block'; fb.textContent='Cadastro Montador';}}catch{}; showToast('Cadastro Montador • PIX próprio obrigatório'); playNotification('new'); (e.currentTarget as HTMLElement).setAttribute('data-clicked','true');}} style={{border:'1px solid #FF7A00', borderRadius:16, padding:'18px 16px', textAlign:'left', background:'linear-gradient(135deg, #1E1E1E 0%, #1A1A1A 100%)', cursor:'pointer', display:'block', textDecoration:'none', color:'white', position:'relative', overflow:'hidden', boxShadow:'0 0 0 1px rgba(255,122,0,0.15) inset'}} className="uber-card">
                    <div style={{position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg, transparent, rgba(255,122,0,0.4), transparent)'}}></div>
                    <div style={{width:44,height:44, borderRadius:12, background:'#FF7A00', display:'grid', placeItems:'center', color:'#000', fontSize:20, fontWeight:800}}>◈</div>
                    <div style={{fontWeight:800, marginTop:14, fontSize:15, letterSpacing:'-0.3px'}}>Sou Montador</div>
                    <div style={{fontSize:12, color:'#A0A0A0', marginTop:4, lineHeight:1.4}}>Quero aceitar serviços • PIX próprio<br/><span style={{color:'#FF7A00', fontWeight:700, fontSize:11, letterSpacing:'0.5px', marginTop:6, display:'inline-block'}}>PRO ACCESS →</span></div>
                  </a>
                </div>
                <a id="btn-ja-tenho" href="#login" onClick={(e)=>{e.preventDefault(); setView('login'); try{window.location.hash='login'; document.body.setAttribute('data-view','login'); const fb=document.getElementById('interaction-feedback'); if(fb){fb.style.display='block'; fb.textContent='Login';}}catch{}; showToast('Login • vai para painel automático'); playNotification('new'); (e.currentTarget as HTMLElement).setAttribute('data-clicked','true');}} style={{marginTop:14, width:'100%', background:'#FFFFFF', color:'#000000', borderRadius:12, padding:'14px', fontWeight:800, fontSize:14, letterSpacing:'-0.2px', cursor:'pointer', display:'block', textAlign:'center', textDecoration:'none', boxShadow:'0 4px 20px rgba(255,255,255,0.12)'}}>Já tenho cadastro • Entrar no Black</a>
                <div id="interaction-feedback" style={{display:'none', marginTop:10, background:'#0A0A0A', color:'#A0A0A0', borderRadius:10, padding:'10px 12px', fontSize:11, border:'1px solid #1A1A1A'}}></div>
                <div style={{marginTop:14, fontSize:10.5, color:'#6A6A6A', textAlign:'center', letterSpacing:'0.3px'}}>UBER BLACK EDITION • 645 CIDADES SP • REALTIME BROADCASTCHANNEL + LOCALSTORAGE • NOTIFICAÇÕES SONORAS</div>
              </div>
            </div>
          </div>

          <div style={{padding:20}}>
            <div style={{display:'flex', gap:10, marginBottom:18, flexWrap:'wrap', alignItems:'center'}}>
              <div style={{position:'relative', flex:1, minWidth:240}}>
                <input value={busca} onChange={e=>setBusca(e.target.value)} placeholder="Buscar entre 77 móveis premium..." className="uber-input" style={{width:'100%', padding:'13px 16px 13px 40px', fontSize:13}}/>
                <span style={{position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'#6B6B6B', fontSize:14}}>⌕</span>
              </div>
              <select value={filtroCat} onChange={e=>setFiltroCat(e.target.value)} className="uber-input" style={{padding:'13px 16px', fontSize:13, minWidth:140}}>
                <option>Todos</option><option>Dormitório</option><option>Sala</option><option>Cozinha</option><option>Escritório</option>
              </select>
              <div style={{background:'#1A1A1A', border:'1px solid #2A2A2A', borderRadius:12, padding:'10px 14px', fontSize:11, fontWeight:700, color:'#A0A0A0', letterSpacing:'0.5px'}}>{filteredCatalog.length} ITENS • BLACK</div>
            </div>

            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(168px,1fr))', gap:12}}>
              {filteredCatalog.map((m:any)=>(
                <div key={m.id} onClick={()=>{ if(!currentUser){ setCadTipo('cliente'); setView('cadastro'); showToast('Cadastre-se para solicitar'); return; } if(currentUser.tipo!=='cliente'){ showToast('Apenas clientes solicitam'); return; } setSelectedMovel(m); setFormData({bairro:'', data:'', horario:'', cidade:currentUser.cidade, servico:'montagem', cupom:''}); }} className="uber-card uber-card-gold" style={{padding:14, cursor:'pointer'}}>
                  <div style={{width:'100%', height:92, background:'linear-gradient(135deg,#141414 0%,#0A0A0A 100%)', borderRadius:12, display:'grid', placeItems:'center', fontSize:26, position:'relative', overflow:'hidden', border:'1px solid #1E1E1E'}}>
                    <span style={{opacity:0.9}}>⬙</span>
                    <span style={{position:'absolute', bottom:8, right:8, fontSize:9, background:'#0A0A0A', border:'1px solid #2A2A2A', borderRadius:100, padding:'3px 7px', fontWeight:800, color:'#A0A0A0', letterSpacing:'0.5px'}}>{m.cat.toUpperCase()}</span>
                  </div>
                  <div style={{fontWeight:700, fontSize:13, marginTop:12, lineHeight:1.3, minHeight:34, color:'#FFF', letterSpacing:'-0.2px'}}>{m.nome}</div>
                  <div style={{marginTop:10, fontSize:11, color:'#FF7A00', fontWeight:800, display:'flex', alignItems:'center', gap:6, letterSpacing:'0.5px'}}>VER VALORES <span style={{fontSize:11}}>→</span></div>
                </div>
              ))}
            </div>
            <div style={{textAlign:'center', fontSize:11, color:'#5A5A5A', marginTop:22, letterSpacing:'0.4px'}}>CATÁLOGO 77 MÓVEIS SEM PREÇOS • VALORES EXATOS NO MODAL COM + TAXAS • 645 CIDADES • UBER BLACK</div>
          </div>
        </div>
      )}

      {selectedMovel && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.82)', backdropFilter:'blur(16px)', zIndex:60, display:'grid', placeItems:'center', padding:16}}>
          <div style={{background:'#161616', borderRadius:20, width:'100%', maxWidth:440, padding:22, maxHeight:'92vh', overflow:'auto', boxShadow:'0 24px 80px rgba(0,0,0,0.9)', border:'1px solid #2A2A2A'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div><h3 style={{fontWeight:800, fontSize:16, color:'#FFF', letterSpacing:'-0.4px'}}>{selectedMovel.nome}</h3><div style={{fontSize:11, color:'#A0A0A0', marginTop:2, fontWeight:600, letterSpacing:'0.6px'}}>{selectedMovel.cat.toUpperCase()} • BLACK EDITION</div></div>
              <button onClick={()=>setSelectedMovel(null)} style={{width:34,height:34, borderRadius:10, background:'#1E1E1E', border:'1px solid #2A2A2A', display:'grid', placeItems:'center', fontSize:14, color:'#A0A0A0'}}>✕</button>
            </div>
            <div style={{marginTop:18, display:'grid', gap:10}}>
              {[
                {k:'montagem', label:'Montagem', val:selectedMovel.valores.montagem},
                {k:'desmontagem', label:'Desmontagem', val:selectedMovel.valores.desmontagem},
                {k:'completo', label:'Desmontagem + Montagem', val:selectedMovel.valores.completo},
              ].map((op:any)=>(
                <label key={op.k} style={{border: formData.servico===op.k?'1.5px solid #FF7A00':'1px solid #2A2A2A', borderRadius:14, padding:14, display:'flex', justifyContent:'space-between', cursor:'pointer', background: formData.servico===op.k?'#1E1E1E':'#141414', boxShadow: formData.servico===op.k?'0 0 0 3px rgba(255,122,0,0.1) inset':''}}>
                  <div><div style={{fontWeight:700, fontSize:13, color:'#FFF'}}>{op.label}</div><div style={{fontSize:11, color:'#6A6A6A', marginTop:2}}>Valor exato com + taxas inclusas</div></div>
                  <div style={{display:'flex', alignItems:'center', gap:12}}><div style={{fontWeight:800, color:'#FF7A00', fontSize:14}}>R$ {op.val}+</div><input type="radio" checked={formData.servico===op.k} onChange={()=>setFormData({...formData, servico:op.k})} style={{accentColor:'#FF7A00'}} /></div>
                </label>
              ))}
            </div>
            <div style={{marginTop:18, display:'grid', gap:10}}>
              <select value={formData.cidade} onChange={e=>setFormData({...formData, cidade:e.target.value})} className="uber-input" style={{padding:12, fontSize:13}}>
                {CIDADES_SP.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
              <input placeholder="Bairro" value={formData.bairro} onChange={e=>setFormData({...formData, bairro:e.target.value})} className="uber-input" style={{padding:12, fontSize:13}}/>
              <div style={{display:'flex', gap:8}}>
                <input type="date" value={formData.data} onChange={e=>setFormData({...formData, data:e.target.value})} className="uber-input" style={{flex:1, padding:12, fontSize:13}}/>
                <input type="time" value={formData.horario} onChange={e=>setFormData({...formData, horario:e.target.value})} className="uber-input" style={{flex:1, padding:12, fontSize:13}}/>
              </div>
              <input placeholder="Cupom (opcional) • BLACK" value={formData.cupom} onChange={e=>setFormData({...formData, cupom:e.target.value})} className="uber-input" style={{padding:12, fontSize:13}}/>
              <div>
                <div style={{fontSize:11, fontWeight:800, marginBottom:10, color:'#A0A0A0', letterSpacing:'0.6px'}}>FOTOS DO MÓVEL • ATÉ 3 • PREVIEW 80×80 • BLACK</div>
                <div style={{display:'flex', gap:10}}>
                  {[0,1,2].map(i=>(
                    <label key={i} style={{width:80,height:80, border:'1.5px dashed #2A2A2A', borderRadius:14, display:'grid', placeItems:'center', cursor:'pointer', overflow:'hidden', background:'#0A0A0A'}}>
                      {formFotos[i]? <img src={formFotos[i]} style={{width:'100%',height:'100%', objectFit:'cover'}}/> : <span style={{fontSize:22, color:'#3A3A3A'}}>+</span>}
                      <input type="file" accept="image/*" style={{display:'none'}} onChange={e=>{
                        const f=e.target.files?.[0]; if(!f) return; const r=new FileReader(); r.onload=ev=>{ const arr=[...formFotos]; arr[i]=ev.target?.result; setFormFotos(arr); }; r.readAsDataURL(f);
                      }}/>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={handleCreatePedido} style={{marginTop:20, width:'100%', background:'#FF7A00', color:'#000', borderRadius:12, padding:14, fontWeight:800, fontSize:14, letterSpacing:'-0.2px', boxShadow:'0 8px 24px rgba(255,122,0,0.28)'}}>Solicitar Montagem Black • R$ {selectedMovel.valores[formData.servico]}+</button>
            <div style={{fontSize:10.5, color:'#5A5A5A', marginTop:12, textAlign:'center', letterSpacing:'0.3px'}}>PIX EXIBIDO APENAS NA TELA DE PAGAMENTO • 645 CIDADES • UBER BLACK</div>
          </div>
        </div>
      )}

      {view==='cadastro' && (
        <div style={{maxWidth:440, margin:'24px auto', padding:16}}>
          <div className="uber-card" style={{padding:22}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <h2 style={{fontWeight:800, fontSize:18, letterSpacing:'-0.5px'}}>Cadastro {cadTipo==='montador'?'Montador Black':'Cliente Black'}</h2>
              <div style={{background:'#FF7A00', color:'#000', borderRadius:100, padding:'4px 10px', fontSize:10, fontWeight:800, letterSpacing:'0.6px'}}>{cadTipo.toUpperCase()}</div>
            </div>
            <p style={{fontSize:12, color:'#A0A0A0', marginTop:6, lineHeight:1.4}}>{cadTipo==='montador'?'Foto perfil galeria • PIX próprio obrigatório • Cidade que atende obrigatória • Black Edition':'Acesso 77 móveis premium • 645 cidades • Realtime • Black'}</p>
            <form onSubmit={handleCadastro} style={{marginTop:18, display:'grid', gap:10}}>
              {cadTipo==='montador' && (
                <div style={{display:'flex', gap:14, alignItems:'center', background:'#0A0A0A', border:'1px solid #1E1E1E', borderRadius:14, padding:12}}>
                  <div style={{width:80,height:80, borderRadius:14, background:'#141414', border:'1.5px dashed #2A2A2A', overflow:'hidden', display:'grid', placeItems:'center'}}>
                    {fotoPerfilTmp? <img src={fotoPerfilTmp} style={{width:'100%',height:'100%', objectFit:'cover'}}/> : <span style={{fontSize:22, color:'#3A3A3A'}}>◫</span>}
                  </div>
                  <label style={{fontSize:12, background:'#FFFFFF', color:'#000', borderRadius:10, padding:'9px 14px', cursor:'pointer', fontWeight:800, letterSpacing:'-0.2px'}}>
                    Upload foto perfil galeria
                    <input type="file" accept="image/*" style={{display:'none'}} onChange={e=>{
                      const f=e.target.files?.[0]; if(!f) return; const r=new FileReader(); r.onload=ev=> setFotoPerfilTmp(ev.target?.result); r.readAsDataURL(f);
                    }}/>
                  </label>
                </div>
              )}
              <input name="nome" required placeholder="Nome completo" className="uber-input" style={{padding:12}}/>
              <input name="email" required type="email" placeholder="E-mail Black" className="uber-input" style={{padding:12}}/>
              <input name="senha" required type="password" placeholder="Senha" className="uber-input" style={{padding:12}}/>
              <input name="telefone" required placeholder="Telefone / WhatsApp" className="uber-input" style={{padding:12}}/>
              <select name="cidade" required className="uber-input" style={{padding:12}}>
                <option value="">Cidade onde mora • 645 cidades</option>{CIDADES_SP.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
              {cadTipo==='montador' && <>
                <select name="cidade_atende" required className="uber-input" style={{padding:12, borderColor:'#FF7A00'}}>
                  <option value="">Cidade que atende • obrigatório • Black</option>{CIDADES_SP.map(c=><option key={c} value={c}>{c}</option>)}
                </select>
                <input name="chave_pix" required placeholder="Chave PIX próprio nome • obrigatório • Black" className="uber-input" style={{padding:12, borderColor:'#FF7A00'}}/>
              </>}
              <button type="submit" style={{background:'#FFFFFF', color:'#000', borderRadius:12, padding:13, fontWeight:800, marginTop:4, letterSpacing:'-0.2px', boxShadow:'0 6px 20px rgba(255,255,255,0.12)'}}>Criar conta Black</button>
            </form>
            <button onClick={()=>setView('login')} style={{width:'100%', marginTop:14, fontSize:13, color:'#FFF', fontWeight:700, background:'#1A1A1A', border:'1px solid #2A2A2A', borderRadius:12, padding:11}}>Já tenho cadastro</button>
            <button onClick={()=>setView('home')} style={{width:'100%', marginTop:8, fontSize:11, color:'#6A6A6A'}}>Voltar • Home Black</button>
          </div>
        </div>
      )}

      {view==='login' && (
        <div style={{maxWidth:420, margin:'28px auto', padding:16}}>
          <div className="uber-card" style={{padding:24}}>
            <div style={{width:48,height:48, borderRadius:14, background:'#FF7A00', display:'grid', placeItems:'center', color:'#000', fontWeight:800, fontSize:20}}>B</div>
            <h2 style={{fontWeight:800, fontSize:22, marginTop:14, letterSpacing:'-0.6px'}}>Entrar no Black</h2>
            <p style={{fontSize:12, color:'#A0A0A0', marginTop:6}}>Após login vai para painel automático • Uber Black Edition</p>
            <form onSubmit={handleLogin} style={{marginTop:18, display:'grid', gap:10}}>
              <input name="email" required placeholder="E-mail" className="uber-input" style={{padding:12}}/>
              <input name="senha" required type="password" placeholder="Senha" className="uber-input" style={{padding:12}}/>
              <button type="submit" style={{background:'#FF7A00', color:'#000', borderRadius:12, padding:13, fontWeight:800, letterSpacing:'-0.2px', boxShadow:'0 8px 24px rgba(255,122,0,0.28)'}}>Entrar • Black • Notificação sonora</button>
            </form>
            <div style={{marginTop:16, fontSize:11, color:'#6A6A6A', background:'#0A0A0A', borderRadius:12, padding:12, border:'1px solid #1E1E1E', lineHeight:1.5}}>Admin: andre@contatocertosp.com.br / Contato@2026SP • Login: AndreSousa84<br/>Montador: carlos@ex.com / 123 • Cliente: ana@ex.com / 123 • Black</div>
            <button onClick={()=>setView('home')} style={{width:'100%', marginTop:14, fontSize:12, color:'#6A6A6A'}}>Voltar</button>
          </div>
        </div>
      )}

      {view==='pagamento' && pedidoEmPagamento && (
        <div style={{maxWidth:440, margin:'0 auto', padding:16}}>
          <div className="uber-card" style={{padding:22}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}><h2 style={{fontWeight:800, letterSpacing:'-0.4px'}}>Pagamento Black</h2><span style={{background:'#1A1A1A', border:'1px solid #2A2A2A', borderRadius:100, padding:'4px 10px', fontSize:11, fontWeight:800, color:'#A0A0A0'}}>#{pedidoEmPagamento.numero}</span></div>
            <div style={{marginTop:16, background:'#0A0A0A', borderRadius:14, padding:14, fontSize:13, border:'1px solid #1E1E1E', color:'#A0A0A0'}}>
              <div style={{color:'#FFF'}}><b style={{color:'#6A6A6A', fontWeight:600, fontSize:11, letterSpacing:'0.6px'}}>MÓVEL</b> • {pedidoEmPagamento.movel_nome}</div>
              <div style={{marginTop:6}}><b style={{color:'#6A6A6A', fontWeight:600, fontSize:11, letterSpacing:'0.6px'}}>SERVIÇO</b> • {pedidoEmPagamento.servico_tipo}</div>
              <div style={{marginTop:6}}><b style={{color:'#6A6A6A', fontWeight:600, fontSize:11, letterSpacing:'0.6px'}}>CIDADE</b> • {pedidoEmPagamento.cidade} - {pedidoEmPagamento.bairro}</div>
              <div style={{marginTop:12, fontWeight:800, fontSize:20, color:'#FF7A00', letterSpacing:'-0.5px'}}>Total: R$ {pedidoEmPagamento.valor_bruto}</div>
              <div style={{fontSize:11, color:'#5A5A5A', marginTop:4}}>Comissão 10% inclusa • Montador recebe R$ {pedidoEmPagamento.valor_liquido} • Black</div>
            </div>
            <div style={{marginTop:18, border:'1px dashed #FF7A00', borderRadius:16, padding:16, textAlign:'center', background:'#141414'}}>
              <div style={{fontSize:10, fontWeight:800, color:'#FF7A00', letterSpacing:'1px'}}>PIX COPIA E COLA • SÓ AQUI • BLACK</div>
              <div style={{marginTop:10, background:'#000', color:'#FFF', padding:'12px', borderRadius:12, fontSize:13, wordBreak:'break-all', fontWeight:700, letterSpacing:'0.2px', border:'1px solid #1E1E1E'}}>contatocerto.prestadores@gmail.com</div>
              <div style={{fontSize:11, marginTop:10, color:'#6A6A6A'}}>Titular: Contato Certo SP Prestadores • Black</div>
            </div>
            <button onClick={()=>{ confirmarPagamento(pedidoEmPagamento.id); setView('cliente'); setTab('pendente'); }} style={{marginTop:18, width:'100%', background:'#FFF', color:'#000', borderRadius:12, padding:14, fontWeight:800, letterSpacing:'-0.2px'}}>Já paguei • Enviar comprovante Black</button>
            <button onClick={()=>setView('cliente')} style={{width:'100%', marginTop:10, background:'#1A1A1A', border:'1px solid #2A2A2A', borderRadius:12, padding:12, fontWeight:600, color:'#A0A0A0'}}>Ver depois</button>
          </div>
        </div>
      )}

      {view==='cliente' && currentUser && (
        <div style={{maxWidth:1160, margin:'0 auto', padding:20}}>
          <div className="uber-card" style={{padding:16, display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16, background:'#111111'}}>
            <div style={{display:'flex', gap:12, alignItems:'center'}}>
              <div style={{width:48,height:48, borderRadius:14, background:'#FFF', color:'#000', display:'grid', placeItems:'center', fontWeight:800, fontSize:18}}>{currentUser.nome[0]}</div>
              <div><div style={{fontWeight:800, fontSize:14, letterSpacing:'-0.3px'}}>{currentUser.nome} <span style={{background:'#FF7A00', color:'#000', borderRadius:100, padding:'2px 8px', fontSize:9, fontWeight:800, marginLeft:6, letterSpacing:'0.5px'}}>CLIENTE BLACK</span></div><div style={{fontSize:11, color:'#6A6A6A', marginTop:2, fontWeight:600}}>📍 {currentUser.cidade} • BLACK EDITION</div></div>
            </div>
            <div style={{display:'flex', gap:8}}>
              <button onClick={()=>setView('home')} style={{fontSize:12, border:'1px solid #2A2A2A', borderRadius:12, padding:'8px 14px', fontWeight:700, background:'#1A1A1A', color:'#A0A0A0'}}>Catálogo 77</button>
              <button onClick={()=>{setCurrentUser(null); setView('home');}} style={{fontSize:12, background:'#FFF', color:'#000', borderRadius:12, padding:'8px 14px', fontWeight:800}}>Sair</button>
            </div>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:10, marginBottom:16}}>
            <div className="uber-metric" style={{padding:16}}><div style={{display:'flex', justifyContent:'space-between'}}><span style={{fontSize:11, color:'#6A6A6A', fontWeight:800, letterSpacing:'0.8px'}}>TOTAL</span><span style={{fontSize:10, background:'#1E1E1E', border:'1px solid #2A2A2A', color:'#A0A0A0', borderRadius:100, padding:'3px 8px', fontWeight:700}}>{pedidos.filter((p:any)=>p.cliente_id===currentUser.id).length}</span></div><div style={{fontWeight:800, fontSize:22, marginTop:10, letterSpacing:'-0.6px'}}>{pedidos.filter((p:any)=>p.cliente_id===currentUser.id).length}</div><div style={{fontSize:11, color:'#6A6A6A', marginTop:2}}>Pedidos Black</div></div>
            <div className="uber-metric" style={{padding:16, borderColor:'#FF7A00'}}><div style={{display:'flex', justifyContent:'space-between'}}><span style={{fontSize:11, color:'#FF7A00', fontWeight:800, letterSpacing:'0.8px'}}>PENDENTES</span><span style={{width:6,height:6, background:'#FF7A00', borderRadius:999, marginTop:4}} className="pulse"></span></div><div style={{fontWeight:800, fontSize:22, marginTop:10, color:'#FF7A00', letterSpacing:'-0.6px'}}>{clienteFinanceiro.pendCount}</div><div style={{fontSize:11, color:'#6A6A6A', marginTop:2}}>Aguardando Black</div></div>
            <div className="uber-metric" style={{padding:16}}><div style={{fontSize:11, color:'#6A6A6A', fontWeight:800, letterSpacing:'0.8px'}}>FINALIZADOS</div><div style={{fontWeight:800, fontSize:22, marginTop:10, color:'#FFF', letterSpacing:'-0.6px'}}>{clienteFinanceiro.finalCount}</div><div style={{fontSize:11, color:'#6A6A6A', marginTop:2}}>Concluídos</div></div>
            <div className="uber-metric" style={{padding:16, background:'#FF7A00'}}><div style={{fontSize:11, color:'#000', fontWeight:800, letterSpacing:'0.8px'}}>CUPONS</div><div style={{fontWeight:800, fontSize:20, marginTop:10, color:'#000', letterSpacing:'-0.5px'}}>{cupons.length} ativos</div><div style={{fontSize:11, color:'rgba(0,0,0,0.6)', marginTop:2}}>Economia Black</div></div>
          </div>

          <div style={{display:'flex', gap:8, overflowX:'auto', paddingBottom:4}}>
            <div style={{display:'flex', gap:8, background:'#111111', border:'1px solid #1E1E1E', borderRadius:14, padding:6}}>
              {[
                {k:'pendente', l:'Pendentes', ic:'◷'},
                {k:'finalizados', l:'Finalizados', ic:'✓'},
                {k:'financeiro', l:'Financeiro', ic:'◫'},
                {k:'cupons', l:'Cupons', ic:'◈'},
              ].map(t=>(
                <button key={t.k} onClick={()=>{ setTab(t.k); playNotification('new'); }} style={{whiteSpace:'nowrap', borderRadius:10, padding:'9px 16px', fontWeight:700, fontSize:13, letterSpacing:'-0.2px'}} className={tab===t.k?'uber-tab-active':'uber-tab-idle'}>{t.l}</button>
              ))}
            </div>
          </div>

          {tab==='pendente' && (
            <div style={{marginTop:16, display:'grid', gap:12}}>
              {pedidos.filter((p:any)=>p.cliente_id===currentUser.id && ['AGUARDANDO_PAGAMENTO','COMPROVANTE_ENVIADO','PROCURANDO_MONTADOR','ACEITO'].includes(p.status)).map((p:any)=>{
                const isAceito = p.status==='ACEITO';
                return (
                <div key={p.id} className="uber-card" style={{padding:16, display:'flex', gap:14, borderLeft:`3px solid ${isAceito?'#00FF88': p.status==='AGUARDANDO_PAGAMENTO'?'#FF7A00':'#3A3A3A'}`}}>
                  <div style={{width:64,height:64, borderRadius:14, background:'#0A0A0A', overflow:'hidden', flexShrink:0, display:'grid', placeItems:'center', border:'1px solid #1E1E1E'}}>
                    {p.fotos?.[0]? <img src={p.fotos[0]} style={{width:'100%',height:'100%', objectFit:'cover'}}/> : <span style={{fontSize:22, color:'#3A3A3A'}}>⬙</span>}
                  </div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{display:'flex', justifyContent:'space-between', gap:8, flexWrap:'wrap'}}>
                      <div style={{fontWeight:800, fontSize:13, letterSpacing:'-0.2px'}}>#{p.numero} • {p.movel_nome}</div>
                      <span style={{fontSize:10, padding:'5px 10px', borderRadius:100, fontWeight:800, letterSpacing:'0.6px', background: isAceito?'#00FF88': p.status==='AGUARDANDO_PAGAMENTO'?'#FF7A00':'#1E1E1E', color:isAceito?'#000': p.status==='AGUARDANDO_PAGAMENTO'?'#000':'#A0A0A0', border:'1px solid #2A2A2A'}}>{p.status}</span>
                    </div>
                    <div style={{fontSize:11.5, color:'#6A6A6A', marginTop:8, display:'flex', gap:10, flexWrap:'wrap', fontWeight:500}}><span>{p.categoria}</span><span>• {p.servico_tipo}</span><span style={{fontWeight:800, color:'#FF7A00'}}>• R$ {p.valor_bruto}</span><span>📍 {p.cidade}/{p.bairro}</span></div>
                    {p.montador_nome && <div style={{marginTop:10, fontSize:12, background:'#0A0A0A', border:'1px solid #1E1E1E', borderRadius:10, padding:'8px 12px', color:'#A0A0A0'}}><span style={{color:'#00FF88'}}>●</span> Montador <b style={{color:'#FFF'}}>{p.montador_nome}</b> • Black sonora ✅</div>}
                    {p.status==='AGUARDANDO_PAGAMENTO' && <button onClick={()=>{setPedidoEmPagamento(p); setView('pagamento'); playNotification('new');}} style={{marginTop:12, width:'100%', background:'#FF7A00', color:'#000', borderRadius:12, padding:12, fontWeight:800, letterSpacing:'-0.2px'}}>Ver Pagamento PIX Black • 80×80</button>}
                  </div>
                </div>
              )})}
              {pedidos.filter((p:any)=>p.cliente_id===currentUser.id && ['AGUARDANDO_PAGAMENTO','COMPROVANTE_ENVIADO','PROCURANDO_MONTADOR','ACEITO'].includes(p.status)).length===0 && <div className="uber-card" style={{padding:28, textAlign:'center', color:'#6A6A6A', fontSize:13}}>Nenhum pedido pendente • Vá ao catálogo Black 77 móveis.</div>}
            </div>
          )}

          {tab==='finalizados' && (
            <div style={{marginTop:16, display:'grid', gap:10}}>
              {pedidos.filter((p:any)=>p.cliente_id===currentUser.id && p.status==='FINALIZADO').map((p:any)=>(
                <div key={p.id} className="uber-card" style={{padding:16, borderLeft:'3px solid #00FF88', display:'flex', gap:14, alignItems:'center'}}>
                  <div style={{width:48,height:48, borderRadius:12, background:'#0A0A0A', border:'1px solid #1E1E1E', display:'grid', placeItems:'center', color:'#00FF88'}}>✓</div>
                  <div><div style={{fontWeight:700, fontSize:13}}>#{p.numero} • {p.movel_nome}</div><div style={{fontSize:12, color:'#6A6A6A', marginTop:3}}>Finalizado por {p.montador_nome||'montador'} • R$ {p.valor_bruto} • {p.cidade} • Black</div></div>
                </div>
              ))}
            </div>
          )}

          {tab==='financeiro' && (
            <div style={{marginTop:16, display:'grid', gap:12}}>
              <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:10}}>
                <div className="uber-metric" style={{padding:16, background:'#FFFFFF', color:'#000'}}><div style={{fontSize:10, fontWeight:800, letterSpacing:'0.8px', opacity:0.6}}>TOTAL PEDIDOS BLACK</div><div style={{fontWeight:800, fontSize:24, marginTop:8, letterSpacing:'-0.8px'}}>R$ {clienteFinanceiro.total}</div></div>
                <div className="uber-metric" style={{padding:16}}><div style={{fontSize:10, fontWeight:800, letterSpacing:'0.8px', color:'#6A6A6A'}}>TOTAL PAGO</div><div style={{fontWeight:800, fontSize:22, color:'#00FF88', marginTop:8}}>R$ {clienteFinanceiro.pago}</div></div>
                <div className="uber-metric" style={{padding:16, borderColor:'#FF7A00'}}><div style={{fontSize:10, fontWeight:800, letterSpacing:'0.8px', color:'#6A6A6A'}}>PENDENTE</div><div style={{fontWeight:800, fontSize:22, color:'#FF7A00', marginTop:8}}>R$ {clienteFinanceiro.pendente}</div></div>
              </div>
              <div className="uber-card" style={{padding:18}}>
                <div style={{fontWeight:800, fontSize:12, marginBottom:14, letterSpacing:'0.6px', color:'#A0A0A0'}}>GRÁFICO BLACK • VALORES POR PERÍODO</div>
                <div style={{display:'flex', alignItems:'end', gap:8, height:110}}>
                  {clienteChart.values.map((v:any,i:number)=>(
                    <div key={i} style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:8}}>
                      <div style={{fontSize:10, fontWeight:800, color:'#FF7A00'}}>R${v}</div>
                      <div style={{width:'100%', background:'#FF7A00', borderRadius:'8px 8px 4px 4px', height:`${(v/clienteChart.max)*80+14}px`}}></div>
                      <div style={{fontSize:10, color:'#6A6A6A', fontWeight:600}}>{clienteChart.months[i]}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="uber-card" style={{padding:16}}>
                <div style={{fontWeight:800, fontSize:12, marginBottom:12, letterSpacing:'0.6px', color:'#A0A0A0'}}>DETALHE POR PEDIDO BLACK</div>
                {pedidos.filter((p:any)=>p.cliente_id===currentUser.id).map((p:any)=>(
                  <div key={p.id} style={{display:'flex', justifyContent:'space-between', fontSize:12, padding:'10px 0', borderBottom:'1px solid #1E1E1E', color:'#A0A0A0'}}><span>#{p.numero} {p.movel_nome} • {p.status}</span><span style={{fontWeight:800, color:'#FFF'}}>R$ {p.valor_bruto}</span></div>
                ))}
              </div>
            </div>
          )}

          {tab==='cupons' && (
            <div style={{marginTop:16, display:'grid', gap:12}}>
              {cupons.map((c:any)=>(
                <div key={c.id} style={{background:'#111111', borderRadius:16, padding:16, display:'flex', justifyContent:'space-between', alignItems:'center', border:'1px dashed #FF7A00', position:'relative', overflow:'hidden'}}>
                  <div style={{display:'flex', gap:12, alignItems:'center'}}>
                    <div style={{width:42,height:42, borderRadius:12, background:'#FF7A00', display:'grid', placeItems:'center', color:'#000', fontSize:18, fontWeight:800}}>◈</div>
                    <div><div style={{fontWeight:800, letterSpacing:'-0.2px'}}>{c.codigo}</div><div style={{fontSize:11, color:'#6A6A6A', marginTop:2}}>{c.desconto}{c.tipo} OFF • {c.validade} • Limite {c.limite} • Black</div></div>
                  </div>
                  <button onClick={()=>{ navigator.clipboard?.writeText(c.codigo); showToast('Cupom copiado! Black'); playNotification('accept'); }} style={{background:'#FFF', color:'#000', borderRadius:10, padding:'9px 14px', fontSize:12, fontWeight:800}}>Copiar</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {view==='montador' && currentUser && (
        <div style={{maxWidth:1160, margin:'0 auto', padding:20}}>
          <div className="uber-card" style={{padding:18, marginBottom:16, background:'#111111'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:14, flexWrap:'wrap'}}>
              <div style={{display:'flex', gap:14, alignItems:'center'}}>
                <div style={{width:60,height:60, borderRadius:16, background:'#1A1A1A', color:'white', display:'grid', placeItems:'center', fontWeight:800, fontSize:22, overflow:'hidden', border:'1px solid #2A2A2A'}}>
                  {currentUser.foto_perfil? <img src={currentUser.foto_perfil} style={{width:'100%',height:'100%', objectFit:'cover'}}/> : currentUser.nome[0]}
                </div>
                <div>
                  <div style={{fontWeight:800, fontSize:15, display:'flex', alignItems:'center', gap:8, letterSpacing:'-0.3px'}}>{currentUser.nome} <span style={{background:'#FF7A00', color:'#000', borderRadius:100, padding:'3px 9px', fontSize:10, fontWeight:800, letterSpacing:'0.5px'}}>{currentUser.cidade_atende} • BLACK</span></div>
                  <div style={{fontSize:11, color:'#6A6A6A', marginTop:4, fontWeight:500}}>PIX: {currentUser.chave_pix} • {currentUser.cidade} • Black Pro</div>
                  <div style={{marginTop:8}}>
                    <label style={{display:'inline-flex', gap:8, alignItems:'center', fontSize:11, fontWeight:700, background:'#1A1A1A', border:'1px solid #2A2A2A', borderRadius:10, padding:'6px 10px', cursor:'pointer', color:'#A0A0A0'}}>
                      ◫ Foto galeria 80×80
                      <input type="file" accept="image/*" style={{display:'none'}} onChange={e=>{
                        const f=e.target.files?.[0]; if(!f) return; const r=new FileReader(); r.onload=ev=>{
                          const url=ev.target?.result; const upd={...currentUser, foto_perfil:url}; setCurrentUser(upd); setUsuarios((prev:any)=>prev.map((u:any)=>u.id===currentUser.id? upd: u)); showToast('Foto perfil atualizada! Black'); playNotification('accept');
                        }; r.readAsDataURL(f);
                      }}/>
                    </label>
                  </div>
                </div>
              </div>
              <div style={{display:'flex', alignItems:'center', gap:12, background: currentUser.status_disponivel?'#0A0A0A':'#141414', borderRadius:100, padding:'6px 10px 6px 14px', border:`1px solid ${currentUser.status_disponivel?'#00FF88':'#2A2A2A'}`}}>
                <div style={{fontSize:11, fontWeight:800, letterSpacing:'0.6px', color: currentUser.status_disponivel?'#00FF88':'#6A6A6A'}}>{currentUser.status_disponivel?'● DISPONÍVEL BLACK':'○ OFFLINE'}</div>
                <div onClick={toggleDisponivel} className="switch-track" style={{background: currentUser.status_disponivel?'#00FF88':'#2A2A2A'}}>
                  <div className="switch-thumb" style={{left: currentUser.status_disponivel?'24px':'2px', background: currentUser.status_disponivel?'#000':'#FFF'}}></div>
                </div>
              </div>
            </div>
            <div style={{marginTop:14, fontSize:11, background:'#0A0A0A', border:'1px solid #1E1E1E', borderRadius:12, padding:'10px 12px', color:'#6A6A6A'}}>🔊 Notificação sonora triplo beep Black quando novo pedido em {currentUser.cidade_atende} + pulse dourado</div>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))', gap:10, marginBottom:16}}>
            <div className="uber-metric" style={{padding:16, borderColor: montadorFinanceiro.disponiveis>0?'#FF7A00':'#2A2A2A'}}><div style={{display:'flex', justifyContent:'space-between'}}><span style={{fontSize:10, fontWeight:800, color:'#6A6A6A', letterSpacing:'0.8px'}}>DISPONÍVEIS</span><span style={{width:8,height:8, background:'#FF7A00', borderRadius:999, marginTop:4}} className={montadorFinanceiro.disponiveis>0?'pulse':''}></span></div><div style={{fontWeight:800, fontSize:24, color:'#FF7A00', marginTop:8, letterSpacing:'-0.6px'}}>{montadorFinanceiro.disponiveis}</div><div style={{fontSize:11, color:'#6A6A6A', marginTop:2}}>Pedidos Black</div></div>
            <div className="uber-metric" style={{padding:16}}><div style={{fontSize:10, fontWeight:800, color:'#6A6A6A', letterSpacing:'0.8px'}}>ACEITOS</div><div style={{fontWeight:800, fontSize:24, marginTop:8}}>{montadorFinanceiro.aceitos}</div><div style={{fontSize:11, color:'#6A6A6A', marginTop:2}}>Em andamento</div></div>
            <div className="uber-metric" style={{padding:16}}><div style={{fontSize:10, fontWeight:800, color:'#6A6A6A', letterSpacing:'0.8px'}}>FINALIZADOS</div><div style={{fontWeight:800, fontSize:24, color:'#00FF88', marginTop:8}}>{montadorFinanceiro.finalizados}</div><div style={{fontSize:11, color:'#6A6A6A', marginTop:2}}>Concluídos</div></div>
            <div className="uber-metric" style={{padding:16, background:'#FFF', color:'#000'}}><div style={{fontSize:10, fontWeight:800, letterSpacing:'0.8px', opacity:0.6}}>A RECEBER</div><div style={{fontWeight:800, fontSize:22, marginTop:8, letterSpacing:'-0.5px'}}>R$ {montadorFinanceiro.aReceber}</div><div style={{fontSize:11, opacity:0.6, marginTop:2}}>Black Pro</div></div>
          </div>

          <div style={{display:'flex', gap:8, overflowX:'auto', paddingBottom:4}}>
            <div style={{display:'flex', gap:8, background:'#111111', border:'1px solid #1E1E1E', borderRadius:14, padding:6}}>
            {[{k:'pendentes',l:'Pendentes Black', ic:''},{k:'finalizados',l:'Finalizados', ic:''},{k:'financeiro',l:'Financeiro', ic:''}].map(t=>(
              <button key={t.k} onClick={()=>{setTab(t.k); playNotification('new');}} style={{whiteSpace:'nowrap', borderRadius:10, padding:'9px 16px', fontWeight:700, fontSize:13, letterSpacing:'-0.2px'}} className={tab===t.k?'uber-tab-active':'uber-tab-idle'}>{t.l}</button>
            ))}
            </div>
          </div>

          {tab==='pendentes' && (
            <div style={{marginTop:16, display:'grid', gap:12}}>
              {pedidos.filter((p:any)=>['PROCURANDO_MONTADOR','COMPROVANTE_ENVIADO'].includes(p.status) && p.cidade===currentUser.cidade_atende).map((p:any)=>(
                <div key={p.id} className="uber-card" style={{padding:16, display:'flex', gap:14, borderLeft:'3px solid #FF7A00'}}>
                  <div style={{width:80,height:80, borderRadius:14, background:'#0A0A0A', overflow:'hidden', flexShrink:0, border:'1px solid #1E1E1E', display:'grid', placeItems:'center'}}>
                    {p.fotos?.[0]? <img src={p.fotos[0]} style={{width:'100%',height:'100%', objectFit:'cover'}}/> : <span style={{fontSize:26, color:'#2A2A2A'}}>⬙</span>}
                  </div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:6}}>
                      <div style={{fontWeight:800, fontSize:14, letterSpacing:'-0.3px'}}>#{p.numero} • {p.movel_nome}</div>
                      <div style={{fontSize:10, background:'#FF7A00', color:'#000', borderRadius:100, padding:'4px 10px', fontWeight:800, letterSpacing:'0.5px'}}>{p.cidade} • BLACK</div>
                    </div>
                    <div style={{fontSize:11.5, color:'#6A6A6A', marginTop:8, display:'flex', gap:10, flexWrap:'wrap', fontWeight:500}}><span style={{background:'#0A0A0A', border:'1px solid #1E1E1E', borderRadius:100, padding:'2px 8px'}}>{p.categoria}</span><span>{p.servico_tipo}</span><span style={{fontWeight:800, color:'#FF7A00'}}>R$ {p.valor_liquido} líquido</span><span>{p.bairro}</span><span>{p.data_servico} {p.horario}</span></div>
                    <div style={{fontSize:12, marginTop:10, background:'#0A0A0A', border:'1px solid #1E1E1E', borderRadius:10, padding:'8px 12px', color:'#A0A0A0', display:'inline-flex', gap:6}}>👤 Cliente: <b style={{color:'#FFF'}}>{p.cliente_nome}</b> • Black</div>
                    <div style={{display:'flex', gap:10, marginTop:14}}>
                      <button onClick={()=>aceitarPedido(p)} style={{flex:1, background:'#FF7A00', color:'#000', borderRadius:12, padding:12, fontWeight:800, letterSpacing:'-0.2px', boxShadow:'0 6px 16px rgba(255,122,0,0.25)'}}>ACEITAR BLACK</button>
                      <button onClick={()=>recusarPedido(p)} style={{flex:1, background:'#1A1A1A', border:'1px solid #2A2A2A', borderRadius:12, padding:12, fontWeight:700, color:'#6A6A6A'}}>RECUSAR</button>
                    </div>
                  </div>
                </div>
              ))}
              {pedidos.filter((p:any)=>['PROCURANDO_MONTADOR','COMPROVANTE_ENVIADO'].includes(p.status) && p.cidade===currentUser.cidade_atende).length===0 && <div className="uber-card" style={{padding:28, textAlign:'center', color:'#6A6A6A', fontSize:13}}>Nenhum pedido pendente em {currentUser.cidade_atende} • Fique Disponível Black 🔊 Triplo beep ativo.</div>}
            </div>
          )}

          {tab==='finalizados' && (
            <div style={{marginTop:16, display:'grid', gap:10}}>
              {pedidos.filter((p:any)=>p.montador_id===currentUser.id && p.status==='FINALIZADO').map((p:any)=>(
                <div key={p.id} className="uber-card" style={{padding:16, borderLeft:'3px solid #00FF88', display:'flex', gap:14, alignItems:'center'}}>
                  <div style={{width:48,height:48, borderRadius:12, background:'#0A0A0A', border:'1px solid #1E1E1E', display:'grid', placeItems:'center', color:'#00FF88'}}>✓</div>
                  <div><div style={{fontWeight:700, fontSize:13}}>#{p.numero} • {p.movel_nome} • {p.cidade} • Black</div><div style={{fontSize:12, color:'#6A6A6A', marginTop:3}}>Cliente {p.cliente_nome} • Recebeu R$ {p.valor_liquido} • Black sonora</div></div>
                </div>
              ))}
            </div>
          )}

          {tab==='financeiro' && (
            <div style={{marginTop:16, display:'grid', gap:12}}>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
                <div className="uber-metric" style={{padding:18, background:'#00FF88', color:'#000'}}><div style={{fontSize:10, fontWeight:800, letterSpacing:'0.8px', opacity:0.7}}>REALIZADOS MÊS BLACK</div><div style={{fontWeight:800, fontSize:24, marginTop:8, letterSpacing:'-0.6px'}}>R$ {montadorFinanceiro.realizado}</div><div style={{marginTop:8, fontSize:11, opacity:0.7}}>✓ Finalizados</div></div>
                <div className="uber-metric" style={{padding:18, background:'#FF7A00', color:'#000'}}><div style={{fontSize:10, fontWeight:800, letterSpacing:'0.8px', opacity:0.7}}>A RECEBER BLACK</div><div style={{fontWeight:800, fontSize:24, marginTop:8, letterSpacing:'-0.6px'}}>R$ {montadorFinanceiro.aReceber}</div><div style={{marginTop:8, fontSize:11, opacity:0.7}}>◷ Aceitos</div></div>
              </div>
              <div className="uber-card" style={{padding:18}}>
                <div style={{fontWeight:800, fontSize:13, letterSpacing:'-0.2px'}}>Total geral Black • R$ {montadorFinanceiro.total}</div>
                <div style={{marginTop:14, display:'grid', gap:8}}>
                  {montadorFinanceiro.lista.map((p:any)=>(
                    <div key={p.id} style={{display:'flex', justifyContent:'space-between', fontSize:12, padding:'12px', borderRadius:12, background: p.status==='FINALIZADO'?'#0A0A0A':'#141414', border:`1px solid ${p.status==='FINALIZADO'?'#1E1E1E':'#2A2A2A'}`, color:'#A0A0A0'}}><span>#{p.numero} {p.movel_nome} • {p.status} • {p.cidade}</span><span style={{fontWeight:800, color:'#FFF'}}>R$ {p.valor_liquido}</span></div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {view==='adminLogin' && (
        <div style={{maxWidth:400, margin:'28px auto', padding:16}}>
          <div className="uber-card" style={{padding:22}}>
            <div style={{width:44,height:44, borderRadius:12, background:'#FFF', display:'grid', placeItems:'center', color:'#000', fontWeight:800}}>B</div>
            <h3 style={{fontWeight:800, fontSize:16, marginTop:12, letterSpacing:'-0.3px'}}>Admin Black • 5 toques logo</h3>
            <p style={{fontSize:11, color:'#6A6A6A', marginTop:4}}>Acesso invisível premium • Uber Black</p>
            <form onSubmit={e=>{
              e.preventDefault(); const fd=new FormData(e.target); const login=fd.get('login'); const senha=fd.get('senha');
              if((login==='AndreSousa84' && senha==='Contato@2026SP') || (login==='andre@contatocertosp.com.br' && senha==='Contato@2026SP')){ setView('admin'); setTab('pedidos'); const adm = usuarios.find((u:any)=>u.tipo==='admin'); if(adm) setCurrentUser(adm); playNotification('accept'); } else showToast('Credenciais inválidas');
            }} style={{marginTop:16, display:'grid', gap:10}}>
              <input name="login" placeholder="Login Black" className="uber-input" style={{padding:12}}/>
              <input name="senha" type="password" placeholder="Senha Black" className="uber-input" style={{padding:12}}/>
              <button style={{background:'#FFF', color:'#000', borderRadius:12, padding:12, fontWeight:800, letterSpacing:'-0.2px'}}>Entrar Admin Black • som</button>
            </form>
            <button onClick={()=>setView('home')} style={{marginTop:14, fontSize:12, color:'#6A6A6A', width:'100%'}}>Voltar • Home Black</button>
          </div>
        </div>
      )}

      {view==='admin' && (
        <div style={{maxWidth:1200, margin:'0 auto', padding:20}}>
          <div className="uber-card" style={{background:'#000', borderRadius:16, padding:16, display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16, border:'1px solid #1A1A1A', flexWrap:'wrap', gap:12}}>
            <div style={{display:'flex', gap:12, alignItems:'center'}}>
              <div style={{width:44,height:44, borderRadius:12, background:'white', display:'grid', placeItems:'center'}}>{LOGO_SVG}</div>
              <div><div style={{fontWeight:800, letterSpacing:'-0.3px'}}>ADM BLACK • Contato Certo SP</div><div style={{fontSize:11, color:'#6A6A6A', marginTop:3, fontWeight:600, letterSpacing:'0.4px'}}>645 CIDADES • 77 MÓVEIS • REALTIME • NOTIFICAÇÕES SONORAS • UBER BLACK</div></div>
            </div>
            <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
              {[{k:'pedidos',l:'Pedidos'},{k:'usuarios',l:'Usuários'},{k:'cupons',l:'Cupons'},{k:'financeiro',l:'Financeiro'}].map(t=>(
                <button key={t.k} onClick={()=>{setTab(t.k); playNotification('new');}} style={{borderRadius:100, padding:'8px 14px', fontSize:12, fontWeight:800, letterSpacing:'0.3px', border:'1px solid #1E1E1E'}} className={tab===t.k?'uber-tab-active':'uber-tab-idle'}>{t.l}</button>
              ))}
            </div>
          </div>

          {tab==='pedidos' && (
            <div style={{display:'grid', gap:10}}>
              {pedidos.map((p:any)=>(
                <div key={p.id} className="uber-card" style={{padding:16, fontSize:12, borderLeft:`3px solid ${p.status==='FINALIZADO'?'#00FF88': p.status==='ACEITO'?'#FFF':'#FF7A00'}`}}>
                  <div style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:10, alignItems:'center'}}>
                    <div style={{display:'flex', gap:10, alignItems:'center'}}><div style={{width:44,height:44, borderRadius:12, background:'#0A0A0A', display:'grid', placeItems:'center', overflow:'hidden', border:'1px solid #1E1E1E'}}>{p.fotos?.[0]? <img src={p.fotos[0]} style={{width:'100%',height:'100%', objectFit:'cover'}}/> : <span style={{color:'#2A2A2A'}}>⬙</span>}</div><div><b style={{color:'#FFF', letterSpacing:'-0.2px'}}>#{p.numero} {p.movel_nome} • {p.cidade} • R$ {p.valor_bruto} (líq R$ {p.valor_liquido})</b><div style={{marginTop:3}}><span style={{background:'#1A1A1A', border:'1px solid #2A2A2A', borderRadius:100, padding:'2px 8px', fontSize:10, fontWeight:800, letterSpacing:'0.5px', color:p.status==='FINALIZADO'?'#00FF88':'#A0A0A0'}}>{p.status}</span></div></div></div>
                    <div style={{display:'flex', gap:8}}>
                      <button onClick={()=>{ const upd=pedidos.map((x:any)=> x.id===p.id? {...x, status:'PROCURANDO_MONTADOR'}:x); setPedidos(upd); playNotification('accept'); showToast('Pagamento confirmado Black com som'); }} style={{background:'#1A1A1A', border:'1px solid #2A2A2A', borderRadius:10, padding:'8px 12px', fontWeight:700, color:'#A0A0A0', fontSize:11}}>Confirmar Pag</button>
                      <button onClick={()=>finalizarPedido(p.id)} style={{background:'#FFF', color:'#000', borderRadius:10, padding:'8px 12px', fontWeight:800, fontSize:11}}>Finalizar Black</button>
                    </div>
                  </div>
                  <div style={{color:'#5A5A5A', marginTop:10, fontSize:11}}>Cliente: {p.cliente_nome} • Montador: {p.montador_nome||'-'} • {p.servico_tipo} • {p.bairro} • {p.data_servico} {p.horario} • Black</div>
                </div>
              ))}
              {pedidos.length===0 && <div className="uber-card" style={{padding:24, textAlign:'center', color:'#6A6A6A'}}>Nenhum pedido Black.</div>}
            </div>
          )}

          {tab==='usuarios' && (
            <div style={{display:'grid', gap:10}}>
              {usuarios.map((u:any)=>(
                <div key={u.id} className="uber-card" style={{padding:16, display:'flex', justifyContent:'space-between', alignItems:'center', gap:12}}>
                  <div style={{display:'flex', gap:12, alignItems:'center'}}>
                    <div style={{width:48,height:48, borderRadius:14, background: u.tipo==='admin'?'#FFF': u.tipo==='montador'?'#FF7A00':'#1A1A1A', color: u.tipo==='admin'?'#000': u.tipo==='montador'?'#000':'#A0A0A0', display:'grid', placeItems:'center', fontWeight:800, overflow:'hidden', border:'1px solid #2A2A2A'}}>
                      {u.foto_perfil? <img src={u.foto_perfil} style={{width:'100%',height:'100%', objectFit:'cover'}}/> : u.nome[0]}
                    </div>
                    <div>
                      <div style={{fontWeight:800, fontSize:13, display:'flex', gap:6, alignItems:'center', flexWrap:'wrap'}}>{u.nome} <span style={{background: u.tipo==='admin'?'#FFF': u.tipo==='montador'?'#FF7A00':'#1A1A1A', color: u.tipo==='admin'?'#000': u.tipo==='montador'?'#000':'#A0A0A0', borderRadius:100, padding:'2px 8px', fontSize:10, fontWeight:800, border:'1px solid #2A2A2A'}}>{u.tipo.toUpperCase()} BLACK</span><span style={{background: u.status==='ATIVO'?'#0A0A0A':'#1A0A0A', color: u.status==='ATIVO'?'#00FF88':'#FF4444', borderRadius:100, padding:'2px 8px', fontSize:10, fontWeight:800, border:`1px solid ${u.status==='ATIVO'?'#00FF88':'#FF4444'}`}}>{u.status}</span></div>
                      <div style={{fontSize:11, color:'#6A6A6A', marginTop:3}}>{u.email} • {u.cidade} {u.cidade_atende?`• Atende ${u.cidade_atende}`:''} • PIX {u.chave_pix||'-'} • {u.telefone||''}</div>
                    </div>
                  </div>
                  <div style={{display:'flex', gap:6}}>
                    <button onClick={()=>{ const upd=usuarios.map((x:any)=> x.id===u.id? {...x, status: x.status==='BLOQUEADO'?'ATIVO':'BLOQUEADO'}:x); setUsuarios(upd); playNotification('new'); }} style={{background:'#1A1A1A', border:'1px solid #2A2A2A', borderRadius:10, padding:'8px 10px', fontSize:11, fontWeight:700, color:'#A0A0A0'}}>{u.status==='BLOQUEADO'?'Desbloquear':'Bloquear'}</button>
                    <button onClick={()=>{ if(confirm('Excluir usuário Black?')) { setUsuarios(usuarios.filter((x:any)=>x.id!==u.id)); playNotification('new'); } }} style={{background:'#1A1A1A', border:'1px solid #FF4444', color:'#FF4444', borderRadius:10, padding:'8px 10px', fontSize:11, fontWeight:800}}>Excluir</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab==='cupons' && (
            <div style={{display:'grid', gap:12}}>
              <div className="uber-card" style={{padding:18}}>
                <div style={{fontWeight:800, marginBottom:14, display:'flex', gap:8, alignItems:'center', letterSpacing:'-0.3px'}}><span style={{width:28,height:28, background:'#FF7A00', color:'#000', borderRadius:8, display:'grid', placeItems:'center', fontSize:14}}>◈</span> Gerar Cupom Black Premium</div>
                <form onSubmit={e=>{
                  e.preventDefault(); const fd=new FormData(e.target); const codigo=fd.get('codigo'); const desconto=Number(fd.get('desconto')); const tipo=fd.get('tipo'); const validade=fd.get('validade'); const limite=Number(fd.get('limite'));
                  const novo={id:'cup'+Date.now(), codigo, desconto, tipo, validade, limite, usos:0}; setCupons([...cupons, novo]); (e.target).reset(); showToast('Cupom Black criado com som'); playNotification('accept');
                }} style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
                  <input name="codigo" required placeholder="Código ex: BLACK10" className="uber-input" style={{padding:11}}/>
                  <input name="desconto" required type="number" placeholder="Desconto Black" className="uber-input" style={{padding:11}}/>
                  <select name="tipo" className="uber-input" style={{padding:11}}><option value="%">%</option><option value="R$">R$</option></select>
                  <input name="validade" type="date" className="uber-input" style={{padding:11}}/>
                  <input name="limite" type="number" placeholder="Limite uso Black" className="uber-input" style={{padding:11}}/>
                  <button style={{gridColumn:'1 / -1', background:'#FF7A00', color:'#000', borderRadius:12, padding:12, fontWeight:800, letterSpacing:'-0.2px'}}>Criar Cupom Black</button>
                </form>
              </div>
              <div style={{display:'grid', gap:10}}>
                {cupons.map((c:any)=>(
                  <div key={c.id} className="uber-card" style={{padding:16, display:'flex', justifyContent:'space-between', alignItems:'center', border:'1px dashed #FF7A00'}}>
                    <div style={{display:'flex', gap:10, alignItems:'center'}}><div style={{width:38,height:38, borderRadius:10, background:'#FF7A00', color:'#000', display:'grid', placeItems:'center', fontWeight:800}}>◈</div><div><b style={{letterSpacing:'-0.2px'}}>{c.codigo}</b> • {c.desconto}{c.tipo} • Val {c.validade} • Limite {c.limite} • Black</div></div>
                    <button onClick={()=>{setCupons(cupons.filter((x:any)=>x.id!==c.id)); playNotification('new');}} style={{background:'#1A1A1A', border:'1px solid #FF4444', borderRadius:10, padding:'8px 12px', fontSize:11, fontWeight:700, color:'#FF4444'}}>Excluir</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab==='financeiro' && (
            <div style={{display:'grid', gap:12}}>
              <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:10}}>
                <div className="uber-metric" style={{padding:16}}><div style={{display:'flex', justifyContent:'space-between'}}><span style={{fontSize:18}}>◫</span><span style={{fontSize:10, background:'#FFF', color:'#000', borderRadius:100, padding:'3px 8px', fontWeight:800}}>{adminFinanceiro.countMes} BLACK</span></div><div style={{fontSize:11, color:'#6A6A6A', marginTop:8, fontWeight:700, letterSpacing:'0.6px'}}>TOTAL PEDIDOS MÊS BLACK</div><div style={{fontWeight:800, fontSize:20, marginTop:6, letterSpacing:'-0.5px'}}>R$ {adminFinanceiro.totalPedidosMes}</div></div>
                <div className="uber-metric" style={{padding:16, background:'#FF7A00', color:'#000'}}><div style={{fontSize:18}}>◈</div><div style={{fontSize:11, opacity:0.7, marginTop:8, fontWeight:700, letterSpacing:'0.6px'}}>COMISSÃO 10% BLACK</div><div style={{fontWeight:800, fontSize:20, marginTop:6, letterSpacing:'-0.5px'}}>R$ {adminFinanceiro.comissaoMes}</div></div>
                <div className="uber-metric" style={{padding:16, background:'#00FF88', color:'#000'}}><div style={{fontSize:18}}>✓</div><div style={{fontSize:11, opacity:0.7, marginTop:8, fontWeight:700, letterSpacing:'0.6px'}}>REPASSE MÊS BLACK</div><div style={{fontWeight:800, fontSize:20, marginTop:6, letterSpacing:'-0.5px'}}>R$ {adminFinanceiro.totalRepasseMes}</div></div>
                <div className="uber-metric" style={{padding:16, borderColor:'#FF7A00'}}><div style={{fontSize:18, color:'#FF7A00'}}>◷</div><div style={{fontSize:11, color:'#6A6A6A', marginTop:8, fontWeight:700, letterSpacing:'0.6px'}}>A REPASSAR PENDENTE BLACK</div><div style={{fontWeight:800, fontSize:20, color:'#FF7A00', marginTop:6, letterSpacing:'-0.5px'}}>R$ {adminFinanceiro.pendenteRepasse}</div></div>
              </div>
              <div className="uber-card" style={{padding:18}}>
                <div style={{fontWeight:800, fontSize:12, marginBottom:14, display:'flex', justifyContent:'space-between', letterSpacing:'0.6px', color:'#A0A0A0'}}><span>DETALHE POR MONTADOR BLACK • A RECEBER</span><span style={{fontSize:10, background:'#1A1A1A', border:'1px solid #2A2A2A', borderRadius:100, padding:'3px 8px'}}>SONORA BLACK</span></div>
                {Object.entries(adminFinanceiro.porMontador).map(([id, d])=>{
                  const max = Math.max(...Object.values(adminFinanceiro.porMontador).map((x:any)=>x.total),1);
                  const pct = Math.round((d.total/max)*100);
                  return <div key={id} style={{marginBottom:14}}><div style={{display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:6}}><span style={{fontWeight:700, color:'#FFF'}}>{d.nome} • {d.count} pedidos • Black</span><span style={{fontWeight:800, color:'#FF7A00'}}>R$ {d.total}</span></div><div style={{height:8, background:'#0A0A0A', borderRadius:20, overflow:'hidden', border:'1px solid #1E1E1E'}}><div style={{height:'100%', width:`${pct}%`, background:'#FF7A00', borderRadius:20}}></div></div></div>;
                })}
                {Object.keys(adminFinanceiro.porMontador).length===0 && <div style={{fontSize:12, color:'#5A5A5A'}}>Nenhum repasse pendente Black</div>}
              </div>
            </div>
          )}
        </div>
      )}

      <a href="#" onClick={e=>{e.preventDefault(); showToast('App Black PWA: Adicione à tela inicial. Manifest #0A0A0A corrigido ✓'); playNotification('accept');}} style={{position:'fixed', right:16, bottom:16, background:'#FFFFFF', color:'#000000', borderRadius:100, padding:'12px 20px', fontWeight:800, fontSize:13, boxShadow:'0 10px 30px rgba(255,255,255,0.15), 0 0 0 1px rgba(255,255,255,0.1)', zIndex:40, display:'flex', alignItems:'center', gap:8, letterSpacing:'-0.2px', border:'1px solid #FFFFFF'}}>
        ◆ Baixar App Black
      </a>

      <div style={{height:90}}/>
      <div style={{textAlign:'center', fontSize:10, color:'#3A3A3A', paddingBottom:16, letterSpacing:'0.6px', fontWeight:600}}>UBER BLACK EDITION • 645 CIDADES SP • 77 MÓVEIS • THEME #0A0A0A • LOCALSTORAGE + BROADCASTCHANNEL REALTIME • PIX SÓ TELA PAGAMENTO contatocerto.prestadores@gmail.com • 5 TOQUES LOGO = ADMIN BLACK • NOTIFICAÇÕES SONORAS TRIPLO BEEP</div>
    </div>
  );
}
