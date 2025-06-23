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
              type: 'collapsible',
              fields: [
                {
                  type: 'row',
                  fields: [
                    colorPicker({
                      name: 'colorPrimary',
                      defaultValue: '#a855f7',
                      label: 'Primary (Semantic)',
                      path: '../src/components/theme/simple-color-input',
                    }),
                    colorPicker({
                      name: 'textOnPrimary',
                      defaultValue: '#ffffff',
                      label: 'Text on Primary',
                      path: '../src/components/theme/simple-color-input',
                    }),
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    colorPicker({
                      name: 'colorSecondary',
                      defaultValue: '#0ea5e9',
                      label: 'Secondary (Semantic)',
                      path: '../src/components/theme/simple-color-input',
                    }),
                    colorPicker({
                      name: 'textOnSecondary',
                      defaultValue: '#ffffff',
                      label: 'Text on Secondary',
                      path: '../src/components/theme/simple-color-input',
                    }),
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    colorPicker({
                      name: 'cardBackground',
                      defaultValue: '#faf5ff',
                      label: 'Card Background',
                      path: '../src/components/theme/simple-color-input',
                    }),
                    colorPicker({
                      name: 'textOnCard',
                      defaultValue: '#3b0764',
                      label: 'Text on Card',
                      path: '../src/components/theme/simple-color-input',
                    }),
                  ],
                },
                {
                  type: 'row',
                  fields: [
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
                },
              ],
              label: 'Website Colors',
            },
          ],
          label: 'Website Colors',
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
                  ],
                  label: 'Font Families',
                },
                {
                  name: 'direction',
                  type: 'select',
                  defaultValue: 'auto',
                  label: 'Language Direction',
                  options: [
                    { label: 'Auto (based on font)', value: 'auto' },
                    { label: 'Left to Right', value: 'ltr' },
                    { label: 'Right to Left', value: 'rtl' },
                  ],
                },
                {
                  type: 'collapsible',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'h1',
                          type: 'group',
                          admin: {
                            description: 'Heading 1 typography settings',
                            width: '50%',
                          },
                          fields: [
                            {
                              name: 'fontSize',
                              type: 'text',
                              admin: {
                                description: 'Font size for H1',
                              },
                              defaultValue: '2.25rem',
                              label: 'Font Size',
                            },
                            {
                              name: 'lineHeight',
                              type: 'text',
                              admin: {
                                description: 'Line height for H1',
                              },
                              defaultValue: '2.5rem',
                              label: 'Line Height',
                            },
                          ],
                          label: 'H1',
                        },
                        {
                          name: 'h2',
                          type: 'group',
                          admin: {
                            description: 'Heading 2 typography settings',
                            width: '50%',
                          },
                          fields: [
                            {
                              name: 'fontSize',
                              type: 'text',
                              admin: {
                                description: 'Font size for H2',
                              },
                              defaultValue: '1.875rem',
                              label: 'Font Size',
                            },
                            {
                              name: 'lineHeight',
                              type: 'text',
                              admin: {
                                description: 'Line height for H2',
                              },
                              defaultValue: '2.25rem',
                              label: 'Line Height',
                            },
                          ],
                          label: 'H2',
                        },
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'h3',
                          type: 'group',
                          admin: {
                            description: 'Heading 3 typography settings',
                            width: '50%',
                          },
                          fields: [
                            {
                              name: 'fontSize',
                              type: 'text',
                              admin: {
                                description: 'Font size for H3',
                              },
                              defaultValue: '1.5rem',
                              label: 'Font Size',
                            },
                            {
                              name: 'lineHeight',
                              type: 'text',
                              admin: {
                                description: 'Line height for H3',
                              },
                              defaultValue: '2rem',
                              label: 'Line Height',
                            },
                          ],
                          label: 'H3',
                        },
                        {
                          name: 'h4',
                          type: 'group',
                          admin: {
                            description: 'Heading 4 typography settings',
                            width: '50%',
                          },
                          fields: [
                            {
                              name: 'fontSize',
                              type: 'text',
                              admin: {
                                description: 'Font size for H4',
                              },
                              defaultValue: '1.25rem',
                              label: 'Font Size',
                            },
                            {
                              name: 'lineHeight',
                              type: 'text',
                              admin: {
                                description: 'Line height for H4',
                              },
                              defaultValue: '1.75rem',
                              label: 'Line Height',
                            },
                          ],
                          label: 'H4',
                        },
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'p',
                          type: 'group',
                          admin: {
                            description: 'Paragraph typography settings',
                            width: '50%',
                          },
                          fields: [
                            {
                              name: 'fontSize',
                              type: 'text',
                              admin: {
                                description: 'Font size for paragraphs',
                              },
                              defaultValue: '1rem',
                              label: 'Font Size',
                            },
                            {
                              name: 'lineHeight',
                              type: 'text',
                              admin: {
                                description: 'Line height for paragraphs',
                              },
                              defaultValue: '1.5rem',
                              label: 'Line Height',
                            },
                          ],
                          label: 'Paragraph',
                        },
                        {
                          name: 'blockquote',
                          type: 'group',
                          admin: {
                            description: 'Blockquote typography settings',
                            width: '50%',
                          },
                          fields: [
                            {
                              name: 'fontSize',
                              type: 'text',
                              admin: {
                                description: 'Font size for blockquotes',
                              },
                              defaultValue: '1.125rem',
                              label: 'Font Size',
                            },
                            {
                              name: 'lineHeight',
                              type: 'text',
                              admin: {
                                description: 'Line height for blockquotes',
                              },
                              defaultValue: '1.75rem',
                              label: 'Line Height',
                            },
                          ],
                          label: 'Blockquote',
                        },
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'table',
                          type: 'group',
                          admin: {
                            description: 'Table typography settings',
                            width: '50%',
                          },
                          fields: [
                            {
                              name: 'fontSize',
                              type: 'text',
                              admin: {
                                description: 'Font size for tables',
                              },
                              defaultValue: '1rem',
                              label: 'Font Size',
                            },
                            {
                              name: 'lineHeight',
                              type: 'text',
                              admin: {
                                description: 'Line height for tables',
                              },
                              defaultValue: '1.5rem',
                              label: 'Line Height',
                            },
                          ],
                          label: 'Table',
                        },
                        {
                          name: 'list',
                          type: 'group',
                          admin: {
                            description: 'List typography settings',
                            width: '50%',
                          },
                          fields: [
                            {
                              name: 'fontSize',
                              type: 'text',
                              admin: {
                                description: 'Font size for lists',
                              },
                              defaultValue: '1rem',
                              label: 'Font Size',
                            },
                            {
                              name: 'lineHeight',
                              type: 'text',
                              admin: {
                                description: 'Line height for lists',
                              },
                              defaultValue: '1.75rem',
                              label: 'Line Height',
                            },
                          ],
                          label: 'List',
                        },
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'inlineCode',
                          type: 'group',
                          admin: {
                            description: 'Inline code typography settings',
                            width: '50%',
                          },
                          fields: [
                            {
                              name: 'fontSize',
                              type: 'text',
                              admin: {
                                description: 'Font size for inline code',
                              },
                              defaultValue: '0.875rem',
                              label: 'Font Size',
                            },
                            {
                              name: 'lineHeight',
                              type: 'text',
                              admin: {
                                description: 'Line height for inline code',
                              },
                              defaultValue: '1.25rem',
                              label: 'Line Height',
                            },
                          ],
                          label: 'Inline Code',
                        },
                        {
                          name: 'lead',
                          type: 'group',
                          admin: {
                            description: 'Lead paragraph typography settings',
                            width: '50%',
                          },
                          fields: [
                            {
                              name: 'fontSize',
                              type: 'text',
                              admin: {
                                description: 'Font size for lead paragraphs',
                              },
                              defaultValue: '1.25rem',
                              label: 'Font Size',
                            },
                            {
                              name: 'lineHeight',
                              type: 'text',
                              admin: {
                                description: 'Line height for lead paragraphs',
                              },
                              defaultValue: '1.75rem',
                              label: 'Line Height',
                            },
                          ],
                          label: 'Lead',
                        },
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'large',
                          type: 'group',
                          admin: {
                            description: 'Large text typography settings',
                            width: '50%',
                          },
                          fields: [
                            {
                              name: 'fontSize',
                              type: 'text',
                              admin: {
                                description: 'Font size for large text',
                              },
                              defaultValue: '1.125rem',
                              label: 'Font Size',
                            },
                            {
                              name: 'lineHeight',
                              type: 'text',
                              admin: {
                                description: 'Line height for large text',
                              },
                              defaultValue: '1.75rem',
                              label: 'Line Height',
                            },
                          ],
                          label: 'Large',
                        },
                        {
                          name: 'small',
                          type: 'group',
                          admin: {
                            description: 'Small text typography settings',
                            width: '50%',
                          },
                          fields: [
                            {
                              name: 'fontSize',
                              type: 'text',
                              admin: {
                                description: 'Font size for small text',
                              },
                              defaultValue: '0.875rem',
                              label: 'Font Size',
                            },
                            {
                              name: 'lineHeight',
                              type: 'text',
                              admin: {
                                description: 'Line height for small text',
                              },
                              defaultValue: '1.25rem',
                              label: 'Line Height',
                            },
                          ],
                          label: 'Small',
                        },
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'muted',
                          type: 'group',
                          admin: {
                            description: 'Muted text typography settings',
                            width: '50%',
                          },
                          fields: [
                            {
                              name: 'fontSize',
                              type: 'text',
                              admin: {
                                description: 'Font size for muted text',
                              },
                              defaultValue: '0.875rem',
                              label: 'Font Size',
                            },
                            {
                              name: 'lineHeight',
                              type: 'text',
                              admin: {
                                description: 'Line height for muted text',
                              },
                              defaultValue: '1.25rem',
                              label: 'Line Height',
                            },
                          ],
                          label: 'Muted',
                        },
                      ],
                    },
                  ],
                  label: 'Typography Elements',
                },
              ],
            },
          ],
          label: 'Typography',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'group',
              fields: [
                {
                  name: 'maxWidth',
                  type: 'number',
                  admin: {
                    description: 'Set the max-width for the main container. (e.g., 1440)',
                  },
                  label: 'Max Width',
                },
              ],
              label: 'Layout',
            },
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
