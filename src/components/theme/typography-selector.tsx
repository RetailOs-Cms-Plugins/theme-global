'use client'
import React, { useEffect, useState } from 'react'

import type {
  FontFamilyOption,
  TypographyConfig,
  TypographySelectorProps,
} from '../../types/index.js'

import styles from './typography-selector.module.css'

// Default typography configuration
const DEFAULT_TYPOGRAPHY: TypographyConfig = {
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
}

// Common font families
const FONT_FAMILIES: FontFamilyOption[] = [
  { label: 'Inter (Sans-serif)', value: 'Inter, system-ui, sans-serif' },
  { label: 'System Sans-serif', value: 'system-ui, sans-serif' },
  { label: 'Helvetica', value: 'Helvetica, Arial, sans-serif' },
  { label: 'Georgia (Serif)', value: 'Georgia, serif' },
  { label: 'Times New Roman', value: '"Times New Roman", serif' },
  { label: 'Courier (Monospace)', value: '"Courier New", monospace' },
  { label: 'Roboto', value: 'Roboto, sans-serif' },
  { label: 'Open Sans', value: '"Open Sans", sans-serif' },
  { label: 'Lato', value: 'Lato, sans-serif' },
  { label: 'Custom', value: 'custom' },
]

/**
 * TypographySelector component for configuring theme typography settings
 * Provides controls for font family, sizes, weights, and line heights
 */
