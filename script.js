/* ===========================
   script.js — Shared JS
   =========================== */

/* ── Countdown Timer ── */
(function initCountdown() {
  const cdEl = document.getElementById('countdown');
  if (!cdEl) return;

  // Target: 90 days from now (update to your real launch date)
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 90);
  launchDate.setHours(0, 0, 0, 0);

  const days    = document.getElementById('cd-days');
  const hours   = document.getElementById('cd-hours');
  const minutes = document.getElementById('cd-minutes');
  const seconds = document.getElementById('cd-seconds');

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function flash(el) {
    el.classList.add('flip');
    setTimeout(() => el.classList.remove('flip'), 300);
  }

  let prevSec = -1;

  function tick() {
    const now  = Date.now();
    const diff = launchDate - now;

    if (diff <= 0) {
      days.textContent    = '00';
      hours.textContent   = '00';
      minutes.textContent = '00';
      seconds.textContent = '00';
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000)  / 60000);
    const s = Math.floor((diff % 60000)    / 1000);

    days.textContent    = pad(d);
    hours.textContent   = pad(h);
    minutes.textContent = pad(m);

    if (s !== prevSec) {
      seconds.textContent = pad(s);
      flash(seconds);
      prevSec = s;
    }
  }

  tick();
  setInterval(tick, 500);
})();


/* ── Email Subscription Form ── */
(function initSubscribeForm() {
  const form    = document.getElementById('subscribeForm');
  const success = document.getElementById('subscribeSuccess');
  const input   = document.getElementById('emailInput');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      input.style.borderColor = 'var(--red)';
      input.style.boxShadow   = '0 0 0 3px rgba(239,58,68,0.18)';
      input.focus();
      return;
    }

    // Reset error state
    input.style.borderColor = '';
    input.style.boxShadow   = '';

    // Here you would normally POST to your API
    // fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) })

    // Show success
    form.hidden    = true;
    success.hidden = false;

    console.log('[nusacerdas.id] Subscribed:', email);
  });

  input.addEventListener('input', function () {
    input.style.borderColor = '';
    input.style.boxShadow   = '';
  });
})();


/* ── Nav scroll effect ── */
(function initNav() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(function () {
        if (window.scrollY > 20) {
          nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
        } else {
          nav.style.boxShadow = 'none';
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();
