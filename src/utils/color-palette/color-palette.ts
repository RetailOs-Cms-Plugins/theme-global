import chroma from 'chroma-js'

// Tailwind color themes
export const TAILWIND_THEMES = {
  default: {
    primary: '#a855f7', // Purple
    secondary: '#0ea5e9', // Sky
  },
  slate: {
    primary: '#64748b',
    secondary: '#94a3b8',
  },
  gray: {
    primary: '#6b7280',
    secondary: '#9ca3af',
  },
  zinc: {
    primary: '#71717a',
    secondary: '#a1a1aa',
  },
  neutral: {
    primary: '#737373',
    secondary: '#a3a3a3',
  },
  stone: {
    primary: '#78716c',
    secondary: '#a8a29e',
  },
  red: {
    primary: '#ef4444',
    secondary: '#f87171',
  },
  orange: {
    primary: '#f97316',
    secondary: '#fb923c',
  },
  amber: {
    primary: '#f59e0b',
    secondary: '#fbbf24',
  },
  yellow: {
    primary: '#eab308',
    secondary: '#facc15',
  },
  lime: {
    primary: '#84cc16',
    secondary: '#a3e635',
  },
  green: {
    primary: '#22c55e',
    secondary: '#4ade80',
  },
  emerald: {
    primary: '#10b981',
    secondary: '#34d399',
  },
  teal: {
    primary: '#14b8a6',
    secondary: '#2dd4bf',
  },
  cyan: {
    primary: '#06b6d4',
    secondary: '#22d3ee',
  },
  sky: {
    primary: '#0ea5e9',
    secondary: '#38bdf8',
  },
  blue: {
    primary: '#3b82f6',
    secondary: '#60a5fa',
  },
  indigo: {
    primary: '#6366f1',
    secondary: '#818cf8',
  },
  violet: {
    primary: '#8b5cf6',
    secondary: '#a78bfa',
  },
  purple: {
    primary: '#a855f7',
    secondary: '#c084fc',
  },
  fuchsia: {
    primary: '#d946ef',
    secondary: '#e879f9',
  },
  pink: {
    primary: '#ec4899',
    secondary: '#f472b6',
  },
  rose: {
    primary: '#f43f5e',
    secondary: '#fb7185',
  },
} as const

export type TailwindTheme = keyof typeof TAILWIND_THEMES

export function generateColorScale(
  baseColor: string,
  variableName: string,
): Record<string, string> {
  const weights = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
  const scale = chroma.scale(['white', baseColor, 'black'])
    .mode('lab')
    .colors(weights.length)
    .map(color => chroma(color).hex())

  return weights.reduce((acc: Record<string, string>, weight: number, index: number) => {
    acc[`--color-${variableName}-${weight}`] = scale[index]
    return acc
  }, {})
}
