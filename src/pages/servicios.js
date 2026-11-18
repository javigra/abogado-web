const { site, icon, esc, pageHero, ctaBand } = require('../components');

const PASOS = [
  ['conversacion', 'Primera consulta', 'Me cuenta su situación, presencialmente o por videoconferencia. Resuelvo sus primeras dudas y le indico si su asunto tiene recorrido.'],
  ['estudio', 'Estudio del caso', 'Analizo la documentación, la normativa y la jurisprudencia aplicable. Recibe un presupuesto cerrado y por escrito.'],
  ['estrategia', 'Estrategia', 'Definimos juntos el camino más adecuado: negociación, mediación o vía judicial, con sus riesgos y plazos explicados con claridad.'],
  ['resolucion', 'Resolución', 'Ejecuto la estrategia y le mantengo informado/a en cada fase, hasta la resolución definitiva de su asunto.'],
];

const FAQ = [
  ['¿Cuánto cuesta la primera consulta?', `La primera consulta tiene un coste de ${site.precioConsulta} y una duración aproximada de 45 minutos. Si finalmente me encarga el asunto, ese importe se descuenta de los honorarios totales.`],
  ['¿Cómo se calculan los honorarios?', 'Antes de empezar recibirá una hoja de encargo con un presupuesto cerrado y por escrito, en el que se detallan las actuaciones incluidas, los posibles gastos adicionales (procurador, peritos, tasas) y la forma de pago. Siempre que es posible, ofrezco fraccionar el pago.'],
  ['¿Puedo hacer la consulta por videoconferencia?', 'Sí. Puede elegir entre una reunión presencial en el despacho o una videoconferencia por la plataforma que le resulte más cómoda. La documentación puede enviarse de forma segura por correo electrónico y los encargos pueden firmarse digitalmente.'],
  ['¿Qué documentación debo preparar?', 'Al reservar su cita le indicaré qué documentos son útiles en su caso concreto. Con carácter general, conviene reunir contratos, cartas, resoluciones o cualquier comunicación relacionada con el asunto.'],
  ['¿Es confidencial lo que le cuente?', 'Absolutamente. Todo lo que me comunique está protegido por el secreto profesional, que es una obligación deontológica y legal de la abogacía, y sus datos se tratan conforme al RGPD y la LOPDGDD.'],
  ['¿Tengo derecho a asistencia jurídica gratuita?', 'Si sus ingresos no superan determinados umbrales, puede tener derecho a la asistencia jurídica gratuita. Le orientaré sobre cómo solicitarla ante el Colegio de la Abogacía si cumple los requisitos.'],
];

const listado = ({ services }) => ({
  path: '/servicios/',
  section: 'servicios',
  title: `Servicios jurídicos en ${site.ciudad} | ${site.nombre}, abogado/a`,
  description: `Áreas de práctica: Derecho Civil, Familia, Laboral, Penal, Mercantil y Herencias en ${site.ciudad}. Conozca cómo trabajo y resuelva sus dudas sobre honorarios y consultas.`,
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
  ],
  body: (b) => `
${pageHero({
  b,
  eyebrow: 'Servicios',
  title: 'Soluciones jurídicas claras para problemas&nbsp;reales',
  lead: 'Asesoro y defiendo a particulares, autónomos y pequeñas empresas en las áreas del Derecho que más influyen en su día a día.',
  crumbs: [{ label: 'Servicios' }],
})}

<section class="section section-tight" aria-label="Áreas de práctica">
  <div class="container">
    <ul class="service-grid">
      ${services
        .map(
          (s, i) => `<li class="service-card reveal" style="--d:${i % 3}">
        <span class="service-icon">${icon(s.icono, 26)}</span>
        <h2 class="service-title">${s.titulo}</h2>
        <p>${s.resumen}</p>
        <a class="text-link stretched" href="${b}servicios/${s.slug}/">Más información<span class="sr-only"> sobre ${s.titulo}</span> ${icon('flecha', 16)}</a>
      </li>`
        )
        .join('')}
    </ul>
  </div>
</section>

<section class="section section-navy" aria-labelledby="proceso-title">
  <div class="container">
    <div class="section-head section-head-split">
      <div>
        <p class="eyebrow eyebrow-light reveal">Método</p>
        <h2 id="proceso-title" class="section-title reveal" style="--d:1">Cómo trabajamos</h2>
      </div>
      <p class="section-intro reveal" style="--d:2">Un proceso ordenado y transparente, para que en todo momento sepa en qué punto está su asunto y qué viene después.</p>
    </div>
    <ol class="steps">
      ${PASOS.map(
        ([ic, t, d], i) => `<li class="step reveal" style="--d:${i}">
        <span class="step-num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
        <span class="step-icon">${icon(ic, 26)}</span>
        <h3 class="step-title">${t}</h3>
        <p>${d}</p>
      </li>`
      ).join('')}
    </ol>
  </div>
</section>

<section class="section" aria-labelledby="faq-title">
  <div class="container faq-layout">
    <div class="faq-head">
      <p class="eyebrow reveal">Dudas habituales</p>
      <h2 id="faq-title" class="section-title reveal" style="--d:1">Preguntas frecuentes</h2>
      <p class="reveal" style="--d:2">¿No encuentra la respuesta que busca? Escríbame y le contestaré personalmente.</p>
      <a class="text-link reveal" style="--d:3" href="${b}contacto/">Hacer una pregunta ${icon('flecha', 16)}</a>
    </div>
    <div class="faq-list">
      ${FAQ.map(
        ([q, a], i) => `<details class="faq-item reveal" style="--d:${i % 3}"${i === 0 ? ' open' : ''}>
        <summary><span>${q}</span><span class="faq-icon" aria-hidden="true"></span></summary>
        <div class="faq-answer"><p>${a}</p></div>
      </details>`
      ).join('')}
    </div>
  </div>
</section>

${ctaBand(b)}
`,
});

