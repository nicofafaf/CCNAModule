/* CCNA v7 Quiz – strikt getrennte Prüfungsblöcke */
const LANG_KEY = 'ccna_lang';
const THEME_KEY = 'ccna_theme';
const BANK_KEY = 'ccna_selected_bank';

window.appLang = (localStorage.getItem(LANG_KEY) || 'de').toLowerCase();

const state = {
  courses: [],
  currentCourse: null,
  currentExam: null,
  allQuestions: [],
  quizPool: [],
  mode: 'learn',
  currentIndex: 0,
  selected: new Set(),
  answers: [],
  timerInterval: null,
  timeLeft: 3600,
  showFeedback: true,
  moduleFilter: null,
};

let progress = { mastery: {}, mistakes: [], stats: { total: 0, correct: 0 } };

function progressKey() {
  return state.currentExam ? `ccna_v7_${state.currentExam.id}_progress` : 'ccna_v7_default_progress';
}

function qKey(id) {
  return state.currentExam ? `${state.currentExam.id}:${id}` : String(id);
}

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(progressKey())) || { mastery: {}, mistakes: [], stats: { total: 0, correct: 0 } };
  } catch {
    return { mastery: {}, mistakes: [], stats: { total: 0, correct: 0 } };
  }
}

function saveProgress() {
  localStorage.setItem(progressKey(), JSON.stringify(progress));
}

function getMastery(id) {
  return progress.mastery[qKey(id)] || 0;
}

