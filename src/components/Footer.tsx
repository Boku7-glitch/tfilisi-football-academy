'use client';

import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-[#061325] text-white relative">

      {/* Blue & White Club Trim Bar */}
      <div className="club-trim-bar h-1 w-full relative z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 sm:pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-8 sm:pb-10 border-b border-slate-800">
          
          {/* Col 1: Club Brand & Technical Partner (Kelme) */}
          <div className="space-y-8 sm:space-y-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center p-1.5 border-2 border-blue-600 shadow-sm shrink-0">
                <img
                  src="/logo/tfilisi-crest-white.svg"
                  alt="ტფილისი"
                  className="w-full h-full object-contain filter drop-shadow-sm"
                />
              </div>
              <div>
                <div className="font-black text-base tracking-tight text-white leading-tight">
                  ტფილისი
                </div>
                <div className="text-[10px] uppercase tracking-widest font-extrabold text-blue-400">
                  საფეხბურთო აკადემია
                </div>
              </div>
            </div>

            {/* Technical Partner (Kelme) */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center p-1.5 border-2 border-blue-600 shadow-sm shrink-0">
                <img
                  src="/logo/kelme-seeklogo-white.png"
                  alt="კელმე"
                  className="w-full h-full object-contain filter drop-shadow-sm"
                />
              </div>
              <div>
                <div className="font-black text-base tracking-tight text-white leading-tight">
                  კელმე
                </div>
                <div className="text-[10px] uppercase tracking-widest font-extrabold text-blue-400">
                  ტექნიკური სპონსორი
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: Branches (ფილიალები - moved into former navigation spot) */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-widest text-blue-400 mb-3.5">
              {t.footer.branchesTitle}
            </h4>
            <ul className="space-y-3 text-xs text-slate-300 font-medium">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-xs">{t.navbar.saburtaloName}</div>
                  <div className="text-[11px] text-slate-400">{t.navbar.saburtaloAddr}</div>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-xs">{t.navbar.varketiliName}</div>
                  <div className="text-[11px] text-slate-400">{t.navbar.varketiliAddr}</div>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-xs">{t.navbar.dinamoName}</div>
                  <div className="text-[11px] text-slate-400">{t.navbar.dinamoAddr}</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 3: Contacts (კონტაქტი - moved into former branches spot) */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-widest text-blue-400 mb-3.5">
              {t.footer.contactTitle}
            </h4>
            <ul className="space-y-3 text-xs text-slate-300 font-medium">
              <li className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">ცხელი ხაზი</div>
                  <a href="tel:+995599000000" className="font-bold text-white hover:text-blue-400 transition-colors">+995 599 00 00 00</a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">ელ-ფოსტა</div>
                  <a href="mailto:info@tbilisifa.ge" className="font-bold text-white hover:text-blue-400 transition-colors">info@tbilisifa.ge</a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">ცენტრალური ოფისი</div>
                  <span className="font-bold text-white">უნივერსიტეტის ქ. #6</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Social Media (სოციალური მედია - placed at the very end) */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-widest text-blue-400 mb-3.5">
              სოციალური მედია
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              გამოგვყევით სოციალურ ქსელებში და გაეცანით აკადემიის უახლეს ამბებს:
            </p>
            <div className="space-y-2.5">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-pink-500/40 text-slate-300 hover:text-white transition-all group shadow-2xs"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-black text-white group-hover:text-pink-400 transition-colors">Instagram</div>
                  <div className="text-[11px] text-slate-400">@tfilisifa</div>
                </div>
              </a>

              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/40 text-slate-300 hover:text-white transition-all group shadow-2xs"
              >
                <div className="w-8 h-8 rounded-lg bg-[#1877F2] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-black text-white group-hover:text-blue-400 transition-colors">Facebook</div>
                  <div className="text-[11px] text-slate-400">/tfilisifa</div>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>{t.footer.rights}</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 font-mono text-[11px]">EST. 2024 • TBILISI, GEORGIA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
