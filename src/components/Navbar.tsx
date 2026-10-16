'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  ChevronDown, 
  LogIn, 
  MapPin, 
  Users, 
  Search, 
  X, 
  ArrowRight, 
  Award, 
  ShieldCheck, 
  Zap, 
  Sparkles 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { locationsData, teamGroupsData, coachesData, staffData } from '../data/mockData';

interface NavbarProps {
  onOpenAuthModal?: () => void;
}

export default function Navbar({ onOpenAuthModal }: NavbarProps) {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  // Live quick search results across all modules
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    const q = searchQuery.toLowerCase();
    
    const results: { title: string; category: string; href: string }[] = [];

    // Search Locations
    locationsData.forEach(loc => {
      if (loc.name.toLowerCase().includes(q) || loc.address.toLowerCase().includes(q)) {
        results.push({ title: `${loc.name} — ${loc.address}`, category: 'ლოკაცია / ცენტრი', href: '/locations' });
      }
    });

    // Search Squad Groups
    teamGroupsData.forEach(grp => {
      if (grp.name.toLowerCase().includes(q) || grp.category.toLowerCase().includes(q)) {
        results.push({ title: grp.name, category: 'ასაკობრივი ჯგუფი', href: '/groups' });
      }
    });

    // Search Coaches
    coachesData.forEach(c => {
      if (c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q) || c.specialty.toLowerCase().includes(q)) {
        results.push({ title: `${c.name} (${c.role})`, category: 'მწვრთნელი', href: '/coaches' });
      }
    });

    // Search Staff
    staffData.forEach(s => {
      if (s.name.toLowerCase().includes(q) || s.role.toLowerCase().includes(q)) {
        results.push({ title: `${s.name} (${s.role})`, category: 'სტაფი / მენეჯმენტი', href: '/staff' });
      }
    });

    return results.slice(0, 6);
  }, [searchQuery]);

  return (
    <header className="sticky top-0 z-50 transition-all shadow-md">
      
      {/* 1. GFF-Style Top Utility Strip */}
      <div className="bg-slate-100 border-b border-slate-200 text-slate-700 text-[11px] font-bold py-1 px-3.5 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Quick links to 6 Main Federation Modules */}
          <div className="hidden md:flex items-center gap-3.5 overflow-x-auto scrollbar-none py-0.5">
            <Link href="/#academy-dna" className="hover:text-blue-700 transition-colors flex items-center gap-1 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span>{language === 'ka' ? 'ტფილისის აკადემია' : 'Tfilisi Academy'}</span>
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/locations" className="hover:text-blue-700 transition-colors shrink-0">
              {language === 'ka' ? 'საფეხბურთო ცენტრები' : 'Football Centers'}
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/individual" className="hover:text-blue-700 transition-colors shrink-0">
              {language === 'ka' ? 'ინდივიდუალური მომზადება' : 'Individual Program'}
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/groups" className="hover:text-blue-700 transition-colors shrink-0">
              {language === 'ka' ? 'ჯგუფები' : 'Squads'}
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/coaches" className="hover:text-blue-700 transition-colors shrink-0">
              {language === 'ka' ? 'მწვრთნელები' : 'Coaches'}
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/staff" className="hover:text-blue-700 transition-colors shrink-0">
              {language === 'ka' ? 'სტაფი' : 'Staff'}
            </Link>
          </div>

          {/* Right utility items: News, Contact, Language Toggle */}
          <div className="flex items-center gap-3 ml-auto text-xs">
            <Link href="/news" className="hidden sm:inline-block hover:text-blue-700 transition-colors text-[11px] font-bold">
              {language === 'ka' ? 'სიახლეები' : 'News'}
            </Link>
            <span className="hidden sm:inline text-slate-300">|</span>
            <Link href="/contact" className="hover:text-blue-700 transition-colors text-[11px] font-bold">
              {language === 'ka' ? 'კონტაქტი' : 'Contact'}
            </Link>
            <span className="text-slate-300">|</span>
            
            {/* Language Switch */}
            <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-full border border-slate-200">
              <button
                type="button"
                onClick={() => setLanguage('ka')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-black transition-colors ${
                  language === 'ka' ? 'text-blue-700 underline' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                ქარ
              </button>
              <span className="text-slate-300 text-[10px]">/</span>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-black transition-colors ${
                  language === 'en' ? 'text-blue-700 underline' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                ENG
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Main Royal Blue Federation Header Bar (matching GFF screenshot architecture) */}
      <div className="bg-gradient-to-r from-[#0052ff] via-[#0047e0] to-[#061325] text-white">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2.5 sm:gap-6">
            
            {/* Left Area: Circular Official Wolf Crest + Hamburger Button */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <Link href="/" className="flex items-center gap-2.5 group">
                {/* Circular White Badge with Official Wolf/Spartan Crest */}
                <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white p-1.5 shadow-md flex items-center justify-center border-2 border-blue-200 group-hover:scale-105 transition-transform shrink-0">
                  <img
                    src="/logo/tfilisi-crest-navy.svg"
                    alt="ტფილისის საფეხბურთო აკადემია"
                    className="w-full h-full object-contain filter drop-shadow-xs"
                  />
                </div>
                <div className="hidden xl:flex flex-col text-white">
                  <span className="font-black text-sm tracking-tight leading-tight">
                    {language === 'ka' ? 'ტფილისი' : 'TFILISI'}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest font-extrabold text-blue-200">
                    {language === 'ka' ? 'საფეხბურთო აკადემია' : 'FOOTBALL ACADEMY'}
                  </span>
                </div>
              </Link>

              {/* GFF-Style 3-line Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-9 h-9 sm:w-10 sm:h-10 flex flex-col justify-center items-center gap-1.25 rounded-xl bg-white/10 hover:bg-white/20 transition-colors border border-white/20 text-white ml-0.5"
                aria-label="Toggle navigation"
                title="მენიუ"
              >
                <span className="block w-4.5 sm:w-5 h-0.5 bg-white rounded-full" />
                <span className="block w-4.5 sm:w-5 h-0.5 bg-white rounded-full" />
                <span className="block w-4.5 sm:w-5 h-0.5 bg-white rounded-full" />
              </button>
            </div>

            {/* Center Area: GFF-Style Pill Search Bar */}
            <div className="flex-1 max-w-xl relative">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                  placeholder={
                    language === 'ka'
                      ? 'ტფილისის საფეხბურთო აკადემია | ძიება...'
                      : 'Tfilisi Football Academy | Search...'
                  }
                  className="w-full bg-white rounded-full pl-4 sm:pl-6 pr-10 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 font-bold focus:outline-hidden focus:ring-2 focus:ring-sky-300 shadow-md transition-all"
                />
                
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                    <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-500" />
                  </div>
                )}
              </div>

              {/* Live Search Quick Results Dropdown */}
              {searchFocused && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 text-slate-900 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 px-3 py-1">
                    ძიების შედეგები ({searchResults.length})
                  </div>
                  <div className="divide-y divide-slate-100">
                    {searchResults.map((res, i) => (
                      <Link
                        key={i}
                        href={res.href}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50 transition-colors group"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                            {res.title}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400">
                            {res.category}
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Area: Portal Login & Trial Assessment CTA */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={onOpenAuthModal}
                className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-black uppercase tracking-wider bg-white/15 hover:bg-white/25 text-white border border-white/25 transition-all"
                title={t.navbar.login}
              >
                <LogIn className="w-3.5 h-3.5 text-sky-300" />
                <span>{t.navbar.login}</span>
              </button>

              <Link
                href="/contact"
                className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-black uppercase tracking-wider bg-white hover:bg-slate-100 text-[#0052ff] shadow-md transition-all active:scale-95 flex items-center gap-1.5"
              >
                <span>{language === 'ka' ? 'საცდელი ვარჯიში' : 'Trial Session'}</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Club Trim Bar Accent Strip */}
      <div className="club-trim-bar h-1 w-full" />

      {/* 4. Full Mobile Navigation Drawer (Displaying all 6 core modules) */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white/98 backdrop-blur-lg px-4 pt-4 pb-6 space-y-2 shadow-2xl max-h-[calc(100vh-80px)] overflow-y-auto animate-in slide-in-from-top-1 duration-200">
          
          {/* Mobile Language Switcher */}
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-600">ენა / Language:</span>
            <div className="flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200">
              <button
                type="button"
                onClick={() => setLanguage('ka')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  language === 'ka' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                ქართული
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  language === 'en' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* The 6 Core Modules in Mobile Drawer */}
          <div className="space-y-1">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 px-3 py-1">
              მთავარი განყოფილებები / MODULES
            </div>
            
            <Link
              href="/#academy-dna"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-blue-50 text-slate-800 font-bold text-sm"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>{language === 'ka' ? 'ტფილისის აკადემია' : 'Tfilisi Academy'}</span>
            </Link>

            <Link
              href="/locations"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-blue-50 text-slate-800 font-bold text-sm"
            >
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>{language === 'ka' ? 'აკადემიის საფეხბურთო ცენტრები' : 'Football Centers'}</span>
            </Link>

            <Link
              href="/individual"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-blue-50 text-slate-800 font-bold text-sm"
            >
              <Zap className="w-4 h-4 text-blue-600" />
              <span>{language === 'ka' ? 'ინდივიდუალური მომზადების პროგრამა' : 'Individual Program'}</span>
            </Link>

            <Link
              href="/groups"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-blue-50 text-slate-800 font-bold text-sm"
            >
              <Users className="w-4 h-4 text-blue-600" />
              <span>{language === 'ka' ? 'ჯგუფები და განრიგი' : 'Squad Categories'}</span>
            </Link>

            <Link
              href="/coaches"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-blue-50 text-slate-800 font-bold text-sm"
            >
              <Award className="w-4 h-4 text-blue-600" />
              <span>{language === 'ka' ? 'მწვრთნელები' : 'Coaching Staff'}</span>
            </Link>

            <Link
              href="/staff"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-blue-50 text-slate-800 font-bold text-sm"
            >
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>{language === 'ka' ? 'სტაფი და ადმინისტრაცია' : 'Staff & Administration'}</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenAuthModal) onOpenAuthModal();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4 text-sky-300" />
              <span>{t.navbar.login}</span>
            </button>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 text-center"
            >
              <span>{language === 'ka' ? 'საცდელი ვარჯიშის რეგისტრაცია' : 'Register for Trial'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      )}

    </header>
  );
}
