'use client'

// Breakpoint definitions (matching the layout settings)
const BREAKPOINTS = {
  desktop: 1024,
  largeDesktop: 1280,
  mobile: 640,
  tablet: 768,
} as const

type Breakpoint = keyof typeof BREAKPOINTS

/**
 * Get the current breakpoint based on viewport width
 */
export function getCurrentBreakpoint(): Breakpoint {
  if (typeof window === 'undefined') {
    return 'desktop'
  } // SSR fallback

  const width = window.innerWidth

  if (width < BREAKPOINTS.mobile) {
    return 'mobile'
  }
  if (width < BREAKPOINTS.tablet) {
    return 'tablet'
  }
  if (width < BREAKPOINTS.desktop) {
    return 'desktop'
  }
  return 'largeDesktop'
}

/**
 * Get responsive value for the current breakpoint
 * Falls back to larger breakpoints if current one doesn't exist
 */
export function getResponsiveValue(
  obj: Record<string, any> | undefined,
  breakpoint?: string,
): number | string | undefined {
  if (!obj) {
    return undefined
  }

  const currentBreakpoint = breakpoint || getCurrentBreakpoint()

  // Try current breakpoint first
  if (obj[currentBreakpoint] !== undefined) {
    return obj[currentBreakpoint]
  }

  // Fallback chain: current -> larger -> smaller
  const fallbackOrder: string[] = ['mobile', 'tablet', 'desktop', 'largeDesktop']
  const currentIndex = fallbackOrder.indexOf(currentBreakpoint)

  // Try larger breakpoints first
  for (let i = currentIndex + 1; i < fallbackOrder.length; i++) {
    const bp = fallbackOrder[i]
    if (obj[bp] !== undefined) {
      return obj[bp]
    }
  }

  // Try smaller breakpoints
  for (let i = currentIndex - 1; i >= 0; i--) {
    const bp = fallbackOrder[i]
    if (obj[bp] !== undefined) {
      return obj[bp]
    }
  }

  return undefined
}

/**
 * Get responsive value with unit formatting
 */
export function getResponsiveValueWithUnit(
  obj: Record<string, any> | undefined,
  unit: string = 'rem',
  breakpoint?: string,
): string {
  const value = getResponsiveValue(obj, breakpoint)
  if (value === undefined || value === null) {
    return ''
  }

  // If value already has a unit, return as is
  if (typeof value === 'string' && /[a-z%]+$/i.test(value)) {
    return value
  }

  // Add unit to numeric values
  return `${value}${unit}`
}

/**
 * Get responsive font size
 */
export function getFontSize(obj: Record<string, any> | undefined, breakpoint?: string): string {
  return getResponsiveValueWithUnit(obj, 'rem', breakpoint)
}

/**
 * Get responsive line height
 */
export function getLineHeight(obj: Record<string, any> | undefined, breakpoint?: string): string {
  return getResponsiveValueWithUnit(obj, '', breakpoint)
}
