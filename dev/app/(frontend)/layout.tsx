import { getTheme } from 'app/actions/theme.actions'

import { FontHead } from '../../../src/components/theme/font-head'
import './global.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { cssVariables, fontCSS, themeData } = await getTheme()

  return (
    <html
      className="font-family"
      dir={(cssVariables as any)['--theme-font-direction'] as string}
      lang="en"
      style={cssVariables}
      suppressHydrationWarning
    >
      <head>
        <FontHead fontName={themeData.typography.fontFamily} />
        {fontCSS && <style dangerouslySetInnerHTML={{ __html: fontCSS }} />}
      </head>
      <body>{children}</body>
    </html>
  )
}
