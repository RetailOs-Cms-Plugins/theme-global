import type { GlobalConfig, TextField } from 'payload'

import colorPicker from '../../fields/color-picker'

export const themeGlobal: GlobalConfig = {
  slug: 'theme',
  fields: [
    {
      type: 'tabs',
      label: 'Theme Configuration',
      tabs: [
        {
          fields: [
            colorPicker({
              name: 'primaryColor',
              admin: {
                description: 'The primary brand color used throughout the theme',
                width: '50%',
              },
              defaultValue: '#3b82f6',
              label: 'Primary Color',
              path: '../src/components/theme/simple-color-input',
              required: true,
            }),
            colorPicker({
              name: 'secondaryColor',
              admin: {
                description: 'The secondary brand color for accents and highlights',
                width: '50%',
              },
              defaultValue: '#64748b',
              label: 'Secondary Color',
              path: '../src/components/theme/simple-color-input',
            }),
          ],
          label: 'Colors',
        },
        {
          fields: [
            {
              name: 'typography',
              type: 'group',
              fields: [
                {
                  name: 'fontFamily',
                  type: 'select',
                  admin: {
                    description: 'Choose a font that supports your content language',
                  },
                  defaultValue: 'inter',
                  label: 'Font Family',
                  options: [
                    // Hebrew Fonts
                    { label: 'Asimon Hebrew (Local)', value: 'asimon-hebrew' },
                    { label: 'Frank Ruhl Libre (Google)', value: 'frank-ruhl-libre' },
                    { label: 'Noto Sans Hebrew (Google)', value: 'noto-sans-hebrew' },
                    // English Fonts
                    { label: 'Inter (Google)', value: 'inter' },
                  ],
                },
                {
                  name: 'direction',
                  type: 'select',
                  defaultValue: 'auto',
                  label: 'Text Direction',
                  options: [
                    { label: 'Auto (based on font)', value: 'auto' },
                    { label: 'Left to Right', value: 'ltr' },
                    { label: 'Right to Left', value: 'rtl' },
                  ],
                },
                {
                  name: 'fontSize',
                  type: 'group',
                  fields: [
                    {
                      name: 'base',
                      type: 'text',
                      defaultValue: '16px',
                      label: 'Base Size',
                    },
                    // ... heading sizes
                  ],
                  label: 'Font Sizes',
                },
              ],
            },
          ],
          label: 'Typography',
        },
      ],
    },
  ],
  // hooks: {
  //   afterChange: [
  //     async ({ doc, req }) => {
  //       try {
  //         revalidateTag('theme')
  //         req.payload.logger.info('Theme updated, cache invalidated')
  //       } catch (error) {
  //         req.payload.logger.error('Failed to revalidate theme cache:', error)
  //       }
  //     },
  //   ],
  // },
}
