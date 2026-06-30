/* =========================================================
   ASA Tour & Travel — Data Store
   Manages Haji & Umroh packages with localStorage persistence.
   This gives users full freedom to manage which packages are
   currently active ("sedang berlaku") via the Admin page.
   ========================================================= */

const ASA = (function () {
  const STORAGE_KEY = "asa_packages_v1";
  const SEED_FLAG = "asa_seeded_v1";

  /* ---- Default / seed packages ---- */
  const DEFAULT_PACKAGES = [
    {
      id: "umroh-reguler-9h",
      name: "Umroh Reguler 9 Hari",
      type: "umroh",
      price: 27500000,
      duration: 9,
      departure: "2026-08-12",
      airline: "Saudia Airlines",
      hotelMakkah: "Hotel Al Kiswah Towers (★4)",
      hotelMadinah: "Hotel Saja Al Madinah (★4)",
      quota: 45,
      seatsLeft: 12,
      active: true,
      featured: true,
      theme: "umroh",
      facilities: ["Tiket Pesawat PP", "Visa Umroh", "Hotel ★4", "Manasik 3x", "Muthawif Berpengalaman", "Makan 3x Sehari"],
      description: "Paket umroh reguler dengan pelayanan lengkap, pembimbing ibadah berpengalaman, dan hotel berbintang dekat dengan Masjidil Haram dan Masjid Nabawi.",
    },
    {
      id: "umroh-vip-12h",
      name: "Umroh VIP Plus Thaif 12 Hari",
      type: "umroh",
      price: 41900000,
      duration: 12,
      departure: "2026-09-05",
      airline: "Emirates",
      hotelMakkah: "Swissôtel Al Maqam (★5)",
      hotelMadinah: "Anwar Al Madinah Mövenpick (★5)",
      quota: 30,
      seatsLeft: 8,
      active: true,
      featured: true,
      theme: "umroh",
      facilities: ["Hotel ★5 Dekat Masjid", "City Tour Thaif", "Tiket Bisnis Opsional", "Manasik Eksklusif", "Handling VIP", "Air Zamzam 5L"],
      description: "Pengalaman umroh premium dengan hotel bintang 5 berjarak hanya beberapa langkah dari Masjidil Haram, ditambah ziarah ke Kota Thaif yang sejuk.",
    },
    {
      id: "umroh-ramadhan-15h",
      name: "Umroh Ramadhan Full 15 Hari",
      type: "umroh",
      price: 38750000,
      duration: 15,
      departure: "2027-03-02",
      airline: "Qatar Airways",
      hotelMakkah: "Hotel Hilton Suites Makkah (★5)",
      hotelMadinah: "Dar Al Taqwa Hotel (★5)",
      quota: 40,
      seatsLeft: 25,
      active: true,
      featured: false,
      theme: "umroh",
      facilities: ["I'tikaf 10 Malam Terakhir", "Hotel ★5", "Buka & Sahur Hotel", "Manasik Intensif", "Ziarah Lengkap", "Pembimbing Hafidz"],
      description: "Raih keutamaan ibadah di bulan suci Ramadhan. Nikmati i'tikaf di sepuluh malam terakhir dengan fasilitas hotel premium dan bimbingan hafidz Qur'an.",
    },
    {
      id: "haji-khusus-25h",
      name: "Haji Khusus (ONH Plus) 25 Hari",
      type: "haji",
      price: 165000000,
      duration: 25,
      departure: "2027-05-20",
      airline: "Saudia Airlines",
      hotelMakkah: "Fairmont Makkah Clock Tower (★5)",
      hotelMadinah: "The Oberoi Madinah (★5)",
      quota: 50,
      seatsLeft: 18,
      active: true,
      featured: true,
      theme: "haji",
      facilities: ["Kuota Resmi Kemenag", "Hotel ★5 Premium", "Maktab Dekat Jamarat", "Catering Indonesia", "Bimbingan Manasik 6x", "Tenda AC Arafah-Mina"],
      description: "Tunaikan rukun Islam kelima dengan layanan Haji Khusus terbaik. Kuota resmi, akomodasi bintang 5, dan pembimbing ibadah profesional sepanjang perjalanan.",
    },
    {
      id: "haji-furoda-21h",
      name: "Haji Furoda Tanpa Antri 21 Hari",
      type: "haji",
      price: 235000000,
      duration: 21,
      departure: "2027-05-25",
      airline: "Emirates",
      hotelMakkah: "Raffles Makkah Palace (★5)",
      hotelMadinah: "Anwar Al Madinah Mövenpick (★5)",
      quota: 25,
      seatsLeft: 6,
      active: true,
      featured: false,
      theme: "haji",
      facilities: ["Visa Furoda Resmi", "Berangkat Tahun Ini", "Hotel ★5 Ultra Dekat", "Maktab VIP", "Handling Eksklusif", "Bimbingan Privat"],
      description: "Berangkat haji tahun ini tanpa menunggu antrian panjang menggunakan visa Furoda resmi (mujamalah), dengan layanan eksklusif dan akomodasi termewah.",
    },
    {
      id: "umroh-hemat-8h",
      name: "Umroh Hemat Promo 8 Hari",
      type: "umroh",
      price: 23900000,
      duration: 8,
      departure: "2026-07-18",
      airline: "Lion Air (Saudia Codeshare)",
      hotelMakkah: "Hotel Rayyana Ajyad (★3)",
      hotelMadinah: "Hotel Golden Tulip Al Zahabi (★3)",
      quota: 45,
      seatsLeft: 3,
      active: false,
      featured: false,
      theme: "umroh",
      facilities: ["Harga Promo", "Tiket Pesawat PP", "Visa Umroh", "Hotel ★3", "Manasik 2x", "Bus AC"],
      description: "Paket umroh ekonomis tanpa mengurangi kekhusyukan ibadah. Cocok untuk jamaah yang menginginkan biaya terjangkau dengan pelayanan tetap amanah.",
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
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch (e) { /* ignore */ }
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
    /** Return all packages (active + inactive). */
    all() { return ensureSeed(); },

    /** Active packages only — those "sedang berlaku". */
    active() { return ensureSeed().filter((p) => p.active); },

    /** Active packages filtered by type ("haji" | "umroh" | "all"). */
    byType(type) {
      const a = this.active();
      return type && type !== "all" ? a.filter((p) => p.type === type) : a;
    },

    /** Featured + active, used on home page. */
    featured(limit) {
      const f = this.active().filter((p) => p.featured);
      const list = f.length ? f : this.active();
      return typeof limit === "number" ? list.slice(0, limit) : list;
    },

    get(id) { return ensureSeed().find((p) => p.id === id) || null; },

    /** Create or update a package. */
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

    /** Restore the original demo packages. */
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
