'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Hardcoded MVP PIN logic as per PRD (123456)
    setTimeout(() => {
      if (pin === '123456') {
        // In a real app, set a secure HTTP-Only cookie here via an API route.
        // For this PWA frontend MVP, a simple localStorage flag is sufficient for immediate UX demonstration.
        if (typeof window !== 'undefined') {
          localStorage.setItem('admin_auth', 'true');
        }
        document.cookie = "admin_auth=true; path=/";
        router.push('/dashboard');
      } else {
        setError('PIN Keamanan salah. Akses ditolak.');
        setLoading(false);
        setPin('');
      }
    }, 800);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden relative">
        {/* Top Decorative Header */}
        <div className="h-32 bg-gradient-to-br from-brand-primary to-blue-800 absolute top-0 left-0 right-0 z-0">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        </div>
        
        <div className="relative z-10 pt-16 px-8 pb-10 flex flex-col items-center">
          
          <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-xl border-4 border-gray-50 mb-6 rotate-3 transform hover:rotate-0 transition-transform duration-300">
            <Shield className="w-12 h-12 text-brand-primary" />
          </div>
          
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">Otorisasi Petugas</h2>
          <p className="text-sm text-gray-500 font-medium text-center mb-8 px-2 leading-relaxed">
            Silakan masukkan <span className="font-bold text-gray-700">6 digit PIN</span> rahasia untuk masuk ke Command Center Operasional.
          </p>

          <form onSubmit={handleLogin} className="w-full">
            <div className="mb-6 relative">
              <label className="sr-only">PIN Keamanan</label>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                maxLength={6}
                inputMode="numeric"
                pattern="[0-9]*"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))}
                className={`w-full pl-12 pr-4 py-4 bg-gray-50/50 border-2 rounded-xl text-center text-3xl tracking-[0.4em] font-mono outline-none focus:bg-white transition-all ${error ? 'border-red-400 text-red-600 focus:ring-red-400' : 'border-gray-200 text-gray-900 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10'}`}
                placeholder="••••••"
                required
              />
            </div>

            {error && (
               <div className="mb-6 p-4 bg-red-50 rounded-xl flex items-start gap-3 text-sm text-red-700 font-bold border border-red-100 animate-in shake">
                 <AlertCircle className="w-5 h-5 shrink-0" />
                 <span>{error}</span>
               </div>
            )}

            <button
              type="submit"
              disabled={loading || pin.length < 6}
              className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-accent text-white font-extrabold text-lg py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  Verifikasi Akses <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <Link href="/" className="text-sm font-bold text-gray-400 hover:text-brand-primary transition-colors hover:underline underline-offset-4">
              Kembali ke Beranda Utama
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
