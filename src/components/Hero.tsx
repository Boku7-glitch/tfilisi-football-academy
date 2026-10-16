'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Trophy, ShieldCheck, HeartHandshake, Shield, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onRegisterClick: () => void;
}

export default function Hero({ onRegisterClick }: HeroProps) {
  const { language, t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-white pt-6 sm:pt-14 pb-8 sm:pb-16 border-b border-slate-200">
      
      {/* Subtle Athletic Pitch Touchlines (Chalk Grid) */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="h-full w-full border-x border-slate-100 max-w-7xl mx-auto" />
      </div>

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
          
          {/* Left Column: Bold Sports Editorial Identity */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left">
            
            {/* Athletic Category Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 border border-slate-300 text-slate-800 text-[11px] sm:text-xs font-black tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>{t.hero.badge}</span>
              <span className="text-slate-400">|</span>
              <span className="text-blue-700 font-bold">{language === 'ka' ? '2012 — 2019 წლები' : 'U8 — U14 TALENT'}</span>
            </div>

            {/* Main Headline - Solid High-Impact Club Typography (NO AI gradients) */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#061325] tracking-tight leading-[1.15]">
              {t.hero.titleStart}{' '}
              <span className="text-blue-600">
                {t.hero.titleHighlight}
              </span>{' '}
              {t.hero.titleEnd}
            </h1>

            {/* Subheading - Professional, Direct, Inspiring */}
            <p className="text-xs sm:text-sm md:text-base text-slate-600 font-medium max-w-2xl leading-relaxed mx-auto lg:mx-0">
              {t.hero.subtitle}
            </p>

            {/* Athletic CTA Action Group */}
            <div className="flex flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 pt-1">
              <button
                onClick={onRegisterClick}
                className="flex-1 sm:flex-none px-5 sm:px-7 py-3 rounded-lg font-black uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 shadow-sm border border-blue-600 transition-all active:scale-95 flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
                <span>{t.hero.registerBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/groups"
                className="flex-1 sm:flex-none px-5 sm:px-7 py-3 rounded-lg font-bold text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs transition-all active:scale-95 text-center text-xs sm:text-sm"
              >
                {t.hero.learnMoreBtn}
              </Link>
            </div>

            {/* Athletic Scoreboard / Stats Matrix */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-4 border-t border-slate-200">
              <div className="p-2.5 sm:p-3 rounded-lg bg-slate-50 border border-slate-200 text-left">
                <div className="text-base sm:text-xl font-black text-[#061325] leading-none mb-1">
                  03
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-slate-800 leading-tight">
                  {t.hero.stat1Title}
                </div>
                <div className="text-[9px] sm:text-[10px] text-slate-500 hidden sm:block mt-0.5">
                  {t.hero.stat1Desc}
                </div>
              </div>

              <div className="p-2.5 sm:p-3 rounded-lg bg-slate-50 border border-slate-200 text-left">
                <div className="text-base sm:text-xl font-black text-blue-600 leading-none mb-1">
                  100%
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-slate-800 leading-tight">
                  {t.hero.stat2Title}
                </div>
                <div className="text-[9px] sm:text-[10px] text-slate-500 hidden sm:block mt-0.5">
                  {t.hero.stat2Desc}
                </div>
              </div>

              <div className="p-2.5 sm:p-3 rounded-lg bg-slate-50 border border-slate-200 text-left">
                <div className="text-base sm:text-xl font-black text-[#061325] leading-none mb-1">
                  12+
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-slate-800 leading-tight">
                  {t.hero.stat3Title}
                </div>
                <div className="text-[9px] sm:text-[10px] text-slate-500 hidden sm:block mt-0.5">
                  {t.hero.stat3Desc}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Official Academy Roster & Training Pass */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              
              <div className="rounded-xl bg-white border-2 border-slate-900 p-2 sm:p-3 shadow-md">
                
                {/* Official Pass Header */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 px-1">
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-900">
                      TFA MATCH & TRAINING PASS
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-slate-400">
                    ACADEMY • 2024-25
                  </span>
                </div>

                {/* High Contrast Youth Action Visual */}
                <div className="relative rounded-lg overflow-hidden aspect-16/10 sm:aspect-4/3 bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000&auto=format&fit=crop"
                    alt="Tfilisi Football Academy"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Status Indicator */}
                  <div className="absolute top-2.5 left-2.5 bg-[#061325] text-white px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider border border-blue-500/50 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>{t.hero.liveBadge}</span>
                  </div>

                  {/* Dark Pitch Overlay Strip */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-3 text-white">
                    <div className="text-[9px] uppercase tracking-widest font-black text-blue-400">
                      {t.hero.cardLocation}
                    </div>
                    <div className="text-xs sm:text-sm font-black leading-tight mt-0.5">
                      {t.hero.cardTitle}
                    </div>
                  </div>
                </div>

                {/* Tactical Metrics Bar */}
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="bg-slate-50 rounded-lg p-2 border border-slate-200">
                    <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">{t.hero.cardStat1Label}</div>
                    <div className="text-xs font-black text-slate-900 mt-0.5">{t.hero.cardStat1Val}</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2 border border-slate-200">
                    <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">{t.hero.cardStat2Label}</div>
                    <div className="text-xs font-black text-blue-600 mt-0.5">{t.hero.cardStat2Val}</div>
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
