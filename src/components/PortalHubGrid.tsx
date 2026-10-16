'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { ChevronRight } from 'lucide-react';

export interface PortalHubItem {
  id: string;
  titleKa: string;
  titleEn: string;
  href: string;
  iconType: 'academy' | 'centers' | 'individual' | 'groups' | 'coaches' | 'staff';
}

export const portalHubItems: PortalHubItem[] = [
  {
    id: 'academy',
    titleKa: 'ტფილისის აკადემია',
    titleEn: 'TFILISI ACADEMY',
    href: '/academy',
    iconType: 'academy'
  },
  {
    id: 'centers',
    titleKa: 'აკადემიის საფეხბურთო ცენტრები',
    titleEn: 'ACADEMY FOOTBALL CENTERS',
    href: '/locations',
    iconType: 'centers'
  },
  {
    id: 'individual',
    titleKa: 'ინდივიდუალური მომზადების პროგრამა',
    titleEn: 'INDIVIDUAL TRAINING PROGRAM',
    href: '/individual',
    iconType: 'individual'
  },
  {
    id: 'groups',
    titleKa: 'ჯგუფები',
    titleEn: 'SQUAD CATEGORIES',
    href: '/groups',
    iconType: 'groups'
  },
  {
    id: 'coaches',
    titleKa: 'მწვრთნელები',
    titleEn: 'COACHES',
    href: '/coaches',
    iconType: 'coaches'
  },
  {
    id: 'staff',
    titleKa: 'სტაფი',
    titleEn: 'STAFF',
    href: '/staff',
    iconType: 'staff'
  }
];

