# Theme Global Plugin

A powerful Payload CMS plugin that provides comprehensive theme management capabilities with dynamic color palettes, responsive typography systems, and layout controls. This plugin allows you to manage your website's visual identity directly from the Payload admin panel with real-time previews and responsive design support.

## 🎨 Color System

### Semantic Colors

These are the main colors used throughout your website:

```css
/* Primary Colors */
--color-primary          /* Main brand color */
--text-on-primary        /* Text color on primary backgrounds */

/* Secondary Colors */
--color-secondary        /* Secondary brand color */
--text-on-secondary      /* Text color on secondary backgrounds */

/* Background Colors */
--page-background        /* Main page background */
--card-background        /* Card/component backgrounds */
--text-on-page          /* Text color on page background */
--text-on-card          /* Text color on card backgrounds */
```

### Color Scales

The plugin automatically generates complete color scales (50-950) from your primary and secondary colors:

```css
/* Primary Scale */
--primary-50   /* Lightest shade */
--primary-100
--primary-200
--primary-300
--primary-400
--primary-500  /* Base color */
--primary-600
--primary-700
--primary-800
--primary-900
--primary-950  /* Darkest shade */

/* Secondary Scale */
--secondary-50   /* Lightest shade */
--secondary-100
--secondary-200
--secondary-300
--secondary-400
--secondary-500  /* Base color */
--secondary-600
--secondary-700
--secondary-800
--secondary-900
--secondary-950  /* Darkest shade */
```

### Usage Examples

```tsx
// Using semantic colors
<button className="bg-color-primary text-text-on-primary px-4 py-2 rounded">
  Primary Button
</button>

<div className="bg-card-background text-text-on-card p-4 rounded">
  Card Content
</div>

// Using color scales
<div className="bg-primary-100 text-primary-900 p-4 rounded">
  Light primary background with dark text
</div>

<button className="bg-secondary-500 text-white px-4 py-2 rounded">
  Secondary Button
</button>

// Hover states
<button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded transition-colors">
  Interactive Button
</button>
```

## 📝 Typography System

### Overview

The typography system provides a complete set of responsive components that automatically adapt to different screen sizes. Each typography element can be configured with specific font sizes and line heights for different breakpoints.

### Available Typography Components

```tsx
import {
  // Headings
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  
  // Body Text
  TypographyP,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
  
  // Code & Quotes
  TypographyInlineCode,
  TypographyBlockquote,
  
  // Lists
  TypographyList,
  TypographyListItem,
  
  // Tables
  TypographyTable,
  TypographyTableHeader,
  TypographyTableBody,
  TypographyTableRow,
  TypographyTableCell,
  TypographyTableHeaderCell,
} from 'your-theme-plugin/components/theme/typography'
```

### Basic Usage

```tsx
// Simple usage with theme data
<TypographyH1 themeData={themeData}>
  Main Heading
</TypographyH1>

<TypographyP themeData={themeData}>
  Body text with proper spacing and typography.
</TypographyP>

<TypographyLead themeData={themeData}>
  Lead paragraph for introductions.
</TypographyLead>
```

### Responsive Typography

#### Breakpoint System

The typography system uses four breakpoints that automatically adapt based on viewport width:

```typescript
const BREAKPOINTS = {
  mobile: 640,        // < 640px
  tablet: 768,        // 640px - 767px
  desktop: 1024,      // 768px - 1023px
  largeDesktop: 1280, // ≥ 1024px
}
```

#### Responsive Configuration

In the admin panel, you can configure each typography element with different values for each breakpoint:

```json
{
  "typography": {
    "elements": {
      "h1": {
        "fontSize": {
          "mobile": "1.5rem",
          "tablet": "2rem",
          "desktop": "2.25rem",
          "largeDesktop": "2.5rem"
        },
        "lineHeight": {
          "mobile": "2rem",
          "tablet": "2.25rem",
          "desktop": "2.5rem",
          "largeDesktop": "2.75rem"
        }
      }
    }
  }
}
```

#### Manual Breakpoint Control

You can manually specify which breakpoint to use for a component:

