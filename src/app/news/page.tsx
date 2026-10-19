'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../../components/Navbar';
import NewsSection from '../../components/NewsSection';
import Footer from '../../components/Footer';
import AuthModal from '../../components/AuthModal';

export default function NewsPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar onOpenAuthModal={() => setAuthModalOpen(true)} />
      <main className="flex-1 animate-page-enter">
        {/* Dedicated Back Navigation Strip */}
        <div className="bg-slate-50 border-b border-slate-200/80 py-2.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>მთავარ გვერდზე დაბრუნება</span>
            </Link>
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">ტფილისის აკადემია</span>
          </div>
        </div>
        <NewsSection />
      </main>
      <Footer />
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}
