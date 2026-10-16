'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Shield, Target, Compass, Zap, HeartHandshake } from 'lucide-react';

export default function AcademyDNA() {
  const { language } = useLanguage();

  const pillars = [
    {
      num: '01',
      icon: Target,
      tag: 'TECHNIQUE',
      titleKa: 'ბურთის ფლობა & ორმხრივი ტექნიკა',
      titleEn: 'Bilateral Ball Mastery',
      descKa: 'თითოეული ვარჯიში აგებულია ორივე ფეხით ბურთის თავდაჯერებულ კონტროლზე, 1-ზე-1 დრიბლინგსა და პირველი შეხების სრულყოფაზე.',
      descEn: 'Every session trains confidence with both feet, close control in tight spaces, and clean first-touch reception under pressure.',
      stat: '1,200+',
      statLabelKa: 'შეხება ბურთთან 1 ვარჯიშზე',
      statLabelEn: 'Touches per session'
    },
    {
      num: '02',
      icon: Compass,
      tag: 'TACTICS',
      titleKa: 'მოედნის სკანირება & გადაწყვეტილება',
      titleEn: 'Cognitive Scanning & Decision Speed',
      descKa: 'ვასწავლით მოედნის მუდმივ სკანირებას ბურთის მიღებამდე. ბავშვი სწავლობს სწრაფი და გონივრული სათამაშო გადაწყვეტილებების მიღებას.',
      descEn: 'Training young players to scan the pitch before receiving the ball. Developing anticipation and split-second tactical awareness.',
      stat: '0.4s',
      statLabelKa: 'გადაწყვეტილების მიღების ტემპი',
      statLabelEn: 'Cognitive decision cycle'
    },
    {
      num: '03',
      icon: Zap,
      tag: 'ATHLETIC',
      titleKa: 'კოორდინაცია & ათლეტური მოტორიკა',
      titleEn: 'Agility, Balance & Coordination (ABC)',
      descKa: 'სპეციალიზებული ფიტნეს მეთოდოლოგია: სისწრაფე, ელასტიურობა, მოტორული რეაქცია და ტრავმების პრევენცია ბავშვთა ასაკიდანვე.',
      descEn: 'Age-appropriate physical development: footwork speed, balance, core stability, and injury prevention from early youth.',
      stat: '100%',
      statLabelKa: 'ასაკობრივად შერჩეული დატვირთვა',
      statLabelEn: 'Age-appropriate loads'
    },
    {
      num: '04',
      icon: HeartHandshake,
      tag: 'MENTALITY',
      titleKa: 'სპორტული ხასიათი & დისციპლინა',
      titleEn: 'Leadership, Respect & Team Spirit',
      descKa: 'ფეხბურთი მხოლოდ თამაში არ არის — ეს არის პასუხისმგებლობა, გუნდურობა, მეტოქის პატივისცემა და ლიდერის თვისებების ჩამოყალიბება.',
      descEn: 'Football as character building: punctuality, resilience under pressure, mutual respect, and sportsmanship on and off the pitch.',
      stat: 'TFA',
      statLabelKa: 'ქართული საფეხბურთო სული',
      statLabelEn: 'Georgian Football Spirit'
    }
  ];

  return (
    <section className="py-12 sm:py-20 pattern-club-diamonds border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-blue-600 uppercase mb-1">
            // PHILOSOPHY & PILLARS
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-[#061325] tracking-tight">
            {language === 'ka' ? '„ტფილისის“ საფეხბურთო DNA' : 'The Tfilisi Academy Football DNA'}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {language === 'ka'
              ? 'ჩვენ არ ვზრდით მხოლოდ ფეხბურთელებს — ჩვენ ვავითარებთ მოაზროვნე, დისციპლინირებულ და გამარჯვებული მენტალიტეტის მქონე ახალგაზრდებს.'
              : 'Our 4 developmental pillars ensure every child progresses technically, tactically, physically, and mentally.'}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.num}
                className="bg-white rounded-xl border border-slate-200 hover:border-blue-600 p-5 shadow-xs transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-mono font-black text-[#061325] group-hover:text-blue-600 transition-colors">
                      {p.num}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {p.tag}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-3 group-hover:bg-[#061325] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-sm font-black text-[#061325] leading-snug mb-2">
                    {language === 'ka' ? p.titleKa : p.titleEn}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {language === 'ka' ? p.descKa : p.descEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
                  <div>
                    <div className="text-base font-black text-[#061325]">{p.stat}</div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {language === 'ka' ? p.statLabelKa : p.statLabelEn}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
