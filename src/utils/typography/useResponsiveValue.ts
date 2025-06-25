'use client'

import { useEffect, useState } from 'react'

import {
  getCurrentBreakpoint,
  getFontSize as getResponsiveFontSize,
  getLineHeight as getResponsiveLineHeight,
} from './getResponsiveValue'

type Breakpoint = 'desktop' | 'largeDesktop' | 'mobile' | 'tablet'

/**
 * React hook for responsive typography values
 * Automatically updates when viewport changes
 */
export function useResponsiveValue() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('desktop')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setCurrentBreakpoint(getCurrentBreakpoint())

    const handleResize = () => {
      setCurrentBreakpoint(getCurrentBreakpoint())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getFontSize = (obj: Record<string, any> | undefined): string => {
    if (!isClient) {
      return ''
    } // SSR fallback
    return getResponsiveFontSize(obj, currentBreakpoint)
  }

  const getLineHeight = (obj: Record<string, any> | undefined): string => {
    if (!isClient) {
      return ''
    } // SSR fallback
    return getResponsiveLineHeight(obj, currentBreakpoint)
  }

  return {
    currentBreakpoint,
    getFontSize,
    getLineHeight,
    isClient,
  }
}

/**
 * Hook for getting responsive typography styles
 */
export function useResponsiveTypography(
  fontSizeObj: Record<string, any> | undefined,
  lineHeightObj: Record<string, any> | undefined,
) {
  const { currentBreakpoint, getFontSize, getLineHeight, isClient } = useResponsiveValue()

  const fontSize = getFontSize(fontSizeObj)
  const lineHeight = getLineHeight(lineHeightObj)

  return {
    currentBreakpoint,
    fontSize,
    isClient,
    lineHeight,
    style: {
      fontSize: fontSize || undefined,
      lineHeight: lineHeight || undefined,
    },
  }
}

export {
  getFontSize as getResponsiveFontSize,
  getLineHeight as getResponsiveLineHeight,
} from './getResponsiveValue'
