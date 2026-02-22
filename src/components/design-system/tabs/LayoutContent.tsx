import { useTheme } from '../../theme/ThemeProvider'
import { Typography } from '../../theme/typography'

export default function LayoutContent() {
  const themeData = useTheme()

  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl border border-neutral-200 p-4 md:p-10 dark:border-neutral-700">
        <Typography tagType="h1">Layout & Spacing</Typography>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Layout Grid</h2>
            <div className="space-y-4">
              <label className="text-sm font-medium" htmlFor="container-width">
                Container Width
              </label>
              <input
                aria-label="Container Width"
                className="w-full p-2 border rounded bg-card text-on-card"
                id="container-width"
                readOnly
                type="text"
                value={
                  themeData?.layout?.maxWidth && themeData.layout.maxWidth !== 0
                    ? `${themeData.layout.maxWidth}px`
                    : '1360px'
                }
              />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Breakpoints</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="breakpoint-mobile">
                  Mobile
                </label>
                <input
                  aria-label="Mobile Breakpoint"
                  className="w-full p-2 border rounded bg-card text-on-card"
                  id="breakpoint-mobile"
                  readOnly
                  type="text"
                  value={
                    themeData?.layout?.breakpoints?.mobile
                      ? `${themeData.layout.breakpoints.mobile}px`
                      : '640px'
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="breakpoint-tablet">
                  Tablet
                </label>
                <input
                  aria-label="Tablet Breakpoint"
                  className="w-full p-2 border rounded bg-card text-on-card"
                  id="breakpoint-tablet"
                  readOnly
                  type="text"
                  value={
                    themeData?.layout?.breakpoints?.tablet
                      ? `${themeData.layout.breakpoints.tablet}px`
                      : '768px'
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="breakpoint-desktop">
                  Desktop
                </label>
                <input
                  aria-label="Desktop Breakpoint"
                  className="w-full p-2 border rounded bg-card text-on-card"
                  id="breakpoint-desktop"
                  readOnly
                  type="text"
                  value={
                    themeData?.layout?.breakpoints?.desktop
                      ? `${themeData.layout.breakpoints.desktop}px`
                      : '1024px'
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="breakpoint-large-desktop">
                  Large Desktop
                </label>
                <input
                  aria-label="Large Desktop Breakpoint"
                  className="w-full p-2 border rounded bg-card text-on-card"
                  id="breakpoint-large-desktop"
                  readOnly
                  type="text"
                  value={
                    themeData?.layout?.breakpoints?.largeDesktop
                      ? `${themeData.layout.breakpoints.largeDesktop}px`
                      : '1280px'
                  }
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Border Radius</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="border-radius-box">
                  Box Border Radius
                </label>
                <input
                  aria-label="Box Border Radius"
                  className="w-full p-2 border rounded bg-card text-center font-mono"
                  id="border-radius-box"
                  readOnly
                  type="text"
                  value={themeData?.layout?.borderRadius?.box || '0.5rem'}
                />
                <div className="text-xs text-on-card">Border radius for boxes</div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="border-radius-button">
                  Button Border Radius
                </label>
                <input
                  aria-label="Button Border Radius"
                  className="w-full p-2 border rounded bg-card text-center font-mono"
                  id="border-radius-button"
                  readOnly
                  type="text"
                  value={themeData?.layout?.borderRadius?.button || '9999px'}
                />
                <div className="text-xs text-on-card">Border radius for buttons</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
