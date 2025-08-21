"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"
import Link from "next/link"

export default function PremiumCancelPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
            <X className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle>Subscription Cancelled</CardTitle>
          <CardDescription>No worries! You can upgrade to premium anytime.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            You can continue using Breakko with ads, or upgrade to premium later to remove them and support development.
          </p>

          <div className="space-y-2">
            <Link href="/">
              <Button className="w-full">Continue with Free Version</Button>
            </Link>
            <Link href="/?upgrade=true">
              <Button variant="outline" className="w-full bg-transparent">
                Try Premium Again
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
