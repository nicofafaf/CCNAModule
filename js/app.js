/* CCNA Module 8-10 Quiz App */
const STORAGE_KEY = 'ccna_mod8_10_progress';
const LANG_KEY = 'ccna_lang';
const THEME_KEY = 'ccna_theme';

window.appLang = localStorage.getItem(LANG_KEY) || 'de';

const state = {
  mode: 'learn',
  questions: [],
  currentIndex: 0,
  selected: new Set(),
  answers: [],
  timerInterval: null,
  timeLeft: 3600,
  showFeedback: true,
  moduleFilter: null,
};

const progress = loadProgress();

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { mastery: {}, mistakes: [], stats: { total: 0, correct: 0 } };
  } catch {
    return { mastery: {}, mistakes: [], stats: { total: 0, correct: 0 } };
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

if (typeof QUESTIONS === 'undefined' || !Array.isArray(QUESTIONS) || QUESTIONS.length !== 76) {
  console.error('QUESTIONS data invalid');
}

function getMastery(id) {
  return progress.mastery[id] || 0;
}

function updateMastery(id, correct) {
  const current = getMastery(id);
  progress.mastery[id] = correct ? Math.min(100, current + 20) : Math.max(0, current - 15);
  if (!correct && !progress.mistakes.includes(id)) progress.mistakes.push(id);
  else if (correct && getMastery(id) >= 80) progress.mistakes = progress.mistakes.filter(m => m !== id);
  progress.stats.total++;
  if (correct) progress.stats.correct++;
  saveProgress();
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function applyI18n() {
  document.documentElement.lang = window.appLang;
  document.title = t('pageTitle');

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (key) el.textContent = t(key);
  });

  ['mod8', 'mod9', 'mod10'].forEach(mod => {
    const ul = document.getElementById(`${mod}-list`);
    if (ul) {
      const items = I18N[window.appLang][`${mod}Items`] || [];
      ul.innerHTML = items.map(item => `<li>${item}</li>`).join('');
    }
  });

  document.getElementById('btn-lang').textContent = t('langSwitch');

  const theme = document.documentElement.dataset.theme;
  document.getElementById('btn-theme').textContent = theme === 'dark' ? '🌙' : '☀️';

  renderStats();
  if (state.questions.length && document.getElementById('screen-quiz').classList.contains('active')) {
    const labels = { learn: 'modeLearn', practice: 'modePractice', exam: 'modeExam', mistakes: 'modeMistakes', weak: 'modeWeak', module: 'modeModule' };
    document.getElementById('quiz-mode-label').textContent = t(labels[state.mode] || 'modeLearn');
    renderQuestion();
  }
}

function renderStats() {
  const total = QUESTIONS.length;
  const mastered = Object.values(progress.mastery).filter(v => v >= 80).length;
  const mistakes = progress.mistakes.length;
  const accuracy = progress.stats.total > 0 ? Math.round((progress.stats.correct / progress.stats.total) * 100) : 0;

  document.getElementById('stats-overview').innerHTML = `
    <div class="stat-card"><div class="stat-value">${total}</div><div class="stat-label">${t('statQuestions')}</div></div>
    <div class="stat-card"><div class="stat-value">${mastered}</div><div class="stat-label">${t('statMastered')}</div></div>
    <div class="stat-card"><div class="stat-value">${mistakes}</div><div class="stat-label">${t('statMistakes')}</div></div>
    <div class="stat-card"><div class="stat-value">${accuracy}%</div><div class="stat-label">${t('statAccuracy')}</div></div>
  `;
  const mc = document.getElementById('mistakes-count');
  if (mc) mc.textContent = mistakes > 0 ? t('modeMistakesCount', { n: mistakes }) : t('modeMistakesNone');
}

function buildQuestionPool(mode, moduleFilter) {
  let pool = [...QUESTIONS];
  if (moduleFilter && moduleFilter !== 'all') pool = pool.filter(q => q.module === parseInt(moduleFilter));
  switch (mode) {
    case 'mistakes':
      pool = pool.filter(q => progress.mistakes.includes(q.id));
      if (pool.length === 0) pool = [...QUESTIONS];
      break;
    case 'weak':
      pool.sort((a, b) => getMastery(a.id) - getMastery(b.id));
      pool = pool.slice(0, Math.min(20, pool.length));
      break;
    default:
      pool = shuffle(pool);
  }
  return pool;
}

