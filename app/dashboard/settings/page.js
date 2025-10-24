'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Settings, Bell, Lock, User, CreditCard, Shield } from 'lucide-react'

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('account')

  const sections = [
    { id: 'account', label: 'Akun', icon: User },
    { id: 'security', label: 'Keamanan', icon: Lock },
    { id: 'notifications', label: 'Notifikasi', icon: Bell },
    { id: 'payment', label: 'Pembayaran', icon: CreditCard },
    { id: 'privacy', label: 'Privasi', icon: Shield },
  ]

  return (
    <DashboardLayout title="Pengaturan" subtitle="Kelola preferensi akun Anda">
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card padding="sm">
            <nav className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left
                      ${activeSection === section.id
                        ? 'bg-primary-50 text-primary-600 font-medium'
                        : 'text-neutral-600 hover:bg-neutral-50'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{section.label}</span>
                  </button>
                )
              })}
            </nav>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeSection === 'account' && (
            <Card>
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Pengaturan Akun</h2>
              <div className="space-y-4">
                <Input label="Nama Lengkap" defaultValue="Mahasiswa Demo" />
                <Input label="Email" type="email" defaultValue="mahasiswa@demo.com" disabled />
                <Input label="Nomor Telepon" type="tel" defaultValue="+62 812 3456 7890" />
                <div className="pt-4">
                  <Button>Simpan Perubahan</Button>
                </div>
              </div>
            </Card>
          )}

          {activeSection === 'security' && (
            <Card>
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Keamanan</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-4">Ubah Password</h3>
                  <div className="space-y-4">
                    <Input label="Password Lama" type="password" />
                    <Input label="Password Baru" type="password" />
                    <Input label="Konfirmasi Password Baru" type="password" />
                    <Button>Update Password</Button>
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-200">
                  <h3 className="font-semibold text-neutral-900 mb-4">Two-Factor Authentication</h3>
                  <p className="text-neutral-600 mb-4">
                    Tambahkan lapisan keamanan ekstra ke akun Anda
                  </p>
                  <Button variant="outline">Aktifkan 2FA</Button>
                </div>
              </div>
            </Card>
          )}

          {activeSection === 'notifications' && (
            <Card>
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Preferensi Notifikasi</h2>
              <div className="space-y-4">
                {[
                  { label: 'Notifikasi Email', description: 'Terima notifikasi melalui email' },
                  { label: 'Notifikasi Proyek Baru', description: 'Proyek yang sesuai dengan keahlian Anda' },
                  { label: 'Notifikasi Pembayaran', description: 'Update terkait pembayaran dan penarikan' },
                  { label: 'Notifikasi Pesan', description: 'Pesan baru dari klien' },
                  { label: 'Newsletter', description: 'Tips dan update dari Sambi.co' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div>
                      <p className="font-medium text-neutral-900">{item.label}</p>
                      <p className="text-sm text-neutral-600">{item.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeSection === 'payment' && (
            <Card>
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Metode Pembayaran</h2>
              <div className="space-y-4">
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
                        BCA
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900">Bank Central Asia</p>
                        <p className="text-sm text-neutral-500">**** **** **** 1234</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
                <Button variant="outline">+ Tambah Rekening</Button>
              </div>
            </Card>
          )}

          {activeSection === 'privacy' && (
            <Card>
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Privasi</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Visibilitas Profil</h3>
                  <p className="text-neutral-600 mb-4">Kontrol siapa yang dapat melihat profil Anda</p>
                  <select className="w-full px-4 py-2 border border-neutral-300 rounded-lg">
                    <option>Publik - Semua orang</option>
                    <option>Klien Terverifikasi</option>
                    <option>Privat</option>
                  </select>
                </div>

                <div className="pt-6 border-t border-neutral-200">
                  <h3 className="font-semibold text-neutral-900 mb-4 text-danger-600">Danger Zone</h3>
                  <div className="p-4 border border-danger-200 rounded-lg">
                    <h4 className="font-medium text-neutral-900 mb-2">Nonaktifkan Akun</h4>
                    <p className="text-sm text-neutral-600 mb-4">
                      Akun Anda akan dinonaktifkan sementara dan bisa diaktifkan kembali kapan saja
                    </p>
                    <Button variant="outline" size="sm">Nonaktifkan Akun</Button>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}