function updateMastery(id, correct) {
  const key = qKey(id);
  const current = progress.mastery[key] || 0;
  progress.mastery[key] = correct ? Math.min(100, current + 20) : Math.max(0, current - 15);
  if (!correct && !progress.mistakes.includes(key)) progress.mistakes.push(key);
  else if (correct && getMastery(id) >= 80) progress.mistakes = progress.mistakes.filter(m => m !== key);
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

function examTitle(exam) {
  return currentLang() === 'de' ? exam.titleDe : exam.title;
}

function examSubtitle(exam) {
  return currentLang() === 'de' ? exam.subtitleDe : exam.subtitle;
}

function courseTitle(course) {
  return currentLang() === 'de' ? course.titleDe : course.title;
}

async function initApp() {
  showScreen('screen-courses');
  const res = await fetch('data/exams.json?v=3');
  const data = await res.json();
  state.courses = data.courses;
  renderCourseSelect();

  const savedBank = localStorage.getItem(BANK_KEY);
  if (savedBank) {
    for (const course of state.courses) {
      const exam = course.exams.find(e => e.id === savedBank && e.available);
      if (exam) {
        await selectExam(course, exam, false);
        showScreen('screen-home');
        return;
      }
    }
  }
  showScreen('screen-courses');
}

function renderCourseSelect() {
  const el = document.getElementById('course-list');
  el.innerHTML = state.courses.map(course => {
    const count = course.exams.filter(e => e.available).length;
    const total = course.exams.length;
    const disabled = count === 0;
    return `<button class="course-card ${disabled ? 'disabled' : ''}" data-course="${course.id}" ${disabled ? 'disabled' : ''}>
      <h3>${courseTitle(course)}</h3>
      <p>${t('examSetsAvailable', { n: count, t: total })}</p>
    </button>`;
  }).join('');
  el.querySelectorAll('.course-card:not(.disabled)').forEach(btn => {
    btn.addEventListener('click', () => {
      const course = state.courses.find(c => c.id === btn.dataset.course);
      state.currentCourse = course;
      renderExamSelect();
      showScreen('screen-exams');
    });
  });
}

function renderExamSelect() {
  document.getElementById('exam-course-title').textContent = courseTitle(state.currentCourse);
  const el = document.getElementById('exam-list');
  el.innerHTML = state.currentCourse.exams.map(exam => {
    const active = state.currentExam && state.currentExam.id === exam.id;
    return `<button class="exam-card ${exam.available ? '' : 'soon'} ${active ? 'active' : ''}" data-exam="${exam.id}" ${exam.available ? '' : 'disabled'}>
      <div class="exam-card-head">
        <span class="exam-card-title">${examTitle(exam)}</span>
        ${exam.available ? `<span class="exam-badge-live">${t('available')}</span>` : `<span class="exam-badge-soon">${t('comingSoon')}</span>`}
      </div>
      <p class="exam-card-sub">${examSubtitle(exam)}</p>
      ${exam.modules.length ? `<small class="exam-card-mod">${t('modulesRange', { range: exam.modules.join(', ') })}</small>` : ''}
    </button>`;
  }).join('');

  el.querySelectorAll('.exam-card:not(.soon)').forEach(btn => {
    btn.addEventListener('click', async () => {
      const exam = state.currentCourse.exams.find(e => e.id === btn.dataset.exam);
      await selectExam(state.currentCourse, exam, true);
    });
  });
}

async function selectExam(course, exam, navigateHome) {
  state.currentCourse = course;
  try {
    const res = await fetch(`${exam.file}?v=3`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    state.allQuestions = await res.json();
  } catch {
    localStorage.removeItem(BANK_KEY);
    alert(t('noQuestionsInBlock'));
    showScreen('screen-exams');
    return;
  }
  state.currentExam = { ...exam, questionCount: state.allQuestions.length };
  localStorage.setItem(BANK_KEY, exam.id);
  progress = loadProgress();
  renderHome();
  if (navigateHome) showScreen('screen-home');
}

function renderHome() {
  if (!state.currentExam) return;
  document.getElementById('hero-badge').textContent = `${state.currentCourse.id.toUpperCase().replace('CCNA', 'CCNA ')} · ${t('isolatedBlock')}`;
  document.getElementById('hero-title').textContent = examTitle(state.currentExam);
  document.getElementById('hero-sub').textContent = t('heroSubExam', {
    sub: examSubtitle(state.currentExam),
    n: state.allQuestions.length,
  });
  document.getElementById('isolation-notice').textContent = t('isolationNotice');

  const topicsEl = document.getElementById('topic-cards');
  const modules = state.currentExam.modules || [];
  if (modules.length) {
    topicsEl.innerHTML = modules.map(mod => {
      const count = state.allQuestions.filter(q => q.module === mod).length;
      const items = I18N[window.appLang][`mod${mod}Items`] || [];
      const title = I18N[window.appLang][`mod${mod}Title`] || t('moduleLabel', { n: mod });
      return `<div class="topic-card mod${mod}">
        <h4>${title} <small>(${count} ${t('statQuestions').toLowerCase()})</small></h4>
        <ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>
      </div>`;
    }).join('');
    document.getElementById('learning-overview').classList.remove('hidden');
  } else {
    topicsEl.innerHTML = '';
    document.getElementById('learning-overview').classList.add('hidden');
  }

  renderModuleSelect();
  renderStats();
}

function renderModuleSelect() {
  const el = document.getElementById('module-select');
  const modules = state.currentExam.modules || [];
  if (!modules.length) {
    document.querySelector('[data-mode="module"]').style.display = 'none';
    return;
  }
  document.querySelector('[data-mode="module"]').style.display = '';
  const buttons = modules.map(mod => {
    const count = state.allQuestions.filter(q => q.module === mod).length;
    const sub = I18N[window.appLang][`mod${mod}Sub`] || '';
    const label = I18N[window.appLang][`mod${mod}Btn`] || t('moduleLabel', { n: mod });
    return `<button class="module-btn" data-module="${mod}">
      <span>${label}</span>
      <small>${sub} · ${count} ${t('statQuestions').toLowerCase()}</small>
    </button>`;
  }).join('');
  el.innerHTML = buttons + `<button class="module-btn all" data-module="all">
    <span>${t('modAllBtn')}</span>
    <small>${t('modAllSub', { n: state.allQuestions.length })}</small>
  </button>`;
  el.querySelectorAll('.module-btn').forEach(btn => {
    btn.addEventListener('click', () => startQuiz('module', btn.dataset.module));
  });
}

function applyI18n() {
  document.documentElement.lang = window.appLang;
  document.title = state.currentExam
    ? `${examTitle(state.currentExam)} | CCNA Quiz`
    : t('pageTitle');

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (key) el.textContent = t(key);
  });

  document.getElementById('btn-lang').textContent = t('langSwitch');
  document.getElementById('btn-theme').textContent =
    document.documentElement.dataset.theme === 'dark' ? '🌙' : '☀️';

  renderCourseSelect();
  if (state.currentCourse) renderExamSelect();
  if (state.currentExam) renderHome();
  if (state.quizPool.length && document.getElementById('screen-quiz').classList.contains('active')) {
    const labels = { learn: 'modeLearn', practice: 'modePractice', exam: 'modeExam', mistakes: 'modeMistakes', weak: 'modeWeak', module: 'modeModule' };
    document.getElementById('quiz-mode-label').textContent = t(labels[state.mode] || 'modeLearn');
    document.getElementById('quiz-bank-label').textContent = examTitle(state.currentExam);
    renderQuestion();
  }
}

