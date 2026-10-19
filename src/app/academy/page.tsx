'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AcademyDNA from '../../components/AcademyDNA';
import { useLanguage } from '../../context/LanguageContext';

export default function AcademyPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar onOpenAuthModal={() => {}} />

      <main className="flex-1 bg-white animate-page-enter">
        {/* Editorial Hero Banner */}
        <section className="py-12 sm:py-16 bg-[#061325] text-white border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="mb-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all group hover:-translate-x-0.5 active:scale-95"
                >
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  <span>მთავარ გვერდზე დაბრუნება</span>
                </Link>
              </div>
              <span className="inline-block px-3 py-1 rounded bg-blue-600 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest mb-3">
                {language === 'ka' ? 'აკადემიის ფილოსოფია' : 'ACADEMY DNA & PHILOSOPHY'}
              </span>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                {language === 'ka' ? 'ტფილისის საფეხბურთო აკადემია' : 'Tfilisi Football Academy'}
              </h1>
              <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                {language === 'ka'
                  ? 'ევროპული საწვრთნელი სტანდარტები, UEFA-ს ლიცენზირებული მეთოდოლოგია და ბავშვის ჰარმონიული განვითარება — ტექნიკურად, ტაქტიკურად, ფიზიკურად და მენტალურად.'
                  : 'European training standards, UEFA accredited methodology, and holistic youth progression — technical mastery, game intelligence, athletic motorics, and leadership character.'}
              </p>
            </div>
          </div>
        </section>

        {/* The 4 Core Developmental Pillars */}
        <AcademyDNA />
      </main>

      <Footer />
    </div>
  );
}
