'use client'

import { Search, Bell, Menu } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { notificationsApi } from '@/lib/api'

export default function Header({ title, subtitle, onMenuClick }) {
  const router = useRouter()
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [unreadCount, setUnreadCount] = useState(0)
  
  // Load unread notifications count
  useEffect(() => {
    const loadUnreadCount = async () => {
      try {
        const count = await notificationsApi.getUnreadCount()
        setUnreadCount(count || 0)
      } catch (error) {
        // Silently fail, just don't show badge
        setUnreadCount(0)
      }
    }
    
    if (user) {
      loadUnreadCount()
    }
  }, [user])
  
  // Get user initials
  const getInitials = (name) => {
    if (!name) return '??'
    const parts = name.split(' ')
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }
  
  // Get user role label
  const getRoleLabel = () => {
    if (!user) return ''
    if (user.role === 'klien' || user.roles_id === 2) return 'Client'
    return 'Mahasiswa'
  }
  
  const handleNotificationClick = () => {
    if (user?.role === 'klien' || user?.roles_id === 2) {
      router.push('/client/notifications')
    } else {
      router.push('/dashboard/notifications')
    }
  }
  
  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Left side - Menu & Title */}
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            {/* Mobile menu button */}
            <button 
              className="lg:hidden text-neutral-600 hover:text-neutral-900 p-2 -ml-2"
              onClick={onMenuClick}
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Title */}
            <div className="min-w-0">
              {title && <h1 className="text-lg sm:text-2xl font-bold text-neutral-900 truncate">{title}</h1>}
              {subtitle && <p className="text-xs sm:text-sm text-neutral-500 mt-1 truncate hidden sm:block">{subtitle}</p>}
            </div>
          </div>
          
          {/* Right side - Search and Profile */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search */}
            <div className="hidden xl:flex items-center bg-neutral-100 rounded-lg px-4 py-2 w-64">
              <Search className="w-5 h-5 text-neutral-400 mr-2" />
              <input
                type="text"
                placeholder="Cari proyek, freelancer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none flex-1 text-sm text-neutral-900 placeholder-neutral-400"
              />
            </div>
            
            {/* Mobile Search Button */}
            <button 
              className="xl:hidden p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            
            {/* Notification */}
            <button 
              className="relative p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
              onClick={handleNotificationClick}
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-danger-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            
            {/* Profile */}
            <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-neutral-200">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-neutral-900">
                  {user?.fullName || user?.full_name || user?.username || 'User'}
                </p>
                <p className="text-xs text-neutral-500">{getRoleLabel()}</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {getInitials(user?.fullName || user?.full_name || user?.username)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

