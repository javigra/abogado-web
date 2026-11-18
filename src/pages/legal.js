const { site, esc, pageHero } = require('../components');

const NOTA = `<p class="legal-note">Texto modelo con marcadores entre corchetes. Revíselo y adáptelo a su situación concreta antes de publicar el sitio.</p>`;
const ACT = 'Última actualización: [FECHA]';

const page = ({ slug, titulo, descripcion, contenido }) => () => ({
  path: `/${slug}/`,
  section: null,
  title: `${titulo} | ${site.nombre}`,
  description: descripcion,
  body: (b) => `
${pageHero({ b, eyebrow: 'Información legal', title: titulo, lead: ACT, crumbs: [{ label: titulo }] })}
<section class="section section-tight">
  <div class="container container-narrow prose prose-legal">
    ${NOTA}
    ${contenido(b)}
  </div>
</section>`,
});

const avisoLegal = page({
  slug: 'aviso-legal',
  titulo: 'Aviso legal',
  descripcion: `Aviso legal del sitio web de ${site.nombre}, abogado/a en ${site.ciudad}, conforme a la Ley 34/2002 (LSSI-CE).`,
  contenido: (b) => `
<h2>1. Datos identificativos</h2>
<p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los siguientes datos:</p>
<ul>
  <li><strong>Titular:</strong> ${esc(site.nombre)}</li>
  <li><strong>NIF:</strong> ${esc(site.nif)}</li>
  <li><strong>Domicilio profesional:</strong> ${esc(site.direccion)}, ${esc(site.codigoPostal)} ${esc(site.ciudad)}</li>
  <li><strong>Teléfono:</strong> ${esc(site.telefono)} · <strong>Email:</strong> ${esc(site.email)}</li>
  <li><strong>Colegio profesional:</strong> ${esc(site.colegio)}, número de colegiado/a ${esc(site.colegiado)}</li>
  <li><strong>Título profesional:</strong> Abogado/a, expedido en España</li>
  <li><strong>Normas profesionales:</strong> Estatuto General de la Abogacía Española y Código Deontológico de la Abogacía Española, disponibles en <a href="https://www.abogacia.es" target="_blank" rel="noopener">abogacia.es</a></li>
</ul>
<h2>2. Objeto y condiciones de uso</h2>
<p>El presente aviso legal regula el acceso y uso de este sitio web. La navegación atribuye la condición de usuario e implica la aceptación de estas condiciones. El usuario se compromete a hacer un uso adecuado de los contenidos, conforme a la ley y la buena fe.</p>
<h2>3. Carácter informativo de los contenidos</h2>
<p>Los contenidos de este sitio, incluidos los artículos del blog, tienen carácter meramente informativo y no constituyen asesoramiento jurídico. El envío de un formulario o un correo electrónico no establece por sí mismo una relación profesional abogado-cliente.</p>
<h2>4. Propiedad intelectual e industrial</h2>
<p>Los textos, diseños, imágenes y demás elementos del sitio son titularidad de ${esc(site.nombre)} o de terceros que han autorizado su uso. Queda prohibida su reproducción, distribución o transformación sin autorización expresa.</p>
<h2>5. Responsabilidad</h2>
<p>El titular no se responsabiliza de los daños derivados del uso de la información del sitio ni de los contenidos de sitios de terceros enlazados, sobre los que no ejerce control.</p>
<h2>6. Legislación aplicable</h2>
<p>Las presentes condiciones se rigen por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales que resulten competentes conforme a la normativa vigente.</p>`,
});

