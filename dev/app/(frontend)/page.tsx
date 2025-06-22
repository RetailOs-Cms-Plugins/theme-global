'use client'
import { cn } from '@/lib/utils'
import { IconLayoutGrid, IconPalette, IconTypography } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import React, { useState } from 'react'

import {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyInlineCode,
  TypographyLarge,
  TypographyLead,
  TypographyList,
  TypographyListItem,
  TypographyMuted,
  TypographyP,
  TypographySmall,
  TypographyTable,
  TypographyTableBody,
  TypographyTableCell,
  TypographyTableHeader,
  TypographyTableHeaderCell,
  TypographyTableRow,
} from '../../../src/components/theme/typography'
import { Sidebar, SidebarBody, SidebarLink } from '../ui/sidebar'

type Direction = 'auto' | 'ltr' | 'rtl'

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
        className="w-10 h-10 rounded border fill-primary-500"
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

const ColorsContent = () => {
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl border border-neutral-200 p-4 md:p-10 dark:border-neutral-700">
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
  const [themeData, setThemeData] = React.useState<any>(null)

  const getTextDirection = (): Direction => {
    return themeData?.typography?.direction || 'auto'
  }

  const getDirection = (): string => {
    return themeData?.typography?.direction || 'auto'
  }

  const getStyles = (type: 'body' | 'heading'): React.CSSProperties => ({
    direction: getTextDirection() === 'auto' ? undefined : (getTextDirection() as 'ltr' | 'rtl'),
    fontFamily: getFontFamily(type),
    textAlign: getTextDirection() === 'rtl' ? 'right' : 'left',
  })

  const typographyDescriptionStyles: React.CSSProperties = {
    color: 'var(--neutral-600)',
    direction: getTextDirection() === 'auto' ? undefined : (getTextDirection() as 'ltr' | 'rtl'),
    fontFamily: getFontFamily('body'),
    fontSize: '1.25rem',
    fontWeight: 500,
    marginTop: '0.75rem',
    textAlign: getTextDirection() === 'rtl' ? 'right' : 'left',
  }

  const getDirectionalText = (type: 'heading' | 'paragraph') => {
    const direction = getTextDirection()
    if (direction === 'rtl') {
      return type === 'heading'
        ? 'הכלב החום המהיר קופץ מעל הכלב העצלן'
        : 'הכלב החום המהיר קופץ מעל הכלב העצלן. פסקה זו מדגימה את סגנון טקסט הגוף עם גובה שורה ומרווח מתאימים. היא משתמשת בגופן הגוף שנבחר כדי להדגים כיצד תוכן רגיל יופיע באתר שלך.'
    }
    return type === 'heading'
      ? 'The Quick Brown Fox Jumps Over The Lazy Dog'
      : 'The quick brown fox jumps over the lazy dog. This paragraph demonstrates the body text styling with proper line height and spacing. It uses the selected body font family to showcase how regular content will appear on your website.'
  }

  const getLeadParagraphText = () => {
    const direction = getTextDirection()
    if (direction === 'rtl') {
      return 'פסקת פתיחה, הידועה גם כ-lede, היא הפסקה הפותחת של מאמר, חיבור או יצירה כתובה אחרת המסכמת את הנקודות העיקריות ומושכת את תשומת לב הקורא.'
    }
    return "A lead paragraph, also known as a lede, is the opening paragraph of an article, essay, or other written work that summarizes the main points and captures the reader's attention."
  }

  const getLargeTextExample = () => {
    const direction = getTextDirection()
    if (direction === 'rtl') {
      return 'טקסט גדול יכול לשמש לציטוטים חשובים, המלצות, או תוכן אחר שצריך לבלוט מטקסט הגוף הרגיל מבלי להיות כותרת.'
    }
    return 'Large text can be used for important quotes, testimonials, or other content that needs to stand out from the regular body text without being a heading.'
  }

  const getSectionTitle = (key: string) => {
    const direction = getTextDirection()
    if (direction === 'rtl') {
      const titles = {
        bodyFont: 'גופן טקסט',
        fontFamilies: 'משפחות גופנים נבחרות',
        headingFont: 'גופן כותרות',
        largeText: 'טקסט גדול',
        leadParagraph: 'פסקת פתיחה',
        typography: 'טיפוגרפיה',
        typographyScale: 'סולם טיפוגרפי',
      }
      return titles[key as keyof typeof titles] || key
    }
    const titles = {
      bodyFont: 'Body Font',
      fontFamilies: 'Selected Font Families',
      headingFont: 'Heading Font',
      largeText: 'Large Text',
      leadParagraph: 'Lead Paragraph',
      typography: 'Typography',
      typographyScale: 'Typography Scale',
    }
    return titles[key as keyof typeof titles] || key
  }

  const getTypographyDescription = (type: string, font: string, size: string, weight: string) => {
    const direction = getTextDirection()
    if (direction === 'rtl') {
      const descriptions = {
        code: `קוד - גופן: ${font}, גודל: ${size}, משקל: ${weight}`,
        h1: `כותרת ראשית - גופן: ${font}, גודל: ${size}, משקל: ${weight}`,
        h2: `כותרת משנית - גופן: ${font}, גודל: ${size}, משקל: ${weight}`,
        p: `טקסט גוף - גופן: ${font}, גודל: ${size}, משקל: ${weight}`,
      }
      return descriptions[type as keyof typeof descriptions] || type
    }
    const descriptions = {
      code: `${type} - Font: ${font}, Size: ${size}, Weight: ${weight}`,
      h1: `${type} - Font: ${font}, Size: ${size}, Weight: ${weight}`,
      h2: `${type} - Font: ${font}, Size: ${size}, Weight: ${weight}`,
      p: `${type} - Font: ${font}, Size: ${size}, Weight: ${weight}`,
    }
    return descriptions[type as keyof typeof descriptions] || type
  }

  React.useEffect(() => {
    async function fetchTheme() {
      try {
        const response = await fetch('/api/globals/theme-config')
        const data = await response.json()
        setThemeData(data)
      } catch (error) {
        console.error('Error fetching theme:', error)
      }
    }

    // Fetch theme on mount
    void fetchTheme()

    // Listen for theme updates
    const handleThemeUpdate = () => {
      void fetchTheme()
    }

    window.addEventListener('theme-update', handleThemeUpdate)

    return () => {
      window.removeEventListener('theme-update', handleThemeUpdate)
    }
  }, [])

  function getFontLabel(value: null | string) {
    if (!value) {
      return null
    }
    // Convert value like 'inter' to 'Inter'
    return value
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  function getFontFamily(type: 'body' | 'heading') {
    const fontMap = {
      body: themeData?.typography?.fontBody,
      heading: themeData?.typography?.fontHeading,
    }
    const value = fontMap[type]
    if (!value) {
      return undefined
    }
    // Add fallback fonts based on type
    const fallbacks = {
      body: 'system-ui, sans-serif',
      heading: 'system-ui, sans-serif',
    }
    return `"${getFontLabel(value)}", ${fallbacks[type]}`
  }

  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl border border-neutral-200 p-4 md:p-10 dark:border-neutral-7">
        <TypographyH1
          className="text-3xl font-bold mb-8"
          dir={getTextDirection()}
          style={getStyles('heading')}
        >
          {getSectionTitle('typography')}
        </TypographyH1>

        <div className="space-y-12">
          {/* Font Family Display */}
          <section>
            <TypographyH2
              className="text-xl font-semibold mb-4"
              dir={getTextDirection()}
              style={getStyles('heading')}
            >
              {getSectionTitle('fontFamilies')}
            </TypographyH2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <TypographyH3
                  className="text-sm font-medium text-neutral-500 dark:text-neutral-400"
                  dir={getTextDirection()}
                  style={getStyles('heading')}
                >
                  {getSectionTitle('bodyFont')}
                </TypographyH3>
                <TypographyP
                  className="mt-1 text-2xl"
                  dir={getTextDirection()}
                  style={getStyles('body')}
                >
                  {getFontLabel(themeData?.typography?.fontBody) || 'Inter'}
                </TypographyP>
              </div>
              <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <TypographyH3
                  className="text-sm font-medium text-neutral-500 dark:text-neutral-400"
                  dir={getTextDirection()}
                  style={getStyles('heading')}
                >
                  {getSectionTitle('headingFont')}
                </TypographyH3>
                <TypographyP
                  className="mt-1 text-2xl"
                  dir={getTextDirection()}
                  style={getStyles('heading')}
                >
                  {getFontLabel(themeData?.typography?.fontHeading) || 'Poppins'}
                </TypographyP>
              </div>
            </div>
          </section>

          {/* Typography Scale */}
          <section className="space-y-8">
            <div>
              <TypographyH2
                className="text-xl font-semibold mb-4"
                dir={getTextDirection()}
                style={getStyles('heading')}
              >
                {getSectionTitle('typographyScale')}
              </TypographyH2>
              <div className="space-y-6">
                <div className="space-y-3">
                  <TypographyH1 dir={getTextDirection()} style={getStyles('heading')}>
                    {getDirectionalText('heading')}
                  </TypographyH1>
                  <TypographyP dir={getTextDirection()} style={typographyDescriptionStyles}>
                    {getTypographyDescription(
                      'h1',
                      getFontLabel(themeData?.typography?.fontHeading) || 'Poppins',
                      themeData?.typography?.text3xl || '2.25rem',
                      '800',
                    )}
                  </TypographyP>
                </div>

                <div className="space-y-3">
                  <TypographyH2 dir={getTextDirection()} style={getStyles('heading')}>
                    {getDirectionalText('heading')}
                  </TypographyH2>
                  <TypographyP dir={getTextDirection()} style={typographyDescriptionStyles}>
                    {getTypographyDescription(
                      'h2',
                      getFontLabel(themeData?.typography?.fontHeading) || 'Poppins',
                      themeData?.typography?.text2xl || '1.875rem',
                      '600',
                    )}
                  </TypographyP>
                </div>

                <div className="space-y-3">
                  <TypographyP
                    className="leading-7 [&:not(:first-child)]:mt-6"
                    dir={getTextDirection()}
                    style={getStyles('body')}
                  >
                    {getDirectionalText('paragraph')}
                  </TypographyP>
                  <TypographyP dir={getTextDirection()} style={typographyDescriptionStyles}>
                    {getTypographyDescription(
                      'p',
                      getFontLabel(themeData?.typography?.fontBody) || 'Inter',
                      themeData?.typography?.textBase || '1rem',
                      '400',
                    )}
                  </TypographyP>
                </div>

                {/* Code example with RTL container but LTR content */}
                <div className="space-y-3" dir="rtl">
                  <div className="text-left" dir="ltr">
                    <TypographyInlineCode className="relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                      npm install @acme/api-client
                    </TypographyInlineCode>
                  </div>
                  <TypographyP dir={getTextDirection()} style={typographyDescriptionStyles}>
                    {getTypographyDescription(
                      'code',
                      'Fira Code',
                      themeData?.typography?.textSm || '0.875rem',
                      '600',
                    )}
                  </TypographyP>
                </div>

                {/* Blockquote Example */}
                <div className="space-y-3">
                  <TypographyBlockquote dir={getTextDirection()} style={getStyles('body')}>
                    {getDirection() === 'rtl'
                      ? '"אחרי הכל," הוא אמר, "כולם נהנים מבדיחה טובה, אז זה רק הוגן שהם ישלמו על הפריבילגיה."'
                      : '"After all," he said, "everyone enjoys a good joke, so it\'s only fair that they should pay for the privilege."'}
                  </TypographyBlockquote>
                  <TypographyP dir={getTextDirection()} style={typographyDescriptionStyles}>
                    {getTypographyDescription(
                      'blockquote',
                      getFontLabel(themeData?.typography?.fontBody) || 'Inter',
                      '1.125rem',
                      '400',
                    )}
                  </TypographyP>
                </div>

                {/* List Example */}
                <div className="space-y-3">
                  <TypographyList dir={getTextDirection()} style={getStyles('body')}>
                    <TypographyListItem>
                      {getDirection() === 'rtl'
                        ? 'רמה ראשונה של משחקי מילים: 5 מטבעות זהב'
                        : '1st level of puns: 5 gold coins'}
                    </TypographyListItem>
                    <TypographyListItem>
                      {getDirection() === 'rtl'
                        ? 'רמה שנייה של בדיחות: 10 מטבעות זהב'
                        : '2nd level of jokes: 10 gold coins'}
                    </TypographyListItem>
                    <TypographyListItem>
                      {getDirection() === 'rtl'
                        ? 'רמה שלישית של משפטים קצרים: 20 מטבעות זהב'
                        : '3rd level of one-liners: 20 gold coins'}
                    </TypographyListItem>
                  </TypographyList>
                  <TypographyP dir={getTextDirection()} style={typographyDescriptionStyles}>
                    {getTypographyDescription(
                      'list',
                      getFontLabel(themeData?.typography?.fontBody) || 'Inter',
                      '1rem',
                      '400',
                    )}
                  </TypographyP>
                </div>

                {/* Table Example */}
                <div className="space-y-3">
                  <TypographyTable dir={getTextDirection()} style={getStyles('body')}>
                    <TypographyTableHeader>
                      <TypographyTableHeaderCell>
                        {getDirection() === 'rtl' ? 'אוצר המלך' : "King's Treasury"}
                      </TypographyTableHeaderCell>
                      <TypographyTableHeaderCell>
                        {getDirection() === 'rtl' ? 'אושר העם' : "People's happiness"}
                      </TypographyTableHeaderCell>
                    </TypographyTableHeader>
                    <TypographyTableBody>
                      <TypographyTableRow>
                        <TypographyTableCell>
                          {getDirection() === 'rtl' ? 'ריק' : 'Empty'}
                        </TypographyTableCell>
                        <TypographyTableCell>
                          {getDirection() === 'rtl' ? 'מלא עד גדותיו' : 'Overflowing'}
                        </TypographyTableCell>
                      </TypographyTableRow>
                      <TypographyTableRow>
                        <TypographyTableCell>
                          {getDirection() === 'rtl' ? 'צנוע' : 'Modest'}
                        </TypographyTableCell>
                        <TypographyTableCell>
                          {getDirection() === 'rtl' ? 'מרוצה' : 'Satisfied'}
                        </TypographyTableCell>
                      </TypographyTableRow>
                      <TypographyTableRow>
                        <TypographyTableCell>
                          {getDirection() === 'rtl' ? 'מלא' : 'Full'}
                        </TypographyTableCell>
                        <TypographyTableCell>
                          {getDirection() === 'rtl' ? 'נלהב' : 'Ecstatic'}
                        </TypographyTableCell>
                      </TypographyTableRow>
                    </TypographyTableBody>
                  </TypographyTable>
                  <TypographyP dir={getTextDirection()} style={typographyDescriptionStyles}>
                    {getTypographyDescription(
                      'table',
                      getFontLabel(themeData?.typography?.fontBody) || 'Inter',
                      '1rem',
                      '400',
                    )}
                  </TypographyP>
                </div>

                {/* Lead Paragraph Example */}
                <section className="mt-8">
                  <TypographyH3 dir={getTextDirection()} style={getStyles('heading')}>
                    {getSectionTitle('leadParagraph')}
                  </TypographyH3>
                  <TypographyLead dir={getTextDirection()} style={getStyles('body')}>
                    {getLeadParagraphText()}
                  </TypographyLead>
                </section>

                {/* Large Text Example */}
                <section className="mt-8">
                  <TypographyH3 dir={getTextDirection()} style={getStyles('heading')}>
                    {getSectionTitle('largeText')}
                  </TypographyH3>
                  <TypographyLarge dir={getTextDirection()} style={getStyles('body')}>
                    {getLargeTextExample()}
                  </TypographyLarge>
                </section>

                {/* Small Text Example */}
                <section className="mt-8">
                  <TypographyH3 dir={getTextDirection()} style={getStyles('heading')}>
                    {getDirection() === 'rtl' ? 'טקסט קטן' : 'Small Text'}
                  </TypographyH3>
                  <TypographySmall dir={getTextDirection()} style={getStyles('body')}>
                    {getDirection() === 'rtl' ? 'כתובת דוא"ל' : 'Email address'}
                  </TypographySmall>
                </section>

                {/* Muted Text Example */}
                <section className="mt-8">
                  <TypographyH3 dir={getTextDirection()} style={getStyles('heading')}>
                    {getDirection() === 'rtl' ? 'טקסט מושתק' : 'Muted Text'}
                  </TypographyH3>
                  <TypographyMuted dir={getTextDirection()} style={getStyles('body')}>
                    {getDirection() === 'rtl'
                      ? 'הזן את כתובת הדוא"ל שלך.'
                      : 'Enter your email address.'}
                  </TypographyMuted>
                </section>
              </div>
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
      <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl border border-neutral-200 p-4 md:p-10 dark:border-neutral-700">
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
            className="fill-primary-500"
            d="M334.974 109.247C317.709 113.038 301.421 119.405 286.525 127.904C291.885 141.586 294.876 156.453 294.876 172.001C294.876 230.105 253.86 278.614 199.22 290.223C200.464 308.94 204.64 326.856 211.333 343.5C289.22 326.412 347.531 257.054 347.531 174.044C347.531 151.122 343.059 129.267 334.974 109.247Z"
          />
          <path
            className="fill-primary-500"
            d="M294.869 172.001C294.869 156.423 291.878 141.557 286.518 127.904C234.129 157.756 198.799 214.083 198.799 278.703C198.799 282.582 198.977 286.403 199.213 290.193C253.853 278.584 294.869 230.075 294.869 171.971V172.001Z"
          />
          <path
            className="fill-primary-500"
            d="M53.1244 172.001C53.1244 156.423 56.1154 141.557 61.4757 127.904C46.5499 119.405 30.2617 113.038 13.0259 109.247C4.94107 129.267 0.469238 151.122 0.469238 174.044C0.469238 257.054 58.7808 326.412 136.668 343.5C143.361 326.856 147.566 308.94 148.78 290.223C94.1409 278.614 53.1244 230.105 53.1244 172.001Z"
          />
          <path
            className="fill-primary-500"
            d="M61.4852 127.874C56.1249 141.556 53.1338 156.423 53.1338 171.971C53.1338 230.075 94.1503 278.584 148.79 290.193C149.027 286.373 149.204 282.552 149.204 278.702C149.204 214.083 113.874 157.756 61.4852 127.904V127.874Z"
          />
          <path
            className="fill-primary-500"
            d="M262.38 89.6109C277.602 81.3188 291.432 70.8352 303.455 58.545C271.679 22.9184 225.48 0.5 174.009 0.5C125.441 0.5 81.5516 20.49 50.0415 52.6517C61.5024 65.4749 74.8291 76.5508 89.6069 85.5241C111.403 64.2607 141.166 51.1413 174.009 51.1413C208.895 51.1413 240.346 65.9487 262.409 89.6109H262.38Z"
          />
          <path
            className="fill-primary-500"
            d="M262.378 89.6111C240.315 65.9489 208.893 51.1415 173.977 51.1415C141.135 51.1415 111.342 64.2608 89.5752 85.5243C115.814 101.457 146.554 110.667 179.486 110.667C209.515 110.667 237.738 103.027 262.378 89.5815V89.6111Z"
          />
        </svg>
      </div>
      <motion.span
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-primary-500"
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
            className="fill-primary-500"
            d="M334.974 109.247C317.709 113.038 301.421 119.405 286.525 127.904C291.885 141.586 294.876 156.453 294.876 172.001C294.876 230.105 253.86 278.614 199.22 290.223C200.464 308.94 204.64 326.856 211.333 343.5C289.22 326.412 347.531 257.054 347.531 174.044C347.531 151.122 343.059 129.267 334.974 109.247Z"
          />
          <path
            className="fill-primary-500"
            d="M294.869 172.001C294.869 156.423 291.878 141.557 286.518 127.904C234.129 157.756 198.799 214.083 198.799 278.703C198.799 282.582 198.977 286.403 199.213 290.193C253.853 278.584 294.869 230.075 294.869 171.971V172.001Z"
          />
          <path
            className="fill-primary-500"
            d="M53.1244 172.001C53.1244 156.423 56.1154 141.557 61.4757 127.904C46.5499 119.405 30.2617 113.038 13.0259 109.247C4.94107 129.267 0.469238 151.122 0.469238 174.044C0.469238 257.054 58.7808 326.412 136.668 343.5C143.361 326.856 147.566 308.94 148.78 290.223C94.1409 278.614 53.1244 230.105 53.1244 172.001Z"
          />
          <path
            className="fill-primary-500"
            d="M61.4852 127.874C56.1249 141.556 53.1338 156.423 53.1338 171.971C53.1338 230.075 94.1503 278.584 148.79 290.193C149.027 286.373 149.204 282.552 149.204 278.702C149.204 214.083 113.874 157.756 61.4852 127.904V127.874Z"
          />
          <path
            className="fill-primary-500"
            d="M262.38 89.6109C277.602 81.3188 291.432 70.8352 303.455 58.545C271.679 22.9184 225.48 0.5 174.009 0.5C125.441 0.5 81.5516 20.49 50.0415 52.6517C61.5024 65.4749 74.8291 76.5508 89.6069 85.5241C111.403 64.2607 141.166 51.1413 174.009 51.1413C208.895 51.1413 240.346 65.9487 262.409 89.6109H262.38Z"
          />
          <path
            className="fill-primary-500"
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
      <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl border border-neutral-200 p-4 md:p-10 dark:border-neutral-700 ">
        <h1 className="text-3xl font-bold mb-8">Theme Configuration</h1>
        <div className="flex gap-2">
          {[...new Array(4)].map((_, idx) => (
            <div
              className="h-32 w-full animate-pulse rounded-lg"
              key={'first-array-demo-1' + idx}
            />
          ))}
        </div>
        <div className="flex flex-1 gap-2">
          {[...new Array(2)].map((_, idx) => (
            <div
              className="h-full w-full animate-pulse rounded-lg"
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
      icon: <IconPalette className="h-5 w-5 shrink-0 text-text-on-page" />,
      label: 'Colors',
    },
    {
      id: 'typography',
      href: '#typography',
      icon: <IconTypography className="h-5 w-5 shrink-0 text-text-on-page" />,
      label: 'Typography',
    },
    {
      id: 'layout',
      href: '#layout',
      icon: <IconLayoutGrid className="h-5 w-5 shrink-0 text-text-on-page" />,
      label: 'Layout & Spacing',
    },
  ]

  return (
    <div
      className={cn(
        'mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 md:flex-row dark:border-neutral-700',
        'min-h-screen',
      )}
      style={{
        backgroundColor: 'var(--page-background)',
        color: 'var(--text-on-page)',
      }}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link) => (
                <SidebarLink
                  className={cn(
                    activeTab === link.id && 'bg-card text-card',
                    'hover:bg-card hover:text-card',
                  )}
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
