import type { GlobalConfig } from 'payload'

import { revalidateTag } from 'next/cache'

import colorPicker from '../../fields/color-picker'
import ThemeConfigEditView from './Component'

export const themeGlobal: GlobalConfig = {
  slug: 'theme',
  admin: {
    components: {
      views: {
        edit: { component: ThemeConfigEditView as any },
      },
    },
    livePreview: {
      url: '/design-system',
    },
  },
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
                        { label: 'Alef (Google)', value: 'alef' },
                        { label: 'Almoni Tzar Bold', value: 'almoni-tzar-bold' },
                        { label: 'Asimon Hebrew', value: 'asimon-hebrew' },
                        { label: 'Assistant (Google)', value: 'assistant' },
                        { label: 'Frank Ruhl Libre (Google)', value: 'frank-ruhl-libre' },
                        { label: 'Heebo (Google)', value: 'heebo' },
                        { label: 'Miriam Libre (Google)', value: 'miriam-libre' },
                        { label: 'Noto Rashi Hebrew (Google)', value: 'noto-rashi-hebrew' },
                        { label: 'Noto Sans Hebrew (Google)', value: 'noto-sans-hebrew' },
                        { label: 'Noto Serif Hebrew (Google)', value: 'noto-serif-hebrew' },
                        { label: 'Ploni Regular', value: 'ploni-regular' },
                        { label: 'Rubik (Google)', value: 'rubik' },
                        { label: 'Secular One (Google)', value: 'secular-one' },
                        { label: 'Suez One (Google)', value: 'suez-one' },

                        // English Fonts
                        { label: 'DM Sans (Google)', value: 'dm-sans' },
                        { label: 'Epilogue (Google)', value: 'epilogue' },
                        { label: 'Inter (Google)', value: 'inter' },
                        { label: 'Jost (Google)', value: 'jost' },
                        { label: 'Lexend (Google)', value: 'lexend' },
                        { label: 'Manrope (Google)', value: 'manrope' },
                        { label: 'Mulish (Google)', value: 'mulish' },
                        { label: 'Nunito (Google)', value: 'nunito' },
                        { label: 'Poppins (Google)', value: 'poppins' },
                        { label: 'Public Sans (Google)', value: 'public-sans' },
                        { label: 'Sora (Google)', value: 'sora' },
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
                        { label: 'Alef (Google)', value: 'alef' },
                        { label: 'Almoni Tzar Bold', value: 'almoni-tzar-bold' },
                        { label: 'Asimon Hebrew', value: 'asimon-hebrew' },
                        { label: 'Assistant (Google)', value: 'assistant' },
                        { label: 'Frank Ruhl Libre (Google)', value: 'frank-ruhl-libre' },
                        { label: 'Heebo (Google)', value: 'heebo' },
                        { label: 'Miriam Libre (Google)', value: 'miriam-libre' },
                        { label: 'Noto Rashi Hebrew (Google)', value: 'noto-rashi-hebrew' },
                        { label: 'Noto Sans Hebrew (Google)', value: 'noto-sans-hebrew' },
                        { label: 'Noto Serif Hebrew (Google)', value: 'noto-serif-hebrew' },
                        { label: 'Ploni Regular', value: 'ploni-regular' },
                        { label: 'Rubik (Google)', value: 'rubik' },
                        { label: 'Secular One (Google)', value: 'secular-one' },
                        { label: 'Suez One (Google)', value: 'suez-one' },

                        // English Fonts
                        { label: 'DM Sans (Google)', value: 'dm-sans' },
                        { label: 'Epilogue (Google)', value: 'epilogue' },
                        { label: 'Inter (Google)', value: 'inter' },
                        { label: 'Jost (Google)', value: 'jost' },
                        { label: 'Lexend (Google)', value: 'lexend' },
                        { label: 'Manrope (Google)', value: 'manrope' },
                        { label: 'Mulish (Google)', value: 'mulish' },
                        { label: 'Nunito (Google)', value: 'nunito' },
                        { label: 'Poppins (Google)', value: 'poppins' },
                        { label: 'Public Sans (Google)', value: 'public-sans' },
                        { label: 'Sora (Google)', value: 'sora' },
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
                      name: 'h1',
                      type: 'group',
                      fields: [
                        {
                          name: 'fontSize',
                          type: 'group',
                          fields: [
                            {
                              type: 'row',
                              fields: [
                                {
                                  name: 'largeDesktop',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '5rem',
                                  label: 'Large Desktop',
                                },
                                {
                                  name: 'desktop',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '4rem',
                                  label: 'Desktop',
                                },
                                {
                                  name: 'tablet',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '3rem',
                                  label: 'Tablet',
                                },
                                {
                                  name: 'mobile',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '2rem',
                                  label: 'Mobile',
                                },
                              ],
                            },
                          ],
                          label: 'Font Size',
                        },
                        {
                          name: 'lineHeight',
                          type: 'group',
                          fields: [
                            {
                              type: 'row',
                              fields: [
                                {
                                  name: 'largeDesktop',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '1.2',
                                  label: 'Large Desktop',
                                },
                                {
                                  name: 'desktop',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '1.2',
                                  label: 'Desktop',
                                },
                                {
                                  name: 'tablet',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '1.2',
                                  label: 'Tablet',
                                },
                                {
                                  name: 'mobile',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '1.1',
                                  label: 'Mobile',
                                },
                              ],
                            },
                          ],
                          label: 'Line Height',
                        },
                      ],
                      label: 'H1',
                    },
                    {
                      name: 'h2',
                      type: 'group',
                      fields: [
                        {
                          name: 'fontSize',
                          type: 'group',
                          fields: [
                            {
                              type: 'row',
                              fields: [
                                {
                                  name: 'largeDesktop',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '4rem',
                                  label: 'Large Desktop',
                                },
                                {
                                  name: 'desktop',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '3rem',
                                  label: 'Desktop',
                                },
                                {
                                  name: 'tablet',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '2.5rem',
                                  label: 'Tablet',
                                },
                                {
                                  name: 'mobile',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '2rem',
                                  label: 'Mobile',
                                },
                              ],
                            },
                          ],
                          label: 'Font Size',
                        },
                        {
                          name: 'lineHeight',
                          type: 'group',
                          fields: [
                            {
                              type: 'row',
                              fields: [
                                {
                                  name: 'largeDesktop',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '1.2',
                                  label: 'Large Desktop',
                                },
                                {
                                  name: 'desktop',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '1.2',
                                  label: 'Desktop',
                                },
                                {
                                  name: 'tablet',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '1.2',
                                  label: 'Tablet',
                                },
                                {
                                  name: 'mobile',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '1.1',
                                  label: 'Mobile',
                                },
                              ],
                            },
                          ],
                          label: 'Line Height',
                        },
                      ],
                      label: 'H2',
                    },
                    {
                      name: 'h3',
                      type: 'group',
                      fields: [
                        {
                          name: 'fontSize',
                          type: 'group',
                          fields: [
                            {
                              type: 'row',
                              fields: [
                                {
                                  name: 'largeDesktop',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '3rem',
                                  label: 'Large Desktop',
                                },
                                {
                                  name: 'desktop',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '2.5rem',
                                  label: 'Desktop',
                                },
                                {
                                  name: 'tablet',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '2rem',
                                  label: 'Tablet',
                                },
                                {
                                  name: 'mobile',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '1.5rem',
                                  label: 'Mobile',
                                },
                              ],
                            },
                          ],
                          label: 'Font Size',
                        },
                        {
                          name: 'lineHeight',
                          type: 'group',
                          fields: [
                            {
                              type: 'row',
                              fields: [
                                {
                                  name: 'largeDesktop',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '1.2',
                                  label: 'Large Desktop',
                                },
                                {
                                  name: 'desktop',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '1.2',
                                  label: 'Desktop',
                                },
                                {
                                  name: 'tablet',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '1.2',
                                  label: 'Tablet',
                                },
                                {
                                  name: 'mobile',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '1.1',
                                  label: 'Mobile',
                                },
                              ],
                            },
                          ],
                          label: 'Line Height',
                        },
                      ],
                      label: 'H3',
                    },
                    {
                      name: 'h4',
                      type: 'group',
                      fields: [
                        {
                          name: 'fontSize',
                          type: 'group',
                          fields: [
                            {
                              type: 'row',
                              fields: [
                                {
                                  name: 'largeDesktop',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '2.5rem',
                                  label: 'Large Desktop',
                                },
                                {
                                  name: 'desktop',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '2rem',
                                  label: 'Desktop',
                                },
                                {
                                  name: 'tablet',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '1.5rem',
                                  label: 'Tablet',
                                },
                                {
                                  name: 'mobile',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '1.2rem',
                                  label: 'Mobile',
                                },
                              ],
                            },
                          ],
                          label: 'Font Size',
                        },
                        {
                          name: 'lineHeight',
                          type: 'group',
                          fields: [
                            {
                              type: 'row',
                              fields: [
                                {
                                  name: 'largeDesktop',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '1.2',
                                  label: 'Large Desktop',
                                },
                                {
                                  name: 'desktop',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '1.2',
                                  label: 'Desktop',
                                },
                                {
                                  name: 'tablet',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '1.2',
                                  label: 'Tablet',
                                },
                                {
                                  name: 'mobile',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '1.1',
                                  label: 'Mobile',
                                },
                              ],
                            },
                          ],
                          label: 'Line Height',
                        },
                      ],
                      label: 'H4',
                    },
                    {
                      name: 'p',
                      type: 'group',
                      fields: [
                        {
                          name: 'fontSize',
                          type: 'group',
                          fields: [
                            {
                              type: 'row',
                              fields: [
                                {
                                  name: 'largeDesktop',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '1.5rem',
                                  label: 'Large Desktop',
                                },
                                {
                                  name: 'desktop',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '1.25rem',
                                  label: 'Desktop',
                                },
                                {
                                  name: 'tablet',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '1rem',
                                  label: 'Tablet',
                                },
                                {
                                  name: 'mobile',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '0.9rem',
                                  label: 'Mobile',
                                },
                              ],
                            },
                          ],
                          label: 'Font Size',
                        },
                        {
                          name: 'lineHeight',
                          type: 'group',
                          fields: [
                            {
                              type: 'row',
                              fields: [
                                {
                                  name: 'largeDesktop',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '1.5',
                                  label: 'Large Desktop',
                                },
                                {
                                  name: 'desktop',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '1.5',
                                  label: 'Desktop',
                                },
                                {
                                  name: 'tablet',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '1.4',
                                  label: 'Tablet',
                                },
                                {
                                  name: 'mobile',
                                  type: 'text',
                                  admin: { width: '25%' },
                                  defaultValue: '1.3',
                                  label: 'Mobile',
                                },
                              ],
                            },
                          ],
                          label: 'Line Height',
                        },
                      ],
                      label: 'Paragraph',
                    },
                    {
                      type: 'row',
                      fields: [
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
                    description: 'Set the max-width for the main container. (e.g., 1360)',
                  },
                  defaultValue: 1360,
                  label: 'Max Width',
                },
                {
                  name: 'breakpoints',
                  type: 'group',
                  fields: [
                    { name: 'mobile', type: 'number', defaultValue: 640, label: 'Mobile' },
                    { name: 'tablet', type: 'number', defaultValue: 768, label: 'Tablet' },
                    { name: 'desktop', type: 'number', defaultValue: 1024, label: 'Desktop' },
                    {
                      name: 'largeDesktop',
                      type: 'number',
                      defaultValue: 1280,
                      label: 'Large Desktop',
                    },
                  ],
                  label: 'Breakpoints',
                },
                {
                  name: 'spacingScale',
                  type: 'group',
                  fields: [
                    { name: 'xs', type: 'text', defaultValue: '0.25rem', label: 'XS' },
                    { name: 'sm', type: 'text', defaultValue: '0.5rem', label: 'SM' },
                    { name: 'md', type: 'text', defaultValue: '1rem', label: 'MD' },
                    { name: 'lg', type: 'text', defaultValue: '2rem', label: 'LG' },
                    { name: 'xl', type: 'text', defaultValue: '4rem', label: 'XL' },
                  ],
                  label: 'Spacing Scale',
                },
                {
                  name: 'borderRadius',
                  type: 'group',
                  fields: [
                    {
                      name: 'box',
                      type: 'text',
                      admin: {
                        description: 'Border radius for boxes (e.g., 0.5rem)',
                      },
                      defaultValue: '0.5rem',
                      label: 'Box Border Radius',
                    },
                    {
                      name: 'button',
                      type: 'text',
                      admin: {
                        description: 'Border radius for buttons (e.g., 9999px for pill shape)',
                      },
                      defaultValue: '9999px',
                      label: 'Button Border Radius',
                    },
                  ],
                  label: 'Border Radius',
                },
              ],
              label: 'Layout',
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
