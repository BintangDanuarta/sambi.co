# Project Structure - Sambi.co

## 📁 Directory Structure

```
sambi-co/
│
├── app/                                    # Next.js App Router (v16)
│   ├── layout.js                          # Root layout with Inter font
│   ├── page.js                            # Landing page
│   ├── globals.css                        # Global Tailwind styles
│   │
│   ├── login/                             # Authentication
│   │   └── page.js                        # Login page
│   │
│   ├── register/                          # Registration
│   │   └── page.js                        # Register page
│   │
│   ├── verify/                            # Student verification
│   │   └── page.js                        # Verification page
│   │
│   ├── complete-profile/                  # Profile completion
│   │   └── page.js                        # Profile form page
│   │
│   └── dashboard/                         # Protected dashboard
│       ├── page.js                        # Dashboard home
│       │
│       ├── projects/                      # Project management
│       │   ├── page.js                    # Projects list
│       │   ├── browse/                    # Browse projects
│       │   │   └── page.js
│       │   └── [id]/                      # Dynamic project routes
│       │       ├── page.js                # Project detail
│       │       └── upload/                # Upload results
│       │           └── page.js
│       │
│       ├── profile/                       # User profile
│       │   └── page.js
│       │
│       ├── wallet/                        # Wallet & transactions
│       │   └── page.js
│       │
│       ├── notifications/                 # Notifications center
│       │   └── page.js
│       │
│       └── settings/                      # User settings
│           └── page.js
│
├── components/                            # React components
│   │
│   ├── ui/                               # Reusable UI components
│   │   ├── Button.js                     # Button component
│   │   │   - Variants: primary, secondary, outline, ghost, danger, success
│   │   │   - Sizes: sm, md, lg
│   │   │
│   │   ├── Card.js                       # Card container
│   │   │   - Props: hover, padding
│   │   │
│   │   ├── Input.js                      # Text input
│   │   │   - Props: label, error, helperText, required
│   │   │
│   │   ├── Textarea.js                   # Textarea input
│   │   │   - Props: label, error, rows
│   │   │
│   │   ├── Select.js                     # Select dropdown
│   │   │   - Props: label, options, error
│   │   │
│   │   ├── Badge.js                      # Status badge
│   │   │   - Variants: primary, secondary, success, warning, danger, neutral
│   │   │   - Sizes: sm, md, lg
│   │   │
│   │   └── Modal.js                      # Modal dialog
│   │       - Props: isOpen, onClose, title, footer, size
│   │
│   └── layout/                           # Layout components
│       ├── Sidebar.js                    # Dashboard sidebar navigation
│       ├── Header.js                     # Dashboard header with search
│       └── DashboardLayout.js            # Dashboard layout wrapper
│
├── utils/                                # Utility functions
│   ├── formatters.js                     # Formatting helpers
│   │   - formatCurrency()                # Format to IDR
│   │   - formatDate()                    # Format to Indonesian locale
│   │   - formatRelativeTime()            # "X hours ago"
│   │   - truncateText()                  # Truncate long text
│   │   - getInitials()                   # Get name initials
│   │
│   └── validators.js                     # Validation helpers
│       - isValidEmail()                  # Email validation
│       - isValidPhone()                  # Phone validation
│       - validatePassword()              # Password strength
│       - validateFile()                  # File upload validation
│       - isValidNIM()                    # Student ID validation
│
├── lib/                                  # Libraries & constants
│   └── constants.js                      # Application constants
│       - PROJECT_STATUS                  # Project status constants
│       - TRANSACTION_TYPE                # Transaction types
│       - NOTIFICATION_TYPE               # Notification types
│       - USER_ROLE                       # User roles
│       - PROJECT_CATEGORIES              # Category list
│       - POPULAR_SKILLS                  # Skills list
│       - FILE_LIMITS                     # Upload limits
│       - API_ENDPOINTS                   # API routes (for future)
│
├── public/                               # Static assets
│   └── (images, fonts, etc.)
│
├── tailwind.config.js                    # Tailwind configuration
│   - Custom colors (primary, secondary, etc.)
│   - Extended theme
│   - Custom utilities
│
├── postcss.config.js                     # PostCSS configuration
│
├── next.config.js                        # Next.js configuration
│
├── jsconfig.json                         # JavaScript configuration
│   - Path aliases (@/*)
│
├── package.json                          # Dependencies & scripts
│   - dev: Development server
│   - build: Production build
│   - start: Production server
│   - lint: ESLint
│
├── .eslintrc.json                        # ESLint configuration
│
├── .gitignore                            # Git ignore rules
│
├── README.md                             # Main documentation
│
├── QUICK_START.md                        # Quick start guide
│
└── PROJECT_STRUCTURE.md                  # This file
```

## 🎨 Styling System

### Tailwind Configuration
Location: `tailwind.config.js`

**Custom Colors:**
```javascript
primary: {
  50: '#f0f9ff',
  600: '#0284c7',  // Main brand
  700: '#0369a1',
}

secondary: {
  600: '#9333ea',  // Secondary actions
}

success: {
  600: '#16a34a',  // Success states
}

warning: {
  500: '#f59e0b',  // Warnings
}

danger: {
  600: '#dc2626',  // Errors/alerts
}

neutral: {
  50-900: ...      // Grays for text/bg
}
```

