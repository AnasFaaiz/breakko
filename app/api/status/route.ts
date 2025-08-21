import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
import { executeQuery } from "@/lib/database"
import { z } from "zod"

const statusSchema = z.object({
  status_text: z.string().min(1, "Status text is required").max(500, "Status text too long"),
  is_custom: z.boolean().default(true),
})

// Save user status
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 })
    }

    const body = await request.json()
    const { status_text, is_custom } = statusSchema.parse(body)

    // Save status to database
    const result = await executeQuery("INSERT INTO user_statuses (user_id, status_text, is_custom) VALUES (?, ?, ?)", [
      decoded.userId,
      status_text,
      is_custom,
    ])

    return NextResponse.json({
      message: "Status saved successfully",
      status_id: (result as any).insertId,
    })
  } catch (error) {
    console.error("Save status error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Get user status history
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    // Get user's status history
    const statuses = await executeQuery(
      "SELECT id, status_text, is_custom, created_at FROM user_statuses WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [decoded.userId, limit, offset],
    )

    return NextResponse.json({
      statuses,
      pagination: {
        limit,
        offset,
        has_more: (statuses as any[]).length === limit,
      },
    })
  } catch (error) {
    console.error("Get status history error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
