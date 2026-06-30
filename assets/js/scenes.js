/* =========================================================
   ASA Tour & Travel — Vector Scene Illustrations
   Self-contained SVG "photo" scenes of the holy sites,
   styled to the brand palette. Always render (no network).
   Each package / gallery item may also provide an `image`
   URL which, when present, is layered on top and used
   instead — with automatic fallback to the illustration.
   ========================================================= */

let _sceneSeq = 0;

/* --- Makkah: Ka'bah in the Mataf under a golden sky --- */
function sceneMakkah() {
  const u = "mk" + _sceneSeq++;
  return `
  <svg class="scene" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="${u}sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3a2a1c"/><stop offset=".45" stop-color="#6b4a2c"/>
        <stop offset=".75" stop-color="#c79a5b"/><stop offset="1" stop-color="#e8c787"/>
      </linearGradient>
      <radialGradient id="${u}sun" cx="78%" cy="30%" r="40%">
        <stop offset="0" stop-color="#ffe9b0" stop-opacity=".95"/><stop offset="1" stop-color="#ffe9b0" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="${u}floor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#efe2cc"/><stop offset="1" stop-color="#cdb48a"/>
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#${u}sky)"/>
    <rect width="400" height="300" fill="url(#${u}sun)"/>
    <circle cx="312" cy="88" r="30" fill="#fff3d6" opacity=".9"/>
    <!-- mosque arcade silhouette -->
    <g fill="#2a1e14" opacity=".9">
      <rect x="0" y="150" width="400" height="40"/>
      <g>
        <rect x="6" y="118" width="36" height="40"/><path d="M6 122a18 18 0 0 1 36 0z"/>
        <rect x="52" y="118" width="36" height="40"/><path d="M52 122a18 18 0 0 1 36 0z"/>
        <rect x="312" y="118" width="36" height="40"/><path d="M312 122a18 18 0 0 1 36 0z"/>
        <rect x="358" y="118" width="36" height="40"/><path d="M358 122a18 18 0 0 1 36 0z"/>
      </g>
      <!-- minaret with crescent -->
      <rect x="20" y="44" width="12" height="80"/><rect x="17" y="40" width="18" height="8"/>
      <circle cx="26" cy="30" r="7" fill="#2a1e14"/><circle cx="29" cy="28" r="6" fill="url(#${u}sky)"/>
      <rect x="368" y="44" width="12" height="80"/><rect x="365" y="40" width="18" height="8"/>
    </g>
    <!-- mataf floor -->
    <ellipse cx="200" cy="270" rx="240" ry="60" fill="url(#${u}floor)"/>
    <ellipse cx="200" cy="266" rx="150" ry="38" fill="none" stroke="#b89a6a" stroke-width="2" opacity=".6"/>
    <!-- Ka'bah -->
    <g>
      <rect x="162" y="150" width="76" height="92" rx="3" fill="#0f0c08"/>
      <rect x="162" y="150" width="76" height="92" rx="3" fill="url(#${u}sky)" opacity=".15"/>
      <rect x="162" y="176" width="76" height="11" fill="#d4af37"/>
      <rect x="162" y="176" width="76" height="11" fill="#000" opacity=".08"/>
      <rect x="226" y="150" width="12" height="92" fill="#000" opacity=".25"/>
      <rect x="200" y="195" width="16" height="47" fill="#caa54a" opacity=".85"/>
    </g>
    <!-- pilgrims ring -->
    <g fill="#f3ecdf" opacity=".95">
      <circle cx="120" cy="250" r="6"/><circle cx="150" cy="258" r="6"/><circle cx="250" cy="258" r="6"/>
      <circle cx="282" cy="250" r="6"/><circle cx="186" cy="262" r="6"/><circle cx="214" cy="262" r="6"/>
    </g>
  </svg>`;
}

/* --- Madinah: green dome & minarets of Masjid an-Nabawi --- */
function sceneMadinah() {
  const u = "md" + _sceneSeq++;
  return `
  <svg class="scene" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="${u}sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#243b4a"/><stop offset=".5" stop-color="#5e6f6a"/>
        <stop offset="1" stop-color="#d8c69a"/>
      </linearGradient>
      <linearGradient id="${u}wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#efe6d4"/><stop offset="1" stop-color="#c9b78f"/>
      </linearGradient>
      <linearGradient id="${u}dome" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3aa17e"/><stop offset="1" stop-color="#1f6b52"/>
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#${u}sky)"/>
    <circle cx="320" cy="70" r="22" fill="#fdf3d2" opacity=".85"/>
    <g fill="#e9dcc2" opacity=".5">
      <circle cx="70" cy="60" r="2"/><circle cx="110" cy="40" r="1.6"/><circle cx="160" cy="64" r="1.6"/>
      <circle cx="250" cy="44" r="1.6"/><circle cx="300" cy="110" r="1.6"/>
    </g>
    <!-- minarets -->
    <g fill="url(#${u}wall)">
      <rect x="44" y="70" width="16" height="150"/><rect x="40" y="62" width="24" height="10"/>
      <rect x="340" y="70" width="16" height="150"/><rect x="336" y="62" width="24" height="10"/>
    </g>
    <g fill="#caa54a">
      <path d="M44 62a8 8 0 0 1 16 0z"/><circle cx="52" cy="48" r="5"/>
      <path d="M340 62a8 8 0 0 1 16 0z"/><circle cx="348" cy="48" r="5"/>
    </g>
    <!-- main building -->
    <rect x="70" y="150" width="260" height="120" fill="url(#${u}wall)"/>
    <g fill="#b6a37c">
      <path d="M86 150a14 14 0 0 1 28 0z"/><path d="M126 150a14 14 0 0 1 28 0z"/>
      <path d="M246 150a14 14 0 0 1 28 0z"/><path d="M286 150a14 14 0 0 1 28 0z"/>
    </g>
    <!-- green dome -->
    <ellipse cx="200" cy="150" rx="46" ry="40" fill="url(#${u}dome)"/>
    <rect x="154" y="148" width="92" height="14" fill="#1f6b52"/>
    <path d="M196 92h8v18h-8z" fill="#caa54a"/><circle cx="200" cy="86" r="6" fill="#caa54a"/>
    <ellipse cx="186" cy="138" rx="10" ry="20" fill="#fff" opacity=".12"/>
    <rect x="0" y="270" width="400" height="30" fill="#b39f78"/>
  </svg>`;
}

