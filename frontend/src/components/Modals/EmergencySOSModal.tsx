'use client';

import { useState } from 'react';
import { useRideStore } from '@/store/useRideStore';
import { X, AlertTriangle, PhoneCall, ShieldAlert, CheckCircle2, Radio } from 'lucide-react';

export default function EmergencySOSModal() {
  const { isSOSModalOpen, setIsSOSModalOpen, user, selectedRide } = useRideStore();
  
  const [triggered, setTriggered] = useState(false);

  if (!isSOSModalOpen) return null;

  const handleActivateSOS = () => {
    setTriggered(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-red-950/70 backdrop-blur-md transition-opacity animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-red-200 text-center space-y-5">
        
        {/* Top Icon */}
        <div className="w-20 h-20 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto shadow-lg animate-bounce">
          <AlertTriangle className="w-10 h-10 stroke-[2.5]" />
        </div>

        {!triggered ? (
          <>
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-slate-900">Emergency SOS Response</h2>
              <p className="text-xs text-slate-600 font-medium max-w-sm mx-auto">
                Pressing activate will instantly stream your live GPS location to emergency helpline (112), trusted contacts, and AbhiRide safety operations center.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs font-semibold text-slate-700 space-y-1">
              <p>📍 Location: Bengaluru - Hosur Highway (KM 24.5)</p>
              <p>📞 Emergency Contact: {user.emergencyContact}</p>
              <p>🚗 Active Ride: {selectedRide?.driverName || 'Community Member'} ({selectedRide?.vehicle.licensePlate || 'KA-01-MJ-8821'})</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsSOSModalOpen(false)}
                className="w-1/2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleActivateSOS}
                className="w-1/2 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xs font-bold shadow-xl animate-pulse"
              >
                ACTIVATE SOS ALERT NOW
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-4 py-2">
            <div className="flex items-center justify-center gap-2 text-red-600 font-extrabold text-lg">
              <Radio className="w-6 h-6 animate-ping" />
              EMERGENCY BROADCAST ACTIVE
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Emergency responders & safety dispatchers have been dispatched to your exact GPS coordinates. Stay calm.
            </p>
            <button
              onClick={() => {
                setTriggered(false);
                setIsSOSModalOpen(false);
              }}
              className="w-full py-3 bg-slate-900 text-white rounded-2xl text-xs font-bold"
            >
              Dismiss / Mark Safe
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
