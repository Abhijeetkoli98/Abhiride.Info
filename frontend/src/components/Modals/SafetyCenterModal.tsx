'use client';

import { useState } from 'react';
import { useRideStore } from '@/store/useRideStore';
import { useToastStore } from '@/store/useToastStore';
import { X, ShieldAlert, PhoneCall, Heart, Radio, Share2, CheckCircle2, UserCheck, AlertTriangle } from 'lucide-react';

export default function SafetyCenterModal() {
  const { isSafetyCenterOpen, setIsSafetyCenterOpen, user, setIsSOSModalOpen } = useRideStore();
  const { addToast } = useToastStore();

  const [copied, setCopied] = useState(false);
  const [safetyCheckInActive, setSafetyCheckInActive] = useState(true);

  if (!isSafetyCenterOpen) return null;

  const handleCopyShareLink = () => {
    setCopied(true);
    addToast({
      type: 'success',
      title: 'Live Tracking Link Copied 🔗',
      message: 'Share this link with family & trusted contacts for real-time safety monitoring.'
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 no-scrollbar">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
              <ShieldAlert className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-600">24/7 Protection Hub</span>
              <h2 className="text-xl font-extrabold text-slate-900">AbhiRide Safety & SOS Center</h2>
            </div>
          </div>

          <button
            onClick={() => setIsSafetyCenterOpen(false)}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Emergency SOS Quick Trigger */}
          <div className="p-6 bg-red-50 rounded-3xl border border-red-200 text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-red-700 font-extrabold text-sm">
              <AlertTriangle className="w-5 h-5" />
              Immediate Emergency Response
            </div>
            <p className="text-xs text-red-900 font-medium max-w-md mx-auto">
              Pressing Emergency SOS broadcasts your live GPS telemetry to National Helpline (112), AbhiRide Safety Center, and your emergency contact ({user.emergencyContact}).
            </p>
            <button
              onClick={() => {
                setIsSafetyCenterOpen(false);
                setIsSOSModalOpen(true);
              }}
              className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-xs shadow-xl hover:scale-105 transition-all"
            >
              TRIGGER EMERGENCY SOS PANIC ALERT
            </button>
          </div>

          {/* Women's Safety Dedicated Suite */}
          <div className="p-5 bg-emerald-50 rounded-3xl border border-emerald-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-brand-900 font-extrabold text-sm">
                <Heart className="w-4 h-4 text-brand-600 fill-brand-600" />
                Dedicated Women's Safety & Comfort Suite
              </div>
              <span className="text-[10px] font-extrabold bg-brand-100 text-brand-800 px-2.5 py-0.5 rounded-full border border-emerald-300">
                Active Protocol
              </span>
            </div>

            <div className="space-y-2 text-xs font-semibold text-slate-700">
              <label className="flex items-center justify-between p-3 bg-white rounded-2xl border border-emerald-100 cursor-pointer">
                <span>Filter Women-Only Driver & Passenger Rides</span>
                <input type="checkbox" defaultChecked className="accent-brand-600 w-4 h-4" />
              </label>

              <label className="flex items-center justify-between p-3 bg-white rounded-2xl border border-emerald-100 cursor-pointer">
                <span>Automated 30-Min Journey Safety Check-Ins</span>
                <input
                  type="checkbox"
                  checked={safetyCheckInActive}
                  onChange={(e) => setSafetyCheckInActive(e.target.checked)}
                  className="accent-brand-600 w-4 h-4"
                />
              </label>
            </div>
          </div>

          {/* Emergency Helplines Grid */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">National Emergency Contacts</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Police Emergency</span>
                <span className="text-lg font-black text-slate-900">112</span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Women Helpline</span>
                <span className="text-lg font-black text-pink-600">1091</span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Medical Ambulance</span>
                <span className="text-lg font-black text-slate-900">108</span>
              </div>
            </div>
          </div>

          {/* Share Live Location */}
          <div className="p-4 bg-slate-900 text-white rounded-3xl flex items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-xs">Share Trip Live Tracking Link</h4>
              <p className="text-[11px] text-slate-400 font-medium">Send real-time vehicle GPS coordinates to family</p>
            </div>
            <button
              onClick={handleCopyShareLink}
              className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 flex-shrink-0"
            >
              <Share2 className="w-4 h-4" />
              {copied ? 'Link Copied!' : 'Copy Live Link'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
