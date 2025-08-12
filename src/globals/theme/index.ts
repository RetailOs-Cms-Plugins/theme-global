import type { GlobalConfig } from 'payload'

import { revalidateTag } from 'next/cache'

import { colors } from './tabs/colors'
import { layoutAndSpacing } from './tabs/layoutAndSpacing'
import { typography } from './tabs/typography'

export const themeGlobal: GlobalConfig = {
  slug: 'theme',
  admin: {
    livePreview: {
      url: '/design-system',
    },
  },
  fields: [
    {
      type: 'tabs',
      label: 'Theme Configuration',
      tabs: [
        colors,
        typography,
        layoutAndSpacing,
      ],
    },
  ],
  hooks: {
    afterChange: [
      ({ doc, req }) => {
        try {
          revalidateTag('theme-config')
          req.payload.logger.info('Theme updated, cache invalidated')
        } catch (error) {
          req.payload.logger.error('Failed to revalidate theme cache:', error)
        }
      },
    ],
  },
}
