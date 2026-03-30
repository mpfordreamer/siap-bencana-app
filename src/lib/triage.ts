import { createClient } from '@supabase/supabase-js';

// Menggunakan Service Role Key khusus untuk menembus pertahanan Row Level Security (RLS) di level Backend
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
);

// Shared function to parse disaster reports using Groq AI
// This is used by both Chatbot and SMS systems
export async function performAITriage(rawMessage: string, senderId: string, platform: 'WEB' | 'SMS', coords?: { lat: number, lon: number }) {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: `Anda adalah Emergency NER Engine. Korban bencana sering mengetik sangat padat dan singkat karena panik (contoh: "tolong banjir di gatot").
Tugas: Kembalikan JSON murni dengan format berikut:
{
  "is_emergency": boolean, // WAJIB true jika ada indikasi bahaya, kata "tolong", atau nama bencana.
  "disaster_type": string, // Tebak spesifik (contoh: "Banjir").
  "location_name": string, // Ekstrak jalan/kota. Kosongkan "" jika tidak ada.
  "urgency": "CRITICAL" | "HIGH" | "INFO", // Wajib CRITICAL jika pengguna mengemis pertolongan ("tolong").
  "vulnerable_people": boolean
}`
          },
          { role: 'user', content: rawMessage }
        ]
      })
    });

    const result = await response.json();
    const parsed = JSON.parse(result.choices[0].message.content);

    if (parsed.is_emergency) {
      // If we don't have GPS coords, try to use Geocoding based on location_name
      let latitude = coords?.lat || -6.9147; // Default Bandung
      let longitude = coords?.lon || 107.6098;

      if (!coords && parsed.location_name) {
        try {
          const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(parsed.location_name)}, Indonesia&format=json&limit=1`, {
            headers: {
              'User-Agent': 'SiapBencana/1.0 (IDCamp Project)'
            }
          });
          const geoData = await geoRes.json();
          if (geoData.length > 0) {
            latitude = parseFloat(geoData[0].lat);
            longitude = parseFloat(geoData[0].lon);
          }
        } catch (e) { console.error("Geocoding failed", e); }
      }

      // Insert into Supabase using backend Admin Client
      const { error } = await supabaseAdmin.from('emergency_reports').insert({
        source_platform: platform,
        sender_id: senderId,
        raw_message: rawMessage,
        extracted_location: parsed.location_name || "Lokasi tidak terdeteksi",
        latitude,
        longitude,
        disaster_type: parsed.disaster_type || "Bencana Umum",
        urgency_level: parsed.urgency,
        vulnerable_people: parsed.vulnerable_people,
        status: 'PENDING'
      });

      if (error) console.error("Database insert error:", error);
      return { success: true, triage: parsed };
    }

    return { success: false, triage: parsed };
  } catch (err) {
    console.error("AI Triage Error:", err);
    return { success: false, error: err };
  }
}
