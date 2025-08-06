import { describe, expect, it, vi } from 'vitest'

import { generateColorScale, TAILWIND_THEMES } from '../../../../src/utils/color-palette/color-palette.js'

// Mock chroma-js
vi.mock('chroma-js', () => {
  const mockColors = [
    '#ffffff', '#f3f4f6', '#e5e7eb', '#d1d5db', '#9ca3af',
    '#6b7280', '#4b5563', '#374151', '#1f2937', '#111827', 
    '#000000', '#ffffff', '#f3f4f6', '#e5e7eb', '#d1d5db',
    '#9ca3af', '#6b7280', '#4b5563', '#374151', '#1f2937', '#111827', '#000000'
  ]
  
  // Mock chroma function that takes a color and returns an object with hex() method
  const chromaMock = vi.fn((color: string) => ({
    hex: () => color.startsWith('#') ? color : '#6b7280'
  }))
  // Add scale method to chroma
  const scale = vi.fn(() => ({
    mode: vi.fn(() => ({
      colors: vi.fn(() => mockColors)
    }))
  }))
  Object.defineProperty(chromaMock, 'scale', {
    configurable: true,
    value: scale
  })
  
  return {
    default: chromaMock,
  }
})

describe('Color Palette Utils', () => {
  describe('TAILWIND_THEMES', () => {
    it('should contain default theme', () => {
      expect(TAILWIND_THEMES.default).toEqual({
        primary: '#a855f7',
        secondary: '#0ea5e9',
      })
    })

    it('should contain all expected theme colors', () => {
      const expectedThemes = [
        'default', 'red', 'blue', 'green', 'yellow', 'purple', 'pink',
        'indigo', 'cyan', 'gray', 'orange', 'amber', 'lime', 'emerald',
        'teal', 'sky', 'violet', 'fuchsia', 'rose', 'slate', 'neutral',
        'stone', 'zinc'
      ]

      expectedThemes.forEach(theme => {
        expect(TAILWIND_THEMES[theme as keyof typeof TAILWIND_THEMES]).toBeDefined()
        expect(TAILWIND_THEMES[theme as keyof typeof TAILWIND_THEMES]).toHaveProperty('primary')
        expect(TAILWIND_THEMES[theme as keyof typeof TAILWIND_THEMES]).toHaveProperty('secondary')
      })
    })

    it('should have valid hex colors', () => {
      Object.values(TAILWIND_THEMES).forEach(theme => {
        expect(theme.primary).toMatch(/^#[0-9a-f]{6}$/i)
        expect(theme.secondary).toMatch(/^#[0-9a-f]{6}$/i)
      })
    })
  })

  describe('generateColorScale', () => {
    it('should generate color scale with correct variable names', () => {
      const result = generateColorScale('#3b82f6', 'primary')

      expect(result).toHaveProperty('--primary-50')
      expect(result).toHaveProperty('--primary-100')
      expect(result).toHaveProperty('--primary-500')
      expect(result).toHaveProperty('--primary-900')
      expect(result).toHaveProperty('--primary-950')
    })

    it('should generate all 11 color weights', () => {
      const result = generateColorScale('#3b82f6', 'test')
      const expectedWeights = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

      expect(Object.keys(result)).toHaveLength(11)
      
      expectedWeights.forEach(weight => {
        expect(result).toHaveProperty(`--test-${weight}`)
      })
    })

    it('should return valid hex colors', () => {
      const result = generateColorScale('#ff0000', 'red')

      Object.values(result).forEach(color => {
        expect(color).toMatch(/^#[0-9a-f]{6}$/i)
      })
    })

    it('should work with different variable names', () => {
      const primaryResult = generateColorScale('#3b82f6', 'primary')
      const secondaryResult = generateColorScale('#ec4899', 'secondary')

      expect(Object.keys(primaryResult)[0]).toContain('--primary-')
      expect(Object.keys(secondaryResult)[0]).toContain('--secondary-')
    })
  })

  describe('Integration', () => {
    it('should work with TAILWIND_THEMES colors', () => {
      const theme = TAILWIND_THEMES.blue
      const primaryScale = generateColorScale(theme.primary, 'primary')
      const secondaryScale = generateColorScale(theme.secondary, 'secondary')

      expect(primaryScale['--primary-500']).toBeDefined()
      expect(secondaryScale['--secondary-500']).toBeDefined()
      expect(Object.keys(primaryScale)).toHaveLength(11)
      expect(Object.keys(secondaryScale)).toHaveLength(11)
    })
  })
}) 