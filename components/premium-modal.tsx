"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Check, Coffee, Crown } from "lucide-react"

interface PremiumModalProps {
  isOpen: boolean
  onClose: () => void
  onUpgrade: () => void
}

export function PremiumModal({ isOpen, onClose, onUpgrade }: PremiumModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleUpgrade = async () => {
    setIsLoading(true)
    try {
      await onUpgrade()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-primary" />
            Upgrade to Premium
          </DialogTitle>
          <DialogDescription>Remove ads and support Breakko development</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Premium Features */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Premium Benefits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Ad-free experience</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Support development</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Priority support</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Early access to new features</span>
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <div className="text-center space-y-4">
            <div className="text-3xl font-bold">
              $2<span className="text-lg font-normal text-muted-foreground">/month</span>
            </div>
            <p className="text-sm text-muted-foreground">Cancel anytime. No long-term commitment.</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleUpgrade}
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isLoading ? "Processing..." : "Upgrade to Premium"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">or</span>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => window.open("https://buymeacoffee.com/breakko", "_blank")}
              className="w-full"
            >
              <Coffee className="h-4 w-4 mr-2" />
              Buy Me a Coffee
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
