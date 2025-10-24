# Component Showcase - Sambi.co

Visual guide and usage examples for all UI components.

---

## 🎨 Button Component

**Location**: `components/ui/Button.js`

### Props
| Prop | Type | Default | Options |
|------|------|---------|---------|
| variant | string | 'primary' | primary, secondary, outline, ghost, danger, success |
| size | string | 'md' | sm, md, lg |
| disabled | boolean | false | true, false |
| className | string | '' | Any additional classes |

### Usage Examples

```jsx
import Button from '@/components/ui/Button'

// Primary Button
<Button variant="primary" size="md">
  Click Me
</Button>

// Secondary Button
<Button variant="secondary">
  Secondary Action
</Button>

// Outline Button
<Button variant="outline" size="sm">
  Cancel
</Button>

// Ghost Button
<Button variant="ghost">
  Text Action
</Button>

// Danger Button (for delete, etc.)
<Button variant="danger">
  Delete
</Button>

// Success Button
<Button variant="success">
  Confirm
</Button>

// With Icon (using lucide-react)
<Button variant="primary">
  <Plus className="w-4 h-4 mr-2" />
  Add New
</Button>

// Disabled State
<Button disabled>
  Disabled
</Button>
```

### Visual Reference
```
[  Primary  ]  [  Secondary  ]  [  Outline  ]
[   Ghost   ]  [   Danger   ]  [  Success  ]
```

---

## 🎴 Card Component

**Location**: `components/ui/Card.js`

### Props
| Prop | Type | Default | Options |
|------|------|---------|---------|
| hover | boolean | false | true, false |
| padding | string | 'normal' | none, sm, normal, lg |
| className | string | '' | Any additional classes |

### Usage Examples

```jsx
import Card from '@/components/ui/Card'

// Basic Card
<Card>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>

// Card with Hover Effect
<Card hover>
  <p>This card has a hover shadow effect</p>
</Card>

// Card with Custom Padding
<Card padding="lg">
  <p>Card with large padding</p>
</Card>

// Card with No Padding
<Card padding="none">
  <img src="..." alt="..." />
</Card>

// Combining Props
<Card hover padding="sm" className="border-l-4 border-l-primary-600">
  <p>Custom styled card</p>
</Card>
```

### Visual Reference
```
┌─────────────────────┐
│                     │
│   Card Content      │
│                     │
└─────────────────────┘

┌─────────────────────┐  ← Hover: Shadow increases
│   Hoverable Card    │
└─────────────────────┘
```

---

## 📝 Input Component

**Location**: `components/ui/Input.js`

### Props
| Prop | Type | Default | Options |
|------|------|---------|---------|
| label | string | - | Any text |
| error | string | - | Error message |
| helperText | string | - | Helper text |
| required | boolean | false | true, false |
| type | string | 'text' | text, email, password, tel, number, url |

### Usage Examples

```jsx
import Input from '@/components/ui/Input'

// Basic Input
<Input 
  label="Full Name" 
  placeholder="Enter your name"
/>

// Required Input
<Input 
  label="Email" 
  type="email"
  required
/>

// Input with Helper Text
<Input 
  label="Password" 
  type="password"
  helperText="Minimum 8 characters"
/>

// Input with Error
<Input 
  label="Username" 
  value={username}
  error="Username is already taken"
/>

// Controlled Input
<Input 
  label="Phone"
  type="tel"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
/>
```

### Visual Reference
```
Full Name *
┌─────────────────────┐
│ John Doe            │
└─────────────────────┘

Email *
┌─────────────────────┐
│ john@example.com    │
└─────────────────────┘
⚠️ Email is already taken  ← Error state (red)
```

---

## 📄 Textarea Component

**Location**: `components/ui/Textarea.js`

### Props
| Prop | Type | Default | Options |
|------|------|---------|---------|
| label | string | - | Any text |
| error | string | - | Error message |
| helperText | string | - | Helper text |
| required | boolean | false | true, false |
| rows | number | 4 | Any number |

### Usage Examples

```jsx
import Textarea from '@/components/ui/Textarea'

// Basic Textarea
<Textarea 
  label="Description" 
  placeholder="Enter description..."
/>

// Textarea with Custom Rows
<Textarea 
  label="Bio" 
  rows={6}
  helperText="Tell us about yourself"
/>

// Textarea with Error
<Textarea 
  label="Message" 
  value={message}
  error="Message is too short (minimum 10 characters)"
/>

// Controlled Textarea
<Textarea 
  label="Notes"
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
  rows={5}
/>
```

### Visual Reference
```
Description *
┌─────────────────────┐
│                     │
│  Multi-line text    │
│  input field        │
│                     │
└─────────────────────┘
Helper text here
```

---

