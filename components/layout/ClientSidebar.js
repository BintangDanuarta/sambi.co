'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { 
  Home,
  Briefcase, 
  Settings,
  Bell,
  Plus,
  Menu,
  X
} from 'lucide-react'
import { notificationsApi } from '@/lib/api'

export default function ClientSidebar({ isOpen, onClose }) {
  const pathname = usePathname()
  const [unreadNotifications, setUnreadNotifications] = useState(0)
  
  // Load unread notifications count
  useEffect(() => {
    const loadUnreadCount = async () => {
      try {
        const count = await notificationsApi.getUnreadCount()
        setUnreadNotifications(count || 0)
      } catch (error) {
        // Silently fail
        setUnreadNotifications(0)
      }
    }
    
    loadUnreadCount()
  }, [])
  
  const menuItems = [
    { 
      icon: Home, 
      label: 'Beranda', 
      href: '/client/dashboard',
      highlight: true
    },
    { 
      icon: Briefcase, 
      label: 'Proyek', 
      href: '/client/projects' 
    },
    { 
      icon: Bell, 
      label: 'Notifikasi', 
      href: '/client/notifications',
      badge: unreadNotifications
    },
    { 
      icon: Settings, 
      label: 'Pengaturan', 
      href: '/client/settings' 
    },
  ]
  
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-primary-600 min-h-screen flex flex-col text-white
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <Link href="/client/dashboard" className="flex items-center">
            <img src="/images/logo-white.png" alt="Sambi.co" className="h-8 w-auto" />
          </Link>
          {/* Close button for mobile */}
          <button 
            className="lg:hidden p-2 hover:bg-primary-700 rounded-lg transition-colors"
            onClick={onClose}
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        
        {/* Client Badge */}
        <div className="mt-4 px-3 py-1.5 bg-secondary-600 rounded-full text-xs font-semibold text-center">
          💼 Client Account
        </div>
      </div>
      
      {/* Post Project Button */}
      <div className="px-4 mb-4">
        <Link href="/client/projects/post">
          <button className="w-full bg-warning-500 hover:bg-warning-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            Post Proyek
          </button>
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const isHighlight = item.highlight
          
          return (
            <Link
              key={index}
              href={item.href}
              onClick={() => onClose && onClose()}
              className={`
                flex items-center justify-between px-4 py-3 rounded-lg transition-colors relative
                ${isHighlight
                  ? 'bg-warning-500 text-white font-medium hover:bg-warning-600' 
                  : isActive 
                    ? 'bg-primary-700 text-white font-medium' 
                    : 'text-white/90 hover:bg-primary-700'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
              {item.badge > 0 && (
                <span className="bg-danger-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                  {item.badge > 9 ? '9+' : item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4">
        <Link
          href="/logout"
          onClick={() => onClose && onClose()}
          className="flex items-center gap-3 px-4 py-3 text-white/90 hover:bg-danger-600 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Keluar</span>
        </Link>
      </div>
    </aside>
    </>
  )
}

