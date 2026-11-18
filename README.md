# Web para abogado/a independiente

Sitio estático, rápido y accesible, generado con Node.js sin dependencias.

## Uso

```bash
npm run build     # genera dist/
npm run serve     # http://localhost:8080
```

## Personalización

1. **Datos del despacho** — edite `src/config.js` (nombre, ciudad, especialidad, nº de colegiado, teléfono, email, dirección, dominio, redes, endpoint del formulario). Todos los marcadores `[ASÍ]` se sustituyen en todo el sitio al volver a compilar.
2. **Textos con marcadores propios** — busque `[` en `src/pages/` (p. ej. `[UNIVERSIDAD]`, `[DESPACHO ANTERIOR]`, `[AÑO]`, `[PRECIO]`).
3. **Fotografías** — coloque sus imágenes en `src/assets/img/` con estos nombres: `retrato.svg`, `arquitectura.svg`, `luz.svg`, `piedra.svg` y `biblioteca.svg`. Si usa JPG o WebP, cambie la extensión en las plantillas. Cuando un archivo no existe, se genera un marcador de posición.
4. **Servicios y blog** — `src/data/services.js` y `src/data/posts.js`. Cada entrada genera su propia página.
5. **Formulario** — indique en `formAction` la URL de su servicio de formularios (Formspree, Netlify Forms, backend propio). Mientras contenga corchetes, el formulario funciona en modo demostración.
6. **Textos legales** — los de Aviso legal, Privacidad y Cookies son modelos: revíselos antes de publicar.

## Estructura

```
src/config.js        Datos del despacho (un único lugar)
src/components.js    Layout, cabecera, pie, banner de cookies, tarjetas, schema.org
src/icons.js         Iconos SVG de línea
src/images.js        Generador de imágenes de marcador de posición
src/data/            Servicios y artículos
src/pages/           Plantillas de cada página
src/assets/          CSS, JS e imágenes estáticas
build.js             Genera dist/ (HTML, sitemap.xml, robots.txt, 404.html)
```

## URLs

`/`, `/servicios/`, `/servicios/<área>/`, `/quien-soy/`, `/blog/`, `/blog/<artículo>/`, `/contacto/`, `/aviso-legal/`, `/politica-de-privacidad/`, `/politica-de-cookies/`.

## Despliegue

Suba el contenido de `dist/` a cualquier hosting estático (Netlify, Vercel, Cloudflare Pages, GitHub Pages o un hosting tradicional). Configure `404.html` como página de error.
