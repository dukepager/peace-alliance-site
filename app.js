// ── Page navigation ─────────────────────────────
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(a => a.classList.remove('active'));

  const page = document.getElementById('page-' + name);
  if (page) page.classList.add('active');

  document.querySelectorAll(`[data-page="${name}"]`).forEach(a => {
    if (a.classList.contains('nav-link')) a.classList.add('active');
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Delegate all [data-page] clicks
document.addEventListener('click', e => {
  const el = e.target.closest('[data-page]');
  if (el) {
    e.preventDefault();
    showPage(el.dataset.page);
  }
});

// ── Form submissions ─────────────────────────────
function submitForm(e, type) {
  e.preventDefault();
  const toast = document.getElementById('toast');
  if (type === 'consultation') {
    toast.textContent = "✅ Consultation request sent! We'll call you within 24 hours.";
  } else {
    toast.textContent = "✅ Message sent! We'll be in touch soon. 💜";
  }
  toast.classList.add('show');
  e.target.reset();
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// Init
showPage('home');
