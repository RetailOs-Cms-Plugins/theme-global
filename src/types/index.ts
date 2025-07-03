/**
 * Theme configuration types for the Payload CMS theme plugin
 */

export interface TypographyConfig {
  blockquote?: { fontSize: string; lineHeight: string }
  direction?: 'auto' | 'ltr' | 'rtl'
  fontBody?: string
  fontHeading?: string
  fontMono?: string
  h1?: { fontSize: string; lineHeight: string }
  h2?: { fontSize: string; lineHeight: string }
  h3?: { fontSize: string; lineHeight: string }
  h4?: { fontSize: string; lineHeight: string }
  inlineCode?: { fontSize: string; lineHeight: string }
  large?: { fontSize: string; lineHeight: string }
  lead?: { fontSize: string; lineHeight: string }
  list?: { fontSize: string; lineHeight: string }
  muted?: { fontSize: string; lineHeight: string }
  p?: { fontSize: string; lineHeight: string }
  small?: { fontSize: string; lineHeight: string }
  table?: { fontSize: string; lineHeight: string }
  text2xl?: string
  text3xl?: string
  text4xl?: string
  textBase?: string
  textLg?: string
  textSm?: string
  textXl?: string
  textXs?: string
}

export interface ThemeConfig {
  cardBackground: string
  colorPrimary: string
  colorSecondary: string
  layout?: {
    breakpoints?: {
      desktop?: number
      largeDesktop?: number
      mobile?: number
      tablet?: number
    }
    maxWidth?: number
    spacingScale?: {
      lg?: string
      md?: string
      sm?: string
      xl?: string
      xs?: string
    }
    borderRadius?: {
      box?: string
      button?: string
    }
  }
  pageBackground: string
  primary50: string
  primary100: string
  primary200: string
  primary300: string
  primary400: string
  primary500: string
  primary600: string
  primary700: string
  primary800: string
  primary900: string
  primary950: string
  secondary50: string
  secondary100: string
  secondary200: string
  secondary300: string
  secondary400: string
  secondary500: string
  secondary600: string
  secondary700: string
  secondary800: string
  secondary900: string
  secondary950: string
  textOnCard: string
  textOnPage: string
  textOnPrimary: string
  textOnSecondary: string
  typography: TypographyConfig
}

export * from './typography.js'

/**
 * Props for color input components
 */
export interface ColorInputProps {
  /** Description text shown below the input */
  description?: string
  /** Whether the field is disabled */
  disabled?: boolean
  /** Validation error message */
  error?: string
  /** Label for the color input */
  label?: string
  /** The field name for the color input */
  name: string
  /** Callback when color changes */
  onChange?: (value: string) => void
  /** Whether the field is required */
  required?: boolean
  /** Current color value */
  value?: string
}

/**
 * Props for typography selector components
 */
export interface TypographySelectorProps {
  /** Description text shown below the component */
  description?: string
  /** Whether the field is disabled */
  disabled?: boolean
  /** Validation error message */
  error?: string
  /** Label for the typography selector */
  label?: string
  /** The field name for the typography selector */
  name: string
  /** Callback when typography config changes */
  onChange?: (value: TypographyConfig) => void
  /** Whether the field is required */
  required?: boolean
  /** Current typography configuration */
  value?: TypographyConfig
}

/**
 * Font family option for typography selector
 */
export interface FontFamilyOption {
  label: string
  value: string
}

/**
 * Plugin configuration options
 */
export interface ThemePluginOptions {
  /** Default theme configuration */
  defaultTheme?: Partial<ThemeConfig>
  /** Whether to enable color management */
  enableColors?: boolean
  /** Whether to enable typography management */
  enableTypography?: boolean
  /** Custom color validation function */
  validateColor?: (color: string) => boolean
}

/**
 * Utility type for theme field validation
 */
export type ThemeFieldValidator<T = any> = (value: T) => string | undefined

/**
 * Theme validation errors
 */
export interface ThemeValidationErrors {
  primaryColor?: string
  secondaryColor?: string
  typography?: {
    fontFamily?: string
    fontSize?: {
      base?: string
      headings?: Record<string, string>
    }
    fontWeight?: {
      bold?: string
      normal?: string
    }
    lineHeight?: {
      normal?: string
      relaxed?: string
      tight?: string
    }
  }
}