```tsx
// Force mobile breakpoint
<TypographyH1 breakpoint="mobile" themeData={themeData}>
  Mobile-sized heading
</TypographyH1>

// Force desktop breakpoint
<TypographyP breakpoint="desktop" themeData={themeData}>
  Desktop-sized paragraph
</TypographyP>
```

#### Automatic Responsive Behavior

By default, components automatically use the current viewport's breakpoint:

```tsx
// Automatically responsive - no breakpoint prop needed
<TypographyH1 themeData={themeData}>
  This heading automatically adapts to screen size
</TypographyH1>

<TypographyP themeData={themeData}>
  This paragraph automatically adapts to screen size
</TypographyP>
```

### Advanced Typography Usage

#### Custom Styling with Theme Data

```tsx
// Combine theme data with custom styles
<TypographyH1 
  themeData={themeData}
  className="text-center mb-8"
  style={{ 
    color: themeData?.colorPrimary,
    textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
  }}
>
  Custom Styled Heading
</TypographyH1>
```

#### Text Direction Support

```tsx
// Automatic text direction detection
<TypographyP themeData={themeData} dir="auto">
  This text automatically detects direction
</TypographyP>

// Force left-to-right
<TypographyH2 themeData={themeData} dir="ltr">
  Left to Right Heading
</TypographyH2>

// Force right-to-left
<TypographyH3 themeData={themeData} dir="rtl">
  Right to Left Heading
</TypographyH3>
```

#### Complex Content Examples

```tsx
// Article layout with proper typography hierarchy
<article className="max-w-4xl mx-auto">
  <TypographyH1 themeData={themeData}>
    Article Title
  </TypographyH1>
  
  <TypographyLead themeData={themeData}>
    This is the lead paragraph that introduces the article content.
  </TypographyLead>
  
  <TypographyP themeData={themeData}>
    This is the main body text. It uses the configured font family, 
    size, and line height from your theme settings.
  </TypographyP>
  
  <TypographyH2 themeData={themeData}>
    Section Heading
  </TypographyH2>
  
  <TypographyP themeData={themeData}>
    More body text with proper spacing and typography.
  </TypographyP>
  
  <TypographyBlockquote themeData={themeData}>
    This is a blockquote that stands out from the regular text.
  </TypographyBlockquote>
  
  <TypographyH3 themeData={themeData}>
    Subsection
  </TypographyH3>
  
  <TypographyList themeData={themeData}>
    <TypographyListItem>First item in the list</TypographyListItem>
    <TypographyListItem>Second item with more content</TypographyListItem>
    <TypographyListItem>Third item</TypographyListItem>
  </TypographyList>
</article>
```

#### Table Examples

```tsx
// Responsive table with proper typography
<TypographyTable themeData={themeData}>
  <TypographyTableHeader>
    <TypographyTableRow>
      <TypographyTableHeaderCell>Name</TypographyTableHeaderCell>
      <TypographyTableHeaderCell>Email</TypographyTableHeaderCell>
      <TypographyTableHeaderCell>Role</TypographyTableHeaderCell>
    </TypographyTableRow>
  </TypographyTableHeader>
  <TypographyTableBody>
    <TypographyTableRow>
      <TypographyTableCell>John Doe</TypographyTableCell>
      <TypographyTableCell>john@example.com</TypographyTableCell>
      <TypographyTableCell>Developer</TypographyTableCell>
    </TypographyTableRow>
    <TypographyTableRow>
      <TypographyTableCell>Jane Smith</TypographyTableCell>
      <TypographyTableCell>jane@example.com</TypographyTableCell>
      <TypographyTableCell>Designer</TypographyTableCell>
    </TypographyTableRow>
  </TypographyTableBody>
</TypographyTable>
```

### Font Families

The plugin supports both English and Hebrew fonts with automatic language detection:

#### English Fonts

- **Sans-serif**: Inter, Poppins, Manrope, DM Sans, Nunito, Epilogue, Mulish, Lexend, Public Sans, Jost, Sora
- **Serif**: Playfair Display, Merriweather, Source Serif Pro, Lora, Crimson Text
- **Monospace**: JetBrains Mono, Fira Code, Source Code Pro, Inconsolata

#### Hebrew Fonts

