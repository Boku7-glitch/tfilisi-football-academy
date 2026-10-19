'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  X, 
  User, 
  LogIn, 
  Lock, 
  Award, 
  Users, 
  ChevronRight,
  UserPlus,
  Phone,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: 'parent' | 'coach';
}

export default function AuthModal({ isOpen, onClose, defaultRole = 'parent' }: AuthModalProps) {
  const { loginAs, addPlayer, groups } = useAcademy();
  const router = useRouter();

  // Mode: Sign In vs Sign Up
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [selectedRole, setSelectedRole] = useState<'parent' | 'coach'>(defaultRole);

  // Clean empty inputs - NO hardcoded fake accounts!
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  // Child Info (for Parent registration)
  const [childName, setChildName] = useState('');
  const [childBirthYear, setChildBirthYear] = useState('2014');
  const [childGroupId, setChildGroupId] = useState(groups[0]?.id || 'grp-u12-saburtalo');

  // Animation & UI states
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle open / close synchronization with animation
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setIsClosing(false);
      setErrorMsg('');
    } else if (isRendered && !isClosing) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setIsRendered(false);
        setIsClosing(false);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isRendered, isClosing]);

  // Smooth close handler with full 250ms exit animation
  const handleSmoothClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsRendered(false);
      onClose();
    }, 250);
  }, [isClosing, onClose]);

  // Escape key listener for graceful closing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isRendered && !isClosing) {
        handleSmoothClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRendered, isClosing, handleSmoothClose]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email) {
      setErrorMsg('გთხოვთ შეიყვანოთ ელ-ფოსტა');
      return;
    }
    if (!password) {
      setErrorMsg('გთხოვთ შეიყვანოთ პაროლი');
      return;
    }
    if (authMode === 'signup' && !fullName) {
      setErrorMsg('გთხოვთ შეიყვანოთ სახელი და გვარი');
      return;
    }

    setIsLoading(true);

    // Simulate network handshake
    await new Promise(resolve => setTimeout(resolve, 400));

    let createdChildId: string | undefined = undefined;

    // If parent signs up and provides child info
    if (authMode === 'signup' && selectedRole === 'parent' && childName.trim()) {
      const selectedGroup = groups.find(g => g.id === childGroupId) || groups[0];
      const nameParts = childName.trim().split(' ');
      const childFirst = nameParts[0];
      const childLast = nameParts.slice(1).join(' ') || (fullName.split(' ')[1] || '');
      
      createdChildId = `pl-${Date.now()}`;
      addPlayer({
        firstName: childFirst,
        lastName: childLast,
        birthYear: Number(childBirthYear),
        age: 2026 - Number(childBirthYear),
        position: 'ნახევარმცველი',
        jerseyNumber: 10,
        groupId: selectedGroup.id,
        groupName: selectedGroup.name,
        coachId: selectedGroup.coachId,
        coachName: selectedGroup.coachName,
        locationId: selectedGroup.locationId,
        locationName: selectedGroup.locationName,
        parentName: fullName,
        parentPhone: phone,
        parentEmail: email,
        isIndividualTraining: false,
        monthlyFee: selectedGroup.monthlyFee,
        paymentStatus: 'pending',
        attendanceRate: 100,
        medicalClearance: true
      });
    }

    loginAs(selectedRole, {
      name: fullName || (selectedRole === 'coach' ? 'მწვრთნელი' : 'მშობელი'),
      email: email,
      phone: phone,
      assignedPlayerId: createdChildId
    });

    setIsLoading(false);
    setLoginSuccess(true);

    setTimeout(() => {
      handleSmoothClose();
      if (selectedRole === 'coach') {
        router.push('/admin');
      } else {
        router.push('/portal');
      }
      setLoginSuccess(false);
    }, 400);
  };

  if (!isRendered) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md ${
        isClosing ? 'modal-backdrop-out' : 'modal-backdrop-in'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleSmoothClose();
      }}
    >
      <div 
        className={`relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[92vh] ${
          isClosing ? 'modal-box-out' : 'modal-box-in'
        }`}
      >
        {/* Modal Top Header Bar */}
        <div className="bg-[#061325] px-5 sm:px-6 py-4 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-sky-400">
              {authMode === 'signin' ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base tracking-tight flex items-center gap-2">
                {authMode === 'signin' ? 'სისტემაში შესვლა' : 'ახალი რეგისტრაცია'}
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-600/30 text-blue-300 border border-blue-500/30">
                  Tfilisi
                </span>
              </h3>
              <p className="text-[10px] sm:text-[11px] text-slate-400">
                {authMode === 'signin' ? 'შეიყვანეთ თქვენი მონაცემები' : 'შეავსეთ სარეგისტრაციო ფორმა'}
              </p>
            </div>
          </div>

          {/* Smooth Close Button */}
          <button
            type="button"
            onClick={handleSmoothClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="დახურვა"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Mode Toggle Tabs (შესვლა vs რეგისტრაცია) */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold shrink-0">
          <button
            type="button"
            onClick={() => {
              setAuthMode('signin');
              setErrorMsg('');
            }}
            className={`flex-1 py-3 text-center transition-all border-b-2 flex items-center justify-center gap-1.5 ${
              authMode === 'signin'
                ? 'border-blue-600 text-blue-700 bg-white font-black'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>ავტორიზაცია</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('signup');
              setErrorMsg('');
            }}
            className={`flex-1 py-3 text-center transition-all border-b-2 flex items-center justify-center gap-1.5 ${
              authMode === 'signup'
                ? 'border-blue-600 text-blue-700 bg-white font-black'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>რეგისტრაცია</span>
          </button>
        </div>

        {/* Role Toggle Tabs (მშობელი vs მწვრთნელი) */}
        <div className="p-3 sm:p-4 bg-slate-50/60 border-b border-slate-100 shrink-0">
          <div className="text-[11px] font-black uppercase tracking-wider text-slate-500 mb-2">
            აირჩიეთ პროფილი:
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setSelectedRole('parent')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                selectedRole === 'parent'
                  ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-2xs ring-1 ring-blue-600'
                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <Users className={`w-4 h-4 ${selectedRole === 'parent' ? 'text-blue-600' : 'text-slate-400'}`} />
                {selectedRole === 'parent' && <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />}
              </div>
              <div className="text-xs font-black truncate">მშობელი / ბავშვი</div>
              <div className="text-[10px] text-slate-500 truncate">პირადი კაბინეტი</div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('coach')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                selectedRole === 'coach'
                  ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-2xs ring-1 ring-blue-600'
                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <Award className={`w-4 h-4 ${selectedRole === 'coach' ? 'text-blue-600' : 'text-slate-400'}`} />
                {selectedRole === 'coach' && <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />}
              </div>
              <div className="text-xs font-black truncate">მწვრთნელი / მენეჯერი</div>
              <div className="text-[10px] text-slate-500 truncate">სამწვრთნელო პანელი</div>
            </button>
          </div>
        </div>

        {/* Clean Input Form - Scrollable */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-3.5 overflow-y-auto flex-1">
          {errorMsg && (
            <div className="p-2.5 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Full name input (Only in Signup mode) */}
          {authMode === 'signup' && (
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                {selectedRole === 'parent' ? 'მშობლის სახელი და გვარი' : 'თქვენი სახელი და გვარი'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-900 transition-all font-medium"
                  placeholder="მაგ. საბა ბოკუჩავა"
                  required
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>
          )}

          {/* Child Details (Only in Parent Signup mode) */}
          {authMode === 'signup' && selectedRole === 'parent' && (
            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 space-y-2.5">
              <div className="text-[11px] font-black uppercase text-blue-900 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                <span>მოთამაშის (შვილის) მონაცემები</span>
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                  ბავშვის სახელი და გვარი
                </label>
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-900"
                  placeholder="მაგ. ლუკა ბოკუჩავა"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                    დაბადების წელი
                  </label>
                  <select
                    value={childBirthYear}
                    onChange={(e) => setChildBirthYear(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-lg border border-slate-300 bg-white text-xs font-bold text-slate-800"
                  >
                    {[2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019].map(year => (
                      <option key={year} value={year}>{year} წწ</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                    ჯგუფი
                  </label>
                  <select
                    value={childGroupId}
                    onChange={(e) => setChildGroupId(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-lg border border-slate-300 bg-white text-xs font-bold text-slate-800 truncate"
                  >
                    {groups.map(g => (
                      <option key={g.id} value={g.id}>{g.category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Phone input (Only in Signup mode) */}
          {authMode === 'signup' && (
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                ტელეფონის ნომერი
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-900 transition-all font-medium"
                  placeholder="+995 5__ __ __ __"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>
          )}

          {/* Email input */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
              ელ-ფოსტა
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-900 transition-all font-medium"
                placeholder="name@example.com"
                required
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Password input */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                პაროლი
              </label>
              {authMode === 'signin' && (
                <a href="#" className="text-[11px] text-blue-600 hover:underline font-bold">
                  დაგავიწყდათ?
                </a>
              )}
            </div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-900 transition-all font-medium"
                placeholder="••••••••"
                required
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || loginSuccess}
            className="w-full py-3 rounded-xl font-black text-white bg-blue-600 hover:bg-blue-700 active:scale-98 shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm mt-2"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : loginSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>{authMode === 'signin' ? 'შესვლა წარმატებულია...' : 'რეგისტრაცია წარმატებულია...'}</span>
              </>
            ) : (
              <>
                <span>{authMode === 'signin' ? 'სისტემაში შესვლა' : 'ანგარიშის შექმნა'}</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Switch Mode Footer Link */}
          <div className="text-center pt-2">
            {authMode === 'signin' ? (
              <p className="text-xs text-slate-500">
                არ გაქვთ ანგარიში?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setErrorMsg('');
                  }}
                  className="font-bold text-blue-600 hover:underline"
                >
                  დარეგისტრირდით
                </button>
              </p>
            ) : (
              <p className="text-xs text-slate-500">
                უკვე გაქვთ ანგარიში?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signin');
                    setErrorMsg('');
                  }}
                  className="font-bold text-blue-600 hover:underline"
                >
                  გაიარეთ ავტორიზაცია
                </button>
              </p>
            )}
          </div>
        </form>

      </div>
    </div>
  );
}
