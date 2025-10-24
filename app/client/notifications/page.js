'use client'

import { useState } from 'react'
import ClientDashboardLayout from '@/components/layout/ClientDashboardLayout'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { 
  Bell, 
  CheckCheck, 
  Trash2,
  Users,
  MessageCircle,
  DollarSign,
  Star,
  AlertCircle,
  FileText,
  CheckCircle
} from 'lucide-react'

export default function ClientNotificationsPage() {
  const [selectedTab, setSelectedTab] = useState('all')

  const tabs = [
    { id: 'all', label: 'Semua', count: 12 },
    { id: 'unread', label: 'Belum Dibaca', count: 5 },
    { id: 'proposals', label: 'Proposal', count: 4 },
    { id: 'projects', label: 'Proyek', count: 3 },
    { id: 'payments', label: 'Pembayaran', count: 2 },
  ]

  const notifications = [
    {
      id: 1,
      type: 'proposal',
      icon: Users,
      iconBg: 'bg-primary-100',
      iconColor: 'text-primary-600',
      title: 'Proposal Baru Diterima',
      message: 'Ahmad Hidayat mengirimkan proposal untuk proyek "Redesign Website Company Profile" dengan penawaran Rp 4.500.000.',
      time: '10 menit yang lalu',
      isRead: false,
      actionLabel: 'Review Proposal',
      actionUrl: '/client/projects/1/proposals',
    },
    {
      id: 2,
      type: 'proposal',
      icon: Users,
      iconBg: 'bg-primary-100',
      iconColor: 'text-primary-600',
      title: '3 Proposal Baru',
      message: 'Anda menerima 3 proposal baru untuk proyek "Develop Mobile App untuk Inventory".',
      time: '1 jam yang lalu',
      isRead: false,
      actionLabel: 'Lihat Semua',
      actionUrl: '/client/projects/2/proposals',
    },
    {
      id: 3,
      type: 'work',
      icon: FileText,
      iconBg: 'bg-secondary-100',
      iconColor: 'text-secondary-600',
      title: 'Freelancer Mengirim Hasil Kerja',
      message: 'Sarah Wijaya telah menyelesaikan dan mengirimkan hasil untuk proyek "Social Media Management". Silakan review.',
      time: '2 jam yang lalu',
      isRead: false,
      actionLabel: 'Review Hasil',
      actionUrl: '/client/projects/3/review',
    },
    {
      id: 4,
      type: 'message',
      icon: MessageCircle,
      iconBg: 'bg-success-100',
      iconColor: 'text-success-600',
      title: 'Pesan Baru',
      message: 'Budi Santoso mengirimkan pesan terkait proyek "Content Writing untuk Blog".',
      time: '3 jam yang lalu',
      isRead: false,
      actionLabel: 'Baca Pesan',
      actionUrl: '/client/messages',
    },
    {
      id: 5,
      type: 'milestone',
      icon: CheckCircle,
      iconBg: 'bg-success-100',
      iconColor: 'text-success-600',
      title: 'Milestone Tercapai',
      message: 'Ahmad Hidayat menyelesaikan milestone "Homepage Design" untuk proyek Redesign Website. Progress: 75%',
      time: '5 jam yang lalu',
      isRead: false,
      actionLabel: 'Lihat Progress',
      actionUrl: '/client/projects/1',
    },
    {
      id: 6,
      type: 'payment',
      icon: DollarSign,
      iconBg: 'bg-warning-100',
      iconColor: 'text-warning-600',
      title: 'Pembayaran Diproses',
      message: 'Pembayaran sebesar Rp 5.000.000 untuk proyek "Redesign Website" sedang diproses.',
      time: '1 hari yang lalu',
      isRead: true,
      actionLabel: 'Lihat Detail',
      actionUrl: '/client/projects/1',
    },
    {
      id: 7,
      type: 'review',
      icon: Star,
      iconBg: 'bg-warning-100',
      iconColor: 'text-warning-600',
      title: 'Reminder: Berikan Review',
      message: 'Proyek "Video Explainer" telah selesai. Berikan review untuk Rina Kusuma.',
      time: '1 hari yang lalu',
      isRead: true,
      actionLabel: 'Beri Review',
      actionUrl: '/client/projects/5/review',
    },
    {
      id: 8,
      type: 'payment',
      icon: DollarSign,
      iconBg: 'bg-warning-100',
      iconColor: 'text-warning-600',
      title: 'Pembayaran Berhasil',
      message: 'Pembayaran Rp 2.500.000 untuk Rina Kusuma telah berhasil diproses.',
      time: '2 hari yang lalu',
      isRead: true,
      actionLabel: 'Lihat Invoice',
      actionUrl: '#',
    },
    {
      id: 9,
      type: 'deadline',
      icon: AlertCircle,
      iconBg: 'bg-danger-100',
      iconColor: 'text-danger-600',
      title: 'Deadline Mendekat',
      message: 'Proyek "Content Writing untuk Blog" akan berakhir dalam 3 hari. Pastikan freelancer menyelesaikan tepat waktu.',
      time: '3 hari yang lalu',
      isRead: true,
      actionLabel: 'Lihat Proyek',
      actionUrl: '/client/projects/4',
    },
    {
      id: 10,
      type: 'project',
      icon: CheckCircle,
      iconBg: 'bg-success-100',
      iconColor: 'text-success-600',
      title: 'Proyek Selesai',
      message: 'Proyek "Video Explainer untuk Produk" telah selesai dan ditandai sebagai completed.',
      time: '1 minggu yang lalu',
      isRead: true,
      actionLabel: 'Lihat Detail',
      actionUrl: '/client/projects/5',
    },
  ]

  const filteredNotifications = notifications.filter(notif => {
    if (selectedTab === 'all') return true
    if (selectedTab === 'unread') return !notif.isRead
    if (selectedTab === 'proposals') return notif.type === 'proposal'
    if (selectedTab === 'projects') return ['milestone', 'work', 'project', 'deadline'].includes(notif.type)
    if (selectedTab === 'payments') return notif.type === 'payment'
    return true
  })

  const markAllAsRead = () => {
    console.log('Mark all as read')
  }

  const deleteNotification = (id) => {
    console.log('Delete notification:', id)
  }

  return (
    <ClientDashboardLayout title="Notifikasi" subtitle="Tetap update dengan aktivitas proyek Anda">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
                  ${selectedTab === tab.id 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
                  }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <CheckCheck className="w-4 h-4 mr-2" />
            Tandai Semua Dibaca
          </Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => {
              const Icon = notification.icon
              return (
                <Card 
                  key={notification.id} 
                  className={`${!notification.isRead ? 'border-l-4 border-l-primary-600 bg-primary-50/30' : ''}`}
                  hover
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full ${notification.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${notification.iconColor}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-neutral-900 mb-1">
                            {notification.title}
                            {!notification.isRead && (
                              <span className="ml-2 inline-block w-2 h-2 bg-primary-600 rounded-full"></span>
                            )}
                          </h3>
                          <p className="text-neutral-600 text-sm leading-relaxed">
                            {notification.message}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-2 text-neutral-400 hover:text-danger-600 transition-colors flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-500">{notification.time}</span>
                        {notification.actionLabel && (
                          <Button variant="ghost" size="sm">
                            {notification.actionLabel}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })
          ) : (
            <Card className="text-center py-12">
              <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-10 h-10 text-neutral-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Tidak Ada Notifikasi
              </h3>
              <p className="text-neutral-600">
                Anda sudah membaca semua notifikasi
              </p>
            </Card>
          )}
        </div>
      </div>
    </ClientDashboardLayout>
  )
}