- **Modern**: Asimon Hebrew, Heebo, Rubik, Assistant, Secular One, Suez One
- **Classic**: Frank Ruhl Libre, Noto Sans Hebrew, Noto Serif Hebrew, Noto Rashi Hebrew
- **Display**: Miriam Libre, Alef

#### Font Configuration

```json
{
  "typography": {
    "fontFamily": "Inter, system-ui, sans-serif",
    "headingFont": "Inter, system-ui, sans-serif",
    "fontWeight": {
      "normal": 400,
      "bold": 700
    }
  }
}
```

### Typography Scale

Each typography element has default responsive values that create a harmonious scale:

```css
/* Default Typography Scale */
h1: 2.25rem (36px) → 1.5rem (24px) on mobile
h2: 1.875rem (30px) → 1.25rem (20px) on mobile  
h3: 1.5rem (24px) → 1.125rem (18px) on mobile
h4: 1.25rem (20px) → 1rem (16px) on mobile
p: 1rem (16px) → 0.875rem (14px) on mobile
lead: 1.25rem (20px) → 1.125rem (18px) on mobile
large: 1.125rem (18px) → 1rem (16px) on mobile
small: 0.875rem (14px) → 0.75rem (12px) on mobile
```

### Responsive Behavior Deep Dive

#### How Responsive Typography Works

The typography system automatically detects the current viewport width and applies the appropriate font size and line height:

```tsx
// Example: How H1 adapts across breakpoints
<TypographyH1 themeData={themeData}>
  {/* 
    Mobile (< 640px): 1.5rem font-size, 2rem line-height
    Tablet (640px-767px): 2rem font-size, 2.25rem line-height  
    Desktop (768px-1023px): 2.25rem font-size, 2.5rem line-height
    Large Desktop (≥ 1024px): 2.5rem font-size, 2.75rem line-height
  */}
  Responsive Heading
</TypographyH1>
```

#### Fallback Chain

If a specific breakpoint value isn't configured, the system uses a smart fallback chain:

```tsx
// Fallback priority for mobile breakpoint:
// 1. mobile value (if exists)
// 2. tablet value (if exists) 
// 3. desktop value (if exists)
// 4. largeDesktop value (if exists)
// 5. undefined (no styling applied)

// Example configuration with missing mobile value:
{
  "h1": {
    "fontSize": {
      "tablet": "2rem",
      "desktop": "2.25rem",
      "largeDesktop": "2.5rem"
      // mobile is missing, will fallback to tablet (2rem)
    }
  }
}
```

#### Performance Optimization

The responsive system is optimized for performance:

```tsx
// ✅ Good: Automatic responsive behavior (recommended)
<TypographyH1 themeData={themeData}>
  Automatically responsive
</TypographyH1>

// ✅ Good: Manual breakpoint when needed
<TypographyH1 breakpoint="mobile" themeData={themeData}>
  Force mobile size
</TypographyH1>

// ❌ Avoid: Unnecessary manual breakpoints
<TypographyH1 breakpoint="desktop" themeData={themeData}>
  Unnecessary manual breakpoint
</TypographyH1>
```

### Real-World Typography Examples

#### Blog Post Layout

```tsx
const BlogPost = ({ themeData, post }) => {
  return (
    <article className="max-w-4xl mx-auto px-4">
      {/* Hero Section */}
      <header className="mb-8">
        <TypographyH1 themeData={themeData} className="mb-4">
          {post.title}
        </TypographyH1>
        <TypographyLead themeData={themeData} className="text-muted-foreground">
          {post.excerpt}
        </TypographyLead>
        <div className="flex items-center gap-4 mt-6">
          <TypographySmall themeData={themeData} className="text-muted-foreground">
            By {post.author}
          </TypographySmall>
          <TypographySmall themeData={themeData} className="text-muted-foreground">
            {post.publishedAt}
          </TypographySmall>
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        {post.content.map((block, index) => {
          switch (block.type) {
            case 'heading':
              return (
                <TypographyH2 key={index} themeData={themeData} className="mt-8 mb-4">
                  {block.content}
                </TypographyH2>
              )
            case 'paragraph':
              return (
                <TypographyP key={index} themeData={themeData} className="mb-4">
                  {block.content}
                </TypographyP>
              )
            case 'list':
              return (
                <TypographyList key={index} themeData={themeData} className="mb-4">
                  {block.items.map((item, itemIndex) => (
                    <TypographyListItem key={itemIndex}>
                      {item}
                    </TypographyListItem>
                  ))}
                </TypographyList>
              )
            case 'quote':
              return (
                <TypographyBlockquote key={index} themeData={themeData} className="my-6">
                  {block.content}
                </TypographyBlockquote>
              )
            default:
              return null
          }
        })}
      </div>
    </article>
  )
}
```

