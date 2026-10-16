'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import MatchdayTicker from '../../components/MatchdayTicker';
import FluidWaveBackground from '../../components/FluidWaveBackground';
import { LanguageProvider, useLanguage } from '../../context/LanguageContext';
import { staffData } from '../../data/mockData';
import { ShieldCheck, Phone, Mail, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

function StaffPageContent() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar onOpenAuthModal={() => {}} />
      <MatchdayTicker />

      <main className="flex-1">
        {/* Header Hero */}
        <section className="relative py-12 sm:py-16 bg-[#061325] text-white overflow-hidden border-b border-slate-800">
          <FluidWaveBackground variant="navy" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 rounded bg-blue-600 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest mb-3">
                {language === 'ka' ? 'აკადემიის ადმინისტრაცია' : 'MANAGEMENT & STAFF'}
              </span>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                {language === 'ka' ? 'აკადემიის სტაფი და მენეჯმენტი' : 'Academy Staff & Administration'}
              </h1>
              <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                {language === 'ka'
                  ? 'პროფესიონალი მენეჯმენტი, სპორტული მედიცინის სპეციალისტები და ადმინისტრაციული გუნდი, რომლებიც უზრუნველყოფენ ბავშვის უსაფრთხოებასა და განვითარებას.'
                  : 'Our dedicated leadership, sports physicians, physiotherapists, and admissions team supporting player welfare and operational excellence.'}
              </p>
            </div>
          </div>
        </section>

        {/* Staff Grid */}
        <section className="py-12 sm:py-16 bg-white relative overflow-hidden">
          <FluidWaveBackground variant="light" intensity="medium" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {staffData.map((member) => (
                <div
                  key={member.id}
                  className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm hover:border-blue-600 hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div className="w-12 h-12 rounded-xl bg-[#061325] flex items-center justify-center p-2 border border-blue-500">
                        <img
                          src="/logo/tfilisi-crest-white.svg"
                          alt="TFA Crest"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-mono text-[11px] font-black uppercase tracking-wider border border-slate-200">
                        {member.department}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-[#061325] mt-4 tracking-tight">
                      {member.name}
                    </h3>
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mt-0.5">
                      {member.role}
                    </p>

                    <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                      {member.bio}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                        <span className="font-mono">{member.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                        <span className="font-mono">{member.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <Link
                      href="/contact"
                      className="w-full py-2.5 px-4 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800 font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                    >
                      <span>{language === 'ka' ? 'დაკავშირება' : 'Contact Staff'}</span>
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

export default function StaffPage() {
  return (
    <LanguageProvider>
      <StaffPageContent />
    </LanguageProvider>
  );
}
