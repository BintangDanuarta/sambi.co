# Quick Start Guide - Sambi.co

## 🎯 Overview
Sambi.co adalah platform freelance yang dirancang khusus untuk mahasiswa Indonesia. Project ini menggunakan Next.js 16 dengan App Router dan Tailwind CSS.

## 📋 Prerequisites
- Node.js 18 atau lebih tinggi
- npm atau yarn
- Code editor (VS Code recommended)

## 🚀 Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

### 3. Build for Production
```bash
npm run build
npm start
```

## 📱 Testing the Application

### Available Pages

#### Public Pages
- **Landing Page**: `http://localhost:3000/`
- **Login**: `http://localhost:3000/login`
- **Register**: `http://localhost:3000/register`
- **Verify**: `http://localhost:3000/verify`
- **Complete Profile**: `http://localhost:3000/complete-profile`

#### Dashboard Pages (Protected)
- **Dashboard Home**: `http://localhost:3000/dashboard`
- **Projects List**: `http://localhost:3000/dashboard/projects`
- **Browse Projects**: `http://localhost:3000/dashboard/projects/browse`
- **Project Detail**: `http://localhost:3000/dashboard/projects/[id]`
- **Upload Results**: `http://localhost:3000/dashboard/projects/[id]/upload`
- **Profile**: `http://localhost:3000/dashboard/profile`
- **Wallet**: `http://localhost:3000/dashboard/wallet`
- **Notifications**: `http://localhost:3000/dashboard/notifications`
- **Settings**: `http://localhost:3000/dashboard/settings`

## 🎨 Design System

### Color Palette
```javascript
// Primary Colors
primary-600: '#0284c7'  // Main brand color
primary-50: '#f0f9ff'   // Light background

// Secondary Colors
secondary-600: '#9333ea'

// Status Colors
success-600: '#16a34a'  // Success states
warning-500: '#f59e0b'  // Warnings
danger-600: '#dc2626'   // Errors

// Neutral Colors
neutral-900: '#171717'  // Text
neutral-600: '#525252'  // Secondary text
neutral-50: '#fafafa'   // Background
```

### Typography
- Font Family: Inter (Google Fonts)
- Headings: Bold weights
- Body: Regular weight

## 🧩 Component Usage

### Button Component
```jsx
import Button from '@/components/ui/Button'

// Variants: primary, secondary, outline, ghost, danger, success
<Button variant="primary" size="md">Click Me</Button>
```

### Card Component
```jsx
import Card from '@/components/ui/Card'

<Card hover padding="normal">
  Your content here
</Card>
```

### Input Component
```jsx
import Input from '@/components/ui/Input'

<Input 
  label="Email" 
  type="email"
  placeholder="name@email.com"
  error="Error message"
  required
/>
```

### Modal Component
```jsx
import Modal from '@/components/ui/Modal'

<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Modal Title"
  footer={<Button>Save</Button>}
>
  Modal content
</Modal>
```

## 📂 Project Structure

```
sambi-co/
├── app/                    # Next.js App Router
│   ├── page.js            # Landing page
│   ├── layout.js          # Root layout
│   ├── globals.css        # Global styles
│   ├── login/             # Login page
│   ├── register/          # Register page
│   ├── verify/            # Verification page
│   ├── complete-profile/  # Profile completion
│   └── dashboard/         # Dashboard pages
│       ├── page.js        # Dashboard home
│       ├── projects/      # Project pages
│       ├── profile/       # Profile page
│       ├── wallet/        # Wallet page
│       ├── notifications/ # Notifications
│       └── settings/      # Settings
├── components/            # React components
│   ├── ui/               # UI components
│   │   ├── Button.js
│   │   ├── Card.js
│   │   ├── Input.js
│   │   ├── Modal.js
│   │   ├── Badge.js
│   │   ├── Select.js
│   │   └── Textarea.js
│   └── layout/           # Layout components
│       ├── Sidebar.js
│       ├── Header.js
│       └── DashboardLayout.js
├── utils/                # Utility functions
│   ├── formatters.js     # Format helpers
│   └── validators.js     # Validation helpers
├── lib/                  # Libraries & constants
│   └── constants.js      # App constants
└── public/              # Static files
```

## 🔧 Common Tasks

### Adding a New Page
1. Create a new folder in `app/` directory
2. Create `page.js` file
3. Export default component

### Creating a New Component
1. Create file in `components/` directory
2. Use consistent naming (PascalCase)
3. Export as default

### Styling Best Practices
- Use Tailwind utility classes
- Follow existing color scheme
- Maintain responsive design (mobile-first)
- Use custom classes from `globals.css` when needed

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000 (Windows)
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Node Modules Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Cache Issues
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

## 📝 Development Guidelines

### Code Style
- Use functional components
- Use hooks for state management
- Keep components small and focused
- Write descriptive variable names
- Add comments for complex logic

### File Organization
- Group related components together
- Keep utility functions separate
- Use consistent naming conventions
- Organize imports logically

### Git Workflow
1. Create feature branch
2. Make changes
3. Test thoroughly
4. Commit with descriptive message
5. Create pull request

## 🔐 Environment Variables
Copy `.env.example` to `.env.local` and fill in the values when backend is ready.

## 📚 Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)

### Learning Resources
- Next.js App Router tutorials
- Tailwind CSS guides
- React best practices

## 💡 Tips

1. **Hot Reload**: Changes automatically reflect in browser
2. **Component Reusability**: Use existing components before creating new ones
3. **Responsive Design**: Always test on mobile, tablet, and desktop
4. **Performance**: Optimize images and lazy load when possible
5. **Accessibility**: Use semantic HTML and proper ARIA labels

## 🆘 Getting Help

If you encounter issues:
1. Check console for errors
2. Review Next.js documentation
3. Check component implementations
4. Contact team lead

---

Happy Coding! 🚀


