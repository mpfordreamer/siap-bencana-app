'use client';

import Link from 'next/link';
import Image from 'next/image';
import homeSvg from "@/assets/home.svg";
import { Button } from '@/components/ui/Button';
import { ShieldCheck, MessageSquare, MapPin, WifiOff, AlertCircle, Smartphone, Zap, CheckCircle2 } from 'lucide-react';

export default function MarketingPage() {
  return (
    <div className="w-full flex-grow flex flex-col font-sans">

      {/* SECTION 1: HERO */}
      <section className="bg-bg-base relative py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div className="order-2 lg:order-1 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-brand-primary mb-6 leading-tight">
                Satu Pesan. <br className="hidden lg:block" />
                Evakuasi Lebih Cepat.
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Jangan tunggu sampai panik. Daftarkan alamat rumah Anda sekarang. Saat bencana datang dan internet putus, cukup kirim satu SMS/Telegram, dan tim SAR akan tahu persis di mana Anda berada.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/register" className="w-full sm:w-auto">
                  <Button variant="primary" className="w-full text-lg py-4 px-8">
                    Daftarkan Rumah Saya (Gratis)
                  </Button>
                </Link>
                <Button variant="outline" className="w-full sm:w-auto text-lg py-4 px-8" onClick={() => alert('Kontak Darurat Tersimpan!\nTelegram: @SiapBencanaBot\nSMS: +62 811-XXXX-XXXX')}>
                  Simpan Nomor Darurat
                </Button>
              </div>
            </div>

            <div className="order-1 lg:order-2 flex justify-center">
              {/* Abstract Illustration Placeholder matching the prompt mood */}
              <div className="relative w-full max-w-md aspect-square rounded-full bg-blue-100 flex items-center justify-center shadow-lg border-8 border-white overflow-hidden">
                <Image
                  src={homeSvg}
                  alt="Ilustrasi Siap Bencana"
                  className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply bg-brand-primary/20"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-primary/80 to-transparent" />
                <div className="relative z-10 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 transform translate-y-32 scale-110">
                  <ShieldCheck className="text-brand-accent w-10 h-10" />
                  <div className="text-left">
                    <p className="text-xs text-brand-primary font-bold uppercase tracking-widest">Sistem Siaga</p>
                    <p className="text-sm text-gray-900 font-bold">Pemantauan AI Aktif 24/7</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-t border-gray-100">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-16 tracking-tight">
            Saat Bencana Tiba, Anda Tidak Punya Waktu Mengunduh Aplikasi.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-bg-base p-8 border-l-4 border-triage-critical rounded-r-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-red-100 text-triage-critical flex items-center justify-center rounded-xl mb-6">
                <WifiOff className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sinyal Lemah</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                Aplikasi canggih tidak berguna jika kuota habis atau sinyal 4G mati akibat badai.
              </p>
            </div>

            <div className="bg-bg-base p-8 border-l-4 border-triage-critical rounded-r-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-red-100 text-triage-critical flex items-center justify-center rounded-xl mb-6">
                <AlertCircle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Gagal Fokus</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                Saat air banjir naik, Anda mungkin lupa mengetik nama jalan dengan lengap.
              </p>
            </div>

            <div className="bg-bg-base p-8 border-l-4 border-triage-critical rounded-r-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-red-100 text-triage-critical flex items-center justify-center rounded-xl mb-6">
                <MessageSquare className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pesan Tenggelam</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                Pesan minta tolong di grup WhatsApp RT/RW sering tertumpuk dan terlewat oleh petugas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW IT WORKS */}
      <section className="py-24 bg-brand-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-semibold mb-6 tracking-tight">
              Bagaimana Siap Bencana Menyelamatkan Anda?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Sistem kerja magis yang kami sederhanakan agar mudah dipahami oleh siapa saja, dari milenial hingga lansia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
            <div className="hidden md:block absolute top-[60px] left-[16%] right-[16%] h-1 bg-white/20 -z-10 rounded-full"></div>

            <div className="flex flex-col items-center text-center">
              <div className="w-28 h-28 bg-white text-brand-primary rounded-full flex items-center justify-center mb-8 shadow-xl border-4 border-brand-primary transform hover:scale-105 transition-transform">
                <ShieldCheck className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Langkah 1: Siap Siaga</h3>
              <p className="text-gray-200 leading-relaxed text-lg">
                Anda mendaftarkan nama, nomor HP, dan alamat rumah secara detail di website ini. Hanya butuh 1 menit.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-28 h-28 bg-white text-brand-primary rounded-full flex items-center justify-center mb-8 shadow-xl border-4 border-brand-primary transform hover:scale-105 transition-transform">
                <MessageSquare className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Langkah 2: Saat Darurat</h3>
              <p className="text-gray-200 leading-relaxed text-lg">
                Kirim chat ke Bot Telegram atau SMS. Ketik pesannya seadanya. Walau panik, sistem otomatis mengenali nomor HP Anda dan mencocokkan dengan alamat.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-28 h-28 bg-white text-brand-primary rounded-full flex items-center justify-center mb-8 shadow-xl border-4 border-brand-primary transform hover:scale-105 transition-transform">
                <MapPin className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Langkah 3: Tepat Sasaran</h3>
              <p className="text-gray-200 leading-relaxed text-lg">
                Sistem Pintar kami langsung meletakkan titik merah di peta layar komputer Tim SAR BPBD secepat kilat untuk diprioritaskan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURES */}
      <section className="py-24 bg-bg-base border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight">
              Mengapa Siap Bencana Berbeda?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow text-center">
              <Smartphone className="w-14 h-14 text-triage-info mx-auto mb-6 bg-emerald-50 rounded-lg p-2" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tanpa Aplikasi Baru</h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                Hemat memori HP. Gunakan aplikasi Telegram yang sudah ada, atau gunakan SMS biasa jika internet mati total.
              </p>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow text-center">
              <Zap className="w-14 h-14 text-triage-info mx-auto mb-6 bg-emerald-50 rounded-lg p-2" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Asisten Cerdas 24 Jam</h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                Tidak ada jam sibuk. Robot cerdas kami membaca ribuan pesan dalam satu detik dan langsung menyaring mana warga yang butuh perahu karet paling cepat.
              </p>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow text-center">
              <ShieldCheck className="w-14 h-14 text-triage-info mx-auto mb-6 bg-emerald-50 rounded-lg p-2" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Privasi Terjaga</h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                Data alamat Anda disimpan super aman dan hanya "dibuka" di peta petugas relawan di Command Center khusus saat Anda mengirim SMS darurat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4.5: ARTIKEL & EDUKASI */}
      <section className="py-24 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold text-gray-900 tracking-tight mb-3">
                Pusat Edukasi & Informasi
              </h2>
              <p className="text-lg text-gray-600 font-medium">
                Kuasai panduan selamat dari bencana dan pelajari cara memaksimalkan fungsi pelaporan sistem Siap Bencana.
              </p>
            </div>
            <Link href="#" className="text-brand-accent font-bold hover:underline whitespace-nowrap flex items-center gap-1">
              Lihat Semua Artikel &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Featured Article 1: How to use the system */}
            <Link href="/artikel/panduan-sistem" className="group flex flex-col bg-bg-base rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="h-56 bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-primary/20 group-hover:bg-transparent transition-colors z-10" />
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop')" }}
                />
                <div className="absolute top-4 left-4 z-20 bg-brand-accent text-white text-xs font-bold px-3 py-1.5 rounded-sm uppercase tracking-widest shadow-sm">
                  Panduan Sistem
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <p className="text-xs text-brand-primary mb-3 font-bold tracking-widest">BACAAN WAJIB • 3 MENIT</p>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-brand-primary transition-colors leading-snug">
                  Cara Menggunakan Sistem Laporan Darurat SMS/Telegram Siap Bencana
                </h3>
                <p className="text-gray-600 line-clamp-3 leading-relaxed mb-6 flex-grow font-medium">
                  Langkah-demi-langkah mengirimkan pesan SOS saat kuota habis atau saat air mulai meninggi. Pelajari format pesannya sekarang agar sigap saat darurat.
                </p>
                <span className="text-brand-accent font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Pelajari Selengkapnya <span className="text-lg leading-none">&rarr;</span>
                </span>
              </div>
            </Link>

            {/* Article 2: Earthquake prep */}
            <Link href="/artikel/tas-siaga-bencana" className="group flex flex-col bg-bg-base rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="h-56 bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-primary/20 group-hover:bg-transparent transition-colors z-10" />
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1498354178607-a79df2916198?q=80&w=2000&auto=format&fit=crop')" }}
                />
                <div className="absolute top-4 left-4 z-20 bg-triage-info text-white text-xs font-bold px-3 py-1.5 rounded-sm uppercase tracking-widest shadow-sm">
                  Edukasi
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <p className="text-xs text-brand-primary mb-3 font-bold tracking-widest">GEMPA BUMI • 5 MENIT</p>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-brand-primary transition-colors leading-snug">
                  Tas Siaga Bencana: 10 Barang yang Wajib Ada di Dekat Pintu
                </h3>
                <p className="text-gray-600 line-clamp-3 leading-relaxed mb-6 flex-grow font-medium">
                  Jangan meremehkan persiapan kecil. Pelajari apa saja yang harus dimasukkan ke dalam Tas Siaga Bencana (TSB) keluarga Anda sebelum tidur malam ini.
                </p>
                <span className="text-brand-accent font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Baca Artikel <span className="text-lg leading-none">&rarr;</span>
                </span>
              </div>
            </Link>

            {/* Article 3: Flood response */}
            <Link href="/artikel/tanda-banjir-bandang" className="group flex flex-col bg-bg-base rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="h-56 bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-primary/20 group-hover:bg-transparent transition-colors z-10" />
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=2000&auto=format&fit=crop')" }}
                />
                <div className="absolute top-4 left-4 z-20 bg-triage-critical text-white text-xs font-bold px-3 py-1.5 rounded-sm uppercase tracking-widest shadow-sm">
                  Peringatan
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <p className="text-xs text-brand-primary mb-3 font-bold tracking-widest">MUSIM HUJAN • 4 MENIT</p>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-brand-primary transition-colors leading-snug">
                  Tanda-tanda Banjir Bandang dan Kapan Harus Segera Mengungsi
                </h3>
                <p className="text-gray-600 line-clamp-3 leading-relaxed mb-6 flex-grow font-medium">
                  Pahami warna air sungai, perubahan debit, dan instruksi BPBD setempat untuk mengenali potensi mematikan dari banjir kilat.
                </p>
                <span className="text-brand-accent font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Baca Artikel <span className="text-lg leading-none">&rarr;</span>
                </span>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* SECTION 5: FINAL CTA */}
      <section className="py-28 bg-white text-center border-t-4 border-brand-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-8 tracking-tight">
            Kesiapsiagaan Dimulai <span className="text-brand-primary">Hari Ini.</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
            1 Menit yang Anda luangkan untuk mendaftar hari ini, bisa menghemat 1 jam waktu pencarian Tim SAR esok hari.
          </p>
          <Link href="/register">
            <Button variant="primary" className="text-xl py-6 px-16 shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
              Mulai Registrasi Sekarang
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
