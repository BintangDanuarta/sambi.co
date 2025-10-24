import DashboardLayout from '@/components/layout/DashboardLayout'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import { Search, Filter, Clock, Users, Briefcase } from 'lucide-react'

export default function BrowseProjectsPage() {
  const categories = [
    { id: 'all', label: 'Semua', count: 45 },
    { id: 'design', label: 'Design', count: 12 },
    { id: 'development', label: 'Development', count: 15 },
    { id: 'writing', label: 'Writing', count: 8 },
    { id: 'marketing', label: 'Marketing', count: 6 },
    { id: 'video', label: 'Video', count: 4 },
  ]

  const projects = [
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
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
                ${category.id === 'all' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
                }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between">
          <p className="text-neutral-600">
            Menampilkan <span className="font-semibold">{projects.length}</span> proyek
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6">
          {projects.map((project) => (
            <Card key={project.id} hover>
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Link href={`/dashboard/projects/browse/${project.id}`}>
                      <h3 className="text-xl font-semibold text-neutral-900 hover:text-primary-600 transition-colors mb-2">
                        {project.title}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-3 text-sm text-neutral-600">
                      <span className="font-medium">{project.client}</span>
                      <span className="flex items-center gap-1">
                        ⭐ {project.clientRating}
                      </span>
                    </div>
                  </div>
                  <Badge variant="neutral">{project.category}</Badge>
                </div>

                {/* Description */}
                <p className="text-neutral-600 leading-relaxed">{project.description}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, index) => (
                    <Badge key={index} variant="primary" size="sm">
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Footer Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-neutral-200">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
                    <span className="font-semibold text-primary-600 text-lg">
                      {project.budget}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {project.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {project.proposals} proposal
                    </span>
                    <span className="text-neutral-500">
                      {project.posted}
                    </span>
                  </div>
                  <Link href={`/dashboard/projects/browse/${project.id}/apply`}>
                    <Button>
                      Apply Sekarang
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

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

