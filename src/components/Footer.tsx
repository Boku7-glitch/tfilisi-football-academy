'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#061325] text-white relative">

      {/* Blue & White Club Trim Bar */}
      <div className="club-trim-bar h-1 w-full relative z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-8 sm:pb-10 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 sm:pb-10 border-b border-slate-800">
          
          {/* Brand & Technical Partner */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10 md:gap-14">
            
            {/* Tfilisi Football Academy */}
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

          {/* Social Media Links (Pure icon buttons, no text labels, with WhatsApp) */}
          <div className="flex flex-col items-start lg:items-end gap-3">
            <div className="text-[11px] font-black uppercase tracking-widest text-blue-400">
              სოციალური მედია
            </div>
            <div className="flex items-center gap-3">
              
              {/* Instagram */}
              <a
                href="https://www.instagram.com/s.c.tfilisi/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-slate-900 hover:bg-pink-500/10 border-2 border-slate-800 hover:border-pink-500/60 flex items-center justify-center text-slate-300 hover:text-pink-400 transition-all shadow-xs hover:scale-105 active:scale-95 group"
                title="Instagram: s.c.tfilisi"
                aria-label="Instagram: s.c.tfilisi"
              >
                <svg className="w-5 h-5 fill-current transition-transform" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/tfilisifc/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-slate-900 hover:bg-blue-600/10 border-2 border-slate-800 hover:border-blue-500/60 flex items-center justify-center text-slate-300 hover:text-blue-400 transition-all shadow-xs hover:scale-105 active:scale-95 group"
                title="Facebook: Tfilisi • ტფილისი"
                aria-label="Facebook: Tfilisi • ტფილისი"
              >
                <svg className="w-5 h-5 fill-current transition-transform" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/995568939453"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-slate-900 hover:bg-emerald-500/10 border-2 border-slate-800 hover:border-emerald-500/60 flex items-center justify-center text-slate-300 hover:text-emerald-400 transition-all shadow-xs hover:scale-105 active:scale-95 group"
                title="WhatsApp: +995 568 93 94 53"
                aria-label="WhatsApp: +995 568 93 94 53"
              >
                <svg className="w-5 h-5 fill-current transition-transform" viewBox="0 0 24 24">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.07 16.3C4.24 14.98 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.05 20.15ZM16.57 14.33C16.32 14.21 15.1 13.61 14.88 13.52C14.65 13.44 14.49 13.4 14.32 13.65C14.16 13.9 13.69 14.45 13.55 14.61C13.41 14.78 13.26 14.8 13.02 14.68C12.77 14.55 11.98 14.3 11.04 13.46C10.31 12.81 9.81 12 9.67 11.75C9.52 11.51 9.65 11.37 9.78 11.25C9.89 11.14 10.02 10.96 10.15 10.82C10.27 10.67 10.31 10.57 10.39 10.4C10.47 10.24 10.43 10.1 10.37 9.98C10.31 9.85 9.82 8.65 9.61 8.16C9.41 7.68 9.21 7.74 9.06 7.73C8.92 7.73 8.76 7.72 8.59 7.72C8.43 7.72 8.16 7.78 7.94 8.02C7.71 8.27 7.08 8.86 7.08 10.06C7.08 11.27 7.96 12.43 8.08 12.6C8.21 12.76 9.81 15.24 12.28 16.3C12.87 16.55 13.32 16.7 13.68 16.82C14.27 17.01 14.81 16.98 15.24 16.92C15.71 16.85 16.69 16.33 16.9 15.74C17.1 15.15 17.1 14.65 17.04 14.55C16.98 14.44 16.82 14.45 16.57 14.33Z"/>
                </svg>
              </a>

            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex items-center justify-center text-xs text-slate-500 text-center">
          <p>{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
