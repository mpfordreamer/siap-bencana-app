import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, CalendarDays } from 'lucide-react';

const mockArticles = {
  'panduan-sistem': {
    title: 'Cara Menggunakan Sistem Laporan Darurat SMS/Telegram Siap Bencana',
    category: 'Panduan Sistem',
    readTime: '3 Menit Membaca',
    date: '20 Oktober 2026',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop',
    content: (
      <>
        <p className="text-xl text-gray-900 font-medium mb-8 leading-relaxed">
          Dalam kondisi darurat, setiap detik sangat berharga. Sistem Siap Bencana dirancang agar Anda bisa melapor hanya dengan satu pesan singkat (SMS), sekalipun Anda tidak memiliki kuota internet yang cukup untuk membuka aplikasi.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Langkah 1: Menyimpan Nomor Darurat</h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
          Pastikan Anda sudah menyimpan kontak Admin Panel Siap Bencana di HP Anda sekarang juga. Anda bisa melapor melalui jalur berikut:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
          <li><strong>SMS:</strong> Simpan nomor <strong>+62 851-8307-1646</strong> di kontak Anda.</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Langkah 2: Cara Mengirim Pesan Saat Darurat</h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
          Saat air mulai naik, atau terjadi gempa/longsor, ketik pesan Anda seadanya. Anda tidak perlu menggunakan huruf kapital atau format baku yang kaku. AI kami sangat pintar dan bisa mengerti bahasa sehari-hari.
        </p>
        <div className="bg-bg-base p-6 border-l-4 border-brand-accent rounded-r-lg my-8">
          <p className="font-bold text-gray-900 mb-2">Contoh Pesan Cepat:</p>
          <p className="text-gray-700 italic">"Tolong, air masuk rumah di jalan mawar, ada lansia terjebak!"</p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Langkah 3: Sistem Mengambil Alih</h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
          Begitu pesan Anda terkirim, kecerdasan buatan (AI) kami akan langsung bekerja dalam kurang dari 1 detik:
        </p>
        <ol className="list-decimal pl-6 mb-12 space-y-2 text-gray-700">
          <li>Sistem akan mendeteksi tingkat keparahan laporan (CRITICAL, HIGH, INFO).</li>
          <li>Sistem mencocokkan nomor telepon Anda dengan pangkalan data registrasi warga untuk menemukan titik koordinat absolut lokasi rumah Anda.</li>
          <li>Titik merah akan berkedip di Peta Admin Panel BPBD, dan Tim SAR segera diluncurkan ke lokasi Anda.</li>
        </ol>
      </>
    )
  },
  'tas-siaga-bencana': {
    title: 'Tas Siaga Bencana: 10 Barang yang Wajib Ada di Dekat Pintu',
    category: 'Edukasi',
    readTime: '5 Menit Membaca',
    date: '18 Oktober 2026',
    image: 'https://images.unsplash.com/photo-1498354178607-a79df2916198?q=80&w=2000&auto=format&fit=crop',
    content: (
      <>
        <p className="text-xl text-gray-900 font-medium mb-8 leading-relaxed">
          Bencana seperti gempa bumi dapat datang tanpa peringatan sama sekali. Saat dinding mulai berguncang, Anda hanya memiliki hitungan detik untuk menyelamatkan diri keluar rumah.
        </p>

        <p className="mb-6 text-gray-700 leading-relaxed">
          Memiliki Tas Siaga Bencana (TSB) yang siap digenggam di dekat pintu adalah langkah mitigasi paling cerdas yang dapat menyelamatkan keluarga Anda selama 72 jam pertama setelah evakuasi.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Daftar Isi Tas Siaga Bencana (TSB)</h2>
        <ul className="list-disc pl-6 mb-12 space-y-3 text-gray-700">
          <li><strong>Air & Makanan:</strong> Sediakan botol besar air mineral dan makanan instan (seperti biskuit energi) yang awet dan mudah dimakan tanpa dimasak.</li>
          <li><strong>Kotak P3K Darurat:</strong> Lengkapi dengan perban, antiseptik, obat merah, obat penurun panas, dan obat-obatan pribadi yang krusial (contoh: inhaler asma).</li>
          <li><strong>Senter & Baterai:</strong> Bencana hampir selalu memutus aliran listrik. Gunakan senter LED yang hemat energi.</li>
          <li><strong>Salinan Dokumen Penting:</strong> Segera fotokopi Surat Tanah, Ijazah, KTP, dan Kartu Keluarga ke dalam sebuah map kedap air atau plastik ziplock.</li>
          <li><strong>Uang Tunai:</strong> Jika jaringan internet terputus, ATM dan layanan Qris tidak akan bisa beroperasi. Pecahan kecil sangat berguna untuk keadaan darurat.</li>
          <li><strong>Peluit Pelacak:</strong> Peluit menghasilkan suara nyaring yang lebih jauh jangkauannya daripada teriakan. Ini untuk meminta pertolongan Tim SAR jika Anda terjebak.</li>
          <li><strong>Pakaian Ganti:</strong> Siapkan satu stel baju hangat dan jas hujan, terutama untuk mencegah hipotermia.</li>
        </ul>
      </>
    )
  },
  'tanda-banjir-bandang': {
    title: 'Tanda-tanda Banjir Bandang dan Kapan Harus Segera Mengungsi',
    category: 'Peringatan',
    readTime: '4 Menit Membaca',
    date: '15 Oktober 2026',
    image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=2000&auto=format&fit=crop',
    content: (
      <>
        <p className="text-xl text-gray-900 font-medium mb-8 leading-relaxed">
          Banjir bandang adalah salah satu pembunuh paling sunyi. Berbeda dengan banjir biasa yang naik perlahan, banjir bandang seringkali datang layaknya dinding air raksasa berkecepatan tinggi.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Tanda-Tanda Peringatan Alam (Early Warning)</h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
          Jika Anda tinggal di dekat aliran sungai, tebing, atau dataran rendah, kenali ketiga sinyal peringatan alam ini sebelum terlambat:
        </p>
        <ul className="list-disc pl-6 mb-8 space-y-3 text-gray-700">
          <li><strong>Air Berubah Keruh/Coklat:</strong> Jika sungai yang jernih tiba-tiba berubah menjadi pekat berlumpur dalam hitungan menit, ini adalah tanda pasti tanah longsor sedang terjadi di hulu.</li>
          <li><strong>Debit Naik Mendadak:</strong> Volume air sungai yang melimpah meski di kampung Anda hanya mendung membuktikan curah hujan ekstrem memukul hulu.</li>
          <li><strong>Suara Gemuruh:</strong> Banjir bandang membawa gelondongan kayu dan batu raksasa. Jika Anda mendengar suara gemuruh berat menyerupai kereta api, berlari ke tempat tinggi sekarang juga!</li>
        </ul>

        <div className="bg-red-50 p-6 border-l-4 border-triage-critical rounded-r-lg my-8">
          <p className="font-bold text-gray-900 mb-2">Peringatan Penting</p>
          <p className="text-gray-700">Jangan tunggu air menyentuh kaki Anda! Begitu tanda-tanda ini muncul, segera laporkan ke Telegram <code>@SiapBencanaBot</code> sembari menyelamatkan diri Anda dan keluarga terdekat.</p>
        </div>
      </>
    )
  }
};

