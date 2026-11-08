'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, CreditCard, CheckCircle2, Shield, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { Coach } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { useAcademy, AcademyGroup } from '../context/AcademyContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  group?: AcademyGroup | null;
  coach?: Coach | null;
  date?: string;
  timeSlot?: string;
  customFee?: number;
  locationName?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  group,
  coach,
  date,
  timeSlot,
  customFee,
  locationName,
}: BookingModalProps) {
  const { language, t } = useLanguage();
  const { currentUser, groups, addPlayer, loginAs } = useAcademy();
  const router = useRouter();

  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Member enrollment details
  const [childFullName, setChildFullName] = useState('');
  const [birthYear, setBirthYear] = useState(2014);
  const [parentName, setParentName] = useState(currentUser?.name || '');
  const [parentPhone, setParentPhone] = useState(currentUser?.phone || '+995 5');
  const [parentEmail, setParentEmail] = useState(currentUser?.email || '');

  // Card inputs
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  if (!isOpen) return null;

  const title = group
    ? language === 'ka'
      ? group.name
      : `${group.birthYears} Squad (${group.category.split(' ')[0]})`
    : `${language === 'ka' ? 'ინდივიდუალური მომზადება' : '1-on-1 Session'} (${coach?.name})`;
  const fee = group ? group.monthlyFee : customFee || 240;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const nameParts = (childFullName || parentName || 'ახალი წევრი').trim().split(' ');
      const firstName = nameParts[0] || 'მოთამაშე';
      const lastName = nameParts.slice(1).join(' ') || 'წევრი';
      const targetGroup = group || groups[0];

      const createdPlayer = addPlayer({
        firstName,
        lastName,
        birthYear: Number(birthYear),
        age: 2026 - Number(birthYear),
        position: 'ნახევარმცველი',
        jerseyNumber: Math.floor(7 + Math.random() * 15),
        groupId: targetGroup.id,
        groupName: group ? group.name : `ინდივიდუალური (${coach?.name || targetGroup.coachName})`,
        coachId: coach?.id || targetGroup.coachId,
        coachName: coach?.name || targetGroup.coachName,
        locationId: targetGroup.locationId,
        locationName: locationName || targetGroup.locationName,
        parentName: parentName || `${firstName} ${lastName}`,
        parentPhone: parentPhone || '+995 599 00 00 00',
        parentEmail: parentEmail || 'member@tfilisifa.ge',
        isIndividualTraining: Boolean(coach),
        monthlyFee: fee,
        paymentStatus: 'paid',
        attendanceRate: 100,
        medicalClearance: true,
        notes: coach
          ? `ინდივიდუალური პროგრამა: ${date} (${timeSlot})`
          : `ონლაინ ჩარიცხვა ჯგუფში: ${group?.name}`,
      });

      // Automatically activate user as an active academy member
      loginAs('parent', {
        name: parentName || `${firstName} ${lastName}`,
        email: parentEmail || 'member@tfilisifa.ge',
        phone: parentPhone,
        assignedPlayerId: createdPlayer.id,
      });

      setLoading(false);
      setIsSuccess(true);
    }, 900);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  const handleGoToPortal = () => {
    setIsSuccess(false);
    onClose();
    router.push('/portal');
  };

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
            type="button"
            onClick={handleClose}
            className="p-1 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {isSuccess ? (
            <div className="text-center py-5 space-y-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-300">
                <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <h4 className="text-base sm:text-lg font-black text-slate-900">
                {t.bookingModal.successTitle}
              </h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                თქვენ გახდით აკადემიის აქტიური წევრი! პირადი კაბინეტი, სავარჯიშო განრიგი და გადახდის ელექტრონული ქვითარი უკვე გააქტიურებულია.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleGoToPortal}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>პირად კაბინეტში გადასვლა</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  {t.bookingModal.finishBtn}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePay} className="space-y-3.5 sm:space-y-4">
              
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
                    <span>{locationName || 'საბურთალო'} · {date} · {timeSlot}</span>
                  </div>
                )}
              </div>

              {/* Member Registration Info */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  მოთამაშისა და მშობლის მონაცემები (კაბინეტის აქტივაციისთვის)
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="booking-child-name" className="block text-[11px] font-bold text-slate-700 mb-0.5">
                      მოთამაშის სახელი და გვარი *
                    </label>
                    <input
                      id="booking-child-name"
                      name="childName"
                      type="text"
                      required
                      value={childFullName}
                      onChange={(e) => setChildFullName(e.target.value)}
                      placeholder="მაგ: ნიკოლოზ ბერიძე"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="booking-birth-year" className="block text-[11px] font-bold text-slate-700 mb-0.5">
                      დაბ. წელი
                    </label>
                    <input
                      id="booking-birth-year"
                      name="birthYear"
                      type="number"
                      min={2009}
                      max={2021}
                      value={birthYear}
                      onChange={(e) => setBirthYear(Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="booking-parent-phone" className="block text-[11px] font-bold text-slate-700 mb-0.5">
                      მშობლის ტელეფონი *
                    </label>
                    <input
                      id="booking-parent-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      placeholder="+995 599 00 00 00"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="booking-parent-email" className="block text-[11px] font-bold text-slate-700 mb-0.5">
                      ელ-ფოსტა *
                    </label>
                    <input
                      id="booking-parent-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={parentEmail}
                      onChange={(e) => setParentEmail(e.target.value)}
                      placeholder="parent@example.com"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Price Row */}
              <div className="flex justify-between items-baseline p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs sm:text-sm font-bold text-slate-700">{t.bookingModal.totalAmount}</span>
                <span className="text-lg sm:text-xl font-black text-blue-700">₾{fee}.00</span>
              </div>

              {/* Payment Info Form */}
              <div className="space-y-2.5">
                <div>
                  <label htmlFor="cc-name" className="block text-[11px] font-bold text-slate-700 mb-1">
                    {t.bookingModal.cardholder}
                  </label>
                  <input
                    id="cc-name"
                    name="cc-name"
                    type="text"
                    autoComplete="cc-name"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="DAVIT BERIDZE"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-hidden focus:border-blue-600 text-slate-900"
                  />
                </div>

                <div>
                  <label htmlFor="cc-number" className="block text-[11px] font-bold text-slate-700 mb-1">
                    {t.bookingModal.cardNumber}
                  </label>
                  <div className="relative">
                    <input
                      id="cc-number"
                      name="cc-number"
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      maxLength={19}
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4242 •••• •••• 4242"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-hidden focus:border-blue-600 text-slate-900"
                    />
                    <CreditCard className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="cc-exp" className="block text-[11px] font-bold text-slate-700">
                        {t.bookingModal.expiry}
                      </label>
                      <span id="exp-hint" className="text-[10px] font-mono text-slate-400">
                        MM/YY
                      </span>
                    </div>
                    <input
                      id="cc-exp"
                      name="cc-exp"
                      type="text"
                      autoComplete="cc-exp"
                      aria-describedby="exp-hint"
                      maxLength={5}
                      required
                      value={cardExp}
                      onChange={(e) => setCardExp(e.target.value)}
                      placeholder="12/28"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-hidden focus:border-blue-600 text-slate-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="cc-csc" className="block text-[11px] font-bold text-slate-700 mb-1">
                      {t.bookingModal.cvc}
                    </label>
                    <input
                      id="cc-csc"
                      name="cc-csc"
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      maxLength={4}
                      required
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="123"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-hidden focus:border-blue-600 text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Action */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-lg font-black uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
                {loading ? (
                  <span>{t.bookingModal.processing}</span>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>{t.bookingModal.payBtn} & გაწევრიანება (₾{fee}.00)</span>
                  </>
                )}
              </button>

              <div className="text-center text-[10px] sm:text-[11px] text-slate-400">
                {t.bookingModal.secureNotice}
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
