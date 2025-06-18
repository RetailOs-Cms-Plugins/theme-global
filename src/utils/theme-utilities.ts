'use server'
import type { Payload } from 'payload'

import type { ThemeData } from '../types/theme.types'

import { generateFontCSS } from './typography/font-loader'

// PRIMITIVE COLOR PALETTES (from screenshot)
const PRIMITIVE_PRIMARY = {
  50: '#faf5ff',
  100: '#f3e8ff',
  200: '#e9d5ff',
  300: '#d8b4fe',
  400: '#c084fc',
  500: '#a855f7',
  600: '#9333ea',
  700: '#7e22ce',
  800: '#6d28d9',
  900: '#581c87',
  950: '#3b0764',
}
const PRIMITIVE_SECONDARY = {
  50: '#f0f9ff',
  100: '#e0f2fe',
  200: '#bae6fd',
  300: '#7dd3fc',
  400: '#38bdf8',
  500: '#0ea5e9',
  600: '#0284c7',
  700: '#0369a1',
  800: '#075985',
  900: '#0c4a6e',
  950: '#082f49',
}

/**
 * Get theme data from any Payload instance
 * Usage: const theme = await getThemeFromPayload(payload, 'theme-config')
 */
export async function getThemeFromPayload(
  payload: Payload,
  globalSlug: string = 'theme-config',
): Promise<{
  cssVariables: Record<string, string>
  fontCSS: string
  themeData: ThemeData
}> {
  try {
    const rawTheme = await payload.findGlobal({ slug: globalSlug })

    console.log('🚀 ~ theme-utilities.ts:25 ~ rawTheme:', rawTheme)
    const themeData: ThemeData = {
      // Primitives
      primary50: PRIMITIVE_PRIMARY[50],
      primary100: PRIMITIVE_PRIMARY[100],
      primary200: PRIMITIVE_PRIMARY[200],
      primary300: PRIMITIVE_PRIMARY[300],
      primary400: PRIMITIVE_PRIMARY[400],
      primary500: PRIMITIVE_PRIMARY[500],
      primary600: PRIMITIVE_PRIMARY[600],
      primary700: PRIMITIVE_PRIMARY[700],
      primary800: PRIMITIVE_PRIMARY[800],
      primary900: PRIMITIVE_PRIMARY[900],
      primary950: PRIMITIVE_PRIMARY[950],
      secondary50: PRIMITIVE_SECONDARY[50],
      secondary100: PRIMITIVE_SECONDARY[100],
      secondary200: PRIMITIVE_SECONDARY[200],
      secondary300: PRIMITIVE_SECONDARY[300],
      secondary400: PRIMITIVE_SECONDARY[400],
      secondary500: PRIMITIVE_SECONDARY[500],
      secondary600: PRIMITIVE_SECONDARY[600],
      secondary700: PRIMITIVE_SECONDARY[700],
      secondary800: PRIMITIVE_SECONDARY[800],
      secondary900: PRIMITIVE_SECONDARY[900],
      secondary950: PRIMITIVE_SECONDARY[950],
      // Semantic
      cardBackground: PRIMITIVE_PRIMARY[50],
      colorPrimary: PRIMITIVE_PRIMARY[400],
      colorSecondary: PRIMITIVE_SECONDARY[400],
      pageBackground: '#fff',
      primaryColor: rawTheme?.primaryColor || PRIMITIVE_PRIMARY[400],
      secondaryColor: rawTheme?.secondaryColor || PRIMITIVE_SECONDARY[400],
      textOnCard: PRIMITIVE_PRIMARY[950],
      textOnPage: '#000',
      textOnPrimary: '#fff',
      textOnSecondary: PRIMITIVE_SECONDARY[950],
      typography: {
        fallbackFonts: rawTheme?.typography?.fallbackFonts || ['inter'],
        fontFamily: rawTheme?.typography?.fontFamily || 'inter',
      },
    }

    // Instead of generating from user input, use the above primitives for now
    const cssVariables: Record<string, string> = {
      // Primitives
      '--primary-50': PRIMITIVE_PRIMARY[50],
      '--primary-100': PRIMITIVE_PRIMARY[100],
      '--primary-200': PRIMITIVE_PRIMARY[200],
      '--primary-300': PRIMITIVE_PRIMARY[300],
      '--primary-400': PRIMITIVE_PRIMARY[400],
      '--primary-500': PRIMITIVE_PRIMARY[500],
      '--primary-600': PRIMITIVE_PRIMARY[600],
      '--primary-700': PRIMITIVE_PRIMARY[700],
      '--primary-800': PRIMITIVE_PRIMARY[800],
      '--primary-900': PRIMITIVE_PRIMARY[900],
      '--primary-950': PRIMITIVE_PRIMARY[950],
      '--secondary-50': PRIMITIVE_SECONDARY[50],
      '--secondary-100': PRIMITIVE_SECONDARY[100],
      '--secondary-200': PRIMITIVE_SECONDARY[200],
      '--secondary-300': PRIMITIVE_SECONDARY[300],
      '--secondary-400': PRIMITIVE_SECONDARY[400],
      '--secondary-500': PRIMITIVE_SECONDARY[500],
      '--secondary-600': PRIMITIVE_SECONDARY[600],
      '--secondary-700': PRIMITIVE_SECONDARY[700],
      '--secondary-800': PRIMITIVE_SECONDARY[800],
      '--secondary-900': PRIMITIVE_SECONDARY[900],
      '--secondary-950': PRIMITIVE_SECONDARY[950],

      // Semantic (alphabetically ordered)
      '--card-background': PRIMITIVE_PRIMARY[50],
      '--color-primary': PRIMITIVE_PRIMARY[200],
      '--color-secondary': PRIMITIVE_SECONDARY[400],
      '--page-background': '#ffffff',
      '--text-on-card': PRIMITIVE_PRIMARY[950],
      '--text-on-page': '#000000',
      '--text-on-primary': '#ffffff',
      '--text-on-secondary': PRIMITIVE_SECONDARY[950],
    }

    return {
      cssVariables,
      fontCSS: generateFontCSS(themeData.typography.fontFamily, themeData.typography.fallbackFonts),
      themeData,
    }
  } catch (err) {
    console.error('❌ Error loading theme:', err)
    return {
      cssVariables: {
        // Primitives
        '--primary-50': PRIMITIVE_PRIMARY[50],
        '--primary-100': PRIMITIVE_PRIMARY[100],
        '--primary-200': PRIMITIVE_PRIMARY[200],
        '--primary-300': PRIMITIVE_PRIMARY[300],
        '--primary-400': PRIMITIVE_PRIMARY[400],
        '--primary-500': PRIMITIVE_PRIMARY[500],
        '--primary-600': PRIMITIVE_PRIMARY[600],
        '--primary-700': PRIMITIVE_PRIMARY[700],
        '--primary-800': PRIMITIVE_PRIMARY[800],
        '--primary-900': PRIMITIVE_PRIMARY[900],
        '--primary-950': PRIMITIVE_PRIMARY[950],
        '--secondary-50': PRIMITIVE_SECONDARY[50],
        '--secondary-100': PRIMITIVE_SECONDARY[100],
        '--secondary-200': PRIMITIVE_SECONDARY[200],
        '--secondary-300': PRIMITIVE_SECONDARY[300],
        '--secondary-400': PRIMITIVE_SECONDARY[400],
        '--secondary-500': PRIMITIVE_SECONDARY[500],
        '--secondary-600': PRIMITIVE_SECONDARY[600],
        '--secondary-700': PRIMITIVE_SECONDARY[700],
        '--secondary-800': PRIMITIVE_SECONDARY[800],
        '--secondary-900': PRIMITIVE_SECONDARY[900],
        '--secondary-950': PRIMITIVE_SECONDARY[950],

        // Semantic (alphabetically ordered)
        '--card-background': PRIMITIVE_PRIMARY[50],
        '--color-primary': PRIMITIVE_PRIMARY[200],
        '--color-secondary': PRIMITIVE_SECONDARY[400],
        '--page-background': '#ffffff',
        '--text-on-card': PRIMITIVE_PRIMARY[950],
        '--text-on-page': '#000000',
        '--text-on-primary': '#ffffff',
        '--text-on-secondary': PRIMITIVE_SECONDARY[950],
      },
      fontCSS: '',
      themeData: {
        // Primitives
        primary50: PRIMITIVE_PRIMARY[50],
        primary100: PRIMITIVE_PRIMARY[100],
        primary200: PRIMITIVE_PRIMARY[200],
        primary300: PRIMITIVE_PRIMARY[300],
        primary400: PRIMITIVE_PRIMARY[400],
        primary500: PRIMITIVE_PRIMARY[500],
        primary600: PRIMITIVE_PRIMARY[600],
        primary700: PRIMITIVE_PRIMARY[700],
        primary800: PRIMITIVE_PRIMARY[800],
        primary900: PRIMITIVE_PRIMARY[900],
        primary950: PRIMITIVE_PRIMARY[950],
        secondary50: PRIMITIVE_SECONDARY[50],
        secondary100: PRIMITIVE_SECONDARY[100],
        secondary200: PRIMITIVE_SECONDARY[200],
        secondary300: PRIMITIVE_SECONDARY[300],
        secondary400: PRIMITIVE_SECONDARY[400],
        secondary500: PRIMITIVE_SECONDARY[500],
        secondary600: PRIMITIVE_SECONDARY[600],
        secondary700: PRIMITIVE_SECONDARY[700],
        secondary800: PRIMITIVE_SECONDARY[800],
        secondary900: PRIMITIVE_SECONDARY[900],
        secondary950: PRIMITIVE_SECONDARY[950],
        // Semantic
        cardBackground: PRIMITIVE_PRIMARY[50],
        colorPrimary: PRIMITIVE_PRIMARY[400],
        colorSecondary: PRIMITIVE_SECONDARY[400],
        pageBackground: '#fff',
        primaryColor: PRIMITIVE_PRIMARY[400],
        secondaryColor: PRIMITIVE_SECONDARY[400],
        textOnCard: PRIMITIVE_PRIMARY[950],
        textOnPage: '#000',
        textOnPrimary: '#fff',
        textOnSecondary: PRIMITIVE_SECONDARY[950],
        typography: { fallbackFonts: ['inter'], fontFamily: 'inter' },
      },
    }
  }
}
