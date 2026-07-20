'use client';

import { useState, useEffect } from 'react';
import { useRideStore } from '@/store/useRideStore';
import DynamicMap from '@/components/Map/DynamicMap';
import { X, AlertTriangle, Share2, PhoneCall, Navigation, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function LiveTrackingModal() {
  const { isTrackingModalOpen, setIsTrackingModalOpen, selectedRide, setIsSOSModalOpen } = useRideStore();
  
  const [driverLat, setDriverLat] = useState(selectedRide?.originLat || 12.9172);
  const [driverLng, setDriverLng] = useState(selectedRide?.originLng || 77.6228);
  const [copiedLink, setCopiedLink] = useState(false);

  // Live GPS simulation loop
  useEffect(() => {
    if (!isTrackingModalOpen || !selectedRide) return;

    const interval = setInterval(() => {
      setDriverLat((prev) => prev + (selectedRide.destinationLat - selectedRide.originLat) * 0.02);
      setDriverLng((prev) => prev + (selectedRide.destinationLng - selectedRide.originLng) * 0.02);
    }, 3000);

    return () => clearInterval(interval);
  }, [isTrackingModalOpen, selectedRide]);

  if (!isTrackingModalOpen || !selectedRide) return null;

  const handleShareTrip = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 no-scrollbar">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-20">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
            </span>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-600">Live Telemetry Stream</span>
              <h2 className="text-xl font-extrabold text-slate-900">{selectedRide.origin} → {selectedRide.destination}</h2>
            </div>
          </div>

          <button
            onClick={() => setIsTrackingModalOpen(false)}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Real-time Leaflet Map Component */}
          <DynamicMap
            originLat={selectedRide.originLat}
            originLng={selectedRide.originLng}
            destinationLat={selectedRide.destinationLat}
            destinationLng={selectedRide.destinationLng}
            driverLat={driverLat}
            driverLng={driverLng}
            height="380px"
            driverName={selectedRide.driverName}
          />

          {/* Telemetry Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Current Speed</span>
              <span className="text-xl font-extrabold text-slate-900">68 km/h</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Distance Remaining</span>
              <span className="text-xl font-extrabold text-brand-700">142 KM</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Estimated Arrival</span>
              <span className="text-xl font-extrabold text-slate-900">12:45 PM</span>
            </div>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
              <span className="text-[10px] text-brand-700 font-bold uppercase block">Vehicle Telemetry</span>
              <span className="text-xs font-bold text-brand-800">GPS Signal Strong</span>
            </div>
          </div>

          {/* Driver & Safety Bar */}
          <div className="p-5 bg-slate-50 rounded-3xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={selectedRide.driverAvatar} alt="" className="w-12 h-12 rounded-2xl object-cover" />
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">{selectedRide.driverName}</h4>
                <p className="text-xs text-slate-500">{selectedRide.vehicle.make} {selectedRide.vehicle.model} • {selectedRide.vehicle.licensePlate}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleShareTrip}
                className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Share2 className="w-4 h-4 text-brand-600" />
                {copiedLink ? 'Tracking Link Copied!' : 'Share Live Trip'}
              </button>

              <button
                onClick={() => setIsSOSModalOpen(true)}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xs font-bold shadow-md hover:scale-105 transition-all flex items-center gap-1.5"
              >
                <AlertTriangle className="w-4 h-4" />
                Emergency SOS
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
