/* =========================================================
   ASA Tour & Travel — Shared Layout & Utilities
   Injects header + footer, handles nav, scroll reveal,
   toasts, and provides an inline SVG icon helper.
   ========================================================= */

/* ---------- Inline SVG icons (stroke-based, currentColor) ---------- */
const ICONS = {
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  plane: '<path d="M17.8 19.2 16 11l3.5-3.5a2.12 2.12 0 0 0-3-3L13 8 4.8 6.2a1 1 0 0 0-.9 1.7l4.6 3.3-2.1 2.1-1.7-.4a1 1 0 0 0-.9 1.7l2 2 2 2a1 1 0 0 0 1.7-.9l-.4-1.7 2.1-2.1 3.3 4.6a1 1 0 0 0 1.7-.9Z"/>',
  hotel: '<path d="M3 21V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v16"/><path d="M3 21h18M9 8h.01M9 12h.01M15 8h.01M15 12h.01M10 21v-4a2 2 0 0 1 4 0v4"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  star: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2Z"/>',
  heart: '<path d="M19 14c1.5-1.5 3-3.3 3-5.5A5.5 5.5 0 0 0 12 5 5.5 5.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7Z"/>',
  kaaba: '<path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z"/><path d="m3 7 9 5 9-5M12 12v10"/><path d="M3 11h18"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="m8.21 13.89-1.21 7.11 5-3 5 3-1.21-7.12"/>',
  headset: '<path d="M3 14v-3a9 9 0 0 1 18 0v3"/><path d="M21 16a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2ZM3 16a2 2 0 0 0 2 2h1v-6H5a2 2 0 0 0-2 2Z"/><path d="M21 16v1a4 4 0 0 1-4 4h-5"/>',
  wallet: '<path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5"/><path d="M16 12h.01"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  trash: '<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
  whatsapp: '<path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2Z"/><path d="M8.5 7.5c-.3 0-.7.1-.9.4-.3.4-1 1-1 2.3s1 2.6 1.2 2.8c.2.2 2 3.2 5 4.3 2.4 1 2.9.8 3.5.8.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3"/>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z"/>',
  youtube: '<path d="M22 8.5a3 3 0 0 0-2-2.1C18 6 12 6 12 6s-6 0-8 .4A3 3 0 0 0 2 8.5 31 31 0 0 0 2 12a31 31 0 0 0 0 3.5 3 3 0 0 0 2 2.1C6 18 12 18 12 18s6 0 8-.4a3 3 0 0 0 2-2.1 31 31 0 0 0 0-3.5 31 31 0 0 0 0-3.5Z"/><path d="m10 15 5-3-5-3Z"/>',
  sparkle: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z"/>',
  refresh: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m16 8-2 6-6 2 2-6 6-2Z"/>',
};

function icon(name, cls) {
  const path = ICONS[name] || "";
  return `<svg class="icon ${cls || ""}" viewBox="0 0 24 24" aria-hidden="true">${path}</svg>`;
}

/* ---------- Brand block ---------- */
function brandMarkup(forFooter) {
  return `
    <a href="index.html" class="brand" aria-label="ASA Tour & Travel">
      <span class="brand-mark"><span>A</span></span>
      <span class="brand-text">
        <b>ASA Tour${forFooter ? "" : " <span style='color:var(--red-500)'>&amp;</span> Travel"}</b>
        <small>Haji &amp; Umroh Amanah</small>
      </span>
    </a>`;
}

/* ---------- Header / Nav ---------- */
const NAV_ITEMS = [
  { href: "index.html", label: "Beranda" },
  { href: "paket.html", label: "Paket" },
  { href: "galeri.html", label: "Galeri" },
  { href: "tentang.html", label: "Tentang" },
  { href: "kontak.html", label: "Kontak" },
];

