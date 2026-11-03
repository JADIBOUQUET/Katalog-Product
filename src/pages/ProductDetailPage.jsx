import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  Clock,
  Ruler,
  Sparkles,
  QrCode,
  ShoppingBag,
  ArrowRight,
  Flower2,
} from 'lucide-react';
import { useBouquet, formatRupiah } from '../context/BouquetContext';
import { CUSTOMIZER_OPTIONS } from '../data/mockData';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const {
    products,
    draft,
    updateDraft,
    selectProductForDraft,
    getDraftBreakdown,
  } = useBouquet();

  const product =
    products.find((p) => p.slug === slug) ||
    products.find((p) => p.slug === draft.productSlug) ||
    products[0];

  const [activePhoto, setActivePhoto] = useState(product?.image || '');
  const [activeTab, setActiveTab] = useState('flower');

  useEffect(() => {
    if (product && draft.productSlug !== product.slug) {
      selectProductForDraft(product);
    }
    if (product) {
      setActivePhoto(product.image);
    }
  }, [product?.slug]);

  const breakdown = getDraftBreakdown();

  const tabs = [
    { id: 'flower', label: '1. Jenis Bunga', en: 'Flower Type' },
    { id: 'palette', label: '2. Palet Warna', en: 'Color Palette' },
    { id: 'size', label: '3. Ukuran / Gaya', en: 'Size / Style' },
    { id: 'extras', label: '4. Tambahan', en: 'Extras / Upgrades' },
  ];

  const photos =
    product?.gallery && product.gallery.length > 0
      ? product.gallery
      : [product?.image];

  return (
    <div className="min-h-screen bg-[#491318] text-[#ece3d8] py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/katalog"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#ece3d8]/75 hover:text-[#ece3d8] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Katalog</span>
          </Link>
          <span className="text-[11px] uppercase tracking-widest text-[#ece3d8]/65">
            Langkah 1 dari 3 · Kustomisasi Buket
          </span>
        </div>

        {/* Main Grid: Left Photo Gallery, Right Details & Interactive Customizer (PRD Section 9) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Photo Gallery + Visual Summary */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-[4/5] bg-[#24120e] border border-[#ece3d8]/25 overflow-hidden shadow-2xl">
              <img
                src={activePhoto}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {/* Palette Preview Badge on Image */}
              <div className="absolute bottom-3 left-3 right-3 bg-[#24120e]/90 backdrop-blur-md border border-[#ece3d8]/25 p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-5 h-5 rounded-full border border-[#ece3d8]"
                    style={{ backgroundColor: breakdown.colorPalette.hex }}
                  />
                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-widest text-[#ece3d8]/65">
                      Palet & Ukuran Aktif
                    </p>
                    <p className="text-xs font-semibold text-[#ece3d8]">
                      {breakdown.colorPalette.name} · {breakdown.size.stems}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#ece3d8]">
                  {formatRupiah(breakdown.totalPrice)}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            {photos.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {photos.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePhoto(imgUrl)}
                    className={`w-20 h-20 border overflow-hidden shrink-0 cursor-pointer transition ${
                      activePhoto === imgUrl
                        ? 'border-[#ece3d8] ring-2 ring-[#ece3d8]/40'
                        : 'border-[#ece3d8]/20 opacity-65 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Product Specs Card (F-21) */}
            <div className="bg-[#24120e]/60 border border-[#ece3d8]/20 p-5 space-y-3 text-xs">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ece3d8] border-b border-[#ece3d8]/15 pb-2">
                Spesifikasi & Komposisi Rangkaian
              </h3>
              <p className="text-[#ece3d8]/85 leading-relaxed">
                {product.description}
              </p>
              <div className="pt-2 space-y-2 text-[#ece3d8]/80">
                <p className="flex items-start gap-2">
                  <Flower2 className="w-4 h-4 shrink-0 text-[#ece3d8] mt-0.5" />
                  <span>
                    <strong>Komposisi:</strong> {product.composition}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 shrink-0 text-[#ece3d8]" />
                  <span>
                    <strong>Dimensi:</strong> {product.dimensions}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 shrink-0 text-[#ece3d8]" />
                  <span>
                    <strong>Estimasi Pengerjaan:</strong> {product.estimation}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Customizer & Live Price Summary */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 bg-[#24120e] text-[#ece3d8] border border-[#ece3d8]/25">
                  {product.category}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 bg-[#ece3d8] text-[#24120e] font-semibold">
                  Free QR Memory Page
                </span>
              </div>
              <h1 className="font-script text-5xl sm:text-6xl text-[#ece3d8]">
                {product.name}
              </h1>
              <p className="font-editorial text-xl text-[#ece3d8]/90 italic mt-1">
                {product.subtitle}
              </p>
            </div>

            {/* Customizer Box */}
            <div className="bg-[#24120e]/65 border border-[#ece3d8]/25 p-5 sm:p-7">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ece3d8]">
                  Kustomisasi Buket Anda
                </h2>
                <span className="text-[11px] text-[#ece3d8]/70">
                  Harga menyesuaikan otomatis
                </span>
              </div>

              {/* Customizer Tabs (Scrollable on Mobile, Aligned on Desktop per PRD Section 9) */}
              <div className="flex border-b border-[#ece3d8]/20 overflow-x-auto mb-6">
                {tabs.map((t) => {
                  const isActive = activeTab === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setActiveTab(t.id)}
                      className={`px-4 py-3 text-left shrink-0 border-b-2 transition cursor-pointer ${
                        isActive
                          ? 'border-[#ece3d8] text-[#ece3d8] bg-[#491318]/50'
                          : 'border-transparent text-[#ece3d8]/60 hover:text-[#ece3d8]'
                      }`}
                    >
                      <p className="text-xs font-semibold">{t.label}</p>
                      <p className="text-[10px] uppercase tracking-wider opacity-75">
                        {t.en}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Tab 1: Flower Type */}
              {activeTab === 'flower' && (
                <div className="space-y-3">
                  {CUSTOMIZER_OPTIONS.flowerTypes.map((item) => {
                    const selected = draft.flowerTypeId === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => updateDraft({ flowerTypeId: item.id })}
                        className={`w-full p-4 text-left border transition flex items-center justify-between gap-4 cursor-pointer ${
                          selected
                            ? 'bg-[#ece3d8] text-[#24120e] border-[#ece3d8]'
                            : 'bg-[#491318]/40 text-[#ece3d8] border-[#ece3d8]/20 hover:border-[#ece3d8]/60'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-semibold">
                              {item.name}
                            </span>
                            <span
                              className={`text-[9px] uppercase tracking-wider px-2 py-0.5 border ${
                                selected
                                  ? 'border-[#24120e]/30 bg-[#24120e]/10'
                                  : 'border-[#ece3d8]/30'
                              }`}
                            >
                              {item.badge}
                            </span>
                          </div>
                          <p className="text-xs opacity-80 mt-1">{item.desc}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs font-semibold">
                            {item.priceDelta === 0
                              ? 'Standar'
                              : item.priceDelta > 0
                              ? `+ ${formatRupiah(item.priceDelta)}`
                              : `- ${formatRupiah(Math.abs(item.priceDelta))}`}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Tab 2: Color Palette */}
              {activeTab === 'palette' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CUSTOMIZER_OPTIONS.colorPalettes.map((pal) => {
                    const selected = draft.paletteId === pal.id;
                    return (
                      <button
                        key={pal.id}
                        type="button"
                        onClick={() => updateDraft({ paletteId: pal.id })}
                        className={`p-4 text-left border transition cursor-pointer ${
                          selected
                            ? 'bg-[#ece3d8] text-[#24120e] border-[#ece3d8]'
                            : 'bg-[#491318]/40 text-[#ece3d8] border-[#ece3d8]/20 hover:border-[#ece3d8]/60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-6 h-6 rounded-full border border-white/50 shadow"
                              style={{ backgroundColor: pal.hex }}
                            />
                            <span
                              className="w-4 h-4 rounded-full border border-black/30"
                              style={{ backgroundColor: pal.secondaryHex }}
                            />
                            <span className="text-[11px] font-mono opacity-80">
                              {pal.hex}
                            </span>
                          </div>
                          {selected && <Check className="w-4 h-4" />}
                        </div>
                        <p className="text-xs sm:text-sm font-semibold">{pal.name}</p>
                        <p className="text-[11px] opacity-80 mt-1">{pal.desc}</p>
                        <p className="text-[11px] font-semibold mt-2">
                          {pal.priceDelta === 0
                            ? 'Gratis Pilihan Warna'
                            : `+ ${formatRupiah(pal.priceDelta)}`}
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Tab 3: Size / Style */}
              {activeTab === 'size' && (
                <div className="space-y-3">
                  {CUSTOMIZER_OPTIONS.sizes.map((sz) => {
                    const selected = draft.sizeId === sz.id;
                    return (
                      <button
                        key={sz.id}
                        type="button"
                        onClick={() => updateDraft({ sizeId: sz.id })}
                        className={`w-full p-4 text-left border transition flex items-center justify-between gap-4 cursor-pointer ${
                          selected
                            ? 'bg-[#ece3d8] text-[#24120e] border-[#ece3d8]'
                            : 'bg-[#491318]/40 text-[#ece3d8] border-[#ece3d8]/20 hover:border-[#ece3d8]/60'
                        }`}
                      >
                        <div>
                          <p className="text-xs sm:text-sm font-semibold">
                            {sz.name}
                          </p>
                          <p className="text-xs opacity-80 mt-1">{sz.desc}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-semibold block">
                            {sz.priceDelta === 0
                              ? 'Ukuran Standar'
                              : sz.priceDelta > 0
                              ? `+ ${formatRupiah(sz.priceDelta)}`
                              : `- ${formatRupiah(Math.abs(sz.priceDelta))}`}
                          </span>
                          <span className="text-[10px] opacity-75">{sz.stems}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Tab 4: Extras / Upgrades */}
              {activeTab === 'extras' && (
                <div className="space-y-3">
                  {CUSTOMIZER_OPTIONS.extras.map((ex) => {
                    const isChecked =
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
                        className={`w-full p-4 text-left border transition flex items-center justify-between gap-4 cursor-pointer ${
                          isChecked
                            ? 'bg-[#ece3d8] text-[#24120e] border-[#ece3d8]'
                            : 'bg-[#491318]/40 text-[#ece3d8] border-[#ece3d8]/20 hover:border-[#ece3d8]/60'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-semibold">
                              {ex.name}
                            </span>
                            {ex.included && (
                              <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 bg-[#491318] text-[#ece3d8]">
                                Wajib / Gratis
                              </span>
                            )}
                          </div>
                          <p className="text-xs opacity-80 mt-1">{ex.desc}</p>
                        </div>
                        <div className="text-right shrink-0 flex items-center gap-2">
                          <span className="text-xs font-semibold">
                            {ex.included ? 'GRATIS' : `+ ${formatRupiah(ex.price)}`}
                          </span>
                          {isChecked && <Check className="w-4 h-4" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Visual Summary & Price Breakdown Card (F-23 & F-24) */}
            <div className="bg-[#ece3d8] text-[#24120e] p-6 border border-[#24120e]/20 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#24120e]/15">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#491318] font-bold">
                    Ringkasan Kustomisasi Anda
                  </span>
                  <h3 className="font-editorial text-2xl font-bold text-[#24120e]">
                    {product.name}
                  </h3>
                </div>
                <div className=" sm:text-right">
                  <span className="text-[10px] uppercase tracking-widest text-[#24120e]/70 block">
                    Total Harga Buket
                  </span>
                  <span className="text-2xl font-bold text-[#491318]">
                    {formatRupiah(breakdown.totalPrice)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 bg-[#24120e]/5 border border-[#24120e]/10">
                  <span className="text-[10px] uppercase tracking-wider text-[#24120e]/60 block">
                    Jenis Bunga
                  </span>
                  <span className="font-semibold">{breakdown.flowerType.name}</span>
                </div>
                <div className="p-2.5 bg-[#24120e]/5 border border-[#24120e]/10 flex items-center gap-2">
                  <span
                    className="w-4 h-4 rounded-full border border-[#24120e]/40 shrink-0"
                    style={{ backgroundColor: breakdown.colorPalette.hex }}
                  />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#24120e]/60 block">
                      Palet Warna
                    </span>
                    <span className="font-semibold">
                      {breakdown.colorPalette.name}
                    </span>
                  </div>
                </div>
                <div className="p-2.5 bg-[#24120e]/5 border border-[#24120e]/10">
                  <span className="text-[10px] uppercase tracking-wider text-[#24120e]/60 block">
                    Ukuran / Gaya
                  </span>
                  <span className="font-semibold">{breakdown.size.name}</span>
                </div>
                <div className="p-2.5 bg-[#24120e]/5 border border-[#24120e]/10">
                  <span className="text-[10px] uppercase tracking-wider text-[#24120e]/60 block">
                    Tambahan ({breakdown.selectedExtras.length} Item)
                  </span>
                  <span className="font-semibold line-clamp-1">
                    {breakdown.selectedExtras.map((e) => e.name).join(', ')}
                  </span>
                </div>
              </div>

              {/* Next Step CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/tema')}
                  className="flex-1 bg-[#491318] text-[#ece3d8] hover:bg-[#24120e] py-3.5 px-6 text-xs uppercase tracking-[0.2em] font-semibold transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Lanjut: Pilih Tampilan Memory Page</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/pesan')}
                  className="border border-[#24120e] text-[#24120e] hover:bg-[#24120e] hover:text-[#ece3d8] py-3.5 px-5 text-xs uppercase tracking-[0.18em] font-semibold transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Langsung Pesan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

