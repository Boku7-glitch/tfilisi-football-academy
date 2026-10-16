'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
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

      <main className="flex-1">
        {/* Hero Section */}
        <Hero onRegisterClick={() => window.location.href = '/contact'} />

        {/* 1. Uncluttered Groups & Locations Teaser (Matches Mockup) */}
        <section className="py-10 sm:py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2">
                  <Users className="w-3 h-3" />
                  <span>{language === 'ka' ? 'ჯგუფებისა და ლოკაციების ანონსი' : 'Squads & Locations Preview'}</span>
                </div>
                <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {language === 'ka' ? 'იპოვე შენი გუნდი ასაკის მიხედვით' : 'Find Your Squad by Age'}
                </h2>
              </div>

              {/* View Full Schedule Link */}
              <Link
                href="/groups"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-700 hover:text-blue-800 transition-colors group self-start sm:self-auto"
              >
                <span>{language === 'ka' ? 'სრული განრიგის ნახვა' : 'View Full Schedule'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Location selector pills */}
            <div className="flex gap-1.5 mb-5 overflow-x-auto pb-1 scrollbar-none">
              {locationsData.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setActiveLocation(loc.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shrink-0 ${
                    activeLocation === loc.id
                      ? 'bg-blue-700 text-white border-blue-700 shadow-2xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-300'
                  }`}
                >
                  {language === 'ka' ? loc.name : loc.id === 'saburtalo' ? 'Saburtalo' : loc.id === 'varketili' ? 'Varketili' : 'Dinamo Base'}
                </button>
              ))}
            </div>

            {/* 4 Clean Age Cards + 1 Individual Card in Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              
              <Link
                href="/groups"
                className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 bg-slate-50/50 hover:bg-white transition-all group shadow-2xs"
              >
                <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wider mb-1">
                  U-14 SQUAD
                </div>
                <div className="text-sm font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                  2012 - 2013 {language === 'ka' ? 'წლიანები' : 'Birth Years'}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {language === 'ka' ? '12 - 14 წელი · ჩემპიონატი & ტაქტიკა' : 'Ages 12-14 · League Tournaments'}
                </div>
                <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-blue-700">
                  <span>{language === 'ka' ? 'განრიგი' : 'Schedule'}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/groups"
                className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 bg-slate-50/50 hover:bg-white transition-all group shadow-2xs"
              >
                <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wider mb-1">
                  U-12 SQUAD
                </div>
                <div className="text-sm font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                  2014 - 2015 {language === 'ka' ? 'წლიანები' : 'Birth Years'}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {language === 'ka' ? '10 - 12 წელი · ტექნიკა & გუნდური თამაში' : 'Ages 10-12 · Technique Mastery'}
                </div>
                <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-blue-700">
                  <span>{language === 'ka' ? 'განრიგი' : 'Schedule'}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/groups"
                className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 bg-slate-50/50 hover:bg-white transition-all group shadow-2xs"
              >
                <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wider mb-1">
                  U-10 SQUAD
                </div>
                <div className="text-sm font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                  2016 - 2017 {language === 'ka' ? 'წლიანები' : 'Birth Years'}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {language === 'ka' ? '8 - 10 წელი · მოტორიკა & უნარები' : 'Ages 8-10 · Coordination & Skills'}
                </div>
                <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-blue-700">
                  <span>{language === 'ka' ? 'განრიგი' : 'Schedule'}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/individual"
                className="p-4 rounded-xl border border-blue-200 hover:border-blue-500 bg-blue-50/50 hover:bg-blue-50 transition-all group shadow-2xs"
              >
                <div className="text-[10px] font-bold text-blue-800 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  <span>{language === 'ka' ? 'ინდივიდუალური' : '1-on-1 TRAINING'}</span>
                </div>
                <div className="text-sm font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {language === 'ka' ? 'პერსონალური მწვრთნელი' : 'Personal Coaching'}
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  {language === 'ka' ? 'ტექნიკა, სისწრაფე და მეკარის სკოლა' : 'Speed, ball mastery & goalkeeper'}
                </div>
                <div className="pt-3 mt-3 border-t border-blue-200/60 flex items-center justify-between text-xs font-bold text-blue-700">
                  <span>{language === 'ka' ? 'ჩაწერა & ჯავშანი' : 'Book Session'}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

            </div>

          </div>
        </section>

        {/* 2. Uncluttered News / Highlights Preview */}
        <section className="py-10 sm:py-16 bg-slate-50/60">
          <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2">
                  <Newspaper className="w-3 h-3" />
                  <span>{language === 'ka' ? 'აკადემიის სიახლეები' : 'Academy Highlights'}</span>
                </div>
                <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {language === 'ka' ? 'უახლესი მოვლენები & მატჩები' : 'Latest News & Match Reports'}
                </h2>
              </div>

              <Link
                href="/news"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-700 hover:text-blue-800 transition-colors group self-start sm:self-auto"
              >
                <span>{language === 'ka' ? 'ყველა სიახლე' : 'All News'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5">
              {latestNews.map((item) => (
                <Link
                  key={item.id}
                  href="/news"
                  className="bg-white rounded-xl border border-slate-200 hover:border-blue-500 overflow-hidden shadow-2xs hover:shadow-xs transition-all flex flex-col group"
                >
                  <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[9px] font-bold bg-white/95 text-blue-700 backdrop-blur-xs border border-blue-200">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 mb-1">{item.date}</div>
                      <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                        {getArticleTitle(item.id, item.title)}
                      </h3>
                    </div>
                    <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
                      <span>{language === 'ka' ? 'სრულად' : 'Read'}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>

        {/* 3. Clean Trial Session Enrollment Banner */}
        <section className="py-8 sm:py-14 bg-white">
          <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
            <div className="bg-linear-to-r from-blue-700 to-blue-900 rounded-2xl p-5 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg shadow-blue-600/15">
              <div className="space-y-1.5 text-center md:text-left">
                <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-sky-200">
                  {language === 'ka' ? 'უფასო საცდელი ვარჯიში' : 'Free Trial Session'}
                </span>
                <h3 className="text-lg sm:text-2xl font-black">
                  {language === 'ka' ? 'ჩაწერეთ ბავშვი „ტფილისის“ აკადემიაში' : 'Enroll Your Child at Tfilisi Academy'}
                </h3>
                <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
                  {language === 'ka'
                    ? 'შეავსეთ მოკლე ანკეტა და ჩვენი მენეჯერი 24 საათში დაგიკავშირდებათ საცდელი ვარჯიშის დროის შესათანხმებლად.'
                    : 'Fill out our quick application form and our team will get in touch within 24 hours to schedule a trial session.'}
                </p>
              </div>

              <Link
                href="/contact"
                className="w-full md:w-auto px-6 py-3 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95 shrink-0 text-center"
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
