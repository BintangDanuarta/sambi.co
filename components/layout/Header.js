'use client'

import { Search, Bell, Menu } from 'lucide-react'
import { useState } from 'react'

export default function Header({ title, subtitle, onMenuClick }) {
  const [searchQuery, setSearchQuery] = useState('')
  
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
            <button className="xl:hidden p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            {/* Notification */}
            <button className="relative p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full"></span>
            </button>
            
            {/* Profile */}
            <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-neutral-200">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-neutral-900">Client Demo</p>
                <p className="text-xs text-neutral-500">PT Digital Indonesia</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                CD
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

