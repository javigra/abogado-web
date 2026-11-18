/* Generador estático: node build.js → carpeta dist/ */
const fs = require('fs');
const path = require('path');
const { layout, site } = require('./src/components');
const services = require('./src/data/services');
const posts = require('./src/data/posts').sort((a, b) => b.fecha.localeCompare(a.fecha));
const img = require('./src/images');

const inicio = require('./src/pages/inicio');
const servicios = require('./src/pages/servicios');
const quienSoy = require('./src/pages/quien-soy');
const blog = require('./src/pages/blog');
const contacto = require('./src/pages/contacto');
const legal = require('./src/pages/legal');

const OUT = path.join(__dirname, 'dist');
const ctx = { services, posts };

fs.rmSync(OUT, { recursive: true, force: true });
fs.cpSync(path.join(__dirname, 'src/assets'), path.join(OUT, 'assets'), { recursive: true });

// Imágenes de marcador de posición
const imgDir = path.join(OUT, 'assets/img');
fs.mkdirSync(imgDir, { recursive: true });
for (const name of ['arquitectura', 'piedra', 'luz', 'biblioteca', 'retrato']) {
  const file = path.join(imgDir, `${name}.svg`);
  if (!fs.existsSync(file)) fs.writeFileSync(file, img[name]());
}
fs.writeFileSync(path.join(imgDir, 'favicon.svg'), img.favicon(site.iniciales));

const pages = [
  inicio(ctx),
  servicios.listado(ctx),
  ...services.map((s) => servicios.detalle(s, ctx)),
  quienSoy(ctx),
  blog.listado(ctx),
  ...posts.map((p) => blog.articulo(p, ctx)),
  contacto(ctx),
  legal.avisoLegal(),
  legal.privacidad(),
  legal.cookies(),
];

for (const p of pages) {
  const dir = path.join(OUT, p.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), layout({ ...p, services }));
}

// 404 (se sirve desde cualquier ruta: rutas absolutas desde BASE_PATH, p. ej. /web-abogado/ en GitHub Pages)
const BASE = (process.env.BASE_PATH || '/').replace(/\/?$/, '/');
const nf = legal.noEncontrado();
fs.writeFileSync(
  path.join(OUT, '404.html'),
  layout({ ...nf, path: '/404.html', services }).replace(/(href|src)="\.\.\//g, `$1="${BASE}`)
    .replace(/href="\/(contacto\/)?"/g, (m, c) => `href="${BASE}${c || ''}"`)
);

// SEO: sitemap y robots
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  path.join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map((p) => `  <url><loc>${site.dominio}${p.path}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n')}\n</urlset>\n`
);
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.dominio}/sitemap.xml\n`);

console.log(`✓ ${pages.length + 1} páginas generadas en dist/`);
