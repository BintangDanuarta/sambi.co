'use client'

import { useState, useEffect } from 'react'
import { messagesApi } from '@/lib/api'

export function useMessages() {
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchConversations()
  }, [])

  const fetchConversations = async () => {
    try {
      setLoading(true)
      const data = await messagesApi.getConversations()
      setConversations(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const refreshConversations = () => {
    fetchConversations()
  }

  return { conversations, loading, error, refreshConversations }
}

export function useConversation(conversationId) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (conversationId) {
      fetchMessages()
    }
  }, [conversationId])

  const fetchMessages = async () => {
    try {
      setLoading(true)
      const data = await messagesApi.getMessages(conversationId)
      setMessages(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async (message) => {
    try {
      await messagesApi.send(conversationId, message)
      await fetchMessages() // Refresh messages
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  const refreshMessages = () => {
    fetchMessages()
  }

  return { messages, loading, error, sendMessage, refreshMessages }
}

