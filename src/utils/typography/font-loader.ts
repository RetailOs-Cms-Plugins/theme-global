import fs from 'fs'
import path from 'path'

import type { FontDefinition } from '../../types/typography'

import { allFonts, getFontDefinition } from './font-definitions'

export class FontLoader {
  private loadedFonts = new Set<string>()

  private async loadGoogleFont(fontDef: FontDefinition): Promise<void> {
    const link = document.createElement('link')
    link.href = `https://fonts.googleapis.com/css2?family=${fontDef.source.googleFamily}&display=swap`
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    return new Promise((resolve) => {
      link.onload = () => resolve()
    })
  }

  private async loadLocalFont(fontDef: FontDefinition): Promise<void> {
    const fontFace = new FontFace(
      fontDef.displayName,
      `url('${fontDef.source.files?.woff2}') format('woff2'), 
        url('${fontDef.source.files?.woff}') format('woff')`,
    )

    await fontFace.load()
    document.fonts.add(fontFace)
  }

  generateFontCSSVariables(selectedFont: string, fallbackFonts: string[]): React.CSSProperties {
    const fontDef = allFonts.find((f) => f.name === selectedFont)
    if (!fontDef) {
      return {}
    }

    const fontStack = [fontDef.displayName, ...fallbackFonts].join(', ')

    return {
      '--theme-font-direction': fontDef.supports.scripts.includes('hebrew') ? 'rtl' : 'ltr',
      '--theme-font-family': fontStack,
    } as React.CSSProperties
  }

  async loadFont(fontName: string): Promise<void> {
    console.log('🚀 ~ font-loader.ts:70 ~ FontLoader ~ loadFont ~ fontName:', fontName)
    if (this.loadedFonts.has(fontName)) {
      return
    }

    const fontDef = allFonts.find((f) => f.name === fontName)
    if (!fontDef) {
      throw new Error(`Font ${fontName} not found`)
    }

    switch (fontDef.source.type) {
      case 'google':
        await this.loadGoogleFont(fontDef)
        break
      case 'local':
        await this.loadLocalFont(fontDef)
        break
      case 'system':
        // System fonts don't need loading
        break
    }

    this.loadedFonts.add(fontName)
  }
}

export const fontLoader = new FontLoader()

export function generateFontVariables(
  selectedFont: string,
  fallbackFonts: string[],
): React.CSSProperties {
  const fontDef = getFontDefinition(selectedFont)
  if (!fontDef) {
    return {}
  }

  const fontStack = [fontDef.displayName, ...fallbackFonts].join(', ')
  console.log('🚀 ~ font-loader.ts:86 ~ fontStack:', fontStack)

  return {
    '--theme-font-direction': fontDef.supports.scripts.includes('hebrew') ? 'rtl' : 'ltr',
    '--theme-font-display-name': fontDef.displayName,
    '--theme-font-family': fontStack,
    '--theme-font-type': fontDef.source.type,
  } as React.CSSProperties
}

export function generateFontCSS(selectedFont: string, fallbackFonts: string[]): string {
  const fontDef = getFontDefinition(selectedFont)
  if (!fontDef) {
    return ''
  }

  const fontStack = [fontDef.displayName, ...fallbackFonts].join(', ')
  let css = ''

  // 1. Google Fonts - Add @import at the top
  if (fontDef.source.type === 'google') {
    css += `@import url('https://fonts.googleapis.com/css2?family=${fontDef.source.googleFamily}&display=swap');\n\n`
  }

  // 2. Local Fonts - Only add @font-face if files exist
  if (fontDef.source.type === 'local' && fontDef.source.files) {
    // Check if fonts actually exist in public directory
    const publicDir = process.cwd().includes('dev')
      ? path.join(process.cwd(), 'public')
      : path.join(process.cwd(), 'dev/public')

    const woff2Path = fontDef.source.files.woff2?.replace('/fonts/', '')
    const woffPath = fontDef.source.files.woff?.replace('/fonts/', '')

    const woff2Exists = woff2Path && fs.existsSync(path.join(publicDir, 'fonts', woff2Path))
    const woffExists = woffPath && fs.existsSync(path.join(publicDir, 'fonts', woffPath))

    if (woff2Exists || woffExists) {
      css += `
@font-face {
  font-family: '${fontDef.displayName}';
  src: ${woff2Exists ? `url('${fontDef.source.files.woff2}') format('woff2')` : ''}${woff2Exists && woffExists ? ',' : ''}
       ${woffExists ? `url('${fontDef.source.files.woff}') format('woff')` : ''};
  font-display: swap;
  font-weight: normal;
  font-style: normal;
}
`
    } else {
      console.warn(`⚠️ Font files not found for ${fontDef.displayName}, using fallbacks only`)
    }
  }

  // 3. CSS Custom Properties (always include)
  css += `
:root {
  --theme-font-direction: ${fontDef.supports.scripts.includes('hebrew') ? 'rtl' : 'ltr'};
  --theme-font-family: ${fontStack};
  --theme-font-display-name: '${fontDef.displayName}';
  --theme-font-type: ${fontDef.source.type};
}

.theme-font {
  font-family: var(--theme-font-family);
  direction: var(--theme-font-direction);
}
`

  return css
}
