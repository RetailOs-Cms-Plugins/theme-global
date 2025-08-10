'use server'

import type { SanitizedConfig} from 'payload';
import type * as React from 'react'

import { unstable_cache as cache } from 'next/cache'
import { getPayload } from 'payload'

import type { ThemeConfig } from '../types'

import { generateColorScale } from '../utils/color-palette/color-palette'
import { getFontDefinition } from '../utils/typography/font-definitions'
import { getGoogleFontsUrl } from '../utils/typography/font-loader'

// Helper to create CSS variables from theme
function createCssVariables(theme: ThemeConfig): React.CSSProperties {
  const variables: any = {}

  // 1. Colors
  if (theme.colorPrimary && theme.colorSecondary) {
    Object.assign(
      variables,
      generateColorScale(theme.colorPrimary, 'primary'),
      generateColorScale(theme.colorSecondary, 'secondary'),
      {
        '--card-background': theme.cardBackground,
        '--color-primary': theme.colorPrimary,
        '--color-secondary': theme.colorSecondary,
        '--page-background': theme.pageBackground,
        '--text-on-card': theme.textOnCard,
        '--text-on-page': theme.textOnPage,
        '--text-on-primary': theme.textOnPrimary,
        '--text-on-secondary': theme.textOnSecondary,
      },
    )
  }

  // 2. Typography
  if (theme.typography) {
    const typo = theme.typography

    const bodyFontDef = typo.fontBody ? getFontDefinition(typo.fontBody) : null
    const headingFontDef = typo.fontHeading ? getFontDefinition(typo.fontHeading) : null

    variables['--font-body'] = bodyFontDef ? `'${bodyFontDef.displayName}'` : 'sans-serif'
    variables['--font-heading'] = headingFontDef ? `'${headingFontDef.displayName}'` : 'sans-serif'

    // Add font size variables for the text size properties
    if (typo.textXs) {
      variables['--font-size-xs'] = typo.textXs
    }
    if (typo.textSm) {
      variables['--font-size-sm'] = typo.textSm
    }
    if (typo.textBase) {
      variables['--font-size-base'] = typo.textBase
    }
    if (typo.textLg) {
      variables['--font-size-lg'] = typo.textLg
    }
    if (typo.textXl) {
      variables['--font-size-xl'] = typo.textXl
    }
    if (typo.text2xl) {
      variables['--font-size-2xl'] = typo.text2xl
    }
    if (typo.text3xl) {
      variables['--font-size-3xl'] = typo.text3xl
    }
    if (typo.text4xl) {
      variables['--font-size-4xl'] = typo.text4xl
    }

    if (typo.direction) {
      variables['--direction'] = typo.direction
    }
  }

  return variables
}

// Cached theme fetching and processing
const getCachedTheme = cache(
  async ({ config }: { config: Promise<SanitizedConfig> | SanitizedConfig }) => {
    console.log('🔄 Fetching and processing theme...')
    const payload = await getPayload({ config })
    const rawTheme = (await payload.findGlobal({ slug: 'theme-config' })) as unknown as ThemeConfig

    if (!rawTheme) {
      throw new Error('Theme configuration not found in Payload.')
    }

    const cssVariables = createCssVariables(rawTheme)
    const fontNames = [rawTheme.typography?.fontBody, rawTheme.typography?.fontHeading].filter(
      (name): name is string => typeof name === 'string' && name.length > 0,
    )
    const fontCSS = getGoogleFontsUrl(fontNames)

    console.log('✅ Theme processed and cached.')
    return {
      cssVariables,
      fontCSS: fontCSS ? `@import url('${fontCSS}');` : '',
      themeData: rawTheme,
    }
  },
  ['theme-config'],
  {
    revalidate: 300, // 5 minutes
    tags: ['theme-config'],
  },
)

export async function getTheme({ config, noCache = true }: { config: Promise<SanitizedConfig> | SanitizedConfig; noCache?: boolean }): Promise<{
  cssVariables: React.CSSProperties
  fontCSS: string
  themeData: ThemeConfig
}> {
  if (noCache) {
    const payload = await getPayload({ config })
    const rawTheme = (await payload.findGlobal({ slug: 'theme-config' })) as unknown as ThemeConfig
    const cssVariables = createCssVariables(rawTheme)
    const fontNames = [rawTheme.typography?.fontBody, rawTheme.typography?.fontHeading].filter(
      (name): name is string => typeof name === 'string' && name.length > 0,
    )
    const fontCSS = getGoogleFontsUrl(fontNames)
    return {
      cssVariables,
      fontCSS: fontCSS ? `@import url('${fontCSS}');` : '',
      themeData: rawTheme,
    }
  }
  return getCachedTheme({ config })
}