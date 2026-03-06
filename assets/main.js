document.addEventListener('DOMContentLoaded', function () {

  var isSubPage = window.location.pathname.includes('/pages/');
  var ROOT = isSubPage ? '../' : './';

  var PAGES = {
    home:       ROOT + 'index.html',
    about:      ROOT + 'pages/about.html',
    experience: ROOT + 'pages/experience.html',
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

});
