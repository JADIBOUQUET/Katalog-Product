import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Heart,
  Share2,
  Printer,
  Lock,
  Calendar,
  ExternalLink,
  AlertTriangle,
  Sparkles,
  Check,
  ArrowLeft,
  Video,
} from 'lucide-react';
import { useBouquet } from '../context/BouquetContext';
import { MEMORY_THEMES, WHATSAPP_NUMBER } from '../data/mockData';

export default function MemoryPublicPage() {
  const { code } = useParams();
  const { memories } = useBouquet();

  const memory =
    memories.find((m) => m.code === code || m.shortCode === code) || null;

  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [copied, setCopied] = useState(false);

  // Set meta robots noindex for privacy (PRD F-53 & Section 8)
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  if (!memory) {
    return (
      <div className="min-h-screen bg-[#24120e] text-[#ece3d8] flex items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-5 bg-[#491318] border border-[#ece3d8]/25 p-8">
          <p className="font-script text-4xl text-[#ece3d8]">Jadi Bouquet</p>
          <h1 className="font-editorial text-2xl font-semibold">
            Halaman Kenangan Tidak Ditemukan
          </h1>
          <p className="text-xs text-[#ece3d8]/80 leading-relaxed">
            Kode QR atau alamat halaman kenangan (<code>/m/{code}</code>) tidak
            ditemukan. Pastikan tautan sudah benar atau coba buka demo di bawah.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              to="/m/demo-anniversary"
              className="bg-[#ece3d8] text-[#24120e] px-5 py-2.5 text-xs uppercase tracking-widest font-semibold"
            >
              Buka Demo Anniversary
            </Link>
            <Link
              to="/"
              className="border border-[#ece3d8]/50 text-[#ece3d8] px-5 py-2.5 text-xs uppercase tracking-widest"
            >
              Ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Friendly Expired / Moderated State (PRD F-55 & F-64)
  if (memory.status !== 'Aktif') {
    return (
      <div className="min-h-screen bg-[#24120e] text-[#ece3d8] flex items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-5 bg-[#491318] border border-[#ece3d8]/25 p-8">
          <AlertTriangle className="w-10 h-10 text-[#ece3d8] mx-auto" />
          <h1 className="font-editorial text-3xl font-semibold">
            Masa Aktif Halaman Kenangan Berakhir / Dinonaktifkan
          </h1>
          <p className="text-xs text-[#ece3d8]/80 leading-relaxed">
            Halaman kenangan untuk pesanan <strong>{memory.orderCode}</strong> saat
            ini sedang tidak aktif atau telah melewati masa simpan. Hubungi tim Jadi
            Bouquet untuk memperpanjang masa aktif arsip kenangan ini.
          </p>
          <div className="pt-2 flex flex-col gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                `Halo Jadi Bouquet, saya ingin memperpanjang masa aktif Memory Page dengan kode: ${memory.code} (${memory.orderCode})`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="bg-[#ece3d8] text-[#24120e] py-3 px-6 text-xs uppercase tracking-widest font-semibold"
            >
              Perpanjang Masa Aktif via WhatsApp
            </a>
            <Link
              to="/"
              className="text-xs text-[#ece3d8]/75 underline hover:text-[#ece3d8]"
            >
              Kembali ke Beranda Jadi Bouquet
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const theme =
    MEMORY_THEMES.find((t) => t.id === memory.themeId) || MEMORY_THEMES[0];

  const requiresPassword = Boolean(memory.password && memory.password.trim() !== '');

  const handleUnlock = (e) => {
    e.preventDefault();
    if (passwordInput.trim() === memory.password.trim()) {
      setUnlocked(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${memory.title} — Jadi Bouquet Memory Page`,
          text: `Pesan kenangan khusus untuk ${memory.recipient} dari ${memory.sender}`,
          url: shareUrl,
        });
        return;
      } catch {
        // fallback to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  // Password Screen (F-36)
  if (requiresPassword && !unlocked) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{ backgroundColor: theme.bgHex, color: theme.textHex }}
      >
        <form
          onSubmit={handleUnlock}
          className="max-w-md w-full p-8 border shadow-2xl text-center space-y-5"
          style={{
            backgroundColor: theme.cardHex,
            borderColor: theme.borderHex,
          }}
        >
          <Lock className="w-8 h-8 mx-auto opacity-80" />
          <p className="font-script text-4xl">Jadi Bouquet</p>
          <h1 className="font-editorial text-2xl font-bold">
            Halaman Kenangan Terkunci
          </h1>
          <p className="text-xs opacity-80">
            Pengirim (<strong>{memory.sender}</strong>) melindungi halaman kenangan
            untuk <strong>{memory.recipient}</strong> dengan kata sandi.
          </p>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Masukkan kata sandi..."
            className="w-full px-4 py-3 text-xs border bg-transparent focus:outline-none text-center"
            style={{ borderColor: theme.borderHex }}
          />
          {passwordError && (
            <p className="text-xs text-rose-400">
              Kata sandi belum sesuai. Silakan coba lagi.
            </p>
          )}
          <button
            type="submit"
            className="w-full py-3 text-xs uppercase tracking-[0.2em] font-semibold cursor-pointer"
            style={{
              backgroundColor: theme.textHex,
              color: theme.bgHex,
            }}
          >
            Buka Kenangan
          </button>
        </form>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen transition-colors duration-500 pb-20"
      style={{ backgroundColor: theme.bgHex, color: theme.textHex }}
    >
      {/* Top Minimal Floating Bar */}
      <div
        className="border-b px-4 sm:px-8 py-3.5 flex items-center justify-between"
        style={{ borderColor: theme.borderHex }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest opacity-80 hover:opacity-100"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Jadi Bouquet</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="px-3 py-1.5 text-[11px] uppercase tracking-wider border flex items-center gap-1.5 cursor-pointer transition hover:opacity-80"
            style={{ borderColor: theme.borderHex }}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Tautan Disalin' : 'Bagikan'}</span>
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="px-3 py-1.5 text-[11px] uppercase tracking-wider border flex items-center gap-1.5 cursor-pointer transition hover:opacity-80"
            style={{ borderColor: theme.borderHex }}
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Simpan Arsip</span>
          </button>
        </div>
      </div>

      {/* Wax-Sealed Envelope Intro Gate */}
      {!envelopeOpened ? (
        <div className="max-w-lg mx-auto px-4 py-20 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 border rounded-full text-[10px] uppercase tracking-[0.22em] opacity-80"
            style={{ borderColor: theme.borderHex }}
          >
            <Sparkles className="w-3 h-3" />
            <span>Kartu Ucapan Digital · {memory.bouquetName}</span>
          </div>

          <h1 className="font-script text-5xl sm:text-6xl leading-tight">
            Untuk {memory.recipient}
          </h1>

          <p className="text-xs sm:text-sm opacity-85 max-w-sm mx-auto leading-relaxed">
            Seseorang yang spesial (<strong>{memory.sender}</strong>) telah menyematkan
            pesan dan foto kenangan abadi di balik buket bunga Anda.
          </p>

          {/* Wax Seal Button */}
          <div className="py-6">
            <button
              type="button"
              onClick={() => setEnvelopeOpened(true)}
              className="group relative inline-flex flex-col items-center justify-center w-36 h-36 rounded-full bg-[#491318] text-[#ece3d8] border-4 border-[#ece3d8]/40 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:scale-105 transition duration-300 cursor-pointer"
            >
              <span className="font-script text-3xl">JB</span>
              <span className="text-[9px] uppercase tracking-[0.22em] mt-1">
                Buka Surat
              </span>
            </button>
          </div>

          <p className="text-[11px] opacity-65">
            Ketuk segel lilin di atas untuk membuka halaman kenangan
          </p>
        </div>
      ) : (
        /* Main Memory Page Content */
        <main className="max-w-3xl mx-auto px-4 sm:px-8 pt-12 space-y-12">
          {/* Header */}
          <header className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] opacity-75">
              <Heart className="w-3.5 h-3.5" />
              <span>Kepada: {memory.recipient}</span>
            </div>

            <h1 className="font-script text-5xl sm:text-7xl leading-none py-2">
              {memory.title}
            </h1>

            <p className="text-xs sm:text-sm font-editorial italic opacity-80 flex items-center justify-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Dirangkai pada momen: {memory.momentDate}</span>
            </p>
          </header>

          {/* Main Letter Box */}
          <section
            className="p-7 sm:p-12 border shadow-2xl relative"
            style={{
              backgroundColor: theme.cardHex,
              color: theme.textHex,
              borderColor: theme.borderHex,
            }}
          >
            <div className="font-editorial text-lg sm:text-xl leading-relaxed whitespace-pre-line">
              {memory.message}
            </div>

            <div
              className="mt-8 pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              style={{ borderColor: theme.borderHex }}
            >
              <div className="text-[11px] opacity-70">
                <p>Buket: {memory.bouquetName || 'Signature Jadi Bouquet'}</p>
                <p>Kode Kenangan: #{memory.orderCode}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.2em] opacity-70">
                  Dengan penuh kasih,
                </p>
                <p className="font-script text-3xl sm:text-4xl mt-1">
                  {memory.sender}
                </p>
              </div>
            </div>
          </section>

          {/* Photo Memories Gallery */}
          {memory.photos && memory.photos.length > 0 && (
            <section className="space-y-6">
              <div className="text-center">
                <h2 className="font-script text-4xl sm:text-5xl">
                  Potret Kenangan Kita
                </h2>
                <p className="text-xs opacity-75 mt-1">
                  Setiap foto menyimpan cerita yang tak tergantikan
                </p>
              </div>

              <div
                className={`grid gap-6 ${
                  memory.photos.length === 1
                    ? 'grid-cols-1 max-w-md mx-auto'
                    : 'grid-cols-1 sm:grid-cols-2'
                }`}
              >
                {memory.photos.map((photo, idx) => (
                  <figure
                    key={photo.id || idx}
                    className="p-3 sm:p-4 border shadow-xl transition hover:-translate-y-1"
                    style={{
                      backgroundColor: theme.cardHex,
                      borderColor: theme.borderHex,
                    }}
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-black/20">
                      <img
                        src={photo.url}
                        alt={photo.caption || `Foto kenangan ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {photo.caption && (
                      <figcaption className="text-center font-editorial italic text-sm sm:text-base mt-3 opacity-90">
                        "{photo.caption}"
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </section>
          )}

          {/* Optional Video / Music Link (F-34) */}
          {memory.videoUrl && (
            <section
              className="p-6 border text-center space-y-3"
              style={{
                backgroundColor: theme.cardHex,
                borderColor: theme.borderHex,
              }}
            >
              <Video className="w-6 h-6 mx-auto opacity-80" />
              <h3 className="font-editorial text-xl font-semibold">
                Tautan Video / Lagu Spesial
              </h3>
              <a
                href={memory.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-widest border font-semibold hover:opacity-80 transition"
                style={{ borderColor: theme.borderHex }}
              >
                <span>Buka Video / Lagu</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </section>
          )}

          {/* Footer Attribution & Active Period Info */}
          <footer
            className="pt-8 border-t text-center space-y-3 text-xs opacity-75"
            style={{ borderColor: theme.borderHex }}
          >
            <p className="font-script text-3xl">Jadi Bouquet</p>
            <p>
              Halaman kenangan ini dibuat secara khusus bersama buket bunga{' '}
              <strong>Jadi Bouquet</strong>. Aktif hingga{' '}
              <strong>{memory.expiresAt}</strong> (dapat diperpanjang).
            </p>
            <div className="pt-2">
              <Link
                to="/katalog"
                className="inline-block underline text-[11px] uppercase tracking-widest"
              >
                Ingin Mengirim Buket dengan QR Memory Page? Klik di Sini
              </Link>
            </div>
          </footer>
        </main>
      )}
    </div>
  );
}

