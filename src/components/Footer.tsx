'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-[#061325] text-white relative">

      {/* Blue & White Club Trim Bar */}
      <div className="club-trim-bar h-1 w-full relative z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 sm:pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-8 sm:pb-10 border-b border-slate-800">
          
          {/* Col 1: Club Brand & Crest */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center p-1.5 border-2 border-blue-600 shadow-sm">
                <img
                  src="/logo/tfilisi-crest-white.svg"
                  alt="ტფილისი"
                  className="w-full h-full object-contain filter drop-shadow-sm"
                />
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
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-block px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 text-[10px] font-mono font-bold text-slate-300">
                GFF & UEFA STANDARDS
              </div>
            </div>

            {/* Official Technical Sponsor: Kelme */}
            <div className="pt-1">
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold mb-1.5">
                ტექნიკური პარტნიორი
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
                <img
                  src="/logo/kelme-white.png"
                  alt="KELME"
                  className="h-5 w-auto object-contain opacity-95"
                />
              </div>
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

          {/* Col 4: Contacts & Social Media */}
          <div className="space-y-4">
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

            {/* Social Media Links */}
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold mb-2">
                სოციალური მედია
              </div>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 border border-slate-800 hover:border-transparent flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-xs group"
                  title="Instagram"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-[#1877F2] border border-slate-800 hover:border-transparent flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-xs group"
                  title="Facebook"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>{t.footer.rights}</p>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">ტექნიკური სპონსორი:</span>
              <img
                src="/logo/kelme-white.png"
                alt="KELME"
                className="h-4.5 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
            <span className="text-slate-400 font-mono text-[11px]">EST. 2024 • TBILISI, GEORGIA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
