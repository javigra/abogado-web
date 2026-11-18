const { site, icon, esc, fecha, pageHero, breadcrumbs, ctaBand, postCard } = require('../components');

const CATEGORIAS = ['Familia', 'Laboral', 'Civil', 'Actualidad jurídica'];
const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const listado = ({ posts }) => ({
  path: '/blog/',
  section: 'blog',
  title: `Blog jurídico | ${site.nombre}, abogado/a en ${site.ciudad}`,
  description: 'Artículos claros y prácticos sobre Derecho de Familia, Laboral, Civil y actualidad jurídica, escritos para que entienda sus derechos.',
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: `Blog de ${site.nombre}`,
      url: `${site.dominio}/blog/`,
      blogPost: posts.map((p) => ({ '@type': 'BlogPosting', headline: p.titulo, url: `${site.dominio}/blog/${p.slug}/`, datePublished: p.fecha })),
    },
  ],
  body: (b) => `
${pageHero({
  b,
  eyebrow: 'Blog',
  title: 'Derecho explicado con claridad',
  lead: 'Artículos prácticos para entender sus derechos y tomar mejores decisiones. Información general que no sustituye al asesoramiento sobre su caso concreto.',
  crumbs: [{ label: 'Blog' }],
})}

<section class="section section-tight" aria-label="Listado de artículos">
  <div class="container">
    <div class="blog-toolbar reveal" data-blog-filter>
      <div class="filter-chips" role="group" aria-label="Filtrar por categoría">
        <button type="button" class="chip" aria-pressed="true" data-filter="todas">Todas</button>
        ${CATEGORIAS.map((c) => `<button type="button" class="chip" aria-pressed="false" data-filter="${norm(c)}">${c}</button>`).join('')}
      </div>
      <div class="search-field">
        <label for="blog-search" class="sr-only">Buscar en el blog</label>
        ${icon('buscar', 18)}
        <input id="blog-search" type="search" placeholder="Buscar artículos…" autocomplete="off" data-search>
      </div>
    </div>
    <p class="blog-count" aria-live="polite" data-blog-count>${posts.length} artículos</p>
    <div class="post-list">
      ${posts
        .map(
          (p, i) => `<div class="post-list-item${i === 0 ? ' is-featured' : ''}" data-post data-category="${norm(p.categoria)}" data-text="${esc(norm(p.titulo + ' ' + p.extracto + ' ' + p.categoria))}">
        ${postCard(p, b, { headingLevel: 2, delay: i })}
      </div>`
        )
        .join('')}
    </div>
    <div class="blog-empty" data-blog-empty hidden>
      <p class="blog-empty-title">No hay artículos que coincidan con su búsqueda.</p>
      <p>Pruebe con otros términos o seleccione otra categoría.</p>
    </div>
  </div>
</section>

${ctaBand(b, { title: '¿Su caso necesita algo más que un artículo?', text: 'Cada situación es única. Cuénteme la suya y le diré, con claridad, qué opciones tiene.' })}
`,
});

