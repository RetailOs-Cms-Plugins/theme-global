'use client'
import type { JSONFieldClient } from 'payload'

import React, { useState } from 'react'

import type { ThemeConfig } from '../../types/theme.types.js'
import type { TailwindTheme } from '../../utils/color-palette/color-palette'

import { ColorInput, TypographySelector } from '../../components/theme/index.js'
import { generateColorScale, TAILWIND_THEMES } from '../../utils/color-palette/color-palette'
import styles from './Component.module.css'

interface ThemeComponentProps extends JSONFieldClient {
  /** Whether the component is disabled */
  disabled?: boolean
  /** Validation errors for the theme fields */
  errors?: {
    [key: string]: string | undefined
    cardBackground?: string
    colorPrimary?: string
    colorSecondary?: string
    pageBackground?: string
    textOnCard?: string
    textOnPage?: string
    textOnPrimary?: string
    textOnSecondary?: string
    typography?: string
  }
  /** Callback when theme configuration changes */
  onChange?: (value: ThemeConfig) => void
  /** Current theme configuration value */
  value?: ThemeConfig
}

// Default theme configuration
const DEFAULT_THEME: { fontWeight?: { bold: number; normal: number } } & ThemeConfig = {
  cardBackground: '#faf5ff',
  colorPrimary: '#3b82f6',
  colorSecondary: '#10b981',
  fontWeight: {
    bold: 700,
    normal: 400,
  },
  pageBackground: '#faf5ff',
  primary50: '#faf5ff',
  primary100: '#f3e8ff',
  primary200: '#e9d5ff',
  primary300: '#d8b4fe',
  primary400: '#c084fc',
  primary500: 'var(--color-primary-500)',
  primary600: '#9333ea',
  primary700: '#7e22ce',
  primary800: '#6d28d9',
  primary900: '#581c87',
  primary950: '#3b0764',
  secondary50: '#f0f9ff',
  secondary100: '#e0f2fe',
  secondary200: '#bae6fd',
  secondary300: '#7dd3fc',
  secondary400: 'var(--color-secondary-400)',
  secondary500: '#0ea5e9',
  secondary600: '#0284c7',
  secondary700: '#0369a1',
  secondary800: '#075985',
  secondary900: '#0c4a6e',
  secondary950: '#082f49',
  textOnCard: '#581c87',
  textOnPage: '#581c87',
  textOnPrimary: '#fff',
  textOnSecondary: '#0c4a6e',
  typography: {
    blockquote: { fontSize: '1.125rem', lineHeight: '1.75rem' },
    fontBody: 'Inter, system-ui, sans-serif',
    fontHeading: 'Inter, system-ui, sans-serif',
    h1: { fontSize: '2.25rem', lineHeight: '2.5rem' },
    h2: { fontSize: '1.875rem', lineHeight: '2.25rem' },
    h3: { fontSize: '1.5rem', lineHeight: '2rem' },
    h4: { fontSize: '1.25rem', lineHeight: '1.75rem' },
    inlineCode: { fontSize: '0.875rem', lineHeight: '1.25rem' },
    large: { fontSize: '1.125rem', lineHeight: '1.75rem' },
    lead: { fontSize: '1.25rem', lineHeight: '1.75rem' },
    list: { fontSize: '1rem', lineHeight: '1.75rem' },
    muted: { fontSize: '0.875rem', lineHeight: '1.25rem' },
    p: { fontSize: '1rem', lineHeight: '1.5rem' },
    small: { fontSize: '0.875rem', lineHeight: '1.25rem' },
    table: { fontSize: '1rem', lineHeight: '1.5rem' },
  },
}

// Primitives
const PRIMITIVE_FIELDS: Array<{ label: string; name: keyof ThemeConfig }> = [
  { name: 'primary50', label: 'Primary 50' },
  { name: 'primary100', label: 'Primary 100' },
  { name: 'primary200', label: 'Primary 200' },
  { name: 'primary300', label: 'Primary 300' },
  { name: 'primary400', label: 'Primary 400' },
  { name: 'primary500', label: 'Primary 500' },
  { name: 'primary600', label: 'Primary 600' },
  { name: 'primary700', label: 'Primary 700' },
  { name: 'primary800', label: 'Primary 800' },
  { name: 'primary900', label: 'Primary 900' },
  { name: 'primary950', label: 'Primary 950' },
  { name: 'secondary50', label: 'Secondary 50' },
  { name: 'secondary100', label: 'Secondary 100' },
  { name: 'secondary200', label: 'Secondary 200' },
  { name: 'secondary300', label: 'Secondary 300' },
  { name: 'secondary400', label: 'Secondary 400' },
  { name: 'secondary500', label: 'Secondary 500' },
  { name: 'secondary600', label: 'Secondary 600' },
  { name: 'secondary700', label: 'Secondary 700' },
  { name: 'secondary800', label: 'Secondary 800' },
  { name: 'secondary900', label: 'Secondary 900' },
  { name: 'secondary950', label: 'Secondary 950' },
]

