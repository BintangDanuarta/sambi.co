'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Modal from '@/components/ui/Modal'
import { 
  Wallet, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownLeft,
  CreditCard,
  Download,
  Eye,
  EyeOff
} from 'lucide-react'

export default function WalletPage() {
  const [showBalance, setShowBalance] = useState(true)
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState('')

  const balance = {
    total: 5250000,
    pending: 1500000,
    available: 3750000,
  }

  const transactions = [
    {
      id: 1,
      type: 'income',
      title: 'Payment dari PT Digital Indonesia',
      amount: 1500000,
      status: 'completed',
      date: '2025-10-20',
      project: 'Redesign Landing Page',
    },
    {
      id: 2,
      type: 'withdrawal',
      title: 'Penarikan ke Bank BCA',
      amount: 2000000,
      status: 'completed',
      date: '2025-10-18',
      bankAccount: '**** 1234',
    },
    {
      id: 3,
      type: 'income',
      title: 'Payment dari Startup FinTech',
      amount: 3000000,
      status: 'pending',
      date: '2025-10-15',
      project: 'Mobile App Design',
    },
    {
      id: 4,
      type: 'income',
      title: 'Payment dari CV Media Online',
      amount: 750000,
      status: 'completed',
      date: '2025-10-10',
      project: 'Content Writing',
    },
  ]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleWithdraw = () => {
    // TODO: Implement withdrawal API
    console.log('Withdraw:', withdrawAmount)
    setIsWithdrawModalOpen(false)
    setWithdrawAmount('')
  }

  return (
    <DashboardLayout title="Dompet" subtitle="Kelola penghasilan dan penarikan dana">
      <div className="space-y-6">
        {/* Balance Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-primary-600 to-primary-700 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-primary-100 text-sm mb-1">Total Saldo</p>
                <div className="flex items-center gap-2">
                  {showBalance ? (
                    <h3 className="text-3xl font-bold">{formatCurrency(balance.total)}</h3>
                  ) : (
                    <h3 className="text-3xl font-bold">Rp ••••••</h3>
                  )}
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="p-1 hover:bg-primary-500 rounded transition-colors"
                  >
                    {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div className="p-3 bg-white/20 rounded-lg">
                <Wallet className="w-6 h-6" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-primary-100">
              <TrendingUp className="w-4 h-4" />
              <span>+12.5% dari bulan lalu</span>
            </div>
          </Card>

          <Card hover>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-neutral-500 text-sm mb-1">Saldo Tersedia</p>
                <h3 className="text-2xl font-bold text-neutral-900">
                  {showBalance ? formatCurrency(balance.available) : 'Rp ••••••'}
                </h3>
              </div>
              <div className="p-3 bg-success-100 rounded-lg">
                <ArrowDownLeft className="w-6 h-6 text-success-600" />
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsWithdrawModalOpen(true)}
            >
              <Download className="w-4 h-4 mr-2" />
              Tarik Dana
            </Button>
          </Card>

          <Card hover>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-neutral-500 text-sm mb-1">Dana Pending</p>
                <h3 className="text-2xl font-bold text-neutral-900">
                  {showBalance ? formatCurrency(balance.pending) : 'Rp ••••••'}
                </h3>
              </div>
              <div className="p-3 bg-warning-100 rounded-lg">
                <ArrowUpRight className="w-6 h-6 text-warning-600" />
              </div>
            </div>
            <p className="text-sm text-neutral-500">Menunggu konfirmasi</p>
          </Card>
        </div>

        {/* Transactions */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-neutral-900">Riwayat Transaksi</h2>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center
                    ${transaction.type === 'income' 
                      ? 'bg-success-100' 
                      : 'bg-primary-100'
                    }
                  `}>
                    {transaction.type === 'income' ? (
                      <ArrowDownLeft className={`w-6 h-6 text-success-600`} />
                    ) : (
                      <ArrowUpRight className={`w-6 h-6 text-primary-600`} />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">{transaction.title}</p>
                    <p className="text-sm text-neutral-500">
                      {transaction.project || transaction.bankAccount} • {' '}
                      {new Date(transaction.date).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    transaction.type === 'income' ? 'text-success-600' : 'text-neutral-900'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </p>
                  <Badge 
                    variant={transaction.status === 'completed' ? 'success' : 'warning'}
                    size="sm"
                  >
                    {transaction.status === 'completed' ? 'Selesai' : 'Pending'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {transactions.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-10 h-10 text-neutral-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Belum Ada Transaksi
              </h3>
              <p className="text-neutral-600">
                Transaksi Anda akan muncul di sini
              </p>
            </div>
          )}
        </Card>

        {/* Bank Account Info */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900">Rekening Bank</h3>
            <Button variant="outline" size="sm">
              <CreditCard className="w-4 h-4 mr-2" />
              Tambah Rekening
            </Button>
          </div>
          <div className="p-4 bg-neutral-50 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
                BCA
              </div>
              <div className="flex-1">
                <p className="font-semibold text-neutral-900">Bank Central Asia</p>
                <p className="text-sm text-neutral-500">**** **** **** 1234</p>
              </div>
              <Badge variant="success">Primary</Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Withdrawal Modal */}
      <Modal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        title="Tarik Dana"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsWithdrawModalOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleWithdraw} disabled={!withdrawAmount || parseFloat(withdrawAmount) > balance.available}>
              Tarik Dana
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="p-4 bg-neutral-50 rounded-lg">
            <p className="text-sm text-neutral-600 mb-1">Saldo Tersedia</p>
            <p className="text-2xl font-bold text-neutral-900">{formatCurrency(balance.available)}</p>
          </div>

          <Input
            label="Jumlah Penarikan"
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            placeholder="Masukkan jumlah"
            helperText={`Minimal Rp 50.000 • Maksimal ${formatCurrency(balance.available)}`}
          />

          <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
            <h4 className="font-semibold text-primary-900 mb-2">Informasi Penting</h4>
            <ul className="space-y-1 text-sm text-primary-800">
              <li>• Dana akan ditransfer ke rekening utama Anda</li>
              <li>• Proses penarikan 1-3 hari kerja</li>
              <li>• Tidak ada biaya admin untuk penarikan</li>
              <li>• Minimal penarikan Rp 50.000</li>
            </ul>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  )
}

