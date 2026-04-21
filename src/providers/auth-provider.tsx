"use client"

import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { useAuthStore } from '@/lib/auth-store'
import { authService } from '@/lib/auth-service'
import type { UserOut } from '@/lib/types'

interface AuthContextType {
  user: UserOut | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (username: string, password: string) => Promise<void>
  register: (email: string, password: string, username?: string) => Promise<void>
  logout: () => Promise<void>
  setError: (error: string | null) => void
}

const AuthContext = createContext<AuthContextType>(undefined!)

export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login: setLogin,
    logout: setLogout,
    setUser,
    setToken,
    setLoading,
    setError,
  } = useAuthStore()

  useEffect(() => {
    const initAuth = async () => {
      if (token && !user) {
        try {
          setLoading(true)
          const userData = await authService.getMe()
          setUser(userData)
        } catch (error) {
          console.error('Failed to fetch user:', error)
          setToken(null)
          setUser(null)
        } finally {
          setLoading(false)
        }
      }
    }

    initAuth()
  }, [token, user, setUser, setToken, setLoading])

  const login = async (username: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const { token: newToken, user: newUser } = await authService.login(username, password)
      setToken(newToken.access_token)
      setUser(newUser)
      if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', newToken.access_token)
        localStorage.setItem('user', JSON.stringify(newUser))
      }
    } catch (error: any) {
      const message = error.response?.data?.detail || 'Login failed'
      setError(message.toString())
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, password: string, username?: string) => {
    setLoading(true)
    setError(null)
    try {
      const userData = { email, password } as any
      if (username) userData.username = username
      const { token: newToken, user: newUser } = await authService.register(userData)
      setToken(newToken.access_token)
      setUser(newUser)
      if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', newToken.access_token)
        localStorage.setItem('user', JSON.stringify(newUser))
      }
    } catch (error: any) {
      const message = error.response?.data?.detail || 'Registration failed'
      setError(message.toString())
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      await authService.logout()
    } finally {
      setLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    setError,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

