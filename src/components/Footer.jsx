import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Instagram, MessageCircle, MapPin, QrCode, ShieldCheck } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/mockData';

export default function Footer() {
  const location = useLocation();

  if (location.pathname.startsWith('/m/') || location.pathname.startsWith('/q/')) {
    return null;
  }

  return (
    <footer className="bg-[#24120e] text-[#ece3d8] border-t border-[#ece3d8]/15 pt-16 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#ece3d8]/15">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-script text-4xl text-[#ece3d8]">Jadi Bouquet</span>
            </Link>
            <p className="text-xs leading-relaxed text-[#ece3d8]/75">
              Floral Concierge & Memory Curator. Merangkai buket bunga pilihan tangan
              dengan inovasi kartu ucapan QR Memory Page agar setiap pesan dan foto
              kenangan Anda tetap abadi.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <span
                className="w-5 h-5 rounded-full border border-[#ece3d8]/40 inline-block"
                style={{ backgroundColor: '#491318' }}
                title="Deep Burgundy #491318"
              />
              <span
                className="w-5 h-5 rounded-full border border-[#ece3d8]/40 inline-block"
                style={{ backgroundColor: '#ece3d8' }}
                title="Warm Ivory #ece3d8"
              />
              <span
                className="w-5 h-5 rounded-full border border-[#ece3d8]/40 inline-block"
                style={{ backgroundColor: '#24120e' }}
                title="Dark Espresso #24120e"
              />
              <span className="text-[11px] text-[#ece3d8]/60 tracking-wider uppercase">
                Signature Palette
              </span>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#ece3d8] mb-4">
              Eksplorasi Butik
            </h3>
            <ul className="space-y-2.5 text-xs text-[#ece3d8]/75">
              <li>
                <Link to="/katalog" className="hover:text-[#ece3d8] transition">
                  Katalog & Filter Buket
                </Link>
              </li>
              <li>
                <Link to="/produk/the-signature-rose" className="hover:text-[#ece3d8] transition">
                  Customizer Buket Interaktif
                </Link>
              </li>
              <li>
                <Link to="/tema" className="hover:text-[#ece3d8] transition">
                  Pilih Tampilan Memory Page
                </Link>
              </li>
              <li>
                <Link to="/pesan" className="hover:text-[#ece3d8] transition">
                  Ringkasan & Kirim Pesanan
                </Link>
              </li>
            </ul>
          </div>

          {/* Demo QR & Support Pages */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#ece3d8] mb-4">
              Informasi & Demo QR
            </h3>
            <ul className="space-y-2.5 text-xs text-[#ece3d8]/75">
              <li>
                <Link
                  to="/m/demo-anniversary"
                  className="hover:text-[#ece3d8] transition flex items-center gap-1.5"
                >
                  <QrCode className="w-3.5 h-3.5 text-[#ece3d8]" />
                  Demo QR: Anniversary (Burgundy)
                </Link>
              </li>
              <li>
                <Link
                  to="/m/demo-wisuda"
                  className="hover:text-[#ece3d8] transition flex items-center gap-1.5"
                >
                  <QrCode className="w-3.5 h-3.5 text-[#ece3d8]" />
                  Demo QR: Wisuda (Editorial Ivory)
                </Link>
              </li>
              <li>
                <Link to="/tentang" className="hover:text-[#ece3d8] transition">
                  Tentang Kami & Cerita Brand
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#ece3d8] transition">
                  FAQ & Panduan Pemesanan
                </Link>
              </li>
              <li>
                <Link to="/privasi" className="hover:text-[#ece3d8] transition">
                  Kebijakan Privasi & Masa Aktif QR
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#ece3d8] mb-4">
              Hubungi Kami
            </h3>
            <div className="space-y-3 text-xs text-[#ece3d8]/75">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-[#ece3d8]" />
                <span>Studio Jadi Bouquet, Sleman, D.I. Yogyakarta</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 shrink-0 text-[#ece3d8]" />
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#ece3d8] transition"
                >
                  @jadibouquet.id
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 shrink-0 text-[#ece3d8]" />
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#ece3d8] transition"
                >
                  +62 812-3456-7890 (WhatsApp Concierge)
                </a>
              </p>
              <div className="pt-2">
                <Link
                  to="/kontak"
                  className="inline-block border border-[#ece3d8]/40 px-4 py-2 text-[11px] uppercase tracking-widest hover:bg-[#ece3d8] hover:text-[#24120e] transition"
                >
                  Halaman Kontak
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#ece3d8]/60">
          <p>© 2026 Jadi Bouquet. Seluruh hak cipta dilindungi.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              QR Memory Page Privasi Terlindungi (NoIndex)
            </span>
            <Link to="/admin" className="underline hover:text-[#ece3d8]">
              Login Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

