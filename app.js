(()=>{
'use strict';
const D=window.QUIZ_DATA;
const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
const state={screen:'home',index:0,answers:{},order:{},infoFrom:'home'};

function shuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a}
function initOrder(){D.questions.forEach(q=>state.order[q.id]=shuffle(q.options.map(o=>o.id)))}
function show(name){
  $$('.screen').forEach(x=>x.classList.toggle('is-active',x.dataset.screen===name));
  state.screen=name;
  window.scrollTo({top:0,behavior:'auto'});
  requestAnimationFrame(()=>$('#app').focus({preventScroll:true}));
}
function start(){state.index=0;state.answers={};state.order={};initOrder();show('quiz');renderQuestion()}
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
  const list=$('#optionsList');list.innerHTML='';
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
function next(){if(!choiceFor(current()))return;if(state.index<D.questions.length-1){state.index++;renderQuestion();window.scrollTo({top:0,behavior:'auto'})}else renderResults()}
function previous(){if(state.index>0){state.index--;renderQuestion();window.scrollTo({top:0,behavior:'auto'})}}

function candidateStatus(q,candidateSlug){
  const ans=state.answers[q.id];
  if(!ans||ans==='__skip') return {kind:'skipped',label:'Não respondido'};
  const selected=q.options.find(o=>o.id===ans);
  const direct=selected&&selected.matches.find(m=>m.candidate===candidateSlug);
  if(direct) return {kind:'match',label:'Coincide',choice:selected.label,evidence:direct.evidence,pages:direct.pages};
  for(const opt of q.options){
    const other=opt.matches.find(m=>m.candidate===candidateSlug);
    if(other) return {kind:'other',label:'Outra direção',choice:opt.label,evidence:other.evidence,pages:other.pages};
  }
  return {kind:'unknown',label:'Não identificado'};
}
function statusGlyph(kind){return kind==='match'?'✓':kind==='other'?'↔':kind==='skipped'?'–':'·'}

function renderResults(){
  show('result');
  const answered=Object.values(state.answers).filter(x=>x!=='__skip').length;
  const skipped=D.questions.length-answered;
  $('#resultSummary').innerHTML='<span class="summary-pill"><strong>'+answered+'</strong> temas respondidos</span>'+(skipped?'<span class="summary-pill"><strong>'+skipped+'</strong> sem resposta</span>':'')+'<span class="summary-pill"><strong>13</strong> candidaturas comparadas</span><span class="summary-pill">Fotos oficiais · TSE</span>';

  const strip=$('#profileStrip');strip.innerHTML='';
  D.questions.forEach((q,i)=>{
    const ans=state.answers[q.id],opt=q.options.find(o=>o.id===ans),item=document.createElement('article');
    item.className='profile-item';
    item.innerHTML='<span class="profile-num"></span><div><small></small><strong></strong></div>';
    $('.profile-num',item).textContent=String(i+1).padStart(2,'0');
    $('small',item).textContent=q.theme;
    $('strong',item).textContent=!ans||ans==='__skip'?'Não respondido':opt.label;
    strip.append(item);
  });

  const matrix=$('#candidateMatrix');matrix.innerHTML='';
  D.candidates.slice().sort((a,b)=>a.name.localeCompare(b.name,'pt-BR')).forEach(c=>matrix.append(renderCandidateRow(c)));

  const lib=$('#libraryGrid');lib.innerHTML='';
  D.candidates.slice().sort((a,b)=>a.name.localeCompare(b.name,'pt-BR')).forEach(c=>{
    const a=document.createElement('a');a.className='library-card';a.href=c.planUrl;a.target='_blank';a.rel='noopener noreferrer';
    a.innerHTML='<div class="lib-person"><img alt=""><div><strong></strong><span></span></div></div><b aria-hidden="true">↗</b>';
    $('img',a).src='assets/candidates/'+c.slug+'.jpg';$('img',a).alt='Foto oficial de '+c.name;
    $('strong',a).textContent=c.name;$('span',a).textContent=c.party+' · nº '+c.number+' · '+c.pages+' páginas';lib.append(a);
  });
}
function renderCandidateRow(c){
  const statuses=D.questions.map(q=>candidateStatus(q,c.slug));
  const el=document.createElement('article');el.className='matrix-candidate';

  const person=document.createElement('div');person.className='matrix-person';
  person.innerHTML='<img class="candidate-photo" alt=""><div class="candidate-id"><strong></strong><span></span><a target="_blank" rel="noopener noreferrer">Plano oficial ↗</a></div>';
  $('.candidate-photo',person).src='assets/candidates/'+c.slug+'.jpg';
  $('.candidate-photo',person).alt='Foto oficial de '+c.name;
  $('.candidate-id strong',person).textContent=c.name;
  $('.candidate-id span',person).textContent=c.party+' · nº '+c.number;
  $('.candidate-id a',person).href=c.planUrl;

  const grid=document.createElement('div');grid.className='theme-matrix';
  const detail=document.createElement('div');detail.className='candidate-detail';detail.hidden=true;
  const toggleDetail=(focusIndex)=>{
    const opening=detail.hidden;
    detail.hidden=!opening;
    el.classList.toggle('is-open',opening);
    if(opening){
      detail.innerHTML='';
      statuses.forEach((st,i)=>detail.append(renderStatusDetail(st,D.questions[i],c,i===focusIndex)));
      if(Number.isInteger(focusIndex)){
        requestAnimationFrame(()=>{
          const focus=$('.status-detail.is-focus',detail);
          if(focus) focus.scrollIntoView({block:'nearest',behavior:'smooth'});
        });
      }
    }
  };

  statuses.forEach((st,i)=>{
    const cell=document.createElement('button');cell.type='button';cell.className='theme-cell '+st.kind;
    cell.setAttribute('aria-label',D.questions[i].theme+': '+st.label);
    cell.title=D.questions[i].theme+' · '+st.label;
    cell.innerHTML='<span class="cell-short"></span><b></b>';
    $('.cell-short',cell).textContent=String(i+1).padStart(2,'0');
    $('b',cell).textContent=statusGlyph(st.kind);
    cell.addEventListener('click',()=>toggleDetail(i));
    grid.append(cell);
  });

  const trigger=document.createElement('button');trigger.type='button';trigger.className='candidate-expand';
  trigger.textContent='Ver os 10 temas';
  trigger.addEventListener('click',()=>toggleDetail());

  const top=document.createElement('div');top.className='matrix-row-main';top.append(person,grid,trigger);
  el.append(top,detail);
  return el;
}
function renderStatusDetail(st,q,c,focus){
  const item=document.createElement('section');item.className='status-detail '+st.kind+(focus?' is-focus':'');
  item.innerHTML='<div class="detail-status"><span class="status-icon"></span><div><small></small><strong></strong></div></div><p class="detail-choice"></p><p class="detail-evidence"></p><div class="detail-foot"><span></span><a target="_blank" rel="noopener noreferrer">Abrir plano oficial ↗</a></div>';
  $('.status-icon',item).textContent=statusGlyph(st.kind);
  $('small',item).textContent=q.theme;
  $('.detail-status strong',item).textContent=st.label;
  $('.detail-choice',item).textContent=st.kind==='match'?'Sua escolha: '+st.choice:st.kind==='other'?'Direção registrada no plano: '+st.choice:st.kind==='skipped'?'Você não respondeu este tema.':'Não foi identificada, no mapeamento atual, uma posição comparável para este plano.';
  $('.detail-evidence',item).textContent=st.evidence||'';
  $('.detail-foot span',item).textContent=st.pages?st.pages.map(p=>'p.'+p).join(' · '):'—';
  $('.detail-foot a',item).href=c.planUrl;
  if(!st.evidence) $('.detail-evidence',item).remove();
  return item;
}

function info(){state.infoFrom=state.screen;show('info')}
function backInfo(){if(state.infoFrom==='quiz'){show('quiz');renderQuestion()}else show(state.infoFrom==='result'?'result':'home')}
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-action]');if(!b)return;
  const a=b.dataset.action;
  if(a==='start')start();else if(a==='next')next();else if(a==='previous')previous();else if(a==='restart')start();
  else if(a==='methodology'||a==='how')info();else if(a==='back-info')backInfo();
  else if(a==='exit'||a==='home')show('home');
});
document.addEventListener('keydown',e=>{
  if(state.screen!=='quiz')return;
  if(e.key==='ArrowLeft')previous();
  if(e.key==='ArrowRight'&&!$('#nextBtn').disabled)next();
});
initOrder();
})();