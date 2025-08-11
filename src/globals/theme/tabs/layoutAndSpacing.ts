import type { Tab } from "payload";

export const layoutAndSpacing: Tab = {
    fields: [
        {
            name: 'layout',
            type: 'group',
            fields: [
              {
                type: 'row',
                fields: [
                  {
                    name: 'maxWidth',
                    type: 'number',
                    admin: {
                      description: 'Set the max-width for the main container. (e.g., 1360)',
                      width: '25%',
                    },
                    defaultValue: 1360,
                    label: 'Max Width',
                    required: true,
                  },
                ]
              },
              {
                name: 'breakpoints',
                type: 'group',
                fields: [
                  {
                    type: 'row',
                    fields: [
                      { name: 'mobile', type: 'number', admin: { width: '25%' }, defaultValue: 640, label: 'Mobile', required: true },
                      { name: 'tablet', type: 'number', admin: { width: '25%' }, defaultValue: 768, label: 'Tablet', required: true },
                      { name: 'desktop', type: 'number', admin: { width: '25%' }, defaultValue: 1024, label: 'Desktop', required: true },
                      { name: 'largeDesktop', type: 'number', admin: { width: '25%' }, defaultValue: 1280, label: 'Large Desktop', required: true },
                    ]
                  },
                ],
                label: 'Breakpoints',
              },
              {
                name: 'spacingScale',
                type: 'group',
                fields: [
                  {
                    type: 'row',
                    fields: [
                      { name: 'xs', type: 'text', admin: { width: '25%' }, defaultValue: '0.25rem', label: 'XS', required: true },
                      { name: 'sm', type: 'text', admin: { width: '25%' }, defaultValue: '0.5rem', label: 'SM', required: true },
                      { name: 'md', type: 'text', admin: { width: '25%' }, defaultValue: '1rem', label: 'MD', required: true },
                      { name: 'lg', type: 'text', admin: { width: '25%' }, defaultValue: '2rem', label: 'LG', required: true },
                      { name: 'xl', type: 'text', admin: { width: '25%' }, defaultValue: '4rem', label: 'XL', required: true },
                    ]
                  },
                ],
                label: 'Spacing Scale',
              },
              {
                name: 'borderRadius',
                type: 'group',
                fields: [
                  {
                    type: 'row',
                    fields: [
                      {
                        name: 'box',
                        type: 'text',
                        admin: {
                          description: 'Border radius for boxes (e.g., 0.5rem)',
                          width: '25%',
                        },
                        defaultValue: '0.5rem',
                        label: 'Box Border Radius',
                        required: true,
                      },
                      {
                        name: 'button',
                        type: 'text',
                        admin: {
                          description: 'Border radius for buttons (e.g., 9999px for pill shape)',
                          width: '25%',
                        },
                        defaultValue: '9999px',
                        label: 'Button Border Radius',
                        required: true,
                      },
                    ]
                  }
                ],
                label: 'Border Radius',
              },
            ],
            label: 'Layout',
          },
    ],
    label: 'Layout & Spacing'
}