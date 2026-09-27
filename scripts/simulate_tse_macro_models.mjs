import fs from 'node:fs';
import vm from 'node:vm';

const sandbox={window:{}};
vm.runInNewContext(fs.readFileSync('src/data/quiz-data.js','utf8'),sandbox);
const {candidates}=sandbox.window.QUIZ_DATA;
const MACROS=[
 'Economia, Trabalho e Responsabilidade Fiscal','Saúde Pública e Assistência',
 'Segurança Pública e Justiça','Educação, Ciência e Meio Ambiente',
 'Política Externa e Inserção Global','Direitos Humanos, Equidade e Inclusão Social',
 'Questão Agrária, Propriedade e Direito à Cidade','Governança, Transparência e Reformas de Estado'
];
const STOP=new Set('a ao aos as o os de da das do dos e em para por com sem sobre entre como que uma um no na nos nas mais menos nacional federal brasil brasileira brasileiro política programa sistema plano direito direitos público pública públicos públicas'.split(' '));
const AXES=[
 ['estado-mercado',/privatiza|desestatiza|concessão|parceria público-privada|ppp/i,1,/reestatiza|estatiza|controle público|empresa pública|monopólio estatal/i,-1],
 ['tributação',/desonera|redução d[ae] (carga|imposto)|imposto único|simplificação tributária/i,1,/grandes fortunas|tributação progressiva|taxação de (lucros|dividendos|ricos)|imposto progressivo/i,-1],
 ['fiscal',/equilíbrio fiscal|superávit|responsabilidade fiscal|controle de gastos|redução da dívida/i,1,/revogação do teto|expansão do gasto|investimento público maciço/i,-1],
 ['trabalho',/flexibilização|negociado sobre o legislado|redução de encargos|contrato flexível/i,1,/redução da jornada|fim da escala 6x1|revogação da reforma trabalhista|direitos trabalhistas/i,-1],
 ['saúde',/parceria.*privad|rede privada|voucher.*saúde/i,1,/sus|saúde pública|rede estatal|atendimento universal/i,-1],
 ['segurança',/endurecimento|aumento de pena|segurança máxima|tolerância zero|isolamento.*presídio/i,1,/desmilitarização|ressocialização|prevenção.*violência|policiamento comunitário/i,-1],
 ['armas',/armamento|porte de arma|posse de arma/i,1,/desarmamento|controle de armas/i,-1],
 ['educação',/voucher|ensino domiciliar|homeschool|escola cívico-militar/i,1,/educação pública|escola pública|ensino público|universidade pública/i,-1],
 ['ambiente',/flexibilização.*licenciamento|licenciamento.*simplifica|mineração.*terra indígena/i,1,/desmatamento zero|combate ao desmatamento|proteção.*biodiversidade|transição ecológica/i,-1],
 ['alinhamento-global',/ocde|otan|democracias de mercado|acordo.*estados unidos/i,1,/brics|sul global|anti-imperial|mercosul|integração latino-americana/i,-1],
 ['direitos',/valores tradicionais|família tradicional|ideologia de gênero/i,1,/lgbt|racismo|igualdade racial|direitos das mulheres|equidade/i,-1],
 ['terra',/titulação|propriedade privada|segurança jurídica.*campo/i,1,/reforma agrária|redistribuição de terras|desapropriação|agroecologia/i,-1],
 ['governança',/redução do estado|redução de ministérios|corte de cargos|desburocratização/i,1,/conselhos populares|participação popular|orçamento participativo/i,-1],
 ['justiça',/limite.*supremo|reforma do judiciário|mandato.*ministro/i,1,/autonomia.*judiciário|fortalecimento.*instituições/i,-1]
];
const normalize=text=>text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const tokens=text=>normalize(text).match(/[a-z0-9]+/g)?.filter(word=>word.length>3&&!STOP.has(word)).map(word=>word.slice(0,7))||[];
const parseIndex=slug=>{
 const lines=fs.readFileSync(`data/tse-indexes/${slug}.txt`,'utf8').split('\n');
 const cells=Array.from({length:8},(_,index)=>({macro:MACROS[index],topics:[],stances:{}}));
 let current=-1;
 for(const line of lines){
  const heading=line.match(/^\d+: ([1-8])\. (.+)$/);if(heading){current=Number(heading[1])-1;continue}
  const topic=line.match(/^\d+: \* (.+?): páginas? (.+)$/);
  if(current>=0&&topic){
   const pages=[...topic[2].matchAll(/\d+/g)].map(match=>Number(match[0]));
   cells[current].topics.push({title:topic[1],pages});
  }
 }
 for(const cell of cells){
  const text=cell.topics.map(topic=>topic.title).join(' ');
  for(const [axis,pos,posValue,neg,negValue] of AXES){
   const p=pos.test(text),n=neg.test(text);
   if(p!==n)cell.stances[axis]=p?posValue:negValue;
  }
 }
 return cells;
};
const signatures=candidates.map(candidate=>({candidate,macros:parseIndex(candidate.slug)}));
const docs=[];for(const signature of signatures)for(const cell of signature.macros)for(const topic of cell.topics)docs.push(tokens(topic.title));
const df=new Map();for(const doc of docs)for(const token of new Set(doc))df.set(token,(df.get(token)||0)+1);
const vector=(cell)=>{
 const values=new Map();
 for(const topic of cell.topics)for(const token of tokens(topic.title))values.set(token,(values.get(token)||0)+Math.log((docs.length+1)/((df.get(token)||0)+1)));
 return values;
};
for(const signature of signatures)for(const cell of signature.macros)cell.vector=vector(cell);
const cosine=(a,b)=>{
 let dot=0,aa=0,bb=0;for(const value of a.values())aa+=value*value;for(const value of b.values())bb+=value*value;
 for(const [key,value] of a)dot+=value*(b.get(key)||0);
 return aa&&bb?dot/Math.sqrt(aa*bb):0;
};
const cellSimilarity=(a,b)=>{
 if(!a.topics.length||!b.topics.length)return 0;
 const axes=new Set([...Object.keys(a.stances),...Object.keys(b.stances)]);
 let same=0;
 for(const axis of axes)if(a.stances[axis]&&b.stances[axis]&&a.stances[axis]===b.stances[axis])same++;
 const lexical=cosine(a.vector,b.vector);
 const stanceScore=axes.size?same/axes.size:0;
 return Math.max(0,Math.min(1,axes.size?.45*lexical+.55*stanceScore:lexical));
};
const macroSimilarity=Array.from({length:8},(_,macro)=>Array.from({length:13},(_,a)=>Array.from({length:13},(_,b)=>a===b?1:cellSimilarity(signatures[a].macros[macro],signatures[b].macros[macro]))));
const overall=Array.from({length:13},(_,a)=>Array.from({length:13},(_,b)=>{
 const covered=signatures[a].macros.map((cell,index)=>cell.topics.length?index:-1).filter(index=>index>=0);
 return a===b?1:covered.reduce((sum,macro)=>sum+macroSimilarity[macro][a][b],0)/(covered.length||1);
}));

