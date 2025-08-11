import React from "react"

import { Typography } from "../../theme/typography"

const PRIMITIVE_PRIMARY = [
    { name: '--primary-50', label: 'Primary 50' },
    { name: '--primary-100', label: 'Primary 100' },
    { name: '--primary-200', label: 'Primary 200' },
    { name: '--primary-300', label: 'Primary 300' },
    { name: '--primary-400', label: 'Primary 400' },
    { name: '--primary-500', label: 'Primary 500' },
    { name: '--primary-600', label: 'Primary 600' },
    { name: '--primary-700', label: 'Primary 700' },
    { name: '--primary-800', label: 'Primary 800' },
    { name: '--primary-900', label: 'Primary 900' },
    { name: '--primary-950', label: 'Primary 950' },
]
  
const PRIMITIVE_SECONDARY = [
    { name: '--secondary-50', label: 'Secondary 50' },
    { name: '--secondary-100', label: 'Secondary 100' },
    { name: '--secondary-200', label: 'Secondary 200' },
    { name: '--secondary-300', label: 'Secondary 300' },
    { name: '--secondary-400', label: 'Secondary 400' },
    { name: '--secondary-500', label: 'Secondary 500' },
    { name: '--secondary-600', label: 'Secondary 600' },
    { name: '--secondary-700', label: 'Secondary 700' },
    { name: '--secondary-800', label: 'Secondary 800' },
    { name: '--secondary-900', label: 'Secondary 900' },
    { name: '--secondary-950', label: 'Secondary 950' },
]
  
const SEMANTIC_COLORS = [
    { name: '--color-primary', label: 'Primary (Semantic)' },
    { name: '--text-on-primary', label: 'Text on Primary' },
    { name: '--color-secondary', label: 'Secondary (Semantic)' },
    { name: '--text-on-secondary', label: 'Text on Secondary' },
    { name: '--card-background', label: 'Card Background' },
    { name: '--text-on-card', label: 'Text on Card' },
    { name: '--page-background', label: 'Page Background' },
    { name: '--text-on-page', label: 'Text on Page' },
]

function getVarValue(varName: string) {
    if (typeof window !== 'undefined') {
      return getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
    }
    return ''
}
  
const ColorSwatch = ({ label, varName }: { label: string; varName: string }) => {
    const [hex, setHex] = React.useState('')
    React.useEffect(() => {
      setHex(getVarValue(varName))
      const handler = () => setHex(getVarValue(varName))
      window.addEventListener('theme-update', handler)
      return () => window.removeEventListener('theme-update', handler)
    }, [varName])
    return (
      <div
        className="flex items-center gap-4 p-2 rounded border border-[#E6E6E6] shadow-[0px_2px_12px_-1px_rgba(10,9,11,0.10),0px_2px_2px_-1px_rgba(10,9,11,0.04),0px_0px_0px_1px_rgba(10,9,11,0.05)]"
        style={{ background: `var(--card-background)`, color: `var(--text-on-card)` }}
      >
        <div
          className="w-10 h-10 rounded border fill-primary"
          style={{ background: `var(${varName})` }}
          title={hex}
        />
        <div className="flex flex-col">
          <span className="font-mono text-sm" style={{ color: `var(--text-on-card)` }}>
            {label}
          </span>
          <span className="font-mono text-sm text-gray-400" style={{ color: `var(--text-on-card)` }}>
            {varName}
          </span>
          <span className="font-mono text-sm text-gray-900" style={{ color: `var(--text-on-card)` }}>
            {hex}
          </span>
        </div>
      </div>
    )
}
  

export default function ColorsContent() {
    return (
      <div className="flex flex-1">
        <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl border border-neutral-200 p-4 md:p-10 dark:border-neutral-700">
          <Typography tagType="h1">Color System</Typography>
  
          {/* Semantic */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span aria-label="Semantic Colors" role="img">
                ⚔️
              </span>
              <span>Website Colors</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SEMANTIC_COLORS.map((f) => (
                <ColorSwatch key={f.name} label={f.label} varName={f.name} />
              ))}
            </div>
          </section>
  
          {/* Primitives */}
          <section className="mt-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span aria-label="Theme Colors" role="img">
                🎨
              </span>
              <span>Theme Colors</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-2">Primary Scale</h3>
                <div className="flex flex-col gap-1">
                  {PRIMITIVE_PRIMARY.map((f) => (
                    <ColorSwatch key={f.name} label={f.label} varName={f.name} />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Secondary Scale</h3>
                <div className="flex flex-col gap-1">
                  {PRIMITIVE_SECONDARY.map((f) => (
                    <ColorSwatch key={f.name} label={f.label} varName={f.name} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }