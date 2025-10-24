# Client Dashboard Guide - Sambi.co

Complete guide for the Client-side dashboard implementation.

---

## 🎯 Overview

The **Client Dashboard** is designed for organizations and businesses to:
- Post freelance projects
- Review proposals from students
- Hire and manage freelancers
- Monitor project progress
- Review and rate completed work

---

## 📁 File Structure

```
app/
└── client/
    ├── dashboard/
    │   └── page.js               ← Dashboard home ✅ CREATED
    ├── projects/
    │   ├── page.js                ← Projects list (NEXT)
    │   ├── post/
    │   │   └── page.js            ← Post project ✅ CREATED
    │   └── [id]/
    │       ├── page.js            ← Project detail
    │       ├── proposals/
    │       │   └── page.js        ← View proposals
    │       └── review/
    │           └── page.js        ← Review work
    ├── messages/
    │   └── page.js                ← Chat (can reuse student's)
    ├── notifications/
    │   └── page.js                ← Notifications
    └── settings/
        └── page.js                ← Settings

components/
└── layout/
    ├── ClientSidebar.js           ← Client navigation ✅ CREATED
    └── ClientDashboardLayout.js   ← Layout wrapper ✅ CREATED
```

---

## ✅ Already Created

### 1. **Client Sidebar** (`components/layout/ClientSidebar.js`)

**Features:**
- Blue theme matching student sidebar
- "💼 Client Account" badge
- **"Post Proyek"** button (yellow/orange)
- Navigation: Beranda, Proyek, Notifikasi, Pengaturan
- Logout at bottom

**Design:**
```
┌────────────────────────┐
│  Sambi.co         [☰]  │
│  💼 Client Account     │
├────────────────────────┤
│  [+ Post Proyek]       │ ← Yellow button
├────────────────────────┤
│  🏠  Beranda           │ ← Yellow highlight
│  📋  Proyek            │
│  🔔  Notifikasi   [5]  │
│  ⚙️  Pengaturan        │
│                        │
├────────────────────────┤
│  🚪  Keluar            │
└────────────────────────┘
```

### 2. **Client Dashboard Home** (`app/client/dashboard/page.js`)

**Features:**
- **4 Stats Cards:**
  - Total Proyek
  - Proyek Aktif
  - Freelancer Hired
  - Total Investasi

- **Quick Actions:**
  - Post Proyek Baru
  - Review Proposal
  - Monitor Proyek

- **Active Projects List:**
  - Shows progress for hired projects
  - Shows proposal count for reviewing
  - Quick chat button
  - View details button

- **Recent Proposals:**
  - Freelancer info
  - Rating & experience
  - Budget offer
  - Quick review button

- **Sidebar Widgets:**
  - Upcoming deadlines
  - Performance metrics
  - Tips section

**URL:** `/client/dashboard`

### 3. **Post Project Page** (`app/client/projects/post/page.js`)

**3-Step Form:**

**Step 1: Project Details**
- Title
- Category
- Description
- Requirements
- Skills needed

**Step 2: Budget & Timeline**
- Budget range (min-max)
- Duration (days)
- Deadline (date)
- File attachments

**Step 3: Review & Submit**
- Review all details
- Post fee: Rp 25,000
- Fee refund if no applications in 7 days

**URL:** `/client/projects/post`

---

## 📝 Pages to Create Next

I've prepared the structure. Here's what we need to complete:

### 4. Client Projects Management
**URL:** `/client/projects`

**Tabs:**
- All Projects
- Active (in progress)
- Reviewing (awaiting proposals)
- Completed
- Archived

**Features:**
- Filter by status
- Search projects
- Quick actions per project
- Status badges

### 5. View Proposals Page
**URL:** `/client/projects/[id]/proposals`

**Features:**
- List all proposals for a project
- Freelancer profiles:
  - Name & avatar
  - Rating & reviews
  - Experience
  - Portfolio samples
- Proposal details:
  - Cover letter
  - Timeline estimate
  - Budget offer
  - Attachments
- Actions:
  - Accept proposal (hire)
  - Reject proposal
  - Send message
  - View full profile

### 6. Project Detail (Client View)
**URL:** `/client/projects/[id]`

**Features:**
- Project information
- Hired freelancer info
- Progress tracking
- Milestones
- Deliverables submitted
- Chat button
- Review results button
- Mark as complete

### 7. Review Work Page
**URL:** `/client/projects/[id]/review`

**Features:**
- View submitted work
- Download files
- Request revisions form
- Accept & approve work
- Leave rating (1-5 stars)
- Write review
- Complete project

### 8. Client Notifications
**URL:** `/client/notifications`

**Notification Types:**
- New proposals received
- Freelancer submitted work
- Messages from freelancer
- Project milestones
- Payment confirmations

### 9. Client Settings
**URL:** `/client/settings`

**Sections:**
- Company Profile
- Account Settings
- Payment Methods
- Notification Preferences
- Privacy Settings

---

## 🎨 Design System (Client Theme)

### Colors (Same as Student)
```css
Primary: #0284c7 (Blue)
Warning: #f59e0b (Yellow/Orange for highlights)
Success: #16a34a (Green)
Danger: #dc2626 (Red)
Secondary: #9333ea (Purple)
```

### Client-Specific Elements

**Client Badge:**
```html
<div class="bg-secondary-600 text-white">
  💼 Client Account
</div>
```

**Post Button (Prominent):**
```html
<button class="bg-warning-500 hover:bg-warning-600">
  <Plus /> Post Proyek
</button>
```

---

## 🔄 User Flow

### Complete Client Journey

```
1. Register as Client
   ↓
2. Client Dashboard
   ↓
3. Post New Project (3-step form)
   ↓
4. Wait for Proposals
   ↓
5. Review Proposals
   ↓
6. Accept Proposal (Hire Freelancer)
   ↓
7. Chat with Freelancer
   ↓
8. Monitor Progress
   ↓
9. Freelancer Submits Work
   ↓
10. Review Work
    ↓
11. Request Revisions OR Accept
    ↓
12. Leave Rating & Review
    ↓
13. Mark Project as Complete
```

---

## 🆚 Difference: Student vs Client

| Feature | Student Dashboard | Client Dashboard |
|---------|------------------|------------------|
| **Main Action** | Browse & Apply | Post & Hire |
| **Primary Button** | - | "Post Proyek" |
| **Badge** | - | "💼 Client Account" |
| **Projects** | Apply to projects | Manage own projects |
| **Proposals** | Submit proposals | Review proposals |
| **Focus** | Finding work | Finding talent |
| **Navigation** | Home, Search, Messages, Profile | Home, Projects, Notifications, Settings |

---

## 📊 API Integration (When Ready)

### Client-Specific Endpoints

```javascript
// Post project
POST /client/projects
{
  title, category, description,
  budgetMin, budgetMax, duration, deadline
}

// Get my projects
GET /client/projects

// Get proposals for project
GET /client/projects/:id/proposals

// Accept proposal
POST /client/projects/:projectId/proposals/:proposalId/accept

// Review work
POST /client/projects/:id/review
{
  rating, comment, approved
}

// Mark complete
POST /client/projects/:id/complete
```

---

## ✅ Testing URLs

```bash
# Dashboard Home
http://localhost:3000/client/dashboard

# Post Project
http://localhost:3000/client/projects/post

# Projects List
http://localhost:3000/client/projects

# View Proposals
http://localhost:3000/client/projects/1/proposals

# Review Work
http://localhost:3000/client/projects/1/review

# Settings
http://localhost:3000/client/settings

# Notifications
http://localhost:3000/client/notifications
```

---

## 🎯 Quick Implementation Checklist

- [x] Client Sidebar with navigation
- [x] Client Dashboard Layout wrapper
- [x] Dashboard Home with stats
- [x] Post Project page (3-step form)
- [ ] Projects Management page
- [ ] View Proposals page
- [ ] Project Detail page
- [ ] Review Work page
- [ ] Client Settings page
- [ ] Client Notifications page

---

## 💡 Best Practices

### For Client Dashboard:

1. **Clear Project Status**
   - Use color-coded badges
   - Show progress bars
   - Highlight pending actions

2. **Proposal Review**
   - Easy comparison between freelancers
   - Clear ratings display
   - Quick accept/reject actions

3. **Communication**
   - In-app messaging
   - Notifications for important events
   - Quick contact buttons

4. **Project Management**
   - Timeline visualization
   - Milestone tracking
   - File management

5. **Quality Control**
   - Easy work review process
   - Revision request system
   - Rating & feedback

---

## 🚀 Next Steps

To complete the Client Dashboard:

1. **Create remaining pages** using the patterns from:
   - Student dashboard pages
   - Already created client pages

2. **Reuse components** where possible:
   - Messages page (same as student)
   - Settings structure (adapt student version)
   - Notifications (adapt student version)

3. **Connect to API** when backend ready

4. **Test complete flow** from post to review

---

## 📱 Responsive Design

All client pages should be responsive:
- Mobile: Stacked layout
- Tablet: 2-column where appropriate
- Desktop: Full layout with sidebar

---

## 🎨 Component Reusability

**Can Reuse from Student:**
- All UI components (Button, Card, Input, etc.)
- Messages/Chat page
- Header component
- Modal components
- Form components

**Client-Specific:**
- ClientSidebar
- ClientDashboardLayout
- Post Project form
- Proposal review cards
- Work review interface

---

**Status:** Foundation Complete ✅  
**Next:** Implement remaining pages  
**Ready For:** API Integration


