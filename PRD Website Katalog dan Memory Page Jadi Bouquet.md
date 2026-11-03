# PRD Website Katalog dan Memory Page Jadi Bouquet

Draf v0.1 · 3 November 2026 · Untuk tim Jadi Bouquet

Catatan membaca: tanda (Asumsi) berarti belum dikonfirmasi tim dan perlu dicek. Prioritas: P0 wajib untuk rilis pertama, P1 penting setelahnya, P2 pengembangan lanjutan.

## 1. Ringkasan

Jadi Bouquet membutuhkan website responsif yang nyaman dipakai di HP maupun laptop. Website ini punya tiga fungsi utama:

1. Katalog buket: pelanggan menjelajah, memfilter, memilih produk, lalu mengustomisasinya.
2. Pilihan tampilan Memory Page: pelanggan memilih tema halaman kenangan yang terbuka saat QR di kartu ucapan dipindai (Asumsi: inilah maksud “pilih tampilan web”).
3. Pemesanan sederhana: pesanan dikirim ke tim lewat WhatsApp dan tercatat di panel admin.

Referensi visual: landing page boutique bernuansa burgundy gelap (`#491318`), warm ivory (`#ece3d8`), dan dark espresso (`#24120e`), judul bertipografi script, kartu produk dengan tombol Customize, tab pilihan (Flower Type, Color Palette, Size, Extras), dan bagian cerita brand.

## 2. Latar belakang dan masalah

- Buket layu dan kartu ucapan fisik mudah hilang, sehingga kenangan di baliknya ikut hilang.
- Pelanggan perlu melihat pilihan buket dengan jelas sebelum memesan. Tanpa katalog, pemesanan lewat chat memakan waktu karena pertanyaan yang berulang (Asumsi).
- Inovasi QR membutuhkan halaman tujuan yang indah, aman, dan tetap bisa dibuka dalam jangka panjang.

## 3. Tujuan dan indikator keberhasilan

| Tujuan | Indikator | Target awal (Asumsi) |
| --- | --- | --- |
| Katalog mudah dijelajah | Pengunjung yang membuka minimal satu detail produk | 60% atau lebih |
| Mendorong pesanan | Klik “Kirim via WhatsApp” dibanding jumlah pengunjung | 5% atau lebih |
| Cepat di HP | Largest Contentful Paint di jaringan 4G | 2,5 detik atau kurang |
| QR andal | Pemindaian QR yang berhasil membuka halaman | 99% atau lebih |
| Kenangan terisi | Pesanan yang melengkapi isi Memory Page | 80% atau lebih |
| Mudah dikelola | Waktu admin menambah satu produk | 5 menit atau kurang |

## 4. Pengguna

- Pembeli: pemberi hadiah, umumnya membuka dari HP. Butuh melihat pilihan, memahami harga, dan memesan dengan cepat.
- Penerima: orang yang memindai QR dari kartu ucapan, sering berbulan-bulan atau bertahun-tahun setelah buket diterima. Butuh halaman yang terbuka cepat dan terasa personal.
- Admin (tim Jadi Bouquet): mengelola produk, pesanan, QR, dan konten. Sering memakai laptop, kadang HP.

## 5. Ruang lingkup

Di dalam rilis pertama (P0): beranda, katalog dengan filter, detail dan kustomisasi produk, pemilihan tema Memory Page beserta isian kontennya, pemesanan via WhatsApp, pembuatan QR, halaman kenangan publik, dan panel admin dasar.

Pengembangan lanjutan (P1 dan P2): statistik, kata sandi halaman, video dan musik, ekspor arsip, pembayaran online.

Di luar lingkup: akun login untuk pembeli, aplikasi mobile native, marketplace multipenjual (bisnis ini tetap menjual produk buatan sendiri).

## 6. Alur utama

Alur pembeli:

