'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AuthModal from '../../components/AuthModal';
import { useLanguage } from '../../context/LanguageContext';
import { staffData } from '../../data/mockData';

export default function StaffPage() {
  const { language } = useLanguage();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar onOpenAuthModal={() => setAuthModalOpen(true)} />

      <main className="flex-1 bg-white animate-page-enter">
        {/* Header Hero */}
        <section className="py-12 sm:py-16 bg-[#061325] text-white border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 rounded bg-blue-600 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest mb-3">
                {language === 'ka' ? 'აკადემიის ადმინისტრაცია' : 'MANAGEMENT & STAFF'}
              </span>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                {language === 'ka' ? 'აკადემიის სტაფი და მენეჯმენტი' : 'Academy Staff & Administration'}
              </h1>
            </div>
          </div>
        </section>

        {/* Staff Grid */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}

