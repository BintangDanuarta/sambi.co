import ClientDashboardLayout from '@/components/layout/ClientDashboardLayout'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import { Search, Filter, Plus, Eye, Users, Calendar } from 'lucide-react'

export default function ClientProjectsPage() {
  const tabs = [
    { id: 'all', label: 'Semua', count: 8 },
    { id: 'active', label: 'Aktif', count: 3 },
    { id: 'reviewing', label: 'Menunggu Hire', count: 2 },
    { id: 'completed', label: 'Selesai', count: 3 },
  ]

  const projects = [
    {
      id: 1,
      title: 'Redesign Website Company Profile',
      category: 'Design',
      status: 'active',
      freelancer: 'Ahmad Hidayat',
      budget: 'Rp 5.000.000',
      progress: 75,
      proposals: 15,
      deadline: '2025-11-20',
      postedDate: '2025-10-15',
    },
    {
      id: 2,
      title: 'Develop Mobile App untuk Inventory',
      category: 'Development',
      status: 'active',
      freelancer: 'Sarah Wijaya',
      budget: 'Rp 8.500.000',
      progress: 45,
      proposals: 23,
      deadline: '2025-12-01',
      postedDate: '2025-10-10',
    },
    {
      id: 3,
      title: 'Content Writing untuk Blog (10 Artikel)',
      category: 'Writing',
      status: 'reviewing',
      freelancer: null,
      budget: 'Rp 1.500.000',
      progress: 0,
      proposals: 8,
      deadline: '2025-11-15',
      postedDate: '2025-10-20',
    },
    {
      id: 4,
      title: 'Social Media Management (1 Bulan)',
      category: 'Marketing',
      status: 'reviewing',
      freelancer: null,
      budget: 'Rp 3.000.000',
      progress: 0,
      proposals: 12,
      deadline: '2025-11-30',
      postedDate: '2025-10-22',
    },
    {
      id: 5,
      title: 'Video Explainer untuk Produk',
      category: 'Video',
      status: 'completed',
      freelancer: 'Rina Kusuma',
      budget: 'Rp 2.500.000',
      progress: 100,
      proposals: 10,
      deadline: '2025-10-15',
      postedDate: '2025-09-10',
    },
  ]

  const getStatusBadge = (status) => {
    const variants = {
      active: { variant: 'primary', label: 'Aktif' },
      reviewing: { variant: 'warning', label: 'Menunggu Hire' },
      completed: { variant: 'success', label: 'Selesai' },
      cancelled: { variant: 'neutral', label: 'Dibatalkan' },
    }
    return variants[status] || variants.active
  }

  return (
    <ClientDashboardLayout title="Proyek" subtitle="Kelola semua proyek Anda">
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
          <Link href="/client/projects/post">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Post Proyek Baru
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
                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="neutral">{project.category}</Badge>
                          {project.freelancer ? (
                            <span className="text-neutral-600">
                              🎓 {project.freelancer}
                            </span>
                          ) : (
                            <span className="text-warning-600 font-medium">
                              {project.proposals} proposal tersedia
                            </span>
                          )}
                        </div>
                      </div>
                      <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                    </div>

                    {project.status === 'active' && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-neutral-600">Progress</span>
                          <span className="font-semibold text-primary-600">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-neutral-200 rounded-full h-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full transition-all" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <span className="text-neutral-600 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Deadline: {new Date(project.deadline).toLocaleDateString('id-ID')}
                      </span>
                      <span className="font-semibold text-primary-600">{project.budget}</span>
                      {project.status === 'reviewing' && (
                        <span className="text-neutral-600 flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {project.proposals} proposals
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 lg:w-48">
                    <Link href={`/client/projects/${project.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="w-4 h-4 mr-1" />
                        Detail
                      </Button>
                    </Link>
                    {project.status === 'reviewing' ? (
                      <Link href={`/client/projects/${project.id}/proposals`}>
                        <Button size="sm" className="w-full">
                          <Users className="w-4 h-4 mr-1" />
                          Review Proposal
                        </Button>
                      </Link>
                    ) : project.status === 'active' ? (
                      <>
                        <Button size="sm" className="w-full" variant="outline">
                          Monitor Progress
                        </Button>
                        {project.progress >= 100 && (
                          <Link href={`/client/projects/${project.id}/review`}>
                            <Button size="sm" className="w-full">
                              Review Hasil
                            </Button>
                          </Link>
                        )}
                      </>
                    ) : null}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <Card className="text-center py-12">
            <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-10 h-10 text-neutral-400" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Belum Ada Proyek
            </h3>
            <p className="text-neutral-600 mb-6">
              Mulai posting proyek pertama Anda dan temukan freelancer berbakat
            </p>
            <Link href="/client/projects/post">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Post Proyek Baru
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </ClientDashboardLayout>
  )
}

