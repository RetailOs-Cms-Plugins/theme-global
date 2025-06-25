import React from 'react'

import { useResponsiveTypography } from '../../utils/typography/useResponsiveValue'

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

  // For non-responsive fallback
  const fontSize = hasResponsiveFontSize ? undefined : elementConfig?.fontSize
  const lineHeight = hasResponsiveLineHeight ? undefined : elementConfig?.lineHeight

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
  breakpoint,
  children,
  className,
  dir,
  style,
  themeData,
  ...props
}: TypographyProps) {
  const {
    className: baseClassName,
    responsiveFontSize,
    responsiveLineHeight,
    style: themeStyle,
  } = getTypographyStyles('h1', themeData, 'scroll-m-20 font-extrabold tracking-tight text-balance')

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
  breakpoint,
  children,
  className,
  dir,
  style,
  themeData,
  ...props
}: TypographyProps) {
  const {
    className: baseClassName,
    responsiveFontSize,
    responsiveLineHeight,
    style: themeStyle,
  } = getTypographyStyles(
    'h2',
    themeData,
    'scroll-m-20 border-b pb-2 font-semibold tracking-tight first:mt-0',
  )
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
  breakpoint,
  children,
  className,
  dir,
  style,
  themeData,
  ...props
}: TypographyProps) {
  const {
    className: baseClassName,
    responsiveFontSize,
    responsiveLineHeight,
    style: themeStyle,
  } = getTypographyStyles('h3', themeData, 'scroll-m-20 font-semibold tracking-tight')
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
  breakpoint,
  children,
  className,
  dir,
  style,
  themeData,
  ...props
}: TypographyProps) {
  const {
    className: baseClassName,
    responsiveFontSize,
    responsiveLineHeight,
    style: themeStyle,
  } = getTypographyStyles('h4', themeData, 'scroll-m-20 font-semibold tracking-tight')
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
  breakpoint,
  children,
  className,
  dir,
  style,
  themeData,
  ...props
}: TypographyProps) {
  const {
    className: baseClassName,
    responsiveFontSize,
    responsiveLineHeight,
    style: themeStyle,
  } = getTypographyStyles('p', themeData, 'leading-7 [&:not(:first-child)]:mt-6')
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
  breakpoint,
  children,
  className,
  dir,
  style,
  themeData,
  ...props
}: TypographyProps) {
  const {
    className: baseClassName,
    responsiveFontSize,
    responsiveLineHeight,
    style: themeStyle,
  } = getTypographyStyles('lead', themeData, 'text-xl')
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
  breakpoint,
  children,
  className,
  dir,
  style,
  themeData,
  ...props
}: TypographyProps) {
  const {
    className: baseClassName,
    responsiveFontSize,
    responsiveLineHeight,
    style: themeStyle,
  } = getTypographyStyles('large', themeData, 'text-lg')
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
  breakpoint,
  children,
  className,
  dir,
  style,
  themeData,
  ...props
}: TypographyProps) {
  const {
    className: baseClassName,
    responsiveFontSize,
    responsiveLineHeight,
    style: themeStyle,
  } = getTypographyStyles('small', themeData, 'text-sm')
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

export function TypographyMuted({
  breakpoint,
  children,
  className,
  dir,
  style,
  themeData,
  ...props
}: TypographyProps) {
  const {
    className: baseClassName,
    responsiveFontSize,
    responsiveLineHeight,
    style: themeStyle,
  } = getTypographyStyles('muted', themeData, 'text-sm text-muted-foreground')
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
    <span className={`${baseClassName} ${className ?? ''}`} dir={dir} style={finalStyle} {...props}>
      {children}
    </span>
  )
}

// Code Components
export function TypographyInlineCode({
  breakpoint,
  children,
  className,
  dir,
  style,
  themeData,
  ...props
}: TypographyProps) {
  const {
    className: baseClassName,
    responsiveFontSize,
    responsiveLineHeight,
    style: themeStyle,
  } = getTypographyStyles(
    'inlineCode',
    themeData,
    'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold',
  )
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

// Block Components
export function TypographyBlockquote({
  breakpoint,
  children,
  className,
  dir,
  style,
  themeData,
  ...props
}: TypographyProps) {
  const {
    className: baseClassName,
    responsiveFontSize,
    responsiveLineHeight,
    style: themeStyle,
  } = getTypographyStyles('blockquote', themeData, 'mt-6 border-l-2 pl-6 italic')
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

export function TypographyTable({
  children,
  className,
  dir,
  style,
  themeData,
  ...props
}: TypographyProps) {
  const { className: baseClassName, style: themeStyle } = getTypographyStyles(
    'table',
    themeData,
    'my-6 w-full overflow-y-auto',
  )

  return (
    <div
      className={`${baseClassName} ${className ?? ''}`}
      dir={dir}
      style={{ ...themeStyle, ...style }}
    >
      <table className="w-full" {...props}>
        {children}
      </table>
    </div>
  )
}

export function TypographyList({
  children,
  className,
  dir,
  style,
  themeData,
  ...props
}: TypographyProps) {
  const { className: baseClassName, style: themeStyle } = getTypographyStyles(
    'list',
    themeData,
    'my-6 ml-6 list-disc [&>li]:mt-2',
  )

  return (
    <ul
      className={`${baseClassName} ${className ?? ''}`}
      dir={dir}
      style={{ ...themeStyle, ...style }}
      {...props}
    >
      {children}
    </ul>
  )
}

// Table Components for better structure
export function TypographyTableHeader({
  children,
  className,
  dir,
  style,
  themeData,
  ...props
}: TypographyProps) {
  return (
    <thead className={className} dir={dir} style={style} {...props}>
      {children}
    </thead>
  )
}

export function TypographyTableHeaderCell({
  children,
  className,
  dir,
  style,
  ...props
}: TypographyProps) {
  return (
    <tr>
      <th
        className={`h-12 px-4 text-start align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className ?? ''}`}
        dir={dir}
        style={style}
        {...props}
      >
        {children}
      </th>
    </tr>
  )
}

export function TypographyTableBody({
  children,
  className,
  dir,
  style,
  ...props
}: TypographyProps) {
  return (
    <tbody className={className} dir={dir} style={style} {...props}>
      {children}
    </tbody>
  )
}

export function TypographyTableRow({ children, className, dir, style, ...props }: TypographyProps) {
  return (
    <tr
      className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${className ?? ''}`}
      dir={dir}
      style={style}
      {...props}
    >
      {children}
    </tr>
  )
}

export function TypographyTableCell({
  children,
  className,
  dir,
  style,
  ...props
}: TypographyProps) {
  return (
    <td
      className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className ?? ''}`}
      dir={dir}
      style={style}
      {...props}
    >
      {children}
    </td>
  )
}

// List Item Component
export function TypographyListItem({ children, className, dir, style, ...props }: TypographyProps) {
  return (
    <li className={className} dir={dir} style={style} {...props}>
      {children}
    </li>
  )
}
