import React from 'react'

import type { TypographyProps } from '../../types/typography'

import { cn } from '../../utils/cn'
import { getCssVarsAndClasses } from '../../utils/typography/getStyle'
import { useCurrentBreakpoint } from '../../utils/typography/useCurrentBreakpoint'
import { useTheme } from './ThemeProvider'

// Font loading best practice: Preload fonts in your layout or _document for best performance.
// Use font-display: swap for Google Fonts.

const TypographyData: Record<TypographyProps['tagType'], { classes?: string; tag: string }> = {
  blockquote: {
    classes: 'border-l-2 pl-6 italic',
    tag: 'p',
  },
  code: {
    classes: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono',
    tag: 'code',
  },
  h1: {
    tag: 'h1',
  },
  h2: {
    tag: 'h2',
  },
  h3: {
    tag: 'h3',
  },
  h4: {
    tag: 'h4',
  },
  large: {
    tag: 'div',
  },
  lead: {
    tag: 'p',
  },
  muted: {
    classes: 'text-muted-foreground',
    tag: 'span',
  },
  p: {
    tag: 'p',
  },
  small: {
    tag: 'small',
  },
}

export function Typography({
  breakpoint: propBreakpoint,
  children,
  className,
  dir,
  style,
  tagType,
  themeData: propThemeData,
  ...props
}: TypographyProps): null | React.ReactElement {
  const contextThemeData = useTheme()
  const themeData = propThemeData || contextThemeData
  const currentBreakpoint = useCurrentBreakpoint(themeData?.layout?.breakpoints)
  const breakpoint = propBreakpoint || currentBreakpoint

  if (!themeData) {
    return null
  }

  const { cssClasses, cssVariables } = getCssVarsAndClasses({ breakpoint, tagType, themeData })

  const finalStyle = {
    ...cssVariables,
    ...style,
  }

  const baseClassName = TypographyData[tagType]?.classes || ''

  return React.createElement(
    TypographyData[tagType].tag,
    {
      className: cn(baseClassName, className, ...cssClasses),
      dir,
      style: finalStyle,
      ...props,
    },
    children,
  )
}
