'use client'
import type { JSONFieldClient } from 'payload'

import React, { useState } from 'react'

import type { ThemeConfig } from '../../types/index.js'

import { ColorInput, TypographySelector } from '../../components/theme/index.js'
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
const DEFAULT_THEME: ThemeConfig = {
  cardBackground: '#faf5ff',
  colorPrimary: '#3b82f6',
  colorSecondary: '#10b981',
  pageBackground: '#faf5ff',
  primary50: '#faf5ff',
  primary100: '#f3e8ff',
  primary200: '#e9d5ff',
  primary300: '#d8b4fe',
  primary400: '#c084fc',
  primary500: '#a855f7',
  primary600: '#9333ea',
  primary700: '#7e22ce',
  primary800: '#6d28d9',
  primary900: '#581c87',
  primary950: '#3b0764',
  secondary50: '#f0f9ff',
  secondary100: '#e0f2fe',
  secondary200: '#bae6fd',
  secondary300: '#7dd3fc',
  secondary400: '#38bdf8',
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
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: {
      base: '1rem',
      headings: {
        h1: '2.5rem',
        h2: '2rem',
        h3: '1.75rem',
        h4: '1.5rem',
        h5: '1.25rem',
        h6: '1.125rem',
      },
    },
    fontWeight: {
      bold: 700,
      normal: 400,
    },
    lineHeight: {
      normal: 1.5,
      relaxed: 1.75,
      tight: 1.25,
    },
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
  console.log('🚀 ~ Component.tsx:66 ~ props:', props)
  const [activeTab, setActiveTab] = useState<'colors' | 'typography'>('colors')

  /**
   * Updates the theme configuration and calls onChange
   */
  const updateTheme = (updates: Partial<ThemeConfig>) => {
    const newTheme = { ...value, ...updates }
    if (onChange) {
      onChange(newTheme)
    }
  }

  /**
   * Handles color changes for any color variable
   */
  const handleColorChange = (name: keyof ThemeConfig, color: string) => {
    updateTheme({ [name]: color })
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
              <h3 className={styles.sectionTitle}>
                <span aria-label="Primitive Colors" role="img">
                  🎨
                </span>
                Primitive Colors
              </h3>
              <div className={styles.colorGrid}>
                {PRIMITIVE_FIELDS.map((f) => (
                  <ColorInput
                    disabled={disabled}
                    error={errors?.[f.name]}
                    key={f.name}
                    label={f.label}
                    name={f.name}
                    onChange={(color) => handleColorChange(f.name, color)}
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
                    onChange={(color) => handleColorChange(f.name, color)}
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
                  fontFamily: value.typography.fontFamily,
                  fontSize: value.typography.fontSize.base,
                  lineHeight: value.typography.lineHeight.normal,
                }}
              >
                <h1
                  className={styles.previewHeading}
                  style={{
                    fontSize: value.typography.fontSize.headings.h1,
                    fontWeight: value.typography.fontWeight.bold,
                    lineHeight: value.typography.lineHeight.tight,
                  }}
                >
                  Heading 1 Example
                </h1>
                <h2
                  className={styles.previewHeading}
                  style={{
                    fontSize: value.typography.fontSize.headings.h2,
                    fontWeight: value.typography.fontWeight.bold,
                    lineHeight: value.typography.lineHeight.tight,
                  }}
                >
                  Heading 2 Example
                </h2>
                <h3
                  className={styles.previewHeading}
                  style={{
                    fontSize: value.typography.fontSize.headings.h3,
                    fontWeight: value.typography.fontWeight.bold,
                    lineHeight: value.typography.lineHeight.normal,
                  }}
                >
                  Heading 3 Example
                </h3>
                <p
                  className={styles.previewParagraph}
                  style={{
                    fontWeight: value.typography.fontWeight.normal,
                    lineHeight: value.typography.lineHeight.relaxed,
                  }}
                >
                  This is a paragraph example showing how your body text will appear with the
                  selected typography settings. The quick brown fox jumps over the lazy dog. This
                  demonstrates the font family, size, weight, and line height settings.
                </p>
                <p
                  className={styles.previewParagraph}
                  style={{
                    fontWeight: value.typography.fontWeight.bold,
                    lineHeight: value.typography.lineHeight.normal,
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
