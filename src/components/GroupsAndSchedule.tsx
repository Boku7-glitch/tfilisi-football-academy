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
          <div className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-blue-600 uppercase mb-1">
            // ACADEMY ROSTER & SCHEDULE
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-[#061325] tracking-tight">
            {t.groups.title}
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed">
            {t.groups.subtitle}
          </p>
        </div>

        {/* Athletic Filter Box */}
        <div className="bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-200 mb-6 space-y-3">
          
          {/* Location Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-500 sm:w-20 shrink-0 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.groups.filterLocation}</span>
            </span>
            <div className="flex overflow-x-auto gap-1.5 pb-0.5 sm:pb-0 scrollbar-none">
              <button
                onClick={() => setActiveLocation('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all border shrink-0 ${
                  activeLocation === 'all'
                    ? 'bg-[#061325] text-white border-[#061325] shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                }`}
              >
                {t.groups.allLocations}
              </button>
              {locationsData.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setActiveLocation(loc.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all border shrink-0 ${
                    activeLocation === loc.id
                      ? 'bg-[#061325] text-white border-[#061325] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  {getLocationDisplayName(loc.id)}
                </button>
              ))}
            </div>
          </div>

          {/* Age Category Filter */}
          <div className="border-t border-slate-200 pt-2.5 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-500 sm:w-20 shrink-0 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.groups.filterAges}</span>
            </span>
            <div className="flex overflow-x-auto gap-1.5 pb-0.5 sm:pb-0 scrollbar-none">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider whitespace-nowrap transition-all border shrink-0 ${
                  activeCategory === 'all'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                }`}
              >
                {t.groups.allAges}
              </button>
              <button
                onClick={() => setActiveCategory('u14')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider whitespace-nowrap transition-all border shrink-0 ${
                  activeCategory === 'u14'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                }`}
              >
                2012 - 2013 (U-14)
              </button>
              <button
                onClick={() => setActiveCategory('u12')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider whitespace-nowrap transition-all border shrink-0 ${
                  activeCategory === 'u12'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                }`}
              >
                2014 - 2015 (U-12)
              </button>
              <button
                onClick={() => setActiveCategory('u10')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider whitespace-nowrap transition-all border shrink-0 ${
                  activeCategory === 'u10'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                }`}
              >
                2016 - 2017 (U-10)
              </button>
              <button
                onClick={() => setActiveCategory('u8')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider whitespace-nowrap transition-all border shrink-0 ${
                  activeCategory === 'u8'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
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
              className="bg-white rounded-xl border border-slate-200 hover:border-blue-600 p-4 sm:p-5 shadow-xs transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-2.5">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[#061325] text-white">
                    {getLocationDisplayName(group.locationId)}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-700">
                    {group.birthYears}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-black text-[#061325] group-hover:text-blue-600 transition-colors">
                  {getGroupName(group)}
                </h3>
                <div className="text-[10px] sm:text-[11px] text-blue-600 font-bold mb-3">
                  {language === 'ka' ? group.intensity : 'Skill Mastery & Match Play'}
                </div>

                <div className="space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-200 mb-3.5 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900">{t.groups.daysLabel}</span> {getGroupDays(group)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900">{t.groups.hoursLabel}</span> {group.hours}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <UserCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900">{t.groups.coachLabel}</span> {group.coach}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">{t.groups.feeLabel}</div>
                  <div className="text-base sm:text-lg font-black text-[#061325]">
                    ₾{group.monthlyFee} <span className="text-[10px] text-slate-500 font-medium">{t.groups.perMonth}</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectGroup(group)}
                  className="px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
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
