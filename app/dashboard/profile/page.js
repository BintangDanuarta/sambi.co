'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit, 
  Star,
  Award,
  Briefcase,
  Upload
} from 'lucide-react'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: 'Mahasiswa Demo',
    email: 'mahasiswa@demo.com',
    phone: '+62 812 3456 7890',
    university: 'Universitas Indonesia',
    major: 'Teknik Informatika',
    semester: '6',
    bio: 'Saya adalah mahasiswa Teknik Informatika dengan passion di bidang UI/UX Design dan Web Development. Memiliki pengalaman 2 tahun dalam freelancing dan telah menyelesaikan 12 proyek dengan rating rata-rata 4.8.',
    skills: 'UI/UX Design, Figma, React.js, Next.js, Tailwind CSS',
    portfolio: 'https://portfolio.demo.com',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // TODO: Implement save profile API
    setIsEditing(false)
  }

  const stats = [
    { label: 'Proyek Selesai', value: '12', icon: Briefcase },
    { label: 'Rating', value: '4.8', icon: Star },
    { label: 'Success Rate', value: '95%', icon: Award },
  ]

  const portfolio = [
    {
      id: 1,
      title: 'E-Commerce Landing Page',
      image: '/placeholder.jpg',
      category: 'UI/UX Design',
    },
    {
      id: 2,
      title: 'Mobile Banking App',
      image: '/placeholder.jpg',
      category: 'UI/UX Design',
    },
    {
      id: 3,
      title: 'Dashboard Analytics',
      image: '/placeholder.jpg',
      category: 'Development',
    },
  ]

  const reviews = [
    {
      id: 1,
      client: 'PT Digital Indonesia',
      rating: 5,
      comment: 'Sangat profesional dan hasil kerja memuaskan. Komunikasi lancar dan deadline tepat waktu.',
      date: '2025-10-15',
      project: 'Redesign Landing Page',
    },
    {
      id: 2,
      client: 'Startup FinTech',
      rating: 5,
      comment: 'Designer yang sangat talented! Memahami kebutuhan dengan baik dan memberikan solusi kreatif.',
      date: '2025-09-20',
      project: 'Mobile App Design',
    },
    {
      id: 3,
      client: 'CV Media Online',
      rating: 4,
      comment: 'Pekerjaan bagus, sedikit revisi tapi overall hasilnya memuaskan.',
      date: '2025-08-10',
      project: 'Content Writing',
    },
  ]

  return (
    <DashboardLayout title="Profil" subtitle="Kelola informasi profil Anda">
      <div className="space-y-6">
        {/* Header Card with Stats */}
        <Card>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-32 h-32 bg-primary-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  MD
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary-600 hover:bg-primary-50 transition-colors">
                    <Upload className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-1">
                    {formData.fullName}
                  </h2>
                  <p className="text-neutral-600">{formData.university}</p>
                  <p className="text-sm text-neutral-500">{formData.major} - Semester {formData.semester}</p>
                </div>
                <Button 
                  variant={isEditing ? 'primary' : 'outline'}
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? 'Simpan' : 'Edit Profil'}
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <div key={index} className="text-center p-4 bg-neutral-50 rounded-lg">
                      <Icon className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                      <p className="text-sm text-neutral-600">{stat.label}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Informasi Pribadi
              </h3>
              
              <div className="space-y-4">
                {isEditing ? (
                  <>
                    <Input
                      label="Nama Lengkap"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <Input
                        label="Nomor Telepon"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <Input
                      label="Universitas"
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                    />
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        label="Program Studi"
                        name="major"
                        value={formData.major}
                        onChange={handleChange}
                      />
                      <Select
                        label="Semester"
                        name="semester"
                        value={formData.semester}
                        onChange={handleChange}
                        options={Array.from({ length: 14 }, (_, i) => ({
                          value: String(i + 1),
                          label: `Semester ${i + 1}`,
                        }))}
                      />
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-neutral-600">
                      <Mail className="w-5 h-5 text-neutral-400" />
                      <span>{formData.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-neutral-600">
                      <Phone className="w-5 h-5 text-neutral-400" />
                      <span>{formData.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-neutral-600">
                      <MapPin className="w-5 h-5 text-neutral-400" />
                      <span>{formData.university}</span>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Bio */}
            <Card>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Tentang Saya
              </h3>
              {isEditing ? (
                <Textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Ceritakan tentang diri Anda..."
                />
              ) : (
                <p className="text-neutral-600 leading-relaxed">{formData.bio}</p>
              )}
            </Card>

            {/* Skills */}
            <Card>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Keahlian
              </h3>
              {isEditing ? (
                <Textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Pisahkan dengan koma"
                  helperText="Contoh: UI/UX Design, React.js, Figma"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {formData.skills.split(',').map((skill, index) => (
                    <Badge key={index} variant="primary">
                      {skill.trim()}
                    </Badge>
                  ))}
                </div>
              )}
            </Card>

            {/* Reviews */}
            <Card>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Review dari Klien
              </h3>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="pb-4 border-b border-neutral-200 last:border-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-neutral-900">{review.client}</p>
                        <p className="text-sm text-neutral-500">{review.project}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'fill-warning-500 text-warning-500' : 'text-neutral-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-neutral-600 text-sm mb-2">{review.comment}</p>
                    <p className="text-xs text-neutral-500">
                      {new Date(review.date).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Portfolio Link */}
            <Card>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Portfolio
              </h3>
              {isEditing ? (
                <Input
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              ) : (
                <a 
                  href={formData.portfolio} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline break-all"
                >
                  {formData.portfolio}
                </a>
              )}
            </Card>

            {/* Verification Status */}
            <Card>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Status Verifikasi
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">Email</span>
                  <Badge variant="success">✓ Terverifikasi</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">Mahasiswa</span>
                  <Badge variant="success">✓ Terverifikasi</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">Nomor HP</span>
                  <Badge variant="success">✓ Terverifikasi</Badge>
                </div>
              </div>
            </Card>

            {/* Account Stats */}
            <Card>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Statistik Akun
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Member sejak</span>
                  <span className="font-medium">Jan 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Response rate</span>
                  <span className="font-medium">98%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">On-time delivery</span>
                  <span className="font-medium">95%</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

