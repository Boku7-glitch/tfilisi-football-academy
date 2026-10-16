'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-white pt-12 sm:pt-16 pb-8 sm:pb-12 border-t-4 border-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-8 sm:pb-10 border-b border-slate-800">
          
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                  {language === 'ka' ? 'ტფილისის' : 'TFILISI'}
                </div>
                <div className="text-[10px] uppercase tracking-wider font-bold text-sky-400">
                  {language === 'ka' ? 'საფეხბურთო აკადემია' : 'FOOTBALL ACADEMY'}
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.footer.desc}
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-sky-400 mb-3">
              {t.footer.navTitle}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/" className="hover:text-sky-400 transition-colors">{t.navbar.home}</Link></li>
              <li><Link href="#groups-section" className="hover:text-sky-400 transition-colors">{t.navbar.teamsAges}</Link></li>
              <li><Link href="#locations-section" className="hover:text-sky-400 transition-colors">{t.navbar.locations}</Link></li>
              <li><Link href="#individual-section" className="hover:text-sky-400 transition-colors">{t.navbar.individual}</Link></li>
              <li><Link href="#news-section" className="hover:text-sky-400 transition-colors">{t.navbar.news}</Link></li>
            </ul>
          </div>

          {/* Col 3: Branches */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-sky-400 mb-3">
              {t.footer.branchesTitle}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
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
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-sky-400 mb-3">
              {t.footer.contactTitle}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
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
            <span className="text-slate-400 font-semibold">TFA White & Blue Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
