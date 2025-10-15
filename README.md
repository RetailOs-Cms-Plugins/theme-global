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

## 📦 Installation

### 1. Install the Package

```bash
npm install @retailos-ai/cms-theme-global
# or
yarn add @retailos-ai/cms-theme-global
# or
pnpm add @retailos-ai/cms-theme-global
```

### 2. Add to Payload Config

```tsx
// payload.config.ts (or into plugins file)
import { themeGlobalPlugin } from '@retailos-ai/cms-theme-global'

export default buildConfig({
  plugins: [
    themeGlobalPlugin({
      enabled: true,
      enableLivePreview: true,
    }),
    // ... other globals
  ],
  // ... rest of config
})
```

### 3. Create a Folder design-system & page file

```tsx
// app/(frontent)/design-system/page.tsx
import config from '@payload-config'
import { Suspense } from 'react'
import { DesignSystemPage, ThemeLoader } from '@retailos-ai/cms-theme-global/client'
import { getTheme } from '@retailos-ai/cms-theme-global/rsc'

export default async function Page() {
  const themeData = await getTheme({ config })
  return (
    <Suspense fallback={<ThemeLoader />}>
      <DesignSystemPage themeData={themeData.themeData} />
    </Suspense>
  )
}
```

### 3. Set Up CSS Variables

Add the theme CSS to your global styles:

```css
/* globals.css */
@import "tailwindcss";
@import "tw-animate-css";
@import "../../node_modules/@retailos-ai/cms-theme-global/dist/styles/globalTheme.css";
@config "../../tailwind.config.mjs";
/* 
...other imports or styles 
*/
```

### 4. Configure Theme Provider (Optional)

For client-side components, wrap your app with the theme provider:

```tsx
// app/(frontent)/layout.tsx
import config from '@payload-config'
import { FontHead, ThemeProvider } from '@retailos-ai/cms-theme-global/client'
import { getTheme } from '@retailos-ai/cms-theme-global/rsc'


export default function RootLayout({ children }) {
  const { cssVariables, fontCSS, themeData } = await getTheme({ config })
  const { fontBody, fontHeading } = themeData.typography || {}

  return (
    <html
      className="font-family"
      lang="en" 
      suppressHydrationWarning
      dir={(cssVariables as Record<string, string>)['--theme-font-direction'] || 'ltr'}
      style={cssVariables}
    >
      <head>
        {fontBody && <FontHead fontName={fontBody} />}
        {fontHeading && <FontHead fontName={fontHeading} />}ß
        {fontCSS && <style dangerouslySetInnerHTML={{ __html: fontCSS }} />}
      </head>
      <body>
        <ThemeProvider themeData={themeData}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

## 🎨 Color System

### Color Classes Quick Reference

```tsx
// Semantic Colors (Recommended)
bg-primary          // Primary background
bg-secondary        // Secondary background
bg-card             // Card/component background
bg-page             // Page background
text-on-primary     // Text on primary backgrounds
text-on-secondary   // Text on secondary backgrounds
text-on-card           // Text on card backgrounds
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

### Available Components

```tsx
import { Typography } from '@retailos-ai/cms-theme-global/client'

// Headings
<Typography tagType="h1" themeData={themeData}>Heading (h1)</Typography>
<Typography tagType="h2" themeData={themeData}>Heading (h2)</Typography>
<Typography tagType="h3" themeData={themeData}>Heading (h3)</Typography>
<Typography tagType="h4" themeData={themeData}>Heading (h4)</Typography>
<Typography tagType="h4" themeData={themeData}>Heading (h5)</Typography>
<Typography tagType="h4" themeData={themeData}>Heading (h6)</Typography>

// Body Text
<Typography tagType="p" themeData={themeData}>Body text</Typography>
<Typography tagType="lead" themeData={themeData}>Lead paragraph</Typography>
<Typography tagType="large" themeData={themeData}>Large text</Typography>
<Typography tagType="small" themeData={themeData}>Small text</Typography>
<Typography tagType="muted" themeData={themeData}>Muted text</Typography>
<Typography tagType="code" themeData={themeData}>Code text</Typography>
```

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

<div className="bg-card text-on-card p-4 rounded">
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
  <header className="bg-card text-on-card p-4">
    <h1>Website Header</h1>
  </header>
  
  <main className="bg-page text-on-page p-6">
    <div className="bg-card text-on-card p-4 rounded">
      Main content area
    </div>
  </main>
</div>
```

## 📝 Typography System

### Overview

The typography system provides semantic components that automatically use your theme's font settings and adapt responsively across different screen sizes.

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
<Typography tagType="h1" themeData={themeData}>
  This heading automatically adapts to screen size
</Typography>

<Typography tagType="p" themeData={themeData}>
  This paragraph automatically adapts to screen size
</Typography>
```

#### Manual Breakpoint Control

You can manually specify which breakpoint to use:

```tsx
// Force mobile breakpoint
<Typography tagType="h1" breakpoint="mobile" themeData={themeData}>
  Mobile-sized heading
</Typography>

// Force desktop breakpoint
<Typography tagType="p" breakpoint="desktop" themeData={themeData}>
  Desktop-sized paragraph
</Typography>
```
