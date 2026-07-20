'use client';

import { Ride, useRideStore } from '@/store/useRideStore';
import { ShieldCheck, Star, Clock, Car, Fuel, Luggage, Sparkles, MapPin, ChevronRight, CheckCircle2, Navigation } from 'lucide-react';

interface RideCardProps {
  ride: Ride;
}

export default function RideCard({ ride }: RideCardProps) {
  const { setSelectedRide, setIsDetailsModalOpen, setIsBookingModalOpen } = useRideStore();

  const handleOpenDetails = () => {
    setSelectedRide(ride);
    setIsDetailsModalOpen(true);
  };

  const handleOpenBooking = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedRide(ride);
    setIsBookingModalOpen(true);
  };

  const formattedTime = new Date(ride.departureTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
  const formattedDate = new Date(ride.departureTime).toLocaleDateString([], {
    month: 'short',
    day: 'numeric'
  });

  return (
    <div
      onClick={handleOpenDetails}
      className="group bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-card-hover hover:border-brand-300 transition-all duration-300 cursor-pointer relative overflow-hidden"
    >
      {/* Top AI Match & Status Row */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
        
        {/* Driver Profile */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={ride.driverAvatar}
              alt={ride.driverName}
              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100 group-hover:ring-brand-500/30 transition-all"
            />
            {ride.isVerified && (
              <span className="absolute -bottom-1 -right-1 bg-brand-600 text-white rounded-full p-0.5 border border-white" title="Verified Driver">
                <CheckCircle2 className="w-3.5 h-3.5 fill-brand-600 text-white" />
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-slate-900 text-sm group-hover:text-brand-600 transition-colors">
                {ride.driverName}
              </h4>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 bg-emerald-50 text-brand-700 rounded-full border border-emerald-200/60">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {ride.driverRating}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {ride.vehicle.make} {ride.vehicle.model} • <span className="text-slate-700 font-semibold">{ride.vehicle.licensePlate}</span>
            </p>
          </div>
        </div>

        {/* AI Match Badge or Trust Score */}
        {ride.matchScore ? (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 border border-brand-200/80 rounded-2xl text-xs font-bold text-brand-700">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>{ride.matchScore}% AI Match</span>
          </div>
        ) : (
          <div className="px-3 py-1 bg-slate-100 rounded-xl text-[11px] font-bold text-slate-600">
            {ride.driverTrustScore}% Trust Score
          </div>
        )}

      </div>

      {/* Center Route Timeline & Travel Specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
        
        {/* Timeline (Origin -> Destination) */}
        <div className="md:col-span-2 space-y-3">
          
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center mt-1">
              <div className="w-3 h-3 rounded-full bg-brand-600 ring-4 ring-brand-100" />
              <div className="w-0.5 h-8 bg-slate-200 my-0.5" />
              <div className="w-3 h-3 rounded-full bg-slate-800 ring-4 ring-slate-100" />
            </div>

            <div className="space-y-2 flex-1">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{ride.origin}</span>
                  <span className="text-xs font-bold text-brand-600">{formattedTime} ({formattedDate})</span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">Pickup point: {ride.pickupPoints[0] || ride.origin}</p>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{ride.destination}</span>
                  <span className="text-xs text-slate-500 font-medium">~{ride.estimatedHours} hrs ({ride.totalDistanceKm} km)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rules / Tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {ride.rules.map((rule, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-600 rounded-lg"
              >
                {rule}
              </span>
            ))}
          </div>

        </div>

        {/* Pricing & Booking Panel */}
        <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 flex flex-col justify-between items-end">
          
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Fair Expense Split</span>
            <div className="flex items-baseline justify-end gap-1">
              <span className="text-2xl font-extrabold text-slate-900">₹{ride.seatPrice}</span>
              <span className="text-xs font-medium text-slate-500">/ seat</span>
            </div>
            <p className="text-[11px] text-brand-700 font-semibold mt-0.5">
              Fuel ₹{ride.fuelCostTotal} + Toll ₹{ride.tollCostTotal}
            </p>
          </div>

          <div className="mt-3 w-full flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-xl">
              {ride.availableSeats} {ride.availableSeats === 1 ? 'seat' : 'seats'} left
            </span>

            <button
              onClick={handleOpenBooking}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md hover:scale-105 transition-all flex items-center gap-1"
            >
              Book Seat
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
