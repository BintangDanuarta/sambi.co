import Sidebar from './Sidebar'
import Header from './Header'

export default function DashboardLayout({ children, title, subtitle }) {
  return (
    <div className="flex min-h-screen bg-neutral-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title={title} subtitle={subtitle} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

