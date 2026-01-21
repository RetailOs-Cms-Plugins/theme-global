import React from 'react'

import type { TypographyProps } from '../../types/typography'

import { cn } from '../../utils/cn'
import { getCssVarsAndClasses } from '../../utils/typography/getStyle'
import { useCurrentBreakpoint } from '../../utils/typography/useCurrentBreakpoint'
import { useTheme } from './ThemeProvider'

// Font loading best practice: Preload fonts in your layout or _document for best performance.
// Use font-display: swap for Google Fonts.

const TypographyData: Record<TypographyProps['tagType'], { classes: string; tag: string }> = {
  blockquote: {
    classes: 'mt-6 border-l-2 pl-6 italic',
    tag: 'p',
  },
  code: {
    classes: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm',
    tag: 'code',
  },
  h1: {
    classes: 'scroll-m-20 font-extrabold tracking-tight text-balance',
    tag: 'h1',
  },
  h2: {
    classes: 'scroll-m-20 font-semibold tracking-tight first:mt-0',
    tag: 'h2',
  },
  h3: {
    classes: 'scroll-m-20 font-semibold tracking-tight',
    tag: 'h3',
  },
  h4: {
    classes: 'scroll-m-20 font-semibold tracking-tight',
    tag: 'h4',
  },
  large: {
    classes: 'text-lg',
    tag: 'div',
  },
  lead: {
    classes: 'text-xl',
    tag: 'p',
  },
  muted: {
    classes: 'text-muted-foreground',
    tag: 'span',
  },
  p: {
    classes: 'leading-7 [&:not(:first-child)]:mt-6',
    tag: 'p',
  },
  small: {
    classes: 'text-sm',
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
