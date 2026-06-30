/* =========================================================
   ASA Tour & Travel — Packages page logic
   Filter by category (Silver/Gold/Barokah/Hemat) + search.
   Only ACTIVE packages are shown.
   ========================================================= */
(function () {
  const listEl = document.getElementById("packageList");
  const countEl = document.getElementById("resultCount");
  const tabs = document.getElementById("filterTabs");
  const search = document.getElementById("searchInput");
  let currentCat = "all";

  function matches(p, q) {
    if (!q) return true;
    q = q.toLowerCase();
    return [p.name, p.tier, p.airline, p.hotelMakkah, p.hotelMadinah, ...(p.facilities || [])]
      .filter(Boolean).join(" ").toLowerCase().includes(q);
  }

  function update() {
    const q = (search.value || "").trim();
    const list = ASA.byCategory(currentCat).filter((p) => matches(p, q));
    renderPackages(listEl, list);
    if (countEl) {
      const label = currentCat === "all" ? "paket" : "paket " + currentCat;
      countEl.textContent = `Menampilkan ${list.length} ${label}${q ? ` untuk "${q}"` : ""}.`;
    }
  }

  if (tabs) {
    tabs.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-filter]");
      if (!btn) return;
      tabs.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentCat = btn.getAttribute("data-filter");
      update();
    });
  }
  if (search) search.addEventListener("input", update);

  // Deep link: paket.html?kategori=gold
  const cat = new URLSearchParams(location.search).get("kategori");
  if (cat && ["silver", "gold", "barokah", "hemat"].includes(cat)) {
    currentCat = cat;
    tabs.querySelectorAll("button").forEach((b) => b.classList.toggle("active", b.getAttribute("data-filter") === cat));
  }
  ASA.init().then(update);
})();
