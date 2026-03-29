const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:TiB3TGk69alXLKht@db.aqllypbjcveqdbefegxl.supabase.co:5432/postgres'
});

async function run() {
  await client.connect();
  console.log("Connected to Supabase DB");

  try {
    // Create emergency_reports table
    await client.query(`
      CREATE TABLE IF NOT EXISTS emergency_reports (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        source_platform TEXT NOT NULL,
        sender_id TEXT NOT NULL,
        is_verified BOOLEAN DEFAULT false,
        raw_message TEXT NOT NULL,
        extracted_location TEXT NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL,
        disaster_type TEXT NOT NULL,
        urgency_level TEXT NOT NULL,
        vulnerable_people BOOLEAN DEFAULT false,
        confidence_score FLOAT DEFAULT 1.0,
        status TEXT DEFAULT 'PENDING',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      );
    `);
    console.log("Table emergency_reports created successfully (or already exists).");
    
    // Insert Mock Data MVP required by PRD
    await client.query(`
      INSERT INTO emergency_reports (id, source_platform, sender_id, is_verified, raw_message, extracted_location, latitude, longitude, disaster_type, urgency_level, vulnerable_people, created_at)
      VALUES 
      (gen_random_uuid(), 'TELEGRAM', '+6281234567890', true, 'Tolong air sudah sedada orang dewasa, kakek saya terjebak tidak bisa jalan!', 'Desa Lembang, Bandung Barat', -6.814, 107.618, 'Banjir bandang rumah jebol', 'CRITICAL', true, now() - interval '2 minutes'),
      (gen_random_uuid(), 'SMS', '+6289876543210', true, 'Pohon beringin tumbang menutup jalan utama cipaganti, warung bagian depan hancur', 'Jalan Cipaganti No 12, Bandung', -6.883, 107.594, 'Pohon Tumbang', 'HIGH', false, now() - interval '15 minutes'),
      (gen_random_uuid(), 'TELEGRAM', '+6285554443333', false, 'Air di lapangan sudah mulai surut, jalanan berlumpur tebal tapi warga sudah aman di musala', 'Alun-Alun Lembang', -6.822, 107.620, 'Banjir', 'INFO', false, now() - interval '1 hour')
    `);
    console.log("Mock sample reports inserted successfully.");

  } catch(e) {
    console.log("Transaction warning/error:", e?.message);
  }

  await client.end();
}
run();
