'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Mail, Lock, ArrowLeft } from 'lucide-react'
import { authApi } from '@/lib/api'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Basic validation
    const newErrors = {}
    if (!formData.email) newErrors.email = 'Email harus diisi'
    if (!formData.password) newErrors.password = 'Password harus diisi'
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    // Login with API
    setLoading(true)
    try {
      const response = await authApi.login({
        email: formData.email,
        password: formData.password
      })
      
      // Store token and user data
      if (response.token) {
        localStorage.setItem('token', response.token)
      }
      
      // Backend might return user directly or in nested object
      const userData = response.user || response
      
      // Map roles_id to role string (backend uses roles_id: 1=mahasiswa, 2=klien)
      if (userData && userData.roles_id) {
        userData.role = userData.roles_id === 2 ? 'klien' : 'mahasiswa'
      }
      
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData))
      }
      
      // Redirect based on role
      const userRole = userData?.role || (userData?.roles_id === 2 ? 'klien' : 'mahasiswa')
      
      if (userRole === 'klien') {
        router.push('/client/dashboard')
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      setErrors({ api: error.message || 'Login gagal. Periksa email dan password Anda.' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to home */}
        <Link href="/" className="inline-flex items-center gap-2 text-neutral-600 hover:text-primary-600 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke beranda
        </Link>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-xl mb-4">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Selamat Datang</h1>
            <p className="text-neutral-600">Masuk ke akun Sambi.co Anda</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="nama@email.com"
                required
              />
            </div>

            <div>
              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="Masukkan password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
                <span className="ml-2 text-sm text-neutral-600">Ingat saya</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                Lupa password?
              </Link>
            </div>

            {errors.api && (
              <div className="p-4 bg-danger-50 border border-danger-200 rounded-lg">
                <p className="text-sm text-danger-800">{errors.api}</p>
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? 'Masuk...' : 'Masuk'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-neutral-500">atau</span>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-neutral-600">
              Belum punya akun?{' '}
              <Link href="/register" className="text-primary-600 hover:text-primary-700 font-semibold">
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <p className="text-center text-sm text-neutral-500 mt-6">
          Dengan masuk, Anda menyetujui{' '}
          <Link href="/terms" className="text-primary-600 hover:underline">Syarat & Ketentuan</Link>
          {' '}dan{' '}
          <Link href="/privacy" className="text-primary-600 hover:underline">Kebijakan Privasi</Link>
        </p>
      </div>
    </div>
  )
}

