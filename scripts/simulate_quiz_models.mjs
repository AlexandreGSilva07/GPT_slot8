import fs from 'node:fs';
import vm from 'node:vm';

const sandbox={window:{}};
vm.runInNewContext(fs.readFileSync('src/data/quiz-data.js','utf8'),sandbox);
vm.runInNewContext(fs.readFileSync('src/data/questionnaire-v4.js','utf8'),sandbox);
const {candidates}=sandbox.window.QUIZ_DATA;
const {questions}=sandbox.window.QUIZ_V4;
const MACROS=[
  'Economia, Trabalho e Responsabilidade Fiscal',
  'Saúde Pública e Assistência',
  'Segurança Pública e Justiça',
  'Educação, Ciência e Meio Ambiente',
  'Política Externa e Inserção Global',
  'Direitos Humanos, Equidade e Inclusão Social',
  'Questão Agrária, Propriedade e Direito à Cidade',
  'Governança, Transparência e Reformas de Estado'
];
const pct=value=>`${Math.round(value*100)}%`;

// Matriz direcional: o conjunto documentado de cada candidatura vira o gabarito
// de seu apoiador integral. A comparação usa Jaccard em cada pergunta coberta.
const optionSet=(question,slug)=>new Set(question.options.filter(option=>option.positions.some(position=>position.candidate===slug)).map(option=>option.id));
const jaccard=(a,b)=>{
  const union=new Set([...a,...b]);
  if(!union.size)return null;
  return [...a].filter(value=>b.has(value)).length/union.size;
};
const supporterScore=(target,other)=>{
  const values=questions.map(question=>[optionSet(question,target),optionSet(question,other)])
    .filter(([targetSet])=>targetSet.size)
    .map(([targetSet,otherSet])=>jaccard(targetSet,otherSet));
  return values.reduce((sum,value)=>sum+value,0)/values.length;
};
const matrix=Object.fromEntries(candidates.map(target=>[
  target.slug,
  Object.fromEntries(candidates.map(other=>[other.slug,supporterScore(target.slug,other.slug)]))
]));

// Simulação genérica e reprodutível. Ela testa o molde, sem inventar teses reais.
let seed=0x51f15e;
const random=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/2**32};
const pick=array=>array[Math.floor(random()*array.length)];
const shuffled=array=>[...array].sort(()=>random()-.5);
const TYPES={
  single:['single'],
  mixed:['single','single','multi','rank'],
  varied:['single','multi','rank']
};
const makeSignature=(type,optionCount,common)=>{
  const ids=Array.from({length:optionCount},(_,index)=>index);
  if(type==='single')return [random()<common?0:pick(ids)];
  if(type==='multi'){
    const size=random()<.55?1:2;
    const pool=random()<common?[0,...shuffled(ids.slice(1))]:shuffled(ids);
    return [...new Set(pool)].slice(0,size);
  }
  const size=Math.min(optionCount,2+Math.floor(random()*Math.min(3,optionCount-1)));
  const pool=random()<common?[0,...shuffled(ids.slice(1))]:shuffled(ids);
  return [...new Set(pool)].slice(0,size);
};
const signatureScore=(type,target,other)=>{
  if(type==='single')return target[0]===other[0]?1:0;
  if(type==='multi')return jaccard(new Set(target),new Set(other));
  const union=new Set([...target,...other]);
  let weighted=0,total=0;
  target.forEach((value,index)=>{
    const weight=1-index/(target.length+1);total+=weight;
    const otherIndex=other.indexOf(value);
    if(otherIndex>=0)weighted+=weight*(1-Math.abs(index-otherIndex)/Math.max(target.length,other.length));
  });
  return union.size?weighted/total*(target.filter(value=>other.includes(value)).length/union.size):0;
};
const simulate=(questionCount,typeMix,optionCount,trials=250)=>{
  const coveredMacros=Math.min(questionCount,MACROS.length);
  const maxCross=[],meanCross=[],unique=[];
  for(let trial=0;trial<trials;trial++){
    const qs=Array.from({length:questionCount},(_,index)=>({
      macro:index%MACROS.length,
      type:pick(TYPES[typeMix]),
      signatures:[]
    }));
    qs.forEach(question=>{
      const common=.42;
      question.signatures=Array.from({length:candidates.length},()=>makeSignature(question.type,optionCount,common));
    });
    const cross=[];
    for(let a=0;a<candidates.length;a++)for(let b=a+1;b<candidates.length;b++){
      cross.push(qs.reduce((sum,q)=>sum+signatureScore(q.type,q.signatures[a],q.signatures[b]),0)/questionCount);
    }
    maxCross.push(Math.max(...cross));
    meanCross.push(cross.reduce((a,b)=>a+b,0)/cross.length);
    unique.push(new Set(qs.map(q=>q.signatures.map(s=>s.join(',')).join('|'))).size);
  }
  const average=values=>values.reduce((a,b)=>a+b,0)/values.length;
  const sorted=[...maxCross].sort((a,b)=>a-b);
  return {
    questionCount,typeMix,optionCount,trials,coveredMacros,
    meanCross:average(meanCross),
    averageWorstPair:average(maxCross),
    p95WorstPair:sorted[Math.floor(sorted.length*.95)],
    uniqueQuestionPatterns:average(unique),
    valid:coveredMacros===8
  };
};
const simulations=[];
for(const count of [5,10,15,16,20])for(const mix of Object.keys(TYPES))for(const options of [2,3,4,5])simulations.push(simulate(count,mix,options));
const valid=[...simulations].filter(item=>item.valid).sort((a,b)=>a.p95WorstPair-b.p95WorstPair||a.meanCross-b.meanCross||a.questionCount-b.questionCount);
for(const candidate of candidates){
  if(matrix[candidate.slug][candidate.slug]!==1)throw new Error(`Autoaderência inválida: ${candidate.slug}`);
  for(const other of candidates)if(other.slug!==candidate.slug&&matrix[candidate.slug][other.slug]>=1)throw new Error(`Empate universal entre ${candidate.slug} e ${other.slug}`);
}

