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
      // fallbacks: ['Arial Hebrew', 'Tahoma', 'sans-serif'],
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
      // fallbacks: ['Times New Roman Hebrew', 'serif'],
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
      // fallbacks: ['Arial Hebrew', 'sans-serif'],
      googleFamily: 'Noto+Sans+Hebrew:wght@100;200;300;400;500;600;700;800;900',
    },
    styles: ['normal'],
    supports: {
      languages: ['he', 'en'],
      scripts: ['hebrew', 'latin'],
    },
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: 'noto-serif-hebrew',
    displayName: 'Noto Serif Hebrew',
    preview: {
      english: 'Serif Noto Hebrew Font',
      hebrew: 'גופן נטו עברי סריף',
    },
    source: {
      type: 'google',
      googleFamily: 'Noto+Serif+Hebrew:wght@100;200;300;400;500;600;700;800;900',
    },
    styles: ['normal'],
    supports: {
      languages: ['he', 'en'],
      scripts: ['hebrew', 'latin'],
    },
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: 'noto-rashi-hebrew',
    displayName: 'Noto Rashi Hebrew',
    preview: {
      english: 'Rashi script Hebrew Font',
      hebrew: 'גופן רש״י עברי',
    },
    source: {
      type: 'google',
      googleFamily: 'Noto+Rashi+Hebrew:wght@100;200;300;400;500;600;700;800;900',
    },
    styles: ['normal'],
    supports: {
      languages: ['he', 'en'],
      scripts: ['hebrew', 'latin'],
    },
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: 'heebo',
    displayName: 'Heebo',
    preview: {
      english: 'Modern Hebrew sans-serif',
      hebrew: 'גופן עברי מודרני',
    },
    source: {
      type: 'google',
      googleFamily: 'Heebo:wght@100;200;300;400;500;600;700;800;900',
    },
    styles: ['normal'],
    supports: {
      languages: ['he', 'en'],
      scripts: ['hebrew', 'latin'],
    },
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: 'rubik',
    displayName: 'Rubik',
    preview: {
      english: 'Rounded geometric typeface',
      hebrew: 'גופן גיאומטרי מעוגל',
    },
    source: {
      type: 'google',
      googleFamily: 'Rubik:wght@300;400;500;600;700;800;900',
    },
    styles: ['normal', 'italic'],
    supports: {
      languages: ['he', 'en'],
      scripts: ['hebrew', 'latin'],
    },
    weights: [300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: 'assistant',
    displayName: 'Assistant',
    preview: {
      english: 'Clean and friendly typeface',
      hebrew: 'גופן נקי וידידותי',
    },
    source: {
      type: 'google',
      googleFamily: 'Assistant:wght@200;300;400;500;600;700;800',
    },
    styles: ['normal'],
    supports: {
      languages: ['he', 'en'],
      scripts: ['hebrew', 'latin'],
    },
    weights: [200, 300, 400, 500, 600, 700, 800],
  },
  {
    name: 'secular-one',
    displayName: 'Secular One',
    preview: {
      english: 'Distinctive display typeface',
      hebrew: 'גופן תצוגה ייחודי',
    },
    source: {
      type: 'google',
      googleFamily: 'Secular+One',
    },
    styles: ['normal'],
    supports: {
      languages: ['he', 'en'],
      scripts: ['hebrew', 'latin'],
    },
    weights: [400],
  },
  {
    name: 'suez-one',
    displayName: 'Suez One',
    preview: {
      english: 'Bold display typeface',
      hebrew: 'גופן תצוגה מודגש',
    },
    source: {
      type: 'google',
      googleFamily: 'Suez+One',
    },
    styles: ['normal'],
    supports: {
      languages: ['he', 'en'],
      scripts: ['hebrew', 'latin'],
    },
    weights: [400],
  },
  {
    name: 'alef',
    displayName: 'Alef',
    preview: {
      english: 'Simple and clean Hebrew font',
      hebrew: 'גופן עברי פשוט ונקי',
    },
    source: {
      type: 'google',
      googleFamily: 'Alef:wght@400;700',
    },
    styles: ['normal'],
    supports: {
      languages: ['he', 'en'],
      scripts: ['hebrew', 'latin'],
    },
    weights: [400, 700],
  },
  {
    name: 'miriam-libre',
    displayName: 'Miriam Libre',
    preview: {
      english: 'Traditional Hebrew serif',
      hebrew: 'גופן עברי מסורתי עם סריפים',
    },
    source: {
      type: 'google',
      googleFamily: 'Miriam+Libre:wght@400;700',
    },
    styles: ['normal'],
    supports: {
      languages: ['he', 'en'],
      scripts: ['hebrew', 'latin'],
    },
    weights: [400, 700],
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
      // fallbacks: ['system-ui', '-apple-system', 'sans-serif'],
      googleFamily: 'Inter:wght@100;200;300;400;500;600;700;800;900',
    },
    styles: ['normal', 'italic'],
    supports: {
      languages: ['en'],
      scripts: ['latin'],
    },
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: 'manrope',
    displayName: 'Manrope',
    preview: {
      english: 'Modern geometric sans-serif',
    },
    source: {
      type: 'google',
      googleFamily: 'Manrope:wght@200;300;400;500;600;700;800',
    },
    styles: ['normal'],
    supports: {
      languages: ['en'],
      scripts: ['latin'],
    },
    weights: [200, 300, 400, 500, 600, 700, 800],
  },
  {
    name: 'dm-sans',
    displayName: 'DM Sans',
    preview: {
      english: 'Clean and versatile typeface',
    },
    source: {
      type: 'google',
      googleFamily: 'DM+Sans:wght@100;200;300;400;500;600;700;800;900',
    },
    styles: ['normal', 'italic'],
    supports: {
      languages: ['en'],
      scripts: ['latin'],
    },
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: 'nunito',
    displayName: 'Nunito',
    preview: {
      english: 'Rounded sans-serif design',
    },
    source: {
      type: 'google',
      googleFamily: 'Nunito:wght@200;300;400;500;600;700;800;900',
    },
    styles: ['normal', 'italic'],
    supports: {
      languages: ['en'],
      scripts: ['latin'],
    },
    weights: [200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: 'epilogue',
    displayName: 'Epilogue',
    preview: {
      english: 'Contemporary variable font',
    },
    source: {
      type: 'google',
      googleFamily: 'Epilogue:wght@100;200;300;400;500;600;700;800;900',
    },
    styles: ['normal', 'italic'],
    supports: {
      languages: ['en'],
      scripts: ['latin'],
    },
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: 'mulish',
    displayName: 'Mulish',
    preview: {
      english: 'Minimalist sans-serif font',
    },
    source: {
      type: 'google',
      googleFamily: 'Mulish:wght@200;300;400;500;600;700;800;900',
    },
    styles: ['normal', 'italic'],
    supports: {
      languages: ['en'],
      scripts: ['latin'],
    },
    weights: [200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: 'lexend',
    displayName: 'Lexend',
    preview: {
      english: 'Improved reading proficiency',
    },
    source: {
      type: 'google',
      googleFamily: 'Lexend:wght@100;200;300;400;500;600;700;800;900',
    },
    styles: ['normal'],
    supports: {
      languages: ['en'],
      scripts: ['latin'],
    },
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: 'public-sans',
    displayName: 'Public Sans',
    preview: {
      english: 'Government-inspired typeface',
    },
    source: {
      type: 'google',
      googleFamily: 'Public+Sans:wght@100;200;300;400;500;600;700;800;900',
    },
    styles: ['normal', 'italic'],
    supports: {
      languages: ['en'],
      scripts: ['latin'],
    },
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: 'jost',
    displayName: 'Jost',
    preview: {
      english: 'Geometric sans-serif inspired',
    },
    source: {
      type: 'google',
      googleFamily: 'Jost:wght@100;200;300;400;500;600;700;800;900',
    },
    styles: ['normal', 'italic'],
    supports: {
      languages: ['en'],
      scripts: ['latin'],
    },
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: 'sora',
    displayName: 'Sora',
    preview: {
      english: 'Modern and friendly typeface',
    },
    source: {
      type: 'google',
      googleFamily: 'Sora:wght@100;200;300;400;500;600;700;800',
    },
    styles: ['normal'],
    supports: {
      languages: ['en'],
      scripts: ['latin'],
    },
    weights: [100, 200, 300, 400, 500, 600, 700, 800],
  },
  // ... more English fonts
]

export const allFonts = [...hebrewFonts, ...englishFonts]

export const getFontDefinition = (fontName: string): FontDefinition | undefined => {
  return allFonts.find((font) => font.name === fontName)
}
