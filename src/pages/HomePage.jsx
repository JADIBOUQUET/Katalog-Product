import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  QrCode,
  Heart,
  Check,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Gift,
  Star,
} from 'lucide-react';
import { useBouquet, formatRupiah } from '../context/BouquetContext';
import { CUSTOMIZER_OPTIONS, MEMORY_THEMES } from '../data/mockData';
import QrCodeBox from '../components/QrCodeBox';

export default function HomePage() {
  const {
    products,
    draft,
    updateDraft,
    selectProductForDraft,
    getDraftBreakdown,
  } = useBouquet();
  const navigate = useNavigate();

  // Interactive tab state for "Build Your Bouquet" section on landing page
  const [activeTab, setActiveTab] = useState('flower');
  const featuredProducts = products.slice(0, 3);
  const breakdown = getDraftBreakdown();

  const tabs = [
    { id: 'flower', label: 'Flower Type', sub: 'Jenis Bunga' },
    { id: 'palette', label: 'Color Palette', sub: 'Palet Warna' },
    { id: 'size', label: 'Size / Style', sub: 'Ukuran & Gaya' },
    { id: 'extras', label: 'Extras / Upgrades', sub: 'Tambahan & QR' },
  ];

  const handleCustomizeClick = (product) => {
    selectProductForDraft(product);
    navigate(`/produk/${product.slug}`);
  };

  return (
    <div className="bg-[#491318] text-[#ece3d8]">
      {/* =========================================================
          1. HERO SECTION (Mirrors referensi jadi buqet.jpg)
      ========================================================= */}
      <section className="hero-rose-bg relative min-h-[78vh] flex items-center justify-center text-center px-4 sm:px-8 py-24 border-b border-[#ece3d8]/10">
        {/* Subtle dark vignette overlay for WCAG AA contrast */}
        <div className="max-w-3xl mx-auto relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#491318]/80 border border-[#ece3d8]/25 text-[11px] tracking-[0.22em] uppercase text-[#ece3d8]/90">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Boutique Florist & Digital Memory</span>
          </div>

          <h1 className="font-script text-6xl sm:text-7xl md:text-8xl text-[#ece3d8] leading-none drop-shadow-lg py-2">
            Jadi Bouquet
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#ece3d8]/90 max-w-xl mx-auto font-normal leading-relaxed">
            Curated rose bouquets, hand-built for special days.
            <br />
            Dilengkapi kartu QR Memory Page abadi untuk mereka yang memberi dengan hati.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#build-bouquet"
              className="bg-[#ece3d8] text-[#24120e] hover:bg-[#ece3d8]/90 px-9 py-3.5 text-xs tracking-[0.22em] uppercase font-semibold transition shadow-xl"
            >
              PILIH BUKET
            </a>
            <Link
              to="/tema"
              className="border border-[#ece3d8]/60 hover:border-[#ece3d8] bg-[#24120e]/50 hover:bg-[#24120e] text-[#ece3d8] px-7 py-3.5 text-xs tracking-[0.2em] uppercase font-medium transition flex items-center gap-2"
            >
              <QrCode className="w-4 h-4" />
              PILIH TAMPILAN WEB QR
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. BUILD YOUR BOUQUET SECTION (Mirrors Reference Image)
      ========================================================= */}
      <section
        id="build-bouquet"
        className="py-20 sm:py-24 px-4 sm:px-8 max-w-6xl mx-auto text-center"
      >
        <h2 className="font-script text-5xl sm:text-6xl text-[#ece3d8] mb-8">
          Build Your Bouquet
        </h2>

        {/* 4 Tabs matching reference: Flower Type | Color Palette | Size / Style | Extras / Upgrades */}
        <div className="border-b border-[#ece3d8]/20 max-w-2xl mx-auto mb-10 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[460px] px-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3.5 px-3 text-xs sm:text-sm tracking-wider transition relative cursor-pointer ${
                    isActive
                      ? 'text-[#ece3d8] font-medium'
                      : 'text-[#ece3d8]/65 hover:text-[#ece3d8]'
                  }`}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#ece3d8]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Quick-Selector Panel for the Active Tab */}
        <div className="max-w-4xl mx-auto mb-14 bg-[#24120e]/45 border border-[#ece3d8]/15 p-5 sm:p-6 rounded-xs text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-[#ece3d8]/10">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#ece3d8]/65">
                Kustomisasi Cepat · Langkah Aktif:
              </span>
              <h3 className="text-sm font-semibold text-[#ece3d8]">
                {tabs.find((t) => t.id === activeTab)?.label} (
                {tabs.find((t) => t.id === activeTab)?.sub})
              </h3>
            </div>
            <div className="text-xs text-[#ece3d8]/85">
              Estimasi Buket Pilihan:{' '}
              <span className="font-semibold text-[#ece3d8]">
                {formatRupiah(breakdown.totalPrice)}
              </span>
            </div>
          </div>

          {activeTab === 'flower' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {CUSTOMIZER_OPTIONS.flowerTypes.map((flower) => {
                const selected = draft.flowerTypeId === flower.id;
                return (
                  <button
                    key={flower.id}
                    type="button"
                    onClick={() => updateDraft({ flowerTypeId: flower.id })}
                    className={`p-3.5 text-left border transition cursor-pointer ${
                      selected
                        ? 'bg-[#ece3d8] text-[#24120e] border-[#ece3d8]'
                        : 'bg-[#491318]/60 text-[#ece3d8] border-[#ece3d8]/20 hover:border-[#ece3d8]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-wider opacity-75 mb-1">
                      <span>{flower.badge}</span>
                      {selected && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <p className="text-xs font-semibold">{flower.name}</p>
                    <p className="text-[11px] opacity-80 mt-1 line-clamp-2">
                      {flower.desc}
                    </p>
                    <p className="text-[11px] font-medium mt-2">
                      {flower.priceDelta === 0
                        ? 'Termasuk Harga Dasar'
                        : flower.priceDelta > 0
                        ? `+ ${formatRupiah(flower.priceDelta)}`
                        : `- ${formatRupiah(Math.abs(flower.priceDelta))}`}
                    </p>
                  </button>
                );
              })}
            </div>
          )}

          {activeTab === 'palette' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {CUSTOMIZER_OPTIONS.colorPalettes.map((palette) => {
                const selected = draft.paletteId === palette.id;
                return (
                  <button
                    key={palette.id}
                    type="button"
                    onClick={() => updateDraft({ paletteId: palette.id })}
                    className={`p-3.5 text-left border transition cursor-pointer ${
                      selected
                        ? 'bg-[#ece3d8] text-[#24120e] border-[#ece3d8]'
                        : 'bg-[#491318]/60 text-[#ece3d8] border-[#ece3d8]/20 hover:border-[#ece3d8]/60'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="w-5 h-5 rounded-full border border-white/40 inline-block"
                        style={{ backgroundColor: palette.hex }}
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-black/20 inline-block"
                        style={{ backgroundColor: palette.secondaryHex }}
                      />
                      <span className="text-[10px] font-mono uppercase opacity-75">
                        {palette.hex}
                      </span>
                    </div>
                    <p className="text-xs font-semibold">{palette.name}</p>
                    <p className="text-[11px] opacity-80 mt-1">{palette.desc}</p>
                  </button>
                );
              })}
            </div>
          )}

          {activeTab === 'size' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CUSTOMIZER_OPTIONS.sizes.map((sz) => {
                const selected = draft.sizeId === sz.id;
                return (
                  <button
                    key={sz.id}
                    type="button"
                    onClick={() => updateDraft({ sizeId: sz.id })}
                    className={`p-4 text-left border transition cursor-pointer ${
                      selected
                        ? 'bg-[#ece3d8] text-[#24120e] border-[#ece3d8]'
                        : 'bg-[#491318]/60 text-[#ece3d8] border-[#ece3d8]/20 hover:border-[#ece3d8]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-widest opacity-75 mb-1">
                      <span>{sz.stems}</span>
                      {selected && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <p className="text-xs font-semibold">{sz.name}</p>
                    <p className="text-[11px] opacity-80 mt-1">{sz.desc}</p>
                    <p className="text-[11px] font-medium mt-2">
                      {sz.priceDelta === 0
                        ? 'Ukuran Standar'
                        : sz.priceDelta > 0
                        ? `+ ${formatRupiah(sz.priceDelta)}`
                        : `- ${formatRupiah(Math.abs(sz.priceDelta))}`}
                    </p>
                  </button>
                );
              })}
            </div>
          )}

          {activeTab === 'extras' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {CUSTOMIZER_OPTIONS.extras.map((ex) => {
                const isSelected =
                  ex.included || draft.extraIds.includes(ex.id);
                return (
                  <button
                    key={ex.id}
                    type="button"
                    onClick={() => {
                      if (ex.included) return;
                      const exists = draft.extraIds.includes(ex.id);
                      updateDraft({
                        extraIds: exists
                          ? draft.extraIds.filter((i) => i !== ex.id)
                          : [...draft.extraIds, ex.id],
                      });
                    }}
                    className={`p-3.5 text-left border transition cursor-pointer ${
                      isSelected
                        ? 'bg-[#ece3d8] text-[#24120e] border-[#ece3d8]'
                        : 'bg-[#491318]/60 text-[#ece3d8] border-[#ece3d8]/20 hover:border-[#ece3d8]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-wider opacity-75 mb-1">
                      <span>{ex.included ? 'Gratis P0' : 'Tambahan'}</span>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <p className="text-xs font-semibold">{ex.name}</p>
                    <p className="text-[11px] opacity-80 mt-1">{ex.desc}</p>
                    <p className="text-[11px] font-medium mt-2">
                      {ex.included ? 'GRATIS (Termasuk)' : `+ ${formatRupiah(ex.price)}`}
                    </p>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 3 Featured Bouquet Cards matching reference layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 items-end">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col items-center text-center"
            >
              {/* Bouquet Spotlight Frame */}
              <div
                onClick={() => handleCustomizeClick(product)}
                className="relative w-64 h-72 sm:w-72 sm:h-80 mb-6 flex items-center justify-center cursor-pointer"
              >
                {/* Radial subtle pedestal glow behind bouquet */}
                <div className="absolute inset-4 rounded-full bg-radial from-[#ece3d8]/15 via-transparent to-transparent opacity-70 group-hover:opacity-100 transition duration-500" />
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-56 h-64 sm:w-64 sm:h-72 object-cover rounded-t-full rounded-b-lg shadow-2xl border border-[#ece3d8]/20 group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 right-6 bg-[#24120e]/90 text-[#ece3d8] text-[10px] tracking-widest uppercase px-2.5 py-1 border border-[#ece3d8]/25">
                  {formatRupiah(product.basePrice)}
                </span>
              </div>

              {/* Title & Composition Subtitle exactly like reference */}
              <h3 className="font-editorial text-xl sm:text-2xl text-[#ece3d8] font-medium tracking-wide">
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#ece3d8] font-semibold mt-1 mb-5">
                {product.subtitle}
              </p>

              {/* Outline CUSTOMIZE Button matching reference */}
              <button
                type="button"
                onClick={() => handleCustomizeClick(product)}
                className="border border-[#ece3d8]/65 hover:border-[#ece3d8] hover:bg-[#ece3d8] hover:text-[#24120e] text-[#ece3d8] text-[11px] tracking-[0.22em] uppercase px-8 py-2.5 transition duration-300 cursor-pointer"
              >
                CUSTOMIZE
              </button>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <Link
            to="/katalog"
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#ece3d8]/85 hover:text-[#ece3d8] border-b border-[#ece3d8]/40 pb-1 transition"
          >
            <span>Lihat Seluruh Katalog ({products.length} Koleksi)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* =========================================================
          3. OUR STORY + SATIN RIBBON BOW DIVIDER (Mirrors Reference)
      ========================================================= */}
      <section className="pt-8 pb-20 relative overflow-hidden">
        <div className="max-w-2xl mx-auto px-4 sm:px-8 text-center space-y-5 mb-14">
          <h2 className="font-script text-5xl sm:text-6xl text-[#ece3d8]">
            Our Story
          </h2>
          <p className="text-xs sm:text-sm leading-relaxed text-[#ece3d8]/85 font-normal">
            Berawal dari pemikiran sederhana bahwa bunga seharusnya seindah dan seabadi
            momen yang dirayakannya. Buket fisik mungkin perlahan mengering dan kartu
            ucapan kertas mudah terselip, namun perasaan di baliknya layak hidup
            selamanya. Dari memilih tangkai mawar terbaik hingga mengikat setiap pita
            satin dengan tangan, <strong className="text-[#ece3d8]">Jadi Bouquet</strong> hadir
            sebagai <em>floral concierge</em> Anda—mengubah kelopak bunga menjadi
            pernyataan cinta dan mengabadikan hari berharga melalui <strong>QR Memory Page</strong>.
          </p>
        </div>

        {/* Full-Width Satin Ribbon & Centerpiece Bow matching reference */}
        <div className="relative py-12 sm:py-16 flex items-center justify-center">
          {/* Horizontal Satin Ribbon Band */}
          <div className="w-full h-14 sm:h-16 satin-ribbon-band flex flex-col justify-between py-1">
            <div className="ribbon-stitch w-full" />
            <div className="ribbon-stitch w-full" />
          </div>

          {/* Realistic Satin Bow SVG Centerpiece */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg
              viewBox="0 0 500 280"
              className="w-72 sm:w-96 md:w-[430px] drop-shadow-[0_20px_25px_rgba(15,5,4,0.85)]"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="bowLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8a242f" />
                  <stop offset="45%" stopColor="#5c161e" />
                  <stop offset="85%" stopColor="#380c11" />
                  <stop offset="100%" stopColor="#24120e" />
                </linearGradient>
                <linearGradient id="bowRight" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#942935" />
                  <stop offset="45%" stopColor="#5c161e" />
                  <stop offset="85%" stopColor="#380c11" />
                  <stop offset="100%" stopColor="#24120e" />
                </linearGradient>
                <linearGradient id="bowKnot" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#9b2b38" />
                  <stop offset="50%" stopColor="#5e171f" />
                  <stop offset="100%" stopColor="#24120e" />
                </linearGradient>
              </defs>
              {/* Left Tail */}
              <path
                d="M235 145 L165 275 L205 268 L220 278 L248 155 Z"
                fill="url(#bowLeft)"
                stroke="#ece3d8"
                strokeOpacity="0.18"
                strokeWidth="1"
              />
              {/* Right Tail */}
              <path
                d="M265 145 L335 275 L295 268 L280 278 L252 155 Z"
                fill="url(#bowRight)"
                stroke="#ece3d8"
                strokeOpacity="0.18"
                strokeWidth="1"
              />
              {/* Left Satin Loop */}
              <path
                d="M242 132 C175 45, 75 55, 85 130 C92 195, 185 182, 242 142 Z"
                fill="url(#bowLeft)"
                stroke="#ece3d8"
                strokeOpacity="0.22"
                strokeWidth="1.2"
              />
              {/* Inner fold shadow left */}
              <path
                d="M235 135 C185 95, 125 105, 120 132 C145 148, 195 145, 235 138 Z"
                fill="#24120e"
                fillOpacity="0.55"
              />
              {/* Right Satin Loop */}
              <path
                d="M258 132 C325 45, 425 55, 415 130 C408 195, 315 182, 258 142 Z"
                fill="url(#bowRight)"
                stroke="#ece3d8"
                strokeOpacity="0.22"
                strokeWidth="1.2"
              />
              {/* Inner fold shadow right */}
              <path
                d="M265 135 C315 95, 375 105, 380 132 C355 148, 305 145, 265 138 Z"
                fill="#24120e"
                fillOpacity="0.55"
              />
              {/* Center Knot */}
              <rect
                x="230"
                y="112"
                width="40"
                height="44"
                rx="10"
                fill="url(#bowKnot)"
                stroke="#ece3d8"
                strokeOpacity="0.3"
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* =========================================================
          4. CARA KERJA QR MEMORY PAGE (PRD F-02: 3 Langkah)
      ========================================================= */}
      <section className="py-20 bg-[#24120e]/60 border-y border-[#ece3d8]/15 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#ece3d8]/70">
              Inovasi Jadi Bouquet · QR Memory Page
            </span>
            <h2 className="font-script text-5xl sm:text-6xl text-[#ece3d8] mt-2">
              Kenangan yang Tak Ikut Layu
            </h2>
            <p className="text-xs sm:text-sm text-[#ece3d8]/80 mt-2">
              Hanya dalam 3 langkah mudah, ubah kartu ucapan fisik menjadi halaman
              kenangan digital yang dapat dibuka kapan saja.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {[
              {
                step: '01',
                icon: Gift,
                title: 'Pilih & Kustomisasi Buket',
                desc: 'Pilih buket dasar favorit Anda, lalu sesuaikan jenis bunga, palet warna (#491318, #ece3d8, #24120e), ukuran, dan tambahan.',
                link: '/katalog',
                linkText: 'Buka Katalog',
              },
              {
                step: '02',
                icon: Sparkles,
                title: 'Pilih Tema Web & Tulis Kenangan',
                desc: 'Pilih tema tampilan Memory Page, tulis surat personal (hingga 1.000 karakter), tanggal momen, dan unggah foto kenangan Anda.',
                link: '/tema',
                linkText: 'Pilih Tampilan Web',
              },
              {
                step: '03',
                icon: Smartphone,
                title: 'Scan QR Kapan Saja',
                desc: 'Tim kami mencetak QR unik bersegel wax di kartu ucapan. Saat dipindai penerima, halaman kenangan langsung terbuka tanpa perlu login.',
                link: '/m/demo-anniversary',
                linkText: 'Lihat Contoh Hasil QR',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="bg-[#491318]/65 border border-[#ece3d8]/20 p-6 sm:p-8 flex flex-col justify-between hover:border-[#ece3d8]/50 transition"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-editorial text-3xl italic text-[#ece3d8]/60">
                        Langkah {item.step}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-[#ece3d8] text-[#24120e] flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="font-editorial text-2xl text-[#ece3d8] font-semibold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-[#ece3d8]/80">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#ece3d8]/15">
                    <Link
                      to={item.link}
                      className="text-[11px] uppercase tracking-[0.18em] text-[#ece3d8] font-medium inline-flex items-center gap-1.5 hover:underline"
                    >
                      <span>{item.linkText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Live Demo QR Showcase Box */}
          <div className="bg-[#ece3d8] text-[#24120e] p-6 sm:p-10 rounded-xs shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#491318] text-[#ece3d8] text-[10px] uppercase tracking-[0.2em] font-semibold">
                <QrCode className="w-3.5 h-3.5" />
                <span>Coba Scan Sekarang · Live Prototype</span>
              </div>
              <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-[#24120e]">
                Rasakan Pengalaman Penerima Buket
              </h3>
              <p className="text-xs sm:text-sm text-[#24120e]/85 leading-relaxed">
                Pindai kode QR di samping menggunakan kamera HP Anda, atau klik tombol
                pratinjau di bawah untuk melihat bagaimana halaman kenangan terbuka
                dengan tema <strong>Burgundy Classic (`#491318`)</strong> dan{' '}
                <strong>Warm Ivory (`#ece3d8`)</strong>.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  to="/m/demo-anniversary"
                  className="bg-[#491318] text-[#ece3d8] hover:bg-[#24120e] px-5 py-3 text-xs uppercase tracking-[0.18em] font-semibold transition inline-flex items-center gap-2"
                >
                  <Heart className="w-3.5 h-3.5" />
                  Buka Demo Anniversary
                </Link>
                <Link
                  to="/m/demo-wisuda"
                  className="border border-[#24120e] text-[#24120e] hover:bg-[#24120e] hover:text-[#ece3d8] px-5 py-3 text-xs uppercase tracking-[0.18em] font-semibold transition inline-flex items-center gap-2"
                >
                  Buka Demo Wisuda
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 flex justify-center">
              <QrCodeBox
                shortCode="anniv26"
                memoryCode="demo-anniversary"
                label="Scan Demo Kartu Ucapan"
                size={150}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          5. PILIHAN TEMA MEMORY PAGE PREVIEW (F-30) & TESTIMONI (F-05)
      ========================================================= */}
      <section className="py-20 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#ece3d8]/70">
            Personalisasi Tampilan Web
          </span>
          <h2 className="font-script text-5xl sm:text-6xl text-[#ece3d8] mt-1">
            4 Tema Memory Page Eksklusif
          </h2>
          <p className="text-xs sm:text-sm text-[#ece3d8]/80 mt-2">
            Setiap tema dirancang menggunakan palet warna resmi Jadi Bouquet dengan
            kontras keterbacaan tinggi (WCAG AA).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {MEMORY_THEMES.map((theme) => (
            <div
              key={theme.id}
              className="border border-[#ece3d8]/25 bg-[#24120e]/50 p-5 flex flex-col justify-between"
            >
              <div>
                {/* Mini Theme Preview Swatch Card */}
                <div
                  className="h-32 p-3 mb-4 border flex flex-col justify-between rounded-xs"
                  style={{
                    backgroundColor: theme.bgHex,
                    color: theme.textHex,
                    borderColor: theme.borderHex,
                  }}
                >
                  <div className="flex items-center justify-between text-[9px] uppercase tracking-widest opacity-80">
                    <span>Jadi Bouquet</span>
                    <span>{theme.bgHex}</span>
                  </div>
                  <div
                    className="p-2 rounded-xs border"
                    style={{
                      backgroundColor: theme.cardHex,
                      color: theme.textHex,
                      borderColor: theme.borderHex,
                    }}
                  >
                    <p className="font-script text-lg leading-none">
                      Untuk Hari Spesialmu
                    </p>
                    <p className="text-[9px] opacity-80 mt-1">
                      Kenangan abadi dalam satu pindaian QR...
                    </p>
                  </div>
                </div>

                <span className="text-[10px] uppercase tracking-widest text-[#ece3d8]/65">
                  {theme.badge}
                </span>
                <h3 className="font-editorial text-xl font-semibold text-[#ece3d8] mt-0.5">
                  {theme.name}
                </h3>
                <p className="text-xs text-[#ece3d8]/75 mt-1 leading-relaxed">
                  {theme.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  updateDraft({ themeId: theme.id });
                  navigate('/tema');
                }}
                className="mt-5 w-full py-2.5 border border-[#ece3d8]/50 hover:bg-[#ece3d8] hover:text-[#24120e] text-[#ece3d8] text-[11px] uppercase tracking-[0.18em] font-medium transition cursor-pointer"
              >
                Gunakan Tema Ini
              </button>
            </div>
          ))}
        </div>

        {/* Testimonials (F-05) */}
        <div className="border-t border-[#ece3d8]/15 pt-16">
          <h3 className="font-editorial text-2xl sm:text-3xl text-center text-[#ece3d8] mb-8">
            Cerita Pelanggan Jadi Bouquet
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Nadira & Raka',
                moment: 'Anniversary ke-3',
                quote:
                  'Waktu scan QR di kartu ucapannya, langsung muncul foto-foto kami dan surat panjang dengan warna burgundy yang mewah banget. Sampai sekarang kartunya aku simpan di meja kerja!',
              },
              {
                name: 'Salsabila Putri',
                moment: 'Wisuda UNISA Yogyakarta',
                quote:
                  'Pesan buket Ivory Whisper buat sahabat wisuda. Satu geng bisa ikut nitip foto bareng di dalam Memory Page-nya. Praktis banget tinggal klik Kirim via WhatsApp.',
              },
              {
                name: 'Dimas Aditya',
                moment: 'Hadiah Ulang Tahun',
                quote:
                  'Suka banget karena harga di customizer langsung terhitung otomatis waktu pilih jenis bunga dan ukuran. Tema Warm Ivory Letter-nya juga jelas dan elegan dibaca dari HP.',
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-[#24120e]/50 border border-[#ece3d8]/15 p-6 space-y-3"
              >
                <div className="flex items-center gap-1 text-[#ece3d8]">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs leading-relaxed text-[#ece3d8]/85 italic">
                  "{t.quote}"
                </p>
                <div className="pt-2 border-t border-[#ece3d8]/10 text-[11px]">
                  <p className="font-semibold text-[#ece3d8]">{t.name}</p>
                  <p className="text-[#ece3d8]/65">{t.moment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