function startQuiz(mode, moduleFilter = null) {
  state.mode = mode;
  state.moduleFilter = moduleFilter;
  state.questions = buildQuestionPool(mode, moduleFilter);
  state.currentIndex = 0;
  state.answers = [];
  state.selected = new Set();
  state.showFeedback = mode !== 'exam';
  state.timeLeft = 3600;

  const labels = { learn: 'modeLearn', practice: 'modePractice', exam: 'modeExam', mistakes: 'modeMistakes', weak: 'modeWeak', module: 'modeModule' };
  document.getElementById('quiz-mode-label').textContent = t(labels[mode] || 'modeLearn');

  const timer = document.getElementById('exam-timer');
  if (mode === 'exam') { timer.classList.remove('hidden'); startTimer(); }
  else { timer.classList.add('hidden'); clearInterval(state.timerInterval); }

  showScreen('screen-quiz');
  renderQuestion();
}

function startTimer() {
  clearInterval(state.timerInterval);
  state.timerInterval = setInterval(() => {
    state.timeLeft--;
    const m = Math.floor(state.timeLeft / 60);
    const s = state.timeLeft % 60;
    document.getElementById('exam-timer').textContent = `${m}:${s.toString().padStart(2, '0')}`;
    if (state.timeLeft <= 0) finishQuiz();
  }, 1000);
}

function renderQuestion() {
  const q = state.questions[state.currentIndex];
  if (!q) { finishQuiz(); return; }

  state.selected = new Set();

  document.getElementById('quiz-progress').textContent = `${state.currentIndex + 1} / ${state.questions.length}`;
  document.getElementById('progress-fill').style.width = `${(state.currentIndex / state.questions.length) * 100}%`;

  const modEl = document.getElementById('q-module');
  modEl.textContent = t('moduleLabel', { n: q.module });
  modEl.className = `q-badge mod${q.module}`;

  document.getElementById('q-topic').textContent = q.topic || '';

  const mastery = getMastery(q.id);
  const masteryEl = document.getElementById('q-mastery');
  masteryEl.textContent = t('mastery', { n: mastery });
  masteryEl.className = `q-badge mastery ${mastery >= 80 ? 'high' : mastery >= 40 ? 'mid' : 'low'}`;

  document.getElementById('q-text').textContent = getQuestionText(q);
  const altEl = document.getElementById('q-text-alt');
  const alt = getAltQuestionText(q);
  altEl.textContent = alt && alt !== getQuestionText(q) ? alt : '';
  altEl.style.display = altEl.textContent ? 'block' : 'none';

  const imgWrap = document.getElementById('q-image-wrap');
  if (q.image) {
    document.getElementById('q-image').src = q.image;
    document.getElementById('q-image').alt = t('exhibit');
    imgWrap.classList.remove('hidden');
  } else imgWrap.classList.add('hidden');

  const exhibitEl = document.getElementById('q-exhibit');
  if (q.exhibit) { exhibitEl.textContent = q.exhibit; exhibitEl.classList.remove('hidden'); }
  else exhibitEl.classList.add('hidden');

  const isMulti = q.type === 'multiple' || q.type === 'multiple3' || q.type === 'ordering';
  const optionsEl = document.getElementById('q-options');
  const displayOptions = getOptions(q);
  const shuffledIndices = shuffle(displayOptions.map((_, i) => i));

  let html = '';
  if (isMulti) {
    const hintKey = q.type === 'ordering' ? 'hintOrdering' : q.type === 'multiple3' ? 'hintThree' : 'hintTwo';
    html += `<p class="option-hint">${t(hintKey)}</p>`;
  }
  html += shuffledIndices.map((origIdx, displayIdx) => {
    const letter = String.fromCharCode(65 + displayIdx);
    return `<div class="option" data-idx="${origIdx}"><span class="option-marker">${letter}</span><span>${displayOptions[origIdx]}</span></div>`;
  }).join('');
  optionsEl.innerHTML = html;

  optionsEl.querySelectorAll('.option').forEach(opt => {
    opt.addEventListener('click', () => selectOption(opt, isMulti));
  });

  document.getElementById('feedback').classList.add('hidden');
  document.getElementById('btn-check').classList.remove('hidden');
  document.getElementById('btn-check').disabled = true;
  document.getElementById('btn-next').classList.add('hidden');
  document.getElementById('btn-finish').classList.add('hidden');
}

function selectOption(el, isMulti) {
  if (el.classList.contains('disabled')) return;
  const idx = parseInt(el.dataset.idx);

  if (isMulti) {
    if (state.selected.has(idx)) { state.selected.delete(idx); el.classList.remove('selected'); }
    else {
      const qType = state.questions[state.currentIndex].type;
      const max = qType === 'ordering' ? state.questions[state.currentIndex].options.length : qType === 'multiple3' ? 3 : 2;
      if (state.selected.size < max) { state.selected.add(idx); el.classList.add('selected'); }
    }
  } else {
    document.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
    state.selected = new Set([idx]);
    el.classList.add('selected');
  }

  const q = state.questions[state.currentIndex];
  const required = q.type === 'ordering' ? q.options.length : q.type === 'multiple3' ? 3 : q.type === 'multiple' ? 2 : 1;
  document.getElementById('btn-check').disabled = state.selected.size < required;
}

