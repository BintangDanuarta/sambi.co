# Sambi.co - Platform Freelance untuk Mahasiswa

Platform freelance yang menghubungkan mahasiswa berbakat dengan klien yang membutuhkan jasa profesional. Dibangun dengan Next.js, Tailwind CSS, dan fokus pada pengalaman pengguna yang modern dan intuitif.

---

## 🌐 Backend Deployed!

**Backend URL:** https://sambi-be.vercel.app/api ✅

Your backend is already deployed and running! You only need to start the frontend.

### ⚡ Quick Start (1 Minute)

```bash
npm install
npm run dev
```

Open http://localhost:3000 - Done! 🎉

📖 **Read:** [QUICK_START_DEPLOYED.md](QUICK_START_DEPLOYED.md) for detailed instructions.

---

## 🚀 Fitur Utama

### Untuk Freelancer (Mahasiswa)
- **Verifikasi Mahasiswa**: Sistem verifikasi untuk memastikan kredibilitas
- **Dashboard Lengkap**: Monitor proyek, pendapatan, dan statistik
- **Manajemen Proyek**: Kelola proyek aktif dengan milestone tracking
- **Dompet Digital**: Sistem pembayaran dan penarikan dana yang aman
- **Profil Portfolio**: Showcase keahlian dan hasil kerja terbaik
- **Notifikasi Real-time**: Update tentang proyek dan pembayaran

### Untuk Klien
- **Cari Talenta**: Temukan mahasiswa berbakat sesuai kebutuhan
- **Project Management**: Kelola proyek dari mulai hingga selesai
- **Review & Rating**: Sistem rating untuk menjaga kualitas
- **Pembayaran Aman**: Sistem escrow untuk keamanan transaksi

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: JavaScript (ES6+)
- **Real-time**: Socket.io Client

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: JWT (jsonwebtoken)
- **File Upload**: Multer + Cloudinary
- **Real-time**: Socket.io
- **Payment**: Tripay Integration

## 📁 Struktur Proyek

```
sambi-co/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   ├── verify/
│   │   └── complete-profile/
│   ├── dashboard/                # Dashboard pages
│   │   ├── projects/             # Project management
│   │   │   ├── browse/           # Browse projects
│   │   │   └── [id]/             # Project details
│   │   ├── profile/              # User profile
│   │   ├── wallet/               # Wallet & transactions
│   │   ├── notifications/        # Notifications
│   │   └── settings/             # Settings
│   ├── layout.js                 # Root layout
│   ├── page.js                   # Landing page
│   └── globals.css               # Global styles
├── components/                    # Reusable components
│   ├── ui/                       # UI components
│   │   ├── Button.js
│   │   ├── Card.js
│   │   ├── Input.js
│   │   ├── Modal.js
│   │   ├── Badge.js
│   │   ├── Select.js
│   │   └── Textarea.js
│   └── layout/                   # Layout components
│       ├── Sidebar.js
│       ├── Header.js
│       └── DashboardLayout.js
├── public/                        # Static assets
├── tailwind.config.js            # Tailwind configuration
├── next.config.js                # Next.js configuration
└── package.json                  # Dependencies

```

## 🎨 Design System

