'use client';

import React, { useState, useEffect } from 'react';
import { Save, Bell, Shield, Key, Eye, EyeOff } from 'lucide-react';

export default function SettingsPage() {
  const [pin, setPin] = useState('');
  const [isSonarEnabled, setIsSonarEnabled] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showPin, setShowPin] = useState(false);

  // Load settings on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSonar = localStorage.getItem('ui_sonar_effect');
      if (savedSonar !== null) setIsSonarEnabled(savedSonar === 'true');
    }
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate save delay
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        if (pin.length === 6) {
          localStorage.setItem('admin_pin', pin);
        }
        localStorage.setItem('ui_sonar_effect', isSonarEnabled.toString());
      }
      
      setIsSaving(false);
      alert('Konfigurasi sistem berhasil diperbarui. Pengaturan PIN baru akan berlaku pada sesi login berikutnya.');
      setPin('');
    }, 600);
  };

  return (
    <div className="p-4 md:p-8 w-full h-full overflow-y-auto bg-gray-50/50 font-sans">
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        
        {/* Header Summary */}
        <div className="bg-gradient-to-r from-brand-primary to-[#1651B1] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
           <h2 className="text-2xl font-bold mb-2 relative z-10">Konfigurasi Inti Admin Panel</h2>
           <p className="text-blue-100 relative z-10 font-medium max-w-xl leading-relaxed">Kelola mesin logika NLP Llama-3, batas sensitivitas darurat (Triage), dan otorisasi PIN Petugas SAR.</p>
        </div>


        {/* Section 2: Keamanan Akses */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
           <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-5">
             <div className="bg-amber-50 p-3 rounded-xl text-amber-600"><Shield className="w-6 h-6 stroke-[2.5]" /></div>
             <div>
               <h3 className="font-bold text-gray-900 text-lg">Keamanan Web (Access Controls)</h3>
               <p className="text-gray-500 text-sm font-medium mt-1">Ubah kata sandi dan identitas operator Admin Panel.</p>
             </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                 <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><Key className="w-4 h-4 text-gray-400"/> PIN Admin Baru (6 Digit)</label>
                 <div className="relative">
                   <input 
                     type={showPin ? "text" : "password"} 
                     maxLength={6}
                     value={pin}
                     onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))}
                     placeholder="••••••" 
                     className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-mono tracking-[0.5em] text-lg bg-gray-50/50 hover:bg-white transition-colors shadow-sm pr-12"
                   />
                   <button 
                     type="button"
                     onClick={() => setShowPin(!showPin)}
                     className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-brand-primary transition-colors focus:outline-none"
                   >
                     {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                   </button>
                 </div>
                 <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-wider">Default: 123456</p>
              </div>
           </div>
        </div>

        {/* Section 3: Notifikasi Admin Panel */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
           <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-5">
             <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600"><Bell className="w-6 h-6 stroke-[2.5]" /></div>
             <div>
               <h3 className="font-bold text-gray-900 text-lg">Peringatan Visual & Audio UI</h3>
               <p className="text-gray-500 text-sm font-medium mt-1">Sesuaikan perilaku notifikasi layar ketika ada laporan darurat baru.</p>
             </div>
           </div>
           
           <div className="flex items-center gap-4 py-3 px-4 bg-gray-50 rounded-xl border border-gray-200">
              <label className="relative inline-flex items-center cursor-pointer flex-1">
                <input 
                  type="checkbox" 
                  checked={isSonarEnabled}
                  onChange={(e) => setIsSonarEnabled(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 shadow-inner"></div>
                <span className="ml-4 text-sm font-bold text-gray-800">Aktifkan efek sonar pada peta laporan darurat</span>
              </label>
           </div>
        </div>

        {/* Action Bottom */}
        <div className="pt-2 flex justify-end">
           <button 
             onClick={handleSave}
             disabled={isSaving}
             className="flex items-center gap-2 bg-brand-primary hover:bg-brand-accent text-white font-bold py-3.5 px-10 rounded-xl shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl disabled:opacity-50"
           >
             {isSaving ? 'Menyimpan...' : (
               <>
                 <Save className="w-5 h-5" /> Simpan Konfigurasi
               </>
             )}
           </button>
        </div>

      </div>
    </div>
  );
}
