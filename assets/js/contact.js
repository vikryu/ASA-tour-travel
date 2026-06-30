/* =========================================================
   ASA Tour & Travel — Contact page logic
   Populates package dropdown from active packages and
   forwards the message to WhatsApp.
   ========================================================= */
(function () {
  const sel = document.getElementById("c_pkg");
  if (sel) {
    ASA.active().forEach((p) => {
      const o = document.createElement("option");
      o.value = p.name;
      o.textContent = `${p.type === "haji" ? "Haji" : "Umroh"} — ${p.name} (${fmt.rupiahShort(p.price)})`;
      sel.appendChild(o);
    });
    // Preselect via ?pkg=
    const pre = new URLSearchParams(location.search).get("pkg");
    if (pre) sel.value = pre;
  }

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("c_name").value.trim();
      const phone = document.getElementById("c_phone").value.trim();
      const pkg = document.getElementById("c_pkg").value;
      const msg = document.getElementById("c_msg").value.trim();
      const text =
        `Assalamu'alaikum ASA Tour & Travel,%0A%0A` +
        `Nama: ${name}%0A` +
        `No. WA: ${phone}%0A` +
        (pkg ? `Paket diminati: ${pkg}%0A` : "") +
        (msg ? `%0APesan: ${msg}` : "");
      window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, "_blank", "noopener");
      if (typeof toast === "function") toast("Mengarahkan ke WhatsApp...", "success");
    });
  }
})();
