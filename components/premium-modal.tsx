"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Check, Coffee, Crown } from "lucide-react"

interface PremiumModalProps {
  isOpen: boolean
  onClose: () => void
  // onUpgrade: () => void
}

export function PremiumModal({ isOpen, onClose }: PremiumModalProps) {
  // const [isLoading, setIsLoading] = useState(false)
  const bmcMembershipLink = "https://buymeacoffee.com/breakko262e/membership"
  // const handleUpgrade = async () => {
  //   setIsLoading(true)
  //   try {
  //     await onUpgrade()
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="flex items-center justify-center gap-2 text-2xl font-bold">
            <Crown className="h-6 w-6 text-primary" />
            Upgrade to Premium
          </DialogTitle>
          <DialogDescription>
            Remove ads and support Breakko by becoming a member.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Premium Features */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Your Membership Includes:</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Ad-free experience</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Directly support development</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Early access to new features</span>
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <div className="text-center">
            <div className="text-3xl font-bold">
              $2<span className="text-lg font-normal text-muted-foreground">/month</span>
            </div>
            <p className="text-sm text-muted-foreground">via Buy Me a Coffee</p>
          </div>

          {/* --- THIS IS THE MAIN CHANGE --- */}
          {/* The entire footer is replaced with a single, clear link */}
          <div className="pt-4">
            <Link href={bmcMembershipLink} target="_blank" rel="noopener noreferrer" className="w-full">
              <Button className="w-full">
                Become a Member
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
