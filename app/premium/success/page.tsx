"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Crown } from "lucide-react"
import Link from "next/link"

export default function PremiumSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    if (sessionId) {
      // In a real app, you might want to verify the session with your backend
      setIsVerified(true)
    }
  }, [sessionId])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="flex items-center justify-center gap-2">
            <Crown className="h-5 w-5 text-primary" />
            Welcome to Premium!
          </CardTitle>
          <CardDescription>Your subscription has been activated successfully</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">Ad-free experience activated</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">Premium features unlocked</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">Priority support enabled</span>
            </div>
          </div>

          <div className="pt-4">
            <Link href="/">
              <Button className="w-full">Start Using Breakko Premium</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
