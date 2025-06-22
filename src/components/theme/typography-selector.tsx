'use client'
import React, { useEffect, useState } from 'react'

import type {
  FontFamilyOption,
  TypographyConfig,
  TypographySelectorProps,
} from '../../types/index.js'

import { allFonts } from '../../utils/typography/font-definitions.js'
import styles from './typography-selector.module.css'

// Default typography configuration
const DEFAULT_TYPOGRAPHY: TypographyConfig = {
  elements: {
    blockquote: { fontSize: '1.125rem', lineHeight: '1.75rem' },
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
  fontFamily: 'Inter, system-ui, sans-serif',
  fontWeight: {
    bold: 700,
    normal: 400,
  },
}

// Generate font families from font definitions
const FONT_FAMILIES: FontFamilyOption[] = [
  ...allFonts.map((font) => ({
    label: font.displayName,
    value: font.name,
  })),
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
  const [customBodyFont, setCustomBodyFont] = useState<string>('')
  const [isCustomBodyFont, setIsCustomBodyFont] = useState<boolean>(false)
  const [customHeadingFont, setCustomHeadingFont] = useState<string>('')
  const [isCustomHeadingFont, setIsCustomHeadingFont] = useState<boolean>(false)
  const [isTextSizesOpen, setIsTextSizesOpen] = useState(false)

  // Update internal state when external value changes
  useEffect(() => {
    setTypographyConfig(value)

    // Check if current body font is custom
    const isCustomBody = !FONT_FAMILIES.some(
      (font) => font.value === value.bodyFont && font.value !== 'custom',
    )
    setIsCustomBodyFont(isCustomBody)
    if (isCustomBody) {
      setCustomBodyFont(value.bodyFont || '')
    }

    // Check if current heading font is custom
    const isCustomHeading = !FONT_FAMILIES.some(
      (font) => font.value === value.headingFont && font.value !== 'custom',
    )
    setIsCustomHeadingFont(isCustomHeading)
    if (isCustomHeading) {
      setCustomHeadingFont(value.headingFont || '')
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
  const handleFontChange =
    (fontType: 'bodyFont' | 'headingFont') => (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = event.target.value
      const isCustomSetter = fontType === 'bodyFont' ? setIsCustomBodyFont : setIsCustomHeadingFont

      if (selectedValue === 'custom') {
        isCustomSetter(true)
      } else {
        isCustomSetter(false)
        updateConfig({ [fontType]: selectedValue })
      }
    }

  /**
   * Handles custom font family input
   */
  const handleCustomFontChange =
    (fontType: 'bodyFont' | 'headingFont') => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      const customSetter = fontType === 'bodyFont' ? setCustomBodyFont : setCustomHeadingFont
      customSetter(value)
      updateConfig({ [fontType]: value })
    }

  /**
   * Gets the font family CSS value for display
   */
  const getFontFamilyCSS = (fontName?: string): string => {
    if (!fontName) {
      return 'system-ui, sans-serif'
    }

    const fontDef = allFonts.find((f) => f.name === fontName)
    if (fontDef) {
      return `"${fontDef.displayName}", system-ui, sans-serif`
    }

    return fontName
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

  const handleElementChange =
    (element: keyof TypographyConfig['elements']) =>
    (field: 'fontSize' | 'lineHeight') =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      updateConfig({
        elements: {
          ...typographyConfig.elements,
          [element]: {
            ...typographyConfig.elements[element],
            [field]: value,
          },
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
          <h4 className={styles.sectionTitle}>Body Font</h4>
          <select
            className={`${styles.fontFamilySelect} ${disabled ? styles.disabled : ''}`}
            disabled={disabled}
            onChange={handleFontChange('bodyFont')}
            value={isCustomBodyFont ? 'custom' : typographyConfig.bodyFont}
          >
            {FONT_FAMILIES.map((font) => (
              <option key={`body-${font.value}`} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
          {isCustomBodyFont && (
            <input
              className={`${styles.customFontInput} ${disabled ? styles.disabled : ''}`}
              disabled={disabled}
              onChange={handleCustomFontChange('bodyFont')}
              placeholder="Enter custom font family..."
              type="text"
              value={customBodyFont}
            />
          )}
          <div
            className={styles.fontPreview}
            style={{ fontFamily: getFontFamilyCSS(typographyConfig.bodyFont) }}
          >
            The quick brown fox jumps over the lazy dog
          </div>
        </div>

        <div className={styles.typographySection}>
          <h4 className={styles.sectionTitle}>Heading Font</h4>
          <select
            className={`${styles.fontFamilySelect} ${disabled ? styles.disabled : ''}`}
            disabled={disabled}
            onChange={handleFontChange('headingFont')}
            value={isCustomHeadingFont ? 'custom' : typographyConfig.headingFont}
          >
            {FONT_FAMILIES.map((font) => (
              <option key={`heading-${font.value}`} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
          {isCustomHeadingFont && (
            <input
              className={`${styles.customFontInput} ${disabled ? styles.disabled : ''}`}
              disabled={disabled}
              onChange={handleCustomFontChange('headingFont')}
              placeholder="Enter custom font family..."
              type="text"
              value={customHeadingFont}
            />
          )}
          <div
            className={styles.fontPreview}
            style={{ fontFamily: getFontFamilyCSS(typographyConfig.headingFont) }}
          >
            The quick brown fox jumps over the lazy dog
          </div>
        </div>

        {/* Text Sizes Section */}
        <div className={styles.typographySection}>
          <button
            className={styles.collapsibleHeader}
            onClick={() => setIsTextSizesOpen(!isTextSizesOpen)}
            type="button"
          >
            <h4 className={styles.sectionTitle}>Text Sizes</h4>
            <span className={styles.collapseIcon}>{isTextSizesOpen ? '−' : '+'}</span>
          </button>

          {isTextSizesOpen && (
            <div className={styles.textSizesGrid}>
              {Object.keys(typographyConfig.elements).map((element) => (
                <div className={styles.gridItem} key={element}>
                  <label htmlFor={`${name}-${element}-font-size`}>
                    {element.charAt(0).toUpperCase() + element.slice(1)}
                  </label>
                  <div className={styles.inputGroup}>
                    <input
                      disabled={disabled}
                      id={`${name}-${element}-font-size`}
                      onChange={handleElementChange(element as keyof TypographyConfig['elements'])(
                        'fontSize',
                      )}
                      placeholder="e.g., 1rem"
                      type="text"
                      value={
                        typographyConfig.elements[element as keyof TypographyConfig['elements']]
                          ?.fontSize
                      }
                    />
                    <input
                      disabled={disabled}
                      id={`${name}-${element}-line-height`}
                      onChange={handleElementChange(element as keyof TypographyConfig['elements'])(
                        'lineHeight',
                      )}
                      placeholder="e.g., 1.5"
                      type="text"
                      value={
                        typographyConfig.elements[element as keyof TypographyConfig['elements']]
                          ?.lineHeight
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
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
