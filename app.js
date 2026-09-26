(()=>{
'use strict';
const D=window.QUIZ_DATA;
const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
const state={screen:'home',index:0,answers:{},order:{},infoFrom:'home'};
const candidateMap=Object.fromEntries(D.candidates.map(c=>[c.slug,c]));

function shuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a}
function initOrder(){D.questions.forEach(q=>state.order[q.id]=shuffle(q.options.map(o=>o.id)))}
function show(name){
  $$('.screen').forEach(x=>x.classList.toggle('is-active',x.dataset.screen===name));
  state.screen=name; window.scrollTo({top:0,behavior:'auto'});
  requestAnimationFrame(()=>$('#app').focus({preventScroll:true}));
}
function start(){
  state.index=0;state.answers={};state.order={};initOrder();show('quiz');renderQuestion();
}
function current(){return D.questions[state.index]}
function choiceFor(q){return state.answers[q.id]}
function renderQuestion(){
  const q=current(), chosen=choiceFor(q), order=state.order[q.id]||q.options.map(o=>o.id);
  $('#progressTheme').textContent=q.theme;
  $('#progressCount').textContent=(state.index+1)+' / '+D.questions.length;
  $('#progressBar').style.width=((state.index+1)/D.questions.length*100)+'%';
  $('#questionIndex').textContent=String(state.index+1).padStart(2,'0');
  $('#questionEyebrow').textContent=q.eyebrow;
  $('#questionPrompt').textContent=q.prompt;
  $('#questionContext').textContent=q.context;
  const list=$('#optionsList'); list.innerHTML='';
  for(const id of order){
    const o=q.options.find(x=>x.id===id);
    list.append(optionButton(o.id,o.label,o.detail,chosen===o.id));
  }
  list.append(optionButton('__skip','Prefiro não responder','Esta questão ficará sem correspondência no resultado.',chosen==='__skip',true));
  $('#prevBtn').disabled=state.index===0;
  $('#nextBtn').disabled=!chosen;
  $('#nextBtn').childNodes[0].nodeValue=state.index===D.questions.length-1?'Ver resultado ':'Próxima ';
  const card=$('#questionCard');card.classList.remove('swap');void card.offsetWidth;card.classList.add('swap');
}
function optionButton(id,label,detail,selected,skip=false){
  const b=document.createElement('button');b.type='button';b.className='option-card'+(selected?' is-selected':'')+(skip?' skip':'');
  b.setAttribute('role','radio');b.setAttribute('aria-checked',selected?'true':'false');b.dataset.option=id;
  b.innerHTML='<span class="radio-ui" aria-hidden="true"></span><span class="option-copy"><strong></strong><span></span></span>';
  $('strong',b).textContent=label;$('span span',b).textContent=detail;
  b.addEventListener('click',()=>{state.answers[current().id]=id;renderQuestion()});
  return b;
}
function next(){if(!choiceFor(current()))return;if(state.index<D.questions.length-1){state.index++;renderQuestion();window.scrollTo({top:0,behavior:'smooth'})}else renderResults()}
function previous(){if(state.index>0){state.index--;renderQuestion()}}
function renderResults(){
  show('result');
  const answered=Object.values(state.answers).filter(x=>x!=='__skip').length, skipped=D.questions.length-answered;
  $('#resultSummary').innerHTML='<span class="summary-pill"><strong>'+answered+'</strong> temas respondidos</span>'+(skipped?'<span class="summary-pill"><strong>'+skipped+'</strong> sem resposta</span>':'')+'<span class="summary-pill"><strong>13</strong> planos consultados</span>';
  const list=$('#resultList');list.innerHTML='';
  D.questions.forEach((q,i)=>list.append(renderResultBlock(q,i)));
  const lib=$('#libraryGrid');lib.innerHTML='';
  D.candidates.forEach(c=>{
    const a=document.createElement('a');a.className='library-card';a.href=c.planUrl;a.target='_blank';a.rel='noopener noreferrer';
    a.innerHTML='<div><strong></strong><span></span></div><b aria-hidden="true">↗</b>';$('strong',a).textContent=c.name;$('span',a).textContent=c.party+' · nº '+c.number+' · '+c.pages+' páginas';lib.append(a);
  });
}
function renderResultBlock(q,i){
  const ans=state.answers[q.id], skipped=ans==='__skip'||!ans, opt=q.options.find(o=>o.id===ans);
  const el=document.createElement('article');el.className='result-block'+(i===0?' is-open':'');
  const title=skipped?'Sem resposta':opt.label;
  el.innerHTML='<div class="result-block-head" role="button" tabindex="0" aria-expanded="'+(i===0)+'"><span class="num">'+String(i+1).padStart(2,'0')+'</span><div><small></small><h3></h3><p></p></div><span class="chevron">⌄</span></div><div class="result-body"></div>';
  $('small',el).textContent=q.theme;$('h3',el).textContent=title;$('p',el).textContent=skipped?'Nenhuma correspondência exibida para este tema.':q.prompt;
  const body=$('.result-body',el);
  if(skipped){body.innerHTML='<div class="empty-match">Você preferiu não responder. Nenhuma posição foi associada neste tema.</div>'}
  else{
    const intro=document.createElement('p');intro.className='match-label';intro.textContent=opt.matches.length+' plano'+(opt.matches.length===1?'':'s')+' com direção materialmente compatível nesta alternativa';body.append(intro);
    const grid=document.createElement('div');grid.className='match-grid';
    opt.matches.slice().sort((a,b)=>candidateMap[a.candidate].name.localeCompare(candidateMap[b.candidate].name,'pt-BR')).forEach(m=>{
      const c=candidateMap[m.candidate], card=document.createElement('article');card.className='candidate-card';
      card.innerHTML='<div class="candidate-meta"><strong></strong><span class="party-chip"></span></div><p class="evidence"></p><div class="source-row"><span class="pages"></span><a class="source-link" target="_blank" rel="noopener noreferrer">Abrir plano oficial ↗</a></div>';
      $('strong',card).textContent=c.name;$('.party-chip',card).textContent=c.party;$('.evidence',card).textContent=m.evidence;$('.pages',card).textContent=m.pages.map(p=>'p.'+p).join(' · ');$('.source-link',card).href=c.planUrl;grid.append(card);
    });body.append(grid);
    const note=document.createElement('div');note.className='empty-match';note.style.marginTop='10px';note.textContent='Compatibilidade aqui significa apenas que o plano contém esta direção. Leia o documento integral para contexto, condições e outras propostas.';body.append(note);
  }
  const head=$('.result-block-head',el),toggle=()=>{el.classList.toggle('is-open');head.setAttribute('aria-expanded',el.classList.contains('is-open'))};
  head.addEventListener('click',toggle);head.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle()}});
  return el;
}
function info(){state.infoFrom=state.screen;show('info')}
function backInfo(){ if(state.infoFrom==='quiz'){show('quiz');renderQuestion()} else show(state.infoFrom==='result'?'result':'home') }
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-action]');if(!b)return;
  const a=b.dataset.action;
  if(a==='start')start();else if(a==='next')next();else if(a==='previous')previous();else if(a==='restart')start();
  else if(a==='methodology'||a==='how')info();else if(a==='back-info')backInfo();
  else if(a==='exit'||a==='home'){show('home')}
});
document.addEventListener('keydown',e=>{
  if(state.screen!=='quiz')return;
  if(e.key==='ArrowLeft')previous();
  if(e.key==='ArrowRight'&&!$('#nextBtn').disabled)next();
});
initOrder();
})();