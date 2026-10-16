'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MatchdayTicker from '../components/MatchdayTicker';
import TacticalPitchPathway from '../components/TacticalPitchPathway';
import AcademyDNA from '../components/AcademyDNA';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import FluidWaveBackground from '../components/FluidWaveBackground';
import { 
  Users, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  Newspaper,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { newsData, locationsData } from '../data/mockData';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';

function HomePageContent() {
  const { language, t } = useLanguage();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [activeLocation, setActiveLocation] = useState('saburtalo');

  const latestNews = newsData.slice(0, 3);

  const getArticleTitle = (id: string, def: string) => {
    if (language === 'ka') return def;
    if (id === '1') return 'Autumn Season Admissions: Open for 2012–2019 Squads';
    if (id === '2') return 'New Branch in Saburtalo: Modern Pitch for Youth Squads';
    return 'Tfilisi Academy U-12 Reaches the Golden Cup Final';
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <Navbar onOpenAuthModal={() => setAuthModalOpen(true)} />

      {/* Matchday Live Ticker Bar */}
      <MatchdayTicker />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero onRegisterClick={() => window.location.href = '/contact'} />

        {/* Unique Feature 1: Interactive Tactical Pitch & Development Pathway */}
        <TacticalPitchPathway />

        {/* 1. Uncluttered Groups & Locations Teaser (Athletic Club Matrix) */}
        <section className="py-10 sm:py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3">
              <div>
                <div className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-blue-600 uppercase mb-1">
                  // 01. SQUADS & FORMATION
                </div>
                <h2 className="text-xl sm:text-3xl font-black text-[#061325] tracking-tight">
                  {language === 'ka' ? 'ასაკობრივი ჯგუფები და განრიგი' : 'Squad Categories & Weekly Matrix'}
                </h2>
              </div>

              {/* View Full Schedule Link */}
              <Link
                href="/groups"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black uppercase tracking-wider text-blue-600 hover:text-blue-700 transition-colors group self-start sm:self-auto"
              >
                <span>{language === 'ka' ? 'სრული განრიგის ნახვა' : 'View Full Schedule'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Athletic Location selector tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-none">
              {locationsData.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setActiveLocation(loc.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all border shrink-0 ${
                    activeLocation === loc.id
                      ? 'bg-[#061325] text-white border-[#061325] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  {language === 'ka' ? loc.name : loc.id === 'saburtalo' ? 'Saburtalo' : loc.id === 'varketili' ? 'Varketili' : 'Dinamo Base'}
                </button>
              ))}
            </div>

            {/* 4 Athletic Squad Cards + 1 Individual Card in Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
              
              <Link
                href="/groups"
                className="p-4 rounded-xl border border-slate-200 hover:border-blue-600 bg-white hover:bg-slate-50/50 transition-all group shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider">
                      U-14 SQUAD
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">2012–2013</span>
                  </div>
                  <div className="text-sm font-black text-[#061325] group-hover:text-blue-600 transition-colors">
                    2012 - 2013 {language === 'ka' ? 'წლიანები' : 'Birth Years'}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {language === 'ka' ? '12 - 14 წელი · ჩემპიონატი & ტაქტიკური მომზადება' : 'Ages 12-14 · League Tournaments & Tactics'}
                  </div>
                </div>
                <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black uppercase tracking-wider text-blue-600">
                  <span>{language === 'ka' ? 'განრიგი & ჩაწერა' : 'Schedule & Roster'}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/groups"
                className="p-4 rounded-xl border border-slate-200 hover:border-blue-600 bg-white hover:bg-slate-50/50 transition-all group shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider">
                      U-12 SQUAD
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">2014–2015</span>
                  </div>
                  <div className="text-sm font-black text-[#061325] group-hover:text-blue-600 transition-colors">
                    2014 - 2015 {language === 'ka' ? 'წლიანები' : 'Birth Years'}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {language === 'ka' ? '10 - 12 წელი · ბურთის ფლობა & გუნდური თამაში' : 'Ages 10-12 · Ball Mastery & Match IQ'}
                  </div>
                </div>
                <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black uppercase tracking-wider text-blue-600">
                  <span>{language === 'ka' ? 'განრიგი & ჩაწერა' : 'Schedule & Roster'}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/groups"
                className="p-4 rounded-xl border border-slate-200 hover:border-blue-600 bg-white hover:bg-slate-50/50 transition-all group shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider">
                      U-10 SQUAD
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">2016–2017</span>
                  </div>
                  <div className="text-sm font-black text-[#061325] group-hover:text-blue-600 transition-colors">
                    2016 - 2017 {language === 'ka' ? 'წლიანები' : 'Birth Years'}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {language === 'ka' ? '8 - 10 წელი · მოტორიკა & ძირითადი უნარები' : 'Ages 8-10 · Coordination & Technical Agility'}
                  </div>
                </div>
                <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black uppercase tracking-wider text-blue-600">
                  <span>{language === 'ka' ? 'განრიგი & ჩაწერა' : 'Schedule & Roster'}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/individual"
                className="p-4 rounded-xl border-2 border-blue-600 bg-blue-50/30 hover:bg-blue-50/60 transition-all group shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-black text-blue-700 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-blue-600" />
                      <span>1-ON-1 MASTERCLASS</span>
                    </span>
                    <span className="text-[9px] font-mono font-bold text-blue-600">ELITE</span>
                  </div>
                  <div className="text-sm font-black text-[#061325] group-hover:text-blue-600 transition-colors">
                    {language === 'ka' ? 'პერსონალური მწვრთნელი' : 'Individual Coaching'}
                  </div>
                  <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {language === 'ka' ? 'ტექნიკა, სისწრაფე და მეკარის ინდივიდუალური სკოლა' : 'Speed, ball control & goalkeeper specialization'}
                  </div>
                </div>
                <div className="pt-3 mt-4 border-t border-blue-200 flex items-center justify-between text-xs font-black uppercase tracking-wider text-blue-700">
                  <span>{language === 'ka' ? 'სესიის დაჯავშნა' : 'Book Session'}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

            </div>

          </div>
        </section>

        {/* Unique Feature 2: Club Football DNA & 4 Pillars */}
        <AcademyDNA />

        {/* 2. Uncluttered News / Highlights Preview (Sports Journalism Editorial) */}
        <section className="py-10 sm:py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3">
              <div>
                <div className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-blue-600 uppercase mb-1">
                  // 02. CLUB DISPATCHES & REPORTS
                </div>
                <h2 className="text-xl sm:text-3xl font-black text-[#061325] tracking-tight">
                  {language === 'ka' ? 'უახლესი მოვლენები & მატჩები' : 'Latest News & Match Reports'}
                </h2>
              </div>

              <Link
                href="/news"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black uppercase tracking-wider text-blue-600 hover:text-blue-700 transition-colors group self-start sm:self-auto"
              >
                <span>{language === 'ka' ? 'ყველა სიახლე' : 'All News'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {latestNews.map((item) => (
                <Link
                  key={item.id}
                  href="/news"
                  className="bg-white rounded-xl border border-slate-200 hover:border-blue-600 overflow-hidden shadow-xs transition-all flex flex-col group"
                >
                  <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-[#061325] text-white border border-slate-700">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-slate-400 mb-1">{item.date}</div>
                      <h3 className="text-xs sm:text-sm font-black text-[#061325] group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        {getArticleTitle(item.id, item.title)}
                      </h3>
                    </div>
                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black uppercase tracking-wider text-blue-600">
                      <span>{language === 'ka' ? 'სრულად წაკითხვა' : 'Read Report'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>

        {/* 3. Official Academy Assessment Banner (Athletic Deep Navy Fluid Wave Edition) */}
        <section className="py-8 sm:py-14 bg-white">
          <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
            <div className="bg-[#061325] rounded-2xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-blue-600/40 shadow-xl relative overflow-hidden">
              <FluidWaveBackground variant="navy" />
              
              {/* Blue & White Club Trim Bar Accent */}
              <div className="club-trim-bar h-1.5 w-full absolute top-0 left-0 right-0 z-10" />

              <div className="space-y-2 text-center md:text-left relative z-10">
                <span className="inline-block px-2.5 py-0.5 rounded bg-blue-600 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest">
                  {language === 'ka' ? 'უფასო საცდელი ვარჯიში' : 'Official Trial Assessment'}
                </span>
                <h3 className="text-xl sm:text-3xl font-black tracking-tight">
                  {language === 'ka' ? 'ჩაწერეთ ბავშვი „ტფილისის“ აკადემიაში' : 'Enroll Your Child at Tfilisi Academy'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                  {language === 'ka'
                    ? 'შეავსეთ მოკლე ანკეტა და ჩვენი მენეჯერი 24 საათში დაგიკავშირდებათ საცდელი ვარჯიშის დროის შესათანხმებლად.'
                    : 'Fill out our quick application form and our team will get in touch within 24 hours to schedule a trial session.'}
                </p>
              </div>

              <Link
                href="/contact"
                className="w-full md:w-auto px-8 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-sm transition-all active:scale-95 shrink-0 text-center"
              >
                {language === 'ka' ? 'ანკეტის შევსება ➔' : 'Apply Online ➔'}
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <HomePageContent />
    </LanguageProvider>
  );
}
