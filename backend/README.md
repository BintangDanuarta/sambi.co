# Sambi.co Backend API

Node.js/Express backend for the Sambi.co platform.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.1
- **Database**: MySQL 2 (mysql2)
- **Authentication**: JWT (jsonwebtoken)
- **File Upload**: Multer + Cloudinary
- **Real-time**: Socket.io
- **Security**: bcrypt for password hashing
- **Payment**: Tripay integration

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create `.env` file (use `env-template.txt` as reference):

```env
PORT=5000
FRONTEND_URL=http://localhost:3000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=sambi_db
JWT_SECRET=your-secret-key
```

### 3. Setup Database

```bash
mysql -u root -p
```

```sql
CREATE DATABASE sambi_db;
USE sambi_db;
source sambi.sql;
exit;
```

### 4. Run Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run on http://localhost:5000

---

## 📁 Project Structure

```
backend/
├── app.js                  # Main application file
├── db.js                   # Database configuration
├── routes/                 # API routes
│   ├── authRoutes.js      # Authentication endpoints
│   ├── userRoutes.js      # User management
│   ├── projectsRoutes.js  # Project endpoints
│   └── paymentRoutes.js   # Payment endpoints
├── controllers/            # Business logic
│   ├── authController.js
│   ├── userController.js
│   ├── projectController.js
│   └── paymentController.js
├── models/                 # Database models
│   ├── userModel.js
│   └── projectModel.js
├── middleware/             # Express middleware
│   └── authMiddleware.js  # JWT verification
├── sambi.sql              # Database schema
└── package.json
```

---

## 🔌 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | User login | No |
| GET | `/api/auth/me` | Get current user | Yes |
| GET | `/api/auth/profile/:id` | Get user profile | No |
| POST | `/api/auth/logout` | User logout | Yes |

### Projects (`/api/projects`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/projects` | List all projects | No |
| GET | `/api/projects/:id` | Get project details | No |
| POST | `/api/projects` | Create new project | Yes |
| POST | `/api/projects/:id/apply` | Apply to project | Yes |
| GET | `/api/projects/:id/proposals` | Get proposals | Yes |
| POST | `/api/projects/:id/proposals/:proposalId/accept` | Accept proposal | Yes |
| POST | `/api/projects/:id/proposals/:proposalId/reject` | Reject proposal | Yes |

### Users (`/api/user`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/user/:id` | Get user profile | No |
| PUT | `/api/user/:id` | Update profile | Yes |
| POST | `/api/user/:id/avatar` | Upload avatar | Yes |

### Payments (`/api/payment`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/payment/intent` | Create payment intent | Yes |
| POST | `/api/payment/tripay/callback` | Tripay webhook | No |

---

## 📊 Response Format

All API responses follow this format:

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message",
  "data": null
}
```

---

## 🔐 Authentication

### JWT Token

Protected endpoints require JWT token in Authorization header:

```
Authorization: Bearer <token>
```

### Register

```bash
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "22123456@student.unsika.ac.id",
  "password": "password123",
  "role": "student"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registrasi berhasil",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "nama": "John Doe",
      "email": "22123456@student.unsika.ac.id",
      "roles_id": 1
    }
  }
}
```

### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "22123456@student.unsika.ac.id",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "nama": "John Doe",
      "email": "22123456@student.unsika.ac.id",
      "roles_id": 1
    }
  }
}
```

---

## 🔥 Real-time Features (Socket.io)

### Connection

```javascript
const socket = io('http://localhost:5000')

socket.on('connect', () => {
  console.log('Connected:', socket.id)
  
  // Join user-specific room
  socket.emit('join', `user_${userId}`)
})
```

### Events

**Emitted by Server:**
- `notification` - New notification
- `new_message` - New message
- `project_created` - New project posted
- `new_application` - New application to project
- `proposal_accepted` - Proposal accepted

**Received by Server:**
- `join` - Join a room

---

## 💾 Database Schema

### Users Table

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  roles_id INT NOT NULL,
  jenis_kelamin ENUM('L', 'P'),
  foto_profil VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Projects Table

```sql
CREATE TABLE projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  budget_min DECIMAL(10,2),
  budget_max DECIMAL(10,2),
  status ENUM('open', 'in_progress', 'completed', 'cancelled'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

See `sambi.sql` for complete schema.

---

## 🔧 Configuration

### CORS

CORS is configured in `app.js`:

```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
```

### Database Connection

Database is configured in `db.js`:

```javascript
const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'sambi_db',
  port: process.env.DB_PORT || 3306
}
```

### File Upload

Using Multer with Cloudinary:

```javascript
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
})
```

---

## 🧪 Testing

### Test with curl

```bash
# Test projects endpoint
curl http://localhost:5000/api/projects

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","email":"test@example.com","password":"password123","role":"student"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Test with Postman

Import `Postman_collection_Sambi.json` into Postman.

---

## 📦 Dependencies

```json
{
  "bcrypt": "^6.0.0",           // Password hashing
  "body-parser": "^2.2.0",      // Parse request bodies
  "cloudinary": "^2.8.0",       // File uploads
  "cors": "^2.8.5",             // CORS middleware
  "dotenv": "^17.2.3",          // Environment variables
  "express": "^5.1.0",          // Web framework
  "jsonwebtoken": "^9.0.2",     // JWT authentication
  "multer": "^2.0.2",           // File upload handling
  "mysql2": "^3.15.3",          // MySQL client
  "socket.io": "^4.8.1"         // Real-time communication
}
```

---

## 🔒 Security

- Passwords hashed with bcrypt (10 rounds)
- JWT tokens for authentication
- CORS configured for specific origin
- SQL injection prevention with parameterized queries
- Input validation on all endpoints

---

## 🐛 Debugging

Enable debug logs:

```bash
# Linux/Mac
DEBUG=* npm run dev

# Windows PowerShell
$env:DEBUG="*"; npm run dev
```

---

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |
| `DB_HOST` | Database host | 127.0.0.1 |
| `DB_PORT` | Database port | 3306 |
| `DB_USER` | Database user | root |
| `DB_PASSWORD` | Database password | (empty) |
| `DB_NAME` | Database name | sambi_db |
| `JWT_SECRET` | JWT secret key | (required) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | (optional) |
| `CLOUDINARY_API_KEY` | Cloudinary API key | (optional) |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | (optional) |

---

## 🚨 Common Issues

### Port Already in Use

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :5000
kill -9 <PID>
```

### Database Connection Error

1. Check MySQL is running
2. Verify credentials in `.env`
3. Test: `mysql -u root -p`

### CORS Error

1. Check `FRONTEND_URL` in `.env`
2. Verify CORS config in `app.js`

---

## 📞 Support

For backend-specific issues:
- Check logs in terminal
- Review `.env` configuration
- Check MySQL connection
- Verify JWT_SECRET is set

---

**Backend Status**: ✅ Ready  
**Version**: 1.0.0  
**Last Updated**: October 26, 2025

