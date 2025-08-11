import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useCurrentBreakpoint } from '../../../../src/utils/typography/useCurrentBreakpoint.js'

// Mock window object with all necessary properties
const createMockWindow = (innerWidth = 1024) => ({
  addEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
  document: {},
  innerWidth,
  location: { href: 'http://localhost' },
  navigator: {},
  removeEventListener: vi.fn(),
})

describe('useCurrentBreakpoint', () => {
  let originalWindow: typeof globalThis & Window

  beforeAll(() => {
    originalWindow = global.window
  })

  beforeEach(() => {
    vi.clearAllMocks()
    global.window = createMockWindow(1024) as any
  })

  afterAll(() => {
    global.window = originalWindow
  })

  it('should return mobile for width < 768', () => {
    global.window = createMockWindow(500) as any
    const { result } = renderHook(() => useCurrentBreakpoint())
    
    expect(result.current).toBe('mobile')
  })

  it('should return tablet for width 768-1023', () => {
    global.window = createMockWindow(800) as any
    const { result } = renderHook(() => useCurrentBreakpoint())
    
    expect(result.current).toBe('tablet')
  })

  it('should return desktop for width 1024-1919', () => {
    global.window = createMockWindow(1200) as any
    const { result } = renderHook(() => useCurrentBreakpoint())
    
    expect(result.current).toBe('desktop')
  })

  it('should return largeDesktop for width >= 1920', () => {
    global.window = createMockWindow(2000) as any
    const { result } = renderHook(() => useCurrentBreakpoint())
    
    expect(result.current).toBe('largeDesktop')
  })

  it('should add resize event listener on mount', () => {
    const mockWindow = createMockWindow(1024)
    global.window = mockWindow as any
    
    renderHook(() => useCurrentBreakpoint())
    
    expect(mockWindow.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
  })

  it('should remove resize event listener on unmount', () => {
    const mockWindow = createMockWindow(1024)
    global.window = mockWindow as any
    
    const { unmount } = renderHook(() => useCurrentBreakpoint())
    
    unmount()
    
    expect(mockWindow.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
  })

  it('should update breakpoint on window resize', () => {
    const mockWindow = createMockWindow(500)
    global.window = mockWindow as any
    
    const { result } = renderHook(() => useCurrentBreakpoint())
    
    expect(result.current).toBe('mobile')

    // Simulate window resize
    act(() => {
      mockWindow.innerWidth = 1200
      const resizeHandler = mockWindow.addEventListener.mock.calls[0][1]
      resizeHandler()
    })

    expect(result.current).toBe('desktop')
  })

  it('should handle multiple resize events', () => {
    const mockWindow = createMockWindow(500)
    global.window = mockWindow as any
    
    const { result } = renderHook(() => useCurrentBreakpoint())
    
    expect(result.current).toBe('mobile')

    // First resize
    act(() => {
      mockWindow.innerWidth = 800
      const resizeHandler = mockWindow.addEventListener.mock.calls[0][1]
      resizeHandler()
    })
    expect(result.current).toBe('tablet')

    // Second resize
    act(() => {
      mockWindow.innerWidth = 2000
      const resizeHandler = mockWindow.addEventListener.mock.calls[0][1]
      resizeHandler()
    })
    expect(result.current).toBe('largeDesktop')
  })
}) 