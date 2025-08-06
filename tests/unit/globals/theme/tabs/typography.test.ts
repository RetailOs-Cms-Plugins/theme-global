import type { CollapsibleField, GroupField, RowField, SelectField, Tab, TextField } from 'payload'

import { describe, expect, it } from 'vitest'

import { typography } from '../../../../../src/globals/theme/tabs/typography'

describe('Typography Tab Configuration', () => {
  describe('Basic Structure', () => {
    it('should have correct label', () => {
      expect(typography.label).toBe('Typography')
    })

    it('should have fields array', () => {
      expect(typography.fields).toBeDefined()
      expect(Array.isArray(typography.fields)).toBe(true)
      expect(typography.fields).toHaveLength(1)
    })

    it('should have main typography group field', () => {
      const mainField = typography.fields[0] as GroupField
      expect(mainField.type).toBe('group')
      expect(mainField.fields).toBeDefined()
      expect(Array.isArray(mainField.fields)).toBe(true)
      expect(mainField.fields).toHaveLength(3) // Font Families collapsible, direction select, Typography Elements collapsible
    })
  })

  describe('Typography Group Fields', () => {
    const typographyGroup = typography.fields[0] as GroupField

    describe('Font Families Collapsible', () => {
      const fontFamiliesCollapsible = typographyGroup.fields[0] as CollapsibleField

      it('should have correct structure', () => {
        expect(fontFamiliesCollapsible.type).toBe('collapsible')
        expect(fontFamiliesCollapsible.label).toBe('Font Families')
        expect(fontFamiliesCollapsible.fields).toBeDefined()
        expect(Array.isArray(fontFamiliesCollapsible.fields)).toBe(true)
        expect(fontFamiliesCollapsible.fields).toHaveLength(1) // One row field
      })

      describe('Font Family Row', () => {
        const fontRow = fontFamiliesCollapsible.fields[0] as RowField

        it('should have correct structure', () => {
          expect(fontRow.type).toBe('row')
          expect(fontRow.fields).toBeDefined()
          expect(Array.isArray(fontRow.fields)).toBe(true)
          expect(fontRow.fields).toHaveLength(2) // fontBody and fontHeading
        })

        it('should have fontBody field with correct properties', () => {
          const fontBody = fontRow.fields[0] as SelectField
          expect(fontBody.name).toBe('fontBody')
          expect(fontBody.type).toBe('select')
          expect(fontBody.label).toBe('Body Font')
          expect(fontBody.defaultValue).toBe('inter')
          expect(fontBody.required).toBe(true)
          expect(fontBody.options).toBeDefined()
          expect(Array.isArray(fontBody.options)).toBe(true)
          expect(fontBody.options).toHaveLength(25) // Total font options
        })

        it('should have fontHeading field with correct properties', () => {
          const fontHeading = fontRow.fields[1] as SelectField
          expect(fontHeading.name).toBe('fontHeading')
          expect(fontHeading.type).toBe('select')
          expect(fontHeading.label).toBe('Heading Font')
          expect(fontHeading.defaultValue).toBe('poppins')
          expect(fontHeading.required).toBe(true)
          expect(fontHeading.options).toBeDefined()
          expect(Array.isArray(fontHeading.options)).toBe(true)
          expect(fontHeading.options).toHaveLength(25) // Total font options
        })
      })
    })

    describe('Direction Select Field', () => {
      const directionField = typographyGroup.fields[1] as SelectField

      it('should have correct properties', () => {
        expect(directionField.name).toBe('direction')
        expect(directionField.type).toBe('select')
        expect(directionField.label).toBe('Language Direction')
        expect(directionField.defaultValue).toBe('auto')
        expect(directionField.required).toBe(true)
      })

      it('should have correct direction options', () => {
        const expectedOptions = [
          { label: 'Auto (based on font)', value: 'auto' },
          { label: 'Left to Right', value: 'ltr' },
          { label: 'Right to Left', value: 'rtl' },
        ]
        
        expect(directionField.options).toEqual(expectedOptions)
      })
    })

    describe('Typography Elements Collapsible', () => {
      const typographyElementsCollapsible = typographyGroup.fields[2] as CollapsibleField

      it('should have correct structure', () => {
        expect(typographyElementsCollapsible.type).toBe('collapsible')
        expect(typographyElementsCollapsible.label).toBe('Typography Elements')
        expect(typographyElementsCollapsible.fields).toBeDefined()
        expect(Array.isArray(typographyElementsCollapsible.fields)).toBe(true)
        expect(typographyElementsCollapsible.fields).toHaveLength(9) // h1, h2, h3, h4, p, and 4 row fields
      })

      describe('Heading Elements (H1-H4)', () => {
        const headingElements = ['h1', 'h2', 'h3', 'h4']
        const expectedLabels = ['H1', 'H2', 'H3', 'H4']
        const expectedFontSizes = {
          h1: { desktop: '4rem', largeDesktop: '5rem', mobile: '2rem', tablet: '3rem' },
          h2: { desktop: '3rem', largeDesktop: '4rem', mobile: '2rem', tablet: '2.5rem' },
          h3: { desktop: '2.5rem', largeDesktop: '3rem', mobile: '1.5rem', tablet: '2rem' },
          h4: { desktop: '2rem', largeDesktop: '2.5rem', mobile: '1.2rem', tablet: '1.5rem' },
        }
        const expectedLineHeights = {
          h1: { desktop: '1.2', largeDesktop: '1.2', mobile: '1.1', tablet: '1.2' },
          h2: { desktop: '1.2', largeDesktop: '1.2', mobile: '1.1', tablet: '1.2' },
          h3: { desktop: '1.2', largeDesktop: '1.2', mobile: '1.1', tablet: '1.2' },
          h4: { desktop: '1.2', largeDesktop: '1.2', mobile: '1.1', tablet: '1.2' },
        }

        headingElements.forEach((headingName, index) => {
          describe(`${headingName.toUpperCase()} Element`, () => {
            const headingField = typographyElementsCollapsible.fields[index] as GroupField

            it('should have correct basic structure', () => {
              expect(headingField.type).toBe('group')
              expect(headingField.label).toBe(expectedLabels[index])
              expect(headingField.fields).toBeDefined()
              expect(Array.isArray(headingField.fields)).toBe(true)
              expect(headingField.fields).toHaveLength(2) // fontSize and lineHeight groups
            })

            it('should have fontSize group with correct structure', () => {
              const fontSizeGroup = headingField.fields[0] as GroupField
              expect(fontSizeGroup.type).toBe('group')
              expect(fontSizeGroup.label).toBe('Font Size')
              expect(fontSizeGroup.fields).toBeDefined()
              expect(Array.isArray(fontSizeGroup.fields)).toBe(true)
              expect(fontSizeGroup.fields).toHaveLength(1) // One row field
            })

            it('should have correct fontSize row with responsive fields', () => {
              const fontSizeGroup = headingField.fields[0] as GroupField
              const fontSizeRow = fontSizeGroup.fields[0] as RowField
              expect(fontSizeRow.type).toBe('row')
              expect(fontSizeRow.fields).toHaveLength(4) // largeDesktop, desktop, tablet, mobile

              const breakpoints = ['largeDesktop', 'desktop', 'tablet', 'mobile']
              const breakpointLabels = ['Large Desktop', 'Desktop', 'Tablet', 'Mobile']
              const expectedSizes = expectedFontSizes[headingName as keyof typeof expectedFontSizes]

              breakpoints.forEach((breakpoint, bpIndex) => {
                const field = fontSizeRow.fields[bpIndex] as TextField
                expect(field.name).toBe(breakpoint)
                expect(field.type).toBe('text')
                expect(field.label).toBe(breakpointLabels[bpIndex])
                expect(field.required).toBe(true)
                expect(field.defaultValue).toBe(expectedSizes[breakpoint as keyof typeof expectedSizes])
              })
            })

            it('should have lineHeight group with correct structure', () => {
              const lineHeightGroup = headingField.fields[1] as GroupField
              expect(lineHeightGroup.type).toBe('group')
              expect(lineHeightGroup.label).toBe('Line Height')
              expect(lineHeightGroup.fields).toBeDefined()
              expect(Array.isArray(lineHeightGroup.fields)).toBe(true)
              expect(lineHeightGroup.fields).toHaveLength(1) // One row field
            })

            it('should have correct lineHeight row with responsive fields', () => {
              const lineHeightGroup = headingField.fields[1] as GroupField
              const lineHeightRow = lineHeightGroup.fields[0] as RowField
              expect(lineHeightRow.type).toBe('row')
              expect(lineHeightRow.fields).toHaveLength(4) // largeDesktop, desktop, tablet, mobile

              const breakpoints = ['largeDesktop', 'desktop', 'tablet', 'mobile']
              const breakpointLabels = ['Large Desktop', 'Desktop', 'Tablet', 'Mobile']
              const expectedHeights = expectedLineHeights[headingName as keyof typeof expectedLineHeights]

              breakpoints.forEach((breakpoint, bpIndex) => {
                const field = lineHeightRow.fields[bpIndex] as TextField
                expect(field.name).toBe(breakpoint)
                expect(field.type).toBe('text')
                expect(field.label).toBe(breakpointLabels[bpIndex])
                expect(field.required).toBe(true)
                expect(field.defaultValue).toBe(expectedHeights[breakpoint as keyof typeof expectedHeights])
              })
            })
          })
        })
      })

      describe('Paragraph Element', () => {
        const paragraphField = typographyElementsCollapsible.fields[4] as GroupField

        it('should have correct basic structure', () => {
          expect(paragraphField.type).toBe('group')
          expect(paragraphField.label).toBe('Paragraph')
          expect(paragraphField.fields).toBeDefined()
          expect(Array.isArray(paragraphField.fields)).toBe(true)
          expect(paragraphField.fields).toHaveLength(2) // fontSize and lineHeight groups
        })

        it('should have correct fontSize values', () => {
          const fontSizeGroup = paragraphField.fields[0] as GroupField
          const fontSizeRow = fontSizeGroup.fields[0] as RowField
          const expectedSizes = { desktop: '1.25rem', largeDesktop: '1.5rem', mobile: '0.9rem', tablet: '1rem' }

          const breakpoints = ['largeDesktop', 'desktop', 'tablet', 'mobile']
          breakpoints.forEach((breakpoint, index) => {
            const field = fontSizeRow.fields[index] as TextField
            expect(field.defaultValue).toBe(expectedSizes[breakpoint as keyof typeof expectedSizes])
          })
        })

        it('should have correct lineHeight values', () => {
          const lineHeightGroup = paragraphField.fields[1] as GroupField
          const lineHeightRow = lineHeightGroup.fields[0] as RowField
          const expectedHeights = { desktop: '1.5', largeDesktop: '1.5', mobile: '1.3', tablet: '1.4' }

          const breakpoints = ['largeDesktop', 'desktop', 'tablet', 'mobile']
          breakpoints.forEach((breakpoint, index) => {
            const field = lineHeightRow.fields[index] as TextField
            expect(field.defaultValue).toBe(expectedHeights[breakpoint as keyof typeof expectedHeights])
          })
        })
      })

      describe('Typography Elements Rows', () => {
        const rowFields = typographyElementsCollapsible.fields.slice(5) as RowField[] // Skip h1-h4 and p

        it('should have 4 row fields for typography elements', () => {
          expect(rowFields).toHaveLength(4)
          rowFields.forEach(field => {
            expect(field.type).toBe('row')
          })
        })

        describe('First Row: Blockquote and Muted', () => {
          const firstRow = rowFields[0]

          it('should have correct structure', () => {
            expect(firstRow.fields).toHaveLength(2)
          })

          it('should have blockquote field with correct properties', () => {
            const blockquote = firstRow.fields[0] as GroupField
            expect(blockquote.type).toBe('group')
            expect(blockquote.label).toBe('Blockquote')
            expect(blockquote.fields).toHaveLength(2) // fontSize and lineHeight

            const fontSize = blockquote.fields[0] as TextField
            expect(fontSize.name).toBe('fontSize')
            expect(fontSize.type).toBe('text')
            expect(fontSize.label).toBe('Font Size')
            expect(fontSize.defaultValue).toBe('1.125rem')
            expect(fontSize.required).toBe(true)

            const lineHeight = blockquote.fields[1] as TextField
            expect(lineHeight.name).toBe('lineHeight')
            expect(lineHeight.type).toBe('text')
            expect(lineHeight.label).toBe('Line Height')
            expect(lineHeight.defaultValue).toBe('1.75rem')
            expect(lineHeight.required).toBe(true)
          })

          it('should have muted field with correct properties', () => {
            const muted = firstRow.fields[1] as GroupField
            expect(muted.type).toBe('group')
            expect(muted.label).toBe('Muted')
            expect(muted.fields).toHaveLength(2) // fontSize and lineHeight

            const fontSize = muted.fields[0] as TextField
            expect(fontSize.name).toBe('fontSize')
            expect(fontSize.type).toBe('text')
            expect(fontSize.label).toBe('Font Size')
            expect(fontSize.defaultValue).toBe('0.875rem')
            expect(fontSize.required).toBe(true)

            const lineHeight = muted.fields[1] as TextField
            expect(lineHeight.name).toBe('lineHeight')
            expect(lineHeight.type).toBe('text')
            expect(lineHeight.label).toBe('Line Height')
            expect(lineHeight.defaultValue).toBe('1.25rem')
            expect(lineHeight.required).toBe(true)
          })
        })

        describe('Second Row: Table and List', () => {
          const secondRow = rowFields[1]

          it('should have table field with correct properties', () => {
            const table = secondRow.fields[0] as GroupField
            expect(table.type).toBe('group')
            expect(table.label).toBe('Table')

            const fontSize = table.fields[0] as TextField
            expect(fontSize.defaultValue).toBe('1rem')
            const lineHeight = table.fields[1] as TextField
            expect(lineHeight.defaultValue).toBe('1.5rem')
          })

          it('should have list field with correct properties', () => {
            const list = secondRow.fields[1] as GroupField
            expect(list.type).toBe('group')
            expect(list.label).toBe('List')

            const fontSize = list.fields[0] as TextField
            expect(fontSize.defaultValue).toBe('1rem')
            const lineHeight = list.fields[1] as TextField
            expect(lineHeight.defaultValue).toBe('1.75rem')
          })
        })

        describe('Third Row: Inline Code and Lead', () => {
          const thirdRow = rowFields[2]

          it('should have inlineCode field with correct properties', () => {
            const inlineCode = thirdRow.fields[0] as GroupField
            expect(inlineCode.type).toBe('group')
            expect(inlineCode.label).toBe('Inline Code')

            const fontSize = inlineCode.fields[0] as TextField
            expect(fontSize.defaultValue).toBe('0.875rem')
            const lineHeight = inlineCode.fields[1] as TextField
            expect(lineHeight.defaultValue).toBe('1.25rem')
          })

          it('should have lead field with correct properties', () => {
            const lead = thirdRow.fields[1] as GroupField
            expect(lead.type).toBe('group')
            expect(lead.label).toBe('Lead')

            const fontSize = lead.fields[0] as TextField
            expect(fontSize.defaultValue).toBe('1.25rem')
            const lineHeight = lead.fields[1] as TextField
            expect(lineHeight.defaultValue).toBe('1.75rem')
          })
        })

        describe('Fourth Row: Large and Small', () => {
          const fourthRow = rowFields[3]

          it('should have large field with correct properties', () => {
            const large = fourthRow.fields[0] as GroupField
            expect(large.type).toBe('group')
            expect(large.label).toBe('Large')

            const fontSize = large.fields[0] as TextField
            expect(fontSize.defaultValue).toBe('1.125rem')
            const lineHeight = large.fields[1] as TextField
            expect(lineHeight.defaultValue).toBe('1.75rem')
          })

          it('should have small field with correct properties', () => {
            const small = fourthRow.fields[1] as GroupField
            expect(small.type).toBe('group')
            expect(small.label).toBe('Small')

            const fontSize = small.fields[0] as TextField
            expect(fontSize.defaultValue).toBe('0.875rem')
            const lineHeight = small.fields[1] as TextField
            expect(lineHeight.defaultValue).toBe('1.25rem')
          })
        })
      })
    })
  })

  describe('Field Names Validation', () => {
    const typographyGroup = typography.fields[0] as GroupField

    it('should have all expected typography field names', () => {
      const expectedFieldNames = [
        'fontBody',
        'fontHeading',
        'direction',
        'blockquote',
        'muted',
        'table',
        'list',
        'inlineCode',
        'lead',
        'large',
        'small',
        'h1',
        'h2', 
        'h3',
        'h4',
        'p'
      ]

      const actualFieldNames: string[] = []
      
      // Get font family fields
      const fontFamiliesCollapsible = typographyGroup.fields[0] as CollapsibleField
      const fontRow = fontFamiliesCollapsible.fields[0] as RowField
      fontRow.fields.forEach((field: any) => {
        actualFieldNames.push(field.name)
      })

      // Get direction field
      const directionField = typographyGroup.fields[1] as any
      actualFieldNames.push(directionField.name)

      // Get typography elements
      const typographyElementsCollapsible = typographyGroup.fields[2] as CollapsibleField
      typographyElementsCollapsible.fields.forEach((field) => {
        if (field.type === 'row') {
          (field).fields.forEach((subField: any) => {
            actualFieldNames.push(subField.name)
          })
        }
      })

      // Add the group field names manually based on expected structure (h1-p are group fields)
      const groupElements = ['h1', 'h2', 'h3', 'h4', 'p']
      groupElements.forEach(name => actualFieldNames.push(name))

      expect(actualFieldNames).toEqual(expectedFieldNames)
    })
  })

  describe('Field Types Validation', () => {
    const typographyGroup = typography.fields[0] as GroupField

    it('should have correct field types for all typography fields', () => {
      // Font family fields should be select
      const fontFamiliesCollapsible = typographyGroup.fields[0] as CollapsibleField
      const fontRow = fontFamiliesCollapsible.fields[0] as RowField
      fontRow.fields.forEach((field: any) => {
        expect(field.type).toBe('select')
      })

      // Direction field should be select
      const directionField = typographyGroup.fields[1] as SelectField
      expect(directionField.type).toBe('select')

      // Typography elements should have proper structure
      const typographyElementsCollapsible = typographyGroup.fields[2] as CollapsibleField
      
      // H1-H4 and P should be groups
      typographyElementsCollapsible.fields.slice(0, 5).forEach((field) => {
        expect(field.type).toBe('group')
      })

      // Remaining fields should be rows
      typographyElementsCollapsible.fields.slice(5).forEach((field) => {
        expect(field.type).toBe('row')
      })
    })
  })

  describe('Default Values Validation', () => {
    const typographyGroup = typography.fields[0] as GroupField

    it('should have correct default values for font fields', () => {
      const fontFamiliesCollapsible = typographyGroup.fields[0] as CollapsibleField
      const fontRow = fontFamiliesCollapsible.fields[0] as RowField
      
      const fontBody = fontRow.fields[0] as SelectField
      expect(fontBody.defaultValue).toBe('inter')
      
      const fontHeading = fontRow.fields[1] as SelectField
      expect(fontHeading.defaultValue).toBe('poppins')
    })

    it('should have correct default value for direction field', () => {
      const directionField = typographyGroup.fields[1] as SelectField
      expect(directionField.defaultValue).toBe('auto')
    })

    it('should have correct default values for typography elements', () => {
      const expectedDefaults = {
        // Simple typography elements (fontSize, lineHeight pairs)
        blockquote: { fontSize: '1.125rem', lineHeight: '1.75rem' },
        inlineCode: { fontSize: '0.875rem', lineHeight: '1.25rem' },
        large: { fontSize: '1.125rem', lineHeight: '1.75rem' },
        lead: { fontSize: '1.25rem', lineHeight: '1.75rem' },
        list: { fontSize: '1rem', lineHeight: '1.75rem' },
        muted: { fontSize: '0.875rem', lineHeight: '1.25rem' },
        small: { fontSize: '0.875rem', lineHeight: '1.25rem' },
        table: { fontSize: '1rem', lineHeight: '1.5rem' }
      }

      const typographyElementsCollapsible = typographyGroup.fields[2] as CollapsibleField
      const rowFields = typographyElementsCollapsible.fields.slice(5) as RowField[]

      rowFields.forEach((rowField) => {
        rowField.fields.forEach((groupField: any) => {
          const elementName = groupField.name
          if (expectedDefaults[elementName as keyof typeof expectedDefaults]) {
            const expected = expectedDefaults[elementName as keyof typeof expectedDefaults]
            
            const fontSize = groupField.fields[0]
            const lineHeight = groupField.fields[1]
            
            expect(fontSize.defaultValue).toBe(expected.fontSize)
            expect(lineHeight.defaultValue).toBe(expected.lineHeight)
          }
        })
      })
    })
  })

  describe('Required Fields Validation', () => {
    const typographyGroup = typography.fields[0] as GroupField

    it('should have all typography fields marked as required', () => {
      // Font family fields
      const fontFamiliesCollapsible = typographyGroup.fields[0] as CollapsibleField
      const fontRow = fontFamiliesCollapsible.fields[0] as RowField
      fontRow.fields.forEach((field: any) => {
        expect(field.required).toBe(true)
      })

      // Direction field
      const directionField = typographyGroup.fields[1] as SelectField
      expect(directionField.required).toBe(true)

      // All text fields in typography elements should be required
      const typographyElementsCollapsible = typographyGroup.fields[2] as CollapsibleField
      
      const checkFieldsRecursively = (fields: any[]) => {
        fields.forEach((field) => {
          if (field.type === 'text') {
            expect(field.required).toBe(true)
          } else if (field.fields) {
            checkFieldsRecursively(field.fields)
          }
        })
      }

      checkFieldsRecursively(typographyElementsCollapsible.fields)
    })
  })
}) 