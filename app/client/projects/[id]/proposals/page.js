'use client'

import { useState } from 'react'
import ClientDashboardLayout from '@/components/layout/ClientDashboardLayout'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { Star, Calendar, DollarSign, FileText, MessageCircle, CheckCircle } from 'lucide-react'

export default function ViewProposalsPage({ params }) {
  const [selectedProposal, setSelectedProposal] = useState(null)
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false)

  // Mock project data
  const project = {
    id: params.id,
    title: 'Redesign Website Company Profile',
    budget: 'Rp 3.000.000 - Rp 5.000.000',
    deadline: '30 hari',
  }

  // Mock proposals
  const proposals = [
    {
      id: 1,
      freelancer: {
        name: 'Ahmad Hidayat',
        avatar: 'AH',
        rating: 4.9,
        reviewsCount: 48,
        completedProjects: 52,
        university: 'Universitas Indonesia',
        major: 'Teknik Informatika',
        semester: 6,
      },
      coverLetter: 'Saya sangat tertarik dengan proyek ini. Saya memiliki pengalaman 3 tahun dalam web design dan telah menyelesaikan lebih dari 50 proyek sejenis. Portfolio saya menunjukkan hasil kerja yang profesional dan tepat waktu.',
      budget: 'Rp 4.500.000',
      timeline: '25 hari',
      skills: ['UI/UX Design', 'Figma', 'HTML/CSS', 'React'],
      portfolio: [
        { title: 'Company Profile PT XYZ', image: '/placeholder.jpg' },
        { title: 'E-commerce Website', image: '/placeholder.jpg' },
      ],
      submittedAt: '2 jam yang lalu',
    },
    {
      id: 2,
      freelancer: {
        name: 'Sarah Wijaya',
        avatar: 'SW',
        rating: 4.8,
        reviewsCount: 35,
        completedProjects: 38,
        university: 'Institut Teknologi Bandung',
        major: 'Desain Komunikasi Visual',
        semester: 7,
      },
      coverLetter: 'Halo! Saya adalah desainer UI/UX dengan spesialisasi dalam corporate website. Saya yakin dapat memberikan hasil terbaik untuk proyek company profile Anda dengan pendekatan yang modern dan user-friendly.',
      budget: 'Rp 4.000.000',
      timeline: '30 hari',
      skills: ['UI/UX Design', 'Adobe XD', 'Photoshop', 'WordPress'],
      portfolio: [
        { title: 'Corporate Website', image: '/placeholder.jpg' },
        { title: 'Landing Page Design', image: '/placeholder.jpg' },
      ],
      submittedAt: '5 jam yang lalu',
    },
    {
      id: 3,
      freelancer: {
        name: 'Budi Santoso',
        avatar: 'BS',
        rating: 4.7,
        reviewsCount: 28,
        completedProjects: 31,
        university: 'Universitas Gadjah Mada',
        major: 'Sistem Informasi',
        semester: 8,
      },
      coverLetter: 'Saya memiliki pengalaman kuat dalam web development dan design. Dengan background sistem informasi, saya memahami kebutuhan bisnis dan dapat mentransformasikannya ke dalam design yang efektif.',
      budget: 'Rp 3.800.000',
      timeline: '28 hari',
      skills: ['Web Design', 'Figma', 'Next.js', 'Tailwind CSS'],
      portfolio: [
        { title: 'Business Website', image: '/placeholder.jpg' },
      ],
      submittedAt: '1 hari yang lalu',
    },
  ]

  const handleAcceptProposal = (proposal) => {
    setSelectedProposal(proposal)
    setIsAcceptModalOpen(true)
  }

  const confirmHire = () => {
    // TODO: Call API to hire freelancer
    console.log('Hiring freelancer:', selectedProposal)
    setIsAcceptModalOpen(false)
  }

  return (
    <ClientDashboardLayout title="Review Proposal" subtitle={project.title}>
      <div className="space-y-6">
        {/* Project Info */}
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">{project.title}</h2>
              <div className="flex items-center gap-4 text-sm text-neutral-600">
                <span className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  Budget: {project.budget}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Durasi: {project.deadline}
                </span>
              </div>
            </div>
            <Badge variant="warning">{proposals.length} Proposal</Badge>
          </div>
        </Card>

        {/* Proposals List */}
        <div className="space-y-4">
          {proposals.map((proposal) => (
            <Card key={proposal.id} hover>
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Freelancer Info */}
                <div className="lg:w-64 flex-shrink-0">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {proposal.freelancer.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900">{proposal.freelancer.name}</h3>
                      <p className="text-sm text-neutral-600">{proposal.freelancer.university}</p>
                      <p className="text-xs text-neutral-500">{proposal.freelancer.major}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Rating:</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-warning-500 fill-warning-500" />
                        <span className="font-semibold">{proposal.freelancer.rating}</span>
                        <span className="text-neutral-500">({proposal.freelancer.reviewsCount})</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Proyek:</span>
                      <span className="font-semibold">{proposal.freelancer.completedProjects}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {proposal.skills.map((skill, index) => (
                      <Badge key={index} variant="primary" size="sm">{skill}</Badge>
                    ))}
                  </div>
                </div>

                {/* Proposal Details */}
                <div className="flex-1">
                  <div className="mb-4">
                    <h4 className="font-semibold text-neutral-900 mb-2">Cover Letter</h4>
                    <p className="text-neutral-700 leading-relaxed">{proposal.coverLetter}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-primary-50 rounded-lg">
                      <p className="text-sm text-primary-700 mb-1">Budget Penawaran</p>
                      <p className="text-xl font-bold text-primary-900">{proposal.budget}</p>
                    </div>
                    <div className="p-3 bg-secondary-50 rounded-lg">
                      <p className="text-sm text-secondary-700 mb-1">Estimasi Waktu</p>
                      <p className="text-xl font-bold text-secondary-900">{proposal.timeline}</p>
                    </div>
                  </div>

                  {proposal.portfolio.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-neutral-900 mb-2">Portfolio</h4>
                      <div className="flex gap-2">
                        {proposal.portfolio.map((item, index) => (
                          <div key={index} className="w-32 h-24 bg-neutral-200 rounded-lg flex items-center justify-center text-xs text-neutral-600">
                            {item.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                    <span className="text-sm text-neutral-500">Dikirim {proposal.submittedAt}</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Kirim Pesan
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-1" />
                        Lihat Profil
                      </Button>
                      <Button size="sm" onClick={() => handleAcceptProposal(proposal)}>
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Hire
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {proposals.length === 0 && (
          <Card className="text-center py-12">
            <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-neutral-400" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Belum Ada Proposal
            </h3>
            <p className="text-neutral-600">
              Proposal dari freelancer akan muncul di sini
            </p>
          </Card>
        )}
      </div>

      {/* Accept Proposal Modal */}
      <Modal
        isOpen={isAcceptModalOpen}
        onClose={() => setIsAcceptModalOpen(false)}
        title="Hire Freelancer"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsAcceptModalOpen(false)}>
              Batal
            </Button>
            <Button onClick={confirmHire}>
              Ya, Hire Freelancer
            </Button>
          </>
        }
      >
        {selectedProposal && (
          <div className="space-y-4">
            <p className="text-neutral-700">
              Anda akan meng-hire <strong>{selectedProposal.freelancer.name}</strong> untuk proyek ini dengan budget:
            </p>
            <div className="p-4 bg-primary-50 rounded-lg">
              <p className="text-2xl font-bold text-primary-900">{selectedProposal.budget}</p>
              <p className="text-sm text-primary-700 mt-1">Estimasi: {selectedProposal.timeline}</p>
            </div>
            <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
              <h4 className="font-semibold text-warning-900 mb-2">Catatan Penting:</h4>
              <ul className="text-sm text-warning-800 space-y-1">
                <li>• Dana akan di-hold dalam escrow sampai proyek selesai</li>
                <li>• Freelancer akan mulai bekerja setelah Anda konfirmasi</li>
                <li>• Anda dapat berkomunikasi via chat internal</li>
                <li>• Review hasil kerja sebelum approve pembayaran</li>
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </ClientDashboardLayout>
  )
}

