import type { TypographyConfig } from './typography.js'

export interface ThemeConfig {
  cardBackground: string
  colorPrimary: string
  colorSecondary: string
  fontWeight?: {
    bold: number
    normal: number
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

export type ThemeData = {
  // Semantic
  cardBackground: string
  colorPrimary: string
  colorSecondary: string
  pageBackground: string
  // Primitives
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
  primaryColor: string
  // Primitives (continued)
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
  secondaryColor: string
  textOnCard: string
  textOnPage: string
  textOnPrimary: string
  textOnSecondary: string
  typography: {
    fallbackFonts: string[]
    fontFamily: string
  }
}