## 🔽 Select Component

**Location**: `components/ui/Select.js`

### Props
| Prop | Type | Default | Options |
|------|------|---------|---------|
| label | string | - | Any text |
| error | string | - | Error message |
| helperText | string | - | Helper text |
| required | boolean | false | true, false |
| options | array | [] | Array of {value, label} objects |
| placeholder | string | 'Pilih...' | Any text |

### Usage Examples

```jsx
import Select from '@/components/ui/Select'

// Basic Select
<Select 
  label="Country" 
  options={[
    { value: 'id', label: 'Indonesia' },
    { value: 'sg', label: 'Singapore' },
    { value: 'my', label: 'Malaysia' },
  ]}
/>

// Select with Error
<Select 
  label="Category" 
  options={categories}
  error="Please select a category"
  required
/>

// Controlled Select
<Select 
  label="Semester"
  value={semester}
  onChange={(e) => setSemester(e.target.value)}
  options={semesterOptions}
/>

// Custom Placeholder
<Select 
  label="Major" 
  placeholder="Choose your major..."
  options={majorOptions}
/>
```

### Visual Reference
```
Category *
┌─────────────────────┐
│ Design           ▼  │
└─────────────────────┘
```

---

## 🏷️ Badge Component

**Location**: `components/ui/Badge.js`

### Props
| Prop | Type | Default | Options |
|------|------|---------|---------|
| variant | string | 'primary' | primary, secondary, success, warning, danger, neutral |
| size | string | 'md' | sm, md, lg |
| className | string | '' | Any additional classes |

### Usage Examples

```jsx
import Badge from '@/components/ui/Badge'

// Status Badges
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Cancelled</Badge>
<Badge variant="primary">New</Badge>

// Different Sizes
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>

// Category Badges
<Badge variant="neutral">Design</Badge>
<Badge variant="secondary">Development</Badge>

// With Custom Styling
<Badge variant="success" className="font-bold">
  ✓ Verified
</Badge>
```

### Visual Reference
```
[ Active ]  [ Pending ]  [ Cancelled ]  [ New ]
  Green      Yellow        Red          Blue

[Small] [Medium] [  Large  ]
```

---

## 🔲 Modal Component

**Location**: `components/ui/Modal.js`

### Props
| Prop | Type | Default | Options |
|------|------|---------|---------|
| isOpen | boolean | false | true, false |
| onClose | function | - | Function to close modal |
| title | string | - | Modal title |
| footer | node | - | Footer content (usually buttons) |
| size | string | 'md' | sm, md, lg, xl |

### Usage Examples

```jsx
'use client'
import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>
              Confirm
            </Button>
          </>
        }
      >
        <p>Are you sure you want to proceed?</p>
      </Modal>
    </>
  )
}

// Different Sizes
<Modal size="sm" {...props}>Small Modal</Modal>
<Modal size="md" {...props}>Medium Modal</Modal>
<Modal size="lg" {...props}>Large Modal</Modal>
<Modal size="xl" {...props}>Extra Large Modal</Modal>

// Form in Modal
<Modal isOpen={isOpen} onClose={handleClose} title="Add New Item">
  <form onSubmit={handleSubmit}>
    <Input label="Name" />
    <Textarea label="Description" />
  </form>
</Modal>
```

### Visual Reference
```
════════════════════════════
  Modal Title          [X]
────────────────────────────
                            
  Modal content goes here   
                            
────────────────────────────
        [Cancel] [Confirm]  
════════════════════════════
```

---

## 🎯 Layout Components

### Sidebar

**Location**: `components/layout/Sidebar.js`

```jsx
import Sidebar from '@/components/layout/Sidebar'

// Used automatically in DashboardLayout
<Sidebar />
```

**Features**:
- Logo at top
- Navigation menu items with icons
- Active state highlighting
- Badge support for notifications
- Logout button at bottom

---

### Header

**Location**: `components/layout/Header.js`

```jsx
import Header from '@/components/layout/Header'

<Header 
  title="Page Title" 
  subtitle="Page subtitle"
/>
```

**Features**:
- Title and subtitle display
- Search bar (desktop)
- Notification bell with indicator
- User profile display
- Mobile menu button

---

### DashboardLayout

**Location**: `components/layout/DashboardLayout.js`

```jsx
import DashboardLayout from '@/components/layout/DashboardLayout'

export default function MyPage() {
  return (
    <DashboardLayout 
      title="Page Title" 
      subtitle="Page description"
    >
      {/* Your page content */}
      <div>Page content here</div>
    </DashboardLayout>
  )
}
```

**Structure**:
```
┌─────────┬──────────────────────────┐
│         │  Header (Title, Search)  │
│ Sidebar ├──────────────────────────┤
│         │                          │
│  Menu   │      Page Content        │
│         │                          │
└─────────┴──────────────────────────┘
```

