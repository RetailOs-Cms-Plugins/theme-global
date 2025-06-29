import React, { useMemo } from 'react'

import { useCurrentBreakpoint } from '../../utils/typography/useCurrentBreakpoint'
import { useResponsiveTypography } from '../../utils/typography/useResponsiveValue'
import { useTheme } from './ThemeProvider'

// Font loading best practice: Preload fonts in your layout or _document for best performance.
// Use font-display: swap for Google Fonts.

type TypographyProps = {
  breakpoint?: 'desktop' | 'largeDesktop' | 'mobile' | 'tablet'
  children: React.ReactNode
  className?: string
  dir?: 'auto' | 'ltr' | 'rtl'
  style?: React.CSSProperties
  themeData?: any // Add theme data prop
} & React.HTMLAttributes<HTMLElement>

// Helper function to get typography styles from theme with responsive breakpoints
const getTypographyStyles = (element: string, themeData: any, baseClassName: string = '') => {
  const elementConfig = themeData?.typography?.[element]

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
    className: baseClassName,
    style: customStyles,
    // Return responsive data for components that need it
    responsiveFontSize: hasResponsiveFontSize ? elementConfig.fontSize : undefined,
    responsiveLineHeight: hasResponsiveLineHeight ? elementConfig.lineHeight : undefined,
  }
}

