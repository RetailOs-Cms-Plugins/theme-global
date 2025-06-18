'use client'
import { cn } from '@/lib/utils'
import { IconLayoutGrid, IconPalette, IconTypography } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import React, { useState } from 'react'

import { Sidebar, SidebarBody, SidebarLink } from '../ui/sidebar'

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
    <div className="flex items-center gap-4 p-2 rounded border border-[#E6E6E6] bg-white shadow-[0px_2px_12px_-1px_rgba(10,9,11,0.10),0px_2px_2px_-1px_rgba(10,9,11,0.04),0px_0px_0px_1px_rgba(10,9,11,0.05)]">
      <div
        className="w-10 h-10 rounded border bg-primary-500"
        style={{ background: `var(${varName})` }}
        title={hex}
      />
      <div className="flex flex-col">
        <span className="font-mono text-sm text-gray-700">{label}</span>
        <span className="font-mono text-sm text-gray-400">{varName}</span>
        <span className="font-mono text-sm text-gray-900">{hex}</span>
      </div>
    </div>
  )
}

const ColorsContent = () => {
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl border border-neutral-200 bg-white p-4 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
        <h1 className="text-3xl font-bold mb-8">Color System</h1>

        {/* Semantic */}
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span aria-label="Semantic Colors" role="img">
              ⚔️
            </span>{' '}
            Website Colors
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
            </span>{' '}
            Theme Colors
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

const TypographyContent = () => {
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl border border-neutral-200 bg-white p-4 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
        <h1 className="text-3xl font-bold mb-8">Typography</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Font Families</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Body Font</label>
                <select className="w-full p-2 border rounded">
                  <option>Inter (Google)</option>
                  <option>Poppins (Google)</option>
                  <option>Fira Code (Google)</option>
                </select>
                <p className="text-sm text-gray-500">Font family for body text</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Heading Font</label>
                <select className="w-full p-2 border rounded">
                  <option>Poppins (Google)</option>
                  <option>Inter (Google)</option>
                  <option>Fira Code (Google)</option>
                </select>
                <p className="text-sm text-gray-500">Font family for headings</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Monospace Font</label>
                <select className="w-full p-2 border rounded">
                  <option>Fira Code (Google)</option>
                  <option>Inter (Google)</option>
                  <option>Poppins (Google)</option>
                </select>
                <p className="text-sm text-gray-500">Font family for monospace text (code)</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Text Sizes</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">XS</label>
                <input className="w-full p-2 border rounded" type="text" value="0.75rem" />
                <p className="text-sm text-gray-500">Extra small text size</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">SM</label>
                <input className="w-full p-2 border rounded" type="text" value="0.875rem" />
                <p className="text-sm text-gray-500">Small text size</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Base</label>
                <input className="w-full p-2 border rounded" type="text" value="1rem" />
                <p className="text-sm text-gray-500">Base text size</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">LG</label>
                <input className="w-full p-2 border rounded" type="text" value="1.125rem" />
                <p className="text-sm text-gray-500">Large text size</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">XL</label>
                <input className="w-full p-2 border rounded" type="text" value="1.25rem" />
                <p className="text-sm text-gray-500">Extra large text size</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">2XL</label>
                <input className="w-full p-2 border rounded" type="text" value="1.5rem" />
                <p className="text-sm text-gray-500">2x large text size</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Text Direction</h2>
            <div className="space-y-2">
              <select className="w-full p-2 border rounded">
                <option>Auto (based on font)</option>
                <option>Left to Right (LTR)</option>
                <option>Right to Left (RTL)</option>
              </select>
              <p className="text-sm text-gray-500">Text direction for the website</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

const LayoutContent = () => {
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl border border-neutral-200 bg-white p-4 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
        <h1 className="text-3xl font-bold mb-8">Layout & Spacing</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Layout Grid</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Container Width</label>
                <select className="w-full p-2 border rounded">
                  <option>Full Width</option>
                  <option>Max Width (1280px)</option>
                  <option>Custom</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Grid Columns</label>
                <select className="w-full p-2 border rounded">
                  <option>12 Columns</option>
                  <option>16 Columns</option>
                  <option>Custom</option>
                </select>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Spacing Scale</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Base Spacing</label>
                <input className="w-full p-2 border rounded" type="text" value="1rem" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Scale Factor</label>
                <input className="w-full p-2 border rounded" type="number" value="1.5" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Breakpoints</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Mobile</label>
                <input className="w-full p-2 border rounded" type="text" value="640px" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tablet</label>
                <input className="w-full p-2 border rounded" type="text" value="768px" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Desktop</label>
                <input className="w-full p-2 border rounded" type="text" value="1024px" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Large Desktop</label>
                <input className="w-full p-2 border rounded" type="text" value="1280px" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export const Logo = () => {
  return (
    <a
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
      href="#"
    >
      <div className="h-8 w-8 shrink-0">
        <svg
          fill="none"
          height="28"
          viewBox="0 0 348 344"
          width="28"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fill-black dark:fill-white"
            d="M334.974 109.247C317.709 113.038 301.421 119.405 286.525 127.904C291.885 141.586 294.876 156.453 294.876 172.001C294.876 230.105 253.86 278.614 199.22 290.223C200.464 308.94 204.64 326.856 211.333 343.5C289.22 326.412 347.531 257.054 347.531 174.044C347.531 151.122 343.059 129.267 334.974 109.247Z"
          />
          <path
            className="fill-black/50 dark:fill-white/50"
            d="M294.869 172.001C294.869 156.423 291.878 141.557 286.518 127.904C234.129 157.756 198.799 214.083 198.799 278.703C198.799 282.582 198.977 286.403 199.213 290.193C253.853 278.584 294.869 230.075 294.869 171.971V172.001Z"
          />
          <path
            className="fill-black dark:fill-white"
            d="M53.1244 172.001C53.1244 156.423 56.1154 141.557 61.4757 127.904C46.5499 119.405 30.2617 113.038 13.0259 109.247C4.94107 129.267 0.469238 151.122 0.469238 174.044C0.469238 257.054 58.7808 326.412 136.668 343.5C143.361 326.856 147.566 308.94 148.78 290.223C94.1409 278.614 53.1244 230.105 53.1244 172.001Z"
          />
          <path
            className="fill-black/50 dark:fill-white/50"
            d="M61.4852 127.874C56.1249 141.556 53.1338 156.423 53.1338 171.971C53.1338 230.075 94.1503 278.584 148.79 290.193C149.027 286.373 149.204 282.552 149.204 278.702C149.204 214.083 113.874 157.756 61.4852 127.904V127.874Z"
          />
          <path
            className="fill-black dark:fill-white"
            d="M262.38 89.6109C277.602 81.3188 291.432 70.8352 303.455 58.545C271.679 22.9184 225.48 0.5 174.009 0.5C125.441 0.5 81.5516 20.49 50.0415 52.6517C61.5024 65.4749 74.8291 76.5508 89.6069 85.5241C111.403 64.2607 141.166 51.1413 174.009 51.1413C208.895 51.1413 240.346 65.9487 262.409 89.6109H262.38Z"
          />
          <path
            className="fill-black/50 dark:fill-white/50"
            d="M262.378 89.6111C240.315 65.9489 208.893 51.1415 173.977 51.1415C141.135 51.1415 111.342 64.2608 89.5752 85.5243C115.814 101.457 146.554 110.667 179.486 110.667C209.515 110.667 237.738 103.027 262.378 89.5815V89.6111Z"
          />
        </svg>
      </div>
      <motion.span
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
        initial={{ opacity: 0 }}
      >
        Theme Config
      </motion.span>
    </a>
  )
}

export const LogoIcon = () => {
  return (
    <a
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
      href="#"
    >
      <div className="h-8 w-8 shrink-0">
        <svg
          fill="none"
          height="26"
          viewBox="0 0 348 344"
          width="26"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fill-black dark:fill-white"
            d="M334.974 109.247C317.709 113.038 301.421 119.405 286.525 127.904C291.885 141.586 294.876 156.453 294.876 172.001C294.876 230.105 253.86 278.614 199.22 290.223C200.464 308.94 204.64 326.856 211.333 343.5C289.22 326.412 347.531 257.054 347.531 174.044C347.531 151.122 343.059 129.267 334.974 109.247Z"
          />
          <path
            className="fill-black/50 dark:fill-white/50"
            d="M294.869 172.001C294.869 156.423 291.878 141.557 286.518 127.904C234.129 157.756 198.799 214.083 198.799 278.703C198.799 282.582 198.977 286.403 199.213 290.193C253.853 278.584 294.869 230.075 294.869 171.971V172.001Z"
          />
          <path
            className="fill-black dark:fill-white"
            d="M53.1244 172.001C53.1244 156.423 56.1154 141.557 61.4757 127.904C46.5499 119.405 30.2617 113.038 13.0259 109.247C4.94107 129.267 0.469238 151.122 0.469238 174.044C0.469238 257.054 58.7808 326.412 136.668 343.5C143.361 326.856 147.566 308.94 148.78 290.223C94.1409 278.614 53.1244 230.105 53.1244 172.001Z"
          />
          <path
            className="fill-black/50 dark:fill-white/50"
            d="M61.4852 127.874C56.1249 141.556 53.1338 156.423 53.1338 171.971C53.1338 230.075 94.1503 278.584 148.79 290.193C149.027 286.373 149.204 282.552 149.204 278.702C149.204 214.083 113.874 157.756 61.4852 127.904V127.874Z"
          />
          <path
            className="fill-black dark:fill-white"
            d="M262.38 89.6109C277.602 81.3188 291.432 70.8352 303.455 58.545C271.679 22.9184 225.48 0.5 174.009 0.5C125.441 0.5 81.5516 20.49 50.0415 52.6517C61.5024 65.4749 74.8291 76.5508 89.6069 85.5241C111.403 64.2607 141.166 51.1413 174.009 51.1413C208.895 51.1413 240.346 65.9487 262.409 89.6109H262.38Z"
          />
          <path
            className="fill-black/50 dark:fill-white/50"
            d="M262.378 89.6111C240.315 65.9489 208.893 51.1415 173.977 51.1415C141.135 51.1415 111.342 64.2608 89.5752 85.5243C115.814 101.457 146.554 110.667 179.486 110.667C209.515 110.667 237.738 103.027 262.378 89.5815V89.6111Z"
          />
        </svg>
      </div>
    </a>
  )
}

const MainContent = () => {
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl border border-neutral-200 bg-white p-4 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
        <h1 className="text-3xl font-bold mb-8">Theme Configuration</h1>
        <div className="flex gap-2">
          {[...new Array(4)].map((_, idx) => (
            <div
              className="h-32 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
              key={'first-array-demo-1' + idx}
            />
          ))}
        </div>
        <div className="flex flex-1 gap-2">
          {[...new Array(2)].map((_, idx) => (
            <div
              className="h-full w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
              key={'second-array-demo-1' + idx}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const Page = () => {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('colors')

  const links = [
    {
      id: 'colors',
      href: '#colors',
      icon: <IconPalette className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      label: 'Colors',
    },
    {
      id: 'typography',
      href: '#typography',
      icon: <IconTypography className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      label: 'Typography',
    },
    {
      id: 'layout',
      href: '#layout',
      icon: <IconLayoutGrid className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      label: 'Layout & Spacing',
    },
  ]

  return (
    <div
      className={cn(
        'mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800',
        'min-h-screen',
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link) => (
                <SidebarLink
                  className={cn(activeTab === link.id && 'bg-gray-200 dark:bg-neutral-700')}
                  key={link.id}
                  link={link}
                  onClick={() => setActiveTab(link.id)}
                />
              ))}
            </div>
          </div>
          {/* <div className="mt-auto">
            <SidebarLink
              link={{
                href: '#',
                icon: (
                  <div className="h-7 w-7 shrink-0 rounded-full bg-neutral-700 dark:bg-neutral-200" />
                ),
                label: 'Theme Settings',
              }}
            />
          </div> */}
        </SidebarBody>
      </Sidebar>

      <div className="flex-1 overflow-auto">
        {activeTab === 'colors' && <ColorsContent />}
        {activeTab === 'typography' && <TypographyContent />}
        {activeTab === 'layout' && <LayoutContent />}
      </div>
    </div>
  )
}

export default Page
