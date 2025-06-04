'use server'
import type { Payload } from 'payload'
import type * as React from 'react'

import type { ThemeData } from '../types/theme.types'

import { generateColorScale } from './color-palette/color-palette'
import { generateFontCSS, generateFontVariables } from './typography/font-loader'

/**
 * Get theme data from any Payload instance
 * Usage: const theme = await getThemeFromPayload(payload, 'theme-config')
 */
export async function getThemeFromPayload(
  payload: Payload,
  globalSlug: string = 'theme-config',
): Promise<{
  cssVariables: React.CSSProperties
  fontCSS: string
  themeData: ThemeData
}> {
  try {
    const rawTheme = await payload.findGlobal({ slug: globalSlug })

    const themeData: ThemeData = {
      primaryColor: rawTheme?.primaryColor || '#3b82f6',
      secondaryColor: rawTheme?.secondaryColor || '#64748b',
      typography: {
        fontFamily: rawTheme?.typography?.fontFamily || 'inter',
      },
    }

    return {
      cssVariables: {
        ...generateColorScale(themeData.primaryColor, 'primary'),
        ...generateColorScale(themeData.secondaryColor, 'secondary'),
        ...generateFontVariables(themeData.typography.fontFamily),
      },
      fontCSS: generateFontCSS(themeData.typography.fontFamily),
      themeData,
    }
  } catch (err) {
    console.error('❌ Error loading theme:', err)
    return {
      cssVariables: {},
      fontCSS: '',
      themeData: {
        primaryColor: '#3b82f6',
        secondaryColor: '#64748b',
        typography: { fontFamily: 'inter' },
      },
    }
  }
}

/**
 * Create cached theme utilities for a specific project
 * Returns functions that the consuming project can use
 */
// export async function createThemeUtilities(payload: Payload, globalSlug: string = 'theme-config') {
//   return {
//     getTheme: async () => getThemeFromPayload(payload, globalSlug),

//     // Helper to get just CSS variables
//     getThemeVariables: async (): Promise<React.CSSProperties> => {
//       const { cssVariables } = await getThemeFromPayload(payload, globalSlug)
//       return cssVariables
//     },

//     // Helper to get just font CSS
//     getFontCSS: async (): Promise<string> => {
//       const { fontCSS } = await getThemeFromPayload(payload, globalSlug)
//       return fontCSS
//     },
//   }
// }
