'use client';

import { useRideStore } from '@/store/useRideStore';
import { MapPin, ArrowRight, TrendingUp, Sparkles } from 'lucide-react';

export default function PopularRoutes() {
  const { setSearchQuery } = useRideStore();

  const routes = [
    {
      origin: 'Bengaluru Silk Board',
      destination: 'Chennai T. Nagar',
      distanceKm: '348 KM',
      avgPrice: '₹660',
      tripsPerDay: '42 daily rides',
      badge: 'Popular Highway'
    },
    {
      origin: 'Baner, Pune',
      destination: 'Bandra West, Mumbai',
      distanceKm: '148 KM',
      avgPrice: '₹255',
      tripsPerDay: '85 daily rides',
      badge: 'Expressway Corridor'
    },
    {
      origin: 'Cyber City, Gurugram',
      destination: 'Raja Sansi, Amritsar',
      distanceKm: '465 KM',
      avgPrice: '₹735',
      tripsPerDay: '28 daily rides',
      badge: 'GT Road Route'
    },
    {
      origin: 'Gachibowli, Hyderabad',
      destination: 'Banjara Hills, Vijayawada',
      distanceKm: '272 KM',
      avgPrice: '₹320',
      tripsPerDay: '36 daily rides',
      badge: 'ORR Highway'
    }
  ];

  const handleRouteClick = (origin: string, destination: string) => {
    setSearchQuery({ origin, destination });
    window.scrollTo({ top: 450, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-600" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Popular Intercity Corridors
              </h2>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Top cost-sharing routes with high driver seat availability
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {routes.map((r, idx) => (
            <div
              key={idx}
              onClick={() => handleRouteClick(r.origin, r.destination)}
              className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-card-hover hover:border-brand-300 transition-all cursor-pointer group space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase bg-emerald-50 text-brand-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {r.badge}
                </span>
                <span className="text-xs font-bold text-slate-400">{r.distanceKm}</span>
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-brand-600 transition-colors flex items-center gap-1.5">
                  {r.origin} <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-600" /> {r.destination}
                </h3>
                <p className="text-[11px] text-slate-500 font-medium mt-1">{r.tripsPerDay}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Avg Seat Price</span>
                <span className="text-base font-extrabold text-brand-700">{r.avgPrice}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
