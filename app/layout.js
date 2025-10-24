import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sambi.co - Platform Freelance Mahasiswa',
  description: 'Platform freelance untuk menghubungkan mahasiswa dengan klien yang membutuhkan jasa profesional',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}

