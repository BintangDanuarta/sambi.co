# API Integration Guide - Sambi.co

## Overview

This guide explains how to integrate the Sambi.co frontend with your backend API.

---

## Setup

### 1. Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Copy from example
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
# or your production URL:
# NEXT_PUBLIC_API_URL=https://api.sambi.co/api
```

---

## API Client Architecture

### Base API Client

Location: `lib/api.js`

The API client is built with:
- Automatic authentication (JWT tokens)
- Error handling
- File upload support
- TypeScript-ready structure

### Example Usage

```javascript
import { projectsApi } from '@/lib/api'

// Get all projects
const projects = await projectsApi.getAll({ category: 'design' })

// Get single project
const project = await projectsApi.getById(123)

// Apply to project
const result = await projectsApi.apply(123, {
  coverLetter: '...',
  budget: 5000000,
})
```

---

## Available API Modules

### 1. Authentication API (`authApi`)

```javascript
import { authApi } from '@/lib/api'

// Register
await authApi.register({
  fullName: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
  role: 'student', // or 'client'
})

// Login
await authApi.login({
  email: 'john@example.com',
  password: 'password123',
})

// Get current user
await authApi.me()

// Logout
await authApi.logout()
```

**Required Endpoints:**
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/me`
- `POST /auth/refresh`

---

### 2. Projects API (`projectsApi`)

```javascript
import { projectsApi } from '@/lib/api'

// Get all projects (with filters)
await projectsApi.getAll({
  category: 'design',
  budget_min: 1000000,
  budget_max: 5000000,
})

// Get single project
await projectsApi.getById(123)

// Create project (for clients)
await projectsApi.create({
  title: 'UI/UX Design',
  description: '...',
  budget: 3000000,
  category: 'design',
})

// Apply to project
await projectsApi.apply(123, {
  coverLetter: '...',
  estimatedTime: 14,
  budget: 3500000,
})

// Upload deliverables
const formData = new FormData()
formData.append('file', file)
await projectsApi.uploadDeliverables(123, formData)
```

**Required Endpoints:**
- `GET /projects` - List all projects
- `GET /projects/:id` - Get single project
- `POST /projects` - Create project
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project
- `POST /projects/:id/apply` - Apply to project
- `POST /projects/:id/deliverables` - Upload deliverables
- `POST /projects/:id/complete` - Complete project

---

### 3. User/Profile API (`userApi`)

```javascript
import { userApi } from '@/lib/api'

// Get profile
await userApi.getProfile()

// Update profile
await userApi.updateProfile({
  fullName: 'John Doe',
  bio: '...',
  skills: ['React', 'Node.js'],
})

// Upload avatar
const formData = new FormData()
formData.append('avatar', file)
await userApi.uploadAvatar(formData)

// Get stats
await userApi.getStats()
```

**Required Endpoints:**
- `GET /user/profile`
- `PUT /user/profile`
- `POST /user/avatar`
- `GET /user/stats`
- `GET /user/portfolio`

---

### 4. Wallet API (`walletApi`)

```javascript
import { walletApi } from '@/lib/api'

// Get balance
await walletApi.getBalance()

// Get transactions
await walletApi.getTransactions({ limit: 10, offset: 0 })

// Withdraw
await walletApi.withdraw(1000000, bankAccountId)

// Add bank account
await walletApi.addBankAccount({
  bankName: 'BCA',
  accountNumber: '1234567890',
  accountName: 'John Doe',
})
```

**Required Endpoints:**
- `GET /wallet/balance`
- `GET /wallet/transactions`
- `POST /wallet/withdraw`
- `GET /wallet/bank-accounts`
- `POST /wallet/bank-accounts`

---

### 5. Messages API (`messagesApi`)

```javascript
import { messagesApi } from '@/lib/api'

// Get conversations
await messagesApi.getConversations()

// Get messages
await messagesApi.getMessages(conversationId)

// Send message
await messagesApi.send(conversationId, 'Hello!')

// Mark as read
await messagesApi.markAsRead(conversationId)
```

**Required Endpoints:**
- `GET /messages/conversations`
- `GET /messages/conversations/:id`
- `POST /messages/conversations/:id`
- `POST /messages/conversations/:id/read`

---

## React Hooks for API Integration

### useAuth Hook

