import type { GroupField, NumberField, RowField, Tab, TextField } from 'payload'

import { describe, expect, it } from 'vitest'

import { layoutAndSpacing } from '../../../../../src/globals/theme/tabs/layoutAndSpacing'

describe('Layout and Spacing Tab Configuration', () => {
  describe('Basic Structure', () => {
    it('should have correct label', () => {
      expect(layoutAndSpacing.label).toBe('Layout & Spacing')
    })

    it('should have fields array', () => {
      expect(layoutAndSpacing.fields).toBeDefined()
      expect(Array.isArray(layoutAndSpacing.fields)).toBe(true)
      expect(layoutAndSpacing.fields).toHaveLength(1)
    })

    it('should have main layout group field', () => {
      const mainField = layoutAndSpacing.fields[0] as GroupField
      expect(mainField.type).toBe('group')
      expect(mainField.name).toBe('layout')
      expect(mainField.label).toBe('Layout')
      expect(mainField.fields).toBeDefined()
      expect(Array.isArray(mainField.fields)).toBe(true)
      expect(mainField.fields).toHaveLength(4) // maxWidth row, breakpoints group, borderRadius group
    })
  })

  describe('Max Width Section', () => {
    const layoutGroup = layoutAndSpacing.fields[0] as GroupField
    const maxWidthRow = layoutGroup.fields[0] as RowField

    it('should have correct structure', () => {
      expect(maxWidthRow.type).toBe('row')
      expect(maxWidthRow.fields).toHaveLength(1)
    })

    it('should have maxWidth field with correct properties', () => {
      const maxWidthField = maxWidthRow.fields[0] as NumberField
      expect(maxWidthField.name).toBe('maxWidth')
      expect(maxWidthField.type).toBe('number')
      expect(maxWidthField.label).toBe('Max Width')
      expect(maxWidthField.defaultValue).toBe(1360)
      expect(maxWidthField.required).toBe(true)
    })
  })

  describe('Breakpoints Section', () => {
    const layoutGroup = layoutAndSpacing.fields[0] as GroupField
    const breakpointsGroup = layoutGroup.fields[1] as GroupField

    it('should have correct group structure', () => {
      expect(breakpointsGroup.name).toBe('breakpoints')
      expect(breakpointsGroup.type).toBe('group')
      expect(breakpointsGroup.label).toBe('Breakpoints')
      expect(breakpointsGroup.fields).toHaveLength(1) // One row with breakpoint fields
    })

    it('should have breakpoints row with correct structure', () => {
      const breakpointsRow = breakpointsGroup.fields[0] as RowField
      expect(breakpointsRow.type).toBe('row')
      expect(breakpointsRow.fields).toHaveLength(4) // mobile, tablet, desktop, largeDesktop
    })

    it('should have mobile breakpoint field', () => {
      const breakpointsRow = breakpointsGroup.fields[0] as RowField
      const mobileField = breakpointsRow.fields[0] as NumberField

      expect(mobileField.name).toBe('mobile')
      expect(mobileField.type).toBe('number')
      expect(mobileField.label).toBe('Mobile')
      expect(mobileField.defaultValue).toBe(640)
      expect(mobileField.required).toBe(true)
    })

    it('should have tablet breakpoint field', () => {
      const breakpointsRow = breakpointsGroup.fields[0] as RowField
      const tabletField = breakpointsRow.fields[1] as NumberField

      expect(tabletField.name).toBe('tablet')
      expect(tabletField.type).toBe('number')
      expect(tabletField.label).toBe('Tablet')
      expect(tabletField.defaultValue).toBe(768)
      expect(tabletField.required).toBe(true)
    })

    it('should have desktop breakpoint field', () => {
      const breakpointsRow = breakpointsGroup.fields[0] as RowField
      const desktopField = breakpointsRow.fields[2] as NumberField

      expect(desktopField.name).toBe('desktop')
      expect(desktopField.type).toBe('number')
      expect(desktopField.label).toBe('Desktop')
      expect(desktopField.defaultValue).toBe(1024)
      expect(desktopField.required).toBe(true)
    })

    it('should have largeDesktop breakpoint field', () => {
      const breakpointsRow = breakpointsGroup.fields[0] as RowField
      const largeDesktopField = breakpointsRow.fields[3] as NumberField

      expect(largeDesktopField.name).toBe('largeDesktop')
      expect(largeDesktopField.type).toBe('number')
      expect(largeDesktopField.label).toBe('Large Desktop')
      expect(largeDesktopField.defaultValue).toBe(1280)
      expect(largeDesktopField.required).toBe(true)
    })

    it('should have all breakpoint fields with correct names and types', () => {
      const breakpointsRow = breakpointsGroup.fields[0] as RowField
      const expectedBreakpoints = [
        { name: 'mobile', defaultValue: 640 },
        { name: 'tablet', defaultValue: 768 },
        { name: 'desktop', defaultValue: 1024 },
        { name: 'largeDesktop', defaultValue: 1280 },
      ]

      breakpointsRow.fields.forEach((field, index) => {
        const breakpointField = field as NumberField
        expect(breakpointField.name).toBe(expectedBreakpoints[index].name)
        expect(breakpointField.type).toBe('number')
        expect(breakpointField.defaultValue).toBe(expectedBreakpoints[index].defaultValue)
        expect(breakpointField.required).toBe(true)
      })
    })
  })

  describe('Border Radius Section', () => {
    const layoutGroup = layoutAndSpacing.fields[0] as GroupField
    const borderRadiusGroup = layoutGroup.fields[3] as GroupField

    it('should have correct group structure', () => {
      expect(borderRadiusGroup.name).toBe('borderRadius')
      expect(borderRadiusGroup.type).toBe('group')
      expect(borderRadiusGroup.label).toBe('Border Radius')
      expect(borderRadiusGroup.fields).toHaveLength(1) // One row with border radius fields
    })

    it('should have border radius row with correct structure', () => {
      const borderRadiusRow = borderRadiusGroup.fields[0] as RowField
      expect(borderRadiusRow.type).toBe('row')
      expect(borderRadiusRow.fields).toHaveLength(2) // box and button
    })

    it('should have box border radius field', () => {
      const borderRadiusRow = borderRadiusGroup.fields[0] as RowField
      const boxField = borderRadiusRow.fields[0] as TextField

      expect(boxField.name).toBe('box')
      expect(boxField.type).toBe('text')
      expect(boxField.label).toBe('Box Border Radius')
      expect(boxField.defaultValue).toBe('0.5rem')
      expect(boxField.required).toBe(true)
    })

    it('should have button border radius field', () => {
      const borderRadiusRow = borderRadiusGroup.fields[0] as RowField
      const buttonField = borderRadiusRow.fields[1] as TextField

      expect(buttonField.name).toBe('button')
      expect(buttonField.type).toBe('text')
      expect(buttonField.label).toBe('Button Border Radius')
      expect(buttonField.defaultValue).toBe('9999px')
      expect(buttonField.required).toBe(true)
    })
  })

  describe('Field Names Validation', () => {
    it('should have all expected field names', () => {
      const expectedFieldNames = [
        // Layout fields
        'maxWidth',

        // Breakpoint fields
        'mobile',
        'tablet',
        'desktop',
        'largeDesktop',

        // Spacing scale fields
        'xs',
        'sm',
        'md',
        'lg',
        'xl',

        // Border radius fields
        'box',
        'button',
      ]

      const layoutGroup = layoutAndSpacing.fields[0] as GroupField
      const collectedFieldNames: string[] = []

      // Collect field names from all sections
      layoutGroup.fields.forEach((section: any) => {
        if (section.type === 'row') {
          // Direct row (like maxWidth)
          section.fields.forEach((field: any) => {
            if (field.name) {
              collectedFieldNames.push(field.name)
            }
          })
        } else if (section.type === 'group') {
          // Group containing rows
          section.fields.forEach((groupField: any) => {
            if (groupField.type === 'row') {
              groupField.fields.forEach((field: any) => {
                if (field.name) {
                  collectedFieldNames.push(field.name)
                }
              })
            }
          })
        }
      })

      expectedFieldNames.forEach((fieldName) => {
        expect(collectedFieldNames).toContain(fieldName)
      })

      expect(collectedFieldNames).toHaveLength(expectedFieldNames.length)
    })
  })

  describe('Field Types Validation', () => {
    it('should have correct field types for all fields', () => {
      const layoutGroup = layoutAndSpacing.fields[0] as GroupField

      // Test maxWidth (number)
      const maxWidthRow = layoutGroup.fields[0] as RowField
      const maxWidthField = maxWidthRow.fields[0] as NumberField
      expect(maxWidthField.type).toBe('number')

      // Test breakpoints (all numbers)
      const breakpointsGroup = layoutGroup.fields[1] as GroupField
      const breakpointsRow = breakpointsGroup.fields[0] as RowField
      breakpointsRow.fields.forEach((field) => {
        expect((field as NumberField).type).toBe('number')
      })

      // Test border radius (all text)
      const borderRadiusGroup = layoutGroup.fields[3] as GroupField
      const borderRadiusRow = borderRadiusGroup.fields[0] as RowField
      borderRadiusRow.fields.forEach((field) => {
        expect((field as TextField).type).toBe('text')
      })
    })
  })

  describe('Default Values Validation', () => {
    it('should have correct default values for all fields', () => {
      const expectedDefaults = {
        // Layout
        maxWidth: 1360,

        // Breakpoints
        desktop: 1024,
        largeDesktop: 1280,
        mobile: 640,
        tablet: 768,

        // Spacing scale
        lg: '2rem',
        md: '1rem',
        sm: '0.5rem',
        xl: '4rem',
        xs: '0.25rem',

        // Border radius
        box: '0.5rem',
        button: '9999px',
      }

      const layoutGroup = layoutAndSpacing.fields[0] as GroupField

      // Check maxWidth
      const maxWidthRow = layoutGroup.fields[0] as RowField
      const maxWidthField = maxWidthRow.fields[0] as NumberField
      expect(maxWidthField.defaultValue).toBe(expectedDefaults.maxWidth)

      // Check breakpoints
      const breakpointsGroup = layoutGroup.fields[1] as GroupField
      const breakpointsRow = breakpointsGroup.fields[0] as RowField
      const breakpointFields = ['mobile', 'tablet', 'desktop', 'largeDesktop']
      breakpointsRow.fields.forEach((field, index) => {
        const fieldName = breakpointFields[index] as keyof typeof expectedDefaults
        expect((field as NumberField).defaultValue).toBe(expectedDefaults[fieldName])
      })

      // Check border radius
      const borderRadiusGroup = layoutGroup.fields[3] as GroupField
      const borderRadiusRow = borderRadiusGroup.fields[0] as RowField
      const borderRadiusFields = ['box', 'button']
      borderRadiusRow.fields.forEach((field, index) => {
        const fieldName = borderRadiusFields[index] as keyof typeof expectedDefaults
        expect((field as TextField).defaultValue).toBe(expectedDefaults[fieldName])
      })
    })
  })

  describe('Required Fields Validation', () => {
    it('should have all fields marked as required', () => {
      const layoutGroup = layoutAndSpacing.fields[0] as GroupField

      // Check all fields in all sections
      layoutGroup.fields.forEach((section: any) => {
        if (section.type === 'row') {
          // Direct row (like maxWidth)
          section.fields.forEach((field: any) => {
            expect(field.required).toBe(true)
          })
        } else if (section.type === 'group') {
          // Group containing rows
          section.fields.forEach((groupField: any) => {
            if (groupField.type === 'row') {
              groupField.fields.forEach((field: any) => {
                expect(field.required).toBe(true)
              })
            }
          })
        }
      })
    })
  })
})
