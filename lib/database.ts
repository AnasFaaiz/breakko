// lib/database.ts

import { Pool } from 'pg';

let pool: Pool;

if (!pool) {
  pool = new Pool({
    connectionString: process.env.POSTGRES_URL, 
    ssl: {
      rejectUnauthorized: false,
    },
  });
}

export async function query(sql: string, params: any[] = []): Promise<any> {
  try {
    const results = await pool.query(sql, params);
    return results.rows; // IMPORTANT: The 'pg' driver returns results in a 'rows' property
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export async function testConnection(): Promise<boolean> {
  try {
    const client = await pool.connect();
    await client.query('SELECT NOW()'); // A simple query to test the connection
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
