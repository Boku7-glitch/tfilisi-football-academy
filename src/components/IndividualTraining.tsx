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
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2 border border-blue-200">
            <Sparkles className="w-3 h-3 text-blue-600" />
            <span>{t.individual.badge}</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.individual.title}
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl mx-auto">
            {t.individual.subtitle}
          </p>
        </div>

        {/* 2-Column Responsive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
          
          {/* Left: Coaches Selector */}
          <div className="lg:col-span-7 space-y-2.5">
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.individual.chooseCoach}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
              {coachesData.map((coach) => {
                const isSelected = selectedCoachId === coach.id;
                return (
                  <div
                    key={coach.id}
                    onClick={() => setSelectedCoachId(coach.id)}
                    className={`cursor-pointer rounded-xl p-3 sm:p-3.5 border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white border-blue-600 shadow-xs ring-1 ring-blue-500/20'
                        : 'bg-white border-slate-200/90 hover:border-blue-400'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-100">
                          {coach.license}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        )}
                      </div>

                      <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                        {coach.name}
                      </h4>
                      <p className="text-[11px] text-blue-800 font-semibold mb-1">
                        {getCoachRole(coach)}
                      </p>
                      <p className="text-[11px] text-slate-500 leading-relaxed mb-2.5">
                        {coach.specialty}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-semibold flex items-center gap-1">
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
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3 sm:space-y-4">
              
              <div className="border-b border-slate-100 pb-2">
                <span className="text-[10px] uppercase font-extrabold text-blue-700 tracking-wider">
                  {t.individual.checkoutBadge}
                </span>
                <h3 className="text-sm sm:text-base font-black text-slate-900 mt-0.5">
                  {t.individual.checkoutTitle}
                </h3>
              </div>

              {/* Selected Coach Box */}
              <div className="bg-blue-50/60 p-2.5 sm:p-3 rounded-lg border border-blue-100">
                <div className="text-[10px] text-slate-500 font-semibold">{t.individual.selectedCoachLabel}</div>
                <div className="text-xs sm:text-sm font-extrabold text-blue-900">{selectedCoach.name}</div>
                <div className="text-[11px] text-blue-700">{selectedCoach.license} · {selectedCoach.experience}</div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  {t.individual.availableTimesLabel}
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`py-1.5 px-2 text-[11px] font-bold rounded-lg border transition-all ${
                        selectedTimeSlot === slot
                          ? 'bg-blue-700 text-white border-blue-700 shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-blue-400'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="pt-1.5 border-t border-slate-100 space-y-1 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>{t.individual.durationLabel}</span>
                  <span className="font-semibold text-slate-900">{t.individual.durationVal}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.individual.pitchLabel}</span>
                  <span className="font-semibold text-blue-700">{t.individual.pitchVal}</span>
                </div>
                <div className="flex justify-between items-baseline pt-1.5 border-t border-slate-200 text-slate-900">
                  <span className="text-xs sm:text-sm font-bold">{t.individual.totalLabel}</span>
                  <span className="text-lg font-black text-blue-700">₾50.00</span>
                </div>
              </div>

              {/* Payment Methods and Checkout Button */}
              <div className="space-y-1.5 pt-0.5">
                <button
                  type="button"
                  onClick={() => onBookCoach(selectedCoach, selectedDate, selectedTimeSlot)}
                  className="w-full py-2.5 sm:py-3 rounded-xl text-white font-extrabold bg-blue-700 hover:bg-blue-800 shadow-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 text-xs sm:text-sm"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>{t.individual.payConfirmBtn}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <div className="text-center text-[10px] text-slate-400">
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
