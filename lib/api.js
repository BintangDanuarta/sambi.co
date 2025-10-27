/**
 * API Service Layer
 * Handles all API calls to the backend
 */

// Base API URL - Use proxy to avoid CORS issues
// The proxy will forward requests to the actual backend
const API_BASE_URL = '/api/proxy'

/**
 * HTTP Client with error handling
 */
class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    // Get token from localStorage (if exists)
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    }

    try {
      const response = await fetch(url, config)
      const result = await response.json()

      // Backend returns { success, message, data }
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Something went wrong')
      }

      // Return the data field from backend response
      return result.data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  get(endpoint) {
    return this.request(endpoint, { method: 'GET' })
  }

  post(endpoint, body) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  }

  put(endpoint, body) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    })
  }

  patch(endpoint, body) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    })
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' })
  }

  // Upload files (multipart/form-data)
  async upload(endpoint, formData) {
    const url = `${this.baseURL}${endpoint}`
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      })

      const result = await response.json()

      // Backend returns { success, message, data }
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Upload failed')
      }

      // Return the data field from backend response
      return result.data
    } catch (error) {
      console.error('Upload Error:', error)
      throw error
    }
  }
}

// Create API client instance
const api = new ApiClient(API_BASE_URL)

/**
 * Authentication API
 */
export const authApi = {
  // Register new user
  register: (userData) => api.post('/auth/register', userData),
  
  // Login user
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Logout user
  logout: () => api.post('/auth/logout'),
  
  // Get current user
  me: () => api.get('/auth/me'),
  
  // Refresh token
  refreshToken: () => api.post('/auth/refresh'),
  
  // Request password reset
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  
  // Reset password
  resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }),
}

/**
 * Projects API
 */
export const projectsApi = {
  // Get all projects (with filters)
  getAll: (params) => api.get(`/projects?${new URLSearchParams(params)}`),
  
  // Get single project
  getById: (id) => api.get(`/projects/${id}`),
  
  // Create project (for clients)
  create: (projectData) => api.post('/projects', projectData),
  
  // Update project
  update: (id, projectData) => api.put(`/projects/${id}`, projectData),
  
  // Delete project
  delete: (id) => api.delete(`/projects/${id}`),
  
  // Apply to project
  apply: (id, proposalData) => api.post(`/projects/${id}/apply`, proposalData),
  
  // Get my applications (for students)
  getMyApplications: () => api.get('/projects/my-applications'),
  
  // Get project proposals (for clients)
  getProposals: (id) => api.get(`/projects/${id}/proposals`),
  
  // Accept proposal (with payment data)
  acceptProposal: (projectId, proposalId, paymentData = {}) => api.post(`/projects/${projectId}/proposals/${proposalId}/accept`, paymentData),
  
  // Reject proposal
  rejectProposal: (projectId, proposalId) => api.post(`/projects/${projectId}/proposals/${proposalId}/reject`),
  
  // Upload deliverables
  uploadDeliverables: (id, formData) => api.upload(`/projects/${id}/deliverables`, formData),
  
  // Submit project for review
  submitForReview: (id) => api.post(`/projects/${id}/submit`),
  
  // Complete project
  complete: (id) => api.post(`/projects/${id}/complete`),
}

/**
 * User/Profile API
 */
export const userApi = {
  // Get user profile
  getProfile: () => api.get('/user/profile'),
  
  // Update profile
  updateProfile: (profileData) => api.put('/user/profile', profileData),
  
  // Upload profile picture
  uploadAvatar: (formData) => api.upload('/user/avatar', formData),
  
  // Get user stats
  getStats: () => api.get('/user/stats'),
  
  // Get user portfolio
  getPortfolio: () => api.get('/user/portfolio'),
  
  // Add portfolio item
  addPortfolioItem: (itemData) => api.post('/user/portfolio', itemData),
  
  // Delete portfolio item
  deletePortfolioItem: (id) => api.delete(`/user/portfolio/${id}`),
}

/**
 * Wallet/Transactions API
 */