#### Product Card Component

```tsx
const ProductCard = ({ themeData, product }) => {
  return (
    <div className="bg-card-background rounded-lg shadow-md overflow-hidden">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <TypographyH3 themeData={themeData} className="mb-2">
          {product.name}
        </TypographyH3>
        <TypographyP themeData={themeData} className="text-muted-foreground mb-4">
          {product.description}
        </TypographyP>
        <div className="flex items-center justify-between">
          <TypographyLarge themeData={themeData} className="font-bold text-primary">
            ${product.price}
          </TypographyLarge>
          <button className="bg-color-primary text-text-on-primary px-4 py-2 rounded hover:bg-primary-600 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
```

#### Dashboard Layout

```tsx
const DashboardLayout = ({ themeData, children }) => {
  return (
    <div className="min-h-screen bg-page-background">
      {/* Header */}
      <header className="bg-card-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <TypographyH1 themeData={themeData} className="text-xl">
            Dashboard
          </TypographyH1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="bg-card-background p-6 rounded-lg">
            <TypographyH3 themeData={themeData} className="text-muted-foreground mb-2">
              Total Users
            </TypographyH3>
            <TypographyH1 themeData={themeData} className="text-3xl">
              1,234
            </TypographyH1>
          </div>
          
          <div className="bg-card-background p-6 rounded-lg">
            <TypographyH3 themeData={themeData} className="text-muted-foreground mb-2">
              Revenue
            </TypographyH3>
            <TypographyH1 themeData={themeData} className="text-3xl">
              $45,678
            </TypographyH1>
          </div>
          
          <div className="bg-card-background p-6 rounded-lg">
            <TypographyH3 themeData={themeData} className="text-muted-foreground mb-2">
              Orders
            </TypographyH3>
            <TypographyH1 themeData={themeData} className="text-3xl">
              567
            </TypographyH1>
          </div>
        </div>

        {/* Content Area */}
        <div className="mt-8">
          {children}
        </div>
      </main>
    </div>
  )
}
```

#### Form Components

```tsx
const ContactForm = ({ themeData }) => {
  return (
    <form className="max-w-2xl mx-auto space-y-6">
      <div>
        <TypographyH2 themeData={themeData} className="mb-6">
          Contact Us
        </TypographyH2>
        <TypographyP themeData={themeData} className="text-muted-foreground mb-8">
          Get in touch with our team. We'd love to hear from you.
        </TypographyP>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block mb-2">
            <TypographySmall themeData={themeData} className="font-medium">
              Name
            </TypographySmall>
          </label>
          <input 
            type="text" 
            className="w-full p-3 border border-border rounded-md bg-card-background text-text-on-card"
          />
        </div>

        <div>
          <label className="block mb-2">
            <TypographySmall themeData={themeData} className="font-medium">
              Email
            </TypographySmall>
          </label>
          <input 
            type="email" 
            className="w-full p-3 border border-border rounded-md bg-card-background text-text-on-card"
          />
        </div>

        <div>
          <label className="block mb-2">
            <TypographySmall themeData={themeData} className="font-medium">
              Message
            </TypographySmall>
          </label>
          <textarea 
            rows={4}
            className="w-full p-3 border border-border rounded-md bg-card-background text-text-on-card"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-color-primary text-text-on-primary py-3 px-6 rounded-md hover:bg-primary-600 transition-colors"
        >
          <TypographyLarge themeData={themeData}>
            Send Message
          </TypographyLarge>
        </button>
      </div>
    </form>
  )
}
```

## 🎛️ Layout & Spacing

### Container Width

Control the maximum width of your main content container:

