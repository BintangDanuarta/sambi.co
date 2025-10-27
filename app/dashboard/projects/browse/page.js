'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import { Search, Filter, Clock, Users, Briefcase } from 'lucide-react'
import { projectsApi } from '@/lib/api'

export default function BrowseProjectsPage() {
  const [projects, setProjects] = useState([])
  const [appliedProjectIds, setAppliedProjectIds] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'Semua', count: 0 },
    { id: 'design', label: 'Design', count: 0 },
    { id: 'development', label: 'Development', count: 0 },
    { id: 'writing', label: 'Writing', count: 0 },
    { id: 'marketing', label: 'Marketing', count: 0 },
    { id: 'video', label: 'Video', count: 0 },
  ]

  // Load projects and user's applications
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError('')
        
        // Build params for projects
        const params = {}
        if (selectedCategory !== 'all') {
          params.category = selectedCategory
        }
        if (searchQuery) {
          params.search = searchQuery
        }
        
        // Fetch projects and applications in parallel
        const [projectsData, applicationsData] = await Promise.all([
          projectsApi.getAll(params).catch(() => []),
          projectsApi.getMyApplications().catch(() => [])
        ])
        
        setProjects(projectsData || [])
        
        // Build Set of applied project IDs for O(1) lookup
        const appliedIds = new Set(
          (applicationsData || []).map(app => app.project_id || app.id)
        )
        setAppliedProjectIds(appliedIds)
        
      } catch (error) {
        console.error('Failed to load data:', error)
        setError(error.message || 'Gagal memuat data')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [selectedCategory, searchQuery])

  // Dummy projects for fallback
  const dummyProjects = [
    {
      id: 1,
      title: 'Desain UI/UX untuk Aplikasi Mobile Banking',
      client: 'PT Bank Digital',
      clientRating: 4.8,
      category: 'Design',
      budget: 'Rp 3.000.000 - Rp 5.000.000',
      duration: '30 hari',
      proposals: 12,
      posted: '2 jam yang lalu',
      description: 'Mencari desainer UI/UX berpengalaman untuk membuat desain aplikasi mobile banking yang modern dan user-friendly. Harus memiliki portfolio yang relevan.',
      skills: ['Figma', 'UI/UX Design', 'Mobile Design', 'Prototyping'],
    },
    {
      id: 2,
      title: 'Develop Website E-Commerce dengan Next.js',
      client: 'Startup Retail Online',
      clientRating: 4.5,
      category: 'Development',
      budget: 'Rp 5.000.000 - Rp 8.000.000',
      duration: '45 hari',
      proposals: 8,
      posted: '5 jam yang lalu',
      description: 'Membutuhkan developer untuk membuat website e-commerce lengkap dengan payment gateway, admin dashboard, dan sistem inventory.',
      skills: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Payment Integration'],
    },
    {
      id: 3,
      title: 'Content Writer untuk Blog Teknologi',
      client: 'Media Tech Indonesia',
      clientRating: 4.9,
      category: 'Writing',
      budget: 'Rp 500.000 - Rp 1.000.000',
      duration: '14 hari',
      proposals: 15,
      posted: '1 hari yang lalu',
      description: 'Mencari content writer yang dapat menulis artikel teknologi SEO-friendly. Dibutuhkan 15 artikel dengan minimal 800 kata per artikel.',
      skills: ['Content Writing', 'SEO', 'Research', 'Bahasa Indonesia'],
    },
    {
      id: 4,
      title: 'Social Media Management untuk Instagram',
      client: 'Fashion Brand',
      clientRating: 4.6,
      category: 'Marketing',
      budget: 'Rp 2.000.000 - Rp 3.000.000',
      duration: '30 hari',
      proposals: 10,
      posted: '3 hari yang lalu',
      description: 'Mengelola akun Instagram fashion brand, termasuk content planning, posting, dan engagement dengan followers.',
      skills: ['Social Media', 'Content Planning', 'Instagram', 'Canva'],
    },
    {
      id: 5,
      title: 'Video Editing untuk YouTube Channel Education',
      client: 'Edutech Platform',
      clientRating: 4.7,
      category: 'Video',
      budget: 'Rp 1.500.000 - Rp 2.500.000',
      duration: '20 hari',
      proposals: 6,
      posted: '1 minggu yang lalu',
      description: 'Membutuhkan video editor untuk edit 10 video pembelajaran dengan durasi 15-20 menit. Harus berpengalaman dengan educational content.',
      skills: ['Adobe Premiere', 'After Effects', 'Color Grading', 'Motion Graphics'],
    },
  ]

  return (
    <DashboardLayout title="Cari Proyek" subtitle="Temukan proyek yang sesuai dengan keahlian Anda">
      <div className="space-y-6">
        {/* Search and Filter Bar */}
        <Card>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 flex items-center bg-neutral-50 rounded-lg px-4 py-2">
              <Search className="w-5 h-5 text-neutral-400 mr-2" />
              <input
                type="text"
                placeholder="Cari proyek berdasarkan judul, kategori, atau skill..."
                className="bg-transparent border-none outline-none flex-1 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">
                Urutkan
              </Button>
            </div>
          </div>
        </Card>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
                ${category.id === selectedCategory 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between">
          <p className="text-neutral-600">
            {loading ? 'Memuat...' : `Menampilkan ${projects.length} proyek`}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <Card>
            <div className="text-center py-8">
              <p className="text-danger-600 mb-2">{error}</p>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Coba Lagi
              </Button>
            </div>
          </Card>
        )}

        {/* Loading State */}
        {loading && !error && (
          <div className="grid gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <div className="animate-pulse">
                  <div className="h-6 bg-neutral-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <div className="grid gap-6">
            {projects.length === 0 ? (
              <Card>
                <div className="text-center py-12">
                  <Briefcase className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Tidak Ada Proyek
                  </h3>
                  <p className="text-neutral-600">
                    Belum ada proyek yang tersedia saat ini. Coba lagi nanti.
                  </p>
                </div>
              </Card>
            ) : (
              projects.map((project) => (
            <Card key={project.id} hover>
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Link href={`/dashboard/projects/${project.id}`}>
                      <h3 className="text-xl font-semibold text-neutral-900 hover:text-primary-600 transition-colors mb-2">
                        {project.title || project.nama_project || 'Untitled Project'}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-3 text-sm text-neutral-600">
                      {project.client && <span className="font-medium">{project.client}</span>}
                      {project.clientRating && (
                        <span className="flex items-center gap-1">
                          ⭐ {project.clientRating}
                        </span>
                      )}
                    </div>
                  </div>
                  {project.category && <Badge variant="neutral">{project.category}</Badge>}
                </div>

                {/* Description */}
                <p className="text-neutral-600 leading-relaxed">
                  {project.description || project.deskripsi || 'Tidak ada deskripsi'}
                </p>

                {/* Skills */}
                {project.skills && project.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill, index) => (
                      <Badge key={index} variant="primary" size="sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
                {(!project.skills || project.skills.length === 0) && project.category && (
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="primary" size="sm">{project.category}</Badge>
                  </div>
                )}

                {/* Footer Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-neutral-200">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
                    {(project.budget || project.budget_min) && (
                      <span className="font-semibold text-primary-600 text-lg">
                        {project.budget || 
                          (project.budget_min && project.budget_max 
                            ? `Rp ${project.budget_min.toLocaleString('id-ID')} - Rp ${project.budget_max.toLocaleString('id-ID')}`
                            : project.budget_min 
                            ? `Rp ${project.budget_min.toLocaleString('id-ID')}`
                            : 'Budget belum ditentukan'
                          )
                        }
                      </span>
                    )}
                    {project.duration && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {project.duration}
                      </span>
                    )}
                    {project.deadline && !project.duration && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(project.deadline).toLocaleDateString('id-ID')}
                      </span>
                    )}
                    {project.proposals > 0 && (
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {project.proposals} proposal
                      </span>
                    )}
                    {project.posted && (
                      <span className="text-neutral-500">
                        {project.posted}
                      </span>
                    )}
                    {project.created_at && !project.posted && (
                      <span className="text-neutral-500">
                        {new Date(project.created_at).toLocaleDateString('id-ID')}
                      </span>
                    )}
                  </div>
                  {appliedProjectIds.has(project.id) ? (
                    <Button variant="outline" disabled>
                      ✓ Sudah Apply
                    </Button>
                  ) : (
                    <Link href={`/dashboard/projects/${project.id}/apply`}>
                      <Button>
                        Apply Sekarang
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </Card>
              ))
            )}
          </div>
        )}

        {/* Load More */}
        <div className="flex justify-center">
          <Button variant="outline" size="lg">
            Muat Lebih Banyak
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}

