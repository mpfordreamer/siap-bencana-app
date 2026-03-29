'use client';

import React from 'react';
import { Save, Bell, Shield, Bot, Key } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="p-4 md:p-8 w-full h-full overflow-y-auto bg-gray-50/50 font-sans">
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        
        {/* Header Summary */}
        <div className="bg-gradient-to-r from-brand-primary to-[#1651B1] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
           <h2 className="text-2xl font-bold mb-2 relative z-10">Konfigurasi Inti Command Center</h2>
           <p className="text-blue-100 relative z-10 font-medium max-w-xl leading-relaxed">Kelola mesin logika NLP Llama-3, batas sensitivitas darurat (Triage), dan otorisasi PIN Petugas SAR.</p>
        </div>


        {/* Section 2: Keamanan Akses */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
           <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-5">
             <div className="bg-amber-50 p-3 rounded-xl text-amber-600"><Shield className="w-6 h-6 stroke-[2.5]" /></div>
             <div>
               <h3 className="font-bold text-gray-900 text-lg">Keamanan Web (Access Controls)</h3>
               <p className="text-gray-500 text-sm font-medium mt-1">Ubah kata sandi dan identitas operator Command Center.</p>
             </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                 <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><Key className="w-4 h-4 text-gray-400"/> PIN Admin Baru</label>
                 <input type="password" placeholder="••••••" className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-mono tracking-[0.5em] text-lg bg-gray-50/50 hover:bg-white transition-colors shadow-sm"/>
              </div>
              <div className="flex items-end">
                 <button className="w-full bg-white hover:bg-gray-50 text-gray-800 font-bold py-3 rounded-xl border border-gray-300 transition-all shadow-sm flex items-center justify-center gap-2">
                    Update Kredensial
                 </button>
              </div>
           </div>
        </div>

        {/* Section 3: Notifikasi Command Center */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
           <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-5">
             <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600"><Bell className="w-6 h-6 stroke-[2.5]" /></div>
             <div>
               <h3 className="font-bold text-gray-900 text-lg">Peringatan Visual & Audio UI</h3>
               <p className="text-gray-500 text-sm font-medium mt-1">Sesuaikan perilaku notifikasi layar dan audio sirene ketika ada tiket CRITICAL baru.</p>
             </div>
           </div>
           
           <div className="flex items-center gap-4 py-3 px-4 bg-gray-50 rounded-xl border border-gray-200">
              <label className="relative inline-flex items-center cursor-pointer flex-1">
                <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 shadow-inner"></div>
                <span className="ml-4 text-sm font-bold text-gray-800">Aktifkan efek kedip Sonar Darurat pada titik-titik Peta Leaflet</span>
              </label>
           </div>
        </div>

        {/* Action Bottom */}
        <div className="pt-2 flex justify-end">
           <button className="flex items-center gap-2 bg-brand-primary hover:bg-brand-accent text-white font-bold py-3.5 px-10 rounded-xl shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl">
             <Save className="w-5 h-5" /> Simpan Konfigurasi
           </button>
        </div>

      </div>
    </div>
  );
}
