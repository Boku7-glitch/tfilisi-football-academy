'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { LanguageProvider, useLanguage } from '../../context/LanguageContext';
import { coachesData } from '../../data/mockData';
import { Award, Calendar, CheckCircle2, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import Link from 'next/link';

function CoachesPageContent() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar onOpenAuthModal={() => {}} />

      <main className="flex-1 bg-white">
        {/* Header Hero */}
        <section className="py-12 sm:py-16 bg-[#061325] text-white border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 rounded bg-blue-600 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest mb-3">
                {language === 'ka' ? 'სამწვრთნელო შტაბი' : 'COACHING STAFF'}
              </span>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                {language === 'ka' ? 'აკადემიის მწვრთნელები' : 'UEFA Certified Youth Coaches'}
              </h1>
              <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                {language === 'ka'
                  ? 'ჩვენი ყველა მწვრთნელი ფლობს UEFA-ს ოფიციალურ სალიცენზიო კატეგორიას (UEFA A & B Youth) და სპეციალიზებულია მოზარდთა ასაკობრივ განვითარებაზე.'
                  : 'Every academy coach holds an accredited UEFA license with verified expertise in child psychology, motor coordination, and modern tactical development.'}
              </p>
            </div>
          </div>
        </section>

        {/* Coaches Grid */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {coachesData.map((coach) => (
                <div
                  key={coach.id}
                  className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm hover:border-blue-600 hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top Coach Card Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div className="w-12 h-12 rounded-xl bg-[#061325] flex items-center justify-center p-2 border border-blue-500">
                        <img
                          src="/logo/tfilisi-crest-white.svg"
                          alt="TFA Crest"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-mono text-[11px] font-black uppercase tracking-wider border border-blue-200">
                        {coach.license}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-[#061325] mt-4 tracking-tight">
                      {coach.name}
                    </h3>
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mt-0.5">
                      {coach.role}
                    </p>

                    <div className="mt-4 space-y-2 text-xs text-slate-600">
                      <div className="flex items-start gap-2">
                        <Award className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span><strong>გამოცდილება:</strong> {coach.experience}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>სპეციალიზაცია:</strong> {coach.specialty}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <span><strong>სამუშაო გრაფიკი:</strong> {coach.availableDays}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <Link
                      href="/contact"
                      className="w-full py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                    >
                      <span>{language === 'ka' ? 'ჯგუფში ჩაწერა' : 'Book a Session'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function CoachesPage() {
  return (
    <LanguageProvider>
      <CoachesPageContent />
    </LanguageProvider>
  );
}
