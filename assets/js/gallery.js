/* =========================================================
   ASA Tour & Travel — Gallery with lightbox
   Uses brand scene illustrations; each item may carry an
   optional real-photo URL (image) that overrides the scene.
   ========================================================= */
(function () {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  // size: "tall" | "wide" | "" (square)
  const items = [
    { scene: "makkah",   size: "wide", title: "Masjidil Haram", caption: "Tawaf mengelilingi Ka'bah, Makkah" },
    { scene: "madinah",  size: "",     title: "Masjid Nabawi", caption: "Kubah hijau, Madinah Al-Munawwarah" },
    { scene: "pilgrims", size: "tall", title: "Jamaah ASA", caption: "Kebersamaan tamu Allah dalam ihram" },
    { scene: "travel",   size: "",     title: "Keberangkatan", caption: "Penerbangan menuju tanah suci" },
    { scene: "madinah",  size: "",     title: "Ziarah Madinah", caption: "Menapaki jejak sejarah Islam" },
    { scene: "makkah",   size: "wide", title: "Mataf Senja", caption: "Suasana ibadah di waktu maghrib" },
    { scene: "pilgrims", size: "",     title: "Manasik", caption: "Bimbingan ibadah sebelum berangkat" },
    { scene: "travel",   size: "",     title: "Perjalanan", caption: "Perjalanan penuh keberkahan" },
  ];

  grid.innerHTML = items.map((it, i) => {
    const media = (typeof mediaBlock === "function")
      ? mediaBlock({ scene: it.scene, image: it.image, alt: it.title })
      : `<div class="scene-wrap">${sceneSVG(it.scene)}</div>`;
    return `
      <figure class="gallery-item ${it.size}" data-i="${i}">
        ${media}
        <figcaption class="g-cap"><b>${it.title}</b><span>${it.caption}</span></figcaption>
      </figure>`;
  }).join("");

  /* ---- Lightbox ---- */
  let lb = document.getElementById("lightbox");
  if (!lb) {
    lb = document.createElement("div");
    lb.id = "lightbox";
    lb.className = "lightbox";
    lb.innerHTML = `
      <button class="lb-close" aria-label="Tutup">${icon("x")}</button>
      <button class="lb-nav lb-prev" aria-label="Sebelumnya">${icon("arrow")}</button>
      <div class="lb-stage" id="lbStage"></div>
      <button class="lb-nav lb-next" aria-label="Berikutnya">${icon("arrow")}</button>`;
    document.body.appendChild(lb);
  }
  // flip the prev arrow
  lb.querySelector(".lb-prev svg").style.transform = "rotate(180deg)";

  const stage = lb.querySelector("#lbStage");
  let current = 0;

  function show(i) {
    current = (i + items.length) % items.length;
    const it = items[current];
    const media = (typeof mediaBlock === "function")
      ? mediaBlock({ scene: it.scene, image: it.image, alt: it.title })
      : `<div class="scene-wrap">${sceneSVG(it.scene)}</div>`;
    stage.innerHTML = `${media}<div class="lb-cap"><b>${it.title}</b><span>${it.caption}</span></div>`;
  }
  function open(i) { show(i); lb.classList.add("open"); document.body.style.overflow = "hidden"; }
  function close() { lb.classList.remove("open"); document.body.style.overflow = ""; }

  grid.addEventListener("click", (e) => {
    const fig = e.target.closest(".gallery-item");
    if (fig) open(Number(fig.getAttribute("data-i")));
  });
  lb.querySelector(".lb-close").addEventListener("click", close);
  lb.querySelector(".lb-next").addEventListener("click", () => show(current + 1));
  lb.querySelector(".lb-prev").addEventListener("click", () => show(current - 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") show(current + 1);
    if (e.key === "ArrowLeft") show(current - 1);
  });
})();
