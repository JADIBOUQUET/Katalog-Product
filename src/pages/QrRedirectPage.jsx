import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QrCode } from 'lucide-react';
import { useBouquet } from '../context/BouquetContext';

export default function QrRedirectPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const { memories, incrementMemoryScan } = useBouquet();

  useEffect(() => {
    const found = memories.find(
      (m) => m.shortCode === code || m.code === code
    );
    const timer = setTimeout(() => {
      if (found) {
        incrementMemoryScan(found.code);
        navigate(`/m/${found.code}`, { replace: true });
      } else {
        navigate(`/m/${code}`, { replace: true });
      }
    }, 650);

    return () => clearTimeout(timer);
  }, [code]);

  return (
    <div className="min-h-screen bg-[#24120e] text-[#ece3d8] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-[#491318] border border-[#ece3d8]/30 flex items-center justify-center animate-pulse">
        <QrCode className="w-8 h-8 text-[#ece3d8]" />
      </div>
      <p className="font-script text-4xl text-[#ece3d8]">Jadi Bouquet</p>
      <p className="text-xs uppercase tracking-[0.2em] text-[#ece3d8]/75">
        Mengalihkan Tautan Pendek (/q/{code}) ke Memory Page...
      </p>
    </div>
  );
}