// Semantic
const SEMANTIC_FIELDS: Array<{ label: string; name: keyof ThemeConfig }> = [
  { name: 'colorPrimary', label: 'Primary (Semantic)' },
  { name: 'textOnPrimary', label: 'Text on Primary' },
  { name: 'colorSecondary', label: 'Secondary (Semantic)' },
  { name: 'textOnSecondary', label: 'Text on Secondary' },
  { name: 'cardBackground', label: 'Card Background' },
  { name: 'textOnCard', label: 'Text on Card' },
  { name: 'pageBackground', label: 'Page Background' },
  { name: 'textOnPage', label: 'Text on Page' },
]

// Add theme selector component
const ThemeSelector: React.FC<{
  onChange: (theme: TailwindTheme) => void
  value: TailwindTheme
}> = ({ onChange, value }) => {
  return (
    <div className={styles.themeSelector}>
      <select
        className={styles.themeSelect}
        onChange={(e) => onChange(e.target.value as TailwindTheme)}
        value={value}
      >
        {Object.entries(TAILWIND_THEMES).map(([key, theme]) => (
          <option key={key} value={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </option>
        ))}
      </select>
    </div>
  )
}

/**
 * ThemeComponent - Main component for theme configuration in Payload admin
 * Provides interface for managing colors and typography settings
 */
const ThemeComponent: React.FC<ThemeComponentProps> = ({
  disabled = false,
  errors,
  onChange,
  value = DEFAULT_THEME,
  ...props
}) => {
  const [activeTab, setActiveTab] = useState<'colors' | 'typography'>('colors')
  const [currentTheme, setCurrentTheme] = useState<TailwindTheme>('default')

  /**
   * Updates the theme configuration and calls onChange
   */
  const updateTheme = (updates: Partial<ThemeConfig>) => {
    const newTheme = { ...value, ...updates }
    if (onChange) {
      onChange(newTheme)
    }
    // Update CSS variables in real-time
    Object.entries(updates).forEach(([key, val]) => {
      if (typeof val === 'string' && val.startsWith('#')) {
        document.documentElement.style.setProperty(
          `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`,
          val,
        )
      }
    })
  }

  /**
   * Handles theme selection change
   */
  const handleThemeChange = (theme: TailwindTheme) => {
    setCurrentTheme(theme)
    const selectedTheme = TAILWIND_THEMES[theme]

    // Generate primary color palette
    const primaryPalette = generateColorScale(selectedTheme.primary, 'primary')
    const primaryUpdates: Partial<ThemeConfig> = {
      colorPrimary: selectedTheme.primary,
      primary50: primaryPalette['--color-primary-50'],
      primary100: primaryPalette['--color-primary-100'],
      primary200: primaryPalette['--color-primary-200'],
      primary300: primaryPalette['--color-primary-300'],
      primary400: primaryPalette['--color-primary-400'],
      primary500: primaryPalette['--color-primary-500'],
      primary600: primaryPalette['--color-primary-600'],
      primary700: primaryPalette['--color-primary-700'],
      primary800: primaryPalette['--color-primary-800'],
      primary900: primaryPalette['--color-primary-900'],
      primary950: primaryPalette['--color-primary-950'],
    }

    // Generate secondary color palette
    const secondaryPalette = generateColorScale(selectedTheme.secondary, 'secondary')
    const secondaryUpdates: Partial<ThemeConfig> = {
      colorSecondary: selectedTheme.secondary,
      secondary50: secondaryPalette['--color-secondary-50'],
      secondary100: secondaryPalette['--color-secondary-100'],
      secondary200: secondaryPalette['--color-secondary-200'],
      secondary300: secondaryPalette['--color-secondary-300'],
      secondary400: secondaryPalette['--color-secondary-400'],
      secondary500: secondaryPalette['--color-secondary-500'],
      secondary600: secondaryPalette['--color-secondary-600'],
      secondary700: secondaryPalette['--color-secondary-700'],
      secondary800: secondaryPalette['--color-secondary-800'],
      secondary900: secondaryPalette['--color-secondary-900'],
      secondary950: secondaryPalette['--color-secondary-950'],
    }

    // Update both palettes
    updateTheme({ ...primaryUpdates, ...secondaryUpdates })

    // Update CSS variables
    document.documentElement.style.setProperty('--color-primary', selectedTheme.primary)
    document.documentElement.style.setProperty('--color-secondary', selectedTheme.secondary)

    // Dispatch theme update event
    window.dispatchEvent(new Event('theme-update'))
  }

  /**
   * Handles color changes for any color variable
   */
  const handleColorChange = (name: keyof ThemeConfig, color: string) => {
    if (name === 'colorPrimary') {
      // Generate primary color palette from the new primary color
      const primaryPalette = generateColorScale(color, 'primary')
      const updates: Partial<ThemeConfig> = {
        colorPrimary: color,
        primary50: primaryPalette['--color-primary-50'],
        primary100: primaryPalette['--color-primary-100'],
        primary200: primaryPalette['--color-primary-200'],
        primary300: primaryPalette['--color-primary-300'],
        primary400: primaryPalette['--color-primary-400'],
        primary500: primaryPalette['--color-primary-500'],
        primary600: primaryPalette['--color-primary-600'],
        primary700: primaryPalette['--color-primary-700'],
        primary800: primaryPalette['--color-primary-800'],
        primary900: primaryPalette['--color-primary-900'],
        primary950: primaryPalette['--color-primary-950'],
      }
      updateTheme(updates)
      // Update color-primary CSS variable
      document.documentElement.style.setProperty('--color-primary', color)
      // Dispatch theme update event
      window.dispatchEvent(new Event('theme-update'))
    } else if (name === 'colorSecondary') {
      // Generate secondary color palette from the new secondary color
      const secondaryPalette = generateColorScale(color, 'secondary')
      const updates: Partial<ThemeConfig> = {
        colorSecondary: color,
        secondary50: secondaryPalette['--color-secondary-50'],
        secondary100: secondaryPalette['--color-secondary-100'],
        secondary200: secondaryPalette['--color-secondary-200'],
        secondary300: secondaryPalette['--color-secondary-300'],
        secondary400: secondaryPalette['--color-secondary-400'],
        secondary500: secondaryPalette['--color-secondary-500'],
        secondary600: secondaryPalette['--color-secondary-600'],
        secondary700: secondaryPalette['--color-secondary-700'],
        secondary800: secondaryPalette['--color-secondary-800'],
        secondary900: secondaryPalette['--color-secondary-900'],
        secondary950: secondaryPalette['--color-secondary-950'],
      }
      updateTheme(updates)
      // Update color-secondary CSS variable
      document.documentElement.style.setProperty('--color-secondary', color)
      // Dispatch theme update event
      window.dispatchEvent(new Event('theme-update'))
    } else {
      updateTheme({ [name]: color })
      // Dispatch theme update event
      window.dispatchEvent(new Event('theme-update'))
    }
  }

  /**
   * Handles typography configuration changes
   */
  const handleTypographyChange = (typography: ThemeConfig['typography']) => {
    updateTheme({ typography })
  }

  return (
    <div className={styles.themeComponent}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Theme Configuration</h2>
        <p className={styles.description}>
          Configure your site's visual appearance including colors and typography settings.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className={styles.tabNavigation}>
        <button
          className={`${styles.tabButton} ${activeTab === 'colors' ? styles.active : ''}`}
          onClick={() => setActiveTab('colors')}
          type="button"
        >
          <span aria-label="Colors" className={styles.tabIcon} role="img">
            🎨
          </span>
          Colors
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'typography' ? styles.active : ''}`}
          onClick={() => setActiveTab('typography')}
          type="button"
        >
          <span aria-label="Typography" className={styles.tabIcon} role="img">
            ✎
          </span>
          Typography
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === 'colors' && (
          <div className={styles.colorsTab}>
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>
                  <span aria-label="Theme Colors" role="img">
                    🎨
                  </span>
                  Theme Colors
                </h3>
                <ThemeSelector onChange={handleThemeChange} value={currentTheme} />
              </div>
              <div className={styles.colorGrid}>
                {PRIMITIVE_FIELDS.map((f) => (
                  <ColorInput
                    disabled={disabled}
                    error={errors?.[f.name]}
                    key={f.name}
                    label={f.label}
                    name={f.name}
                    onChange={(color: string) => handleColorChange(f.name, color)}
                    value={
                      typeof value[f.name] === 'string' ? (value[f.name] as string) : undefined
                    }
                  />
                ))}
              </div>
            </div>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <span aria-label="Semantic Colors" role="img">
                  🌈
                </span>
                Semantic Colors
              </h3>
              <div className={styles.colorGrid}>
                {SEMANTIC_FIELDS.map((f) => (
                  <ColorInput
                    disabled={disabled}
                    error={errors?.[f.name]}
                    key={f.name}
                    label={f.label}
                    name={f.name}
                    onChange={(color: string) => handleColorChange(f.name, color)}
                    value={
                      typeof value[f.name] === 'string' ? (value[f.name] as string) : undefined
                    }
                  />
                ))}
              </div>
            </div>

            {/* Color Preview */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Color Preview</h3>
              <div className={styles.colorPreview}>
                <div className={styles.previewCard}>
                  <div
                    className={styles.previewHeader}
                    style={{ backgroundColor: value.colorPrimary }}
                  >
                    <h4 className={styles.previewTitle}>Primary Color</h4>
                  </div>
                  <div className={styles.previewContent}>
                    <button
                      className={styles.previewButton}
                      style={{ backgroundColor: value.colorPrimary }}
                      type="button"
                    >
                      Primary Button
                    </button>
                  </div>
                </div>

                <div className={styles.previewCard}>
                  <div
                    className={styles.previewHeader}
                    style={{ backgroundColor: value.colorSecondary }}
                  >
                    <h4 className={styles.previewTitle}>Secondary Color</h4>
                  </div>
                  <div className={styles.previewContent}>
                    <button
                      className={styles.previewButton}
                      style={{ backgroundColor: value.colorSecondary }}
                      type="button"
                    >
                      Secondary Button
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'typography' && (
          <div className={styles.typographyTab}>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Typography Settings</h3>
              <p className={styles.sectionDescription}>
                Configure font families, sizes, weights, and spacing for your site's text elements.
              </p>

              <TypographySelector
                description="Typography settings control the appearance of all text content on your site"
                disabled={disabled}
                error={errors?.typography}
                label="Typography Configuration"
                name="typography"
                onChange={handleTypographyChange}
                value={value.typography}
              />
            </div>

            {/* Typography Preview */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Typography Preview</h3>
              <div
                className={styles.typographyPreview}
                style={{
                  fontFamily: value.typography.fontBody || 'Inter, system-ui, sans-serif',
                  fontSize: value.typography.p?.fontSize || '1rem',
                  lineHeight: value.typography.p?.lineHeight || '1.5rem',
                }}
              >
                <h1
                  className={styles.previewHeading}
                  style={{
                    fontSize: value.typography.h1?.fontSize || '2.25rem',
                    fontWeight: value.fontWeight?.bold || 700,
                    lineHeight: value.typography.h1?.lineHeight || '2.5rem',
                  }}
                >
                  Heading 1 Example
                </h1>
                <h2
                  className={styles.previewHeading}
                  style={{
                    fontSize: value.typography.h2?.fontSize || '1.875rem',
                    fontWeight: value.fontWeight?.bold || 700,
                    lineHeight: value.typography.h2?.lineHeight || '2.25rem',
                  }}
                >
                  Heading 2 Example
                </h2>
                <h3
                  className={styles.previewHeading}
                  style={{
                    fontSize: value.typography.h3?.fontSize || '1.5rem',
                    fontWeight: value.fontWeight?.bold || 700,
                    lineHeight: value.typography.h3?.lineHeight || '2rem',
                  }}
                >
                  Heading 3 Example
                </h3>
                <p
                  className={styles.previewParagraph}
                  style={{
                    fontSize: value.typography.p?.fontSize || '1rem',
                    fontWeight: value.fontWeight?.normal || 400,
                    lineHeight: value.typography.p?.lineHeight || '1.5rem',
                  }}
                >
                  This is a paragraph example showing how your body text will appear with the
                  selected typography settings. The quick brown fox jumps over the lazy dog. This
                  demonstrates the font family, size, weight, and line height settings.
                </p>
                <p
                  className={styles.previewParagraph}
                  style={{
                    fontSize: value.typography.p?.fontSize || '1rem',
                    fontWeight: value.fontWeight?.bold || 700,
                    lineHeight: value.typography.p?.lineHeight || '1.5rem',
                  }}
                >
                  <strong>This is bold text</strong> showing the bold font weight setting in action.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ThemeComponent
