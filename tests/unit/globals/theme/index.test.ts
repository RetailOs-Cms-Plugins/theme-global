import type { NumberField, RowField, TabsField } from 'payload'

import { describe, expect, it, vi } from 'vitest'

// Mock all CSS imports globally
vi.mock('react-image-crop/dist/ReactCrop.css', () => ({}))

// Mock external dependencies directly here
vi.mock('@retailos-ai/cms-general-custom-fields', () => ({
  ColorPickerField: vi.fn((config) => ({
    ...config,
    type: 'text',
  })),
}))

vi.mock('next/cache', () => ({
  revalidateTag: vi.fn(),
}))

vi.mock('../../../../src/globals/theme/Component', () => ({
  default: vi.fn(),
}))

// Mock tab configurations directly
vi.mock('../../../../src/globals/theme/tabs/colors', () => ({
  colors: {
    fields: [
      {
        type: 'collapsible',
        fields: [
          {
            type: 'row',
            fields: [
              { name: 'colorPrimary', type: 'text' },
              { name: 'textOnPrimary', type: 'text' },
            ],
          },
        ],
      },
    ],
  },
}))

vi.mock('../../../../src/globals/theme/tabs/typography', () => ({
  typography: {
    fields: [
      {
        name: 'typography',
        type: 'group',
        fields: [
          {
            type: 'collapsible',
            fields: [
              {
                name: 'fontBody',
                type: 'select',
                enumName: 'theme_font_body',
              },
            ],
          },
        ],
      },
    ],
  },
}))

