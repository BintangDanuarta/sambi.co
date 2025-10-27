'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import { 
  TrendingUp, 
  Briefcase, 
  Clock, 
  DollarSign,
  ArrowRight,
  Star,
  Calendar
} from 'lucide-react'
import { projectsApi, userApi } from '@/lib/api'
import { useAuth } from '@/hooks/useAuth'

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [activeProjects, setActiveProjects] = useState([])
  const [recentActivities, setRecentActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Load dashboard data
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true)
        
        // Fetch user stats and projects in parallel
        const [statsData, projectsData] = await Promise.all([
          userApi.getStats().catch(() => null),
          projectsApi.getAll({ status: 'active', limit: 3 }).catch(() => [])
        ])
        
        if (statsData) setStats(statsData)
        if (projectsData) setActiveProjects(Array.isArray(projectsData) ? projectsData : [])
        
      } catch (error) {
        console.error('Failed to load dashboard:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      loadDashboard()
    } else {
      setLoading(false)
    }
  }, [user])

  // Dummy data for fallback
  const dummyStats = [
    {
      label: 'Total Pendapatan',
      value: 'Rp 5.250.000',
      change: '+12.5%',
      icon: DollarSign,
      color: 'success',
    },
    {
      label: 'Proyek Aktif',
      value: '3',
      change: '+2',
      icon: Briefcase,
      color: 'primary',
    },
    {
      label: 'Proyek Selesai',
      value: '12',
      change: '+3',
      icon: Clock,
      color: 'secondary',
    },
    {
      label: 'Rating',
      value: '4.8',
      change: '⭐',
      icon: Star,
      color: 'warning',
    },
  ]

  const dummyActiveProjects = [
    {
      id: 1,
      title: 'Redesign Landing Page E-Commerce',
      client: 'PT Digital Indonesia',
      deadline: '5 hari lagi',
      progress: 65,
      budget: 'Rp 1.500.000',
      status: 'in-progress',
    },
    {
      id: 2,
      title: 'Aplikasi Mobile untuk Manajemen Keuangan',
      client: 'Startup FinTech',
      deadline: '12 hari lagi',
      progress: 30,
      budget: 'Rp 3.000.000',
      status: 'in-progress',
    },
    {
      id: 3,
      title: 'Content Writing untuk Blog',
      client: 'CV Media Online',
      deadline: '3 hari lagi',
      progress: 80,
      budget: 'Rp 750.000',
      status: 'review',
    },
  ]

  const dummyRecentActivities = [
    {
      type: 'project_accepted',
      message: 'Proposal Anda untuk "Redesign Landing Page" diterima',
      time: '2 jam yang lalu',
    },
    {
      type: 'payment_received',
      message: 'Pembayaran Rp 1.200.000 telah diterima',
      time: '5 jam yang lalu',
    },
    {
      type: 'review_submitted',
      message: 'Klien memberikan review bintang 5',
      time: '1 hari yang lalu',
    },
  ]

  const recommendedProjects = [
    {
      id: 1,
      title: 'Desain Logo untuk Startup',
      category: 'Design',
      budget: 'Rp 500.000 - Rp 1.000.000',
      proposals: 8,
      deadline: '7 hari',
    },
    {
      id: 2,
      title: 'Develop Website Company Profile',
      category: 'Development',
      budget: 'Rp 2.000.000 - Rp 3.500.000',
      proposals: 5,
      deadline: '14 hari',
    },
  ]

  // Use API data if available, otherwise use dummy data
  const displayStats = stats || dummyStats
  const displayProjects = activeProjects.length > 0 ? activeProjects : dummyActiveProjects
  const displayActivities = recentActivities.length > 0 ? recentActivities : dummyRecentActivities

  return (
    <DashboardLayout 
      title="Dashboard" 
      subtitle={`Selamat datang kembali, ${user?.fullName || 'Mahasiswa'}!`}
    >
      <div className="space-y-6">
        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-neutral-600">Memuat dashboard...</p>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} hover>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">{stat.label}</p>
                    <h3 className="text-2xl font-bold text-neutral-900">{stat.value}</h3>
                    <p className="text-sm text-success-600 mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Active Projects */}
          <div className="lg:col-span-2">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-neutral-900">Proyek Aktif</h2>
                <Link href="/dashboard/projects">
                  <Button variant="ghost" size="sm">
                    Lihat Semua
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {displayProjects.map((project) => (
                  <Card key={project.id} className="border border-neutral-200" padding="normal">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-neutral-900 mb-1">{project.title}</h3>
                        <p className="text-sm text-neutral-500">{project.client}</p>
                      </div>
                      <Badge variant={project.status === 'review' ? 'warning' : 'primary'}>
                        {project.status === 'review' ? 'Review' : 'In Progress'}
                      </Badge>
                    </div>

                    {/* Progress Bar */}
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

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-600 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {project.deadline}
                      </span>
                      <span className="font-semibold text-neutral-900">{project.budget}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Activities & Recommended */}
          <div className="space-y-6">
            {/* Recent Activities */}
            <Card>
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Aktivitas Terbaru</h2>
              <div className="space-y-4">
                {displayActivities.map((activity, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-neutral-900">{activity.message}</p>
                      <p className="text-xs text-neutral-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recommended Projects */}
            <Card>
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Rekomendasi Proyek</h2>
              <div className="space-y-4">
                {recommendedProjects.map((project) => (
                  <div key={project.id} className="pb-4 border-b border-neutral-200 last:border-0 last:pb-0">
                    <h4 className="font-medium text-neutral-900 mb-2">{project.title}</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="neutral" size="sm">{project.category}</Badge>
                      <span className="text-xs text-neutral-500">{project.proposals} proposal</span>
                    </div>
                    <p className="text-sm font-semibold text-primary-600">{project.budget}</p>
                  </div>
                ))}
                <Link href="/dashboard/projects/browse">
                  <Button variant="outline" size="sm" className="w-full">
                    Lihat Lebih Banyak
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

