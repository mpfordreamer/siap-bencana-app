'use client';

import React, { useState, useRef, useEffect } from 'react';
import { User, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function HeaderDropdown() {
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

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-11 h-11 rounded-full bg-brand-primary/10 hover:bg-brand-primary/20 border border-brand-primary/20 flex items-center justify-center text-brand-primary transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 shrink-0"
        aria-label="User menu"
      >
        <User className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 py-2 z-50 origin-top-right animate-in fade-in zoom-in-95 duration-200">
          <div className="px-5 py-3 border-b border-gray-50 mb-1 bg-gray-50/50">
            <p className="text-sm font-bold text-gray-900 leading-tight">Portal Akses</p>
            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest mt-1">Khusus Tim SAR</p>
          </div>
          <Link 
            href="/login"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-gray-700 hover:bg-blue-50 hover:text-brand-primary transition-colors w-full text-left"
          >
            <ShieldAlert className="w-4 h-4 shrink-0" />
            Login Command Center
          </Link>
        </div>
      )}
    </div>
  );
}
