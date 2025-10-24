// Project status constants
export const PROJECT_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  REVIEW: 'review',
  PROPOSAL: 'proposal',
  CANCELLED: 'cancelled',
}

// Transaction types
export const TRANSACTION_TYPE = {
  INCOME: 'income',
  WITHDRAWAL: 'withdrawal',
  REFUND: 'refund',
}

// Notification types
export const NOTIFICATION_TYPE = {
  PROJECT: 'project',
  PAYMENT: 'payment',
  MESSAGE: 'message',
  REVIEW: 'review',
  ALERT: 'alert',
}

// User roles
export const USER_ROLE = {
  FREELANCER: 'freelancer',
  CLIENT: 'client',
  ADMIN: 'admin',
}

// Project categories
export const PROJECT_CATEGORIES = [
  { value: 'design', label: 'Design' },
  { value: 'development', label: 'Development' },
  { value: 'writing', label: 'Writing' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'video', label: 'Video' },
  { value: 'data-entry', label: 'Data Entry' },
  { value: 'translation', label: 'Translation' },
  { value: 'other', label: 'Lainnya' },
]

// Skills list
export const POPULAR_SKILLS = [
  'UI/UX Design',
  'Figma',
  'Adobe Photoshop',
  'Adobe Illustrator',
  'React.js',
  'Next.js',
  'Vue.js',
  'Node.js',
  'Python',
  'Django',
  'Laravel',
  'WordPress',
  'Content Writing',
  'SEO',
  'Social Media Marketing',
  'Video Editing',
  'Adobe Premiere',
  'After Effects',
  'Data Analysis',
  'Excel',
  'Translation',
]

// File upload limits
export const FILE_LIMITS = {
  MAX_SIZE: 50 * 1024 * 1024, // 50MB
  ALLOWED_TYPES: {
    IMAGES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
    DOCUMENTS: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    ARCHIVES: ['application/zip', 'application/x-rar-compressed'],
    DESIGN: ['application/octet-stream'], // For .fig, .psd, .ai files
  },
}

// API endpoints (to be used when backend is ready)
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    VERIFY: '/api/auth/verify',
  },
  PROJECTS: {
    LIST: '/api/projects',
    DETAIL: (id) => `/api/projects/${id}`,
    CREATE: '/api/projects',
    UPDATE: (id) => `/api/projects/${id}`,
    DELETE: (id) => `/api/projects/${id}`,
  },
  PROFILE: {
    GET: '/api/profile',
    UPDATE: '/api/profile',
  },
  WALLET: {
    BALANCE: '/api/wallet/balance',
    TRANSACTIONS: '/api/wallet/transactions',
    WITHDRAW: '/api/wallet/withdraw',
  },
  NOTIFICATIONS: {
    LIST: '/api/notifications',
    READ: (id) => `/api/notifications/${id}/read`,
    DELETE: (id) => `/api/notifications/${id}`,
  },
}

