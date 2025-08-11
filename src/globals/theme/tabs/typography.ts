import type { Tab } from "payload";

export const typography: Tab = {
    fields: [
        {
          name: 'typography',
          type: 'group',
          fields: [
            {
              type: 'collapsible',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'fontBody',
                      type: 'select',
                      admin: {
                        description: 'Font family for body text',
                        width: '50%',
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
                      required: true,
                    },
                    {
                      name: 'fontHeading',
                      type: 'select',
                      admin: {
                        description: 'Font family for headings',
                        width: '50%',
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
                      required: true,
                    },
                  ]
                }
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
              required: true,
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
                              required: true,
                            },
                            {
                              name: 'desktop',
                              type: 'text',
                              admin: { width: '25%' },
                              defaultValue: '4rem',
                              label: 'Desktop',
                              required: true,
                            },
                            {
                              name: 'tablet',
                              type: 'text',
                              admin: { width: '25%' },
                              defaultValue: '3rem',
                              label: 'Tablet',
                              required: true,
                            },
                            {
                              name: 'mobile',
                              type: 'text',
                              admin: { width: '25%' },
                              defaultValue: '2rem',
                              label: 'Mobile',
                              required: true,
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
                              required: true,
                            },
                            {
                              name: 'desktop',
                              type: 'text',
                              admin: { width: '25%' },
                              defaultValue: '1.2',
                              label: 'Desktop',
                              required: true,
                            },
                            {
                              name: 'tablet',
                              type: 'text',
                              admin: { width: '25%' },
                              defaultValue: '1.2',
                              label: 'Tablet',
                              required: true,
                            },
                            {
                              name: 'mobile',
                              type: 'text',
                              admin: { width: '25%' },
                              defaultValue: '1.1',
                              label: 'Mobile',
                              required: true,
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
                              required: true,
                            },
                            {
                              name: 'desktop',
                              type: 'text',
                              admin: { width: '25%' },
                              defaultValue: '3rem',
                              label: 'Desktop',
                              required: true,
                            },
                            {
                              name: 'tablet',
                              type: 'text',
                              admin: { width: '25%' },
                              defaultValue: '2.5rem',
                              label: 'Tablet',
                              required: true,
                            },
                            {
                              name: 'mobile',
                              type: 'text',
                              admin: { width: '25%' },
                              defaultValue: '2rem',
                              label: 'Mobile',
                              required: true,
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
                              required: true,
                            },
                            {
                              name: 'desktop',
                              type: 'text',
                              admin: { width: '25%' },
                              defaultValue: '1.2',
                              label: 'Desktop',
                              required: true,
                            },
                            {
                              name: 'tablet',
                              type: 'text',
                              admin: { width: '25%' },
                              defaultValue: '1.2',
                              label: 'Tablet',
                              required: true,
                            },
                            {
                              name: 'mobile',
                              type: 'text',
                              admin: { width: '25%' },
                              defaultValue: '1.1',
                              label: 'Mobile',
                              required: true,
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
                              required: true,
                            },
                            {
                              name: 'desktop',
                              type: 'text',
                              admin: { width: '25%' },
                              defaultValue: '2.5rem',
                              label: 'Desktop',
                              required: true,
                            },
                            {
                              name: 'tablet',
                              type: 'text',
                              admin: { width: '25%' },
                              defaultValue: '2rem',
                              label: 'Tablet',
                              required: true,
                            },
                            {
                              name: 'mobile',
                              type: 'text',
                              admin: { width: '25%' },
                              defaultValue: '1.5rem',
                              label: 'Mobile',
                              required: true,
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
                              required: true,
                            },
                            {
                              name: 'desktop',
                              type: 'text',
                              admin: { width: '25%' },
                              defaultValue: '1.2',
                              label: 'Desktop',
                              required: true,
                            },
                            {
                              name: 'tablet',
                              type: 'text',
                              admin: { width: '25%' },
                              defaultValue: '1.2',
                              label: 'Tablet',
                              required: true,
                            },
                            {
                              name: 'mobile',
                              type: 'text',
                              admin: { width: '25%' },
                              defaultValue: '1.1',
                              label: 'Mobile',
                              required: true,
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
                              required: true,
                            },
                            {
                              name: 'desktop',
                              type: 'text',
                              admin: { width: '25%' },
                              defaultValue: '2rem',
                              label: 'Desktop',
                              required: true,
                            },
                            {
                              name: 'tablet',
                              type: 'text',
                              admin: { width: '25%' },
                              defaultValue: '1.5rem',
                              label: 'Tablet',
                              required: true,
                            },
                            {
                              name: 'mobile',
                              type: 'text',
                              admin: { width: '25%' },
                              defaultValue: '1.2rem',
                              label: 'Mobile',
                              required: true,
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
                              required: true,
                            },
                            {
                              name: 'desktop',
                              type: 'text',
                              admin: { width: '25%' },
                              defaultValue: '1.2',
                              label: 'Desktop',
                              required: true,
                            },
                            {
                              name: 'tablet',
                              type: 'text',
                              admin: { width: '25%' },
                              defaultValue: '1.2',
                              label: 'Tablet',
                              required: true,
                            },
                            {
                              name: 'mobile',
                              type: 'text',
                              admin: { width: '25%' },
                              defaultValue: '1.1',
                              label: 'Mobile',
                              required: true,
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
                              required: true,
                            },
                            {
                              name: 'desktop',
                              type: 'text',
                              admin: { width: '25%' },
                              defaultValue: '1.25rem',
                              label: 'Desktop',
                              required: true,
                            },
                            {
                              name: 'tablet',
                              type: 'text',
                              admin: { width: '25%' },
                              defaultValue: '1rem',
                              label: 'Tablet',
                              required: true,
                            },
                            {
                              name: 'mobile',
                              type: 'text',
                              admin: { width: '25%' },
                              defaultValue: '0.9rem',
                              label: 'Mobile',
                              required: true,
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
                              required: true,
                            },
                            {
                              name: 'desktop',
                              type: 'text',
                              admin: { width: '25%' },
                              defaultValue: '1.5',
                              label: 'Desktop',
                              required: true,
                            },
                            {
                              name: 'tablet',
                              type: 'text',
                              admin: { width: '25%' },
                              defaultValue: '1.4',
                              label: 'Tablet',
                              required: true,
                            },
                            {
                              name: 'mobile',
                              type: 'text',
                              admin: { width: '25%' },
                              defaultValue: '1.3',
                              label: 'Mobile',
                              required: true,
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
                          required: true,
                        },
                        {
                          name: 'lineHeight',
                          type: 'text',
                          admin: {
                            description: 'Line height for blockquotes',
                          },
                          defaultValue: '1.75rem',
                          label: 'Line Height',
                          required: true,
                        },
                      ],
                      label: 'Blockquote',
                    },
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
                            width: '50%',
                          },
                          defaultValue: '0.875rem',
                          label: 'Font Size',
                          required: true,
                        },
                        {
                          name: 'lineHeight',
                          type: 'text',
                          admin: {
                            description: 'Line height for muted text',
                            width: '50%',
                          },
                          defaultValue: '1.25rem',
                          label: 'Line Height',
                          required: true,
                        },
                      ],
                      label: 'Muted',
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
                          required: true,
                        },
                        {
                          name: 'lineHeight',
                          type: 'text',
                          admin: {
                            description: 'Line height for tables',
                          },
                          defaultValue: '1.5rem',
                          label: 'Line Height',
                          required: true,
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
                          required: true,
                        },
                        {
                          name: 'lineHeight',
                          type: 'text',
                          admin: {
                            description: 'Line height for lists',
                          },
                          defaultValue: '1.75rem',
                          label: 'Line Height',
                          required: true,
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
                          required: true,
                        },
                        {
                          name: 'lineHeight',
                          type: 'text',
                          admin: {
                            description: 'Line height for inline code',
                          },
                          defaultValue: '1.25rem',
                          label: 'Line Height',
                          required: true,
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
                          required: true,
                        },
                        {
                          name: 'lineHeight',
                          type: 'text',
                          admin: {
                            description: 'Line height for lead paragraphs',
                          },
                          defaultValue: '1.75rem',
                          label: 'Line Height',
                          required: true,
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
                          required: true,
                        },
                        {
                          name: 'lineHeight',
                          type: 'text',
                          admin: {
                            description: 'Line height for large text',
                          },
                          defaultValue: '1.75rem',
                          label: 'Line Height',
                          required: true,
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
                          required: true,
                        },
                        {
                          name: 'lineHeight',
                          type: 'text',
                          admin: {
                            description: 'Line height for small text',
                          },
                          defaultValue: '1.25rem',
                          label: 'Line Height',
                          required: true,
                        },
                      ],
                      label: 'Small',
                    },
                  ],
                },
              ],
              label: 'Typography Elements',
            },
          ],
        },
    ],
    label: 'Typography'
}