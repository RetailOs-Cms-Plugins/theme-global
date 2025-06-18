import type { TypographyConfig } from './index'

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

export interface ExtendedTypographyConfig extends TypographyConfig {
  direction: 'auto' | 'ltr' | 'rtl'
  fontFamily: string
  textAlign: {
    default: 'center' | 'justify' | 'left' | 'right'
    headings: 'center' | 'justify' | 'left' | 'right'
  }
}
