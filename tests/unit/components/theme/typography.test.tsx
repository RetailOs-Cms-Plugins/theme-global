import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyInlineCode,
  TypographyLarge,
  TypographyLead,
  TypographyMuted,
  TypographyP,
  TypographySmall,
} from '../../../../src/components/theme/typography.js'

// Mock hooks - define mocks inside vi.mock calls
vi.mock('../../../../src/components/theme/ThemeProvider', () => ({
  useTheme: vi.fn(),
}))

vi.mock('../../../../src/utils/typography/useCurrentBreakpoint', () => ({
  useCurrentBreakpoint: vi.fn(() => 'desktop'),
}))

// Import the mocked functions after mocking
import { useTheme } from '../../../../src/components/theme/ThemeProvider'
import { useCurrentBreakpoint } from '../../../../src/utils/typography/useCurrentBreakpoint'

// Cast to mock functions
const mockUseTheme = useTheme as ReturnType<typeof vi.fn>
const mockUseCurrentBreakpoint = useCurrentBreakpoint as ReturnType<typeof vi.fn>

describe('Typography Components', () => {
  const mockThemeData = {
    typography: {
      blockquote: { fontSize: '1rem', lineHeight: '1.75rem' },
      code: { fontSize: '0.875rem', lineHeight: '1.25rem' },
      h1: { fontSize: '2rem', lineHeight: '2.5rem' },
      h2: { fontSize: '1.75rem', lineHeight: '2rem' },
      large: { fontSize: '1.125rem', lineHeight: '1.75rem' },
      lead: { fontSize: '1.25rem', lineHeight: '1.75rem' },
      muted: { fontSize: '0.875rem', lineHeight: '1.25rem' },
      p: { fontSize: '1rem', lineHeight: '1.5rem' },
      small: { fontSize: '0.875rem', lineHeight: '1.25rem' },
    },
  }

  const mockResponsiveThemeData = {
    typography: {
      h1: {
        fontSize: { desktop: '2rem', mobile: '1.5rem' },
        lineHeight: { desktop: '2.5rem', mobile: '2rem' },
      },
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockUseTheme.mockReturnValue(mockThemeData)
    mockUseCurrentBreakpoint.mockReturnValue('desktop')
  })

  describe('Core Functionality', () => {
    it('should render typography components with theme styles', () => {
      render(
        <div>
          <TypographyH1>Heading 1</TypographyH1>
          <TypographyH2>Heading 2</TypographyH2>
          <TypographyP>Paragraph text</TypographyP>
          <TypographyInlineCode>code</TypographyInlineCode>
        </div>
      )

      expect(screen.getByText('Heading 1')).toBeInTheDocument()
      expect(screen.getByText('Heading 2')).toBeInTheDocument()
      expect(screen.getByText('Paragraph text')).toBeInTheDocument()
      expect(screen.getByText('code')).toBeInTheDocument()
    })

    it('should apply theme styles correctly', () => {
      render(<TypographyH1>Test Heading</TypographyH1>)
      
      const heading = screen.getByText('Test Heading')
      expect(heading).toHaveStyle({
        fontSize: '2rem',
        lineHeight: '2.5rem',
      })
    })

    it('should return null when no theme data is available', () => {
      mockUseTheme.mockReturnValue(null)
      
      const { container } = render(<TypographyH1>Test</TypographyH1>)
      expect(container.firstChild).toBeNull()
    })
  })

  describe('Props and Customization', () => {
    it('should accept custom props and themeData', () => {
      const customTheme = {
        typography: {
          h1: { fontSize: '3rem', lineHeight: '3rem' },
        },
      }

      render(
        <TypographyH1 
          className="custom-class"
          data-testid="custom-h1"
          dir="rtl"
          themeData={customTheme}
        >
          Custom Heading
        </TypographyH1>
      )

      const heading = screen.getByTestId('custom-h1')
      expect(heading).toHaveClass('custom-class')
      expect(heading).toHaveAttribute('dir', 'rtl')
      expect(heading).toHaveStyle({
        fontSize: '3rem',
        lineHeight: '3rem',
      })
    })

    it('should handle custom breakpoints', () => {
      render(
        <TypographyH1 
          breakpoint="mobile"
          themeData={mockResponsiveThemeData}
        >
          Responsive Heading
        </TypographyH1>
      )

      const heading = screen.getByText('Responsive Heading')
      expect(heading).toHaveStyle({
        fontSize: '1.5rem',
        lineHeight: '2rem',
      })
    })
  })

  describe('All Typography Variants', () => {
    it('should render all typography components correctly', () => {
      render(
        <div>
          <TypographyLead>Lead text</TypographyLead>
          <TypographyLarge>Large text</TypographyLarge>
          <TypographySmall>Small text</TypographySmall>
          <TypographyBlockquote>Quote text</TypographyBlockquote>
          <TypographyMuted>Muted text</TypographyMuted>
        </div>
      )

      // Check that all components render
      expect(screen.getByText('Lead text')).toBeInTheDocument()
      expect(screen.getByText('Large text')).toBeInTheDocument()
      expect(screen.getByText('Small text')).toBeInTheDocument()
      expect(screen.getByText('Quote text')).toBeInTheDocument()
      expect(screen.getByText('Muted text')).toBeInTheDocument()

      // Check proper HTML elements
      expect(screen.getByText('Quote text').tagName).toBe('BLOCKQUOTE')
      expect(screen.getByText('Small text').tagName).toBe('SMALL')
    })
  })

  describe('Responsive Behavior', () => {
    it('should use current breakpoint when no breakpoint prop is provided', () => {
      mockUseCurrentBreakpoint.mockReturnValue('tablet')
      
      render(
        <TypographyH1 themeData={mockResponsiveThemeData}>
          Test
        </TypographyH1>
      )

      expect(mockUseCurrentBreakpoint).toHaveBeenCalled()
    })

    it('should prefer prop themeData over context themeData', () => {
      const propTheme = {
        typography: {
          p: { fontSize: '1.5rem', lineHeight: '2rem' },
        },
      }

      render(
        <TypographyP themeData={propTheme}>
          Test paragraph
        </TypographyP>
      )

      const paragraph = screen.getByText('Test paragraph')
      expect(paragraph).toHaveStyle({
        fontSize: '1.5rem',
        lineHeight: '2rem',
      })
    })
  })
})