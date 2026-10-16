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
          <div className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-blue-600 uppercase mb-1">
            // ACADEMY BASES & INFRASTRUCTURE
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-[#061325] tracking-tight">
            {t.locations.title}
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl mx-auto">
            {t.locations.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {locationsData.map((loc) => {
            const info = getLocationInfo(loc.id);
            return (
              <div
                key={loc.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-blue-600 p-5 shadow-xs transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#061325] flex items-center justify-center text-blue-400 mb-3.5 border border-slate-800">
                    <Navigation className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-black text-[#061325] mb-1">
                    {info.name}
                  </h3>
                  <p className="text-xs font-bold text-blue-600 flex items-center gap-1.5 mb-3">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{info.address}</span>
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {info.description}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="font-semibold">{info.pitches}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{t.locations.changingRooms}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{t.locations.ledLighting}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(info.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-lg border border-slate-300 text-slate-800 hover:text-white hover:bg-blue-600 hover:border-blue-600 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                  >
                    <MapPin className="w-3.5 h-3.5" />
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
