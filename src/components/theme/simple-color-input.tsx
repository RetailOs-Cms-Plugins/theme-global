'use client'
import type { TextFieldClientComponent } from 'payload'

import { useDebounce, useField } from '@payloadcms/ui'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import styles from './color-input.module.css'

const SimpleColorInput: TextFieldClientComponent = ({ field, path }) => {
  const { setValue, value } = useField({ path })
  const [localValue, setLocalValue] = useState(typeof value === 'string' ? value : '')
  const isUserInput = useRef(false)

  const debouncedLocalValue = useDebounce(localValue, 500)

  // Update Payload when debounced value changes
  useEffect(() => {
    if (isUserInput.current && debouncedLocalValue !== value) {
      setValue(debouncedLocalValue)
      isUserInput.current = false
    }
  }, [debouncedLocalValue, setValue, value])

  // Sync with external changes only
  useEffect(() => {
    if (!isUserInput.current && typeof value === 'string') {
      setLocalValue(value)
    }
  }, [value])

  const handleInputChange = useCallback((newValue: string) => {
    isUserInput.current = true
    setLocalValue(newValue)
  }, [])

  return (
    <div className={styles.simpleColorInputWrapper}>
       <div className={styles.simplyColorInputContainer}>
        <label htmlFor={`${path}-color`}>Color</label>
        <input
          aria-labelledby={`${path}-color-label`}
          id={`${path}-color`}
          onChange={(e) => handleInputChange(e.target.value)}
          type="color"
          value={localValue || '#000000'}
        />
      </div>
      <div className={styles.simplyTextInputContainer}>
        <label htmlFor={`${path}-text`}>{`${field?.label}` || ''}</label>
        <input
          aria-labelledby={`${path}-label`}
          className={styles.simpleColorTextInput}
          id={`${path}-text`}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="#000000"
          type="text"
          value={localValue}
        />
      </div>
    </div>
  )
}

export default SimpleColorInput