1. Masuk ke beranda, lalu klik “Pilih Buket”.
2. Menjelajah katalog, memakai filter, membuka detail produk.
3. Kustomisasi: jenis bunga, palet warna, ukuran atau gaya, tambahan.
4. Memilih tema Memory Page dan melihat pratinjau.
5. Mengisi pesan, tanggal momen, dan mengunggah foto.
6. Meninjau ringkasan pesanan, mengisi tanggal dan alamat kirim.
7. Klik “Kirim via WhatsApp”. Pesanan tercatat dengan kode unik.

Alur penerima:

1. Memindai QR di kartu ucapan.
2. Tautan pendek mengalihkan ke Memory Page yang bertema sesuai pilihan pengirim.
3. Membaca pesan, melihat foto, dan dapat membagikan atau menyimpan.

Alur admin:

1. Menerima pesanan lewat WhatsApp dan panel admin, lalu mengonfirmasi.
2. Mengubah status pesanan, mengunduh QR untuk dicetak di kartu.
3. Memoderasi konten bila perlu.

## 7. Kebutuhan fungsional

### 7.1 Beranda

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| F-01 | Hero dengan judul script, satu kalimat nilai, dan tombol utama “Pilih Buket” | P0 |
| F-02 | Bagian “Cara kerja QR” dalam 3 langkah: pilih buket, tulis kenangan, scan kapan saja | P0 |
| F-03 | Produk unggulan (3 sampai 6 kartu) | P0 |
| F-04 | Cerita brand dan keunggulan | P0 |
| F-05 | Galeri dan testimoni pelanggan | P1 |
| F-06 | Footer: kontak, Instagram, WhatsApp, kebijakan privasi | P0 |

### 7.2 Katalog

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| F-10 | Grid kartu produk: foto, nama, harga mulai, tombol Customize | P0 |
| F-11 | Filter: jenis bunga, palet warna, ukuran, rentang harga, momen (wisuda, anniversary, ulang tahun, dan lainnya) | P0 |
| F-12 | Pencarian dan pengurutan (terbaru, harga, terpopuler) | P1 |
| F-13 | Status ketersediaan: tersedia, pre-order, habis | P0 |
| F-14 | Skeleton loading dan lazy load untuk gambar | P0 |

### 7.3 Detail produk dan kustomisasi

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| F-20 | Galeri foto: geser di HP, thumbnail di laptop | P0 |
| F-21 | Deskripsi, komposisi bunga, ukuran, estimasi waktu pengerjaan | P0 |
| F-22 | Customizer bertab: Jenis Bunga, Palet Warna, Ukuran atau Gaya, Tambahan | P0 |
| F-23 | Harga berubah otomatis sesuai pilihan | P0 |
| F-24 | Ringkasan visual dari pilihan yang dibuat | P1 |

