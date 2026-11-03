import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageCircle,
  CheckCircle2,
  Calendar,
  MapPin,
  User,
  Phone,
  Edit3,
  QrCode,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { useBouquet, formatRupiah } from '../context/BouquetContext';
import { WHATSAPP_NUMBER } from '../data/mockData';
import QrCodeBox from '../components/QrCodeBox';

export default function OrderSummaryPage() {
  const { draft, getDraftBreakdown, createOrderAndMemory } = useBouquet();
  const breakdown = getDraftBreakdown();

  const [customerName, setCustomerName] = useState(draft.senderName || '');
  const [customerPhone, setCustomerPhone] = useState('');
  const [recipientName, setRecipientName] = useState(draft.recipientName || '');
  const [deliveryDate, setDeliveryDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [deliveryTime, setDeliveryTime] = useState('10:00 - 12:00');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(true);

  const [submittedResult, setSubmittedResult] = useState(null);

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !deliveryAddress.trim()) {
      alert('Mohon lengkapi Nama Pemesan, Nomor WhatsApp, dan Alamat Pengiriman.');
      return;
    }

    const result = createOrderAndMemory({
      customerName,
      customerPhone,
      recipientName: recipientName || draft.recipientName || 'Penerima',
      deliveryDate,
      deliveryTime,
      deliveryAddress,
      notes,
    });

    setSubmittedResult(result);

    // Format WhatsApp message automatically (F-41)
    const origin =
      typeof window !== 'undefined' ? window.location.origin : 'https://jadibouquet.id';
    const waLines = [
      `Halo Admin *Jadi Bouquet*! Saya ingin memesan buket dengan detail berikut:`,
      ``,
      `*KODE PESANAN:* ${result.order.code}`,
      `*PRODUK:* ${result.breakdown.selectedProduct.name}`,
      `- Jenis Bunga: ${result.breakdown.flowerType.name}`,
      `- Palet Warna: ${result.breakdown.colorPalette.name} (${result.breakdown.colorPalette.hex})`,
      `- Ukuran/Gaya: ${result.breakdown.size.name}`,
      `- Tambahan: ${result.breakdown.selectedExtras.map((x) => x.name).join(', ')}`,
      `*TOTAL HARGA:* ${formatRupiah(result.breakdown.totalPrice)}`,
      ``,
      `*DETAIL MEMORY PAGE (QR):*`,
      `- Tema Web: ${result.breakdown.selectedTheme.name}`,
      `- Judul: ${result.memory.title}`,
      `- Dari / Untuk: ${result.memory.sender} -> ${result.memory.recipient}`,
      `- Tautan QR: ${origin}/q/${result.memory.shortCode}`,
      ``,
      `*PENGIRIMAN:*`,
      `- Pemesan: ${customerName} (${customerPhone})`,
      `- Tanggal & Jam Kirim: ${deliveryDate} (${deliveryTime})`,
      `- Alamat: ${deliveryAddress}`,
      notes ? `- Catatan: ${notes}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      waLines
    )}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#491318] text-[#ece3d8] py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/tema"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#ece3d8]/75 hover:text-[#ece3d8]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Pilihan Tema Memory Page</span>
          </Link>
          <span className="text-[11px] uppercase tracking-widest text-[#ece3d8]/65">
            Langkah 3 dari 3 · Konfirmasi & Kirim via WhatsApp
          </span>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="font-script text-5xl sm:text-6xl text-[#ece3d8]">
            Ringkasan & Pemesanan
          </h1>
          <p className="text-xs sm:text-sm text-[#ece3d8]/80 mt-2">
            Periksa kembali detail kustomisasi buket dan pratinjau Memory Page Anda
            sebelum mengirim pesanan ke WhatsApp Concierge Jadi Bouquet.
          </p>
        </div>

        {/* If Order Just Created: Show Confirmation + Live QR Code Card */}
        {submittedResult && (
          <div className="mb-10 bg-[#ece3d8] text-[#24120e] p-6 sm:p-10 border-2 border-[#24120e] shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#491318] text-[#ece3d8] text-xs uppercase tracking-widest font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Pesanan Tercatat · {submittedResult.order.code}</span>
                </div>
                <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#24120e]">
                  Terima Kasih! Memory Page & QR Anda Telah Aktif
                </h2>
                <p className="text-xs sm:text-sm text-[#24120e]/85 leading-relaxed">
                  Pesanan dengan kode <strong>{submittedResult.order.code}</strong> telah
                  tersimpan di Panel Admin dengan status <strong>Baru</strong>. Anda
                  juga dapat langsung memindai atau membuka halaman kenangan yang baru
                  saja dibuat di samping!
                </p>

                <div className="p-4 bg-[#24120e]/5 border border-[#24120e]/15 text-xs space-y-1">
                  <p>
                    <strong>Alamat Publik Memory Page:</strong>{' '}
                    <Link
                      to={`/m/${submittedResult.memory.code}`}
                      className="text-[#491318] underline font-mono"
                    >
                      /m/{submittedResult.memory.code}
                    </Link>
                  </p>
                  <p>
                    <strong>Tautan Pendek Kartu QR:</strong>{' '}
                    <Link
                      to={`/q/${submittedResult.memory.shortCode}`}
                      className="text-[#491318] underline font-mono"
                    >
                      /q/{submittedResult.memory.shortCode}
                    </Link>
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    to={`/m/${submittedResult.memory.code}`}
                    className="bg-[#491318] text-[#ece3d8] hover:bg-[#24120e] px-6 py-3 text-xs uppercase tracking-[0.18em] font-semibold transition"
                  >
                    Lihat Memory Page Saya Sekarang
                  </Link>
                  <Link
                    to="/admin"
                    className="border border-[#24120e] text-[#24120e] hover:bg-[#24120e] hover:text-[#ece3d8] px-5 py-3 text-xs uppercase tracking-[0.18em] font-semibold transition"
                  >
                    Cek di Panel Admin
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <QrCodeBox
                  shortCode={submittedResult.memory.shortCode}
                  memoryCode={submittedResult.memory.code}
                  label={`QR ${submittedResult.order.code}`}
                  size={165}
                />
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Delivery Form */}
          <form
            onSubmit={handleSubmitOrder}
            className="lg:col-span-7 bg-[#24120e]/70 border border-[#ece3d8]/20 p-6 sm:p-8 space-y-5"
          >
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ece3d8] border-b border-[#ece3d8]/15 pb-3">
              Data Pemesan & Alamat Pengiriman
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#ece3d8]/80 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  Nama Pemesan *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Nama lengkap Anda"
                  className="w-full bg-[#491318]/60 border border-[#ece3d8]/30 px-3.5 py-2.5 text-xs text-[#ece3d8] focus:outline-none focus:border-[#ece3d8]"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#ece3d8]/80 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  Nomor WhatsApp Aktif *
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full bg-[#491318]/60 border border-[#ece3d8]/30 px-3.5 py-2.5 text-xs text-[#ece3d8] focus:outline-none focus:border-[#ece3d8]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#ece3d8]/80 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Tanggal Pengiriman *
                </label>
                <input
                  type="date"
                  required
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full bg-[#491318]/60 border border-[#ece3d8]/30 px-3.5 py-2.5 text-xs text-[#ece3d8] focus:outline-none focus:border-[#ece3d8]"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#ece3d8]/80 mb-1.5">
                  Sesi Waktu Pengiriman *
                </label>
                <select
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  className="w-full bg-[#491318] border border-[#ece3d8]/30 px-3.5 py-2.5 text-xs text-[#ece3d8] focus:outline-none"
                >
                  <option value="08:00 - 10:00">Pagi (08:00 - 10:00 WIB)</option>
                  <option value="10:00 - 12:00">Siang (10:00 - 12:00 WIB)</option>
                  <option value="13:00 - 15:00">Sore (13:00 - 15:00 WIB)</option>
                  <option value="16:00 - 18:00">Senja (16:00 - 18:00 WIB)</option>
                  <option value="Ambil di Studio">Ambil Langsung di Studio</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#ece3d8]/80 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Alamat Lengkap Pengiriman / Titik Temu Wisuda *
              </label>
              <textarea
                rows={3}
                required
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Nama jalan, nomor rumah/gedung, patokan, dan nomor HP penerima bila dikirim kurir..."
                className="w-full bg-[#491318]/60 border border-[#ece3d8]/30 p-3.5 text-xs text-[#ece3d8] focus:outline-none focus:border-[#ece3d8]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#ece3d8]/80 mb-1.5">
                Catatan Tambahan untuk Florist (Opsional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Tolong pita warna burgundy dibuat lebih panjang..."
                className="w-full bg-[#491318]/60 border border-[#ece3d8]/30 px-3.5 py-2.5 text-xs text-[#ece3d8] focus:outline-none focus:border-[#ece3d8]"
              />
            </div>

            {/* Privacy Responsibility Checkbox (PRD Section 15) */}
            <label className="flex items-start gap-2.5 text-xs text-[#ece3d8]/80 cursor-pointer pt-2">
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                required
                className="mt-1 accent-[#ece3d8]"
              />
              <span>
                Saya menyatakan bertanggung jawab atas foto dan pesan yang diunggah ke
                Memory Page serta menyetujui{' '}
                <Link to="/privasi" className="underline text-[#ece3d8]">
                  Kebijakan Privasi & Masa Aktif 1 Tahun
                </Link>
                .
              </span>
            </label>

            <button
              type="submit"
              className="w-full bg-[#ece3d8] text-[#24120e] hover:bg-[#ece3d8]/90 py-4 px-6 text-xs uppercase tracking-[0.22em] font-bold transition flex items-center justify-center gap-2.5 cursor-pointer shadow-xl"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Kirim via WhatsApp & Buat QR Memory Page</span>
            </button>

            <p className="text-[11px] text-center text-[#ece3d8]/65">
              Pembayaran dilakukan melalui Transfer Bank / QRIS setelah konfirmasi
              ketersediaan & ongkir oleh admin di WhatsApp.
            </p>
          </form>

          {/* Right Column: Order & Memory Summary Card (F-40) */}
          <div className="lg:col-span-5 bg-[#ece3d8] text-[#24120e] p-6 sm:p-7 border border-[#24120e]/20 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#24120e]/15 pb-3">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#491318]">
                Ringkasan Pesanan Anda
              </h2>
              <Link
                to={`/produk/${breakdown.selectedProduct.slug}`}
                className="text-[11px] text-[#491318] underline flex items-center gap-1 font-medium"
              >
                <Edit3 className="w-3 h-3" /> Ubah Buket
              </Link>
            </div>

            {/* Product Mini Row */}
            <div className="flex gap-4 items-center">
              <img
                src={breakdown.selectedProduct.image}
                alt={breakdown.selectedProduct.name}
                className="w-20 h-24 object-cover border border-[#24120e]/20 shrink-0"
              />
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#491318] font-semibold">
                  {breakdown.selectedProduct.category}
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#24120e]">
                  {breakdown.selectedProduct.name}
                </h3>
                <p className="text-xs text-[#24120e]/75">
                  Harga Dasar: {formatRupiah(breakdown.selectedProduct.basePrice)}
                </p>
              </div>
            </div>

            {/* Customization Details */}
            <div className="space-y-2.5 text-xs border-y border-[#24120e]/15 py-4">
              <div className="flex justify-between">
                <span className="text-[#24120e]/70">Jenis Bunga:</span>
                <span className="font-semibold text-right">
                  {breakdown.flowerType.name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#24120e]/70">Palet Warna:</span>
                <span className="font-semibold flex items-center gap-1.5">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-[#24120e]/40 inline-block"
                    style={{ backgroundColor: breakdown.colorPalette.hex }}
                  />
                  {breakdown.colorPalette.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#24120e]/70">Ukuran / Gaya:</span>
                <span className="font-semibold text-right">
                  {breakdown.size.name}
                </span>
              </div>
              <div className="pt-1">
                <span className="text-[#24120e]/70 block mb-1">
                  Tambahan & Upgrade:
                </span>
                <ul className="space-y-1 pl-3 border-l-2 border-[#491318]/30">
                  {breakdown.selectedExtras.map((ex) => (
                    <li key={ex.id} className="flex justify-between text-[11px]">
                      <span>{ex.name}</span>
                      <span className="font-semibold">
                        {ex.included ? 'Gratis' : formatRupiah(ex.price)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Memory Page Summary */}
            <div className="bg-[#24120e]/5 border border-[#24120e]/15 p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#491318] flex items-center gap-1">
                  <QrCode className="w-3.5 h-3.5" />
                  Konfigurasi Memory Page
                </span>
                <Link
                  to="/tema"
                  className="text-[11px] text-[#491318] underline font-medium"
                >
                  Edit Isi
                </Link>
              </div>
              <p>
                <strong>Tema:</strong> {breakdown.selectedTheme.name} (
                {breakdown.selectedTheme.bgHex})
              </p>
              <p>
                <strong>Judul:</strong> {draft.memoryTitle || 'Untuk Hari Spesialmu'}
              </p>
              <p>
                <strong>Pengirim → Penerima:</strong>{' '}
                {draft.senderName || customerName || '-'} →{' '}
                {draft.recipientName || recipientName || '-'}
              </p>
              <p>
                <strong>Foto Terlampir:</strong> {(draft.photos || []).length} Foto
              </p>
            </div>

            {/* Total Price */}
            <div className="pt-2 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#24120e]/70 block">
                  Total Estimasi Pesanan
                </span>
                <span className="text-[11px] text-[#24120e]/60">
                  Belum termasuk ongkir kurir
                </span>
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-[#491318]">
                {formatRupiah(breakdown.totalPrice)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

