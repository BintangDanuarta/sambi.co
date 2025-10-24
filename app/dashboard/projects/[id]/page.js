'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import { 
  Calendar, 
  DollarSign, 
  User, 
  FileText, 
  Clock,
  MessageCircle,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

export default function ProjectDetailPage({ params }) {
  // Mock data - will be replaced with API call using params.id
  const project = {
    id: params.id,
    title: 'Redesign Landing Page E-Commerce',
    client: {
      name: 'PT Digital Indonesia',
      avatar: 'DI',
      rating: 4.8,
      projectsCompleted: 15,
    },
    status: 'active',
    category: 'Design',
    budget: 'Rp 1.500.000',
    deadline: '2025-11-15',
    startDate: '2025-10-20',
    progress: 65,
    description: 'Membutuhkan redesign untuk landing page e-commerce dengan fokus pada konversi dan user experience. Design harus modern, clean, dan mobile-responsive.',
    requirements: [
      'Desain mockup untuk desktop dan mobile',
      'Prototype interaktif menggunakan Figma',
      'Revisi maksimal 3x',
      'File source yang dapat diedit',
      'Style guide dan design system',
    ],
    milestones: [
      { id: 1, title: 'Research & Wireframe', status: 'completed', date: '2025-10-25' },
      { id: 2, title: 'Design Mockup', status: 'completed', date: '2025-11-01' },
      { id: 3, title: 'Prototype', status: 'in-progress', date: '2025-11-08' },
      { id: 4, title: 'Revisi & Finalisasi', status: 'pending', date: '2025-11-15' },
    ],
    deliverables: [
      { name: 'Wireframe.pdf', uploaded: true, date: '2025-10-26' },
      { name: 'Mockup-Desktop.fig', uploaded: true, date: '2025-11-02' },
      { name: 'Mockup-Mobile.fig', uploaded: true, date: '2025-11-02' },
      { name: 'Prototype.fig', uploaded: false, date: '-' },
    ],
  }

  const getMilestoneIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-success-600" />
      case 'in-progress':
        return <Clock className="w-5 h-5 text-warning-600" />
      default:
        return <AlertCircle className="w-5 h-5 text-neutral-400" />
    }
  }

  const getStatusBadge = (status) => {
    const variants = {
      active: { variant: 'primary', label: 'Aktif' },
      completed: { variant: 'success', label: 'Selesai' },
      review: { variant: 'warning', label: 'Review' },
    }
    return variants[status] || variants.active
  }

  const statusBadge = getStatusBadge(project.status)

  return (
    <DashboardLayout title="Detail Proyek">
      <div className="space-y-6">
        {/* Header Card */}
        <Card>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 mb-2">{project.title}</h1>
              <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
            </div>
            <div className="flex gap-2">
              <Link href={`/dashboard/projects/${project.id}/contact`}>
                <Button variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Hubungi Klien
                </Button>
              </Link>
              <Link href={`/dashboard/projects/${project.id}/upload`}>
                <Button>
                  Upload Hasil
                </Button>
              </Link>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-neutral-600 font-medium">Progress Proyek</span>
              <span className="font-bold text-primary-600">{project.progress}%</span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-3">
              <div 
                className="bg-primary-600 h-3 rounded-full transition-all" 
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">Deskripsi Proyek</h2>
              <p className="text-neutral-600 leading-relaxed mb-6">{project.description}</p>
              
              <h3 className="text-md font-semibold text-neutral-900 mb-3">Requirements:</h3>
              <ul className="space-y-2">
                {project.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-neutral-600">
                    <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Milestones */}
            <Card>
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">Milestone</h2>
              <div className="space-y-4">
                {project.milestones.map((milestone, index) => (
                  <div key={milestone.id} className="flex items-start gap-4">
                    <div className="relative">
                      {getMilestoneIcon(milestone.status)}
                      {index < project.milestones.length - 1 && (
                        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-0.5 h-12 bg-neutral-200"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <h4 className="font-medium text-neutral-900">{milestone.title}</h4>
                      <p className="text-sm text-neutral-500">Target: {new Date(milestone.date).toLocaleDateString('id-ID')}</p>
                    </div>
                    <Badge 
                      variant={milestone.status === 'completed' ? 'success' : milestone.status === 'in-progress' ? 'warning' : 'neutral'}
                      size="sm"
                    >
                      {milestone.status === 'completed' ? 'Selesai' : milestone.status === 'in-progress' ? 'Sedang Dikerjakan' : 'Pending'}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Deliverables */}
            <Card>
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">File Deliverable</h2>
              <div className="space-y-3">
                {project.deliverables.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-neutral-400" />
                      <div>
                        <p className="font-medium text-neutral-900">{file.name}</p>
                        {file.uploaded && (
                          <p className="text-xs text-neutral-500">Uploaded: {file.date}</p>
                        )}
                      </div>
                    </div>
                    {file.uploaded ? (
                      <Badge variant="success" size="sm">✓ Uploaded</Badge>
                    ) : (
                      <Badge variant="neutral" size="sm">Pending</Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <Card>
              <h3 className="font-semibold text-neutral-900 mb-4">Informasi Proyek</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <DollarSign className="w-5 h-5 text-neutral-400" />
                  <div>
                    <p className="text-neutral-500">Budget</p>
                    <p className="font-semibold text-neutral-900">{project.budget}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-5 h-5 text-neutral-400" />
                  <div>
                    <p className="text-neutral-500">Deadline</p>
                    <p className="font-semibold text-neutral-900">
                      {new Date(project.deadline).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-5 h-5 text-neutral-400" />
                  <div>
                    <p className="text-neutral-500">Mulai</p>
                    <p className="font-semibold text-neutral-900">
                      {new Date(project.startDate).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Client Info */}
            <Card>
              <h3 className="font-semibold text-neutral-900 mb-4">Informasi Klien</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {project.client.avatar}
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">{project.client.name}</p>
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <span>⭐ {project.client.rating}</span>
                    <span>•</span>
                    <span>{project.client.projectsCompleted} proyek</span>
                  </div>
                </div>
              </div>
              <Link href={`/dashboard/projects/${project.id}/contact`}>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Kirim Pesan
                </Button>
              </Link>
            </Card>

            {/* Quick Actions */}
            <Card>
              <h3 className="font-semibold text-neutral-900 mb-4">Aksi Cepat</h3>
              <div className="space-y-2">
                <Link href={`/dashboard/projects/${project.id}/upload`}>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Upload File
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Laporkan Masalah
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

