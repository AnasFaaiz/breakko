import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

// const caPath = process.env.SUPABASE_CA_CERT_PATH || path.join(process.cwd(), 'prod-ca-2021.crt');


const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    ca: process.env.SUPABASE_CA_CERT,
  },
});

export async function query(sql: string, params: any[] = []) {
  try {
    const results = await pool.query(sql, params);
    return results.rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export async function testConnection(): Promise<boolean> {
  try {
    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();
    return true;
  } catch (error) {
    console.error("Database connection test failed:", error);
    return false;
  }
}

export async function closePool(): Promise<void> {
  await pool.end();
}