### Brand Colors
- **Primary**: Blue (#0ea5e9) - Untuk aksi utama dan navigasi
- **Secondary**: Purple (#a855f7) - Untuk aksi sekunder
- **Success**: Green (#22c55e) - Untuk status berhasil
- **Warning**: Orange (#f59e0b) - Untuk peringatan
- **Danger**: Red (#ef4444) - Untuk error dan bahaya

### Typography
- **Font Family**: Inter
- **Headings**: Bold, berbagai ukuran (h1-h4)
- **Body**: Regular, 14-16px

### Components
Semua komponen UI telah dibuat dengan reusable dan customizable:
- Button (5 variants, 3 sizes)
- Card (dengan hover effect)
- Input & Textarea
- Select dropdown
- Badge (6 variants)
- Modal

## 🚦 Getting Started

### Prerequisites
- **Node.js** 18+ 
- **npm** atau **yarn**
- **MySQL** 5.7+ atau 8.0+
- **Git**

### Quick Start (5 Minutes)

**Read this first**: 📖 [START_HERE.md](START_HERE.md)

### Installation

1. **Clone repository**
```bash
git clone <repository-url>
cd sambi-co
```

2. **Install dependencies**
```bash
# Frontend dependencies
npm install

# Backend dependencies
cd backend
npm install
cd ..
```

3. **Setup Database**
```bash
mysql -u root -p
```
```sql
CREATE DATABASE sambi_db;
USE sambi_db;
source backend/sambi.sql;
exit;
```

4. **Configure Environment**

Copy and edit environment files:
```bash
# Backend configuration
cp backend/env-template.txt backend/.env
# Edit backend/.env with your MySQL credentials

# Frontend configuration
cp env-template.txt .env.local
# Use default values or customize
```

5. **Run the application**

**Option A: Manual (2 terminals)**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
npm run dev
```

**Option B: PowerShell Script (Windows)**
```bash
powershell -ExecutionPolicy Bypass -File start.ps1
```

6. **Open browser**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

### Build for Production

```bash
# Frontend
npm run build
npm start

# Backend
cd backend
npm start
```

## 📄 Available Scripts

- `npm run dev` - Menjalankan development server
- `npm run build` - Build aplikasi untuk production
- `npm start` - Menjalankan production server
- `npm run lint` - Menjalankan ESLint

## 🗺️ User Flow

### Freelancer Journey
1. **Landing Page** → User melihat informasi platform
2. **Register** → Daftar dengan email & password
3. **Verifikasi Mahasiswa** → Upload kartu mahasiswa
4. **Complete Profile** → Lengkapi profil dan keahlian
5. **Dashboard** → Akses ke semua fitur
6. **Browse Projects** → Cari proyek yang sesuai
7. **Apply** → Kirim proposal
8. **Work on Project** → Kerjakan proyek yang diterima
9. **Upload Results** → Submit hasil pekerjaan
10. **Get Paid** → Terima pembayaran ke dompet
11. **Withdraw** → Tarik dana ke rekening bank

### Client Journey
1. **Landing Page** → Pelajari tentang platform
2. **Register** → Daftar sebagai klien
3. **Post Project** → Buat proyek baru
4. **Review Proposals** → Terima proposal dari freelancer
5. **Hire Freelancer** → Pilih freelancer terbaik
6. **Monitor Progress** → Pantau perkembangan proyek
7. **Review & Pay** → Review hasil dan bayar

## 🔐 Fitur Keamanan (Planned)

- Email verification
- Two-factor authentication (2FA)
- Secure payment gateway integration
- Escrow system untuk pembayaran
- Data encryption
- Rate limiting untuk API

## 📱 Responsive Design

Semua halaman telah didesain responsif untuk:
- 📱 Mobile (320px - 768px)
- 💻 Tablet (768px - 1024px)
- 🖥️ Desktop (1024px+)

## 🎯 Roadmap

### Phase 1 - MVP (Current)
- [x] Project setup dengan Next.js & Tailwind
- [x] Authentication pages (Login, Register, Verify)
- [x] Dashboard layout & navigation
- [x] Project management pages
- [x] Profile management
- [x] Wallet interface
- [x] Notifications system

### Phase 2 - Backend Integration ✅
- [x] API integration dengan backend
- [x] Real authentication system (JWT)
- [x] Database integration (MySQL)
- [x] File upload functionality (Cloudinary)
- [x] Payment gateway integration (Tripay)
- [x] Socket.io for real-time features
- [x] CORS configuration
- [x] Complete API endpoints

### Phase 3 - Advanced Features
- [ ] Real-time messaging
- [ ] Advanced search & filters
- [ ] Rating & review system
- [ ] Portfolio showcase
- [ ] Analytics dashboard
- [ ] Mobile app (React Native)

### Phase 4 - Scale & Optimize
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] PWA support
- [ ] Multi-language support
- [ ] Admin dashboard

## 🤝 Contributing

Contributions are welcome! Silakan buat pull request atau issue untuk saran dan perbaikan.

## 📝 License

ISC

## 👨‍💻 Developer

Front-End Developer untuk Sambi.co Platform

---

## 📚 Documentation

- **[START_HERE.md](START_HERE.md)** - Quick start guide (5 minutes)
- **[INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)** - Complete integration documentation
- **[API_INTEGRATION_GUIDE.md](API_INTEGRATION_GUIDE.md)** - API usage guide
- **[COMPONENT_SHOWCASE.md](COMPONENT_SHOWCASE.md)** - UI components guide

## 🔌 API Endpoints

The backend provides these endpoints:

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Projects
- `GET /api/projects` - List all projects
- `GET /api/projects/:id` - Get project details
- `POST /api/projects` - Create project
- `POST /api/projects/:id/apply` - Apply to project
- `GET /api/projects/:id/proposals` - Get proposals
- `POST /api/projects/:id/proposals/:proposalId/accept` - Accept proposal

### Users
- `GET /api/user/:id` - Get user profile
- `PUT /api/user/:id` - Update profile
- `POST /api/user/:id/avatar` - Upload avatar

### Payments
- `POST /api/payment/intent` - Create payment
- `POST /api/payment/tripay/callback` - Payment webhook

See [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) for complete API documentation.

---

**Note**: ✅ Backend integration complete! The application is now a full-stack platform with real authentication, database, and payment integration.

## 📞 Support

Untuk pertanyaan atau dukungan, hubungi:
- Email: bintang@satu.kop.id
- WhatsApp: +62 887 0976 3493

---

by Orang Orang Senang Team

