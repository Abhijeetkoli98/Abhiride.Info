'use client';

import { Search, Receipt, ShieldCheck, Navigation, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Search & Match Route',
      desc: 'Enter your departure city and destination to find verified drivers heading your way.',
      icon: Search,
      color: 'bg-emerald-100 text-brand-700'
    },
    {
      step: '02',
      title: 'Review Transparent Split',
      desc: 'See the exact fuel mileage and highway toll expense split with zero commercial driver profit.',
      icon: Receipt,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      step: '03',
      title: 'Identity & Seat Lock',
      desc: 'Reserve your seat backed by Aadhaar/DL photo verification and escrow payment protection.',
      icon: ShieldCheck,
      color: 'bg-amber-100 text-amber-800'
    },
    {
      step: '04',
      title: 'Live GPS Telemetry',
      desc: 'Track vehicle movement in real time on interactive Leaflet maps with one-tap Emergency SOS.',
      icon: Navigation,
      color: 'bg-teal-100 text-teal-800'
    }
  ];

  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Simple & Transparent
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">How AbhiRide Works</h2>
          <p className="text-xs text-slate-500 font-medium">Four easy steps to cost-effective, eco-friendly intercity carpooling</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-slate-50/80 rounded-3xl border border-slate-200/80 hover:shadow-card-hover hover:bg-white transition-all space-y-4 relative group"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl ${s.color} flex items-center justify-center shadow-sm`}>
                    <Icon className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <span className="text-2xl font-black text-slate-300 font-mono group-hover:text-brand-600 transition-colors">
                    {s.step}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900 text-base mb-1">{s.title}</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
