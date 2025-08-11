import type { CollapsibleField, RowField } from 'payload'

import { describe, expect, it, vi } from 'vitest'

// Mock CSS imports
vi.mock('react-image-crop/dist/ReactCrop.css', () => ({}))

// Mock ColorPickerField
vi.mock('@retailos-ai/cms-general-custom-fields', () => ({
  ColorPickerField: vi.fn((config, options) => ({
    ...config,
    type: 'text',
    // Add the options for testing
    allowEmpty: options?.allowEmpty,
    enableGradient: options?.enableGradient,
  }))
}))

import { colors } from '../../../../../src/globals/theme/tabs/colors'

describe('Colors Tab Configuration', () => {
  describe('Basic Structure', () => {
    it('should have correct label', () => {
      expect(colors.label).toBe('Website Colors')
    })

    it('should have fields array', () => {
      expect(colors.fields).toBeDefined()
      expect(Array.isArray(colors.fields)).toBe(true)
      expect(colors.fields).toHaveLength(1)
    })

    it('should have main collapsible field', () => {
      const mainField = colors.fields[0] as CollapsibleField
      expect(mainField.type).toBe('collapsible')
      expect(mainField.label).toBe('Website Colors')
      expect(mainField.fields).toBeDefined()
      expect(Array.isArray(mainField.fields)).toBe(true)
      expect(mainField.fields).toHaveLength(4) // 4 row fields
    })
  })

  describe('Color Fields Structure', () => {
    const mainCollapsible = colors.fields[0] as CollapsibleField

    it('should have four row fields', () => {
      expect(mainCollapsible.fields).toHaveLength(4)
      mainCollapsible.fields.forEach((field) => {
        expect(field.type).toBe('row')
        expect((field as RowField).fields).toHaveLength(2) // Each row has 2 color fields
      })
    })

    describe('Primary Colors Row', () => {
      const primaryRow = mainCollapsible.fields[0] as RowField

      it('should have correct structure', () => {
        expect(primaryRow.type).toBe('row')
        expect(primaryRow.fields).toHaveLength(2)
      })

      it('should have colorPrimary field', () => {
        const colorPrimary = primaryRow.fields[0] as any
        expect(colorPrimary.name).toBe('colorPrimary')
        expect(colorPrimary.type).toBe('text') // Mocked type
        expect(colorPrimary.defaultValue).toBe('#a855f7')
        expect(colorPrimary.label).toBe('Primary (Semantic)')
        expect(colorPrimary.allowEmpty).toBe(false)
        expect(colorPrimary.enableGradient).toBe(false)
      })

      it('should have textOnPrimary field', () => {
        const textOnPrimary = primaryRow.fields[1] as any
        expect(textOnPrimary.name).toBe('textOnPrimary')
        expect(textOnPrimary.type).toBe('text') // Mocked type
        expect(textOnPrimary.defaultValue).toBe('#ffffff')
        expect(textOnPrimary.label).toBe('Text on Primary')
        expect(textOnPrimary.allowEmpty).toBe(false)
        expect(textOnPrimary.enableGradient).toBe(false)
      })
    })

    describe('Secondary Colors Row', () => {
      const secondaryRow = mainCollapsible.fields[1] as RowField

      it('should have correct structure', () => {
        expect(secondaryRow.type).toBe('row')
        expect(secondaryRow.fields).toHaveLength(2)
      })

      it('should have colorSecondary field', () => {
        const colorSecondary = secondaryRow.fields[0] as any
        expect(colorSecondary.name).toBe('colorSecondary')
        expect(colorSecondary.type).toBe('text') // Mocked type
        expect(colorSecondary.defaultValue).toBe('#0ea5e9')
        expect(colorSecondary.label).toBe('Secondary (Semantic)')
        expect(colorSecondary.allowEmpty).toBe(false)
        expect(colorSecondary.enableGradient).toBe(false)
      })

      it('should have textOnSecondary field', () => {
        const textOnSecondary = secondaryRow.fields[1] as any
        expect(textOnSecondary.name).toBe('textOnSecondary')
        expect(textOnSecondary.type).toBe('text') // Mocked type
        expect(textOnSecondary.defaultValue).toBe('#ffffff')
        expect(textOnSecondary.label).toBe('Text on Secondary')
        expect(textOnSecondary.allowEmpty).toBe(false)
        expect(textOnSecondary.enableGradient).toBe(false)
      })
    })

    describe('Card Colors Row', () => {
      const cardRow = mainCollapsible.fields[2] as RowField

      it('should have correct structure', () => {
        expect(cardRow.type).toBe('row')
        expect(cardRow.fields).toHaveLength(2)
      })

      it('should have cardBackground field', () => {
        const cardBackground = cardRow.fields[0] as any
        expect(cardBackground.name).toBe('cardBackground')
        expect(cardBackground.type).toBe('text') // Mocked type
        expect(cardBackground.defaultValue).toBe('#faf5ff')
        expect(cardBackground.label).toBe('Card Background')
        expect(cardBackground.allowEmpty).toBe(false)
        expect(cardBackground.enableGradient).toBe(false)
      })

      it('should have textOnCard field', () => {
        const textOnCard = cardRow.fields[1] as any
        expect(textOnCard.name).toBe('textOnCard')
        expect(textOnCard.type).toBe('text') // Mocked type
        expect(textOnCard.defaultValue).toBe('#3b0764')
        expect(textOnCard.label).toBe('Text on Card')
        expect(textOnCard.allowEmpty).toBe(false)
        expect(textOnCard.enableGradient).toBe(false)
      })
    })

    describe('Page Colors Row', () => {
      const pageRow = mainCollapsible.fields[3] as RowField

      it('should have correct structure', () => {
        expect(pageRow.type).toBe('row')
        expect(pageRow.fields).toHaveLength(2)
      })

      it('should have pageBackground field', () => {
        const pageBackground = pageRow.fields[0] as any
        expect(pageBackground.name).toBe('pageBackground')
        expect(pageBackground.type).toBe('text') // Mocked type
        expect(pageBackground.defaultValue).toBe('#ffffff')
        expect(pageBackground.label).toBe('Page Background')
        expect(pageBackground.allowEmpty).toBe(false)
        expect(pageBackground.enableGradient).toBe(false)
      })

      it('should have textOnPage field', () => {
        const textOnPage = pageRow.fields[1] as any
        expect(textOnPage.name).toBe('textOnPage')
        expect(textOnPage.type).toBe('text') // Mocked type
        expect(textOnPage.defaultValue).toBe('#000000')
        expect(textOnPage.label).toBe('Text on Page')
        expect(textOnPage.allowEmpty).toBe(false)
        expect(textOnPage.enableGradient).toBe(false)
      })
    })
  })

  describe('Field Names Validation', () => {
    const mainCollapsible = colors.fields[0] as CollapsibleField

    it('should have all expected color field names', () => {
      const expectedFieldNames = [
        'colorPrimary',
        'textOnPrimary',
        'colorSecondary',
        'textOnSecondary',
        'cardBackground',
        'textOnCard',
        'pageBackground',
        'textOnPage'
      ]

      const actualFieldNames: string[] = []
      
      mainCollapsible.fields.forEach((rowField) => {
        const row = rowField as RowField
        row.fields.forEach((field: any) => {
          actualFieldNames.push(field.name)
        })
      })

      expect(actualFieldNames).toEqual(expectedFieldNames)
    })
  })

  describe('Field Types Validation', () => {
    const mainCollapsible = colors.fields[0] as CollapsibleField

    it('should have all color fields as text type (mocked)', () => {
      mainCollapsible.fields.forEach((rowField) => {
        const row = rowField as RowField
        row.fields.forEach((field: any) => {
          expect(field.type).toBe('text') // Mocked type from ColorPickerField
        })
      })
    })
  })

  describe('Default Values Validation', () => {
    const mainCollapsible = colors.fields[0] as CollapsibleField

    it('should have correct default values for all color fields', () => {
      const expectedDefaults = {
        cardBackground: '#faf5ff',
        colorPrimary: '#a855f7',
        colorSecondary: '#0ea5e9',
        pageBackground: '#ffffff',
        textOnCard: '#3b0764',
        textOnPage: '#000000',
        textOnPrimary: '#ffffff',
        textOnSecondary: '#ffffff'
      }

      mainCollapsible.fields.forEach((rowField) => {
        const row = rowField as RowField
        row.fields.forEach((field: any) => {
          expect(field.defaultValue).toBe(expectedDefaults[field.name as keyof typeof expectedDefaults])
        })
      })
    })
  })

  describe('ColorPickerField Options Validation', () => {
    const mainCollapsible = colors.fields[0] as CollapsibleField

    it('should have correct ColorPickerField options for all fields', () => {
      mainCollapsible.fields.forEach((rowField) => {
        const row = rowField as RowField
        row.fields.forEach((field: any) => {
          expect(field.allowEmpty).toBe(false)
          expect(field.enableGradient).toBe(false)
        })
      })
    })
  })
})