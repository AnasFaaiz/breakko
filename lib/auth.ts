import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { query } from "./database"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export interface User {
  id: number
  email: string
  password: string
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
  const hashedPassword = await hashPassword(password)

  const result = await query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword])

  const userId = (result as any).insertId
  return getUserById(userId)
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const users = (await query("SELECT * FROM users WHERE email = ?", [email])) as User[]
  return users.length > 0 ? users[0] : null
}

export async function getUserById(id: number): Promise<User> {
  const users = (await query("SELECT * FROM users WHERE id = ?", [id])) as User[]
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

  const isValidPassword = await comparePassword(password, user.password)
  if (!isValidPassword) {
    return null
  }

  return user
}

export async function updateUserPremiumStatus(userId: number, isPremium: boolean, expiresAt?: Date): Promise<void> {
  await query("UPDATE users SET is_premium = ?, premium_expires_at = ?, updated_at = NOW() WHERE id = ?", [
    isPremium,
    expiresAt || null,
    userId,
  ])
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