let seed=0x8ac2026;const random=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/2**32};
const TYPES={single:['single'],mixed:['single','single','multi','rank'],varied:['single','multi','rank']};
const counts=[5,10,15,16,20],options=[2,3,4,5],trials=4000;
const results=[];const pairCount=78;
for(const count of counts)for(const [mix,typePool] of Object.entries(TYPES))for(const optionCount of options){
 let meanSum=0,worstSum=0,universal=0;const worstValues=[];
 for(let trial=0;trial<trials;trial++){
 const sums=new Float64Array(pairCount);let pair;
  const macroSums=Array.from({length:8},()=>new Float64Array(pairCount));
  const macroCounts=new Uint8Array(8);
  for(let q=0;q<count;q++){
   const macro=q%8,type=typePool[Math.floor(random()*typePool.length)];macroCounts[macro]++;pair=0;
   for(let a=0;a<13;a++)for(let b=a+1;b<13;b++){
    let base=macroSimilarity[macro][a][b];
    base=Math.pow(base,1+(optionCount-2)*.13);
    const typeFactor=type==='single'?.92:type==='multi'?1.04:.96;
    const noise=(random()-.5)*(type==='single'?.28:type==='multi'?.18:.12)/Math.sqrt(optionCount);
    macroSums[macro][pair++]+=Math.max(0,Math.min(1,base*typeFactor+noise));
   }
  }
  for(let macro=0;macro<8;macro++)if(macroCounts[macro])for(let index=0;index<pairCount;index++)sums[index]+=macroSums[macro][index]/macroCounts[macro];
  let total=0,worst=0;const covered=Math.min(8,count);for(const value of sums){const score=value/covered;total+=score;if(score>worst)worst=score}
  meanSum+=total/pairCount;worstSum+=worst;worstValues.push(worst);if(worst>=.999999)universal++;
 }
 worstValues.sort((a,b)=>a-b);
 results.push({questionCount:count,typeMix:mix,optionCount,trials,macroCoverage:Math.min(8,count),meanCross:meanSum/trials,worstMean:worstSum/trials,worstP95:worstValues[Math.floor(trials*.95)],universalRate:universal/trials,valid:count>=8});
}
const valid=results.filter(result=>result.valid).sort((a,b)=>a.worstP95-b.worstP95||a.meanCross-b.meanCross);
const clean=signatures.map(signature=>({candidate:{slug:signature.candidate.slug,name:signature.candidate.name,party:signature.candidate.party},macros:signature.macros.map(cell=>({macro:cell.macro,topics:cell.topics,stances:cell.stances}))}));
fs.writeFileSync('data/tse-macro-signatures-v2.json',JSON.stringify({source:'TSE — páginas individuais das candidaturas',retrieved:'2026-09-26',macros:MACROS,signatures:clean,macroSimilarity,overallSimilarity:overall},null,2));
fs.writeFileSync('data/tse-model-simulation-v2.json',JSON.stringify({runs:results.length*trials,configurations:results.length,trialsPerConfiguration:trials,results,best:valid.slice(0,12)},null,2));
const pct=value=>`${Math.round(value*100)}%`;
let report='# Assinaturas reais do TSE e simulação de moldes — versão 2\n\n';
report+='Fonte: páginas individuais das 13 candidaturas no TSE, organizadas nos oito macrotemas oficiais. Foram processados 719 tópicos e 104 células candidatura × macrotema; duas células não possuem tópico publicado pelo TSE. A semântica combina similaridade TF-IDF dos títulos com eixos explícitos de convergência e oposição. É uma heurística auditável, não uma interpretação automática definitiva.\n\n';
report+='## Matriz de apoiador integral\n\nA linha é o apoiador integral da candidatura; a diagonal é 100%. A direção importa porque planos têm coberturas diferentes.\n\n| Apoiador de | '+candidates.map(c=>c.name).join(' | ')+' |\n|---|'+candidates.map(()=>'---:').join('|')+'|\n';
for(let a=0;a<13;a++)report+=`| ${candidates[a].name} | ${overall[a].map(pct).join(' | ')} |\n`;
report+='\n## Simulações do molde\n\nForam executadas **'+(results.length*trials).toLocaleString('pt-BR')+' simulações reais condicionadas**: '+results.length+' configurações × '+trials.toLocaleString('pt-BR')+' execuções, sempre usando as 104 assinaturas derivadas do TSE.\n\n';
report+='| Perguntas | Tipos | Opções | Cobertura | Média entre candidatos | Pior par P95 | Empate universal | Válido |\n|---:|---|---:|---:|---:|---:|---:|---|\n';
for(const row of results)report+=`| ${row.questionCount} | ${row.typeMix} | ${row.optionCount} | ${row.macroCoverage}/8 | ${pct(row.meanCross)} | ${pct(row.worstP95)} | ${pct(row.universalRate)} | ${row.valid?'sim':'não'} |\n`;
report+='\n## Melhores moldes\n\n| # | Perguntas | Tipos | Opções | Média | Pior par P95 |\n|---:|---:|---|---:|---:|---:|\n';
valid.slice(0,12).forEach((row,index)=>{report+=`| ${index+1} | ${row.questionCount} | ${row.typeMix} | ${row.optionCount} | ${pct(row.meanCross)} | ${pct(row.worstP95)} |\n`});
report+='\n## As 104 respostas macrotemáticas\n';
for(const signature of clean){report+=`\n### ${signature.candidate.name} (${signature.candidate.party})\n`;for(const cell of signature.macros){report+=`\n#### ${cell.macro}\n\n`;report+=cell.topics.length?cell.topics.map(topic=>`- ${topic.title} — p. ${topic.pages.join(', ')}`).join('\n')+'\n':'- **Sem tópico publicado pelo TSE neste macrotema.**\n';const stances=Object.entries(cell.stances);if(stances.length)report+=`\nEixos detectados: ${stances.map(([axis,value])=>`${axis}=${value>0?'+':'−'}`).join('; ')}.\n`;}}
fs.writeFileSync('docs/analysis/tse-macro-simulation-v2.md',report);
console.log(JSON.stringify({topics:docs.length,cells:104,emptyCells:clean.flatMap(s=>s.macros).filter(c=>!c.topics.length).length,runs:results.length*trials,best:valid[0]},null,2));
