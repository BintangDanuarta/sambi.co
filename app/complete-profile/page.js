'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { Upload } from 'lucide-react'

export default function CompleteProfilePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    phone: '',
    bio: '',
    skills: '',
    major: '',
    semester: '',
    portfolio: '',
    profilePicture: null,
  })
  const [errors, setErrors] = useState({})

  const majorOptions = [
    { value: 'informatika', label: 'Teknik Informatika' },
    { value: 'sistem-informasi', label: 'Sistem Informasi' },
    { value: 'desain', label: 'Desain Grafis' },
    { value: 'manajemen', label: 'Manajemen' },
    { value: 'akuntansi', label: 'Akuntansi' },
    { value: 'hukum', label: 'Hukum' },
    { value: 'lainnya', label: 'Lainnya' },
  ]

  const semesterOptions = Array.from({ length: 14 }, (_, i) => ({
    value: String(i + 1),
    label: `Semester ${i + 1}`,
  }))

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, profilePicture: file }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    const newErrors = {}
    if (!formData.phone) newErrors.phone = 'Nomor telepon harus diisi'
    if (!formData.bio) newErrors.bio = 'Bio harus diisi'
    if (!formData.skills) newErrors.skills = 'Keahlian harus diisi'
    if (!formData.major) newErrors.major = 'Program studi harus dipilih'
    if (!formData.semester) newErrors.semester = 'Semester harus dipilih'
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    // TODO: Implement actual profile creation API call
    router.push('/dashboard')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Profile Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-xl mb-4">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Lengkapi Profil</h1>
            <p className="text-neutral-600">
              Isi informasi profil Anda untuk menarik perhatian klien
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-neutral-600">Kelengkapan Profil</span>
              <span className="font-semibold text-primary-600">30%</span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div className="bg-primary-600 h-2 rounded-full" style={{ width: '30%' }}></div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Foto Profil
              </label>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-neutral-200 flex items-center justify-center overflow-hidden">
                  {formData.profilePicture ? (
                    <img 
                      src={URL.createObjectURL(formData.profilePicture)} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Upload className="w-8 h-8 text-neutral-400" />
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    id="profilePicture"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="profilePicture">
                    <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('profilePicture').click()}>
                      Upload Foto
                    </Button>
                  </label>
                  <p className="text-xs text-neutral-500 mt-2">JPG atau PNG. Max 2MB</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Nomor Telepon"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                placeholder="+62 812 3456 7890"
                required
              />

              <Select
                label="Semester"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                error={errors.semester}
                options={semesterOptions}
                required
              />
            </div>

            <Select
              label="Program Studi"
              name="major"
              value={formData.major}
              onChange={handleChange}
              error={errors.major}
              options={majorOptions}
              required
            />

            <Textarea
              label="Bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              error={errors.bio}
              placeholder="Ceritakan sedikit tentang diri Anda, pengalaman, dan apa yang Anda tawarkan..."
              rows={4}
              helperText="Minimal 50 karakter"
              required
            />

            <Textarea
              label="Keahlian"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              error={errors.skills}
              placeholder="Contoh: UI/UX Design, React.js, Content Writing, Video Editing"
              rows={3}
              helperText="Pisahkan dengan koma"
              required
            />

            <Input
              label="Link Portfolio / Website"
              type="url"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              error={errors.portfolio}
              placeholder="https://portfolio.com"
              helperText="Opsional - tambahkan link portfolio, LinkedIn, atau Behance"
            />

            <div className="flex gap-4">
              <Button 
                type="button" 
                variant="ghost" 
                className="flex-1"
                onClick={() => router.push('/dashboard')}
              >
                Lewati
              </Button>
              <Button type="submit" className="flex-1">
                Simpan & Lanjutkan
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

