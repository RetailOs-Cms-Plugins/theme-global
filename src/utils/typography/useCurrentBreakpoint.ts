import { useEffect, useState } from 'react'

const getBreakpoint = () => {
  if (typeof window === 'undefined') {
    return 'desktop'
  }
  const width = window.innerWidth
  if (width < 768) {
    return 'mobile'
  }
  if (width < 1024) {
    return 'tablet'
  }
  if (width < 1920) {
    return 'desktop'
  }
  return 'largeDesktop'
}

export function useCurrentBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(getBreakpoint())

  useEffect(() => {
    const onResize = () => setBreakpoint(getBreakpoint())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return breakpoint as 'desktop' | 'largeDesktop' | 'mobile' | 'tablet'
}
