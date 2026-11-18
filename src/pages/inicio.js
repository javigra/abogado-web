const { site, icon, esc, ctaBand, postCard } = require('../components');

module.exports = ({ services, posts }) => ({
  path: '/',
  section: 'inicio',
  title: `${site.nombre} | Abogado/a en ${site.ciudad} · ${site.especialidad}`,
  description: `Despacho de abogacía independiente en ${site.ciudad}. Asesoramiento en Derecho Civil, Familia, Laboral, Penal, Mercantil y Herencias. Atención personalizada y respuesta en 24 h.`,
  body: (b) => `
<section class="hero">
  <div class="container hero-grid">
    <div class="hero-copy">
      <p class="eyebrow reveal">Abogado/a en ${esc(site.ciudad)} · ${esc(site.especialidad)}</p>
      <h1 class="display reveal" style="--d:1">Defendemos sus derechos con <em>rigor</em> y&nbsp;<em>cercanía</em>.</h1>
      <p class="lead reveal" style="--d:2">Asesoramiento jurídico independiente para particulares y empresas. Escucho su caso, lo estudio a fondo y le explico con claridad sus opciones reales desde la primera consulta.</p>
      <div class="btn-row reveal" style="--d:3">
        <a class="btn btn-primary" href="${b}contacto/">Solicitar consulta ${icon('flecha', 18)}</a>
        <a class="btn btn-ghost" href="${b}servicios/">Ver servicios</a>
      </div>
      <p class="hero-note reveal" style="--d:4">${icon('video', 18)} Primera consulta presencial o por videoconferencia</p>
    </div>
    <figure class="hero-media reveal" style="--d:2">
      <img src="${b}assets/img/arquitectura.svg" alt="Luz natural entrando entre las columnas de piedra de un edificio histórico" width="800" height="1000" fetchpriority="high">
      <figcaption class="hero-badge">
        <span class="hero-badge-label">Colegiado/a nº</span>
        <strong>${esc(site.colegiado)}</strong>
        <span class="hero-badge-label">${esc(site.colegioCorto)}</span>
      </figcaption>
    </figure>
  </div>
</section>

<section class="values" aria-label="Por qué confiar en mí">
  <div class="container">
    <ul class="values-grid">
      ${[
        ['persona', 'Atención personalizada', 'Usted trata siempre conmigo, de principio a fin. Sin intermediarios.'],
        ['transparencia', 'Transparencia en honorarios', 'Presupuesto cerrado y por escrito antes de empezar. Sin sorpresas.'],
        ['reloj', 'Respuesta en 24 h', 'Contesto a cada consulta en menos de un día laborable.'],
        ['experiencia', 'Experiencia contrastada', `Más de ${esc(site.aniosExperiencia)} años de ejercicio profesional ante los tribunales.`],
      ]
        .map(
          ([ic, t, d], i) => `<li class="value reveal" style="--d:${i}">
        <span class="value-icon">${icon(ic)}</span>
        <h2 class="value-title">${t}</h2>
        <p>${d}</p>
      </li>`
        )
        .join('')}
    </ul>
  </div>
</section>

<section class="section" aria-labelledby="areas-title">
  <div class="container">
    <div class="section-head section-head-split">
      <div>
        <p class="eyebrow reveal">Áreas de práctica</p>
        <h2 id="areas-title" class="section-title reveal" style="--d:1">Experiencia en las materias que más le afectan</h2>
      </div>
      <p class="section-intro reveal" style="--d:2">Cada asunto recibe un estudio individual y una estrategia a medida. Estas son las áreas en las que puedo ayudarle.</p>
    </div>
    <ol class="area-list">
      ${services
        .map(
          (s, i) => `<li class="reveal" style="--d:${i % 3}">
        <a class="area-row" href="${b}servicios/${s.slug}/">
          <span class="area-num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
          <span class="area-name">${s.titulo}</span>
          <span class="area-desc">${s.resumen}</span>
          <span class="area-arrow" aria-hidden="true">${icon('flechaDiag', 22)}</span>
        </a>
      </li>`
        )
        .join('')}
    </ol>
    <div class="section-foot reveal">
      <a class="text-link" href="${b}servicios/">Ver todos los servicios ${icon('flecha', 16)}</a>
    </div>
  </div>
</section>

<section class="section section-paper" aria-labelledby="about-title">
  <div class="container about-intro">
    <figure class="portrait reveal">
      <img src="${b}assets/img/retrato.svg" alt="Retrato profesional de ${esc(site.nombre)} en su despacho" width="800" height="1000" loading="lazy">
    </figure>
    <div class="about-copy">
      <p class="eyebrow reveal">Quién soy</p>
      <h2 id="about-title" class="section-title reveal" style="--d:1">Un despacho independiente, una relación directa</h2>
      <blockquote class="pull-quote reveal" style="--d:2">
        <p>«Mi compromiso es sencillo: decirle la verdad sobre su caso y trabajar en él como si fuera propio.»</p>
      </blockquote>
      <p class="reveal" style="--d:3">Soy ${esc(site.nombre)}, abogado/a colegiado/a en el ${esc(site.colegio)}. Elegí ejercer de forma independiente para ofrecer lo que muchas veces se echa de menos en los grandes despachos: tiempo, atención y un trato cercano sin renunciar al rigor técnico.</p>
      <div class="about-stats reveal" style="--d:4">
        <div><strong>${esc(site.aniosExperiencia)}</strong><span>años de experiencia</span></div>
        <div><strong>6</strong><span>áreas de práctica</span></div>
        <div><strong>24 h</strong><span>tiempo de respuesta</span></div>
      </div>
      <a class="btn btn-ghost reveal" style="--d:5" href="${b}quien-soy/">Conocer mi trayectoria ${icon('flecha', 18)}</a>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="blog-title">
  <div class="container">
    <div class="section-head section-head-split">
      <div>
        <p class="eyebrow reveal">Blog</p>
        <h2 id="blog-title" class="section-title reveal" style="--d:1">Artículos recientes</h2>
      </div>
      <a class="text-link reveal" style="--d:2" href="${b}blog/">Ver todos los artículos ${icon('flecha', 16)}</a>
    </div>
    <div class="post-grid">
      ${posts.slice(0, 3).map((p, i) => postCard(p, b, { delay: i })).join('')}
    </div>
  </div>
</section>

${ctaBand(b)}
`,
});
