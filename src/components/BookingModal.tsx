'use client';

import React, { useState } from 'react';
import { X, CreditCard, CheckCircle2, Shield, Calendar, MapPin } from 'lucide-react';
import { TeamGroup, Coach } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  group?: TeamGroup | null;
  coach?: Coach | null;
  date?: string;
  timeSlot?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  group,
  coach,
  date,
  timeSlot
}: BookingModalProps) {
  const { language, t } = useLanguage();
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  const title = group
    ? (language === 'ka' ? group.name : `${group.birthYears} Squad (${group.category.split(' ')[0]})`)
    : `${language === 'ka' ? 'ინდივიდუალური ვარჯიში' : '1-on-1 Session'} (${coach?.name})`;
  const fee = group ? group.monthlyFee : 50;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-[#061325] px-4 sm:px-6 py-4 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-slate-800 text-blue-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base tracking-tight">{t.bookingModal.headerTitle}</h3>
              <p className="text-[10px] sm:text-xs text-blue-400 font-mono">{t.bookingModal.subTitle}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {isSuccess ? (
            <div className="text-center py-5 space-y-3.5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto border border-blue-300">
                <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <h4 className="text-base sm:text-lg font-black text-slate-900">
                {t.bookingModal.successTitle}
              </h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                {t.bookingModal.successDesc}
              </p>
              <button
                onClick={handleClose}
                className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-blue-700 text-white hover:bg-blue-800 transition-colors"
              >
                {t.bookingModal.finishBtn}
              </button>
            </div>
          ) : (
            <div className="space-y-3.5 sm:space-y-4">
              
              {/* Summary Card */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 space-y-1.5">
                <div className="text-[10px] sm:text-[11px] uppercase font-extrabold text-blue-700 tracking-wider">
                  {t.bookingModal.selectedProgram}
                </div>
                <div className="text-sm sm:text-base font-black text-slate-900">{title}</div>

                {group && (
                  <div className="text-xs text-slate-600 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{group.days} · {group.hours}</span>
                  </div>
                )}

                {coach && (
                  <div className="text-xs text-slate-600 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{date} · {timeSlot}</span>
                  </div>
                )}
              </div>

              {/* Price Row */}
              <div className="flex justify-between items-baseline p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs sm:text-sm font-bold text-slate-700">{t.bookingModal.totalAmount}</span>
                <span className="text-lg sm:text-xl font-black text-blue-700">₾{fee}.00</span>
              </div>

              {/* Payment Info Form */}
              <div className="space-y-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    {t.bookingModal.cardholder}
                  </label>
                  <input
                    type="text"
                    defaultValue="DAVIT BERIDZE"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-hidden focus:border-blue-600 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    {t.bookingModal.cardNumber}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      defaultValue="•••• •••• •••• 4242"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-hidden focus:border-blue-600 text-slate-900"
                    />
                    <CreditCard className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">{t.bookingModal.expiry}</label>
                    <input
                      type="text"
                      defaultValue="12/28"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-hidden focus:border-blue-600 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">{t.bookingModal.cvc}</label>
                    <input
                      type="password"
                      defaultValue="•••"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-hidden focus:border-blue-600 text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={handlePay}
                disabled={loading}
                className="w-full py-3.5 rounded-lg font-black uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
                {loading ? (
                  <span>{t.bookingModal.processing}</span>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>{t.bookingModal.payBtn} (₾{fee}.00)</span>
                  </>
                )}
              </button>

              <div className="text-center text-[10px] sm:text-[11px] text-slate-400">
                {t.bookingModal.secureNotice}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
