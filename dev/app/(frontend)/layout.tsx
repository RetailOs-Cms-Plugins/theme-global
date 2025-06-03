import { getTheme } from 'app/actions/theme.actions'

import './global.css'

async function rootLayout({ children }: { children: React.ReactNode }) {
  const cssVariables = await getTheme()

  console.log('🚀 ~ layout.tsx:39 ~ rootLayout ~ cssVariables:', cssVariables)

  return (
    <html
      className="font-family"
      dir={(cssVariables as any)['--theme-font-direction']}
      lang="en"
      style={cssVariables}
      suppressHydrationWarning
    >
      <body>
        <div>{children}</div>
      </body>
    </html>
  )
}

export default rootLayout
