import fs from 'node:fs';
import vm from 'node:vm';

const candidates=JSON.parse(fs.readFileSync('data/manifest.json','utf8')).plans;
const source=fs.readFileSync('src/data/questionnaire-v4.js','utf8');
const sandbox={window:{}};vm.runInNewContext(source,sandbox);
const {macros,questions}=sandbox.window.QUIZ_V4;
const bySlug=new Map(candidates.map(candidate=>[candidate.slug,candidate]));
const errors=[];

if(questions.length!==15) errors.push(`Esperadas 15 perguntas; encontradas ${questions.length}`);
for(const macro of macros){
  const count=questions.filter(question=>question.macro===macro).length;
  if(count!==3) errors.push(`${macro}: ${count} perguntas (esperadas 3)`);
}
for(const question of questions){
  const seen=new Set();
  for(const option of question.options){
    for(const position of option.positions){
      const candidate=bySlug.get(position.candidate);
      if(!candidate) errors.push(`${question.id}: candidatura desconhecida ${position.candidate}`);
      for(const page of position.pages){
        if(!Number.isInteger(page)||page<1||page>(candidate?.pages??0)) errors.push(`${question.id}: página inválida ${position.candidate} p.${page}`);
      }
      if(question.mode==='single'&&seen.has(position.candidate)) errors.push(`${question.id}: ${position.candidate} aparece em alternativas exclusivas`);
      seen.add(position.candidate);
    }
  }
}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`OK: ${questions.length} perguntas, ${macros.length} macrotemas, páginas e alternativas exclusivas válidas.`);
