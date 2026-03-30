import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Siap Bencana Admin Panel',
    short_name: 'Siap Bencana',
    description: 'Aplikasi Triage Darurat AI & Manajemen Bencana Berbasis Peta',
    start_url: '/',
    display: 'standalone',
    background_color: '#F8FAFC',
    theme_color: '#11409F',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '16x16 32x32 64x64',
        type: 'image/x-icon',
      },
    ],
  };
}
