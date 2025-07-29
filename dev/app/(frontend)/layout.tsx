import config from '@payload-config'
import { FontHead, getTheme, ThemeProvider } from 'theme-global/client'

import './global.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { cssVariables, fontCSS, themeData } = await getTheme({ config })
  const { fontBody, fontHeading } = themeData.typography || {}

  return (
    <html
      className="font-family"
      dir={(cssVariables as Record<string, string>)['--theme-font-direction'] || 'ltr'}
      lang="en" 
      style={cssVariables}
      suppressHydrationWarning
    >
      <head>
        {fontBody && <FontHead fontName={fontBody} />}
        {fontHeading && <FontHead fontName={fontHeading} />}
        {fontCSS && <style dangerouslySetInnerHTML={{ __html: fontCSS }} />}
      </head>
      <body>
        <ThemeProvider themeData={themeData}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
