'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home,
  Search, 
  MessageCircle, 
  User,
  Menu
} from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()
  
  const menuItems = [
    { 
      icon: Home, 
      label: 'Beranda', 
      href: '/dashboard',
      highlight: true
    },
    { 
      icon: Search, 
      label: 'Cari Proyek', 
      href: '/dashboard/projects/browse' 
    },
    { 
      icon: MessageCircle, 
      label: 'Pesan', 
      href: '/dashboard/messages',
      badge: 2
    },
    { 
      icon: User, 
      label: 'Profil', 
      href: '/dashboard/profile' 
    },
  ]
  
  return (
    <aside className="w-64 bg-primary-600 min-h-screen flex flex-col text-white">
      {/* Logo */}
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center justify-between">
          <img src="/images/logo-white.png" alt="Sambi.co" className="h-8 w-auto" />
          <button className="p-2 bg-warning-500 rounded-lg hover:bg-warning-600 transition-colors">
            <Menu className="w-5 h-5 text-white" />
          </button>
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          const isHighlight = item.highlight
          
          return (
            <Link
              key={index}
              href={item.href}
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
              {item.badge && (
                <span className="bg-danger-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
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
          className="flex items-center gap-3 px-4 py-3 text-white/90 hover:bg-danger-600 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Keluar</span>
        </Link>
      </div>
    </aside>
  )
}

