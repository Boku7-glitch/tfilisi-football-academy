'use client';

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Trophy, Sparkles, CheckCircle2, ChevronRight, Compass } from 'lucide-react';
import Link from 'next/link';

interface FormationStage {
  id: string;
  badge: string;
  years: string;
  format: string;
  ballSize: string;
  titleKa: string;
  titleEn: string;
  focusKa: string;
  focusEn: string;
  tacticsKa: string[];
  tacticsEn: string[];
  nodes: { x: number; y: number; labelKa: string; labelEn: string; role: string }[];
}

const pathwayStages: FormationStage[] = [
  {
    id: 'u8',
    badge: 'U-8 GRASSROOTS',
    years: '2018 — 2019',
    format: '5 vs 5 (FUNiNO)',
    ballSize: 'Size 3 Ball',
    titleKa: 'საფეხბურთო მოტორიკა და თამაშის სიხარული',
    titleEn: 'Ball Mastery & Movement Foundation',
    focusKa: 'მაქსიმალური შეხება ბურთთან, კოორდინაცია და სივრცის შეგრძნება.',
    focusEn: 'Maximum ball touches, agility drills, and joy of creative free play.',
    tacticsKa: ['1,000+ შეხება ბურთთან ყოველ ვარჯიშზე', '2-კარიანი მცირე მოედნები (FUNiNO სისტემა)', 'მოტორული უნარების და ბალანსის განვითარება'],
    tacticsEn: ['1,000+ ball touches per practice session', 'Dual-goal mini pitches (FUNiNO development)', 'Motor agility, balance and coordination'],
    nodes: [
      { x: 15, y: 50, labelKa: 'GK', labelEn: 'GK', role: 'მეკარე' },
      { x: 42, y: 25, labelKa: 'DEF', labelEn: 'DEF', role: 'მცველი' },
      { x: 42, y: 75, labelKa: 'DEF', labelEn: 'DEF', role: 'მცველი' },
      { x: 75, y: 35, labelKa: 'FWD', labelEn: 'FWD', role: 'თავდამსხმელი' },
      { x: 75, y: 65, labelKa: 'FWD', labelEn: 'FWD', role: 'თავდამსხმელი' },
    ]
  },
  {
    id: 'u10',
    badge: 'U-10 DEVELOPMENT',
    years: '2016 — 2017',
    format: '7 vs 7 Format',
    ballSize: 'Size 4 Ball',
    titleKa: 'პოზიციური აზროვნება და 1-ზე-1 დრიბლინგი',
    titleEn: 'Positional Intelligence & 1v1 Dominance',
    focusKa: 'გადაწყვეტილების მიღების სისწრაფე, ზუსტი პასი და სივრცის გახსნა.',
    focusEn: 'Speed of decision making, progressive passing lines, and defensive recovery.',
    tacticsKa: ['1-ზე-1 დუელების მოგება შეტევასა და დაცვაში', 'პოზიციური სამკუთხედები და კომბინაციები', 'სწრაფი გადართვა შეტევიდან დაცვაში'],
    tacticsEn: ['1v1 offensive and defensive duel mastery', 'Positional passing triangles and combination play', 'Rapid counter-press transitions'],
    nodes: [
      { x: 12, y: 50, labelKa: 'GK', labelEn: 'GK', role: 'მეკარე' },
      { x: 35, y: 20, labelKa: 'LB', labelEn: 'LB', role: 'მარცხენა მცველი' },
      { x: 30, y: 50, labelKa: 'CB', labelEn: 'CB', role: 'ცენტრალური მცველი' },
      { x: 35, y: 80, labelKa: 'RB', labelEn: 'RB', role: 'მარჯვენა მცველი' },
      { x: 55, y: 35, labelKa: 'CM', labelEn: 'CM', role: 'ცენტრალური ნახევარმცველი' },
      { x: 55, y: 65, labelKa: 'CM', labelEn: 'CM', role: 'ცენტრალური ნახევარმცველი' },
      { x: 82, y: 50, labelKa: 'ST', labelEn: 'ST', role: 'ფორვარდი' },
    ]
  },
  {
    id: 'u12',
    badge: 'U-12 ACADEMY ELITE',
    years: '2014 — 2015',
    format: '9 vs 9 Format',
    ballSize: 'Size 4 Ball',
    titleKa: 'ხაზებს შორის თამაში და ტაქტიკური დისციპლინა',
    titleEn: 'Line Breaking & Tactical Fluidity',
    focusKa: 'კომპაქტურობა, პრესინგი და თამაშის ტემპის მართვა.',
    focusEn: 'High-press compact shape, switching play, and structured set-pieces.',
    tacticsKa: ['მაღალი პრესინგი და ბურთის სწრაფი დაბრუნება', 'ფლანგების გაშლა და ზონური დაცვა', 'სტანდარტული სიტუაციების გათამაშება'],
    tacticsEn: ['High press trigger zones & instant recovery', 'Wing overloads and zonal defensive block', 'Set-piece execution & tactical adaptability'],
    nodes: [
      { x: 10, y: 50, labelKa: 'GK', labelEn: 'GK', role: 'მეკარე' },
      { x: 30, y: 20, labelKa: 'LB', labelEn: 'LB', role: 'მარცხენა მცველი' },
      { x: 26, y: 50, labelKa: 'CB', labelEn: 'CB', role: 'ცენტრალური მცველი' },
      { x: 30, y: 80, labelKa: 'RB', labelEn: 'RB', role: 'მარჯვენა მცველი' },
      { x: 50, y: 50, labelKa: 'DM', labelEn: 'DM', role: 'საყრდენი' },
      { x: 62, y: 25, labelKa: 'LM', labelEn: 'LM', role: 'მარცხენა ნახევარმცველი' },
      { x: 62, y: 75, labelKa: 'RM', labelEn: 'RM', role: 'მარჯვენა ნახევარმცველი' },
      { x: 72, y: 50, labelKa: 'AM', labelEn: 'AM', role: 'შემტევი ნახევარმცველი' },
      { x: 86, y: 50, labelKa: 'ST', labelEn: 'ST', role: 'ცენტრალური თავდამსხმელი' },
    ]
  },
  {
    id: 'u14',
    badge: 'U-14 CHAMPIONSHIP',
    years: '2012 — 2013',
    format: '11 vs 11 (Full Pitch)',
    ballSize: 'Size 5 Pro Ball',
    titleKa: 'სრული ტაქტიკური სისტემა & ლიგის მატჩები',
    titleEn: '11v11 Full Tactical Rigor & League Play',
    focusKa: '4-3-3 სისტემა, ანალიტიკური მომზადება და პროფესიონალური მენტალიტეტი.',
    focusEn: 'Complete 4-3-3 structure, video match analysis, and competitive league standards.',
    tacticsKa: ['სტანდარტული ზომის მოედანი და ოფიციალური ჩემპიონატი', 'ვიდეოანალიზი და პერსონალური სტატისტიკა', 'უეფას ლიცენზირებული მთავარი მწვრთნელი'],
    tacticsEn: ['Full-regulation FIFA pitch with GFF youth league fixtures', 'Video tactical analysis & individual player metrics', 'UEFA Licensed head coach guidance'],
    nodes: [
      { x: 8, y: 50, labelKa: 'GK', labelEn: 'GK', role: 'მეკარე' },
      { x: 25, y: 15, labelKa: 'LB', labelEn: 'LB', role: 'მარცხენა მცველი' },
      { x: 22, y: 38, labelKa: 'CB', labelEn: 'CB', role: 'ცენტრალური მცველი' },
      { x: 22, y: 62, labelKa: 'CB', labelEn: 'CB', role: 'ცენტრალური მცველი' },
      { x: 25, y: 85, labelKa: 'RB', labelEn: 'RB', role: 'მარჯვენა მცველი' },
      { x: 45, y: 50, labelKa: 'CDM', labelEn: 'CDM', role: 'საყრდენი ნახევარმცველი' },
      { x: 58, y: 30, labelKa: 'LCM', labelEn: 'LCM', role: 'ცენტრალური ნახევარმცველი' },
      { x: 58, y: 70, labelKa: 'RCM', labelEn: 'RCM', role: 'ცენტრალური ნახევარმცველი' },
      { x: 78, y: 18, labelKa: 'LW', labelEn: 'LW', role: 'მარცხენა გარემარბი' },
      { x: 78, y: 82, labelKa: 'RW', labelEn: 'RW', role: 'მარჯვენა გარემარბი' },
      { x: 86, y: 50, labelKa: 'CF', labelEn: 'CF', role: 'ცენტრალური თავდამსხმელი' },
    ]
  }
];

