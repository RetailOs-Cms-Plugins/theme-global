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

    console.log('🚀 ~ theme-utilities.ts:25 ~ rawTheme:', rawTheme)
    const themeData: ThemeData = {
      primaryColor: rawTheme?.primaryColor || '#3b82f6',
      secondaryColor: rawTheme?.secondaryColor || '#64748b',
      // TODO: Add more color variables
      typography: {
        // TODO: Add more font variables
        fallbackFonts: rawTheme?.typography?.fallbackFonts || ['inter'],
        fontFamily: rawTheme?.typography?.fontFamily || 'inter',
      },
    }

    return {
      cssVariables: {
        ...generateColorScale(themeData.primaryColor, 'primary'),
        ...generateColorScale(themeData.secondaryColor, 'secondary'),
        ...generateFontVariables(
          themeData.typography.fontFamily,
          themeData.typography.fallbackFonts,
        ),
      },
      fontCSS: generateFontCSS(themeData.typography.fontFamily, themeData.typography.fallbackFonts),
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
        typography: { fallbackFonts: ['inter'], fontFamily: 'inter' },
      },
    }
  }
}
