'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, MapPin, Trophy, Shield } from 'lucide-react';
import Link from 'next/link';

export default function MatchdayTicker() {
  const { language } = useLanguage();

  return (
    <div className="bg-[#061325] text-white border-b border-slate-800 text-xs py-2 px-3.5 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Ticker Content */}
        <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto scrollbar-none whitespace-nowrap text-[11px] font-mono">
          
          <div className="flex items-center gap-1.5 text-blue-400 font-bold uppercase shrink-0">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>{language === 'ka' ? 'აკადემიის მატჩდეი' : 'NEXT FIXTURE'}</span>
          </div>

          <div className="text-slate-300 flex items-center gap-2 shrink-0">
            <Trophy className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-bold text-white">TFA U-12</span>
            <span className="text-slate-500">vs</span>
            <span className="font-bold text-white">{language === 'ka' ? 'დინამოს აკადემია' : 'Dinamo Academy'}</span>
            <span className="text-slate-400 font-normal">| {language === 'ka' ? 'შაბათი 11:30 • საბურთალო' : 'Saturday 11:30 • Saburtalo'}</span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-slate-400 shrink-0 border-l border-slate-800 pl-4">
            <Calendar className="w-3.5 h-3.5 text-blue-400" />
            <span>{language === 'ka' ? 'შემოდგომის სეზონის მიღება მიმდინარეობს' : 'Autumn Admissions Open: 2012–2019'}</span>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-slate-400 shrink-0 border-l border-slate-800 pl-4">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span>GFF & UEFA STANDARDS</span>
          </div>

        </div>

        {/* Quick Admission Link */}
        <Link
          href="/contact"
          className="shrink-0 text-[10px] font-mono font-black uppercase text-blue-400 hover:text-white flex items-center gap-1 transition-colors underline underline-offset-2"
        >
          <span>{language === 'ka' ? 'საცდელზე ჩაწერა ➔' : 'Trial Signup ➔'}</span>
        </Link>

      </div>
    </div>
  );
}
