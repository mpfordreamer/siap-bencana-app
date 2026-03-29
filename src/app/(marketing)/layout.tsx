import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logoSvg from "@/assets/siapbencana.svg";
import { ChatbotWidget } from "@/components/ui/ChatbotWidget";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* Unified Main Header */}
      <header className="border-b border-gray-200 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col lg:flex-row items-center justify-between gap-6">

          {/* Custom SVG Logo & Title */}
          <Link href="/" className="hover:opacity-90 transition-opacity flex-shrink-0 flex items-center gap-3">
            <Image
              src={logoSvg}
              alt="Logo Siap Bencana"
              className="h-10 w-auto object-contain"
              priority
            />
            <span className="text-xl font-bold tracking-tight text-brand-primary hidden sm:block">SIAP BENCANA</span>
          </Link>

          {/* Search Bar */}
          <div className="flex w-full lg:w-max shadow-sm border border-gray-300 rounded-sm overflow-hidden mt-4 lg:mt-0">
            <div className="relative flex-grow flex items-center px-4 bg-white">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Cari informasi darurat..."
                className="w-full lg:w-64 py-2.5 px-3 outline-none text-sm font-medium text-gray-900 placeholder:text-gray-400 bg-transparent"
              />
            </div>
            <button className="bg-brand-accent hover:brightness-110 transition-colors text-white px-6 py-2.5 font-bold text-sm tracking-wide shrink-0">
              Cari
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col">
        {children}
      </main>

      {/* Unified Main Footer */}
      <footer className="bg-brand-primary text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center p-2.5 shadow-lg border border-white/20">
                  <Image
                    src={logoSvg}
                    alt="Logo Siap Bencana"
                    className="h-full w-full object-contain"
                    priority
                  />
                </div>
                <span className="text-2xl font-bold tracking-tight">SIAP BENCANA</span>
              </div>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-sm">
                Sistem Triase Bencana Berbasis AI untuk memberikan bantuan paling tepat sasaran dan cepat saat Anda berada dalam bahaya kritis.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 text-gray-100">Akses Cepat</h3>
              <ul className="space-y-4 text-gray-300 text-sm">
                <li><Link href="/" className="hover:text-white transition-colors">Beranda Utama</Link></li>
                <li><Link href="/register" className="hover:text-white transition-colors">Pendaftaran Warga</Link></li>
                <li><Link href="/dashboard" className="hover:text-triage-info transition-colors font-medium">Command Center ➡️</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 text-gray-100">Kontak Darurat</h3>
              <ul className="space-y-4 text-gray-300 text-sm">
                <li className="flex flex-col">
                  <span className="font-semibold text-white mb-1">Telegram Siaga:</span>
                  <a href="#" className="hover:text-triage-info transition-colors">@SiapBencanaBot</a>
                </li>
                <li className="flex flex-col">
                  <span className="font-semibold text-white mb-1">SMS Gateway:</span>
                  <a href="tel:+62811" className="hover:text-triage-info transition-colors">+62 811-XXXX-XXXX</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-16 pt-8 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
            <p>&copy; {new Date().getFullYear()} SIAP BENCANA. Hak Cipta Dilindungi.</p>
            <div className="flex gap-6">
              <span className="hover:text-white cursor-pointer transition-colors">Kebijakan Privasi</span>
              <span className="hover:text-white cursor-pointer transition-colors">Syarat & Ketentuan</span>
            </div>
          </div>
        </div>
      </footer>

      <ChatbotWidget />
    </div>
  );
}
