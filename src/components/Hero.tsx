'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Trophy, ShieldCheck, HeartHandshake, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onRegisterClick: () => void;
}

export default function Hero({ onRegisterClick }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-blue-50/50 via-white to-slate-50 pt-5 sm:pt-12 pb-8 sm:pb-16 border-b border-slate-200/60">
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] sm:[background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-center lg:text-left">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100/70 border border-blue-200 text-blue-800 text-[11px] sm:text-xs font-bold tracking-tight">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Main Headline - Scaled specifically for mobile phones */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {t.hero.titleStart}{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-700 to-sky-600">
                {t.hero.titleHighlight}
              </span>{' '}
              {t.hero.titleEnd}
            </h1>

            {/* Subheading - Compact on mobile */}
            <p className="text-xs sm:text-sm md:text-base text-slate-600 font-medium max-w-2xl leading-relaxed mx-auto lg:mx-0">
              {t.hero.subtitle}
            </p>

            {/* CTAs - Sleek mobile buttons */}
            <div className="flex flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-0.5">
              <button
                onClick={onRegisterClick}
                className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-white bg-blue-700 hover:bg-blue-800 shadow-xs border border-blue-700 transition-all active:scale-95 flex items-center justify-center gap-1.5 text-xs sm:text-sm"
              >
                <span>{t.hero.registerBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <Link
                href="#groups-section"
                className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-blue-800 bg-white hover:bg-blue-50/80 border border-slate-300 shadow-2xs transition-all active:scale-95 text-center text-xs sm:text-sm"
              >
                {t.hero.learnMoreBtn}
              </Link>
            </div>

            {/* 3 Values: Clean compact pills on mobile */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-3 pt-3 sm:pt-4 border-t border-slate-200/70 text-left">
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1 sm:gap-2.5 p-2 rounded-xl bg-white/70 border border-slate-200/80">
                <div className="p-1 sm:p-2 rounded-lg bg-blue-100/70 text-blue-700 shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-[10px] sm:text-xs leading-tight">{t.hero.stat1Title}</div>
                  <div className="text-[9px] sm:text-[11px] text-slate-500 font-medium hidden sm:block">{t.hero.stat1Desc}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1 sm:gap-2.5 p-2 rounded-xl bg-white/70 border border-slate-200/80">
                <div className="p-1 sm:p-2 rounded-lg bg-blue-100/70 text-blue-700 shrink-0">
                  <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-[10px] sm:text-xs leading-tight">{t.hero.stat2Title}</div>
                  <div className="text-[9px] sm:text-[11px] text-slate-500 font-medium hidden sm:block">{t.hero.stat2Desc}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1 sm:gap-2.5 p-2 rounded-xl bg-white/70 border border-slate-200/80">
                <div className="p-1 sm:p-2 rounded-lg bg-blue-100/70 text-blue-700 shrink-0">
                  <HeartHandshake className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-[10px] sm:text-xs leading-tight">{t.hero.stat3Title}</div>
                  <div className="text-[9px] sm:text-[11px] text-slate-500 font-medium hidden sm:block">{t.hero.stat3Desc}</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Card (Clean, light outline on mobile) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              
              <div className="relative rounded-2xl bg-white p-2 sm:p-3 shadow-xs border border-slate-200 sm:border-2 sm:border-blue-500">
                
                <div className="relative rounded-xl overflow-hidden aspect-16/10 sm:aspect-4/3 bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000&auto=format&fit=crop"
                    alt="Tfilisi Football Academy"
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-full border border-blue-200 flex items-center gap-1 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
                    <span className="text-[9px] sm:text-[11px] font-bold text-blue-900">{t.hero.liveBadge}</span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-slate-950/90 via-slate-900/40 to-transparent p-2.5 sm:p-3.5 text-white">
                    <div className="text-[9px] sm:text-[10px] uppercase tracking-wider font-bold text-sky-400">
                      {t.hero.cardLocation}
                    </div>
                    <div className="text-xs sm:text-sm font-bold leading-tight">
                      {t.hero.cardTitle}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1.5 mt-1.5">
                  <div className="bg-blue-50/70 rounded-lg p-1.5 sm:p-2 border border-blue-100 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                    <div>
                      <div className="text-[9px] text-slate-500 font-semibold leading-none">{t.hero.cardStat1Label}</div>
                      <div className="text-xs font-extrabold text-slate-900">{t.hero.cardStat1Val}</div>
                    </div>
                  </div>
                  <div className="bg-blue-50/70 rounded-lg p-1.5 sm:p-2 border border-blue-100 flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                    <div>
                      <div className="text-[9px] text-slate-500 font-semibold leading-none">{t.hero.cardStat2Label}</div>
                      <div className="text-xs font-extrabold text-slate-900">{t.hero.cardStat2Val}</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
