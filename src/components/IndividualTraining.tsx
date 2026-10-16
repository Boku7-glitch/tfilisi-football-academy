'use client';

import React, { useState } from 'react';
import { coachesData, Coach } from '../data/mockData';
import { CheckCircle2, User, Clock, CreditCard, Sparkles, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface IndividualTrainingProps {
  onBookCoach: (coach: Coach, date: string, timeSlot: string) => void;
}

export default function IndividualTraining({ onBookCoach }: IndividualTrainingProps) {
  const { language, t } = useLanguage();
  const [selectedCoachId, setSelectedCoachId] = useState<string>(coachesData[0].id);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('16:00 - 17:00');
  const [selectedDate, setSelectedDate] = useState<string>('Mon, 19 Oct');

  const selectedCoach = coachesData.find((c) => c.id === selectedCoachId) || coachesData[0];

  const timeSlots = [
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00',
    '18:00 - 19:00'
  ];

  const getCoachRole = (coach: Coach) => {
    if (language === 'ka') return coach.role;
    if (coach.id === 'c1') return 'Head of Youth Development';
    if (coach.id === 'c2') return 'Coordination & Agility Coach';
    return 'Youth Goalkeeping Coach';
  };

  const getCoachDays = (coach: Coach) => {
    if (language === 'ka') return coach.availableDays;
    return coach.availableDays
      .replace('ორშაბათი - პარასკევი', 'Monday - Friday')
      .replace('სამშაბათი, ხუთშაბათი, შაბათი', 'Tuesday, Thursday, Saturday')
      .replace('ორშაბათი, ოთხშაბათი, შაბათი', 'Monday, Wednesday, Saturday');
  };

  return (
    <section id="individual-section" className="py-8 sm:py-16 bg-slate-50/70 border-t border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-blue-600 uppercase mb-1">
            // 1-ON-1 COACHING MASTERCLASS
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-[#061325] tracking-tight">
            {t.individual.title}
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl mx-auto">
            {t.individual.subtitle}
          </p>
        </div>

        {/* 2-Column Athletic Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* Left: Coaches Selector */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              <span>{t.individual.chooseCoach}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {coachesData.map((coach) => {
                const isSelected = selectedCoachId === coach.id;
                return (
                  <div
                    key={coach.id}
                    onClick={() => setSelectedCoachId(coach.id)}
                    className={`cursor-pointer rounded-xl p-3.5 sm:p-4 border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white border-2 border-blue-600 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#061325] text-white">
                          {coach.license}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        )}
                      </div>

                      <h4 className="font-black text-slate-900 text-sm">
                        {coach.name}
                      </h4>
                      <p className="text-[11px] text-blue-600 font-bold mb-1">
                        {getCoachRole(coach)}
                      </p>
                      <p className="text-xs text-slate-500 leading-relaxed mb-3">
                        {coach.specialty}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-slate-100 text-[10px] text-slate-500 font-semibold flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-blue-600" />
                      <span>{getCoachDays(coach)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Slot Selection & Checkout Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-4">
              
              <div className="border-b border-slate-200 pb-3">
                <span className="text-[10px] font-mono font-bold uppercase text-blue-600 tracking-wider">
                  OFFICIAL BOOKING PASS
                </span>
                <h3 className="text-base font-black text-[#061325] mt-0.5">
                  {t.individual.checkoutTitle}
                </h3>
              </div>

              {/* Selected Coach Box */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-500 font-bold uppercase">{t.individual.selectedCoachLabel}</div>
                <div className="text-sm font-black text-[#061325] mt-0.5">{selectedCoach.name}</div>
                <div className="text-xs text-blue-600 font-semibold">{selectedCoach.license} · {selectedCoach.experience}</div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1.5">
                  {t.individual.availableTimesLabel}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`py-2 px-2.5 text-xs font-mono font-bold rounded-lg border transition-all ${
                        selectedTimeSlot === slot
                          ? 'bg-[#061325] text-white border-[#061325] shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>{t.individual.durationLabel}</span>
                  <span className="font-bold text-slate-900">{t.individual.durationVal}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.individual.pitchLabel}</span>
                  <span className="font-bold text-blue-600">{t.individual.pitchVal}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-slate-200 text-slate-900">
                  <span className="text-xs sm:text-sm font-black uppercase">{t.individual.totalLabel}</span>
                  <span className="text-xl font-black text-[#061325]">₾50.00</span>
                </div>
              </div>

              {/* Payment Methods and Checkout Button */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={() => onBookCoach(selectedCoach, selectedDate, selectedTimeSlot)}
                  className="w-full py-3 rounded-lg text-white font-black uppercase tracking-wider bg-blue-600 hover:bg-blue-700 shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95 text-xs sm:text-sm"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{t.individual.payConfirmBtn}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="text-center text-[10px] text-slate-400 font-mono">
                  {t.individual.cardsAccepted}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
