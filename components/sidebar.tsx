"use client"

import type React from "react"
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  presetStatuses: string[]
  onStatusSelect: (status: string) => void
  customStatus: string
  onCustomStatusChange: (status: string) => void
  onCustomSubmit: (e: React.FormEvent) => void
}

export function Sidebar({
  isOpen,
  onClose,
  presetStatuses,
  onStatusSelect,
  customStatus,
  onCustomStatusChange,
  onCustomSubmit,
}: SidebarProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-all duration-500 ease-in-out ${
          isOpen ? "opacity-100 backdrop-blur-sm" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        style={{
          transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-card border-l border-border z-50 transform transition-all duration-500 ease-in-out shadow-2xl ${
          isOpen ? "translate-x-0 scale-100" : "translate-x-full scale-95"
        }`}
        style={{
          transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h3
              className="text-xl font-bold font-sans transition-all duration-300 hover:scale-105"
              style={{
                transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              Status Options
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-110 hover:rotate-90"
              style={{
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <X className="h-5 w-5 transition-transform duration-300" />
            </Button>
          </div>

          {/* Preset Statuses */}
          <div className="space-y-4 mb-8">
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Quick Options</h4>
            {presetStatuses.map((status, index) => (
              <button
                key={index}
                onClick={() => onStatusSelect(status)}
                className="block w-full text-left text-base font-medium font-sans py-3 px-4 hover:bg-accent hover:text-accent-foreground rounded-md transition-all duration-300 cursor-pointer hover:scale-105 hover:translate-x-2"
                style={{
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                {status}
              </button>
            ))}
          </div>

	  <div>
  	    <Link href="/login">
    		<Button variant="ghost" className="w-full">Login</Button>
  	    </Link>
  	    <Link href="/register">
    		<Button variant="default" className="w-full mt-2">Register</Button>
  	    </Link>
	  </div>

          {/* Custom Status */}
          <div className="mt-auto">
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">Custom Status</h4>
            <form onSubmit={onCustomSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Enter your custom status..."
                value={customStatus}
                onChange={(e) => onCustomStatusChange(e.target.value)}
                className="w-full transition-all duration-300 focus:scale-105"
                style={{
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg"
                disabled={!customStatus.trim()}
                style={{
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                Set Status
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
