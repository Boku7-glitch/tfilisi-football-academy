'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ContactSection() {
  const { language, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    childName: '',
    birthYear: '2014',
    parentName: '',
    parentPhone: '',
    location: 'saburtalo',
    category: '2014-2015 (U-12)'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        childName: '',
        birthYear: '2014',
        parentName: '',
        parentPhone: '',
        location: 'saburtalo',
        category: '2014-2015 (U-12)'
      });
    }, 4000);
  };

  return (
    <section id="contact-section" className="py-8 sm:py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <div className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-blue-600 uppercase mb-1">
                // ADMISSIONS & REGISTRATION
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-[#061325] tracking-tight">
                {t.contact.title}
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed">
                {t.contact.subtitle}
              </p>
            </div>

            {/* Quick Contacts */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="w-9 h-9 rounded-md bg-[#061325] text-blue-400 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">{t.contact.hotline}</div>
                  <div className="text-xs sm:text-sm font-black text-[#061325]">+995 599 00 00 00</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="w-9 h-9 rounded-md bg-[#061325] text-blue-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">{t.contact.email}</div>
                  <div className="text-xs sm:text-sm font-black text-[#061325]">info@tfilisifa.ge</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="w-9 h-9 rounded-md bg-[#061325] text-blue-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">{t.contact.office}</div>
                  <div className="text-xs sm:text-sm font-black text-[#061325]">
                    თბილისი, უნივერსიტეტის ქ. #6
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-2">
                სოციალური მედია
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-pink-50/40 border border-slate-200 hover:border-pink-300 text-slate-800 hover:text-pink-600 transition-all group shadow-2xs"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold leading-tight">Instagram</div>
                    <div className="text-xs font-black">@tfilisifa</div>
                  </div>
                </a>

                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-blue-50/40 border border-slate-200 hover:border-blue-300 text-slate-800 hover:text-blue-600 transition-all group shadow-2xs"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#1877F2] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold leading-tight">Facebook</div>
                    <div className="text-xs font-black">/tfilisifa</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Registration Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs">
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mb-3 sm:mb-4">
                {t.contact.formTitle}
              </h3>

              {submitted ? (
                <div className="p-5 text-center bg-blue-50 rounded-xl border border-blue-200 animate-in fade-in">
                  <CheckCircle2 className="w-8 h-8 text-blue-600 mx-auto mb-1.5" />
                  <h4 className="text-sm font-bold text-slate-900 mb-0.5">
                    {t.contact.successTitle}
                  </h4>
                  <p className="text-xs text-slate-600">
                    {t.contact.successDesc}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-0.5">
                        {t.contact.childName}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.childName}
                        onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                        placeholder={t.contact.childNamePlaceholder}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600 text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-0.5">
                        {t.contact.birthYear}
                      </label>
                      <select
                        value={formData.birthYear}
                        onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600 text-xs text-slate-900 bg-white"
                      >
                        <option value="2019">2019 (6 {language === 'ka' ? 'წელი' : 'yrs'})</option>
                        <option value="2018">2018 (7 {language === 'ka' ? 'წელი' : 'yrs'})</option>
                        <option value="2017">2017 (8 {language === 'ka' ? 'წელი' : 'yrs'})</option>
                        <option value="2016">2016 (9 {language === 'ka' ? 'წელი' : 'yrs'})</option>
                        <option value="2015">2015 (10 {language === 'ka' ? 'წელი' : 'yrs'})</option>
                        <option value="2014">2014 (11 {language === 'ka' ? 'წელი' : 'yrs'})</option>
                        <option value="2013">2013 (12 {language === 'ka' ? 'წელი' : 'yrs'})</option>
                        <option value="2012">2012 (13 {language === 'ka' ? 'წელი' : 'yrs'})</option>
                        <option value="2011">2011 (14 {language === 'ka' ? 'წელი' : 'yrs'})</option>
                        <option value="2010">2010 (15 {language === 'ka' ? 'წელი' : 'yrs'})</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-0.5">
                        {t.contact.parentName}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        placeholder={t.contact.parentNamePlaceholder}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600 text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-0.5">
                        {t.contact.parentPhone}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.parentPhone}
                        onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                        placeholder="5XX XX XX XX"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600 text-xs text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-0.5">
                        {t.contact.preferredLocation}
                      </label>
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600 text-xs text-slate-900 bg-white"
                      >
                        <option value="saburtalo">{language === 'ka' ? 'საბურთალოს ფილიალი' : 'Saburtalo Branch'}</option>
                        <option value="varketili">{language === 'ka' ? 'ვარკეთილის ფილიალი' : 'Varketili Branch'}</option>
                        <option value="dinamo">{language === 'ka' ? 'დინამოს ბაზა' : 'Dinamo Training Base'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-0.5">
                        {t.contact.preferredProgram}
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600 text-xs text-slate-900 bg-white"
                      >
                        <option value="2018-2019 (U-8)">2018-2019 (U-8)</option>
                        <option value="2016-2017 (U-10)">2016-2017 (U-10)</option>
                        <option value="2014-2015 (U-12)">2014-2015 (U-12)</option>
                        <option value="2012-2013 (U-14)">2012-2013 (U-14)</option>
                        <option value="individual">{language === 'ka' ? 'ინდივიდუალური ვარჯიში' : '1-on-1 Individual Training'}</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-lg text-white font-black uppercase tracking-wider bg-blue-600 hover:bg-blue-700 shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95 text-xs sm:text-sm"
                    >
                      <Send className="w-4 h-4" />
                      <span>{t.contact.submitBtn}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
