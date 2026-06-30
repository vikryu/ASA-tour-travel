/* =========================================================
   ASA Tour & Travel — Data Store
   Manages umroh packages with localStorage persistence.
   The DEFAULT_PACKAGES below are the source of truth for ALL
   visitors of the published site. To change packages for
   everyone, edit this list and bump STORAGE_KEY (v2 -> v3).
   ========================================================= */

const ASA = (function () {
  const STORAGE_KEY = "asa_packages_v2";
  const SEED_FLAG = "asa_seeded_v2";

  // Photo paths (upload these files to assets/img/). If a file is
  // missing, the brand illustration is shown automatically instead.
  const IMG = {
    haram: "assets/img/masjidil-haram.jpg",
    kabah: "assets/img/kabah.jpg",
    nabawiKubah: "assets/img/masjid-nabawi-kubah.jpg",
    nabawiMenara: "assets/img/masjid-nabawi-menara.jpg",
  };

  /* ---- Default / seed packages (data asli ASA Tour & Travel) ---- */
  const DEFAULT_PACKAGES = [

    {
      id: "silver-3agu", name: "Paket Silver", tier: "Silver", category: "silver",
      type: "umroh", price: 41000000, duration: 12, departure: "2026-08-03",
      airline: "Garuda Indonesia",
      hotelMakkah: "Grand Al Massa / setaraf (★4)",
      hotelMadinah: "Safwat / setaraf (★4)",
      scene: "makkah", image: IMG.kabah, active: true, featured: true,
      facilities: ["Hotel ★4", "City Tour Thaif", "Jabal Magnet", "Kereta Cepat", "Makan 3x", "Air Zamzam 5L", "Muthawwif", "Manasik"],
      description: "Paket umroh 12 hari dengan hotel bintang 4 dekat masjid, lengkap dengan City Tour Thaif, Jabal Magnet, dan kereta cepat Haramain.",
    },
    {
      id: "gold-3agu", name: "Paket Gold", tier: "Gold", category: "gold",
      type: "umroh", price: 50000000, duration: 12, departure: "2026-08-03",
      airline: "Garuda Indonesia",
      hotelMakkah: "Sofwa Tower / setaraf (★5)",
      hotelMadinah: "Al Haram / setaraf (★5)",
      scene: "makkah", image: IMG.haram, active: true, featured: true,
      facilities: ["Hotel ★5", "City Tour Thaif", "Jabal Magnet", "Kereta Cepat", "Makan 3x", "Air Zamzam 5L", "Muthawwif", "Manasik"],
      description: "Umroh premium 12 hari dengan hotel bintang 5 (Al Haram & Sofwa Tower) berjarak sangat dekat dari masjid, plus City Tour Thaif, Jabal Magnet, dan kereta cepat.",
    },
    {
      id: "silver-10agu", name: "Paket Silver", tier: "Silver", category: "silver",
      type: "umroh", price: 39500000, duration: 12, departure: "2026-08-10",
      airline: "Garuda Indonesia",
      hotelMakkah: "Grand Al Massa / setaraf (★4)",
      hotelMadinah: "Safwat / setaraf (★4)",
      scene: "makkah", image: IMG.kabah, active: true, featured: false,
      facilities: ["Hotel ★4", "City Tour Thaif", "Jabal Magnet", "Makan 3x", "Air Zamzam 5L", "Muthawwif", "Manasik"],
      description: "Paket umroh 12 hari hotel bintang 4 dengan City Tour Thaif dan Jabal Magnet. Pilihan nyaman dengan harga bersahabat.",
    },
    {
      id: "gold-10agu", name: "Paket Gold", tier: "Gold", category: "gold",
      type: "umroh", price: 50000000, duration: 12, departure: "2026-08-10",
      airline: "Garuda Indonesia",
      hotelMakkah: "Safwah Tower / setaraf (★5)",
      hotelMadinah: "Al Haram / setaraf (★5)",
      scene: "makkah", image: IMG.haram, active: true, featured: false,
      facilities: ["Hotel ★5", "City Tour Thaif", "Jabal Magnet", "Kereta Cepat", "Makan 3x", "Air Zamzam 5L", "Muthawwif", "Manasik"],
      description: "Umroh premium 12 hari dengan hotel bintang 5 (Al Haram & Safwah Tower), City Tour Thaif, Jabal Magnet, dan kereta cepat Haramain.",
    },

    {
      id: "silver-17sep", name: "Paket Silver", tier: "Silver", category: "silver",
      type: "umroh", price: 37500000, duration: 10, departure: "2026-09-17",
      airline: "Garuda Indonesia",
      hotelMakkah: "Grand Al Massa / setaraf (★4)",
      hotelMadinah: "Safwat / setaraf (★4)",
      scene: "makkah", image: IMG.kabah, active: true, featured: false,
      facilities: ["Hotel ★4", "Jabal Magnet", "Thaif + Telefrik", "Makan 3x", "Air Zamzam 5L", "Muthawwif", "Manasik"],
      description: "Paket umroh hemat waktu 10 hari, hotel bintang 4, dengan Jabal Magnet serta wisata Thaif lengkap dengan Telefrik (kereta gantung).",
    },
    {
      id: "gold-17sep", name: "Paket Gold", tier: "Gold", category: "gold",
      type: "umroh", price: 48000000, duration: 10, departure: "2026-09-17",
      airline: "Garuda Indonesia",
      hotelMakkah: "Safwah Tower / setaraf (★5)",
      hotelMadinah: "Al Haram / setaraf (★5)",
      scene: "makkah", image: IMG.haram, active: true, featured: false,
      facilities: ["Hotel ★5", "Jabal Magnet", "Thaif + Telefrik", "Kereta Cepat", "Makan 3x", "Air Zamzam 5L", "Muthawwif", "Manasik"],
      description: "Umroh premium 10 hari dengan hotel bintang 5, Jabal Magnet, wisata Thaif + Telefrik, dan kereta cepat Haramain.",
    },
    {
      id: "barokah-26sep", name: "Umroh Barokah", tier: "Barokah", category: "barokah",
      type: "umroh", price: 36600000, duration: 12, departure: "2026-09-26",
      airline: "Garuda Indonesia",
      hotelMakkah: "Nada Ajyad / setaraf (★3)",
      hotelMadinah: "Karam Group / setaraf (★3)",
      scene: "madinah", image: IMG.nabawiKubah, active: true, featured: true,
      facilities: ["Hotel ★3", "City Tour Thaif", "Jabal Magnet", "Makan 3x", "Air Zamzam 5L", "Muthawwif", "Manasik"],
      description: "Paket umroh 12 hari penuh keberkahan dengan harga terjangkau, hotel bintang 3, City Tour Thaif, dan Jabal Magnet.",
    },
    {
      id: "barokah-8okt", name: "Umroh Barokah", tier: "Barokah", category: "barokah",
      type: "umroh", price: 42100000, duration: 16, departure: "2026-10-08",
      airline: "Lion Air",
      hotelMakkah: "Kunuz Ajyad / setaraf (★3)",
      hotelMadinah: "Safwat / setaraf (★4)",
      scene: "madinah", image: IMG.nabawiKubah, active: true, featured: false,
      facilities: ["Durasi 16 Hari", "City Tour Thaif", "Jabal Magnet", "Makan 3x", "Air Zamzam 5L", "Muthawwif", "Manasik"],
      description: "Umroh 16 hari untuk ibadah lebih lama dan khusyuk, hotel Madinah bintang 4 & Makkah bintang 3, dengan City Tour Thaif dan Jabal Magnet.",
    },

    {
      id: "barokah-24okt", name: "Umroh Barokah", tier: "Barokah", category: "barokah",
      type: "umroh", price: 35600000, duration: 12, departure: "2026-10-24",
      airline: "Lion Air",
      hotelMakkah: "Ramada Inn / setaraf (★3)",
      hotelMadinah: "Karam Group / setaraf (★3)",
      scene: "madinah", image: IMG.nabawiKubah, active: true, featured: false,
      facilities: ["Hotel ★3", "City Tour Thaif", "Jabal Magnet", "Makan 3x", "Air Zamzam 5L", "Muthawwif", "Manasik"],
      description: "Paket umroh 12 hari dengan harga paling bersahabat di kelas Barokah, hotel bintang 3, City Tour Thaif, dan Jabal Magnet.",
    },
    {
      id: "hemat-silver-26okt", name: "Special Hemat Silver", tier: "Hemat", category: "hemat",
      type: "umroh", price: 32600000, duration: 12, departure: "2026-10-26",
      airline: "Lion Air",
      hotelMakkah: "Fajar Badee 4 / setaraf (★3)",
      hotelMadinah: "Burj Mawaddah / setaraf (★3)",
      scene: "madinah", image: IMG.nabawiMenara, active: true, featured: false,
      facilities: ["Harga Paling Hemat", "Hotel ★3", "Makan 3x", "Air Zamzam 5L", "Muthawwif", "Manasik"],
      description: "Paket umroh 12 hari paling ekonomis. Tetap nyaman dan amanah dengan hotel bintang 3, makan 3x sehari, dan bimbingan ibadah lengkap.",
    },
    {
      id: "hemat-gold-26okt", name: "Special Hemat Gold", tier: "Hemat", category: "hemat",
      type: "umroh", price: 42600000, duration: 12, departure: "2026-10-26",
      airline: "Lion Air",
      hotelMakkah: "Safwah Tower / setaraf (★5)",
      hotelMadinah: "Al Haram / setaraf (★5)",
      scene: "makkah", image: IMG.haram, active: true, featured: false,
      facilities: ["Hotel ★5 Harga Hemat", "Makan 3x", "Air Zamzam 5L", "Muthawwif", "Manasik"],
      description: "Nikmati hotel bintang 5 (Al Haram & Safwah Tower) dengan harga special hemat. Umroh 12 hari mewah namun tetap terjangkau.",
    },
  ];


  /* ---- Internal helpers ---- */
  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* ignore */ }
    return null;
  }
  function persist(list) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch (e) {}
  }
  function ensureSeed() {
    let list = load();
    if (!list) {
      list = DEFAULT_PACKAGES.map((p) => ({ ...p }));
      persist(list);
      try { localStorage.setItem(SEED_FLAG, "1"); } catch (e) {}
    }
    return list;
  }
  function slugify(s) {
    return (s || "paket").toString().toLowerCase()
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
  }

  /* ---- Public API ---- */
  return {
    all() { return ensureSeed(); },
    active() { return ensureSeed().filter((p) => p.active); },
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
    get(id) { return ensureSeed().find((p) => p.id === id) || null; },


    save(pkg) {
      const list = ensureSeed();
      if (!pkg.id) {
        let base = slugify(pkg.name) || "paket";
        let id = base, i = 2;
        while (list.some((p) => p.id === id)) id = base + "-" + i++;
        pkg.id = id;
      }
      const idx = list.findIndex((p) => p.id === pkg.id);
      if (idx >= 0) list[idx] = { ...list[idx], ...pkg };
      else list.push(pkg);
      persist(list);
      return pkg;
    },
    remove(id) {
      let list = ensureSeed().filter((p) => p.id !== id);
      persist(list);
      return list;
    },
    toggleActive(id) {
      const list = ensureSeed();
      const p = list.find((x) => x.id === id);
      if (p) { p.active = !p.active; persist(list); }
      return p;
    },
    reset() {
      const list = DEFAULT_PACKAGES.map((p) => ({ ...p }));
      persist(list);
      return list;
    },
    stats() {
      const all = ensureSeed();
      return {
        total: all.length,
        active: all.filter((p) => p.active).length,
        haji: all.filter((p) => p.type === "haji").length,
        umroh: all.filter((p) => p.type === "umroh").length,
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
