'use client';

import { useState } from 'react';
import { useRideStore } from '@/store/useRideStore';
import { useToastStore } from '@/store/useToastStore';
import { X, Calendar, Navigation, CheckCircle2, Clock, Download, Star, QrCode, AlertCircle, ArrowRight } from 'lucide-react';

interface MockTrip {
  id: string;
  type: 'UPCOMING' | 'COMPLETED' | 'CANCELLED';
  origin: string;
  destination: string;
  date: string;
  driverName: string;
  driverAvatar: string;
  seatCount: number;
  totalPrice: number;
  qrCode: string;
  vehiclePlate: string;
}

export default function TripHistoryModal() {
  const { isHistoryModalOpen, setIsHistoryModalOpen, setIsTrackingModalOpen, setIsReviewModalOpen, setSelectedRide, rides } = useRideStore();
  const { addToast } = useToastStore();

  const [activeTab, setActiveTab] = useState<'UPCOMING' | 'COMPLETED' | 'CANCELLED'>('UPCOMING');

  const [trips] = useState<MockTrip[]>([
    {
      id: 'BK-889102',
      type: 'UPCOMING',
      origin: 'Bengaluru Silk Board',
      destination: 'Chennai T. Nagar',
      date: '2026-07-21 06:30 AM',
      driverName: 'Vikram Sharma',
      driverAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      seatCount: 2,
      totalPrice: 1320,
      qrCode: 'ABHI-QR-889102-01',
      vehiclePlate: 'KA-01-MJ-8821'
    },
    {
      id: 'BK-442109',
      type: 'COMPLETED',
      origin: 'Baner, Pune',
      destination: 'Bandra West, Mumbai',
      date: '2026-07-15 08:00 AM',
      driverName: 'Ananya Deshmukh',
      driverAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
      seatCount: 1,
      totalPrice: 255,
      qrCode: 'ABHI-QR-442109-02',
      vehiclePlate: 'MH-12-RS-4490'
    },
    {
      id: 'BK-110293',
      type: 'CANCELLED',
      origin: 'Cyber City, Gurugram',
      destination: 'Raja Sansi, Amritsar',
      date: '2026-07-10 05:00 AM',
      driverName: 'Rohan Verma',
      driverAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      seatCount: 1,
      totalPrice: 735,
      qrCode: 'ABHI-QR-110293-03',
      vehiclePlate: 'DL-03-CC-9912'
    }
  ]);

  if (!isHistoryModalOpen) return null;

  const filteredTrips = trips.filter((t) => t.type === activeTab);

  const handleDownloadInvoice = (tripId: string) => {
    addToast({
      type: 'success',
      title: 'Invoice Downloaded 📄',
      message: `Tax Invoice for booking ${tripId} saved to your downloads.`
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 no-scrollbar">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-20">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-600" />
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">My Travel History & Bookings</h2>
              <p className="text-xs text-slate-500">Manage your active, completed, and past intercity trips</p>
            </div>
          </div>

          <button
            onClick={() => setIsHistoryModalOpen(false)}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Filter Navigation */}
        <div className="px-6 pt-4 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
          <button
            onClick={() => setActiveTab('UPCOMING')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-2xl transition-all border-b-2 ${
              activeTab === 'UPCOMING'
                ? 'bg-white text-brand-700 border-brand-600 shadow-sm'
                : 'text-slate-500 border-transparent hover:text-slate-800'
            }`}
          >
            Upcoming Trips ({trips.filter((t) => t.type === 'UPCOMING').length})
          </button>
          <button
            onClick={() => setActiveTab('COMPLETED')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-2xl transition-all border-b-2 ${
              activeTab === 'COMPLETED'
                ? 'bg-white text-brand-700 border-brand-600 shadow-sm'
                : 'text-slate-500 border-transparent hover:text-slate-800'
            }`}
          >
            Completed ({trips.filter((t) => t.type === 'COMPLETED').length})
          </button>
          <button
            onClick={() => setActiveTab('CANCELLED')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-2xl transition-all border-b-2 ${
              activeTab === 'CANCELLED'
                ? 'bg-white text-brand-700 border-brand-600 shadow-sm'
                : 'text-slate-500 border-transparent hover:text-slate-800'
            }`}
          >
            Cancelled ({trips.filter((t) => t.type === 'CANCELLED').length})
          </button>
        </div>

        {/* Content List */}
        <div className="p-6 space-y-4">
          {filteredTrips.length > 0 ? (
            filteredTrips.map((trip) => (
              <div
                key={trip.id}
                className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-500">{trip.id}</span>
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                        trip.type === 'UPCOMING'
                          ? 'bg-emerald-100 text-brand-700'
                          : trip.type === 'COMPLETED'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {trip.type}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-800">{trip.date}</span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">{trip.origin} → {trip.destination}</h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Driver: <span className="font-bold text-slate-800">{trip.driverName}</span> • Vehicle: {trip.vehiclePlate}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Seats Reserved</span>
                    <span className="text-lg font-extrabold text-slate-900">{trip.seatCount} Seat ({trip.totalPrice} INR)</span>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <QrCode className="w-4 h-4 text-brand-600" />
                    <span>Boarding Code: <strong className="font-mono text-slate-800">{trip.qrCode}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    {trip.type === 'UPCOMING' && (
                      <button
                        onClick={() => {
                          setIsHistoryModalOpen(false);
                          if (rides[0]) setSelectedRide(rides[0]);
                          setIsTrackingModalOpen(true);
                        }}
                        className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        Track Live GPS
                      </button>
                    )}

                    {trip.type === 'COMPLETED' && (
                      <>
                        <button
                          onClick={() => {
                            if (rides[0]) setSelectedRide(rides[0]);
                            setIsReviewModalOpen(true);
                          }}
                          className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-xl text-xs font-bold border border-amber-200 flex items-center gap-1"
                        >
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          Rate Driver
                        </button>

                        <button
                          onClick={() => handleDownloadInvoice(trip.id)}
                          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Invoice PDF
                        </button>
                      </>
                    )}

                    {trip.type === 'CANCELLED' && (
                      <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-xl">
                        Full Escrow Refunded
                      </span>
                    )}
                  </div>
                </div>

              </div>
            ))
          ) : (
            <div className="p-8 text-center bg-slate-50 rounded-3xl border border-slate-200 text-slate-500 text-xs font-semibold">
              No trips found in this tab.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
