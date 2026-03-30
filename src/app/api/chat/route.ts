import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Konfigurasi koneksi ke Groq API menggunakan AI SDK
const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: groq('llama-3.1-8b-instant'),
      system: `Anda adalah Operator Triage Darurat (911 Dispatcher) "Siap Bencana" Tim SAR. Gaya respons: Sangat Ringkas, Sigap, dan Tanpa Basa-Basi Artikel.
1. Jika pengguna melaporkan kondisi darurat terkini, SEGERA nyatakan bahwa "Laporan lokasi [lokasi] DITERIMA dan termonitor di Pusat Komando".
2. JANGAN pernah memberikan daftar poin (bullet points) instruksi P3K yang panjang. Korban dalam bahaya tidak ada waktu membaca paragraf panjang.
3. Cukup fokus beri 1-2 instruksi krusial (misal: "Segera naik ke tempat tinggi") dan tanya 1 status genting secara singkat (contoh: "Berapa tinggi air sekarang?").`,
      messages,
      temperature: 0.7,
      onFinish: async (event) => {
        // Run AI Triage in the background after the chat finishes
        // We use the last user message as the raw input
        const lastUserMessage = messages[messages.length - 1]?.content;
        if (lastUserMessage) {
          const { performAITriage } = await import('@/lib/triage');
          await performAITriage(lastUserMessage, 'WEB_USER', 'WEB');
        }
      }
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error connecting to Groq:', error);
    return new Response(JSON.stringify({ error: 'Terjadi kesalahan sistem.' }), { status: 500 });
  }
}
