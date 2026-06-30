/* =========================================================
   ASA Tour & Travel — About page visual injector
   (External file so the page needs no inline <script>,
   allowing a strict Content-Security-Policy.)
   ========================================================= */
(function () {
  var v = document.getElementById("aboutVisual");
  if (v && typeof mediaBlock === "function") {
    v.insertAdjacentHTML("afterbegin", mediaBlock({
      scene: "madinah",
      image: "assets/img/masjid-nabawi-senja.jpg",
      alt: "Masjid Nabawi",
    }));
  }
})();
