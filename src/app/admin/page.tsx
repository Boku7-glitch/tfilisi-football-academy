'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Calendar, 
  CreditCard, 
  Award, 
  Shield, 
  Plus, 
  Search, 
  Filter, 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowLeft, 
  Trash2, 
  Edit, 
  ExternalLink,
  ChevronDown,
  Sparkles,
  Zap,
  Check,
  Send,
  Download,
  Receipt,
  LogOut
} from 'lucide-react';
import { useAcademy, Player, MatchEvent } from '../../context/AcademyContext';

export default function AdminPage() {
  const { 
    currentUser, 
    loginAs, 
    players, 
    groups, 
    matchEvents, 
    billingRecords,
    addMatchEvent,
    deleteMatchEvent,
    addPlayer,
    updatePlayer,
    deletePlayer,
    sendPaymentReminder,
    markRecordPaidManually,
    logout
  } = useAcademy();

  // Active top tab in admin panel
  const [activeTab, setActiveTab] = useState<'roster' | 'finance' | 'matches' | 'cms'>('roster');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      logout();
      setIsLoggingOut(false);
    }, 450);
  };

  // Search & Filter state for kids roster
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroupFilter, setSelectedGroupFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [selectedTrainingType, setSelectedTrainingType] = useState('all');

  // New Match Modal state
  const [matchModalOpen, setMatchModalOpen] = useState(false);
  const [newMatchGroup, setNewMatchGroup] = useState(groups[0]?.id || '');
  const [newMatchType, setNewMatchType] = useState<'match' | 'tournament' | 'friendly'>('match');
  const [newMatchTitle, setNewMatchTitle] = useState('');
  const [newMatchOpponent, setNewMatchOpponent] = useState('');
  const [newMatchDate, setNewMatchDate] = useState('2026-10-30');
  const [newMatchTime, setNewMatchTime] = useState('14:00');
  const [newMatchVenue, setNewMatchVenue] = useState('საბურთალოს კომპლექსი (მოედანი A)');
  const [newMatchNotes, setNewMatchNotes] = useState('');

  // New Player Modal state
  const [playerModalOpen, setPlayerModalOpen] = useState(false);
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newBirthYear, setNewBirthYear] = useState(2014);
  const [newPosition, setNewPosition] = useState('ნახევარმცველი');
  const [newJersey, setNewJersey] = useState(11);
  const [newPlayerGroup, setNewPlayerGroup] = useState(groups[0]?.id || '');
  const [newParentName, setNewParentName] = useState('');
  const [newParentPhone, setNewParentPhone] = useState('+995 5');
  const [newParentEmail, setNewParentEmail] = useState('');
  const [newIsIndividual, setNewIsIndividual] = useState(false);
  const [newFee, setNewFee] = useState(150);

  // Notification Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Filtered Players list
  const filteredPlayers = useMemo(() => {
    return players.filter(player => {
      const matchesSearch = 
        `${player.firstName} ${player.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.parentPhone.includes(searchQuery) ||
        player.parentName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesGroup = selectedGroupFilter === 'all' || player.groupId === selectedGroupFilter;
      const matchesStatus = selectedStatusFilter === 'all' || player.paymentStatus === selectedStatusFilter;
      const matchesType = selectedTrainingType === 'all' || 
        (selectedTrainingType === 'individual' ? player.isIndividualTraining : !player.isIndividualTraining);

      return matchesSearch && matchesGroup && matchesStatus && matchesType;
    });
  }, [players, searchQuery, selectedGroupFilter, selectedStatusFilter, selectedTrainingType]);

  // Financial KPIs
  const totalRevenueCollected = useMemo(() => {
    return billingRecords
      .filter(b => b.status === 'paid' && b.month === 'ოქტომბერი')
      .reduce((sum, b) => sum + b.amount, 0);
  }, [billingRecords]);

  const totalOutstandingDebt = useMemo(() => {
    return billingRecords
      .filter(b => b.status === 'overdue' && b.month === 'ოქტომბერი')
      .reduce((sum, b) => sum + b.amount, 0);
  }, [billingRecords]);

  const debtorsList = useMemo(() => {
    return billingRecords.filter(b => b.status === 'overdue' && b.month === 'ოქტომბერი');
  }, [billingRecords]);

  // Handle Match Submit
  const handleCreateMatch = (e: React.FormEvent) => {
    e.preventDefault();
    const group = groups.find(g => g.id === newMatchGroup);
    if (!group) return;

    addMatchEvent({
      groupId: group.id,
      groupName: group.name,
      type: newMatchType,
      title: newMatchTitle || `${newMatchType === 'tournament' ? 'ტურნირი' : 'მატჩი'}: ${newMatchOpponent}`,
      opponent: newMatchOpponent,
      date: newMatchDate,
      time: newMatchTime,
      venue: newMatchVenue,
      notes: newMatchNotes,
      createdByCoachId: currentUser?.id || 'admin'
    });

    setMatchModalOpen(false);
    setNewMatchTitle('');
    setNewMatchOpponent('');
    setNewMatchNotes('');
    showToast(`✅ მატჩი/ტურნირი წარმატებით ჩაინიშნა და აისახა ${group.name}-ის ყველა ბავშვის კალენდარში!`);
  };

  // Handle Player Submit
  const handleCreatePlayer = (e: React.FormEvent) => {
    e.preventDefault();
    const group = groups.find(g => g.id === newPlayerGroup);
    if (!group) return;

    addPlayer({
      firstName: newFirstName,
      lastName: newLastName,
      birthYear: Number(newBirthYear),
      age: 2026 - Number(newBirthYear),
      position: newPosition,
      jerseyNumber: Number(newJersey),
      groupId: group.id,
      groupName: group.name,
      coachId: group.coachId,
      coachName: group.coachName,
      locationId: group.locationId,
      locationName: group.locationName,
      parentName: newParentName,
      parentPhone: newParentPhone,
      parentEmail: newParentEmail,
      isIndividualTraining: newIsIndividual,
      monthlyFee: Number(newFee),
      paymentStatus: 'pending',
      attendanceRate: 100,
      medicalClearance: true
    });

    setPlayerModalOpen(false);
    setNewFirstName('');
    setNewLastName('');
    setNewParentName('');
    showToast(`✅ მოთამაშე ${newFirstName} ${newLastName} წარმატებით დაემატა ჯგუფში ${group.name}!`);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 max-w-md p-4 bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Bell className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Header Bar */}
      <header className="bg-[#061325] border-b border-slate-800 text-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            
            {/* Left: Brand & Title */}
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
                    სამწვრთნელო და სამენეჯერო პანელი
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-mono font-bold border border-blue-500/30">
                    COACH & SQUAD
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  სისტემის მართვა · სამწვრთნელო შტაბი & მენეჯმენტი
                </p>
              </div>
            </div>

            {/* Right: Profile Badge & Back to Site */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Profile Badge */}
              <div className="hidden sm:flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
                <Award className="w-4 h-4 text-sky-400" />
                <span className="font-bold text-slate-200">
                  {currentUser?.name || 'მწვრთნელი / მენეჯერი'}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-600 text-white font-mono uppercase">
                  მწვრთნელი / მენეჯერი
                </span>
              </div>

              {/* Back to Public Site */}
              <Link
                href="/"
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">საიტზე დაბრუნება</span>
              </Link>

              {/* Logout Button */}
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
                  <LogOut className="w-3.5 h-3.5" />
                )}
              </button>

            </div>

          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="bg-[#030e1d] px-4 sm:px-8 border-t border-slate-800/80 overflow-x-auto">
          <div className="max-w-7xl mx-auto flex gap-1 sm:gap-2">
            
            <button
              onClick={() => setActiveTab('roster')}
              className={`px-3.5 sm:px-4 py-3 text-xs sm:text-sm font-black border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'roster'
                  ? 'border-blue-500 text-white bg-white/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Users className="w-4 h-4 text-blue-400" />
              <span>ბავშვების სია & ჯგუფები</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-blue-600/40 text-blue-200 rounded-full font-mono">
                {players.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('finance')}
              className={`px-3.5 sm:px-4 py-3 text-xs sm:text-sm font-black border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'finance'
                  ? 'border-blue-500 text-white bg-white/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <span>ფინანსური რეპორტინგი</span>
              {debtorsList.length > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 bg-red-500 text-white rounded-full font-mono animate-pulse">
                  {debtorsList.length} დავალიანება
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('matches')}
              className={`px-3.5 sm:px-4 py-3 text-xs sm:text-sm font-black border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'matches'
                  ? 'border-blue-500 text-white bg-white/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>მწვრთნელის მოდული (მატჩები)</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-slate-700 text-slate-300 rounded-full font-mono">
                {matchEvents.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('cms')}
              className={`px-3.5 sm:px-4 py-3 text-xs sm:text-sm font-black border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'cms'
                  ? 'border-blue-500 text-white bg-white/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Award className="w-4 h-4 text-purple-400" />
              <span>აკადემიის მართვა (CMS)</span>
            </button>

          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 w-full space-y-6 animate-page-enter">
        
        {/* ========================================================
            TAB 1: PRIVATE KIDS ROSTER & GROUPS (Davit Dvali Admin Area)
            ======================================================== */}
        {activeTab === 'roster' && (
          <div className="space-y-6">
            
            {/* Confidentiality Notice */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-between gap-3 text-amber-900">
              <div className="flex items-center gap-2.5 min-w-0">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <div className="text-xs sm:text-sm">
                  <strong className="font-black">კონფიდენციალური სამწვრთნელო სივრცე:</strong>{' '}
                  ბავშვების პერსონალური სია და მშობლების კონტაქტები საჯაროდ არ ჩანს და ხელმისაწვდომია მხოლოდ სამწვრთნელო შტაბისა და მენეჯერებისთვის.
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPlayerModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shrink-0 flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>მოთამაშის დამატება</span>
              </button>
            </div>

            {/* Quick Headcount KPI Cards per group ("ვისთან რა ხდება, რამდენი ადიან, რომელ საათებში") */}
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                ჯგუფების დატვირთვა & განრიგები:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {groups.map((group) => {
                  const enrolledCount = players.filter(p => p.groupId === group.id).length;
                  const capacityPercent = Math.round((enrolledCount / group.maxCapacity) * 100);

                  return (
                    <div 
                      key={group.id}
                      className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-blue-400 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                            {group.category}
                          </span>
                          <span className="text-xs font-bold text-slate-500">
                            {enrolledCount} / {group.maxCapacity} ბავშვი
                          </span>
                        </div>
                        <h4 className="font-extrabold text-xs text-slate-900 leading-snug">
                          {group.name}
                        </h4>
                        <div className="mt-2 space-y-1 text-[11px] text-slate-600">
                          <div className="flex items-center gap-1.5">
                            <Award className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span className="font-semibold text-slate-800">{group.coachName}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{group.hours} ({group.days})</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate">{group.locationName}</span>
                          </div>
                        </div>
                      </div>

                      {/* Headcount Bar */}
                      <div className="mt-3 pt-2 border-t border-slate-100">
                        <div className="flex justify-between text-[10px] text-slate-400 font-bold mb-1">
                          <span>დატვირთვა</span>
                          <span>{capacityPercent}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              capacityPercent >= 90 ? 'bg-amber-500' : 'bg-blue-600'
                            }`}
                            style={{ width: `${Math.min(capacityPercent, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="მოძებნეთ მოთამაშე, მშობელი, ტელეფონის ნომერი..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 text-slate-900"
                  />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Group Filter */}
                  <select
                    value={selectedGroupFilter}
                    onChange={(e) => setSelectedGroupFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white"
                  >
                    <option value="all">ყველა ჯგუფი ({players.length})</option>
                    {groups.map(g => (
                      <option key={g.id} value={g.id}>{g.category} - {g.name}</option>
                    ))}
                  </select>

                  {/* Payment Status Filter */}
                  <select
                    value={selectedStatusFilter}
                    onChange={(e) => setSelectedStatusFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white"
                  >
                    <option value="all">ყველა სტატუსი</option>
                    <option value="paid">✅ გადახდილი</option>
                    <option value="pending">⏳ მოლოდინში</option>
                    <option value="overdue">⚠️ დავალიანება</option>
                  </select>

                  {/* Training Type */}
                  <select
                    value={selectedTrainingType}
                    onChange={(e) => setSelectedTrainingType(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white"
                  >
                    <option value="all">ყველა პროგრამა</option>
                    <option value="standard">სტანდარტული</option>
                    <option value="individual">ინდივიდუალური (⚡)</option>
                  </select>
                </div>

              </div>
            </div>

            {/* Players Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black uppercase tracking-wider text-slate-500">
                      <th className="py-3.5 px-4">მოთამაშე / #</th>
                      <th className="py-3.5 px-4">ჯგუფი & მწვრთნელი</th>
                      <th className="py-3.5 px-4">განრიგი & ლოკაცია</th>
                      <th className="py-3.5 px-4">მშობლის კონტაქტი</th>
                      <th className="py-3.5 px-4">პროგრამა / საფასური</th>
                      <th className="py-3.5 px-4">სტატუსი</th>
                      <th className="py-3.5 px-4 text-right">მოქმედება</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs text-slate-800">
                    {filteredPlayers.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400 font-bold">
                          მოთამაშეები მითითებული ფილტრით ვერ მოიძებნა
                        </td>
                      </tr>
                    ) : (
                      filteredPlayers.map((player) => (
                        <tr key={player.id} className="hover:bg-slate-50/70 transition-colors">
                          
                          {/* Player info */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-blue-700 text-white font-black text-xs flex items-center justify-center shrink-0">
                                {player.jerseyNumber}
                              </div>
                              <div>
                                <div className="font-extrabold text-slate-900">
                                  {player.firstName} {player.lastName}
                                </div>
                                <div className="text-[10px] text-slate-400 font-mono">
                                  {player.birthYear} წწ ({player.age} წ.) · {player.position}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Group & Coach */}
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900">{player.groupName}</div>
                            <div className="text-[11px] text-blue-700 font-semibold flex items-center gap-1">
                              <Award className="w-3 h-3" />
                              <span>{player.coachName}</span>
                            </div>
                          </td>

                          {/* Hours & Location */}
                          <td className="py-3.5 px-4">
                            <div className="font-medium text-slate-700">
                              {groups.find(g => g.id === player.groupId)?.hours || '15:30 - 17:00'}
                            </div>
                            <div className="text-[11px] text-slate-400 truncate max-w-[160px]">
                              {player.locationName}
                            </div>
                          </td>

                          {/* Parent Contacts */}
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-900">{player.parentName}</div>
                            <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                              <Phone className="w-3 h-3 text-emerald-600" />
                              <a href={`tel:${player.parentPhone}`} className="hover:underline">
                                {player.parentPhone}
                              </a>
                            </div>
                          </td>

                          {/* Program & Fee */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1.5 font-bold text-slate-900">
                              {player.isIndividualTraining ? (
                                <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-extrabold border border-amber-200">
                                  <Zap className="w-2.5 h-2.5 fill-current" /> ინდივიდუალური
                                </span>
                              ) : (
                                <span className="text-[11px] text-slate-500">სტანდარტული</span>
                              )}
                            </div>
                            <div className="text-xs font-mono font-black text-slate-700">
                              ₾{player.monthlyFee}/თვე
                            </div>
                          </td>

                          {/* Payment Status */}
                          <td className="py-3.5 px-4">
                            {player.paymentStatus === 'paid' && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <CheckCircle className="w-3 h-3" /> გადახდილი
                              </span>
                            )}
                            {player.paymentStatus === 'pending' && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
                                <Clock className="w-3 h-3" /> მოლოდინში
                              </span>
                            )}
                            {player.paymentStatus === 'overdue' && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-red-50 text-red-700 border border-red-200">
                                <AlertTriangle className="w-3 h-3" /> დავალიანება
                              </span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {player.paymentStatus === 'overdue' && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const res = sendPaymentReminder(player.id);
                                    showToast(res.message);
                                  }}
                                  className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 transition-colors"
                                  title="შეხსენების გაგზავნა"
                                >
                                  <Send className="w-3.5 h-3.5" />
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`დარწმუნებული ხართ რომ გსურთ ${player.firstName} ${player.lastName}-ის წაშლა?`)) {
                                    deletePlayer(player.id);
                                    showToast(`მოთამაშე წაიშალა.`);
                                  }
                                }}
                                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-red-600 transition-colors"
                                title="წაშლა"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>

                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================
            TAB 2: FINANCIAL REPORTING & DEBTORS (Back-end Billing Module)
            ======================================================== */}
        {activeTab === 'finance' && (
          <div className="space-y-6">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1">
                  მიმდინარე თვის შემოსავალი
                </div>
                <div className="text-2xl font-black text-slate-900 font-mono">
                  ₾{totalRevenueCollected.toLocaleString()}
                </div>
                <div className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>ოქტომბერი 2026</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-red-200 shadow-2xs bg-gradient-to-br from-white to-red-50/30">
                <div className="text-[11px] font-black uppercase tracking-wider text-red-600 mb-1">
                  ჯამური დავალიანება
                </div>
                <div className="text-2xl font-black text-red-600 font-mono">
                  ₾{totalOutstandingDebt.toLocaleString()}
                </div>
                <div className="text-[11px] text-red-500 font-bold mt-1">
                  {debtorsList.length} მოთამაშე ვადაგადაცილებით
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1">
                  სტანდარტული ჯგუფები
                </div>
                <div className="text-2xl font-black text-blue-700 font-mono">
                  ₾{billingRecords
                    .filter(b => b.trainingType === 'standard' && b.status === 'paid')
                    .reduce((s, b) => s + b.amount, 0)
                    .toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-500 font-bold mt-1">
                  აკადემიის საწევრო გადასახადები
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1">
                  ინდივიდუალური პროგრამები
                </div>
                <div className="text-2xl font-black text-amber-600 font-mono">
                  ₾{billingRecords
                    .filter(b => b.trainingType === 'individual' && b.status === 'paid')
                    .reduce((s, b) => s + b.amount, 0)
                    .toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-500 font-bold mt-1">
                  დამატებითი ინდივიდუალური ვარჯიშები
                </div>
              </div>

            </div>

            {/* Debtor Auto-Reminder Action Card */}
            {debtorsList.length > 0 && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0">
                    <Bell className="w-5 h-5 animate-bounce" />
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-red-950">
                      დავალიანების შეხსენების სისტემა (ავტომატური SMS / Email)
                    </div>
                    <div className="text-xs text-red-800">
                      ნაპოვნია {debtorsList.length} მოთამაშე გადაუხდელი საწევროთი. შეგიძლიათ ერთდროულად გაუგზავნოთ შეხსენება.
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    debtorsList.forEach(d => sendPaymentReminder(d.playerId));
                    showToast(`📲 შეტყობინება წარმატებით გაეგზავნა ${debtorsList.length} მშობელს!`);
                  }}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-xs shadow-sm transition-all flex items-center justify-center gap-2 shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span>ყველა დავალიანებაზე შეხსენების გაგზავნა</span>
                </button>
              </div>
            )}

            {/* Invoices & Transactions Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="font-black text-slate-900 text-sm sm:text-base">
                    საწევროების ბილინგის რეესტრი (ოქტომბერი 2026)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Visa, Mastercard, Apple Pay, Google Pay და ნაღდი გადახდების რეესტრი
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black uppercase tracking-wider text-slate-500">
                      <th className="py-3 px-4">ინვოისი #</th>
                      <th className="py-3 px-4">მოთამაშე & ჯგუფი</th>
                      <th className="py-3 px-4">პროგრამა</th>
                      <th className="py-3 px-4">თანხა</th>
                      <th className="py-3 px-4">ვადა / თარიღი</th>
                      <th className="py-3 px-4">მეთოდი / TX</th>
                      <th className="py-3 px-4">სტატუსი</th>
                      <th className="py-3 px-4 text-right">ადმინ მოქმედება</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {billingRecords.map((record) => (
                      <tr key={record.id} className="hover:bg-slate-50/70 transition-colors">
                        
                        <td className="py-3 px-4 font-mono font-bold text-slate-600 text-[11px]">
                          {record.receiptNumber || record.id}
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-extrabold text-slate-900">{record.playerName}</div>
                          <div className="text-[11px] text-slate-500 truncate max-w-[180px]">
                            {record.groupName}
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          {record.trainingType === 'individual' ? (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">
                              ⚡ ინდივიდუალური
                            </span>
                          ) : (
                            <span className="text-[11px] text-slate-600">სტანდარტული</span>
                          )}
                        </td>

                        <td className="py-3 px-4 font-mono font-black text-slate-900 text-sm">
                          ₾{record.amount}.00
                        </td>

                        <td className="py-3 px-4 text-[11px]">
                          {record.status === 'paid' ? (
                            <span className="text-emerald-700 font-semibold">
                              გადახდილია: {record.paidAt}
                            </span>
                          ) : (
                            <span className={record.status === 'overdue' ? 'text-red-600 font-bold' : 'text-slate-500'}>
                              ვადა: {record.dueDate}
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-4 text-[11px]">
                          {record.paymentMethod ? (
                            <div className="flex items-center gap-1 font-bold text-slate-700 uppercase font-mono">
                              <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                              <span>{record.paymentMethod.replace('_', ' ')}</span>
                            </div>
                          ) : (
                            <span className="text-slate-400 font-mono">—</span>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          {record.status === 'paid' && (
                            <span className="px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-emerald-100 text-emerald-800">
                              გადახდილი
                            </span>
                          )}
                          {record.status === 'pending' && (
                            <span className="px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-blue-100 text-blue-800">
                              მოლოდინში
                            </span>
                          )}
                          {record.status === 'overdue' && (
                            <span className="px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-red-100 text-red-800">
                              დავალიანება
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-4 text-right">
                          {record.status !== 'paid' ? (
                            <button
                              type="button"
                              onClick={() => {
                                markRecordPaidManually(record.id);
                                showToast(`✅ ინვოისი #${record.receiptNumber} მონიშნულია გადახდილად.`);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold shadow-2xs transition-colors"
                            >
                              გადახდილად მონიშვნა
                            </button>
                          ) : (
                            <span className="text-[11px] text-slate-400 font-mono">
                              #{record.transactionId}
                            </span>
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

        {/* ========================================================
            TAB 3: COACH MODULE (Match & Tournament Scheduler)
            ======================================================== */}
        {activeTab === 'matches' && (
          <div className="space-y-6">
            
            {/* Header info */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-900 to-[#061325] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold">
                  სამწვრთნელო კალენდარი
                </span>
                <h3 className="text-base sm:text-lg font-black tracking-tight mt-0.5">
                  მატჩებისა და ტურნირების დაგეგმვა
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  მწვრთნელის მიერ ჩანიშნული თამაშები ავტომატურად ისახება მოთამაშეებისა და მშობლების პირად კაბინეტებში.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setMatchModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>+ მატჩის / ტურნირის ჩანიშვნა</span>
              </button>
            </div>

            {/* Scheduled Matches Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {matchEvents.map((event) => (
                <div 
                  key={event.id}
                  className="rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all p-4 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                        event.type === 'tournament' 
                          ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                          : event.type === 'friendly' 
                            ? 'bg-purple-100 text-purple-900 border border-purple-300'
                            : 'bg-blue-100 text-blue-900 border border-blue-300'
                      }`}>
                        {event.type === 'tournament' ? '🏆 ტურნირი' : event.type === 'friendly' ? '🤝 ამხანაგური' : '⚽ ოფიციალური'}
                      </span>

                      {event.status === 'completed' ? (
                        <span className="text-[11px] font-bold text-emerald-600">დასრულებული</span>
                      ) : (
                        <span className="text-[11px] font-bold text-blue-600 animate-pulse">დაგეგმილი</span>
                      )}
                    </div>

                    <h4 className="font-black text-sm text-slate-900 leading-snug">
                      {event.title}
                    </h4>

                    <div className="text-xs font-extrabold text-slate-700 mt-1">
                      მეტოქე: <span className="text-blue-700">{event.opponent}</span>
                    </div>

                    <div className="mt-3 space-y-1.5 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="font-bold text-slate-900">{event.date} · {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">{event.venue}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-blue-800 font-semibold">
                        <Users className="w-3.5 h-3.5 shrink-0" />
                        <span>{event.groupName}</span>
                      </div>
                    </div>

                    {event.notes && (
                      <p className="mt-2 text-[11px] text-slate-500 italic bg-amber-50/50 p-2 rounded-lg border border-amber-100">
                        {event.notes}
                      </p>
                    )}

                    {event.score && (
                      <div className="mt-2 text-xs font-black text-emerald-700 bg-emerald-50 p-1.5 rounded-lg text-center border border-emerald-200">
                        ანგარიში: {event.score}
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-slate-400 font-mono">
                      SYNCED TO USER PORTAL
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('წაიშალოს ეს მატჩი?')) {
                          deleteMatchEvent(event.id);
                          showToast('მატჩი ამოღებულია კალენდრიდან.');
                        }
                      }}
                      className="text-slate-400 hover:text-red-600 transition-colors p-1"
                      title="წაშლა"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ========================================================
            TAB 4: ACADEMY CMS (News, Locations, Coaches)
            ======================================================== */}
        {activeTab === 'cms' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <h3 className="font-black text-base text-slate-900">
                აკადემიის საჯარო მონაცემების მართვა
              </h3>
              <p className="text-xs text-slate-500">
                ბოსის მოთხოვნის შესაბამისად: მწვრთნელები, ჯგუფები, ლოკაციები და სავარჯიშო საათები საჯაროდ ჩანს მთავარ ვებგვერდზე, ხოლო ბავშვების სია დაცულია.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <Link 
                  href="/coaches" 
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/30 transition-all group"
                >
                  <Award className="w-6 h-6 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-bold text-sm text-slate-900">მწვრთნელების პროფილები</div>
                  <div className="text-xs text-slate-500 mt-1">ლიცენზიები, გამოცდილება და მიღწევები</div>
                </Link>

                <Link 
                  href="/locations" 
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/30 transition-all group"
                >
                  <MapPin className="w-6 h-6 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-bold text-sm text-slate-900">საფეხბურთო ცენტრები</div>
                  <div className="text-xs text-slate-500 mt-1">საბურთალო, დინამო, ვარკეთილი</div>
                </Link>

                <Link 
                  href="/news" 
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/30 transition-all group"
                >
                  <Calendar className="w-6 h-6 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-bold text-sm text-slate-900">სიახლეები & რეპორტაჟები</div>
                  <div className="text-xs text-slate-500 mt-1">ტურნირების შედეგები და განცხადებები</div>
                </Link>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ========================================================
          MODAL: ADD MATCH / TOURNAMENT (Coach Module)
          ======================================================== */}
      {matchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md modal-backdrop-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden modal-box-in">
            <div className="bg-[#061325] px-6 py-4 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-sky-400" />
                <h3 className="font-black text-base">ახალი მატჩის / ტურნირის ჩანიშვნა</h3>
              </div>
              <button
                type="button"
                onClick={() => setMatchModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateMatch} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  ასაკობრივი ჯგუფი
                </label>
                <select
                  value={newMatchGroup}
                  onChange={(e) => setNewMatchGroup(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white"
                >
                  {groups.map(g => (
                    <option key={g.id} value={g.id}>{g.name} ({g.coachName})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    ტიპი
                  </label>
                  <select
                    value={newMatchType}
                    onChange={(e) => setNewMatchType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white"
                  >
                    <option value="match">ოფიციალური მატჩი</option>
                    <option value="tournament">ტურნირი</option>
                    <option value="friendly">ამხანაგური</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    მეტოქე გუნდი
                  </label>
                  <input
                    type="text"
                    value={newMatchOpponent}
                    onChange={(e) => setNewMatchOpponent(e.target.value)}
                    placeholder="მაგ. დინამო თბილისი"
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  სათაური / ტურნირის სახელი
                </label>
                <input
                  type="text"
                  value={newMatchTitle}
                  onChange={(e) => setNewMatchTitle(e.target.value)}
                  placeholder="მაგ. შემოდგომის თასი - 1/4 ფინალი"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    თარიღი
                  </label>
                  <input
                    type="date"
                    value={newMatchDate}
                    onChange={(e) => setNewMatchDate(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    დრო
                  </label>
                  <input
                    type="time"
                    value={newMatchTime}
                    onChange={(e) => setNewMatchTime(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  ლოკაცია / სტადიონი
                </label>
                <input
                  type="text"
                  value={newMatchVenue}
                  onChange={(e) => setNewMatchVenue(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  მწვრთნელის მითითებები ბავშვებისა და მშობლებისთვის
                </label>
                <textarea
                  value={newMatchNotes}
                  onChange={(e) => setNewMatchNotes(e.target.value)}
                  placeholder="შეკრების დრო, ფორმის ფერი, მოსატანი აღჭურვილობა..."
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setMatchModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  გაუქმება
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-sm transition-all"
                >
                  ჩანიშვნა და სინქრონიზაცია
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: ADD PLAYER (Admin Module)
          ======================================================== */}
      {playerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md modal-backdrop-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden modal-box-in max-h-[90vh] flex flex-col">
            <div className="bg-[#061325] px-6 py-4 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2.5">
                <Users className="w-5 h-5 text-sky-400" />
                <h3 className="font-black text-base">ახალი მოთამაშის რეგისტრაცია</h3>
              </div>
              <button
                type="button"
                onClick={() => setPlayerModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePlayer} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    სახელი
                  </label>
                  <input
                    type="text"
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                    required
                    placeholder="მაგ. გიორგი"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    გვარი
                  </label>
                  <input
                    type="text"
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                    required
                    placeholder="მაგ. ბერიძე"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    დაბ. წელი
                  </label>
                  <input
                    type="number"
                    value={newBirthYear}
                    onChange={(e) => setNewBirthYear(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    ამპლუა
                  </label>
                  <input
                    type="text"
                    value={newPosition}
                    onChange={(e) => setNewPosition(e.target.value)}
                    required
                    placeholder="მაგ. თავდამსხმელი"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    მაისურის #
                  </label>
                  <input
                    type="number"
                    value={newJersey}
                    onChange={(e) => setNewJersey(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  მიმაგრებული ჯგუფი
                </label>
                <select
                  value={newPlayerGroup}
                  onChange={(e) => setNewPlayerGroup(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white"
                >
                  {groups.map(g => (
                    <option key={g.id} value={g.id}>{g.name} ({g.coachName})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    მშობლის სახელი, გვარი
                  </label>
                  <input
                    type="text"
                    value={newParentName}
                    onChange={(e) => setNewParentName(e.target.value)}
                    required
                    placeholder="მაგ. ზურაბ ბერიძე"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    მშობლის ტელეფონი
                  </label>
                  <input
                    type="tel"
                    value={newParentPhone}
                    onChange={(e) => setNewParentPhone(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    თვიური საფასური (₾)
                  </label>
                  <input
                    type="number"
                    value={newFee}
                    onChange={(e) => setNewFee(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900"
                  />
                </div>

                <div className="pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                    <input
                      type="checkbox"
                      checked={newIsIndividual}
                      onChange={(e) => setNewIsIndividual(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 border-slate-300"
                    />
                    <span>ინდივიდუალური ვარჯიში</span>
                  </label>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setPlayerModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  გაუქმება
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-sm transition-all"
                >
                  მოთამაშის შენახვა
                </button>
              </div>
            </form>
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
