import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export interface MapReport {
  id: string;
  latitude: number;
  longitude: number;
  urgency_level: string;
  extracted_location: string;
  disaster_type: string;
}

// Ensure custom CSS is added to inject Tailwind's `animate-ping` into the Leaflet DOM.
// We use a simple circular div for all markers, matching the triage colors.
const createCustomIcon = (urgency: string) => {
  let color = '#10B981'; // Default Emerald (INFO)
  if (urgency === 'CRITICAL') color = '#EF4444'; // Red
  else if (urgency === 'HIGH') color = '#F59E0B'; // Amber
  
  // Custom HTML strictly uses inline styles for the base, 
  // but we can attach a class to tap into Tailwind's keyframes if needed
  const html = `
    <div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5); position: relative;">
      ${urgency === 'CRITICAL' ? `<div style="position: absolute; top: -4px; left: -4px; right: -4px; bottom: -4px; border-radius: 50%; border: 2px solid ${color}; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>` : ''}
    </div>
  `;

  return L.divIcon({
    className: 'custom-triage-icon',
    html: html,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -8],
  });
};

export default function MapView({ reports }: { reports: MapReport[] }) {
  // Default bounds roughly covering Indonesia, especially focused on Java/Bali
  const defaultCenter: [number, number] = [-6.9147, 107.6098]; // Bandung fallback

  // If there are specific reports, we could dynamically calculate bounds,
  // but for the MVP, having a fixed interactive view is more stable.
  const mapCenter = reports.length > 0 ? [reports[0].latitude, reports[0].longitude] as [number, number] : defaultCenter;

  return (
    <MapContainer 
      center={mapCenter} 
      zoom={11} 
      style={{ height: '100%', width: '100%', zIndex: 0 }}
      zoomControl={true}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      
      {reports.map(r => (
         <Marker 
            key={r.id} 
            position={[r.latitude, r.longitude]} 
            icon={createCustomIcon(r.urgency_level)}
         >
           <Popup>
             <div className="font-sans">
               <strong className="text-gray-900 mb-1 block">{r.disaster_type}</strong>
               <p className="text-sm text-gray-600 mb-2">{r.extracted_location}</p>
               <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase ${r.urgency_level === 'CRITICAL' ? 'bg-red-100 text-red-700' : r.urgency_level === 'HIGH' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                 {r.urgency_level}
               </span>
             </div>
           </Popup>
         </Marker>
      ))}
    </MapContainer>
  );
}
