# Siap Bencana - Admin Panel & Triage System

**Siap Bencana** adalah sistem manajemen darurat bertenaga AI yang dirancang untuk membantu tim penyelamat (BPBD/SAR) memprioritaskan evakuasi warga saat terjadi bencana alam. Dengan fokus pada kecepatan dan aksesibilitas, sistem ini mampu mengolah laporan dari berbagai jalur komunikasi dan menampilkannya secara cerdas pada dashboard admin.

## 🚀 Fitur Utama

- **Dashboard Admin Panel**: Visualisasi peta interaktif (Leaflet) yang menunjukkan lokasi laporan secara real-time.
- **Sistem Triage AI**: Secara otomatis mengklasifikasikan laporan ke dalam tingkat urgensi:
  - `CRITICAL`: Ancamannya nyawa, membutuhkan respons segera (Lampu Sonar Merah).
  - `HIGH`: Ancaman serius terhadap properti atau kesehatan (Lampu Kuning).
  - `INFO`: Informasi umum atau situasi terkendali (Lampu Biru).
- **Manajemen Database**: Fitur verifikasi laporan, penghapusan data, dan ekspor seluruh database ke format CSV.
- **Pengaturan Sistem**: Konfigurasi PIN keamanan dinamis dan preferensi UI yang tersimpan secara lokal.
- **Landing Page Responsif**: Halaman depan informatif dengan panduan "Live Demo Experience" untuk penguji.
- **Efisiensi SMS Gateway**: Dirancang untuk menerima pesan SOS dengan penggunaan data minimal atau melalui SMS saat internet terputus.

## 🛠️ Tumpukan Teknologi (Tech Stack)

- **Frontend**: [Next.js 14/15](https://nextjs.org/) (App Router), [Tailwind CSS](https://tailwindcss.com/)
- **Backend/Database**: [Supabase](https://supabase.com/) (PostgreSQL & Service Role Auth)
- **AI Engine**: [Groq AI](https://groq.com/) (Extraction & Urgency Classification)
- **Maps**: [React Leaflet](https://react-leaflet.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📦 Panduan Instalasi (Setup)

1. **Clone Repositori**:
   ```bash
   git clone https://github.com/mpfordreamer/siap-bencana-app.git
   cd siap-bencana-web
   ```

2. **Instal Dependensi**:
   ```bash
   npm install
   ```

3. **Konfigurasi Variabel Lingkungan**:
   Buat file `.env.local` di root folder dan isi dengan kredensial berikut:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   GROQ_API_KEY=your_groq_api_key
   ```

4. **Jalankan Aplikasi**:
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 🔑 Akses Default
- **PIN Admin**: `123456` (Dapat diubah di halaman Pengaturan)
- **Nomor SMS Gateway**: `+62 851-8307-1646`

---
*Proyek ini dikembangkan sebagai bagian dari tantangan IDCamp untuk solusi teknologi penanganan bencana.*
