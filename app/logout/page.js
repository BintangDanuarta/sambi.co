'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Card from '@/components/ui/Card'
import { LogOut } from 'lucide-react'

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // Clear authentication
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    // Redirect to login after 2 seconds
    const timeout = setTimeout(() => {
      router.push('/login')
    }, 2000)

    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <Card className="text-center max-w-md w-full">
        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <LogOut className="w-10 h-10 text-primary-600" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-3">Berhasil Keluar</h1>
        <p className="text-neutral-600 mb-6">
          Anda telah keluar dari akun Sambi.co. Terima kasih telah menggunakan layanan kami!
        </p>
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
        <p className="text-sm text-neutral-500 mt-4">Mengalihkan ke halaman login...</p>
      </Card>
    </div>
  )
}

