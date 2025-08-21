import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
import { executeQuery } from "@/lib/database"
import { z } from "zod"

const analyticsSchema = z.object({
  event_type: z.enum(["page_view", "status_set", "theme_change", "fullscreen_toggle"]),
  session_id: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event_type, session_id } = analyticsSchema.parse(body)

    // Get user ID from token if available (optional for analytics)
    const token = request.cookies.get("auth-token")?.value
    let userId = null

    if (token) {
      const decoded = verifyToken(token)
      if (decoded) {
        userId = decoded.userId
      }
    }

    // Get client IP and user agent
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"

    // Save analytics event
    await executeQuery(
      "INSERT INTO site_analytics (event_type, user_id, session_id, ip_address, user_agent) VALUES (?, ?, ?, ?, ?)",
      [event_type, userId, session_id, ip, userAgent],
    )

    return NextResponse.json({
      message: "Analytics event recorded",
    })
  } catch (error) {
    console.error("Analytics error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Get analytics data (admin only)
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
    const days = Number.parseInt(searchParams.get("days") || "7")

    // Get analytics data for the last N days
    const analytics = await executeQuery(
      `SELECT 
        event_type,
        DATE(created_at) as date,
        COUNT(*) as count
      FROM site_analytics 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
      GROUP BY event_type, DATE(created_at)
      ORDER BY date DESC, event_type`,
      [days],
    )

    return NextResponse.json({
      analytics,
      period: `${days} days`,
    })
  } catch (error) {
    console.error("Get analytics error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
