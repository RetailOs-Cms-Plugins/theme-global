import type { GlobalConfig } from 'payload'

import { revalidateTag } from 'next/cache'

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
            {
              type: 'row',
              fields: [
                colorPicker({
                  name: 'primary50',
                  defaultValue: '#faf5ff',
                  label: 'Primary 50',
                  path: '../src/components/theme/simple-color-input',
                }),
                colorPicker({
                  name: 'primary100',
                  defaultValue: '#f3e8ff',
                  label: 'Primary 100',
                  path: '../src/components/theme/simple-color-input',
                }),
                colorPicker({
                  name: 'primary200',
                  defaultValue: '#e9d5ff',
                  label: 'Primary 200',
                  path: '../src/components/theme/simple-color-input',
                }),
                colorPicker({
                  name: 'primary300',
                  defaultValue: '#d8b4fe',
                  label: 'Primary 300',
                  path: '../src/components/theme/simple-color-input',
                }),
                colorPicker({
                  name: 'primary400',
                  defaultValue: '#c084fc',
                  label: 'Primary 400',
                  path: '../src/components/theme/simple-color-input',
                }),
                colorPicker({
                  name: 'primary500',
                  defaultValue: '#a855f7',
                  label: 'Primary 500',
                  path: '../src/components/theme/simple-color-input',
                }),
                colorPicker({
                  name: 'primary600',
                  defaultValue: '#9333ea',
                  label: 'Primary 600',
                  path: '../src/components/theme/simple-color-input',
                }),
                colorPicker({
                  name: 'primary700',
                  defaultValue: '#7e22ce',
                  label: 'Primary 700',
                  path: '../src/components/theme/simple-color-input',
                }),
                colorPicker({
                  name: 'primary800',
                  defaultValue: '#6b21a8',
                  label: 'Primary 800',
                  path: '../src/components/theme/simple-color-input',
                }),
                colorPicker({
                  name: 'primary900',
                  defaultValue: '#581c87',
                  label: 'Primary 900',
                  path: '../src/components/theme/simple-color-input',
                }),
                colorPicker({
                  name: 'primary950',
                  defaultValue: '#3b0764',
                  label: 'Primary 950',
                  path: '../src/components/theme/simple-color-input',
                }),
              ],
            },
            {
              type: 'row',
              fields: [
                colorPicker({
                  name: 'secondary50',
                  defaultValue: '#f0f9ff',
                  label: 'Secondary 50',
                  path: '../src/components/theme/simple-color-input',
                }),
                colorPicker({
                  name: 'secondary100',
                  defaultValue: '#e0f2fe',
                  label: 'Secondary 100',
                  path: '../src/components/theme/simple-color-input',
                }),
                colorPicker({
                  name: 'secondary200',
                  defaultValue: '#bae6fd',
                  label: 'Secondary 200',
                  path: '../src/components/theme/simple-color-input',
                }),
                colorPicker({
                  name: 'secondary300',
                  defaultValue: '#7dd3fc',
                  label: 'Secondary 300',
                  path: '../src/components/theme/simple-color-input',
                }),
                colorPicker({
                  name: 'secondary400',
                  defaultValue: '#38bdf8',
                  label: 'Secondary 400',
                  path: '../src/components/theme/simple-color-input',
                }),
                colorPicker({
                  name: 'secondary500',
                  defaultValue: '#0ea5e9',
                  label: 'Secondary 500',
                  path: '../src/components/theme/simple-color-input',
                }),
                colorPicker({
                  name: 'secondary600',
                  defaultValue: '#0284c7',
                  label: 'Secondary 600',
                  path: '../src/components/theme/simple-color-input',
                }),
                colorPicker({
                  name: 'secondary700',
                  defaultValue: '#0369a1',
                  label: 'Secondary 700',
                  path: '../src/components/theme/simple-color-input',
                }),
                colorPicker({
                  name: 'secondary800',
                  defaultValue: '#075985',
                  label: 'Secondary 800',
                  path: '../src/components/theme/simple-color-input',
                }),
                colorPicker({
                  name: 'secondary900',
                  defaultValue: '#0c4a6e',
                  label: 'Secondary 900',
                  path: '../src/components/theme/simple-color-input',
                }),
                colorPicker({
                  name: 'secondary950',
                  defaultValue: '#082f49',
                  label: 'Secondary 950',
                  path: '../src/components/theme/simple-color-input',
                }),
              ],
            },
          ],
          label: 'Primitive Colors',
        },
        {
          fields: [
            colorPicker({
              name: 'colorPrimary',
              defaultValue: 'var(--primary-200)',
              label: 'Primary (Semantic)',
              path: '../src/components/theme/simple-color-input',
            }),
            colorPicker({
              name: 'textOnPrimary',
              defaultValue: '#ffffff',
              label: 'Text on Primary',
              path: '../src/components/theme/simple-color-input',
            }),
            colorPicker({
              name: 'colorSecondary',
              defaultValue: 'var(--secondary-400)',
              label: 'Secondary (Semantic)',
              path: '../src/components/theme/simple-color-input',
            }),
            colorPicker({
              name: 'textOnSecondary',
              defaultValue: 'var(--secondary-950)',
              label: 'Text on Secondary',
              path: '../src/components/theme/simple-color-input',
            }),
            colorPicker({
              name: 'cardBackground',
              defaultValue: 'var(--primary-50)',
              label: 'Card Background',
              path: '../src/components/theme/simple-color-input',
            }),
            colorPicker({
              name: 'textOnCard',
              defaultValue: 'var(--primary-950)',
              label: 'Text on Card',
              path: '../src/components/theme/simple-color-input',
            }),
            colorPicker({
              name: 'pageBackground',
              defaultValue: '#ffffff',
              label: 'Page Background',
              path: '../src/components/theme/simple-color-input',
            }),
            colorPicker({
              name: 'textOnPage',
              defaultValue: '#000000',
              label: 'Text on Page',
              path: '../src/components/theme/simple-color-input',
            }),
          ],
          label: 'Semantic Colors',
        },
        {
          fields: [
            {
              type: 'row',
              fields: [
                colorPicker({
                  name: 'background',
                  admin: {
                    description: 'Main background color (HSL format: h s% l%)',
                    width: '50%',
                  },
                  defaultValue: '#000',
                  label: 'Background',
                  path: '../src/components/theme/simple-color-input',
                  required: true,
                }),
                colorPicker({
                  name: 'foreground',
                  admin: {
                    description: 'Main text color (HSL format: h s% l%)',
                    width: '50%',
                  },
                  defaultValue: '#000',
                  label: 'Foreground',
                  path: '../src/components/theme/simple-color-input',
                  required: true,
                }),
              ],
            },
            {
              type: 'row',
              fields: [
                colorPicker({
                  name: 'basePrimary',
                  admin: {
                    description: 'Primary brand color (HSL format: h s% l%)',
                    width: '50%',
                  },
                  defaultValue: '#000',
                  label: 'Primary',
                  path: '../src/components/theme/simple-color-input',
                  required: true,
                }),
                colorPicker({
                  name: 'basePrimaryForeground',
                  admin: {
                    description: 'Text color for primary backgrounds',
                    width: '50%',
                  },
                  defaultValue: '#000',
                  label: 'Primary Foreground',
                  path: '../src/components/theme/simple-color-input',
                }),
              ],
            },
            {
              type: 'row',
              fields: [
                colorPicker({
                  name: 'baseSecondary',
                  admin: {
                    description: 'Secondary brand color (HSL format: h s% l%)',
                    width: '50%',
                  },
                  defaultValue: '#000',
                  label: 'Secondary',
                  path: '../src/components/theme/simple-color-input',
                }),
                colorPicker({
                  name: 'baseSecondaryForeground',
                  admin: {
                    description: 'Text color for secondary backgrounds',
                    width: '50%',
                  },
                  defaultValue: '#000',
                  label: 'Secondary Foreground',
                  path: '../src/components/theme/simple-color-input',
                }),
              ],
            },
            {
              type: 'row',
              fields: [
                colorPicker({
                  name: 'accent',
                  admin: {
                    description: 'Accent color for highlights (HSL format: h s% l%)',
                    width: '50%',
                  },
                  defaultValue: '#000',
                  label: 'Accent',
                  path: '../src/components/theme/simple-color-input',
                }),
                colorPicker({
                  name: 'accentForeground',
                  admin: {
                    description: 'Text color for accent backgrounds',
                    width: '50%',
                  },
                  defaultValue: '#000',
                  label: 'Accent Foreground',
                  path: '../src/components/theme/simple-color-input',
                }),
              ],
            },
            {
              type: 'collapsible',
              fields: [
                {
                  type: 'row',
                  fields: [
                    colorPicker({
                      name: 'border',
                      admin: {
                        description: 'Default border color (HSL format: h s% l%)',
                        width: '33%',
                      },
                      defaultValue: '#000',
                      label: 'Border',
                      path: '../src/components/theme/simple-color-input',
                    }),
                    colorPicker({
                      name: 'input',
                      admin: {
                        description: 'Input field background color',
                        width: '33%',
                      },
                      defaultValue: '#000',
                      label: 'Input',
                      path: '../src/components/theme/simple-color-input',
                    }),
                  ],
                },
                {
                  name: 'radius',
                  type: 'text',
                  admin: {
                    description: 'Border radius value (e.g., 0.5rem, 8px)',
                  },
                  defaultValue: '0.5rem',
                  label: 'Border Radius',
                },
              ],
              label: 'Interface Elements',
            },
          ],
          label: 'Base Colors',
        },
        {
          fields: [
            {
              type: 'row',
              fields: [
                colorPicker({
                  name: 'colorBodyBg',
                  admin: {
                    description: 'Body background color (HSL format: h s% l%)',
                    width: '50%',
                  },
                  defaultValue: '#000',
                  label: 'Body Background',
                  path: '../src/components/theme/simple-color-input',
                }),
                colorPicker({
                  name: 'colorSurface',
                  admin: {
                    description: 'Surface/container background color',
                    width: '50%',
                  },
                  defaultValue: '#000',
                  label: 'Surface',
                  path: '../src/components/theme/simple-color-input',
                }),
              ],
            },
            {
              type: 'row',
              fields: [
                colorPicker({
                  name: 'additionalCardBg',
                  admin: {
                    description: 'Card background color',
                    width: '50%',
                  },
                  defaultValue: '#000',
                  label: 'Card Background',
                  path: '../src/components/theme/simple-color-input',
                }),
                colorPicker({
                  name: 'colorSectionAlt',
                  admin: {
                    description: 'Alternate section background color',
                    width: '50%',
                  },
                  defaultValue: '#000',
                  label: 'Section Alt',
                  path: '../src/components/theme/simple-color-input',
                }),
              ],
            },
            {
              type: 'collapsible',
              fields: [
                {
                  type: 'row',
                  fields: [
                    colorPicker({
                      name: 'colorTextBody',
                      admin: {
                        description: 'Body text color',
                        width: '50%',
                      },
                      defaultValue: '#000',
                      label: 'Body Text',
                      path: '../src/components/theme/simple-color-input',
                    }),
                    colorPicker({
                      name: 'colorTextHeading',
                      admin: {
                        description: 'Heading text color',
                        width: '50%',
                      },
                      defaultValue: '#000',
                      label: 'Heading Text',
                      path: '../src/components/theme/simple-color-input',
                    }),
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    colorPicker({
                      name: 'colorTextMuted',
                      admin: {
                        description: 'Muted text color',
                        width: '33%',
                      },
                      defaultValue: '#000',
                      label: 'Muted Text',
                      path: '../src/components/theme/simple-color-input',
                    }),
                    colorPicker({
                      name: 'colorTextInverse',
                      admin: {
                        description: 'Inverse text color (for dark backgrounds)',
                        width: '33%',
                      },
                      defaultValue: '#000',
                      label: 'Inverse Text',
                      path: '../src/components/theme/simple-color-input',
                    }),
                    colorPicker({
                      name: 'colorTextLink',
                      admin: {
                        description: 'Link text color',
                        width: '34%',
                      },
                      defaultValue: '#000',
                      label: 'Link Text',
                      path: '../src/components/theme/simple-color-input',
                    }),
                  ],
                },
              ],
              label: 'Text Colors',
            },
            colorPicker({
              name: 'colorBorderMuted',
              admin: {
                description: 'Muted border color (HSL format: h s% l%)',
              },
              defaultValue: '#000',
              label: 'Border Muted',
              path: '../src/components/theme/simple-color-input',
            }),
          ],
          label: 'Additional Colors',
        },
        {
          fields: [
            {
              name: 'typography',
              type: 'group',
              fields: [
                {
                  type: 'collapsible',
                  fields: [
                    {
                      name: 'fontBody',
                      type: 'select',
                      admin: {
                        description: 'Font family for body text',
                      },
                      defaultValue: 'inter',
                      label: 'Body Font',
                      options: [
                        // Hebrew Fonts
                        { label: 'Asimon Hebrew', value: 'asimon-hebrew' },
                        { label: 'Frank Ruhl Libre (Google)', value: 'frank-ruhl-libre' },
                        { label: 'Noto Sans Hebrew (Google)', value: 'noto-sans-hebrew' },
                        { label: 'Noto Serif Hebrew (Google)', value: 'noto-serif-hebrew' },
                        { label: 'Noto Rashi Hebrew (Google)', value: 'noto-rashi-hebrew' },
                        { label: 'Heebo (Google)', value: 'heebo' },
                        { label: 'Rubik (Google)', value: 'rubik' },
                        { label: 'Assistant (Google)', value: 'assistant' },
                        { label: 'Secular One (Google)', value: 'secular-one' },
                        { label: 'Suez One (Google)', value: 'suez-one' },
                        { label: 'Alef (Google)', value: 'alef' },
                        { label: 'Miriam Libre (Google)', value: 'miriam-libre' },

                        // English Fonts
                        { label: 'Inter (Google)', value: 'inter' },
                        { label: 'Manrope (Google)', value: 'manrope' },
                        { label: 'DM Sans (Google)', value: 'dm-sans' },
                        { label: 'Nunito (Google)', value: 'nunito' },
                        { label: 'Epilogue (Google)', value: 'epilogue' },
                        { label: 'Mulish (Google)', value: 'mulish' },
                        { label: 'Lexend (Google)', value: 'lexend' },
                        { label: 'Public Sans (Google)', value: 'public-sans' },
                        { label: 'Jost (Google)', value: 'jost' },
                        { label: 'Sora (Google)', value: 'sora' },
                        { label: 'Poppins (Google)', value: 'poppins' },
                      ],
                    },
                    {
                      name: 'fontHeading',
                      type: 'select',
                      admin: {
                        description: 'Font family for headings',
                      },
                      defaultValue: 'poppins',
                      label: 'Heading Font',
                      options: [
                        // Hebrew Fonts
                        { label: 'Asimon Hebrew', value: 'asimon-hebrew' },
                        { label: 'Frank Ruhl Libre (Google)', value: 'frank-ruhl-libre' },
                        { label: 'Noto Sans Hebrew (Google)', value: 'noto-sans-hebrew' },
                        { label: 'Noto Serif Hebrew (Google)', value: 'noto-serif-hebrew' },
                        { label: 'Noto Rashi Hebrew (Google)', value: 'noto-rashi-hebrew' },
                        { label: 'Heebo (Google)', value: 'heebo' },
                        { label: 'Rubik (Google)', value: 'rubik' },
                        { label: 'Assistant (Google)', value: 'assistant' },
                        { label: 'Secular One (Google)', value: 'secular-one' },
                        { label: 'Suez One (Google)', value: 'suez-one' },
                        { label: 'Alef (Google)', value: 'alef' },
                        { label: 'Miriam Libre (Google)', value: 'miriam-libre' },

                        // English Fonts
                        { label: 'Inter (Google)', value: 'inter' },
                        { label: 'Manrope (Google)', value: 'manrope' },
                        { label: 'DM Sans (Google)', value: 'dm-sans' },
                        { label: 'Nunito (Google)', value: 'nunito' },
                        { label: 'Epilogue (Google)', value: 'epilogue' },
                        { label: 'Mulish (Google)', value: 'mulish' },
                        { label: 'Lexend (Google)', value: 'lexend' },
                        { label: 'Public Sans (Google)', value: 'public-sans' },
                        { label: 'Jost (Google)', value: 'jost' },
                        { label: 'Sora (Google)', value: 'sora' },
                        { label: 'Poppins (Google)', value: 'poppins' },
                      ],
                    },
                    {
                      name: 'fontMono',
                      type: 'select',
                      admin: {
                        description: 'Font family for monospace text (code)',
                      },
                      defaultValue: 'fira-code',
                      label: 'Monospace Font',
                      options: [
                        { label: 'Fira Code (Google)', value: 'fira-code' },
                        { label: 'JetBrains Mono (Google)', value: 'jetbrains-mono' },
                        { label: 'Source Code Pro (Google)', value: 'source-code-pro' },
                        { label: 'IBM Plex Mono (Google)', value: 'ibm-plex-mono' },
                        { label: 'Roboto Mono (Google)', value: 'roboto-mono' },
                      ],
                    },
                  ],
                  label: 'Font Families',
                },
                {
                  type: 'collapsible',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'textXs',
                          type: 'text',
                          admin: {
                            description: 'Extra small text size',
                            width: '25%',
                          },
                          defaultValue: '0.75rem',
                          label: 'XS',
                        },
                        {
                          name: 'textSm',
                          type: 'text',
                          admin: {
                            description: 'Small text size',
                            width: '25%',
                          },
                          defaultValue: '0.875rem',
                          label: 'SM',
                        },
                        {
                          name: 'textBase',
                          type: 'text',
                          admin: {
                            description: 'Base text size',
                            width: '25%',
                          },
                          defaultValue: '1rem',
                          label: 'Base',
                        },
                        {
                          name: 'textLg',
                          type: 'text',
                          admin: {
                            description: 'Large text size',
                            width: '25%',
                          },
                          defaultValue: '1.125rem',
                          label: 'LG',
                        },
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'textXl',
                          type: 'text',
                          admin: {
                            description: 'Extra large text size',
                            width: '25%',
                          },
                          defaultValue: '1.25rem',
                          label: 'XL',
                        },
                        {
                          name: 'text2xl',
                          type: 'text',
                          admin: {
                            description: '2X large text size',
                            width: '25%',
                          },
                          defaultValue: '1.5rem',
                          label: '2XL',
                        },
                        {
                          name: 'text3xl',
                          type: 'text',
                          admin: {
                            description: '3X large text size',
                            width: '25%',
                          },
                          defaultValue: '1.875rem',
                          label: '3XL',
                        },
                        {
                          name: 'text4xl',
                          type: 'text',
                          admin: {
                            description: '4X large text size',
                            width: '25%',
                          },
                          defaultValue: '2.25rem',
                          label: '4XL',
                        },
                      ],
                    },
                  ],
                  label: 'Text Sizes',
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
              ],
            },
          ],
          label: 'Typography',
        },
        {
          fields: [
            {
              name: 'spacing',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'spacingXs',
                      type: 'text',
                      admin: {
                        description: 'Extra small spacing',
                        width: '20%',
                      },
                      defaultValue: '0.25rem',
                      label: 'XS',
                    },
                    {
                      name: 'spacingSm',
                      type: 'text',
                      admin: {
                        description: 'Small spacing',
                        width: '20%',
                      },
                      defaultValue: '0.5rem',
                      label: 'SM',
                    },
                    {
                      name: 'spacingMd',
                      type: 'text',
                      admin: {
                        description: 'Medium spacing',
                        width: '20%',
                      },
                      defaultValue: '1rem',
                      label: 'MD',
                    },
                    {
                      name: 'spacingLg',
                      type: 'text',
                      admin: {
                        description: 'Large spacing',
                        width: '20%',
                      },
                      defaultValue: '2rem',
                      label: 'LG',
                    },
                    {
                      name: 'spacingXl',
                      type: 'text',
                      admin: {
                        description: 'Extra large spacing',
                        width: '20%',
                      },
                      defaultValue: '4rem',
                      label: 'XL',
                    },
                  ],
                },
              ],
              label: 'Spacing Scale',
            },
          ],
          label: 'Layout & Spacing',
        },
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
