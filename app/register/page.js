'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'
import { authApi } from '@/lib/api'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'mahasiswa', // mahasiswa or klien (backend format!)
    jenis_kelamin: 'L', // L or P
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    const newErrors = {}
    if (!formData.fullName) newErrors.fullName = 'Nama lengkap harus diisi'
    if (!formData.email) newErrors.email = 'Email harus diisi'
    if (!formData.password) newErrors.password = 'Password harus diisi'
    if (formData.password.length < 8) newErrors.password = 'Password minimal 8 karakter'
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok'
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'Anda harus menyetujui syarat dan ketentuan'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    // Register with API (sesuai format backend)
    setLoading(true)
    try {
      const response = await authApi.register({
        role: formData.role,  // "mahasiswa" atau "klien"
        fullName: formData.fullName,
        jenis_kelamin: formData.jenis_kelamin,  // "L" atau "P"
        email: formData.email,
        password: formData.password
      })
      
      // Store token and user data
      if (response.token) {
        localStorage.setItem('token', response.token)
      }
      
      // Backend returns roles_id (1=mahasiswa, 2=klien), map to role string
      const userData = response.user || response
      if (userData && userData.roles_id) {
        userData.role = userData.roles_id === 2 ? 'klien' : 'mahasiswa'
      }
      
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData))
      }
      
      // Redirect based on form data role (we know what user selected)
      if (formData.role === 'klien') {
        router.push('/client/dashboard')
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      setErrors({ api: error.message || 'Registrasi gagal. Silakan coba lagi.' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }))
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

        {/* Register Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-xl mb-4">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Daftar Akun</h1>
            <p className="text-neutral-600">Mulai perjalanan freelance Anda</p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-3">
                Daftar Sebagai <span className="text-danger-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'mahasiswa' }))}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    formData.role === 'mahasiswa'
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-neutral-300 hover:border-neutral-400'
                  }`}
                >
                  <div className="text-center">
                    <div className={`text-3xl mb-2 ${formData.role === 'mahasiswa' ? '' : 'grayscale'}`}>🎓</div>
                    <div className={`font-semibold ${formData.role === 'mahasiswa' ? 'text-primary-600' : 'text-neutral-700'}`}>
                      Mahasiswa
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">Cari proyek & kerja</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'klien' }))}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    formData.role === 'klien'
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-neutral-300 hover:border-neutral-400'
                  }`}
                >
                  <div className="text-center">
                    <div className={`text-3xl mb-2 ${formData.role === 'klien' ? '' : 'grayscale'}`}>💼</div>
                    <div className={`font-semibold ${formData.role === 'klien' ? 'text-primary-600' : 'text-neutral-700'}`}>
                      Klien
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">Post proyek & hire</div>
                  </div>
                </button>
              </div>
            </div>

            <Input
              label="Nama Lengkap"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              placeholder="Masukkan nama lengkap"
              required
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="nama@email.com"
              helperText={formData.role === 'mahasiswa' ? 'Gunakan email mahasiswa @student.unsika.ac.id' : 'Email aktif Anda'}
              required
            />

            {/* Gender Selection */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-3">
                Jenis Kelamin <span className="text-danger-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, jenis_kelamin: 'L' }))}
                  className={`p-3 border-2 rounded-lg transition-all ${
                    formData.jenis_kelamin === 'L'
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-neutral-300 hover:border-neutral-400'
                  }`}
                >
                  <div className={`font-medium ${formData.jenis_kelamin === 'L' ? 'text-primary-600' : 'text-neutral-700'}`}>
                    👨 Laki-laki
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, jenis_kelamin: 'P' }))}
                  className={`p-3 border-2 rounded-lg transition-all ${
                    formData.jenis_kelamin === 'P'
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-neutral-300 hover:border-neutral-400'
                  }`}
                >
                  <div className={`font-medium ${formData.jenis_kelamin === 'P' ? 'text-primary-600' : 'text-neutral-700'}`}>
                    👩 Perempuan
                  </div>
                </button>
              </div>
            </div>

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="Minimal 8 karakter"
              helperText="Gunakan kombinasi huruf, angka, dan simbol"
              required
            />

            <Input
              label="Konfirmasi Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="Masukkan password lagi"
              required
            />

            <div>
              <label className="flex items-start gap-2">
                <input 
                  type="checkbox" 
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mt-1 rounded border-neutral-300 text-primary-600 focus:ring-primary-500" 
                />
                <span className="text-sm text-neutral-600">
                  Saya menyetujui{' '}
                  <Link href="/terms" className="text-primary-600 hover:underline font-medium">
                    Syarat & Ketentuan
                  </Link>
                  {' '}dan{' '}
                  <Link href="/privacy" className="text-primary-600 hover:underline font-medium">
                    Kebijakan Privasi
                  </Link>
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="mt-1 text-sm text-danger-500">{errors.agreeToTerms}</p>
              )}
            </div>

            {errors.api && (
              <div className="p-4 bg-danger-50 border border-danger-200 rounded-lg">
                <p className="text-sm text-danger-800">{errors.api}</p>
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? 'Mendaftar...' : 'Daftar Sekarang'}
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

          {/* Login Link */}
          <div className="text-center">
            <p className="text-neutral-600">
              Sudah punya akun?{' '}
              <Link href="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
                Masuk
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

