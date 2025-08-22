"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdBannerProps {
  onUpgrade?: () => void
}

export function AdBanner({ onUpgrade }: AdBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-muted border-t border-border">
      <div className="flex items-center justify-between px-4 py-3 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 flex-1">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">Breakko</span> - Keep your status updated
          </div>
          <div className="hidden md:block text-xs text-muted-foreground">Simple. Clean. Effective.</div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onUpgrade}
            className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors duration-200 bg-transparent"
          >
            Remove Ads - $2/month
          </Button>
	  {/*<Button
            variant="ghost"
            size="icon"
            onClick={() => setIsVisible(false)}
            className="h-6 w-6 hover:bg-accent hover:text-accent-foreground"
          >
            <X className="h-3 w-3" />
          </Button> */}
        </div>
      </div>
    </div>
  )
}
