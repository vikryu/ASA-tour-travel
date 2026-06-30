/* =========================================================
   ASA Tour & Travel — Data Store
   Packages are loaded from data/packages.json — the file
   that the Pages CMS (pagescms.org) edits. Call ASA.init()
   (returns a Promise) before reading packages.
   The EMBEDDED list below is only an offline fallback.
   ========================================================= */

const ASA = (function () {
  // Offline fallback (dipakai hanya bila data/packages.json gagal dimuat).
  const EMBEDDED = [
    { id: "gold-3agu", name: "Paket Gold", tier: "Gold", category: "gold", type: "umroh", price: 50000000, duration: 12, departure: "2026-08-03", airline: "Garuda Indonesia", hotelMakkah: "Sofwa Tower / setaraf (★5)", hotelMadinah: "Al Haram / setaraf (★5)", scene: "makkah", image: "assets/img/masjidil-haram.jpg", active: true, featured: true, facilities: ["Hotel ★5", "City Tour Thaif", "Jabal Magnet"], description: "Umroh premium 12 hari dengan hotel bintang 5." },
  ];

  let _packages = EMBEDDED.slice();
  let _ready = null;

  // Buang leading slash agar path foto tetap relatif (aman di GitHub Pages subpath).
  function normImg(p) {
    if (p && typeof p.image === "string") p.image = p.image.replace(/^\/+/, "");
    return p;
  }

  function init() {
    if (_ready) return _ready;
    _ready = fetch("data/packages.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (json && Array.isArray(json.packages) && json.packages.length) {
          _packages = json.packages.map(normImg);
        }
      })
      .catch(() => { /* keep fallback */ });
    return _ready;
  }


  /* ---- Public API (sync; call after init() resolves) ---- */
  return {
    init,
    ready: init,
    all() { return _packages; },
    active() { return _packages.filter((p) => p.active); },
    byType(type) {
      const a = this.active();
      return type && type !== "all" ? a.filter((p) => p.type === type) : a;
    },
    byCategory(cat) {
      const a = this.active();
      return cat && cat !== "all" ? a.filter((p) => p.category === cat) : a;
    },
    featured(limit) {
      const f = this.active().filter((p) => p.featured);
      const list = f.length ? f : this.active();
      return typeof limit === "number" ? list.slice(0, limit) : list;
    },
    get(id) { return _packages.find((p) => p.id === id) || null; },
    stats() {
      return {
        total: _packages.length,
        active: _packages.filter((p) => p.active).length,
        umroh: _packages.filter((p) => p.type === "umroh").length,
      };
    },
  };
})();


/* ---- Formatting utilities ---- */
const fmt = {
  rupiah(n) {
    if (n == null || isNaN(n)) return "-";
    return "Rp " + Number(n).toLocaleString("id-ID");
  },
  rupiahShort(n) {
    if (n == null || isNaN(n)) return "-";
    const jt = Number(n) / 1000000;
    const val = jt % 1 === 0 ? jt.toFixed(0) : jt.toFixed(1).replace(".", ",");
    return "Rp " + val + " jt";
  },
  date(iso) {
    if (!iso) return "Jadwal menyusul";
    const d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return iso;
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  },
};

/* =========================================================
   Registration store — pendaftaran jamaah (localStorage)
   ========================================================= */
const REG = (function () {
  const KEY = "asa_registrations_v1";
  function load() {
    try { const r = localStorage.getItem(KEY); if (r) return JSON.parse(r); } catch (e) {}
    return [];
  }
  function persist(list) {
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {}
  }
  return {
    all() { return load(); },
    add(reg) {
      const list = load();
      reg.id = "reg-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
      reg.createdAt = new Date().toISOString();
      reg.status = reg.status || "baru";
      list.unshift(reg);
      persist(list);
      return reg;
    },
    remove(id) { const list = load().filter((r) => r.id !== id); persist(list); return list; },
    setStatus(id, status) {
      const list = load();
      const r = list.find((x) => x.id === id);
      if (r) { r.status = status; persist(list); }
      return r;
    },
    stats() {
      const all = load();
      return { total: all.length, baru: all.filter((r) => r.status === "baru").length };
    },
  };
})();
