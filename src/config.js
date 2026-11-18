/**
 * DATOS DEL DESPACHO
 * ------------------------------------------------------------------
 * Sustituya cada valor entre corchetes por el dato real y ejecute
 * `npm run build`. Todo el sitio se regenera a partir de este archivo.
 */
module.exports = {
  nombre: '[NOMBRE]',
  iniciales: 'N',                       // Inicial(es) para el monograma del logo
  profesion: 'Abogado/a',
  ciudad: '[CIUDAD]',
  especialidad: '[ESPECIALIDAD]',
  colegiado: '[Nº COLEGIADO]',
  colegio: 'Ilustre Colegio de la Abogacía de [CIUDAD]',
  colegioCorto: 'ICA [CIUDAD]',
  anioColegiacion: '[AÑO]',
  aniosExperiencia: '[AÑOS]',
  nif: '[NIF]',

  telefono: '[TELÉFONO]',
  telefonoHref: '[TELÉFONO]',           // Formato internacional, p. ej. +34600000000
  whatsapp: '[WHATSAPP]',               // Sin "+" ni espacios, p. ej. 34600000000
  email: '[EMAIL]',

  direccion: '[DIRECCIÓN]',
  codigoPostal: '[CÓDIGO POSTAL]',
  provincia: '[PROVINCIA]',
  horario: [
    { dias: 'Lunes a jueves', horas: '9:00 – 14:00 · 16:00 – 19:00' },
    { dias: 'Viernes', horas: '9:00 – 14:00' },
    { dias: 'Fuera de horario', horas: 'Con cita previa' },
  ],
  precioConsulta: '[PRECIO] €',

  dominio: 'https://www.[DOMINIO].es',  // Sin barra final
  linkedin: 'https://www.linkedin.com/in/[USUARIO]',
  instagram: 'https://www.instagram.com/[USUARIO]',

  // Endpoint del formulario (Formspree, Netlify Forms, backend propio…).
  // Mientras contenga corchetes, el formulario funciona en modo demostración.
  formAction: '[URL_FORMULARIO]',
};
