import { vi } from 'vitest'

import type { ThemeConfig, TypographyConfig } from '../../src/types/index.js'

export const createMockPayload = () => ({
  auth: {
    login: vi.fn(),
    logout: vi.fn(),
  },
  collections: {
    create: vi.fn(),
    delete: vi.fn(),
    find: vi.fn(),
    update: vi.fn(),
  },
  config: {
    collections: [],
    globals: [],
  },
  globals: {
    find: vi.fn(),
    update: vi.fn(),
  },
})

export const createMockConfig = (overrides = {}) => ({
  collections: [
    {
      slug: 'posts',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  globals: [],
  ...overrides,
})

export const mockPayloadUser = {
  id: '123',
  email: 'test@example.com',
  password: 'password123',
}

export const mockPayloadDocument = {
  id: 'doc-123',
  content: 'Test content',
  createdAt: '2024-01-01T00:00:00.000Z',
  title: 'Test Document',
  updatedAt: '2024-01-01T00:00:00.000Z',
}

// Theme-related mocks
export const mockTypographyConfig: TypographyConfig = {
  blockquote: { fontSize: '1.125rem', lineHeight: '1.75rem' },
  direction: 'auto',
  fontBody: 'Inter, system-ui, sans-serif',
  fontHeading: 'Poppins, system-ui, sans-serif',
  fontMono: 'Fira Code, monospace',
  h1: { fontSize: '2.25rem', lineHeight: '2.5rem' },
  h2: { fontSize: '1.875rem', lineHeight: '2.25rem' },
  h3: { fontSize: '1.5rem', lineHeight: '2rem' },
  h4: { fontSize: '1.25rem', lineHeight: '1.75rem' },
  inlineCode: { fontSize: '0.875rem', lineHeight: '1.25rem' },
  large: { fontSize: '1.125rem', lineHeight: '1.75rem' },
  lead: { fontSize: '1.25rem', lineHeight: '1.75rem' },
  list: { fontSize: '1rem', lineHeight: '1.75rem' },
  muted: { fontSize: '0.875rem', lineHeight: '1.25rem' },
  p: { fontSize: '1rem', lineHeight: '1.5rem' },
  small: { fontSize: '0.875rem', lineHeight: '1.25rem' },
  table: { fontSize: '1rem', lineHeight: '1.5rem' },
  text2xl: '1.5rem',
  text3xl: '1.875rem',
  text4xl: '2.25rem',
  textBase: '1rem',
  textLg: '1.125rem',
  textSm: '0.875rem',
  textXl: '1.25rem',
  textXs: '0.75rem',
}

export const mockThemeConfig: ThemeConfig = {
  cardBackground: '#ffffff',
  colorPrimary: '#3b82f6',
  colorSecondary: '#8b5cf6',
  layout: {
    breakpoints: {
      desktop: 1920,
      largeDesktop: 2560,
      mobile: 768,
      tablet: 1024,
    },
    maxWidth: 1360,
    spacingScale: {
      lg: '1.5rem',
      md: '1rem',
      sm: '0.5rem',
      xl: '2rem',
      xs: '0.25rem',
    },
  },
  pageBackground: '#f8fafc',
  primary50: '#eff6ff',
  primary100: '#dbeafe',
  primary200: '#bfdbfe',
  primary300: '#93c5fd',
  primary400: '#60a5fa',
  primary500: '#3b82f6',
  primary600: '#2563eb',
  primary700: '#1d4ed8',
  primary800: '#1e40af',
  primary900: '#1e3a8a',
  primary950: '#172554',
  secondary50: '#f5f3ff',
  secondary100: '#ede9fe',
  secondary200: '#ddd6fe',
  secondary300: '#c4b5fd',
  secondary400: '#a78bfa',
  secondary500: '#8b5cf6',
  secondary600: '#7c3aed',
  secondary700: '#6d28d9',
  secondary800: '#5b21b6',
  secondary900: '#4c1d95',
  secondary950: '#2e1065',
  textOnCard: '#1f2937',
  textOnPage: '#111827',
  textOnPrimary: '#ffffff',
  textOnSecondary: '#ffffff',
  typography: mockTypographyConfig,
}

/**
 * Creates a mock theme config with optional overrides
 */
export const createMockThemeConfig = (overrides: Partial<ThemeConfig> = {}): ThemeConfig => ({
  ...mockThemeConfig,
  ...overrides,
})

/**
 * Creates a mock typography config with optional overrides
 */
export const createMockTypographyConfig = (overrides: Partial<TypographyConfig> = {}): TypographyConfig => ({
  ...mockTypographyConfig,
  ...overrides,
})
