'use client';

import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';

export default function DashboardProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    document.cookie = "admin_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    if (typeof window !== 'undefined') window.localStorage.removeItem('admin_auth');
    window.location.href = '/';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-brand-primary text-white hover:bg-brand-accent flex items-center justify-center transition-all focus:outline-none focus:ring-4 focus:ring-brand-primary/20 shrink-0 shadow-md border-2 border-white"
        aria-label="Admin menu"
      >
        <User className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 py-2 z-50 origin-top-right animate-in fade-in zoom-in-95 duration-200">
          <div className="px-5 py-3 border-b border-gray-50 mb-1 bg-gray-50/50">
            <p className="text-sm font-bold text-gray-900 leading-tight">TIM-SAR-01</p>
            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest mt-1">Administrator</p>
          </div>
          
          <Link 
            href="/dashboard/settings"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-brand-primary transition-colors w-full text-left"
          >
            <Settings className="w-4 h-4 shrink-0 text-gray-400" />
            Pengaturan
          </Link>
          
          <div className="border-t border-gray-100 my-1"></div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-5 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors w-full text-left"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Keluar (Logout)
          </button>
        </div>
      )}
    </div>
  );
}
