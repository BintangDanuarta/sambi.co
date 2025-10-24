# Pages Guide - Sambi.co

Quick reference guide for all available pages and their routes.

## 🌐 Public Pages (No Auth Required)

### 1. Landing Page
**Route**: `/`  
**URL**: `http://localhost:3000/`

**Features**:
- Hero section with call-to-action
- Platform features (3 cards)
- How it works (4 steps)
- Footer with navigation

**Actions**:
- "Mulai Sekarang" → `/register`
- "Masuk" → `/login`

---

### 2. Login Page
**Route**: `/login`  
**URL**: `http://localhost:3000/login`

**Features**:
- Email input
- Password input
- Remember me checkbox
- Forgot password link

**Actions**:
- "Masuk" button → `/dashboard`
- "Daftar sekarang" link → `/register`
- "Kembali ke beranda" → `/`

---

### 3. Register Page
**Route**: `/register`  
**URL**: `http://localhost:3000/register`

**Features**:
- Full name input
- Email input
- Password input (with strength indicator)
- Confirm password
- Terms & conditions checkbox

**Actions**:
- "Daftar Sekarang" → `/verify`
- "Masuk" link → `/login`
- "Kembali ke beranda" → `/`

---

### 4. Verification Page
**Route**: `/verify`  
**URL**: `http://localhost:3000/verify`

**Features**:
- University name input
- Student ID (NIM) input
- File upload (drag & drop)
- Upload guidelines

**Actions**:
- "Kirim Verifikasi" → Success state → `/complete-profile`
- "Kembali" → `/register`

---

### 5. Complete Profile
**Route**: `/complete-profile`  
**URL**: `http://localhost:3000/complete-profile`

**Features**:
- Profile picture upload
- Phone number
- Major selection
- Semester selection
- Bio textarea
- Skills input
- Portfolio URL
- Progress indicator (30%)

**Actions**:
- "Simpan & Lanjutkan" → `/dashboard`
- "Lewati" → `/dashboard`

---

## 🔒 Protected Pages (Dashboard)

### 6. Dashboard Home
**Route**: `/dashboard`  
**URL**: `http://localhost:3000/dashboard`

**Layout**: Sidebar + Header + Content

**Features**:
- 4 statistics cards (Earnings, Active, Completed, Rating)
- Active projects list (3 projects with progress)
- Recent activities feed
- Recommended projects

**Quick Links**:
- "Lihat Semua" → `/dashboard/projects`
- "Cari Proyek Baru" → `/dashboard/projects/browse`
- Project cards → `/dashboard/projects/[id]`

---

### 7. Projects List
**Route**: `/dashboard/projects`  
**URL**: `http://localhost:3000/dashboard/projects`

**Features**:
- Tab navigation (All, Active, Completed, Proposals)
- Search bar
- Filter button
- Project cards with status badges
- Action buttons per project

**Actions**:
- "Detail" → `/dashboard/projects/[id]`
- "Upload Hasil" → `/dashboard/projects/[id]/upload`
- "Cari Proyek Baru" → `/dashboard/projects/browse`

---

### 8. Browse Projects
**Route**: `/dashboard/projects/browse`  
**URL**: `http://localhost:3000/dashboard/projects/browse`

**Features**:
- Category filters (6 categories)
- Search bar
- Advanced filter button
- Sort button
- Detailed project cards with:
  - Client info & rating
  - Budget range
  - Duration
  - Proposal count
  - Skills tags

**Actions**:
- Project title → `/dashboard/projects/browse/[id]`
- "Apply Sekarang" → `/dashboard/projects/browse/[id]/apply`
- "Muat Lebih Banyak" → Load more projects

---

### 9. Project Detail
**Route**: `/dashboard/projects/[id]`  
**URL**: `http://localhost:3000/dashboard/projects/1` (example)

**Features**:
- Project header with status badge
- Progress bar (65% example)
- Full description
- Requirements list (5 items)
- Milestone tracking (4 stages)
- Deliverables list
- Client information card
- Quick actions sidebar

**Actions**:
- "Hubungi Klien" → `/dashboard/projects/[id]/contact`
- "Upload Hasil" → `/dashboard/projects/[id]/upload`
- "Lihat Brief" → Scroll to description
- "Kirim Pesan" → Message client

**Sidebar Info**:
- Budget: Rp 1.500.000
- Deadline: November 15, 2025
- Start date: October 20, 2025
- Client: PT Digital Indonesia

---

### 10. Upload Results
**Route**: `/dashboard/projects/[id]/upload`  
**URL**: `http://localhost:3000/dashboard/projects/1/upload` (example)

**Features**:
- Project title display
- File upload area (drag & drop)
- Multiple file support
- File list with icons and sizes
- Remove file button
- Notes textarea
- Upload guidelines
- Tips card

**Accepted Formats**:
- PDF, DOC, ZIP, RAR
- JPG, PNG, FIG, PSD, AI
- Max 50MB per file

**Actions**:
- "Submit Hasil" → Upload & return to project detail
- "Batal" → Back to previous page

---

### 11. Profile Page
**Route**: `/dashboard/profile`  
**URL**: `http://localhost:3000/dashboard/profile`

**Features**:
- Profile picture with upload button
- 3 statistics cards (Projects, Rating, Success Rate)
- Edit mode toggle
- Personal information section
- Bio section
- Skills with badges
- Client reviews (3 displayed)
- Portfolio link
- Verification status
- Account statistics

**Sections**:
1. Profile Header (Picture + Stats)
2. Personal Information
3. About Me (Bio)
4. Skills
5. Reviews from Clients
6. Portfolio (Sidebar)
7. Verification Status (Sidebar)
8. Account Stats (Sidebar)

