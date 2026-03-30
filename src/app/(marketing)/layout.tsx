import { Search, ShieldCheck } from "lucide-react";
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
      {/* Optimized Sticky Header */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">

          {/* Logo Section */}
          <Link href="/" className="hover:opacity-90 transition-opacity flex items-center gap-2.5">
            <div className="w-9 h-9 bg-brand-primary rounded-lg flex items-center justify-center p-1.5 shadow-md">
              <Image
                src={logoSvg}
                alt="Logo Siap Bencana"
                className="h-full w-full object-contain brightness-0 invert"
                priority
              />
            </div>
            <span className="text-lg font-black tracking-tighter text-brand-primary">SIAP BENCANA</span>
          </Link>

          {/* Action Section */}
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="group flex items-center gap-2 bg-orange-600 hover:bg-orange-700 transition-all text-white px-4 md:px-7 py-2.5 rounded-full font-black text-[11px] md:text-xs tracking-widest shadow-lg hover:shadow-orange-200 border-b-2 border-black/20"
            >
              <ShieldCheck className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
              <span className="inline-block">DASHBOARD <span className="hidden sm:inline">ADMIN</span></span>
            </Link>
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
                <li><Link href="/dashboard" className="hover:text-triage-info transition-colors font-medium">Admin Panel</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 text-gray-100">Kontak Darurat</h3>
              <ul className="space-y-4 text-gray-300 text-sm">
                <li className="flex flex-col">
                  <span className="font-semibold text-white mb-1">SMS Gateway:</span>
                  <a href="tel:+6285183071646" className="hover:text-triage-info transition-colors">+62 851-8307-1646</a>
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
