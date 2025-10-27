'use client'

import { useState, useEffect } from 'react'
import ClientDashboardLayout from '@/components/layout/ClientDashboardLayout'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import { 
  TrendingUp, 
  Briefcase, 
  Users, 
  Clock,
  ArrowRight,
  Star,
  DollarSign,
  Eye,
  MessageCircle
} from 'lucide-react'
import { projectsApi, userApi } from '@/lib/api'
import { useAuth } from '@/hooks/useAuth'

export default function ClientDashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [projects, setProjects] = useState([])
  const [freelancers, setFreelancers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Load client dashboard data
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true)
        
        // Fetch client stats and projects
        const [statsData, projectsData] = await Promise.all([
          userApi.getStats().catch(() => null),
          projectsApi.getAll({ limit: 3 }).catch(() => [])
        ])
        
        if (statsData) setStats(statsData)
        if (projectsData) setProjects(Array.isArray(projectsData) ? projectsData : [])
        
      } catch (error) {
        console.error('Failed to load client dashboard:', error)
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
      label: 'Total Proyek',
      value: '8',
      change: '+2 bulan ini',
      icon: Briefcase,
      color: 'primary',
    },
    {
      label: 'Proyek Aktif',
      value: '3',
      change: 'Sedang berjalan',
      icon: Clock,
      color: 'warning',
    },
    {
      label: 'Freelancer Hired',
      value: '12',
      change: '+5 bulan ini',
      icon: Users,
      color: 'success',
    },
    {
      label: 'Total Investasi',
      value: 'Rp 24.5M',
      change: 'Semua proyek',
      icon: DollarSign,
      color: 'secondary',
    },
  ]

  const activeProjects = [
    {
      id: 1,
      title: 'Redesign Website Company Profile',
      freelancer: 'Ahmad Hidayat',
      freelancerAvatar: 'AH',
      status: 'in-progress',
      progress: 75,
      deadline: '2025-11-20',
      budget: 'Rp 5.000.000',
      proposals: 15,
      hired: true,
    },
    {
      id: 2,
      title: 'Develop Mobile App untuk Inventory',
      freelancer: 'Sarah Wijaya',
      freelancerAvatar: 'SW',
      status: 'in-progress',
      progress: 45,
      deadline: '2025-12-01',
      budget: 'Rp 8.500.000',
      proposals: 23,
      hired: true,
    },
    {
      id: 3,
      title: 'Content Writing untuk Blog (10 Artikel)',
      freelancer: null,
      status: 'reviewing',
      progress: 0,
      deadline: '2025-11-15',
      budget: 'Rp 1.500.000',
      proposals: 8,
      hired: false,
    },
  ]

  const recentProposals = [
    {
      id: 1,
      freelancer: 'Budi Santoso',
      project: 'UI/UX Design Mobile App',
      rating: 4.9,
      experience: '3 tahun',
      budget: 'Rp 6.000.000',
      time: '2 jam yang lalu',
    },
    {
      id: 2,
      freelancer: 'Devi Anggraini',
      project: 'Social Media Management',
      rating: 4.7,
      experience: '2 tahun',
      budget: 'Rp 3.500.000',
      time: '5 jam yang lalu',
    },
  ]

  const upcomingDeadlines = [
    {
      project: 'Content Writing untuk Blog',
      freelancer: 'Menunggu hire',
      deadline: '2025-11-15',
      daysLeft: 5,
    },
    {
      project: 'Redesign Website',
      freelancer: 'Ahmad Hidayat',
      deadline: '2025-11-20',
      daysLeft: 10,
    },
  ]

  // Use API data if available, otherwise use dummy data
  const displayStats = stats || dummyStats
  const displayProjects = projects.length > 0 ? projects : activeProjects

  const formatDate = (dateString) => {
    if (!dateString) return 'Tidak ditentukan'
    const date = new Date(dateString)
    // Check if date is valid and not in 1970 or earlier
    if (isNaN(date.getTime()) || date.getFullYear() < 2000) {
      return 'Tidak ditentukan'
    }
    return date.toLocaleDateString('id-ID')
  }

  return (
    <ClientDashboardLayout 
      title="Dashboard" 
      subtitle="Selamat datang kembali! Kelola proyek Anda dengan mudah"
    >
      <div className="space-y-4 sm:space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {displayStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} hover className="p-3 sm:p-4 lg:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-neutral-500 mb-1 truncate">{stat.label}</p>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-900 truncate">{stat.value}</h3>
                    <p className="text-xs sm:text-sm text-neutral-600 mt-1 truncate">{stat.change}</p>
                  </div>
                  <div className={`p-2 sm:p-3 rounded-lg bg-${stat.color}-100 flex-shrink-0`}>
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Quick Actions */}
        <Card className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-3 sm:mb-4">Aksi Cepat</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <Link href="/client/projects/post">
              <button className="w-full p-3 sm:p-4 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors text-left">
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 mb-2" />
                <h4 className="font-semibold mb-1 text-sm sm:text-base">Post Proyek Baru</h4>
                <p className="text-xs sm:text-sm text-neutral-600">Cari freelancer berbakat</p>
              </button>
            </Link>
            <Link href="/client/projects?tab=proposals">
              <button className="w-full p-3 sm:p-4 border-2 border-secondary-600 text-secondary-600 rounded-lg hover:bg-secondary-50 transition-colors text-left">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 mb-2" />
                <h4 className="font-semibold mb-1 text-sm sm:text-base">Review Proposal</h4>
                <p className="text-xs sm:text-sm text-neutral-600">8 proposal menunggu</p>
              </button>
            </Link>
            <Link href="/client/projects?tab=active">
              <button className="w-full p-3 sm:p-4 border-2 border-success-600 text-success-600 rounded-lg hover:bg-success-50 transition-colors text-left sm:col-span-2 lg:col-span-1">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6 mb-2" />
                <h4 className="font-semibold mb-1 text-sm sm:text-base">Monitor Proyek</h4>
                <p className="text-xs sm:text-sm text-neutral-600">3 proyek aktif</p>
              </button>
            </Link>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Active Projects */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <Card className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-neutral-900">Proyek Saya</h2>
                <Link href="/client/projects">
                  <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                    <span className="hidden sm:inline">Lihat Semua</span>
                    <ArrowRight className="w-4 h-4 sm:ml-2" />
                  </Button>
                </Link>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {displayProjects.map((project) => (
                  <Card key={project.id} className="border border-neutral-200 p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-3 gap-2">
                      <div className="flex-1 min-w-0 w-full sm:w-auto">
                        <h3 className="font-semibold text-neutral-900 mb-1 text-sm sm:text-base">{project.title}</h3>
                        {project.hired ? (
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                              {project.freelancerAvatar}
                            </div>
                            <p className="text-xs sm:text-sm text-neutral-600 truncate">{project.freelancer}</p>
                          </div>
                        ) : (
                          <p className="text-xs sm:text-sm text-warning-600 font-medium">{project.proposals} proposal tersedia</p>
                        )}
                      </div>
                      <Badge variant={project.status === 'reviewing' ? 'warning' : 'primary'} className="text-xs whitespace-nowrap">
                        {project.status === 'reviewing' ? 'Reviewing' : 'In Progress'}
                      </Badge>
                    </div>

                    {project.hired && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs sm:text-sm mb-1">
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

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs sm:text-sm gap-2 mb-3">
                      <span className="text-neutral-600">Deadline: {formatDate(project.deadline)}</span>
                      <span className="font-semibold text-neutral-900">{project.budget}</span>
                    </div>

                    <div className="flex gap-2 mt-3">
                      {project.hired ? (
                        <>
                          <Link href={`/client/projects/${project.id}`} className="flex-1">
                            <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm">Detail</Button>
                          </Link>
                          <Link href={`/client/messages?chat=${project.id}`} className="flex-1">
                            <Button size="sm" className="w-full text-xs sm:text-sm">
                              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
                              <span className="hidden sm:inline">Chat</span>
                            </Button>
                          </Link>
                        </>
                      ) : (
                        <Link href={`/client/projects/${project.id}/proposals`} className="flex-1">
                          <Button className="w-full text-xs sm:text-sm" size="sm">
                            Review {project.proposals} Proposal
                          </Button>
                        </Link>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Recent Proposals */}
            <Card className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-3 sm:mb-4">Proposal Terbaru</h2>
              <div className="space-y-3 sm:space-y-4">
                {recentProposals.map((proposal) => (
                  <div key={proposal.id} className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-neutral-200 last:border-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      {proposal.freelancer.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0 w-full sm:w-auto">
                      <h4 className="font-semibold text-neutral-900 text-sm sm:text-base">{proposal.freelancer}</h4>
                      <p className="text-xs sm:text-sm text-neutral-600 mb-2 truncate">{proposal.project}</p>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-neutral-500">
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-warning-500 fill-warning-500" />
                          {proposal.rating}
                        </span>
                        <span>•</span>
                        <span>{proposal.experience} pengalaman</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="hidden sm:inline">{proposal.time}</span>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start w-full sm:w-auto gap-3 sm:gap-2">
                      <p className="font-semibold text-primary-600 text-sm sm:text-base">{proposal.budget}</p>
                      <Button variant="outline" size="sm" className="text-xs sm:text-sm">Review</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Upcoming Deadlines */}
            <Card className="p-4 sm:p-6">
              <h3 className="font-semibold text-neutral-900 mb-3 sm:mb-4 text-sm sm:text-base">Deadline Mendekati</h3>
              <div className="space-y-3">
                {upcomingDeadlines.map((item, index) => (
                  <div key={index} className="p-3 bg-neutral-50 rounded-lg">
                    <h4 className="font-medium text-neutral-900 text-xs sm:text-sm mb-1">{item.project}</h4>
                    <p className="text-xs text-neutral-600 mb-2">{item.freelancer}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-500 truncate">{formatDate(item.deadline)}</span>
                      <Badge variant={item.daysLeft <= 5 ? 'danger' : 'warning'} size="sm" className="ml-2 whitespace-nowrap">
                        {item.daysLeft} hari lagi
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Performance */}
            <Card className="p-4 sm:p-6">
              <h3 className="font-semibold text-neutral-900 mb-3 sm:mb-4 text-sm sm:text-base">Performa Bulan Ini</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-neutral-600">Proyek Selesai</span>
                  <span className="font-semibold text-sm sm:text-base">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-neutral-600">Rata-rata Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-warning-500 fill-warning-500" />
                    <span className="font-semibold text-sm sm:text-base">4.8</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-neutral-600">On-time Delivery</span>
                  <span className="font-semibold text-success-600 text-sm sm:text-base">96%</span>
                </div>
              </div>
            </Card>

            {/* Tips */}
            <Card className="bg-gradient-to-br from-primary-50 to-secondary-50 border-0 p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary-600 rounded-lg flex-shrink-0">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-neutral-900 mb-1 text-sm sm:text-base">Tips Produktif</h4>
                  <p className="text-xs sm:text-sm text-neutral-600">
                    Review proposal dengan cepat untuk mendapatkan freelancer terbaik sebelum diambil klien lain.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </ClientDashboardLayout>
  )
}
