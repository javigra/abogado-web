/* Web de abogado/a — interacciones (sin dependencias) */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

  /* ---------- Cabecera: estado al hacer scroll ---------- */
  const header = $('[data-header]');
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menú móvil ---------- */
  const toggle = $('.nav-toggle');
  const panel = $('#mobile-panel');
  const overlay = $('[data-nav-overlay]');
  const focusables = () => $$('a[href], button:not([disabled])', panel);

  const openNav = () => {
    panel.classList.add('is-open');
    overlay.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');
    setTimeout(() => focusables()[0]?.focus(), 80);
  };
  const closeNav = (returnFocus = true) => {
    panel.classList.remove('is-open');
    overlay.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
    if (returnFocus) toggle.focus();
  };
  if (toggle && panel) {
    toggle.addEventListener('click', () => (panel.classList.contains('is-open') ? closeNav() : openNav()));
    overlay.addEventListener('click', () => closeNav());
    $('[data-nav-close]', panel).addEventListener('click', () => closeNav());
    panel.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') return closeNav();
      if (e.key !== 'Tab') return;
      const f = focusables();
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', (m) => m.matches && panel.classList.contains('is-open') && closeNav(false));
  }

  /* ---------- Aparición al hacer scroll ---------- */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Blog: filtro por categoría y búsqueda ---------- */
  const filterBox = $('[data-blog-filter]');
  if (filterBox) {
    const chips = $$('[data-filter]', filterBox);
    const search = $('[data-search]', filterBox);
    const items = $$('[data-post]');
    const count = $('[data-blog-count]');
    const empty = $('[data-blog-empty]');
    let cat = 'todas';

    const apply = () => {
      const q = norm(search.value);
      let visible = 0;
      items.forEach((it, i) => {
        const show = (cat === 'todas' || it.dataset.category === cat) && (!q || it.dataset.text.includes(q));
        it.hidden = !show;
        if (show) visible++;
        it.classList.toggle('is-featured', show && visible === 1 && cat === 'todas' && !q);
      });
      count.textContent = visible === 1 ? '1 artículo' : `${visible} artículos`;
      empty.hidden = visible > 0;
    };
    const setCat = (value) => {
      cat = value;
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.filter === value)));
      apply();
    };
    chips.forEach((c) => c.addEventListener('click', () => setCat(c.dataset.filter)));
    search.addEventListener('input', apply);

    const initial = new URLSearchParams(location.search).get('categoria');
    if (initial && chips.some((c) => c.dataset.filter === norm(initial))) setCat(norm(initial));
  }

  /* ---------- Compartir: copiar enlace ---------- */
  const copyBtn = $('[data-copy-link]');
  if (copyBtn) {
    const fb = $('[data-copy-feedback]');
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(location.href);
        fb.textContent = 'Enlace copiado';
      } catch {
        fb.textContent = 'No se pudo copiar el enlace';
      }
      setTimeout(() => (fb.textContent = ''), 2500);
    });
  }

  /* ---------- Formulario de contacto ---------- */
  const form = $('[data-contact-form]');
  if (form) {
    const status = $('[data-form-status]');
    const rules = {
      nombre: (v) => (v.trim().length >= 2 ? '' : 'Indique su nombre.'),
      email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Introduzca un email válido, por ejemplo nombre@dominio.es.'),
      telefono: (v) => (!v.trim() || /^[+\d][\d\s().-]{6,}$/.test(v.trim()) ? '' : 'Introduzca un teléfono válido.'),
      asunto: (v) => (v ? '' : 'Seleccione el asunto de su consulta.'),
      mensaje: (v) => (v.trim().length >= 10 ? '' : 'Cuéntenos brevemente su caso (mínimo 10 caracteres).'),
      privacidad: (_, el) => (el.checked ? '' : 'Debe aceptar la Política de privacidad para enviar el formulario.'),
    };
    const validate = (el) => {
      const msg = rules[el.name] ? rules[el.name](el.value, el) : '';
      const err = $(`#e-${el.name}`);
      el.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (err) err.textContent = msg;
      return !msg;
    };
    Object.keys(rules).forEach((name) => {
      const el = form.elements[name];
      el.addEventListener('blur', () => el.getAttribute('aria-invalid') !== null && validate(el));
      el.addEventListener('input', () => el.getAttribute('aria-invalid') === 'true' && validate(el));
      el.addEventListener('change', () => el.getAttribute('aria-invalid') === 'true' && validate(el));
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fields = Object.keys(rules).map((n) => form.elements[n]);
      const invalid = fields.filter((el) => !validate(el));
      if (invalid.length) {
        status.innerHTML = '<p class="alert alert-error">Revise los campos marcados para poder enviar su mensaje.</p>';
        invalid[0].focus();
        return;
      }
      if (form.elements.web.value) return; // honeypot

      const btn = form.querySelector('[type="submit"]');
      btn.disabled = true;
      const ok = () => {
        form.reset();
        fields.forEach((el) => el.removeAttribute('aria-invalid'));
        status.innerHTML = '<p class="alert alert-success"><strong>Gracias por su mensaje.</strong> Le responderé en menos de 24 horas laborables.</p>';
      };
      try {
        if (form.action.includes('%5B') || form.action.includes('[')) {
          await new Promise((r) => setTimeout(r, 600)); // Modo demostración: endpoint sin configurar
          ok();
        } else {
          const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
          if (!res.ok) throw new Error();
          ok();
        }
      } catch {
        status.innerHTML = '<p class="alert alert-error">No se ha podido enviar el mensaje. Inténtelo de nuevo o escríbame directamente por email.</p>';
      } finally {
        btn.disabled = false;
      }
    });
  }

  /* ---------- Consentimiento de cookies ---------- */
  const KEY = 'cookie-consent';
  const banner = $('[data-cookie-banner]');
  const dialog = $('[data-cookie-dialog]');
  const read = () => {
    try {
      const c = JSON.parse(localStorage.getItem(KEY));
      if (c && Date.now() - c.fecha < 365 * 864e5) return c; // validez: 12 meses
    } catch {}
    return null;
  };
  const write = (c) => {
    const data = { necesarias: true, analiticas: !!c.analiticas, terceros: !!c.terceros, fecha: Date.now() };
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch {}
    return data;
  };

  const loadMap = () => {
    const box = $('[data-map]');
    if (!box || box.querySelector('iframe')) return;
    const f = document.createElement('iframe');
    f.src = `https://www.google.com/maps?q=${encodeURIComponent(box.dataset.mapQuery)}&output=embed`;
    f.title = 'Mapa con la ubicación del despacho';
    f.loading = 'lazy';
    f.referrerPolicy = 'no-referrer-when-downgrade';
    box.appendChild(f);
  };
  const apply = (c) => {
    if (!c) return;
    if (c.terceros) loadMap();
    if (c.analiticas) {
      /* Inserte aquí la carga de su herramienta de analítica (p. ej. Google Analytics). */
    }
  };
  const decide = (c) => {
    apply(write(c));
    if (banner) banner.hidden = true;
    if (dialog?.open) dialog.close();
  };
  const openSettings = () => {
    const c = read() || {};
    $('#ck-analiticas').checked = !!c.analiticas;
    $('#ck-terceros').checked = !!c.terceros;
    dialog.showModal();
  };

  if (banner && dialog) {
    const current = read();
    if (current) apply(current);
    else banner.hidden = false;

    document.addEventListener('click', (e) => {
      const t = e.target.closest('[data-cookie], [data-cookie-settings], [data-map-load]');
      if (!t) return;
      if (t.matches('[data-cookie-settings]')) return openSettings();
      if (t.matches('[data-map-load]')) return decide({ ...(read() || {}), terceros: true });
      switch (t.dataset.cookie) {
        case 'accept': return decide({ analiticas: true, terceros: true });
        case 'reject': return decide({ analiticas: false, terceros: false });
        case 'config': return openSettings();
        case 'save': return decide({ analiticas: $('#ck-analiticas').checked, terceros: $('#ck-terceros').checked });
        case 'close': return dialog.close();
      }
    });
  }
})();
