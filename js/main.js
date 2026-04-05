document.addEventListener('DOMContentLoaded', () => {

  // --- Language Toggle ---
  const langButtons = document.querySelectorAll('.lang-toggle button');
  const bilingualElements = document.querySelectorAll('[data-al]');

  function setLanguage(lang) {
    localStorage.setItem('missOlympia-lang', lang);
    langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    bilingualElements.forEach(el => {
      const text = el.getAttribute('data-' + lang);
      if (text) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = text;
        } else {
          el.textContent = text;
        }
      }
    });
  }

  const savedLang = localStorage.getItem('missOlympia-lang') || 'al';
  setLanguage(savedLang);

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  // --- Mobile Menu ---
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Navbar Scroll Effect (homepage only) ---
  const navbar = document.getElementById('navbar');

  if (navbar && !navbar.classList.contains('page-nav')) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // --- Scroll Animations ---
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    fadeElements.forEach(el => observer.observe(el));
  }

  // --- Shop Filters ---
  const filterBar = document.getElementById('filterBar');
  const productGrid = document.getElementById('productGrid');

  if (filterBar && productGrid) {
    const pills = filterBar.querySelectorAll('.filter-pill');
    const cards = productGrid.querySelectorAll('.product-card');

    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const filter = pill.dataset.filter;

        cards.forEach(card => {
          if (filter === 'all' || card.dataset.gender === filter) {
            card.style.display = '';
            requestAnimationFrame(() => {
              card.classList.remove('visible');
              requestAnimationFrame(() => card.classList.add('visible'));
            });
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

});
