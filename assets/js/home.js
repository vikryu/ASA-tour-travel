/* =========================================================
   ASA Tour & Travel — Home page logic
   ========================================================= */
(function () {
  /* ---- Hero scene illustration ---- */
  const heroScene = document.getElementById("heroScene");
  if (heroScene && typeof sceneSVG === "function") {
    heroScene.insertAdjacentHTML("afterbegin", `<div class="scene-wrap">${sceneSVG("makkah")}</div>`);
  }

  /* ---- Services ---- */
  const services = [
    { ic: "kaaba", title: "Umroh Reguler", desc: "Paket umroh terjangkau dengan fasilitas lengkap dan pembimbing ibadah berpengalaman." },
    { ic: "star", title: "Umroh VIP", desc: "Pengalaman premium dengan hotel bintang 5 berjarak dekat dari Masjidil Haram." },
    { ic: "award", title: "Haji Khusus ONH+", desc: "Layanan haji kuota resmi Kemenag dengan akomodasi dan bimbingan terbaik." },
    { ic: "plane", title: "Haji Furoda", desc: "Berangkat haji tahun ini tanpa antri menggunakan visa furoda resmi." },
  ];
  const servicesEl = document.getElementById("services");
  if (servicesEl) {
    servicesEl.innerHTML = services.map((s) => `
      <div class="card reveal">
        <div class="card-ic">${icon(s.ic, "icon-lg")}</div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
      </div>`).join("");
  }

  /* ---- Featured (active) packages ---- */
  renderPackages(document.getElementById("featured"), ASA.featured(3));

  /* ---- Hero price = cheapest active package ---- */
  const heroPrice = document.getElementById("heroPrice");
  const active = ASA.active();
  if (heroPrice && active.length) {
    const min = active.reduce((m, p) => (p.price < m.price ? p : m), active[0]);
    heroPrice.textContent = fmt.rupiahShort(min.price);
  }

  /* ---- Why us ---- */
  const why = [
    { ic: "shield", title: "Berizin Resmi & Terpercaya", desc: "Terdaftar resmi sebagai PPIU & PIHK Kementerian Agama RI. Dana Anda aman dan dikelola secara transparan." },
    { ic: "headset", title: "Pendampingan Penuh", desc: "Muthawif dan tim handling mendampingi Anda dari tanah air, selama di tanah suci, hingga kembali pulang." },
    { ic: "hotel", title: "Hotel Dekat Masjid", desc: "Kami mengutamakan akomodasi berbintang dengan jarak terdekat ke Masjidil Haram dan Masjid Nabawi." },
    { ic: "wallet", title: "Harga Jujur & Transparan", desc: "Rincian biaya jelas tanpa biaya tersembunyi. Tersedia program tabungan dan cicilan syariah." },
    { ic: "book", title: "Manasik Berkualitas", desc: "Bimbingan manasik intensif oleh ustadz bersertifikat agar ibadah Anda sah dan sempurna." },
    { ic: "users", title: "Kuota Grup Terbatas", desc: "Jumlah jamaah per grup kami jaga agar pelayanan tetap personal dan khusyuk." },
  ];
  const whyEl = document.getElementById("whyus");
  if (whyEl) {
    whyEl.innerHTML = why.map((w) => `
      <div class="feature reveal">
        <div class="f-ic">${icon(w.ic, "icon-lg")}</div>
        <div><h4>${w.title}</h4><p>${w.desc}</p></div>
      </div>`).join("");
  }

  /* ---- Process steps ---- */
  const steps = [
    { n: "01", t: "Konsultasi", d: "Hubungi tim kami dan ceritakan rencana ibadah serta preferensi paket Anda." },
    { n: "02", t: "Pilih Paket", d: "Pilih paket Haji/Umroh yang sedang berlaku sesuai jadwal dan anggaran." },
    { n: "03", t: "Daftar & Lunasi", d: "Lengkapi dokumen dan lakukan pembayaran secara bertahap atau lunas." },
    { n: "04", t: "Berangkat", d: "Ikuti manasik, lalu berangkat menuju tanah suci dengan tenang dan khusyuk." },
  ];
  const stepsEl = document.getElementById("steps");
  if (stepsEl) {
    stepsEl.innerHTML = steps.map((s) => `
      <div class="step reveal">
        <div class="num">${s.n}</div>
        <h4>${s.t}</h4>
        <p>${s.d}</p>
      </div>`).join("");
  }

  /* ---- Testimonials ---- */
  const testi = [
    { q: "Pelayanan sangat amanah. Hotel dekat sekali dengan Masjidil Haram, dan muthawifnya sabar membimbing kami selama umroh.", n: "Hj. Siti Aminah", r: "Jamaah Umroh VIP", i: "S" },
    { q: "Alhamdulillah berangkat haji furoda tanpa antri. Semua diurus rapi dari dokumen sampai akomodasi. Terima kasih ASA Tour.", n: "H. Bambang Suryanto", r: "Jamaah Haji Furoda", i: "B" },
    { q: "Harga transparan, tidak ada biaya tersembunyi. Manasiknya juga lengkap sehingga ibadah terasa lebih tenang dan mantap.", n: "Ibu Rahmawati", r: "Jamaah Umroh Reguler", i: "R" },
  ];
  const testiEl = document.getElementById("testi");
  if (testiEl) {
    testiEl.innerHTML = testi.map((t) => `
      <div class="testi reveal">
        <div class="stars">★★★★★</div>
        <p class="quote">${t.q}</p>
        <div class="who">
          <span class="av">${t.i}</span>
          <span><b>${t.n}</b><span>${t.r}</span></span>
        </div>
      </div>`).join("");
  }

  if (typeof initReveal === "function") initReveal();
})();
