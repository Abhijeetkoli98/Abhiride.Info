'use client';

import { useState } from 'react';
import { useRideStore } from '@/store/useRideStore';
import { useToastStore } from '@/store/useToastStore';
import confetti from 'canvas-confetti';
import { X, CreditCard, ShieldCheck, QrCode, CheckCircle, Ticket, MapPin, ArrowRight } from 'lucide-react';

export default function BookingModal() {
  const { selectedRide, isBookingModalOpen, setIsBookingModalOpen, setCurrentBookingTicket, setIsTrackingModalOpen } = useRideStore();
  const { addToast } = useToastStore();
  
  const [seats, setSeats] = useState(1);
  const [pickupPoint, setPickupPoint] = useState(selectedRide?.pickupPoints[0] || selectedRide?.origin || '');
  const [paymentMethod, setPaymentMethod] = useState<'Razorpay UPI' | 'AbhiRide Wallet' | 'Credit Card'>('Razorpay UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);

  if (!isBookingModalOpen || !selectedRide) return null;

  const totalAmount = selectedRide.seatPrice * seats;

  const handlePayAndBook = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const bookingData = {
        bookingId: `BK-${Math.floor(100000 + Math.random() * 900000)}`,
        rideId: selectedRide.id,
        driverName: selectedRide.driverName,
        driverPhone: '+91 98765 43210',
        vehiclePlate: selectedRide.vehicle.licensePlate,
        seatsBooked: seats,
        seatPrice: selectedRide.seatPrice,
        totalAmount,
        pickupPoint: pickupPoint || selectedRide.origin,
        dropPoint: selectedRide.destination,
        paymentMethod,
        qrCode: `ABHIRIDE-QR-${Date.now()}`,
        departureTime: selectedRide.departureTime
      };

      setConfirmedBooking(bookingData);
      setCurrentBookingTicket(bookingData);

      addToast({
        type: 'success',
        title: 'Seat Reserved Successfully 🎉',
        message: `Booking ${bookingData.bookingId} confirmed! Show your QR code at boarding.`
      });

      // Trigger Celebration Confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 no-scrollbar">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-20">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              {confirmedBooking ? 'Booking Confirmed 🎉' : 'Secure Booking & Seat Lock'}
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">
              {selectedRide.origin} → {selectedRide.destination}
            </h2>
          </div>

          <button
            onClick={() => {
              setIsBookingModalOpen(false);
              setConfirmedBooking(null);
            }}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!confirmedBooking ? (
          <div className="p-6 space-y-6">
            
            {/* Driver Summary */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={selectedRide.driverAvatar} alt="" className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{selectedRide.driverName}</h4>
                  <p className="text-[11px] text-slate-500">{selectedRide.vehicle.make} {selectedRide.vehicle.model}</p>
                </div>
              </div>
              <span className="text-xs font-extrabold text-brand-700 bg-brand-100 px-2.5 py-1 rounded-full">
                ₹{selectedRide.seatPrice} / seat
              </span>
            </div>

            {/* Select Seats Quantity */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">Number of Seats to Reserve</label>
              <div className="flex items-center gap-3">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => setSeats(num)}
                    disabled={num > selectedRide.availableSeats}
                    className={`flex-1 py-3 rounded-2xl font-bold text-xs border transition-all ${
                      seats === num
                        ? 'bg-brand-600 text-white border-brand-600 shadow-md'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {num} {num === 1 ? 'Seat' : 'Seats'}
                  </button>
                ))}
              </div>
            </div>

            {/* Pickup Point Selection */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Select Your Preferred Pickup Stop</label>
              <select
                value={pickupPoint}
                onChange={(e) => setPickupPoint(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none"
              >
                {selectedRide.pickupPoints.map((pt, i) => (
                  <option key={i} value={pt}>{pt}</option>
                ))}
              </select>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">Payment Method (Escrow Protected)</label>
              <div className="space-y-2">
                {['Razorpay UPI', 'AbhiRide Wallet', 'Credit Card'].map((pm: any) => (
                  <label
                    key={pm}
                    onClick={() => setPaymentMethod(pm)}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === pm
                        ? 'bg-emerald-50 border-brand-500 shadow-sm'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <CreditCard className="w-4 h-4 text-brand-600" />
                      {pm}
                    </div>
                    <input
                      type="radio"
                      name="payMethod"
                      checked={paymentMethod === pm}
                      readOnly
                      className="accent-brand-600"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Price Total */}
            <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Seat Fare</span>
                <span className="text-2xl font-extrabold">₹{totalAmount}</span>
              </div>
              <span className="text-xs text-brand-400 font-medium">Escrow Released Post Journey</span>
            </div>

          </div>
        ) : (
          /* Confirmed QR Ticket View */
          <div className="p-6 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-brand-600 rounded-full flex items-center justify-center mx-auto shadow-card-hover">
              <CheckCircle className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-slate-900">Ride Reserved & Seat Locked!</h3>
              <p className="text-xs text-slate-500 font-medium">Booking ID: <span className="font-bold text-slate-800">{confirmedBooking.bookingId}</span></p>
            </div>

            {/* QR Code Ticket Display */}
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 max-w-sm mx-auto space-y-3">
              <div className="w-44 h-44 bg-white p-3 rounded-2xl mx-auto border border-slate-200 flex flex-col items-center justify-center shadow-inner">
                <QrCode className="w-32 h-32 text-slate-800" />
                <span className="text-[9px] font-mono text-slate-500 mt-1">{confirmedBooking.qrCode}</span>
              </div>
              <p className="text-[11px] text-slate-600 font-semibold">
                Show this QR Code to driver <span className="text-slate-900 font-bold">{confirmedBooking.driverName}</span> at boarding.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsBookingModalOpen(false);
                  setIsTrackingModalOpen(true);
                }}
                className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl text-xs font-bold shadow-card-hover transition-all flex items-center justify-center gap-2"
              >
                Track Live GPS Journey
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* Footer */}
        {!confirmedBooking && (
          <div className="p-6 border-t border-slate-100 bg-white sticky bottom-0 z-20 flex items-center justify-between">
            <button
              onClick={() => setIsBookingModalOpen(false)}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold"
            >
              Cancel
            </button>

            <button
              onClick={handlePayAndBook}
              disabled={isProcessing}
              className="px-8 py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold text-xs shadow-card-hover hover:scale-105 transition-all"
            >
              {isProcessing ? 'Processing Payment...' : `Pay ₹${totalAmount} via ${paymentMethod}`}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