function checkAnswer() {
  const q = state.questions[state.currentIndex];
  const correct = new Set(q.correct);
  const selected = state.selected;
  const isCorrect = correct.size === selected.size && [...selected].every(s => correct.has(s));

  state.answers.push({ id: q.id, correct: isCorrect, selected: [...selected] });
  updateMastery(q.id, isCorrect);

  document.querySelectorAll('.option').forEach(opt => {
    opt.classList.add('disabled');
    const idx = parseInt(opt.dataset.idx);
    if (correct.has(idx)) opt.classList.add('correct');
    else if (selected.has(idx)) opt.classList.add('incorrect');
  });

  if (state.showFeedback) {
    document.getElementById('feedback').classList.remove('hidden');
    const result = document.getElementById('feedback-result');
    result.className = `feedback-result ${isCorrect ? 'correct' : 'incorrect'}`;
    result.textContent = isCorrect
      ? `✓ ${t('correct')}`
      : `✗ ${t('incorrect')} ${q.correct.map(i => getOptionText(q, i)).join(', ')}`;

    const mnemonicBox = document.getElementById('feedback-mnemonic');
    if (q.mnemonic) {
      document.getElementById('mnemonic-label').textContent = `🧠 ${t('mnemonic')}:`;
      document.getElementById('mnemonic-text').textContent = q.mnemonic;
      mnemonicBox.classList.remove('hidden');
    } else mnemonicBox.classList.add('hidden');

    document.getElementById('feedback-explanation').textContent = q.explanation || q.topic || t('noExplanation');

    document.getElementById('btn-check').classList.add('hidden');
    const isLast = state.currentIndex >= state.questions.length - 1;
    if (isLast) document.getElementById('btn-finish').classList.remove('hidden');
    else document.getElementById('btn-next').classList.remove('hidden');
  } else {
    if (state.currentIndex >= state.questions.length - 1) finishQuiz();
    else nextQuestion();
  }
}

function nextQuestion() {
  state.currentIndex++;
  renderQuestion();
}

function finishQuiz() {
  clearInterval(state.timerInterval);
  const correct = state.answers.filter(a => a.correct).length;
  const total = state.answers.length;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

  document.getElementById('score-percent').textContent = `${pct}%`;
  document.getElementById('score-detail').textContent = t('resultDetail', { c: correct, t: total });

  const modules = { 8: { c: 0, t: 0 }, 9: { c: 0, t: 0 }, 10: { c: 0, t: 0 } };
  state.answers.forEach(a => {
    const q = QUESTIONS.find(x => x.id === a.id);
    if (q) { modules[q.module].t++; if (a.correct) modules[q.module].c++; }
  });

  document.getElementById('results-breakdown').innerHTML = Object.entries(modules)
    .filter(([, v]) => v.t > 0)
    .map(([mod, v]) => {
      const p = Math.round((v.c / v.t) * 100);
      return `<div class="result-module"><span>${t('moduleLabel', { n: mod })}</span><span>${v.c}/${v.t} (${p}%)</span></div>`;
    }).join('');

  document.getElementById('btn-repeat-mistakes').style.display = progress.mistakes.length > 0 ? 'block' : 'none';
  showScreen('screen-results');
  renderStats();
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || 'light';
  document.documentElement.dataset.theme = saved;
}

function toggleTheme() {
  const current = document.documentElement.dataset.theme;
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = next;
  localStorage.setItem(THEME_KEY, next);
  document.getElementById('btn-theme').textContent = next === 'dark' ? '🌙' : '☀️';
}

function toggleLang() {
  window.appLang = window.appLang === 'de' ? 'en' : 'de';
  localStorage.setItem(LANG_KEY, window.appLang);
  applyI18n();
}

document.querySelectorAll('.mode-card').forEach(card => {
  card.addEventListener('click', () => {
    const mode = card.dataset.mode;
    if (mode === 'module') showScreen('screen-module');
    else startQuiz(mode);
  });
});

document.querySelectorAll('.module-btn').forEach(btn => {
  btn.addEventListener('click', () => startQuiz('module', btn.dataset.module));
});

document.querySelectorAll('[data-back]').forEach(btn => {
  btn.addEventListener('click', () => {
    clearInterval(state.timerInterval);
    showScreen('screen-home');
    renderStats();
  });
});

document.getElementById('btn-check').addEventListener('click', checkAnswer);
document.getElementById('btn-next').addEventListener('click', nextQuestion);
document.getElementById('btn-finish').addEventListener('click', finishQuiz);
document.getElementById('btn-repeat-mistakes').addEventListener('click', () => startQuiz('mistakes'));
document.getElementById('btn-lang').addEventListener('click', toggleLang);
document.getElementById('btn-theme').addEventListener('click', toggleTheme);

initTheme();
applyI18n();
