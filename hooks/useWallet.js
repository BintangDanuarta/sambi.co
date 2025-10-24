'use client'

import { useState, useEffect } from 'react'
import { walletApi } from '@/lib/api'

export function useWallet() {
  const [balance, setBalance] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchWalletData()
  }, [])

  const fetchWalletData = async () => {
    try {
      setLoading(true)
      const [balanceData, transactionsData] = await Promise.all([
        walletApi.getBalance(),
        walletApi.getTransactions({}),
      ])
      setBalance(balanceData)
      setTransactions(transactionsData)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const withdraw = async (amount, bankAccountId) => {
    try {
      await walletApi.withdraw(amount, bankAccountId)
      await fetchWalletData() // Refresh data
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  const refreshWallet = () => {
    fetchWalletData()
  }

  return { balance, transactions, loading, error, withdraw, refreshWallet }
}

