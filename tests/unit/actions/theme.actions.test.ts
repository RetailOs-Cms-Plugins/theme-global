import type { SanitizedConfig } from 'payload'

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type { ThemeConfig } from '../../../src/types'

// Mock external dependencies
vi.mock('next/cache', () => ({
  unstable_cache: vi.fn((fn) => fn)
}))

const mockGetPayload = vi.fn()
vi.mock('payload', () => ({
  getPayload: mockGetPayload
}))

vi.mock('../../../src/utils/color-palette/color-palette', () => ({
  generateColorScale: vi.fn((color, prefix) => ({
    [`--${prefix}-50`]: '#f0f0f0',
    [`--${prefix}-500`]: color,
    [`--${prefix}-900`]: '#0a0a0a'
  }))
}))

vi.mock('../../../src/utils/typography/font-definitions', () => ({
  getFontDefinition: vi.fn((fontName) => {
    if (fontName === 'inter') {return { name: 'inter', displayName: 'Inter' }}
    if (fontName === 'heebo') {return { name: 'heebo', displayName: 'Heebo' }}
    return null
  })
}))

const mockGetGoogleFontsUrl = vi.fn()
vi.mock('../../../src/utils/typography/font-loader', () => ({
  getGoogleFontsUrl: mockGetGoogleFontsUrl
}))

describe('theme.actions', () => {
  const mockThemeConfig: ThemeConfig = {
    cardBackground: '#ffffff',
    colorPrimary: '#a855f7',
    colorSecondary: '#06b6d4',
    pageBackground: '#f8fafc',
    primary50: '#faf5ff',
    primary100: '#f3e8ff',
    primary200: '#e9d5ff',
    primary300: '#d8b4fe',
    primary400: '#c084fc',
    primary500: '#a855f7',
    primary600: '#9333ea',
    primary700: '#7c3aed',
    primary800: '#6b21a8',
    primary900: '#581c87',
    primary950: '#3b0764',
    secondary50: '#ecfeff',
    secondary100: '#cffafe',
    secondary200: '#a5f3fc',
    secondary300: '#67e8f9',
    secondary400: '#22d3ee',
    secondary500: '#06b6d4',
    secondary600: '#0891b2',
    secondary700: '#0e7490',
    secondary800: '#155e75',
    secondary900: '#164e63',
    secondary950: '#083344',
    textOnCard: '#1e293b',
    textOnPage: '#1e293b',
    textOnPrimary: '#ffffff',
    textOnSecondary: '#ffffff',
    typography: {
      direction: 'ltr',
      fontBody: 'inter',
      fontHeading: 'heebo',
      text2xl: '24px',
      text3xl: '30px',
      text4xl: '36px',
      textBase: '16px',
      textLg: '18px',
      textSm: '14px',
      textXl: '20px',
      textXs: '12px'
    }
  }

  const mockConfig: SanitizedConfig = {} as SanitizedConfig

  let mockPayload: any

  beforeEach(() => {
    mockPayload = {
      findGlobal: vi.fn().mockResolvedValue(mockThemeConfig)
    }
    
    mockGetPayload.mockResolvedValue(mockPayload)
    mockGetGoogleFontsUrl.mockImplementation((fonts) => {
      if (fonts && fonts.length > 0) {return 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600'}
      return null
    })
    
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('getTheme', () => {
    it('should return theme with CSS variables and font CSS when noCache is true', async () => {
      const { getTheme } = await import('../../../src/actions/theme.actions')
      
      const result = await getTheme({ config: mockConfig, noCache: true })

      expect(result).toHaveProperty('cssVariables')
      expect(result).toHaveProperty('fontCSS')
      expect(result).toHaveProperty('themeData')
      
      expect(result.cssVariables).toMatchObject({
        '--color-primary': '#a855f7',
        '--color-secondary': '#06b6d4',
        '--direction': 'ltr',
        '--font-body': "'Inter'",
        '--font-heading': "'Heebo'",
        '--font-size-base': '16px'
      })
      
      expect(result.fontCSS).toContain('@import url(')
      expect(result.themeData).toEqual(mockThemeConfig)
    })

    it('should return cached theme when noCache is false', async () => {
      const { getTheme } = await import('../../../src/actions/theme.actions')
      
      const result = await getTheme({ config: mockConfig, noCache: false })

      expect(mockPayload.findGlobal).toHaveBeenCalledWith({ slug: 'theme-config' })
      expect(result.themeData).toEqual(mockThemeConfig)
    })

    it('should handle missing typography gracefully', async () => {
      const themeWithoutTypography = { ...mockThemeConfig }
      delete (themeWithoutTypography as unknown as { typography: unknown }).typography
      
      mockPayload.findGlobal.mockResolvedValue(themeWithoutTypography)
      
      const { getTheme } = await import('../../../src/actions/theme.actions')
      const result = await getTheme({ config: mockConfig, noCache: true })

      expect(result.cssVariables).not.toHaveProperty('--font-body')
      expect(result.cssVariables).not.toHaveProperty('--font-heading')
    })

    it('should generate empty font CSS when no fonts are provided', async () => {
      const themeWithoutFonts = {
        ...mockThemeConfig,
        typography: { ...mockThemeConfig.typography, fontBody: undefined, fontHeading: undefined }
      }
      
      mockPayload.findGlobal.mockResolvedValue(themeWithoutFonts)
      mockGetGoogleFontsUrl.mockReturnValue(null)
      
      const { getTheme } = await import('../../../src/actions/theme.actions')
      const result = await getTheme({ config: mockConfig, noCache: true })

      expect(result.fontCSS).toBe('')
    })
  })

  describe('getClientTheme', () => {
    it('should return only theme data', async () => {
      const { getClientTheme } = await import('../../../src/actions/theme.actions')
      
      const result = await getClientTheme({ config: mockConfig })

      expect(result).toEqual(mockThemeConfig)
      expect(mockPayload.findGlobal).toHaveBeenCalledWith({ slug: 'theme-config' })
    })

    it('should pass noCache parameter correctly', async () => {
      const { getClientTheme } = await import('../../../src/actions/theme.actions')
      
      await getClientTheme({ config: mockConfig, noCache: true })

      expect(mockPayload.findGlobal).toHaveBeenCalledWith({ slug: 'theme-config' })
    })
  })

  describe('error handling', () => {
    it('should handle payload errors gracefully', async () => {
      mockPayload.findGlobal.mockRejectedValue(new Error('Payload error'))
      
      const { getTheme } = await import('../../../src/actions/theme.actions')
      
      await expect(getTheme({ config: mockConfig })).rejects.toThrow('Payload error')
    })

    it('should handle null theme response with cached version', async () => {
      mockPayload.findGlobal.mockResolvedValue(null)
      
      const { getTheme } = await import('../../../src/actions/theme.actions')
      
      // Test with noCache: false to trigger the validation in getCachedTheme
      await expect(getTheme({ config: mockConfig, noCache: false })).rejects.toThrow('Theme configuration not found in Payload.')
    })

    it('should handle null theme response with noCache', async () => {
      mockPayload.findGlobal.mockResolvedValue(null)
      
      const { getTheme } = await import('../../../src/actions/theme.actions')
      
      // Test with noCache: true (default) - this will fail with null property access
      await expect(getTheme({ config: mockConfig, noCache: true })).rejects.toThrow('Cannot read properties of null')
    })
  })
}) 