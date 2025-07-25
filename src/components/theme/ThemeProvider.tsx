import React, { createContext, useContext, useEffect, useState } from 'react'
import { ThemeConfig } from 'src/types'

const ThemeContext = createContext<ThemeConfig | null>(null)

export const ThemeProvider = ({
  children,
  themeData: propThemeData,
}: {
  children: React.ReactNode
  themeData: ThemeConfig
}) => {
  const [themeData, setThemeData] = useState<ThemeConfig | null>(null)

  useEffect(() => {
    setThemeData(propThemeData)
  }, [propThemeData])

  // useEffect(() => {
  //   // Fetch theme data from the API endpoint
  //   fetch('/api/globals/theme-config?depth=0&fallback-locale=null')
  //     .then((res) => res.json())
  //     .then((data) => setThemeData(data))
  //     .catch(console.error)
  // }, [])

  return <ThemeContext.Provider value={themeData}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
