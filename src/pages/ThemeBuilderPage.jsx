import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Smartphone,
  Monitor,
  Upload,
  Trash2,
  Sparkles,
  Lock,
  Video,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Check,
  ImagePlus,
} from 'lucide-react';
import { useBouquet } from '../context/BouquetContext';
import { MEMORY_THEMES } from '../data/mockData';

const SAMPLE_MOMENT_PHOTOS = [
  {
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
    caption: 'Senyum terbaikmu hari itu',
  },
  {
    url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
    caption: 'Langkah perjalanan kita',
  },
  {
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    caption: 'Bangga atas pencapaianmu!',
  },
];

export default function ThemeBuilderPage() {
  const { draft, updateDraft } = useBouquet();
  const navigate = useNavigate();

  const [previewDevice, setPreviewDevice] = useState('mobile'); // 'mobile' | 'desktop'
  const [uploading, setUploading] = useState(false);

  const selectedTheme =
    MEMORY_THEMES.find((t) => t.id === draft.themeId) || MEMORY_THEMES[0];

  // Client-side image compression (F-33: maksimal 10 foto, dikompres otomatis)
  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const currentCount = draft.photos?.length || 0;
    const remainingSlots = Math.max(0, 10 - currentCount);
    const filesToProcess = files.slice(0, remainingSlots);

    if (filesToProcess.length === 0) {
      alert('Maksimal 10 foto untuk setiap Memory Page.');
      return;
    }

    setUploading(true);
    const compressedPhotos = [];

    for (const file of filesToProcess) {
      try {
        const dataUrl = await compressImageFile(file, 900, 0.78);
        compressedPhotos.push({
          id: `up-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          url: dataUrl,
          caption: file.name.replace(/\.[^/.]+$/, ''),
        });
      } catch {
        // skip invalid file
      }
    }

    updateDraft({
      photos: [...(draft.photos || []), ...compressedPhotos],
    });
    setUploading(false);
    e.target.value = '';
  };

  const compressImageFile = (file, maxWidth = 900, quality = 0.78) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const scale = Math.min(1, maxWidth / img.width);
          const canvas = document.createElement('canvas');
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = reject;
        img.src = event.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleAddSamplePhoto = () => {
    const current = draft.photos || [];
    if (current.length >= 10) return;
    const pick = SAMPLE_MOMENT_PHOTOS[current.length % SAMPLE_MOMENT_PHOTOS.length];
    updateDraft({
      photos: [
        ...current,
        {
          id: `sample-${Date.now()}`,
          url: pick.url,
          caption: pick.caption,
        },
      ],
    });
  };

  const handleRemovePhoto = (id) => {
    updateDraft({
      photos: (draft.photos || []).filter((p) => p.id !== id),
    });
  };

  const handleCaptionChange = (id, caption) => {
    updateDraft({
      photos: (draft.photos || []).map((p) =>
        p.id === id ? { ...p, caption } : p
      ),
    });
  };

  return (
    <div className="min-h-screen bg-[#491318] text-[#ece3d8] py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to={`/produk/${draft.productSlug}`}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#ece3d8]/75 hover:text-[#ece3d8]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Customizer Buket</span>
          </Link>
          <span className="text-[11px] uppercase tracking-widest text-[#ece3d8]/65">
            Langkah 2 dari 3 · Pilih Tampilan Web & Isi Kenangan
          </span>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="font-script text-5xl sm:text-6xl text-[#ece3d8]">
            Pilih Tampilan Memory Page
          </h1>
          <p className="text-xs sm:text-sm text-[#ece3d8]/80 mt-2">
            Halaman ini yang akan terbuka saat penerima memindai QR Code di kartu
            ucapan buket Anda. Pilih tema visual dan tulis pesan kenangan di bawah.
          </p>
        </div>

        {/* Step A: Theme Selector Cards (F-30) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {MEMORY_THEMES.map((theme) => {
            const isSelected = draft.themeId === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => updateDraft({ themeId: theme.id })}
                className={`p-4 text-left border transition flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#ece3d8] text-[#24120e] border-[#ece3d8] ring-2 ring-[#ece3d8]'
                    : 'bg-[#24120e]/60 text-[#ece3d8] border-[#ece3d8]/25 hover:border-[#ece3d8]/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-4 h-4 rounded-full border border-white/40"
                        style={{ backgroundColor: theme.bgHex }}
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-black/25"
                        style={{ backgroundColor: theme.cardHex }}
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-black/25"
                        style={{ backgroundColor: theme.textHex }}
                      />
                    </div>
                    {isSelected && <Check className="w-4 h-4" />}
                  </div>
                  <span className="text-[9px] uppercase tracking-widest opacity-70 block">
                    {theme.badge}
                  </span>
                  <h3 className="font-editorial text-xl font-bold mt-0.5">
                    {theme.name}
                  </h3>
                  <p className="text-[11px] opacity-80 mt-1">{theme.tagline}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-current/15 text-[10px] font-mono uppercase opacity-75">
                  BG {theme.bgHex} · TXT {theme.textHex}
                </div>
              </button>
            );
          })}
        </div>

        {/* Step B: Side-by-Side Form & Live Interactive Preview (PRD Section 9) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Memory Content Form (F-32 to F-36) */}
          <div className="lg:col-span-6 bg-[#24120e]/70 border border-[#ece3d8]/20 p-6 sm:p-8 space-y-5">
            <div className="border-b border-[#ece3d8]/15 pb-3">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ece3d8] flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Isi Konten Halaman Kenangan
              </h2>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#ece3d8]/80 mb-1.5">
                Judul Halaman Kenangan *
              </label>
              <input
                type="text"
                maxLength={80}
                value={draft.memoryTitle}
                onChange={(e) => updateDraft({ memoryTitle: e.target.value })}
                placeholder="Contoh: Happy Anniversary ke-3, Nadira"
                className="w-full bg-[#491318]/60 border border-[#ece3d8]/30 px-3.5 py-2.5 text-xs text-[#ece3d8] focus:outline-none focus:border-[#ece3d8]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#ece3d8]/80 mb-1.5">
                  Nama Pengirim *
                </label>
                <input
                  type="text"
                  value={draft.senderName}
                  onChange={(e) => updateDraft({ senderName: e.target.value })}
                  placeholder="Nama Anda / Panggilan"
                  className="w-full bg-[#491318]/60 border border-[#ece3d8]/30 px-3.5 py-2.5 text-xs text-[#ece3d8] focus:outline-none focus:border-[#ece3d8]"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#ece3d8]/80 mb-1.5">
                  Nama Penerima *
                </label>
                <input
                  type="text"
                  value={draft.recipientName}
                  onChange={(e) => updateDraft({ recipientName: e.target.value })}
                  placeholder="Nama Orang Terkasih"
                  className="w-full bg-[#491318]/60 border border-[#ece3d8]/30 px-3.5 py-2.5 text-xs text-[#ece3d8] focus:outline-none focus:border-[#ece3d8]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#ece3d8]/80 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Tanggal Momen Spesial *
              </label>
              <input
                type="date"
                value={draft.momentDate}
                onChange={(e) => updateDraft({ momentDate: e.target.value })}
                className="w-full bg-[#491318]/60 border border-[#ece3d8]/30 px-3.5 py-2.5 text-xs text-[#ece3d8] focus:outline-none focus:border-[#ece3d8]"
              />
            </div>

            {/* Message Input max 1000 chars (F-32) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#ece3d8]/80">
                  Pesan / Surat Kenangan *
                </label>
                <span className="text-[11px] text-[#ece3d8]/65">
                  {(draft.message || '').length} / 1000 karakter
                </span>
              </div>
              <textarea
                rows={5}
                maxLength={1000}
                value={draft.message}
                onChange={(e) => updateDraft({ message: e.target.value })}
                placeholder="Tuliskan perasaan, doa, atau kenangan terbaik bersama penerima..."
                className="w-full bg-[#491318]/60 border border-[#ece3d8]/30 p-3.5 text-xs text-[#ece3d8] leading-relaxed focus:outline-none focus:border-[#ece3d8]"
              />
            </div>

            {/* Photo Upload max 10 compressed automatically (F-33) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] uppercase tracking-wider text-[#ece3d8]/80">
                  Galeri Foto Kenangan ({(draft.photos || []).length}/10 Foto)
                </label>
                <button
                  type="button"
                  onClick={handleAddSamplePhoto}
                  className="text-[11px] text-[#ece3d8] underline hover:opacity-80 flex items-center gap-1 cursor-pointer"
                >
                  <ImagePlus className="w-3.5 h-3.5" />
                  + Tambah Foto Contoh
                </button>
              </div>

              <label className="border border-dashed border-[#ece3d8]/40 bg-[#491318]/40 hover:bg-[#491318]/70 transition p-4 flex flex-col items-center justify-center text-center cursor-pointer">
                <Upload className="w-5 h-5 text-[#ece3d8] mb-1.5" />
                <span className="text-xs font-medium text-[#ece3d8]">
                  {uploading
                    ? 'Mengompres Foto...'
                    : 'Klik untuk Unggah Foto dari HP / Laptop'}
                </span>
                <span className="text-[10px] text-[#ece3d8]/65 mt-0.5">
                  Otomatis dikompres agar cepat dibuka (Maks. 10 Foto JPG/PNG/WebP)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {/* Uploaded Photos List */}
              {draft.photos && draft.photos.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                  {draft.photos.map((photo) => (
                    <div
                      key={photo.id}
                      className="bg-[#491318]/70 border border-[#ece3d8]/20 p-2 space-y-1.5"
                    >
                      <div className="relative aspect-square overflow-hidden bg-[#24120e]">
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(photo.id)}
                          className="absolute top-1 right-1 bg-[#24120e]/90 text-[#ece3d8] p-1 hover:bg-rose-700 transition cursor-pointer"
                          title="Hapus Foto"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={photo.caption || ''}
                        onChange={(e) =>
                          handleCaptionChange(photo.id, e.target.value)
                        }
                        placeholder="Keterangan singkat..."
                        className="w-full bg-[#24120e]/60 border border-[#ece3d8]/20 px-2 py-1 text-[10px] text-[#ece3d8] focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Optional Video Link (F-34) & Optional Password (F-36) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#ece3d8]/15">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#ece3d8]/75 mb-1.5 flex items-center gap-1">
                  <Video className="w-3.5 h-3.5" />
                  Tautan Video / Lagu (Opsional)
                </label>
                <input
                  type="url"
                  value={draft.videoUrl || ''}
                  onChange={(e) => updateDraft({ videoUrl: e.target.value })}
                  placeholder="https://youtube.com/..."
                  className="w-full bg-[#491318]/60 border border-[#ece3d8]/25 px-3 py-2 text-xs text-[#ece3d8] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#ece3d8]/75 mb-1.5 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" />
                  Kata Sandi Halaman (Opsional)
                </label>
                <input
                  type="text"
                  value={draft.password || ''}
                  onChange={(e) => updateDraft({ password: e.target.value })}
                  placeholder="Kosongkan bila tanpa sandi"
                  className="w-full bg-[#491318]/60 border border-[#ece3d8]/25 px-3 py-2 text-xs text-[#ece3d8] focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => navigate('/pesan')}
                className="w-full bg-[#ece3d8] text-[#24120e] hover:bg-[#ece3d8]/90 py-3.5 px-6 text-xs uppercase tracking-[0.2em] font-semibold transition flex items-center justify-center gap-2 cursor-pointer shadow-xl"
              >
                <span>Simpan & Lanjut ke Ringkasan Pesanan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Live Interactive Device Preview (F-31: HP & Layar Lebar) */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
            <div className="bg-[#24120e]/80 border border-[#ece3d8]/20 p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#ece3d8]/65 block">
                  Pratinjau Langsung (Live Preview)
                </span>
                <h3 className="text-xs font-semibold text-[#ece3d8]">
                  Tema: {selectedTheme.name} ({selectedTheme.bgHex})
                </h3>
              </div>

              {/* Device Toggle: HP vs Layar Lebar (F-31) */}
              <div className="flex items-center border border-[#ece3d8]/30">
                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`px-3 py-1.5 text-[11px] flex items-center gap-1.5 cursor-pointer transition ${
                    previewDevice === 'mobile'
                      ? 'bg-[#ece3d8] text-[#24120e] font-semibold'
                      : 'text-[#ece3d8]/75'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  HP
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`px-3 py-1.5 text-[11px] flex items-center gap-1.5 cursor-pointer transition ${
                    previewDevice === 'desktop'
                      ? 'bg-[#ece3d8] text-[#24120e] font-semibold'
                      : 'text-[#ece3d8]/75'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  Layar Lebar
                </button>
              </div>
            </div>

            {/* Device Frame Container */}
            <div className="flex justify-center bg-[#24120e]/40 border border-[#ece3d8]/15 p-4 sm:p-6">
              <div
                className={`transition-all duration-300 shadow-2xl overflow-hidden border-4 border-[#24120e] rounded-2xl ${
                  previewDevice === 'mobile'
                    ? 'w-[340px] sm:w-[360px]'
                    : 'w-full'
                }`}
                style={{
                  backgroundColor: selectedTheme.bgHex,
                  color: selectedTheme.textHex,
                }}
              >
                {/* Simulated Phone Status Bar */}
                <div
                  className="px-4 py-2 text-[10px] flex items-center justify-between border-b"
                  style={{ borderColor: selectedTheme.borderHex }}
                >
                  <span className="font-script text-base">Jadi Bouquet</span>
                  <span className="uppercase tracking-widest opacity-75 text-[9px]">
                    Memory Page
                  </span>
                </div>

                {/* Memory Content Inside Preview */}
                <div className="p-5 sm:p-7 space-y-5 max-h-[600px] overflow-y-auto">
                  <div className="text-center space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.22em] opacity-75">
                      Untuk: {draft.recipientName || 'Orang Terkasih'}
                    </p>
                    <h4 className="font-script text-4xl sm:text-5xl leading-tight">
                      {draft.memoryTitle || 'Untuk Hari Spesialmu'}
                    </h4>
                    <p className="text-[11px] opacity-75 font-editorial italic">
                      Momen: {draft.momentDate || '2026-11-03'}
                    </p>
                  </div>

                  {/* Letter Card */}
                  <div
                    className="p-5 border rounded-xs shadow-md space-y-3"
                    style={{
                      backgroundColor: selectedTheme.cardHex,
                      borderColor: selectedTheme.borderHex,
                    }}
                  >
                    <p className="text-xs leading-relaxed whitespace-pre-line font-editorial text-base">
                      {draft.message ||
                        'Tuliskan surat kenangan Anda di formulir sebelah kiri...'}
                    </p>
                    <div
                      className="pt-3 border-t text-right"
                      style={{ borderColor: selectedTheme.borderHex }}
                    >
                      <p className="text-[10px] uppercase tracking-widest opacity-70">
                        Dengan penuh kasih,
                      </p>
                      <p className="font-script text-2xl mt-0.5">
                        {draft.senderName || 'Pengirim'}
                      </p>
                    </div>
                  </div>

                  {/* Photo Grid Preview */}
                  {draft.photos && draft.photos.length > 0 && (
                    <div
                      className={`grid gap-3 ${
                        previewDevice === 'mobile'
                          ? 'grid-cols-1'
                          : 'grid-cols-2'
                      }`}
                    >
                      {draft.photos.map((p) => (
                        <div
                          key={p.id}
                          className="p-2 border rounded-xs"
                          style={{
                            backgroundColor: selectedTheme.cardHex,
                            borderColor: selectedTheme.borderHex,
                          }}
                        >
                          <img
                            src={p.url}
                            alt={p.caption}
                            className="w-full h-44 object-cover"
                          />
                          {p.caption && (
                            <p className="text-[11px] text-center italic mt-2 opacity-85 font-editorial">
                              {p.caption}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

