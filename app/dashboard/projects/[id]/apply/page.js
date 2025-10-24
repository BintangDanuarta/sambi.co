'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Badge from '@/components/ui/Badge'
import { Upload, X, FileText, CheckCircle, CreditCard, Wallet } from 'lucide-react'

export default function ApplyProjectPage({ params }) {
  const router = useRouter()
  const [step, setStep] = useState(1) // 1: Proposal, 2: Checkout/Payment
  const [proposalData, setProposalData] = useState({
    coverLetter: '',
    estimatedTime: '',
    budget: '',
    attachments: [],
  })
  const [paymentMethod, setPaymentMethod] = useState('wallet')

  // Mock project data
  const project = {
    id: params.id,
    title: 'Desain UI/UX untuk Aplikasi Mobile Banking',
    client: 'PT Bank Digital',
    budget: 'Rp 3.000.000 - Rp 5.000.000',
    applicationFee: 50000, // Rp 50.000 application fee
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setProposalData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }))
  }

  const removeFile = (index) => {
    setProposalData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }))
  }

  const handleSubmitProposal = (e) => {
    e.preventDefault()
    setStep(2) // Move to payment step
  }

  const handlePayment = () => {
    // TODO: Process payment via API
    console.log('Processing payment:', paymentMethod)
    router.push('/dashboard/projects?applied=true')
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  if (step === 2) {
    return (
      <DashboardLayout title="Checkout & Pembayaran" subtitle="Selesaikan pembayaran untuk apply proyek">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Payment Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">Pilih Metode Pembayaran</h2>
                
                <div className="space-y-3">
                  {/* Wallet */}
                  <button
                    onClick={() => setPaymentMethod('wallet')}
                    className={`w-full p-4 border-2 rounded-lg transition-all text-left ${
                      paymentMethod === 'wallet'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-neutral-300 hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        paymentMethod === 'wallet' ? 'bg-primary-600' : 'bg-neutral-200'
                      }`}>
                        <Wallet className={`w-6 h-6 ${paymentMethod === 'wallet' ? 'text-white' : 'text-neutral-600'}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-neutral-900">Sambi Wallet</h4>
                        <p className="text-sm text-neutral-600">Saldo: Rp 150.000</p>
                      </div>
                      {paymentMethod === 'wallet' && (
                        <CheckCircle className="w-6 h-6 text-primary-600" />
                      )}
                    </div>
                  </button>

                  {/* Credit Card */}
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`w-full p-4 border-2 rounded-lg transition-all text-left ${
                      paymentMethod === 'card'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-neutral-300 hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        paymentMethod === 'card' ? 'bg-primary-600' : 'bg-neutral-200'
                      }`}>
                        <CreditCard className={`w-6 h-6 ${paymentMethod === 'card' ? 'text-white' : 'text-neutral-600'}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-neutral-900">Kartu Kredit/Debit</h4>
                        <p className="text-sm text-neutral-600">Visa, Mastercard, dll</p>
                      </div>
                      {paymentMethod === 'card' && (
                        <CheckCircle className="w-6 h-6 text-primary-600" />
                      )}
                    </div>
                  </button>

                  {/* Bank Transfer */}
                  <button
                    onClick={() => setPaymentMethod('bank')}
                    className={`w-full p-4 border-2 rounded-lg transition-all text-left ${
                      paymentMethod === 'bank'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-neutral-300 hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        paymentMethod === 'bank' ? 'bg-primary-600' : 'bg-neutral-200'
                      }`}>
                        <span className={`text-xl font-bold ${paymentMethod === 'bank' ? 'text-white' : 'text-neutral-600'}`}>
                          🏦
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-neutral-900">Transfer Bank</h4>
                        <p className="text-sm text-neutral-600">BCA, Mandiri, BNI, BRI</p>
                      </div>
                      {paymentMethod === 'bank' && (
                        <CheckCircle className="w-6 h-6 text-primary-600" />
                      )}
                    </div>
                  </button>
                </div>

                {/* Info */}
                <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
                  <h4 className="font-semibold text-primary-900 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Pembayaran Aman
                  </h4>
                  <p className="text-sm text-primary-800">
                    Pembayaran Anda dilindungi dengan enkripsi SSL dan sistem keamanan berlapis.
                    Biaya application fee akan dikembalikan jika proposal Anda tidak diterima.
                  </p>
                </div>
              </Card>

              <div className="flex gap-4">
                <Button variant="ghost" className="flex-1" onClick={() => setStep(1)}>
                  Kembali
                </Button>
                <Button className="flex-1" onClick={handlePayment}>
                  Bayar {formatCurrency(project.applicationFee)}
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <Card>
                <h3 className="font-semibold text-neutral-900 mb-4">Ringkasan Pesanan</h3>
                
                <div className="space-y-4 mb-6 pb-6 border-b border-neutral-200">
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Proyek</p>
                    <p className="font-medium text-neutral-900">{project.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Klien</p>
                    <p className="font-medium text-neutral-900">{project.client}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Budget Proyek</p>
                    <p className="font-medium text-neutral-900">{project.budget}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Application Fee</span>
                    <span className="font-medium">{formatCurrency(project.applicationFee)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Biaya Admin</span>
                    <span className="font-medium">Rp 0</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-200">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-semibold text-neutral-900">Total</span>
                    <span className="text-2xl font-bold text-primary-600">
                      {formatCurrency(project.applicationFee)}
                    </span>
                  </div>
                </div>

                <Badge variant="warning" className="w-full justify-center">
                  💡 Fee dikembalikan jika ditolak
                </Badge>
              </Card>
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Apply Proyek" subtitle="Kirim proposal Anda untuk proyek ini">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">{project.title}</h2>
          <div className="flex items-center gap-4 text-sm">
            <Badge variant="neutral">{project.client}</Badge>
            <span className="text-neutral-600">Budget: {project.budget}</span>
          </div>
        </Card>

        <Card>
          <form onSubmit={handleSubmitProposal} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Proposal Anda</h3>
              
              <Textarea
                label="Cover Letter"
                placeholder="Jelaskan mengapa Anda cocok untuk proyek ini, pengalaman relevan, dan pendekatan yang akan Anda gunakan..."
                rows={8}
                value={proposalData.coverLetter}
                onChange={(e) => setProposalData(prev => ({ ...prev, coverLetter: e.target.value }))}
                helperText="Minimal 100 karakter"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Estimasi Waktu Pengerjaan"
                type="number"
                placeholder="14"
                helperText="Dalam hari"
                value={proposalData.estimatedTime}
                onChange={(e) => setProposalData(prev => ({ ...prev, estimatedTime: e.target.value }))}
                required
              />
              <Input
                label="Budget Penawaran"
                type="number"
                placeholder="3500000"
                helperText="Dalam Rupiah"
                value={proposalData.budget}
                onChange={(e) => setProposalData(prev => ({ ...prev, budget: e.target.value }))}
                required
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Portfolio / Dokumen Pendukung
              </label>
              <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
                <input
                  type="file"
                  id="attachments"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <label htmlFor="attachments" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                  <p className="text-neutral-900 font-medium mb-2">
                    <span className="text-primary-600">Klik untuk upload</span> atau drag and drop
                  </p>
                  <p className="text-sm text-neutral-500">
                    PDF, DOC, JPG, PNG (Max. 10MB per file)
                  </p>
                </label>
              </div>

              {proposalData.attachments.length > 0 && (
                <div className="mt-4 space-y-2">
                  {proposalData.attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary-600" />
                        <span className="text-sm text-neutral-900">{file.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-neutral-400 hover:text-danger-600 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-4 bg-warning-50 border border-warning-200 rounded-lg">
              <h4 className="font-semibold text-warning-900 mb-2">Application Fee</h4>
              <p className="text-sm text-warning-800 mb-2">
                Untuk apply proyek ini, diperlukan biaya application fee sebesar {formatCurrency(project.applicationFee)}.
                Biaya ini akan dikembalikan jika proposal Anda tidak diterima oleh klien.
              </p>
              <p className="text-xs text-warning-700">
                Fee ini membantu memastikan proposal yang masuk berkualitas dan serius.
              </p>
            </div>

            <div className="flex gap-4">
              <Button type="button" variant="ghost" className="flex-1" onClick={() => router.back()}>
                Batal
              </Button>
              <Button type="submit" className="flex-1">
                Lanjut ke Pembayaran
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  )
}

