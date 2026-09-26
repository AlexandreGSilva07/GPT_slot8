(()=>{
'use strict';
const BASE=window.QUIZ_DATA,V4=window.QUIZ_V4,D={candidates:BASE.candidates,questions:V4.questions,macros:V4.macros};
const $=(s,p=document)=>p.querySelector(s),$$=(s,p=document)=>[...p.querySelectorAll(s)];
const state={screen:'home',index:0,answers:{},optionOrders:{},rankOrders:{},rankEnabled:{},infoFrom:'home'};
const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function shuffle(values){const copy=[...values];for(let i=copy.length-1;i>0;i--){const random=new Uint32Array(1);crypto.getRandomValues(random);const j=random[0]%(i+1);[copy[i],copy[j]]=[copy[j],copy[i]]}return copy}
function show(name){$$('.screen').forEach(n=>n.classList.toggle('is-active',n.dataset.screen===name));state.screen=name;scrollTo({top:0,behavior:'auto'});requestAnimationFrame(()=>$('#app').focus({preventScroll:true}))}
function start(){state.index=0;state.answers={};state.optionOrders={};state.rankOrders={};state.rankEnabled={};D.questions.forEach(q=>{const order=shuffle(q.options.map(o=>o.id));state.optionOrders[q.id]=order;if(q.mode==='rank'){state.rankOrders[q.id]=order;state.rankEnabled[q.id]=new Set(order)}});show('quiz');renderQuestion()}
function current(){return D.questions[state.index]}
function answered(q){const v=state.answers[q.id];return q.mode==='multi'?Array.isArray(v)&&v.length>0:q.mode==='rank'?v==='confirmed'||v==='__none':Boolean(v)}
function noneButton(q,active){const b=document.createElement('button');b.type='button';b.className='option-card none-option'+(active?' is-selected':'');b.setAttribute('aria-pressed',String(active));b.innerHTML='<span class="radio-ui" aria-hidden="true"></span><span class="option-copy"><strong>Nenhuma destas medidas</strong><span>O tema fica sem pontuação para todas as candidaturas.</span></span>';b.onclick=()=>{state.answers[q.id]='__none';renderQuestion()};return b}
function renderQuestion(){
 const q=current();$('#progressTheme').textContent=q.macro;$('#progressCount').textContent=`${state.index+1} / 15`;$('#progressBar').style.width=`${(state.index+1)/15*100}%`;$('#questionIndex').textContent=String(state.index+1).padStart(2,'0');
 $('#questionEyebrow').textContent=q.mode==='rank'?'ORDEM DE PRIORIDADE':q.mode==='multi'?'ATÉ DUAS ESCOLHAS':'UMA ESCOLHA';$('#questionPrompt').textContent=q.prompt;$('#questionContext').textContent=q.context;
 const list=$('#optionsList');list.innerHTML='';list.className='options-list';list.removeAttribute('role');q.mode==='rank'?renderRank(q,list):renderChoices(q,list);
 $('#prevBtn').disabled=state.index===0;$('#nextBtn').disabled=!answered(q);$('#nextBtn').childNodes[0].nodeValue=state.index===14?'Ver resultado ':'Próxima ';
 const card=$('#questionCard');card.classList.remove('swap');void card.offsetWidth;card.classList.add('swap');
}
function renderChoices(q,list){
 const value=state.answers[q.id],selected=Array.isArray(value)?value:[value];list.setAttribute('role',q.mode==='multi'?'group':'radiogroup');
 state.optionOrders[q.id].map(id=>q.options.find(o=>o.id===id)).forEach(o=>{const active=selected.includes(o.id),b=document.createElement('button');b.type='button';b.className='option-card'+(active?' is-selected':'');b.setAttribute('role',q.mode==='multi'?'checkbox':'radio');b.setAttribute('aria-checked',String(active));b.innerHTML=`<span class="radio-ui" aria-hidden="true"></span><span class="option-copy"><strong>${esc(o.label)}</strong></span>`;
 b.onclick=()=>{if(q.mode==='single')state.answers[q.id]=o.id;else{const old=Array.isArray(state.answers[q.id])?state.answers[q.id]:[];state.answers[q.id]=old.includes(o.id)?old.filter(id=>id!==o.id):old.length<2?[...old,o.id]:[old[1],o.id]}renderQuestion()};list.append(b)});list.append(noneButton(q,value==='__none'));
}
function renderRank(q,list){
 list.classList.add('rank-list');const order=state.rankOrders[q.id],enabled=state.rankEnabled[q.id],confirmed=state.answers[q.id]==='confirmed',activeOrder=order.filter(id=>enabled.has(id));
 order.forEach(id=>{const o=q.options.find(x=>x.id===id),active=enabled.has(id),i=activeOrder.indexOf(id),row=document.createElement('div');row.className='rank-card'+(active?'':' is-excluded');row.innerHTML=`<span class="rank-position">${active?(i+1)+'º':'—'}</span><div class="rank-copy"><strong>${esc(o.label)}</strong><span>${active?'Incluída na sua ordem':'Desconsiderada'}</span></div><div class="rank-actions"><button type="button" aria-label="Subir">↑</button><button type="button" aria-label="Descer">↓</button><button type="button" class="rank-toggle">${active?'Desconsiderar':'Incluir'}</button></div>`;const bs=$$('button',row);bs[0].disabled=!active||i===0;bs[1].disabled=!active||i===activeOrder.length-1;bs[0].onclick=()=>moveRank(q,id,-1);bs[1].onclick=()=>moveRank(q,id,1);bs[2].onclick=()=>toggleRank(q,id);list.append(row)});
 const controls=document.createElement('div');controls.className='rank-confirm';const confirm=document.createElement('button');confirm.type='button';confirm.disabled=!activeOrder.length;confirm.className='ghost-btn rank-confirm-btn'+(confirmed?' is-confirmed':'');confirm.textContent=confirmed?'Ordem confirmada ✓':'Confirmar esta ordem';confirm.onclick=()=>{state.answers[q.id]='confirmed';renderQuestion()};controls.append(confirm,noneButton(q,state.answers[q.id]==='__none'));list.append(controls);
}
function moveRank(q,id,d){const order=state.rankOrders[q.id],active=order.filter(x=>state.rankEnabled[q.id].has(x)),i=active.indexOf(id),other=active[i+d];if(!other)return;const a=order.indexOf(id),b=order.indexOf(other);[order[a],order[b]]=[order[b],order[a]];state.answers[q.id]=null;renderQuestion()}
function toggleRank(q,id){const enabled=state.rankEnabled[q.id];enabled.has(id)?enabled.delete(id):enabled.add(id);state.answers[q.id]=null;renderQuestion()}
function next(){if(!answered(current()))return;if(state.index<14){state.index++;renderQuestion();scrollTo(0,0)}else renderResults()}
function previous(){if(state.index){state.index--;renderQuestion();scrollTo(0,0)}}
function questionScore(q,slug){
 const answer=state.answers[q.id];if(answer==='__none'||!answer)return{kind:'skipped',score:null,documented:false};const documented=q.options.filter(o=>o.positions.some(p=>p.candidate===slug));if(!documented.length)return{kind:'unknown',score:0,documented:false};
 let score=0;if(q.mode==='single'){const selected=q.options.find(o=>o.id===answer);score=selected.positions.some(p=>p.candidate===slug)?1:0}
 else if(q.mode==='multi'){const user=new Set(answer),plan=new Set(documented.map(o=>o.id)),intersection=[...user].filter(id=>plan.has(id)).length,union=new Set([...user,...plan]).size;score=union?intersection/union:0}
 else{const selected=state.rankOrders[q.id].filter(id=>state.rankEnabled[q.id].has(id)),plan=new Set(documented.map(o=>o.id)),weights=selected.map((_,i)=>1-i/(selected.length+1)),hit=selected.reduce((sum,id,i)=>sum+(plan.has(id)?weights[i]:0),0),recall=hit/(weights.reduce((a,b)=>a+b,0)||1),precision=selected.filter(id=>plan.has(id)).length/plan.size;score=recall*precision}
 const positions=documented.flatMap(o=>o.positions.filter(p=>p.candidate===slug).map(p=>({...p,choice:o.label})));return{kind:score===1?'match':score===0?'other':'partial',score,positions,documented:true};
}
function compatibility(c){const statuses=D.questions.map(q=>questionScore(q,c.slug));const macroScores=D.macros.map(m=>{const values=statuses.filter((_,i)=>D.questions[i].macro===m).map(s=>s.score).filter(Number.isFinite);return values.length?values.reduce((a,b)=>a+b,0)/values.length:null});const values=macroScores.filter(Number.isFinite),coverage=statuses.filter(s=>s.documented).length;return{statuses,macroScores,score:values.length?values.reduce((a,b)=>a+b,0)/values.length:null,coverage}}
function answerSummary(q){const a=state.answers[q.id];if(a==='__none')return'Nenhuma destas medidas';if(q.mode==='single')return q.options.find(o=>o.id===a).label;if(q.mode==='multi')return q.options.filter(o=>a.includes(o.id)).map(o=>o.label).join(' + ');return state.rankOrders[q.id].filter(id=>state.rankEnabled[q.id].has(id)).map((id,i)=>`${i+1}º ${q.options.find(o=>o.id===id).label}`).join(' · ')}
function renderResults(){
 show('result');$('#resultSummary').innerHTML='<span class="summary-pill"><strong>15</strong> decisões respondidas</span><span class="summary-pill"><strong>5</strong> macrotemas com o mesmo peso</span><span class="summary-pill"><strong>13</strong> planos comparados</span><span class="summary-pill">Fonte: planos oficiais · TSE</span>';
 const strip=$('#profileStrip');strip.innerHTML='';D.macros.forEach((m,i)=>{const item=document.createElement('article');item.className='profile-item';item.innerHTML=`<span class="profile-num">0${i+1}</span><div><small>MACROTEMA</small><strong>${esc(m)}</strong></div>`;strip.append(item)});
 const guide=$('#topicGuide');guide.innerHTML='';D.macros.forEach((m,i)=>{const li=document.createElement('li');li.textContent=`${i+1}. ${m}`;guide.append(li)});
 const ranked=D.candidates.map(candidate=>({candidate,comp:compatibility(candidate)})).sort((a,b)=>(b.comp.score??-1)-(a.comp.score??-1)||b.comp.coverage-a.comp.coverage||a.candidate.name.localeCompare(b.candidate.name,'pt-BR'));
 $('#featuredCandidate').replaceChildren(candidateRow(ranked[0],0,true));const matrix=$('#candidateMatrix');matrix.innerHTML='';ranked.slice(1).forEach((e,i)=>matrix.append(candidateRow(e,i+1,false)));
 const lib=$('#libraryGrid');lib.innerHTML='';[...D.candidates].sort((a,b)=>a.name.localeCompare(b.name,'pt-BR')).forEach(c=>{const a=document.createElement('a');a.className='library-card';a.href=c.planUrl;a.target='_blank';a.rel='noopener noreferrer';a.innerHTML=`<div class="lib-person"><img src="assets/candidates/${esc(c.slug)}.jpg" alt="Foto oficial de ${esc(c.name)}"><div><strong>${esc(c.name)}</strong><span>${esc(c.party)} · nº ${c.number} · ${c.pages} páginas</span></div></div><b aria-hidden="true">↗</b>`;lib.append(a)});
}
function point(i,r){const a=-Math.PI/2+Math.PI*2*i/5;return[160+Math.cos(a)*r,150+Math.sin(a)*r]}
function labelLines(m){const out=[],words=m.split(' ');let line='';for(const w of words){if((line+' '+w).trim().length>18){out.push(line);line=w}else line=(line+' '+w).trim()}if(line)out.push(line);return out}
function radar(scores,name,featured){
 const radius=featured?82:70,poly=r=>D.macros.map((_,i)=>point(i,r).join(',')).join(' '),rings=[.25,.5,.75,1].map(n=>`<polygon points="${poly(radius*n)}"/>`).join(''),axes=D.macros.map((_,i)=>{const[x,y]=point(i,radius);return`<line x1="160" y1="150" x2="${x}" y2="${y}"/>`}).join('');
 const area=scores.map((v,i)=>point(i,Number.isFinite(v)?Math.max(5,v*radius):0).join(',')).join(' '),dots=scores.map((v,i)=>{if(!Number.isFinite(v))return'';const[x,y]=point(i,Math.max(5,v*radius));return`<circle cx="${x}" cy="${y}" r="3"><title>${esc(D.macros[i])}: ${Math.round(v*100)}%</title></circle>`}).join('');
 const labels=D.macros.map((m,i)=>{const[x,y]=point(i,radius+38),lines=labelLines(m);return`<text x="${x}" y="${y-lines.length*5}">${lines.map((l,j)=>`<tspan x="${x}" dy="${j?11:0}">${esc(l)}</tspan>`).join('')}</text>`}).join('');
 const wrap=document.createElement('div');wrap.className='radar-wrap';wrap.setAttribute('role','img');wrap.setAttribute('aria-label',`Radar de cinco macrotemas de ${name}`);wrap.innerHTML=`<svg class="compatibility-radar" viewBox="0 0 320 300" aria-hidden="true"><g class="radar-grid">${rings}${axes}</g><polygon class="radar-area" points="${area}"/><g class="radar-values">${dots}</g><g class="radar-labels">${labels}</g></svg>`;return wrap;
}
function candidateRow(entry,rank,featured){
 const c=entry.candidate,comp=entry.comp,el=document.createElement('article');el.className='matrix-candidate'+(featured?' is-featured':'');
 const person=document.createElement('div');person.className='matrix-person';person.innerHTML=`<span class="candidate-rank">${String(rank+1).padStart(2,'0')}</span><img class="candidate-photo" src="assets/candidates/${esc(c.slug)}.jpg" alt="Foto oficial de ${esc(c.name)}"><div class="candidate-id"><strong>${esc(c.name)}</strong><span>${esc(c.party)} · nº ${c.number}</span><a href="${esc(c.planUrl)}" target="_blank" rel="noopener noreferrer">Plano oficial ↗</a></div>`;
 const score=document.createElement('div');score.className='compatibility-score';score.innerHTML=`<strong>${comp.score===null?'—':Math.round(comp.score*100)+'%'}</strong><span>compatibilidade geral</span><small>posição documentada em ${comp.coverage} de 15 perguntas</small>`;
 const detail=document.createElement('div');detail.className='candidate-detail';detail.hidden=true;const trigger=document.createElement('button');trigger.type='button';trigger.className='candidate-expand';trigger.textContent='Ver evidências';trigger.onclick=()=>{detail.hidden=!detail.hidden;trigger.textContent=detail.hidden?'Ver evidências':'Fechar evidências';if(!detail.hidden&&!detail.childElementCount)D.questions.forEach((q,i)=>detail.append(detailCard(q,comp.statuses[i],c)))};
 const main=document.createElement('div');main.className='matrix-row-main';main.append(person,score,radar(comp.macroScores,c.name,featured),trigger);el.append(main,detail);return el;
}
function detailCard(q,s,c){
 const el=document.createElement('section');
 const pages=[...new Set(s.positions?.flatMap(p=>p.pages)||[])].sort((a,b)=>a-b);
 const documented=s.positions?.map(p=>p.choice).filter((v,i,a)=>a.indexOf(v)===i).join(' · ')||'O plano não traz posição comparável nesta pergunta.';
 el.className='status-detail '+s.kind;
 el.innerHTML=`<div class="detail-status"><span class="status-icon">${!s.documented?'—':Math.round(s.score*100)+'%'}</span><div><small>${esc(q.macro)}</small><strong>${esc(q.prompt)}</strong></div></div><p class="detail-choice"><b>Sua resposta:</b> ${esc(answerSummary(q))}</p><p class="detail-evidence"><b>No plano:</b> ${esc(documented)}</p><div class="detail-foot"><span>${pages.length?pages.map(p=>'p.'+p).join(' · '):'sem cobertura identificada'}</span><a href="${esc(c.planUrl)}" target="_blank" rel="noopener noreferrer">Conferir no plano ↗</a></div>`;
 return el;
}
function info(){state.infoFrom=state.screen;show('info')}function backInfo(){if(state.infoFrom==='quiz'){show('quiz');renderQuestion()}else show(state.infoFrom==='result'?'result':'home')}
document.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(!b)return;const a=b.dataset.action;if(a==='start'||a==='restart')start();else if(a==='next')next();else if(a==='previous')previous();else if(a==='methodology'||a==='how')info();else if(a==='back-info')backInfo();else if(a==='exit'||a==='home')show('home')});
document.addEventListener('keydown',e=>{if(state.screen!=='quiz')return;if(e.altKey&&e.key==='ArrowLeft')previous();if(e.altKey&&e.key==='ArrowRight'&&!$('#nextBtn').disabled)next()});
})();
