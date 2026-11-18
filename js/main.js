// Mobile menu
const btn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
if (btn) btn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
});

// Show a labelled grey placeholder for any image not yet added to /images
document.querySelectorAll('.ph img').forEach(img => {
  const mark = () => img.parentElement.classList.add('missing');
  const ok = () => img.parentElement.classList.remove('missing');
  if (img.complete && img.naturalWidth === 0) mark();
  img.addEventListener('error', () => { img.style.visibility = 'hidden'; mark(); });
  img.addEventListener('load', ok);
});

// Lightbox (gallery page)
const lb = document.querySelector('.lightbox');
if (lb) {
  const lbImg = lb.querySelector('img');
  document.querySelectorAll('.project-grid .ph').forEach(el => {
    el.addEventListener('click', () => {
      const src = el.querySelector('img');
      if (el.classList.contains('missing')) return;
      lbImg.src = src.src; lbImg.alt = src.alt;
      lb.classList.add('open');
    });
  });
  const close = () => lb.classList.remove('open');
  lb.addEventListener('click', e => { if (e.target !== lbImg) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

// Footer year
document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());