```tsx
// In your layout component
<div 
  className="mx-auto"
  style={{ maxWidth: `${themeData?.layout?.maxWidth || 1280}px` }}
>
  {/* Your content */}
</div>
```

### Spacing Scale

The plugin provides a consistent spacing system:

```css
--spacing-xs: 0.25rem   /* 4px */
--spacing-sm: 0.5rem    /* 8px */
--spacing-md: 1rem      /* 16px */
--spacing-lg: 2rem      /* 32px */
--spacing-xl: 4rem      /* 64px */
```

## 🚀 Getting Started

### 1. Install the Plugin

```bash
npm install your-theme-plugin
```

### 2. Add to Payload Config

```tsx
import { themeGlobal } from 'your-theme-plugin'

export default buildConfig({
  globals: [
    themeGlobal,
    // ... other globals
  ],
})
```

### 3. Use in Your Components

#### Server-Side Rendering (Recommended)

```tsx
import { getThemeFromPayload } from 'your-theme-plugin/actions'

// In your page component
export default async function Page() {
  const themeData = await getThemeFromPayload(payload, 'theme')
  
  return (
    <div className="bg-card-background text-text-on-card">
      <TypographyH1 themeData={themeData}>
        Welcome to My Site
      </TypographyH1>
      <TypographyP themeData={themeData}>
        This text uses your theme's typography settings.
      </TypographyP>
    </div>
  )
}
```

#### Client-Side Loading

```tsx
'use client'
import { useState, useEffect } from 'react'
import { getClientTheme } from 'your-theme-plugin/actions'

const MyComponent = () => {
  const [themeData, setThemeData] = useState(null)

  useEffect(() => {
    const loadTheme = async () => {
      const theme = await getClientTheme()
      setThemeData(theme)
    }
    loadTheme()
  }, [])

  if (!themeData) return <div>Loading...</div>

  return (
    <div className="bg-card-background text-text-on-card">
      <TypographyH1 themeData={themeData}>
        Welcome to My Site
      </TypographyH1>
      <TypographyP themeData={themeData}>
        This text uses your theme's typography settings.
      </TypographyP>
    </div>
  )
}
```

## 🎨 Admin Panel

Access your theme settings in the Payload admin panel:

### 1. Website Colors Tab
- Configure semantic colors (primary, secondary, backgrounds, text colors)
- Real-time color preview
- Color contrast validation

### 2. Typography Tab
- Set font families for body and headings
- Configure responsive typography for each element
- Set text direction (LTR/RTL/Auto)
- Live typography preview

### 3. Layout & Spacing Tab
- Control container width
- Configure spacing scales

### Color Picker Features

The admin panel includes a custom color picker that:

- Supports hex, RGB, and HSL color formats
- Provides color contrast validation
- Shows real-time preview of color changes
- Generates complete color scales automatically

## 🔄 Real-time Updates

The plugin provides real-time theme updates:

```tsx
// Listen for theme changes
useEffect(() => {
  const handleThemeUpdate = () => {
    // Reload theme data
    loadTheme()
  }

  window.addEventListener('theme-update', handleThemeUpdate)
  return () => window.removeEventListener('theme-update', handleThemeUpdate)
}, [])
```

## 🎯 Best Practices

### Typography Best Practices

#### 1. Use the Typography Hierarchy

```tsx
// ✅ Good: Proper hierarchy
<TypographyH1 themeData={themeData}>Main Title</TypographyH1>
<TypographyH2 themeData={themeData}>Section Title</TypographyH2>
<TypographyH3 themeData={themeData}>Subsection</TypographyH3>
<TypographyP themeData={themeData}>Body text</TypographyP>

// ❌ Avoid: Skipping levels
<TypographyH1 themeData={themeData}>Main Title</TypographyH1>
<TypographyH3 themeData={themeData}>Section Title</TypographyH3> // Skipped H2
```

#### 2. Leverage Responsive Typography

```tsx
// ✅ Good: Let the system handle responsiveness
<TypographyH1 themeData={themeData}>
  This automatically adapts to screen size
</TypographyH1>

// ✅ Good: Manual breakpoint when needed
<TypographyH1 breakpoint="mobile" themeData={themeData}>
  Force mobile size
</TypographyH1>
```

#### 3. Use Semantic Typography Components