const articulo = (p, { posts }) => {
  const url = `${site.dominio}/blog/${p.slug}/`;
  const enc = encodeURIComponent;
  const related = posts.filter((o) => o.slug !== p.slug).slice(0, 2);
  return {
    path: `/blog/${p.slug}/`,
    section: 'blog',
    title: `${p.titulo} | Blog de ${site.nombre}`,
    description: p.extracto,
    ogType: 'article',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: p.titulo,
        description: p.extracto,
        datePublished: p.fecha,
        dateModified: p.fecha,
        inLanguage: 'es-ES',
        articleSection: p.categoria,
        image: `${site.dominio}/assets/img/og-image.png`,
        mainEntityOfPage: url,
        author: { '@id': `${site.dominio}/#abogado` },
        publisher: { '@id': `${site.dominio}/#despacho` },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${site.dominio}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${site.dominio}/blog/` },
          { '@type': 'ListItem', position: 3, name: p.titulo, item: url },
        ],
      },
    ],
    body: (b) => `
<article class="article">
  <header class="article-header">
    <div class="container container-narrow">
      ${breadcrumbs([{ label: 'Blog', href: 'blog/' }, { label: p.categoria }], b)}
      <p class="post-meta reveal"><a class="tag" href="${b}blog/?categoria=${norm(p.categoria).replace(/ /g, '+')}">${p.categoria}</a><time datetime="${p.fecha}">${fecha(p.fecha)}</time><span aria-hidden="true">·</span><span>${p.lectura} min de lectura</span></p>
      <h1 class="article-title reveal" style="--d:1">${p.titulo}</h1>
      <p class="article-lead reveal" style="--d:2">${p.extracto}</p>
      <p class="article-byline reveal" style="--d:3">
        <img src="${b}assets/img/retrato.svg" alt="" width="44" height="44">
        <span>Por <a href="${b}quien-soy/">${esc(site.nombre)}</a><br><small>${site.profesion} · ${esc(site.ciudad)}</small></span>
      </p>
    </div>
  </header>

  <figure class="article-figure container reveal">
    <img src="${b}assets/img/${p.imagen}" alt="${esc(p.alt)}" width="1200" height="800" fetchpriority="high">
  </figure>

  <div class="container container-narrow article-layout">
    <div class="prose prose-article">
      ${p.cuerpo}
      <p class="disclaimer">Este artículo ofrece información de carácter general y no constituye asesoramiento jurídico. Para valorar su caso concreto, le recomiendo solicitar una consulta.</p>
    </div>

    <div class="share" aria-label="Compartir artículo">
      <span class="share-label">Compartir</span>
      <ul>
        <li><a href="https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}" target="_blank" rel="noopener" aria-label="Compartir en LinkedIn">${icon('linkedin', 18)}</a></li>
        <li><a href="https://api.whatsapp.com/send?text=${enc(p.titulo + ' ' + url)}" target="_blank" rel="noopener" aria-label="Compartir por WhatsApp">${icon('whatsapp', 18)}</a></li>
        <li><a href="https://twitter.com/intent/tweet?text=${enc(p.titulo)}&amp;url=${enc(url)}" target="_blank" rel="noopener" aria-label="Compartir en X">${icon('x')}</a></li>
        <li><a href="https://www.facebook.com/sharer/sharer.php?u=${enc(url)}" target="_blank" rel="noopener" aria-label="Compartir en Facebook">${icon('facebook')}</a></li>
        <li><a href="mailto:?subject=${enc(p.titulo)}&amp;body=${enc(url)}" aria-label="Compartir por correo electrónico">${icon('email', 18)}</a></li>
        <li><button type="button" data-copy-link aria-label="Copiar enlace">${icon('enlace', 18)}</button></li>
      </ul>
      <span class="share-feedback" role="status" data-copy-feedback></span>
    </div>

    <aside class="author-box" aria-label="Sobre el autor">
      <img src="${b}assets/img/retrato.svg" alt="Retrato de ${esc(site.nombre)}" width="96" height="96" loading="lazy">
      <div>
        <p class="eyebrow">Sobre el autor</p>
        <h2 class="author-name">${esc(site.nombre)}</h2>
        <p>${site.profesion} colegiado/a en el ${esc(site.colegio)} (nº ${esc(site.colegiado)}), con más de ${esc(site.aniosExperiencia)} años de experiencia en ${esc(site.especialidad)}. Escribo para que el Derecho resulte comprensible.</p>
        <div class="author-links">
          <a class="text-link" href="${b}quien-soy/">Conocer mi trayectoria ${icon('flecha', 16)}</a>
          <a class="text-link" href="${esc(site.linkedin)}" target="_blank" rel="noopener">LinkedIn ${icon('flechaDiag', 16)}</a>
        </div>
      </div>
    </aside>
  </div>
</article>

<section class="section section-paper" aria-labelledby="related-title">
  <div class="container">
    <h2 id="related-title" class="section-title section-title-sm reveal">También le puede interesar</h2>
    <div class="post-grid post-grid-2">
      ${related.map((r, i) => postCard(r, b, { delay: i })).join('')}
    </div>
  </div>
</section>

${ctaBand(b)}
`,
  };
};

module.exports = { listado, articulo };