const WA_NUMBER = "6289525615820";
const IG_URL = "https://www.instagram.com/asatravelhajidanumroh";
const FB_URL = "https://www.facebook.com/share/1DoG9Bxgnb/";
const MAP_URL = "https://share.google/7a1M5u8J9fgbuJwSh";
function waLink(text) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text || "Halo ASA Tour & Travel, saya ingin bertanya tentang paket umroh yang tersedia.")}`;
}

function renderHeader() {
  const here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const links = NAV_ITEMS.map((n) => {
    const active = n.href.toLowerCase() === here ? "active" : "";
    return `<a href="${n.href}" class="${active}">${n.label}</a>`;
  }).join("");

  const html = `
    <div class="topbar">
      <div class="container">
        <div class="tb-left">
          <span>${icon("phone", "icon-sm")} 0895-2561-5820</span>
          <span>${icon("mail", "icon-sm")} arayasuksesabadi@gmail.com</span>
          <span>${icon("clock", "icon-sm")} Senin–Sabtu, 08.00–16.00 WIB</span>
        </div>
        <div class="tb-social">
          <a href="${IG_URL}" target="_blank" rel="noopener" aria-label="Instagram">${icon("instagram", "icon-sm")}</a>
          <a href="${FB_URL}" target="_blank" rel="noopener" aria-label="Facebook">${icon("facebook", "icon-sm")}</a>
        </div>
      </div>
    </div>
    <header class="site-header" id="siteHeader">
      <div class="container">
        <nav class="nav">
          ${brandMarkup(false)}
          <div class="nav-links" id="navLinks">${links}</div>
          <div class="nav-cta">
            <a href="pendaftaran.html" class="btn btn-gold btn-sm">${icon("book", "icon-sm")} Daftar</a>
            <button class="nav-toggle" id="navToggle" aria-label="Menu"><span></span><span></span><span></span></button>
          </div>
        </nav>
      </div>
    </header>`;

  const mount = document.getElementById("header");
  if (mount) mount.innerHTML = html;

  const toggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  if (toggle) toggle.addEventListener("click", () => {
    toggle.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  const header = document.getElementById("siteHeader");
  const onScroll = () => header && header.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------- Footer ---------- */
function renderFooter() {
  const year = new Date().getFullYear();
  const html = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-about">
            ${brandMarkup(true)}
            <p>Biro perjalanan ibadah Umroh yang amanah, profesional, dan tepercaya. Kami membantu setiap jamaah menyempurnakan ibadah ke Tanah Suci dengan kenyamanan maksimal.</p>
            <div class="footer-social">
              <a href="${IG_URL}" target="_blank" rel="noopener" aria-label="Instagram">${icon("instagram", "icon-sm")}</a>
              <a href="${FB_URL}" target="_blank" rel="noopener" aria-label="Facebook">${icon("facebook", "icon-sm")}</a>
              <a href="${waLink()}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon("whatsapp", "icon-sm")}</a>
            </div>
          </div>
          <div>
            <h4>Navigasi</h4>
            <ul class="footer-links">
              <li><a href="index.html">Beranda</a></li>
              <li><a href="paket.html">Paket Umroh &amp; Haji</a></li>
              <li><a href="galeri.html">Galeri</a></li>
              <li><a href="pendaftaran.html">Pendaftaran Online</a></li>
              <li><a href="tentang.html">Tentang Kami</a></li>
              <li><a href="kontak.html">Kontak</a></li>
            </ul>
          </div>
          <div>
            <h4>Layanan</h4>
            <ul class="footer-links">
              <li><a href="paket.html?kategori=gold">Paket Gold (★5)</a></li>
              <li><a href="paket.html?kategori=silver">Paket Silver (★4)</a></li>
              <li><a href="paket.html?kategori=barokah">Umroh Barokah (★3)</a></li>
              <li><a href="paket.html?kategori=hemat">Special Hemat</a></li>
              <li><a href="pendaftaran.html">Pendaftaran Online</a></li>
            </ul>
          </div>
          <div>
            <h4>Hubungi Kami</h4>
            <ul class="footer-contact">
              <li>${icon("pin", "icon-sm")} <span>Perum Bumi Papan Selaras Blok CA 41, Tanggul, Wonoayu, Sidoarjo, Jawa Timur</span></li>
              <li>${icon("phone", "icon-sm")} <span>WA 0895-2561-5820 · Telp 031-5828-1200</span></li>
              <li>${icon("mail", "icon-sm")} <span>arayasuksesabadi@gmail.com</span></li>
              <li>${icon("shield", "icon-sm")} <span>ASA Tour &amp; Travel — Araya Sukses Abadi</span></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${year} ASA Tour &amp; Travel. Seluruh hak cipta dilindungi.</span>
          <span>Dibuat dengan ketulusan untuk para tamu Allah.</span>
        </div>
      </div>
    </footer>`;
  const mount = document.getElementById("footer");
  if (mount) mount.innerHTML = html;
}

/* ---------- Floating WhatsApp ---------- */
function renderFab() {
  const a = document.createElement("a");
  a.href = waLink();
  a.target = "_blank";
  a.rel = "noopener";
  a.className = "fab-wa";
  a.setAttribute("aria-label", "Chat WhatsApp");
  a.innerHTML = icon("whatsapp", "icon-lg");
  document.body.appendChild(a);
}

/* ---------- Toast ---------- */
function toast(message, type) {
  let wrap = document.querySelector(".toast-wrap");
  if (!wrap) { wrap = document.createElement("div"); wrap.className = "toast-wrap"; document.body.appendChild(wrap); }
  const el = document.createElement("div");
  el.className = "toast " + (type || "");
  const ic = type === "danger" ? "trash" : type === "success" ? "check" : "sparkle";
  el.innerHTML = `${icon(ic, "icon-sm")}<span>${message}</span>`;
  wrap.appendChild(el);
  setTimeout(() => { el.style.opacity = "0"; el.style.transform = "translateX(30px)"; el.style.transition = ".3s"; }, 2600);
  setTimeout(() => el.remove(), 3000);
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !els.length) { els.forEach((e) => e.classList.add("in")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach((e) => io.observe(e));
}

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  renderFab();
  initReveal();
});