export default function PortalHubGrid() {
  const { language } = useLanguage();

  return (
    <section className="py-6 sm:py-10 bg-white relative">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">

        {/* 6 GFF-Style Athletic Portal Cards Grid (3 columns x 2 rows on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {portalHubItems.map((item) => {
            const title = language === 'ka' ? item.titleKa : item.titleEn;

            return (
              <Link
                key={item.id}
                href={item.href}
                className="group relative rounded-2xl bg-gradient-to-b from-[#0052ff] via-[#0047e0] to-[#0038b8] hover:from-[#005aff] hover:to-[#041a38] shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between aspect-16/11 sm:aspect-16/10 border border-blue-400/30"
              >

                {/* HUD Corner Brackets ┌ ┐ └ ┘ (Exact GFF Screenshot Architecture) */}
                <div className="absolute top-3.5 left-3.5 w-3.5 h-3.5 border-t-2 border-l-2 border-white/60 group-hover:border-white transition-colors pointer-events-none" />
                <div className="absolute top-3.5 right-3.5 w-3.5 h-3.5 border-t-2 border-r-2 border-white/60 group-hover:border-white transition-colors pointer-events-none" />
                <div className="absolute bottom-13 left-3.5 w-3.5 h-3.5 border-b-2 border-l-2 border-white/60 group-hover:border-white transition-colors pointer-events-none" />
                <div className="absolute bottom-13 right-3.5 w-3.5 h-3.5 border-b-2 border-r-2 border-white/60 group-hover:border-white transition-colors pointer-events-none" />

                {/* Center Emblem Visual */}
                <div className="relative z-10 flex-1 flex items-center justify-center p-4">
                  {item.iconType === 'academy' && (
                    <div className="w-18 h-18 sm:w-22 sm:h-22 flex items-center justify-center group-hover:scale-108 transition-transform duration-300">
                      <img
                        src="/logo/tfilisi-crest-white.svg"
                        alt="ტფილისის აკადემია"
                        className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
                      />
                    </div>
                  )}

                  {item.iconType === 'centers' && (
                    <svg
                      className="w-18 h-18 sm:w-22 sm:h-22 text-white fill-none group-hover:scale-108 transition-transform duration-300"
                      viewBox="0 0 72 72"
                    >
                      <rect x="8" y="10" width="56" height="52" rx="4" stroke="white" strokeWidth="2.5" />
                      <line x1="8" y1="36" x2="64" y2="36" stroke="white" strokeWidth="2" />
                      <circle cx="36" cy="36" r="10" stroke="white" strokeWidth="2" />
                      <circle cx="36" cy="36" r="2" fill="white" />
                      <rect x="22" y="10" width="28" height="13" stroke="white" strokeWidth="2" />
                      <rect x="28" y="10" width="16" height="5" stroke="white" strokeWidth="1.5" />
                      <path d="M 28 23 A 8 8 0 0 0 44 23" stroke="white" strokeWidth="1.5" />
                      <rect x="22" y="49" width="28" height="13" stroke="white" strokeWidth="2" />
                      <rect x="28" y="57" width="16" height="5" stroke="white" strokeWidth="1.5" />
                      <path d="M 28 49 A 8 8 0 0 1 44 49" stroke="white" strokeWidth="1.5" />
                      <path d="M 8 16 A 6 6 0 0 0 14 10" stroke="white" strokeWidth="1.5" />
                      <path d="M 58 10 A 6 6 0 0 0 64 16" stroke="white" strokeWidth="1.5" />
                      <path d="M 8 56 A 6 6 0 0 1 14 62" stroke="white" strokeWidth="1.5" />
                      <path d="M 58 62 A 6 6 0 0 1 64 56" stroke="white" strokeWidth="1.5" />
                    </svg>
                  )}

                  {item.iconType === 'individual' && (
                    <svg
                      className="w-18 h-18 sm:w-22 sm:h-22 text-white group-hover:scale-108 transition-transform duration-300"
                      viewBox="0 0 72 72"
                      fill="none"
                    >
                      <path
                        d="M40 6 L18 38 L34 38 L28 66 L56 30 L38 30 Z"
                        fill="white"
                        className="filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                      />
                      <circle cx="36" cy="36" r="30" stroke="white" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
                      <circle cx="53" cy="19" r="7" fill="#0052ff" stroke="white" strokeWidth="2" />
                      <polygon points="53,15 56,17.2 55,20.8 51,20.8 50,17.2" fill="white" />
                    </svg>
                  )}

                  {item.iconType === 'groups' && (
                    <svg
                      className="w-18 h-18 sm:w-22 sm:h-22 text-white group-hover:scale-108 transition-transform duration-300"
                      viewBox="0 0 72 72"
                      fill="none"
                    >
                      <circle cx="36" cy="36" r="28" stroke="white" strokeWidth="2.5" />
                      <polygon points="36,25 46,32 42,44 30,44 26,32" fill="white" />
                      <line x1="36" y1="25" x2="36" y2="8" stroke="white" strokeWidth="2" />
                      <line x1="46" y1="32" x2="61" y2="26" stroke="white" strokeWidth="2" />
                      <line x1="42" y1="44" x2="55" y2="57" stroke="white" strokeWidth="2" />
                      <line x1="30" y1="44" x2="17" y2="57" stroke="white" strokeWidth="2" />
                      <line x1="26" y1="32" x2="11" y2="26" stroke="white" strokeWidth="2" />
                      <polygon points="29,8 43,8 39,15 33,15" fill="white" opacity="0.9" />
                      <polygon points="59,23 64,34 58,36 55,27" fill="white" opacity="0.9" />
                      <polygon points="52,54 46,63 41,58 48,51" fill="white" opacity="0.9" />
                      <polygon points="20,54 26,63 31,58 24,51" fill="white" opacity="0.9" />
                      <polygon points="13,23 8,34 14,36 17,27" fill="white" opacity="0.9" />
                    </svg>
                  )}

                  {item.iconType === 'coaches' && (
                    <svg
                      className="w-18 h-18 sm:w-22 sm:h-22 text-white fill-none stroke-current group-hover:scale-108 transition-transform duration-300"
                      viewBox="0 0 72 72"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="14" y="12" width="44" height="52" rx="4" strokeWidth="2.5" />
                      <rect x="26" y="8" width="20" height="8" rx="2" fill="white" />
                      <line x1="18" y1="38" x2="54" y2="38" strokeWidth="1.5" strokeDasharray="3 3" />
                      <circle cx="36" cy="38" r="7" strokeWidth="1.5" />
                      <path d="M22 24 L28 30 M28 24 L22 30" strokeWidth="2.2" />
                      <circle cx="48" cy="27" r="3.5" strokeWidth="2.2" />
                      <path d="M44 48 L50 54 M50 48 L44 54" strokeWidth="2.2" />
                      <circle cx="25" cy="51" r="3.5" strokeWidth="2.2" />
                      <path d="M30 48 Q 36 42 42 46" strokeWidth="2" strokeDasharray="2 2" />
                    </svg>
                  )}

                  {item.iconType === 'staff' && (
                    <svg
                      className="w-18 h-18 sm:w-22 sm:h-22 text-white fill-none group-hover:scale-108 transition-transform duration-300"
                      viewBox="0 0 72 72"
                    >
                      <path
                        d="M36 8 L58 17 V36 C58 52 36 65 36 65 C36 65 14 52 14 36 V17 Z"
                        stroke="white"
                        strokeWidth="2.5"
                        fill="none"
                      />
                      <path d="M36 21 V47 M23 34 H49" stroke="white" strokeWidth="4.5" strokeLinecap="round" />
                      <circle cx="36" cy="34" r="13" stroke="white" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
                    </svg>
                  )}
                </div>

                {/* Bottom Federation Status Bar (Exact GFF Screenshot Architecture) */}
                <div className="relative z-10 w-full px-4 sm:px-5 py-3 bg-[#031b40]/85 border-t border-white/20 flex items-center justify-between text-white backdrop-blur-2xs transition-colors group-hover:bg-[#02132e]">
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="w-2.5 h-2.5 rounded-full bg-white shrink-0 group-hover:scale-125 transition-transform" />
                    <span className="font-black text-xs sm:text-sm uppercase tracking-wider text-white truncate">
                      {title}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
