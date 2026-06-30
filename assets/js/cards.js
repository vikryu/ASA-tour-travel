/* =========================================================
   ASA Tour & Travel — Shared Package Card + Detail Modal
   Used by the Home and Packages pages.
   ========================================================= */

/* Decorative gradient backdrop per package theme */
function pkgGradient(p) {
  return p.type === "haji"
    ? "linear-gradient(155deg, var(--milk-400), var(--ink-800))"
    : "linear-gradient(155deg, var(--red-500), var(--ink-800))";
}

function pkgTier(p) {
  return {
    label: p.tier || (p.type === "haji" ? "Haji" : "Umroh"),
    cls: "tier-" + (p.category || (p.type === "haji" ? "haji" : "umroh")),
  };
}

function pkgCardHTML(p) {
  const e = escapeHtml;
  const t = pkgTier(p);
  const facils = (p.facilities || []).slice(0, 3)
    .map((f) => `<span class="chip">${e(f)}</span>`).join("");
  const more = (p.facilities || []).length > 3
    ? `<span class="chip">+${p.facilities.length - 3} lagi</span>` : "";
  const seats = (typeof p.seatsLeft === "number" && p.seatsLeft <= 10)
    ? `<div class="pkg-quota">${icon("users","icon-sm")} Sisa ${Number(p.seatsLeft)} kursi</div>` : "";

  return `
  <article class="pkg reveal" data-type="${e(p.type)}" data-id="${e(p.id)}">
    <div class="pkg-media">
      ${mediaBlock({ scene: sceneForPackage(p), image: p.image, alt: p.name })}
      <div class="scrim"></div>
      <span class="pkg-type ${e(t.cls)}">${e(t.label)}</span>
      <span class="pkg-flag">${icon("calendar","icon-sm")} ${e(fmt.date(p.departure))}</span>
      <div class="pm-title"><b>${e(p.name)}</b><span>${Number(p.duration) || ""} hari · ${e(p.airline || "Penerbangan terbaik")}</span></div>
    </div>
    <div class="pkg-body">
      <div class="pkg-meta">
        <span>${icon("hotel","icon-sm")} ${e(p.hotelMakkah || "Hotel pilihan")}</span>
        <span>${icon("clock","icon-sm")} ${Number(p.duration) || ""} hari</span>
      </div>
      <div class="pkg-facils">${facils}${more}</div>
      <div class="pkg-foot">
        <div class="pkg-price">
          <small>Mulai dari</small>
          <b><span class="cur">Rp</span> ${Number(p.price).toLocaleString("id-ID")}</b>
          ${seats}
        </div>
        <button class="btn btn-dark btn-sm" data-detail="${e(p.id)}">Detail ${icon("arrow","icon-sm")}</button>
      </div>
    </div>
  </article>`;
}

/* Render a list of packages into a container, wire up detail buttons */
function renderPackages(container, list) {
  if (!container) return;
  if (!list.length) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        ${icon("compass")}
        <h3>Belum ada paket pada kategori ini</h3>
        <p>Silakan pilih kategori lain atau hubungi kami untuk paket khusus sesuai kebutuhan Anda.</p>
      </div>`;
    return;
  }
  container.innerHTML = list.map(pkgCardHTML).join("");
  container.querySelectorAll("[data-detail]").forEach((btn) => {
    btn.addEventListener("click", () => openPackageDetail(btn.getAttribute("data-detail")));
  });
  // re-run reveal for freshly added cards
  if (typeof initReveal === "function") initReveal();
}

/* ---------- Detail modal ---------- */
function ensureModalRoot() {
  let root = document.getElementById("pkgModal");
  if (root) return root;
  root = document.createElement("div");
  root.id = "pkgModal";
  root.className = "modal-overlay";
  root.innerHTML = `<div class="modal modal-detail" role="dialog" aria-modal="true"></div>`;
  document.body.appendChild(root);
  root.addEventListener("click", (e) => {
    if (e.target === root || (e.target.closest && e.target.closest("[data-close]"))) closePackageDetail();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closePackageDetail(); });
  return root;
}

function openPackageDetail(id) {
  const p = ASA.get(id);
  if (!p) return;
  const root = ensureModalRoot();
  const box = root.querySelector(".modal");
  const t = pkgTier(p);
  const e = escapeHtml;
  const facils = (p.facilities || []).map((f) => `<li>${icon("check","icon-sm ic")} ${e(f)}</li>`).join("");
  const msg = `Halo ASA Tour & Travel, saya tertarik dengan paket "${p.name}" (${fmt.rupiah(p.price)}). Mohon info pendaftarannya.`;

  box.innerHTML = `
    <div class="modal-head">
      <h3>Detail Paket</h3>
      <button class="modal-close" type="button" data-close aria-label="Tutup">${icon("x")}</button>
    </div>
    <div class="modal-body">
      <div class="detail-hero">
        ${mediaBlock({ scene: sceneForPackage(p), image: p.image, alt: p.name })}
        <div class="scrim"></div>
        <span class="pkg-type ${e(t.cls)}" style="position:absolute;top:16px;left:16px;z-index:3">${e(t.label)}</span>
        <div class="dh-text"><b>${e(p.name)}</b><span>${Number(p.duration) || ""} hari · ${e(p.airline || "")}</span></div>
      </div>
      <p style="color:var(--text-soft);margin-bottom:6px">${e(p.description || "")}</p>
      <div class="detail-grid">
        <div class="detail-item"><span>Keberangkatan</span><b>${e(fmt.date(p.departure))}</b></div>
        <div class="detail-item"><span>Durasi</span><b>${Number(p.duration) || "-"} Hari</b></div>
        <div class="detail-item"><span>Maskapai</span><b>${e(p.airline || "-")}</b></div>
        <div class="detail-item"><span>Sisa Kursi</span><b>${typeof p.seatsLeft === "number" ? Number(p.seatsLeft) + " kursi" : "Tersedia"}</b></div>
        <div class="detail-item"><span>Hotel Makkah</span><b>${e(p.hotelMakkah || "-")}</b></div>
        <div class="detail-item"><span>Hotel Madinah</span><b>${e(p.hotelMadinah || "-")}</b></div>
      </div>
      <h4 style="font-size:1.05rem;margin-bottom:4px">Fasilitas Termasuk</h4>
      <ul class="detail-list">${facils}</ul>
      <div class="detail-item" style="display:flex;justify-content:space-between;align-items:center;background:var(--ink-900);color:#fff;border:none">
        <div><span style="color:var(--milk-300)">Harga paket mulai</span><b style="color:var(--gold-300);font-size:1.6rem;font-family:var(--font-head)">${fmt.rupiah(p.price)}</b></div>
        <span style="font-size:.8rem;color:var(--milk-300)">/ jamaah</span>
      </div>
    </div>
    <div class="modal-foot">
      <a class="btn btn-ghost" href="pendaftaran.html?pkg=${encodeURIComponent(p.name)}">${icon("book","icon-sm")} Daftar Online</a>
      <a class="btn btn-gold" target="_blank" rel="noopener noreferrer" href="${e(waLink(msg))}">${icon("whatsapp","icon-sm")} Daftar via WhatsApp</a>
    </div>`;
  root.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closePackageDetail() {
  const root = document.getElementById("pkgModal");
  if (root) root.classList.remove("open");
  document.body.style.overflow = "";
}
