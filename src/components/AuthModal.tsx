'use client';

import React, { useState } from 'react';
import { 
  X, 
  User, 
  LogIn, 
  Lock, 
  Calendar, 
  CreditCard, 
  CheckCircle, 
  Clock, 
  ChevronRight,
  Receipt
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'login' | 'portal_preview'>('login');
  const [email, setEmail] = useState('parent@tbilisifa.ge');
  const [password, setPassword] = useState('••••••••');
  const [portalView, setPortalView] = useState<'overview' | 'billing'>('overview');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="bg-linear-to-r from-blue-700 to-blue-900 px-4 sm:px-6 py-3.5 sm:py-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-white/10">
              {activeTab === 'login' ? (
                <LogIn className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              ) : (
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              )}
            </div>
            <div>
              <h3 className="font-extrabold text-xs sm:text-base">
                {activeTab === 'login' ? t.authModal.titleLogin : t.authModal.titlePortal}
              </h3>
              <p className="text-[10px] sm:text-xs text-blue-200">
                {t.authModal.subTitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="bg-blue-50/60 px-4 sm:px-6 py-2 border-b border-blue-100 flex items-center justify-between text-xs shrink-0">
          <span className="text-slate-500 font-semibold hidden sm:inline">{t.authModal.modeLabel}</span>
          <div className="flex gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <button
              onClick={() => setActiveTab('login')}
              className={`px-3 py-1 rounded-lg font-bold transition-colors text-xs ${
                activeTab === 'login' ? 'bg-blue-700 text-white' : 'text-slate-600 hover:text-blue-700'
              }`}
            >
              {t.authModal.tabLogin}
            </button>
            <button
              onClick={() => setActiveTab('portal_preview')}
              className={`px-3 py-1 rounded-lg font-bold transition-colors text-xs ${
                activeTab === 'portal_preview' ? 'bg-blue-700 text-white' : 'text-slate-600 hover:text-blue-700'
              }`}
            >
              {t.authModal.tabPortal}
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {activeTab === 'login' ? (
            /* Login Form */
            <div className="space-y-3.5 max-w-md mx-auto py-2">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  {t.authModal.parentEmail}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 text-slate-900"
                    placeholder="parent@example.com"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  {t.authModal.password}
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 text-slate-900"
                    placeholder="••••••••"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <label className="flex items-center gap-1.5 text-slate-600 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600" />
                  <span>{t.authModal.rememberMe}</span>
                </label>
                <a href="#" className="text-blue-700 font-bold hover:underline">
                  {t.authModal.forgotPass}
                </a>
              </div>

              <button
                onClick={() => setActiveTab('portal_preview')}
                className="w-full py-3 rounded-xl font-bold text-white bg-blue-700 hover:bg-blue-800 shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-1.5 mt-3 text-xs sm:text-sm"
              >
                <span>{t.authModal.enterBtn}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2 text-[11px] text-slate-400">
                {t.authModal.connectedWith}
              </div>
            </div>
          ) : (
            /* Parent & Child Portal Preview */
            <div className="space-y-4">
              
              {/* Player Top Profile Strip */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 gap-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center font-black text-sm shrink-0">
                    10
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-extrabold text-slate-900">
                      {language === 'ka' ? 'ნიკოლოზ ბერიძე (2014 წწ)' : 'Nicholas Beridze (2014)'}
                    </div>
                    <div className="text-[11px] text-blue-700 font-semibold">
                      U-12 · Saburtalo · Coach: L. Chelidze
                    </div>
                  </div>
                </div>

                <div className="flex gap-1.5 self-start sm:self-auto">
                  <button
                    onClick={() => setPortalView('overview')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${
                      portalView === 'overview'
                        ? 'bg-blue-700 text-white border-blue-700'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    {t.authModal.tabSchedule}
                  </button>
                  <button
                    onClick={() => setPortalView('billing')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${
                      portalView === 'billing'
                        ? 'bg-blue-700 text-white border-blue-700'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    {t.authModal.tabBilling}
                  </button>
                </div>
              </div>

              {/* Portal Subview: Overview */}
              {portalView === 'overview' ? (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/50">
                    <div className="flex items-center justify-between text-[11px] font-bold text-blue-800 uppercase tracking-wider mb-1.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        <span>{t.authModal.nextTraining}</span>
                      </span>
                      <span className="bg-blue-600 text-white px-1.5 py-0.5 rounded-xs text-[10px]">{t.authModal.today}</span>
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold text-slate-900">
                      {language === 'ka' ? 'ტექნიკური ოსტატობა & მოტორიკა' : 'Ball Mastery & Coordination'}
                    </div>
                    <div className="text-[11px] text-slate-600 mt-0.5">
                      15:30 - 17:00 · Saburtalo Complex (Pitch B)
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        <span>{t.authModal.upcomingMatch}</span>
                      </span>
                      <span className="text-blue-700 font-bold">{language === 'ka' ? 'შაბათი, 24 ოქტომბერი' : 'Saturday, Oct 24'}</span>
                    </div>
                    <div className="text-xs sm:text-sm font-black text-slate-900">Tfilisi FA U-12 vs Dinamo Tbilisi U-12</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {language === 'ka' ? 'ტფილისის საბავშვო თასი · 12:00 · დინამოს ბაზა' : 'Tfilisi Youth Cup · 12:00 · Dinamo Base'}
                    </div>
                  </div>
                </div>
              ) : (
                /* Portal Subview: Billing */
                <div className="space-y-3">
                  <div className="p-4 rounded-xl border border-blue-200 bg-white space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-extrabold text-slate-500">
                        {language === 'ka' ? 'მიმდინარე თვის სტატუსი' : 'Current Status'}
                      </span>
                      {paymentSuccess ? (
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-blue-600 text-white flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> {t.authModal.paidFee}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-blue-100 text-blue-800 border border-blue-200">
                          {t.authModal.dueFee}
                        </span>
                      )}
                    </div>

                    <div className="text-xs sm:text-sm font-bold text-slate-800">
                      {language === 'ka' ? 'საბავშვო აკადემიის საწევრო: ოქტომბერი 2026' : 'Youth Academy Monthly Membership: Oct 2026'}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {language === 'ka' ? 'ვადა: 25 ოქტომბრამდე · მოიცავს 3 ვარჯიშს/კვირაში და ტურნირებს' : 'Due date: Oct 25 · Includes 3 sessions/week and league matches'}
                    </div>

                    {!paymentSuccess ? (
                      <button
                        onClick={() => setPaymentSuccess(true)}
                        className="w-full py-2.5 rounded-xl font-bold text-white bg-blue-700 hover:bg-blue-800 flex items-center justify-center gap-1.5 shadow-2xs transition-all text-xs"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>{t.authModal.payMonthlyBtn}</span>
                      </button>
                    ) : (
                      <div className="p-2.5 bg-blue-50 text-blue-800 rounded-xl text-xs font-semibold flex items-center gap-2 border border-blue-200">
                        <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>
                          {language === 'ka'
                            ? 'ტრანზაქცია #TRX-94827 წარმატებულია. ქვითარი გამოგზავნილია მეილზე.'
                            : 'Transaction #TRX-94827 completed successfully. Receipt emailed.'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Previous Payments */}
                  <div className="pt-1">
                    <div className="text-[11px] font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                      <Receipt className="w-3 h-3 text-blue-600" />
                      <span>{t.authModal.historyTitle}</span>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between p-2 rounded-lg bg-slate-50 border border-slate-200/70">
                        <span>{language === 'ka' ? 'სექტემბერი 2026' : 'September 2026'} · ₾150.00</span>
                        <span className="text-blue-700 font-bold">{t.authModal.statusPaid} (Visa)</span>
                      </div>
                      <div className="flex justify-between p-2 rounded-lg bg-slate-50 border border-slate-200/70">
                        <span>{language === 'ka' ? 'აგვისტო 2026' : 'August 2026'} · ₾150.00</span>
                        <span className="text-blue-700 font-bold">{t.authModal.statusPaid} (Apple Pay)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-4 sm:px-6 py-2.5 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            {t.authModal.closeBtn}
          </button>
        </div>

      </div>
    </div>
  );
}