/* --- Pilgrims in ihram, hands raised toward light --- */
function scenePilgrims() {
  const u = "pg" + _sceneSeq++;
  return `
  <svg class="scene" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <radialGradient id="${u}glow" cx="50%" cy="22%" r="60%">
        <stop offset="0" stop-color="#ffe9b0"/><stop offset=".5" stop-color="#caa05a"/><stop offset="1" stop-color="#5a3f25"/>
      </radialGradient>
    </defs>
    <rect width="400" height="300" fill="url(#${u}glow)"/>
    <circle cx="200" cy="62" r="40" fill="#fff4d6" opacity=".9"/>
    <g fill="#1c130c" opacity=".18">
      <rect x="0" y="170" width="400" height="14"/>
    </g>
    <!-- silhouettes of pilgrims -->
    <g fill="#3a2616">
      <g transform="translate(150 120)"><circle cx="0" cy="0" r="16"/><path d="M-22 96V34a22 22 0 0 1 44 0v62z"/></g>
      <g transform="translate(250 120)"><circle cx="0" cy="0" r="16"/><path d="M-22 96V34a22 22 0 0 1 44 0v62z"/></g>
    </g>
    <g fill="#f4eee2">
      <g transform="translate(150 132)"><path d="M-24 84V40a24 24 0 0 1 48 0v44z"/><path d="M-24 60l-10-26 8-3 9 22z"/><path d="M24 60l10-26-8-3-9 22z"/></g>
      <g transform="translate(250 132)"><path d="M-24 84V40a24 24 0 0 1 48 0v44z"/><path d="M-24 60l-10-26 8-3 9 22z"/><path d="M24 60l10-26-8-3-9 22z"/></g>
    </g>
    <g fill="#d9cdb6" opacity=".8">
      <g transform="translate(86 150)"><circle cx="0" cy="0" r="12"/><path d="M-16 70V28a16 16 0 0 1 32 0v42z"/></g>
      <g transform="translate(320 150)"><circle cx="0" cy="0" r="12"/><path d="M-16 70V28a16 16 0 0 1 32 0v42z"/></g>
    </g>
  </svg>`;
}

/* --- Travel: airplane over dunes at golden hour --- */
function sceneTravel() {
  const u = "tv" + _sceneSeq++;
  return `
  <svg class="scene" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="${u}sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#e9c987"/><stop offset=".6" stop-color="#caa05a"/><stop offset="1" stop-color="#8a5e34"/>
      </linearGradient>
      <linearGradient id="${u}dune" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#b07f44"/><stop offset="1" stop-color="#6e4a26"/>
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#${u}sky)"/>
    <circle cx="300" cy="96" r="34" fill="#fff1cf" opacity=".95"/>
    <g stroke="#fff" stroke-width="2" opacity=".5" fill="none">
      <path d="M40 70q40-14 80 0"/><path d="M70 92q40-14 80 0"/>
    </g>
    <!-- airplane -->
    <g transform="translate(120 84) rotate(-8)" fill="#23170d">
      <path d="M0 0l70 8-2 8-44 4 8 18-8 2-16-18-18 2 4-12 8-2z"/>
    </g>
    <path d="M0 210q70-40 140-10t140-26 120 6V300H0z" fill="url(#${u}dune)"/>
    <path d="M0 250q90-30 180 0t220-8V300H0z" fill="#5a3c20"/>
    <!-- palms -->
    <g fill="#2c1d10">
      <rect x="60" y="210" width="6" height="40"/><path d="M63 206q-22-8-30 2 18-2 30 4z"/><path d="M63 206q22-8 30 2-18-2-30 4z"/><path d="M63 204q-6-20-20-22 10 10 20 24z"/>
    </g>
  </svg>`;
}

const SCENES = {
  makkah: sceneMakkah,
  madinah: sceneMadinah,
  pilgrims: scenePilgrims,
  travel: sceneTravel,
};

/* Return SVG markup for a named scene (defaults to makkah). */
function sceneSVG(name) {
  const fn = SCENES[name] || SCENES.makkah;
  return fn();
}

/* Pick a default scene for a package based on its type. */
function sceneForPackage(p) {
  if (p && p.scene && SCENES[p.scene]) return p.scene;
  return p && p.type === "haji" ? "makkah" : "madinah";
}

/* Build a media block: optional real photo layered over a scene fallback.
   The image URL is HTML-escaped; load failures are handled by a global
   capture-phase listener in layout.js (so no inline onerror is needed). */
function mediaBlock(opts) {
  const scene = sceneSVG(opts.scene);
  const esc = (typeof escapeHtml === "function") ? escapeHtml : function (s) { return String(s == null ? "" : s); };
  const img = opts.image
    ? `<img class="scene-photo" src="${esc(opts.image)}" alt="${esc(opts.alt || "")}" loading="lazy"/>`
    : "";
  return `<div class="scene-wrap">${scene}${img}</div>`;
}