const privacidad = page({
  slug: 'politica-de-privacidad',
  titulo: 'Política de privacidad',
  descripcion: `Política de privacidad de ${site.nombre}: tratamiento de datos personales conforme al RGPD y la LOPDGDD.`,
  contenido: (b) => `
<h2>1. Responsable del tratamiento</h2>
<p>${esc(site.nombre)}, con NIF ${esc(site.nif)} y domicilio en ${esc(site.direccion)}, ${esc(site.codigoPostal)} ${esc(site.ciudad)}. Email de contacto: ${esc(site.email)}.</p>
<h2>2. Finalidades</h2>
<ul>
  <li>Atender las consultas y solicitudes enviadas a través del formulario, el correo electrónico, el teléfono o WhatsApp.</li>
  <li>Prestar los servicios profesionales encargados y gestionar la relación con el cliente.</li>
  <li>Cumplir las obligaciones legales aplicables, incluidas las de prevención del blanqueo de capitales.</li>
</ul>
<h2>3. Legitimación</h2>
<p>El consentimiento del interesado (art. 6.1.a RGPD) para atender solicitudes de información; la ejecución de un contrato o de medidas precontractuales (art. 6.1.b) para la prestación de servicios; y el cumplimiento de obligaciones legales (art. 6.1.c).</p>
<h2>4. Conservación</h2>
<p>Los datos de consultas se conservarán durante el tiempo necesario para atenderlas y, como máximo, [PLAZO]. Los datos de clientes se conservarán durante la relación profesional y, posteriormente, durante los plazos de prescripción de las responsabilidades legales.</p>
<h2>5. Destinatarios</h2>
<p>No se cederán datos a terceros salvo obligación legal o cuando sea necesario para la prestación del servicio (por ejemplo, juzgados, procuradores o peritos). Los proveedores tecnológicos que actúan como encargados del tratamiento ([PROVEEDOR DE HOSTING], [PROVEEDOR DE CORREO]) están sujetos a contrato conforme al art. 28 RGPD.</p>
<h2>6. Secreto profesional</h2>
<p>Toda la información facilitada está amparada por el secreto profesional de la abogacía, conforme al Estatuto General de la Abogacía Española y la Ley Orgánica del Poder Judicial.</p>
<h2>7. Derechos</h2>
<p>Puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad escribiendo a ${esc(site.email)}, adjuntando copia de su documento de identidad. Si considera que sus derechos no han sido atendidos, puede presentar una reclamación ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener">aepd.es</a>).</p>`,
});

const cookies = page({
  slug: 'politica-de-cookies',
  titulo: 'Política de cookies',
  descripcion: `Política de cookies del sitio web de ${site.nombre}: qué cookies utilizamos y cómo gestionarlas.`,
  contenido: (b) => `
<h2>1. ¿Qué son las cookies?</h2>
<p>Las cookies son pequeños archivos que se descargan en su dispositivo al visitar un sitio web y que permiten, entre otras cosas, recordar sus preferencias o analizar el uso del sitio.</p>
<h2>2. Cookies que utilizamos</h2>
<div class="table-wrap">
<table>
  <thead><tr><th scope="col">Nombre</th><th scope="col">Titular</th><th scope="col">Finalidad</th><th scope="col">Duración</th></tr></thead>
  <tbody>
    <tr><td>cookie-consent</td><td>Propia</td><td>Técnica: almacena sus preferencias de cookies (almacenamiento local).</td><td>12 meses</td></tr>
    <tr><td>[_ga, _ga_*]</td><td>[Google Analytics]</td><td>Analítica: estadísticas agregadas de uso. Solo con consentimiento.</td><td>[2 años]</td></tr>
    <tr><td>[NID, otras]</td><td>Google Maps</td><td>Terceros: mostrar el mapa de ubicación. Solo con consentimiento.</td><td>[6 meses]</td></tr>
  </tbody>
</table>
</div>
<h2>3. Base jurídica</h2>
<p>Las cookies técnicas se instalan por ser estrictamente necesarias (art. 22.2 LSSI-CE). El resto solo se utilizan con su consentimiento previo, que puede otorgar, rechazar o retirar en cualquier momento.</p>
<h2>4. Cómo gestionar sus preferencias</h2>
<p>Puede modificar su elección en cualquier momento desde el enlace <button type="button" class="link-button" data-cookie-settings>Configurar cookies</button>, disponible también en el pie de página. Asimismo, puede eliminar o bloquear las cookies desde la configuración de su navegador.</p>
<h2>5. Más información</h2>
<p>Para cualquier duda, puede escribir a ${esc(site.email)}. Consulte también la <a href="${b}politica-de-privacidad/">Política de privacidad</a>.</p>`,
});

const noEncontrado = () => ({
  path: '/404.html',
  section: null,
  title: `Página no encontrada | ${site.nombre}`,
  description: 'La página que busca no existe o ha cambiado de dirección.',
  body: (b) => `
<section class="page-hero page-hero-404">
  <div class="container">
    <p class="eyebrow">Error 404</p>
    <h1 class="page-title">Esta página no existe</h1>
    <p class="lead">Es posible que la dirección haya cambiado o que el enlace sea incorrecto.</p>
    <div class="btn-row"><a class="btn btn-primary" href="/">Volver al inicio</a><a class="btn btn-ghost" href="/contacto/">Contactar</a></div>
  </div>
</section>`,
});

module.exports = { avisoLegal, privacidad, cookies, noEncontrado };