const detalle = (s, { services }) => ({
  path: `/servicios/${s.slug}/`,
  section: 'servicios',
  title: `${s.titulo} en ${site.ciudad} | ${site.nombre}, abogado/a`,
  description: `Abogado/a de ${s.titulo.toLowerCase()} en ${site.ciudad}. ${s.resumen}`,
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: s.titulo,
      name: `${s.titulo} — ${site.nombre}`,
      description: s.resumen,
      provider: { '@id': `${site.dominio}/#despacho` },
      areaServed: { '@type': 'City', name: site.ciudad },
    },
  ],
  body: (b) => `
${pageHero({
  b,
  eyebrow: 'Área de práctica',
  title: s.titulo,
  lead: s.resumen,
  crumbs: [{ label: 'Servicios', href: 'servicios/' }, { label: s.titulo }],
})}

<section class="section section-tight">
  <div class="container detail-layout">
    <div class="detail-main prose">
      ${s.intro.map((p, i) => `<p class="reveal${i === 0 ? ' lead-p' : ''}">${p}</p>`).join('')}
      <h2 class="reveal">En qué puedo ayudarle</h2>
      <ul class="check-list reveal">
        ${s.asuntos.map((a) => `<li>${icon('check', 18)}<span>${a}</span></li>`).join('')}
      </ul>
      <h2 class="reveal">Cómo lo abordamos</h2>
      <p class="reveal">Todo comienza con una primera consulta en la que analizamos su situación. A partir de ahí, recibirá una propuesta de actuación y un presupuesto cerrado por escrito. Durante el proceso, le informaré puntualmente de cada novedad y estaré disponible para resolver sus dudas.</p>
    </div>
    <aside class="detail-aside reveal" aria-label="Solicitar consulta">
      <div class="aside-card">
        <span class="service-icon">${icon(s.icono, 26)}</span>
        <h2 class="aside-title">¿Necesita asesoramiento en ${s.titulo.toLowerCase()}?</h2>
        <p>Cuénteme su caso. Le responderé en menos de 24 horas laborables.</p>
        <a class="btn btn-primary btn-block" href="${b}contacto/">Solicitar consulta ${icon('flecha', 18)}</a>
        <ul class="aside-contact">
          <li><a href="tel:${esc(site.telefonoHref)}">${icon('telefono', 18)} ${esc(site.telefono)}</a></li>
          <li><a href="https://wa.me/${esc(site.whatsapp)}" target="_blank" rel="noopener">${icon('whatsapp', 18)} Escribir por WhatsApp</a></li>
          <li>${icon('video', 18)} Consulta presencial u online</li>
        </ul>
      </div>
    </aside>
  </div>
</section>

<section class="section section-paper" aria-labelledby="otras-title">
  <div class="container">
    <h2 id="otras-title" class="section-title section-title-sm reveal">Otras áreas de práctica</h2>
    <ul class="related-areas">
      ${services
        .filter((o) => o.slug !== s.slug)
        .map((o, i) => `<li class="reveal" style="--d:${i}"><a href="${b}servicios/${o.slug}/">${icon(o.icono, 22)}<span>${o.titulo}</span>${icon('flecha', 16)}</a></li>`)
        .join('')}
    </ul>
  </div>
</section>

${ctaBand(b)}
`,
});

module.exports = { listado, detalle };
