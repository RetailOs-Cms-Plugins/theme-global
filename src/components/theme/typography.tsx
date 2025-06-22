import React from 'react'

type TypographyProps = {
  children: React.ReactNode
  className?: string
  dir?: 'auto' | 'ltr' | 'rtl'
  style?: React.CSSProperties
} & React.HTMLAttributes<HTMLElement>

// Heading Components - Professional Landing Page Sizing
export function TypographyH1({ children, className, dir, style, ...props }: TypographyProps) {
  return (
    <h1
      className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl xl:text-6xl text-balance ${className ?? ''}`}
      dir={dir}
      style={style}
      {...props}
    >
      {children}
    </h1>
  )
}

export function TypographyH2({ children, className, dir, style, ...props }: TypographyProps) {
  return (
    <h2
      className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight lg:text-4xl first:mt-0 ${className ?? ''}`}
      dir={dir}
      style={style}
      {...props}
    >
      {children}
    </h2>
  )
}

export function TypographyH3({ children, className, dir, style, ...props }: TypographyProps) {
  return (
    <h3
      className={`scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl ${className ?? ''}`}
      dir={dir}
      style={style}
      {...props}
    >
      {children}
    </h3>
  )
}

export function TypographyH4({ children, className, dir, style, ...props }: TypographyProps) {
  return (
    <h4
      className={`scroll-m-20 text-xl font-semibold tracking-tight lg:text-2xl ${className ?? ''}`}
      dir={dir}
      style={style}
      {...props}
    >
      {children}
    </h4>
  )
}

// Body Text Components
export function TypographyP({ children, className, dir, style, ...props }: TypographyProps) {
  return (
    <p
      className={`leading-7 [&:not(:first-child)]:mt-6 text-base lg:text-lg ${className ?? ''}`}
      dir={dir}
      style={style}
      {...props}
    >
      {children}
    </p>
  )
}

// Special Text Components
export function TypographyLead({ children, className, dir, style, ...props }: TypographyProps) {
  return (
    <p
      className={`text-xl text-muted-foreground leading-7 [&:not(:first-child)]:mt-6 lg:text-2xl ${className ?? ''}`}
      dir={dir}
      style={style}
      {...props}
    >
      {children}
    </p>
  )
}

export function TypographyLarge({ children, className, dir, style, ...props }: TypographyProps) {
  return (
    <div
      className={`text-lg font-semibold lg:text-xl ${className ?? ''}`}
      dir={dir}
      style={style}
      {...props}
    >
      {children}
    </div>
  )
}

export function TypographySmall({ children, className, dir, style, ...props }: TypographyProps) {
  return (
    <small
      className={`text-sm leading-none font-medium ${className ?? ''}`}
      dir={dir}
      style={style}
      {...props}
    >
      {children}
    </small>
  )
}

export function TypographyMuted({ children, className, dir, style, ...props }: TypographyProps) {
  return (
    <p
      className={`text-sm text-muted-foreground leading-7 [&:not(:first-child)]:mt-6 ${className ?? ''}`}
      dir={dir}
      style={style}
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
  ...props
}: TypographyProps) {
  return (
    <code
      className={`relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold ${className ?? ''}`}
      dir={dir}
      style={style}
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
  ...props
}: TypographyProps) {
  return (
    <blockquote
      className={`mt-6 border-l-2 pl-6 italic text-lg lg:text-xl ${className ?? ''}`}
      dir={dir}
      style={style}
      {...props}
    >
      {children}
    </blockquote>
  )
}

export function TypographyTable({ children, className, dir, style, ...props }: TypographyProps) {
  return (
    <div className={`my-6 w-full overflow-y-auto ${className ?? ''}`} dir={dir} style={style}>
      <table className="w-full" {...props}>
        {children}
      </table>
    </div>
  )
}

export function TypographyList({ children, className, dir, style, ...props }: TypographyProps) {
  return (
    <ul
      className={`my-6 ml-6 list-disc [&>li]:mt-2 text-base lg:text-lg ${className ?? ''}`}
      dir={dir}
      style={style}
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
  ...props
}: TypographyProps) {
  return (
    <thead {...props}>
      <tr className="even:bg-muted m-0 border-t p-0">{children}</tr>
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
    <th
      className={`border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right ${className ?? ''}`}
      dir={dir}
      style={style}
      {...props}
    >
      {children}
    </th>
  )
}

export function TypographyTableBody({
  children,
  className,
  dir,
  style,
  ...props
}: TypographyProps) {
  return <tbody {...props}>{children}</tbody>
}

export function TypographyTableRow({ children, className, dir, style, ...props }: TypographyProps) {
  return (
    <tr
      className={`even:bg-muted m-0 border-t p-0 ${className ?? ''}`}
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
      className={`border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right ${className ?? ''}`}
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
    <li className={`mt-2 ${className ?? ''}`} dir={dir} style={style} {...props}>
      {children}
    </li>
  )
}
