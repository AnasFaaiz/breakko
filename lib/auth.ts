import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { query } from "./database"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
if(!JWT_SECRET) {
  throw new Error("FATAL ERROR: JWT_SECRET environment variable is not defined.")
}

export interface User {
  id: number
  email: string
  password_hash: string
  is_premium: boolean
  premium_expires_at: Date | null
  created_at: Date
  updated_at: Date
}

export async function generateToken(userId: number): Promise<string> {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" })
}

export async function verifyToken(token: string): Promise<{ userId: number } | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number }
    return decoded
  } catch (error) {
    return null
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createUser(email: string, password: string): Promise<User> {
  const hashedPassword = await hashPassword(password);

  // CHANGED: Use $1, $2 and RETURNING *
  const sql = 'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *';
  const users = await query(sql, [email, hashedPassword]);
  return users[0]; // Return the newly created user
}

export async function getUserByEmail(email: string): Promise<User | null> {
  // CHANGED: Use $1 instead of ?
  const users = (await query("SELECT * FROM users WHERE email = $1", [email])) as User[]
  return users.length > 0 ? users[0] : null
}

export async function getUserById(id: number): Promise<User> {
  // CHANGED: Use $1 instead of ?
  const users = (await query("SELECT * FROM users WHERE id = $1", [id])) as User[]
  if (users.length === 0) {
    throw new Error("User not found")
  }
  return users[0]
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = await getUserByEmail(email)
  if (!user) {
    return null
  }

  const isValidPassword = await comparePassword(password, user.password_hash)
  if (!isValidPassword) {
    return null
  }

  return user
}

export async function updateUserPremiumStatus(userId: number, isPremium: boolean, expiresAt?: Date): Promise<void> {
  await query(
    "UPDATE users SET is_premium = $1, premium_expires_at = $2, updated_at = NOW() WHERE id = $3",
    [isPremium, expiresAt || null, userId]
  )
}

export async function checkPremiumStatus(userId: number): Promise<boolean> {
  const user = await getUserById(userId)

  if (!user.is_premium) {
    return false
  }

  if (user.premium_expires_at && new Date() > user.premium_expires_at) {
    // Premium expired, update user status
    await updateUserPremiumStatus(userId, false)
    return false
  }

  return true
}
