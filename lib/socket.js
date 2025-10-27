/**
 * Socket.io Client for Real-time Features
 * Handles WebSocket connections for notifications, messages, and live updates
 */

import { io } from 'socket.io-client'

let socket = null

/**
 * Initialize Socket.io connection
 */
export const initSocket = (userId) => {
  if (socket) {
    return socket
  }

  const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000'

  socket = io(SOCKET_URL, {
    autoConnect: false,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5,
  })

  // Connect socket
  socket.connect()

  // Join user-specific room
  socket.on('connect', () => {
    console.log('✅ Socket connected:', socket.id)
    if (userId) {
      socket.emit('join', `user_${userId}`)
    }
  })

  socket.on('disconnect', () => {
    console.log('❌ Socket disconnected')
  })

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error)
  })

  return socket
}

/**
 * Get current socket instance
 */
export const getSocket = () => {
  return socket
}

/**
 * Disconnect socket
 */
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

/**
 * Listen for new notifications
 */
export const onNotification = (callback) => {
  if (!socket) return

  socket.on('notification', callback)

  // Return cleanup function
  return () => socket.off('notification', callback)
}

/**
 * Listen for new messages
 */
export const onMessage = (callback) => {
  if (!socket) return

  socket.on('new_message', callback)

  return () => socket.off('new_message', callback)
}

/**
 * Listen for project updates
 */
export const onProjectUpdate = (callback) => {
  if (!socket) return

  socket.on('project_created', callback)
  socket.on('project_updated', callback)
  socket.on('new_application', callback)
  socket.on('proposal_accepted', callback)

  return () => {
    socket.off('project_created', callback)
    socket.off('project_updated', callback)
    socket.off('new_application', callback)
    socket.off('proposal_accepted', callback)
  }
}

/**
 * Send typing indicator
 */
export const sendTyping = (conversationId, isTyping) => {
  if (!socket) return

  socket.emit('typing', { conversationId, isTyping })
}

/**
 * Listen for typing indicators
 */
export const onTyping = (callback) => {
  if (!socket) return

  socket.on('user_typing', callback)

  return () => socket.off('user_typing', callback)
}

export default {
  initSocket,
  getSocket,
  disconnectSocket,
  onNotification,
  onMessage,
  onProjectUpdate,
  sendTyping,
  onTyping,
}

