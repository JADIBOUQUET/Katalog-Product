import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  UserCheck,
  Menu,
  X,
  QrCode,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useBouquet, formatRupiah } from '../context/BouquetContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getDraftBreakdown } = useBouquet();
  const location = useLocation();
  const breakdown = getDraftBreakdown();

  // Hide global boutique navbar when viewing a standalone public Memory Page (/m/...) or QR redirect (/q/...)
  if (location.pathname.startsWith('/m/') || location.pathname.startsWith('/q/')) {
    return null;
  }

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Katalog', to: '/katalog' },
    { label: 'Tema Memory QR', to: '/tema' },
    { label: 'Demo QR', to: '/m/demo-anniversary' },
    { label: 'Tentang', to: '/tentang' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#24120e]/90 backdrop-blur-md border-b border-[#ece3d8]/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          {/* Left: Script Brand Logo matching reference */}
          <Link
            to="/"
            className="flex items-center gap-2 group focus:outline-none"
            aria-label="Jadi Bouquet Beranda"
          >
            <span className="font-script text-3xl sm:text-4xl text-[#ece3d8] tracking-wide group-hover:opacity-90 transition">
              Jadi Bouquet
            </span>
          </Link>

          {/* Center: Horizontal Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-9">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-xs tracking-[0.18em] uppercase transition-colors py-1 ${
                    isActive
                      ? 'text-[#ece3d8] font-semibold border-b border-[#ece3d8]'
                      : 'text-[#ece3d8]/75 hover:text-[#ece3d8]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right: Icons & Outline CTA Button matching reference */}
          <div className="hidden lg:flex items-center gap-5">
            <Link
              to="/admin"
              title="Panel Admin Jadi Bouquet"
              className="p-2 text-[#ece3d8]/80 hover:text-[#ece3d8] transition rounded-full hover:bg-[#491318]/50"
            >
              <UserCheck className="w-4 h-4" />
            </Link>

            <Link
              to="/pesan"
              title="Ringkasan Pesanan Anda"
              className="flex items-center gap-2 text-[#ece3d8]/85 hover:text-[#ece3d8] transition py-1.5 px-2.5 rounded-xs hover:bg-[#491318]/40"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-[11px] font-medium tracking-wider">
                {formatRupiah(breakdown.totalPrice)}
              </span>
            </Link>

            <Link
              to="/pesan"
              className="border border-[#ece3d8]/65 hover:border-[#ece3d8] hover:bg-[#ece3d8] hover:text-[#24120e] text-[#ece3d8] text-[11px] tracking-[0.2em] uppercase font-medium px-5 py-2.5 transition duration-300"
            >
              PESAN SEKARANG
            </Link>
          </div>

          {/* Mobile Hamburger Trigger */}
          <div className="flex lg:hidden items-center gap-3">
            <Link
              to="/tema"
              className="p-2 text-[#ece3d8]/85 hover:text-[#ece3d8]"
              title="Pilih Tema QR"
            >
              <QrCode className="w-5 h-5" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-[#ece3d8] border border-[#ece3d8]/25 rounded-xs focus:outline-none"
              aria-label="Buka Menu Navigasi"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#24120e] border-b border-[#ece3d8]/15 px-6 py-6 space-y-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-sm tracking-[0.16em] uppercase py-2 border-b border-[#ece3d8]/10 ${
                      isActive ? 'text-[#ece3d8] font-semibold' : 'text-[#ece3d8]/75'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <NavLink
                to="/faq"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm tracking-[0.16em] uppercase py-2 border-b border-[#ece3d8]/10 text-[#ece3d8]/75"
              >
                FAQ & Panduan QR
              </NavLink>
              <NavLink
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm tracking-[0.16em] uppercase py-2 text-[#ece3d8]/75 flex items-center gap-2"
              >
                <UserCheck className="w-4 h-4" /> Panel Admin
              </NavLink>
            </div>

            <div className="pt-2">
              <Link
                to="/pesan"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full block text-center bg-[#ece3d8] text-[#24120e] py-3 text-xs tracking-[0.2em] uppercase font-semibold"
              >
                Lanjut Pemesanan ({formatRupiah(breakdown.totalPrice)})
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Sticky Bottom Bar on Mobile (PRD Section 9: tombol "Pesan" menempel di bawah pada HP) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#24120e]/95 backdrop-blur-md border-t border-[#ece3d8]/20 px-4 py-2.5 flex items-center justify-between shadow-2xl">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-[#ece3d8]/65">
            Pilihan: {breakdown.selectedProduct?.name}
          </p>
          <p className="text-sm font-semibold text-[#ece3d8]">
            {formatRupiah(breakdown.totalPrice)}{' '}
            <span className="text-[10px] font-normal text-[#ece3d8]/70">+ Free QR Page</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/tema"
            className="px-3 py-2.5 border border-[#ece3d8]/40 text-[#ece3d8] text-[11px] uppercase tracking-wider font-medium flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Tema QR
          </Link>
          <Link
            to="/pesan"
            className="px-4 py-2.5 bg-[#ece3d8] text-[#24120e] text-[11px] uppercase tracking-wider font-semibold flex items-center gap-1"
          >
            Pesan
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </>
  );
}

