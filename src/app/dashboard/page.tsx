'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, MapPin, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import dynamic from 'next/dynamic';
import { MapReport } from '@/components/dashboard/MapView';

// MapView must be dynamically imported with SSR disabled because Leaflet uses window object
const MapView = dynamic(() => import('@/components/dashboard/MapView'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-blue-50/50">
      <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="font-semibold text-lg text-brand-primary">Mempersiapkan Peta Tim SAR...</p>
    </div>
  )
});

// helper to format relative time
function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds} dtk lalu`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} mnt lalu`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} jam lalu`;
  return `${Math.floor(diffInHours / 24)} hr lalu`;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'map' | 'feed'>('map');
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('emergency_reports')
      .select('*')
      .eq('status', 'PENDING')
      .order('created_at', { ascending: false });
      
    if (!error && data) {
      const sortedData = [...data].sort((a, b) => {
        const urgencyWeight = { 'CRITICAL': 3, 'HIGH': 2, 'INFO': 1, 'UNKNOWN': 0 };
        const weightA = urgencyWeight[a.urgency_level as keyof typeof urgencyWeight] || 0;
        const weightB = urgencyWeight[b.urgency_level as keyof typeof urgencyWeight] || 0;
        
        if (weightA !== weightB) return weightB - weightA;
        if (a.vulnerable_people !== b.vulnerable_people) return a.vulnerable_people ? -1 : 1;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
      setReports(sortedData);
    } else if (error) {
      console.error("Gagal menarik data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();

    const channel = supabase
      .channel('public:emergency_reports')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'emergency_reports' }, () => {
        fetchReports();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const markAsResolved = async (id: string) => {
    const { error } = await supabase
      .from('emergency_reports')
      .update({ status: 'RESOLVED' })
      .eq('id', id);
      
    if (!error) {
       setReports(prev => prev.filter(r => r.id !== id));
    } else {
       alert('Gagal mengupdate status: ' + error.message);
    }
  };

  const mapReportsData: MapReport[] = reports.map(r => ({
    id: r.id,
    latitude: r.latitude,
    longitude: r.longitude,
    urgency_level: r.urgency_level,
    extracted_location: r.extracted_location,
    disaster_type: r.disaster_type
  }));

  return (
    <div className="h-full flex flex-col md:flex-row w-full font-sans">
      <div className={`w-full md:w-5/12 lg:w-4/12 h-full bg-white border-r border-gray-200 flex flex-col ${activeTab === 'map' ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <span className="bg-brand-primary text-white text-xs w-6 h-6 flex items-center justify-center rounded-full shadow-sm">
              {reports.length}
            </span>
            Laporan Darurat {loading && <span className="text-xs text-gray-400 animate-pulse">(Memuat...)</span>}
          </h3>
          <button onClick={fetchReports} className="text-xs text-brand-primary font-bold hover:text-brand-accent transition-colors px-3 py-1.5 bg-blue-50 rounded-md">
            Muat Ulang
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
          {reports.length === 0 && !loading && (
             <div className="text-center p-8 text-gray-400 mt-10">
               <AlertTriangle className="w-12 h-12 mx-auto mb-3 opacity-20" />
               <p className="font-medium">Tidak ada laporan darurat aktif. Area dipantau aman.</p>
             </div>
          )}

          {reports.map((report) => (
            <div 
              key={report.id} 
              className={`bg-white rounded-xl border border-gray-100 border-l-4 shadow-sm p-5 hover:shadow-md transition-shadow relative 
                ${report.urgency_level === 'CRITICAL' ? 'border-l-triage-critical' : 
                  report.urgency_level === 'HIGH' ? 'border-l-amber-500' : 'border-l-triage-info opacity-80 hover:opacity-100'}`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-sm uppercase tracking-widest
                  ${report.urgency_level === 'CRITICAL' ? 'bg-red-100 text-triage-critical' : 
                    report.urgency_level === 'HIGH' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-triage-info'}`}
                >
                  {report.urgency_level}
                </span>
                <span className="text-xs text-gray-500 font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5"/> {timeAgo(report.created_at)}
                </span>
              </div>
              
              <h4 className="font-bold text-gray-900 text-lg mb-1 leading-snug">
                 {report.extracted_location}
              </h4>
              
              <p className="text-xs text-gray-500 font-bold mb-2 uppercase tracking-wider">{report.disaster_type} {report.vulnerable_people ? '• (ADA KORBAN RENTAN)' : ''}</p>
              
              <p className="text-gray-600 text-sm mb-5 italic border-l-2 border-gray-200 pl-3 leading-relaxed">
                "{report.raw_message}"
              </p>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                 {report.is_verified ? (
                   <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                     <CheckCircle className="w-3.5 h-3.5" /> Terverifikasi
                   </span>
                 ) : (
                   <span className="text-xs font-bold text-gray-400 flex items-center gap-1.5">
                     Belum Verifikasi
                   </span>
                 )}
                 
                 <button 
                   onClick={() => markAsResolved(report.id)}
                   className={`text-sm font-bold transition-colors px-4 py-2 rounded-md shadow-sm border
                     ${report.urgency_level === 'CRITICAL' 
                       ? 'text-white bg-brand-primary hover:bg-brand-accent border-transparent' 
                       : 'text-brand-primary hover:text-brand-accent border-gray-200 bg-gray-50'}`}
                 >
                   Tandai Selesai
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`w-full md:w-7/12 lg:w-8/12 h-full bg-blue-50/50 relative overflow-hidden ${activeTab === 'feed' ? 'hidden md:block' : 'block'}`}>
        {!loading && <MapView reports={mapReportsData} />}
      </div>

      <div className="md:hidden absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-30">
         <button 
           onClick={() => setActiveTab('map')} 
           className={`flex-1 flex flex-col items-center justify-center gap-1 font-bold text-xs uppercase tracking-widest ${activeTab === 'map' ? 'text-brand-primary bg-blue-50/50 border-t-2 border-brand-primary' : 'text-gray-400 hover:bg-gray-50'}`}
         >
           <MapPin className="w-5 h-5 mb-0.5"/> Peta Interaktif
         </button>
         <button 
           onClick={() => setActiveTab('feed')} 
           className={`flex-1 flex flex-col items-center justify-center gap-1 font-bold text-xs uppercase tracking-widest ${activeTab === 'feed' ? 'text-brand-primary bg-blue-50/50 border-t-2 border-brand-primary' : 'text-gray-400 hover:bg-gray-50'}`}
         >
           <AlertTriangle className="w-5 h-5 mb-0.5"/> Laporan Masuk
         </button>
      </div>
    </div>
  );
}
