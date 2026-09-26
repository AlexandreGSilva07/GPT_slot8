import fs from 'node:fs';
import vm from 'node:vm';

const sandbox={window:{}};
vm.runInNewContext(fs.readFileSync('src/data/quiz-data.js','utf8'),sandbox);
vm.runInNewContext(fs.readFileSync('src/data/questionnaire-v4.js','utf8'),sandbox);
const {candidates}=sandbox.window.QUIZ_DATA,{questions,macros}=sandbox.window.QUIZ_V4;
const bySlug=new Map(candidates.map(candidate=>[candidate.slug,candidate]));
let output='# Questionário documental — versão 4\n\n';
output+='Base fechada em 26 de setembro de 2026. As 15 perguntas abaixo são as perguntas efetivamente usadas no site. Cada correspondência aponta o plano oficial e as páginas. “Sem cobertura identificada” significa que o plano não foi associado a nenhuma alternativa daquela pergunta; isso não é contado como oposição.\n\n';
output+='## Regras de pontuação\n\n- Cinco macrotemas, cada um com exatamente três perguntas e o mesmo peso na nota geral.\n- Escolha única: 100% na alternativa documentada e 0% em outra direção documentada.\n- Até duas escolhas: fração das escolhas do usuário também documentadas no plano.\n- Ordenação: 100%, 67%, 33% e 0% conforme a posição mais alta entre as prioridades documentadas no plano.\n- “Nenhuma destas medidas” retira a pergunta do cálculo de todas as candidaturas.\n- Ausência documental não recebe zero e não entra na média.\n\n';
for(const macro of macros){
  output+=`# ${macro}\n\n`;
  for(const [index,q] of questions.entries()){
    if(q.macro!==macro)continue;
    output+=`## ${index+1}. ${q.prompt}\n\n**Formato:** ${q.mode==='single'?'escolha única':q.mode==='multi'?'até duas escolhas':'ordenação completa'}  \n**Instrução:** ${q.context}\n\n`;
    const covered=new Set();
    for(const [optionIndex,option] of q.options.entries()){
      output+=`### ${String.fromCharCode(65+optionIndex)}. ${option.label}\n\n`;
      if(!option.positions.length)output+='Nenhum plano associado.\n\n';
      for(const position of option.positions){
        covered.add(position.candidate);const c=bySlug.get(position.candidate);
        output+=`- **${c.name} (${c.party})** — páginas ${position.pages.join(', ')} — [plano oficial no TSE](${c.planUrl})\n`;
      }
      output+='\n';
    }
    const missing=candidates.filter(c=>!covered.has(c.slug));
    output+=`**Sem cobertura identificada nesta pergunta:** ${missing.length?missing.map(c=>c.name).join('; '):'nenhuma candidatura'}.\n\n`;
  }
}
fs.writeFileSync('docs/analysis/questionnaire-v4.md',output);
console.log('docs/analysis/questionnaire-v4.md gerado');
