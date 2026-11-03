import React from 'react';
import { Link } from 'react-router-dom';
import {
  HelpCircle,
  ShieldCheck,
  MapPin,
  MessageCircle,
  Instagram,
  Sparkles,
  Clock,
  Heart,
} from 'lucide-react';
import { FAQ_LIST, WHATSAPP_NUMBER } from '../data/mockData';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-[#491318] text-[#ece3d8] py-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#ece3d8]/70">
            Identitas & Filosofi Brand
          </span>
          <h1 className="font-script text-6xl sm:text-7xl text-[#ece3d8]">
            Tentang Jadi Bouquet
          </h1>
          <p className="text-sm text-[#ece3d8]/85 max-w-2xl mx-auto leading-relaxed">
            Menggabungkan seni merangkai buket bunga tangan (<em>hand-tied floral
            boutique</em>) dengan teknologi kenangan digital abadi.
          </p>
        </div>

        <div className="bg-[#24120e]/70 border border-[#ece3d8]/20 p-6 sm:p-10 space-y-6 text-xs sm:text-sm leading-relaxed text-[#ece3d8]/90">
          <h2 className="font-editorial text-3xl text-[#ece3d8] font-semibold">
            Mengapa Kami Menciptakan Kartu QR Memory Page?
          </h2>
          <p>
            Setiap buket bunga membawa cerita—mulai dari perayaan kelulusan sahabat,
            hari jadi pernikahan, hingga ungkapan terima kasih yang tulus. Sayangnya,
            bunga segar dapat layu dan kartu ucapan fisik sering kali hilang atau
            terselip seiring waktu.
          </p>
          <p>
            <strong>Jadi Bouquet</strong> menjawab masalah tersebut melalui inovasi{' '}
            <strong>Kartu Ucapan QR Memory Page</strong>. Saat QR pada kartu ucapan
            dipindai menggunakan kamera HP, penerima langsung disambut halaman web
            personal dengan tema pilihan pengirim yang memuat surat panjang, galeri
            foto kebersamaan, dan tanggal momen spesial.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="p-4 bg-[#491318] border border-[#ece3d8]/25">
              <p className="font-mono text-xs text-[#ece3d8]/70">#491318</p>
              <h3 className="font-editorial text-xl font-bold mt-1">
                Deep Burgundy
              </h3>
              <p className="text-xs text-[#ece3d8]/80 mt-1">
                Melambangkan kasih sayang yang mendalam, kemewahan klasik, dan
                ketulusan hati.
              </p>
            </div>
            <div className="p-4 bg-[#ece3d8] text-[#24120e] border border-[#24120e]/25">
              <p className="font-mono text-xs text-[#24120e]/70">#ece3d8</p>
              <h3 className="font-editorial text-xl font-bold mt-1">Warm Ivory</h3>
              <p className="text-xs text-[#24120e]/80 mt-1">
                Melambangkan lembaran surat yang hangat, kemurnian niat, dan
                keterbacaan yang nyaman.
              </p>
            </div>
            <div className="p-4 bg-[#24120e] border border-[#ece3d8]/25">
              <p className="font-mono text-xs text-[#ece3d8]/70">#24120e</p>
              <h3 className="font-editorial text-xl font-bold mt-1">
                Dark Espresso
              </h3>
              <p className="text-xs text-[#ece3d8]/80 mt-1">
                Memberi kontras dramatis, keintiman suasana, serta bingkai elegan
                pada setiap rangkaian.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FaqPage() {
  return (
    <div className="min-h-screen bg-[#491318] text-[#ece3d8] py-16 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <HelpCircle className="w-8 h-8 mx-auto text-[#ece3d8]" />
          <h1 className="font-script text-5xl sm:text-6xl text-[#ece3d8]">
            Pertanyaan Umum (FAQ)
          </h1>
          <p className="text-xs sm:text-sm text-[#ece3d8]/80">
            Panduan lengkap kustomisasi buket, cara kerja QR Memory Page, dan
            pemesanan.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_LIST.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#24120e]/70 border border-[#ece3d8]/20 p-6 space-y-2"
            >
              <h2 className="font-editorial text-xl sm:text-2xl font-semibold text-[#ece3d8]">
                {item.q}
              </h2>
              <p className="text-xs sm:text-sm text-[#ece3d8]/80 leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            to="/katalog"
            className="inline-block bg-[#ece3d8] text-[#24120e] px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold"
          >
            Mulai Pilih Buket Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ContactPage() {
  return (
    <div className="min-h-screen bg-[#491318] text-[#ece3d8] py-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <h1 className="font-script text-5xl sm:text-6xl text-[#ece3d8]">
            Hubungi Concierge Kami
          </h1>
          <p className="text-xs sm:text-sm text-[#ece3d8]/80">
            Tim Jadi Bouquet siap membantu konsultasi buket custom, pesanan korporat,
            maupun bantuan halaman QR Memory Page.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#24120e]/70 border border-[#ece3d8]/20 p-6 text-center space-y-3">
            <MessageCircle className="w-7 h-7 mx-auto text-[#ece3d8]" />
            <h2 className="font-editorial text-2xl font-semibold">WhatsApp</h2>
            <p className="text-xs text-[#ece3d8]/75">
              Respon cepat setiap hari (08.00 – 21.00 WIB)
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-[#ece3d8] text-[#24120e] px-5 py-2.5 text-xs uppercase tracking-widest font-semibold"
            >
              Chat WhatsApp
            </a>
          </div>

          <div className="bg-[#24120e]/70 border border-[#ece3d8]/20 p-6 text-center space-y-3">
            <Instagram className="w-7 h-7 mx-auto text-[#ece3d8]" />
            <h2 className="font-editorial text-2xl font-semibold">Instagram</h2>
            <p className="text-xs text-[#ece3d8]/75">
              Galeri buket terbaru & inspirasi momen pelanggan
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-block border border-[#ece3d8]/50 text-[#ece3d8] px-5 py-2.5 text-xs uppercase tracking-widest"
            >
              @jadibouquet.id
            </a>
          </div>

          <div className="bg-[#24120e]/70 border border-[#ece3d8]/20 p-6 text-center space-y-3">
            <MapPin className="w-7 h-7 mx-auto text-[#ece3d8]" />
            <h2 className="font-editorial text-2xl font-semibold">Studio Pickup</h2>
            <p className="text-xs text-[#ece3d8]/75">
              Sleman, D.I. Yogyakarta (Pengambilan langsung & kurir instan)
            </p>
            <span className="inline-block text-[11px] uppercase tracking-widest text-[#ece3d8]/60">
              Buka Senin – Minggu
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#491318] text-[#ece3d8] py-16 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <ShieldCheck className="w-8 h-8 mx-auto text-[#ece3d8]" />
          <h1 className="font-script text-5xl sm:text-6xl text-[#ece3d8]">
            Kebijakan Privasi & Masa Aktif QR
          </h1>
          <p className="text-xs sm:text-sm text-[#ece3d8]/80">
            Komitmen keamanan data pelanggan dan ketahanan tautan Memory Page Jadi
            Bouquet.
          </p>
        </div>

        <div className="bg-[#24120e]/75 border border-[#ece3d8]/20 p-6 sm:p-8 space-y-5 text-xs sm:text-sm leading-relaxed text-[#ece3d8]/85">
          <div>
            <h2 className="font-editorial text-2xl font-semibold text-[#ece3d8] mb-1">
              1. Privasi Halaman Kenangan (NoIndex & Alamat Acak)
            </h2>
            <p>
              Setiap Memory Page memiliki kode acak unik (<code>/m/kode-acak</code>)
              dan dilengkapi tag <code>noindex, nofollow</code> sehingga tidak akan
              muncul di pencarian Google atau mesin pencari publik. Pengirim juga
              dapat menambahkan <strong>Kata Sandi Opsional</strong> untuk lapisan
              privasi ekstra.
            </p>
          </div>

          <div>
            <h2 className="font-editorial text-2xl font-semibold text-[#ece3d8] mb-1">
              2. Syarat Masa Aktif Memory Page & Keandalan QR
            </h2>
            <p>
              Setiap pembelian buket menyertakan masa aktif penyimpanan Memory Page
              selama <strong>1 Tahun penuh</strong> sejak tanggal pemesanan. Kartu QR
              menggunakan sistem pengalihan tautan pendek (<code>/q/kode</code>)
              milik sendiri sehingga tetap aman dan dapat diperpanjang atau disimpan
              arsipnya kapan saja tanpa perlu mencetak ulang kartu fisik.
            </p>
          </div>

          <div>
            <h2 className="font-editorial text-2xl font-semibold text-[#ece3d8] mb-1">
              3. Moderasi & Penghapusan Data Atas Permintaan
            </h2>
            <p>
              Data pelanggan dan foto kenangan tidak pernah dibagikan kepada pihak
              ketiga. Pemesan maupun penerima berhak meminta perubahan, penonaktifan,
              atau penghapusan permanen halaman Memory Page kapan saja melalui
              WhatsApp Concierge kami.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