---

## 🎨 Component Combinations

### Card with Button

```jsx
<Card>
  <h3 className="font-semibold mb-4">Project Details</h3>
  <p className="text-neutral-600 mb-4">
    Project description goes here...
  </p>
  <Button variant="primary">
    View Details
  </Button>
</Card>
```

### Form with Multiple Inputs

```jsx
<form onSubmit={handleSubmit}>
  <div className="space-y-4">
    <Input 
      label="Email" 
      type="email"
      required
    />
    <Input 
      label="Password" 
      type="password"
      required
    />
    <Textarea 
      label="Message"
      rows={5}
    />
    <Button type="submit" className="w-full">
      Submit
    </Button>
  </div>
</form>
```

### Card Grid with Badges

```jsx
<div className="grid md:grid-cols-3 gap-6">
  <Card hover>
    <Badge variant="success">Active</Badge>
    <h3 className="font-semibold mt-2">Project 1</h3>
    <p className="text-neutral-600">Description...</p>
  </Card>
  <Card hover>
    <Badge variant="warning">Pending</Badge>
    <h3 className="font-semibold mt-2">Project 2</h3>
    <p className="text-neutral-600">Description...</p>
  </Card>
  <Card hover>
    <Badge variant="danger">Cancelled</Badge>
    <h3 className="font-semibold mt-2">Project 3</h3>
    <p className="text-neutral-600">Description...</p>
  </Card>
</div>
```

### Modal with Form

```jsx
<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Edit Profile"
  footer={
    <>
      <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleSave}>
        Save Changes
      </Button>
    </>
  }
>
  <div className="space-y-4">
    <Input label="Full Name" defaultValue="John Doe" />
    <Input label="Email" type="email" defaultValue="john@example.com" />
    <Textarea label="Bio" rows={4} />
  </div>
</Modal>
```

---

## 🎨 Styling Tips

### Custom Classes
```jsx
// Add custom Tailwind classes
<Button className="shadow-lg">
  Custom Shadow
</Button>

<Card className="border-2 border-primary-600">
  Highlighted Card
</Card>

<Badge className="animate-pulse">
  Animated Badge
</Badge>
```

### Icon Integration
```jsx
import { Check, X, AlertCircle } from 'lucide-react'

<Button variant="success">
  <Check className="w-4 h-4 mr-2" />
  Approve
</Button>

<Button variant="danger">
  <X className="w-4 h-4 mr-2" />
  Reject
</Button>

<Badge variant="warning">
  <AlertCircle className="w-3 h-3 mr-1" />
  Warning
</Badge>
```

### Responsive Design
```jsx
// Stack on mobile, grid on desktop
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</div>

// Full width on mobile, auto on desktop
<Button className="w-full md:w-auto">
  Responsive Button
</Button>
```

---

## 🔧 Common Patterns

### Loading State
```jsx
<Button disabled>
  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
  Loading...
</Button>
```

### Empty State
```jsx
<Card className="text-center py-12">
  <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
    <Inbox className="w-10 h-10 text-neutral-400" />
  </div>
  <h3 className="text-lg font-semibold mb-2">No items yet</h3>
  <p className="text-neutral-600 mb-4">Get started by creating your first item</p>
  <Button>
    <Plus className="w-4 h-4 mr-2" />
    Create Item
  </Button>
</Card>
```

### Error State
```jsx
<Card className="bg-danger-50 border border-danger-200">
  <div className="flex items-start gap-3">
    <AlertCircle className="w-5 h-5 text-danger-600" />
    <div>
      <h4 className="font-semibold text-danger-900">Error</h4>
      <p className="text-danger-700">Something went wrong. Please try again.</p>
    </div>
  </div>
</Card>
```

---

## 📚 Best Practices

1. **Consistency**: Use the same variant for similar actions across your app
2. **Accessibility**: Always include labels for inputs
3. **Error Handling**: Show clear error messages
4. **Loading States**: Disable buttons during async operations
5. **Responsive**: Test on mobile, tablet, and desktop
6. **Icons**: Use lucide-react for consistent icons
7. **Spacing**: Use Tailwind spacing (space-y, gap) for consistent spacing

---

## 🎨 Color Reference

```
Primary:   #0284c7 (Blue)    - Main actions
Secondary: #9333ea (Purple)  - Secondary actions
Success:   #16a34a (Green)   - Success states
Warning:   #f59e0b (Orange)  - Warnings
Danger:    #dc2626 (Red)     - Errors/delete
Neutral:   #525252 (Gray)    - Neutral/inactive
```

---

**Need Help?** Check the component files in `components/ui/` for full implementation details.


