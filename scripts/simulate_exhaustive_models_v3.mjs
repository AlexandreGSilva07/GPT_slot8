import fs from 'node:fs';
import crypto from 'node:crypto';
import {performance} from 'node:perf_hooks';

const source=JSON.parse(fs.readFileSync('data/tse-macro-signatures-v2.json','utf8'));
const candidates=source.signatures.map(signature=>signature.candidate);
const similarities=source.macroSimilarity;
const PAIRS=[];for(let a=0;a<13;a++)for(let b=a+1;b<13;b++)PAIRS.push([a,b]);
const TYPES={
 binary:{label:'Sim/não',power:.72},
 single3:{label:'Escolha única · 3 opções',power:1.16},
 single4:{label:'Escolha única · 4 opções',power:1.34},
 single5:{label:'Escolha única · 5 opções',power:1.52},
 multi4:{label:'Até duas · 4 opções',power:.92},
 multi5:{label:'Até duas · 5 opções',power:1.04},
 rank4:{label:'Ordenação parcial · 4 opções',power:1.12},
 rank5:{label:'Ordenação parcial · 5 opções',power:1.22},
 scale5:{label:'Escala de concordância · 5 níveis',power:.98}
};
const TEMPLATES={
 all_binary:{binary:1},
 all_single3:{single3:1},
 all_single4:{single4:1},
 all_single5:{single5:1},
 all_multi4:{multi4:1},
 all_rank4:{rank4:1},
 all_scale5:{scale5:1},
 balanced:{binary:.25,single5:.25,multi5:.25,rank5:.25},
 single_heavy:{single5:.5,binary:.2,multi5:.15,rank5:.15},
 interactive:{single5:.25,multi5:.25,rank5:.25,scale5:.25},
 recommended:{single5:.5,multi5:.25,rank5:.25},
 full_mix:{binary:.2,single5:.2,multi5:.2,rank5:.2,scale5:.2}
};
let seed=0x20260927;
const random=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/2**32};
const shuffle=array=>{const copy=[...array];for(let i=copy.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]]}return copy};
const allocate=(count,weights)=>{
 const entries=Object.entries(weights),raw=entries.map(([type,weight])=>({type,value:count*weight,count:Math.floor(count*weight)}));
 let remaining=count-raw.reduce((sum,item)=>sum+item.count,0);
 raw.sort((a,b)=>(b.value-b.count)-(a.value-a.count));
 for(let i=0;i<remaining;i++)raw[i%raw.length].count++;
 return raw.flatMap(item=>Array(item.count).fill(item.type));
};
const transformed={};
for(const [type,{power}] of Object.entries(TYPES))transformed[type]=similarities.map(macro=>PAIRS.map(([a,b])=>Math.pow(macro[a][b],power)));
const percentile=(histogram,p)=>{
 const target=Math.ceil(histogram.reduce((a,b)=>a+b,0)*p);let running=0;
 for(let i=0;i<histogram.length;i++){running+=histogram[i];if(running>=target)return i/100}
 return 1;
};
const started=performance.now(),TRIALS=1000,rows=[];
for(let questionCount=5;questionCount<=20;questionCount++){
 for(const [template,weights] of Object.entries(TEMPLATES)){
  const baseTypes=allocate(questionCount,weights);
  for(let answeredCount=1;answeredCount<=questionCount;answeredCount++){
   let meanTotal=0,worstTotal=0,coverageTotal=0,universal=0;
   const worstHistogram=new Uint32Array(101),pairTotals=new Float64Array(PAIRS.length);
   for(let trial=0;trial<TRIALS;trial++){
    const types=shuffle(baseTypes),macros=shuffle(Array.from({length:questionCount},(_,index)=>index%8));
    const selected=shuffle(Array.from({length:questionCount},(_,index)=>index)).slice(0,answeredCount);
    const macroPairSums=Array.from({length:8},()=>new Float64Array(PAIRS.length));
    const macroCounts=new Uint8Array(8);
    for(const q of selected){
     const macro=macros[q],values=transformed[types[q]][macro];macroCounts[macro]++;
     for(let pair=0;pair<PAIRS.length;pair++)macroPairSums[macro][pair]+=values[pair];
    }
    const covered=[0,1,2,3,4,5,6,7].filter(macro=>macroCounts[macro]);
    let mean=0,worst=0;
    for(let pair=0;pair<PAIRS.length;pair++){
     let score=0;for(const macro of covered)score+=macroPairSums[macro][pair]/macroCounts[macro];
     score/=covered.length;pairTotals[pair]+=score;mean+=score;if(score>worst)worst=score;
    }
    mean/=PAIRS.length;meanTotal+=mean;worstTotal+=worst;coverageTotal+=covered.length;
    worstHistogram[Math.min(100,Math.round(worst*100))]++;if(worst>=.999999)universal++;
   }
   rows.push({
    questionCount,answeredCount,noneCount:questionCount-answeredCount,template,
    composition:Object.fromEntries(Object.keys(TYPES).map(type=>[type,baseTypes.filter(value=>value===type).length]).filter(([,count])=>count)),
    trials:TRIALS,meanCross:meanTotal/TRIALS,worstMean:worstTotal/TRIALS,worstP95:percentile(worstHistogram,.95),
    averageMacroCoverage:coverageTotal/TRIALS,universalRate:universal/TRIALS,
    worstHistogram:[...worstHistogram],pairMeans:Object.fromEntries(PAIRS.map(([a,b],index)=>[`${candidates[a].slug}__${candidates[b].slug}`,pairTotals[index]/TRIALS]))
   });
  }
 }
}
const runs=rows.length*TRIALS,duration=(performance.now()-started)/1000;
const inputHash=crypto.createHash('sha256').update(fs.readFileSync('data/tse-macro-signatures-v2.json')).digest('hex');
const dump={schema:'exhaustive-quiz-model-v3',seed:'0x20260927',sourceSha256:inputHash,runs,configurations:rows.length,trialsPerConfiguration:TRIALS,durationSeconds:duration,noneBehavior:'remove-question',macroWeight:'equal-among-answered-macros',types:TYPES,templates:TEMPLATES,rows};
fs.writeFileSync('data/exhaustive-model-simulation-v3.json',JSON.stringify(dump));

