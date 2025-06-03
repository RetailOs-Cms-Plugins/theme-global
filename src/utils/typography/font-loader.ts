import type { FontDefinition } from '../../types/typography'

import { allFonts } from './font-definitions'

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

  generateFontCSSVariables(selectedFont: string): React.CSSProperties {
    const fontDef = allFonts.find((f) => f.name === selectedFont)
    if (!fontDef) {
      return {}
    }

    const fontStack = [fontDef.displayName, ...fontDef.source.fallbacks].join(', ')

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