### 7.4 Pilih tampilan Memory Page

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| F-30 | Galeri 4 sampai 6 tema siap pakai, misalnya Burgundy Classic (#491318), Warm Ivory (#ece3d8), Deep Espresso (#24120e), Minimal Pastel (Asumsi) | P0 |
| F-31 | Pratinjau langsung tema dalam bingkai HP dan layar lebar | P0 |
| F-32 | Isian: judul, nama pengirim dan penerima, pesan (maksimal 1.000 karakter), tanggal momen | P0 |
| F-33 | Unggah foto (maksimal 10, dikompres otomatis) | P0 |
| F-34 | Tautan video (YouTube atau Drive) | P1 |
| F-35 | Musik latar atau pesan suara | P2 |
| F-36 | Kata sandi opsional untuk membuka halaman | P1 |

### 7.5 Pemesanan

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| F-40 | Ringkasan pesanan: produk, pilihan, tema, harga, tanggal dan alamat kirim, catatan | P0 |
| F-41 | Tombol “Kirim via WhatsApp” dengan pesan terisi otomatis dan kode pesanan | P0 |
| F-42 | Pesanan tersimpan dengan status: Baru, Dikonfirmasi, Dibayar, Diproses, Dikirim, Selesai, Dibatalkan | P0 |
| F-43 | Pembayaran online otomatis (payment gateway) | P2 |

Pembayaran pada rilis pertama dilakukan manual (transfer atau QRIS) setelah konfirmasi tim (Asumsi).

### 7.6 QR dan Memory Page publik

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| F-50 | Alamat halaman kenangan acak dan sulit ditebak, misalnya /m/kode-acak | P0 |
| F-51 | QR dibuat otomatis dan dapat diunduh admin (PNG dan SVG) untuk dicetak | P0 |
| F-52 | QR mengarah ke tautan pendek milik sendiri (/q/kode) yang mengalihkan ke halaman kenangan, sehingga tujuan bisa dipindah tanpa mencetak ulang kartu | P0 |
| F-53 | Halaman responsif, terbuka tanpa login, tidak muncul di mesin pencari (noindex) | P0 |
| F-54 | Tombol bagikan dan simpan | P1 |
| F-55 | Halaman “masa aktif habis” yang ramah, dengan ajakan perpanjang | P1 |
| F-56 | Ekspor arsip kenangan (ZIP atau PDF) sebelum kedaluwarsa | P2 |

### 7.7 Panel admin

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| F-60 | Login admin yang aman | P0 |
| F-61 | Kelola produk, kategori, varian, tambahan, harga, ketersediaan, foto | P0 |
| F-62 | Kelola tema Memory Page | P1 |
| F-63 | Daftar pesanan, ubah status, lihat detail, unduh QR | P0 |
| F-64 | Moderasi: nonaktifkan atau hapus Memory Page | P0 |
| F-65 | Statistik sederhana: pengunjung, klik pesan, pesanan, pemindaian QR | P1 |

### 7.8 Halaman pendukung

Tentang Kami, FAQ, Kontak, Kebijakan Privasi, dan Syarat Masa Aktif Memory Page. Prioritas P0.

## 8. Kebutuhan non-fungsional

- Responsif dan mobile-first. Titik uji lebar layar: 360, 768, 1024, dan 1440 piksel. Tidak ada scroll horizontal di semua ukuran.
- Performa: gambar dalam format WebP atau AVIF, lazy load, ukuran halaman awal ringan, target LCP 2,5 detik atau kurang di 4G.
- Aksesibilitas: kontras teks memenuhi WCAG AA (sangat krusial untuk latar burgundy gelap #491318 dan deep espresso #24120e saat dipadukan dengan teks warm ivory #ece3d8), area sentuh minimal 44 piksel, teks alternatif pada gambar, navigasi keyboard.
- SEO: judul dan deskripsi tiap halaman, Open Graph untuk pratinjau saat dibagikan, sitemap. Memory Page dikecualikan dari pengindeksan.
- Keamanan dan privasi: HTTPS, alamat Memory Page acak, validasi tipe dan ukuran unggahan, pembatasan laju permintaan, kata sandi admin yang kuat, data pelanggan tidak dibagikan ke pihak lain, penghapusan data atas permintaan.
- Keandalan jangka panjang: QR harus tetap berfungsi walau buket sudah tidak ada. Gunakan domain milik sendiri (bukan subdomain gratis), catat tanggal kedaluwarsa domain, dan lakukan cadangan data berkala.
- Dukungan peramban: dua versi terbaru Chrome, Safari, Firefox, dan Edge, termasuk Chrome Android dan Safari iOS.

## 9. Desain dan pengalaman pengguna

Arah visual mengikuti referensi dan identitas brand yang sudah dipilih:

- Warna utama dan palet resmi:
  - **Deep Burgundy / Maroon (`#491318`)**: Warna identitas utama brand, aksen tombol primer, banner, dan elemen penting.
  - **Warm Ivory / Cream (`#ece3d8`)**: Warna dasar terang, teks kontras di atas latar gelap, latar kartu, dan elemen bersih elegan.
  - **Dark Espresso / Deep Brown (`#24120e`)**: Warna latar gelap pekat (hero, footer, kontras tinggi), teks gelap di latar terang, dan bingkai pembatas.
- Tipografi: font script elegan hanya untuk judul besar, serif seperti Cormorant Garamond untuk subjudul, sans-serif tipis seperti Montserrat atau Inter untuk teks dan tombol. Jangan memakai script untuk paragraf agar tetap terbaca di HP.
- Komponen: kartu produk bergaya boutique, tab pilihan di customizer, tombol outline dengan hover halus, garis pemisah lembut.
- Logo: pakai logo Jadi Bouquet versi ivory (`#ece3d8`) atau putih di atas latar burgundy (`#491318`). Gunakan versi flat (tanpa glow) untuk ukuran kecil dan favicon.

Perilaku responsif per komponen:

| Komponen | HP (di bawah 768 px) | Laptop (1024 px ke atas) |
| --- | --- | --- |
| Navigasi | Menu hamburger, tombol “Pesan” menempel di bawah | Menu horizontal di atas |
| Hero | Satu kolom, teks di tengah, satu tombol | Latar penuh, teks di tengah, tombol utama dan sekunder |
| Grid katalog | 2 kolom, filter dalam panel yang bisa dibuka | 3 sampai 4 kolom, filter di sisi kiri |
| Detail produk | Foto di atas, info di bawah, tombol tetap | Foto di kiri, info dan customizer di kanan |
| Customizer | Tab dapat digeser, ringkasan harga di bawah layar | Tab sejajar, ringkasan harga di sisi |
| Pilih tema | Carousel geser, pratinjau penuh layar | Galeri dan pratinjau berdampingan |

## 10. Peta halaman

- / : Beranda
- /katalog : Katalog dan filter
- /produk/nama-produk : Detail dan kustomisasi
- /tema : Pilih tampilan Memory Page
- /pesan : Ringkasan dan kirim pesanan
- /m/kode : Memory Page publik
- /q/kode : Tautan pendek dari QR
- /tentang, /faq, /kontak, /privasi
- /admin : Panel admin

## 11. Model data (garis besar)

| Entitas | Isi utama |
| --- | --- |
| Produk | nama, slug, deskripsi, harga dasar, status ketersediaan, foto |
| Kategori dan Momen | nama, tipe (jenis bunga, palet, momen) |
| Varian dan Tambahan | ukuran atau gaya, tambahan, selisih harga |
| Tema | nama, palet, font, tata letak, gambar pratinjau, aktif atau tidak |
| Pesanan | kode, data pemesan, tanggal dan alamat kirim, total, status |
| Item Pesanan | produk, pilihan varian dan tambahan, harga saat dipesan |
| Memory Page | kode acak, tema, judul, pengirim, penerima, pesan, tanggal momen, status, tanggal kedaluwarsa |
| Media | berkas foto atau video, ukuran, relasi ke Memory Page |
| Admin | email, peran, kata sandi terenkripsi |

## 12. Usulan teknis (rekomendasi, bukan keharusan)

- Front end: React dengan Vite dan JavaScript (JS), dipadukan dengan Tailwind CSS untuk performa kencang, struktur ringan, proses pengembangan cepat, serta antarmuka responsif.
- Back end dan database: layanan terkelola seperti Supabase atau Firebase untuk database, autentikasi admin, dan penyimpanan foto (Asumsi, sesuaikan dengan keahlian tim).
- QR: pustaka pembuat QR di sisi client/server, dengan koreksi kesalahan tingkat tinggi agar tetap terbaca bila kartu tergores.
- Hosting: platform seperti Vercel atau Netlify, domain milik sendiri.
- Gambar: kompresi dan penyajian lewat CDN.

## 13. Rencana rilis (perkiraan, Asumsi)

| Fase | Isi | Perkiraan |
| --- | --- | --- |
| 0. Desain | Wireframe, desain visual halaman utama dan tema Memory Page, pemilihan font dan komponen | 1 sampai 2 minggu |
| 1. Katalog dan pemesanan | Beranda, katalog, detail dan customizer, pesan via WhatsApp, data produk awal | 2 sampai 3 minggu |
| 2. Memory Page dan QR | Pemilihan tema, isian konten, unggah foto, halaman publik, QR dan tautan pendek | 2 sampai 3 minggu |
| 3. Admin dan penyempurnaan | Panel admin, uji di berbagai perangkat, perbaikan performa, uji pengguna | 2 minggu |

## 14. Kriteria penerimaan (contoh)

- Katalog terbuka tanpa scroll horizontal di lebar 360, 768, 1024, dan 1440 piksel.
- Pengunjung dapat memilih produk, mengubah pilihan di customizer, dan melihat harga berubah tanpa memuat ulang halaman.
- Pengunjung dapat memilih tema, melihat pratinjau, mengisi pesan, dan mengunggah foto dari HP.
- Tombol “Kirim via WhatsApp” membuka WhatsApp dengan pesan yang berisi kode pesanan, produk, pilihan, tema, dan tanggal kirim.
- QR yang dicetak dalam ukuran 2 cm dapat dipindai oleh kamera HP biasa dan membuka Memory Page yang benar.
- Memory Page dapat dibuka tanpa login dan tidak muncul di hasil pencarian.
- Admin dapat menambah produk lengkap dengan foto dalam 5 menit atau kurang.
- Kontras teks pada semua tema memenuhi WCAG AA.

## 15. Risiko dan mitigasi

| Risiko | Mitigasi |
| --- | --- |
| Domain atau hosting berhenti, QR tidak bisa dibuka | Domain milik sendiri dengan pengingat perpanjangan, tautan pendek yang bisa dialihkan, cadangan data |
| Biaya penyimpanan membengkak karena halaman kenangan disimpan lama | Tetapkan masa aktif (misalnya 1 tahun, Asumsi), kompres foto, tawarkan perpanjangan atau ekspor arsip |
| Foto atau pesan yang tidak pantas | Moderasi admin, tombol laporkan, syarat penggunaan |
| Privasi foto orang lain | Pengirim menyatakan bertanggung jawab atas konten, alamat acak, kata sandi opsional |
| Tema gelap sulit dibaca | Uji kontras, sediakan tema terang (Ivory) |
| Pekerjaan terlalu besar untuk tim kecil | Pegang prioritas P0, tunda video, musik, dan pembayaran online |

## 16. Pertanyaan terbuka

1. Apakah “pilih tampilan web” memang berarti memilih tema Memory Page, atau juga mode tampilan situs (gelap dan terang)?
2. Nama final: Jadi Bouquet atau jadibucket? Ini menentukan domain dan akun media sosial.
3. Jenis buket: bunga segar, kering, preserved, atau campuran? Ini memengaruhi filter dan kustomisasi.
4. Apakah harga tetap per produk, atau dihitung dari pilihan di customizer?
5. Metode pembayaran dan area pengiriman awal?
6. Berapa lama Memory Page aktif, dan apakah perpanjangan berbayar?
7. Jumlah dan jenis media maksimal per Memory Page?
8. Siapa yang membuat konten dan foto produk?
9. Siapa yang mengembangkan web (anggota tim atau pihak luar), dan berapa anggaran domain serta hosting?

## 17. Catatan untuk proposal UNISAPreneur

- Website ini dapat menjadi bukti prototipe dan sumber traction (pengunjung, klik pesan, pesanan, pemindaian QR).
- Menurut panduan, kategori Bisnis Digital tidak mencakup aplikasi atau web yang hanya dipakai satu usaha, jadi usaha ini tetap diajukan sebagai Industri Kreatif, Seni, dan Budaya dengan web sebagai pendukung.
- Biaya internet atau paket data tidak boleh dibelanjakan dari dana program. Tanyakan ke panitia apakah domain dan hosting dapat masuk pos pengembangan produk.
