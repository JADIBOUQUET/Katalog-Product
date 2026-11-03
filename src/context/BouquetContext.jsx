import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_PRODUCTS,
  INITIAL_MEMORIES,
  INITIAL_ORDERS,
  CUSTOMIZER_OPTIONS,
  MEMORY_THEMES,
} from '../data/mockData';

const BouquetContext = createContext(null);

export const formatRupiah = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount || 0);
};

export function BouquetProvider({ children }) {
  // Products state with localStorage persistence
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('jb_products_v1');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Memories state
  const [memories, setMemories] = useState(() => {
    try {
      const saved = localStorage.getItem('jb_memories_v1');
      return saved ? JSON.parse(saved) : INITIAL_MEMORIES;
    } catch {
      return INITIAL_MEMORIES;
    }
  });

  // Orders state
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('jb_orders_v1');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Simple stats
  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem('jb_stats_v1');
      return saved
        ? JSON.parse(saved)
        : { visitors: 342, whatsappClicks: 48, totalScans: 65 };
    } catch {
      return { visitors: 342, whatsappClicks: 48, totalScans: 65 };
    }
  });

  // Current builder / order draft
  const [draft, setDraft] = useState(() => {
    try {
      const saved = localStorage.getItem('jb_draft_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      productSlug: 'the-signature-rose',
      flowerTypeId: 'fresh-rose',
      paletteId: 'burgundy-red',
      sizeId: 'signature',
      extraIds: ['qr-memory-card'],
      themeId: 'burgundy-classic',
      memoryTitle: 'Untuk Hari Spesialmu',
      senderName: '',
      recipientName: '',
      momentDate: new Date().toISOString().split('T')[0],
      message:
        'Setiap kelopak bunga ini dirangkai khusus untuk merayakan kehadiranmu. Semoga kenangan indah kita selalu tersimpan hangat setiap kali kamu memindai kartu ini.',
      photos: [
        {
          id: 'default-1',
          url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
          caption: 'Momen Berharga',
        },
      ],
      videoUrl: '',
      password: '',
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('jb_products_v1', JSON.stringify(products));
    } catch {
      // ignore storage quota errors
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('jb_memories_v1', JSON.stringify(memories));
    } catch {
      // ignore
    }
  }, [memories]);

  useEffect(() => {
    try {
      localStorage.setItem('jb_orders_v1', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('jb_stats_v1', JSON.stringify(stats));
    } catch {
      // ignore
    }
  }, [stats]);

  useEffect(() => {
    try {
      localStorage.setItem('jb_draft_v1', JSON.stringify(draft));
    } catch {
      // ignore
    }
  }, [draft]);

  // Select product & initialize customizer defaults from product
  const selectProductForDraft = (product) => {
    if (!product) return;
    setDraft((prev) => ({
      ...prev,
      productSlug: product.slug,
      flowerTypeId: product.flowerTypeId || 'fresh-rose',
      paletteId: product.paletteId || 'burgundy-red',
      sizeId: product.sizeId || 'signature',
    }));
  };

  const updateDraft = (partial) => {
    setDraft((prev) => ({ ...prev, ...partial }));
  };

  // Calculate price dynamically
  const getDraftBreakdown = () => {
    const selectedProduct =
      products.find((p) => p.slug === draft.productSlug) || products[0];
    const flowerType =
      CUSTOMIZER_OPTIONS.flowerTypes.find((f) => f.id === draft.flowerTypeId) ||
      CUSTOMIZER_OPTIONS.flowerTypes[0];
    const colorPalette =
      CUSTOMIZER_OPTIONS.colorPalettes.find((c) => c.id === draft.paletteId) ||
      CUSTOMIZER_OPTIONS.colorPalettes[0];
    const size =
      CUSTOMIZER_OPTIONS.sizes.find((s) => s.id === draft.sizeId) ||
      CUSTOMIZER_OPTIONS.sizes[1];
    const selectedExtras = CUSTOMIZER_OPTIONS.extras.filter(
      (e) => e.included || draft.extraIds.includes(e.id)
    );
    const selectedTheme =
      MEMORY_THEMES.find((t) => t.id === draft.themeId) || MEMORY_THEMES[0];

    const extrasTotal = selectedExtras.reduce((sum, item) => sum + item.price, 0);
    const totalPrice = Math.max(
      120000,
      (selectedProduct?.basePrice || 250000) +
        (flowerType?.priceDelta || 0) +
        (colorPalette?.priceDelta || 0) +
        (size?.priceDelta || 0) +
        extrasTotal
    );

    return {
      selectedProduct,
      flowerType,
      colorPalette,
      size,
      selectedExtras,
      selectedTheme,
      extrasTotal,
      totalPrice,
    };
  };

  // Create order + memory page entry
  const createOrderAndMemory = (customerInfo) => {
    const breakdown = getDraftBreakdown();
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const orderCode = `JB-2026-${randNum}`;
    const randomSlug = Math.random().toString(36).substring(2, 8);
    const memoryCode = `kenangan-${randomSlug}`;
    const shortCode = randomSlug;

    const now = new Date();
    const nextYear = new Date(now);
    nextYear.setFullYear(now.getFullYear() + 1);

    const newMemory = {
      code: memoryCode,
      shortCode,
      orderCode,
      themeId: draft.themeId,
      title: draft.memoryTitle || 'Kenangan Spesial',
      sender: draft.senderName || customerInfo.customerName || 'Pengirim Rahasia',
      recipient: draft.recipientName || customerInfo.recipientName || 'Orang Terkasih',
      momentDate: draft.momentDate || now.toISOString().split('T')[0],
      message: draft.message,
      photos:
        draft.photos && draft.photos.length > 0
          ? draft.photos
          : [
              {
                id: 'fallback-photo',
                url: breakdown.selectedProduct.image,
                caption: breakdown.selectedProduct.name,
              },
            ],
      videoUrl: draft.videoUrl || '',
      password: draft.password || '',
      status: 'Aktif',
      createdAt: now.toISOString().split('T')[0],
      expiresAt: nextYear.toISOString().split('T')[0],
      scanCount: 1,
      bouquetName: breakdown.selectedProduct.name,
    };

    const newOrder = {
      id: `ord-${Date.now()}`,
      code: orderCode,
      createdAt: `${now.toISOString().split('T')[0]} ${now
        .toTimeString()
        .slice(0, 5)}`,
      customerName: customerInfo.customerName,
      customerPhone: customerInfo.customerPhone,
      recipientName: draft.recipientName || customerInfo.recipientName,
      deliveryDate: customerInfo.deliveryDate,
      deliveryTime: customerInfo.deliveryTime,
      deliveryAddress: customerInfo.deliveryAddress,
      notes: customerInfo.notes,
      productName: breakdown.selectedProduct.name,
      productSlug: breakdown.selectedProduct.slug,
      customization: {
        flowerType: breakdown.flowerType.name,
        colorPalette: `${breakdown.colorPalette.name} (${breakdown.colorPalette.hex})`,
        size: breakdown.size.name,
        extras: breakdown.selectedExtras.map((e) => e.name),
      },
      totalPrice: breakdown.totalPrice,
      status: 'Baru',
      memoryCode,
      shortCode,
      themeName: breakdown.selectedTheme.name,
    };

    setMemories((prev) => [newMemory, ...prev]);
    setOrders((prev) => [newOrder, ...prev]);
    setStats((prev) => ({
      ...prev,
      whatsappClicks: prev.whatsappClicks + 1,
    }));

    return { order: newOrder, memory: newMemory, breakdown };
  };

  // Admin operations
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const toggleMemoryStatus = (code) => {
    setMemories((prev) =>
      prev.map((m) =>
        m.code === code
          ? { ...m, status: m.status === 'Aktif' ? 'Nonaktif' : 'Aktif' }
          : m
      )
    );
  };

  const deleteMemory = (code) => {
    setMemories((prev) => prev.filter((m) => m.code !== code));
  };

  const incrementMemoryScan = (code) => {
    setMemories((prev) =>
      prev.map((m) =>
        m.code === code ? { ...m, scanCount: (m.scanCount || 0) + 1 } : m
      )
    );
    setStats((prev) => ({ ...prev, totalScans: prev.totalScans + 1 }));
  };

  const addProduct = (newProd) => {
    const slug =
      newProd.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') +
      '-' +
      Math.floor(10 + Math.random() * 89);

    const productItem = {
      id: `prod-${Date.now()}`,
      slug,
      name: newProd.name,
      subtitle: newProd.subtitle || 'Handcrafted Boutique Bouquet',
      category: newProd.category || 'Fresh Flower',
      flowerTypeId: newProd.flowerTypeId || 'fresh-rose',
      paletteId: newProd.paletteId || 'burgundy-red',
      sizeId: 'signature',
      moments: newProd.moments || ['Anniversary', 'Wisuda', 'Ulang Tahun'],
      basePrice: Number(newProd.basePrice) || 250000,
      availability: newProd.availability || 'Tersedia',
      featured: Boolean(newProd.featured),
      popularScore: 90,
      estimation: newProd.estimation || '2 - 3 Jam',
      dimensions: newProd.dimensions || 'Tinggi ±48 cm · Lebar ±36 cm',
      composition: newProd.composition || 'Bunga pilihan dengan wrapping eksklusif Jadi Bouquet.',
      description: newProd.description || 'Rangkaian buket eksklusif lengkap dengan kartu QR Memory Page.',
      image:
        newProd.image ||
        'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=900&q=85',
      gallery: [
        newProd.image ||
          'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=900&q=85',
      ],
    };

    setProducts((prev) => [productItem, ...prev]);
    return productItem;
  };

  const updateProductAvailability = (id, availability) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, availability } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <BouquetContext.Provider
      value={{
        products,
        memories,
        orders,
        stats,
        draft,
        updateDraft,
        selectProductForDraft,
        getDraftBreakdown,
        createOrderAndMemory,
        updateOrderStatus,
        toggleMemoryStatus,
        deleteMemory,
        incrementMemoryScan,
        addProduct,
        updateProductAvailability,
        deleteProduct,
      }}
    >
      {children}
    </BouquetContext.Provider>
  );
}

export const useBouquet = () => {
  const ctx = useContext(BouquetContext);
  if (!ctx) throw new Error('useBouquet must be used inside BouquetProvider');
  return ctx;
};

