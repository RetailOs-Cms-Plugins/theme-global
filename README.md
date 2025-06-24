# Theme Global Plugin

A powerful Payload CMS plugin that provides comprehensive theme management capabilities with dynamic color palettes, typography systems, and layout controls. This plugin allows you to manage your website's visual identity directly from the Payload admin panel.

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

### Typography Components

The plugin provides a complete set of typography components that automatically apply your theme settings:

```tsx
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
  TypographyBlockquote,
  TypographyList,
  TypographyListItem,
  TypographyTable,
  TypographyTableHeader,
  TypographyTableBody,
  TypographyTableRow,
  TypographyTableCell,
  TypographyTableHeaderCell,
  TypographyInlineCode,
} from 'your-theme-plugin/components/theme/typography'

// Usage
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

### Font Families

The plugin supports both English and Hebrew fonts:

**English Fonts:**

- Inter, Poppins, Manrope, DM Sans, Nunito, Epilogue, Mulish, Lexend, Public Sans, Jost, Sora

**Hebrew Fonts:**

- Asimon Hebrew, Frank Ruhl Libre, Noto Sans Hebrew, Noto Serif Hebrew, Noto Rashi Hebrew, Heebo, Rubik, Assistant, Secular One, Suez One, Alef, Miriam Libre

### Typography Settings

Each typography element can be customized with:

- Font family (body or heading fonts)
- Font size
- Line height
- Font weight
- Text direction (LTR/RTL/Auto)

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

```tsx
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

1. **Website Colors Tab**: Configure semantic colors (primary, secondary, backgrounds, text colors)
2. **Typography Tab**: Set font families, typography scales, and text direction
3. **Layout & Spacing Tab**: Control container width and spacing scales

### Color Picker

The admin panel includes a custom color picker that:

- Supports hex, RGB, and HSL color formats
- Provides color contrast validation
- Shows real-time preview of color changes

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

### Color Usage

- Use semantic colors for consistent branding
- Use color scales for UI elements (buttons, cards, etc.)
- Ensure proper contrast ratios for accessibility
- Test colors in both light and dark modes

### Typography

- Use the provided typography components for consistency
- Respect the established hierarchy (H1 → H2 → H3 → P)
- Consider text direction for multilingual sites
- Test typography at different screen sizes

### Layout

- Use the container width setting for responsive design
- Apply consistent spacing using the spacing scale
- Consider breakpoints for mobile-first design

## 🔧 Customization

### Extending Color Scales

You can extend the color system by adding custom CSS variables:

```css
:root {
  --custom-accent: #ff6b6b;
  --custom-accent-light: #ff8e8e;
  --custom-accent-dark: #e55555;
}
```

### Custom Typography

Add custom typography styles while maintaining the theme system:

```css
.custom-heading {
  font-family: var(--font-heading);
  font-size: 3rem;
  line-height: 1.2;
  color: var(--color-primary);
}
```

## 🐛 Troubleshooting

### Colors Not Updating

1. Check that the theme data is being fetched correctly
2. Verify CSS variables are being applied to the document
3. Clear browser cache and reload

### Typography Issues

1. Ensure font families are properly loaded
2. Check that typography components receive themeData prop
3. Verify font files are accessible

### Layout Problems

1. Confirm maxWidth value is being read correctly
2. Check that CSS variables are defined
3. Verify responsive breakpoints

## 📚 API Reference

### Theme Data Structure

```tsx
interface ThemeData {
  // Color primitives
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
  
  // Typography
  typography: {
    fontFamily: string
    fallbackFonts: string[]
  }
  
  // Layout
  layout?: {
    maxWidth: number
  }
}
```

### Available Functions

- `getClientTheme()`: Fetch theme data on the client
- `getThemeFromPayload(payload, slug)`: Fetch theme data on the server
- `generateColorScale(baseColor, variableName)`: Generate color scales

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
