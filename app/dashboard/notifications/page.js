'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { 
  Bell, 
  CheckCheck, 
  Trash2,
  Briefcase,
  MessageCircle,
  DollarSign,
  Star,
  AlertCircle
} from 'lucide-react'

export default function NotificationsPage() {
  const [selectedTab, setSelectedTab] = useState('all')

  const tabs = [
    { id: 'all', label: 'Semua', count: 8 },
    { id: 'unread', label: 'Belum Dibaca', count: 3 },
    { id: 'projects', label: 'Proyek', count: 4 },
    { id: 'payments', label: 'Pembayaran', count: 2 },
  ]

  const notifications = [
    {
      id: 1,
      type: 'project',
      icon: Briefcase,
      iconBg: 'bg-primary-100',
      iconColor: 'text-primary-600',
      title: 'Proposal Diterima',
      message: 'Selamat! Proposal Anda untuk proyek "Redesign Landing Page E-Commerce" telah diterima oleh PT Digital Indonesia.',
      time: '2 jam yang lalu',
      isRead: false,
      actionLabel: 'Lihat Proyek',
      actionUrl: '/dashboard/projects/1',
    },
    {
      id: 2,
      type: 'payment',
      icon: DollarSign,
      iconBg: 'bg-success-100',
      iconColor: 'text-success-600',
      title: 'Pembayaran Diterima',
      message: 'Pembayaran sebesar Rp 1.500.000 dari PT Digital Indonesia telah masuk ke dompet Anda.',
      time: '5 jam yang lalu',
      isRead: false,
      actionLabel: 'Lihat Dompet',
      actionUrl: '/dashboard/wallet',
    },
    {
      id: 3,
      type: 'message',
      icon: MessageCircle,
      iconBg: 'bg-secondary-100',
      iconColor: 'text-secondary-600',
      title: 'Pesan Baru',
      message: 'Startup FinTech mengirimkan pesan terkait proyek "Aplikasi Mobile Banking".',
      time: '1 hari yang lalu',
      isRead: false,
      actionLabel: 'Baca Pesan',
      actionUrl: '/dashboard/messages',
    },
    {
      id: 4,
      type: 'review',
      icon: Star,
      iconBg: 'bg-warning-100',
      iconColor: 'text-warning-600',
      title: 'Review Baru',
      message: 'PT Digital Indonesia memberikan review bintang 5 untuk proyek "Redesign Landing Page".',
      time: '1 hari yang lalu',
      isRead: true,
      actionLabel: 'Lihat Review',
      actionUrl: '/dashboard/profile',
    },
    {
      id: 5,
      type: 'project',
      icon: Briefcase,
      iconBg: 'bg-primary-100',
      iconColor: 'text-primary-600',
      title: 'Proyek Baru Cocok untuk Anda',
      message: 'Ada proyek baru "Desain UI/UX untuk Aplikasi Mobile" yang sesuai dengan keahlian Anda.',
      time: '2 hari yang lalu',
      isRead: true,
      actionLabel: 'Lihat Proyek',
      actionUrl: '/dashboard/projects/browse',
    },
    {
      id: 6,
      type: 'payment',
      icon: DollarSign,
      iconBg: 'bg-success-100',
      iconColor: 'text-success-600',
      title: 'Penarikan Dana Berhasil',
      message: 'Penarikan dana sebesar Rp 2.000.000 ke rekening BCA **** 1234 telah berhasil diproses.',
      time: '3 hari yang lalu',
      isRead: true,
      actionLabel: 'Lihat Detail',
      actionUrl: '/dashboard/wallet',
    },
    {
      id: 7,
      type: 'alert',
      icon: AlertCircle,
      iconBg: 'bg-danger-100',
      iconColor: 'text-danger-600',
      title: 'Deadline Mendekat',
      message: 'Proyek "Content Writing untuk Blog" akan berakhir dalam 3 hari. Segera selesaikan pekerjaan Anda.',
      time: '3 hari yang lalu',
      isRead: true,
      actionLabel: 'Lihat Proyek',
      actionUrl: '/dashboard/projects/3',
    },
    {
      id: 8,
      type: 'project',
      icon: Briefcase,
      iconBg: 'bg-primary-100',
      iconColor: 'text-primary-600',
      title: 'Proyek Selesai',
      message: 'Proyek "Video Editing untuk YouTube" telah selesai. Terima kasih atas kerja keras Anda!',
      time: '1 minggu yang lalu',
      isRead: true,
      actionLabel: 'Lihat Proyek',
      actionUrl: '/dashboard/projects/4',
    },
  ]

  const filteredNotifications = notifications.filter(notif => {
    if (selectedTab === 'all') return true
    if (selectedTab === 'unread') return !notif.isRead
    if (selectedTab === 'projects') return notif.type === 'project'
    if (selectedTab === 'payments') return notif.type === 'payment'
    return true
  })

  const markAllAsRead = () => {
    // TODO: Implement mark all as read API
    console.log('Mark all as read')
  }

  const deleteNotification = (id) => {
    // TODO: Implement delete notification API
    console.log('Delete notification:', id)
  }

  return (
    <DashboardLayout title="Notifikasi" subtitle="Tetap update dengan aktivitas terbaru">
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
    </DashboardLayout>
  )
}

