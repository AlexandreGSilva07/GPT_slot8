(()=>{
'use strict';
const M=[
  'Trabalho, renda e economia','Saúde, educação e proteção','Segurança, justiça e democracia',
  'Território, ambiente e desenvolvimento','Direitos, igualdade e Brasil no mundo'
];
const S={cb:'clariana-barao',ec:'edmilson-costa',ac:'augusto-cury',fb:'flavio-bolsonaro',hd:'hertz-dias',la:'leonardo-avalanche',lu:'lula',rs:'renan-santos',rc:'ronaldo-caiado',rp:'rui-costa-pimenta',sa:'samara',wg:'wilson-grassi',ze:'zema'};
const option=(label,records)=>({label,positions:Object.entries(records).map(([code,pages])=>({candidate:S[code],pages,evidence:`O plano registra: ${label.toLocaleLowerCase('pt-BR')}.`}))});
const question=(id,macro,mode,prompt,options)=>({id,macro,theme:macro,mode,prompt,
  context:mode==='rank'?'Ordene da maior para a menor prioridade.':mode==='multi'?'Marque no máximo duas alternativas.':'Escolha uma alternativa.',
  options:options.map((item,index)=>({id:`${id}-${index}`,detail:'',...item}))
});
const questions=[
question('economia',M[0],'single','Qual mudança nos impostos deve vir primeiro?',[
  option('Taxar mais lucros, grandes rendas e patrimônios',{ec:[4,14],hd:[27],lu:[11],rp:[6],sa:[16,17]}),
  option('Reduzir impostos sobre produção, consumo ou empresas',{ac:[37,38],fb:[30,71,72],ze:[19]}),
  option('Adotar um imposto único nacional de 3,5%',{la:[4,5,6]}),
  option('Trocar tributos federais por imposto sobre movimentações, mantendo IR progressivo',{wg:[8,9,10]})
]),
question('trabalho',M[0],'rank','Ordene as prioridades para trabalho e emprego.',[
  option('Reduzir a jornada e acabar com a escala 6x1',{ec:[2,5,14],hd:[7,8],lu:[73,74,75,76,77],rp:[2,3],sa:[7,9,10]}),
  option('Ampliar contratos negociados e flexíveis',{fb:[44,45],ze:[23,24]}),
  option('Reduzir encargos e o custo de contratar',{fb:[43,44],wg:[8,13,14,19,20],ze:[23,24]}),
  option('Financiar primeiro emprego e qualificação',{ac:[95,96,121,122],fb:[43,44],la:[42,44],rc:[15],wg:[20]})
]),
question('empresas',M[0],'single','O que fazer com empresas e ativos estratégicos do Estado?',[
  option('Privatizar ou retomar um programa amplo de desestatização',{fb:[69,70],ze:[15]}),
  option('Manter controle público e ampliar concessões ou PPPs',{cb:[5],lu:[53],rc:[46,47],wg:[46]}),
  option('Reestatizar empresas e ampliar o controle público',{ec:[4,5,10],hd:[6,26],rp:[3,6],sa:[58,59,60]})
]),
question('modelo-saude',M[1],'single','Qual modelo deve liderar a redução das filas do SUS?',[
  option('Expandir uma rede integralmente pública e estatal',{ec:[2,6,10],hd:[11,26],rp:[5],sa:[19,20]}),
  option('Usar capacidade privada e parcerias para atender pacientes',{fb:[37,38],la:[9,10],ze:[60]}),
  option('Manter o SUS universal e priorizar atenção, regulação e gestão pública',{cb:[11,12],ac:[44,161,164],lu:[34,35,36,37,38,39,40],rs:[25,26],rc:[77,78],wg:[34,35]})
]),
question('prioridades-saude',M[1],'multi','Quais devem ser as duas prioridades do SUS?',[
  option('Atenção primária, prevenção e vacinação',{cb:[11],ac:[44,161],fb:[37,38],lu:[34,35,36,37,38,39,40],rc:[78,88],wg:[34,35],ze:[57,58]}),
  option('Saúde mental e rede de CAPS',{ac:[44,45,163],fb:[38,39],hd:[11],la:[43],lu:[18,19,20,21,22,23,24,25,26],rc:[84],ze:[59]}),
  option('Produção nacional ou pública de remédios e insumos',{ec:[6,10],hd:[11],lu:[34,35,36,37,38,39,40],sa:[20],wg:[34]}),
  option('Fila transparente, prontuário e atendimento digital',{cb:[11,12],ac:[44,161,164],fb:[25,26],rs:[25,26],rc:[77,89],wg:[34],ze:[57,58]}),
  option('Especialistas e prevenção de câncer',{ac:[166],fb:[37,38],lu:[34,35,36,37,38,39,40],rc:[80]})
]),
question('educacao',M[1],'rank','Ordene as prioridades para a educação.',[
  option('Expandir a educação pública e reduzir repasses ao setor privado',{ec:[2,7,10],hd:[11,12],rp:[5],sa:[21,22]}),
  option('Garantir alfabetização e recompor a aprendizagem',{cb:[7],ac:[43,68],fb:[34,35],lu:[30,31,32,33,34],rs:[30,31,32],rc:[32],wg:[36],ze:[51,52]}),
  option('Valorizar professores e ampliar ensino técnico',{cb:[7,8],ac:[43,68,75],fb:[34,35,36,37],hd:[12],la:[44],lu:[30,31,32,33,34],rc:[33],wg:[36],ze:[51,52]}),
  option('Ampliar escolha familiar, ensino domiciliar ou escolas cívico-militares',{fb:[21,34,35,36],la:[16,42],rs:[31,32],ze:[53]})
]),
question('faccoes',M[2],'multi','Quais duas ações devem liderar o combate às facções?',[
  option('Rastrear dinheiro, bloquear bens e atacar lavagem',{cb:[9],ac:[45,46,189],hd:[19],lu:[26,27,28,29,30],rc:[17],wg:[21]}),
  option('Integrar inteligência, fronteiras e bases de dados',{cb:[9],ac:[46,190],fb:[13,14,15],la:[13],rc:[17,18],wg:[22,50]}),
  option('Endurecer penas e isolar lideranças em presídios',{fb:[13,14,15,16],la:[13,14],rs:[11,12,13],rc:[17,18,20],wg:[21,23],ze:[5,6]}),
  option('Retomar territórios com serviços públicos e prevenção',{ec:[12,13],lu:[28,29,30]})
]),
question('modelo-seguranca',M[2],'single','Qual mudança estrutural deve orientar a segurança pública?',[
  option('Desmilitarizar e unificar as polícias sob estrutura civil',{ec:[6,12],hd:[19],rp:[5],sa:[48]}),
  option('Fortalecer presídios de segurança máxima e endurecer o sistema penal',{fb:[14,15,16],la:[13,14],rs:[11,12,13],rc:[17,18,20],wg:[21,23],ze:[5,6]}),
  option('Priorizar prevenção, ressocialização e policiamento baseado em dados',{cb:[9,10],ac:[45,46,47],lu:[28,29,30]})
]),
question('governanca',M[2],'multi','Quais duas reformas melhoram o controle do Estado pelo cidadão?',[
  option('Transparência de emendas, compras e decisões públicas',{cb:[13],ac:[38,52],fb:[68,69,70,71,72,73],lu:[15,16,17,18],rc:[9,11,13,20],ze:[10]}),
  option('Serviços públicos digitais e bases integradas',{cb:[13],ac:[38,40],fb:[25,26],rc:[6,27],wg:[7,20]}),
  option('Combate a supersalários, privilégios e excesso de cargos',{rs:[9,10],rc:[12,13],rp:[3],sa:[13],ze:[8,15]}),
  option('Reforma do Judiciário ou do sistema político',{ac:[60,63,64],ec:[3,4,13],rp:[6],ze:[11]}),
  option('Conselhos populares e participação direta no orçamento',{ec:[3,4],lu:[83,84],sa:[37]})
]),
question('campo',M[3],'rank','Ordene as prioridades para o campo.',[
  option('Tecnologia, produtividade e infraestrutura para o agronegócio',{ac:[115,126],fb:[28,53,54,55,56],la:[24,25],rc:[22],wg:[46,47],ze:[43,44]}),
  option('Crédito, cooperativas e agregação de valor',{ac:[48,126,131],la:[24,25],lu:[58,59,60,61,62,63],rc:[22]}),
  option('Agricultura familiar, agroecologia e soberania alimentar',{ec:[6,9],hd:[16],lu:[58,59,60,61,62,63],sa:[43,44,45]}),
  option('Reforma agrária e redistribuição de terras',{ec:[2,6,9],hd:[15,17],lu:[58,59,60,61,62,63],rp:[4],sa:[43,44,45]})
]),
question('ambiente',M[3],'multi','Quais dois instrumentos ambientais devem vir primeiro?',[
  option('Licenciamento mais rápido, previsível e com prazo',{rs:[41,42],rc:[47,50],wg:[47,48],ze:[47]}),
  option('Fiscalização contra desmatamento, garimpo e incêndios',{ec:[8,9,11],fb:[57,58,59],la:[28],lu:[69,70,71,72,73],rc:[51],sa:[35,62,63],wg:[47,48]}),
  option('Mercado de carbono, bioeconomia e investimento verde',{ac:[51,175],fb:[57,58,59],lu:[50,51,52,69,70,71,72,73],rc:[51],ze:[48]}),
  option('Controle público mais rígido sobre atividades de alto impacto',{ec:[8,9,11],hd:[14,17],sa:[35,62,63]})
]),
question('infraestrutura',M[3],'multi','Quais duas infraestruturas devem receber prioridade?',[
  option('Saneamento e água tratada',{fb:[47,48,57,58,59],la:[45,46],lu:[53,54,55,56],wg:[46],ze:[26,27,28,29,30,31]}),
  option('Ferrovias, hidrovias e corredores logísticos',{cb:[5],ac:[41,42,120],la:[26,27],lu:[53,54,55,56],rc:[46,47],wg:[46]}),
  option('Energia limpa e transição energética',{ac:[51,175],fb:[62,63],lu:[63,64,65,66,67,68,69],rc:[35,37],ze:[32,33,34,35]}),
  option('Conectividade e infraestrutura digital',{cb:[5],fb:[24],rc:[26]}),
  option('Habitação e regularização fundiária urbana',{fb:[20,47,48],lu:[53,54,55,56],rp:[4],sa:[30],wg:[41,42]})
]),
question('direitos',M[4],'multi','Quais duas proteções devem receber prioridade federal?',[
  option('Prevenção da violência contra mulheres e rede de acolhimento',{cb:[3,4],ac:[53,54,86],fb:[14,17,18,19],hd:[21],la:[36,37],lu:[18,19,20,21,22,23,24,25,26,29],rc:[19],sa:[31,32,33],ze:[66]}),
  option('Creches e primeira infância',{cb:[3,7],fb:[21],la:[34,35],lu:[6,7,8,9,10,11,12,13,14,18,19,20,21,22,23,24,25,26,30,31,32,33,34],rc:[32],sa:[28],ze:[50]}),
  option('Acessibilidade e inclusão de pessoas com deficiência',{ec:[12],fb:[38,39,40,41],hd:[24],lu:[18,19,20,21,22,23,24,25,26],ze:[53,61]}),
  option('Combate ao racismo e à LGBTfobia',{ec:[2,6,11],hd:[19,21,23],lu:[18,19,20,21,22,23,24,25,26],rc:[67],sa:[31,32,33]}),
  option('Autonomia econômica e inserção produtiva',{cb:[3],fb:[19,20,42,43,46],la:[7],rc:[61,63]})
]),
question('politica-externa',M[4],'single','Qual direção deve orientar a política externa?',[
  option('Pragmatismo, multilateralismo e relações sem alinhamento automático',{rs:[44,45,46],rc:[73,74],wg:[51,52]}),
  option('Fortalecer BRICS, Mercosul e integração do Sul Global',{lu:[77,78,79,80,81,82]}),
  option('Aproximar-se da OCDE e das democracias de mercado',{fb:[62,63,64],ze:[37,38]}),
  option('Adotar política anti-imperialista e romper acordos de submissão',{ec:[2,8,15,16],hd:[3,4],rp:[7],sa:[4,5,64,65]})
]),
question('missao-global',M[4],'multi','Quais duas missões internacionais devem ser prioritárias?',[
  option('Abrir mercados, exportar mais e atrair investimentos',{ac:[59,140,146],fb:[62,63,64],la:[6,19,20,30,31],rc:[74],rs:[44,45,46],ze:[37,38]}),
  option('Liderar diplomacia climática e proteção da biodiversidade',{ac:[59],lu:[69,70,71,72,73,77,78,79,80,81,82],rc:[51]}),
  option('Fortalecer a integração latino-americana',{ec:[8,15],lu:[77,78,79,80,81,82],sa:[65]}),
  option('Proteger soberania, defesa e setores estratégicos',{ac:[60,178],fb:[61,62,63],hd:[3,4],la:[28,29],rc:[74],rs:[34,35,36,37,38,39,40,44,45,46]}),
  option('Combater fome e pobreza no plano internacional',{ac:[157],lu:[58,59,60,61,62,63,77,78,79,80,81,82]})
])
];
window.QUIZ_V4={macros:M,questions};
})();
