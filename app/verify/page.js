'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { Upload, CheckCircle, ArrowLeft } from 'lucide-react'

export default function VerifyPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    university: '',
    studentId: '',
    studentCard: null,
  })
  const [errors, setErrors] = useState({})

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, studentCard: file }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    const newErrors = {}
    if (!formData.university) newErrors.university = 'Nama universitas harus diisi'
    if (!formData.studentId) newErrors.studentId = 'NIM harus diisi'
    if (!formData.studentCard) newErrors.studentCard = 'Kartu mahasiswa harus diunggah'
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    // TODO: Implement actual verification API call
    setStep(2)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="text-center" padding="lg">
            <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-success-600" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-3">Verifikasi Dikirim!</h1>
            <p className="text-neutral-600 mb-6">
              Dokumen Anda sedang dalam proses verifikasi. Kami akan mengirimkan email 
              konfirmasi dalam 1-2 hari kerja.
            </p>
            <Button onClick={() => router.push('/complete-profile')} className="w-full" size="lg">
              Lengkapi Profil
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Back button */}
        <Link href="/register" className="inline-flex items-center gap-2 text-neutral-600 hover:text-primary-600 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Link>

        {/* Verification Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-xl mb-4">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              Verifikasi Status Mahasiswa
            </h1>
            <p className="text-neutral-600">
              Untuk memastikan kredibilitas platform, kami perlu memverifikasi status mahasiswa Anda
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Nama Universitas"
              type="text"
              name="university"
              value={formData.university}
              onChange={handleChange}
              error={errors.university}
              placeholder="Contoh: Universitas Indonesia"
              required
            />

            <Input
              label="Nomor Induk Mahasiswa (NIM)"
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              error={errors.studentId}
              placeholder="Masukkan NIM Anda"
              required
            />

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Upload Kartu Mahasiswa / Surat Keterangan
                <span className="text-danger-500 ml-1">*</span>
              </label>
              <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
                <input
                  type="file"
                  id="studentCard"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="studentCard" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                  <p className="text-neutral-600 mb-1">
                    {formData.studentCard ? (
                      <span className="text-primary-600 font-medium">
                        {formData.studentCard.name}
                      </span>
                    ) : (
                      <>
                        <span className="text-primary-600 font-medium">Klik untuk upload</span>
                        {' '}atau drag and drop
                      </>
                    )}
                  </p>
                  <p className="text-sm text-neutral-500">PNG, JPG, atau PDF (Max. 5MB)</p>
                </label>
              </div>
              {errors.studentCard && (
                <p className="mt-1 text-sm text-danger-500">{errors.studentCard}</p>
              )}
            </div>

            {/* Info Box */}
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <p className="text-sm text-primary-800">
                <strong>Tips:</strong> Pastikan foto kartu mahasiswa jelas dan tidak blur. 
                Informasi yang terlihat: Nama, NIM, Foto, dan Universitas.
              </p>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Kirim Verifikasi
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

