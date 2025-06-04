'use client'

import type { ThemeData } from 'src/types/theme.types'

import { createContext, useContext, useEffect, useState } from 'react'

import { fontLoader } from '../../utils/typography/font-loader'

interface ThemeContextType {
  isLoading: boolean
  theme: ThemeData
  updateTheme: (newTheme: Partial<ThemeData>) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: React.ReactNode
  initialTheme: ThemeData
}

export function ThemeProvider({ children, initialTheme }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeData>(initialTheme)
  const [isLoading, setIsLoading] = useState(false)

  // Load fonts on the client side
  useEffect(() => {
    const loadFonts = async () => {
      setIsLoading(true)
      try {
        await fontLoader.loadFont(theme.typography.fontFamily)
      } catch (error) {
        console.error('Failed to load font:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadFonts()
  }, [theme.typography.fontFamily])

  // Apply theme changes to CSS variables
  useEffect(() => {
    const root = document.documentElement
    const variables = fontLoader.generateFontCSSVariables(theme.typography.fontFamily)

    Object.entries(variables).forEach(([key, value]) => {
      root.style.setProperty(key, value as string)
    })
  }, [theme])

  const updateTheme = async (newTheme: Partial<ThemeData>) => {
    setTheme((prev) => ({ ...prev, ...newTheme }))
  }

  return (
    <ThemeContext.Provider value={{ isLoading, theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