```tsx
// ✅ Good: Use semantic components
<TypographyLead themeData={themeData}>
  Introduction paragraph
</TypographyLead>

<TypographyMuted themeData={themeData}>
  Secondary information
</TypographyMuted>

// ❌ Avoid: Generic styling
<p className="text-lg text-gray-600">
  Introduction paragraph
</p>
```

### Color Usage Best Practices

#### 1. Use Semantic Colors for Consistency

```tsx
// ✅ Good: Semantic colors
<button className="bg-color-primary text-text-on-primary">
  Primary Action
</button>

<div className="bg-card-background text-text-on-card">
  Card Content
</div>

// ❌ Avoid: Hard-coded colors
<button className="bg-blue-500 text-white">
  Primary Action
</button>
```

#### 2. Use Color Scales for UI Elements

```tsx
// ✅ Good: Color scales for variations
<button className="bg-primary-500 hover:bg-primary-600">
  Primary Button
</button>

<div className="bg-secondary-100 text-secondary-900">
  Secondary Background
</div>
```

#### 3. Ensure Accessibility

```tsx
// ✅ Good: Test contrast ratios
// The plugin automatically validates color contrast in the admin panel

// Use semantic colors that are tested for accessibility
<div className="bg-color-primary text-text-on-primary">
  High contrast text
</div>
```

### Layout Best Practices

#### 1. Use Container Width Setting

```tsx
// ✅ Good: Responsive container
<div 
  className="mx-auto px-4"
  style={{ maxWidth: `${themeData?.layout?.maxWidth || 1280}px` }}
>
  <TypographyH1 themeData={themeData}>Content</TypographyH1>
</div>
```

#### 2. Consistent Spacing

```tsx
// ✅ Good: Use spacing scale
<div className="space-y-4"> {/* Uses theme spacing */}
  <TypographyH1 themeData={themeData}>Title</TypographyH1>
  <TypographyP themeData={themeData}>Content</TypographyP>
</div>
```

## 🔧 Advanced Customization

### Custom Typography Styles

```tsx
// Custom component that extends theme typography
const CustomHeading = ({ children, themeData, ...props }) => {
  return (
    <TypographyH1 
      themeData={themeData}
      className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent"
      {...props}
    >
      {children}
    </TypographyH1>
  )
}
```

### Responsive Hook Usage

```tsx
import { useResponsiveTypography } from 'your-theme-plugin/utils/typography/useResponsiveValue'

const CustomComponent = ({ themeData }) => {
  const { currentBreakpoint, fontSize, lineHeight } = useResponsiveTypography(
    themeData?.typography?.elements?.h1?.fontSize,
    themeData?.typography?.elements?.h1?.lineHeight
  )

  return (
    <h1 style={{ fontSize, lineHeight }}>
      Current breakpoint: {currentBreakpoint}
    </h1>
  )
}
```

### Theme Provider Pattern

```tsx
// Create a theme context for your app
import { createContext, useContext } from 'react'

const ThemeContext = createContext(null)

export const ThemeProvider = ({ children, themeData }) => {
  return (
    <ThemeContext.Provider value={themeData}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const theme = useContext(ThemeContext)
  if (!theme) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return theme
}

// Usage
const MyComponent = () => {
  const themeData = useTheme()
  
  return (
    <TypographyH1 themeData={themeData}>
      Using theme context
    </TypographyH1>
  )
}
```

## 🐛 Troubleshooting

### Typography Issues

#### 1. Fonts Not Loading

```tsx
// Check font loading in browser dev tools
// Ensure font files are accessible
// Verify font family names match exactly

// Debug font loading
console.log('Theme typography:', themeData?.typography)
```

#### 2. Responsive Typography Not Working

```tsx
// Check if responsive data exists
console.log('H1 responsive data:', themeData?.typography?.elements?.h1)

// Verify breakpoint detection
import { getCurrentBreakpoint } from 'your-theme-plugin/utils/typography/getResponsiveValue'
console.log('Current breakpoint:', getCurrentBreakpoint())
```

#### 3. Theme Data Not Available

