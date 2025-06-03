/**
 * Theme configuration types for the Payload CMS theme plugin
 */

export interface TypographyConfig {
  fontFamily: string
  fontSize: {
    base: string
    headings: {
      h1: string
      h2: string
      h3: string
      h4: string
      h5: string
      h6: string
    }
  }
  fontWeight: {
    bold: number
    normal: number
  }
  lineHeight: {
    normal: number
    relaxed: number
    tight: number
  }
}

export interface ThemeConfig {
  primaryColor: string
  secondaryColor: string
  typography: TypographyConfig
}

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