**Custom Components (globals.css):**
- `.card` - Card styling with shadow
- `.input` - Input field styling
- `.btn` - Button base styles
- `.btn-primary`, `.btn-secondary`, etc.
- `.badge` - Badge styling
- `.custom-scrollbar` - Custom scrollbar

## 🧩 Component Architecture

### UI Components Pattern
```javascript
// Standard component structure
export default function ComponentName({ 
  children,      // Component content
  variant,       // Style variant
  size,          // Size variant
  className,     // Additional classes
  ...props       // Other HTML props
}) {
  // Component logic
  return (
    <element className={classes} {...props}>
      {children}
    </element>
  )
}
```

### Layout Components Pattern
```javascript
// Layout wrapper pattern
export default function LayoutName({ children, ...props }) {
  return (
    <div className="layout-structure">
      <Sidebar />
      <div className="content">
        <Header {...props} />
        <main>{children}</main>
      </div>
    </div>
  )
}
```

## 🔄 Data Flow

### Current (Static)
```
Page Component
  ↓
Mock Data (hardcoded)
  ↓
UI Components
  ↓
Display to User
```

### Future (API Integration)
```
Page Component
  ↓
API Call (utils/api.js)
  ↓
Backend API
  ↓
Process & Format (utils/formatters.js)
  ↓
UI Components
  ↓
Display to User
```

## 📄 Page Types

### Public Pages
- No authentication required
- Includes: Landing, Login, Register, Verify
- Layout: Custom layouts per page

### Protected Pages (Dashboard)
- Authentication required (to be implemented)
- All under `/dashboard` route
- Layout: DashboardLayout component
- Includes: Sidebar + Header + Content

## 🎯 Key Features by Section

### Authentication Flow
1. **Landing** → Marketing homepage
2. **Register** → Student registration
3. **Verify** → Upload student ID
4. **Complete Profile** → Profile details
5. **Login** → Access dashboard

### Dashboard Features
1. **Home** → Stats & overview
2. **Projects** → Project management
   - List all projects
   - Browse new projects
   - View details
   - Upload results
3. **Profile** → User profile CRUD
4. **Wallet** → Transactions & withdrawal
5. **Notifications** → Activity updates
6. **Settings** → Account preferences

## 🔐 Security Considerations

### Current State (Frontend Only)
- No real authentication
- No API integration
- Mock data for demonstration

### Future Implementation
- JWT authentication
- Protected routes middleware
- API key management
- Input sanitization
- XSS prevention
- CSRF protection

## 📊 State Management

### Current Approach
- React useState for local state
- Props drilling for shared state
- No global state management

### Future Options
- Context API for theme/auth
- React Query for server state
- Zustand/Redux for complex state

## 🚀 Performance Optimizations

### Implemented
- Next.js App Router (server components)
- Image optimization ready
- Font optimization (Inter)
- CSS optimization (Tailwind)

### To Implement
- Dynamic imports
- Lazy loading
- Image optimization
- Code splitting
- Caching strategies

## 📱 Responsive Design

### Breakpoints
```javascript
sm: '640px'   // Mobile landscape
md: '768px'   // Tablet
lg: '1024px'  // Desktop
xl: '1280px'  // Large desktop
2xl: '1536px' // Extra large
```

### Mobile-First Approach
- Base styles for mobile
- Progressive enhancement for larger screens
- Touch-friendly interfaces
- Optimized for performance

## 🧪 Testing Strategy (Future)

### Unit Tests
- Component rendering
- Utility functions
- Validation logic

### Integration Tests
- Page navigation
- Form submissions
- API interactions

### E2E Tests
- User flows
- Authentication
- Critical paths

## 📚 Documentation Files

1. **README.md** - Main project documentation
2. **QUICK_START.md** - Getting started guide
3. **PROJECT_STRUCTURE.md** - This file
4. **CONTRIBUTING.md** - Contribution guidelines (to be added)
5. **API_DOCS.md** - API documentation (when backend ready)

## 🔄 Development Workflow

1. **Setup** → Install dependencies
2. **Develop** → Make changes
3. **Test** → Run locally
4. **Build** → Test production build
5. **Deploy** → Deploy to hosting

## 📝 Naming Conventions

### Files
- Components: PascalCase (e.g., `Button.js`)
- Pages: lowercase (e.g., `page.js`)
- Utils: camelCase (e.g., `formatters.js`)

### Variables
- Components: PascalCase
- Functions: camelCase
- Constants: UPPER_SNAKE_CASE
- CSS Classes: kebab-case

### Directories
- lowercase with hyphens
- Descriptive names
- Grouped by feature

## 🎨 Design Principles

1. **Consistency** - Uniform design language
2. **Simplicity** - Clean and intuitive UI
3. **Responsiveness** - Works on all devices
4. **Accessibility** - WCAG compliant (goal)
5. **Performance** - Fast loading times

## 🔧 Configuration Files

- `tailwind.config.js` - Tailwind customization
- `next.config.js` - Next.js settings
- `jsconfig.json` - Path aliases
- `postcss.config.js` - PostCSS plugins
- `.eslintrc.json` - Code linting rules
- `package.json` - Dependencies & scripts

---

Last Updated: October 2025


