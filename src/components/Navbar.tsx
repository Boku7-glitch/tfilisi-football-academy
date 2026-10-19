'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LogIn, 
  MapPin, 
  Users, 
  Award, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Newspaper,
  Phone,
  LogOut,
  Shield,
  User
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAcademy } from '../context/AcademyContext';

interface NavbarProps {
  onOpenAuthModal?: () => void;
}

export default function Navbar({ onOpenAuthModal }: NavbarProps) {
  const { language, t } = useLanguage();
  const { currentUser, logout } = useAcademy();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 transition-all shadow-md">
      
      {/* Main Royal Blue Header Bar */}
      <div className="bg-gradient-to-r from-[#0052ff] via-[#0047e0] to-[#061325] text-white">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
            
            {/* Left Area: Circular Official Wolf Crest + Smooth Animated Burger Button */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white p-1.5 shadow-md flex items-center justify-center border-2 border-blue-200 group-hover:scale-105 transition-transform shrink-0">
                  <img
                    src="/logo/tfilisi-crest-navy.svg"
                    alt="ტფილისის საფეხბურთო აკადემია"
                    className="w-full h-full object-contain filter drop-shadow-xs"
                  />
                </div>
              </Link>

              {/* Ultra-Smooth Animated Hamburger Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="burger-menu-btn ml-0.5"
                aria-label={mobileMenuOpen ? 'მენიუს დახურვა' : 'მენიუს გახსნა'}
                title="მენიუ"
              >
                <div className="burger-icon-container">
                  <span className={`burger-pill burger-pill-top ${mobileMenuOpen ? 'active' : ''}`} />
                  <span className={`burger-pill burger-pill-middle ${mobileMenuOpen ? 'active' : ''}`} />
                  <span className={`burger-pill burger-pill-bottom ${mobileMenuOpen ? 'active' : ''}`} />
                </div>
              </button>
            </div>

            {/* Center Area: Plain Centered Title as requested by user */}
            <div className="flex-1 flex items-center justify-center text-center px-2">
              <h1 className="text-sm sm:text-base md:text-xl lg:text-2xl font-black text-white tracking-wide uppercase select-none leading-tight truncate">
                საფეხბურთო აკადემია ტფილისი
              </h1>
            </div>

            {/* Right Area: Equal width spacer or Portal Login */}
            <div className="flex items-center justify-end shrink-0 min-w-[70px] sm:min-w-[90px] gap-2">
              {currentUser ? (
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Link
                    href={currentUser.role === 'admin' ? '/admin' : currentUser.role === 'coach' ? '/admin?view=coach' : '/portal'}
                    className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all text-xs font-bold"
                    title={currentUser.name}
                  >
                    <div className="w-6 h-6 rounded-lg bg-blue-500 text-white flex items-center justify-center text-[10px] font-black">
                      {currentUser.avatar || 'U'}
                    </div>
                    <span className="hidden md:inline text-[11px] font-black tracking-wide truncate max-w-[110px]">
                      {currentUser.role === 'coach' ? 'მწვრთნელი' : 'კაბინეტი'}
                    </span>
                  </Link>

                  <button
                    type="button"
                    onClick={logout}
                    className="w-8 h-8 rounded-xl bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-red-300 border border-white/10 transition-colors flex items-center justify-center"
                    title="გამოსვლა"
                    aria-label="გამოსვლა"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : onOpenAuthModal ? (
                <button
                  type="button"
                  onClick={onOpenAuthModal}
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all ml-auto hover:scale-105 active:scale-95 group shadow-xs"
                  title={t.navbar.login}
                  aria-label={t.navbar.login}
                >
                  <LogIn className="w-4 h-4 text-sky-300 group-hover:text-white transition-colors" />
                </button>
              ) : null}
            </div>

          </div>
        </div>
      </div>

      {/* Club Trim Bar Accent Strip */}
      <div className="club-trim-bar h-1 w-full" />

      {/* Full Mobile Navigation Drawer with Smooth Slide-Down & Slide-Up Accordion */}
      <div
        className={`mobile-menu-drawer-wrapper ${mobileMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-menu-drawer-inner">
          <div className="border-t border-slate-200 bg-white/98 backdrop-blur-lg px-4 pt-4 pb-6 space-y-2 shadow-2xl max-h-[calc(100vh-80px)] overflow-y-auto">

            {/* User Profile / Portal Link in Drawer */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 mb-2">
              {currentUser ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                      {currentUser.avatar || 'U'}
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">{currentUser.name}</div>
                      <div className="text-[10px] text-blue-600 font-bold uppercase">
                        {currentUser.role === 'coach' ? 'მწვრთნელი / მენეჯერი' : 'მშობელი'}
                      </div>
                    </div>
                  </div>
                  <Link
                    href={currentUser.role === 'coach' ? '/admin' : '/portal'}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-[11px] font-bold"
                  >
                    პორტალი
                  </Link>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenAuthModal) onOpenAuthModal();
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>პირადი კაბინეტი / ავტორიზაცია</span>
                </button>
              )}
            </div>

            {/* The 6 Core Modules in Mobile Drawer */}
            <div className="space-y-1">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 px-3 py-1">
                მთავარი განყოფილებები
              </div>
              
              <Link
                href="/academy"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-blue-50 text-slate-800 font-bold text-sm transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>{language === 'ka' ? 'ტფილისის აკადემია' : 'Tfilisi Academy'}</span>
              </Link>

              <Link
                href="/locations"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-blue-50 text-slate-800 font-bold text-sm transition-colors"
              >
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>{language === 'ka' ? 'აკადემიის საფეხბურთო ცენტრები' : 'Football Centers'}</span>
              </Link>

              <Link
                href="/individual"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-blue-50 text-slate-800 font-bold text-sm transition-colors"
              >
                <Zap className="w-4 h-4 text-blue-600" />
                <span>{language === 'ka' ? 'ინდივიდუალური მომზადების პროგრამა' : 'Individual Program'}</span>
              </Link>

              <Link
                href="/groups"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-blue-50 text-slate-800 font-bold text-sm transition-colors"
              >
                <Users className="w-4 h-4 text-blue-600" />
                <span>{language === 'ka' ? 'ჯგუფები და განრიგი' : 'Squad Categories'}</span>
              </Link>

              <Link
                href="/coaches"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-blue-50 text-slate-800 font-bold text-sm transition-colors"
              >
                <Award className="w-4 h-4 text-blue-600" />
                <span>{language === 'ka' ? 'მწვრთნელები' : 'Coaching Staff'}</span>
              </Link>

              <Link
                href="/staff"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-blue-50 text-slate-800 font-bold text-sm transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>{language === 'ka' ? 'სტაფი და ადმინისტრაცია' : 'Staff & Administration'}</span>
              </Link>
            </div>

            {/* Extra Links: News & Contact */}
            <div className="pt-2 border-t border-slate-100 space-y-1">
              <Link
                href="/news"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-blue-50 text-slate-700 font-bold text-xs transition-colors"
              >
                <Newspaper className="w-4 h-4 text-slate-400" />
                <span>{language === 'ka' ? 'სიახლეები & რეპორტაჟები' : 'News & Reports'}</span>
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-blue-50 text-slate-700 font-bold text-xs transition-colors"
              >
                <Phone className="w-4 h-4 text-slate-400" />
                <span>{language === 'ka' ? 'კონტაქტი & ლოკაციები' : 'Contact Us'}</span>
              </Link>
            </div>

            {/* Trial Registration CTA */}
            <div className="pt-2">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 text-center transition-colors shadow-sm"
              >
                <span>{language === 'ka' ? 'საცდელი ვარჯიშის რეგისტრაცია' : 'Register for Trial'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </div>

    </header>
  );
}
