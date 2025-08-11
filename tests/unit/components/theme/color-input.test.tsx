import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import ColorInput from '../../../../src/components/theme/color-input.js'

// Mock CSS modules
vi.mock('../../../../src/components/theme/color-input.module.css', () => ({
  default: {
    colorInputContainer: 'colorInputContainer',
    colorInputDescription: 'colorInputDescription',
    colorInputError: 'colorInputError',
    colorInputLabel: 'colorInputLabel',
    colorInputWrapper: 'colorInputWrapper',
    colorPickerInput: 'colorPickerInput',
    colorPreview: 'colorPreview',
    colorTextInput: 'colorTextInput',
    disabled: 'disabled',
    error: 'error',
    requiredAsterisk: 'requiredAsterisk',
  },
}))

describe('ColorInput', () => {
  const defaultProps = {
    name: 'test-color',
    onChange: vi.fn(),
    value: '#ff0000',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Component Rendering', () => {
    it('should render with default props', () => {
      render(<ColorInput {...defaultProps} />)
      
      const textInput = screen.getByRole('textbox')
      const colorPicker = screen.getByLabelText('Color picker')
      
      expect(textInput).toBeInTheDocument()
      expect(textInput).toHaveValue('#ff0000')
      expect(colorPicker).toBeInTheDocument()
      expect(colorPicker).toHaveValue('#ff0000')
    })

    it('should render with label', () => {
      render(<ColorInput {...defaultProps} label="Primary Color" />)
      
      expect(screen.getByText('Primary Color')).toBeInTheDocument()
      expect(screen.getByLabelText('Primary Color')).toBeInTheDocument()
    })

    it('should render with required asterisk when required', () => {
      render(<ColorInput {...defaultProps} label="Primary Color" required />)
      
      expect(screen.getByText('*')).toBeInTheDocument()
    })

    it('should render with description', () => {
      const description = 'Choose your primary brand color'
      render(<ColorInput {...defaultProps} description={description} />)
      
      expect(screen.getByText(description)).toBeInTheDocument()
    })

    it('should render with error message', () => {
      const error = 'Invalid color format'
      render(<ColorInput {...defaultProps} error={error} />)
      
      expect(screen.getByText(error)).toBeInTheDocument()
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('should render disabled state', () => {
      render(<ColorInput {...defaultProps} disabled />)
      
      const textInput = screen.getByRole('textbox')
      const colorPicker = screen.getByLabelText('Color picker')
      
      expect(textInput).toBeDisabled()
      expect(textInput).toHaveValue('#ff0000')
      expect(colorPicker).toBeDisabled()
    })

    it('should render color preview with correct background', () => {
      render(<ColorInput {...defaultProps} value="#00ff00" />)
      
      const colorPreview = document.querySelector('.colorPreview')
      expect(colorPreview).toHaveStyle({ backgroundColor: '#00ff00' })
    })
  })

  describe('Color Validation', () => {
    it('should accept valid 6-digit hex colors', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      
      render(<ColorInput {...defaultProps} onChange={onChange} value="" />)
      
      const textInput = screen.getByPlaceholderText('#000000')
      await user.type(textInput, '#ff0000')
      
      expect(onChange).toHaveBeenCalledWith('#ff0000')
    })

    it('should accept valid 3-digit hex colors', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      
      render(<ColorInput {...defaultProps} onChange={onChange} value="" />)
      
      const textInput = screen.getByPlaceholderText('#000000')
      await user.type(textInput, '#f00')
      
      expect(onChange).toHaveBeenCalledWith('#f00')
    })

    it('should reject invalid color formats', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      
      render(<ColorInput {...defaultProps} onChange={onChange} value="" />)
      
      const textInput = screen.getByPlaceholderText('#000000')
      await user.type(textInput, 'invalid-color')
      
      // onChange should not be called for invalid colors
      expect(onChange).not.toHaveBeenCalled()
      
      // Should show error message
      expect(screen.getByText('Please enter a valid hex color (e.g., #FF0000)')).toBeInTheDocument()
    })

    it('should handle mixed case hex colors', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      
      render(<ColorInput {...defaultProps} onChange={onChange} value="" />)
      
      const textInput = screen.getByPlaceholderText('#000000')
      await user.type(textInput, '#FfA0b3')
      
      expect(onChange).toHaveBeenCalledWith('#FfA0b3')
    })

    it('should show invalid state visually for bad colors', async () => {
      const user = userEvent.setup()
      
      render(<ColorInput {...defaultProps} value="" />)
      
      const textInput = screen.getByPlaceholderText('#000000')
      await user.type(textInput, 'not-a-color')
      
      expect(textInput).toHaveClass('error')
      expect(textInput).toHaveAttribute('aria-invalid', 'true')
    })
  })

  describe('Text Input Functionality', () => {
    it('should update value on text input change', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      
      render(<ColorInput {...defaultProps} onChange={onChange} value="#000000" />)
      
      const textInput = screen.getByRole('textbox')
      await user.clear(textInput)
      await user.type(textInput, '#ffffff')
      
      expect(onChange).toHaveBeenCalledWith('#ffffff')
    })

    it('should auto-fix missing hash on blur', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      
      render(<ColorInput {...defaultProps} onChange={onChange} value="" />)
      
      const textInput = screen.getByPlaceholderText('#000000')
      await user.type(textInput, 'ff0000')
      await user.tab() // Trigger blur
      
      expect(onChange).toHaveBeenCalledWith('#ff0000')
    })

    it('should not auto-fix invalid colors on blur', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      
      render(<ColorInput {...defaultProps} onChange={onChange} value="" />)
      
      const textInput = screen.getByPlaceholderText('#000000')
      await user.type(textInput, 'invalid')
      await user.tab() // Trigger blur
      
      // Should not call onChange for invalid colors even after blur
      expect(onChange).not.toHaveBeenCalled()
    })

    it('should handle empty input', () => {
      render(<ColorInput {...defaultProps} value="" />)
      
      const textInput = screen.getByPlaceholderText('#000000')
      expect(textInput).toHaveValue('')
    })
  })

  describe('Color Picker Functionality', () => {
    it('should update value on color picker change', () => {
      const onChange = vi.fn()
      
      render(<ColorInput {...defaultProps} onChange={onChange} />)
      
      const colorPicker = screen.getByLabelText('Color picker')
      fireEvent.change(colorPicker, { target: { value: '#00ff00' } })
      
      expect(onChange).toHaveBeenCalledWith('#00ff00')
    })

    it('should sync color picker with text input', () => {
      render(<ColorInput {...defaultProps} value="#0000ff" />)
      
      const colorPicker = screen.getByLabelText('Color picker')
      expect(colorPicker).toHaveValue('#0000ff')
    })

    it('should fallback to default color for invalid text input', () => {
      render(<ColorInput {...defaultProps} value="invalid-color" />)
      
      const colorPicker = screen.getByLabelText('Color picker')
      expect(colorPicker).toHaveValue('#000000')
    })

    it('should use custom label for color picker when provided', () => {
      render(<ColorInput {...defaultProps} label="Brand Color" />)
      
      expect(screen.getByLabelText('Brand Color picker')).toBeInTheDocument()
    })
  })

  describe('Props Synchronization', () => {
    it('should sync internal state with external value changes', () => {
      const { rerender } = render(<ColorInput {...defaultProps} value="#ff0000" />)
      
      const textInput = screen.getByRole('textbox')
      expect(textInput).toHaveValue('#ff0000')
      
      rerender(<ColorInput {...defaultProps} value="#00ff00" />)
      
      expect(textInput).toHaveValue('#00ff00')
    })

    it('should maintain validation state when external value changes', () => {
      const { rerender } = render(<ColorInput {...defaultProps} value="invalid" />)
      
      expect(screen.getByText('Please enter a valid hex color (e.g., #FF0000)')).toBeInTheDocument()
      
      rerender(<ColorInput {...defaultProps} value="#ff0000" />)
      
      expect(screen.queryByText('Please enter a valid hex color (e.g., #FF0000)')).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(
        <ColorInput 
          {...defaultProps} 
          description="Choose your brand color" 
          error="Invalid color"
          label="Primary Color"
        />
      )
      
      const textInput = screen.getByLabelText('Primary Color')
      
      expect(textInput).toHaveAttribute('aria-labelledby', 'test-color-label')
      expect(textInput).toHaveAttribute('aria-describedby', 'test-color-description')
      expect(textInput).toHaveAttribute('aria-invalid', 'true')
    })

    it('should announce errors to screen readers', () => {
      render(<ColorInput {...defaultProps} error="Custom error message" />)
      
      const errorElement = screen.getByRole('alert')
      expect(errorElement).toHaveTextContent('Custom error message')
    })

    it('should have proper color preview accessibility', () => {
      render(<ColorInput {...defaultProps} value="#ff0000" />)
      
      const colorPreview = document.querySelector('.colorPreview')
      expect(colorPreview).toHaveAttribute('aria-hidden', 'true')
    })

    it('should not show description when error is present', () => {
      render(
        <ColorInput 
          {...defaultProps} 
          description="This is a description"
          error="This is an error"
        />
      )
      
      expect(screen.getByText('This is an error')).toBeInTheDocument()
      expect(screen.queryByText('This is a description')).not.toBeInTheDocument()
    })

    it('should not show description for invalid colors', () => {
      render(
        <ColorInput 
          {...defaultProps} 
          description="This is a description"
          value="invalid"
        />
      )
      
      expect(screen.queryByText('This is a description')).not.toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle undefined onChange prop', () => {
      expect(() => {
        render(<ColorInput name="test" value="#ff0000" />)
      }).not.toThrow()
    })

    it('should handle rapid value changes', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      
      render(<ColorInput {...defaultProps} onChange={onChange} value="" />)
      
      const textInput = screen.getByPlaceholderText('#000000')
      
      // Rapid typing
      await user.type(textInput, '#ff0000', { delay: 1 })
      
      // Should call onChange for each valid character typed
      expect(onChange).toHaveBeenCalled()
    })

    it('should handle special characters in input', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      
      render(<ColorInput {...defaultProps} onChange={onChange} value="" />)
      
      const textInput = screen.getByPlaceholderText('#000000')
      await user.type(textInput, '#ff@000')
      
      // onChange might be called for valid partial strings like "#ff"
      // Let's check that the final invalid string doesn't trigger onChange
      expect(onChange).not.toHaveBeenCalledWith('#ff@000')
    })

    it('should handle very long input strings', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      
      render(<ColorInput {...defaultProps} onChange={onChange} value="" />)
      
      const textInput = screen.getByPlaceholderText('#000000')
      // Type a string that becomes invalid due to length
      await user.type(textInput, 'invalidverylongstring')
      
      // Should not call onChange for the invalid long string
      expect(onChange).not.toHaveBeenCalledWith('invalidverylongstring')
    })

    it('should handle focus and blur events properly', async () => {
      const user = userEvent.setup()
      
      render(<ColorInput {...defaultProps} value="" />)
      
      const textInput = screen.getByPlaceholderText('#000000')
      
      await user.click(textInput)
      expect(textInput).toHaveFocus()
      
      await user.tab()
      expect(textInput).not.toHaveFocus()
    })
  })
}) 