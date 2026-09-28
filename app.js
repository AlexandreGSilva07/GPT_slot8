(() => {
  'use strict';

  const BASE = window.QUIZ_DATA;
  const SOURCE = window.QUESTIONNAIRE_8X13;
  const DATA = { candidates: BASE.candidates, questions: SOURCE.questions, macros: SOURCE.macros };
  const MAX_TOTAL_WEIGHT = 8;
  const RADAR_LABELS = [
    'Economia e trabalho', 'Saúde e assistência', 'Segurança e justiça',
    'Educação e ambiente', 'Política externa', 'Direitos humanos',
    'Questão agrária', 'Governança',
  ];
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const candidateBySlug = new Map(DATA.candidates.map((candidate) => [candidate.slug, candidate]));
  const state = { screen: 'home', index: -1, answers: {}, weights: {}, optionOrders: {}, tournaments: {}, infoFrom: 'home' };

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    })[character]);
  }

  function shuffle(values) {
    const copy = [...values];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const random = new Uint32Array(1);
      crypto.getRandomValues(random);
      const target = random[0] % (index + 1);
      [copy[index], copy[target]] = [copy[target], copy[index]];
    }
    return copy;
  }

  function randomSide() {
    const random = new Uint32Array(1);
    crypto.getRandomValues(random);
    return random[0] % 2 === 0;
  }

  function show(screen) {
    $$('.screen').forEach((node) => node.classList.toggle('is-active', node.dataset.screen === screen));
    state.screen = screen;
    window.scrollTo({ top: 0, behavior: 'auto' });
    requestAnimationFrame(() => $('#app').focus({ preventScroll: true }));
  }

  function start() {
    state.index = -1;
    state.answers = {};
    state.weights = {};
    state.optionOrders = {};
    state.tournaments = {};
    DATA.questions.forEach((question) => {
      state.weights[question.id] = 1;
      state.optionOrders[question.id] = shuffle(question.options.map((option) => option.id));
      state.tournaments[question.id] = {
        championId: state.optionOrders[question.id][0], nextIndex: 1,
        championSide: randomSide() ? 'left' : 'right', history: [], complete: false,
      };
    });
    show('quiz');
    renderStep();
  }

  function currentQuestion() { return DATA.questions[state.index]; }
  function isAnswered(question) { return state.weights[question.id] === 0 || Boolean(state.answers[question.id]); }
  function optionLetter(question, optionId) {
    return String.fromCharCode(65 + state.optionOrders[question.id].indexOf(optionId));
  }
  function setQuizStatus(message) {
    const status = $('#quizStatus');
    status.textContent = message;
    status.hidden = !message;
  }

  function totalAssignedWeight() {
    return DATA.questions.reduce((sum, question) => sum + state.weights[question.id], 0);
  }

  function renderWeightSetup() {
    $('.quiz-nav').hidden = false;
    const total = totalAssignedWeight();
    const control = $('#weightControl');
    $('#progressTheme').textContent = 'Prioridade dos macrotemas';
    $('#progressCount').textContent = 'Configuração inicial';
    $('#progressBar').style.width = '0%';
    $('#questionIndex').textContent = '00';
    $('#questionEyebrow').textContent = 'DISTRIBUA NO MÁXIMO 8 PONTOS';
    $('#questionPrompt').textContent = 'Quanto cada macrotema pesa para você?';
    $('#questionContext').textContent = 'Todos começam com peso 1. Para aumentar um tema, primeiro reduza outro.';
    $('#sourceNote').innerHTML = '<strong>Como os pesos funcionam:</strong> peso 0 anula a pergunta daquele macrotema e a retira completamente do cálculo. Aumentar um peso faz a proposta escolhida naquele tema influenciar mais o resultado final.';
    $('#prevBtn').disabled = true;
    $('#nextBtn').childNodes[0].nodeValue = 'Ver propostas ';
    $('#nextBtn').disabled = total === 0;
    $('#optionsList').hidden = true;
    control.hidden = false;
    control.innerHTML = `
      <div class="weight-budget"><div><strong>${total} de ${MAX_TOTAL_WEIGHT} pontos usados</strong>
        <span>${total === MAX_TOTAL_WEIGHT ? 'Para aumentar um tema, reduza outro.' : `${MAX_TOTAL_WEIGHT - total} ponto${MAX_TOTAL_WEIGHT - total === 1 ? '' : 's'} disponível${MAX_TOTAL_WEIGHT - total === 1 ? '' : 'is'}.`}</span></div>
        <button type="button" class="weight-reset" data-reset-weights>Restaurar 1 por tema</button></div>
      <div class="weight-grid">
        ${DATA.questions.map((question, index) => {
          const weight = state.weights[question.id];
          return `<article class="weight-row${weight === 0 ? ' is-zero' : ''}">
            <div><small>0${index + 1}</small><strong>${escapeHtml(question.macro)}</strong></div>
            <div class="weight-stepper" aria-label="Peso de ${escapeHtml(question.macro)}">
              <button type="button" data-weight-change="-1" data-question-id="${question.id}" ${weight === 0 ? 'disabled' : ''} aria-label="Diminuir peso de ${escapeHtml(question.macro)}">−</button>
              <output aria-label="Peso atual">${weight}</output>
              <button type="button" data-weight-change="1" data-question-id="${question.id}" ${total >= MAX_TOTAL_WEIGHT ? 'disabled' : ''} aria-label="Aumentar peso de ${escapeHtml(question.macro)}">+</button>
            </div>
          </article>`;
        }).join('')}
      </div>`;
    $$('[data-weight-change]', control).forEach((button) => {
      button.addEventListener('click', () => {
        const change = Number(button.dataset.weightChange);
        const questionId = button.dataset.questionId;
        const nextWeight = state.weights[questionId] + change;
        if (nextWeight < 0 || (change > 0 && totalAssignedWeight() >= MAX_TOTAL_WEIGHT)) return;
        state.weights[questionId] = nextWeight;
        renderWeightSetup();
      });
    });
    $('[data-reset-weights]', control).addEventListener('click', () => {
      DATA.questions.forEach((question) => { state.weights[question.id] = 1; });
      renderWeightSetup();
    });
    setQuizStatus(total === 0 ? 'Defina peso positivo para pelo menos um macrotema.' : '');
  }

  function optionById(question, optionId) {
    return question.options.find((option) => option.id === optionId);
  }

  function renderDuelOption(question, option, side) {
    const button = document.createElement('button');
    const letter = optionLetter(question, option.id);
    button.type = 'button';
    button.className = 'duel-option proposal-card';
    button.dataset.option = option.id;
    button.setAttribute('aria-label', `Escolher proposta ${letter} neste duelo`);
    button.innerHTML = `
      <span class="proposal-choice">
        <span class="proposal-letter" aria-hidden="true">${letter}</span>
        <span class="proposal-title">Proposta ${letter}</span>
        <span class="proposal-check">Escolher esta</span>
      </span>
      <span class="proposal-topics">
        ${option.topics.map((topic) => `<span>${escapeHtml(topic)}</span>`).join('')}
      </span>`;
    button.addEventListener('click', () => {
      chooseDuelWinner(question, option.id, side);
    });
    return button;
  }

  function chooseDuelWinner(question, winnerId, winnerSide) {
    const tournament = state.tournaments[question.id];
    tournament.history.push({
      championId: tournament.championId,
      nextIndex: tournament.nextIndex,
      championSide: tournament.championSide,
    });
    tournament.championId = winnerId;
    tournament.championSide = winnerSide;
    tournament.nextIndex += 1;
    if (tournament.nextIndex >= state.optionOrders[question.id].length) {
      tournament.complete = true;
      state.answers[question.id] = winnerId;
    }
    renderTournament(question);
  }

  function undoDuel(question) {
    const tournament = state.tournaments[question.id];
    const previousState = tournament.history.pop();
    if (!previousState) return;
    Object.assign(tournament, previousState, { complete: false });
    delete state.answers[question.id];
    renderTournament(question);
  }

  function restartTournament(question) {
    state.optionOrders[question.id] = shuffle(question.options.map((option) => option.id));
    state.tournaments[question.id] = {
      championId: state.optionOrders[question.id][0], nextIndex: 1,
      championSide: randomSide() ? 'left' : 'right', history: [], complete: false,
    };
    delete state.answers[question.id];
    renderTournament(question);
  }

  function renderTournament(question) {
    const list = $('#optionsList');
    const weight = state.weights[question.id];
    const tournament = state.tournaments[question.id];
    const totalDuels = state.optionOrders[question.id].length - 1;
    $('#questionCard').classList.toggle('is-zero-weight', weight === 0);
    list.innerHTML = '';
    list.className = 'options-list tournament-stage';
    list.removeAttribute('role');
    list.removeAttribute('tabindex');
    if (weight === 0) {
      const nextLabel = state.index === DATA.questions.length - 1 ? 'Ver resultado' : 'Próxima';
      $('#questionContext').textContent = 'Você definiu peso 0: este macrotema e seus duelos não entram no cálculo.';
      list.innerHTML = `<div class="tournament-skipped"><strong>Macrotema anulado</strong><span>Não é necessário comparar as 13 propostas. Você pode seguir para o próximo tema.</span></div>
        <div class="tournament-actions"><button type="button" data-action="previous">Anterior</button><button type="button" data-action="next">${nextLabel}</button></div>`;
      $('#nextBtn').disabled = false;
      return;
    }
    if (tournament.complete) {
      const champion = optionById(question, tournament.championId);
      const letter = optionLetter(question, champion.id);
      $('#questionContext').textContent = `Torneio concluído em ${totalDuels} duelos. A proposta campeã receberá o peso ${weight}.`;
      const result = document.createElement('div');
      result.className = 'tournament-result';
      const nextLabel = state.index === DATA.questions.length - 1 ? 'Ver resultado' : 'Próxima';
      result.innerHTML = `<div class="tournament-result-head"><span>CAMPEÃ DO MACROTEMA</span><strong>Proposta ${letter}</strong></div>
        <div class="proposal-topics">${champion.topics.map((topic) => `<span>${escapeHtml(topic)}</span>`).join('')}</div>
        <div class="tournament-actions"><button type="button" data-action="previous">Anterior</button><button type="button" data-action="next">${nextLabel}</button></div>`;
      list.append(result);
      $('#nextBtn').disabled = false;
      return;
    }
    const challengerId = state.optionOrders[question.id][tournament.nextIndex];
    const champion = optionById(question, tournament.championId);
    const challenger = optionById(question, challengerId);
    const choices = tournament.championSide === 'left' ? [champion, challenger] : [challenger, champion];
    const header = document.createElement('div');
    header.className = 'duel-progress';
    header.innerHTML = `<div><span>DUELO ${tournament.nextIndex} DE ${totalDuels}</span><strong>Qual proposta avança?</strong></div>
      <div class="duel-progress-track"><i style="width:${(tournament.nextIndex / totalDuels) * 100}%"></i></div>`;
    const arena = document.createElement('div');
    arena.className = 'duel-arena';
    arena.setAttribute('role', 'group');
    arena.setAttribute('aria-label', `Duelo ${tournament.nextIndex} de ${totalDuels}`);
    arena.append(renderDuelOption(question, choices[0], 'left'));
    const versus = document.createElement('span');
    versus.className = 'duel-versus';
    versus.textContent = 'VS';
    arena.append(versus, renderDuelOption(question, choices[1], 'right'));
    list.append(header, arena);
    if (tournament.history.length) {
      const undo = document.createElement('button');
      undo.type = 'button';
      undo.className = 'duel-undo';
      undo.textContent = '↶ Desfazer último duelo';
      undo.addEventListener('click', () => undoDuel(question));
      list.append(undo);
    }
    $('#questionContext').textContent = `Peso ${weight}. Compare apenas estas duas propostas e toque na que deve avançar.`;
    $('#nextBtn').disabled = true;
  }

  function renderQuestion() {
    $('.quiz-nav').hidden = true;
    const question = currentQuestion();
    const total = DATA.questions.length;
    $('#progressTheme').textContent = question.macro;
    $('#progressCount').textContent = `${state.index + 1} / ${total}`;
    $('#progressBar').style.width = `${((state.index + 1) / total) * 100}%`;
    $('#questionIndex').textContent = String(state.index + 1).padStart(2, '0');
    $('#questionEyebrow').textContent = 'TORNEIO CEGO · 13 PROPOSTAS';
    $('#questionPrompt').textContent = question.prompt;
    $('#sourceNote').innerHTML = 'As 13 propostas foram embaralhadas. Em cada duelo, escolha a que mais representa você; a vencedora enfrenta a próxima até restar uma campeã.';
    $('#prevBtn').disabled = false;
    $('#nextBtn').childNodes[0].nodeValue = state.index === total - 1 ? 'Ver resultado ' : 'Próxima ';
    setQuizStatus('');
    $('#weightControl').hidden = true;
    const list = $('#optionsList');
    list.hidden = false;
    renderTournament(question);
    const card = $('#questionCard');
    card.classList.remove('swap');
    void card.offsetWidth;
    card.classList.add('swap');
  }

  function renderStep() {
    if (state.index === -1) renderWeightSetup();
    else renderQuestion();
  }

  function next() {
    if (state.index === -1) {
      if (totalAssignedWeight() === 0) return;
      state.index = 0;
      renderQuestion();
      window.scrollTo(0, 0);
      return;
    }
    const question = currentQuestion();
    if (!isAnswered(question)) return;
    if (state.index < DATA.questions.length - 1) {
      state.index += 1;
      renderQuestion();
      window.scrollTo(0, 0);
      return;
    }
    const totalWeight = DATA.questions.reduce((sum, item) => sum + state.weights[item.id], 0);
    if (totalWeight === 0) {
      setQuizStatus('Para gerar o resultado, atribua peso positivo a pelo menos um macrotema.');
      $('#weightControl').scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    renderResults();
  }

  function previous() {
    if (state.index === -1) return;
    if (state.index === 0) {
      state.index = -1;
      renderWeightSetup();
      window.scrollTo(0, 0);
      return;
    }
    state.index -= 1;
    renderQuestion();
    window.scrollTo(0, 0);
  }

  function calculateResults() {
    const rawScores = Object.fromEntries(DATA.candidates.map((candidate) => [candidate.slug, 0]));
    const statuses = Object.fromEntries(DATA.candidates.map((candidate) => [candidate.slug, []]));
    let totalWeight = 0;
    let activeThemes = 0;
    DATA.questions.forEach((question) => {
      const weight = state.weights[question.id];
      const selectedSlug = state.answers[question.id] || null;
      if (weight > 0) {
        totalWeight += weight;
        activeThemes += 1;
        rawScores[selectedSlug] += weight;
      }
      DATA.candidates.forEach((candidate) => {
        statuses[candidate.slug].push({
          selected: weight > 0 && selectedSlug === candidate.slug,
          skipped: weight === 0,
          weight,
          selectedSlug,
          option: question.options.find((option) => option.candidate === candidate.slug),
        });
      });
    });
    const ranked = DATA.candidates.map((candidate) => {
      const raw = rawScores[candidate.slug];
      return {
        candidate, raw, percentage: raw / totalWeight, statuses: statuses[candidate.slug],
        macroScores: statuses[candidate.slug].map((status) => status.skipped ? null : status.selected ? 1 : 0),
        selectedThemes: statuses[candidate.slug].filter((status) => status.selected).length,
      };
    }).sort((left, right) => right.raw - left.raw || left.candidate.name.localeCompare(right.candidate.name, 'pt-BR'));
    let rank = 0;
    let previousRaw = null;
    ranked.forEach((entry, index) => {
      if (entry.raw !== previousRaw) rank = index + 1;
      entry.rank = rank;
      previousRaw = entry.raw;
    });
    return { ranked, totalWeight, activeThemes };
  }

  function formatPercentage(value) {
    return `${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(value * 100)}%`;
  }

  function renderResults() {
    const result = calculateResults();
    show('result');
    $('#resultSummary').innerHTML = `
      <span class="summary-pill"><strong>${result.activeThemes}</strong> macrotemas considerados</span>
      <span class="summary-pill"><strong>${result.totalWeight}</strong> pontos de importância</span>
      <span class="summary-pill"><strong>13</strong> planos oficiais</span>
      <span class="summary-pill">Total distribuído: <strong>100%</strong></span>`;
    const strip = $('#profileStrip');
    strip.innerHTML = '';
    DATA.questions.forEach((question, index) => {
      const selectedSlug = state.answers[question.id];
      const selected = selectedSlug ? candidateBySlug.get(selectedSlug) : null;
      const weight = state.weights[question.id];
      const item = document.createElement('article');
      item.className = `profile-item${weight === 0 ? ' is-skipped' : ''}`;
      item.innerHTML = `<span class="profile-num">0${index + 1}</span><div>
        <small>${weight === 0 ? 'IGNORADO' : `PESO ${weight}`}</small><strong>${escapeHtml(question.macro)}</strong>
        <span>${weight === 0 ? 'Sem influência no resultado' : escapeHtml(selected?.name || '')}</span></div>`;
      strip.append(item);
    });
    const guide = $('#topicGuide');
    guide.innerHTML = '';
    DATA.macros.forEach((macro, index) => {
      const item = document.createElement('li');
      item.textContent = `${index + 1}. ${macro}`;
      guide.append(item);
    });
    const topRaw = result.ranked[0].raw;
    const winners = result.ranked.filter((entry) => entry.raw === topRaw);
    const others = result.ranked.filter((entry) => entry.raw !== topRaw);
    $('#featuredHeading').textContent = winners.length > 1 ? 'Empate no topo do resultado' : 'Destaque do seu resultado';
    $('#featuredNote').textContent = winners.length > 1
      ? `${winners.length} candidaturas receberam a mesma soma de pesos.`
      : 'Candidatura que recebeu a maior soma dos pesos definidos por você.';
    const featured = $('#featuredCandidate');
    featured.innerHTML = '';
    winners.forEach((entry) => featured.append(candidateRow(entry, true, result.activeThemes)));
    const matrix = $('#candidateMatrix');
    matrix.innerHTML = '';
    others.forEach((entry) => matrix.append(candidateRow(entry, false, result.activeThemes)));
    const library = $('#libraryGrid');
    library.innerHTML = '';
    [...DATA.candidates].sort((left, right) => left.name.localeCompare(right.name, 'pt-BR')).forEach((candidate) => {
      const link = document.createElement('a');
      link.className = 'library-card';
      link.href = candidate.planUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.innerHTML = `<div class="lib-person"><img src="assets/candidates/${escapeHtml(candidate.slug)}.jpg" alt="Foto oficial de ${escapeHtml(candidate.name)}">
        <div><strong>${escapeHtml(candidate.name)}</strong><span>${escapeHtml(candidate.party)} · nº ${candidate.number} · ${candidate.pages} páginas</span></div>
        </div><b aria-hidden="true">↗</b>`;
      library.append(link);
    });
  }

  function radarPoint(index, radius) {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / DATA.macros.length;
    return [210 + Math.cos(angle) * radius, 180 + Math.sin(angle) * radius];
  }

  function radar(scores, name, featured) {
    const radius = featured ? 112 : 98;
    const polygon = (distance) => DATA.macros.map((_, index) => radarPoint(index, distance).join(',')).join(' ');
    const rings = [0.25, 0.5, 0.75, 1].map((step) => `<polygon points="${polygon(radius * step)}"/>`).join('');
    const axes = DATA.macros.map((_, index) => {
      const [x, y] = radarPoint(index, radius);
      return `<line x1="210" y1="180" x2="${x}" y2="${y}"/>`;
    }).join('');
    const area = scores.map((score, index) => radarPoint(index, score === null ? 0 : score * radius).join(',')).join(' ');
    const dots = scores.map((score, index) => {
      if (score !== 1) return '';
      const [x, y] = radarPoint(index, radius);
      return `<circle cx="${x}" cy="${y}" r="4"><title>${escapeHtml(DATA.macros[index])}: escolhida</title></circle>`;
    }).join('');
    const labels = RADAR_LABELS.map((label, index) => {
      const [x, y] = radarPoint(index, radius + 37);
      return `<text x="${x}" y="${y}">${escapeHtml(label)}<title>${escapeHtml(DATA.macros[index])}</title></text>`;
    }).join('');
    const wrapper = document.createElement('div');
    wrapper.className = 'radar-wrap radar-eight';
    wrapper.setAttribute('role', 'img');
    wrapper.setAttribute('aria-label', `Radar dos oito macrotemas de ${name}. Os vértices indicam os temas em que esta proposta foi escolhida.`);
    wrapper.innerHTML = `<svg class="compatibility-radar" viewBox="0 0 420 360" aria-hidden="true">
      <g class="radar-grid">${rings}${axes}</g><polygon class="radar-area" points="${area}"/>
      <g class="radar-values">${dots}</g><g class="radar-labels">${labels}</g></svg>`;
    return wrapper;
  }

  function candidateRow(entry, featured, activeThemes) {
    const candidate = entry.candidate;
    const article = document.createElement('article');
    article.className = `matrix-candidate${featured ? ' is-featured' : ''}`;
    const person = document.createElement('div');
    person.className = 'matrix-person';
    person.innerHTML = `<span class="candidate-rank">${String(entry.rank).padStart(2, '0')}</span>
      <img class="candidate-photo" src="assets/candidates/${escapeHtml(candidate.slug)}.jpg" alt="Foto oficial de ${escapeHtml(candidate.name)}">
      <div class="candidate-id"><strong>${escapeHtml(candidate.name)}</strong><span>${escapeHtml(candidate.party)} · nº ${candidate.number}</span>
        <a href="${escapeHtml(candidate.planUrl)}" target="_blank" rel="noopener noreferrer">Plano oficial ↗</a></div>`;
    const score = document.createElement('div');
    score.className = 'compatibility-score';
    score.innerHTML = `<strong>${formatPercentage(entry.percentage)}</strong><span>do peso distribuído</span>
      <small>${entry.raw} ponto${entry.raw === 1 ? '' : 's'} · escolhida em ${entry.selectedThemes} de ${activeThemes} temas ativos</small>`;
    const details = document.createElement('div');
    details.className = 'candidate-detail';
    details.hidden = true;
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'candidate-expand';
    trigger.textContent = 'Ver temas e propostas';
    trigger.setAttribute('aria-expanded', 'false');
    trigger.addEventListener('click', () => {
      details.hidden = !details.hidden;
      trigger.textContent = details.hidden ? 'Ver temas e propostas' : 'Fechar temas e propostas';
      trigger.setAttribute('aria-expanded', String(!details.hidden));
      if (!details.hidden && !details.childElementCount) {
        DATA.questions.forEach((question, index) => details.append(detailCard(question, entry.statuses[index], candidate)));
      }
    });
    const main = document.createElement('div');
    main.className = 'matrix-row-main';
    main.append(person, score, radar(entry.macroScores, candidate.name, featured), trigger);
    article.append(main, details);
    return article;
  }

  function detailCard(question, status, candidate) {
    const section = document.createElement('section');
    const chosenCandidate = status.selectedSlug ? candidateBySlug.get(status.selectedSlug) : null;
    section.className = `status-detail ${status.skipped ? 'skipped' : status.selected ? 'match' : 'other'}`;
    const resultText = status.skipped
      ? 'desconsiderado pelo peso zero'
      : status.selected
        ? `esta foi a proposta escolhida e recebeu peso ${status.weight}`
        : `a proposta escolhida pertence a ${escapeHtml(chosenCandidate?.name || '')}`;
    section.innerHTML = `<div class="detail-status"><span class="status-icon">${status.skipped ? '—' : status.selected ? `P${status.weight}` : '0'}</span>
        <div><small>MACROTEMA ${question.number}</small><strong>${escapeHtml(question.macro)}</strong></div></div>
      <p class="detail-choice"><b>Resultado neste tema:</b> ${resultText}</p>
      <details class="evidence-topics"><summary>Ver os ${status.option.topics.length} tópicos desta candidatura</summary>
        <ul>${status.option.topics.map((topic) => `<li>${escapeHtml(topic)}</li>`).join('')}</ul></details>
      <div class="detail-foot"><span>Fonte documental: TSE</span>
        <a href="${escapeHtml(candidate.planUrl)}" target="_blank" rel="noopener noreferrer">Conferir plano ↗</a></div>`;
    return section;
  }

  function info() { state.infoFrom = state.screen; show('info'); }
  function backInfo() {
    if (state.infoFrom === 'quiz') { show('quiz'); renderStep(); }
    else show(state.infoFrom === 'result' ? 'result' : 'home');
  }

  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const action = button.dataset.action;
    if (action === 'start' || action === 'restart') start();
    else if (action === 'next') next();
    else if (action === 'previous') previous();
    else if (action === 'methodology' || action === 'how') info();
    else if (action === 'back-info') backInfo();
    else if (action === 'exit' || action === 'home') show('home');
  });
  document.addEventListener('keydown', (event) => {
    if (state.screen !== 'quiz') return;
    if (event.altKey && event.key === 'ArrowLeft') previous();
    if (event.altKey && event.key === 'ArrowRight' && !$('#nextBtn').disabled) next();
  });
})();
