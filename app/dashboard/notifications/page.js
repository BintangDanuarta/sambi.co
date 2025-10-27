'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { 
  Bell, 
  CheckCheck, 
  Trash2,
  Briefcase,
  MessageCircle,
  DollarSign,
  Star,
  AlertCircle,
  Loader
} from 'lucide-react'
import { notificationsApi } from '@/lib/api'
import Link from 'next/link'

export default function NotificationsPage() {
  const [selectedTab, setSelectedTab] = useState('all')
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadNotifications()
  }, [])

  const loadNotifications = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await notificationsApi.getAll()
      setNotifications(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to load notifications:', error)
      setError(error.message || 'Gagal memuat notifikasi')
      setNotifications([])
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'all', label: 'Semua' },
    { id: 'unread', label: 'Belum Dibaca' },
    { id: 'project', label: 'Proyek' },
    { id: 'payment', label: 'Pembayaran' },
  ]

  const filteredNotifications = notifications.filter(notif => {
    if (selectedTab === 'all') return true
    if (selectedTab === 'unread') return !notif.is_read
    if (selectedTab === 'project') return notif.type === 'project' || notif.type === 'project_accepted' || notif.type === 'project_completed'
    if (selectedTab === 'payment') return notif.type === 'payment' || notif.type === 'payment_received'
    return true
  })

  const markAllAsRead = async () => {
    try {
      await notificationsApi.markAllAsRead()
      loadNotifications() // Reload
    } catch (error) {
      alert(error.message || 'Gagal menandai semua dibaca')
    }
  }

  const markAsRead = async (id) => {
    try {
      await notificationsApi.markAsRead(id)
      loadNotifications() // Reload
    } catch (error) {
      console.error('Failed to mark as read:', error)
    }
  }

  const deleteNotification = async (id) => {
    if (!confirm('Hapus notifikasi ini?')) return
    try {
      await notificationsApi.delete(id)
      setNotifications(prev => prev.filter(n => n.id !== id))
    } catch (error) {
      alert(error.message || 'Gagal menghapus notifikasi')
    }
  }

  const getNotifIcon = (type) => {
    const iconMap = {
      project: { icon: Briefcase, bg: 'bg-primary-100', color: 'text-primary-600' },
      project_accepted: { icon: Briefcase, bg: 'bg-success-100', color: 'text-success-600' },
      project_completed: { icon: Briefcase, bg: 'bg-primary-100', color: 'text-primary-600' },
      payment: { icon: DollarSign, bg: 'bg-success-100', color: 'text-success-600' },
      payment_received: { icon: DollarSign, bg: 'bg-success-100', color: 'text-success-600' },
      message: { icon: MessageCircle, bg: 'bg-secondary-100', color: 'text-secondary-600' },
      review: { icon: Star, bg: 'bg-warning-100', color: 'text-warning-600' },
      alert: { icon: AlertCircle, bg: 'bg-danger-100', color: 'text-danger-600' },
    }
    return iconMap[type] || iconMap.alert
  }

  return (
    <DashboardLayout title="Notifikasi" subtitle="Tetap update dengan aktivitas terbaru">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => {
              const count = tab.id === 'all' 
                ? notifications.length 
                : tab.id === 'unread'
                ? notifications.filter(n => !n.is_read).length
                : filteredNotifications.filter(n => n.type === tab.id).length
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
                    ${selectedTab === tab.id 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
                    }`}
                >
                  {tab.label} {!loading && `(${count})`}
                </button>
              )
            })}
          </div>
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <CheckCheck className="w-4 h-4 mr-2" />
            Tandai Semua Dibaca
          </Button>
        </div>

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

        {/* Notifications List */}
        {!loading && (
          <div className="space-y-3">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => {
                const iconData = getNotifIcon(notification.type)
                const Icon = iconData.icon
                
                return (
                  <Card 
                    key={notification.id} 
                    className={`${!notification.is_read ? 'border-l-4 border-l-primary-600 bg-primary-50/30' : ''}`}
                    hover
                    onClick={() => !notification.is_read && markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full ${iconData.bg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-6 h-6 ${iconData.color}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-neutral-900 mb-1">
                              {notification.title}
                              {!notification.is_read && (
                                <span className="ml-2 inline-block w-2 h-2 bg-primary-600 rounded-full"></span>
                              )}
                            </h3>
                            <p className="text-neutral-600 text-sm leading-relaxed">
                              {notification.body || notification.message || 'Notifikasi'}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteNotification(notification.id)
                            }}
                            className="p-2 text-neutral-400 hover:text-danger-600 transition-colors flex-shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-neutral-500">
                            {notification.created_at ? new Date(notification.created_at).toLocaleString('id-ID') : 'Baru saja'}
                          </span>
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
                  {selectedTab === 'unread' 
                    ? 'Anda sudah membaca semua notifikasi' 
                    : 'Belum ada notifikasi untuk ditampilkan'}
                </p>
              </Card>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
