/* Imágenes de marcador de posición en SVG (arquitectura, piedra, luz, libros, retrato).
   Sustitúyalas por fotografías reales manteniendo el mismo nombre de archivo,
   o cambie la extensión en las plantillas. */
const rng = (seed) => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

const grain = (o = 0.08) => `<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0.1 0 0 0 0 0.09 0 0 0 0 0.08 0 0 0 ${o} 0"/></filter>`;
const label = (t, h, light) =>
  `<text x="36" y="${h - 36}" font-family="Helvetica, Arial, sans-serif" font-size="13" letter-spacing="3" fill="${light ? '#ffffff' : '#1b2230'}" fill-opacity=".5">${t}</text>`;
const svg = (w, h, inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice">${inner}</svg>`;

const arquitectura = () => {
  const w = 800, h = 1000;
  let cols = '';
  for (let i = 0; i < 4; i++) {
    const x = 40 + i * 205;
    cols += `<rect x="${x}" y="0" width="110" height="${h}" fill="#b3a792" fill-opacity=".38"/><rect x="${x + 78}" y="0" width="32" height="${h}" fill="#8e826f" fill-opacity=".3"/>`;
  }
  return svg(w, h, `<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#eee8dc"/><stop offset="1" stop-color="#c4b8a5"/></linearGradient>
<linearGradient id="beam" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffaf0" stop-opacity=".9"/><stop offset="1" stop-color="#fffaf0" stop-opacity="0"/></linearGradient>
<linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9d917d" stop-opacity=".25"/><stop offset="1" stop-color="#6f6555" stop-opacity=".55"/></linearGradient>
<filter id="blur"><feGaussianBlur stdDeviation="14"/></filter>${grain()}</defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/>${cols}
<g filter="url(#blur)"><polygon points="150,0 270,0 760,1000 470,1000" fill="url(#beam)" opacity=".75"/><polygon points="355,0 470,0 800,700 800,1000 700,1000" fill="url(#beam)" opacity=".55"/></g>
<rect y="780" width="${w}" height="220" fill="url(#floor)"/><rect y="780" width="${w}" height="2" fill="#fff" fill-opacity=".4"/>
<rect width="${w}" height="${h}" filter="url(#grain)"/>${label('IMAGEN DE EJEMPLO · ARQUITECTURA', h)}`);
};

const piedra = () => {
  const w = 1200, h = 800;
  return svg(w, h, `<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e3dccf"/><stop offset="1" stop-color="#a99d8a"/></linearGradient>
<filter id="stone"><feTurbulence type="fractalNoise" baseFrequency=".006 .018" numOctaves="5" seed="7"/><feColorMatrix values="0 0 0 0 .35 0 0 0 0 .31 0 0 0 0 .26 0 0 0 .55 0"/></filter>
<radialGradient id="light" cx=".2" cy=".15" r=".9"><stop offset="0" stop-color="#fff8ea" stop-opacity=".7"/><stop offset="1" stop-color="#fff8ea" stop-opacity="0"/></radialGradient>${grain(0.1)}</defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/><rect width="${w}" height="${h}" filter="url(#stone)"/>
<g stroke="#f7f1e6" stroke-opacity=".5" stroke-width="2"><path d="M0 270h1200M0 540h1200M380 0v270M820 0v270M180 270v270M640 270v270M1040 270v270M420 540v260M900 540v260"/></g>
<rect width="${w}" height="${h}" fill="url(#light)"/><rect width="${w}" height="${h}" filter="url(#grain)"/>${label('IMAGEN DE EJEMPLO · PIEDRA', h)}`);
};

const luz = () => {
  const w = 1200, h = 800;
  const panes = [[300, 140], [470, 140], [300, 330], [470, 330]]
    .map(([x, y]) => `<polygon points="${x},${y} ${x + 150},${y} ${x + 260},${y + 170} ${x + 110},${y + 170}" />`)
    .join('');
  return svg(w, h, `<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ece4d5"/><stop offset="1" stop-color="#c9bda8"/></linearGradient>
<filter id="soft"><feGaussianBlur stdDeviation="7"/></filter>
<linearGradient id="sh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5e5446" stop-opacity="0"/><stop offset="1" stop-color="#5e5446" stop-opacity=".25"/></linearGradient>${grain()}</defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/>
<g fill="#fffaf0" fill-opacity=".8" filter="url(#soft)">${panes}</g>
<path d="M880 0 C 900 200, 960 420, 1060 800 L1200 800 L1200 0Z" fill="url(#sh)"/>
<rect y="640" width="${w}" height="160" fill="#8b7f6c" fill-opacity=".22"/>
<rect width="${w}" height="${h}" filter="url(#grain)"/>${label('IMAGEN DE EJEMPLO · LUZ NATURAL', h)}`);
};

const biblioteca = () => {
  const w = 1200, h = 800, r = rng(42);
  const pal = ['#1f2a3c', '#2c3a52', '#5e2a2a', '#7e5f2b', '#cfc1a7', '#3c4a3f', '#5a4636', '#e4dac8', '#40343a'];
  let books = '';
  const shelfH = 190;
  for (let s = 0; s < 4; s++) {
    const base = 40 + (s + 1) * shelfH;
    let x = 30;
    while (x < w - 60) {
      const bw = 18 + r() * 30, bh = shelfH * (0.62 + r() * 0.3);
      const c = pal[Math.floor(r() * pal.length)];
      books += `<rect x="${x.toFixed(1)}" y="${(base - bh).toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" fill="${c}"/>`;
      if (r() > 0.55) books += `<rect x="${(x + 3).toFixed(1)}" y="${(base - bh + 18).toFixed(1)}" width="${(bw - 6).toFixed(1)}" height="2" fill="#c9a86a" fill-opacity=".6"/>`;
      x += bw + 2 + (r() > 0.92 ? 30 : 0);
    }
    books += `<rect x="0" y="${base}" width="${w}" height="14" fill="#4a3b2c"/>`;
  }
  return svg(w, h, `<defs>
<linearGradient id="light" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff6e0" stop-opacity=".35"/><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient>${grain(0.12)}</defs>
<rect width="${w}" height="${h}" fill="#6b5844"/>${books}
<rect width="${w}" height="${h}" fill="url(#light)"/><rect width="${w}" height="${h}" filter="url(#grain)"/>${label('IMAGEN DE EJEMPLO · BIBLIOTECA', h, true)}`);
};

const retrato = () => {
  const w = 800, h = 1000;
  return svg(w, h, `<defs>
<radialGradient id="bg" cx=".35" cy=".3" r="1"><stop offset="0" stop-color="#46526a"/><stop offset="1" stop-color="#18202e"/></radialGradient>
<linearGradient id="fig" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6b7790"/><stop offset="1" stop-color="#2c3648"/></linearGradient>${grain(0.1)}</defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/>
<rect x="560" y="0" width="240" height="${h}" fill="#000" fill-opacity=".12"/>
<ellipse cx="400" cy="390" rx="118" ry="142" fill="url(#fig)"/>
<path d="M120 1000 C 140 760, 280 640, 400 640 C 520 640, 660 760, 680 1000 Z" fill="url(#fig)"/>
<path d="M352 640 L400 760 L448 640" fill="none" stroke="#c9a86a" stroke-opacity=".35" stroke-width="2"/>
<rect width="${w}" height="${h}" filter="url(#grain)"/>${label('RETRATO PROFESIONAL · SUSTITUIR', h, true)}`);
};

const favicon = (ini) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="6" fill="#17202e"/><rect x="6" y="6" width="52" height="52" rx="2" fill="none" stroke="#c9a86a" stroke-width="1.5"/><text x="32" y="44" text-anchor="middle" font-family="Georgia, serif" font-size="34" fill="#f7f4ee">${ini}</text></svg>`;

module.exports = { arquitectura, piedra, luz, biblioteca, retrato, favicon };
