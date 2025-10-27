'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authApi } from '@/lib/api'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }

    // Try to load user from localStorage first (faster)
    const cachedUser = localStorage.getItem('user')
    if (cachedUser) {
      try {
        setUser(JSON.parse(cachedUser))
      } catch (e) {
        console.error('Failed to parse cached user:', e)
      }
    }

    try {
      // Fetch fresh user data from API
      const data = await authApi.me()
      const userData = data.user || data
      
      // Map roles_id to role string (backend uses roles_id: 1=mahasiswa, 2=klien)
      if (userData && userData.roles_id) {
        userData.role = userData.roles_id === 2 ? 'klien' : 'mahasiswa'
      }
      
      setUser(userData)
      // Update localStorage with fresh data
      localStorage.setItem('user', JSON.stringify(userData))
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    try {
      const response = await authApi.login(credentials)
      localStorage.setItem('token', response.token)
      
      const userData = response.user || response
      // Map roles_id to role string
      if (userData && userData.roles_id) {
        userData.role = userData.roles_id === 2 ? 'klien' : 'mahasiswa'
      }
      
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      
      // Redirect based on role
      if (userData?.role === 'klien' || userData?.roles_id === 2) {
        router.push('/client/dashboard')
      } else {
        router.push('/dashboard')
      }
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const register = async (userData) => {
    try {
      const response = await authApi.register(userData)
      localStorage.setItem('token', response.token)
      
      const userDataResponse = response.user || response
      // Map roles_id to role string
      if (userDataResponse && userDataResponse.roles_id) {
        userDataResponse.role = userDataResponse.roles_id === 2 ? 'klien' : 'mahasiswa'
      }
      
      localStorage.setItem('user', JSON.stringify(userDataResponse))
      setUser(userDataResponse)
      
      // Redirect based on role
      if (userDataResponse?.role === 'klien' || userDataResponse?.roles_id === 2) {
        router.push('/client/dashboard')
      } else {
        router.push('/dashboard')
      }
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setUser(null)
      router.push('/login')
    }
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

