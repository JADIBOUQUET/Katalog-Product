import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Package,
  ShoppingBag,
  QrCode,
  BarChart3,
  Plus,
  Trash2,
  Eye,
  LogOut,
  Power,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { useBouquet, formatRupiah } from '../context/BouquetContext';
import { CUSTOMIZER_OPTIONS } from '../data/mockData';
import QrCodeBox from '../components/QrCodeBox';

const ORDER_STATUSES = [
  'Baru',
  'Dikonfirmasi',
  'Dibayar',
  'Diproses',
  'Dikirim',
  'Selesai',
  'Dibatalkan',
];

export default function AdminPage() {
  const {
    products,
    orders,
    memories,
    stats,
    updateOrderStatus,
    toggleMemoryStatus,
    deleteMemory,
    addProduct,
    updateProductAvailability,
    deleteProduct,
  } = useBouquet();

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('jb_admin_auth') === 'true';
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'products' | 'memories'
  const [selectedOrderForQr, setSelectedOrderForQr] = useState(null);

  // New Product Form State (F-61: Admin dapat menambah produk lengkap dengan foto < 5 menit)
  const [newProdName, setNewProdName] = useState('');
  const [newProdSubtitle, setNewProdSubtitle] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('Fresh Flower');
  const [newProdPrice, setNewProdPrice] = useState('275000');
  const [newProdPalette, setNewProdPalette] = useState('burgundy-red');
  const [newProdImage, setNewProdImage] = useState(
    'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=900&q=85'
  );
  const [newProdDesc, setNewProdDesc] = useState('');
  const [productAddedSuccess, setProductAddedSuccess] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const expectedEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const expectedPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (!expectedEmail || !expectedPassword) {
      setLoginError(
        'Konfigurasi VITE_ADMIN_EMAIL dan VITE_ADMIN_PASSWORD belum diatur pada file .env.'
      );
      return;
    }

    if (
      email.trim() === expectedEmail &&
      password.trim() === expectedPassword
    ) {
      sessionStorage.setItem('jb_admin_auth', 'true');
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Email atau kata sandi admin salah.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('jb_admin_auth');
    setIsLoggedIn(false);
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProdName.trim()) return;
    addProduct({
      name: newProdName,
      subtitle: newProdSubtitle || 'Rangkaian Pilihan Jadi Bouquet',
      category: newProdCategory,
      basePrice: Number(newProdPrice) || 275000,
      paletteId: newProdPalette,
      image: newProdImage,
      description:
        newProdDesc ||
        'Rangkaian buket eksklusif Jadi Bouquet lengkap dengan Kartu Ucapan QR Memory Page.',
    });
    setNewProdName('');
    setNewProdSubtitle('');
    setNewProdDesc('');
    setProductAddedSuccess(true);
    setTimeout(() => setProductAddedSuccess(false), 3000);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[82vh] bg-[#491318] text-[#ece3d8] flex items-center justify-center p-6">
        <form
          onSubmit={handleLogin}
          className="max-w-md w-full bg-[#24120e] border border-[#ece3d8]/25 p-8 shadow-2xl space-y-5"
        >
          <div className="text-center space-y-2">
            <ShieldCheck className="w-9 h-9 text-[#ece3d8] mx-auto" />
            <h1 className="font-script text-4xl text-[#ece3d8]">
              Admin Jadi Bouquet
            </h1>
            <p className="text-xs text-[#ece3d8]/75">
              Kelola katalog buket, status pesanan, unduh QR Code cetak, dan
              moderasi Memory Page.
            </p>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#ece3d8]/80 mb-1.5">
              Email Admin
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#491318]/60 border border-[#ece3d8]/30 px-3.5 py-2.5 text-xs text-[#ece3d8] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#ece3d8]/80 mb-1.5">
              Kata Sandi
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#491318]/60 border border-[#ece3d8]/30 px-3.5 py-2.5 text-xs text-[#ece3d8] focus:outline-none"
            />
          </div>

          {loginError && (
            <p className="text-xs text-rose-400 text-center">{loginError}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#ece3d8] text-[#24120e] hover:bg-[#ece3d8]/90 py-3 text-xs uppercase tracking-[0.2em] font-bold transition cursor-pointer"
          >
            Masuk ke Panel Admin
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#491318] text-[#ece3d8] py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#24120e]/80 border border-[#ece3d8]/20 p-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#ece3d8]/70">
              Backoffice & Concierge Dashboard
            </span>
            <h1 className="font-editorial text-3xl font-bold text-[#ece3d8]">
              Panel Admin Jadi Bouquet
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/katalog"
              className="px-4 py-2 border border-[#ece3d8]/40 text-xs uppercase tracking-wider hover:bg-[#ece3d8] hover:text-[#24120e] transition"
            >
              Lihat Katalog Publik
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 bg-[#491318] border border-[#ece3d8]/30 text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-rose-900 transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Keluar
            </button>
          </div>
        </div>

        {/* Statistics Cards (F-65) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: 'Pengunjung Katalog',
              val: stats.visitors,
              sub: 'Target konversi detail >60%',
              icon: BarChart3,
            },
            {
              label: 'Klik Kirim WhatsApp',
              val: stats.whatsappClicks,
              sub: `${((stats.whatsappClicks / stats.visitors) * 100).toFixed(1)}% rasio pesan`,
              icon: ShoppingBag,
            },
            {
              label: 'Total Pesanan Masuk',
              val: orders.length,
              sub: `${orders.filter((o) => o.status === 'Baru').length} pesanan baru`,
              icon: Package,
            },
            {
              label: 'Total Scan QR Memory',
              val: stats.totalScans,
              sub: `${memories.length} halaman kenangan aktif`,
              icon: QrCode,
            },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-[#24120e]/65 border border-[#ece3d8]/20 p-5 flex items-start justify-between"
              >
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#ece3d8]/70 block">
                    {stat.label}
                  </span>
                  <p className="text-2xl sm:text-3xl font-bold text-[#ece3d8] mt-1">
                    {stat.val}
                  </p>
                  <p className="text-[11px] text-[#ece3d8]/65 mt-1">{stat.sub}</p>
                </div>
                <div className="p-2.5 bg-[#491318] border border-[#ece3d8]/25">
                  <Icon className="w-5 h-5 text-[#ece3d8]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#ece3d8]/20 gap-2 overflow-x-auto">
          {[
            { id: 'orders', label: `Kelola Pesanan & QR (${orders.length})` },
            { id: 'products', label: `Kelola Produk (${products.length})` },
            { id: 'memories', label: `Moderasi Memory Page (${memories.length})` },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`px-6 py-3.5 text-xs uppercase tracking-[0.18em] font-semibold border-b-2 transition cursor-pointer shrink-0 ${
                activeTab === t.id
                  ? 'border-[#ece3d8] bg-[#24120e] text-[#ece3d8]'
                  : 'border-transparent text-[#ece3d8]/65 hover:text-[#ece3d8]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* TAB 1: ORDERS & QR DOWNLOAD (F-63 & F-51) */}
        {activeTab === 'orders' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-[#24120e]/70 border border-[#ece3d8]/20 p-5 space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#ece3d8]/15">
                    <div>
                      <span className="text-xs font-mono font-bold bg-[#ece3d8] text-[#24120e] px-2.5 py-1 mr-2">
                        {ord.code}
                      </span>
                      <span className="text-[11px] text-[#ece3d8]/70">
                        {ord.createdAt}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="text-[10px] uppercase tracking-wider text-[#ece3d8]/70">
                        Status:
                      </label>
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                        className="bg-[#491318] border border-[#ece3d8]/40 text-[#ece3d8] text-xs px-3 py-1.5 font-semibold focus:outline-none"
                      >
                        {ORDER_STATUSES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-widest text-[#ece3d8]/60">
                        Produk & Kustomisasi
                      </p>
                      <p className="font-semibold text-sm text-[#ece3d8]">
                        {ord.productName} — {formatRupiah(ord.totalPrice)}
                      </p>
                      <p className="text-[#ece3d8]/80">
                        • Bunga: {ord.customization?.flowerType}
                      </p>
                      <p className="text-[#ece3d8]/80">
                        • Warna: {ord.customization?.colorPalette}
                      </p>
                      <p className="text-[#ece3d8]/80">
                        • Ukuran: {ord.customization?.size}
                      </p>
                      <p className="text-[#ece3d8]/80">
                        • Tema QR: {ord.themeName}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-widest text-[#ece3d8]/60">
                        Pengiriman & Kontak
                      </p>
                      <p>
                        <strong>Pemesan:</strong> {ord.customerName} (
                        {ord.customerPhone})
                      </p>
                      <p>
                        <strong>Penerima:</strong> {ord.recipientName}
                      </p>
                      <p>
                        <strong>Jadwal Kirim:</strong> {ord.deliveryDate} ·{' '}
                        {ord.deliveryTime}
                      </p>
                      <p>
                        <strong>Alamat:</strong> {ord.deliveryAddress}
                      </p>
                      {ord.notes && (
                        <p className="italic text-[#ece3d8]/75">
                          Catatan: "{ord.notes}"
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#ece3d8]/15 flex flex-wrap items-center justify-between gap-2">
                    <div className="text-[11px] font-mono text-[#ece3d8]/75">
                      Shortlink QR: <code>/q/{ord.shortCode}</code> →{' '}
                      <code>/m/{ord.memoryCode}</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedOrderForQr(ord)}
                        className="px-3.5 py-2 bg-[#ece3d8] text-[#24120e] text-[11px] uppercase tracking-wider font-semibold flex items-center gap-1.5 cursor-pointer"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        Cetak / Unduh QR
                      </button>
                      <Link
                        to={`/m/${ord.memoryCode}`}
                        className="px-3.5 py-2 border border-[#ece3d8]/40 text-[#ece3d8] text-[11px] uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#491318]"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Buka Memory Page
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right QR Print Preview Sticky Panel */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 bg-[#24120e]/80 border border-[#ece3d8]/25 p-6 text-center space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ece3d8]">
                Generator Cetak Kartu QR (PNG & SVG)
              </h3>
              <p className="text-xs text-[#ece3d8]/75">
                Pilih pesanan di samping untuk mengunduh QR Code resolusi tinggi
                (Level Koreksi H — tetap terbaca di ukuran cetak 2 cm).
              </p>
              {selectedOrderForQr ? (
                <div className="space-y-3">
                  <QrCodeBox
                    shortCode={selectedOrderForQr.shortCode}
                    memoryCode={selectedOrderForQr.memoryCode}
                    label={`Pesanan ${selectedOrderForQr.code}`}
                    size={170}
                  />
                  <p className="text-[11px] text-[#ece3d8]/80">
                    Penerima: <strong>{selectedOrderForQr.recipientName}</strong>
                  </p>
                </div>
              ) : (
                <QrCodeBox
                  shortCode={orders[0]?.shortCode || 'anniv26'}
                  memoryCode={orders[0]?.memoryCode || 'demo-anniversary'}
                  label={`Pesanan ${orders[0]?.code || 'JB-2026-0812'}`}
                  size={170}
                />
              )}
            </div>
          </div>
        )}

        {/* TAB 2: MANAGE PRODUCTS (F-61) */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Add New Product Form */}
            <form
              onSubmit={handleCreateProduct}
              className="lg:col-span-5 bg-[#24120e]/75 border border-[#ece3d8]/25 p-6 space-y-4"
            >
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ece3d8] flex items-center gap-2 border-b border-[#ece3d8]/15 pb-3">
                <Plus className="w-4 h-4" />
                Tambah Produk Baru (&lt; 5 Menit)
              </h2>

              {productAddedSuccess && (
                <div className="p-3 bg-emerald-950 border border-emerald-400/40 text-xs text-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Produk berhasil ditambahkan ke katalog!
                </div>
              )}

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#ece3d8]/80 mb-1">
                  Nama Buket *
                </label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="Contoh: Crimson Serenade"
                  className="w-full bg-[#491318]/60 border border-[#ece3d8]/30 px-3 py-2 text-xs text-[#ece3d8]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#ece3d8]/80 mb-1">
                  Subjudul Komposisi Bunga *
                </label>
                <input
                  type="text"
                  required
                  value={newProdSubtitle}
                  onChange={(e) => setNewProdSubtitle(e.target.value)}
                  placeholder="Contoh: Deep Red Roses + Baby Breath"
                  className="w-full bg-[#491318]/60 border border-[#ece3d8]/30 px-3 py-2 text-xs text-[#ece3d8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#ece3d8]/80 mb-1">
                    Kategori
                  </label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="w-full bg-[#491318] border border-[#ece3d8]/30 px-3 py-2 text-xs text-[#ece3d8]"
                  >
                    <option value="Fresh Flower">Fresh Flower</option>
                    <option value="Preserved Flower">Preserved Flower</option>
                    <option value="Dried & Mix">Dried & Mix</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#ece3d8]/80 mb-1">
                    Harga Dasar (Rp) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    className="w-full bg-[#491318]/60 border border-[#ece3d8]/30 px-3 py-2 text-xs text-[#ece3d8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#ece3d8]/80 mb-1">
                  Palet Warna Utama
                </label>
                <select
                  value={newProdPalette}
                  onChange={(e) => setNewProdPalette(e.target.value)}
                  className="w-full bg-[#491318] border border-[#ece3d8]/30 px-3 py-2 text-xs text-[#ece3d8]"
                >
                  {CUSTOMIZER_OPTIONS.colorPalettes.map((pal) => (
                    <option key={pal.id} value={pal.id}>
                      {pal.name} ({pal.hex})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#ece3d8]/80 mb-1">
                  URL Foto Produk
                </label>
                <input
                  type="url"
                  value={newProdImage}
                  onChange={(e) => setNewProdImage(e.target.value)}
                  className="w-full bg-[#491318]/60 border border-[#ece3d8]/30 px-3 py-2 text-xs text-[#ece3d8]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#ece3d8]/80 mb-1">
                  Deskripsi Produk
                </label>
                <textarea
                  rows={3}
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  placeholder="Deskripsi buket dan karakter rangkaian..."
                  className="w-full bg-[#491318]/60 border border-[#ece3d8]/30 p-3 text-xs text-[#ece3d8]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#ece3d8] text-[#24120e] hover:bg-[#ece3d8]/90 py-3 text-xs uppercase tracking-[0.2em] font-bold transition cursor-pointer"
              >
                Simpan Produk ke Katalog
              </button>
            </form>

            {/* Product List Table */}
            <div className="lg:col-span-7 space-y-3">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-[#24120e]/70 border border-[#ece3d8]/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-16 h-20 object-cover border border-[#ece3d8]/20 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#ece3d8]/60">
                        {prod.category}
                      </span>
                      <h3 className="font-editorial text-xl font-bold text-[#ece3d8]">
                        {prod.name}
                      </h3>
                      <p className="text-xs text-[#ece3d8]/75">{prod.subtitle}</p>
                      <p className="text-xs font-semibold text-[#ece3d8] mt-1">
                        {formatRupiah(prod.basePrice)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={prod.availability}
                      onChange={(e) =>
                        updateProductAvailability(prod.id, e.target.value)
                      }
                      className="bg-[#491318] border border-[#ece3d8]/35 text-xs px-3 py-1.5 text-[#ece3d8]"
                    >
                      <option value="Tersedia">Tersedia</option>
                      <option value="Pre-Order">Pre-Order</option>
                      <option value="Habis">Habis</option>
                    </select>

                    <Link
                      to={`/produk/${prod.slug}`}
                      className="p-2 border border-[#ece3d8]/30 hover:bg-[#ece3d8] hover:text-[#24120e] transition"
                      title="Lihat Produk"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => deleteProduct(prod.id)}
                      className="p-2 border border-rose-400/40 text-rose-300 hover:bg-rose-800 hover:text-white transition cursor-pointer"
                      title="Hapus Produk"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: MODERATE MEMORY PAGES (F-64) */}
        {activeTab === 'memories' && (
          <div className="space-y-4">
            {memories.map((mem) => (
              <div
                key={mem.code}
                className="bg-[#24120e]/70 border border-[#ece3d8]/20 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold ${
                        mem.status === 'Aktif'
                          ? 'bg-emerald-900 text-emerald-200 border border-emerald-400/30'
                          : 'bg-rose-950 text-rose-200 border border-rose-400/30'
                      }`}
                    >
                      {mem.status}
                    </span>
                    <span className="font-mono text-[#ece3d8]/75">
                      /m/{mem.code} (Short: /q/{mem.shortCode})
                    </span>
                    <span className="text-[#ece3d8]/60">
                      · {mem.scanCount || 0}x dipindai
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl font-bold text-[#ece3d8]">
                    {mem.title}
                  </h3>
                  <p className="text-[#ece3d8]/85">
                    Dari: <strong>{mem.sender}</strong> → Untuk:{' '}
                    <strong>{mem.recipient}</strong> · Momen: {mem.momentDate}
                  </p>
                  <p className="text-[#ece3d8]/75 line-clamp-2 italic">
                    "{mem.message}"
                  </p>
                  <p className="text-[11px] text-[#ece3d8]/60">
                    Jumlah Foto: {mem.photos?.length || 0} · Aktif s/d:{' '}
                    {mem.expiresAt}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <Link
                    to={`/m/${mem.code}`}
                    className="px-3.5 py-2 bg-[#ece3d8] text-[#24120e] text-[11px] uppercase tracking-wider font-semibold flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Buka
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleMemoryStatus(mem.code)}
                    className="px-3.5 py-2 border border-[#ece3d8]/40 text-[#ece3d8] text-[11px] uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#491318] cursor-pointer"
                  >
                    <Power className="w-3.5 h-3.5" />
                    {mem.status === 'Aktif' ? 'Nonaktifkan' : 'Aktifkan'}
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteMemory(mem.code)}
                    className="px-3 py-2 border border-rose-400/40 text-rose-300 hover:bg-rose-900 text-[11px] uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

