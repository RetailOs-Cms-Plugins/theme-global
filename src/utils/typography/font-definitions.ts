import type { FontDefinition } from '../../types/typography'

export const hebrewFonts: FontDefinition[] = [
  {
    name: 'asimon-hebrew',
    displayName: 'Asimon Hebrew',
    preview: {
      english: 'Hello World - Sample Text',
      hebrew: 'שלום עולם - טקסט לדוגמה',
    },
    source: {
      type: 'local',
      fallbacks: ['Arial Hebrew', 'Tahoma', 'sans-serif'],
      files: {
        woff: '/fonts/he/asimon/asimon-regular-aaa.woff',
        woff2: '/fonts/he/asimon/asimon-regular-aaa.woff2',
      },
    },
    styles: ['normal'],
    supports: {
      languages: ['he', 'en'],
      scripts: ['hebrew', 'latin'],
    },
    weights: [400, 700],
  },
  {
    name: 'frank-ruhl-libre',
    displayName: 'Frank Ruhl Libre',
    preview: {
      english: 'Traditional Hebrew Script',
      hebrew: 'כתב יד עברי מסורתי',
    },
    source: {
      type: 'google',
      fallbacks: ['Times New Roman Hebrew', 'serif'],
      googleFamily: 'Frank+Ruhl+Libre:wght@300;400;500;700;900',
    },
    styles: ['normal'],
    supports: {
      languages: ['he', 'en'],
      scripts: ['hebrew', 'latin'],
    },
    weights: [300, 400, 500, 700, 900],
  },
  {
    name: 'noto-sans-hebrew',
    displayName: 'Noto Sans Hebrew',
    preview: {
      english: 'Modern Noto Hebrew Font',
      hebrew: 'גופן נטו עברי מודרני',
    },
    source: {
      type: 'google',
      fallbacks: ['Arial Hebrew', 'sans-serif'],
      googleFamily: 'Noto+Sans+Hebrew:wght@100;200;300;400;500;600;700;800;900',
    },
    styles: ['normal'],
    supports: {
      languages: ['he', 'en'],
      scripts: ['hebrew', 'latin'],
    },
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
]

export const englishFonts: FontDefinition[] = [
  {
    name: 'inter',
    displayName: 'Inter',
    preview: {
      english: 'The quick brown fox jumps',
    },
    source: {
      type: 'google',
      fallbacks: ['system-ui', '-apple-system', 'sans-serif'],
      googleFamily: 'Inter:wght@100;200;300;400;500;600;700;800;900',
    },
    styles: ['normal', 'italic'],
    supports: {
      languages: ['en'],
      scripts: ['latin'],
    },
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  // ... more English fonts
]

export const allFonts = [...hebrewFonts, ...englishFonts]

export const getFontDefinition = (fontName: string): FontDefinition | undefined => {
  return allFonts.find((font) => font.name === fontName)
}
