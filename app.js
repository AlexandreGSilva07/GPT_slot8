(() => {
  'use strict';

  const BASE = window.QUIZ_DATA;
  const SOURCE = window.QUESTIONNAIRE_8X13;
  const DATA = { candidates: BASE.candidates, questions: SOURCE.questions, macros: SOURCE.macros };
  const RADAR_LABELS = [
    'Economia e trabalho', 'Saúde e assistência', 'Segurança e justiça',
    'Educação e ambiente', 'Política externa', 'Direitos humanos',
    'Questão agrária', 'Governança',
  ];
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const candidateBySlug = new Map(DATA.candidates.map((candidate) => [candidate.slug, candidate]));
  const state = { screen: 'home', index: -2, answers: {}, weights: {}, optionOrders: {}, swipes: {}, selectedThemes: new Set(), infoFrom: 'home' };

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

  function show(screen) {
    $$('.screen').forEach((node) => node.classList.toggle('is-active', node.dataset.screen === screen));
    state.screen = screen;
    window.scrollTo({ top: 0, behavior: 'auto' });
    requestAnimationFrame(() => $('#app').focus({ preventScroll: true }));
  }

  function start() {
    state.index = -2;
    state.answers = {};
    state.weights = {};
    state.optionOrders = {};
    state.swipes = {};
    state.selectedThemes = new Set();
    DATA.questions.forEach((question) => {
      state.weights[question.id] = 0;
      state.answers[question.id] = {};
      state.optionOrders[question.id] = shuffle(question.options.map((option) => option.id));
      state.swipes[question.id] = { index: 0, complete: false };
    });
    show('quiz');
    renderStep();
  }

  function currentQuestion() { return DATA.questions[state.index]; }
  function isAnswered(question) { return state.weights[question.id] === 0 || Boolean(state.swipes[question.id]?.complete); }
  function optionLetter(question, optionId) {
    return String.fromCharCode(65 + state.optionOrders[question.id].indexOf(optionId));
  }
  function setQuizStatus(message) {
    const status = $('#quizStatus');
    status.textContent = message;
    status.hidden = !message;
  }

  function selectedQuestions() {
    return DATA.questions.filter((question) => state.selectedThemes.has(question.id));
  }

  function activeQuestionIndices() {
    return DATA.questions
      .map((question, index) => ({ question, index }))
      .filter(({ question }) => state.selectedThemes.has(question.id) && state.weights[question.id] > 0)
      .map(({ index }) => index);
  }

  function activePosition(index) {
    return activeQuestionIndices().indexOf(index);
  }

  function renderThemeSelection() {
    $('.quiz-nav').hidden = true;
    $('#questionCard').classList.remove('is-tournament');
    $('#progressTheme').textContent = 'Escolha dos macrotemas';
    $('#progressCount').textContent = 'Etapa 1';
    $('#progressBar').style.width = '0%';
    $('#questionIndex').textContent = '00';
    $('#questionEyebrow').textContent = 'ESCOLHA O QUE ENTRA NO TESTE';
    $('#questionPrompt').textContent = 'Quais macrotemas você quer comparar?';
    $('#questionContext').textContent = 'Escolha pelo menos um. Depois, ajuste a importância dos escolhidos em uma janela rápida.';
    $('#sourceNote').innerHTML = '<strong>Escolha livre:</strong> os temas não selecionados ficam fora dos duelos e do cálculo.';
    $('#optionsList').hidden = true;
    const control = $('#weightControl');
    control.hidden = false;
    const selectedCount = state.selectedThemes.size;
    control.innerHTML = `
      <div class="theme-select-head">
        <div><strong>${selectedCount} de ${DATA.questions.length} selecionados</strong><span>Você pode escolher qualquer combinação.</span></div>
        <button type="button" class="theme-select-all" data-select-all-themes>Selecionar todos</button>
      </div>
      <div class="theme-select-grid">
        ${DATA.questions.map((question, index) => {
          const selected = state.selectedThemes.has(question.id);
          return `<button type="button" class="theme-select-card${selected ? ' is-selected' : ''}" data-theme-id="${question.id}" aria-pressed="${selected}">
            <span class="theme-select-num">0${index + 1}</span>
            <span class="theme-select-name">${escapeHtml(question.macro)}</span>
            <span class="theme-select-check" aria-hidden="true">${selected ? '✓' : '+'}</span>
          </button>`;
        }).join('')}
      </div>
      <div class="theme-select-actions">
        <button type="button" class="primary-btn compact" data-action="next" ${selectedCount === 0 ? 'disabled' : ''}>
          Continuar
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5"/></svg>
        </button>
      </div>`;

    Array.from(control.querySelectorAll('[data-theme-id]')).forEach((button) => {
      button.addEventListener('click', () => {
        const id = button.dataset.themeId;
        if (state.selectedThemes.has(id)) {
          state.selectedThemes.delete(id);
          state.weights[id] = 0;
        } else {
          state.selectedThemes.add(id);
          state.weights[id] = 1;
        }
        renderThemeSelection();
      });
    });
    $('[data-select-all-themes]', control).addEventListener('click', () => {
      DATA.questions.forEach((question) => {
        if (!state.selectedThemes.has(question.id)) state.weights[question.id] = 1;
        state.selectedThemes.add(question.id);
      });
      renderThemeSelection();
    });
    setQuizStatus(selectedCount === 0 ? 'Escolha pelo menos um macrotema para continuar.' : '');
  }

  function totalAssignedWeight() {
    return DATA.questions.reduce((sum, question) => sum + state.weights[question.id], 0);
  }

  function weightBudgetLimit() {
    return state.selectedThemes.size;
  }

  function closeWeightModal() {
    $('#weightModal')?.remove();
    document.body.classList.remove('modal-open');
  }

  function openWeightModal() {
    closeWeightModal();
    const limit = weightBudgetLimit();
    if (!limit) return;

    DATA.questions.forEach((question) => {
      if (!state.selectedThemes.has(question.id)) state.weights[question.id] = 0;
    });

    if (totalAssignedWeight() > limit) {
      selectedQuestions().forEach((question) => { state.weights[question.id] = 1; });
    }

    const total = totalAssignedWeight();
    const activeCount = selectedQuestions().filter((question) => state.weights[question.id] > 0).length;
    const overlay = document.createElement('div');
    overlay.id = 'weightModal';
    overlay.className = 'weight-modal-backdrop';
    overlay.setAttribute('role', 'presentation');
    overlay.innerHTML = `
      <section class="weight-modal" role="dialog" aria-modal="true" aria-labelledby="weightModalTitle">
        <div class="weight-modal-head">
          <div>
            <span class="weight-modal-kicker">IMPORTÂNCIA DOS TEMAS</span>
            <h3 id="weightModalTitle">Distribua até ${limit} ponto${limit === 1 ? '' : 's'}</h3>
            <p>${limit} tema${limit === 1 ? '' : 's'} escolhido${limit === 1 ? '' : 's'} = limite de ${limit} ponto${limit === 1 ? '' : 's'}. Para aumentar um, reduza outro.</p>
          </div>
          <button type="button" class="weight-modal-close" data-weight-modal-close aria-label="Fechar">×</button>
        </div>

        <div class="weight-modal-budget">
          <strong>${total} / ${limit}</strong>
          <span>pontos usados</span>
          <button type="button" data-weight-modal-reset>↻ 1 por tema</button>
        </div>

        <div class="weight-modal-list">
          ${selectedQuestions().map((question) => {
            const index = DATA.questions.findIndex((item) => item.id === question.id);
            const weight = state.weights[question.id];
            return `<div class="weight-modal-row${weight === 0 ? ' is-zero' : ''}">
              <div class="weight-modal-topic"><small>0${index + 1}</small><strong>${escapeHtml(question.macro)}</strong></div>
              <div class="weight-modal-stepper" aria-label="Peso de ${escapeHtml(question.macro)}">
                <button type="button" data-modal-weight="-1" data-question-id="${question.id}" ${weight === 0 ? 'disabled' : ''} aria-label="Diminuir peso">−</button>
                <output>${weight}</output>
                <button type="button" data-modal-weight="1" data-question-id="${question.id}" ${total >= limit ? 'disabled' : ''} aria-label="Aumentar peso">+</button>
              </div>
            </div>`;
          }).join('')}
        </div>

        <div class="weight-modal-foot">
          <button type="button" class="weight-modal-back" data-weight-modal-close>Voltar</button>
          <button type="button" class="primary-btn compact" data-weight-modal-confirm ${activeCount === 0 ? 'disabled' : ''}>
            Começar duelos
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5"/></svg>
          </button>
        </div>
      </section>`;

    document.body.append(overlay);
    document.body.classList.add('modal-open');

    overlay.addEventListener('click', (event) => {
      if (event.target === overlay || event.target.closest('[data-weight-modal-close]')) {
        closeWeightModal();
        return;
      }

      const step = event.target.closest('[data-modal-weight]');
      if (step) {
        const change = Number(step.dataset.modalWeight);
        const questionId = step.dataset.questionId;
        const nextWeight = state.weights[questionId] + change;
        if (nextWeight < 0 || (change > 0 && totalAssignedWeight() >= weightBudgetLimit())) return;
        state.weights[questionId] = nextWeight;
        openWeightModal();
        return;
      }

      if (event.target.closest('[data-weight-modal-reset]')) {
        selectedQuestions().forEach((question) => { state.weights[question.id] = 1; });
        openWeightModal();
        return;
      }

      if (event.target.closest('[data-weight-modal-confirm]')) {
        const active = activeQuestionIndices();
        if (!active.length) return;
        closeWeightModal();
        state.index = active[0];
        renderQuestion();
        window.scrollTo(0, 0);
      }
    });

    requestAnimationFrame(() => $('[data-weight-modal-confirm]', overlay)?.focus({ preventScroll: true }));
  }

  function optionById(question, optionId) {
    return question.options.find((option) => option.id === optionId);
  }

  function currentSwipeOption(question) {
    const swipe = state.swipes[question.id];
    const optionId = state.optionOrders[question.id][swipe.index];
    return optionById(question, optionId);
  }

  function recordSwipe(question, decision) {
    const swipe = state.swipes[question.id];
    if (swipe.complete) return;
    const optionId = state.optionOrders[question.id][swipe.index];
    state.answers[question.id][optionId] = decision;
    swipe.index += 1;
    swipe.complete = swipe.index >= state.optionOrders[question.id].length;
    renderSwipe(question);
  }

  function undoSwipe(question) {
    const swipe = state.swipes[question.id];
    if (swipe.index <= 0) return;
    swipe.index -= 1;
    const optionId = state.optionOrders[question.id][swipe.index];
    delete state.answers[question.id][optionId];
    swipe.complete = false;
    renderSwipe(question);
  }

  function animateSwipe(question, decision, card) {
    if (!card || card.dataset.locked === 'true') return;
    card.dataset.locked = 'true';
    const direction = decision === 'approved' ? 1 : -1;
    card.classList.add(decision === 'approved' ? 'swipe-approved' : 'swipe-rejected');
    card.style.transition = 'transform .2s ease, opacity .2s ease';
    card.style.transform = `translateX(${direction * 125}%) rotate(${direction * 12}deg)`;
    card.style.opacity = '0';
    window.setTimeout(() => recordSwipe(question, decision), 190);
  }

  function bindSwipeGestures(card, question) {
    let pointerId = null;
    let startX = 0;
    let startY = 0;
    let dx = 0;
    let active = false;

    function resetCard() {
      card.style.transition = 'transform .18s ease';
      card.style.transform = '';
      card.style.setProperty('--approve-opacity', '0');
      card.style.setProperty('--reject-opacity', '0');
      window.setTimeout(() => { card.style.transition = ''; }, 190);
    }

    card.addEventListener('pointerdown', (event) => {
      if (event.target.closest('button')) return;
      pointerId = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      dx = 0;
      active = true;
      card.setPointerCapture?.(pointerId);
      card.style.transition = 'none';
    });

    card.addEventListener('pointermove', (event) => {
      if (!active || event.pointerId !== pointerId) return;
      dx = event.clientX - startX;
      const dy = event.clientY - startY;
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dx) < 18) return;
      const rotation = Math.max(-10, Math.min(10, dx / 18));
      const opacity = Math.min(1, Math.abs(dx) / 90);
      card.style.transform = `translateX(${dx}px) rotate(${rotation}deg)`;
      card.style.setProperty('--approve-opacity', dx > 0 ? String(opacity) : '0');
      card.style.setProperty('--reject-opacity', dx < 0 ? String(opacity) : '0');
    });

    function finish(event) {
      if (!active || event.pointerId !== pointerId) return;
      active = false;
      card.releasePointerCapture?.(pointerId);
      const threshold = Math.min(95, card.getBoundingClientRect().width * 0.28);
      if (dx >= threshold) animateSwipe(question, 'approved', card);
      else if (dx <= -threshold) animateSwipe(question, 'rejected', card);
      else resetCard();
    }

    card.addEventListener('pointerup', finish);
    card.addEventListener('pointercancel', (event) => {
      if (event.pointerId !== pointerId) return;
      active = false;
      resetCard();
    });
  }

  function renderSwipeCard(question, option, swipeIndex, totalCards) {
    const letter = optionLetter(question, option.id);
    const card = document.createElement('article');
    card.className = 'swipe-card';
    card.setAttribute('aria-label', `Proposta ${swipeIndex + 1} de ${totalCards}. Arraste para a esquerda para recusar ou para a direita para aprovar.`);
    card.innerHTML = `
      <span class="swipe-stamp swipe-stamp-reject" aria-hidden="true">RECUSAR</span>
      <span class="swipe-stamp swipe-stamp-approve" aria-hidden="true">APROVAR</span>
      <div class="swipe-card-head">
        <span class="proposal-letter" aria-hidden="true">${letter}</span>
        <div><small>PROPOSTA ${swipeIndex + 1} DE ${totalCards}</small><strong>Proposta ${letter}</strong></div>
      </div>
      <div class="swipe-card-topics">
        ${option.topics.map((topic) => `<span>${escapeHtml(topic)}</span>`).join('')}
      </div>
      <div class="swipe-card-hint"><span>← Recusar</span><span>Aprovar →</span></div>`;
    bindSwipeGestures(card, question);
    return card;
  }

  function renderSwipe(question) {
    const list = $('#optionsList');
    const weight = state.weights[question.id];
    const swipe = state.swipes[question.id];
    const order = state.optionOrders[question.id];
    const totalCards = order.length;
    const decisions = state.answers[question.id] || {};
    const approvedCount = Object.values(decisions).filter((decision) => decision === 'approved').length;
    const rejectedCount = Object.values(decisions).filter((decision) => decision === 'rejected').length;

    list.innerHTML = '';
    list.className = 'options-list swipe-stage';
    list.removeAttribute('role');
    list.removeAttribute('tabindex');

    if (swipe.complete) {
      const active = activeQuestionIndices();
      const nextLabel = active.indexOf(state.index) === active.length - 1 ? 'Ver resultado' : 'Próximo tema';
      list.innerHTML = `
        <div class="swipe-complete">
          <span class="swipe-complete-kicker">MACROTEMA CONCLUÍDO</span>
          <strong>${approvedCount} aprovada${approvedCount === 1 ? '' : 's'} · ${rejectedCount} recusada${rejectedCount === 1 ? '' : 's'}</strong>
          <p>As 13 propostas deste tema foram avaliadas individualmente.</p>
          <div class="swipe-complete-actions">
            <button type="button" data-undo-swipe>Desfazer última</button>
            <button type="button" class="swipe-next-theme" data-action="next">${nextLabel}</button>
          </div>
        </div>`;
      $('[data-undo-swipe]', list)?.addEventListener('click', () => undoSwipe(question));
      $('#nextBtn').disabled = false;
      return;
    }

    const option = currentSwipeOption(question);
    const stage = document.createElement('div');
    stage.className = 'swipe-deck';

    const ghost = document.createElement('div');
    ghost.className = 'swipe-card swipe-card-ghost';
    ghost.setAttribute('aria-hidden', 'true');

    const card = renderSwipeCard(question, option, swipe.index, totalCards);
    stage.append(ghost, card);

    const progress = document.createElement('div');
    progress.className = 'swipe-progress';
    progress.innerHTML = `
      <div><span>PROPOSTA ${swipe.index + 1} DE ${totalCards} · PESO ${weight}</span><strong>${approvedCount} aprovadas · ${rejectedCount} recusadas</strong></div>
      <div class="swipe-progress-track"><i style="width:${(swipe.index / totalCards) * 100}%"></i></div>`;

    const controls = document.createElement('div');
    controls.className = 'swipe-controls';
    controls.innerHTML = `
      <button type="button" class="swipe-control reject" data-swipe-decision="rejected" aria-label="Recusar proposta">×<span>Recusar</span></button>
      <button type="button" class="swipe-control approve" data-swipe-decision="approved" aria-label="Aprovar proposta">✓<span>Aprovar</span></button>`;

    controls.querySelector('[data-swipe-decision="rejected"]').addEventListener('click', () => animateSwipe(question, 'rejected', card));
    controls.querySelector('[data-swipe-decision="approved"]').addEventListener('click', () => animateSwipe(question, 'approved', card));

    list.append(progress, stage, controls);

    if (swipe.index > 0) {
      const undo = document.createElement('button');
      undo.type = 'button';
      undo.className = 'duel-undo';
      undo.textContent = '↶ Desfazer última decisão';
      undo.addEventListener('click', () => undoSwipe(question));
      list.append(undo);
    }

    $('#nextBtn').disabled = true;
  }

  function renderQuestion() {
    $('.quiz-nav').hidden = true;
    $('#questionCard').classList.remove('is-tournament');
    $('#questionCard').classList.add('is-swipe');
    const question = currentQuestion();
    const active = activeQuestionIndices();
    const position = active.indexOf(state.index);
    const total = active.length;
    $('#progressTheme').textContent = question.macro;
    $('#progressCount').textContent = `${position + 1} / ${total}`;
    $('#progressBar').style.width = `${((position + 1) / total) * 100}%`;
    $('#questionIndex').textContent = String(state.index + 1).padStart(2, '0');
    $('#questionEyebrow').textContent = 'AVALIAÇÃO CEGA · 13 PROPOSTAS';
    $('#questionPrompt').textContent = `Avalie as propostas de ${question.macro}`;
    $('#sourceNote').innerHTML = 'Uma proposta por vez. Arraste para a <strong>esquerda para recusar</strong> ou para a <strong>direita para aprovar</strong>.';
    $('#prevBtn').disabled = false;
    $('#nextBtn').childNodes[0].nodeValue = position === total - 1 ? 'Ver resultado ' : 'Próxima ';
    setQuizStatus('');
    $('#weightControl').hidden = true;
    const list = $('#optionsList');
    list.hidden = false;
    renderSwipe(question);
    const card = $('#questionCard');
    card.classList.remove('swap');
    void card.offsetWidth;
    card.classList.add('swap');
  }

  function renderStep() {
    if (state.index === -2) renderThemeSelection();
    else renderQuestion();
  }

  function next() {
    if (state.index === -2) {
      if (state.selectedThemes.size === 0) return;
      openWeightModal();
      return;
    }
    const question = currentQuestion();
    if (!isAnswered(question)) return;
    const active = activeQuestionIndices();
    const position = active.indexOf(state.index);
    if (position >= 0 && position < active.length - 1) {
      state.index = active[position + 1];
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
    if (state.index === -2) return;
    const active = activeQuestionIndices();
    const position = active.indexOf(state.index);
    if (position <= 0) {
      state.index = -2;
      renderThemeSelection();
      window.scrollTo(0, 0);
      return;
    }
    state.index = active[position - 1];
    renderQuestion();
    window.scrollTo(0, 0);
  }

  function calculateResults() {
    const statuses = Object.fromEntries(DATA.candidates.map((candidate) => [candidate.slug, []]));
    let totalWeight = 0;
    let activeThemes = 0;
    let totalDecisions = 0;
    let approvedDecisions = 0;
    let rejectedDecisions = 0;

    DATA.questions.forEach((question) => {
      const weight = state.weights[question.id];
      const decisions = state.answers[question.id] || {};
      const active = weight > 0;
      if (active) {
        totalWeight += weight;
        activeThemes += 1;
        totalDecisions += question.options.length;
      }

      DATA.candidates.forEach((candidate) => {
        const option = question.options.find((item) => item.candidate === candidate.slug);
        const decision = active ? (decisions[option.id] || null) : null;
        const approved = decision === 'approved';
        const rejected = decision === 'rejected';
        if (approved) approvedDecisions += 1;
        if (rejected) rejectedDecisions += 1;
        statuses[candidate.slug].push({
          approved,
          rejected,
          skipped: !active,
          decision,
          weight,
          option,
        });
      });
    });

    const candidates = [...DATA.candidates]
      .sort((left, right) => left.name.localeCompare(right.name, 'pt-BR'))
      .map((candidate) => {
        const candidateStatuses = statuses[candidate.slug];
        return {
          candidate,
          statuses: candidateStatuses,
          macroScores: candidateStatuses.map((status) => status.skipped ? null : status.approved ? 1 : 0),
          approvedThemes: candidateStatuses.filter((status) => status.approved).length,
          rejectedThemes: candidateStatuses.filter((status) => status.rejected).length,
        };
      });

    return { candidates, totalWeight, activeThemes, totalDecisions, approvedDecisions, rejectedDecisions };
  }

  function renderResults() {
    const result = calculateResults();
    show('result');
    $('#resultSummary').innerHTML = `
      <span class="summary-pill"><strong>${result.activeThemes}</strong> macrotemas avaliados</span>
      <span class="summary-pill"><strong>${result.totalDecisions}</strong> decisões registradas</span>
      <span class="summary-pill"><strong>${result.approvedDecisions}</strong> aprovações</span>
      <span class="summary-pill"><strong>${result.rejectedDecisions}</strong> recusas</span>`;

    const strip = $('#profileStrip');
    strip.innerHTML = '';
    DATA.questions.forEach((question, index) => {
      const weight = state.weights[question.id];
      const decisions = state.answers[question.id] || {};
      const approved = Object.values(decisions).filter((decision) => decision === 'approved').length;
      const rejected = Object.values(decisions).filter((decision) => decision === 'rejected').length;
      const item = document.createElement('article');
      item.className = `profile-item${weight === 0 ? ' is-skipped' : ''}`;
      item.innerHTML = `<span class="profile-num">0${index + 1}</span><div>
        <small>${weight === 0 ? 'IGNORADO' : `PESO ${weight}`}</small><strong>${escapeHtml(question.macro)}</strong>
        <span>${weight === 0 ? 'Sem decisões neste tema' : `${approved} aprovadas · ${rejected} recusadas`}</span></div>`;
      strip.append(item);
    });

    const guide = $('#topicGuide');
    guide.innerHTML = '';
    DATA.macros.forEach((macro, index) => {
      const item = document.createElement('li');
      item.textContent = `${index + 1}. ${macro}`;
      guide.append(item);
    });

    const featured = $('#featuredCandidate');
    if (featured) featured.innerHTML = '';

    const matrix = $('#candidateMatrix');
    matrix.innerHTML = '';
    result.candidates.forEach((entry) => matrix.append(candidateRow(entry, result.activeThemes)));

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

  function radar(scores, name) {
    const radius = 98;
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
      return `<circle cx="${x}" cy="${y}" r="4"><title>${escapeHtml(DATA.macros[index])}: proposta aprovada</title></circle>`;
    }).join('');
    const labels = RADAR_LABELS.map((label, index) => {
      const [x, y] = radarPoint(index, radius + 37);
      return `<text x="${x}" y="${y}">${escapeHtml(label)}<title>${escapeHtml(DATA.macros[index])}</title></text>`;
    }).join('');
    const wrapper = document.createElement('div');
    wrapper.className = 'radar-wrap radar-eight';
    wrapper.setAttribute('role', 'img');
    wrapper.setAttribute('aria-label', `Mapa dos macrotemas de ${name}. Os vértices marcados indicam propostas que você aprovou.`);
    wrapper.innerHTML = `<svg class="compatibility-radar" viewBox="0 0 420 360" aria-hidden="true">
      <g class="radar-grid">${rings}${axes}</g><polygon class="radar-area" points="${area}"/>
      <g class="radar-values">${dots}</g><g class="radar-labels">${labels}</g></svg>`;
    return wrapper;
  }

  function candidateRow(entry, activeThemes) {
    const candidate = entry.candidate;
    const article = document.createElement('article');
    article.className = 'matrix-candidate';

    const person = document.createElement('div');
    person.className = 'matrix-person';
    person.innerHTML = `<span class="candidate-rank" aria-hidden="true">•</span>
      <img class="candidate-photo" src="assets/candidates/${escapeHtml(candidate.slug)}.jpg" alt="Foto oficial de ${escapeHtml(candidate.name)}">
      <div class="candidate-id"><strong>${escapeHtml(candidate.name)}</strong><span>${escapeHtml(candidate.party)} · nº ${candidate.number}</span>
        <a href="${escapeHtml(candidate.planUrl)}" target="_blank" rel="noopener noreferrer">Plano oficial ↗</a></div>`;

    const summary = document.createElement('div');
    summary.className = 'compatibility-score';
    summary.innerHTML = `<strong>${entry.approvedThemes}</strong><span>propostas aprovadas</span>
      <small>${entry.rejectedThemes} recusadas · ${activeThemes} temas avaliados</small>`;

    const details = document.createElement('div');
    details.className = 'candidate-detail';
    details.hidden = true;

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'candidate-expand';
    trigger.textContent = 'Ver decisões por tema';
    trigger.setAttribute('aria-expanded', 'false');
    trigger.addEventListener('click', () => {
      details.hidden = !details.hidden;
      trigger.textContent = details.hidden ? 'Ver decisões por tema' : 'Fechar decisões por tema';
      trigger.setAttribute('aria-expanded', String(!details.hidden));
      if (!details.hidden && !details.childElementCount) {
        DATA.questions.forEach((question, index) => details.append(detailCard(question, entry.statuses[index], candidate)));
      }
    });

    const main = document.createElement('div');
    main.className = 'matrix-row-main';
    main.append(person, summary, radar(entry.macroScores, candidate.name), trigger);
    article.append(main, details);
    return article;
  }

  function detailCard(question, status, candidate) {
    const section = document.createElement('section');
    section.className = `status-detail ${status.skipped ? 'skipped' : status.approved ? 'match' : 'other'}`;
    const resultText = status.skipped
      ? 'tema fora da avaliação'
      : status.approved
        ? `você aprovou esta proposta; peso do tema: ${status.weight}`
        : `você recusou esta proposta; peso do tema: ${status.weight}`;
    section.innerHTML = `<div class="detail-status"><span class="status-icon">${status.skipped ? '—' : status.approved ? '✓' : '×'}</span>
        <div><small>MACROTEMA ${question.number}</small><strong>${escapeHtml(question.macro)}</strong></div></div>
      <p class="detail-choice"><b>Sua decisão:</b> ${resultText}</p>
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
    if (event.key === 'Escape' && $('#weightModal')) {
      closeWeightModal();
      return;
    }
    if (state.screen !== 'quiz') return;
    if (event.altKey && event.key === 'ArrowLeft') previous();
    if (event.altKey && event.key === 'ArrowRight' && !$('#nextBtn').disabled) next();
  });
})();
