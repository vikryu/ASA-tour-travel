/* =========================================================
   ASA Tour & Travel — Packages page logic
   Filter by type (Haji/Umroh) + keyword search.
   Only ACTIVE packages ("sedang berlaku") are shown.
   ========================================================= */
(function () {
  const listEl = document.getElementById("packageList");
  const countEl = document.getElementById("resultCount");
  const tabs = document.getElementById("filterTabs");
  const search = document.getElementById("searchInput");

  let currentType = "all";

  function matches(p, q) {
    if (!q) return true;
    q = q.toLowerCase();
    return [p.name, p.airline, p.hotelMakkah, p.hotelMadinah, ...(p.facilities || [])]
      .filter(Boolean).join(" ").toLowerCase().includes(q);
  }

  function update() {
    const q = (search.value || "").trim();
    const list = ASA.byType(currentType).filter((p) => matches(p, q));
    renderPackages(listEl, list);
    if (countEl) {
      const label = currentType === "all" ? "paket aktif" : "paket " + currentType;
      countEl.textContent = `Menampilkan ${list.length} ${label}${q ? ` untuk "${q}"` : ""}.`;
    }
  }

  if (tabs) {
    tabs.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-filter]");
      if (!btn) return;
      tabs.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentType = btn.getAttribute("data-filter");
      update();
    });
  }

  if (search) {
    search.addEventListener("input", () => update());
  }

  // Allow deep-link like paket.html?type=haji
  const params = new URLSearchParams(location.search);
  const t = params.get("type");
  if (t && ["haji", "umroh"].includes(t)) {
    currentType = t;
    tabs.querySelectorAll("button").forEach((b) => b.classList.toggle("active", b.getAttribute("data-filter") === t));
  }

  update();
})();
