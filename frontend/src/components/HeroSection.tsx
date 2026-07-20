'use client';

import { useState } from 'react';
import { useRideStore } from '@/store/useRideStore';
import { MapPin, Calendar, Users, Search, ShieldCheck, Leaf, DollarSign, Sparkles, Filter, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const { setSearchQuery, setFilterOptions, ladiesOnly, verifiedOnly } = useRideStore();
  
  const [originInput, setOriginInput] = useState('');
  const [destinationInput, setDestinationInput] = useState('');
  const [seatsInput, setSeatsInput] = useState(1);
  const [dateInput, setDateInput] = useState('2026-07-21');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery({
      origin: originInput,
      destination: destinationInput,
      date: dateInput,
      seats: seatsInput
    });
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-emerald-50/50 via-slate-50 to-white">
      {/* Decorative Gradient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-300/20 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tagline */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 border border-emerald-200/80 rounded-full shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-800 tracking-wide">
              Verified Expense-Sharing Community
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-none">
            Share Your Journey. <br />
            <span className="text-transparent bg-clip-text bg-emerald-gradient">
              Split Fuel Costs.
            </span> Zero Profit.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            AbhiRide automatically calculates distance, fuel, and tolls to split expenses fairly between drivers and passengers. Save money, reduce traffic, and lower carbon emissions.
          </p>
        </div>

        {/* Smart Search Panel Card */}
        <div className="mt-10 max-w-5xl mx-auto">
          <form
            onSubmit={handleSearchSubmit}
            className="glass-panel p-4 sm:p-6 rounded-3xl shadow-card-hover border border-white/80 transition-all duration-300"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Origin Input */}
              <div className="p-3 bg-white rounded-2xl border border-slate-200/80 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-brand-600" />
                  Leaving From
                </label>
                <input
                  type="text"
                  placeholder="e.g., Bengaluru Silk Board"
                  value={originInput}
                  onChange={(e) => setOriginInput(e.target.value)}
                  className="w-full text-sm font-semibold text-slate-800 focus:outline-none placeholder:text-slate-400 placeholder:font-normal"
                />
              </div>

              {/* Destination Input */}
              <div className="p-3 bg-white rounded-2xl border border-slate-200/80 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-700" />
                  Going To
                </label>
                <input
                  type="text"
                  placeholder="e.g., Chennai T. Nagar"
                  value={destinationInput}
                  onChange={(e) => setDestinationInput(e.target.value)}
                  className="w-full text-sm font-semibold text-slate-800 focus:outline-none placeholder:text-slate-400 placeholder:font-normal"
                />
              </div>

              {/* Travel Date Input */}
              <div className="p-3 bg-white rounded-2xl border border-slate-200/80 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-brand-600" />
                  Departure Date
                </label>
                <input
                  type="date"
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                  className="w-full text-sm font-semibold text-slate-800 focus:outline-none"
                />
              </div>

              {/* Seats Counter & Search CTA */}
              <div className="flex gap-2">
                <div className="p-3 bg-white rounded-2xl border border-slate-200/80 flex-1 flex flex-col justify-center">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-1">
                    <Users className="w-3.5 h-3.5 text-brand-600" />
                    Seats
                  </label>
                  <select
                    value={seatsInput}
                    onChange={(e) => setSeatsInput(Number(e.target.value))}
                    className="w-full text-sm font-semibold text-slate-800 focus:outline-none bg-transparent"
                  >
                    <option value={1}>1 Seat</option>
                    <option value={2}>2 Seats</option>
                    <option value={3}>3 Seats</option>
                    <option value={4}>4 Seats</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold text-sm shadow-card-hover hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </div>

            </div>

            {/* Quick Filters Row */}
            <div className="mt-4 pt-4 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-semibold select-none">
                  <input
                    type="checkbox"
                    checked={ladiesOnly}
                    onChange={(e) => setFilterOptions({ ladiesOnly: e.target.checked })}
                    className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 accent-brand-600"
                  />
                  <span>👩 Ladies-Only Rides</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-semibold select-none">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => setFilterOptions({ verifiedOnly: e.target.checked })}
                    className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 accent-brand-600"
                  />
                  <span>🛡️ 95%+ Verified Drivers</span>
                </label>
              </div>

              <div className="text-slate-500 font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>AI Passenger-Driver Match Active</span>
              </div>
            </div>
          </form>
        </div>

        {/* Feature & Impact Highlights */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-white/80 rounded-3xl border border-slate-200/80 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-brand-700 flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Transparent Fair Split</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Fuel cost and highway tolls calculated down to the kilometer. Zero commercial driver surcharge.
              </p>
            </div>
          </div>

          <div className="p-5 bg-white/80 rounded-3xl border border-slate-200/80 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Identity & SOS Verified</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Aadhaar government ID verification, selfie validation, trust scores, and instant emergency SOS.
              </p>
            </div>
          </div>

          <div className="p-5 bg-white/80 rounded-3xl border border-slate-200/80 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center flex-shrink-0">
              <Leaf className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Sustainable Travel</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Over 142 tons of carbon emissions reduced by filling empty seats on planned highway journeys.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
