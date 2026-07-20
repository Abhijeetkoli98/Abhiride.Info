'use client';

import { Car, Heart, Shield, Leaf, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-brand-600 flex items-center justify-center text-white">
                <Car className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">Abhi<span className="text-brand-400">Ride</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              India's premier verified carpooling & ride cost-sharing platform. Connecting empty seats with travelers for fair, zero-profit journey expense recovery.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-3">Platform</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li className="hover:text-brand-400 cursor-pointer transition-colors">How Expense Splitting Works</li>
              <li className="hover:text-brand-400 cursor-pointer transition-colors">Safety & Identity Verification</li>
              <li className="hover:text-brand-400 cursor-pointer transition-colors">AI Route Matching Algorithm</li>
              <li className="hover:text-brand-400 cursor-pointer transition-colors">Emergency SOS Guarantee</li>
            </ul>
          </div>

          {/* Guidelines */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-3">Community</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li className="hover:text-brand-400 cursor-pointer transition-colors">Driver Carpooling Code</li>
              <li className="hover:text-brand-400 cursor-pointer transition-colors">Passenger Guidelines</li>
              <li className="hover:text-brand-400 cursor-pointer transition-colors">Ladies-Only Rides</li>
              <li className="hover:text-brand-400 cursor-pointer transition-colors">Carbon Emission Tracker</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-3">Support & Safety</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-brand-400" /> support@abhiride.com</li>
              <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-brand-400" /> +91 1800-ABHI-RIDE</li>
              <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-brand-400" /> Bengaluru, KA, India</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-500">
          <p>© 2026 AbhiRide Technologies. All rights reserved. Zero Profit Ride-Sharing Platform.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Trust & Safety</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
