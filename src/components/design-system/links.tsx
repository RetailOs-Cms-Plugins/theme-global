import { IconLayoutGrid, IconPalette, IconTypography } from '@tabler/icons-react'

export const designSystemLinks = [
    {
      id: 'colors',
      href: '#colors',
      icon: <IconPalette className="h-5 w-5 shrink-0 text-text-on-page" />,
      label: 'Colors',
    },
    {
      id: 'typography',
      href: '#typography',
      icon: <IconTypography className="h-5 w-5 shrink-0 text-text-on-page" />,
      label: 'Typography',
    },
    {
      id: 'layout',
      href: '#layout',
      icon: <IconLayoutGrid className="h-5 w-5 shrink-0 text-text-on-page" />,
      label: 'Layout & Spacing',
    },
  ]