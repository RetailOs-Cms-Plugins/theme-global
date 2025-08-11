import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { FontHead } from '../../../../src/components/theme/font-head.js'

// Mock getFontDefinition utility - define mock inside vi.mock
vi.mock('../../../../src/utils/typography/font-definitions', () => ({
  getFontDefinition: vi.fn(),
}))

// Import mocked function after mocking
import { getFontDefinition } from '../../../../src/utils/typography/font-definitions'

// Cast to mock function for TypeScript
const mockGetFontDefinition = getFontDefinition as ReturnType<typeof vi.fn>

describe('FontHead', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    document.head.innerHTML = ''
  })

  describe('Font Loading', () => {
    it('should render Google Fonts links correctly', () => {
      const mockGoogleFont = {
        name: 'inter',
        displayName: 'Inter',
        source: {
          type: 'google',
          googleFamily: 'Inter:wght@400;500;600;700',
        },
      }

      mockGetFontDefinition.mockReturnValue(mockGoogleFont)
      render(<FontHead fontName="inter" />)

      const preconnectLinks = document.querySelectorAll('link[rel="preconnect"]')
      const stylesheetLink = document.querySelector('link[rel="stylesheet"]')

      expect(preconnectLinks).toHaveLength(2)
      expect(preconnectLinks[0]).toHaveAttribute('href', 'https://fonts.googleapis.com')
      expect(preconnectLinks[1]).toHaveAttribute('href', 'https://fonts.gstatic.com')
      expect(stylesheetLink).toHaveAttribute(
        'href',
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
      )
    })

    it('should render local font preload links', () => {
      const mockLocalFont = {
        name: 'asimon',
        displayName: 'Asimon',
        source: {
          type: 'local',
          files: {
            woff: '/fonts/asimon-regular.woff',
            woff2: '/fonts/asimon-regular.woff2',
          },
        },
      }

      mockGetFontDefinition.mockReturnValue(mockLocalFont)
      render(<FontHead fontName="asimon" />)

      const preloadLinks = document.querySelectorAll('link[rel="preload"]')
      expect(preloadLinks).toHaveLength(2)

      const woff2Link = document.querySelector('link[type="font/woff2"]')
      const woffLink = document.querySelector('link[type="font/woff"]')

      expect(woff2Link).toHaveAttribute('href', '/fonts/asimon-regular.woff2')
      expect(woff2Link).toHaveAttribute('as', 'font')
      expect(woff2Link).toHaveAttribute('crossorigin', 'anonymous')

      expect(woffLink).toHaveAttribute('href', '/fonts/asimon-regular.woff')
      expect(woffLink).toHaveAttribute('as', 'font')
    })

    it('should handle partial local font files', () => {
      const mockLocalFont = {
        name: 'asimon',
        displayName: 'Asimon',
        source: {
          type: 'local',
          files: {
            woff2: '/fonts/asimon-regular.woff2',
            // Only woff2, no woff
          },
        },
      }

      mockGetFontDefinition.mockReturnValue(mockLocalFont)
      render(<FontHead fontName="asimon" />)

      const woff2Link = document.querySelector('link[type="font/woff2"]')
      const woffLink = document.querySelector('link[type="font/woff"]')

      expect(woff2Link).toBeInTheDocument()
      expect(woffLink).not.toBeInTheDocument()
    })

    it('should render nothing for system fonts', () => {
      const mockSystemFont = {
        name: 'arial',
        displayName: 'Arial',
        source: {
          type: 'system',
        },
      }

      mockGetFontDefinition.mockReturnValue(mockSystemFont)

      const { container } = render(<FontHead fontName="arial" />)

      expect(container.firstChild).toBeNull()
      expect(document.querySelectorAll('link')).toHaveLength(0)
    })
  })

  describe('Error Handling', () => {
    it('should render nothing when font is not found', () => {
      mockGetFontDefinition.mockReturnValue(null)

      const { container } = render(<FontHead fontName="nonexistent-font" />)

      expect(container.firstChild).toBeNull()
      expect(document.querySelectorAll('link')).toHaveLength(0)
    })

    it('should render nothing for local font without files', () => {
      const mockLocalFont = {
        name: 'asimon',
        displayName: 'Asimon',
        source: {
          type: 'local',
          // files missing
        },
      }

      mockGetFontDefinition.mockReturnValue(mockLocalFont)

      const { container } = render(<FontHead fontName="asimon" />)

      expect(container.firstChild).toBeNull()
    })
  })

  describe('Function Call', () => {
    it('should call getFontDefinition with correct fontName', () => {
      mockGetFontDefinition.mockReturnValue(null)

      render(<FontHead fontName="test-font" />)

      expect(mockGetFontDefinition).toHaveBeenCalledWith('test-font')
      expect(mockGetFontDefinition).toHaveBeenCalledTimes(1)
    })
  })
}) 