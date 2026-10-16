'use client';

import React, { useState } from 'react';
import { locationsData, teamGroupsData, TeamGroup } from '../data/mockData';
import { Calendar, Clock, MapPin, UserCheck, Shield, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface GroupsAndScheduleProps {
  onSelectGroup: (group: TeamGroup) => void;
}

export default function GroupsAndSchedule({ onSelectGroup }: GroupsAndScheduleProps) {
  const { language, t } = useLanguage();
  const [activeLocation, setActiveLocation] = useState<string>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredGroups = teamGroupsData.filter((group) => {
    const matchesLocation = activeLocation === 'all' || group.locationId === activeLocation;
    const matchesCategory =
      activeCategory === 'all' ||
      (activeCategory === 'u14' && group.category.includes('U-14')) ||
      (activeCategory === 'u12' && group.category.includes('U-12')) ||
      (activeCategory === 'u10' && group.category.includes('U-10')) ||
      (activeCategory === 'u8' && group.category.includes('U-8'));
    return matchesLocation && matchesCategory;
  });

  const getLocationDisplayName = (locId: string) => {
    if (language === 'ka') {
      const loc = locationsData.find((l) => l.id === locId);
      return loc?.name || 'თბილისი';
    } else {
      if (locId === 'saburtalo') return 'Saburtalo';
      if (locId === 'varketili') return 'Varketili';
      if (locId === 'dinamo') return 'Dinamo';
      return 'Tbilisi';
    }
  };

  const getGroupName = (group: TeamGroup) => {
    if (language === 'ka') return group.name;
    return `${group.birthYears} Squad (${group.category.split(' ')[0]})`;
  };

  const getGroupDays = (group: TeamGroup) => {
    if (language === 'ka') return group.days;
    return group.days
      .replace('ორშაბათი, ოთხშაბათი, პარასკევი', 'Mon, Wed, Fri')
      .replace('სამშაბათი, ხუთშაბათი, შაბათი', 'Tue, Thu, Sat')
      .replace('ორშაბათი, ხუთშაბათი', 'Mon, Thu');
  };

  return (
    <section id="groups-section" className="py-8 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2">
            <Shield className="w-3 h-3" />
            <span>{t.groups.badge}</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.groups.title}
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed">
            {t.groups.subtitle}
          </p>
        </div>

        {/* Cleaner, Non-Bulky Filter Box */}
        <div className="bg-slate-50/70 p-2.5 sm:p-4 rounded-xl border border-slate-200/80 mb-6 shadow-2xs space-y-2.5">
          
          {/* Location Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 sm:w-20 shrink-0 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-blue-600" />
              <span>{t.groups.filterLocation}</span>
            </span>
            <div className="flex overflow-x-auto gap-1 sm:gap-1.5 pb-0.5 sm:pb-0 scrollbar-none">
              <button
                onClick={() => setActiveLocation('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
                  activeLocation === 'all'
                    ? 'bg-blue-700 text-white border-blue-700 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                }`}
              >
                {t.groups.allLocations}
              </button>
              {locationsData.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setActiveLocation(loc.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
                    activeLocation === loc.id
                      ? 'bg-blue-700 text-white border-blue-700 shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                  }`}
                >
                  {getLocationDisplayName(loc.id)}
                </button>
              ))}
            </div>
          </div>

          {/* Age Category Filter */}
          <div className="border-t border-slate-200/60 pt-2 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 sm:w-20 shrink-0 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-blue-600" />
              <span>{t.groups.filterAges}</span>
            </span>
            <div className="flex overflow-x-auto gap-1 sm:gap-1.5 pb-0.5 sm:pb-0 scrollbar-none">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-2 py-0.5 rounded-md text-[11px] font-bold whitespace-nowrap transition-all border shrink-0 ${
                  activeCategory === 'all'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                }`}
              >
                {t.groups.allAges}
              </button>
              <button
                onClick={() => setActiveCategory('u14')}
                className={`px-2 py-0.5 rounded-md text-[11px] font-bold whitespace-nowrap transition-all border shrink-0 ${
                  activeCategory === 'u14'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                }`}
              >
                2012 - 2013 (U-14)
              </button>
              <button
                onClick={() => setActiveCategory('u12')}
                className={`px-2 py-0.5 rounded-md text-[11px] font-bold whitespace-nowrap transition-all border shrink-0 ${
                  activeCategory === 'u12'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                }`}
              >
                2014 - 2015 (U-12)
              </button>
              <button
                onClick={() => setActiveCategory('u10')}
                className={`px-2 py-0.5 rounded-md text-[11px] font-bold whitespace-nowrap transition-all border shrink-0 ${
                  activeCategory === 'u10'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                }`}
              >
                2016 - 2017 (U-10)
              </button>
              <button
                onClick={() => setActiveCategory('u8')}
                className={`px-2 py-0.5 rounded-md text-[11px] font-bold whitespace-nowrap transition-all border shrink-0 ${
                  activeCategory === 'u8'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                }`}
              >
                2018 - 2019 (U-8)
              </button>
            </div>
          </div>

        </div>

        {/* Clean Responsive Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 hover:border-blue-500 p-3.5 sm:p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-2">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                    {getLocationDisplayName(group.locationId)}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">
                    {group.birthYears}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {getGroupName(group)}
                </h3>
                <div className="text-[10px] sm:text-[11px] text-blue-600 font-semibold mb-2.5">
                  {language === 'ka' ? group.intensity : 'Skill Mastery & Team Play'}
                </div>

                <div className="space-y-1 bg-slate-50/80 p-2.5 rounded-lg border border-slate-200/60 mb-3 text-[11px] text-slate-700">
                  <div className="flex items-start gap-1.5">
                    <Calendar className="w-3 h-3 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900">{t.groups.daysLabel}</span> {getGroupDays(group)}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-blue-600 shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-900">{t.groups.hoursLabel}</span> {group.hours}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <UserCheck className="w-3 h-3 text-blue-600 shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-900">{t.groups.coachLabel}</span> {group.coach}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">{t.groups.feeLabel}</div>
                  <div className="text-sm sm:text-base font-extrabold text-slate-900">
                    ₾{group.monthlyFee} <span className="text-[10px] text-slate-500 font-normal">{t.groups.perMonth}</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectGroup(group)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white flex items-center gap-1 shadow-2xs transition-all active:scale-95"
                >
                  <span>{t.groups.enrollBtn}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
