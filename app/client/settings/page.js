'use client'

import { useState } from 'react'
import ClientDashboardLayout from '@/components/layout/ClientDashboardLayout'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import { Settings, User, Lock, Bell, CreditCard, Shield, Building } from 'lucide-react'

export default function ClientSettingsPage() {
  const [activeSection, setActiveSection] = useState('company')

  const sections = [
    { id: 'company', label: 'Profil Perusahaan', icon: Building },
    { id: 'account', label: 'Akun', icon: User },
    { id: 'security', label: 'Keamanan', icon: Lock },
    { id: 'notifications', label: 'Notifikasi', icon: Bell },
    { id: 'payment', label: 'Pembayaran', icon: CreditCard },
    { id: 'privacy', label: 'Privasi', icon: Shield },
  ]

  return (
    <ClientDashboardLayout title="Pengaturan" subtitle="Kelola preferensi akun Anda">
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
          {activeSection === 'company' && (
            <Card>
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Profil Perusahaan</h2>
              <div className="space-y-4">
                <Input label="Nama Perusahaan" defaultValue="PT Digital Indonesia" />
                <Input label="Email Perusahaan" type="email" defaultValue="contact@digitalindonesia.com" />
                <Input label="Nomor Telepon" type="tel" defaultValue="+62 21 1234 5678" />
                <Input label="Website" type="url" defaultValue="https://digitalindonesia.com" />
                
                <Textarea 
                  label="Deskripsi Perusahaan" 
                  rows={4}
                  defaultValue="Kami adalah perusahaan teknologi yang fokus pada transformasi digital untuk bisnis Indonesia."
                  helperText="Deskripsi ini akan terlihat di profil perusahaan Anda"
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="Industri" defaultValue="Technology" />
                  <Input label="Ukuran Perusahaan" defaultValue="51-200 karyawan" />
                </div>

                <Input label="Alamat" defaultValue="Jl. Sudirman No. 123, Jakarta" />

                <div className="pt-4">
                  <Button>Simpan Perubahan</Button>
                </div>
              </div>
            </Card>
          )}

          {activeSection === 'account' && (
            <Card>
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Pengaturan Akun</h2>
              <div className="space-y-4">
                <Input label="Nama Lengkap" defaultValue="John Doe" />
                <Input label="Email" type="email" defaultValue="john@digitalindonesia.com" disabled />
                <Input label="Nomor Telepon" type="tel" defaultValue="+62 812 3456 7890" />
                <Input label="Posisi/Jabatan" defaultValue="HR Manager" />
                
                <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
                  <p className="text-sm text-neutral-600">
                    <strong>Member sejak:</strong> Januari 2024
                  </p>
                  <p className="text-sm text-neutral-600 mt-1">
                    <strong>Account Type:</strong> Client - Business
                  </p>
                </div>

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
                    Tambahkan lapisan keamanan ekstra ke akun perusahaan Anda
                  </p>
                  <Button variant="outline">Aktifkan 2FA</Button>
                </div>

                <div className="pt-6 border-t border-neutral-200">
                  <h3 className="font-semibold text-neutral-900 mb-4">Sesi Aktif</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <div>
                        <p className="font-medium text-neutral-900">Windows PC - Chrome</p>
                        <p className="text-sm text-neutral-600">Jakarta, Indonesia • Sesi ini</p>
                      </div>
                      <span className="text-sm text-success-600 font-medium">● Active</span>
                    </div>
                  </div>
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
                  { label: 'Proposal Baru', description: 'Ketika ada freelancer yang apply ke proyek Anda' },
                  { label: 'Freelancer Submit Work', description: 'Ketika freelancer mengirimkan hasil kerja' },
                  { label: 'Pesan Baru', description: 'Pesan baru dari freelancer' },
                  { label: 'Milestone Proyek', description: 'Update terkait progress proyek' },
                  { label: 'Pembayaran', description: 'Konfirmasi pembayaran dan invoice' },
                  { label: 'Newsletter', description: 'Tips dan update dari Sambi.co' },
                  { label: 'Promosi', description: 'Informasi promo dan fitur baru' },
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
                        <p className="text-sm text-neutral-500">**** **** **** 5678</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-success-100 text-success-600 text-xs font-medium rounded">Primary</span>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-neutral-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-neutral-600 rounded-lg flex items-center justify-center text-white font-bold">
                        💳
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900">Visa **** 1234</p>
                        <p className="text-sm text-neutral-500">Expires 12/2025</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>

                <Button variant="outline">+ Tambah Metode Pembayaran</Button>

                <div className="pt-6 border-t border-neutral-200">
                  <h3 className="font-semibold text-neutral-900 mb-4">Billing Information</h3>
                  <div className="space-y-4">
                    <Input label="NPWP" defaultValue="12.345.678.9-012.000" />
                    <Input label="Nama Perusahaan (Billing)" defaultValue="PT Digital Indonesia" />
                    <Textarea label="Alamat Billing" rows={3} defaultValue="Jl. Sudirman No. 123, Jakarta 12190" />
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeSection === 'privacy' && (
            <Card>
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Privasi</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Visibilitas Profil</h3>
                  <p className="text-neutral-600 mb-4">Kontrol siapa yang dapat melihat profil perusahaan Anda</p>
                  <select className="w-full px-4 py-2 border border-neutral-300 rounded-lg">
                    <option>Publik - Semua freelancer</option>
                    <option>Verified Students Only</option>
                    <option>Privat</option>
                  </select>
                </div>

                <div className="pt-6 border-t border-neutral-200">
                  <h3 className="font-semibold text-neutral-900 mb-4">Data & Privacy</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      Download Data Perusahaan
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Export Riwayat Proyek
                    </Button>
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-200">
                  <h3 className="font-semibold text-neutral-900 mb-4 text-danger-600">Danger Zone</h3>
                  <div className="p-4 border border-danger-200 rounded-lg">
                    <h4 className="font-medium text-neutral-900 mb-2">Nonaktifkan Akun</h4>
                    <p className="text-sm text-neutral-600 mb-4">
                      Akun perusahaan Anda akan dinonaktifkan sementara. Anda dapat mengaktifkan kembali kapan saja.
                    </p>
                    <Button variant="outline" size="sm">Nonaktifkan Akun</Button>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </ClientDashboardLayout>
  )
}