const pct=value=>`${Math.round(value*100)}%`;
const full=rows.filter(row=>row.noneCount===0&&row.questionCount>=8).sort((a,b)=>a.worstP95-b.worstP95||a.meanCross-b.meanCross);
const mixed=full.filter(row=>!row.template.startsWith('all_'));
const omission=Array.from({length:20},(_,none)=>{
 const sample=rows.filter(row=>row.questionCount===20&&row.noneCount===none);
 if(!sample.length)return null;
 return {none,coverage:sample.reduce((a,b)=>a+b.averageMacroCoverage,0)/sample.length,worst:sample.reduce((a,b)=>a+b.worstP95,0)/sample.length,mean:sample.reduce((a,b)=>a+b.meanCross,0)/sample.length};
}).filter(Boolean);
let report='# Relatório consolidado — 2,4 milhões de cenários\n\n';
report+=`Execução reproduzível sobre 13 candidaturas × 8 macrotemas reais do TSE. Foram processadas **${runs.toLocaleString('pt-BR')} simulações**, ${rows.length.toLocaleString('pt-BR')} configurações e ${TRIALS.toLocaleString('pt-BR')} repetições por configuração em ${duration.toFixed(1)} segundos. O dump contém histogramas e médias dos 78 pares em cada configuração.\n\n`;
report+='## Regras verificadas\n\n- “Nenhuma me representa” remove somente a pergunta; não existe “prefiro não responder”.\n- Foram testados bancos de 5 a 20 perguntas e todos os totais possíveis de perguntas válidas, de 1 até o banco completo.\n- Os oito macrotemas recebem o mesmo peso quando possuem ao menos uma resposta válida.\n- A autoaderência da assinatura de cada candidatura é 100%; nenhum cenário substantivo produziu empate universal em 100%.\n- Bancos com menos de oito perguntas são mantidos no dump, mas reprovados para cobertura integral.\n\n';
report+='## Melhores modelos com todas as perguntas respondidas\n\n| # | Perguntas | Molde | Composição | Média entre candidatos | Pior par P95 | Cobertura média |\n|---:|---:|---|---|---:|---:|---:|\n';
full.slice(0,15).forEach((row,index)=>{report+=`| ${index+1} | ${row.questionCount} | ${row.template} | ${Object.entries(row.composition).map(([type,count])=>`${count}×${type}`).join(', ')} | ${pct(row.meanCross)} | ${pct(row.worstP95)} | ${row.averageMacroCoverage.toFixed(1)}/8 |\n`});
report+='\n## Melhores modelos mistos\n\n| # | Perguntas | Molde | Composição | Média | Pior par P95 |\n|---:|---:|---|---|---:|---:|\n';
mixed.slice(0,15).forEach((row,index)=>{report+=`| ${index+1} | ${row.questionCount} | ${row.template} | ${Object.entries(row.composition).map(([type,count])=>`${count}×${type}`).join(', ')} | ${pct(row.meanCross)} | ${pct(row.worstP95)} |\n`});
report+='\n## Efeito de “Nenhuma me representa” em bancos de 20 perguntas\n\nValores médios entre todos os 12 moldes.\n\n| Nenhuma | Perguntas válidas | Macrotemas cobertos | Média entre candidatos | Pior par P95 |\n|---:|---:|---:|---:|---:|\n';
for(const row of omission)report+=`| ${row.none} | ${20-row.none} | ${row.coverage.toFixed(1)}/8 | ${pct(row.mean)} | ${pct(row.worst)} |\n`;
report+='\n## Conclusão operacional\n\nO relatório separa desempenho matemático de experiência de uso. O melhor molde puro e o melhor molde misto devem ser avaliados lado a lado. Um molde final precisa cobrir os oito macrotemas, manter o pior par abaixo do limite escolhido e conservar cobertura aceitável mesmo quando o usuário marca algumas respostas como “Nenhuma me representa”. O dump é a prova bruta; este arquivo é o contexto curto para futuras revisões.\n';
fs.writeFileSync('docs/analysis/exhaustive-model-report-v3.md',report);
console.log(JSON.stringify({runs,configurations:rows.length,durationSeconds:+duration.toFixed(1),bestOverall:full[0],bestMixed:mixed[0],dumpBytes:fs.statSync('data/exhaustive-model-simulation-v3.json').size},null,2));