export const walletApi = {
  // Get wallet balance
  getBalance: () => api.get('/wallet/balance'),
  
  // Get transactions
  getTransactions: (params) => api.get(`/wallet/transactions?${new URLSearchParams(params)}`),
  
  // Request withdrawal
  withdraw: (amount, bankAccountId) => api.post('/wallet/withdraw', { amount, bankAccountId }),
  
  // Get bank accounts
  getBankAccounts: () => api.get('/wallet/bank-accounts'),
  
  // Add bank account
  addBankAccount: (accountData) => api.post('/wallet/bank-accounts', accountData),
  
  // Delete bank account
  deleteBankAccount: (id) => api.delete(`/wallet/bank-accounts/${id}`),
}

/**
 * Messages API
 */
export const messagesApi = {
  // Get conversations
  getConversations: () => api.get('/messages/conversations'),
  
  // Get messages in conversation
  getMessages: (conversationId) => api.get(`/messages/conversations/${conversationId}`),
  
  // Send message
  send: (conversationId, message) => api.post(`/messages/conversations/${conversationId}`, { message }),
  
  // Mark as read
  markAsRead: (conversationId) => api.post(`/messages/conversations/${conversationId}/read`),
  
  // Upload attachment
  uploadAttachment: (conversationId, formData) => api.upload(`/messages/conversations/${conversationId}/attachments`, formData),
}

/**
 * Notifications API
 */
export const notificationsApi = {
  // Get all notifications
  getAll: () => api.get('/notifications'),
  
  // Mark as read
  markAsRead: (id) => api.post(`/notifications/${id}/read`),
  
  // Mark all as read
  markAllAsRead: () => api.post('/notifications/read-all'),
  
  // Delete notification
  delete: (id) => api.delete(`/notifications/${id}`),
  
  // Get unread count
  getUnreadCount: () => api.get('/notifications/unread-count'),
}

/**
 * Reviews API
 */
export const reviewsApi = {
  // Get reviews for user
  getUserReviews: (userId) => api.get(`/reviews/user/${userId}`),
  
  // Create review
  create: (projectId, reviewData) => api.post(`/reviews/project/${projectId}`, reviewData),
  
  // Update review
  update: (id, reviewData) => api.put(`/reviews/${id}`, reviewData),
  
  // Delete review
  delete: (id) => api.delete(`/reviews/${id}`),
}

/**
 * Payment API
 */
export const paymentApi = {
  // Create payment intent
  createIntent: (amount, projectId) => api.post('/payment/intent', { amount, projectId }),
  
  // Process payment
  process: (paymentData) => api.post('/payment/process', paymentData),
  
  // Get payment methods
  getPaymentMethods: () => api.get('/payment/methods'),
  
  // Add payment method
  addPaymentMethod: (methodData) => api.post('/payment/methods', methodData),
}

/**
 * Settings API
 */
export const settingsApi = {
  // Get user settings
  get: () => api.get('/settings'),
  
  // Update settings
  update: (settingsData) => api.put('/settings', settingsData),
  
  // Change password
  changePassword: (currentPassword, newPassword) => api.post('/settings/password', {
    currentPassword,
    newPassword,
  }),
  
  // Update notification preferences
  updateNotifications: (preferences) => api.put('/settings/notifications', preferences),
  
  // Deactivate account
  deactivateAccount: () => api.post('/settings/deactivate'),
}

/**
 * Search API
 */
export const searchApi = {
  // Search projects
  projects: (query, filters) => api.get(`/search/projects?q=${query}&${new URLSearchParams(filters)}`),
  
  // Search users/freelancers
  users: (query, filters) => api.get(`/search/users?q=${query}&${new URLSearchParams(filters)}`),
  
  // Get suggestions
  suggestions: (query) => api.get(`/search/suggestions?q=${query}`),
}

/**
 * Admin API (for admin users)
 */
export const adminApi = {
  // Get dashboard stats
  getDashboard: () => api.get('/admin/dashboard'),
  
  // Get all users
  getUsers: (params) => api.get(`/admin/users?${new URLSearchParams(params)}`),
  
  // Verify user
  verifyUser: (userId) => api.post(`/admin/users/${userId}/verify`),
  
  // Ban user
  banUser: (userId, reason) => api.post(`/admin/users/${userId}/ban`, { reason }),
  
  // Get all projects
  getProjects: (params) => api.get(`/admin/projects?${new URLSearchParams(params)}`),
  
  // Get all transactions
  getTransactions: (params) => api.get(`/admin/transactions?${new URLSearchParams(params)}`),
}

// Export the main API client for custom requests
export default api