const TypographySelector: React.FC<TypographySelectorProps> = ({
  name,
  description,
  disabled = false,
  error,
  label,
  onChange,
  required = false,
  value = DEFAULT_TYPOGRAPHY,
}) => {
  const [typographyConfig, setTypographyConfig] = useState<TypographyConfig>(value)
  const [customFontFamily, setCustomFontFamily] = useState<string>('')
  const [isCustomFont, setIsCustomFont] = useState<boolean>(false)

  // Update internal state when external value changes
  useEffect(() => {
    setTypographyConfig(value)

    // Check if current font family is custom
    const isCustom = !FONT_FAMILIES.some(
      (font) => font.value === value.fontFamily && font.value !== 'custom',
    )
    setIsCustomFont(isCustom)
    if (isCustom) {
      setCustomFontFamily(value.fontFamily)
    }
  }, [value])

  /**
   * Updates the typography configuration and calls onChange
   */
  const updateConfig = (updates: Partial<TypographyConfig>) => {
    const newConfig = { ...typographyConfig, ...updates }
    setTypographyConfig(newConfig)
    if (onChange) {
      onChange(newConfig)
    }
  }

  /**
   * Handles font family selection
   */
  const handleFontFamilyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value

    if (selectedValue === 'custom') {
      setIsCustomFont(true)
    } else {
      setIsCustomFont(false)
      updateConfig({ fontFamily: selectedValue })
    }
  }

  /**
   * Handles custom font family input
   */
  const handleCustomFontChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setCustomFontFamily(value)
    updateConfig({ fontFamily: value })
  }

  /**
   * Handles font size changes for base and headings
   */
  const handleFontSizeChange =
    (type: 'base' | keyof TypographyConfig['fontSize']['headings']) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value

      if (type === 'base') {
        updateConfig({
          fontSize: {
            ...typographyConfig.fontSize,
            base: value,
          },
        })
      } else {
        updateConfig({
          fontSize: {
            ...typographyConfig.fontSize,
            headings: {
              ...typographyConfig.fontSize.headings,
              [type]: value,
            },
          },
        })
      }
    }

  /**
   * Handles font weight changes
   */
  const handleFontWeightChange =
    (type: keyof TypographyConfig['fontWeight']) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value, 10)
      updateConfig({
        fontWeight: {
          ...typographyConfig.fontWeight,
          [type]: value,
        },
      })
    }

  /**
   * Handles line height changes
   */
  const handleLineHeightChange =
    (type: keyof TypographyConfig['lineHeight']) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(event.target.value)
      updateConfig({
        lineHeight: {
          ...typographyConfig.lineHeight,
          [type]: value,
        },
      })
    }

  return (
    <div className={styles.typographySelectorWrapper}>
      {label && (
        <label className={styles.typographySelectorLabel}>
          {label}
          {required && <span className={styles.requiredAsterisk}> *</span>}
        </label>
      )}

      <div className={styles.typographySections}>
        {/* Font Family Section */}
        <div className={styles.typographySection}>
          <h4 className={styles.sectionTitle}>Font Family</h4>

          <select
            className={`${styles.fontFamilySelect} ${disabled ? styles.disabled : ''}`}
            disabled={disabled}
            onChange={handleFontFamilyChange}
            value={isCustomFont ? 'custom' : typographyConfig.fontFamily}
          >
            {FONT_FAMILIES.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>

          {isCustomFont && (
            <input
              className={`${styles.customFontInput} ${disabled ? styles.disabled : ''}`}
              disabled={disabled}
              onChange={handleCustomFontChange}
              placeholder="Enter custom font family..."
              type="text"
              value={customFontFamily}
            />
          )}

          {/* Font Preview */}
          <div className={styles.fontPreview} style={{ fontFamily: typographyConfig.fontFamily }}>
            The quick brown fox jumps over the lazy dog
          </div>
        </div>

        {/* Font Sizes Section */}
        <div className={styles.typographySection}>
          <h4 className={styles.sectionTitle}>Font Sizes</h4>

          <div className={styles.fontSizeGrid}>
            <div className={styles.fontSizeItem}>
              <label htmlFor={`${name}-base-size`}>Base Size</label>
              <input
                disabled={disabled}
                id={`${name}-base-size`}
                onChange={handleFontSizeChange('base')}
                placeholder="1rem"
                type="text"
                value={typographyConfig.fontSize.base}
              />
            </div>

            {Object.entries(typographyConfig.fontSize.headings).map(([heading, size]) => (
              <div className={styles.fontSizeItem} key={heading}>
                <label htmlFor={`${name}-${heading}-size`}>{heading.toUpperCase()}</label>
                <input
                  disabled={disabled}
                  id={`${name}-${heading}-size`}
                  onChange={handleFontSizeChange(
                    heading as keyof TypographyConfig['fontSize']['headings'],
                  )}
                  placeholder="2rem"
                  type="text"
                  value={size}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Font Weights Section */}
        <div className={styles.typographySection}>
          <h4 className={styles.sectionTitle}>Font Weights</h4>

          <div className={styles.fontWeightGrid}>
            <div className={styles.fontWeightItem}>
              <label htmlFor={`${name}-normal-weight`}>Normal</label>
              <input
                disabled={disabled}
                id={`${name}-normal-weight`}
                max="900"
                min="100"
                onChange={handleFontWeightChange('normal')}
                step="100"
                type="number"
                value={typographyConfig.fontWeight.normal}
              />
            </div>

            <div className={styles.fontWeightItem}>
              <label htmlFor={`${name}-bold-weight`}>Bold</label>
              <input
                disabled={disabled}
                id={`${name}-bold-weight`}
                max="900"
                min="100"
                onChange={handleFontWeightChange('bold')}
                step="100"
                type="number"
                value={typographyConfig.fontWeight.bold}
              />
            </div>
          </div>
        </div>

        {/* Line Heights Section */}
        <div className={styles.typographySection}>
          <h4 className={styles.sectionTitle}>Line Heights</h4>

          <div className={styles.lineHeightGrid}>
            {Object.entries(typographyConfig.lineHeight).map(([type, height]) => (
              <div className={styles.lineHeightItem} key={type}>
                <label htmlFor={`${name}-${type}-height`}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
                <input
                  disabled={disabled}
                  id={`${name}-${type}-height`}
                  max="3"
                  min="1"
                  onChange={handleLineHeightChange(type as keyof TypographyConfig['lineHeight'])}
                  step="0.25"
                  type="number"
                  value={height}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className={styles.typographySelectorError} role="alert">
          {error}
        </div>
      )}

      {/* Description */}
      {description && !error && (
        <div className={styles.typographySelectorDescription}>{description}</div>
      )}
    </div>
  )
}

export default TypographySelector
