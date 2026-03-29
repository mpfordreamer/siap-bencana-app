'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { InputField } from '@/components/ui/InputField';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function RegisterPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+62');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // Always enforce +62 at the start
    if (!val.startsWith('+62')) {
      val = '+62' + val.replace(/^\+?6?2?/, '');
    }
    setPhoneNumber(val);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get('full_name') as string;
    const address = formData.get('address') as string;

    try {
      const { error } = await supabase
        .from('registered_citizens')
        .insert([
          {
            full_name: fullName,
            phone_number: phoneNumber,
            address: address,
          },
        ]);

      if (error) {
        if (error.code === '23505') {
          throw new Error('Nomor telepon ini sudah terdaftar sebelumnya.');
        }
        throw error;
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Error inserting data:', err);
      setErrorMsg(err.message || 'Terjadi kesalahan sistem saat mendaftar. Silakan coba sesaat lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex-grow flex items-center justify-center bg-bg-base p-6 py-12">
        <div className="max-w-md w-full bg-surface p-8 rounded-lg shadow-sm border border-gray-200 text-center">
          <CheckCircle2 className="w-16 h-16 text-triage-info mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Pendaftaran Berhasil</h2>
          <p className="text-gray-600 mb-8">
            Data Anda telah diamankan di dalam sistem Siap Bencana. Kami siap membantu saat dibutuhkan.
          </p>
          <Button variant="outline" type="button" onClick={() => window.location.href = '/'} className="w-full">
            Kembali ke Beranda
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow flex items-center justify-center bg-bg-base p-4 sm:p-6 md:p-12">
      <div className="max-w-md w-full bg-surface p-8 rounded-lg shadow-sm border border-gray-200">
        <div className="text-center mb-8">
          <ShieldAlert className="w-12 h-12 text-brand-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Daftar Warga</h2>
          <p className="text-sm text-gray-500">
            Data Anda dienkripsi dan hanya digunakan saat keadaan darurat untuk evakuasi cepat.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-md text-sm">
            <p className="font-bold mb-1">Gagal Mendaftar</p>
            <p>{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Nama Lengkap"
            name="full_name"
            placeholder="Contoh: I Wayan Darma"
            required
          />

          <InputField
            label="Nomor Telepon (WhatsApp)"
            name="phone_number"
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            helperText="Pastikan nomor berawalan +62 agar bisa dihubungi bot"
            required
          />

          <InputField
            label="Alamat Lengkap Rumah"
            name="address"
            placeholder="Contoh: Jl. Mawar No 10, Semarapura, Kab. Klungkung"
            multiline={true}
            rows={3}
            required
          />

          <div className="pt-2">
            <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
              {isLoading ? 'Menyimpan...' : 'Simpan Data Saya'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
