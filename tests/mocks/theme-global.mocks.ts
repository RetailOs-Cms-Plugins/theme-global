import { vi } from 'vitest'

// Mock external dependencies
export const mockExternalDependencies = () => {
  vi.mock('@retailos-ai/cms-general-custom-fields', () => ({
    ColorPickerField: vi.fn((config) => ({
      ...config,
      type: 'text', // Mock as text field
    })),
  }))

  vi.mock('next/cache', () => ({
    revalidateTag: vi.fn(),
  }))

  vi.mock('../../../../src/globals/theme/Component', () => ({
    default: vi.fn(),
  }))
}

// Mock tab configurations
export const mockTabConfigurations = () => {
  vi.mock('../../../../src/globals/theme/tabs/colors', () => ({
    colors: {
      fields: [
        {
          type: 'collapsible',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'colorPrimary', type: 'text', defaultValue: '#a855f7' },
                { name: 'textOnPrimary', type: 'text', defaultValue: '#ffffff' },
              ],
            },
          ],
        },
      ],
      label: 'Colors',
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
                  defaultValue: 'inter',
                  enumName: 'theme_font_body',
                  label: 'Body Font',
                },
              ],
            },
          ],
        },
      ],
      label: 'Typography',
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
              name: 'maxWidth',
              type: 'number',
              defaultValue: 1360,
              label: 'Max Width',
            },
            {
              name: 'breakpoints',
              type: 'group',
              fields: [
                { name: 'mobile', type: 'number', defaultValue: 640 },
                { name: 'tablet', type: 'number', defaultValue: 768 },
                { name: 'desktop', type: 'number', defaultValue: 1024 },
                { name: 'largeDesktop', type: 'number', defaultValue: 1280 },
              ],
            },
          ],
        },
      ],
      label: 'Layout & Spacing',
    },
  }))
}

// Mock payload request and logger
export const createMockRequest = () => ({
  payload: {
    logger: {
      error: vi.fn(),
      info: vi.fn(),
    },
  },
})

// Initialize all mocks
export const initializeThemeGlobalMocks = () => {
  mockExternalDependencies()
  mockTabConfigurations()
}
