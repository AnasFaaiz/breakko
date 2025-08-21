import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/database"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature")!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.client_reference_id

        if (userId && session.subscription) {
          // Get subscription details
          const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
          const premiumExpiresAt = new Date(subscription.current_period_end * 1000)

          // Update user premium status
          await executeQuery("UPDATE users SET is_premium = TRUE, premium_expires_at = ? WHERE id = ?", [
            premiumExpiresAt,
            userId,
          ])

          // Record payment transaction
          await executeQuery(
            "INSERT INTO payment_transactions (user_id, amount, currency, status, stripe_payment_intent_id) VALUES (?, ?, ?, ?, ?)",
            [userId, session.amount_total! / 100, session.currency, "completed", session.payment_intent],
          )
        }
        break
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice
        const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)
        const userId = subscription.metadata?.userId

        if (userId) {
          const premiumExpiresAt = new Date(subscription.current_period_end * 1000)

          // Extend premium subscription
          await executeQuery("UPDATE users SET is_premium = TRUE, premium_expires_at = ? WHERE id = ?", [
            premiumExpiresAt,
            userId,
          ])

          // Record payment transaction
          await executeQuery(
            "INSERT INTO payment_transactions (user_id, amount, currency, status, stripe_payment_intent_id) VALUES (?, ?, ?, ?, ?)",
            [userId, invoice.amount_paid / 100, invoice.currency, "completed", invoice.payment_intent],
          )
        }
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata?.userId

        if (userId) {
          // Remove premium status
          await executeQuery("UPDATE users SET is_premium = FALSE, premium_expires_at = NULL WHERE id = ?", [userId])
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
