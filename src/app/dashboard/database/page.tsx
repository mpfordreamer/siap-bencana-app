'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, Filter, Download, Trash2 } from 'lucide-react';

export default function DatabasePage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      // Intentionally omitting .eq('status', 'PENDING') so we can see historical resolved data too
      const { data } = await supabase
        .from('emergency_reports')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setReports(data);
      setLoading(false);
    };
    fetchAll();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus laporan ini secara permanen?')) return;
    
    const { error } = await supabase
      .from('emergency_reports')
      .delete()
      .eq('id', id);

    if (error) {
      alert('Gagal menghapus data: ' + error.message);
    } else {
      setReports(prev => prev.filter(row => row.id !== id));
    }
  };

  const exportToCSV = () => {
    if (reports.length === 0) return alert('Tidak ada data untuk diekspor');

    const headers = ['Waktu', 'Pengirim', 'Tipe Bencana', 'Lokasi', 'Urgensi', 'Status'];
    const csvRows = reports.map(row => [
      new Date(row.created_at).toLocaleString('id-ID'),
      `"${row.sender_id}"`,
      `"${row.disaster_type}"`,
      `"${row.extracted_location}"`,
      row.urgency_level,
      row.status
    ].join(','));

    const csvString = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `laporan_siap_bencana_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 md:p-8 w-full h-full overflow-y-auto bg-gray-50/50">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden max-w-7xl mx-auto">
        
        {/* Table Toolbar */}
        <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white shadow-sm z-10 relative">
           <div className="relative w-full sm:w-80">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Cari Pengirim atau Lokasi..." 
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none transition-shadow"
              />
           </div>
           <div className="flex gap-3 w-full sm:w-auto">
              <button className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition shadow-sm w-full sm:w-auto">
                <Filter className="w-4 h-4" /> Filter Urgensi
              </button>
              <button 
                onClick={exportToCSV}
                className="flex items-center justify-center gap-2 bg-brand-primary text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-brand-accent transition shadow-sm w-full sm:w-auto"
              >
                <Download className="w-4 h-4" /> Export CSV
              </button>
           </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/80 text-gray-600 font-bold uppercase text-xs tracking-wider border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Waktu Laporan</th>
                <th className="px-6 py-4">Pengirim</th>
                <th className="px-6 py-4">Jenis Bencana</th>
                <th className="px-6 py-4">Lokasi (AI parsed)</th>
                <th className="px-6 py-4">Tingkat Urgensi</th>
                <th className="px-6 py-4">Sistem Status</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-16 font-medium text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                       <span className="w-6 h-6 border-2 border-brand-primary border-t-transparent rounded-full animate-spin"></span>
                       <span>Memuat database...</span>
                    </div>
                  </td>
                </tr>
              ) : reports.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 font-medium text-gray-400">Belum ada laporan bencana dalam sistem.</td>
                </tr>
              ) : (
                reports.map((row) => (
                  <tr key={row.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-gray-500 text-xs whitespace-nowrap">
                      {new Date(row.created_at).toLocaleString('id-ID', {day: 'numeric', month:'short', hour:'2-digit', minute:'2-digit'})}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 leading-snug">
                      <div>{row.sender_id}</div>
                      {row.is_verified ? (
                         <span className="inline-block mt-1 bg-emerald-100 text-emerald-700 text-[9px] px-2 py-0.5 rounded-sm font-bold uppercase tracking-widest">Warga Terverifikasi</span>
                      ) : (
                         <span className="inline-block mt-1 bg-gray-100 text-gray-500 text-[9px] px-2 py-0.5 rounded-sm font-bold uppercase tracking-widest">Bot Opsional</span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-700">{row.disaster_type}</td>
                    <td className="px-6 py-4 truncate max-w-[200px]" title={row.extracted_location}>
                      {row.extracted_location}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-sm uppercase tracking-widest
                        ${row.urgency_level === 'CRITICAL' ? 'bg-red-100 text-triage-critical' : 
                          row.urgency_level === 'HIGH' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-triage-info'}`}
                      >
                        {row.urgency_level}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border shadow-sm ${row.status === 'RESOLVED' ? 'text-emerald-600 border-emerald-200 bg-emerald-50' : 'text-gray-600 border-gray-200 bg-gray-50'}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => handleDelete(row.id)}
                        className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus Laporan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Dummy */}
        <div className="p-4 border-t border-gray-200 bg-gray-50/50 flex justify-between items-center text-sm text-gray-500">
          <span className="font-medium">Menampilkan <span className="text-gray-900 font-bold">{reports.length}</span> rekaman aliran data.</span>
          <div className="flex gap-1.5 shadow-sm rounded-lg overflow-hidden">
             <button className="px-4 py-1.5 border border-gray-300 hover:bg-gray-100 disabled:opacity-50 font-bold text-gray-700 bg-white" disabled>&lt; Prev</button>
             <button className="px-4 py-1.5 border-y border-gray-300 hover:bg-gray-100 font-bold text-brand-primary bg-blue-50">1</button>
             <button className="px-4 py-1.5 border border-gray-300 hover:bg-gray-100 disabled:opacity-50 font-bold text-gray-700 bg-white" disabled>Next &gt;</button>
          </div>
        </div>

      </div>
    </div>
  );
}
