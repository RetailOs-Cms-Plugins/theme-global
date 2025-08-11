import fs from 'fs'
import { describe, expect, it, vi } from 'vitest'

import { FontLoader, generateFontCSS, generateFontVariables, getGoogleFontsUrl } from '../../../../src/utils/typography/font-loader.js'

// Mock dependencies
vi.mock('fs', () => ({
  default: {
    existsSync: vi.fn(),
  },
}))

vi.mock('path', () => ({
  default: {
    join: vi.fn((...args) => args.join('/')),
  },
}))

vi.mock('../../../../src/utils/typography/font-definitions', () => ({
  allFonts: [
    {
      name: 'inter',
      displayName: 'Inter',
      source: { type: 'google', googleFamily: 'Inter' },
      supports: { scripts: ['latin'] },
      weights: [400, 700],
    },
    {
      name: 'asimon',
      displayName: 'Asimon',
      source: { 
        type: 'local', 
        files: { woff: '/fonts/asimon.woff', woff2: '/fonts/asimon.woff2' }
      },
      supports: { scripts: ['hebrew'] },
    },
    {
      name: 'system-ui',
      displayName: 'System UI',
      source: { type: 'system' },
      supports: { scripts: ['latin'] },
    },
  ],
  getFontDefinition: vi.fn((name) => {
    const fonts = [
      {
        name: 'inter',
        displayName: 'Inter',
        source: { type: 'google', googleFamily: 'Inter' },
        supports: { scripts: ['latin'] },
        weights: [400, 700],
      },
      {
        name: 'asimon',
        displayName: 'Asimon',
        source: { 
          type: 'local', 
          files: { woff: '/fonts/asimon.woff', woff2: '/fonts/asimon.woff2' }
        },
        supports: { scripts: ['hebrew'] },
      },
    ]
    return fonts.find(f => f.name === name)
  }),
}))

// Mock DOM - simplify to avoid async issues
const mockDocument = {
  createElement: vi.fn(() => ({
    href: '',
    set onload(callback: () => void) {
      // Immediately call the callback to simulate successful load
      if (callback) {callback()}
    },
    get onload() { return null as unknown as () => void },
    rel: ''
  })),
  fonts: {
    add: vi.fn(),
  },
  head: {
    appendChild: vi.fn(),
  },
}

const mockFontFace = vi.fn(() => ({
  load: vi.fn().mockResolvedValue(undefined),
}))

Object.defineProperty(global, 'document', { value: mockDocument })
Object.defineProperty(global, 'FontFace', { value: mockFontFace })

const mockFs = fs as any

describe('Font Loader Utils', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(process, 'cwd').mockReturnValue('/project')
  })

  describe('FontLoader Class', () => {
    let fontLoader: FontLoader

    beforeEach(() => {
      fontLoader = new FontLoader()
    })

    it('should load Google fonts', async () => {
      await fontLoader.loadFont('inter')

      expect(mockDocument.createElement).toHaveBeenCalledWith('link')
      expect(mockDocument.head.appendChild).toHaveBeenCalled()
    })

    it('should load local fonts', async () => {
      await fontLoader.loadFont('asimon')

      expect(mockFontFace).toHaveBeenCalledWith(
        'Asimon',
        expect.stringContaining('url(\'/fonts/asimon.woff2\')')
      )
      expect(mockDocument.fonts.add).toHaveBeenCalled()
    })

    it('should handle system fonts without loading', async () => {
      await fontLoader.loadFont('system-ui')

      expect(mockDocument.createElement).not.toHaveBeenCalled()
      expect(mockFontFace).not.toHaveBeenCalled()
    })

    it('should not reload already loaded fonts', async () => {
      await fontLoader.loadFont('inter')
      await fontLoader.loadFont('inter')

      expect(mockDocument.createElement).toHaveBeenCalledTimes(1)
    })

    it('should throw error for unknown fonts', async () => {
      await expect(fontLoader.loadFont('unknown')).rejects.toThrow('Font unknown not found')
    })

    it('should generate CSS variables', () => {
      const result = fontLoader.generateFontCSSVariables('inter', ['system-ui'])

      expect(result).toEqual({
        '--theme-font-direction': 'ltr',
        '--theme-font-family': 'Inter, system-ui',
      })
    })
  })

  describe('generateFontVariables', () => {
    it('should generate variables for fonts', () => {
      const result = generateFontVariables('inter', ['system-ui'])

      expect(result).toEqual({
        '--theme-font-direction': 'ltr',
        '--theme-font-display-name': 'Inter',
        '--theme-font-family': 'Inter, system-ui',
        '--theme-font-type': 'google',
      })
    })

    it('should return empty object for unknown fonts', () => {
      const result = generateFontVariables('unknown', [])

      expect(result).toEqual({})
    })
  })

  describe('generateFontCSS', () => {
    it('should generate CSS for Google fonts', () => {
      const result = generateFontCSS('inter', ['system-ui'])

      expect(result).toContain('@import url(\'https://fonts.googleapis.com/css2?family=Inter&display=swap\')')
      expect(result).toContain('--theme-font-family: Inter, system-ui')
      expect(result).toContain('--theme-font-direction: ltr')
    })

    it('should generate CSS for local fonts when files exist', () => {
      mockFs.existsSync.mockReturnValue(true)

      const result = generateFontCSS('asimon', ['system-ui'])

      expect(result).toContain('@font-face')
      expect(result).toContain('font-family: \'Asimon\'')
    })

    it('should return empty string for unknown fonts', () => {
      const result = generateFontCSS('unknown', [])

      expect(result).toBe('')
    })
  })

  describe('getGoogleFontsUrl', () => {
    it('should generate URL for Google fonts', () => {
      const result = getGoogleFontsUrl(['inter'])

      expect(result).toBe('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap')
    })

    it('should return null for empty array', () => {
      const result = getGoogleFontsUrl([])

      expect(result).toBeNull()
    })
  })
}) 