import { describe, expect, it, vi } from 'vitest'

import {
  getCurrentBreakpoint,
  getFontSize,
  getLineHeight,
  getResponsiveValue,
  getResponsiveValueWithUnit,
} from '../../../../src/utils/typography/getResponsiveValue.js'

// Mock window object
const mockWindow = {
  innerWidth: 1024,
}

Object.defineProperty(global, 'window', {
  value: mockWindow,
  writable: true,
})

describe('Responsive Value Utils', () => {
  describe('getCurrentBreakpoint', () => {
    it('should return mobile for width < 640', () => {
      mockWindow.innerWidth = 500
      expect(getCurrentBreakpoint()).toBe('mobile')
    })

    it('should return tablet for width 640-767', () => {
      mockWindow.innerWidth = 700
      expect(getCurrentBreakpoint()).toBe('tablet')
    })

    it('should return desktop for width 768-1023', () => {
      mockWindow.innerWidth = 900
      expect(getCurrentBreakpoint()).toBe('desktop')
    })

    it('should return largeDesktop for width >= 1024', () => {
      mockWindow.innerWidth = 1280
      expect(getCurrentBreakpoint()).toBe('largeDesktop')
    })

    it('should return desktop for SSR (no window)', () => {
      const originalWindow = global.window
      // @ts-ignore
      delete global.window

      expect(getCurrentBreakpoint()).toBe('desktop')

      global.window = originalWindow
    })
  })

  describe('getResponsiveValue', () => {
    const mockResponsiveData = {
      desktop: 18,
      largeDesktop: 20,
      mobile: 14,
      tablet: 16,
    }

    it('should return value for current breakpoint', () => {
      expect(getResponsiveValue(mockResponsiveData, 'desktop')).toBe(18)
    })

    it('should fallback to larger breakpoint if current missing', () => {
      const partialData = { desktop: 18, largeDesktop: 20 }
      expect(getResponsiveValue(partialData, 'mobile')).toBe(18)
    })

    it('should fallback to smaller breakpoint if larger missing', () => {
      const partialData = { mobile: 14, tablet: 16 }
      expect(getResponsiveValue(partialData, 'desktop')).toBe(16)
    })

    it('should return undefined for empty object', () => {
      expect(getResponsiveValue({}, 'desktop')).toBeUndefined()
    })

    it('should return undefined for undefined input', () => {
      expect(getResponsiveValue(undefined, 'desktop')).toBeUndefined()
    })

    it('should use current breakpoint when none specified', () => {
      mockWindow.innerWidth = 1200
      expect(getResponsiveValue(mockResponsiveData)).toBe(20)
    })
  })

  describe('getResponsiveValueWithUnit', () => {
    it('should add default rem unit to numeric values', () => {
      const data = { desktop: 18 }
      expect(getResponsiveValueWithUnit(data, 'rem', 'desktop')).toBe('18rem')
    })

    it('should add custom unit to numeric values', () => {
      const data = { desktop: 24 }
      expect(getResponsiveValueWithUnit(data, 'px', 'desktop')).toBe('24px')
    })

    it('should preserve existing units in string values', () => {
      const data = { desktop: '1.5em' }
      expect(getResponsiveValueWithUnit(data, 'rem', 'desktop')).toBe('1.5em')
    })

    it('should preserve percentage values', () => {
      const data = { desktop: '100%' }
      expect(getResponsiveValueWithUnit(data, 'px', 'desktop')).toBe('100%')
    })

    it('should return empty string for undefined values', () => {
      expect(getResponsiveValueWithUnit(undefined, 'rem', 'desktop')).toBe('')
      expect(getResponsiveValueWithUnit({}, 'rem', 'desktop')).toBe('')
    })
  })

  describe('getFontSize', () => {
    it('should return font size with rem unit', () => {
      const fontSize = { desktop: 16 }
      expect(getFontSize(fontSize, 'desktop')).toBe('16rem')
    })

    it('should preserve existing units', () => {
      const fontSize = { desktop: '1.2em' }
      expect(getFontSize(fontSize, 'desktop')).toBe('1.2em')
    })

    it('should return empty string for missing values', () => {
      expect(getFontSize({}, 'desktop')).toBe('')
    })
  })

  describe('getLineHeight', () => {
    it('should return line height without unit', () => {
      const lineHeight = { desktop: 1.5 }
      expect(getLineHeight(lineHeight, 'desktop')).toBe('1.5')
    })

    it('should preserve existing units', () => {
      const lineHeight = { desktop: '150%' }
      expect(getLineHeight(lineHeight, 'desktop')).toBe('150%')
    })

    it('should return empty string for missing values', () => {
      expect(getLineHeight({}, 'desktop')).toBe('')
    })
  })
}) 