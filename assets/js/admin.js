/* =========================================================
   ASA Tour & Travel — Admin / Package Management
   Full CRUD + active ("sedang berlaku") toggle.
   Persists through the ASA store (localStorage).
   ========================================================= */
(function () {
  const listEl = document.getElementById("adminList");
  const statsEl = document.getElementById("adminStats");
  const filterEl = document.getElementById("adminFilter");
  const searchEl = document.getElementById("adminSearch");

  const formModal = document.getElementById("formModal");
  const confirmModal = document.getElementById("confirmModal");
  const form = document.getElementById("pkgForm");
  const formTitle = document.getElementById("formTitle");

  let currentType = "all";
  let pendingDelete = null;

  /* ---------- Helpers ---------- */
  const $ = (id) => document.getElementById(id);
  function openModal(m) { m.classList.add("open"); document.body.style.overflow = "hidden"; }
  function closeModal(m) { m.classList.remove("open"); document.body.style.overflow = ""; }

  /* ---------- Render stats ---------- */
  function renderStats() {
    const s = ASA.stats();
    statsEl.innerHTML = `
      <div class="admin-stat"><b>${s.total}</b><span>Total</span></div>
      <div class="admin-stat"><b style="color:var(--gold-600)">${s.active}</b><span>Aktif</span></div>
      <div class="admin-stat"><b style="color:var(--red-500)">${s.total - s.active}</b><span>Nonaktif</span></div>`;
  }

  /* ---------- Render list ---------- */
  function renderList() {
    const q = (searchEl.value || "").trim().toLowerCase();
    let list = ASA.all();
    if (currentType !== "all") list = list.filter((p) => p.type === currentType);
    if (q) list = list.filter((p) => (p.name + " " + (p.airline || "")).toLowerCase().includes(q));

    if (!list.length) {
      listEl.innerHTML = `<div class="empty-state">${icon("compass")}<h3>Tidak ada paket</h3><p>Tambahkan paket baru atau ubah filter pencarian.</p></div>`;
      return;
    }

    listEl.innerHTML = list.map((p) => {
      const initial = p.type === "haji" ? "H" : "U";
      const badge = p.active
        ? `<span class="badge on"><span class="dot"></span> Berlaku</span>`
        : `<span class="badge off"><span class="dot"></span> Nonaktif</span>`;
      return `
      <div class="admin-row" data-id="${p.id}">
        <div class="ar-thumb ${p.type}">${initial}</div>
        <div class="ar-main">
          <b>${p.name}</b>
          <div class="ar-meta">
            <span>${fmt.rupiah(p.price)}</span>
            <span>${p.duration || "-"} hari</span>
            <span>${fmt.date(p.departure)}</span>
            ${badge}
            ${p.featured ? '<span class="badge on" style="background:rgba(212,175,55,.15);color:var(--gold-600)">★ Unggulan</span>' : ""}
          </div>
        </div>
        <div class="ar-actions">
          <label class="switch" title="Atur status berlaku">
            <input type="checkbox" data-toggle="${p.id}" ${p.active ? "checked" : ""}/>
            <span class="track"></span>
          </label>
          <button class="icon-btn" data-edit="${p.id}" title="Ubah" aria-label="Ubah">${icon("edit", "icon-sm")}</button>
          <button class="icon-btn danger" data-del="${p.id}" title="Hapus" aria-label="Hapus">${icon("trash", "icon-sm")}</button>
        </div>
      </div>`;
    }).join("");
  }

  function refresh() { renderStats(); renderList(); renderRegs(); updateRegBadge(); }

  /* ---------- Registrations ---------- */
  const regListEl = document.getElementById("regList");
  const regBadge = document.getElementById("regCountBadge");
  const STATUS_CYCLE = ["baru", "diproses", "selesai"];

  function updateRegBadge() {
    if (!regBadge) return;
    const n = REG.stats().baru;
    regBadge.textContent = n ? `(${n})` : "";
  }

  function renderRegs() {
    if (!regListEl) return;
    const list = REG.all();
    if (!list.length) {
      regListEl.innerHTML = `<div class="empty-state">${icon("users")}<h3>Belum ada pendaftaran</h3><p>Pendaftaran jamaah dari halaman Pendaftaran Online akan muncul di sini.</p></div>`;
      return;
    }
    regListEl.innerHTML = list.map((r) => {
      const date = new Date(r.createdAt);
      const when = isNaN(date) ? "" : date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) +
        " · " + date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
      const initial = (r.name || "?").charAt(0).toUpperCase();
      return `
      <div class="admin-row" data-rid="${r.id}">
        <div class="ar-thumb" style="background:linear-gradient(145deg,var(--ink-600),var(--ink-800))">${initial}</div>
        <div class="ar-main">
          <b>${r.name}</b>
          <div class="ar-meta">
            <span>${icon("phone","icon-sm")} ${r.phone || "-"}</span>
            <span>${r.pkg || "-"}</span>
            <span>${r.pax || 1} jamaah</span>
            ${r.city ? `<span>${r.city}</span>` : ""}
            <span style="color:var(--text-soft)">${when}</span>
          </div>
        </div>
        <div class="ar-actions">
          <button class="reg-status ${r.status}" data-status="${r.id}" title="Klik untuk ubah status">${r.status}</button>
          <button class="icon-btn danger" data-delreg="${r.id}" title="Hapus" aria-label="Hapus">${icon("trash","icon-sm")}</button>
        </div>
      </div>`;
    }).join("");
  }

  if (regListEl) {
    regListEl.addEventListener("click", (e) => {
      const st = e.target.closest("[data-status]");
      const del = e.target.closest("[data-delreg]");
      if (st) {
        const cur = REG.all().find((x) => x.id === st.getAttribute("data-status"));
        const next = STATUS_CYCLE[(STATUS_CYCLE.indexOf(cur.status) + 1) % STATUS_CYCLE.length];
        REG.setStatus(cur.id, next);
        renderRegs(); updateRegBadge();
        toast("Status pendaftaran: " + next + ".", "success");
      }
      if (del) {
        REG.remove(del.getAttribute("data-delreg"));
        renderRegs(); updateRegBadge();
        toast("Pendaftaran dihapus.", "danger");
      }
    });
  }

  /* ---------- View tabs (Paket / Pendaftaran) ---------- */
  const adminTabs = document.getElementById("adminTabs");
  if (adminTabs) {
    adminTabs.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-view]");
      if (!btn) return;
      adminTabs.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const view = btn.getAttribute("data-view");
      document.getElementById("viewPackages").style.display = view === "packages" ? "" : "none";
      document.getElementById("viewRegs").style.display = view === "regs" ? "" : "none";
    });
  }

  /* ---------- Form open (add / edit) ---------- */
  function openForm(pkg) {
    form.reset();
    const editing = !!pkg;
    formTitle.textContent = editing ? "Ubah Paket" : "Tambah Paket";
    $("f_id").value = editing ? pkg.id : "";
    $("f_name").value = editing ? pkg.name : "";
    $("f_type").value = editing ? pkg.type : "umroh";
    $("f_price").value = editing ? pkg.price : "";
    $("f_duration").value = editing ? (pkg.duration || "") : "";
    $("f_departure").value = editing ? (pkg.departure || "") : "";
    $("f_seats").value = editing && typeof pkg.seatsLeft === "number" ? pkg.seatsLeft : "";
    $("f_airline").value = editing ? (pkg.airline || "") : "";
    $("f_hotelMakkah").value = editing ? (pkg.hotelMakkah || "") : "";
    $("f_hotelMadinah").value = editing ? (pkg.hotelMadinah || "") : "";
    $("f_facilities").value = editing ? (pkg.facilities || []).join(", ") : "";
    $("f_image").value = editing ? (pkg.image || "") : "";
    $("f_description").value = editing ? (pkg.description || "") : "";
    $("f_active").checked = editing ? !!pkg.active : true;
    $("f_featured").checked = editing ? !!pkg.featured : false;
    openModal(formModal);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = $("f_id").value || null;
    const facilities = $("f_facilities").value.split(",").map((s) => s.trim()).filter(Boolean);
    const seatsRaw = $("f_seats").value;
    const pkg = {
      id,
      name: $("f_name").value.trim(),
      type: $("f_type").value,
      price: Number($("f_price").value) || 0,
      duration: Number($("f_duration").value) || 0,
      departure: $("f_departure").value || "",
      seatsLeft: seatsRaw === "" ? undefined : Number(seatsRaw),
      airline: $("f_airline").value.trim(),
      hotelMakkah: $("f_hotelMakkah").value.trim(),
      hotelMadinah: $("f_hotelMadinah").value.trim(),
      facilities,
      image: $("f_image").value.trim(),
      description: $("f_description").value.trim(),
      active: $("f_active").checked,
      featured: $("f_featured").checked,
      theme: $("f_type").value,
    };
    ASA.save(pkg);
    closeModal(formModal);
    refresh();
    toast(id ? "Paket berhasil diperbarui." : "Paket baru berhasil ditambahkan.", "success");
  });

  /* ---------- List interactions (event delegation) ---------- */
  listEl.addEventListener("click", (e) => {
    const edit = e.target.closest("[data-edit]");
    const del = e.target.closest("[data-del]");
    if (edit) { openForm(ASA.get(edit.getAttribute("data-edit"))); return; }
    if (del) {
      pendingDelete = del.getAttribute("data-del");
      const p = ASA.get(pendingDelete);
      $("confirmText").textContent = `"${p ? p.name : "Paket"}" akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.`;
      openModal(confirmModal);
    }
  });

  listEl.addEventListener("change", (e) => {
    const tog = e.target.closest("[data-toggle]");
    if (tog) {
      const p = ASA.toggleActive(tog.getAttribute("data-toggle"));
      refresh();
      toast(p && p.active ? "Paket diaktifkan (sedang berlaku)." : "Paket dinonaktifkan.", p && p.active ? "success" : "danger");
    }
  });

  /* ---------- Confirm delete ---------- */
  $("confirmOk").addEventListener("click", () => {
    if (pendingDelete) { ASA.remove(pendingDelete); pendingDelete = null; refresh(); toast("Paket dihapus.", "danger"); }
    closeModal(confirmModal);
  });
  $("confirmCancel").addEventListener("click", () => { pendingDelete = null; closeModal(confirmModal); });

  /* ---------- Toolbar ---------- */
  filterEl.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-filter]");
    if (!btn) return;
    filterEl.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentType = btn.getAttribute("data-filter");
    renderList();
  });
  searchEl.addEventListener("input", renderList);

  $("btnAdd").addEventListener("click", () => openForm(null));
  document.getElementById("formClose").addEventListener("click", () => closeModal(formModal));
  document.getElementById("formCancel").addEventListener("click", () => closeModal(formModal));
  formModal.addEventListener("click", (e) => { if (e.target === formModal) closeModal(formModal); });
  confirmModal.addEventListener("click", (e) => { if (e.target === confirmModal) closeModal(confirmModal); });

  $("btnReset").addEventListener("click", () => {
    ASA.reset();
    refresh();
    toast("Data contoh berhasil dikembalikan.", "success");
  });

  /* ---------- Init ---------- */
  refresh();
})();
