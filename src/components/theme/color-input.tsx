'use client'
import React, { useEffect, useState } from 'react'

import type { ColorInputProps } from '../../types/index'

import styles from './color-input.module.css'

/**
 * ColorInput component that provides both text input and color picker
 * for selecting theme colors in the Payload admin panel
 */
const ColorInput: React.FC<ColorInputProps> = ({
  name,
  description,
  disabled = false,
  error,
  label,
  onChange,
  required = false,
  value = '#000000',
}) => {
  const [colorValue, setColorValue] = useState<string>(value)
  const [isValidColor, setIsValidColor] = useState<boolean>(true)
  // Update internal state when external value changes
  useEffect(() => {
    setColorValue(value)
    setIsValidColor(isValidHexColor(value))
  }, [value])

  /**
   * Validates if a string is a valid hex color
   */
  const isValidHexColor = (color: string): boolean => {
    const hexRegex = /^#(?:[A-F0-9]{6}|[A-F0-9]{3})$/i
    return hexRegex.test(color)
  }

  /**
   * Handles text input changes
   */
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setColorValue(newValue)

    const isValid = isValidHexColor(newValue)
    setIsValidColor(isValid)

    if (isValid && onChange) {
      onChange(newValue)
    }
  }

  /**
   * Handles color picker changes
   */
  const handleColorPickerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setColorValue(newValue)
    setIsValidColor(true)

    if (onChange) {
      onChange(newValue)
    }
  }

  /**
   * Handles text input blur to format and validate
   */
  const handleTextBlur = () => {
    if (!isValidColor && colorValue) {
      // Try to fix common issues
      let fixedColor = colorValue

      // Add # if missing
      if (!fixedColor.startsWith('#')) {
        fixedColor = '#' + fixedColor
      }

      // Validate again
      if (isValidHexColor(fixedColor)) {
        setColorValue(fixedColor)
        setIsValidColor(true)
        if (onChange) {
          onChange(fixedColor)
        }
      }
    }
  }

  return (
    <div className={styles.colorInputWrapper}>
      {label && (
        <label className={styles.colorInputLabel} htmlFor={name} id={`${name}-label`}>
          {label}
          {required && <span className={styles.requiredAsterisk}> *</span>}
        </label>
      )}

      <div className={`${styles.colorInputContainer} ${disabled ? styles.disabled : ''}`}>
        {/* Text input for color value */}
        <input
          aria-describedby={description ? `${name}-description` : undefined}
          aria-invalid={!isValidColor || !!error}
          aria-labelledby={label ? `${name}-label` : undefined}
          className={`${styles.colorTextInput} ${!isValidColor ? styles.error : ''} ${disabled ? styles.disabled : ''}`}
          disabled={disabled}
          id={name}
          name={name}
          onBlur={handleTextBlur}
          onChange={handleTextChange}
          placeholder="#000000"
          type="text"
          value={colorValue}
        />

        {/* Color picker input */}
        <input
          aria-label={`${label || 'Color'} picker`}
          className={`${styles.colorPickerInput} ${disabled ? styles.disabled : ''}`}
          disabled={disabled}
          onChange={handleColorPickerChange}
          type="color"
          value={isValidColor ? colorValue : '#000000'}
        />

        {/* Color preview */}
        <div
          aria-hidden="true"
          className={styles.colorPreview}
          style={{
            backgroundColor: isValidColor ? colorValue : 'transparent',
            border: isValidColor ? 'none' : '2px dashed #ccc',
          }}
        />
      </div>

      {/* Error message */}
      {(error || !isValidColor) && (
        <div className={styles.colorInputError} role="alert">
          {error || 'Please enter a valid hex color (e.g., #FF0000)'}
        </div>
      )}

      {/* Description */}
      {description && !error && isValidColor && (
        <div className={styles.colorInputDescription} id={`${name}-description`}>
          {description}
        </div>
      )}
    </div>
  )
}

export default ColorInput
