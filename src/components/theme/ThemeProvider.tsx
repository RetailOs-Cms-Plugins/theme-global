import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext<any>(null)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeData, setThemeData] = useState<any>(null)

  useEffect(() => {
    // Fetch theme data from the API endpoint
    fetch('/api/globals/theme-config?depth=0&fallback-locale=null')
      .then((res) => res.json())
      .then((data) => setThemeData(data))
      .catch(console.error)
  }, [])

  return <ThemeContext.Provider value={themeData}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
