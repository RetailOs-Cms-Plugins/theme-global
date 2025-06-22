import { getFontDefinition } from '../../utils/typography/font-definitions'

interface FontHeadProps {
  fontName: string
}

export function FontHead({ fontName }: FontHeadProps) {
  const fontDef = getFontDefinition(fontName)
  console.log('🚀 ~ font-head.tsx:9 ~ FontHead ~ fontDef:', fontDef)

  if (!fontDef) {
    return null
  }

  // Handle Google Fonts
  if (fontDef.source.type === 'google') {
    return (
      <>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="anonymous" href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href={`https://fonts.googleapis.com/css2?family=${fontDef.source.googleFamily}&display=swap`}
          rel="stylesheet"
        />
      </>
    )
  }

  // For local fonts, preload the actual font files
  if (fontDef.source.type === 'local' && fontDef.source.files) {
    return (
      <>
        {/* Preload WOFF2 (modern browsers) */}
        {fontDef.source.files.woff2 && (
          <link
            as="font"
            crossOrigin="anonymous"
            href={fontDef.source.files.woff2}
            rel="preload"
            type="font/woff2"
          />
        )}

        {/* Preload WOFF (fallback) */}
        {fontDef.source.files.woff && (
          <link
            as="font"
            crossOrigin="anonymous"
            href={fontDef.source.files.woff}
            rel="preload"
            type="font/woff"
          />
        )}
      </>
    )
  }

  // For system fonts, no loading needed
  return null
}
