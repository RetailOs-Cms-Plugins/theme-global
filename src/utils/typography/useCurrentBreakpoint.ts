'use client'

import { useEffect, useState } from 'react'

interface BreakpointProps {
  desktop?: number
  largeDesktop?: number
  mobile?: number
  tablet?: number
}

const getBreakpoint = (props: BreakpointProps) => {
  const { desktop = 1024, largeDesktop = 1280, tablet = 768 } = props || {}

  if (typeof window === 'undefined') {
    return 'desktop'
  }

  const width = window.innerWidth

  if (width >= tablet) {
    return 'tablet'
  }
  if (width >= desktop) {
    return 'desktop'
  }
  if (width >= largeDesktop) {
    return 'largeDesktop'
  }
  return 'mobile'
}

export function useCurrentBreakpoint(props: BreakpointProps) {
  const [breakpoint, setBreakpoint] = useState(getBreakpoint(props))

  useEffect(() => {
    const onResize = () => setBreakpoint(getBreakpoint(props))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return breakpoint as 'desktop' | 'largeDesktop' | 'mobile' | 'tablet'
}
