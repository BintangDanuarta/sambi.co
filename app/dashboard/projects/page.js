import DashboardLayout from '@/components/layout/DashboardLayout'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import { Search, Filter, Plus } from 'lucide-react'

export default function ProjectsPage() {
  const tabs = [
    { id: 'all', label: 'Semua Proyek', count: 15 },
    { id: 'active', label: 'Aktif', count: 3 },
    { id: 'completed', label: 'Selesai', count: 12 },
    { id: 'proposals', label: 'Proposal', count: 5 },
  ]

  const projects = [
    {
      id: 1,
      title: 'Redesign Landing Page E-Commerce',
      client: 'PT Digital Indonesia',
      category: 'Design',
      budget: 'Rp 1.500.000',
      deadline: '2025-11-15',
      status: 'active',
      description: 'Membutuhkan redesign untuk landing page e-commerce dengan fokus pada konversi dan user experience.',
    },
    {
      id: 2,
      title: 'Aplikasi Mobile untuk Manajemen Keuangan',
      client: 'Startup FinTech',
      category: 'Development',
      budget: 'Rp 3.000.000',
      deadline: '2025-11-30',
      status: 'active',
      description: 'Develop aplikasi mobile untuk manajemen keuangan pribadi dengan fitur tracking pengeluaran.',
    },
    {
      id: 3,
      title: 'Content Writing untuk Blog',
      client: 'CV Media Online',
      category: 'Writing',
      budget: 'Rp 750.000',
      deadline: '2025-11-10',
      status: 'review',
      description: '10 artikel SEO-friendly untuk blog dengan topik teknologi dan bisnis.',
    },
    {
      id: 4,
      title: 'Video Editing untuk YouTube Channel',
      client: 'Content Creator',
      category: 'Video',
      budget: 'Rp 500.000',
      deadline: '2025-10-28',
      status: 'completed',
      description: 'Edit 5 video untuk YouTube dengan durasi 10-15 menit per video.',
    },
    {
      id: 5,
      title: 'Social Media Management',
      client: 'Startup E-Commerce',
      category: 'Marketing',
      budget: 'Rp 2.000.000',
      deadline: '2025-11-20',
      status: 'proposal',
      description: 'Mengelola 3 platform social media (Instagram, TikTok, Twitter) selama 1 bulan.',
    },
  ]

  const getStatusBadge = (status) => {
    const variants = {
      active: { variant: 'primary', label: 'Aktif' },
      completed: { variant: 'success', label: 'Selesai' },
      review: { variant: 'warning', label: 'Review' },
      proposal: { variant: 'neutral', label: 'Proposal' },
    }
    return variants[status] || variants.active
  }

  return (
    <DashboardLayout title="Proyek" subtitle="Kelola semua proyek Anda">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto w-full sm:w-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
                  ${tab.id === 'all' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-white text-neutral-600 hover:bg-neutral-100'
                  }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
          <Link href="/dashboard/projects/browse">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Cari Proyek Baru
            </Button>
          </Link>
        </div>

        {/* Search and Filter */}
        <Card>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex items-center bg-neutral-50 rounded-lg px-4 py-2">
              <Search className="w-5 h-5 text-neutral-400 mr-2" />
              <input
                type="text"
                placeholder="Cari proyek..."
                className="bg-transparent border-none outline-none flex-1 text-sm"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </Card>

        {/* Projects List */}
        <div className="grid gap-6">
          {projects.map((project) => {
            const statusBadge = getStatusBadge(project.status)
            return (
              <Card key={project.id} hover>
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                          {project.title}
                        </h3>
                        <p className="text-sm text-neutral-500">{project.client}</p>
                      </div>
                      <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                    </div>
                    
                    <p className="text-neutral-600 text-sm mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <Badge variant="neutral">{project.category}</Badge>
                      <span className="text-neutral-600">
                        Deadline: <span className="font-medium">{new Date(project.deadline).toLocaleDateString('id-ID')}</span>
                      </span>
                      <span className="font-semibold text-primary-600">{project.budget}</span>
                    </div>
                  </div>
                  
                  <div className="flex lg:flex-col gap-2">
                    <Link href={`/dashboard/projects/${project.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        Detail
                      </Button>
                    </Link>
                    {project.status === 'active' && (
                      <Link href={`/dashboard/projects/${project.id}/upload`} className="flex-1">
                        <Button size="sm" className="w-full">
                          Upload Hasil
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Empty State (hidden when there are projects) */}
        {projects.length === 0 && (
          <Card className="text-center py-12">
            <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-neutral-400" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Belum Ada Proyek
            </h3>
            <p className="text-neutral-600 mb-6">
              Mulai cari proyek yang sesuai dengan keahlian Anda
            </p>
            <Link href="/dashboard/projects/browse">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Cari Proyek
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}

