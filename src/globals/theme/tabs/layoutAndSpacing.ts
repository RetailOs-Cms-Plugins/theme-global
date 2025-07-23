import type { Tab } from "payload";

export const layoutAndSpacing: Tab = {
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
    label: 'Layout & Spacing'
}