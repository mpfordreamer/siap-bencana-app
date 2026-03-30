'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Map, Database, Settings, LogOut, Activity } from 'lucide-react';
import Image from 'next/image';
import logoSvg from "@/assets/siapbencana.svg";
import DashboardProfileDropdown from "@/components/dashboard/DashboardProfileDropdown";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans">
      {/* Left Sidebar - Gestalt: Proximity (Grouping navigation together) */}
      <aside className="w-16 md:w-64 bg-brand-primary flex flex-col items-center md:items-stretch shadow-2xl z-20 transition-all duration-300">
        
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-center md:justify-start md:px-6 border-b border-white/10 shrink-0 bg-brand-primary/50">
          <div className="bg-white rounded-full p-1.5 flex items-center justify-center shadow-md">
            <Image src={logoSvg} alt="Logo" className="w-5 h-5 object-contain" />
          </div>
          <span className="hidden md:block ml-3 text-white font-bold tracking-wider whitespace-nowrap text-xs md:text-sm">ADMIN PANEL</span>
        </div>

        {/* Navigation - Gestalt: Similarity (Consistent link styles) */}
        <nav className="flex-1 py-6 flex flex-col gap-2 px-2 md:px-4 overflow-y-auto">
          <Link href="/dashboard" className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${pathname === '/dashboard' ? 'bg-white/10 text-white shadow-inner' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}>
            <Map className="w-5 h-5 shrink-0" />
            <span className="hidden md:block font-medium">Peta Pemantauan</span>
          </Link>
          <Link href="/dashboard/database" className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${pathname === '/dashboard/database' ? 'bg-white/10 text-white shadow-inner' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}>
            <Database className="w-5 h-5 shrink-0" />
            <span className="hidden md:block font-medium">Database Laporan</span>
          </Link>
          <Link href="/dashboard/settings" className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${pathname === '/dashboard/settings' ? 'bg-white/10 text-white shadow-inner' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}>
            <Settings className="w-5 h-5 shrink-0" />
            <span className="hidden md:block font-medium">Pengaturan Sistem</span>
          </Link>
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 bg-brand-primary/30">
          <div className="flex flex-col items-center md:items-start gap-5">
            {/* System Status Indicator */}
            <div className="flex items-center gap-2.5 px-1">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="hidden md:block text-xs font-bold text-emerald-400 uppercase tracking-widest">Sistem Online</span>
            </div>
            
            {/* Logout */}
            <button 
              onClick={() => {
                document.cookie = "admin_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                if (typeof window !== 'undefined') window.localStorage.removeItem('admin_auth');
                window.location.href = '/';
              }} 
              className="w-full flex items-center justify-center md:justify-start gap-3 p-2 md:p-3 text-white/70 hover:text-white hover:bg-red-500/20 hover:text-red-300 rounded-lg transition-colors text-left"
            >
              <LogOut className="w-5 h-5 shrink-0" />
              <span className="hidden md:block font-bold">Keluar</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col bg-gray-50 relative overflow-hidden">
        
        {/* Top Bar - Gestalt: Continuity (Clean horizontal separator) */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-10">
          <div className="flex items-center gap-3 shadow-sm rounded-lg">
             <Activity className="w-5 h-5 text-brand-primary" />
             <h2 className="text-lg md:text-xl font-bold text-gray-800 tracking-tight">
               {pathname === '/dashboard' ? 'Live Feed Triage' : pathname === '/dashboard/database' ? 'Database Arus Laporan' : 'Pengaturan Sistem'}
             </h2>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-2 mr-4">
               <div className="h-2 w-2 rounded-full bg-triage-critical border border-transparent"></div><span className="text-xs font-bold text-gray-600">Critical</span>
               <div className="h-2 w-2 mb-0.5 rounded-full bg-amber-500 ml-2"></div><span className="text-xs font-bold text-gray-600">High</span>
             </div>
             <DashboardProfileDropdown />
          </div>
        </header>
        
        {/* Sub-view Content */}
        <div className="flex-1 overflow-hidden relative">
          {children}
        </div>
      </main>
    </div>
  );
}