export default async function DynamicArticlePage({ params }: { params: { slug: string } }) {
  // Await params resolving due to Next.js constraints if this was true dynamic routing,
  // but since we simulate dynamic segments we access directly (params is a promise in Next 15+ but synchronous access is deprecated)
  // We'll safely access it:
  const { slug } = await params;
  const article = mockArticles[slug as keyof typeof mockArticles];

  if (!article) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen pt-12 pb-24 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-brand-primary font-bold hover:text-brand-accent transition-colors mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" /> Kembali ke Pusat Edukasi
        </Link>

        <div className="mb-10">
          <span className="bg-brand-primary text-white text-xs font-bold px-3 py-1.5 rounded-sm uppercase tracking-widest shadow-sm">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 mt-6 mb-6 leading-tight tracking-tight">
            {article.title}
          </h1>
          <div className="flex items-center text-gray-500 text-sm gap-6 font-medium">
            <span className="flex items-center gap-2"><CalendarDays className="w-4 h-4" /> {article.date}</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {article.readTime}</span>
          </div>
        </div>

        <div className="w-full">
          <img src={article.image} alt={article.title} className="w-full h-[300px] md:h-[450px] object-cover rounded-2xl mb-12 shadow-sm" />

          <div className="prose prose-lg prose-blue max-w-none mb-16">
            {article.content}
          </div>

          <div className="bg-bg-base border border-gray-200 p-8 rounded-2xl mt-12 text-center shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 tracking-tight">Kesiapsiagaan Dimulai Hari Ini!</h3>
            <p className="mb-8 text-gray-600 max-w-md mx-auto leading-relaxed">
              Anda telah membaca panduannya, sekarang praktikkan komitmennya. Daftarkan alamat Anda sebelum bencana tiba.
            </p>
            <Link href="/register" className="inline-block bg-brand-accent text-white font-bold py-4 px-10 rounded-sm hover:brightness-110 transition-all shadow-md hover:-translate-y-0.5">
              Daftarkan Rumah Saya Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
