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
      system: `Anda adalah Asisten AI "Siap Bencana". Jawablah dengan ramah, ringkas (maksimal 2-3 kalimat), dan bahasa Indonesia standar. Tugas Anda adalah:
1. Membantu warga terkait mitigasi bencana, P3K darurat, dan cara evakuasi.
2. Membimbing warga jika mereka mencoba simulasi pelaporan darurat.
Selalu bersikap menenangkan dan utamakan keselamatan nyawa.`,
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
