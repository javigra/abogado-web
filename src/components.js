const site = require('./config');
const { icon } = require('./icons');

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Ruta relativa a la raíz según la profundidad de la página (funciona en cualquier subcarpeta). */
const baseFor = (path) => {
  const depth = path.split('/').filter(Boolean).length;
  return depth ? '../'.repeat(depth) : './';
};

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const fecha = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} de ${MESES[m - 1]} de ${y}`;
};

const NAV = [
  { key: 'inicio', label: 'Inicio', href: '' },
  { key: 'servicios', label: 'Servicios', href: 'servicios/' },
  { key: 'quien-soy', label: 'Quién soy', href: 'quien-soy/' },
  { key: 'blog', label: 'Blog', href: 'blog/' },
  { key: 'contacto', label: 'Contacto', href: 'contacto/' },
];

/* ---------- Marca ---------- */
const brand = (b, cls = '') => `
<a class="brand ${cls}" href="${b}" aria-label="${esc(site.nombre)} — ${site.profesion}, ir a la página de inicio">
  <span class="brand-mark" aria-hidden="true">${esc(site.iniciales)}</span>
  <span class="brand-text">
    <span class="brand-name">${esc(site.nombre)}</span>
    <span class="brand-role">${site.profesion} · ${esc(site.ciudad)}</span>
  </span>
</a>`;

/* ---------- Cabecera ---------- */
const header = (b, section) => {
  const links = NAV.map(
    (n) => `<li><a href="${b}${n.href}"${n.key === section ? ' aria-current="page"' : ''}>${n.label}</a></li>`
  ).join('');
  return `
<a class="skip-link" href="#main">Saltar al contenido principal</a>
<header class="site-header" data-header>
  <div class="container header-inner">
    ${brand(b)}
    <nav class="main-nav" aria-label="Navegación principal">
      <ul>${links}</ul>
    </nav>
    <a class="btn btn-primary btn-sm header-cta" href="${b}contacto/">Solicitar consulta</a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-panel" aria-label="Abrir menú">
      <span class="nav-toggle-bars" aria-hidden="true"></span>
    </button>
  </div>
</header>
<div class="nav-overlay" data-nav-overlay></div>
<div class="mobile-panel" id="mobile-panel" role="dialog" aria-modal="true" aria-label="Menú">
  <div class="mobile-panel-top">
    <span class="eyebrow eyebrow-light">Menú</span>
    <button class="mobile-close" type="button" data-nav-close aria-label="Cerrar menú">${icon('cerrar')}</button>
  </div>
  <nav aria-label="Navegación móvil">
    <ul class="mobile-links">
      ${NAV.map((n, i) => `<li style="--i:${i}"><a href="${b}${n.href}"${n.key === section ? ' aria-current="page"' : ''}>${n.label}</a></li>`).join('')}
    </ul>
  </nav>
  <div class="mobile-panel-bottom">
    <a class="btn btn-light btn-block" href="${b}contacto/">Solicitar consulta ${icon('flecha', 18)}</a>
    <a class="mobile-contact" href="tel:${esc(site.telefonoHref)}">${icon('telefono', 18)} ${esc(site.telefono)}</a>
    <a class="mobile-contact" href="mailto:${esc(site.email)}">${icon('email', 18)} ${esc(site.email)}</a>
  </div>
