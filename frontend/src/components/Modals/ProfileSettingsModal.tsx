'use client';

import { useState } from 'react';
import { useRideStore } from '@/store/useRideStore';
import { useToastStore } from '@/store/useToastStore';
import { X, User, Phone, Mail, ShieldCheck, Car, Save, CheckCircle2 } from 'lucide-react';

export default function ProfileSettingsModal() {
  const { isProfileModalOpen, setIsProfileModalOpen, user } = useRideStore();
  const { addToast } = useToastStore();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [emergencyContact, setEmergencyContact] = useState(user.emergencyContact);

  if (!isProfileModalOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      type: 'success',
      title: 'Profile Updated 👤',
      message: 'Your personal settings and emergency contact details have been saved.'
    });
    setIsProfileModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 no-scrollbar">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-20">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-brand-600" />
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Member Profile & Settings</h2>
              <p className="text-xs text-slate-500">Manage account information and safety contacts</p>
            </div>
          </div>

          <button
            onClick={() => setIsProfileModalOpen(false)}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSaveProfile} className="p-6 space-y-5">
          
          {/* Avatar Header */}
          <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
            <img src={user.avatar} alt="" className="w-16 h-16 rounded-2xl object-cover ring-4 ring-brand-500/30" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 text-base">{user.name}</h3>
                <span className="text-xs font-bold text-brand-700 bg-white px-2 py-0.5 rounded-full border border-emerald-300">
                  {user.trustScore}% Trust Badge
                </span>
              </div>
              <p className="text-xs text-brand-800 font-medium">Referral Code: <span className="font-mono font-bold text-slate-900">{user.referralCode}</span></p>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Full Legal Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Phone & Emergency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Emergency SOS Phone</label>
              <input
                type="text"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none"
              />
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(false)}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold"
            >
              Close
            </button>

            <button
              type="submit"
              className="px-7 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl text-xs font-bold shadow-card-hover hover:scale-105 transition-all flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              Save Profile
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
