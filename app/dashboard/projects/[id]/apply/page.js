'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Badge from '@/components/ui/Badge'
import { Upload, X, FileText, Loader } from 'lucide-react'
import { projectsApi } from '@/lib/api'

export default function ApplyProjectPage({ params }) {
  const router = useRouter()
  const [projectId, setProjectId] = useState(null)
  const [project, setProject] = useState(null)
  const [proposalData, setProposalData] = useState({
    coverLetter: '',
    estimatedTime: '',
    budget: '',
    attachments: [],
  })
  const [loading, setLoading] = useState(false)
  const [loadingProject, setLoadingProject] = useState(true)
  const [error, setError] = useState('')

  // Load params and project data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoadingProject(true)
        const resolvedParams = await params
        setProjectId(resolvedParams.id)
        
        // Fetch project from API
        const projectData = await projectsApi.getById(resolvedParams.id)
        setProject(projectData)
      } catch (error) {
        console.error('Failed to load project:', error)
        setError('Gagal memuat data proyek')
      } finally {
        setLoadingProject(false)
      }
    }
    
    loadData()
  }, [params])

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setProposalData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }))
  }

  const removeFile = (index) => {
    setProposalData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }))
  }

  const handleSubmitProposal = async (e) => {
    e.preventDefault()
    
    if (!projectId) {
      setError('Project ID tidak ditemukan')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      // Submit proposal directly (no payment needed for students)
      await projectsApi.apply(projectId, {
        proposal: proposalData.coverLetter,
        estimatedTime: proposalData.estimatedTime,
        budget: proposalData.budget,
      })
      
      // Success - redirect to projects with success message
      router.push('/dashboard/projects?applied=true')
    } catch (error) {
      setError(error.message || 'Gagal mengirim proposal. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  if (loadingProject) {
    return (
      <DashboardLayout title="Apply Proyek" subtitle="Memuat data proyek...">
        <div className="flex justify-center items-center py-12">
          <Loader className="w-8 h-8 animate-spin text-primary-600" />
        </div>
      </DashboardLayout>
    )
  }

  if (!project) {
    return (
      <DashboardLayout title="Apply Proyek" subtitle="Proyek tidak ditemukan">
        <Card className="text-center py-12">
          <p className="text-neutral-600 mb-4">{error || 'Proyek tidak ditemukan'}</p>
          <Button variant="outline" onClick={() => router.push('/dashboard/projects/browse')}>
            Kembali ke Browse Projects
          </Button>
        </Card>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Apply Proyek" subtitle="Kirim proposal Anda untuk proyek ini">
      <div className="max-w-4xl mx-auto">
        {/* Project Info Card */}
        <Card className="mb-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            {project.title || project.nama_project || 'Untitled Project'}
          </h2>
          <div className="flex items-center gap-4 text-sm">
            {project.client && <Badge variant="neutral">{project.client}</Badge>}
            {(project.budget || project.budget_min) && (
              <span className="text-neutral-600">
                Budget: {project.budget || 
                  (project.budget_min && project.budget_max 
                    ? `Rp ${project.budget_min.toLocaleString('id-ID')} - Rp ${project.budget_max.toLocaleString('id-ID')}`
                    : project.budget_min 
                    ? `Rp ${project.budget_min.toLocaleString('id-ID')}`
                    : 'Belum ditentukan'
                  )
                }
              </span>
            )}
          </div>
        </Card>

        {/* Proposal Form */}
        <Card>
          <form onSubmit={handleSubmitProposal} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Proposal Anda</h3>
              <Textarea
                label="Cover Letter"
                placeholder="Jelaskan mengapa Anda cocok untuk proyek ini, pengalaman relevan, dan pendekatan yang akan Anda gunakan..."
                rows={8}
                value={proposalData.coverLetter}
                onChange={(e) => setProposalData(prev => ({ ...prev, coverLetter: e.target.value }))}
                helperText="Minimal 100 karakter"
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Estimasi Waktu (hari)"
                type="number"
                placeholder="Contoh: 30"
                value={proposalData.estimatedTime}
                onChange={(e) => setProposalData(prev => ({ ...prev, estimatedTime: e.target.value }))}
                required
              />
              <Input
                label="Budget yang Diajukan (Rp)"
                type="number"
                placeholder="Contoh: 2500000"
                value={proposalData.budget}
                onChange={(e) => setProposalData(prev => ({ ...prev, budget: e.target.value }))}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Lampiran (Opsional)
              </label>
              <div className="flex items-center justify-center w-full">
                <label 
                  htmlFor="dropzone-file" 
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-neutral-300 border-dashed rounded-lg cursor-pointer bg-neutral-50 hover:bg-neutral-100 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-3 text-neutral-400" />
                    <p className="mb-2 text-sm text-neutral-500">
                      <span className="font-semibold">Klik untuk upload</span> atau drag and drop
                    </p>
                    <p className="text-xs text-neutral-500">PDF, DOCX, ZIP (MAX. 5MB)</p>
                  </div>
                  <input 
                    id="dropzone-file" 
                    type="file" 
                    className="hidden" 
                    multiple 
                    onChange={handleFileChange} 
                  />
                </label>
              </div>

              {proposalData.attachments.length > 0 && (
                <div className="mt-4 space-y-2">
                  {proposalData.attachments.map((file, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 bg-neutral-100 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-neutral-400" />
                        <span className="text-sm font-medium text-neutral-700">{file.name}</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => removeFile(index)} 
                        className="text-neutral-500 hover:text-danger-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {error && (
              <div className="p-4 bg-danger-50 border border-danger-200 rounded-lg">
                <p className="text-sm text-danger-800">{error}</p>
              </div>
            )}

            <div className="flex gap-4">
              <Button 
                type="button"
                variant="outline" 
                className="flex-1"
                onClick={() => router.push('/dashboard/projects/browse')}
                disabled={loading}
              >
                Batal
              </Button>
              <Button 
                type="submit" 
                className="flex-1" 
                disabled={loading}
              >
                {loading ? 'Mengirim...' : 'Kirim Proposal'}
              </Button>
            </div>
          </form>
        </Card>

        {/* Info Box */}
        <Card className="mt-6 bg-primary-50 border-primary-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl">💡</span>
            </div>
            <div>
              <h4 className="font-semibold text-primary-900 mb-2">Tips Apply Proyek</h4>
              <ul className="space-y-1 text-sm text-primary-800">
                <li>• Jelaskan pengalaman dan skill yang relevan</li>
                <li>• Sebutkan project portfolio yang mirip</li>
                <li>• Berikan estimasi waktu yang realistis</li>
                <li>• Ajukan budget yang kompetitif</li>
                <li>• <strong>Gratis! Tidak ada biaya untuk apply</strong></li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
