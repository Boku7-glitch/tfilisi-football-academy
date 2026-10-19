'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  User, 
  Calendar, 
  CreditCard, 
  Clock, 
  MapPin, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  Receipt, 
  Download, 
  ArrowLeft, 
  LogOut, 
  ShieldCheck, 
  Zap, 
  Sparkles,
  Phone,
  Mail,
  FileText,
  ChevronRight,
  Printer,
  Users,
  Plus
} from 'lucide-react';
import { useAcademy, Player, BillingRecord, MatchEvent } from '../../context/AcademyContext';

export default function UserPortalPage() {
  const { 
    currentUser, 
    players, 
    groups, 
    matchEvents, 
    billingRecords, 
    payBillingRecord, 
    logout,
    loginAs,
    addPlayer
  } = useAcademy();

  // Active portal tab
  const [activeTab, setActiveTab] = useState<'schedule' | 'billing' | 'profile'>('schedule');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      logout();
      setIsLoggingOut(false);
    }, 450);
  };

  // Find active player belonging specifically to the logged-in user
  const activePlayer = useMemo(() => {
    if (!currentUser) return null;

    // 1. By explicit assignedPlayerId
    if (currentUser.assignedPlayerId) {
      const found = players.find(p => p.id === currentUser.assignedPlayerId);
      if (found) return found;
    }

    // 2. By email
    if (currentUser.email) {
      const found = players.find(p => 
        (p.parentEmail && p.parentEmail.toLowerCase() === currentUser.email.toLowerCase()) ||
        (`${p.firstName} ${p.lastName}`.toLowerCase() === currentUser.name?.toLowerCase())
      );
      if (found) return found;
    }

    // 3. By name
    if (currentUser.name) {
      const found = players.find(p => 
        (p.parentName && p.parentName.toLowerCase() === currentUser.name.toLowerCase()) ||
        (`${p.firstName} ${p.lastName}`.toLowerCase() === currentUser.name.toLowerCase())
      );
      if (found) return found;
    }

    // No fallback to random accounts!
    return null;
  }, [players, currentUser]);

  // Player's group
  const playerGroup = useMemo(() => {
    if (!activePlayer) return null;
    return groups.find(g => g.id === activePlayer.groupId) || null;
  }, [groups, activePlayer]);

  // Player's scheduled matches (filtered by their group)
  const playerMatches = useMemo(() => {
    if (!activePlayer) return [];
    return matchEvents.filter(m => m.groupId === activePlayer.groupId);
  }, [matchEvents, activePlayer]);

  // Player's billing records
  const playerBilling = useMemo(() => {
    if (!activePlayer) return [];
    return billingRecords.filter(b => b.playerId === activePlayer.id);
  }, [billingRecords, activePlayer]);

  // Current unpaid / pending bill
  const currentPendingBill = useMemo(() => {
    return playerBilling.find(b => b.status === 'pending' || b.status === 'overdue');
  }, [playerBilling]);

  // Onboarding Child Registration State (when parent has no child attached yet)
  const [onboardFirst, setOnboardFirst] = useState('');
  const [onboardLast, setOnboardLast] = useState('');
  const [onboardBirthYear, setOnboardBirthYear] = useState('2014');
  const [onboardGroupId, setOnboardGroupId] = useState(groups[0]?.id || 'grp-u12-saburtalo');
  const [onboardPosition, setOnboardPosition] = useState('ნახევარმცველი');

  const handleRegisterProfileOnboarding = (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = currentUser?.name || 'აკადემიის წევრი';
    const nameParts = fullName.trim().split(' ');
    const memberFirst = onboardFirst || nameParts[0] || 'წევრი';
    const memberLast = onboardLast || nameParts.slice(1).join(' ') || '';
    const group = groups.find(g => g.id === onboardGroupId) || groups[0];
    const newId = `pl-${Date.now()}`;
    addPlayer({
      firstName: memberFirst,
      lastName: memberLast,
      birthYear: Number(onboardBirthYear),
      age: 2026 - Number(onboardBirthYear),
      position: onboardPosition,
      jerseyNumber: 10,
      groupId: group.id,
      groupName: group.name,
      coachId: group.coachId,
      coachName: group.coachName,
      locationId: group.locationId,
      locationName: group.locationName,
      parentName: fullName,
      parentPhone: currentUser?.phone || '+995 5',
      parentEmail: currentUser?.email || '',
      isIndividualTraining: false,
      monthlyFee: group.monthlyFee,
      paymentStatus: 'pending',
      attendanceRate: 100,
      medicalClearance: true
    });
    loginAs('parent', {
      ...currentUser,
      assignedPlayerId: newId
    });
  };

  // Payment Modal State
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'apple_pay' | 'google_pay' | 'visa' | 'mastercard'>('apple_pay');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  // Receipt Modal State
  const [selectedReceipt, setSelectedReceipt] = useState<BillingRecord | null>(null);

  // Handle Pay Action
  const handleExecutePayment = async () => {
    if (!currentPendingBill) return;

    setIsProcessingPayment(true);
    const success = await payBillingRecord(currentPendingBill.id, selectedPaymentMethod);
    setIsProcessingPayment(false);

    if (success) {
      setPaymentDone(true);
      setTimeout(() => {
        setPaymentDone(false);
        setPaymentModalOpen(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* Top Portal Header */}
      <header className="bg-[#061325] border-b border-slate-800 text-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            
            {/* Left: Brand & Portal Badge */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 rounded-full bg-white p-1 border-2 border-blue-400 flex items-center justify-center shrink-0">
                  <img
                    src="/logo/tfilisi-crest-navy.svg"
                    alt="ტფილისი"
                    className="w-full h-full object-contain"
                  />
                </div>
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm sm:text-base tracking-tight uppercase">
                    მომხმარებლის პირადი კაბინეტი
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
                    USER PORTAL
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  მოთამაშის დახურული სივრცე · ტფილისის აკადემია
                </p>
              </div>
            </div>

            {/* Right: User Avatar & Logout */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
                <User className="w-4 h-4 text-sky-400" />
                <span className="font-bold text-slate-200">
                  {currentUser?.name || 'აკადემიის წევრი'}
                </span>
              </div>

              <Link
                href="/"
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">მთავარზე</span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={`w-8 h-8 rounded-xl border transition-all flex items-center justify-center ${
                  isLoggingOut
                    ? 'bg-red-500/30 border-red-400 text-red-200'
                    : 'bg-white/10 hover:bg-red-500/20 text-white/80 hover:text-red-300 border-white/10'
                }`}
                title="გამოსვლა"
                aria-label="გამოსვლა"
              >
                {isLoggingOut ? (
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <LogOut className="w-4 h-4" />
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Portal Tabs Bar */}
        {activePlayer && (
          <div className="bg-[#030e1d] px-4 sm:px-8 border-t border-slate-800/80 overflow-x-auto">
            <div className="max-w-7xl mx-auto flex gap-1 sm:gap-2">
              
              <button
                onClick={() => setActiveTab('schedule')}
                className={`px-4 py-3 text-xs sm:text-sm font-black border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'schedule'
                    ? 'border-blue-500 text-white bg-white/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>განრიგი & მატჩები</span>
                {playerMatches.filter(m => m.status === 'upcoming').length > 0 && (
                  <span className="text-[10px] px-1.5 py-0.2 bg-blue-600 text-white rounded-full font-mono">
                    {playerMatches.filter(m => m.status === 'upcoming').length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('billing')}
                className={`px-4 py-3 text-xs sm:text-sm font-black border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'billing'
                    ? 'border-blue-500 text-white bg-white/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <span>ფინანსები & გადახდა</span>
                {currentPendingBill && (
                  <span className="text-[10px] px-1.5 py-0.2 bg-amber-500 text-slate-950 font-black rounded-full font-mono animate-pulse">
                    გადასახდელია ₾{currentPendingBill.amount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-3 text-xs sm:text-sm font-black border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'profile'
                    ? 'border-blue-500 text-white bg-white/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <User className="w-4 h-4 text-sky-400" />
                <span>პერსონალური პროფილი</span>
              </button>

            </div>
          </div>
        )}
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 w-full space-y-6 animate-page-enter">
        
        {/* ========================================================
            {/* ========================================================
            CASE A: ONBOARDING CARD IF PROFILE NOT ACTIVATED YET
            ======================================================== */}
        {!activePlayer ? (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 space-y-6 max-w-2xl mx-auto">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-200 shadow-xs">
                <Users className="w-8 h-8" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                მოგესალმებით, {currentUser?.name || 'აკადემიის წევრო'}!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                თქვენი პირადი კაბინეტი გააქტიურებულია. სავარჯიშო განრიგის, მატჩებისა და საწევროს სანახავად, გთხოვთ აირჩიოთ თქვენი ასაკობრივი ჯგუფი და პოზიცია:
              </p>
            </div>

            <form onSubmit={handleRegisterProfileOnboarding} className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="text-xs font-black uppercase tracking-wider text-blue-700 pb-1 border-b border-slate-200">
                პროფილის და ჯგუფის აქტივაცია:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    სახელი და გვარი
                  </label>
                  <input
                    type="text"
                    defaultValue={currentUser?.name || ''}
                    onChange={(e) => {
                      const parts = e.target.value.trim().split(' ');
                      setOnboardFirst(parts[0] || '');
                      setOnboardLast(parts.slice(1).join(' ') || '');
                    }}
                    required
                    placeholder="მაგ. საბა ბოკუჩავა"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-medium text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    ასაკობრივი ჯგუფი
                  </label>
                  <select
                    value={onboardGroupId}
                    onChange={(e) => setOnboardGroupId(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 truncate"
                  >
                    {groups.map(g => (
                      <option key={g.id} value={g.id}>
                        {g.name} ({g.birthYears})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  პოზიცია მოედანზე
                </label>
                <select
                  value={onboardPosition}
                  onChange={(e) => setOnboardPosition(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-bold text-slate-800"
                >
                  <option value="ნახევარმცველი">ნახევარმცველი (MID)</option>
                  <option value="თავდამსხმელი">თავდამსხმელი (FWD)</option>
                  <option value="მცველი">მცველი (DEF)</option>
                  <option value="მეკარე">მეკარე (GK)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span>კაბინეტის გააქტიურება</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* ========================================================
              CASE B: CHILD IS REGISTERED & LINKED TO USER
              ======================================================== */
          <>
            {/* Top Player Hero Strip */}
            <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-[#0052ff] via-[#0047e0] to-[#061325] text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-blue-400/20">
              
              <div className="flex items-center gap-4">
                {/* Jersey Number Emblem */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white text-[#0052ff] flex items-center justify-center font-black text-2xl sm:text-3xl shadow-lg shrink-0 border-2 border-blue-200">
                  {activePlayer.jerseyNumber}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg sm:text-2xl font-black tracking-tight">
                      {activePlayer.firstName} {activePlayer.lastName}
                    </h2>
                    <span className="px-2 py-0.5 rounded-full bg-white/20 text-sky-200 text-xs font-bold font-mono">
                      {activePlayer.birthYear} წწ
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm text-sky-200 font-semibold mt-0.5">
                    {activePlayer.position} · {activePlayer.groupName}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-white/80 mt-2">
                    <span className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-sky-300" />
                      <span>მწვრთნელი: {activePlayer.coachName}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-sky-300" />
                      <span>{activePlayer.locationName}</span>
                    </span>
                    <span className="flex items-center gap-1 text-emerald-300">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>სამედიცინო ფორმა: დამოწმებული</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Status Pill */}
              <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-3 md:pt-0 border-white/10 shrink-0">
                <span className="text-[11px] uppercase font-bold text-white/70">
                  მიმდინარე სტატუსი
                </span>
                {currentPendingBill ? (
                  <button
                    type="button"
                    onClick={() => setPaymentModalOpen(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-1.5 active:scale-95"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>გადახდა (₾{currentPendingBill.amount})</span>
                  </button>
                ) : (
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-black text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>საწევრო გადახდილია</span>
                  </span>
                )}
              </div>

            </div>

            {/* TAB 1: DYNAMIC SCHEDULE */}
            {activeTab === 'schedule' && (
              <div className="space-y-6">
                
                {/* Upcoming Match Reminder Alert */}
                {playerMatches.filter(m => m.status === 'upcoming').length > 0 && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                        <Sparkles className="w-5 h-5 text-amber-300" />
                      </div>
                      <div>
                        <div className="text-xs font-black uppercase tracking-wider text-blue-700">
                          შეტყობინება მწვრთნელისგან: მოახლოებული თამაში!
                        </div>
                        <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                          {playerMatches[0].title} — მეტოქე: {playerMatches[0].opponent}
                        </div>
                        <div className="text-xs text-slate-600 mt-0.5">
                          {playerMatches[0].date} · {playerMatches[0].time} · {playerMatches[0].venue}
                        </div>
                      </div>
                    </div>

                    <div className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold text-center shrink-0">
                      კალენდარში ასახულია
                    </div>
                  </div>
                )}

                {/* Weekly Regular Training Grid */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <span>ყოველკვირეული სავარჯიშო განრიგი</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {playerGroup?.name} · {playerGroup?.locationName}
                      </p>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {playerGroup?.days}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <div className="text-lg font-black text-slate-900 font-mono">
                      {playerGroup?.hours}
                    </div>
                    <div className="text-xs text-slate-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{playerGroup?.pitch} · {playerGroup?.locationName}</span>
                    </div>
                  </div>
                </div>

                {/* Coach Scheduled Matches & Tournaments Feed */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-500" />
                        <span>მწვრთნელის მიერ დაგეგმილი მატჩები & ტურნირები</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        განრიგი ავტომატურად იგზავნება მწვრთნელის მიერ
                      </p>
                    </div>
                  </div>

                  {playerMatches.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400 font-bold bg-slate-50 rounded-xl">
                      ამ ჯგუფისთვის მატჩები ჯერ არ არის ჩანიშნული
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {playerMatches.map((match) => (
                        <div
                          key={match.id}
                          className="p-4 rounded-2xl border border-slate-200 hover:border-blue-400 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="flex items-start gap-3.5">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex flex-col items-center justify-center shrink-0">
                              <span className="text-[10px] font-mono font-bold">
                                {match.date.split('-')[1]}/{match.date.split('-')[2]}
                              </span>
                              <span className="text-xs font-black">{match.time}</span>
                            </div>

                            <div>
                              <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                                  match.type === 'tournament' ? 'bg-amber-100 text-amber-900' : 'bg-blue-100 text-blue-900'
                                }`}>
                                  {match.type === 'tournament' ? '🏆 ტურნირი' : '⚽ ოფიციალური მატჩი'}
                                </span>
                                <span className="text-xs font-bold text-slate-500">
                                  მეტოქე: <strong className="text-slate-900">{match.opponent}</strong>
                                </span>
                              </div>

                              <h4 className="font-black text-sm text-slate-900 mt-1">
                                {match.title}
                              </h4>

                              <div className="text-xs text-slate-600 flex items-center gap-1.5 mt-1">
                                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                <span>{match.venue}</span>
                              </div>

                              {match.notes && (
                                <div className="text-xs text-slate-500 italic mt-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                                  💡 მწვრთნელის შენიშვნა: {match.notes}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="shrink-0 flex items-center gap-2 self-end sm:self-center">
                            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
                              {match.status === 'upcoming' ? 'დაგეგმილი' : 'დასრულებული'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* TAB 2: BILLING */}
            {activeTab === 'billing' && (
              <div className="space-y-6">
                
                {/* Current Month Payment Status Banner */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        მიმდინარე თვის საწევრო გადასახადი
                      </span>
                      <h3 className="text-lg font-black text-slate-900 mt-0.5">
                        ოქტომბერი 2026 — საბავშვო აკადემია
                      </h3>
                      <p className="text-xs text-slate-500">
                        ვადა: 25 ოქტომბრამდე · მოიცავს ყოველკვირეულ ვარჯიშებს, სათამაშო ფორმას და ტურნირებს
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                        ₾{activePlayer.monthlyFee}.00
                      </div>
                      <div className="text-xs font-bold text-slate-500">თვიური ფიქსირებული საფასური</div>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {currentPendingBill ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold bg-amber-50 text-amber-800 border border-amber-200">
                          <AlertCircle className="w-4 h-4 text-amber-600" />
                          <span>საფასური გადასახდელია (ვადა: {currentPendingBill.dueDate})</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>მიმდინარე თვის საფასური სრულად გადახდილია!</span>
                        </span>
                      )}
                    </div>

                    {currentPendingBill && (
                      <button
                        type="button"
                        onClick={() => setPaymentModalOpen(true)}
                        className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>საფასურის ონლაინ გადახდა (₾{currentPendingBill.amount})</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Invoices & Payment Receipts History */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                        <Receipt className="w-5 h-5 text-blue-600" />
                        <span>გადახდების ისტორია & ელექტრონული ჩეკები</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        წინა თვეების ქვითრები და ოფიციალური ინვოისები
                      </p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black uppercase tracking-wider text-slate-500">
                          <th className="py-3 px-4">ჩეკი #</th>
                          <th className="py-3 px-4">პერიოდი</th>
                          <th className="py-3 px-4">თანხა</th>
                          <th className="py-3 px-4">თარიღი</th>
                          <th className="py-3 px-4">გადახდის მეთოდი</th>
                          <th className="py-3 px-4">სტატუსი</th>
                          <th className="py-3 px-4 text-right">ქვითარი</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {playerBilling.map((bill) => (
                          <tr key={bill.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3 px-4 font-mono font-bold text-slate-700">
                              {bill.receiptNumber || bill.id}
                            </td>
                            <td className="py-3 px-4 font-bold text-slate-900">
                              {bill.month} {bill.year}
                            </td>
                            <td className="py-3 px-4 font-mono font-black text-slate-900">
                              ₾{bill.amount}.00
                            </td>
                            <td className="py-3 px-4 text-slate-500">
                              {bill.paidAt || `ვადა: ${bill.dueDate}`}
                            </td>
                            <td className="py-3 px-4">
                              {bill.paymentMethod ? (
                                <span className="font-bold text-slate-700 uppercase font-mono text-[11px]">
                                  {bill.paymentMethod.replace('_', ' ')}
                                </span>
                              ) : (
                                <span className="text-slate-400 font-mono">—</span>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              {bill.status === 'paid' ? (
                                <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800">
                                  გადახდილი
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 text-amber-800">
                                  გადასახდელი
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-right">
                              {bill.status === 'paid' ? (
                                <button
                                  type="button"
                                  onClick={() => setSelectedReceipt(bill)}
                                  className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[11px] transition-colors inline-flex items-center gap-1"
                                >
                                  <Download className="w-3 h-3" />
                                  <span>ნახვა</span>
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setPaymentModalOpen(true)}
                                  className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] transition-colors"
                                >
                                  გადახდა
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: PROFILE */}
            {activeTab === 'profile' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
                <h3 className="font-black text-lg text-slate-900 border-b border-slate-100 pb-3">
                  მოთამაშისა და მშობლის საკონტაქტო ბარათი
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Child Info */}
                  <div className="space-y-3">
                    <div className="text-xs font-black uppercase text-blue-700">
                      მოთამაშის მონაცემები:
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between p-2.5 rounded-xl bg-slate-50">
                        <span className="text-slate-500">სრული სახელი:</span>
                        <span className="font-bold text-slate-900">{activePlayer.firstName} {activePlayer.lastName}</span>
                      </div>
                      <div className="flex justify-between p-2.5 rounded-xl bg-slate-50">
                        <span className="text-slate-500">დაბადების წელი / ასაკი:</span>
                        <span className="font-bold text-slate-900">{activePlayer.birthYear} წწ ({activePlayer.age} წელი)</span>
                      </div>
                      <div className="flex justify-between p-2.5 rounded-xl bg-slate-50">
                        <span className="text-slate-500">პოზიცია მოედანზე:</span>
                        <span className="font-bold text-slate-900">{activePlayer.position}</span>
                      </div>
                      <div className="flex justify-between p-2.5 rounded-xl bg-slate-50">
                        <span className="text-slate-500">მაისურის ნომერი:</span>
                        <span className="font-black text-blue-700">#{activePlayer.jerseyNumber}</span>
                      </div>
                      <div className="flex justify-between p-2.5 rounded-xl bg-slate-50">
                        <span className="text-slate-500">მიმაგრებული ჯგუფი:</span>
                        <span className="font-bold text-slate-900">{activePlayer.groupName}</span>
                      </div>
                      <div className="flex justify-between p-2.5 rounded-xl bg-slate-50">
                        <span className="text-slate-500">მთავარი მწვრთნელი:</span>
                        <span className="font-bold text-blue-700">{activePlayer.coachName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Parent Info */}
                  <div className="space-y-3">
                    <div className="text-xs font-black uppercase text-blue-700">
                      მშობლის საკონტაქტო მონაცემები:
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between p-2.5 rounded-xl bg-slate-50">
                        <span className="text-slate-500">მშობლის სახელი, გვარი:</span>
                        <span className="font-bold text-slate-900">{currentUser?.name || activePlayer.parentName}</span>
                      </div>
                      <div className="flex justify-between p-2.5 rounded-xl bg-slate-50">
                        <span className="text-slate-500">ტელეფონის ნომერი:</span>
                        <span className="font-mono font-bold text-blue-600">
                          {currentUser?.phone || activePlayer.parentPhone}
                        </span>
                      </div>
                      <div className="flex justify-between p-2.5 rounded-xl bg-slate-50">
                        <span className="text-slate-500">ელექტრონული ფოსტა:</span>
                        <span className="font-bold text-slate-900">{currentUser?.email || activePlayer.parentEmail}</span>
                      </div>
                      <div className="flex justify-between p-2.5 rounded-xl bg-slate-50">
                        <span className="text-slate-500">სამედიცინო შემოწმება:</span>
                        <span className="font-bold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> გავლილია
                        </span>
                      </div>
                      <div className="flex justify-between p-2.5 rounded-xl bg-slate-50">
                        <span className="text-slate-500">სავარჯიშო ცენტრი:</span>
                        <span className="font-bold text-slate-900">{activePlayer.locationName}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </>
        )}

      </main>

      {/* ONLINE PAYMENT CHECKOUT MODAL */}
      {paymentModalOpen && currentPendingBill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md modal-backdrop-in">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden modal-box-in">
            
            <div className="bg-[#061325] px-6 py-4 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-5 h-5 text-sky-400" />
                <h3 className="font-black text-base">საფასურის ონლაინ გადახდა</h3>
              </div>
              <button
                type="button"
                onClick={() => setPaymentModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">დანიშნულება:</span>
                  <span className="font-bold text-slate-900">საბავშვო აკადემია (ოქტომბერი 2026)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">მოთამაშე:</span>
                  <span className="font-bold text-slate-900">{activePlayer?.firstName} {activePlayer?.lastName}</span>
                </div>
                <div className="flex justify-between text-sm font-black pt-2 border-t border-slate-200">
                  <span className="text-slate-900">გადასახდელი თანხა:</span>
                  <span className="text-blue-700 font-mono">₾{currentPendingBill.amount}.00</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  გადახდის მეთოდი:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('apple_pay')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedPaymentMethod === 'apple_pay'
                        ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600 font-black text-slate-900'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold"> Apple Pay</div>
                    <div className="text-[10px] text-slate-500">მომენტალური</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('google_pay')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedPaymentMethod === 'google_pay'
                        ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600 font-black text-slate-900'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold">G Pay (Google)</div>
                    <div className="text-[10px] text-slate-500">მომენტალური</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('visa')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedPaymentMethod === 'visa'
                        ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600 font-black text-slate-900'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-blue-700">VISA</div>
                    <div className="text-[10px] text-slate-500">საბანკო ბარათი</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('mastercard')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedPaymentMethod === 'mastercard'
                        ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600 font-black text-slate-900'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-red-600">Mastercard</div>
                    <div className="text-[10px] text-slate-500">საბანკო ბარათი</div>
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleExecutePayment}
                disabled={isProcessingPayment || paymentDone}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-4"
              >
                {isProcessingPayment ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>ტრანზაქცია მუშავდება...</span>
                  </>
                ) : paymentDone ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                    <span>გადახდა წარმატებულია!</span>
                  </>
                ) : (
                  <>
                    <span>გადახდა ₾{currentPendingBill.amount}.00</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center text-[10px] text-slate-400">
                🔒 დაცული ტრანზაქცია · 256-bit SSL დაშიფვრა · BOG/TBC Gateway
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ELECTRONIC RECEIPT MODAL */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md modal-backdrop-in">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden modal-box-in p-6 space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs">
                  TF
                </div>
                <div>
                  <h4 className="font-black text-sm text-slate-900">საფეხბურთო აკადემია ტფილისი</h4>
                  <div className="text-[10px] text-slate-400">ოფიციალური ელექტრონული ქვითარი</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReceipt(null)}
                className="text-slate-400 hover:text-slate-900 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">ქვითრის #:</span>
                <span className="font-mono font-bold text-slate-900">{selectedReceipt.receiptNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">ტრანზაქციის ID:</span>
                <span className="font-mono font-bold text-slate-900">{selectedReceipt.transactionId || 'TX-94827'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">მოთამაშე:</span>
                <span className="font-bold text-slate-900">{selectedReceipt.playerName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">პერიოდი:</span>
                <span className="font-bold text-slate-900">{selectedReceipt.month} {selectedReceipt.year}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">გადახდის თარიღი:</span>
                <span className="font-bold text-slate-900">{selectedReceipt.paidAt}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">გადახდის მეთოდი:</span>
                <span className="font-bold uppercase text-slate-900 font-mono">
                  {selectedReceipt.paymentMethod?.replace('_', ' ') || 'ონლაინ'}
                </span>
              </div>
              <div className="flex justify-between py-2 text-sm font-black pt-3">
                <span className="text-slate-900">სულ გადახდილი:</span>
                <span className="text-emerald-600 font-mono">₾{selectedReceipt.amount}.00</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-[11px] font-semibold flex items-center gap-2 border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>გადახდა დადასტურებულია აკადემიის ფინანსური დეპარტამენტის მიერ.</span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>ბეჭდვა</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedReceipt(null)}
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
              >
                დახურვა
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Floating Logout Exit Feedback Toast */}
      {isLoggingOut && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#061325] text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-toast-slide">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
          <span className="text-xs font-bold">სისტემიდან გამოსვლა...</span>
        </div>
      )}

    </div>
  );
}
