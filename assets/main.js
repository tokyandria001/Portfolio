document.addEventListener('DOMContentLoaded', function () {

  var isSubPage = window.location.pathname.includes('/pages/');
  var ROOT = isSubPage ? '../' : './';

  var PAGES = {
    home:       ROOT + 'index.html',
    about:      ROOT + 'pages/about.html',
    experience: ROOT + 'pages/experience.html',
    projects:   ROOT + 'pages/projects.html',
    education:  ROOT + 'pages/education.html',
    contact:    ROOT + 'pages/contact.html',
  };

  var currentId = document.body.dataset.page || 'home';

  // ── CURSOR ──────────────────────────────────────
  var cursor = document.getElementById('cursor');
  var circle = document.getElementById('cursor-circle');
  if (cursor && circle) {
    document.addEventListener('mousemove', function (e) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
      setTimeout(function () {
        circle.style.left = e.clientX + 'px';
        circle.style.top  = e.clientY + 'px';
      }, 75);
    });
  }

  // ── HAMBURGER ───────────────────────────────────
  var btn    = document.getElementById('nav-hamburger');
  var drawer = document.getElementById('nav-drawer');

  if (btn && drawer) {

    // Remplir le drawer avec les liens
    var navLinks = [
      { page: 'home',       label: 'Accueil' },
      { page: 'about',      label: 'Profil' },
      { page: 'experience', label: 'Expérience' },
      { page: 'education',  label: 'Formation' },
      { page: 'contact',    label: 'Contact' },
    ];
    navLinks.forEach(function (item) {
      var a = document.createElement('a');
      a.href = PAGES[item.page];
      a.textContent = item.label;
      if (item.page === currentId) a.className = 'active';
      drawer.appendChild(a);
    });

    var isOpen = false;

    function openDrawer() {
      isOpen = true;
      btn.classList.add('open');
      drawer.style.display = 'flex';
      // petit délai pour que le navigateur enregistre display:flex avant la transition
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          drawer.classList.add('open');
        });
      });
    }

    function closeDrawer() {
      isOpen = false;
      btn.classList.remove('open');
      drawer.classList.remove('open');
      setTimeout(function () {
        if (!isOpen) drawer.style.display = 'none';
      }, 280);
    }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    // Fermer en cliquant en dehors — avec délai pour éviter le conflit
    document.addEventListener('click', function (e) {
      if (isOpen && !drawer.contains(e.target) && !btn.contains(e.target)) {
        closeDrawer();
      }
    });
  }

  // ── ACTIVE NAV ──────────────────────────────────
  document.querySelectorAll('nav a[data-page]').forEach(function (a) {
    if (a.dataset.page === currentId) a.classList.add('active');
  });

  // ── PAGE TRANSITIONS ────────────────────────────
  var curtain = document.getElementById('curtain');

  function navigateTo(url) {
    if (!curtain) { window.location.href = url; return; }
    curtain.style.transition = 'transform .42s cubic-bezier(.77,0,.18,1)';
    curtain.style.transformOrigin = 'left';
    curtain.style.transform = 'scaleX(1)';
    curtain.addEventListener('transitionend', function () {
      window.location.href = url;
    }, { once: true });
  }

  document.querySelectorAll('nav a[data-page]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      navigateTo(a.href);
    });
  });

  // ── OUVERTURE CURTAIN ───────────────────────────
  if (curtain) {
    curtain.getBoundingClientRect();
    curtain.style.transition = 'transform .52s cubic-bezier(.77,0,.18,1)';
    curtain.style.transformOrigin = 'right';
    curtain.style.transform = 'scaleX(0)';
  }

  // ── STAGGER REVEAL ──────────────────────────────
  document.querySelectorAll('.reveal').forEach(function (el, i) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    setTimeout(function () {
      el.style.transition = 'opacity .6s ease, transform .6s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 120 + i * 80);
  });

  // ── DARK MODE ───────────────────────────────────
  var DARK_KEY = 'portfolio-dark';
  var isDark = localStorage.getItem(DARK_KEY) === 'true';
  if (isDark) document.body.classList.add('dark-mode');

  function buildDarkToggle() {
    var nav = document.querySelector('nav');
    if (!nav) return;
    var btn = document.createElement('button');
    btn.className = 'dark-toggle';
    btn.setAttribute('aria-label', 'Toggle dark mode');
    btn.innerHTML = isDark
      ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
      : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
    btn.addEventListener('click', function () {
      isDark = !isDark;
      document.body.classList.toggle('dark-mode', isDark);
      localStorage.setItem(DARK_KEY, isDark);
      btn.innerHTML = isDark
        ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
        : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
    });
    var hamburger = nav.querySelector('.nav-hamburger');
    hamburger ? nav.insertBefore(btn, hamburger) : nav.appendChild(btn);
  }
  buildDarkToggle();

  // ── CONTACT FORM ────────────────────────────────
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var submitBtn = form.querySelector('.form-submit');
      var feedback = document.getElementById('form-feedback');
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');
      feedback.className = 'form-feedback';
      feedback.textContent = '';

      emailjs.sendForm(
        'service_wsoc2hu',   // ← remplacer par ton Service ID EmailJS
        'template_30xes37',  // ← remplacer par ton Template ID EmailJS
        form
      ).then(function () {
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        feedback.className = 'form-feedback success';
        feedback.textContent = form.dataset.msgOk || 'Message envoyé !';
        form.reset();
      }, function (err) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        feedback.className = 'form-feedback error';
        feedback.textContent = form.dataset.msgErr || 'Une erreur est survenue, réessayez.';
        console.error('EmailJS error:', err);
      });
    });
  }

});
