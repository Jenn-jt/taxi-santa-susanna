/* ============================================================
   nav.js — Header + menú + drawer compartido para todas las páginas
   Uso en cada página:
     1) Donde quieras el header:  <div id="site-header"></div>
     2) Antes de </body>:         <script src="nav.js"></script>
   Detecta sola la página activa y monta el menú móvil (hamburguesa).
   ============================================================ */
(function () {
  // Página actual (nombre de archivo)
  var current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (current === '') current = 'index.html';

  // Items del menú (un solo sitio para cambiarlos)
  var ITEMS = [
    { href: 'index.html',                 label: 'Inicio' },
    { href: 'quienes-somos.html',         label: 'Nosotros' },
    { href: 'tarifas.html',               label: 'Tarifas' },
    { href: 'hoteles.html',               label: 'Hoteles' },
    { href: 'empresa.html',               label: 'Empresas' },
    { href: 'preguntas-frecuentes.html',  label: 'Ayuda' }
  ];

  function links() {
    return ITEMS.map(function (it) {
      var active = (it.href.toLowerCase() === current) ? ' class="active"' : '';
      return '<a href="' + it.href + '"' + active + '>' + it.label + '</a>';
    }).join('\n    ');
  }

  var PHONE = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>';
  var GLOBE = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>';

  var html =
  '<nav class="nav" aria-label="Navegación principal">' +
    '<div class="logo">' +
      '<a href="index.html" class="logo-link">' +
        '<img src="images/logo.png" alt="Taxi Santa Susanna - Taxi oficial 24/7" class="logo-official">' +
      '</a>' +
    '</div>' +
    '<div class="menu">' + links() + '</div>' +
    '<a class="nav-call" href="tel:+34937678571" aria-label="Llamar a Taxi Santa Susanna">' +
      '<span class="nav-call-ico">' + PHONE + '</span>' +
      '<span class="nav-call-text"><span class="nav-call-label">Taxi ya</span><span class="nav-call-num">+34 937 67 85 71</span></span>' +
    '</a>' +
    '<div class="lang">' + GLOBE + ' ES <svg class="lang-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></div>' +
    '<button class="nav-hamburger" id="nav-hamburger" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav-drawer">' +
      '<svg class="icon-open" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>' +
      '<svg class="icon-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>' +
    '</button>' +
  '</nav>' +
  '<div class="nav-drawer-overlay" id="nav-drawer-overlay" aria-hidden="true"></div>' +
  '<aside class="nav-drawer" id="nav-drawer" aria-hidden="true" aria-label="Menú móvil">' +
    '<button class="nav-drawer-close" type="button" aria-label="Cerrar menú"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>' +
    '<nav class="nav-drawer-menu" aria-label="Navegación móvil">' + links() + '</nav>' +
    '<div class="nav-drawer-divider"></div>' +
    '<a class="nav-drawer-cta" href="tel:+34937678571"><span class="nav-drawer-cta-ico">' + PHONE + '</span><span class="nav-drawer-cta-text"><span class="nav-drawer-cta-label">Taxi ya 24/7</span><span class="nav-drawer-cta-num">+34 937 67 85 71</span></span></a>' +
    '<span class="nav-drawer-lang">' + GLOBE + ' Español</span>' +
  '</aside>';

  // Inyectar en el placeholder
  var holder = document.getElementById('site-header');
  if (holder) {
    holder.outerHTML = html;
  } else {
    // Fallback: insertar al principio del body
    document.body.insertAdjacentHTML('afterbegin', html);
  }

  // ----- Comportamiento de scroll -----
  var nav = document.querySelector('.nav');
  if (nav) {
    var upd = function () {
      if (window.scrollY > 40) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    upd();
    window.addEventListener('scroll', upd, { passive: true });
  }

  // ----- Drawer móvil -----
  var hamburger = document.getElementById('nav-hamburger');
  var drawer = document.getElementById('nav-drawer');
  var overlay = document.getElementById('nav-drawer-overlay');
  if (hamburger && drawer && overlay) {
    var closeBtn = drawer.querySelector('.nav-drawer-close');
    var dlinks = drawer.querySelectorAll('.nav-drawer-menu a, .nav-drawer-cta');
    function open() {
      drawer.classList.add('is-open');
      overlay.classList.add('is-open');
      hamburger.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.classList.add('nav-drawer-active');
    }
    function close() {
      drawer.classList.remove('is-open');
      overlay.classList.remove('is-open');
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('nav-drawer-active');
    }
    hamburger.addEventListener('click', function () {
      if (drawer.classList.contains('is-open')) close(); else open();
    });
    if (closeBtn) closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', close);
    dlinks.forEach(function (l) { l.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) close();
    });
  }
})();
