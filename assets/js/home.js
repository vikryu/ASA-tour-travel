/* =========================================================
   ASA Tour & Travel — Home page logic
   ========================================================= */
(function () {
  /* ---- Hero scene illustration (with real photo) ---- */
  const heroScene = document.getElementById("heroScene");
  if (heroScene && typeof mediaBlock === "function") {
    heroScene.insertAdjacentHTML("afterbegin", mediaBlock({ scene: "makkah", image: "assets/img/masjidil-haram.jpg", alt: "Masjidil Haram" }));
  }

  /* ---- Services (tier paket) ---- */
  const services = [
    { ic: "award", title: "Paket Gold (★5)", desc: "Hotel bintang 5 Al Haram & Safwah Tower, berjarak sangat dekat dari masjid dengan fasilitas premium." },
    { ic: "star", title: "Paket Silver (★4)", desc: "Hotel bintang 4 Safwat & Grand Al Massa, nyaman dan terjangkau untuk ibadah yang khusyuk." },
    { ic: "kaaba", title: "Umroh Barokah (★3)", desc: "Pilihan ekonomis penuh keberkahan dengan hotel bintang 3 dan pelayanan tetap amanah." },
    { ic: "wallet", title: "Special Hemat", desc: "Harga paling hemat untuk mewujudkan impian umroh Anda tanpa mengurangi kenyamanan." },
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

  /* ---- Why us (Kenapa harus memilih kami) ---- */
  const why = [
    { ic: "shield", title: "Pembimbing Berkompeten", desc: "Dibimbing Muthawwif yang berilmu agar seluruh rangkaian ibadah sesuai tuntunan sunnah." },
    { ic: "check", title: "Prinsip “5 Pasti”", desc: "Pasti travelnya, pasti jadwalnya, pasti terbangnya, pasti hotelnya, dan pasti visanya." },
    { ic: "hotel", title: "Hotel Dekat Masjid", desc: "Akomodasi dekat Masjidil Haram dan Masjid Nabawi untuk kemudahan dan kekhusyukan ibadah." },
    { ic: "plane", title: "Penerbangan Nyaman", desc: "Maskapai tepercaya — Garuda Indonesia & Lion Air — dengan rute yang minim transit." },
    { ic: "heart", title: "Pelayanan Sepenuh Hati", desc: "Pendampingan tulus sejak pendaftaran hingga kembali ke tanah air." },
    { ic: "book", title: "Manasik & Bimbingan", desc: "Manasik lengkap agar setiap ibadah dilaksanakan dengan benar dan mantap." },
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

  /* ---- Fasilitas yang sudah termasuk ---- */
  const inclusions = [
    "Tiket Pesawat PP", "Hotel Madinah & Makkah", "Transportasi Bus AC", "Visa Umroh",
    "Makan 3x Sehari", "Tour Leader & Muthawwif", "Air Zamzam 5 Liter", "City Tour Makkah & Madinah",
    "Perlengkapan & Handling", "Manasik",
  ];
  const incEl = document.getElementById("inclusions");
  if (incEl) {
    incEl.innerHTML = inclusions.map((f) => `
      <div class="inc-item reveal">${icon("check", "icon-sm")} <span>${f}</span></div>`).join("");
  }

  if (typeof initReveal === "function") initReveal();
})();
