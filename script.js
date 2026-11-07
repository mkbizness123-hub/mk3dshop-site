// ========================================
// MK3DShop — Interactive scripts
// ========================================

(function() {
  'use strict';

  // ----------------------------------------
  // Language toggle (LV / EN)
  // ----------------------------------------
  const STORAGE_KEY = 'mk3dshop-lang';
  const DEFAULT_LANG = 'lv';

  function getCurrentLang() {
    try {
      return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    } catch (e) {
      return DEFAULT_LANG;
    }
  }

  function setLang(lang) {
    document.documentElement.lang = lang;
    document.title = lang === 'lv'
      ? 'MK3DShop — Personalizēti 3D drukāti auto galda organizatori'
      : 'MK3DShop — Custom 3D Printed Car Desk Organizers';

    // Swap all elements with data-lv / data-en
    document.querySelectorAll('[data-lv][data-en]').forEach(el => {
      const content = el.getAttribute(`data-${lang}`);
      if (content) el.textContent = content;
    });

    // Update toggle appearance
    const toggle = document.getElementById('langToggle');
    if (toggle) {
      const active = toggle.querySelector('.lang-active');
      const inactive = toggle.querySelector('.lang-inactive');
      if (lang === 'lv') {
        active.textContent = 'LV';
        inactive.textContent = 'EN';
      } else {
        active.textContent = 'EN';
        inactive.textContent = 'LV';
      }
    }

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      // localStorage not available — keep going
    }
  }

  function initLangToggle() {
    const toggle = document.getElementById('langToggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
      const current = getCurrentLang();
      const next = current === 'lv' ? 'en' : 'lv';
      setLang(next);
    });

    // Apply saved language on load
    setLang(getCurrentLang());
  }

  // ----------------------------------------
  // Smooth scroll for anchor links
  // ----------------------------------------
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offset = 80; // nav height
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  // ----------------------------------------
  // Contact form handler
  // ----------------------------------------
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const status = document.getElementById('formStatus');
    const action = form.getAttribute('action') || '';

    form.addEventListener('submit', async (e) => {
      // If the action is still the placeholder, don't actually submit
      if (action.includes('YOUR_FORM_ID')) {
        e.preventDefault();
        const lang = getCurrentLang();
        status.className = 'form-status error';
        status.textContent = lang === 'lv'
          ? 'Forma vēl nav pievienota — konfigurē Formspree action URL script.js vai index.html.'
          : 'Form not configured yet — set your Formspree action URL in index.html.';
        return;
      }

      e.preventDefault();
      const lang = getCurrentLang();
      status.className = 'form-status';
      status.textContent = lang === 'lv' ? 'Sūta…' : 'Sending…';

      try {
        const response = await fetch(action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          form.reset();
          status.className = 'form-status success';
          status.textContent = lang === 'lv'
            ? 'Paldies! Ziņa nosūtīta — atbildēsim 24 stundu laikā.'
            : 'Thanks! Message sent — we\'ll reply within 24 hours.';
        } else {
          throw new Error('Submission failed');
        }
      } catch (err) {
        status.className = 'form-status error';
        status.textContent = lang === 'lv'
          ? 'Kļūda sūtot. Lūdzu raksti tieši uz hello@mk3dshop.lv'
          : 'Error sending. Please email hello@mk3dshop.lv directly.';
      }
    });
  }

  // ----------------------------------------
  // Footer year
  // ----------------------------------------
  function initFooterYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  // ----------------------------------------
  // Intersection observer for fade-in animations
  // ----------------------------------------
  function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.product-card, .b2b-card, .feature').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.6s ease ${i * 0.05}s, transform 0.6s ease ${i * 0.05}s`;
      observer.observe(el);
    });
  }

  // ----------------------------------------
  // Init everything on DOM ready
  // ----------------------------------------
  function init() {
    initLangToggle();
    initSmoothScroll();
    initContactForm();
    initFooterYear();
    initScrollAnimations();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