// Heading Components - Now using theme configuration with responsive breakpoints
export function TypographyH1({
  breakpoint: propBreakpoint,
  children,
  className,
  dir,
  style,
  themeData: propThemeData,
  ...props
}: TypographyProps) {
  const contextThemeData = useTheme()
  const themeData = propThemeData || contextThemeData
  const currentBreakpoint = useCurrentBreakpoint()
  const breakpoint = propBreakpoint || currentBreakpoint
  const {
    className: baseClassName,
    responsiveFontSize,
    responsiveLineHeight,
    style: themeStyle,
  } = useMemo(
    () =>
      getTypographyStyles(
        'h1',
        themeData,
        'scroll-m-20 font-extrabold tracking-tight text-balance',
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
  return (
    <h1 className={`${baseClassName} ${className ?? ''}`} dir={dir} style={finalStyle} {...props}>
      {children}
    </h1>
  )
}

export function TypographyH2({
  breakpoint: propBreakpoint,
  children,
  className,
  dir,
  style,
  themeData: propThemeData,
  ...props
}: TypographyProps) {
  const contextThemeData = useTheme()
  const themeData = propThemeData || contextThemeData
  const currentBreakpoint = useCurrentBreakpoint()
  const breakpoint = propBreakpoint || currentBreakpoint
  const {
    className: baseClassName,
    responsiveFontSize,
    responsiveLineHeight,
    style: themeStyle,
  } = useMemo(
    () =>
      getTypographyStyles(
        'h2',
        themeData,
        'scroll-m-20 border-b pb-2 font-semibold tracking-tight first:mt-0',
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
  return (
    <h2 className={`${baseClassName} ${className ?? ''}`} dir={dir} style={finalStyle} {...props}>
      {children}
    </h2>
  )
}

export function TypographyH3({
  breakpoint: propBreakpoint,
  children,
  className,
  dir,
  style,
  themeData: propThemeData,
  ...props
}: TypographyProps) {
  const contextThemeData = useTheme()
  const themeData = propThemeData || contextThemeData
  const currentBreakpoint = useCurrentBreakpoint()
  const breakpoint = propBreakpoint || currentBreakpoint
  const {
    className: baseClassName,
    responsiveFontSize,
    responsiveLineHeight,
    style: themeStyle,
  } = useMemo(
    () => getTypographyStyles('h3', themeData, 'scroll-m-20 font-semibold tracking-tight'),
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
  return (
    <h3 className={`${baseClassName} ${className ?? ''}`} dir={dir} style={finalStyle} {...props}>
      {children}
    </h3>
  )
}

export function TypographyH4({
  breakpoint: propBreakpoint,
  children,
  className,
  dir,
  style,
  themeData: propThemeData,
  ...props
}: TypographyProps) {
  const contextThemeData = useTheme()
  const themeData = propThemeData || contextThemeData
  const currentBreakpoint = useCurrentBreakpoint()
  const breakpoint = propBreakpoint || currentBreakpoint
  const {
    className: baseClassName,
    responsiveFontSize,
    responsiveLineHeight,
    style: themeStyle,
  } = useMemo(
    () => getTypographyStyles('h4', themeData, 'scroll-m-20 font-semibold tracking-tight'),
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
  return (
    <h4 className={`${baseClassName} ${className ?? ''}`} dir={dir} style={finalStyle} {...props}>
      {children}
    </h4>
  )
}

// Body Text Components
export function TypographyP({
  breakpoint: propBreakpoint,
  children,
  className,
  dir,
  style,
  themeData: propThemeData,
  ...props
}: TypographyProps) {
  const contextThemeData = useTheme()
  const themeData = propThemeData || contextThemeData
  const currentBreakpoint = useCurrentBreakpoint()
  const breakpoint = propBreakpoint || currentBreakpoint
  const {
    className: baseClassName,
    responsiveFontSize,
    responsiveLineHeight,
    style: themeStyle,
  } = useMemo(
    () => getTypographyStyles('p', themeData, 'leading-7 [&:not(:first-child)]:mt-6'),
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
  return (
    <p className={`${baseClassName} ${className ?? ''}`} dir={dir} style={finalStyle} {...props}>
      {children}
    </p>
  )
}

// Special Text Components
export function TypographyLead({
  breakpoint: propBreakpoint,
  children,
  className,
  dir,
  style,
  themeData: propThemeData,
  ...props
}: TypographyProps) {
  const contextThemeData = useTheme()
  const themeData = propThemeData || contextThemeData
  const currentBreakpoint = useCurrentBreakpoint()
  const breakpoint = propBreakpoint || currentBreakpoint
  const {
    className: baseClassName,
    responsiveFontSize,
    responsiveLineHeight,
    style: themeStyle,
  } = useMemo(() => getTypographyStyles('lead', themeData, 'text-xl'), [themeData])
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
  return (
    <p className={`${baseClassName} ${className ?? ''}`} dir={dir} style={finalStyle} {...props}>
      {children}
    </p>
  )
}

export function TypographyLarge({
  breakpoint: propBreakpoint,
  children,
  className,
  dir,
  style,
  themeData: propThemeData,
  ...props
}: TypographyProps) {
  const contextThemeData = useTheme()
  const themeData = propThemeData || contextThemeData
  const currentBreakpoint = useCurrentBreakpoint()
  const breakpoint = propBreakpoint || currentBreakpoint
  const {
    className: baseClassName,
    responsiveFontSize,
    responsiveLineHeight,
    style: themeStyle,
  } = useMemo(() => getTypographyStyles('large', themeData, 'text-lg'), [themeData])
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
  return (
    <div className={`${baseClassName} ${className ?? ''}`} dir={dir} style={finalStyle} {...props}>
      {children}
    </div>
  )
}

export function TypographySmall({
  breakpoint: propBreakpoint,
  children,
  className,
  dir,
  style,
  themeData: propThemeData,
  ...props
}: TypographyProps) {
  const contextThemeData = useTheme()
  const themeData = propThemeData || contextThemeData
  const currentBreakpoint = useCurrentBreakpoint()
  const breakpoint = propBreakpoint || currentBreakpoint
  const {
    className: baseClassName,
    responsiveFontSize,
    responsiveLineHeight,
    style: themeStyle,
  } = useMemo(() => getTypographyStyles('small', themeData, 'text-sm'), [themeData])
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
  return (
    <small
      className={`${baseClassName} ${className ?? ''}`}
      dir={dir}
      style={finalStyle}
      {...props}
    >
      {children}
    </small>
  )
}

export function TypographyBlockquote({
  breakpoint: propBreakpoint,
  children,
  className,
  dir,
  style,
  themeData: propThemeData,
  ...props
}: TypographyProps) {
  const contextThemeData = useTheme()
  const themeData = propThemeData || contextThemeData
  const currentBreakpoint = useCurrentBreakpoint()
  const breakpoint = propBreakpoint || currentBreakpoint
  const {
    className: baseClassName,
    responsiveFontSize,
    responsiveLineHeight,
    style: themeStyle,
  } = useMemo(
    () => getTypographyStyles('blockquote', themeData, 'mt-6 border-l-2 pl-6 italic'),
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
  return (
    <blockquote
      className={`${baseClassName} ${className ?? ''}`}
      dir={dir}
      style={finalStyle}
      {...props}
    >
      {children}
    </blockquote>
  )
}

export function TypographyInlineCode({
  breakpoint: propBreakpoint,
  children,
  className,
  dir,
  style,
  themeData: propThemeData,
  ...props
}: TypographyProps) {
  const contextThemeData = useTheme()
  const themeData = propThemeData || contextThemeData
  const currentBreakpoint = useCurrentBreakpoint()
  const breakpoint = propBreakpoint || currentBreakpoint
  const {
    className: baseClassName,
    responsiveFontSize,
    responsiveLineHeight,
    style: themeStyle,
  } = useMemo(
    () =>
      getTypographyStyles(
        'code',
        themeData,
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm',
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
  return (
    <code className={`${baseClassName} ${className ?? ''}`} dir={dir} style={finalStyle} {...props}>
      {children}
    </code>
  )
}

export function TypographyMuted({
  breakpoint: propBreakpoint,
  children,
  className,
  dir,
  style,
  themeData: propThemeData,
  ...props
}: TypographyProps) {
  const contextThemeData = useTheme()
  const themeData = propThemeData || contextThemeData
  const currentBreakpoint = useCurrentBreakpoint()
  const breakpoint = propBreakpoint || currentBreakpoint
  const {
    className: baseClassName,
    responsiveFontSize,
    responsiveLineHeight,
    style: themeStyle,
  } = useMemo(() => getTypographyStyles('muted', themeData, 'text-muted-foreground'), [themeData])
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
  return (
    <p className={`${baseClassName} ${className ?? ''}`} dir={dir} style={finalStyle} {...props}>
      {children}
    </p>
  )
}
