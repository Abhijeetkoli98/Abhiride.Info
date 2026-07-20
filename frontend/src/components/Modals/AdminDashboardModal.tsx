'use client';

import { useRideStore } from '@/store/useRideStore';
import { X, Users, Car, ShieldCheck, AlertTriangle, TrendingUp, DollarSign, Activity, CheckCircle, RefreshCw } from 'lucide-react';

export default function AdminDashboardModal() {
  const { isAdminOpen, setIsAdminOpen, rides } = useRideStore();

  if (!isAdminOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 no-scrollbar">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold">
              <Activity className="w-5 h-5 text-brand-400" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-600">Platform Command Center</span>
              <h2 className="text-xl font-extrabold text-slate-900">AbhiRide Admin & Operations</h2>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Key Metrics Overview Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Total Community Users</span>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">14,280</div>
              <span className="text-[11px] text-brand-600 font-bold flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" /> +12% this week
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Active Drivers</span>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">3,420</div>
              <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
                <ShieldCheck className="w-3 h-3" /> 98% Verified
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase">CO2 Emissions Saved</span>
              <div className="text-2xl font-extrabold text-brand-700 mt-1">142.5 Tons</div>
              <span className="text-[11px] text-slate-500 font-medium mt-1">Verified Green Impact</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Passenger Savings</span>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">₹4.28 Cr</div>
              <span className="text-[11px] text-brand-600 font-bold mt-1 block">Zero Driver Surcharge</span>
            </div>
          </div>

          {/* AI Fraud & High Pricing Detector Alerts */}
          <div className="p-5 bg-amber-50 rounded-3xl border border-amber-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                AI Fraud & Commercial Surcharge Detector (Active Engine)
              </div>
              <span className="text-[10px] font-extrabold bg-amber-200 text-amber-900 px-2.5 py-0.5 rounded-full">
                0 Flagged Violations
              </span>
            </div>
            <p className="text-xs text-amber-800 font-medium">
              All active rides adhere strictly to fuel cost recovery thresholds. Commercial taxi fares automatically blocked.
            </p>
          </div>

          {/* Active Rides Table */}
          <div className="bg-slate-50 rounded-3xl p-4 border border-slate-200 space-y-3">
            <h3 className="font-extrabold text-slate-900 text-sm">Active Highway Rides Stream</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-white text-slate-400 font-bold uppercase text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="p-3 rounded-l-xl">Driver</th>
                    <th className="p-3">Route</th>
                    <th className="p-3">Departure</th>
                    <th className="p-3">Seat Price</th>
                    <th className="p-3">Seats</th>
                    <th className="p-3 rounded-r-xl">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 font-medium">
                  {rides.slice(0, 4).map((r) => (
                    <tr key={r.id} className="hover:bg-white/60">
                      <td className="p-3 font-bold text-slate-900">{r.driverName}</td>
                      <td className="p-3">{r.origin} → {r.destination}</td>
                      <td className="p-3">{new Date(r.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                      <td className="p-3 font-bold text-brand-700">₹{r.seatPrice}</td>
                      <td className="p-3">{r.availableSeats} / {r.totalSeats}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 bg-emerald-100 text-brand-700 rounded-full text-[10px] font-bold">
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