function renderStats() {
  if (!state.currentExam) return;
  const total = state.allQuestions.length;
  const keys = state.allQuestions.map(q => qKey(q.id));
  const mastered = keys.filter(k => (progress.mastery[k] || 0) >= 80).length;
  const mistakes = progress.mistakes.filter(k => keys.includes(k)).length;
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
  let pool = [...state.allQuestions];
  if (moduleFilter && moduleFilter !== 'all') {
    pool = pool.filter(q => q.module === parseInt(moduleFilter, 10));
  }
  switch (mode) {
    case 'mistakes':
      pool = pool.filter(q => progress.mistakes.includes(qKey(q.id)));
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
  if (!state.allQuestions.length) return;
  state.mode = mode;
  state.moduleFilter = moduleFilter;
  state.quizPool = buildQuestionPool(mode, moduleFilter);
  if (!state.quizPool.length) {
    alert(t('noQuestionsInBlock'));
    return;
  }
  state.currentIndex = 0;
  state.answers = [];
  state.selected = new Set();
  state.showFeedback = mode !== 'exam';
  state.timeLeft = 3600;

  const labels = { learn: 'modeLearn', practice: 'modePractice', exam: 'modeExam', mistakes: 'modeMistakes', weak: 'modeWeak', module: 'modeModule' };
  document.getElementById('quiz-mode-label').textContent = t(labels[mode] || 'modeLearn');
  document.getElementById('quiz-bank-label').textContent = examTitle(state.currentExam);

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
  const q = state.quizPool[state.currentIndex];
  if (!q) { finishQuiz(); return; }

  state.selected = new Set();

  document.getElementById('quiz-progress').textContent = `${state.currentIndex + 1} / ${state.quizPool.length}`;
  document.getElementById('progress-fill').style.width = `${(state.currentIndex / state.quizPool.length) * 100}%`;

  const modEl = document.getElementById('q-module');
  if (q.module) {
    modEl.textContent = t('moduleLabel', { n: q.module });
    modEl.className = `q-badge mod${q.module}`;
    modEl.classList.remove('hidden');
  } else {
    modEl.classList.add('hidden');
  }

  document.getElementById('q-topic').textContent = q.topic || '';

  const mastery = getMastery(q.id);
  const masteryEl = document.getElementById('q-mastery');
  masteryEl.textContent = t('mastery', { n: mastery });
  masteryEl.className = `q-badge mastery ${mastery >= 80 ? 'high' : mastery >= 40 ? 'mid' : 'low'}`;

  document.getElementById('q-text').textContent = getQuestionText(q);
  const altEl = document.getElementById('q-text-alt');
  const altLabel = document.getElementById('q-text-alt-label');
  const alt = getAltQuestionText(q);
  const showAlt = alt && alt !== getQuestionText(q);
  if (showAlt && currentLang() === 'de') {
    altLabel.textContent = t('examReference');
    altLabel.classList.remove('hidden');
  } else {
    altLabel.textContent = '';
    altLabel.classList.add('hidden');
  }
  altEl.textContent = showAlt ? alt : '';
  altEl.style.display = showAlt ? 'block' : 'none';

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
  const idx = parseInt(el.dataset.idx, 10);

  if (isMulti) {
    if (state.selected.has(idx)) { state.selected.delete(idx); el.classList.remove('selected'); }
    else {
      const qType = state.quizPool[state.currentIndex].type;
      const max = qType === 'ordering' ? state.quizPool[state.currentIndex].options.length : qType === 'multiple3' ? 3 : 2;
      if (state.selected.size < max) { state.selected.add(idx); el.classList.add('selected'); }
    }
  } else {
    document.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
    state.selected = new Set([idx]);
    el.classList.add('selected');
  }

  const q = state.quizPool[state.currentIndex];
  const required = q.type === 'ordering' ? q.options.length : q.type === 'multiple3' ? 3 : q.type === 'multiple' ? 2 : 1;
  document.getElementById('btn-check').disabled = state.selected.size < required;
}

function checkAnswer() {
  const q = state.quizPool[state.currentIndex];
  const correct = new Set(q.correct);
  const selected = state.selected;
  const isCorrect = correct.size === selected.size && [...selected].every(s => correct.has(s));

  state.answers.push({ id: q.id, correct: isCorrect, selected: [...selected] });
  updateMastery(q.id, isCorrect);

  document.querySelectorAll('.option').forEach(opt => {
    opt.classList.add('disabled');
    const idx = parseInt(opt.dataset.idx, 10);
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
    const isLast = state.currentIndex >= state.quizPool.length - 1;
    if (isLast) document.getElementById('btn-finish').classList.remove('hidden');
    else document.getElementById('btn-next').classList.remove('hidden');
  } else {
    if (state.currentIndex >= state.quizPool.length - 1) finishQuiz();
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

  const modules = {};
  state.answers.forEach(a => {
    const q = state.allQuestions.find(x => x.id === a.id);
    if (q && q.module) {
      if (!modules[q.module]) modules[q.module] = { c: 0, t: 0 };
      modules[q.module].t++;
      if (a.correct) modules[q.module].c++;
    }
  });

  document.getElementById('results-breakdown').innerHTML = Object.entries(modules)
    .filter(([, v]) => v.t > 0)
    .map(([mod, v]) => {
      const p = Math.round((v.c / v.t) * 100);
      return `<div class="result-module"><span>${t('moduleLabel', { n: mod })}</span><span>${v.c}/${v.t} (${p}%)</span></div>`;
    }).join('');

  const bankMistakes = progress.mistakes.filter(k => k.startsWith(state.currentExam.id + ':')).length;
  document.getElementById('btn-repeat-mistakes').style.display = bankMistakes > 0 ? 'block' : 'none';
  showScreen('screen-results');
  renderStats();
}

function initTheme() {
  document.documentElement.dataset.theme = localStorage.getItem(THEME_KEY) || 'light';
}

function toggleTheme() {
  const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = next;
  localStorage.setItem(THEME_KEY, next);
  document.getElementById('btn-theme').textContent = next === 'dark' ? '🌙' : '☀️';
}

function toggleLang() {
  window.appLang = window.appLang === 'de' ? 'en' : 'de';
  localStorage.setItem(LANG_KEY, window.appLang);
  applyI18n();
}

document.getElementById('btn-change-exam').addEventListener('click', () => {
  showScreen('screen-exams');
});

document.getElementById('btn-back-courses').addEventListener('click', () => showScreen('screen-courses'));
document.getElementById('btn-back-exams').addEventListener('click', () => showScreen('screen-exams'));

document.querySelectorAll('.mode-card').forEach(card => {
  card.addEventListener('click', () => {
    if (!state.currentExam) return;
    const mode = card.dataset.mode;
    if (mode === 'module') showScreen('screen-module');
    else startQuiz(mode);
  });
});

document.querySelectorAll('[data-back-home]').forEach(btn => {
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
initApp().then(() => applyI18n());
