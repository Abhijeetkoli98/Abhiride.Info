'use client';

import { useState } from 'react';
import { useRideStore } from '@/store/useRideStore';
import { X, Wallet, ArrowDownRight, ArrowUpRight, Plus, CreditCard, ShieldCheck } from 'lucide-react';

export default function WalletDrawer() {
  const { isWalletOpen, setIsWalletOpen, user } = useRideStore();
  const [addAmount, setAddAmount] = useState(500);

  if (!isWalletOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col transition-transform animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-brand-600" />
          <h3 className="font-bold text-slate-900 text-sm">AbhiRide Digital Wallet</h3>
        </div>

        <button
          onClick={() => setIsWalletOpen(false)}
          className="w-9 h-9 rounded-xl bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 overflow-y-auto space-y-6 no-scrollbar">
        
        {/* Balance Card */}
        <div className="p-6 bg-emerald-gradient text-white rounded-3xl shadow-card-hover space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between text-emerald-100 text-xs font-semibold">
            <span>Available Escrow Balance</span>
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold">₹{user.walletBalance.toLocaleString()}</div>
          <p className="text-[11px] text-emerald-100 font-medium">
            Funds automatically settled post trip completion. Instant Razorpay UPI top-up.
          </p>
        </div>

        {/* Quick Add Funds */}
        <div className="space-y-3">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Top-Up Wallet Balance</h4>
          <div className="grid grid-cols-3 gap-2">
            {[500, 1000, 2000].map((amt) => (
              <button
                key={amt}
                onClick={() => setAddAmount(amt)}
                className={`py-2.5 rounded-2xl font-bold text-xs border transition-all ${
                  addAmount === amt
                    ? 'bg-brand-600 text-white border-brand-600 shadow-md'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                + ₹{amt}
              </button>
            ))}
          </div>

          <button className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-2xl shadow-card-hover flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            Add ₹{addAmount} via Razorpay UPI
          </button>
        </div>

        {/* Transaction History */}
        <div className="space-y-3">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Recent Transactions</h4>
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900">Ride Booking Share</h5>
                  <p className="text-[10px] text-slate-400">Bengaluru → Chennai</p>
                </div>
              </div>
              <span className="font-bold text-red-600">- ₹660</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-brand-700 flex items-center justify-center font-bold">
                  <ArrowDownRight className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900">Wallet Top-Up</h5>
                  <p className="text-[10px] text-slate-400">Razorpay UPI</p>
                </div>
              </div>
              <span className="font-bold text-brand-700">+ ₹2,000</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
