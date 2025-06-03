'use server'
import type * as React from 'react'

import config from '@payload-config'
import { getPayload } from 'payload'

import { generateColorScale } from '../../../src/utils/color-palette/color-palette'
import { fontLoader } from '../../../src/utils/typography/font-loader'

export async function getTheme() {
  try {
    const payload = await getPayload({ config })
    const theme = await payload.findGlobal({ slug: 'theme-config' })
    console.log('🚀 ~ theme.actions.ts:19 ~ getTheme ~ theme:', theme)
    await fontLoader.loadFont(theme?.typography?.fontFamily || 'inter')
    return {
      ...generateColorScale(theme?.primaryColor || '#ffffff', 'primary'),
      ...generateColorScale(theme?.secondaryColor || '#000000', 'secondary'),
      ...fontLoader.generateFontCSSVariables(theme?.typography?.fontFamily || 'inter'),
    } as React.CSSProperties
  } catch (err) {
    console.error(err)
    return {}
  }
}
