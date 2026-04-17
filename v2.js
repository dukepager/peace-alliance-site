// ── Navigation ──────────────────────────────────
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const page = document.getElementById('page-' + name);
  if (page) page.classList.add('active');
  document.querySelectorAll(`.nav-links [data-page="${name}"]`).forEach(a => a.classList.add('active'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('click', e => {
  const el = e.target.closest('[data-page]');
  if (el) { e.preventDefault(); showPage(el.dataset.page); }
});

// ── Slideshow ───────────────────────────────────
function initSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.dot');
  if (!slides.length) return;
  let current = 0;

  function goTo(i) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = i;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }

  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
  setInterval(() => goTo((current + 1) % slides.length), 5000);
}

// ── Forms ───────────────────────────────────────
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyk5QRWvB9cUatNm8IrzYfpvjQYhY5tsOeCF1fHtp_dWDScb7G-P2e01oBAQQvwnTZO/exec';

function submitForm(e, type) {
  e.preventDefault();
  const form = e.target;
  const toast = document.getElementById('toast');
  const data = new FormData(form);
  data.append('formType', type);

  fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    body: data
  });

  toast.textContent = type === 'consultation'
    ? '✅ Consultation request sent! We\'ll call you within 24 hours.'
    : '✅ Message sent! We\'ll be in touch soon.';
  toast.classList.add('show');
  form.reset();
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// ── Hamburger Menu ──────────────────────────────
function initHamburger() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  });
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
    });
  });
}

// Init
showPage('home');
initSlideshow();
initHamburger();
