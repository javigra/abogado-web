const { site, icon, esc, breadcrumbs, ctaBand } = require('../components');

const HITOS = [
  ['[AÑO]', 'Grado en Derecho', 'Finalizo mis estudios en la [UNIVERSIDAD], con especial interés por el Derecho Privado.'],
  ['[AÑO]', 'Máster de Acceso y colegiación', `Supero el examen de acceso a la abogacía y me incorporo al ${site.colegio}.`],
  ['[AÑO]', 'Ejercicio en [DESPACHO ANTERIOR]', 'Años de formación práctica intensa en un despacho de referencia, en asuntos civiles y de familia.'],
  ['[AÑO]', `Especialización en ${site.especialidad}`, 'Completo un programa de posgrado y centro mi práctica en esta materia.'],
  ['[AÑO]', `Despacho propio en ${site.ciudad}`, 'Abro mi despacho independiente para ofrecer un servicio cercano, directo y de calidad.'],
];

module.exports = () => ({
  path: '/quien-soy/',
  section: 'quien-soy',
  title: `Quién soy | ${site.nombre}, abogado/a en ${site.ciudad}`,
  description: `Conozca a ${site.nombre}: trayectoria, formación, colegiación nº ${site.colegiado} en el ${site.colegio} y la filosofía de trabajo de su despacho independiente.`,
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      mainEntity: { '@id': `${site.dominio}/#abogado` },
    },
  ],
  body: (b) => `
<section class="bio-hero">
  <div class="container">
    ${breadcrumbs([{ label: 'Quién soy' }], b)}
    <div class="bio-grid">
      <figure class="portrait portrait-lg reveal">
        <img src="${b}assets/img/retrato.svg" alt="Retrato profesional de ${esc(site.nombre)}" width="800" height="1000" fetchpriority="high">
      </figure>
      <div class="bio-copy">
        <p class="eyebrow reveal">Quién soy</p>
        <h1 class="page-title reveal" style="--d:1">${esc(site.nombre)}</h1>
        <p class="bio-role reveal" style="--d:2">${site.profesion} · ${esc(site.especialidad)}</p>
        <div class="prose reveal" style="--d:3">
          <p class="lead-p">Soy abogado/a desde ${esc(site.anioColegiacion)} y ejerzo en ${esc(site.ciudad)}. Decidí trabajar de forma independiente porque creo que la abogacía funciona mejor cuando existe una relación directa y de confianza: usted habla conmigo desde el primer día y soy yo quien lleva su asunto hasta el final.</p>
          <p>Antes de abrir mi propio despacho, pasé varios años en [DESPACHO ANTERIOR], donde aprendí que detrás de cada expediente hay una persona preocupada que necesita, sobre todo, entender qué le está pasando. Desde entonces procuro explicar el Derecho sin tecnicismos innecesarios y con total sinceridad.</p>
          <p>Me he especializado en ${esc(site.especialidad)}, aunque mantengo una práctica generalista que me permite abordar los asuntos con una visión completa. Me formo de manera continua, porque las leyes cambian y mis clientes merecen un asesoramiento al día.</p>
          <p>Fuera del despacho, [AFICIONES O DETALLE PERSONAL]. Creo que conocer a la persona que le va a defender también importa.</p>
        </div>
        <div class="btn-row reveal" style="--d:4">
          <a class="btn btn-primary" href="${b}contacto/">Solicitar consulta ${icon('flecha', 18)}</a>
          <a class="btn btn-ghost" href="${esc(site.linkedin)}" target="_blank" rel="noopener">${icon('linkedin')} Ver perfil en LinkedIn</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section-paper" aria-labelledby="cred-title">
  <div class="container">
    <p class="eyebrow reveal">Credenciales</p>
    <h2 id="cred-title" class="section-title reveal" style="--d:1">Formación y trayectoria</h2>
    <dl class="cred-grid">
      <div class="cred reveal" style="--d:0">
        <dt>${icon('estudio')} Formación</dt>
        <dd>Grado en Derecho — [UNIVERSIDAD]</dd>
        <dd>Máster Universitario de Acceso a la Abogacía — [UNIVERSIDAD]</dd>
        <dd>[POSGRADO O ESPECIALIZACIÓN]</dd>
      </div>
      <div class="cred reveal" style="--d:1">
        <dt>${icon('experiencia')} Experiencia</dt>
        <dd><strong class="cred-big">${esc(site.aniosExperiencia)}</strong> años de ejercicio profesional</dd>
        <dd>Más de [Nº] asuntos gestionados</dd>
      </div>
      <div class="cred reveal" style="--d:2">
        <dt>${icon('penal')} Colegiación</dt>
        <dd>${esc(site.colegio)}</dd>
        <dd>Colegiado/a nº <strong>${esc(site.colegiado)}</strong></dd>
        <dd>Seguro de responsabilidad civil profesional</dd>
      </div>
      <div class="cred reveal" style="--d:3">
        <dt>${icon('conversacion')} Idiomas</dt>
        <dd>Español — lengua materna</dd>
        <dd>Inglés — nivel avanzado (C1)</dd>
        <dd>[OTRO IDIOMA]</dd>
      </div>
    </dl>
  </div>
</section>

<section class="philosophy" aria-labelledby="filo-title">
  <div class="container philosophy-inner">
    <p class="eyebrow eyebrow-light reveal" id="filo-title">Mi filosofía</p>
    <blockquote class="philosophy-quote reveal" style="--d:1">
      <p>Creo en una abogacía honesta: decirle con claridad lo que puede esperar, también cuando no es lo que quiere oír. Prefiero un buen acuerdo a un mal pleito; pero, cuando hay que litigar, lo hago con toda la preparación que su caso merece.</p>
    </blockquote>
    <ul class="principles reveal" style="--d:2">
      <li><strong>Honestidad</strong><span>Sin falsas promesas.</span></li>
      <li><strong>Discreción</strong><span>Secreto profesional, siempre.</span></li>
      <li><strong>Cercanía</strong><span>Disponible cuando me necesita.</span></li>
    </ul>
  </div>
</section>

<section class="section" aria-labelledby="trayectoria-title">
  <div class="container">
    <p class="eyebrow reveal">Trayectoria</p>
    <h2 id="trayectoria-title" class="section-title reveal" style="--d:1">Hitos profesionales</h2>
    <ol class="timeline">
      ${HITOS.map(
        ([y, t, d], i) => `<li class="timeline-item reveal" style="--d:${i % 3}">
        <span class="timeline-year">${y}</span>
        <div><h3>${t}</h3><p>${d}</p></div>
      </li>`
      ).join('')}
    </ol>
  </div>
</section>

${ctaBand(b, { title: 'Será un placer conocerle', text: 'Si cree que puedo ayudarle, escríbame o llámeme. La primera conversación sirve para que usted también decida si soy la persona adecuada para su caso.' })}
`,
});
