'use server'
import type { Payload } from 'payload'

import type { ThemeData } from '../types/theme.types'

import { generateColorScale } from './color-palette/color-palette'
import { generateFontCSS } from './typography/font-loader'

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

    // Generate color palettes from the primary and secondary colors
    const primaryPalette = generateColorScale(
      rawTheme?.colors?.colorPrimary || 'var(--color-primary-500)',
      'primary',
    )
    const secondaryPalette = generateColorScale(
      rawTheme?.colors?.colorSecondary || 'var(--color-secondary-500)',
      'secondary',
    )

    const themeData: ThemeData = {
      // Primitives - use generated palette
      primary50: primaryPalette['--primary-50'],
      primary100: primaryPalette['--primary-100'],
      primary200: primaryPalette['--primary-200'],
      primary300: primaryPalette['--primary-300'],
      primary400: primaryPalette['--primary-400'],
      primary500: primaryPalette['--primary-500'],
      primary600: primaryPalette['--primary-600'],
      primary700: primaryPalette['--primary-700'],
      primary800: primaryPalette['--primary-800'],
      primary900: primaryPalette['--primary-900'],
      primary950: primaryPalette['--primary-950'],
      secondary50: secondaryPalette['--secondary-50'],
      secondary100: secondaryPalette['--secondary-100'],
      secondary200: secondaryPalette['--secondary-200'],
      secondary300: secondaryPalette['--secondary-300'],
      secondary400: secondaryPalette['--secondary-400'],
      secondary500: secondaryPalette['--secondary-500'],
      secondary600: secondaryPalette['--secondary-600'],
      secondary700: secondaryPalette['--secondary-700'],
      secondary800: secondaryPalette['--secondary-800'],
      secondary900: secondaryPalette['--secondary-900'],
      secondary950: secondaryPalette['--secondary-950'],
      // Semantic - use values from Payload
      cardBackground: rawTheme?.colors?.cardBackground || primaryPalette['--primary-50'],
      colorPrimary: rawTheme?.colors?.colorPrimary || primaryPalette['--primary-500'],
      colorSecondary: rawTheme?.colors?.colorSecondary || secondaryPalette['--secondary-500'],
      pageBackground: rawTheme?.colors?.pageBackground || '#ffffff',
      primaryColor: rawTheme?.colors?.colorPrimary || primaryPalette['--primary-500'],
      secondaryColor: rawTheme?.colors?.colorSecondary || secondaryPalette['--secondary-500'],
      textOnCard: rawTheme?.colors?.textOnCard || primaryPalette['--primary-950'],
      textOnPage: rawTheme?.colors?.textOnPage || '#000000',
      textOnPrimary: rawTheme?.colors?.textOnPrimary || '#ffffff',
      textOnSecondary: rawTheme?.colors?.textOnSecondary || secondaryPalette['--secondary-950'],
      typography: {
        fallbackFonts: rawTheme?.typography?.fallbackFonts || ['inter'],
        fontFamily: rawTheme?.typography?.fontFamily || 'inter',
      },
    }

    // Use the same values for CSS variables
    const cssVariables: Record<string, string> = {
      // Primitives
      '--primary-50': themeData.primary50,
      '--primary-100': themeData.primary100,
      '--primary-200': themeData.primary200,
      '--primary-300': themeData.primary300,
      '--primary-400': themeData.primary400,
      '--primary-500': themeData.primary500,
      '--primary-600': themeData.primary600,
      '--primary-700': themeData.primary700,
      '--primary-800': themeData.primary800,
      '--primary-900': themeData.primary900,
      '--primary-950': themeData.primary950,
      '--secondary-50': themeData.secondary50,
      '--secondary-100': themeData.secondary100,
      '--secondary-200': themeData.secondary200,
      '--secondary-300': themeData.secondary300,
      '--secondary-400': themeData.secondary400,
      '--secondary-500': themeData.secondary500,
      '--secondary-600': themeData.secondary600,
      '--secondary-700': themeData.secondary700,
      '--secondary-800': themeData.secondary800,
      '--secondary-900': themeData.secondary900,
      '--secondary-950': themeData.secondary950,

      // Semantic (alphabetically ordered)
      '--card-background': themeData.cardBackground,
      '--color-primary': themeData.colorPrimary,
      '--color-secondary': themeData.colorSecondary,
      '--page-background': themeData.pageBackground,
      '--text-on-card': themeData.textOnCard,
      '--text-on-page': themeData.textOnPage,
      '--text-on-primary': themeData.textOnPrimary,
      '--text-on-secondary': themeData.textOnSecondary,
    }

    return {
      cssVariables,
      fontCSS: generateFontCSS(themeData.typography.fontFamily, themeData.typography.fallbackFonts),
      themeData,
    }
  } catch (err) {
    console.error('❌ Error loading theme:', err)
    // Use the same structure for fallback values
    const primaryPalette = generateColorScale('#a855f7', 'primary')
    const secondaryPalette = generateColorScale('#0ea5e9', 'secondary')

    const fallbackThemeData: ThemeData = {
      // Primitives
      primary50: primaryPalette['--primary-50'],
      primary100: primaryPalette['--primary-100'],
      primary200: primaryPalette['--primary-200'],
      primary300: primaryPalette['--primary-300'],
      primary400: primaryPalette['--primary-400'],
      primary500: primaryPalette['--primary-500'],
      primary600: primaryPalette['--primary-600'],
      primary700: primaryPalette['--primary-700'],
      primary800: primaryPalette['--primary-800'],
      primary900: primaryPalette['--primary-900'],
      primary950: primaryPalette['--primary-950'],
      secondary50: secondaryPalette['--secondary-50'],
      secondary100: secondaryPalette['--secondary-100'],
      secondary200: secondaryPalette['--secondary-200'],
      secondary300: secondaryPalette['--secondary-300'],
      secondary400: secondaryPalette['--secondary-400'],
      secondary500: secondaryPalette['--secondary-500'],
      secondary600: secondaryPalette['--secondary-600'],
      secondary700: secondaryPalette['--secondary-700'],
      secondary800: secondaryPalette['--secondary-800'],
      secondary900: secondaryPalette['--secondary-900'],
      secondary950: secondaryPalette['--secondary-950'],
      // Semantic
      cardBackground: primaryPalette['--primary-50'],
      colorPrimary: primaryPalette['--primary-500'],
      colorSecondary: secondaryPalette['--secondary-500'],
      pageBackground: '#ffffff',
      primaryColor: primaryPalette['--primary-500'],
      secondaryColor: secondaryPalette['--secondary-500'],
      textOnCard: primaryPalette['--primary-950'],
      textOnPage: '#000000',
      textOnPrimary: '#ffffff',
      textOnSecondary: secondaryPalette['--secondary-950'],
      typography: {
        fallbackFonts: ['inter'],
        fontFamily: 'inter',
      },
    }

    return {
      cssVariables: {
        // Primitives
        '--primary-50': fallbackThemeData.primary50,
        '--primary-100': fallbackThemeData.primary100,
        '--primary-200': fallbackThemeData.primary200,
        '--primary-300': fallbackThemeData.primary300,
        '--primary-400': fallbackThemeData.primary400,
        '--primary-500': fallbackThemeData.primary500,
        '--primary-600': fallbackThemeData.primary600,
        '--primary-700': fallbackThemeData.primary700,
        '--primary-800': fallbackThemeData.primary800,
        '--primary-900': fallbackThemeData.primary900,
        '--primary-950': fallbackThemeData.primary950,
        '--secondary-50': fallbackThemeData.secondary50,
        '--secondary-100': fallbackThemeData.secondary100,
        '--secondary-200': fallbackThemeData.secondary200,
        '--secondary-300': fallbackThemeData.secondary300,
        '--secondary-400': fallbackThemeData.secondary400,
        '--secondary-500': fallbackThemeData.secondary500,
        '--secondary-600': fallbackThemeData.secondary600,
        '--secondary-700': fallbackThemeData.secondary700,
        '--secondary-800': fallbackThemeData.secondary800,
        '--secondary-900': fallbackThemeData.secondary900,
        '--secondary-950': fallbackThemeData.secondary950,

        // Semantic (alphabetically ordered)
        '--card-background': fallbackThemeData.cardBackground,
        '--color-primary': fallbackThemeData.colorPrimary,
        '--color-secondary': fallbackThemeData.colorSecondary,
        '--page-background': fallbackThemeData.pageBackground,
        '--text-on-card': fallbackThemeData.textOnCard,
        '--text-on-page': fallbackThemeData.textOnPage,
        '--text-on-primary': fallbackThemeData.textOnPrimary,
        '--text-on-secondary': fallbackThemeData.textOnSecondary,
      },
      fontCSS: '',
      themeData: fallbackThemeData,
    }
  }
}
