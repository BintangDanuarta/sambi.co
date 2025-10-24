import Link from 'next/link'
import { ArrowRight, CheckCircle, Users, Briefcase, Shield } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-neutral-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="/images/logo.png" alt="Sambi.co" className="h-8 w-auto" />
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-neutral-600 hover:text-primary-600 transition-colors">
                Fitur
              </Link>
              <Link href="#how-it-works" className="text-neutral-600 hover:text-primary-600 transition-colors">
                Cara Kerja
              </Link>
              <Link href="#about" className="text-neutral-600 hover:text-primary-600 transition-colors">
                Tentang
              </Link>
              <Link href="/login" className="text-neutral-600 hover:text-primary-600 transition-colors">
                Masuk
              </Link>
              <Link href="/register" className="btn btn-primary">
                Daftar Sekarang
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">
            Platform Freelance untuk{' '}
            <span className="text-primary-600">Mahasiswa Indonesia</span>
          </h1>
          <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            Sambi.co menghubungkan mahasiswa berbakat dengan klien yang membutuhkan 
            jasa profesional. Mulai karir freelance Anda hari ini!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="btn btn-primary text-lg px-8 py-3 flex items-center gap-2">
              Mulai Sekarang
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="#how-it-works" className="btn btn-outline text-lg px-8 py-3">
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Kenapa Memilih Sambi.co?
            </h2>
            <p className="text-neutral-600 text-lg">
              Platform yang dirancang khusus untuk mahasiswa
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Verifikasi Mahasiswa</h3>
              <p className="text-neutral-600">
                Hanya mahasiswa terverifikasi yang dapat bergabung, 
                memastikan kredibilitas dan profesionalitas
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Proyek Berkualitas</h3>
              <p className="text-neutral-600">
                Akses ke berbagai proyek menarik dari klien terpercaya 
                di berbagai bidang
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-success-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Pembayaran Aman</h3>
              <p className="text-neutral-600">
                Sistem escrow yang aman memastikan pembayaran Anda 
                terlindungi dengan baik
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Cara Kerja
            </h2>
            <p className="text-neutral-600 text-lg">
              Mulai menghasilkan dalam 4 langkah mudah
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: '1',
                  title: 'Daftar & Verifikasi',
                  description: 'Buat akun dan verifikasi status mahasiswa Anda dengan kartu mahasiswa atau surat keterangan kampus'
                },
                {
                  step: '2',
                  title: 'Lengkapi Profil',
                  description: 'Isi profil lengkap dengan keahlian, portofolio, dan pengalaman Anda untuk menarik klien'
                },
                {
                  step: '3',
                  title: 'Cari & Apply Proyek',
                  description: 'Telusuri proyek yang sesuai dengan keahlian Anda dan kirimkan proposal menarik'
                },
                {
                  step: '4',
                  title: 'Kerjakan & Terima Pembayaran',
                  description: 'Selesaikan proyek dengan baik dan terima pembayaran langsung ke rekening Anda'
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Siap Memulai Perjalanan Freelance Anda?
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            Bergabung dengan ribuan mahasiswa yang telah menghasilkan dari skill mereka
          </p>
          <Link href="/register" className="btn bg-white text-primary-600 hover:bg-primary-50 text-lg px-8 py-3 inline-flex items-center gap-2">
            Daftar Gratis Sekarang
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <span className="text-xl font-bold text-white">Sambi.co</span>
              </div>
              <p className="text-sm">
                Platform freelance terpercaya untuk mahasiswa Indonesia
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Tentang Kami</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Cara Kerja</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Karir</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Dukungan</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Pusat Bantuan</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Kebijakan Privasi</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Kontak</h4>
              <ul className="space-y-2 text-sm">
                <li>Email: bintang@satu.kop.id</li>
                <li>WhatsApp: +62 856 270 0564</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neutral-800 pt-8 text-center text-sm">
            <p>&copy; 2025 Sambi.co. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}


