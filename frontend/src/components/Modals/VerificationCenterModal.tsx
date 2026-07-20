'use client';

import { useState } from 'react';
import { useRideStore } from '@/store/useRideStore';
import { X, ShieldCheck, Camera, FileText, CheckCircle2, UploadCloud, AlertCircle } from 'lucide-react';

export default function VerificationCenterModal() {
  const { isVerificationOpen, setIsVerificationOpen, user } = useRideStore();
  
  const [aadhaarNumber, setAadhaarNumber] = useState('XXXX-XXXX-8912');
  const [dlNumber, setDlNumber] = useState('KA-01-2023-009124');
  const [isUploaded, setIsUploaded] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isVerificationOpen) return null;

  const handleSubmitVerification = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsVerificationOpen(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 no-scrollbar">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-20">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-brand-600" />
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Identity & Safety Verification Center</h2>
              <p className="text-xs text-slate-500">Government ID & Facial Match Verification</p>
            </div>
          </div>

          <button
            onClick={() => setIsVerificationOpen(false)}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitVerification} className="p-6 space-y-6">
          
          {/* Trust Score Status */}
          <div className="p-5 bg-emerald-50 rounded-3xl border border-emerald-200/80 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-700 bg-white px-2.5 py-0.5 rounded-full border border-emerald-300">
                Verified Account Status
              </span>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">
                {user.trustScore}% Trust Score Badge
              </div>
              <p className="text-xs text-brand-800 font-medium mt-0.5">
                Eligible for priority passenger matching & driver posting privileges.
              </p>
            </div>
            <CheckCircle2 className="w-12 h-12 text-brand-600 stroke-[2]" />
          </div>

          {/* Aadhaar Input */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Aadhaar Card Number</label>
            <div className="relative">
              <input
                type="text"
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value)}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-500"
              />
              <CheckCircle2 className="w-4 h-4 text-brand-600 absolute right-3.5 top-4" />
            </div>
          </div>

          {/* Driving License Input */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Driving License Number (Required for Drivers)</label>
            <div className="relative">
              <input
                type="text"
                value={dlNumber}
                onChange={(e) => setDlNumber(e.target.value)}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-500"
              />
              <CheckCircle2 className="w-4 h-4 text-brand-600 absolute right-3.5 top-4" />
            </div>
          </div>

          {/* Selfie Photo Check */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">Live Facial Verification Selfie</label>
            <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={user.avatar} alt="" className="w-12 h-12 rounded-xl object-cover ring-2 ring-brand-500/40" />
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">Selfie Match Verified</h4>
                  <p className="text-[11px] text-slate-500">Biometric match confidence: 99.4%</p>
                </div>
              </div>
              <button
                type="button"
                className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100"
              >
                Re-take Photo
              </button>
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsVerificationOpen(false)}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold"
            >
              Close
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-7 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl text-xs font-bold shadow-card-hover hover:scale-105 transition-all"
            >
              {isSubmitting ? 'Verifying Credentials...' : 'Save & Update Credentials'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
