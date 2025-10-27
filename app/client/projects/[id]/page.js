'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ClientDashboardLayout from '@/components/layout/ClientDashboardLayout'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { 
  Calendar, 
  DollarSign, 
  User, 
  Users,
  FileText, 
  Clock,
  MessageCircle,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader,
  Star,
  Mail,
  Phone
} from 'lucide-react'
import { projectsApi } from '@/lib/api'

export default function ClientProjectDetailPage({ params }) {
  const router = useRouter()
  const [projectId, setProjectId] = useState(null)
  const [project, setProject] = useState(null)
  const [proposals, setProposals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedProposal, setSelectedProposal] = useState(null)
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)

  // Load project and proposals
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError('')
        const resolvedParams = await params
        setProjectId(resolvedParams.id)
        
        // Fetch project and proposals in parallel
        const [projectData, proposalsData] = await Promise.all([
          projectsApi.getById(resolvedParams.id).catch(() => null),
          projectsApi.getProposals(resolvedParams.id).catch(() => [])
        ])
        
        setProject(projectData)
        setProposals(Array.isArray(proposalsData) ? proposalsData : [])
      } catch (error) {
        console.error('Failed to load project:', error)
        setError(error.message || 'Gagal memuat data proyek')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [params])

  const handleAcceptProposal = async () => {
    if (!selectedProposal || !projectId) return
    
    setActionLoading(true)
    try {
      await projectsApi.acceptProposal(projectId, selectedProposal.id)
      // Reload data
      const [projectData, proposalsData] = await Promise.all([
        projectsApi.getById(projectId),
        projectsApi.getProposals(projectId)
      ])
      setProject(projectData)
      setProposals(Array.isArray(proposalsData) ? proposalsData : [])
      setIsAcceptModalOpen(false)
      setSelectedProposal(null)
    } catch (error) {
      alert(error.message || 'Gagal menerima proposal')
    } finally {
      setActionLoading(false)
    }
  }

  const handleRejectProposal = async () => {
    if (!selectedProposal || !projectId) return
    
    setActionLoading(true)
    try {
      await projectsApi.rejectProposal(projectId, selectedProposal.id)
      // Reload data
      const proposalsData = await projectsApi.getProposals(projectId)
      setProposals(Array.isArray(proposalsData) ? proposalsData : [])
      setIsRejectModalOpen(false)
      setSelectedProposal(null)
    } catch (error) {
      alert(error.message || 'Gagal menolak proposal')
    } finally {
      setActionLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    const variants = {
      open: { variant: 'primary', label: 'Terbuka' },
      active: { variant: 'warning', label: 'Sedang Berjalan' },
      completed: { variant: 'success', label: 'Selesai' },
      closed: { variant: 'neutral', label: 'Ditutup' },
    }
    return variants[status] || variants.open
  }

  const getProposalStatusBadge = (status) => {
    const variants = {
      pending: { variant: 'warning', label: 'Pending' },
      accepted: { variant: 'success', label: 'Diterima' },
      rejected: { variant: 'danger', label: 'Ditolak' },
    }
    return variants[status] || variants.pending
  }

  const formatCurrency = (amount) => {
    if (!amount) return 'Rp 0'
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  if (loading) {
    return (
      <ClientDashboardLayout title="Detail Proyek" subtitle="Memuat data...">
        <div className="flex justify-center items-center py-12">
          <Loader className="w-8 h-8 animate-spin text-primary-600" />
        </div>
      </ClientDashboardLayout>
    )
  }

  if (error || !project) {
    return (
      <ClientDashboardLayout title="Detail Proyek" subtitle="Error">
        <Card>
          <div className="text-center py-12">
            <AlertCircle className="w-16 h-16 text-danger-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Gagal Memuat Proyek
            </h3>
            <p className="text-neutral-600 mb-4">{error || 'Proyek tidak ditemukan'}</p>
            <Link href="/client/projects">
              <Button>Kembali ke Daftar Proyek</Button>
            </Link>
          </div>
        </Card>
      </ClientDashboardLayout>
    )
  }

  const statusBadge = getStatusBadge(project.status)
  const pendingProposals = proposals.filter(p => p.status === 'pending')
  const acceptedProposals = proposals.filter(p => p.status === 'accepted')

  return (
    <ClientDashboardLayout title="Detail Proyek">
      <div className="space-y-6">
        {/* Header Card */}
        <Card>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 mb-2">
                {project.title || project.nama_project || 'Untitled Project'}
              </h1>
              <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
            </div>
            <div className="flex gap-2">
              <Link href={`/client/projects/${projectId}/edit`}>
                <Button variant="outline">
                  Edit Proyek
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-600">{proposals.length}</p>
              <p className="text-sm text-neutral-600">Total Proposal</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-warning-600">{pendingProposals.length}</p>
              <p className="text-sm text-neutral-600">Menunggu Review</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-success-600">{acceptedProposals.length}</p>
              <p className="text-sm text-neutral-600">Diterima</p>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Project Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">Deskripsi Proyek</h2>
              <p className="text-neutral-600 leading-relaxed whitespace-pre-line">
                {project.description || project.deskripsi || 'Tidak ada deskripsi'}
              </p>
            </Card>

            {/* Proposals List */}
            <Card>
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                Proposal dari Mahasiswa ({proposals.length})
              </h2>
              
              {proposals.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Belum Ada Proposal
                  </h3>
                  <p className="text-neutral-600">
                    Belum ada mahasiswa yang apply untuk proyek ini
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {proposals.map((proposal) => {
                    const proposalBadge = getProposalStatusBadge(proposal.status)
                    return (
                      <div
                        key={proposal.id}
                        className="p-4 border border-neutral-200 rounded-lg hover:border-primary-300 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {proposal.student_name?.substring(0, 2).toUpperCase() || 'ST'}
                            </div>
                            <div>
                              <h4 className="font-semibold text-neutral-900">
                                {proposal.student_name || 'Student Name'}
                              </h4>
                              <div className="flex items-center gap-2 text-sm text-neutral-600">
                                <Star className="w-4 h-4 text-warning-500" />
                                <span>{proposal.student_rating || '5.0'}</span>
                                <span>•</span>
                                <span>{proposal.student_projects_completed || 0} proyek selesai</span>
                              </div>
                            </div>
                          </div>
                          <Badge variant={proposalBadge.variant}>{proposalBadge.label}</Badge>
                        </div>

                        <p className="text-neutral-600 text-sm mb-3 line-clamp-3">
                          {proposal.proposal || proposal.cover_letter || 'Tidak ada cover letter'}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-neutral-600 mb-3">
                          {proposal.estimated_time && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {proposal.estimated_time} hari
                            </span>
                          )}
                          {proposal.budget && (
                            <span className="font-semibold text-primary-600">
                              {formatCurrency(proposal.budget)}
                            </span>
                          )}
                          <span className="text-neutral-500">
                            {proposal.created_at 
                              ? new Date(proposal.created_at).toLocaleDateString('id-ID')
                              : 'Tanggal tidak tersedia'
                            }
                          </span>
                        </div>

                        {proposal.status === 'pending' && (
                          <div className="flex gap-2 pt-3 border-t border-neutral-200">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => {
                                setSelectedProposal(proposal)
                                setIsRejectModalOpen(true)
                              }}
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Tolak
                            </Button>
                            <Button
                              size="sm"
                              className="flex-1"
                              onClick={() => {
                                setSelectedProposal(proposal)
                                setIsAcceptModalOpen(true)
                              }}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Terima
                            </Button>
                          </div>
                        )}

                        {proposal.status === 'accepted' && (
                          <div className="flex gap-2 pt-3 border-t border-neutral-200">
                            <Link href={`/client/messages/${proposal.student_id}`} className="flex-1">
                              <Button variant="outline" size="sm" className="w-full">
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Kirim Pesan
                              </Button>
                            </Link>
                            <Button variant="outline" size="sm">
                              Lihat Profil
                            </Button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </Card>
          </div>

          {/* Right Column - Project Info */}
          <div className="space-y-6">
            <Card>
              <h3 className="font-semibold text-neutral-900 mb-4">Informasi Proyek</h3>
              <div className="space-y-4">
                {(project.budget || project.budget_min) && (
                  <div className="flex items-center gap-3 text-sm">
                    <DollarSign className="w-5 h-5 text-neutral-400" />
                    <div>
                      <p className="text-neutral-500">Budget</p>
                      <p className="font-semibold text-neutral-900">
                        {project.budget || 
                          (project.budget_min && project.budget_max 
                            ? `${formatCurrency(project.budget_min)} - ${formatCurrency(project.budget_max)}`
                            : project.budget_min 
                            ? formatCurrency(project.budget_min)
                            : 'Belum ditentukan'
                          )
                        }
                      </p>
                    </div>
                  </div>
                )}
                {project.deadline && (
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-5 h-5 text-neutral-400" />
                    <div>
                      <p className="text-neutral-500">Deadline</p>
                      <p className="font-semibold text-neutral-900">
                        {new Date(project.deadline).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </div>
                )}
                {project.created_at && (
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-5 h-5 text-neutral-400" />
                    <div>
                      <p className="text-neutral-500">Dibuat</p>
                      <p className="font-semibold text-neutral-900">
                        {new Date(project.created_at).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </div>
                )}
                {project.category && (
                  <div className="flex items-center gap-3 text-sm">
                    <FileText className="w-5 h-5 text-neutral-400" />
                    <div>
                      <p className="text-neutral-500">Kategori</p>
                      <p className="font-semibold text-neutral-900">{project.category}</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold text-neutral-900 mb-4">Aksi Cepat</h3>
              <div className="space-y-2">
                <Link href={`/client/projects/${projectId}/edit`}>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Edit Proyek
                  </Button>
                </Link>
                {acceptedProposals.length > 0 && (
                  <Link href={`/client/projects/${projectId}/progress`}>
                    <Button variant="outline" className="w-full justify-start">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Lihat Progress
                    </Button>
                  </Link>
                )}
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-danger-600 hover:bg-danger-50"
                  onClick={() => {
                    if (confirm('Yakin ingin menutup proyek ini?')) {
                      // TODO: Close project
                    }
                  }}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Tutup Proyek
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Accept Proposal Modal */}
      <Modal
        isOpen={isAcceptModalOpen}
        onClose={() => {
          if (!actionLoading) {
            setIsAcceptModalOpen(false)
            setSelectedProposal(null)
          }
        }}
        title="Terima Proposal"
        footer={
          <>
            <Button 
              variant="ghost" 
              onClick={() => {
                setIsAcceptModalOpen(false)
                setSelectedProposal(null)
              }}
              disabled={actionLoading}
            >
              Batal
            </Button>
            <Button onClick={handleAcceptProposal} disabled={actionLoading}>
              {actionLoading ? 'Memproses...' : 'Ya, Terima Proposal'}
            </Button>
          </>
        }
      >
        {selectedProposal && (
          <div className="space-y-4">
            <p className="text-neutral-600">
              Anda yakin ingin menerima proposal dari <strong>{selectedProposal.student_name}</strong>?
            </p>
            <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <h4 className="font-semibold text-primary-900 mb-2">Yang perlu Anda lakukan:</h4>
              <ul className="space-y-1 text-sm text-primary-800">
                <li>✓ Mahasiswa akan diberitahu bahwa proposal diterima</li>
                <li>✓ Anda dapat mulai berkomunikasi via chat</li>
                <li>✓ Proyek akan berstatus "Sedang Berjalan"</li>
                <li>✓ Proposal lainnya akan otomatis ditolak</li>
              </ul>
            </div>
          </div>
        )}
      </Modal>

      {/* Reject Proposal Modal */}
      <Modal
        isOpen={isRejectModalOpen}
        onClose={() => {
          if (!actionLoading) {
            setIsRejectModalOpen(false)
            setSelectedProposal(null)
          }
        }}
        title="Tolak Proposal"
        footer={
          <>
            <Button 
              variant="ghost" 
              onClick={() => {
                setIsRejectModalOpen(false)
                setSelectedProposal(null)
              }}
              disabled={actionLoading}
            >
              Batal
            </Button>
            <Button 
              onClick={handleRejectProposal} 
              disabled={actionLoading}
              variant="danger"
            >
              {actionLoading ? 'Memproses...' : 'Ya, Tolak Proposal'}
            </Button>
          </>
        }
      >
        {selectedProposal && (
          <div className="space-y-4">
            <p className="text-neutral-600">
              Anda yakin ingin menolak proposal dari <strong>{selectedProposal.student_name}</strong>?
            </p>
            <div className="p-4 bg-warning-50 border border-warning-200 rounded-lg">
              <p className="text-sm text-warning-800">
                Mahasiswa akan diberitahu bahwa proposal ditolak. Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </ClientDashboardLayout>
  )
}

