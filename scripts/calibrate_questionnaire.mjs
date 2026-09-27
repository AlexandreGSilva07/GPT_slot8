import fs from 'node:fs';
import vm from 'node:vm';

const sandbox={window:{}};
vm.runInNewContext(fs.readFileSync('src/data/quiz-data.js','utf8'),sandbox);
vm.runInNewContext(fs.readFileSync('src/data/questionnaire-v4.js','utf8'),sandbox);
const {candidates}=sandbox.window.QUIZ_DATA;
const {questions,macros}=sandbox.window.QUIZ_V4;

const permutations=(items)=>{
  const result=[];
  const visit=(prefix,remaining)=>{
    if(prefix.length)result.push(prefix);
    remaining.forEach((item,index)=>visit([...prefix,item],remaining.filter((_,i)=>i!==index)));
  };
  visit([],items);
  return result;
};
const combinations=(items,size,start=0,prefix=[],result=[])=>{
  if(prefix.length===size){result.push(prefix);return result}
  for(let i=start;i<items.length;i++)combinations(items,size,i+1,[...prefix,items[i]],result);
  return result;
};
const configs=(question)=>{
  const ids=question.options.map(option=>option.id);
  if(question.mode==='single')return ids.map(id=>({mode:'single',selected:[id]}));
  if(question.mode==='multi')return [...combinations(ids,1),...combinations(ids,2)].map(selected=>({mode:'multi',selected}));
  return permutations(ids).map(selected=>({mode:'rank',selected}));
};
const scoreQuestion=(question,slug,config)=>{
  const documented=question.options.filter(option=>option.positions.some(position=>position.candidate===slug)).map(option=>option.id);
  if(!documented.length)return 0;
  if(question.mode==='single')return documented.includes(config.selected[0])?1:0;
  if(question.mode==='multi'){
    const intersection=config.selected.filter(id=>documented.includes(id)).length;
    return intersection/new Set([...config.selected,...documented]).size;
  }
  const plan=new Set(documented);
  const weights=config.selected.map((_,index)=>1-index/(config.selected.length+1));
  const hit=config.selected.reduce((sum,id,index)=>sum+(plan.has(id)?weights[index]:0),0);
  const recall=hit/(weights.reduce((a,b)=>a+b,0)||1);
  const precision=config.selected.filter(id=>plan.has(id)).length/plan.size;
  return recall*precision;
};
const totalScore=(questionScores)=>{
  const macroScores=macros.map(macro=>{
    const values=questions.map((question,index)=>question.macro===macro?questionScores[index]:null).filter(Number.isFinite);
    return values.reduce((sum,value)=>sum+value,0)/values.length;
  });
  return macroScores.reduce((sum,value)=>sum+value,0)/macroScores.length;
};
const labelConfig=(question,config)=>config.selected.map(id=>question.options.find(option=>option.id===id).label).join(' > ');
const profiles=[];

for(const target of candidates){
  const chosen=questions.map(question=>{
    const ranked=configs(question).map(config=>{
      const scores=Object.fromEntries(candidates.map(candidate=>[candidate.slug,scoreQuestion(question,candidate.slug,config)]));
      const rivals=candidates.filter(candidate=>candidate.slug!==target.slug).map(candidate=>scores[candidate.slug]);
      return {config,scores,target:scores[target.slug],rivalMax:Math.max(...rivals),rivalMean:rivals.reduce((a,b)=>a+b,0)/rivals.length};
    }).sort((a,b)=>b.target-a.target||a.rivalMax-b.rivalMax||a.rivalMean-b.rivalMean||labelConfig(question,a.config).localeCompare(labelConfig(question,b.config),'pt-BR'));
    return ranked[0];
  });
  const scores=Object.fromEntries(candidates.map(candidate=>[
    candidate.slug,
    totalScore(chosen.map(choice=>choice.scores[candidate.slug]))
  ]));
  profiles.push({target,chosen,scores});
}

const pct=value=>`${Math.round(value*100)}%`;
let report='# Teste de calibração — aprovação máxima por candidatura\n\n';
report+='Gerado automaticamente com o mesmo cálculo do site. Para cada candidatura, o teste escolhe uma resposta substantiva em todas as 15 perguntas que maximize sua nota. Em empates, escolhe a combinação que primeiro reduz o maior rival e depois reduz a média dos rivais. “Nenhuma destas medidas” foi excluída, porque representa ausência de preferência do usuário e permitiria omitir perguntas desfavoráveis.\n\n';
report+='## Resumo\n\n| Perfil maximizado | Cobertura documental | Nota-alvo | Segundo colocado | Nota | Margem | Posição do alvo |\n|---|---:|---:|---|---:|---:|---:|\n';
for(const profile of profiles){
  const ranking=candidates.map(candidate=>({candidate,score:profile.scores[candidate.slug]})).sort((a,b)=>b.score-a.score);
  const targetEntry=ranking.find(entry=>entry.candidate.slug===profile.target.slug);
  const rival=ranking.find(entry=>entry.candidate.slug!==profile.target.slug);
  const coverage=questions.filter(question=>question.options.some(option=>option.positions.some(position=>position.candidate===profile.target.slug))).length;
  report+=`| ${profile.target.name} | ${coverage}/15 | ${pct(targetEntry.score)} | ${rival.candidate.name} | ${pct(rival.score)} | ${pct(targetEntry.score-rival.score)} | ${ranking.indexOf(targetEntry)+1}º |\n`;
}
for(const profile of profiles){
  const ranking=candidates.map(candidate=>({candidate,score:profile.scores[candidate.slug]})).sort((a,b)=>b.score-a.score);
  report+=`\n## Perfil para maximizar ${profile.target.name}\n\n### Respostas\n\n`;
  profile.chosen.forEach((choice,index)=>{
    report+=`${index+1}. **${questions[index].prompt}** — ${labelConfig(questions[index],choice.config)}\n`;
  });
  report+='\n### Resultado completo\n\n| Posição | Candidatura | Compatibilidade | Diferença para o alvo |\n|---:|---|---:|---:|\n';
  ranking.forEach((entry,index)=>{
    report+=`| ${index+1} | ${entry.candidate.name} | ${pct(entry.score)} | ${pct(entry.score-profile.scores[profile.target.slug])} |\n`;
  });
}
fs.writeFileSync('docs/analysis/calibration-maxima.md',report);
console.log(report.split('\n').slice(0,24).join('\n'));
