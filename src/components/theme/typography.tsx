import React from 'react'

type TypographyProps = {
  children: React.ReactNode
  className?: string
  dir?: 'auto' | 'ltr' | 'rtl'
  style?: React.CSSProperties
  themeData?: any // Add theme data prop
} & React.HTMLAttributes<HTMLElement>

// Helper function to get typography styles from theme
const getTypographyStyles = (element: string, themeData: any, baseClassName: string = '') => {
  const elementConfig = themeData?.typography?.[element]
  const fontSize = elementConfig?.fontSize
  const lineHeight = elementConfig?.lineHeight

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
  }
}

// Heading Components - Now using theme configuration
export function TypographyH1({
  children,
  className,
  dir,
  style,
  themeData,
  ...props
}: TypographyProps) {
  const { className: baseClassName, style: themeStyle } = getTypographyStyles(
    'h1',
    themeData,
    'scroll-m-20 font-extrabold tracking-tight text-balance',
  )

  return (
    <h1
      className={`${baseClassName} ${className ?? ''}`}
      dir={dir}
      style={{ ...themeStyle, ...style }}
      {...props}
    >
      {children}
    </h1>
  )
}

export function TypographyH2({
  children,
  className,
  dir,
  style,
  themeData,
  ...props
}: TypographyProps) {
  const { className: baseClassName, style: themeStyle } = getTypographyStyles(
    'h2',
    themeData,
    'scroll-m-20 border-b pb-2 font-semibold tracking-tight first:mt-0',
  )

  return (
    <h2
      className={`${baseClassName} ${className ?? ''}`}
      dir={dir}
      style={{ ...themeStyle, ...style }}
      {...props}
    >
      {children}
    </h2>
  )
}

export function TypographyH3({
  children,
  className,
  dir,
  style,
  themeData,
  ...props
}: TypographyProps) {
  const { className: baseClassName, style: themeStyle } = getTypographyStyles(
    'h3',
    themeData,
    'scroll-m-20 font-semibold tracking-tight',
  )

  return (
    <h3
      className={`${baseClassName} ${className ?? ''}`}
      dir={dir}
      style={{ ...themeStyle, ...style }}
      {...props}
    >
      {children}
    </h3>
  )
}

export function TypographyH4({
  children,
  className,
  dir,
  style,
  themeData,
  ...props
}: TypographyProps) {
  const { className: baseClassName, style: themeStyle } = getTypographyStyles(
    'h4',
    themeData,
    'scroll-m-20 font-semibold tracking-tight',
  )

  return (
    <h4
      className={`${baseClassName} ${className ?? ''}`}
      dir={dir}
      style={{ ...themeStyle, ...style }}
      {...props}
    >
      {children}
    </h4>
  )
}

// Body Text Components
export function TypographyP({
  children,
  className,
  dir,
  style,
  themeData,
  ...props
}: TypographyProps) {
  const { className: baseClassName, style: themeStyle } = getTypographyStyles(
    'p',
    themeData,
    'leading-7 [&:not(:first-child)]:mt-6',
  )

  return (
    <p
      className={`${baseClassName} ${className ?? ''}`}
      dir={dir}
      style={{ ...themeStyle, ...style }}
      {...props}
    >
      {children}
    </p>
  )
}

// Special Text Components
export function TypographyLead({
  children,
  className,
  dir,
  style,
  themeData,
  ...props
}: TypographyProps) {
  const { className: baseClassName, style: themeStyle } = getTypographyStyles(
    'lead',
    themeData,
    'text-muted-foreground leading-7 [&:not(:first-child)]:mt-6',
  )

  return (
    <p
      className={`${baseClassName} ${className ?? ''}`}
      dir={dir}
      style={{ ...themeStyle, ...style }}
      {...props}
    >
      {children}
    </p>
  )
}

export function TypographyLarge({
  children,
  className,
  dir,
  style,
  themeData,
  ...props
}: TypographyProps) {
  const { className: baseClassName, style: themeStyle } = getTypographyStyles(
    'large',
    themeData,
    'font-semibold',
  )

  return (
    <div
      className={`${baseClassName} ${className ?? ''}`}
      dir={dir}
      style={{ ...themeStyle, ...style }}
      {...props}
    >
      {children}
    </div>
  )
}

export function TypographySmall({
  children,
  className,
  dir,
  style,
  themeData,
  ...props
}: TypographyProps) {
  const { className: baseClassName, style: themeStyle } = getTypographyStyles(
    'small',
    themeData,
    'leading-none font-medium',
  )

  return (
    <small
      className={`${baseClassName} ${className ?? ''}`}
      dir={dir}
      style={{ ...themeStyle, ...style }}
      {...props}
    >
      {children}
    </small>
  )
}

export function TypographyMuted({
  children,
  className,
  dir,
  style,
  themeData,
  ...props
}: TypographyProps) {
  const { className: baseClassName, style: themeStyle } = getTypographyStyles(
    'muted',
    themeData,
    'text-muted-foreground leading-7 [&:not(:first-child)]:mt-6',
  )

  return (
    <p
      className={`${baseClassName} ${className ?? ''}`}
      dir={dir}
      style={{ ...themeStyle, ...style }}
      {...props}
    >
      {children}
    </p>
  )
}

// Code Components
export function TypographyInlineCode({
  children,
  className,
  dir,
  style,
  themeData,
  ...props
}: TypographyProps) {
  const { className: baseClassName, style: themeStyle } = getTypographyStyles(
    'inlineCode',
    themeData,
    'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold',
  )

  return (
    <code
      className={`${baseClassName} ${className ?? ''}`}
      dir={dir}
      style={{ ...themeStyle, ...style }}
      {...props}
    >
      {children}
    </code>
  )
}

// Block Components
export function TypographyBlockquote({
  children,
  className,
  dir,
  style,
  themeData,
  ...props
}: TypographyProps) {
  const { className: baseClassName, style: themeStyle } = getTypographyStyles(
    'blockquote',
    themeData,
    'mt-6 border-l-2 pl-6 italic',
  )

  return (
    <blockquote
      className={`${baseClassName} ${className ?? ''}`}
      dir={dir}
      style={{ ...themeStyle, ...style }}
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
