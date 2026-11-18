const { site, icon, esc, pageHero } = require('../components');

module.exports = ({ services }) => ({
  path: '/contacto/',
  section: 'contacto',
  title: `Contacto y cita previa | ${site.nombre}, abogado/a en ${site.ciudad}`,
  description: `Solicite su primera consulta, presencial o por videoconferencia. Teléfono ${site.telefono}, email ${site.email}. Despacho en ${site.ciudad}.`,
  schema: [{ '@context': 'https://schema.org', '@type': 'ContactPage', about: { '@id': `${site.dominio}/#despacho` } }],
  body: (b) => `
${pageHero({
  b,
  eyebrow: 'Contacto',
  title: 'Cuénteme su caso',
  lead: 'Rellene el formulario o contacte directamente por teléfono, correo electrónico o WhatsApp. Le responderé en menos de 24 horas laborables.',
  crumbs: [{ label: 'Contacto' }],
})}

<section class="section section-tight">
  <div class="container contact-layout">
    <div class="contact-form-wrap reveal">
      <div class="video-note">
        ${icon('video', 22)}
        <p><strong>Usted elige el formato.</strong> La primera consulta puede ser presencial, en el despacho, o por videoconferencia desde donde le resulte más cómodo.</p>
      </div>

      <form class="contact-form" action="${esc(site.formAction)}" method="post" novalidate data-contact-form>
        <div class="form-grid">
          <div class="field">
            <label for="f-nombre">Nombre <span class="req" aria-hidden="true">*</span></label>
            <input id="f-nombre" name="nombre" type="text" autocomplete="name" required minlength="2" aria-describedby="e-nombre">
            <p class="field-error" id="e-nombre"></p>
          </div>
          <div class="field">
            <label for="f-email">Email <span class="req" aria-hidden="true">*</span></label>
            <input id="f-email" name="email" type="email" autocomplete="email" required aria-describedby="e-email">
            <p class="field-error" id="e-email"></p>
          </div>
          <div class="field">
            <label for="f-telefono">Teléfono <span class="optional">(opcional)</span></label>
            <input id="f-telefono" name="telefono" type="tel" autocomplete="tel" inputmode="tel" aria-describedby="e-telefono">
            <p class="field-error" id="e-telefono"></p>
          </div>
          <div class="field">
            <label for="f-asunto">Asunto <span class="req" aria-hidden="true">*</span></label>
            <div class="select-wrap">
              <select id="f-asunto" name="asunto" required aria-describedby="e-asunto">
                <option value="">Seleccione una opción</option>
                <option>Primera consulta</option>
                ${services.map((s) => `<option>${s.titulo}</option>`).join('')}
                <option>Otro asunto</option>
              </select>
            </div>
            <p class="field-error" id="e-asunto"></p>
          </div>
          <div class="field field-full">
            <label for="f-mensaje">Mensaje <span class="req" aria-hidden="true">*</span></label>
            <textarea id="f-mensaje" name="mensaje" rows="6" required minlength="10" aria-describedby="e-mensaje-hint e-mensaje" placeholder="Describa brevemente su situación…"></textarea>
            <p class="field-hint" id="e-mensaje-hint">No es necesario que incluya datos sensibles; los trataremos en la consulta.</p>
            <p class="field-error" id="e-mensaje"></p>
          </div>
          <div class="hp" aria-hidden="true">
            <label for="f-web">No rellene este campo</label>
            <input id="f-web" name="web" type="text" tabindex="-1" autocomplete="off">
          </div>
          <div class="field field-full field-check">
            <input id="f-privacidad" name="privacidad" type="checkbox" required aria-describedby="e-privacidad">
            <label for="f-privacidad">He leído y acepto la <a href="${b}politica-de-privacidad/" target="_blank" rel="noopener">Política de privacidad</a>. <span class="req" aria-hidden="true">*</span></label>
            <p class="field-error" id="e-privacidad"></p>
          </div>
        </div>

        <div class="privacy-layer">
          <p><strong>Información básica sobre protección de datos.</strong> Responsable: ${esc(site.nombre)}. Finalidad: atender su solicitud de información o consulta. Legitimación: su consentimiento. Destinatarios: no se cederán datos a terceros, salvo obligación legal. Derechos: acceder, rectificar y suprimir los datos, así como otros derechos detallados en la <a href="${b}politica-de-privacidad/">Política de privacidad</a>.</p>
        </div>

        <p class="form-required-note"><span aria-hidden="true">*</span> Campos obligatorios</p>
        <button type="submit" class="btn btn-primary">Enviar mensaje ${icon('flecha', 18)}</button>
        <div class="form-status" role="status" aria-live="polite" data-form-status></div>
      </form>
    </div>

    <aside class="contact-aside reveal" style="--d:1" aria-label="Datos de contacto">
      <div class="contact-card">
        <h2 class="contact-card-title">Datos de contacto</h2>
        <ul class="contact-list">
          <li>${icon('ubicacion', 20)}<div><span class="contact-label">Despacho</span><address>${esc(site.direccion)}<br>${esc(site.codigoPostal)} ${esc(site.ciudad)}</address></div></li>
          <li>${icon('telefono', 20)}<div><span class="contact-label">Teléfono</span><a href="tel:${esc(site.telefonoHref)}">${esc(site.telefono)}</a></div></li>
          <li>${icon('email', 20)}<div><span class="contact-label">Email</span><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></div></li>
          <li>${icon('reloj', 20)}<div><span class="contact-label">Horario</span>
            <dl class="hours">${site.horario.map((h) => `<div><dt>${h.dias}</dt><dd>${h.horas}</dd></div>`).join('')}</dl>
          </div></li>
        </ul>
        <a class="btn btn-whatsapp btn-block" href="https://wa.me/${esc(site.whatsapp)}?text=${encodeURIComponent('Hola, me gustaría solicitar una consulta.')}" target="_blank" rel="noopener">${icon('whatsapp')} Escribir por WhatsApp</a>
      </div>
    </aside>
  </div>
</section>

<section class="map-section" aria-label="Ubicación del despacho">
  <div class="map-placeholder" data-map data-map-query="${esc(site.direccion + ', ' + site.codigoPostal + ' ' + site.ciudad)}">
    <div class="map-placeholder-inner">
      ${icon('ubicacion', 28)}
      <p class="map-title">${esc(site.direccion)}, ${esc(site.ciudad)}</p>
      <p>El mapa lo proporciona Google Maps, que puede instalar cookies de terceros. Se cargará solo si usted lo autoriza.</p>
      <div class="btn-row btn-row-center">
        <button type="button" class="btn btn-primary btn-sm" data-map-load>Aceptar y cargar mapa</button>
        <a class="btn btn-ghost btn-sm" href="https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent(site.direccion + ', ' + site.ciudad)}" target="_blank" rel="noopener">Abrir en Google Maps</a>
      </div>
    </div>
  </div>
</section>
`,
});
