// 'use server'
// import type * as React from 'react'

// import config from '@payload-config'
// import { unstable_cache as cache } from 'next/cache'
// import { getPayload } from 'payload'

// import type { ThemeData } from '../../../src/types/theme.types'

// import { generateColorScale } from '../../../src/utils/color-palette/color-palette'
// import { generateFontCSS, generateFontVariables } from '../../../src/utils/typography/font-loader'

// // Cache the raw theme data with longer TTL
// const cachedRawTheme = cache(
//   async () => {
//     console.log('🔄 Fetching theme from database...')
//     const payload = await getPayload({ config })
//     const theme = await payload.findGlobal({ slug: 'theme-config' })
//     console.log('✅ Theme fetched from database')
//     return theme
//   },
//   ['raw-theme-config'],
//   {
//     revalidate: 300, // 5 minutes cache
//     tags: ['theme-config'],
//   },
// )

// // Cache the processed theme data (the expensive part)
// const cachedProcessedTheme = cache(
//   async () => {
//     console.log('🎨 Processing theme data...')
//     const rawTheme = await cachedRawTheme()

//     const themeData: ThemeData = {
//       primaryColor: rawTheme?.primaryColor || '#3b82f6',
//       secondaryColor: rawTheme?.secondaryColor || '#64748b',
//       typography: {
//         fontFamily: rawTheme?.typography?.fontFamily || 'inter',
//       },
//     }

//     const result = {
//       cssVariables: {
//         ...generateColorScale(themeData.primaryColor, 'primary'),
//         ...generateColorScale(themeData.secondaryColor, 'secondary'),
//         ...generateFontVariables(themeData.typography.fontFamily),
//       },
//       fontCSS: generateFontCSS(themeData.typography.fontFamily),
//       themeData,
//     }

//     console.log('✅ Theme processed and cached')
//     return result
//   },
//   ['processed-theme-config'],
//   {
//     revalidate: 600, // 10 minutes cache (longer since processing is expensive)
//     tags: ['theme-config', 'processed-theme'],
//   },
// )

// export async function getTheme(): Promise<{
//   cssVariables: React.CSSProperties
//   fontCSS: string
//   themeData: ThemeData
// }> {
//   try {
//     console.log('🚀 Getting theme (cached)...')
//     return await cachedProcessedTheme()
//   } catch (err) {
//     console.error('❌ Error loading theme:', err)
//     return {
//       cssVariables: {},
//       fontCSS: '',
//       themeData: {
//         primaryColor: '#3b82f6',
//         secondaryColor: '#64748b',
//         typography: { fontFamily: 'inter' },
//       },
//     }
//   }
// }

// // Function to invalidate cache when theme is updated
// export async function invalidateThemeCache(): Promise<void> {
//   const { revalidateTag } = await import('next/cache')
//   revalidateTag('theme-config')
//   revalidateTag('processed-theme')
//   console.log('🔄 Theme cache invalidated')
// }

// // Function to manually refresh theme (useful for admin actions)
// export async function refreshTheme(): Promise<void> {
//   await invalidateThemeCache()
//   // Pre-warm the cache
//   await getTheme()
//   console.log('🔥 Theme cache refreshed')
// }

'use server'
import config from '@payload-config' // This exists in the consuming project
import { unstable_cache as cache } from 'next/cache'
import { getPayload } from 'payload'

import { getThemeFromPayload } from '../../../src/utils/theme-utilities'

// Import the plugin utility

// Create a cached version
const cachedTheme = cache(
  async () => {
    // Get the project's Payload instance
    const payload = await getPayload({ config })

    // Create utilities with the project's payload instance
    const themeUtils = await getThemeFromPayload(payload, 'theme-config')

    return themeUtils
  },
  ['theme-data'],
  { revalidate: 600, tags: ['theme-config'] },
)

export const getTheme = cachedTheme
