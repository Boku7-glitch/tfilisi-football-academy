'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  ChevronDown, 
  LogIn, 
  MapPin, 
  Sparkles, 
  Users 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onOpenAuthModal?: () => void;
}

export default function Navbar({ onOpenAuthModal }: NavbarProps) {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileGroupsOpen, setMobileGroupsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleMouseEnter = (menu: string) => {
    setOpenDropdown(menu);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-linear-to-br from-blue-700 to-blue-900 flex items-center justify-center text-white shadow-md shadow-blue-500/15 group-hover:scale-105 transition-transform border border-blue-400/30">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white/10" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors leading-tight">
                {language === 'ka' ? 'ტფილისის' : 'TFILISI'}
              </span>
              <span className="text-[9px] sm:text-[11px] uppercase tracking-wider font-bold text-blue-700">
                {language === 'ka' ? 'საფეხბურთო აკადემია' : 'FOOTBALL ACADEMY'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (Toca Football Dropdown Style) */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              href="/"
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-blue-700 rounded-lg hover:bg-blue-50/60 transition-colors"
            >
              {t.navbar.home}
            </Link>

            {/* Teams & Age Groups Dropdown (Toca inspired) */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('teams')}
              onMouseLeave={handleMouseLeave}
            >
              <Link 
                href="/groups"
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  openDropdown === 'teams' ? 'text-blue-700 bg-blue-50' : 'text-slate-700 hover:text-blue-700 hover:bg-blue-50/60'
                }`}
              >
                <span>{t.navbar.teamsAges}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === 'teams' ? 'rotate-180 text-blue-700' : 'text-slate-400'}`} />
              </Link>

              {openDropdown === 'teams' && (
                <div className="absolute top-full left-0 w-84 bg-white rounded-2xl shadow-xl border border-blue-100 p-2.5 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-blue-800 px-3 py-1.5">
                    {t.navbar.teamsDropdownTitle}
                  </div>
                  <div className="space-y-0.5">
                    <Link
                      href="/groups"
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-blue-50/80 transition-colors group"
                    >
                      <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-colors shrink-0">
                        <Users className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">2012 - 2013 (U-14)</div>
                        <div className="text-[11px] text-slate-500 leading-tight">{t.navbar.u14Desc}</div>
                      </div>
                    </Link>

                    <Link
                      href="/groups"
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-blue-50/80 transition-colors group"
                    >
                      <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-colors shrink-0">
                        <Users className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">2014 - 2015 (U-12)</div>
                        <div className="text-[11px] text-slate-500 leading-tight">{t.navbar.u12Desc}</div>
                      </div>
                    </Link>

                    <Link
                      href="/groups"
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-blue-50/80 transition-colors group"
                    >
                      <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-colors shrink-0">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">2016 - 2017 (U-10)</div>
                        <div className="text-[11px] text-slate-500 leading-tight">{t.navbar.u10Desc}</div>
                      </div>
                    </Link>

                    <Link
                      href="/groups"
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-blue-50/80 transition-colors group"
                    >
                      <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-colors shrink-0">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">2018 - 2019 (U-8)</div>
                        <div className="text-[11px] text-slate-500 leading-tight">{t.navbar.u8Desc}</div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Locations Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('locations')}
              onMouseLeave={handleMouseLeave}
            >
              <Link 
                href="/locations"
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  openDropdown === 'locations' ? 'text-blue-700 bg-blue-50' : 'text-slate-700 hover:text-blue-700 hover:bg-blue-50/60'
                }`}
              >
                <span>{t.navbar.locations}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === 'locations' ? 'rotate-180 text-blue-700' : 'text-slate-400'}`} />
              </Link>

              {openDropdown === 'locations' && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-blue-100 p-2.5 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-blue-800 px-3 py-1.5">
                    {t.navbar.locationsDropdownTitle}
                  </div>
                  <div className="space-y-0.5">
                    <Link
                      href="/locations"
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-blue-50 text-slate-800 hover:text-blue-700 transition-colors"
                    >
                      <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold">{t.navbar.saburtaloName}</div>
                        <div className="text-[11px] text-slate-400">{t.navbar.saburtaloAddr}</div>
                      </div>
                    </Link>
                    <Link
                      href="/locations"
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-blue-50 text-slate-800 hover:text-blue-700 transition-colors"
                    >
                      <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold">{t.navbar.varketiliName}</div>
                        <div className="text-[11px] text-slate-400">{t.navbar.varketiliAddr}</div>
                      </div>
                    </Link>
                    <Link
                      href="/locations"
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-blue-50 text-slate-800 hover:text-blue-700 transition-colors"
                    >
                      <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold">{t.navbar.dinamoName}</div>
                        <div className="text-[11px] text-slate-400">{t.navbar.dinamoAddr}</div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/groups"
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-blue-700 rounded-lg hover:bg-blue-50/60 transition-colors"
            >
              {t.navbar.schedule}
            </Link>

            <Link
              href="/individual"
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-blue-700 rounded-lg hover:bg-blue-50/60 transition-colors"
            >
              {t.navbar.individual}
            </Link>

            <Link
              href="/news"
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-blue-700 rounded-lg hover:bg-blue-50/60 transition-colors"
            >
              {t.navbar.news}
            </Link>

            <Link
              href="/contact"
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-blue-700 rounded-lg hover:bg-blue-50/60 transition-colors"
            >
              {t.navbar.contact}
            </Link>
          </nav>

          {/* Right Area: Language Switcher (Desktop only) + Full Login Button + Animated Hamburger */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Language Switcher Pill - DESKTOP ONLY as requested (removed from mobile header) */}
            <div className="hidden lg:flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200">
              <button
                type="button"
                onClick={() => setLanguage('ka')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                  language === 'ka'
                    ? 'bg-blue-700 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-blue-700'
                }`}
              >
                ქარ
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                  language === 'en'
                    ? 'bg-blue-700 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-blue-700'
                }`}
              >
                EN
              </button>
            </div>

            {/* FULL Login Button with Door Entry Icon - Always visible with full text! */}
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold bg-white text-blue-700 border-1.5 border-blue-600 hover:bg-blue-600 hover:text-white shadow-2xs hover:shadow-xs transition-all active:scale-95 shrink-0"
              title={t.navbar.login}
            >
              <LogIn className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 group-hover:text-white" />
              <span>{t.navbar.login}</span>
            </button>

            {/* Smooth Animated Hamburger Icon (Transforms 3 lines smoothly into an X) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.25 rounded-xl hover:bg-slate-100 transition-colors p-1 border border-slate-200/60"
              aria-label="Toggle navigation"
            >
              <span
                className={`block w-4.5 h-0.5 bg-slate-800 rounded-full transition-all duration-300 ease-in-out ${
                  mobileMenuOpen ? 'rotate-45 translate-y-1.75 bg-blue-700' : ''
                }`}
              />
              <span
                className={`block w-4.5 h-0.5 bg-slate-800 rounded-full transition-all duration-200 ease-in-out ${
                  mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                }`}
              />
              <span
                className={`block w-4.5 h-0.5 bg-slate-800 rounded-full transition-all duration-300 ease-in-out ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-1.75 bg-blue-700' : ''
                }`}
              />
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer with Language Switcher */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-lg px-4 pt-3 pb-6 space-y-1.5 shadow-xl max-h-[calc(100vh-70px)] overflow-y-auto animate-in slide-in-from-top-1 duration-200">
          
          {/* Language Switcher inside the mobile drawer (exactly where user requested!) */}
          <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-500">ენა / Language:</span>
            <div className="flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200">
              <button
                type="button"
                onClick={() => setLanguage('ka')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  language === 'ka' ? 'bg-blue-700 text-white shadow-2xs' : 'text-slate-600'
                }`}
              >
                ქართული
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  language === 'en' ? 'bg-blue-700 text-white shadow-2xs' : 'text-slate-600'
                }`}
              >
                English
              </button>
            </div>
          </div>

          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-700 rounded-lg"
          >
            {t.navbar.home}
          </Link>

          <div>
            <button
              onClick={() => setMobileGroupsOpen(!mobileGroupsOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-700 rounded-lg"
            >
              <span>{t.navbar.teamsAges}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileGroupsOpen ? 'rotate-180 text-blue-700' : ''}`} />
            </button>
            {mobileGroupsOpen && (
              <div className="pl-3 pr-2 py-1.5 space-y-1 bg-blue-50/50 rounded-lg my-1 border border-blue-100 animate-in fade-in">
                <Link
                  href="/groups"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-1.5 text-xs font-bold text-slate-800 hover:text-blue-700"
                >
                  2012 - 2013 (U-14)
                </Link>
                <Link
                  href="/groups"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-1.5 text-xs font-bold text-slate-800 hover:text-blue-700"
                >
                  2014 - 2015 (U-12)
                </Link>
                <Link
                  href="/groups"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-1.5 text-xs font-bold text-slate-800 hover:text-blue-700"
                >
                  2016 - 2017 (U-10)
                </Link>
                <Link
                  href="/groups"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-1.5 text-xs font-bold text-slate-800 hover:text-blue-700"
                >
                  2018 - 2019 (U-8)
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/locations"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-700 rounded-lg"
          >
            {t.navbar.locations}
          </Link>
          <Link
            href="/individual"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-700 rounded-lg"
          >
            {t.navbar.individual}
          </Link>
          <Link
            href="/news"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-700 rounded-lg"
          >
            {t.navbar.news}
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-700 rounded-lg"
          >
            {t.navbar.contact}
          </Link>
        </div>
      )}
    </header>
  );
}
