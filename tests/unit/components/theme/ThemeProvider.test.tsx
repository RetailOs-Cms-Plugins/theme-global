import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it } from 'vitest'

import { ThemeProvider, useTheme } from '../../../../src/components/theme/ThemeProvider.js'
import { createMockThemeConfig } from '../../../mocks/index.js'

// Test component that uses the useTheme hook
const TestConsumer = () => {
  const themeData = useTheme()
  
  return (
    <div data-testid="theme-consumer">
      {themeData ? (
        <>
          <span data-testid="primary-color">{themeData.colorPrimary}</span>
          <span data-testid="secondary-color">{themeData.colorSecondary}</span>
          <span data-testid="font-body">{themeData.typography.fontBody}</span>
        </>
      ) : (
        <span data-testid="no-theme">No theme data</span>
      )}
    </div>
  )
}

describe('ThemeProvider', () => {
  describe('Component Rendering', () => {
    it('should render children without crashing', () => {
      const mockTheme = createMockThemeConfig()
      
      render(
        <ThemeProvider themeData={mockTheme}>
          <div data-testid="child">Child content</div>
        </ThemeProvider>
      )
      
      expect(screen.getByTestId('child')).toBeInTheDocument()
      expect(screen.getByText('Child content')).toBeInTheDocument()
    })

    it('should render with minimal theme configuration', () => {
      const minimalTheme = createMockThemeConfig({
        colorPrimary: '#ff0000',
        colorSecondary: '#00ff00',
      })
      
      render(
        <ThemeProvider themeData={minimalTheme}>
          <TestConsumer />
        </ThemeProvider>
      )
      
      expect(screen.getByTestId('primary-color')).toHaveTextContent('#ff0000')
      expect(screen.getByTestId('secondary-color')).toHaveTextContent('#00ff00')
    })
  })

  describe('Theme Context', () => {
    it('should provide theme data to consuming components', () => {
      const mockTheme = createMockThemeConfig()
      
      render(
        <ThemeProvider themeData={mockTheme}>
          <TestConsumer />
        </ThemeProvider>
      )
      
      expect(screen.getByTestId('primary-color')).toHaveTextContent(mockTheme.colorPrimary)
      expect(screen.getByTestId('secondary-color')).toHaveTextContent(mockTheme.colorSecondary)
      expect(screen.getByTestId('font-body')).toHaveTextContent(mockTheme.typography.fontBody!)
    })

    it('should update theme data when props change', () => {
      const initialTheme = createMockThemeConfig({ colorPrimary: '#blue' })
      const updatedTheme = createMockThemeConfig({ colorPrimary: '#red' })
      
      const { rerender } = render(
        <ThemeProvider themeData={initialTheme}>
          <TestConsumer />
        </ThemeProvider>
      )
      
      expect(screen.getByTestId('primary-color')).toHaveTextContent('#blue')
      
      rerender(
        <ThemeProvider themeData={updatedTheme}>
          <TestConsumer />
        </ThemeProvider>
      )
      
      expect(screen.getByTestId('primary-color')).toHaveTextContent('#red')
    })
  })

  describe('useTheme Hook', () => {
    it('should return null when used outside ThemeProvider', () => {
      const TestComponentOutsideProvider = () => {
        const themeData = useTheme()
        return <div data-testid="outside-provider">{themeData ? 'Has theme' : 'No theme'}</div>
      }
      
      render(<TestComponentOutsideProvider />)
      
      expect(screen.getByTestId('outside-provider')).toHaveTextContent('No theme')
    })

    it('should return theme data when used inside ThemeProvider', () => {
      const mockTheme = createMockThemeConfig()
      
      render(
        <ThemeProvider themeData={mockTheme}>
          <TestConsumer />
        </ThemeProvider>
      )
      
      expect(screen.getByTestId('theme-consumer')).toBeInTheDocument()
      expect(screen.queryByTestId('no-theme')).not.toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle theme data with missing typography configuration', () => {
      const themeWithoutTypography = createMockThemeConfig()
      // Remove typography to test fallback
      // @ts-expect-error - Intentionally removing required field for testing
      delete themeWithoutTypography.typography
      
      render(
        <ThemeProvider themeData={themeWithoutTypography}>
          <div data-testid="no-typography-theme">Test</div>
        </ThemeProvider>
      )
      
      expect(screen.getByTestId('no-typography-theme')).toBeInTheDocument()
    })

    it('should handle rapid theme changes', () => {
      const theme1 = createMockThemeConfig({ colorPrimary: '#111111' })
      const theme2 = createMockThemeConfig({ colorPrimary: '#222222' })
      const theme3 = createMockThemeConfig({ colorPrimary: '#333333' })
      
      const { rerender } = render(
        <ThemeProvider themeData={theme1}>
          <TestConsumer />
        </ThemeProvider>
      )
      
      // Rapid successive updates
      rerender(
        <ThemeProvider themeData={theme2}>
          <TestConsumer />
        </ThemeProvider>
      )
      
      rerender(
        <ThemeProvider themeData={theme3}>
          <TestConsumer />
        </ThemeProvider>
      )
      
      expect(screen.getByTestId('primary-color')).toHaveTextContent('#333333')
    })

    it('should handle complex nested typography configuration', () => {
      const complexTheme = createMockThemeConfig({
        typography: {
          ...createMockThemeConfig().typography,
          direction: 'rtl' as const,
          h1: { fontSize: '3rem', lineHeight: '3.5rem' },
        },
      })
      
      const ComplexTypographyConsumer = () => {
        const themeData = useTheme()
        return (
          <div>
            <span data-testid="h1-font-size">{themeData?.typography.h1?.fontSize}</span>
            <span data-testid="direction">{themeData?.typography.direction}</span>
          </div>
        )
      }
      
      render(
        <ThemeProvider themeData={complexTheme}>
          <ComplexTypographyConsumer />
        </ThemeProvider>
      )
      
      expect(screen.getByTestId('h1-font-size')).toHaveTextContent('3rem')
      expect(screen.getByTestId('direction')).toHaveTextContent('rtl')
    })
  })

  describe('Multiple Providers', () => {
    it('should support nested providers with different themes', () => {
      const outerTheme = createMockThemeConfig({ colorPrimary: '#outer' })
      const innerTheme = createMockThemeConfig({ colorPrimary: '#inner' })
      
      const OuterConsumer = () => {
        const themeData = useTheme()
        return <span data-testid="outer-theme">{themeData?.colorPrimary}</span>
      }
      
      const InnerConsumer = () => {
        const themeData = useTheme()
        return <span data-testid="inner-theme">{themeData?.colorPrimary}</span>
      }
      
      render(
        <ThemeProvider themeData={outerTheme}>
          <OuterConsumer />
          <ThemeProvider themeData={innerTheme}>
            <InnerConsumer />
          </ThemeProvider>
        </ThemeProvider>
      )
      
      expect(screen.getByTestId('outer-theme')).toHaveTextContent('#outer')
      expect(screen.getByTestId('inner-theme')).toHaveTextContent('#inner')
    })
  })
}) 