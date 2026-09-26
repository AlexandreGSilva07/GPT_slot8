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
function percentage(value,total){return total?Math.round(value/total*100):null}
function candidateCompatibility(candidate){
  const statuses=D.questions.map(q=>candidateStatus(q,candidate.slug));
  const comparable=statuses.filter(s=>s.kind==='match'||s.kind==='other');
  const matches=comparable.filter(s=>s.kind==='match').length;
  return {statuses,matches,comparable:comparable.length,answered:Object.values(state.answers).filter(a=>a&&a!=='__skip').length,score:percentage(matches,comparable.length)};
}

function renderResults(){
  show('result');
  const answered=Object.values(state.answers).filter(x=>x!=='__skip').length;
  const skipped=D.questions.length-answered;
  $('#resultSummary').innerHTML='<span class="summary-pill"><strong>'+answered+'</strong> temas respondidos</span>'+(skipped?'<span class="summary-pill"><strong>'+skipped+'</strong> sem resposta</span>':'')+'<span class="summary-pill"><strong>13</strong> candidaturas ordenadas por compatibilidade</span><span class="summary-pill">Base: planos oficiais · TSE</span>';

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
  const topicGuide=$('#topicGuide');topicGuide.innerHTML='';
  D.questions.forEach((q,i)=>{const item=document.createElement('li');item.textContent=String(i+1).padStart(2,'0')+' · '+q.theme;topicGuide.append(item)});

  const ranked=D.candidates.map(candidate=>({candidate,compatibility:candidateCompatibility(candidate)}))
    .sort((a,b)=>(b.compatibility.score??-1)-(a.compatibility.score??-1)||b.compatibility.comparable-a.compatibility.comparable||a.candidate.name.localeCompare(b.candidate.name,'pt-BR'))
  const featured=$('#featuredCandidate');featured.innerHTML='';
  if(ranked.length) featured.append(renderCandidateRow(ranked[0].candidate,ranked[0].compatibility,0,true));
  const matrix=$('#candidateMatrix');matrix.innerHTML='';
  ranked.slice(1).forEach(({candidate,compatibility},index)=>matrix.append(renderCandidateRow(candidate,compatibility,index+1)));

  const lib=$('#libraryGrid');lib.innerHTML='';
  D.candidates.slice().sort((a,b)=>a.name.localeCompare(b.name,'pt-BR')).forEach(c=>{
    const a=document.createElement('a');a.className='library-card';a.href=c.planUrl;a.target='_blank';a.rel='noopener noreferrer';
    a.innerHTML='<div class="lib-person"><img alt=""><div><strong></strong><span></span></div></div><b aria-hidden="true">↗</b>';
    $('img',a).src='assets/candidates/'+c.slug+'.jpg';$('img',a).alt='Foto oficial de '+c.name;
    $('strong',a).textContent=c.name;$('span',a).textContent=c.party+' · nº '+c.number+' · '+c.pages+' páginas';lib.append(a);
  });
}
function radarPoint(index,radius,count){
  const angle=-Math.PI/2+(Math.PI*2*index/count);
  return [100+Math.cos(angle)*radius,100+Math.sin(angle)*radius];
}
function renderRadar(statuses,name){
  const count=statuses.length, levels=[28,52,76];
  const polygon=radius=>Array.from({length:count},(_,i)=>radarPoint(i,radius,count).join(',')).join(' ');
  const axes=Array.from({length:count},(_,i)=>{const [x,y]=radarPoint(i,76,count);return '<line x1="100" y1="100" x2="'+x.toFixed(1)+'" y2="'+y.toFixed(1)+'" />'}).join('');
  const rings=levels.map(r=>'<polygon points="'+polygon(r)+'" />').join('');
  const dots=statuses.map((st,i)=>{const radius=st.kind==='match'?76:st.kind==='other'?8:42;const [x,y]=radarPoint(i,radius,count);const value=st.kind==='match'?'100%':st.kind==='other'?'0%':'sem posição identificada';return '<circle class="radar-dot '+st.kind+'" cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="4"><title>'+D.questions[i].theme+': '+value+'</title></circle>'}).join('');
  const labels=statuses.map((_,i)=>{const [x,y]=radarPoint(i,92,count);return '<text x="'+x.toFixed(1)+'" y="'+(y+3).toFixed(1)+'">'+String(i+1).padStart(2,'0')+'</text>'}).join('');
  const wrapper=document.createElement('div');wrapper.className='radar-wrap';wrapper.setAttribute('role','img');wrapper.setAttribute('aria-label','Radar de compatibilidade por tópico de '+name+'. Os tópicos estão identificados na legenda.');
  wrapper.innerHTML='<svg class="compatibility-radar" viewBox="0 0 200 200" aria-hidden="true"><g class="radar-grid">'+rings+axes+'</g><g class="radar-labels">'+labels+'</g><g>'+dots+'</g></svg>';
  return wrapper;
}
function renderCandidateRow(c,compatibility,rank,featured=false){
  const {statuses,matches,comparable,answered,score}=compatibility;
  const el=document.createElement('article');el.className='matrix-candidate'+(featured?' is-featured':'');

  const person=document.createElement('div');person.className='matrix-person';
  person.innerHTML='<span class="candidate-rank" aria-label="Posição no resultado"></span><img class="candidate-photo" alt=""><div class="candidate-id"><strong></strong><span></span><a target="_blank" rel="noopener noreferrer">Plano oficial ↗</a></div>';
  $('.candidate-photo',person).src='assets/candidates/'+c.slug+'.jpg';
  $('.candidate-photo',person).alt='Foto oficial de '+c.name;
  $('.candidate-id strong',person).textContent=c.name;
  $('.candidate-id span',person).textContent=c.party+' · nº '+c.number;
  $('.candidate-id a',person).href=c.planUrl;
  $('.candidate-rank',person).textContent=String(rank+1).padStart(2,'0');

  const scoreCard=document.createElement('div');scoreCard.className='compatibility-score';
  scoreCard.innerHTML='<strong></strong><span></span><small></small>';
  $('strong',scoreCard).textContent=score===null?'—':score+'%';
  $('span',scoreCard).textContent='compatibilidade';
  $('small',scoreCard).textContent=comparable?matches+' de '+comparable+' tópicos comparáveis'+(answered!==D.questions.length?' · '+answered+' respondidos':''):'Sem posição comparável';

  const radar=renderRadar(statuses,c.name);
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

  const trigger=document.createElement('button');trigger.type='button';trigger.className='candidate-expand';
  trigger.textContent='Ver evidências';
  trigger.addEventListener('click',()=>toggleDetail());

  const top=document.createElement('div');top.className='matrix-row-main';top.append(person,scoreCard,radar,trigger);
  el.append(top,detail);
  return el;
}
function renderStatusDetail(st,q,c,focus){
  const item=document.createElement('section');item.className='status-detail '+st.kind+(focus?' is-focus':'');
  item.innerHTML='<div class="detail-status"><span class="status-icon"></span><div><small></small><strong></strong></div></div><p class="detail-choice"></p><p class="detail-evidence"></p><div class="detail-foot"><span></span><a target="_blank" rel="noopener noreferrer">Abrir plano oficial ↗</a></div>';
  $('.status-icon',item).textContent=statusGlyph(st.kind);
  $('small',item).textContent=q.theme;
  $('.detail-status strong',item).textContent=st.label;
  $('.detail-choice',item).textContent=st.kind==='match'?'Compatibilidade: 100% · Sua escolha: '+st.choice:st.kind==='other'?'Compatibilidade: 0% · Direção registrada no plano: '+st.choice:st.kind==='skipped'?'Você não respondeu este tema.':'Sem percentual: não foi identificada, no mapeamento atual, uma posição comparável para este plano.';
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
