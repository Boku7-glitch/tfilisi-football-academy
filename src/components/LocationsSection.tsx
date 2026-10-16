'use client';

import React from 'react';
import { locationsData } from '../data/mockData';
import { MapPin, Navigation, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LocationsSection() {
  const { language, t } = useLanguage();

  const getLocationInfo = (id: string) => {
    if (language === 'ka') {
      const loc = locationsData.find((l) => l.id === id);
      return {
        name: loc?.name || '',
        address: loc?.address || '',
        description: loc?.description || '',
        pitches: loc?.pitches || ''
      };
    } else {
      if (id === 'saburtalo') {
        return {
          name: 'Saburtalo Complex',
          address: '6 University Street, Tbilisi',
          description: 'Full-sized synthetic turf pitch with advanced LED floodlights and comfortable modern locker rooms.',
          pitches: '2 Pitches (Youth & Standard)'
        };
      } else if (id === 'varketili') {
        return {
          name: 'Varketili Centre',
          address: 'Varketili Upper Plateau, 2nd Microdistrict',
          description: 'Specialized youth football centre with dedicated athletic preparation and coordination zones.',
          pitches: '1 Standard Pitch'
        };
      } else {
        return {
          name: 'Dinamo Training Base',
          address: 'Dighomi Training Centre',
          description: 'Top-tier hybrid natural & synthetic pitches with on-site medical and athletic recovery staff.',
          pitches: '3 Training Pitches'
        };
      }
    }
  };

  return (
    <section id="locations-section" className="py-8 sm:py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2 border border-blue-200">
            <MapPin className="w-3 h-3 text-blue-600" />
            <span>{t.locations.badge}</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.locations.title}
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl mx-auto">
            {t.locations.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5">
          {locationsData.map((loc) => {
            const info = getLocationInfo(loc.id);
            return (
              <div
                key={loc.id}
                className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 hover:border-blue-500 p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 mb-3">
                    <Navigation className="w-4 h-4" />
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 mb-0.5">
                    {info.name}
                  </h3>
                  <p className="text-xs font-semibold text-blue-700 flex items-center gap-1 mb-2.5">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span>{info.address}</span>
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {info.description}
                  </p>

                  <div className="space-y-1 pt-2.5 border-t border-slate-100 text-[11px] font-medium text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{info.pitches}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{t.locations.changingRooms}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{t.locations.ledLighting}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(info.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-lg border border-blue-300 text-blue-700 hover:bg-blue-50 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MapPin className="w-3 h-3" />
                    <span>{t.locations.viewMap}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