</div>`;
};

/* ---------- Pie ---------- */
const footer = (b, services) => `
<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      ${brand(b, 'brand-light')}
      <p class="footer-tagline">Asesoramiento jurídico independiente, con rigor técnico y trato cercano.</p>
      <ul class="social" aria-label="Redes sociales">
        <li><a class="social-primary" href="${esc(site.linkedin)}" target="_blank" rel="noopener" aria-label="LinkedIn (se abre en una ventana nueva)">${icon('linkedin')}<span>LinkedIn</span></a></li>
        <li><a href="${esc(site.instagram)}" target="_blank" rel="noopener" aria-label="Instagram (se abre en una ventana nueva)">${icon('instagram')}</a></li>
        <li><a href="https://wa.me/${esc(site.whatsapp)}" target="_blank" rel="noopener" aria-label="WhatsApp (se abre en una ventana nueva)">${icon('whatsapp')}</a></li>
      </ul>
    </div>
    <nav class="footer-col" aria-label="Enlaces rápidos">
      <h2 class="footer-title">Navegación</h2>
      <ul>${NAV.map((n) => `<li><a href="${b}${n.href}">${n.label}</a></li>`).join('')}</ul>
    </nav>
    <nav class="footer-col" aria-label="Áreas de práctica">
      <h2 class="footer-title">Áreas de práctica</h2>
      <ul>${services.map((s) => `<li><a href="${b}servicios/${s.slug}/">${s.titulo}</a></li>`).join('')}</ul>
    </nav>
    <div class="footer-col">
      <h2 class="footer-title">Contacto</h2>
      <address>
        <p>${esc(site.direccion)}<br>${esc(site.codigoPostal)} ${esc(site.ciudad)}</p>
        <p><a href="tel:${esc(site.telefonoHref)}">${esc(site.telefono)}</a><br><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></p>
      </address>
      <p class="footer-small">Colegiado/a nº ${esc(site.colegiado)} · ${esc(site.colegioCorto)}</p>
    </div>
  </div>
  <div class="container footer-bottom">
    <p>© <span data-year>${new Date().getFullYear()}</span> ${esc(site.nombre)}. Todos los derechos reservados.</p>
    <ul class="legal-links">
      <li><a href="${b}aviso-legal/">Aviso legal</a></li>
      <li><a href="${b}politica-de-privacidad/">Política de privacidad</a></li>
      <li><a href="${b}politica-de-cookies/">Política de cookies</a></li>
      <li><button type="button" class="link-button" data-cookie-settings>Configurar cookies</button></li>
    </ul>
  </div>
</footer>`;

/* ---------- Banner de cookies (RGPD / LOPDGDD / Guía AEPD) ---------- */
const cookieBanner = (b) => `
<section class="cookie-banner" data-cookie-banner role="region" aria-label="Aviso de cookies" hidden>
  <h2 class="cookie-title">Su privacidad es importante</h2>
  <p>Utilizamos cookies técnicas, necesarias para el funcionamiento del sitio, y, solo con su consentimiento, cookies analíticas y de terceros (como el mapa de ubicación). Puede aceptarlas, rechazarlas o configurarlas. Más información en nuestra <a href="${b}politica-de-cookies/">Política de cookies</a>.</p>
  <div class="cookie-actions">
    <button type="button" class="btn btn-ghost btn-sm" data-cookie="reject">Rechazar</button>
    <button type="button" class="btn btn-ghost btn-sm" data-cookie="config">Configurar</button>
    <button type="button" class="btn btn-primary btn-sm" data-cookie="accept">Aceptar todas</button>
  </div>
</section>
<dialog class="cookie-dialog" data-cookie-dialog aria-labelledby="cookie-dialog-title">
  <form method="dialog" class="cookie-dialog-inner">
    <div class="cookie-dialog-head">
      <h2 id="cookie-dialog-title">Configuración de cookies</h2>
      <button type="button" class="mobile-close" data-cookie="close" aria-label="Cerrar configuración">${icon('cerrar')}</button>
    </div>
    <p>Elija qué categorías de cookies desea permitir. Puede cambiar su decisión en cualquier momento desde el enlace «Configurar cookies» del pie de página.</p>
    <div class="cookie-option">
      <div><h3>Técnicas o necesarias</h3><p>Permiten la navegación y recuerdan sus preferencias de privacidad. No requieren consentimiento.</p></div>
      <span class="cookie-always">Siempre activas</span>
    </div>
    <div class="cookie-option">
      <div><h3><label for="ck-analiticas">Analíticas</label></h3><p>Nos ayudan a entender, de forma agregada, cómo se usa el sitio para mejorarlo.</p></div>
      <input type="checkbox" class="switch" id="ck-analiticas" name="analiticas">
    </div>
    <div class="cookie-option">
      <div><h3><label for="ck-terceros">De terceros</label></h3><p>Servicios externos integrados, como el mapa de Google Maps en la página de contacto.</p></div>
      <input type="checkbox" class="switch" id="ck-terceros" name="terceros">
    </div>
    <div class="cookie-actions">
      <button type="button" class="btn btn-ghost btn-sm" data-cookie="reject">Rechazar todas</button>
      <button type="button" class="btn btn-primary btn-sm" data-cookie="save">Guardar selección</button>
    </div>
  </form>
