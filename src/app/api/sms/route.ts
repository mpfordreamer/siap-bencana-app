import { performAITriage } from '@/lib/triage';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // This endpoint acts as a webhook for automatic Android SMS forwarders
    // Expects JSON: { from: string, text: string }
    const { from, text } = await req.json();

    if (!from || !text) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

    // Process using the shared AI engine
    const result = await performAITriage(text, from, 'SMS');

    return NextResponse.json({ 
      success: true, 
      received: true,
      processed_as_emergency: result.success 
    });
  } catch (error) {
    console.error('SMS Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
