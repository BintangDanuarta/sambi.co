'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import { Search, Filter, Plus, Loader } from 'lucide-react'
import { projectsApi } from '@/lib/api'

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const tabs = [
    { id: 'all', label: 'Semua Proyek' },
    { id: 'active', label: 'Aktif' },
    { id: 'completed', label: 'Selesai' },
    { id: 'applied', label: 'Proposal Saya' },
  ]

  useEffect(() => {
    loadProjects()
  }, [activeTab])

  const loadProjects = async () => {
    try {
      setLoading(true)
      setError('')
      
      if (activeTab === 'applied') {
        // Fetch user's applications
        const applications = await projectsApi.getMyApplications()
        setProjects(Array.isArray(applications) ? applications : [])
      } else {
        // Fetch user's owned/active projects
        const params = {}
        if (activeTab !== 'all') {
          params.status = activeTab
        }
        const data = await projectsApi.getAll(params)
        setProjects(Array.isArray(data) ? data : [])
      }
    } catch (error) {
      console.error('Failed to load projects:', error)
      setError(error.message || 'Gagal memuat proyek')
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  const filteredProjects = projects.filter(project => 
    searchQuery === '' || 
    project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusBadge = (status) => {
    const variants = {
      active: { variant: 'primary', label: 'Aktif' },
      completed: { variant: 'success', label: 'Selesai' },
      review: { variant: 'warning', label: 'Review' },
      proposal: { variant: 'neutral', label: 'Proposal' },
      applied: { variant: 'neutral', label: 'Proposal' },
    }
    return variants[status] || variants.active
  }

  const formatBudget = (budget) => {
    if (!budget) return 'Budget belum ditentukan'
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(budget)
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
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
                  ${activeTab === tab.id
                    ? 'bg-primary-600 text-white' 
                    : 'bg-white text-neutral-600 hover:bg-neutral-100'
                  }`}
              >
                {tab.label}
                {!loading && ` (${activeTab === tab.id ? filteredProjects.length : projects.length})`}
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" onClick={loadProjects}>
              <Filter className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </Card>

        {/* Error State */}
        {error && (
          <Card className="bg-red-50 border-red-200">
            <p className="text-red-600 text-sm">{error}</p>
          </Card>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader className="w-8 h-8 animate-spin text-primary-600" />
          </div>
        )}

        {/* Projects List */}
        {!loading && filteredProjects.length > 0 && (
          <div className="grid gap-6">
            {filteredProjects.map((project) => {
              const statusBadge = getStatusBadge(project.status)
              return (
                <Card key={project.id} hover>
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                            {project.title || project.nama_project || 'Untitled Project'}
                          </h3>
                          <p className="text-sm text-neutral-500">
                            {project.client || 'Client'}
                          </p>
                        </div>
                        <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                      </div>
                      
                      <p className="text-neutral-600 text-sm mb-4">
                        {project.description || project.deskripsi || 'Tidak ada deskripsi'}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        {project.category && (
                          <Badge variant="neutral">{project.category}</Badge>
                        )}
                        {project.deadline && (
                          <span className="text-neutral-600">
                            Deadline: <span className="font-medium">{new Date(project.deadline).toLocaleDateString('id-ID')}</span>
                          </span>
                        )}
                        <span className="font-semibold text-primary-600">
                          {formatBudget(project.budget || project.budget_min)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex lg:flex-col gap-2">
                      <Link href={`/dashboard/projects/${project.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          Detail
                        </Button>
                      </Link>
                      {(project.status === 'active' || project.status === 'ditangani') && (
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
        )}

        {/* Empty State */}
        {!loading && filteredProjects.length === 0 && (
          <Card className="text-center py-12">
            <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-neutral-400" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              {searchQuery ? 'Tidak Ada Hasil' : 'Belum Ada Proyek'}
            </h3>
            <p className="text-neutral-600 mb-6">
              {searchQuery 
                ? 'Coba kata kunci lain untuk mencari proyek' 
                : 'Mulai cari proyek yang sesuai dengan keahlian Anda'
              }
            </p>
            {!searchQuery && (
              <Link href="/dashboard/projects/browse">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Cari Proyek
                </Button>
              </Link>
            )}
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
