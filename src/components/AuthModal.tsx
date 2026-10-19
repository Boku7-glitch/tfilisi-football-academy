'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  X, 
  User, 
  LogIn, 
  Lock, 
  Award, 
  Users, 
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAcademy, UserRole } from '../context/AcademyContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: 'parent' | 'coach';
}

export default function AuthModal({ isOpen, onClose, defaultRole = 'parent' }: AuthModalProps) {
  const { language } = useLanguage();
  const { loginAs } = useAcademy();
  const router = useRouter();

  const [isClosing, setIsClosing] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'parent' | 'coach'>(defaultRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('••••••••');
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Sync default emails when role changes
  useEffect(() => {
    if (selectedRole === 'coach') {
      setEmail('levan.chelidze@tfilisifa.ge');
    } else {
      setEmail('parent@tbilisifa.ge');
    }
    setErrorMsg('');
  }, [selectedRole]);

  // Smooth close with exit animation
  const handleSmoothClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 220);
  };

  const handleRoleSelectAndLogin = async (role: 'parent' | 'coach') => {
    setIsLoading(true);
    setErrorMsg('');
    loginAs(role);

    // Smooth transition
    await new Promise(resolve => setTimeout(resolve, 350));
    setIsLoading(false);
    setLoginSuccess(true);

    setTimeout(() => {
      handleSmoothClose();
      if (role === 'coach') {
        router.push('/admin');
      } else {
        router.push('/portal');
      }
      setLoginSuccess(false);
    }, 450);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg(language === 'ka' ? 'გთხოვთ შეიყვანოთ ელ-ფოსტა' : 'Please enter an email address');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    await new Promise(resolve => setTimeout(resolve, 400));
    loginAs(selectedRole, { email });
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
    }, 450);
  };

  if (!isOpen && !isClosing) return null;

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
        className={`relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[92vh] ${
          isClosing ? 'modal-box-out' : 'modal-box-in'
        }`}
      >
        {/* Modal Header */}
        <div className="bg-[#061325] px-5 sm:px-7 py-4.5 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <LogIn className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg tracking-tight flex items-center gap-2">
                {language === 'ka' ? 'ავტორიზაცია & პორტალი' : 'Academy Portal Login'}
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-600/30 text-blue-300 border border-blue-500/30">
                  Tfilisi
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                {language === 'ka' 
                  ? 'სისტემაში შესვლა: აირჩიეთ მომხმარებლის პროფილი' 
                  : 'Select your academy portal profile'}
              </p>
            </div>
          </div>

          <button
            onClick={handleSmoothClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="დახურვა"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Selector Tabs (Only 2 Roles: Parent / Child vs Coach / Manager) */}
        <div className="bg-slate-50 p-2 sm:p-3 border-b border-slate-200">
          <div className="text-[11px] font-black uppercase tracking-wider text-slate-500 mb-2 px-1">
            {language === 'ka' ? 'აირჩიეთ პროფილი:' : 'Select Portal Profile:'}
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            
            {/* Parent / Player Role */}
            <button
              type="button"
              onClick={() => setSelectedRole('parent')}
              className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                selectedRole === 'parent'
                  ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-xs ring-1 ring-blue-600'
                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <Users className={`w-4 h-4 ${selectedRole === 'parent' ? 'text-blue-600' : 'text-slate-400'}`} />
                {selectedRole === 'parent' && <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />}
              </div>
              <div className="text-xs font-black truncate">მშობელი / ბავშვი</div>
              <div className="text-[10px] text-slate-500 truncate">პირადი კაბინეტი & განრიგი</div>
            </button>

            {/* Coach / Manager Role */}
            <button
              type="button"
              onClick={() => setSelectedRole('coach')}
              className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                selectedRole === 'coach'
                  ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-xs ring-1 ring-blue-600'
                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <Award className={`w-4 h-4 ${selectedRole === 'coach' ? 'text-blue-600' : 'text-slate-400'}`} />
                {selectedRole === 'coach' && <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />}
              </div>
              <div className="text-xs font-black truncate">მწვრთნელი / მენეჯერი</div>
              <div className="text-[10px] text-slate-500 truncate">ჯგუფები, განრიგი & მატჩები</div>
            </button>

          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* Quick Demo One-Click Access Notice */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/70 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <Sparkles className="w-5 h-5 text-blue-600 shrink-0" />
              <div className="min-w-0">
                <div className="text-xs font-extrabold text-blue-950 truncate">
                  {selectedRole === 'coach' && 'მწვრთნელის პროფილი: ლევან ჭელიძე'}
                  {selectedRole === 'parent' && 'მშობლის პროფილი: ზურაბ ბერიძე (ნიკოლოზ ბერიძე)'}
                </div>
                <div className="text-[11px] text-blue-700 truncate">
                  სწრაფი 1-კლიკიანი შესვლა სატესტოდ
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleRoleSelectAndLogin(selectedRole)}
              disabled={isLoading || loginSuccess}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold text-xs shadow-xs transition-all shrink-0 flex items-center gap-1.5"
            >
              <span>სწრაფი შესვლა</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="space-y-3.5 pt-1">
            {errorMsg && (
              <div className="p-2.5 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                ელ-ფოსტა / მომხმარებლის სახელი
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-900 transition-all font-medium"
                  placeholder="name@tfilisifa.ge"
                  required
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                  პაროლი
                </label>
                <a href="#" className="text-[11px] text-blue-600 hover:underline font-bold">
                  დაგავიწყდათ?
                </a>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-900 transition-all"
                  placeholder="••••••••"
                  required
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || loginSuccess}
              className="w-full py-3 rounded-xl font-black text-white bg-blue-600 hover:bg-blue-700 active:scale-98 shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : loginSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>შესვლა წარმატებულია...</span>
                </>
              ) : (
                <>
                  <span>პორტალში შესვლა</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Privacy Note */}
          <div className="text-center pt-2 text-[11px] text-slate-400">
            {selectedRole === 'coach' && '⚽ მწვრთნელის სივრცე: ჯგუფები, განრიგი, მატჩების დანიშვნა და დასწრება.'}
            {selectedRole === 'parent' && '📱 პირადი კაბინეტი: განრიგი, თამაშები და ონლაინ გადახდები.'}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-5 sm:px-6 py-2.5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span className="font-mono text-[10px]">TFILISI ACADEMY PORTAL</span>
          <button
            type="button"
            onClick={handleSmoothClose}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            დახურვა
          </button>
        </div>
      </div>
    </div>
  );
}
