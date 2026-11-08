'use client';

import React, { useState } from 'react';
import { NewsItem } from '../data/mockData';
import { Calendar, Clock, ArrowRight, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAcademy } from '../context/AcademyContext';
import Link from 'next/link';

interface NewsSectionProps {
  onReadArticle?: (article: NewsItem) => void;
}

export default function NewsSection({ onReadArticle }: NewsSectionProps) {
  const { language, t } = useLanguage();
  const { news } = useAcademy();
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  const getArticleDetails = (item: NewsItem) => {
    if (language === 'ka') {
      return {
        title: item.title,
        excerpt: item.excerpt,
        content: item.content || item.excerpt,
        category: item.category,
        date: item.date,
        readTime: item.readTime,
      };
    } else {
      if (item.id === '1') {
        return {
          title: 'Autumn Season Admissions: Open for 2012–2019 Squads',
          excerpt: 'Admissions are underway across Saburtalo and Varketili centres. View the timetable and enroll your child today.',
          content: item.content || item.excerpt,
          category: 'Admissions 2026',
          date: 'October 15, 2026',
          readTime: '3 min read',
        };
      } else if (item.id === '2') {
        return {
          title: 'New Branch in Saburtalo: Modern Pitch for Youth Squads',
          excerpt: 'An additional modern football complex has opened on University St for young players aged 6 to 10.',
          content: item.content || item.excerpt,
          category: 'New Branch',
          date: 'October 12, 2026',
          readTime: '2 min read',
        };
      } else if (item.id === '3') {
        return {
          title: 'Tfilisi Academy U-12 Reaches the Golden Cup Final',
          excerpt: 'Our youth squad celebrated a dramatic 3:2 semifinal victory to advance to the tournament final.',
          content: item.content || item.excerpt,
          category: 'Tournaments',
          date: 'October 8, 2026',
          readTime: '4 min read',
        };
      } else {
        return {
          title: item.title,
          excerpt: item.excerpt,
          content: item.content || item.excerpt,
          category: item.category,
          date: item.date,
          readTime: item.readTime,
        };
      }
    }
  };

  const handleCardClick = (item: NewsItem) => {
    if (onReadArticle) {
      onReadArticle(item);
    }
    setSelectedArticle(item);
  };

  return (
    <section id="news-section" className="py-8 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 pb-4 border-b border-slate-200">
          <div>
            <div className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-blue-600 uppercase mb-1">
              // CLUB DISPATCHES & PRESS
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-[#061325] tracking-tight">
              {t.news.title}
            </h2>
          </div>
          <p className="mt-1 md:mt-0 text-xs text-slate-500 max-w-md">
            {t.news.subtitle}
          </p>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {news.map((item) => {
            const article = getArticleDetails(item);
            return (
              <article
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-blue-600 overflow-hidden shadow-xs transition-all flex flex-col group cursor-pointer"
                onClick={() => handleCardClick(item)}
              >
                {/* Image */}
                <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-[#061325] text-white border border-slate-700">
                    {article.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 mb-1.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-blue-600" />
                        {article.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-black text-[#061325] group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-1">
                      {article.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black uppercase tracking-wider text-blue-600 group-hover:text-blue-700">
                    <span>{t.news.readMore}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>

      {/* Full Article Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md modal-backdrop-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedArticle(null);
          }}
        >
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden modal-box-in max-h-[90vh] flex flex-col">
            <div className="relative aspect-16/8 bg-slate-900 shrink-0 overflow-hidden">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061325] via-[#061325]/40 to-transparent" />
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="absolute top-3.5 right-3.5 w-9 h-9 rounded-xl bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
                aria-label="დახურვა"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-blue-600 text-white">
                  {selectedArticle.category}
                </span>
                <h3 className="text-lg sm:text-2xl font-black mt-2 leading-tight">
                  {selectedArticle.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-300 mt-1.5 font-mono">
                  <span>{selectedArticle.date}</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p className="font-bold text-slate-900 text-sm sm:text-base">
                {selectedArticle.excerpt}
              </p>
              {selectedArticle.content && selectedArticle.content !== selectedArticle.excerpt && (
                <p>{selectedArticle.content}</p>
              )}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href="/contact"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider transition-colors"
                >
                  ჩაწერა საცდელ ვარჯიშზე
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                >
                  დახურვა
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