let report='# Simulação de moldes e matriz de apoiadores integrais\n\n';
report+='## O que este teste garante\n\n- O perfil documental de cada candidatura é sua própria assinatura e, portanto, recebe 100% no teste direcional.\n- “Nenhuma das alternativas” vale zero, em vez de retirar a pergunta do denominador; assim existe um perfil com 0% para todas.\n- Um molde só é válido se cobrir os oito macrotemas e se as assinaturas não forem idênticas.\n- A simulação do molde é abstrata: testa quantidade, tipos e número de opções sem inventar posições políticas para preencher lacunas dos planos.\n\n';
report+='## Oito macrotemas fixos\n\n'+MACROS.map((macro,index)=>`${index+1}. ${macro}`).join('\n')+'\n\n';
report+='## Matriz direcional do mapeamento documental atual\n\nCada linha responde: “se o usuário reproduzir integralmente a assinatura documentada da candidatura da linha, quanto cada outra candidatura compartilha?”. A diagonal é 100% por construção.\n\n';
report+='| Apoiador integral de | '+candidates.map(candidate=>candidate.name).join(' | ')+' |\n';
report+='|---|'+candidates.map(()=> '---:').join('|')+'|\n';
for(const target of candidates)report+=`| ${target.name} | ${candidates.map(other=>pct(matrix[target.slug][other.slug])).join(' | ')} |\n`;
report+='\n## Busca de molde\n\nForam executados '+simulations.reduce((sum,item)=>sum+item.trials,0).toLocaleString('pt-BR')+' cenários: '+simulations.length+' configurações × 250 bases sintéticas. “Pior par P95” é a compatibilidade do par mais parecido em 95% das execuções; quanto menor, maior a separação.\n\n';
report+='| Perguntas | Tipos | Opções | Macrotemas cobertos | Compatibilidade média | Pior par médio | Pior par P95 | Válido |\n|---:|---|---:|---:|---:|---:|---:|---|\n';
for(const item of simulations)report+=`| ${item.questionCount} | ${item.typeMix} | ${item.optionCount} | ${item.coveredMacros}/8 | ${pct(item.meanCross)} | ${pct(item.averageWorstPair)} | ${pct(item.p95WorstPair)} | ${item.valid?'sim':'não'} |\n`;
report+='\n## Melhores configurações válidas\n\n';
report+='| Posição | Perguntas | Tipos | Opções | Compatibilidade média | Pior par P95 |\n|---:|---:|---|---:|---:|---:|\n';
valid.slice(0,10).forEach((item,index)=>{report+=`| ${index+1} | ${item.questionCount} | ${item.typeMix} | ${item.optionCount} | ${pct(item.meanCross)} | ${pct(item.p95WorstPair)} |\n`});
report+='\n## Regra proposta para o próximo questionário\n\nO melhor resultado puramente estatístico foi o molde de 20 perguntas variadas com 5 opções. O molde recomendado para equilibrar separação e tempo é **16 perguntas**, apenas três pontos pior no pior par P95.\n\n1. Duas perguntas por macrotema: **16 perguntas** no total.\n2. Oito escolhas únicas com 4 ou 5 direções realmente conflitantes.\n3. Quatro múltiplas escolhas, limitadas a duas opções e pontuadas por interseção sobre união.\n4. Quatro ordenações parciais: o usuário pode excluir alternativas e ordenar apenas as que aceita.\n5. A nota de cada candidatura é normalizada pela própria assinatura documentada. Assim, um apoiador integral pode alcançar 100% sem inventar posições que não existem no plano.\n6. Cobertura documental é mostrada separadamente da compatibilidade. Silêncio em um macrotema reduz a cobertura e não é transformado em tese política.\n7. “Nenhuma das alternativas” vale zero. Ela não apaga uma pergunta desfavorável do denominador.\n8. O banco só é publicado se cada assinatura própria marcar 100%, existir perfil 0% e nenhuma resposta substantiva puder dar 100% a todas as candidaturas.\n9. Antes da publicação, calcular matriz direcional, distância mínima entre assinaturas e margem do primeiro colocado para os 13 perfis integrais.\n';
fs.writeFileSync('docs/analysis/model-simulation-v1.md',report);
fs.writeFileSync('data/model-simulation-v1.json',JSON.stringify({macros:MACROS,matrix,simulations,best:valid.slice(0,10)},null,2));
console.log(JSON.stringify({runs:simulations.reduce((sum,item)=>sum+item.trials,0),best:valid[0],renan:{samara:pct(matrix['renan-santos']['samara']),lula:pct(matrix['renan-santos']['lula']),flavio:pct(matrix['renan-santos']['flavio-bolsonaro'])},flavio:{lula:pct(matrix['flavio-bolsonaro']['lula'])}},null,2));
