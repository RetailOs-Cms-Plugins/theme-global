import React, { useMemo } from 'react'

import { cn } from '../../utils/cn'
import { useCurrentBreakpoint } from '../../utils/typography/useCurrentBreakpoint'
import { useTheme } from './ThemeProvider'

// Font loading best practice: Preload fonts in your layout or _document for best performance.
// Use font-display: swap for Google Fonts.

type TypographyProps = {
  breakpoint?: 'desktop' | 'largeDesktop' | 'mobile' | 'tablet'
  children: React.ReactNode
  className?: string
  dir?: 'auto' | 'ltr' | 'rtl'
  style?: React.CSSProperties
  tagType: 'blockquote' | 'code' | 'h1' | 'h2' | 'h3' | 'h4' | 'large' | 'lead' | 'muted' | 'p' | 'small'
  themeData?: any // Add theme data prop
} & React.HTMLAttributes<HTMLElement>

const TypographyData: Record<TypographyProps['tagType'], { classes: string, tag: string }> = {
  blockquote: {
    classes: 'mt-6 border-l-2 pl-6 italic',
    tag: 'p'
  },
  code: {
    classes: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm',
    tag: 'code'
  },
  h1: {
    classes: 'scroll-m-20 font-extrabold tracking-tight text-balance',
    tag: 'h1'
  },
  h2: {
    classes: 'scroll-m-20 border-b pb-2 font-semibold tracking-tight first:mt-0',
    tag: 'h2'
  },
  h3: {
    classes: 'scroll-m-20 font-semibold tracking-tight',
    tag: 'h3'
  },
  h4: {
    classes: 'scroll-m-20 font-semibold tracking-tight',
    tag: 'h4'
  },
  large: {
    classes: 'text-lg',
    tag: 'div'
  },
  lead: {
    classes: 'text-xl',
    tag: 'p'
  },
  muted: {
    classes: 'text-muted-foreground',
    tag: 'span'
  },
  p: {
    classes: 'leading-7 [&:not(:first-child)]:mt-6',
    tag: 'p'
  },
  small: {
    classes: 'text-sm',
    tag: 'small'
  }
}

// Helper function to get typography styles from theme with responsive breakpoints
const getTypographyStyles = (element: TypographyProps['tagType'], themeData: any) => {
  const elementConfig = themeData?.typography?.[element]
  console.log('element', element)
  console.log('elementConfig', elementConfig)

  // Check if we have responsive breakpoint data
  const hasResponsiveFontSize =
    elementConfig?.fontSize && typeof elementConfig.fontSize === 'object'
  const hasResponsiveLineHeight =
    elementConfig?.lineHeight && typeof elementConfig.lineHeight === 'object'

  // For responsive configurations, use 'desktop' as the default breakpoint
  // For non-responsive configurations, use the string values directly
  let fontSize: string | undefined
  let lineHeight: string | undefined

  if (hasResponsiveFontSize) {
    // Use desktop as default, fallback to first available breakpoint
    fontSize =
      elementConfig.fontSize.desktop ||
      elementConfig.fontSize.largeDesktop ||
      elementConfig.fontSize.tablet ||
      elementConfig.fontSize.mobile ||
      Object.values(elementConfig.fontSize)[0]
  } else {
    fontSize = elementConfig?.fontSize
  }

  if (hasResponsiveLineHeight) {
    // Use desktop as default, fallback to first available breakpoint
    lineHeight =
      elementConfig.lineHeight.desktop ||
      elementConfig.lineHeight.largeDesktop ||
      elementConfig.lineHeight.tablet ||
      elementConfig.lineHeight.mobile ||
      Object.values(elementConfig.lineHeight)[0]
  } else {
    lineHeight = elementConfig?.lineHeight
  }

  const customStyles: React.CSSProperties = {}
  if (fontSize) {
    customStyles.fontSize = fontSize
  }
  if (lineHeight) {
    customStyles.lineHeight = lineHeight
  }

  return {
    baseClassName: TypographyData[element].classes,
    style: customStyles,
    // Return responsive data for components that need it
    responsiveFontSize: hasResponsiveFontSize ? elementConfig.fontSize : undefined,
    responsiveLineHeight: hasResponsiveLineHeight ? elementConfig.lineHeight : undefined,
  }
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
  const currentBreakpoint = useCurrentBreakpoint()
  const breakpoint = propBreakpoint || currentBreakpoint
  const {
    baseClassName,
    responsiveFontSize,
    responsiveLineHeight,
    style: themeStyle,
  } = useMemo(
    () =>
      getTypographyStyles(
        tagType,
        themeData
      ),
    [themeData],
  )

  if (!themeData) {
    return null
  }
  let fontSize, lineHeight
  if (breakpoint && responsiveFontSize) {
    fontSize = responsiveFontSize[breakpoint]
  }
  if (breakpoint && responsiveLineHeight) {
    lineHeight = responsiveLineHeight[breakpoint]
  }
  const finalStyle = {
    ...themeStyle,
    ...(fontSize ? { fontSize } : {}),
    ...(lineHeight ? { lineHeight } : {}),
    ...style,
  }
  return React.createElement(TypographyData[tagType].tag, {
    className: cn(baseClassName, className),
    dir,
    style: finalStyle,
    ...props,
  }, children)
}
