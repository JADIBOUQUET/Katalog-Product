import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Download, ExternalLink, QrCode as QrIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QrCodeBox({
  shortCode,
  memoryCode,
  label = 'Kartu QR Memory Page',
  size = 180,
  showActions = true,
}) {
  const [pngUrl, setPngUrl] = useState('');
  const [svgString, setSvgString] = useState('');

  // Shortlink path (/q/kode) that redirects to /m/kode
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://jadibouquet.id';
  const targetShortUrl = `${origin}/q/${shortCode || memoryCode}`;
  const directMemoryPath = `/m/${memoryCode}`;

  useEffect(() => {
    let active = true;
    // Generate PNG Data URL with High Error Correction (Level H)
    QRCode.toDataURL(targetShortUrl, {
      errorCorrectionLevel: 'H',
      margin: 2,
      width: size * 2,
      color: {
        dark: '#24120e',
        light: '#ece3d8',
      },
    })
      .then((url) => {
        if (active) setPngUrl(url);
      })
      .catch(() => {});

    // Generate SVG String with High Error Correction (Level H)
    QRCode.toString(targetShortUrl, {
      type: 'svg',
      errorCorrectionLevel: 'H',
      margin: 2,
      color: {
        dark: '#24120e',
        light: '#ece3d8',
      },
    })
      .then((svg) => {
        if (active) setSvgString(svg);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [targetShortUrl, size]);

  const handleDownloadPng = () => {
    if (!pngUrl) return;
    const link = document.createElement('a');
    link.href = pngUrl;
    link.download = `QR-JadiBouquet-${shortCode || memoryCode}.png`;
    link.click();
  };

  const handleDownloadSvg = () => {
    if (!svgString) return;
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `QR-JadiBouquet-${shortCode || memoryCode}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#ece3d8] text-[#24120e] p-4 rounded-sm border border-[#491318]/25 shadow-lg inline-flex flex-col items-center text-center">
      <div className="text-[10px] tracking-[0.22em] uppercase font-semibold text-[#491318] mb-2 flex items-center gap-1.5">
        <QrIcon className="w-3.5 h-3.5" />
        <span>{label}</span>
      </div>

      <div className="bg-[#ece3d8] p-2 border border-[#24120e]/20 rounded-sm">
        {pngUrl ? (
          <img
            src={pngUrl}
            alt={`QR Code ${memoryCode}`}
            style={{ width: size, height: size }}
            className="block"
          />
        ) : (
          <div
            style={{ width: size, height: size }}
            className="flex items-center justify-center text-xs text-[#24120e]/60"
          >
            Membuat QR...
          </div>
        )}
      </div>

      <p className="mt-2 font-script text-xl text-[#491318]">Jadi Bouquet</p>
      <p className="text-[11px] font-mono text-[#24120e]/75 mt-0.5">
        /q/{shortCode || memoryCode}
      </p>

      {showActions && (
        <div className="mt-3 pt-3 border-t border-[#24120e]/15 w-full flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={handleDownloadPng}
            className="px-2.5 py-1.5 text-[11px] font-medium bg-[#491318] text-[#ece3d8] hover:bg-[#24120e] transition flex items-center gap-1 rounded-xs cursor-pointer"
          >
            <Download className="w-3 h-3" />
            Unduh PNG
          </button>
          <button
            type="button"
            onClick={handleDownloadSvg}
            className="px-2.5 py-1.5 text-[11px] font-medium border border-[#491318] text-[#491318] hover:bg-[#491318] hover:text-[#ece3d8] transition flex items-center gap-1 rounded-xs cursor-pointer"
          >
            <Download className="w-3 h-3" />
            Unduh SVG
          </button>
          <Link
            to={directMemoryPath}
            className="px-2.5 py-1.5 text-[11px] font-medium bg-[#24120e] text-[#ece3d8] hover:bg-[#491318] transition flex items-center gap-1 rounded-xs"
          >
            <ExternalLink className="w-3 h-3" />
            Buka Halaman
          </Link>
        </div>
      )}
    </div>
  );
}

