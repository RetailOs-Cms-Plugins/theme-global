# Theme Global Plugin

[![npm version](https://badge.fury.io/js/theme-global.svg)](https://badge.fury.io/js/theme-global)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A powerful Payload CMS plugin that provides comprehensive theme management capabilities with dynamic color palettes, responsive typography systems, and layout controls. This plugin allows you to manage your website's visual identity directly from the Payload admin panel with real-time previews and responsive design support.

## 📋 Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Color System](#-color-system)
- [Typography System](#-typography-system)
- [Layout & Spacing](#-layout--spacing)
- [Admin Panel](#-admin-panel)
- [API Reference](#-api-reference)
- [Best Practices](#-best-practices)
- [Advanced Usage](#-advanced-usage)
- [Troubleshooting](#-troubleshooting)
- [Migration Guide](#-migration-guide)
- [Contributing](#-contributing)
- [Changelog](#-changelog)
- [License](#-license)

## ✨ Features

- 🎨 **Dynamic Color System** - Semantic colors with automatic scale generation (50-950)
- 📱 **Responsive Typography** - Auto-adapting typography across 4 breakpoints
- 🌐 **Multi-language Support** - English and Hebrew fonts with RTL support
- ⚡ **Real-time Updates** - Live preview and instant theme changes
- 🎯 **Accessibility First** - Built-in contrast validation and WCAG compliance
- 🔧 **Developer Friendly** - TypeScript support and comprehensive API
- 📊 **Admin Interface** - Intuitive Payload admin panel integration
- 🚀 **Performance Optimized** - Efficient CSS generation and caching

## 🚀 Quick Start

### For New Developers

If you're new to this design system, here's the fastest way to get started:

```tsx
// 1. Import the components you need
import { TypographyH1, TypographyP } from 'theme-global/components/theme/typography'

// 2. Get theme data (server-side recommended)
import { getThemeFromPayload } from 'theme-global/actions'

// 3. Use semantic colors and typography
export default async function MyPage() {
  const themeData = await getThemeFromPayload(payload, 'theme')
  
  return (
    <div className="bg-card text-card p-6 rounded-lg">
      <TypographyH1 themeData={themeData}>
        Welcome to My Site
      </TypographyH1>
      <TypographyP themeData={themeData}>
        This text automatically uses your theme's typography settings.
      </TypographyP>
      <button className="bg-primary text-on-primary px-4 py-2 rounded hover:bg-primary-600">
        Primary Button
      </button>
    </div>
  )
}
```

### Color Classes Quick Reference

```tsx
// Semantic Colors (Recommended)
bg-primary          // Primary background
bg-secondary        // Secondary background
bg-card             // Card/component background
bg-page             // Page background
text-on-primary     // Text on primary backgrounds
text-on-secondary   // Text on secondary backgrounds
text-card           // Text on card backgrounds
text-on-page        // Text on page background

// Color Scales (50-950)
bg-primary-50       // Lightest primary
bg-primary-500      // Base primary
bg-primary-950      // Darkest primary
bg-secondary-50     // Lightest secondary
bg-secondary-500    // Base secondary
bg-secondary-950    // Darkest secondary
```

### Typography Components Quick Reference

```tsx
// Headings
<TypographyH1 themeData={themeData}>Main Heading</TypographyH1>
<TypographyH2 themeData={themeData}>Section Heading</TypographyH2>
<TypographyH3 themeData={themeData}>Subsection</TypographyH3>
<TypographyH4 themeData={themeData}>Minor Heading</TypographyH4>

// Body Text
<TypographyP themeData={themeData}>Body text</TypographyP>
<TypographyLead themeData={themeData}>Lead paragraph</TypographyLead>
<TypographyLarge themeData={themeData}>Large text</TypographyLarge>
<TypographySmall themeData={themeData}>Small text</TypographySmall>
<TypographyMuted themeData={themeData}>Muted text</TypographyMuted>
```

## 📦 Installation

### 1. Install the Package

```bash
npm install theme-global
# or
yarn add theme-global
# or
pnpm add theme-global
```

### 2. Add to Payload Config

```tsx
// payload.config.ts
import { buildConfig } from 'payload/config'
import { themeGlobal } from 'theme-global'

export default buildConfig({
  globals: [
    themeGlobal,
    // ... other globals
  ],
  // ... rest of config
})
```

### 3. Set Up CSS Variables

Add the theme CSS to your global styles:

```css
/* globals.css */
@import 'theme-global/styles';
```

### 4. Configure Theme Provider (Optional)

For client-side components, wrap your app with the theme provider:

```tsx
// app/layout.tsx
import { ThemeProvider } from 'theme-global/components/theme'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

## 🎨 Color System

### Semantic Colors

The design system provides semantic color classes that automatically adapt to your theme:

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
// Using semantic colors (Recommended)
<button className="bg-primary text-on-primary px-4 py-2 rounded hover:bg-primary-600 transition-colors">
  Primary Button
</button>

<div className="bg-card text-card p-4 rounded">
  Card Content
</div>

// Using color scales for variations
<div className="bg-primary-100 text-primary-900 p-4 rounded">
  Light primary background with dark text
</div>

<button className="bg-secondary-500 text-on-secondary px-4 py-2 rounded hover:bg-secondary-600">
  Secondary Button
</button>

// Page layout example
<div className="bg-page text-on-page min-h-screen">
  <header className="bg-card text-card p-4">
    <h1>Website Header</h1>
  </header>
  
  <main className="bg-page text-on-page p-6">
    <div className="bg-card text-card p-4 rounded">
      Main content area
    </div>
  </main>
</div>
```

## 📝 Typography System

### Overview

The typography system provides semantic components that automatically use your theme's font settings and adapt responsively across different screen sizes.

### Available Components

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
} from 'theme-global/components/theme/typography'
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

<TypographySmall themeData={themeData}>
  Small text for captions and metadata.
</TypographySmall>
```

### Responsive Typography

#### Breakpoint System

The typography system uses four breakpoints that automatically adapt:

```typescript
const BREAKPOINTS = {
  mobile: 640,        // < 640px
  tablet: 768,        // 640px - 767px
  desktop: 1024,      // 768px - 1023px
  largeDesktop: 1280, // ≥ 1024px
}
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

#### Manual Breakpoint Control

You can manually specify which breakpoint to use:

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

### Typography Scale

Each typography element has default responsive values:

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

## 🎛️ Layout & Spacing

### Container Width

Control the maximum width of your main content container:

```tsx
// In your layout component
<div 
  className="mx-auto px-4"
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

## 🎨 Admin Panel

Access your theme settings in the Payload admin panel:

### 1. Website Colors Tab
- Configure semantic colors (primary, secondary, backgrounds, text colors)
- Real-time color preview with contrast validation
- Automatic color scale generation

### 2. Typography Tab
- Set font families for body and headings
- Configure responsive typography for each element
- Set text direction (LTR/RTL/Auto)
- Live typography preview across all breakpoints

### 3. Layout & Spacing Tab
- Control container width
- Configure spacing scales

### Color Picker Features

The admin panel includes a custom color picker that:

- Supports hex, RGB, and HSL color formats
- Provides real-time color contrast validation
- Shows live preview of color changes
- Generates complete color scales automatically

## 📚 API Reference

### Theme Data Fetching

#### Server-Side (Recommended)

```tsx
import { getThemeFromPayload } from 'theme-global/actions'

// In your page component
export default async function Page() {
  const themeData = await getThemeFromPayload(payload, 'theme')
  
  return (
    <div className="bg-card text-card">
      <TypographyH1 themeData={themeData}>
        Welcome to My Site
      </TypographyH1>
    </div>
  )
}
```

#### Client-Side

```tsx
'use client'
import { useState, useEffect } from 'react'
import { getClientTheme } from 'theme-global/actions'

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
    <div className="bg-card text-card">
      <TypographyH1 themeData={themeData}>
        Welcome to My Site
      </TypographyH1>
    </div>
  )
}
```

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
<button className="bg-primary text-on-primary">
  Primary Action
</button>

<div className="bg-card text-card">
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
<div className="bg-primary text-on-primary">
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

### Performance Best Practices

#### 1. Server-Side Rendering

```tsx
// ✅ Good: Server-side theme fetching (recommended)
export default async function Page() {
  const themeData = await getThemeFromPayload(payload, 'theme')
  return <MyComponent themeData={themeData} />
}

// ❌ Avoid: Client-side only when possible
const MyComponent = () => {
  const [themeData, setThemeData] = useState(null)
  // ... loading logic
}
```

#### 2. Optimize Re-renders

```tsx
// ✅ Good: Memoize theme-dependent components
const ThemedComponent = React.memo(({ themeData, children }) => {
  return (
    <TypographyH1 themeData={themeData}>
      {children}
    </TypographyH1>
  )
})
```

## 🔧 Advanced Usage

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
import { useResponsiveTypography } from 'theme-global/utils/typography/useResponsiveValue'

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

### Real-time Theme Updates

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

## 🐛 Troubleshooting

### Common Issues

#### 1. Theme Data Not Available

```tsx
// Check if theme data is being fetched correctly
useEffect(() => {
  console.log('Theme data:', themeData)
}, [themeData])

// Verify the theme global slug matches
const themeData = await getThemeFromPayload(payload, 'theme') // 'theme' is the default slug
```

#### 2. Colors Not Updating

```tsx
// Check CSS variable application
console.log('CSS variables:', getComputedStyle(document.documentElement))

// Verify color values
console.log('Theme colors:', themeData?.colorPrimary, themeData?.colorSecondary)
```

#### 3. Typography Not Working

```tsx
// Check if responsive data exists
console.log('H1 responsive data:', themeData?.typography?.elements?.h1)

// Verify breakpoint detection
import { getCurrentBreakpoint } from 'theme-global/utils/typography/getResponsiveValue'
console.log('Current breakpoint:', getCurrentBreakpoint())
```

#### 4. Fonts Not Loading

```tsx
// Check font loading in browser dev tools
// Ensure font files are accessible
// Verify font family names match exactly

// Debug font loading
console.log('Theme typography:', themeData?.typography)
```

### Debug Mode

Enable debug mode to get more detailed information:

```tsx
// Set debug flag
process.env.THEME_DEBUG = 'true'

// Check console for detailed logs
```

### Performance Issues

#### 1. Slow Theme Loading

```tsx
// ✅ Good: Cache theme data
const themeData = await getThemeFromPayload(payload, 'theme', {
  cache: true,
  cacheTime: 300000 // 5 minutes
})

// ❌ Avoid: Fetching on every render
const themeData = await getThemeFromPayload(payload, 'theme')
```

#### 2. Large Bundle Size

```tsx
// ✅ Good: Dynamic imports for non-critical components
const TypographyPreview = dynamic(() => import('./TypographyPreview'), {
  loading: () => <div>Loading...</div>
})

// ❌ Avoid: Importing everything upfront
import { TypographyPreview } from 'theme-global/components'
```

## 🔄 Migration Guide

### From v1.x to v2.x

#### Breaking Changes

1. **Class Name Changes**
   ```tsx
   // Old
   className="bg-color-primary"
   
   // New
   className="bg-primary"
   ```

2. **Typography Component Changes**
   ```tsx
   // Old
   <TypographyH1 theme={themeData}>
   
   // New
   <TypographyH1 themeData={themeData}>
   ```

3. **API Changes**
   ```tsx
   // Old
   import { getTheme } from 'theme-global'
   
   // New
   import { getThemeFromPayload } from 'theme-global/actions'
   ```

#### Migration Steps

1. Update all class names to use the new semantic naming
2. Change `theme` prop to `themeData` in all typography components
3. Update import statements to use new API endpoints
4. Test all components for proper rendering

### From Custom Theme System

1. Replace hard-coded colors with semantic classes
2. Replace custom typography with theme components
3. Update layout components to use theme spacing
4. Test accessibility and responsive behavior

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/your-org/theme-global.git
cd theme-global

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Code Style

- Use TypeScript for all new code
- Follow the existing code style and patterns
- Write tests for new features
- Update documentation for API changes

### Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Update documentation
6. Submit a pull request

## 📋 Changelog

### [2.0.0] - 2024-01-15

#### Added
- Semantic color system with automatic scale generation
- Responsive typography with 4 breakpoints
- Multi-language font support (English & Hebrew)
- Real-time theme updates
- Accessibility features with contrast validation
- TypeScript support throughout

#### Changed
- Renamed color classes for better semantics
- Updated typography component API
- Improved performance with better caching
- Enhanced admin panel interface

#### Fixed
- Color scale generation issues
- Responsive typography breakpoint detection
- Font loading performance
- CSS variable application

### [1.0.0] - 2023-12-01

#### Added
- Initial release
- Basic color management
- Simple typography system
- Payload CMS integration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Payload CMS](https://payloadcms.com/) for the excellent headless CMS
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Google Fonts](https://fonts.google.com/) for the font library
- All contributors who helped make this plugin better

---

**Happy theming! 🎨**

Transform your website's visual identity with powerful, responsive typography and dynamic color systems. The Theme Global Plugin makes it easy to create beautiful, accessible, and consistent designs that adapt perfectly to every screen size.

For support, questions, or feature requests, please [open an issue](https://github.com/your-org/theme-global/issues) on GitHub.
