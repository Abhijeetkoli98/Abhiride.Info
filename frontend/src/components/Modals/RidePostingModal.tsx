'use client';

import { useState } from 'react';
import { useRideStore } from '@/store/useRideStore';
import { X, Car, Fuel, Calculator, MapPin, Calendar, Users, DollarSign, Sparkles, CheckCircle } from 'lucide-react';

export default function RidePostingModal() {
  const { isPostingModalOpen, setIsPostingModalOpen, rides, setRides, user } = useRideStore();

  const [step, setStep] = useState(1);
  const [origin, setOrigin] = useState('Bengaluru Silk Board');
  const [destination, setDestination] = useState('Chennai T. Nagar');
  const [departureTime, setDepartureTime] = useState('2026-07-21T07:00');
  const [distanceKm, setDistanceKm] = useState(345);
  const [vehicleMake, setVehicleMake] = useState('Honda');
  const [vehicleModel, setVehicleModel] = useState('City');
  const [licensePlate, setLicensePlate] = useState('KA-01-AB-9921');
  const [fuelType, setFuelType] = useState<'Petrol' | 'Diesel' | 'CNG' | 'Electric'>('Petrol');
  const [mileageKmpl, setMileageKmpl] = useState(16);
  const [totalSeats, setTotalSeats] = useState(4);
  const [tollCost, setTollCost] = useState(450);
  const [rules, setRules] = useState<string[]>(['Non-Smoking', 'AC Always On', 'Luggage Friendly']);

  if (!isPostingModalOpen) return null;

  // Enforce Document Verification Status check
  if (user.role === 'DRIVER' && user.verificationStatus !== 'VERIFIED') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
        <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <X className="w-8 h-8 stroke-[2.5]" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-extrabold text-slate-900">Verification Pending 🛡️</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Your driver credentials and vehicle documents (DL, RC, Insurance) are currently being audited by our administrators. You cannot offer seats until verification is approved.
            </p>
          </div>
          <button
            onClick={() => setIsPostingModalOpen(false)}
            className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-xs"
          >
            Close Window
          </button>
        </div>
      </div>
    );
  }

  // Real-time Fair Expense Calculation
  const fuelPriceMap = { Petrol: 102.5, Diesel: 89.8, CNG: 76.5, Electric: 15 };
  const totalFuelCost = Math.round((distanceKm / mileageKmpl) * fuelPriceMap[fuelType]);
  const totalExpense = totalFuelCost + tollCost;
  const recommendedSeatPrice = Math.round(totalExpense / totalSeats);

  const handlePostRide = () => {
    const newRide = {
      id: `ride-${Date.now()}`,
      driverId: 'usr-current-1',
      driverName: 'Abhijet Kumar (You)',
      driverAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      driverRating: 5.0,
      driverTrustScore: 98,
      isVerified: true,
      vehicle: {
        make: vehicleMake,
        model: vehicleModel,
        color: 'Pearl White',
        licensePlate,
        fuelType,
        mileageKmpl
      },
      origin,
      originLat: 12.9172,
      originLng: 77.6228,
      destination,
      destinationLat: 13.0418,
      destinationLng: 80.2341,
      departureTime: new Date(departureTime).toISOString(),
      totalDistanceKm: distanceKm,
      estimatedHours: 6.0,
      fuelCostTotal: totalFuelCost,
      tollCostTotal: tollCost,
      seatPrice: recommendedSeatPrice,
      availableSeats: totalSeats - 1,
      totalSeats,
      rules,
      status: 'SCHEDULED' as const,
      pickupPoints: [origin, 'Electronic City Toll']
    };

    setRides([newRide, ...rides]);
    setIsPostingModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 no-scrollbar">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-20">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              Driver Wizard • Step {step} of 3
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">Offer Empty Seats & Share Fuel Cost</h2>
          </div>

          <button
            onClick={() => setIsPostingModalOpen(false)}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Step 1: Route & Time */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-600" />
                Journey Route & Schedule
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Starting Point (Origin)</label>
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Destination</label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Departure Date & Time</label>
                  <input
                    type="datetime-local"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Distance (Km)</label>
                  <input
                    type="number"
                    value={distanceKm}
                    onChange={(e) => setDistanceKm(Number(e.target.value))}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Vehicle Specs & Fuel Engine */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Car className="w-4 h-4 text-brand-600" />
                Vehicle Specifications & Fuel Efficiency
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Vehicle Make</label>
                  <input
                    type="text"
                    value={vehicleMake}
                    onChange={(e) => setVehicleMake(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Model Name</label>
                  <input
                    type="text"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">License Plate</label>
                  <input
                    type="text"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Fuel Type</label>
                  <select
                    value={fuelType}
                    onChange={(e: any) => setFuelType(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 focus:outline-none"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="CNG">CNG</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Mileage (km/L)</label>
                  <input
                    type="number"
                    value={mileageKmpl}
                    onChange={(e) => setMileageKmpl(Number(e.target.value))}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Estimated Tolls (₹)</label>
                  <input
                    type="number"
                    value={tollCost}
                    onChange={(e) => setTollCost(Number(e.target.value))}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Fair Split Preview */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="p-5 bg-emerald-50 rounded-3xl border border-emerald-200 text-center space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-700 bg-white px-3 py-1 rounded-full border border-emerald-300">
                  Algorithmic Cost Recovery Preview
                </span>
                <div className="text-3xl font-extrabold text-slate-900">
                  ₹{recommendedSeatPrice} <span className="text-sm font-medium text-slate-500">/ passenger seat</span>
                </div>
                <p className="text-xs text-brand-800 font-semibold">
                  Total Journey Cost: ₹{totalExpense} (Fuel: ₹{totalFuelCost} + Tolls: ₹{tollCost}) split between {totalSeats} seats.
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">Total Seats in Vehicle</label>
                <div className="grid grid-cols-4 gap-2">
                  {[2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setTotalSeats(s)}
                      className={`p-3 rounded-2xl font-bold text-sm border transition-all ${
                        totalSeats === s
                          ? 'bg-brand-600 text-white border-brand-600 shadow-md'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {s} Seats
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation Buttons */}
        <div className="p-6 border-t border-slate-100 bg-white sticky bottom-0 z-20 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold transition-all"
            >
              Back
            </button>
          ) : <div />}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl text-xs font-bold shadow-card-hover transition-all"
            >
              Next Step →
            </button>
          ) : (
            <button
              onClick={handlePostRide}
              className="px-8 py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl text-xs font-bold shadow-card-hover hover:scale-105 transition-all"
            >
              Publish Ride & Share Cost
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
