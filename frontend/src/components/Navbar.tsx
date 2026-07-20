'use client';

import { useRideStore } from '@/store/useRideStore';
import { useLanguageStore, SupportedLanguage } from '@/store/useLanguageStore';
import { ShieldCheck, Car, UserCheck, Wallet, Bell, AlertTriangle, PlusCircle, LayoutDashboard, Sparkles, Navigation, Calendar, ShieldAlert, Award, Globe } from 'lucide-react';

export default function Navbar() {
  const {
    user,
    activeRole,
    setActiveRole,
    setIsPostingModalOpen,
    setIsVerificationOpen,
    setIsSOSModalOpen,
    setIsWalletOpen,
    setIsAdminOpen,
    setIsProfileModalOpen,
    setIsHistoryModalOpen,
    setIsAuthModalOpen,
    setIsSafetyCenterOpen,
    setIsUserStatsOpen,
  } = useRideStore();

  const { currentLang, setLanguage, t } = useLanguageStore();

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/60 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-12 h-12 rounded-2xl bg-emerald-gradient p-2.5 flex items-center justify-center text-white shadow-card-hover group-hover:scale-105 transition-transform duration-300">
            <Car className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-extrabold tracking-tight text-slate-900 font-sans">
                Abhi<span className="text-brand-600">Ride</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase bg-brand-100 text-brand-700 rounded-full tracking-wider">
                Cost-Share
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 hidden sm:block">
              Zero-Profit Carpooling Community
            </p>
          </div>
        </div>

        {/* Center Mode Switcher */}
        <div className="hidden md:flex items-center p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveRole('PASSENGER')}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-2 ${
              activeRole === 'PASSENGER'
                ? 'bg-white text-brand-700 shadow-md scale-105'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            {t.findRide}
          </button>
          <button
            onClick={() => setActiveRole('DRIVER')}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-2 ${
              activeRole === 'DRIVER'
                ? 'bg-brand-600 text-white shadow-emerald-glow scale-105'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            {t.offerSeats}
          </button>
        </div>

        {/* Action Controls & User Controls */}
        <div className="flex items-center gap-3">
          
          {/* Offer Ride CTA */}
          <button
            onClick={() => setIsPostingModalOpen(true)}
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-2xl shadow-card-hover hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <PlusCircle className="w-4 h-4" />
            Post Empty Seats
          </button>

          {/* Wallet Trigger */}
          <button
            onClick={() => setIsWalletOpen(true)}
            className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200/80 rounded-2xl text-xs font-bold text-slate-700 transition-all border border-slate-200"
          >
            <Wallet className="w-4 h-4 text-brand-600" />
            <span className="hidden sm:inline">₹{user.walletBalance.toLocaleString()}</span>
          </button>

          {/* My Trips History Trigger */}
          <button
            onClick={() => setIsHistoryModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-2xl text-xs font-bold text-slate-700 transition-all border border-slate-200"
            title="My Trips & Bookings"
          >
            <Calendar className="w-4 h-4 text-brand-600" />
            <span className="hidden md:inline">My Trips</span>
          </button>

          {/* i18n Multi-Language Selector Dropdown */}
          <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-2xl border border-slate-200 text-xs font-bold">
            <Globe className="w-3.5 h-3.5 text-brand-600" />
            <select
              value={currentLang}
              onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
              className="bg-transparent text-slate-800 font-bold focus:outline-none cursor-pointer text-xs"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (HI)</option>
              <option value="mr">मराठी (MR)</option>
            </select>
          </div>

          {/* User Personal Stats & Impact Trigger */}
          <button
            onClick={() => setIsUserStatsOpen(true)}
            className="hidden xl:flex items-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-brand-700 rounded-2xl text-xs font-bold transition-all border border-emerald-200/60"
            title="Personal Impact & Verified Stats"
          >
            <Award className="w-4 h-4 text-brand-600" />
            <span>{t.stats}</span>
          </button>

          {/* Safety Center Dedicated Hub Trigger */}
          <button
            onClick={() => setIsSafetyCenterOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-2xl text-xs font-bold transition-all border border-red-200"
            title="24/7 Safety & SOS Center"
          >
            <ShieldAlert className="w-4 h-4 text-red-600" />
            <span className="hidden md:inline">{t.safetyCenter}</span>
          </button>

          {/* Emergency SOS Button */}
          <button
            onClick={() => setIsSOSModalOpen(true)}
            className="flex items-center justify-center w-10 h-10 bg-red-50 hover:bg-red-100 text-red-600 rounded-2xl transition-transform hover:scale-105 active:scale-90 border border-red-200"
            title="Emergency SOS Alert"
          >
            <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Admin Panel Trigger */}
          <button
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center justify-center w-10 h-10 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl transition-transform hover:scale-105 border border-slate-200"
            title="Admin & Operations Dashboard"
          >
            <LayoutDashboard className="w-5 h-5" />
          </button>

          {/* User Avatar */}
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="relative group cursor-pointer pl-1 hover:scale-105 transition-transform focus:outline-none"
            title="Manage Profile & Settings"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-2xl object-cover ring-2 ring-brand-500/40 shadow-sm"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-brand-500 border-2 border-white rounded-full"></span>
          </button>

        </div>

      </div>
    </header>
  );
}
