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
    primaryColor?: string
    secondaryColor?: string
    typography?: string
  }
  /** Callback when theme configuration changes */
  onChange?: (value: ThemeConfig) => void
  /** Current theme configuration value */
  value?: ThemeConfig
}

// Default theme configuration
const DEFAULT_THEME: ThemeConfig = {
  primaryColor: '#3b82f6',
  secondaryColor: '#10b981',
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
   * Handles primary color changes
   */
  const handlePrimaryColorChange = (color: string) => {
    updateTheme({ primaryColor: color })
  }

  /**
   * Handles secondary color changes
   */
  const handleSecondaryColorChange = (color: string) => {
    updateTheme({ secondaryColor: color })
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
              <h3 className={styles.sectionTitle}>Brand Colors</h3>
              <p className={styles.sectionDescription}>
                Define your primary and secondary brand colors that will be used throughout your
                site.
              </p>

              <div className={styles.colorGrid}>
                <ColorInput
                  description="Main brand color used for primary actions and highlights"
                  disabled={disabled}
                  error={errors?.primaryColor}
                  label="Primary Color"
                  name="primaryColor"
                  onChange={handlePrimaryColorChange}
                  required
                  value={value.primaryColor}
                />

                <ColorInput
                  description="Complementary color used for secondary elements and accents"
                  disabled={disabled}
                  error={errors?.secondaryColor}
                  label="Secondary Color"
                  name="secondaryColor"
                  onChange={handleSecondaryColorChange}
                  value={value.secondaryColor}
                />
              </div>
            </div>

            {/* Color Preview */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Color Preview</h3>
              <div className={styles.colorPreview}>
                <div className={styles.previewCard}>
                  <div
                    className={styles.previewHeader}
                    style={{ backgroundColor: value.primaryColor }}
                  >
                    <h4 className={styles.previewTitle}>Primary Color</h4>
                    <span className={styles.previewValue}>{value.primaryColor}</span>
                  </div>
                  <div className={styles.previewContent}>
                    <button
                      className={styles.previewButton}
                      style={{ backgroundColor: value.primaryColor }}
                      type="button"
                    >
                      Primary Button
                    </button>
                  </div>
                </div>

                <div className={styles.previewCard}>
                  <div
                    className={styles.previewHeader}
                    style={{ backgroundColor: value.secondaryColor }}
                  >
                    <h4 className={styles.previewTitle}>Secondary Color</h4>
                    <span className={styles.previewValue}>{value.secondaryColor}</span>
                  </div>
                  <div className={styles.previewContent}>
                    <button
                      className={styles.previewButton}
                      style={{ backgroundColor: value.secondaryColor }}
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
