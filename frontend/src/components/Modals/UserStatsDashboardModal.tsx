'use client';

import { useRideStore } from '@/store/useRideStore';
import { X, Award, ShieldCheck, Leaf, DollarSign, Navigation, Clock, CheckCircle2, TrendingUp, Sparkles, Star } from 'lucide-react';

export default function UserStatsDashboardModal() {
  const { isUserStatsOpen, setIsUserStatsOpen, user } = useRideStore();

  if (!isUserStatsOpen) return null;

  const verifications = [
    { title: 'Mobile Phone OTP', status: 'VERIFIED', badge: 'Phone Verified ✓' },
    { title: 'Email Address', status: 'VERIFIED', badge: 'Email Verified ✓' },
    { title: 'Aadhaar / Gov ID', status: 'VERIFIED', badge: 'Aadhaar ID Verified ✓' },
    { title: 'Biometric Live Selfie', status: 'VERIFIED', badge: 'Selfie Match Verified ✓' },
    { title: 'Driving License (DL)', status: 'VERIFIED', badge: 'DL Verified ✓' },
    { title: 'Vehicle Registration (RC)', status: 'VERIFIED', badge: 'RC Verified ✓' }
  ];

  const achievements = [
    { title: 'Eco Champion 🌱', desc: 'Saved over 100 kg of CO2 carbon emissions' },
    { title: 'Punctual Traveler ⏱️', desc: '99% on-time arrival & pickup record' },
    { title: 'Trust Founder 🛡️', desc: 'Maintained 95%+ Trust Score across 40+ journeys' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 no-scrollbar">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
              <Award className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-600">Personal Analytics & Impact</span>
              <h2 className="text-xl font-extrabold text-slate-900">{user.name}'s Travel Dashboard</h2>
            </div>
          </div>

          <button
            onClick={() => setIsUserStatsOpen(false)}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Trust Score & Verification Summary Header */}
          <div className="p-6 bg-emerald-gradient text-white rounded-3xl shadow-card-hover flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-100 uppercase tracking-wider block">AbhiRide Trust Score Rating</span>
              <div className="text-4xl font-black">{user.trustScore}% <span className="text-base font-semibold text-emerald-100">/ 100% Top Tier</span></div>
              <p className="text-xs text-emerald-100 font-medium">
                Calculated from 6 verified credentials, 99% punctuality, & 0 cancellations.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/30 text-xs font-extrabold">
              <ShieldCheck className="w-5 h-5 text-white" />
              <span>Full Verified Community Status</span>
            </div>
          </div>

          {/* Core Impact Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Money Saved (INR)</span>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">₹24,500</div>
              <span className="text-[11px] text-brand-600 font-bold mt-1 block">vs Commercial Taxis</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">CO2 Saved</span>
              <div className="text-2xl font-extrabold text-brand-700 mt-1">142.5 KG</div>
              <span className="text-[11px] text-emerald-600 font-bold mt-1 block">Zero Carbon Waste</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Total Trips Shared</span>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">48 Rides</div>
              <span className="text-[11px] text-slate-500 font-medium mt-1 block">Completed Safely</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Distance Shared</span>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">12,400 KM</div>
              <span className="text-[11px] text-slate-500 font-medium mt-1 block">186 Hours Travelled</span>
            </div>
          </div>

          {/* Multi-Level Verification System Badges */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Multi-Level Identity Verification Badges</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {verifications.map((v, i) => (
                <div key={i} className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-200/80 flex items-center gap-2 text-xs font-bold text-brand-800">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                  <span>{v.badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gamified Earned Achievements */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Earned Platform Achievements</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {achievements.map((a, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <h5 className="font-extrabold text-slate-900 text-xs">{a.title}</h5>
                  <p className="text-[11px] text-slate-500 font-medium">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
