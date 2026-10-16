'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import FluidWaveBackground from './FluidWaveBackground';

export default function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-[#061325] text-white relative overflow-hidden">
      <FluidWaveBackground variant="navy" intensity="subtle" />

      {/* Blue & White Club Trim Bar */}
      <div className="club-trim-bar h-1 w-full relative z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 sm:pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-8 sm:pb-10 border-b border-slate-800">
          
          {/* Col 1: Club Brand & Crest */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-white border-2 border-blue-600 shadow-sm">
                <div className="relative flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-500 fill-blue-500/20" />
                  <span className="absolute text-[8px] font-black tracking-tighter text-white">TF</span>
                </div>
              </div>
              <div>
                <div className="font-black text-base tracking-tight text-white leading-tight">
                  {language === 'ka' ? 'ტფილისი' : 'TFILISI'}
                </div>
                <div className="text-[10px] uppercase tracking-widest font-extrabold text-blue-400">
                  {language === 'ka' ? 'საფეხბურთო აკადემია' : 'FOOTBALL ACADEMY'}
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.footer.desc}
            </p>
            <div className="inline-block px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 text-[10px] font-mono font-bold text-slate-300">
              GFF & UEFA STANDARDS
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-widest text-blue-400 mb-3.5">
              {t.footer.navTitle}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li><Link href="/" className="hover:text-white transition-colors">{t.navbar.home}</Link></li>
              <li><Link href="/groups" className="hover:text-white transition-colors">{t.navbar.teamsAges}</Link></li>
              <li><Link href="/locations" className="hover:text-white transition-colors">{t.navbar.locations}</Link></li>
              <li><Link href="/individual" className="hover:text-white transition-colors">{t.navbar.individual}</Link></li>
              <li><Link href="/news" className="hover:text-white transition-colors">{t.navbar.news}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">{t.navbar.contact}</Link></li>
            </ul>
          </div>

          {/* Col 3: Branches */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-widest text-blue-400 mb-3.5">
              {t.footer.branchesTitle}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>{t.navbar.saburtaloName}</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>{t.navbar.varketiliName}</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>{t.navbar.dinamoName}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contacts */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-widest text-blue-400 mb-3.5">
              {t.footer.contactTitle}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>+995 599 00 00 00</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>info@tbilisifa.ge</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>{t.footer.rights}</p>
          <div className="flex gap-4">
            <span className="text-slate-400 font-mono text-[11px]">EST. 2024 • TBILISI, GEORGIA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
