import type { TextField } from 'payload'

interface ColorPickerProps {
  admin?: {
    description?: string
    placeholder?: string
    width?: string
  }
  defaultValue?: string
  label?: string
  name: string
  path: string
  required?: boolean
}

export type ColorPickerField = {
  type: 'text'
} & TextField

const colorPicker = (props: ColorPickerProps): ColorPickerField => {
  const { name, admin, defaultValue, label, path, required } = props

  return {
    name,
    type: 'text',
    admin: {
      ...admin,
      components: {
        Field: {
          path,
        },
      },
    },
    defaultValue,
    hooks: {
      afterRead: [
        ({ value }) => {
          return value || defaultValue
        },
      ],
    },
    label: label || name,
    required: required || false,
    validate: (value: null | string | undefined) => {
      if (!value) return true
      // Allow CSS variables
      if (value.startsWith('var(--') && value.endsWith(')')) return true
      // Allow hex colors
      if (/^#(?:[A-F0-9]{6}|[A-F0-9]{3})$/i.test(value)) return true
      return 'Please enter a valid hex color (e.g., #FF0000) or CSS variable (e.g., var(--color-primary-500))'
    },
  }
}

export default colorPicker
