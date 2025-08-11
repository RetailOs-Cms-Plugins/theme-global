import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import TypographySelector from '../../../../src/components/theme/typography-selector.js'

// Mock CSS module
vi.mock('../../../../src/components/theme/typography-selector.module.css', () => ({
  default: {
    collapsibleHeader: 'collapsibleHeader',
    customFontInput: 'customFontInput',
    disabled: 'disabled',
    fontFamilySelect: 'fontFamilySelect',
    requiredAsterisk: 'requiredAsterisk',
    typographySelectorDescription: 'typographySelectorDescription',
    typographySelectorError: 'typographySelectorError',
  },
}))

// Mock font definitions
vi.mock('../../../../src/utils/typography/font-definitions', () => ({
  allFonts: [
    { name: 'inter', displayName: 'Inter' },
    { name: 'roboto', displayName: 'Roboto' },
  ],
}))

describe('TypographySelector', () => {
  const mockProps = {
    name: 'typography',
    label: 'Typography Settings',
    onChange: vi.fn(),
  }

  const mockTypographyConfig = {
    fontBody: 'inter',
    fontHeading: 'roboto',
    h1: { fontSize: '2rem', lineHeight: '2.5rem' },
    p: { fontSize: '1rem', lineHeight: '1.5rem' },
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Core Functionality', () => {
    it('should render main elements and handle basic interactions', () => {
      render(<TypographySelector {...mockProps} required />)
      
      // Basic rendering
      expect(screen.getByText('Typography Settings')).toBeInTheDocument()
      expect(screen.getByText('Body Font')).toBeInTheDocument()
      expect(screen.getByText('Heading Font')).toBeInTheDocument()
      expect(screen.getByText('*')).toBeInTheDocument() // Required asterisk
    })

    it('should display error and description messages', () => {
      const errorMessage = 'Invalid typography'
      const description = 'Configure typography'
      
      render(<TypographySelector {...mockProps} error={errorMessage} />)
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
      expect(screen.getByRole('alert')).toBeInTheDocument()
      
      render(<TypographySelector {...mockProps} description={description} />)
      expect(screen.getByText(description)).toBeInTheDocument()
    })
  })

  describe('Font Management', () => {
    it('should handle font selection and custom fonts', async () => {
      const user = userEvent.setup()
      render(<TypographySelector {...mockProps} />)
      
      // Get the first select (body font)
      const selects = screen.getAllByRole('combobox')
      const bodyFontSelect = selects[0]
      
      // Check that select elements exist
      expect(bodyFontSelect).toBeInTheDocument()
      expect(selects[1]).toBeInTheDocument() // heading font select
      
      // Change font selection
      await user.selectOptions(bodyFontSelect, 'roboto')
      expect(mockProps.onChange).toHaveBeenCalledWith(
        expect.objectContaining({ fontBody: 'roboto' })
      )
      
      // Test custom font functionality
      vi.clearAllMocks() // Clear previous calls
      await user.selectOptions(bodyFontSelect, 'custom')
      const customInputs = screen.getAllByPlaceholderText('Enter custom font family...')
      const bodyCustomInput = customInputs[0]
      
      // Clear and type new value
      await user.clear(bodyCustomInput)
      await user.type(bodyCustomInput, 'Arial')
      
      // Just check that onChange was called with any fontBody value containing Arial
      expect(mockProps.onChange).toHaveBeenCalled()
      const lastCall = mockProps.onChange.mock.calls[mockProps.onChange.mock.calls.length - 1][0]
      expect(lastCall.fontBody).toContain('Arial')
    })
  })

  describe('Text Sizes', () => {
    it('should toggle text sizes section and handle changes', async () => {
      const user = userEvent.setup()
      render(<TypographySelector {...mockProps} value={mockTypographyConfig} />)
      
      const toggleButton = screen.getByRole('button', { name: /Text Sizes/ })
      
      // Open section
      await user.click(toggleButton)
      expect(screen.getAllByLabelText('Font size').length).toBeGreaterThan(0)
      
      // Change font size
      const h1FontSizeInput = screen.getByDisplayValue('2rem')
      await user.clear(h1FontSizeInput)
      await user.type(h1FontSizeInput, '2.5rem')
      expect(mockProps.onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          h1: expect.objectContaining({ fontSize: '2.5rem' })
        })
      )
    })
  })

  describe('State Management', () => {
    it('should handle disabled state', () => {
      render(<TypographySelector {...mockProps} disabled />)
      
      const selects = screen.getAllByRole('combobox')
      selects.forEach(select => {
        expect(select).toBeDisabled()
      })
    })

    it('should display font preview', () => {
      render(<TypographySelector {...mockProps} />)
      
      const previewTexts = screen.getAllByText('The quick brown fox jumps over the lazy dog')
      expect(previewTexts.length).toBeGreaterThanOrEqual(2)
    })
  })
})