</dialog>`;

/* ---------- Schema.org ---------- */
const orgSchema = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LegalService', 'Attorney'],
      '@id': `${site.dominio}/#despacho`,
      name: `${site.nombre} — ${site.profesion}`,
      description: `Despacho de abogacía independiente en ${site.ciudad}, especializado en ${site.especialidad}.`,
      url: `${site.dominio}/`,
      image: `${site.dominio}/assets/img/og-image.png`,
      telephone: site.telefonoHref,
      email: site.email,
      priceRange: '€€',
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.direccion,
        postalCode: site.codigoPostal,
        addressLocality: site.ciudad,
        addressRegion: site.provincia,
        addressCountry: 'ES',
      },
      areaServed: { '@type': 'City', name: site.ciudad },
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '09:00', closes: '14:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '16:00', closes: '19:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '09:00', closes: '14:00' },
      ],
      founder: { '@id': `${site.dominio}/#abogado` },
      sameAs: [site.linkedin],
    },
    {
      '@type': 'Person',
      '@id': `${site.dominio}/#abogado`,
      name: site.nombre,
      jobTitle: site.profesion,
      worksFor: { '@id': `${site.dominio}/#despacho` },
      memberOf: { '@type': 'Organization', name: site.colegio },
      knowsLanguage: ['es', 'en'],
      url: `${site.dominio}/quien-soy/`,
      sameAs: [site.linkedin],
    },
  ],
});

/* ---------- Layout ---------- */
const layout = ({ path, title, description, section, body, services, schema = [], ogType = 'website', image = 'og-image.png' }) => {
  const b = baseFor(path);
  const url = site.dominio + path;
  const img = `${site.dominio}/assets/img/${image}`;
  const ld = [orgSchema(), ...schema].map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n');
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(url)}">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#17202e">
<meta property="og:locale" content="es_ES">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="${esc(site.nombre)} · ${site.profesion}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(img)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${b}assets/img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="${b}assets/css/styles.css">
<script>document.documentElement.classList.add('js')</script>
<script src="${b}assets/js/main.js" defer></script>
${ld}
</head>
<body>
${header(b, section)}
<main id="main" tabindex="-1">
${body(b)}
</main>
${footer(b, services)}
${cookieBanner(b)}
</body>
</html>
`;
};

/* ---------- Bloques reutilizables ---------- */
const pageHero = ({ eyebrow, title, lead, crumbs, b }) => `
<section class="page-hero">
  <div class="container">
    ${crumbs ? breadcrumbs(crumbs, b) : ''}
    <p class="eyebrow reveal">${eyebrow}</p>
    <h1 class="page-title reveal" style="--d:1">${title}</h1>
    ${lead ? `<p class="lead reveal" style="--d:2">${lead}</p>` : ''}
  </div>
</section>`;

const breadcrumbs = (items, b) => `
<nav class="breadcrumbs" aria-label="Ruta de navegación">
  <ol>
    <li><a href="${b}">Inicio</a></li>
    ${items.map((c, i) => (i === items.length - 1 ? `<li aria-current="page">${c.label}</li>` : `<li><a href="${b}${c.href}">${c.label}</a></li>`)).join('')}
  </ol>
</nav>`;

const ctaBand = (b, { title = '¿Hablamos de su caso?', text = 'Cuénteme su situación sin compromiso. Le responderé en menos de 24 horas laborables para valorar cómo puedo ayudarle.' } = {}) => `
<section class="cta-band" aria-labelledby="cta-title">
  <div class="container cta-inner reveal">
    <p class="eyebrow eyebrow-light">Primera consulta</p>
    <h2 id="cta-title" class="cta-title">${title}</h2>
    <p class="cta-text">${text}</p>
    <div class="btn-row btn-row-center">
      <a class="btn btn-light" href="${b}contacto/">Solicitar consulta ${icon('flecha', 18)}</a>
      <a class="btn btn-outline-light" href="tel:${esc(site.telefonoHref)}">${icon('telefono', 18)} Llamar ahora</a>
    </div>
  </div>
</section>`;

const postCard = (p, b, { headingLevel = 3, delay = 0 } = {}) => `
<article class="post-card reveal" style="--d:${delay}">
  <div class="post-card-media">
    <img src="${b}assets/img/${p.imagen}" alt="" width="1200" height="800" loading="lazy" decoding="async">
  </div>
  <div class="post-card-body">
    <p class="post-meta"><span class="tag">${p.categoria}</span><time datetime="${p.fecha}">${fecha(p.fecha)}</time><span aria-hidden="true">·</span><span>${p.lectura} min de lectura</span></p>
    <h${headingLevel} class="post-card-title"><a href="${b}blog/${p.slug}/">${p.titulo}</a></h${headingLevel}>
    <p class="post-card-excerpt">${p.extracto}</p>
    <span class="text-link" aria-hidden="true">Leer artículo ${icon('flecha', 16)}</span>
  </div>
</article>`;

module.exports = { site, icon, esc, fecha, layout, pageHero, breadcrumbs, ctaBand, postCard, baseFor };
