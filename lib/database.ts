import mysql from "mysql2/promise"

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: true,
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}

// Create connection pool
const pool = mysql.createPool(dbConfig)

export async function query(sql: string, params: any[] = []): Promise<any> {
  try {
    const [results] = await pool.execute(sql, params)
    return results
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}


// Helper function to close the pool (useful for cleanup)
export async function closePool(): Promise<void> {
  await pool.end()
}

// Test database connection
export async function testConnection(): Promise<boolean> {
  try {
    const connection = await pool.getConnection()
    await connection.ping()
    connection.release()
    return true
  } catch (error) {
    console.error("Database connection test failed:", error)
    return false
  }
}