```javascript
'use client'

import { useAuth } from '@/hooks/useAuth'

export default function MyComponent() {
  const { user, loading, login, logout, isAuthenticated } = useAuth()

  const handleLogin = async () => {
    const result = await login({
      email: 'john@example.com',
      password: 'password123',
    })
    
    if (result.success) {
      console.log('Logged in!')
    } else {
      console.error(result.error)
    }
  }

  if (loading) return <div>Loading...</div>
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  )
}
```

### useProjects Hook

```javascript
'use client'

import { useProjects } from '@/hooks/useProjects'

export default function ProjectsList() {
  const { projects, loading, error, refreshProjects } = useProjects({
    category: 'design',
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {projects.map(project => (
        <div key={project.id}>{project.title}</div>
      ))}
      <button onClick={refreshProjects}>Refresh</button>
    </div>
  )
}
```

### useWallet Hook

```javascript
'use client'

import { useWallet } from '@/hooks/useWallet'

export default function WalletPage() {
  const { balance, transactions, withdraw, loading } = useWallet()

  const handleWithdraw = async () => {
    const result = await withdraw(1000000, bankAccountId)
    if (result.success) {
      alert('Withdrawal successful!')
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1>Balance: Rp {balance.total}</h1>
      <button onClick={handleWithdraw}>Withdraw</button>
    </div>
  )
}
```

---

## Expected API Response Format

### Success Response

```json
{
  "success": true,
  "data": {
    // Your data here
  },
  "message": "Operation successful"
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message here",
  "errors": {
    "field": ["Error detail"]
  }
}
```

---

## Authentication Flow

### 1. User Registration

**Request:**
```javascript
POST /auth/register
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student" // or "client"
}
```

**Response:**
```javascript
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student"
    }
  }
}
```

### 2. Token Storage

The token is automatically stored in `localStorage` and sent with every request:

```javascript
headers: {
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIs...'
}
```

### 3. Token Refresh

When token expires, call:
```javascript
await authApi.refreshToken()
```

---

## File Upload Format

### Example: Upload Project Deliverables

```javascript
const formData = new FormData()
formData.append('file', fileObject)
formData.append('description', 'Final design mockup')

await projectsApi.uploadDeliverables(projectId, formData)
```

**Backend should expect:**
- `multipart/form-data` content type
- File size limit: 50MB
- Allowed types: PDF, DOC, ZIP, JPG, PNG, FIG, PSD

---

## Error Handling

All API calls are wrapped with try-catch:

```javascript
try {
  const projects = await projectsApi.getAll()
} catch (error) {
  console.error('API Error:', error.message)
  // Handle error (show toast, alert, etc.)
}
```

---

## CORS Configuration (Backend)

Your backend should allow:

```javascript
// Express.js example
app.use(cors({
  origin: ['http://localhost:3000', 'https://sambi.co'],
  credentials: true,
}))
```

---

## WebSocket for Real-time (Optional)

For real-time chat/notifications, you can add WebSocket:

```javascript
// Example WebSocket setup
const socket = new WebSocket('ws://localhost:8000')

socket.on Message = (event) => {
  const message = JSON.parse(event.data)
  // Handle new message
}
```

---

## Testing APIs

### 1. Mock Data (Current)

The app currently uses mock data. You can test the UI without a backend.

### 2. Switch to Real API

Update `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://your-api.com/api
```

### 3. Test Endpoints

Use the app to test each endpoint:
- Register → `POST /auth/register`
- Login → `POST /auth/login`
- Browse Projects → `GET /projects`
- Apply → `POST /projects/:id/apply`
- etc.

---

## Migration Checklist

- [ ] Set up backend API server
- [ ] Implement authentication endpoints
- [ ] Implement projects endpoints
- [ ] Implement user/profile endpoints
- [ ] Implement wallet endpoints
- [ ] Implement messages endpoints
- [ ] Set up file storage (S3, Cloudinary, etc.)
- [ ] Configure CORS
- [ ] Update `.env.local` with API URL
- [ ] Test all API calls
- [ ] Replace mock data with real API calls

---

## Support

For questions about API integration, refer to:
- `lib/api.js` - All API functions
- `hooks/` - React hooks for data fetching
- `lib/constants.js` - API endpoint constants

---

**Last Updated**: October 2025  
**Status**: Ready for API Integration


