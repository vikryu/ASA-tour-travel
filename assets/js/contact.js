/* =========================================================
   ASA Tour & Travel — Contact page logic
   Populates package dropdown from active packages and
   forwards the message to WhatsApp (URL-encoded).
   ========================================================= */
(function () {
  const sel = document.getElementById("c_pkg");

  if (sel) {
    ASA.init().then(function () {
      ASA.active().forEach((p) => {
        const o = document.createElement("option");
        o.value = p.name; // value via property = safe (no HTML parsing)
        o.textContent = `${p.tier || (p.type === "haji" ? "Haji" : "Umroh")} — ${p.name} (${fmt.rupiahShort(p.price)})`;
        sel.appendChild(o);
      });
      const pre = new URLSearchParams(location.search).get("pkg");
      if (pre) sel.value = pre;
    });
  }

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = val("c_name");
      const phone = val("c_phone");
      const pkg = sel ? sel.value : "";
      const msg = val("c_msg");
      const lines = [
        "Assalamu'alaikum ASA Tour & Travel,", "",
        "Nama: " + name,
        "No. WA: " + phone,
      ];
      if (pkg) lines.push("Paket diminati: " + pkg);
      if (msg) lines.push("", "Pesan: " + msg);
      const href = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
      window.open(href, "_blank", "noopener,noreferrer");
      if (typeof toast === "function") toast("Mengarahkan ke WhatsApp...", "success");
    });
  }

  function val(id) { const el = document.getElementById(id); return el ? el.value.trim() : ""; }
})();