```tsx
// Check if theme data is being fetched correctly
useEffect(() => {
  console.log('Theme data:', themeData)
}, [themeData])

// Verify the theme global slug matches
const themeData = await getThemeFromPayload(payload, 'theme') // 'theme' is the default slug
```

### Color Issues

#### 1. Colors Not Updating

```tsx
// Check CSS variable application
console.log('CSS variables:', getComputedStyle(document.documentElement))

// Verify color values
console.log('Theme colors:', themeData?.colorPrimary, themeData?.colorSecondary)
```

#### 2. Color Scales Not Generated

```tsx
// Check if color scale generation is working
import { generateColorScale } from 'your-theme-plugin/utils/color-palette/color-palette'

const scale = generateColorScale('#3b82f6', 'primary')
console.log('Generated scale:', scale)
```

## 📚 API Reference

### Theme Data Structure

```tsx
interface ThemeData {
  // Color primitives (50-950 scales)
  primary50: string
  primary100: string
  // ... (all primary/secondary scales)
  
  // Semantic colors
  colorPrimary: string
  colorSecondary: string
  cardBackground: string
  pageBackground: string
  textOnCard: string
  textOnPage: string
  textOnPrimary: string
  textOnSecondary: string
  
  // Typography configuration
  typography: {
    fontFamily: string
    headingFont: string
    fontWeight: {
      normal: number
      bold: number
    }
    elements: {
      h1: {
        fontSize: string | ResponsiveValues
        lineHeight: string | ResponsiveValues
      }
      h2: { /* ... */ }
      h3: { /* ... */ }
      h4: { /* ... */ }
      p: { /* ... */ }
      lead: { /* ... */ }
      large: { /* ... */ }
      small: { /* ... */ }
      muted: { /* ... */ }
      blockquote: { /* ... */ }
      inlineCode: { /* ... */ }
      list: { /* ... */ }
      table: { /* ... */ }
    }
  }
  
  // Layout configuration
  layout?: {
    maxWidth: number
  }
}

interface ResponsiveValues {
  mobile?: string
  tablet?: string
  desktop?: string
  largeDesktop?: string
}
```

### Available Functions

#### Theme Data Fetching

```tsx
// Server-side theme fetching
getThemeFromPayload(payload: Payload, slug?: string): Promise<ThemeData>

// Client-side theme fetching
getClientTheme(): Promise<ThemeData>
```

#### Color Utilities

```tsx
// Generate color scales
generateColorScale(baseColor: string, variableName: string): Record<string, string>

// Validate color format
isValidColor(color: string): boolean
```

#### Typography Utilities

```tsx
// Get current breakpoint
getCurrentBreakpoint(): 'mobile' | 'tablet' | 'desktop' | 'largeDesktop'

// Get responsive value
getResponsiveValue(obj: Record<string, any>, breakpoint?: string): string | undefined

// Get responsive font size
getFontSize(obj: Record<string, any>, breakpoint?: string): string

// Get responsive line height
getLineHeight(obj: Record<string, any>, breakpoint?: string): string
```

#### React Hooks

```tsx
// Responsive typography hook
useResponsiveTypography(
  fontSizeObj: Record<string, any> | undefined,
  lineHeightObj: Record<string, any> | undefined
): {
  currentBreakpoint: string
  fontSize: string
  lineHeight: string
  style: React.CSSProperties
  isClient: boolean
}

// Responsive value hook
useResponsiveValue(): {
  currentBreakpoint: string
  getFontSize: (obj: Record<string, any>) => string
  getLineHeight: (obj: Record<string, any>) => string
  isClient: boolean
}
```

### Component Props

All typography components accept these props:

```tsx
interface TypographyProps {
  breakpoint?: 'desktop' | 'largeDesktop' | 'mobile' | 'tablet'
  children: React.ReactNode
  className?: string
  dir?: 'auto' | 'ltr' | 'rtl'
  style?: React.CSSProperties
  themeData?: ThemeData
} & React.HTMLAttributes<HTMLElement>
```

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for details on:

- Code style and standards
- Testing requirements
- Pull request process
- Issue reporting

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Happy theming! 🎨**

Transform your website's visual identity with powerful, responsive typography and dynamic color systems. The Theme Global Plugin makes it easy to create beautiful, accessible, and consistent designs that adapt perfectly to every screen size.
