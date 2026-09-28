const pages = new Set(['home', 'course', 'library', 'quiz', 'project', 'report', 'marking', 'account']);

function showPage() {
  const [requested = 'home', moduleNumber] = location.hash.slice(1).split('/');
  const page = pages.has(requested) ? requested : 'home';
  document.querySelectorAll('.site-view').forEach(view => {
    view.hidden = view.id !== `view-${page}`;
  });
  document.querySelectorAll('#main-nav a, .account-link').forEach(link => {
    const active = link.getAttribute('href') === `#${page}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  document.title = `${page === 'home' ? 'Home' : page[0].toUpperCase() + page.slice(1)} — DASE4122`;
  if (page === 'course' && /^[1-8]$/.test(moduleNumber || '')) {
    const detail = document.querySelectorAll('#view-course .module-detail')[Number(moduleNumber) - 1];
    detail.open = true;
    requestAnimationFrame(() => detail.scrollIntoView({ block: 'start' }));
  } else {
    window.scrollTo(0, 0);
  }
}

window.addEventListener('hashchange', showPage);
showPage();

const libraryCards = [...document.querySelectorAll('#library-cards .concept-card')];
const libraryQuery = document.querySelector('#library-query');
const libraryCategory = document.querySelector('#library-category');

function filterLibrary() {
  const query = libraryQuery.value.trim().toLocaleLowerCase();
  const category = libraryCategory.value;
  let visible = 0;
  for (const card of libraryCards) {
    card.hidden = (category && card.dataset.category !== category) || !card.textContent.toLocaleLowerCase().includes(query);
    if (!card.hidden) visible++;
  }
  document.querySelector('#library-count').textContent = `${visible} sample concept${visible === 1 ? '' : 's'}`;
  document.querySelector('#library-empty').hidden = visible !== 0;
}

libraryQuery.addEventListener('input', filterLibrary);
libraryCategory.addEventListener('change', filterLibrary);
document.querySelector('#library-clear').addEventListener('click', () => {
  libraryQuery.value = '';
  libraryCategory.value = '';
  filterLibrary();
  libraryQuery.focus();
});
filterLibrary();

const quizCards = [...document.querySelectorAll('#quiz-questions .question-card')];
function generateQuiz() {
  const topic = document.querySelector('#quiz-topic').value;
  const count = Number(document.querySelector('#quiz-count').value);
  const mode = document.querySelector('#quiz-mode').value;
  const candidates = quizCards.filter(card => !topic || card.dataset.topic === topic);
  if (mode === 'random') {
    for (let i = candidates.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
    }
  }
  const selected = candidates.slice(0, count);
  quizCards.forEach(card => { card.hidden = !selected.includes(card); });
  document.querySelector('#quiz-empty').hidden = selected.length !== 0;
  document.querySelector('#quiz-selection-note').textContent = mode === 'random'
    ? `Showing ${selected.length} random sample question${selected.length === 1 ? '' : 's'}. Answers remain on this device.`
    : `Showing ${selected.length} sample question${selected.length === 1 ? '' : 's'}. Real adaptive selection needs learner history and a backend.`;
}

document.querySelector('#generate-quiz').addEventListener('click', generateQuiz);
document.querySelectorAll('.reveal-answer').forEach(button => {
  button.addEventListener('click', () => {
    const feedback = button.nextElementSibling;
    feedback.hidden = !feedback.hidden;
    button.textContent = feedback.hidden ? 'Show sample feedback' : 'Hide sample feedback';
  });
});
generateQuiz();

document.querySelector('#project-form').addEventListener('submit', event => {
  event.preventDefault();
  const fields = new FormData(event.currentTarget);
  const preview = document.querySelector('#project-preview');
  preview.textContent = `Preview only — ${fields.get('full_name')} (${fields.get('student_id')}) · Group ${fields.get('group_num')} · ${fields.get('topic')}. Nothing was submitted or saved.`;
  preview.hidden = false;
});

document.querySelector('#report-form').addEventListener('submit', event => {
  event.preventDefault();
  const file = document.querySelector('#report-file').files[0];
  if (!file) return;
  const preview = document.querySelector('#report-preview');
  preview.textContent = file.size > 30 * 1024 * 1024
    ? 'The full site accepts files up to 30 MB. Choose a smaller file for this preview.'
    : `Preview only — ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB). The file remains on your device; nothing was uploaded.`;
  preview.hidden = false;
});

document.querySelector('#marking-form').addEventListener('submit', event => {
  event.preventDefault();
  const scores = [...event.currentTarget.querySelectorAll('.mark-input')]
    .filter(input => input.value !== '')
    .map(input => Number(input.value));
  const preview = document.querySelector('#marking-preview');
  preview.textContent = scores.length
    ? `Preview only — ${scores.length} score${scores.length === 1 ? '' : 's'} entered, average ${(scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(1)} / 10. Nothing was saved.`
    : 'Enter at least one score to preview the result.';
  preview.hidden = false;
});
