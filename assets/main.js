/* ═══════════════════════════════════════
   PORTFOLIO — Toky Andrianjafy
   Navigation · Transitions · Cursor
═══════════════════════════════════════ */

(function () {
  'use strict';

  // ── DETECT ROOT PATH ─────────────────────────────
  // Works from both root (index.html) and /pages/*.html
  const isSubPage = window.location.pathname.includes('/pages/');
  const ROOT = isSubPage ? '../' : './';

  // ── PAGE MAP ─────────────────────────────────────
  const PAGES = {
    home:       ROOT + 'index.html',
    about:      ROOT + 'pages/about.html',
    experience: ROOT + 'pages/experience.html',
    education:  ROOT + 'pages/education.html',
    contact:    ROOT + 'pages/contact.html',
  };

  // Determine current page id from body data attribute
  const currentId = document.body.dataset.page || 'home';

  // ── CURSOR ───────────────────────────────────────
  const cursor = document.getElementById('cursor');
  const circle = document.getElementById('cursor-circle');

  if (cursor && circle) {
    let mx = 0, my = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
      setTimeout(() => {
        circle.style.left = mx + 'px';
        circle.style.top  = my + 'px';
      }, 75);
    });

    const hoverEls = document.querySelectorAll('a, button, .skill-list li, .edu-entry, .contact-line, .tl-entry');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width  = '14px';
        cursor.style.height = '14px';
        cursor.style.background = 'var(--or)';
        circle.style.width  = '48px';
        circle.style.height = '48px';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width  = '8px';
        cursor.style.height = '8px';
        cursor.style.background = 'var(--noir)';
        circle.style.width  = '36px';
        circle.style.height = '36px';
      });
    });
  }

  // ── MARK ACTIVE NAV LINK ──────────────────────────
  document.querySelectorAll('nav a[data-page]').forEach(a => {
    if (a.dataset.page === currentId) a.classList.add('active');
  });

  // ── PAGE TRANSITIONS ──────────────────────────────
  const curtain = document.getElementById('curtain');

  function navigateTo(targetId) {
    if (targetId === currentId) return;
    const url = PAGES[targetId];
    if (!url) return;

    // Close curtain from left, THEN navigate — no overlap
    curtain.style.transition = 'transform .42s cubic-bezier(.77,0,.18,1)';
    curtain.style.transformOrigin = 'left';
    curtain.style.transform = 'scaleX(1)';

    // Navigate only after transition is fully done
    curtain.addEventListener('transitionend', () => {
      window.location.href = url;
    }, { once: true });
  }

  // Intercept nav clicks
  document.querySelectorAll('a[data-page]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      navigateTo(a.dataset.page);
    });
  });

  // ── ENTRANCE ANIMATION ────────────────────────────
  // Curtain starts closed (scaleX:1 in CSS). Open it after first paint.
  window.addEventListener('DOMContentLoaded', () => {
    if (!curtain) return;
    // Force a reflow so the browser registers the closed state before animating
    curtain.getBoundingClientRect();
    curtain.style.transition = 'transform .52s cubic-bezier(.77,0,.18,1)';
    curtain.style.transformOrigin = 'right';
    curtain.style.transform = 'scaleX(0)';
  });

  // ── STAGGER REVEAL ────────────────────────────────
  window.addEventListener('load', () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      setTimeout(() => {
        el.style.transition = 'opacity .6s ease, transform .6s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 120 + i * 80);
    });
  });

})();