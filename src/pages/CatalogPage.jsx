import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SlidersHorizontal,
  Search,
  X,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { useBouquet, formatRupiah } from '../context/BouquetContext';
import { CUSTOMIZER_OPTIONS } from '../data/mockData';

export default function CatalogPage() {
  const { products, selectProductForDraft } = useBouquet();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedPalette, setSelectedPalette] = useState('Semua');
  const [selectedMoment, setSelectedMoment] = useState('Semua');
  const [maxPrice, setMaxPrice] = useState(500000);
  const [sortBy, setSortBy] = useState('popular');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const momentsList = ['Semua', 'Anniversary', 'Wisuda', 'Ulang Tahun', 'Valentine', 'Lamaran'];
  const categoriesList = ['Semua', 'Fresh Flower', 'Preserved Flower', 'Dried & Mix'];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
          selectedCategory === 'Semua' || p.category === selectedCategory;
        const matchesPalette =
          selectedPalette === 'Semua' || p.paletteId === selectedPalette;
        const matchesMoment =
          selectedMoment === 'Semua' ||
          (p.moments && p.moments.includes(selectedMoment));
        const matchesPrice = p.basePrice <= maxPrice;

        return (
          matchesSearch &&
          matchesCategory &&
          matchesPalette &&
          matchesMoment &&
          matchesPrice
        );
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
        if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
        return (b.popularScore || 90) - (a.popularScore || 90);
      });
  }, [
    products,
    searchQuery,
    selectedCategory,
    selectedPalette,
    selectedMoment,
    maxPrice,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Semua');
    setSelectedPalette('Semua');
    setSelectedMoment('Semua');
    setMaxPrice(500000);
    setSortBy('popular');
  };

  const handleCustomize = (product) => {
    selectProductForDraft(product);
    navigate(`/produk/${product.slug}`);
  };

  const renderAvailabilityBadge = (status) => {
    if (status === 'Tersedia') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] uppercase tracking-wider bg-[#24120e]/90 text-[#ece3d8] border border-[#ece3d8]/30">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          Tersedia
        </span>
      );
    }
    if (status === 'Pre-Order') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] uppercase tracking-wider bg-[#491318] text-[#ece3d8] border border-amber-300/40">
          <Clock className="w-3 h-3 text-amber-300" />
          Pre-Order
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] uppercase tracking-wider bg-[#24120e] text-[#ece3d8]/60 border border-[#ece3d8]/20">
        <AlertCircle className="w-3 h-3 text-rose-400" />
        Habis
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#491318] text-[#ece3d8] py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#ece3d8]/70">
            Koleksi Rangkaian Tangan · Jadi Bouquet
          </span>
          <h1 className="font-script text-5xl sm:text-6xl text-[#ece3d8] mt-1">
            Katalog Buket
          </h1>
          <p className="text-xs sm:text-sm text-[#ece3d8]/80 mt-2">
            Setiap buket sudah termasuk <strong>Kartu Ucapan QR Memory Page</strong>.
            Pilih rangkaian dasar lalu klik <em>Customize</em> untuk menyesuaikan
            bunga, palet warna, dan ukuran.
          </p>
        </div>

        {/* Top Search & Sort Bar */}
        <div className="bg-[#24120e]/65 border border-[#ece3d8]/20 p-4 mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#ece3d8]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama buket, jenis bunga (mawar, peony, sunflower)..."
              className="w-full bg-[#491318]/60 border border-[#ece3d8]/25 pl-10 pr-4 py-2.5 text-xs text-[#ece3d8] placeholder:text-[#ece3d8]/50 focus:outline-none focus:border-[#ece3d8]"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-[#ece3d8] text-[#24120e] text-xs font-semibold uppercase tracking-wider"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filter
            </button>

            <div className="flex items-center gap-2 flex-1 md:flex-initial">
              <label className="text-[11px] uppercase tracking-wider text-[#ece3d8]/70 whitespace-nowrap">
                Urutkan:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#491318] border border-[#ece3d8]/30 text-[#ece3d8] text-xs px-3 py-2.5 focus:outline-none"
              >
                <option value="popular">Terpopuler</option>
                <option value="price-asc">Harga: Rendah ke Tinggi</option>
                <option value="price-desc">Harga: Tinggi ke Rendah</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Filter Sidebar (Desktop always visible, Mobile toggleable per PRD Section 9) */}
          <aside
            className={`lg:col-span-3 bg-[#24120e]/60 border border-[#ece3d8]/20 p-5 space-y-6 ${
              mobileFilterOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="flex items-center justify-between border-b border-[#ece3d8]/15 pb-3">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filter Katalog
              </h2>
              <button
                type="button"
                onClick={resetFilters}
                className="text-[11px] text-[#ece3d8]/70 hover:text-[#ece3d8] underline cursor-pointer"
              >
                Reset
              </button>
            </div>

            {/* Filter Momen */}
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.18em] text-[#ece3d8]/75 font-semibold mb-2.5">
                Momen Spesial
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {momentsList.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setSelectedMoment(m)}
                    className={`px-2.5 py-1.5 text-[11px] border transition cursor-pointer ${
                      selectedMoment === m
                        ? 'bg-[#ece3d8] text-[#24120e] border-[#ece3d8] font-semibold'
                        : 'border-[#ece3d8]/25 text-[#ece3d8]/80 hover:border-[#ece3d8]'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Kategori Bunga */}
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.18em] text-[#ece3d8]/75 font-semibold mb-2.5">
                Kategori Bunga
              </h3>
              <div className="space-y-1.5">
                {categoriesList.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 text-xs border transition cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#ece3d8] text-[#24120e] border-[#ece3d8] font-semibold'
                        : 'border-[#ece3d8]/15 text-[#ece3d8]/80 hover:border-[#ece3d8]/40'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Palet Warna */}
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.18em] text-[#ece3d8]/75 font-semibold mb-2.5">
                Palet Warna Dasar
              </h3>
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedPalette('Semua')}
                  className={`w-full text-left px-3 py-2 text-xs border transition cursor-pointer ${
                    selectedPalette === 'Semua'
                      ? 'bg-[#ece3d8] text-[#24120e] border-[#ece3d8] font-semibold'
                      : 'border-[#ece3d8]/15 text-[#ece3d8]/80'
                  }`}
                >
                  Semua Palet Warna
                </button>
                {CUSTOMIZER_OPTIONS.colorPalettes.map((pal) => (
                  <button
                    key={pal.id}
                    type="button"
                    onClick={() => setSelectedPalette(pal.id)}
                    className={`w-full text-left px-3 py-2 text-xs border transition flex items-center gap-2 cursor-pointer ${
                      selectedPalette === pal.id
                        ? 'bg-[#ece3d8] text-[#24120e] border-[#ece3d8] font-semibold'
                        : 'border-[#ece3d8]/15 text-[#ece3d8]/80 hover:border-[#ece3d8]/40'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/40 shrink-0"
                      style={{ backgroundColor: pal.hex }}
                    />
                    <span className="truncate">{pal.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Rentang Harga */}
            <div>
              <div className="flex items-center justify-between text-[11px] mb-2">
                <span className="uppercase tracking-[0.16em] text-[#ece3d8]/75 font-semibold">
                  Harga Maksimal
                </span>
                <span className="font-semibold text-[#ece3d8]">
                  {formatRupiah(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min={150000}
                max={500000}
                step={25000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#ece3d8] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#ece3d8]/60 mt-1">
                <span>Rp 150.000</span>
                <span>Rp 500.000</span>
              </div>
            </div>
          </aside>

          {/* Right Product Grid (2 cols on mobile, 3 cols on desktop per PRD Section 9) */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-[#24120e]/50 border border-[#ece3d8]/20 p-12 text-center space-y-4">
                <p className="font-editorial text-2xl text-[#ece3d8]">
                  Tidak ada buket yang cocok dengan filter tersebut.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-[#ece3d8] text-[#24120e] text-xs uppercase tracking-widest font-semibold"
                >
                  Tampilkan Semua Buket
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-7">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-[#24120e]/45 border border-[#ece3d8]/20 hover:border-[#ece3d8]/60 transition flex flex-col justify-between p-3 sm:p-5 text-center"
                  >
                    <div>
                      <div
                        onClick={() => handleCustomize(product)}
                        className="relative aspect-[4/5] mb-4 overflow-hidden bg-[#24120e] cursor-pointer"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute top-2.5 left-2.5">
                          {renderAvailabilityBadge(product.availability)}
                        </div>
                      </div>

                      <div className="text-[10px] uppercase tracking-widest text-[#ece3d8]/60 mb-1">
                        {product.category}
                      </div>
                      <h3 className="font-editorial text-lg sm:text-2xl text-[#ece3d8] font-medium">
                        {product.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-[#ece3d8]/85 font-medium mt-0.5 line-clamp-1">
                        {product.subtitle}
                      </p>

                      {/* Moments tags */}
                      <div className="flex flex-wrap justify-center gap-1 mt-2.5">
                        {product.moments?.slice(0, 2).map((m) => (
                          <span
                            key={m}
                            className="text-[9px] uppercase tracking-wider px-2 py-0.5 bg-[#491318]/80 text-[#ece3d8]/85 border border-[#ece3d8]/15"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#ece3d8]/15">
                      <p className="text-[10px] uppercase tracking-widest text-[#ece3d8]/60">
                        Mulai dari
                      </p>
                      <p className="text-sm sm:text-base font-semibold text-[#ece3d8] mb-3">
                        {formatRupiah(product.basePrice)}
                      </p>

                      <button
                        type="button"
                        disabled={product.availability === 'Habis'}
                        onClick={() => handleCustomize(product)}
                        className={`w-full py-2.5 text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-medium border transition cursor-pointer ${
                          product.availability === 'Habis'
                            ? 'border-[#ece3d8]/20 text-[#ece3d8]/40 cursor-not-allowed'
                            : 'border-[#ece3d8]/75 text-[#ece3d8] hover:bg-[#ece3d8] hover:text-[#24120e]'
                        }`}
                      >
                        {product.availability === 'Habis' ? 'STOK HABIS' : 'CUSTOMIZE'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

