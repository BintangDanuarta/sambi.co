'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

export default function DashboardLayout({ children, title, subtitle }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  return (
    <div className="flex min-h-screen bg-neutral-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          title={title} 
          subtitle={subtitle} 
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