vi.mock('../../../../src/globals/theme/tabs/layoutAndSpacing', () => ({
  layoutAndSpacing: {
    fields: [
      {
        name: 'layout',
        type: 'group',
        fields: [
          {
            type: 'row',
            fields: [
              {
                name: 'maxWidth',
                type: 'number',
              },
            ],
          },
          {
            name: 'breakpoints',
            type: 'group',
            fields: [
              {
                type: 'row',
                fields: [
                  { name: 'mobile', type: 'number' },
                  { name: 'tablet', type: 'number' },
                  { name: 'desktop', type: 'number' },
                  { name: 'largeDesktop', type: 'number' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
}))

import { themeGlobal } from '../../../../src/globals/theme/index.js'

// Mock payload request helper
const createMockRequest = () => ({
  payload: {
    logger: {
      error: vi.fn(),
      info: vi.fn(),
    },
  },
})

describe('Theme Global Configuration', () => {
  describe('Basic Configuration', () => {
    it('should have correct slug', () => {
      expect(themeGlobal.slug).toBe('theme')
    })

    it('should have live preview configuration', () => {
      expect(themeGlobal.admin?.livePreview?.url).toBe('/design-system')
    })

    it('should have hooks configuration', () => {
      expect(themeGlobal.hooks).toBeDefined()
      expect(themeGlobal.hooks?.afterChange).toHaveLength(1)
    })
  })

  describe('Fields Structure', () => {
    it('should have tabs field configuration', () => {
      expect(themeGlobal.fields).toHaveLength(1)

      const tabsField = themeGlobal.fields[0]
      expect(tabsField.type).toBe('tabs')
    })

    it('should have three tabs configured', () => {
      const tabsField = themeGlobal.fields[0] as TabsField
      expect(tabsField.tabs).toHaveLength(3)
    })
  })

  describe('Field Name and Type Validation', () => {
    it('should validate typography fields structure', () => {
      const tabsField = themeGlobal.fields[0] as TabsField
      const typographyTab = tabsField.tabs[1] // typography is second tab

      // Check main typography group
      const typographyGroup = typographyTab.fields[0] as any
      expect(typographyGroup.name).toBe('typography')
      expect(typographyGroup.type).toBe('group')

      // Check nested fields
      const collapsibleField = typographyGroup.fields[0]
      expect(collapsibleField.type).toBe('collapsible')

      const fontBodyField = collapsibleField.fields[0]
      expect(fontBodyField.name).toBe('fontBody')
      expect(fontBodyField.type).toBe('select')
    })

    it('should validate layout and spacing fields structure', () => {
      const tabsField = themeGlobal.fields[0] as TabsField
      const layoutTab = tabsField.tabs[2] // layoutAndSpacing is third tab

      // Check main layout group
      const layoutGroup = layoutTab.fields[0] as any
      expect(layoutGroup.name).toBe('layout')
      expect(layoutGroup.type).toBe('group')

      // Check maxWidth field - it's in a row
      const maxWidthRow = layoutGroup.fields[0] as RowField
      expect(maxWidthRow.type).toBe('row')
      const maxWidthField = maxWidthRow.fields[0] as NumberField
      expect(maxWidthField.name).toBe('maxWidth')
      expect(maxWidthField.type).toBe('number')

      // Check breakpoints group
      const breakpointsGroup = layoutGroup.fields[1]
      expect(breakpointsGroup.name).toBe('breakpoints')
      expect(breakpointsGroup.type).toBe('group')

      // Check individual breakpoint fields - they're in a row within the group
      const breakpointsRow = breakpointsGroup.fields[0] as RowField
      expect(breakpointsRow.type).toBe('row')
      const breakpointFields = breakpointsRow.fields as NumberField[]

      expect(breakpointFields[0].name).toBe('mobile')
      expect(breakpointFields[0].type).toBe('number')

      expect(breakpointFields[1].name).toBe('tablet')
      expect(breakpointFields[1].type).toBe('number')

      expect(breakpointFields[2].name).toBe('desktop')
      expect(breakpointFields[2].type).toBe('number')

      expect(breakpointFields[3].name).toBe('largeDesktop')
      expect(breakpointFields[3].type).toBe('number')
    })

    it('should validate colors fields structure', () => {
      const tabsField = themeGlobal.fields[0] as TabsField
      const colorsTab = tabsField.tabs[0] // colors is first tab

      // Check collapsible structure
      const collapsibleField = colorsTab.fields[0]
      expect(collapsibleField.type).toBe('collapsible')

      // Check row structure
      const rowField = collapsibleField.fields[0]
      expect(rowField.type).toBe('row')

      // Check color fields
      const colorFields = rowField.fields
      expect(colorFields[0].name).toBe('colorPrimary')
      expect(colorFields[0].type).toBe('text') // Mocked as text

      expect(colorFields[1].name).toBe('textOnPrimary')
      expect(colorFields[1].type).toBe('text') // Mocked as text
    })
  })

  describe('Hooks Validation', () => {
    it('should have afterChange hook that calls revalidateTag', async () => {
      const { revalidateTag } = await import('next/cache')
      const afterChangeHook = themeGlobal.hooks?.afterChange?.[0]

      expect(afterChangeHook).toBeDefined()

      // Create mock request
      const mockReq = createMockRequest()
      const mockDoc = {}

      // Call the hook
      afterChangeHook?.({
        context: {
          req: mockReq,
        },
        data: undefined,
        doc: mockDoc,
        global: themeGlobal,
        previousDoc: undefined,
        req: mockReq,
      } as any)

      expect(revalidateTag).toHaveBeenCalledWith('theme-config')
      expect(mockReq.payload.logger.info).toHaveBeenCalledWith('Theme updated, cache invalidated')
    })

    it('should handle errors in afterChange hook', async () => {
      const { revalidateTag } = await import('next/cache')
      // Make revalidateTag throw an error
      const mockRevalidateTag = revalidateTag as jest.MockedFunction<typeof revalidateTag>
      mockRevalidateTag.mockImplementationOnce(() => {
        throw new Error('Cache error')
      })

      const afterChangeHook = themeGlobal.hooks?.afterChange?.[0]

      const mockReq = createMockRequest()
      const mockDoc = {}

      // Call the hook - should not throw
      expect(() => {
        afterChangeHook?.({
          context: {
            req: mockReq,
          },
          data: undefined,
          doc: mockDoc,
          global: themeGlobal,
          previousDoc: undefined,
          req: mockReq,
        } as any)
      }).not.toThrow()

      expect(mockReq.payload.logger.error).toHaveBeenCalledWith(
        'Failed to revalidate theme cache:',
        expect.any(Error),
      )
    })
  })
})
