'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';

interface InteractiveMapProps {
  originLat?: number;
  originLng?: number;
  destinationLat?: number;
  destinationLng?: number;
  driverLat?: number;
  driverLng?: number;
  interactive?: boolean;
  height?: string;
  driverName?: string;
}

// Custom SVG map pin icons
const createCustomPinIcon = (color: string, iconSymbol: string) => {
  return L.divIcon({
    className: 'custom-map-pin',
    html: `<div style="
      background-color: ${color};
      width: 38px;
      height: 38px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 16px;
      box-shadow: 0 8px 16px rgba(0,0,0,0.25);
      border: 3px solid white;
    ">${iconSymbol}</div>`,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
  });
};

const createCarMarkerIcon = () => {
  return L.divIcon({
    className: 'custom-car-pin',
    html: `<div style="
      background: linear-gradient(135deg, #059669, #10b981);
      width: 46px;
      height: 46px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      box-shadow: 0 0 20px rgba(16, 185, 129, 0.6);
      border: 3px solid white;
      animation: pulseGlow 2s infinite ease-in-out;
    ">🚗</div>`,
    iconSize: [46, 46],
    iconAnchor: [23, 23],
  });
};

// Component to dynamically fit map bounds to route
function MapBoundsUpdater({ bounds }: { bounds: L.LatLngBoundsExpression }) {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [bounds, map]);
  return null;
}

export default function InteractiveMap({
  originLat = 12.9172,
  originLng = 77.6228,
  destinationLat = 13.0418,
  destinationLng = 80.2341,
  driverLat,
  driverLng,
  height = '420px',
  driverName = 'Verified Driver'
}: InteractiveMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div
        className="w-full shimmer-bg rounded-3xl flex items-center justify-center text-slate-400 font-medium"
        style={{ height }}
      >
        <span>Loading Interactive Map Engine...</span>
      </div>
    );
  }

  const originPos: [number, number] = [originLat, originLng];
  const destPos: [number, number] = [destinationLat, destinationLng];
  const driverPos: [number, number] = [
    driverLat || (originLat + destinationLat) / 2,
    driverLng || (originLng + destinationLng) / 2
  ];

  // Simulated curvature route polyline
  const routePolyline: [number, number][] = [
    originPos,
    [(originLat * 2 + destinationLat) / 3, (originLng * 2 + destinationLng) / 3],
    driverPos,
    [(originLat + destinationLat * 2) / 3, (originLng + destinationLng * 2) / 3],
    destPos
  ];

  const bounds: L.LatLngBoundsExpression = [originPos, destPos];

  return (
    <div className="w-full relative overflow-hidden rounded-3xl border border-slate-200/80 shadow-lg" style={{ height }}>
      <MapContainer
        center={originPos}
        zoom={9}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapBoundsUpdater bounds={bounds} />

        {/* Polyline Route Line */}
        <Polyline
          positions={routePolyline}
          pathOptions={{
            color: '#059669',
            weight: 5,
            opacity: 0.8,
            dashArray: '8, 8'
          }}
        />

        {/* Origin Marker */}
        <Marker position={originPos} icon={createCustomPinIcon('#059669', 'A')}>
          <Popup>
            <div className="p-1 font-sans">
              <span className="text-xs font-semibold uppercase text-brand-600 block">Pickup Location</span>
              <p className="text-sm font-bold text-slate-800">Origin Point</p>
            </div>
          </Popup>
        </Marker>

        {/* Destination Marker */}
        <Marker position={destPos} icon={createCustomPinIcon('#1E293B', 'B')}>
          <Popup>
            <div className="p-1 font-sans">
              <span className="text-xs font-semibold uppercase text-slate-500 block">Dropoff Point</span>
              <p className="text-sm font-bold text-slate-800">Destination</p>
            </div>
          </Popup>
        </Marker>

        {/* Animated Moving Vehicle Marker */}
        <Marker position={driverPos} icon={createCarMarkerIcon()}>
          <Popup>
            <div className="p-2 font-sans text-center">
              <span className="inline-block px-2 py-0.5 bg-brand-100 text-brand-700 font-bold text-xs rounded-full mb-1">
                LIVE VEHICLE GPS
              </span>
              <p className="text-sm font-bold text-slate-900">{driverName}</p>
              <p className="text-xs text-slate-500">Speed: 65 km/h • On Schedule</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
