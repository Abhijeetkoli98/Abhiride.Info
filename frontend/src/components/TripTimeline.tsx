'use client';

import { CheckCircle2, Clock, MapPin, Navigation, Flag, Car } from 'lucide-react';

interface TimelineStage {
  stage: string;
  title: string;
  time: string;
  completed: boolean;
  active?: boolean;
}

interface TripTimelineProps {
  currentStageIndex?: number;
}

export default function TripTimeline({ currentStageIndex = 4 }: TripTimelineProps) {
  const stages: TimelineStage[] = [
    { stage: '1', title: 'Booking Confirmed & Escrow Locked', time: '06:00 AM', completed: true },
    { stage: '2', title: 'Driver Confirmed & Pickup Scheduled', time: '06:05 AM', completed: true },
    { stage: '3', title: 'Driver Arriving at Pickup Stop', time: '06:25 AM', completed: true },
    { stage: '4', title: 'Passenger Boarded & QR Code Scanned', time: '06:30 AM', completed: true },
    { stage: '5', title: 'Journey In Transit (68 km/h Telemetry)', time: '08:45 AM', completed: false, active: true },
    { stage: '6', title: 'Destination Reached & Fare Released', time: 'Est 12:45 PM', completed: false }
  ];

  return (
    <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4 h-4 text-brand-600" />
          Digital Live Trip Stage Progress Timeline
        </h4>
        <span className="text-[10px] font-extrabold bg-brand-50 text-brand-700 px-2.5 py-0.5 rounded-full border border-brand-200">
          Stage 5 of 6 Active
        </span>
      </div>

      <div className="space-y-4 relative pl-4">
        {/* Continuous Connecting Line */}
        <div className="absolute left-[23px] top-3 bottom-3 w-0.5 bg-slate-200 z-0" />

        {stages.map((stg, i) => (
          <div key={i} className="flex items-start gap-4 relative z-10">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 transition-transform ${
                stg.completed
                  ? 'bg-brand-600 ring-4 ring-brand-100'
                  : stg.active
                  ? 'bg-emerald-500 ring-4 ring-emerald-200 animate-pulse'
                  : 'bg-slate-300'
              }`}
            >
              {stg.completed ? '✓' : stg.stage}
            </div>

            <div className="flex-1 flex items-center justify-between">
              <div>
                <h5 className={`text-xs font-bold ${stg.active ? 'text-brand-700' : 'text-slate-800'}`}>
                  {stg.title}
                </h5>
              </div>
              <span className="text-[11px] font-semibold text-slate-400">{stg.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
