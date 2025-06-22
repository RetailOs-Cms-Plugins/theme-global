export interface FontFamilyOption {
  label: string
  value: string
}

export interface TypographyConfig {
  bodyFont?: string
  direction?: 'auto' | 'ltr' | 'rtl'
  elements: {
    [key: string]: { fontSize: string; lineHeight: string }
    blockquote: { fontSize: string; lineHeight: string }
    h1: { fontSize: string; lineHeight: string }
    h2: { fontSize: string; lineHeight: string }
    h3: { fontSize: string; lineHeight: string }
    h4: { fontSize: string; lineHeight: string }
    inlineCode: { fontSize: string; lineHeight: string }
    large: { fontSize: string; lineHeight: string }
    lead: { fontSize: string; lineHeight: string }
    list: { fontSize: string; lineHeight: string }
    muted: { fontSize: string; lineHeight: string }
    p: { fontSize: string; lineHeight: string }
    small: { fontSize: string; lineHeight: string }
    table: { fontSize: string; lineHeight: string }
  }
  fontFamily?: string
  fontWeight: {
    bold: number
    normal: number
  }
  headingFont?: string
}

export interface ExtendedTypographyConfig extends TypographyConfig {
  direction?: 'auto' | 'ltr' | 'rtl'
}

export interface TypographySelectorProps {
  description?: string
  disabled?: boolean
  error?: string
  label?: string
  name: string
  onChange?: (value: TypographyConfig) => void
  required?: boolean
  value?: TypographyConfig
}

/**
 * Font source configuration for different font types
 */
export interface FontSource {
  // fallbacks: string[]
  files?: {
    ttf?: string
    woff?: string
    woff2?: string
  }
  googleFamily?: string
  type: 'google' | 'local' | 'system'
}

/**
 * Complete font definition with metadata and support information
 */
export interface FontDefinition {
  displayName: string
  name: string
  preview?: {
    english?: string
    hebrew?: string
  }
  source: FontSource
  styles: ('italic' | 'normal')[]
  supports: {
    languages: string[] // ['en', 'he', 'ar']
    scripts: string[] // ['latin', 'hebrew', 'arabic']
  }
  weights: number[]
}
