# ASA Tour & Travel — Website Haji & Umroh

Website biro perjalanan ibadah **Haji & Umroh** untuk *ASA Tour & Travel*. Dibangun sebagai situs statis murni (HTML + CSS + JavaScript **tanpa dependensi / tanpa build step**) sehingga dapat dibuka langsung di browser mana pun.

## ✨ Fitur

- **7 halaman**: Beranda, Paket, Galeri, Pendaftaran Online, Tentang, Kontak, dan panel **Kelola Paket** (admin).
- **Manajemen paket penuh**: tambah, ubah, hapus, dan atur status *"sedang berlaku"* untuk tiap paket Haji/Umroh. Hanya paket aktif yang tampil di sisi publik.
- **Pendaftaran online**: formulir jamaah dengan ringkasan paket langsung, tersimpan lokal, lalu dapat dikonfirmasi via WhatsApp. Pendaftaran masuk terlihat di panel admin (dengan status: baru → diproses → selesai).
- **Galeri** dengan lightbox (navigasi panah & keyboard).
- **Ilustrasi vektor (SVG)** Masjidil Haram, Masjid Nabawi, jamaah, dan perjalanan — selalu tampil tanpa koneksi. Setiap paket/galeri bisa diberi **URL foto asli** yang otomatis menimpa ilustrasi.
- **Penyimpanan lokal** (`localStorage`) — semua perubahan paket & pendaftaran tersimpan otomatis di browser, tanpa perlu server.
- **Desain responsif** dengan palet **coklat susu & hitam** beraksen **emas & merah**.

## 🎨 Palet Warna

| Peran | Warna |
|---|---|
| Dominan | Coklat susu (`#c9a77c`–`#faf6f0`) & hitam espresso (`#100c08`) |
| Aksen | Emas (`#d4af37`) — paket Haji & detail premium |
| Aksen | Merah (`#9b2226`) — paket Umroh & ajakan bertindak |

## 📁 Struktur

```
.
├── index.html          # Beranda
├── paket.html          # Daftar paket (filter Haji/Umroh + pencarian)
├── galeri.html         # Galeri + lightbox
├── pendaftaran.html    # Pendaftaran online
├── tentang.html        # Profil perusahaan
├── kontak.html         # Kontak + form WhatsApp
├── admin.html          # Kelola Paket & Pendaftaran
└── assets/
    ├── css/style.css   # Design system
    └── js/
        ├── data.js     # Store paket + pendaftaran (localStorage) & formatter
        ├── layout.js   # Header, footer, ikon, toast, reveal
        ├── scenes.js   # Ilustrasi vektor SVG
        ├── cards.js    # Kartu paket + modal detail
        ├── home.js     # Logika Beranda
        ├── packages.js # Logika halaman Paket
        ├── register.js # Logika Pendaftaran
        ├── gallery.js  # Logika Galeri + lightbox
        ├── contact.js  # Logika Kontak
        └── admin.js    # Logika panel admin
```

## 🚀 Menjalankan

Tidak perlu instalasi. Buka `index.html` di browser, atau jalankan server statis:

```bash
python3 -m http.server 8080
# lalu buka http://localhost:8080
```

## 🛠️ Kustomisasi

- **Nomor WhatsApp**: ubah `WA_NUMBER` di `assets/js/layout.js`.
- **Paket awal**: ubah `DEFAULT_PACKAGES` di `assets/js/data.js` (atau kelola lewat halaman *Kelola Paket*).
- **Foto asli**: isi kolom *URL Foto* saat menambah/mengubah paket, atau set properti `image` pada item galeri di `assets/js/gallery.js`.

---

> Catatan: data tersimpan di `localStorage` browser, cocok untuk demo dan pengelolaan mandiri. Untuk multi-perangkat/produksi, hubungkan ke backend atau layanan basis data.
