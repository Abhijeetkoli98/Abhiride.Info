'use client';

import { useRideStore } from '@/store/useRideStore';
import DynamicMap from '@/components/Map/DynamicMap';
import { X, ShieldCheck, Car, Star, Fuel, Receipt, MapPin, Calendar, Clock, CheckCircle2, MessageSquare, PhoneCall } from 'lucide-react';

export default function RideDetailsModal() {
  const { selectedRide, isDetailsModalOpen, setIsDetailsModalOpen, setIsBookingModalOpen, setIsChatOpen } = useRideStore();

  if (!isDetailsModalOpen || !selectedRide) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 no-scrollbar">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-20">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200/60">
              Verified Ride Details & Expense Receipt
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">
              {selectedRide.origin} → {selectedRide.destination}
            </h2>
          </div>

          <button
            onClick={() => setIsDetailsModalOpen(false)}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Interactive Map Component */}
          <DynamicMap
            originLat={selectedRide.originLat}
            originLng={selectedRide.originLng}
            destinationLat={selectedRide.destinationLat}
            destinationLng={selectedRide.destinationLng}
            height="320px"
            driverName={selectedRide.driverName}
          />

          {/* Driver Card & Contact Quick Actions */}
          <div className="p-5 bg-slate-50/80 rounded-3xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={selectedRide.driverAvatar}
                alt={selectedRide.driverName}
                className="w-14 h-14 rounded-2xl object-cover ring-4 ring-brand-500/20"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-slate-900 text-base">{selectedRide.driverName}</h3>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-700 bg-brand-100 px-2.5 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Trust Score: <span className="font-bold text-slate-800">{selectedRide.driverTrustScore}%</span> • {selectedRide.vehicle.make} {selectedRide.vehicle.model} ({selectedRide.vehicle.licensePlate})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsDetailsModalOpen(false);
                  setIsChatOpen(true);
                }}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                Chat Driver
              </button>
            </div>
          </div>

          {/* Transparent Cost Breakdown Receipt */}
          <div className="p-6 bg-emerald-50/60 rounded-3xl border border-emerald-200/80 space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-200/60 pb-3">
              <div className="flex items-center gap-2 text-brand-800 font-extrabold text-sm">
                <Receipt className="w-4 h-4 text-brand-600" />
                Transparent Expense Breakdown (Zero Profit Algorithm)
              </div>
              <span className="text-xs font-bold bg-white text-brand-700 px-3 py-1 rounded-full border border-emerald-300">
                Fair Split Model
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium text-slate-700">
              <div className="bg-white/80 p-3 rounded-2xl border border-emerald-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Distance</span>
                <span className="font-bold text-slate-900 text-sm">{selectedRide.totalDistanceKm} KM</span>
              </div>
              <div className="bg-white/80 p-3 rounded-2xl border border-emerald-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Fuel Expense</span>
                <span className="font-bold text-slate-900 text-sm">₹{selectedRide.fuelCostTotal}</span>
              </div>
              <div className="bg-white/80 p-3 rounded-2xl border border-emerald-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Highway Tolls</span>
                <span className="font-bold text-slate-900 text-sm">₹{selectedRide.tollCostTotal}</span>
              </div>
              <div className="bg-white/80 p-3 rounded-2xl border border-brand-300 bg-brand-50">
                <span className="text-[10px] text-brand-700 font-extrabold uppercase block">Your Seat Share</span>
                <span className="font-extrabold text-brand-700 text-base">₹{selectedRide.seatPrice}</span>
              </div>
            </div>
          </div>

          {/* Travel Rules & Pickup Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-2">Approved Pickup Stops</h4>
              <ul className="space-y-1.5 text-slate-600 font-medium">
                {selectedRide.pickupPoints.map((pt, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-brand-600" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-2">Ride Guidelines & Amenities</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedRide.rules.map((rule, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl">
                    ✓ {rule}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div className="p-6 border-t border-slate-100 bg-white sticky bottom-0 z-20 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium block">Price Per Passenger</span>
            <span className="text-2xl font-extrabold text-slate-900">₹{selectedRide.seatPrice}</span>
          </div>

          <button
            onClick={() => {
              setIsDetailsModalOpen(false);
              setIsBookingModalOpen(true);
            }}
            className="px-8 py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold text-sm shadow-card-hover hover:scale-105 active:scale-95 transition-all"
          >
            Proceed to Book Seat
          </button>
        </div>

      </div>
    </div>
  );
}
