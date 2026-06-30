/* =========================================================
   ASA Tour & Travel — Online Registration (Pendaftaran)
   Saves the registration locally and forwards a summary
   to WhatsApp. Pre-fills the chosen package from ?pkg=.
   ========================================================= */
(function () {
  const sel = document.getElementById("r_pkg");
  const summaryBox = document.getElementById("pkgSummary");

  /* Populate active packages into the dropdown */
  function packageById(name) { return ASA.active().find((p) => p.name === name); }

  ASA.init().then(function () {
    if (!sel) return;
    ASA.active().forEach((p) => {
      const o = document.createElement("option");
      o.value = p.name;
      o.textContent = `${p.tier || (p.type === "haji" ? "Haji" : "Umroh")} — ${p.name} (${fmt.rupiahShort(p.price)})`;
      sel.appendChild(o);
    });
    const pre = new URLSearchParams(location.search).get("pkg");
    if (pre) sel.value = pre;
    sel.addEventListener("change", renderSummary);
    renderSummary();
  });

  function renderSummary() {
    if (!summaryBox) return;
    const p = packageById(sel.value);
    if (!p) {
      summaryBox.innerHTML = `<div class="empty-state" style="padding:30px">${icon("compass")}<p>Pilih paket untuk melihat ringkasan harga dan jadwal.</p></div>`;
      return;
    }
    const media = (typeof mediaBlock === "function")
      ? mediaBlock({ scene: (typeof sceneForPackage === "function" ? sceneForPackage(p) : "makkah"), image: p.image, alt: p.name })
      : "";
    const tierLabel = p.tier || (p.type === "haji" ? "Haji" : "Umroh");
    const tierCls = "tier-" + (p.category || "umroh");
    summaryBox.innerHTML = `
      <div class="sum-media">${media}
        <span class="pkg-type ${tierCls}">${tierLabel}</span>
      </div>
      <div class="sum-body">
        <b>${p.name}</b>
        <div class="sum-meta">
          <span>${icon("calendar","icon-sm")} ${fmt.date(p.departure)}</span>
          <span>${icon("clock","icon-sm")} ${p.duration} hari</span>
          <span>${icon("plane","icon-sm")} ${p.airline || "-"}</span>
        </div>
        <div class="sum-price"><span>Estimasi biaya / jamaah</span><b>${fmt.rupiah(p.price)}</b></div>
      </div>`;
  }

  /* Submit */
  const form = document.getElementById("registerForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const reg = {
        name: val("r_name"), nik: val("r_nik"), phone: val("r_phone"), email: val("r_email"),
        gender: val("r_gender"), birth: val("r_birth"), city: val("r_city"),
        pkg: val("r_pkg"), pax: Number(val("r_pax")) || 1, room: val("r_room"), notes: val("r_notes"),
      };
      if (!reg.name || !reg.phone || !reg.pkg) {
        toast("Lengkapi nama, no. WhatsApp, dan pilihan paket.", "danger");
        return;
      }
      const saved = REG.add(reg);

      // Success panel
      const wrap = document.getElementById("registerWrap");
      const p = packageById(reg.pkg);
      const total = p ? p.price * reg.pax : 0;
      const waText =
        `Assalamu'alaikum ASA Tour %26 Travel,%0Asaya ingin mendaftar paket berikut:%0A%0A` +
        `Nama: ${reg.name}%0ANIK: ${reg.nik || "-"}%0ANo. WA: ${reg.phone}%0AEmail: ${reg.email || "-"}%0A` +
        `Kota: ${reg.city || "-"}%0APaket: ${reg.pkg}%0AJumlah jamaah: ${reg.pax}%0AKamar: ${reg.room || "-"}%0A` +
        (reg.notes ? `Catatan: ${reg.notes}%0A` : "") +
        `%0ANo. pendaftaran: ${saved.id}`;

      wrap.innerHTML = `
        <div class="card reveal in" style="text-align:center;padding:46px 34px;max-width:620px;margin:0 auto">
          <div style="width:74px;height:74px;border-radius:50%;background:rgba(56,142,60,.12);color:#2e7d32;display:grid;place-items:center;margin:0 auto 18px">
            ${icon("check","icon-lg")}
          </div>
          <h2 style="font-size:1.8rem;margin-bottom:8px">Pendaftaran Diterima</h2>
          <p style="color:var(--text-soft);max-width:440px;margin:0 auto 14px">
            Terima kasih, <b>${reg.name}</b>. Pendaftaran Anda untuk <b>${reg.pkg}</b> telah kami catat.
            No. pendaftaran <b>${saved.id}</b>. Konfirmasikan melalui WhatsApp agar tim kami segera memproses.
          </p>
          ${total ? `<p style="margin-bottom:22px">Estimasi total untuk ${reg.pax} jamaah: <b style="color:var(--gold-600);font-family:var(--font-head);font-size:1.3rem">${fmt.rupiah(total)}</b></p>` : ""}
          <div class="cta-actions">
            <a class="btn btn-gold" target="_blank" rel="noopener" href="https://wa.me/${WA_NUMBER}?text=${waText}">${icon("whatsapp","icon-sm")} Konfirmasi via WhatsApp</a>
            <a class="btn btn-ghost" href="paket.html">Lihat Paket Lain</a>
          </div>
        </div>`;
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast("Pendaftaran berhasil disimpan.", "success");
    });
  }

  function val(id) { const el = document.getElementById(id); return el ? el.value.trim() : ""; }
})();
