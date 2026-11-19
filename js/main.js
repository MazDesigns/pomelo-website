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

// Home gallery strip: slow continuous loop, arrows, drag/swipe
const strip = document.querySelector('.strip');
if (strip) {
  const track = strip.querySelector('.strip-track');
  track.querySelectorAll('img').forEach(i => { i.loading = 'eager'; });
  const originals = [...track.children];
  // Duplicate the photos once so the loop is seamless
  originals.forEach(el => {
    const c = el.cloneNode(true);
    c.setAttribute('aria-hidden', 'true'); c.tabIndex = -1;
    track.appendChild(c);
  });

  const SPEED = 30;           // pixels per second for the auto-scroll
  const RESUME_AFTER = 4000;  // ms to wait after someone uses the arrows or drags
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let offset = 0, last = performance.now();
  let hovering = false, pausedUntil = 0, tween = null, drag = null;

  // Exact distance from the first photo to its copy, so the loop has no jump
  const loopWidth = () => track.children[originals.length].offsetLeft - originals[0].offsetLeft;
  const step = () => originals[0].getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 0);
  const wrap = x => { const w = loopWidth(); return ((x % w) + w) % w; };
  const render = () => { track.style.transform = `translate3d(${-wrap(offset)}px,0,0)`; };

  function frame(now) {
    const dt = Math.min(now - last, 100) / 1000; last = now;
    if (tween) {
      const t = Math.min((now - tween.start) / tween.dur, 1);
      const e = 1 - Math.pow(1 - t, 3); // ease-out
      offset = tween.from + (tween.to - tween.from) * e;
      if (t === 1) tween = null;
    } else if (!drag && !hovering && !reduceMotion && now > pausedUntil && !document.hidden) {
      offset += SPEED * dt;
    }
    render();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  function go(dir) {
    const from = tween ? tween.to : offset;
    tween = { from: offset, to: from + dir * step(), start: performance.now(), dur: 650 };
    pausedUntil = performance.now() + RESUME_AFTER;
  }
  strip.querySelector('.prev').addEventListener('click', () => go(-1));
  strip.querySelector('.next').addEventListener('click', () => go(1));

  // Pause while the mouse is over the photos (desktop only)
  strip.addEventListener('mouseenter', () => { hovering = true; });
  strip.addEventListener('mouseleave', () => { hovering = false; });

  // Drag with mouse or swipe with a finger
  let moved = false;
  strip.addEventListener('pointerdown', e => {
    if (e.target.closest('.strip-btn')) return;
    drag = { x: e.clientX, start: offset }; moved = false; tween = null;
  });
  addEventListener('pointermove', e => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (Math.abs(dx) > 5) { moved = true; strip.classList.add('dragging'); }
    offset = drag.start - dx;
  });
  addEventListener('pointerup', () => {
    if (!drag) return;
    drag = null; strip.classList.remove('dragging');
    pausedUntil = performance.now() + RESUME_AFTER;
  });
  // A drag shouldn't count as a click on the photo's link
  track.addEventListener('click', e => { if (moved) { e.preventDefault(); moved = false; } }, true);

  // Keyboard: arrow keys when the carousel has focus
  strip.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  });
}

// Footer year
document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());
