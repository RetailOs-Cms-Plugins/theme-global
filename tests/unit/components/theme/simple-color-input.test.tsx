import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import SimpleColorInput from '../../../../src/components/theme/simple-color-input.js'

// Mock CSS modules
vi.mock('../../../../src/components/theme/color-input.module.css', () => ({
  default: {
    simpleColorInputWrapper: 'simpleColorInputWrapper',
    simpleColorTextInput: 'simpleColorTextInput',
    simplyColorInputContainer: 'simplyColorInputContainer',
    simplyTextInputContainer: 'simplyTextInputContainer',
  },
}))

// Mock Payload UI hooks
vi.mock('@payloadcms/ui', () => ({
  useDebounce: vi.fn(),
  useField: vi.fn(),
}))

import { useDebounce, useField } from '@payloadcms/ui'

const mockUseField = useField as ReturnType<typeof vi.fn>
const mockUseDebounce = useDebounce as ReturnType<typeof vi.fn>

describe('SimpleColorInput', () => {
  const defaultField = {
    name: 'color',
    type: 'text',
    label: 'Color Field',
    required: false,
  }

  const defaultPath = 'theme.primaryColor'
  const mockSetValue = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    
    mockUseField.mockReturnValue({
      setValue: mockSetValue,
      value: '#ff0000',
    })
    
    mockUseDebounce.mockImplementation((value) => value)
  })

  describe('Basic Rendering', () => {
    it('should render both color picker and text input', () => {
      render(<SimpleColorInput field={defaultField} path={defaultPath} />)
      
      const colorInput = document.querySelector('input[type="color"]')
      const textInput = screen.getByPlaceholderText('#000000')
      
      expect(colorInput).toBeInTheDocument()
      expect(textInput).toBeInTheDocument()
      expect(screen.getByText('Color Field')).toBeInTheDocument()
    })

    it('should display values from useField hook', () => {
      mockUseField.mockReturnValue({
        setValue: mockSetValue,
        value: '#00ff00',
      })
      
      render(<SimpleColorInput field={defaultField} path={defaultPath} />)
      
      const colorInput = document.querySelector('input[type="color"]')
      const textInput = screen.getByPlaceholderText('#000000')
      
      expect(colorInput).toHaveValue('#00ff00')
      expect(textInput).toHaveValue('#00ff00')
    })

    it('should handle empty values correctly', () => {
      mockUseField.mockReturnValue({
        setValue: mockSetValue,
        value: '',
      })
      
      render(<SimpleColorInput field={defaultField} path={defaultPath} />)
      
      const colorInput = document.querySelector('input[type="color"]')
      const textInput = screen.getByPlaceholderText('#000000')
      
      expect(colorInput).toHaveValue('#000000') // Fallback
      expect(textInput).toHaveValue('')
    })
  })

  describe('User Interactions', () => {
    it('should update local state when user types', async () => {
      const user = userEvent.setup()
      
      mockUseField.mockReturnValue({
        setValue: mockSetValue,
        value: '',
      })
      
      render(<SimpleColorInput field={defaultField} path={defaultPath} />)
      
      const textInput = screen.getByPlaceholderText('#000000')
      await user.type(textInput, '#123456')
      
      expect(textInput).toHaveValue('#123456')
    })
  })

  describe('Payload Integration', () => {
    it('should call useField with correct path', () => {
      render(<SimpleColorInput field={defaultField} path="custom.path" />)
      
      expect(mockUseField).toHaveBeenCalledWith({ path: 'custom.path' })
    })

    it('should call useDebounce with value and delay', () => {
      render(<SimpleColorInput field={defaultField} path={defaultPath} />)
      
      expect(mockUseDebounce).toHaveBeenCalledWith('#ff0000', 500)
    })

    it('should sync with external value changes', () => {
      const { rerender } = render(<SimpleColorInput field={defaultField} path={defaultPath} />)
      
      const textInput = screen.getByRole('textbox')
      expect(textInput).toHaveValue('#ff0000')
      
      // External value change
      mockUseField.mockReturnValue({
        setValue: mockSetValue,
        value: '#00ff00',
      })
      
      rerender(<SimpleColorInput field={defaultField} path={defaultPath} />)
      expect(textInput).toHaveValue('#00ff00')
    })
  })

  describe('Field Configuration', () => {
    it('should work with different field labels', () => {
      const customField = {
        ...defaultField,
        label: 'Custom Color Label',
      }
      
      render(<SimpleColorInput field={customField} path={defaultPath} />)
      
      expect(screen.getByText('Custom Color Label')).toBeInTheDocument()
    })

    it('should handle field without label', () => {
      const fieldWithoutLabel = {
        name: 'color',
        type: 'text',
      }
      
      expect(() => {
        render(<SimpleColorInput field={fieldWithoutLabel} path={defaultPath} />)
      }).not.toThrow()
    })
  })

  describe('Error Handling', () => {
    it('should handle undefined values gracefully', () => {
      mockUseField.mockReturnValue({
        setValue: mockSetValue,
        value: undefined,
      })
      
      expect(() => {
        render(<SimpleColorInput field={defaultField} path={defaultPath} />)
      }).not.toThrow()
    })
  })
}) 