**Actions**:
- "Edit Profil" → Enable edit mode
- "Simpan" → Save changes
- Upload photo → Change profile picture

---

### 12. Wallet Page
**Route**: `/dashboard/wallet`  
**URL**: `http://localhost:3000/dashboard/wallet`

**Features**:
- Balance cards (Total, Available, Pending)
- Show/hide balance toggle
- Transaction history with icons
- Status badges (Completed/Pending)
- Bank account card
- Export button
- Withdrawal modal

**Balance Display**:
- Total: Rp 5.250.000
- Available: Rp 3.750.000
- Pending: Rp 1.500.000

**Transactions**:
- Income (green)
- Withdrawal (blue)
- With date and project info

**Actions**:
- "Tarik Dana" → Open withdrawal modal
- "Export" → Download transaction history
- "Tambah Rekening" → Add bank account
- Eye icon → Toggle balance visibility

---

### 13. Notifications Page
**Route**: `/dashboard/notifications`  
**URL**: `http://localhost:3000/dashboard/notifications`

**Features**:
- Tab filters (All, Unread, Projects, Payments)
- Notification cards with:
  - Type icons (Briefcase, Dollar, Message, Star, Alert)
  - Title and message
  - Time stamp
  - Action button
  - Delete button
- Unread indicator (blue dot)
- Mark all as read button

**Notification Types**:
- Project updates (blue)
- Payments (green)
- Messages (purple)
- Reviews (yellow)
- Alerts (red)

**Actions**:
- "Tandai Semua Dibaca" → Mark all read
- "Lihat Proyek/Dompet/etc" → Navigate to related page
- Delete icon → Remove notification

---

### 14. Settings Page
**Route**: `/dashboard/settings`  
**URL**: `http://localhost:3000/dashboard/settings`

**Layout**: Sidebar navigation + Content area

**Sections**:

1. **Akun (Account)**
   - Name, Email, Phone inputs
   - Save button

2. **Keamanan (Security)**
   - Change password form
   - 2FA toggle

3. **Notifikasi (Notifications)**
   - 5 notification toggles:
     * Email notifications
     * New projects
     * Payments
     * Messages
     * Newsletter

4. **Pembayaran (Payment)**
   - Bank account card (BCA)
   - Add account button

5. **Privasi (Privacy)**
   - Profile visibility dropdown
   - Deactivate account (danger zone)

**Navigation Items**:
- Akun
- Keamanan
- Notifikasi
- Pembayaran
- Privasi

---

## 🎨 Common UI Elements

### Sidebar (All Dashboard Pages)
**Items**:
1. Beranda → `/dashboard`
2. Proyek → `/dashboard/projects`
3. Profil → `/dashboard/profile`
4. Dompet → `/dashboard/wallet`
5. Notifikasi (badge: 3) → `/dashboard/notifications`
6. Pengaturan → `/dashboard/settings`
7. Keluar → `/login`

### Header (All Dashboard Pages)
**Elements**:
- Page title and subtitle
- Search bar (desktop)
- Notification bell (with dot indicator)
- User profile display
- Mobile menu button

---

## 📱 Responsive Breakpoints

All pages are responsive with these breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

---

## 🎯 User Journey

### New User Flow:
1. `/` (Landing) → Learn about platform
2. `/register` → Create account
3. `/verify` → Upload student card
4. `/complete-profile` → Add profile details
5. `/dashboard` → Access main dashboard

### Returning User Flow:
1. `/login` → Sign in
2. `/dashboard` → View dashboard
3. Navigate using sidebar

### Working on Project Flow:
1. `/dashboard/projects/browse` → Find project
2. Click project → View details
3. Click "Apply" → Submit proposal
4. If accepted → `/dashboard/projects/[id]`
5. Work on project
6. `/dashboard/projects/[id]/upload` → Submit work
7. `/dashboard/wallet` → Check payment

---

## 🔗 Quick Links

### For Testing:
```
Landing:     http://localhost:3000/
Login:       http://localhost:3000/login
Register:    http://localhost:3000/register
Dashboard:   http://localhost:3000/dashboard
Projects:    http://localhost:3000/dashboard/projects
Browse:      http://localhost:3000/dashboard/projects/browse
Detail:      http://localhost:3000/dashboard/projects/1
Upload:      http://localhost:3000/dashboard/projects/1/upload
Profile:     http://localhost:3000/dashboard/profile
Wallet:      http://localhost:3000/dashboard/wallet
Notifications: http://localhost:3000/dashboard/notifications
Settings:    http://localhost:3000/dashboard/settings
```

---

## 💡 Tips for Navigation

1. **Start from Landing**: Best way to see the full experience
2. **Use Sidebar**: Quick navigation between main sections
3. **Test Responsive**: Resize browser to see mobile/tablet views
4. **Check All States**: View empty states, hover effects, etc.
5. **Follow User Flow**: Go through the complete registration process

---

## 🎨 Color Coding

### Status Colors:
- 🔵 **Blue** (Primary): Active, In Progress
- 🟢 **Green** (Success): Completed, Success
- 🟡 **Yellow** (Warning): Review, Pending
- 🔴 **Red** (Danger): Error, Cancelled
- ⚪ **Gray** (Neutral): Inactive, Proposal

### Page Sections:
- **Public**: 🌐 No authentication needed
- **Protected**: 🔒 Dashboard pages (auth required)

---

**Last Updated**: October 2025  
**Total Pages**: 14  
**Total Routes**: 13+ (including dynamic routes)


