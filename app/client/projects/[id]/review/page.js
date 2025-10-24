'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ClientDashboardLayout from '@/components/layout/ClientDashboardLayout'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import { Download, Star, CheckCircle, XCircle, FileText, Image as ImageIcon } from 'lucide-react'

export default function ReviewWorkPage({ params }) {
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [review, setReview] = useState('')
  const [decision, setDecision] = useState(null) // 'approve' or 'revise'
  const [revisionNotes, setRevisionNotes] = useState('')

  // Mock project data
  const project = {
    id: params.id,
    title: 'Redesign Website Company Profile',
    freelancer: {
      name: 'Ahmad Hidayat',
      avatar: 'AH',
      university: 'Universitas Indonesia',
    },
    submittedAt: '2025-10-23',
    budget: 'Rp 5.000.000',
  }

  // Mock deliverables
  const deliverables = [
    {
      id: 1,
      name: 'Homepage_Design_Final.fig',
      type: 'design',
      size: '12.5 MB',
      uploadedAt: '2025-10-23 14:30',
    },
    {
      id: 2,
      name: 'About_Page_Mockup.fig',
      type: 'design',
      size: '8.2 MB',
      uploadedAt: '2025-10-23 14:32',
    },
    {
      id: 3,
      name: 'Contact_Page.fig',
      type: 'design',
      size: '5.8 MB',
      uploadedAt: '2025-10-23 14:35',
    },
    {
      id: 4,
      name: 'Design_System.pdf',
      type: 'document',
      size: '2.1 MB',
      uploadedAt: '2025-10-23 14:40',
    },
    {
      id: 5,
      name: 'Preview_Screenshots.zip',
      type: 'archive',
      size: '45.3 MB',
      uploadedAt: '2025-10-23 14:45',
    },
  ]

  const freelancerNotes = 'Saya telah menyelesaikan semua halaman sesuai dengan brief yang diberikan. Design menggunakan style modern dengan color scheme yang telah disetujui sebelumnya. Semua file source dalam format Figma dan saya juga lampirkan preview dalam bentuk PDF dan screenshots. Silakan review dan berikan feedback jika ada yang perlu diperbaiki.'

  const handleSubmitReview = () => {
    if (decision === 'approve') {
      if (rating === 0) {
        alert('Silakan berikan rating terlebih dahulu')
        return
      }
      if (!review.trim()) {
        alert('Silakan tulis review Anda')
        return
      }
      // TODO: Submit approval with rating to API
      console.log('Approving with rating:', rating, 'Review:', review)
      router.push('/client/projects?completed=true')
    } else if (decision === 'revise') {
      if (!revisionNotes.trim()) {
        alert('Silakan jelaskan revisi yang dibutuhkan')
        return
      }
      // TODO: Submit revision request to API
      console.log('Requesting revision:', revisionNotes)
      router.push('/client/projects')
    }
  }

  const getFileIcon = (type) => {
    switch (type) {
      case 'design':
        return <ImageIcon className="w-6 h-6 text-primary-600" />
      case 'document':
        return <FileText className="w-6 h-6 text-danger-600" />
      case 'archive':
        return <FileText className="w-6 h-6 text-warning-600" />
      default:
        return <FileText className="w-6 h-6 text-neutral-600" />
    }
  }

  return (
    <ClientDashboardLayout 
      title="Review Hasil Kerja" 
      subtitle={project.title}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Project & Freelancer Info */}
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">{project.title}</h2>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {project.freelancer.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">{project.freelancer.name}</p>
                    <p className="text-neutral-500">{project.freelancer.university}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-neutral-600 mb-1">Budget</p>
              <p className="text-xl font-bold text-primary-600">{project.budget}</p>
            </div>
          </div>
        </Card>

        {/* Freelancer Notes */}
        <Card>
          <h3 className="font-semibold text-neutral-900 mb-3">Catatan dari Freelancer</h3>
          <div className="p-4 bg-neutral-50 rounded-lg">
            <p className="text-neutral-700 leading-relaxed">{freelancerNotes}</p>
          </div>
          <p className="text-sm text-neutral-500 mt-2">
            Dikirim pada {new Date(project.submittedAt).toLocaleDateString('id-ID', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </Card>

        {/* Deliverables */}
        <Card>
          <h3 className="font-semibold text-neutral-900 mb-4">File yang Dikirim ({deliverables.length})</h3>
          <div className="space-y-2">
            {deliverables.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {getFileIcon(file.type)}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-neutral-900 truncate">{file.name}</p>
                    <p className="text-sm text-neutral-500">{file.size} • {file.uploadedAt}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-primary-50 border border-primary-200 rounded-lg">
            <p className="text-sm text-primary-800">
              💡 <strong>Tips:</strong> Download dan review semua file dengan teliti sebelum memberikan keputusan.
            </p>
          </div>
        </Card>

        {/* Decision Section */}
        {!decision ? (
          <Card>
            <h3 className="font-semibold text-neutral-900 mb-4">Keputusan Anda</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => setDecision('approve')}
                className="p-6 border-2 border-success-600 rounded-lg hover:bg-success-50 transition-colors text-left"
              >
                <CheckCircle className="w-8 h-8 text-success-600 mb-3" />
                <h4 className="font-semibold text-neutral-900 mb-2">Terima & Approve</h4>
                <p className="text-sm text-neutral-600">
                  Hasil kerja sesuai harapan. Proyek akan selesai dan pembayaran diproses.
                </p>
              </button>

              <button
                onClick={() => setDecision('revise')}
                className="p-6 border-2 border-warning-600 rounded-lg hover:bg-warning-50 transition-colors text-left"
              >
                <XCircle className="w-8 h-8 text-warning-600 mb-3" />
                <h4 className="font-semibold text-neutral-900 mb-2">Minta Revisi</h4>
                <p className="text-sm text-neutral-600">
                  Ada yang perlu diperbaiki. Freelancer akan melakukan revisi.
                </p>
              </button>
            </div>
          </Card>
        ) : decision === 'approve' ? (
          /* Approve Form */
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-neutral-900">Approve & Beri Rating</h3>
              <Button variant="ghost" size="sm" onClick={() => setDecision(null)}>
                Ubah Keputusan
              </Button>
            </div>

            {/* Rating */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-3">
                Rating <span className="text-danger-500">*</span>
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        star <= (hoveredRating || rating)
                          ? 'fill-warning-500 text-warning-500'
                          : 'text-neutral-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm text-neutral-600 mt-2">
                {rating === 0 && 'Klik bintang untuk memberikan rating'}
                {rating === 1 && '⭐ Buruk'}
                {rating === 2 && '⭐⭐ Kurang Memuaskan'}
                {rating === 3 && '⭐⭐⭐ Cukup Baik'}
                {rating === 4 && '⭐⭐⭐⭐ Sangat Baik'}
                {rating === 5 && '⭐⭐⭐⭐⭐ Luar Biasa!'}
              </p>
            </div>

            {/* Review */}
            <Textarea
              label="Review & Feedback"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={5}
              placeholder="Bagikan pengalaman Anda bekerja dengan freelancer ini. Review yang baik akan membantu freelancer mendapatkan proyek di masa depan."
              helperText="Minimal 50 karakter"
              required
            />

            <div className="bg-success-50 border border-success-200 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-success-900 mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Yang Akan Terjadi Setelah Approve:
              </h4>
              <ul className="text-sm text-success-800 space-y-1">
                <li>• Proyek akan ditandai sebagai selesai</li>
                <li>• Pembayaran {project.budget} akan diproses ke freelancer</li>
                <li>• Review Anda akan terlihat di profil freelancer</li>
                <li>• Anda dapat kembali hire freelancer ini untuk proyek lain</li>
              </ul>
            </div>

            <div className="flex gap-4 mt-6">
              <Button variant="ghost" className="flex-1" onClick={() => setDecision(null)}>
                Batal
              </Button>
              <Button className="flex-1" onClick={handleSubmitReview}>
                Approve & Selesaikan Proyek
              </Button>
            </div>
          </Card>
        ) : (
          /* Revision Form */
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-neutral-900">Request Revisi</h3>
              <Button variant="ghost" size="sm" onClick={() => setDecision(null)}>
                Ubah Keputusan
              </Button>
            </div>

            <Textarea
              label="Jelaskan Revisi yang Dibutuhkan"
              value={revisionNotes}
              onChange={(e) => setRevisionNotes(e.target.value)}
              rows={6}
              placeholder="Jelaskan dengan detail apa yang perlu diperbaiki atau diubah. Semakin jelas penjelasan Anda, semakin mudah freelancer memahami dan melakukan revisi."
              helperText="Berikan penjelasan yang spesifik dan konstruktif"
              required
            />

            <div className="bg-warning-50 border border-warning-200 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-warning-900 mb-2">Catatan Penting:</h4>
              <ul className="text-sm text-warning-800 space-y-1">
                <li>• Freelancer akan menerima notifikasi request revisi</li>
                <li>• Anda dapat melakukan maksimal 3x revisi sesuai kesepakatan</li>
                <li>• Berikan feedback yang jelas agar revisi lebih efektif</li>
                <li>• Timeline proyek akan diperpanjang sesuai kebutuhan revisi</li>
              </ul>
            </div>

            <div className="flex gap-4 mt-6">
              <Button variant="ghost" className="flex-1" onClick={() => setDecision(null)}>
                Batal
              </Button>
              <Button variant="warning" className="flex-1" onClick={handleSubmitReview}>
                Kirim Request Revisi
              </Button>
            </div>
          </Card>
        )}
      </div>
    </ClientDashboardLayout>
  )
}

