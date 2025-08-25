"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, Sun, Moon, Maximize2, Minimize2, Coffee } from "lucide-react"
import { useTheme } from "next-themes"
import { Sidebar } from "@/components/sidebar"
import { AdBanner } from "@/components/ad-banner"
import { PremiumModal } from "@/components/premium-modal"
import { useAuth } from "@/lib/hooks/useAuth"

const presetStatuses = [
  "On a short break 🔄",
  "Having lunch 🍽️",
  "In a call 📞",
  "Focusing on work 🎯",
  "In a meeting 💼",
]

export default function HomePage() {
  const [selectedStatus, setSelectedStatus] = useState("")
  const [customStatus, setCustomStatus] = useState("")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [showSidebar, setShowSidebar] = useState(false)
  const [showPremiumModal, setShowPremiumModal] = useState(false)
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { user, saveStatus, trackAnalytics } = useAuth()

  useEffect(() => {
    setMounted(true)
    if (theme === "system") {
      setTheme("dark")
    }
    trackAnalytics("page_view")
  }, [theme, setTheme, trackAnalytics])

  const handleStatusSelect = async (status: string) => {
    setIsTransitioning(true)

    await trackAnalytics("status_set")

    if (user) {
      await saveStatus(status, !presetStatuses.includes(status))
    }

    setTimeout(() => {
      setSelectedStatus(status)
      setCustomStatus("")
      setShowSidebar(false)
      setIsTransitioning(false)

      if (hideTimeout) clearTimeout(hideTimeout)
      const timeout = setTimeout(() => {
        setShowControls(false)
      }, 3000)
      setHideTimeout(timeout)
    }, 150)
  }

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (customStatus.trim()) {
      await handleStatusSelect(customStatus.trim())
    }
  }

  const handleMouseMove = () => {
    if (selectedStatus) {
      setShowControls(true)
      if (hideTimeout) clearTimeout(hideTimeout)
      const timeout = setTimeout(() => {
        setShowControls(false)
      }, 3000)
      setHideTimeout(timeout)
    }
  }

  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        await document.documentElement.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
      await trackAnalytics("fullscreen_toggle")
    } catch (error) {
      console.log("Fullscreen not supported or denied")
    }
  }

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    await trackAnalytics("theme_change")
  }

  const clearStatus = () => {
    setIsTransitioning(true)

    setTimeout(() => {
      setSelectedStatus("")
      setShowControls(true)
      setIsTransitioning(false)
      if (hideTimeout) clearTimeout(hideTimeout)
    }, 150)
  }

  const handleUpgrade = async () => {
    try {
      const response = await fetch("/api/payment/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
        }),
      })

      const data = await response.json()

      if (response.ok && data.url) {
        window.location.href = data.url
      } else {
        console.error("Failed to create checkout session:", data.error)
      }
    } catch (error) {
      console.error("Upgrade error:", error)
    }
  }

  // Check if user is premium (no ads)
  const isPremium =
    user?.is_premium &&
    user?.premium_expires_at &&
    new Date(user.premium_expires_at) > new Date()

  if (!mounted) return null

  return (
    <div
      className="min-h-screen bg-background text-foreground transition-all duration-700 ease-in-out relative overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{
        transition:
          "background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1), color 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        paddingBottom: !isPremium ? "60px" : "0",
      }}
    >
      {/* Sidebar */}
      <Sidebar
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        presetStatuses={presetStatuses}
        onStatusSelect={handleStatusSelect}
        customStatus={customStatus}
        onCustomStatusChange={setCustomStatus}
        onCustomSubmit={handleCustomSubmit}
      />

      {/* Header Controls */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-1000 ease-in-out ${
          selectedStatus && !showControls
            ? "opacity-0 pointer-events-none transform -translate-y-6 scale-95"
            : "opacity-100 transform translate-y-0 scale-100"
        }`}
        style={{
          transition:
            "opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="flex items-center justify-between p-6">
          <h1
            className="text-2xl font-black font-sans tracking-tight transition-all duration-500 hover:scale-105"
            style={{
              transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            Breakko
          </h1>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-110 hover:rotate-12"
              style={{
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5 transition-transform duration-300" />
              ) : (
                <Sun className="h-5 w-5 transition-transform duration-300" />
              )}
            </Button>
            {selectedStatus && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                className="hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-110"
                style={{
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {isFullscreen ? (
                  <>
                    {/*Simple. Clean. Effective. */}
                    <Minimize2 className="h-5 w-5 transition-transform duration-300" />
                  </>
                ) : (
                  <Maximize2 className="h-5 w-5 transition-transform duration-300" />
                )}
              </Button>
            )}

            {/* --- MODIFIED: Buy Me A Coffee Button --- */}
            <a
              href="https://www.buymeacoffee.com/your-username" // IMPORTANT: Replace with your actual link
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Buy Me A Coffee"
            >
              <Button
                variant="outline"
                className="h-9 px-3 rounded-full border-amber-500/40 bg-amber-50 text-amber-800 hover:bg-amber-100 hover:border-amber-500/60 dark:bg-amber-900/50 dark:text-amber-300 dark:border-amber-700/60 dark:hover:bg-amber-900/80 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Coffee className="h-4 w-4" />
                <span className="ml-2 text-sm font-medium">Buy Coffee</span>
              </Button>
            </a>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSidebar(true)}
              className="hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-110"
              style={{
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <Menu className="h-5 w-5 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-6">
        {!selectedStatus ? (
          <div
            className={`w-full max-w-lg space-y-12 text-center transition-all duration-700 ease-out ${
              isTransitioning
                ? "opacity-0 scale-95 transform translate-y-4"
                : "opacity-100 scale-100 transform translate-y-0"
            }`}
            style={{
              transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <h2
              className="text-4xl font-black font-sans mb-16 tracking-tight transition-all duration-500 hover:scale-105"
              style={{
                transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              What's your current status?
            </h2>

            {/* Preset Status Options - Clean lines without boxes */}
            <div className="space-y-6">
              {presetStatuses.map((status, index) => (
                <button
                  key={index}
                  onClick={() => handleStatusSelect(status)}
                  className="relative block w-full text-xl font-medium font-sans py-4 px-6 text-center hover:text-primary hover:scale-105 transition-all duration-400 ease-out cursor-pointer border-none bg-transparent after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:origin-center after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-400 after:ease-out"
                  style={{
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Custom Status Input */}
            <div
              className="mt-16 pt-8 border-t border-border/30 transition-all duration-500"
              style={{
                transition:
                  "border-color 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <form onSubmit={handleCustomSubmit} className="space-y-6">
                <Input
                  type="text"
                  placeholder="Write your custom status..."
                  value={customStatus}
                  onChange={(e) => setCustomStatus(e.target.value)}
                  className="text-center text-lg py-4 px-6 bg-card border-border/50 focus:border-primary transition-all duration-300 focus:scale-105"
                  style={{
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  disabled={!customStatus.trim()}
                  style={{
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  Set Custom Status
                </Button>
              </form>
            </div>
          </div>
        ) : (
          <div
            className={`text-center transition-all duration-1000 ease-out ${
              isTransitioning
                ? "opacity-0 scale-90 transform translate-y-8"
                : "opacity-100 scale-100 transform translate-y-0"
            }`}
            style={{
              transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <h1
              className="text-5xl md:text-7xl lg:text-9xl font-black font-sans leading-tight tracking-tight px-4 transition-all duration-700 hover:scale-105"
              style={{
                transition:
                  "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), font-size 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {selectedStatus}
            </h1>
            <Button
              variant="ghost"
              onClick={clearStatus}
              className={`mt-12 text-muted-foreground hover:text-foreground transition-all duration-500 hover:scale-110 ${
                showControls
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-4"
              }`}
              style={{
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              Change Status
            </Button>
          </div>
        )}
      </div>

      {/* Ad Banner for non-premium users */}
      {!isPremium && <AdBanner onUpgrade={() => setShowPremiumModal(true)} />}

      {/* Premium Upgrade Modal */}
      <PremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        onUpgrade={handleUpgrade}
      />
    </div>
  )
}
