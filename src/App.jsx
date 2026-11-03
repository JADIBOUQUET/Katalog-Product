import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { BouquetProvider } from './context/BouquetContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ThemeBuilderPage from './pages/ThemeBuilderPage';
import OrderSummaryPage from './pages/OrderSummaryPage';
import MemoryPublicPage from './pages/MemoryPublicPage';
import QrRedirectPage from './pages/QrRedirectPage';
import AdminPage from './pages/AdminPage';
import {
  AboutPage,
  FaqPage,
  ContactPage,
  PrivacyPage,
} from './pages/SupportPages';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BouquetProvider>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#491318] text-[#ece3d8]">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/katalog" element={<CatalogPage />} />
            <Route path="/produk/:slug" element={<ProductDetailPage />} />
            <Route path="/tema" element={<ThemeBuilderPage />} />
            <Route path="/pesan" element={<OrderSummaryPage />} />
            <Route path="/m/:code" element={<MemoryPublicPage />} />
            <Route path="/q/:code" element={<QrRedirectPage />} />
            <Route path="/tentang" element={<AboutPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/kontak" element={<ContactPage />} />
            <Route path="/privasi" element={<PrivacyPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BouquetProvider>
  );
}

