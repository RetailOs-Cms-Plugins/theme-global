import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import TypographyPreview from '../../../../src/components/theme/typography-preview.js'

// Mock dependencies
vi.mock('../../../../src/utils/typography/font-definitions', () => ({
  getFontDefinition: vi.fn(() => ({ name: 'inter', displayName: 'Inter' })),
}))

vi.mock('../../../../src/utils/typography/getResponsiveValue', () => ({
  getFontSize: vi.fn(() => '1rem'),
  getLineHeight: vi.fn(() => '1.5'),
}))

vi.mock('../../../../src/utils/typography/useResponsiveValue', () => ({
  useResponsiveValue: vi.fn(() => ({
    getFontSize: vi.fn(() => '1rem'),
    getLineHeight: vi.fn(() => '1.5'),
  })),
}))

// Mock Typography components
vi.mock('../../../../src/components/theme/typography', () => ({
  TypographyBlockquote: ({ children }: { children: React.ReactNode }) => <blockquote data-testid="blockquote">{children}</blockquote>,
  TypographyH1: ({ children }: { children: React.ReactNode }) => <h1 data-testid="h1">{children}</h1>,
  TypographyH2: ({ children }: { children: React.ReactNode }) => <h2 data-testid="h2">{children}</h2>,
  TypographyH3: ({ children }: { children: React.ReactNode }) => <h3 data-testid="h3">{children}</h3>,
  TypographyH4: ({ children }: { children: React.ReactNode }) => <h4 data-testid="h4">{children}</h4>,
  TypographyInlineCode: ({ children }: { children: React.ReactNode }) => <code data-testid="inline-code">{children}</code>,
  TypographyLarge: ({ children }: { children: React.ReactNode }) => <div data-testid="large">{children}</div>,
  TypographyLead: ({ children }: { children: React.ReactNode }) => <div data-testid="lead">{children}</div>,
  TypographyMuted: ({ children }: { children: React.ReactNode }) => <div data-testid="muted">{children}</div>,
  TypographyP: ({ children }: { children: React.ReactNode }) => <p data-testid="paragraph">{children}</p>,
  TypographySmall: ({ children }: { children: React.ReactNode }) => <small data-testid="small">{children}</small>,
}))

describe('TypographyPreview', () => {
  const mockThemeData = {
    typography: {
      direction: 'ltr',
      fontBody: 'inter',
      fontHeading: 'inter',
    },
  }

  describe('Core Functionality', () => {
    it('should render main sections and key typography elements', () => {
      render(<TypographyPreview themeData={mockThemeData} />)
      
      // Main sections
      expect(screen.getByText('Responsive Preview')).toBeInTheDocument()
      expect(screen.getByText('Typography Scale')).toBeInTheDocument()
      
      // Key typography elements - check they exist without specifying exact count
      expect(screen.getAllByTestId('h1').length).toBeGreaterThan(0)
      expect(screen.getAllByTestId('paragraph').length).toBeGreaterThan(0)
      expect(screen.getByTestId('inline-code')).toBeInTheDocument()
    })

    it('should render and allow breakpoint selection', () => {
      render(<TypographyPreview />)
      
      // Check specific buttons exist
      expect(screen.getByRole('button', { name: 'Select Large Desktop breakpoint' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Select Desktop breakpoint' })).toBeInTheDocument()
      
      // Test functionality
      const desktopButton = screen.getByRole('button', { name: 'Select Desktop breakpoint' })
      fireEvent.click(desktopButton)
      expect(desktopButton).toHaveAttribute('aria-pressed', 'true')
    })

    it('should handle text direction correctly', () => {
      // LTR by default - just check that LTR text exists
      render(<TypographyPreview themeData={mockThemeData} />)
      expect(screen.getAllByText(/The Quick Brown Fox/).length).toBeGreaterThan(0)
      
      // RTL when specified - just check that RTL text exists  
      const rtlThemeData = {
        ...mockThemeData,
        typography: { ...mockThemeData.typography, direction: 'rtl' as const },
      }
      render(<TypographyPreview themeData={rtlThemeData} />)
      expect(screen.getAllByText(/הכלב החום המהיר/).length).toBeGreaterThan(0)
    })
  })

  describe('Error Handling', () => {
    it('should work without theme data', () => {
      expect(() => {
        render(<TypographyPreview />)
      }).not.toThrow()
      
      expect(screen.getByText('Typography Scale')).toBeInTheDocument()
    })
  })

  describe('Content Display', () => {
    it('should display typography information', () => {
      render(<TypographyPreview themeData={mockThemeData} />)
      
      // Just check that content exists
      expect(screen.getAllByText(/Main Heading/).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Body Text/).length).toBeGreaterThan(0)
    })
  })
}) 