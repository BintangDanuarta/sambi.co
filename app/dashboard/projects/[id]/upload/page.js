'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import { Upload, X, FileText, Image as ImageIcon, CheckCircle } from 'lucide-react'
import { projectsApi } from '@/lib/api'

export default function UploadResultPage({ params }) {
  const router = useRouter()
  const [projectId, setProjectId] = useState(null)
  const [files, setFiles] = useState([])
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Load params
  useEffect(() => {
    const loadParams = async () => {
      const resolvedParams = await params
      setProjectId(resolvedParams.id)
    }
    loadParams()
  }, [params])

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setFiles(prev => [...prev, ...selectedFiles])
  }

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!projectId) {
      setError('Project ID tidak ditemukan')
      return
    }

    setIsSubmitting(true)
    setError('')
    
    try {
      // Create FormData for file upload
      const formData = new FormData()
      files.forEach((file) => {
        formData.append('files', file)
      })
      formData.append('notes', notes)
      
      // Upload deliverables
      await projectsApi.uploadDeliverables(projectId, formData)
      
      // Success - redirect to project detail
      router.push(`/dashboard/projects/${projectId}`)
    } catch (error) {
      setError(error.message || 'Gagal mengupload file. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase()
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
      return <ImageIcon className="w-6 h-6 text-primary-600" />
    }
    return <FileText className="w-6 h-6 text-primary-600" />
  }

  return (
    <DashboardLayout title="Upload Hasil Proyek">
      <div className="max-w-4xl mx-auto">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Info */}
            <div className="pb-6 border-b border-neutral-200">
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                Redesign Landing Page E-Commerce
              </h2>
              <p className="text-neutral-600">
                Upload hasil pekerjaan Anda untuk proyek ini
              </p>
            </div>

            {/* File Upload Area */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-3">
                Upload File <span className="text-danger-500">*</span>
              </label>
              
              {/* Upload Zone */}
              <div className="border-2 border-dashed border-neutral-300 rounded-xl p-12 text-center hover:border-primary-500 transition-colors">
                <input
                  type="file"
                  id="fileUpload"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.zip,.rar,.jpg,.jpeg,.png,.fig,.psd,.ai"
                />
                <label htmlFor="fileUpload" className="cursor-pointer">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-primary-600" />
                  </div>
                  <p className="text-neutral-900 font-medium mb-2">
                    <span className="text-primary-600">Klik untuk upload</span> atau drag and drop
                  </p>
                  <p className="text-sm text-neutral-500">
                    PDF, DOC, ZIP, JPG, PNG, FIG (Max. 50MB per file)
                  </p>
                </label>
              </div>

              {/* Uploaded Files List */}
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                      <div className="flex items-center gap-3 flex-1">
                        {getFileIcon(file.name)}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-neutral-900 truncate">{file.name}</p>
                          <p className="text-sm text-neutral-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="p-2 text-neutral-400 hover:text-danger-600 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Notes */}
            <Textarea
              label="Catatan untuk Klien"
              placeholder="Tambahkan catatan atau penjelasan terkait file yang Anda upload..."
              rows={5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              helperText="Opsional - jelaskan file yang Anda upload atau hal penting lainnya"
            />

            {/* Guidelines */}
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <h4 className="font-semibold text-primary-900 mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Panduan Upload
              </h4>
              <ul className="space-y-1 text-sm text-primary-800">
                <li>• Pastikan semua file sesuai dengan requirements proyek</li>
                <li>• Gunakan nama file yang jelas dan deskriptif</li>
                <li>• Compress file besar ke dalam format ZIP</li>
                <li>• Tambahkan catatan jika ada file yang perlu penjelasan khusus</li>
                <li>• Klien akan mereview hasil Anda dalam 1-3 hari kerja</li>
              </ul>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-danger-50 border border-danger-200 rounded-lg">
                <p className="text-sm text-danger-800">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-neutral-200">
              <Button
                type="button"
                variant="ghost"
                className="flex-1"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={files.length === 0 || isSubmitting}
              >
                {isSubmitting ? 'Mengupload...' : 'Submit Hasil'}
              </Button>
            </div>
          </form>
        </Card>

        {/* Info Card */}
        <Card className="mt-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-warning-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">💡</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-neutral-900 mb-1">Tips untuk Hasil Terbaik</h4>
              <p className="text-sm text-neutral-600">
                Periksa kembali semua file sebelum submit. Pastikan file dapat dibuka dengan baik 
                dan sesuai dengan spesifikasi yang diminta klien. File yang berkualitas tinggi 
                akan meningkatkan rating dan reputasi Anda di platform.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}

