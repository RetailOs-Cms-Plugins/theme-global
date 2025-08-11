import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
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

// Mock Typography component with proper props
vi.mock('../../../../src/components/theme/typography', () => ({
  Typography: ({ breakpoint, children, tagType }: { 
    breakpoint?: string
    children: React.ReactNode
    tagType: string
  }) => {
    const testId = tagType === 'p' ? 'paragraph' : tagType === 'code' ? 'inline-code' : tagType
    // Map non-standard tag types to valid HTML elements for rendering
    const elementMap: Record<string, string> = {
      blockquote: 'blockquote',
      large: 'div',
      lead: 'div',
      muted: 'div',
      small: 'small',
    }
    const element = elementMap[tagType] || tagType
    return React.createElement(element, { 
      'data-breakpoint': breakpoint,
      'data-testid': testId 
    }, children)
  },
}))

describe('TypographyPreview', () => {
  const mockThemeData = {
    typography: {
      blockquote: {
        fontSize: '1.125rem',
        lineHeight: '1.75rem'
      },
      direction: 'ltr',
      fontBody: 'inter',
      fontHeading: 'poppins',
      h1: {
        fontSize: { desktop: '4rem', largeDesktop: '5rem', mobile: '2rem', tablet: '3rem' },
        lineHeight: { desktop: '1.2', largeDesktop: '1.2', mobile: '1.1', tablet: '1.2' }
      },
      h2: {
        fontSize: { desktop: '3rem', largeDesktop: '4rem', mobile: '2rem', tablet: '2.5rem' },
        lineHeight: { desktop: '1.2', largeDesktop: '1.2', mobile: '1.1', tablet: '1.2' }
      },
      inlineCode: {
        fontSize: '0.875rem',
        lineHeight: '1.25rem'
      },
      large: {
        fontSize: '1.125rem',
        lineHeight: '1.75rem'
      },
      lead: {
        fontSize: '1.25rem',
        lineHeight: '1.75rem'
      },
      muted: {
        fontSize: '0.875rem',
        lineHeight: '1.25rem'
      },
      p: {
        fontSize: { desktop: '1.25rem', largeDesktop: '1.5rem', mobile: '0.9rem', tablet: '1rem' },
        lineHeight: { desktop: '1.5', largeDesktop: '1.5', mobile: '1.3', tablet: '1.4' }
      },
      small: {
        fontSize: '0.875rem',
        lineHeight: '1.25rem'
      }
    },
  }

  describe('Core Functionality', () => {
    it('should render main sections', () => {
      render(<TypographyPreview themeData={mockThemeData} />)
      
      // Main sections
      expect(screen.getByText('Responsive Preview')).toBeInTheDocument()
      expect(screen.getByText('Typography Scale')).toBeInTheDocument()
    })

    it('should render breakpoint selector with all breakpoints', () => {
      render(<TypographyPreview themeData={mockThemeData} />)
      
      // Check all breakpoint buttons exist
      expect(screen.getByRole('button', { name: 'Select Large Desktop breakpoint' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Select Desktop breakpoint' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Select Tablet breakpoint' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Select Mobile breakpoint' })).toBeInTheDocument()
    })

    it('should allow breakpoint selection and update preview', () => {
      render(<TypographyPreview themeData={mockThemeData} />)
      
      // Initially Large Desktop should be selected (index 0)
      const largeDesktopButton = screen.getByRole('button', { name: 'Select Large Desktop breakpoint' })
      expect(largeDesktopButton).toHaveAttribute('aria-pressed', 'true')
      
      // Click Desktop button
      const desktopButton = screen.getByRole('button', { name: 'Select Desktop breakpoint' })
      fireEvent.click(desktopButton)
      
      // Desktop should now be selected
      expect(desktopButton).toHaveAttribute('aria-pressed', 'true')
      expect(largeDesktopButton).toHaveAttribute('aria-pressed', 'false')
    })

    it('should render typography elements in preview section', () => {
      render(<TypographyPreview themeData={mockThemeData} />)
      
      // Check that typography elements are rendered in the preview
      const previewSection = screen.getByText('Responsive Preview').closest('section')
      expect(previewSection).toBeInTheDocument()
      
      // Check some typography elements exist
      expect(screen.getAllByTestId('h1').length).toBeGreaterThan(0)
      expect(screen.getAllByTestId('h3').length).toBeGreaterThan(0)
      expect(screen.getAllByTestId('paragraph').length).toBeGreaterThan(0)
      expect(screen.getAllByTestId('small').length).toBeGreaterThan(0)
    })

    it('should render typography scale with all elements', () => {
      render(<TypographyPreview themeData={mockThemeData} />)
      
      // Check typography scale section
      const scaleSection = screen.getByText('Typography Scale').closest('section')
      expect(scaleSection).toBeInTheDocument()
      
      // Check specific typography elements in scale
      expect(screen.getByText('Main Heading')).toBeInTheDocument()
      expect(screen.getByText('Secondary Heading')).toBeInTheDocument()
      expect(screen.getByText('Third Heading')).toBeInTheDocument()
      expect(screen.getByText('Fourth Heading')).toBeInTheDocument()
      expect(screen.getByText('Body Text')).toBeInTheDocument()
      expect(screen.getByText('Blockquote')).toBeInTheDocument()
      expect(screen.getByText('Small Text')).toBeInTheDocument()
      expect(screen.getByText('Muted Text')).toBeInTheDocument()
      expect(screen.getByText('Lead Paragraph')).toBeInTheDocument()
      expect(screen.getByText('Large Text')).toBeInTheDocument()
      expect(screen.getByText('Code')).toBeInTheDocument()
    })
  })

  describe('Text Direction Handling', () => {
    it('should display LTR text by default', () => {
      render(<TypographyPreview themeData={mockThemeData} />)
      
      // Check for English text content
      expect(screen.getAllByText(/The Quick Brown Fox/).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/quick brown fox jumps/).length).toBeGreaterThan(0)
    })

    it('should display RTL text when direction is rtl', () => {
      const rtlThemeData = {
        ...mockThemeData,
        typography: { 
          ...mockThemeData.typography, 
          direction: 'rtl' as const 
        },
      }
      
      render(<TypographyPreview themeData={rtlThemeData} />)
      
      // Check for Hebrew text content
      expect(screen.getAllByText(/הכלב החום המהיר/).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/קופץ מעל הכלב העצלן/).length).toBeGreaterThan(0)
    })

    it('should display correct directional text for different typography elements', () => {
      const rtlThemeData = {
        ...mockThemeData,
        typography: { 
          ...mockThemeData.typography, 
          direction: 'rtl' as const 
        },
      }
      
      render(<TypographyPreview themeData={rtlThemeData} />)
      
      // Check for specific RTL content
      expect(screen.getByText(/פסקת פתיחה, הידועה גם כ-lede/)).toBeInTheDocument()
      expect(screen.getByText(/טקסט גדול יכול לשמש לציטוטים/)).toBeInTheDocument()
    })
  })

  describe('Typography Information Display', () => {
    it('should display typography information for each element', () => {
      render(<TypographyPreview themeData={mockThemeData} />)
      
      // Check that typography info is displayed (font details)
      expect(screen.getAllByText(/Font:/).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Size:/).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Weight:/).length).toBeGreaterThan(0)
    })

    it('should show correct font family labels', () => {
      render(<TypographyPreview themeData={mockThemeData} />)
      
      // Check that font family information is displayed
      // The component should show "Inter" and "Poppins" in the typography info
      expect(screen.getAllByText(/Inter/).length).toBeGreaterThan(0)
    })
  })

  describe('Responsive Behavior', () => {
    it('should pass correct breakpoint to Typography components', () => {
      render(<TypographyPreview themeData={mockThemeData} />)
      
      // Initially should use largeDesktop breakpoint
      const typographyElements = screen.getAllByTestId('h1')
      expect(typographyElements[0]).toHaveAttribute('data-breakpoint', 'largeDesktop')
      
      // Change to desktop
      const desktopButton = screen.getByRole('button', { name: 'Select Desktop breakpoint' })
      fireEvent.click(desktopButton)
      
      // Should now use desktop breakpoint
      const updatedElements = screen.getAllByTestId('h1')
      expect(updatedElements[0]).toHaveAttribute('data-breakpoint', 'desktop')
    })

    it('should show responsive preview container with correct styling', () => {
      render(<TypographyPreview themeData={mockThemeData} />)
      
      // Check that the preview container exists - use getAllByText since there are multiple instances
      const largeDesktopElements = screen.getAllByText('Large Desktop')
      expect(largeDesktopElements.length).toBeGreaterThan(0)
      
      // Test breakpoint change affects container
      const tabletButton = screen.getByRole('button', { name: 'Select Tablet breakpoint' })
      fireEvent.click(tabletButton)
      
      // After clicking, should show Tablet in the preview indicator
      const tabletElements = screen.getAllByText('Tablet')
      expect(tabletElements.length).toBeGreaterThan(0)
    })
  })

  describe('Error Handling', () => {
    it('should work without theme data', () => {
      expect(() => {
        render(<TypographyPreview />)
      }).not.toThrow()
      
      // Should still render main sections
      expect(screen.getByText('Typography Scale')).toBeInTheDocument()
      expect(screen.getByText('Responsive Preview')).toBeInTheDocument()
    })

    it('should handle missing typography properties gracefully', () => {
      const partialThemeData = {
        typography: {
          fontBody: 'inter',
          // Missing other properties
        },
      }
      
      expect(() => {
        render(<TypographyPreview themeData={partialThemeData} />)
      }).not.toThrow()
      
      expect(screen.getByText('Typography Scale')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels for breakpoint buttons', () => {
      render(<TypographyPreview themeData={mockThemeData} />)
      
      const buttons = [
        'Select Large Desktop breakpoint',
        'Select Desktop breakpoint', 
        'Select Tablet breakpoint',
        'Select Mobile breakpoint'
      ]
      
      buttons.forEach(label => {
        expect(screen.getByRole('button', { name: label })).toBeInTheDocument()
      })
    })

    it('should have proper aria-pressed states for breakpoint buttons', () => {
      render(<TypographyPreview themeData={mockThemeData} />)
      
      // Initially Large Desktop should be pressed
      expect(screen.getByRole('button', { name: 'Select Large Desktop breakpoint' }))
        .toHaveAttribute('aria-pressed', 'true')
      
      // Others should not be pressed
      expect(screen.getByRole('button', { name: 'Select Desktop breakpoint' }))
        .toHaveAttribute('aria-pressed', 'false')
    })

    it('should have proper role and aria-label for icons', () => {
      render(<TypographyPreview themeData={mockThemeData} />)
      
      // Check for proper icon accessibility
      expect(screen.getByLabelText('Responsive Preview')).toHaveAttribute('role', 'img')
      expect(screen.getByLabelText('Typography Scale')).toHaveAttribute('role', 'img')
    })
  })

  describe('Content Accuracy', () => {
    it('should display sample content for typography preview', () => {
      render(<TypographyPreview themeData={mockThemeData} />)
      
      // Check for sample content in different sections - use getAllByText since content appears multiple times
      const foxTextElements = screen.getAllByText(/The quick brown fox jumps over the lazy dog/)
      expect(foxTextElements.length).toBeGreaterThan(0)
      
      const codeElements = screen.getAllByText(/const example = "code snippet"/)
      expect(codeElements.length).toBeGreaterThan(0)
    })

    it('should display typography element IDs correctly', () => {
      render(<TypographyPreview themeData={mockThemeData} />)
      
      // Check that element IDs are shown in the scale
      expect(screen.getByText('h1')).toBeInTheDocument()
      expect(screen.getByText('h2')).toBeInTheDocument()
      expect(screen.getByText('p')).toBeInTheDocument()
      expect(screen.getByText('blockquote')).toBeInTheDocument()
      expect(screen.getByText('small')).toBeInTheDocument()
    })
  })
}) 