export default function TacticalPitchPathway() {
  const { language } = useLanguage();
  const [activeStageId, setActiveStageId] = useState<string>('u10');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const stage = pathwayStages.find((s) => s.id === activeStageId) || pathwayStages[1];

  return (
    <section className="py-12 sm:py-20 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-blue-600 uppercase mb-1">
              // TFA DEVELOPMENT ROADMAP
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-[#061325] tracking-tight">
              {language === 'ka' ? 'ასაკობრივი განვითარების ტაქტიკური მოედანი' : 'Tactical Pathway: From Grassroots to 11v11'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              {language === 'ka'
                ? 'აკადემიის უნიკალური მეთოდოლოგია: 5v5 მცირე მოედნებიდან 11v11 სრულ ჩემპიონატამდე.'
                : 'Our structured UEFA methodology: tailored pitch dimensions and cognitive development per age group.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-slate-400">PITCH FORMAT:</span>
            <span className="px-2.5 py-1 rounded bg-[#061325] text-white text-xs font-mono font-black">
              {stage.format}
            </span>
          </div>
        </div>

        {/* Stage Selector Pills (Bespoke Segmented Bar) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
          {pathwayStages.map((s) => {
            const isSelected = s.id === activeStageId;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStageId(s.id)}
                className={`p-3 sm:p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#061325] text-white border-[#061325] shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-mono font-black uppercase tracking-wider ${isSelected ? 'text-blue-400' : 'text-blue-600'}`}>
                    {s.badge}
                  </span>
                  <span className={`text-[9px] font-mono ${isSelected ? 'text-slate-400' : 'text-slate-400'}`}>
                    {s.format.split(' ')[0]}
                  </span>
                </div>
                <div className="text-sm font-black leading-tight">
                  {s.years}
                </div>
              </button>
            );
          })}
        </div>

        {/* 2-Column Pitch & Curriculum Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          
          {/* Tactical Pitch Visualizer (Interactive SVG / Blueprint) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl bg-[#08182b] p-3 sm:p-4 border-2 border-slate-900 shadow-xl overflow-hidden">
              
              {/* Pitch Texture and Blueprint Layout */}
              <div className="relative aspect-16/10 rounded-xl bg-[#092244] border-2 border-blue-400/40 overflow-hidden">
                
                {/* Grass stripe pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_50%,transparent_50%)] bg-[length:12.5%_100%]" />

                {/* Tactical Chalk Lines (SVG) */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Outer touchline border */}
                  <rect x="2" y="2" width="96" height="96" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
                  
                  {/* Halfway line */}
                  <line x1="50" y1="2" x2="50" y2="98" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
                  
                  {/* Center Circle & Center Spot */}
                  <circle cx="50" cy="50" r="14" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
                  <circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.6)" />

                  {/* Left Penalty Area */}
                  <rect x="2" y="24" width="16" height="52" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
                  <rect x="2" y="37" width="6" height="26" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                  <circle cx="12" cy="50" r="0.8" fill="rgba(255,255,255,0.6)" />

                  {/* Right Penalty Area */}
                  <rect x="82" y="24" width="16" height="52" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
                  <rect x="92" y="37" width="6" height="26" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                  <circle cx="88" cy="50" r="0.8" fill="rgba(255,255,255,0.6)" />
                </svg>

                {/* Pitch Overlay Badge */}
                <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[9px] font-mono text-blue-300 border border-blue-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>FORMATION: {stage.format}</span>
                </div>

                <div className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded bg-black/60 text-[9px] font-mono text-slate-300 border border-slate-700">
                  {stage.ballSize}
                </div>

                {/* Formation Player Nodes */}
                {stage.nodes.map((node, i) => (
                  <div
                    key={`${stage.id}-node-${i}`}
                    onMouseEnter={() => setHoveredNode(`${node.labelEn} - ${node.role}`)}
                    onMouseLeave={() => setHoveredNode(null)}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-600 hover:bg-white text-white hover:text-[#061325] border-2 border-white shadow-md flex items-center justify-center font-black text-[9px] sm:text-[10px] transition-transform group-hover:scale-125">
                      {node.labelEn}
                    </div>

                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block whitespace-nowrap bg-[#061325] text-white text-[9px] font-mono px-2 py-0.5 rounded border border-blue-500 shadow-md">
                      {language === 'ka' ? node.role : node.labelEn}
                    </div>
                  </div>
                ))}

              </div>

              {/* Pitch Footer Helper */}
              <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-slate-400 px-1">
                <span>{language === 'ka' ? 'დააჭირეთ მოთამაშეს როლის სანახავად' : 'Interactive formation layout nodes'}</span>
                {hoveredNode && (
                  <span className="text-blue-400 font-bold">{hoveredNode}</span>
                )}
              </div>

            </div>
          </div>

          {/* Right Column: Coaching Blueprint Details */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded bg-blue-100 text-blue-900 text-[10px] font-mono font-black uppercase mb-1.5">
                {stage.years} // {stage.format}
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-[#061325] tracking-tight">
                {language === 'ka' ? stage.titleKa : stage.titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1.5 leading-relaxed">
                {language === 'ka' ? stage.focusKa : stage.focusEn}
              </p>
            </div>

            {/* Tactical Curriculum Bullet List */}
            <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">
                // {language === 'ka' ? 'საწვრთნელი ფოკუსი' : 'CORE CURRICULUM'}
              </div>
              {(language === 'ka' ? stage.tacticsKa : stage.tacticsEn).map((tItem, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span className="font-semibold">{tItem}</span>
                </div>
              ))}
            </div>

            {/* Direct Squad Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/groups"
                className="w-full sm:w-auto px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95 text-center"
              >
                <span>{language === 'ka' ? 'ამ ჯგუფის განრიგი' : 'View Group Schedule'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-5 py-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs transition-all text-center"
              >
                {language === 'ka' ? 'საცდელზე ჩაწერა' : 'Free Trial'}
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
