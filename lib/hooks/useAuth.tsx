"use client"
import { useState, useEffect, createContext, useContext, ReactNode } from "react"

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (email:string, password:string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  saveStatus: (statusText: string, isCustom?: boolean) => Promise<{ success: boolean; error?: string; statusId?: number }>
  trackAnalytics: (eventType: string, sessionId?: string) => Promise<void>
  refreshAuth: () => Promise<void>
}

 const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuthHook();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface User {
  id: number
  email: string
  is_premium: boolean
  premium_expires_at: Date | null
  created_at: Date
}

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

 function useAuthHook() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/api/auth/me")

      if (response.ok) {
        const data = await response.json()
        setAuthState({
          user: data.user,
          loading: false,
          error: null,
        })
      } else {
        setAuthState({
          user: null,
          loading: false,
          error: null,
        })
      }
    } catch (error) {
      setAuthState({
        user: null,
        loading: false,
        error: "Failed to check authentication status",
      })
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }))

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setAuthState({
          user: data.user,
          loading: false,
          error: null,
        })
        return { success: true }
      } else {
        setAuthState((prev) => ({
          ...prev,
          loading: false,
          error: data.error || "Login failed",
        }))
        return { success: false, error: data.error }
      }
    } catch (error) {
      const errorMessage = "Network error during login"
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }))
      return { success: false, error: errorMessage }
    }
  }

  const register = async (email: string, password: string) => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }))

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
	setAuthState({
	  user: data.user,
	  loading: false,
	  error: null,
	})
	return { success: true }
      } else {
        setAuthState((prev) => ({
          ...prev,
          loading: false,
          error: data.error || "Registration failed",
        }))
        return { success: false, error: data.error }
      }
    } catch (error) {
      const errorMessage = "Network error during registration"
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }))
      return { success: false, error: errorMessage }
    }
  }

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      })

      setAuthState({
        user: null,
        loading: false,
        error: null,
      })
    } catch (error) {
      console.error("Logout error:", error)
      // Still clear the local state even if the API call fails
      setAuthState({
        user: null,
        loading: false,
        error: null,
      })
    }
  }

  const saveStatus = async (statusText: string, isCustom = true) => {
    try {
      const response = await fetch("/api/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status_text: statusText,
          is_custom: isCustom,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        return { success: true, statusId: data.status_id }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      return { success: false, error: "Failed to save status" }
    }
  }

  const trackAnalytics = async (eventType: string, sessionId?: string) => {
    try {

      const body = {
	event_type: eventType,
	session_id: sessionId,
      };

      await fetch("/api/analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
	body: JSON.stringify(body || {}),
      })
    } catch (error) {
      console.error("Analytics tracking error:", error)
    }
  }

  return {
    ...authState,
    login,
    register,
    logout,
    saveStatus,
    trackAnalytics,
    refreshAuth: checkAuthStatus,
  }
}
