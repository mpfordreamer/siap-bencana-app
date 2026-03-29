'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { useChat } from 'ai/react';

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    initialMessages: [
      {
        id: 'welcome-message',
        role: 'assistant',
        content: 'Halo! Saya adalah Asisten AI Siap Bencana. 👋\n\nSistem ini dirancang untuk mempercepat respons Tim SAR secara otomatis.\n\nUntuk mencoba simulasi Pelaporan Cepat, silakan ketik musibah dan lokasi Anda. (Contoh: "Tolong, tanggul jebol di Jalan Margahayu").'
      }
    ]
  });

  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="bg-white w-80 sm:w-96 rounded-2xl shadow-2xl border border-gray-200 mb-4 overflow-hidden flex flex-col transform transition-all animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-brand-primary p-4 text-white flex justify-between items-center shadow-sm z-10">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-wide">Siap Bencana AI</h3>
                <p className="text-xs text-white/80 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors p-1">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Chat Body */}
          <div className="p-5 h-80 overflow-y-auto bg-[#F8FAFC] flex flex-col gap-4">
            {messages.map((m: any) => (
              <div key={m.id} className={`flex items-start gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`p-2 rounded-full flex-shrink-0 shadow-sm mt-1 ${m.role === 'user' ? 'bg-gray-200' : 'bg-brand-primary'}`}>
                  {m.role === 'user' ? <User className="w-4 h-4 text-gray-600" /> : <Bot className="w-4 h-4 text-white" />}
                </div>
                <div className={`border p-3.5 rounded-2xl text-sm shadow-sm leading-relaxed whitespace-pre-wrap ${
                  m.role === 'user' 
                    ? 'bg-brand-accent text-white border-transparent rounded-tr-none' 
                    : 'bg-white border-gray-200 text-gray-700 rounded-tl-none'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                 <div className="bg-brand-primary p-2 rounded-full flex-shrink-0 shadow-sm mt-1">
                   <Bot className="w-4 h-4 text-white" />
                 </div>
                 <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-tl-none flex gap-1 items-center shadow-sm">
                   <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
                   <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                   <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                 </div>
              </div>
            )}
            
            {error && (
              <div className="flex items-start gap-3">
                 <div className="bg-red-500 p-2 rounded-full flex-shrink-0 shadow-sm mt-1">
                   <X className="w-4 h-4 text-white" />
                 </div>
                 <div className="bg-red-50 border border-red-200 text-red-600 p-3.5 rounded-2xl rounded-tl-none text-sm shadow-sm leading-relaxed whitespace-pre-wrap">
                   Ups! Kesalahan sistem: {error.message}. (Apakah Anda baru saja menambahkan API Key ke .env? Sistem Next.js wajib di-restart agar kuncinya terbaca!)
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-100 flex items-center gap-3">
            <input 
              type="text" 
              value={input}
              onChange={handleInputChange}
              disabled={isLoading}
              placeholder="Ketik pesan Anda..." 
              className="flex-grow bg-gray-100 border border-transparent rounded-full px-5 py-2.5 text-sm focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:outline-none transition-all"
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-brand-accent text-white p-2.5 rounded-full hover:brightness-110 disabled:opacity-50 transition-all flex-shrink-0 shadow-sm hover:-translate-y-0.5 disabled:hover:translate-y-0"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-brand-accent text-white p-4 rounded-full shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center relative cursor-pointer ${isOpen ? 'rotate-12 scale-90 bg-gray-700' : 'hover:-translate-y-1'}`}
      >
        {!isOpen && (
           <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500"></span>
           </span>
        )}
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
}
