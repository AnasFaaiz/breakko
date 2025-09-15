// app/register/page.tsx

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const { register, loading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null) // Clear previous errors

    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }

    const result = await register(email, password)

    if (result.success) {
      // On successful registration and login, redirect to the main page
      router.push("/")
    } else {
      // Display the error from the backend (e.g., "User already exists")
      setError(result.error || "An unknown error occurred.")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
		disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password">Password</label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
		disabled={loading}
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </CardContent>
	<CardFooter className="text-center text-sm">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
