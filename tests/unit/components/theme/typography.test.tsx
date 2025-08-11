import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Typography } from '../../../../src/components/theme/typography'

// Mock hooks
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

describe('Typography Component', () => {
  const mockThemeData = {
    typography: {
      blockquote: { fontSize: '1rem', lineHeight: '1.75rem' },
      code: { fontSize: '0.875rem', lineHeight: '1.25rem' },
      h1: { fontSize: '2rem', lineHeight: '2.5rem' },
      h2: { fontSize: '1.75rem', lineHeight: '2rem' },
      h3: { fontSize: '1.5rem', lineHeight: '2rem' },
      h4: { fontSize: '1.25rem', lineHeight: '1.75rem' },
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
    it('should render Typography component with correct tag types', () => {
      render(
        <div>
          <Typography tagType="h1">Heading 1</Typography>
          <Typography tagType="h2">Heading 2</Typography>
          <Typography tagType="p">Paragraph text</Typography>
          <Typography tagType="code">inline code</Typography>
        </div>
      )

      expect(screen.getByText('Heading 1')).toBeInTheDocument()
      expect(screen.getByText('Heading 2')).toBeInTheDocument()
      expect(screen.getByText('Paragraph text')).toBeInTheDocument()
      expect(screen.getByText('inline code')).toBeInTheDocument()
    })

    it('should apply theme styles correctly', () => {
      render(<Typography tagType="h1">Test Heading</Typography>)
      
      const heading = screen.getByText('Test Heading')
      expect(heading).toHaveStyle({
        fontSize: '2rem',
        lineHeight: '2.5rem',
      })
    })

    it('should return null when no theme data is available', () => {
      mockUseTheme.mockReturnValue(null)
      
      const { container } = render(<Typography tagType="h1">Test</Typography>)
      expect(container.firstChild).toBeNull()
    })

    it('should render correct HTML elements for each tag type', () => {
      render(
        <div>
          <Typography tagType="blockquote">Quote</Typography>
          <Typography tagType="small">Small text</Typography>
          <Typography tagType="code">Code</Typography>
        </div>
      )

      expect(screen.getByText('Quote').tagName).toBe('P') // blockquote uses p tag
      expect(screen.getByText('Small text').tagName).toBe('SMALL')
      expect(screen.getByText('Code').tagName).toBe('CODE')
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
        <Typography 
          className="custom-class"
          data-testid="custom-h1"
          dir="rtl"
          tagType="h1"
          themeData={customTheme}
        >
          Custom Heading
        </Typography>
      )

      const heading = screen.getByTestId('custom-h1')
      expect(heading).toHaveClass('custom-class')
      expect(heading).toHaveAttribute('dir', 'rtl')
      expect(heading).toHaveStyle({
        fontSize: '3rem',
        lineHeight: '3rem',
      })
    })

    it('should handle responsive breakpoints', () => {
      render(
        <Typography 
          breakpoint="mobile"
          tagType="h1"
          themeData={mockResponsiveThemeData}
        >
          Responsive Heading
        </Typography>
      )

      const heading = screen.getByText('Responsive Heading')
      expect(heading).toHaveStyle({
        fontSize: '1.5rem',
        lineHeight: '2rem',
      })
    })

    it('should merge custom styles with theme styles', () => {
      render(
        <Typography 
          style={{ color: 'red', marginTop: '10px' }}
          tagType="p"
        >
          Styled text
        </Typography>
      )

      const text = screen.getByText('Styled text')
      expect(text).toHaveStyle({
        fontSize: '1rem',
        lineHeight: '1.5rem',
        marginTop: '10px',
      })
      // Check color separately - browsers convert 'red' to 'rgb(255, 0, 0)'
      const computedStyle = getComputedStyle(text)
      expect(computedStyle.color).toBe('rgb(255, 0, 0)')
    })
  })

  describe('Responsive Behavior', () => {
    it('should use current breakpoint when no breakpoint prop is provided', () => {
      mockUseCurrentBreakpoint.mockReturnValue('tablet')
      
      render(
        <Typography tagType="h1" themeData={mockResponsiveThemeData}>
          Test
        </Typography>
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
        <Typography tagType="p" themeData={propTheme}>
          Test paragraph
        </Typography>
      )

      const paragraph = screen.getByText('Test paragraph')
      expect(paragraph).toHaveStyle({
        fontSize: '1.5rem',
        lineHeight: '2rem',
      })
    })

    it('should handle missing responsive breakpoint gracefully', () => {
      const partialResponsiveTheme = {
        typography: {
          h1: {
            fontSize: { desktop: '2rem' }, // missing mobile
            lineHeight: { desktop: '2.5rem' },
          },
        },
      }

      render(
        <Typography 
          breakpoint="mobile"
          tagType="h1"
          themeData={partialResponsiveTheme}
        >
          Test
        </Typography>
      )

      const heading = screen.getByText('Test')
      // Should fallback to desktop values when mobile is not available
      expect(heading).toHaveStyle({
        fontSize: '2rem',
        lineHeight: '2.5rem',
      })
    })
  })

  describe('All Typography Tag Types', () => {
    it('should render all supported tag types', () => {
      const tagTypes = ['h1', 'h2', 'h3', 'h4', 'p', 'lead', 'large', 'small', 'muted', 'blockquote', 'code'] as const

      render(
        <div>
          {tagTypes.map((tagType, index) => (
            <Typography key={tagType} tagType={tagType}>
              {`${tagType} text ${index}`}
            </Typography>
          ))}
        </div>
      )

      tagTypes.forEach((tagType, index) => {
        expect(screen.getByText(`${tagType} text ${index}`)).toBeInTheDocument()
      })
    })
  })
})