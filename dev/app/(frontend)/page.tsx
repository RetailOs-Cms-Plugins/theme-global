'use client'
import { cn } from '@/lib/utils'
import { IconLayoutGrid, IconPalette, IconTypography } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

import {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
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
import { getFontDefinition } from '../../../src/utils/typography/font-definitions'
import { getClientTheme } from '../actions/client-theme.actions'
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
  const [themeData, setThemeData] = useState<any>(null)
  const [activeLink, setActiveLink] = useState<string>('')

  useEffect(() => {
    async function fetchTheme() {
      try {
        const data = await getClientTheme()
        console.log('Theme data received:', data) // Debug log
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

  function getFontLabel(value: null | string): null | string {
    if (!value) {
      return null
    }

    const fontDef = getFontDefinition(value)
    if (fontDef) {
      return fontDef.displayName
    }

    // Fallback for custom fonts
    return value
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const getFontFamily = (type: 'body' | 'heading') => {
    const fontMap = {
      body: themeData?.typography?.fontBody,
      heading: themeData?.typography?.fontHeading,
    }
    const value = fontMap[type]
    if (!value) {
      return undefined
    }

    const fontDef = getFontDefinition(value)
    if (fontDef) {
      return `"${fontDef.displayName}", system-ui, sans-serif`
    }

    return value // Fallback for custom fonts
  }

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

  const getDirectionalText = (type: 'blockquote' | 'heading' | 'paragraph') => {
    const direction = getTextDirection()
    const content = {
      blockquote: {
        ltr: `"After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the privilege."`,
        rtl: '"אחרי הכל," הוא אמר, "כולם נהנים מבדיחה טובה, אז זה רק הוגן שהם ישלמו על הזכות."',
      },
      heading: {
        ltr: 'The Quick Brown Fox Jumps Over The Lazy Dog',
        rtl: 'הכלב החום המהיר קופץ מעל הכלב העצלן',
      },
      paragraph: {
        ltr: 'The quick brown fox jumps over the lazy dog. This paragraph demonstrates the body text styling with proper line height and spacing. It uses the selected body font family to showcase how regular content will appear on your website.',
        rtl: 'הכלב החום המהיר קופץ מעל הכלב העצלן. פסקה זו מדגימה את סגנון טקסט הגוף עם גובה שורה ומרווח מתאימים. היא משתמשת בגופן הגוף שנבחר כדי להדגים כיצד תוכן רגיל יופיע באתר שלך.',
      },
    }
    return content[type][direction === 'rtl' ? 'rtl' : 'ltr']
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

  const getTypographyDescription = (
    type: string,
    font: string,
    size: string,
    weight: string,
    lineHeight?: string,
  ) => {
    const direction = getTextDirection()
    if (direction === 'rtl') {
      const descriptions = {
        code: `קוד - גופן: ${font}, גודל: ${size}, משקל: ${weight}${lineHeight ? `, גובה שורה: ${lineHeight}` : ''}`,
        h1: `כותרת ראשית - גופן: ${font}, גודל: ${size}, משקל: ${weight}${lineHeight ? `, גובה שורה: ${lineHeight}` : ''}`,
        h2: `כותרת משנית - גופן: ${font}, גודל: ${size}, משקל: ${weight}${lineHeight ? `, גובה שורה: ${lineHeight}` : ''}`,
        p: `טקסט גוף - גופן: ${font}, גודל: ${size}, משקל: ${weight}${lineHeight ? `, גובה שורה: ${lineHeight}` : ''}`,
      }
      return descriptions[type as keyof typeof descriptions] || type
    }
    const descriptions = {
      code: `${type} - Font: ${font}, Size: ${size}, Weight: ${weight}${lineHeight ? `, Line Height: ${lineHeight}` : ''}`,
      h1: `${type} - Font: ${font}, Size: ${size}, Weight: ${weight}${lineHeight ? `, Line Height: ${lineHeight}` : ''}`,
      h2: `${type} - Font: ${font}, Size: ${size}, Weight: ${weight}${lineHeight ? `, Line Height: ${lineHeight}` : ''}`,
      p: `${type} - Font: ${font}, Size: ${size}, Weight: ${weight}${lineHeight ? `, Line Height: ${lineHeight}` : ''}`,
    }
    return descriptions[type as keyof typeof descriptions] || type
  }

  const typographyLinks = [
    { href: '#h1', label: 'h1' },
    { href: '#h2', label: 'h2' },
    { href: '#h3', label: 'h3' },
    { href: '#h4', label: 'h4' },
    { href: '#p', label: 'p' },
    { href: '#blockquote', label: 'blockquote' },
    { href: '#table', label: 'table' },
    { href: '#list', label: 'list' },
    { href: '#inline-code', label: 'Inline code' },
    { href: '#lead', label: 'Lead' },
    { href: '#large', label: 'Large' },
    { href: '#small', label: 'Small' },
    { href: '#muted', label: 'Muted' },
  ]

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      })
      setActiveLink(href)
    }
  }

  return (
    <div className="flex flex-1">
      <div className="relative flex h-full w-full flex-1">
        <div className="flex-1 flex-col gap-4 rounded-tl-2xl border border-neutral-200 p-4 md:p-10 dark:border-neutral-700 overflow-y-auto">
          <TypographyH1 themeData={themeData}>Typography</TypographyH1>

          <div className="space-y-12">
            <section>
              <TypographyH3 className="mt-4" themeData={themeData}>
                Selected Font Families
              </TypographyH3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
                  <TypographyH3 themeData={themeData}>Body Font</TypographyH3>
                  <TypographyP className="mt-1 text-2xl" themeData={themeData}>
                    {getFontLabel(themeData?.typography?.fontBody) || 'Inter'}
                  </TypographyP>
                </div>
                <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
                  <TypographyH3 themeData={themeData}>Heading Font</TypographyH3>
                  <TypographyP className="mt-1 text-2xl" themeData={themeData}>
                    {getFontLabel(themeData?.typography?.fontHeading) || 'Poppins'}
                  </TypographyP>
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <div>
                <TypographyH3 themeData={themeData}>Typography Scale</TypographyH3>
                <div className="space-y-6 mt-4">
                  <div id="h1">
                    <TypographyH1 themeData={themeData}>
                      {getDirectionalText('heading')}
                    </TypographyH1>
                    <TypographyP
                      dir={getTextDirection()}
                      style={typographyDescriptionStyles}
                      themeData={themeData}
                    >
                      {getTypographyDescription(
                        'h1',
                        getFontLabel(themeData?.typography?.fontHeading) || 'Poppins',
                        themeData?.typography?.h1?.fontSize ||
                          themeData?.typography?.text3xl ||
                          '2.25rem',
                        '800',
                        themeData?.typography?.h1?.lineHeight || '1.2',
                      )}
                    </TypographyP>
                  </div>
                  <div id="h2">
                    <TypographyH2 themeData={themeData}>
                      {getDirectionalText('heading')}
                    </TypographyH2>
                    <TypographyP
                      dir={getTextDirection()}
                      style={typographyDescriptionStyles}
                      themeData={themeData}
                    >
                      {getTypographyDescription(
                        'h2',
                        getFontLabel(themeData?.typography?.fontHeading) || 'Poppins',
                        themeData?.typography?.h2?.fontSize ||
                          themeData?.typography?.text2xl ||
                          '1.875rem',
                        '600',
                        themeData?.typography?.h2?.lineHeight || '1.2',
                      )}
                    </TypographyP>
                  </div>
                  <div id="h3">
                    <TypographyH3 themeData={themeData}>
                      {getDirectionalText('heading')}
                    </TypographyH3>
                    <TypographyP
                      dir={getTextDirection()}
                      style={typographyDescriptionStyles}
                      themeData={themeData}
                    >
                      {getTypographyDescription(
                        'h3',
                        getFontLabel(themeData?.typography?.fontHeading) || 'Poppins',
                        themeData?.typography?.h3?.fontSize ||
                          themeData?.typography?.textXl ||
                          '1.5rem',
                        '600',
                        themeData?.typography?.h3?.lineHeight || '1.2',
                      )}
                    </TypographyP>
                  </div>
                  <div id="h4">
                    <TypographyH4 themeData={themeData}>
                      {getDirectionalText('heading')}
                    </TypographyH4>
                    <TypographyP
                      dir={getTextDirection()}
                      style={typographyDescriptionStyles}
                      themeData={themeData}
                    >
                      {getTypographyDescription(
                        'h4',
                        getFontLabel(themeData?.typography?.fontHeading) || 'Poppins',
                        themeData?.typography?.h4?.fontSize ||
                          themeData?.typography?.textLg ||
                          '1.25rem',
                        '600',
                        themeData?.typography?.h4?.lineHeight || '1.2',
                      )}
                    </TypographyP>
                  </div>
                  <div id="p">
                    <TypographyP themeData={themeData}>
                      {getDirectionalText('paragraph')}
                    </TypographyP>
                    <TypographyP
                      dir={getTextDirection()}
                      style={typographyDescriptionStyles}
                      themeData={themeData}
                    >
                      {getTypographyDescription(
                        'p',
                        getFontLabel(themeData?.typography?.fontBody) || 'Inter',
                        themeData?.typography?.p?.fontSize ||
                          themeData?.typography?.textBase ||
                          '1rem',
                        '400',
                        themeData?.typography?.p?.lineHeight || '1.2',
                      )}
                    </TypographyP>
                  </div>
                  <div id="inline-code">
                    <TypographyInlineCode themeData={themeData}>
                      npm install @acme/api-client
                    </TypographyInlineCode>
                    <TypographyP
                      dir={getTextDirection()}
                      style={typographyDescriptionStyles}
                      themeData={themeData}
                    >
                      {getTypographyDescription(
                        'code',
                        'Fira Code',
                        themeData?.typography?.inlineCode?.fontSize ||
                          themeData?.typography?.textSm ||
                          '0.875rem',
                        '600',
                        themeData?.typography?.inlineCode?.lineHeight || '1.2',
                      )}
                    </TypographyP>
                  </div>
                  <div id="blockquote">
                    <TypographyBlockquote themeData={themeData}>
                      {getDirectionalText('blockquote')}
                    </TypographyBlockquote>
                    <TypographyP
                      dir={getTextDirection()}
                      style={typographyDescriptionStyles}
                      themeData={themeData}
                    >
                      {getTypographyDescription(
                        'blockquote',
                        getFontLabel(themeData?.typography?.fontBody) || 'Inter',
                        themeData?.typography?.blockquote?.fontSize || '1.125rem',
                        '400',
                        themeData?.typography?.blockquote?.lineHeight || '1.2',
                      )}
                    </TypographyP>
                  </div>
                  <div id="list">
                    <TypographyList themeData={themeData}>
                      <TypographyListItem>1st level of puns: 5 gold coins</TypographyListItem>
                      <TypographyListItem>2nd level of jokes: 10 gold coins</TypographyListItem>
                      <TypographyListItem>
                        3rd level of one-liners: 20 gold coins
                      </TypographyListItem>
                    </TypographyList>
                    <TypographyP
                      dir={getTextDirection()}
                      style={typographyDescriptionStyles}
                      themeData={themeData}
                    >
                      {getTypographyDescription(
                        'list',
                        getFontLabel(themeData?.typography?.fontBody) || 'Inter',
                        themeData?.typography?.list?.fontSize || '1rem',
                        '400',
                        themeData?.typography?.list?.lineHeight || '1.2',
                      )}
                    </TypographyP>
                  </div>
                  <div id="table">
                    <TypographyTable themeData={themeData}>
                      <TypographyTableHeader>
                        <TypographyTableHeaderCell>King's Treasury</TypographyTableHeaderCell>
                        <TypographyTableHeaderCell>People's happiness</TypographyTableHeaderCell>
                      </TypographyTableHeader>
                      <TypographyTableBody>
                        <TypographyTableRow>
                          <TypographyTableCell>Empty</TypographyTableCell>
                          <TypographyTableCell>Overflowing</TypographyTableCell>
                        </TypographyTableRow>
                      </TypographyTableBody>
                    </TypographyTable>
                    <TypographyP
                      dir={getTextDirection()}
                      style={typographyDescriptionStyles}
                      themeData={themeData}
                    >
                      {getTypographyDescription(
                        'table',
                        getFontLabel(themeData?.typography?.fontBody) || 'Inter',
                        themeData?.typography?.table?.fontSize || '1rem',
                        '400',
                        themeData?.typography?.table?.lineHeight || '1.2',
                      )}
                    </TypographyP>
                  </div>
                  <div id="lead">
                    <TypographyLead themeData={themeData}>{getLeadParagraphText()}</TypographyLead>
                    <TypographyP
                      dir={getTextDirection()}
                      style={typographyDescriptionStyles}
                      themeData={themeData}
                    >
                      {getTypographyDescription(
                        'lead',
                        getFontLabel(themeData?.typography?.fontBody) || 'Inter',
                        themeData?.typography?.lead?.fontSize || '1.25rem',
                        '400',
                        themeData?.typography?.lead?.lineHeight || '1.2',
                      )}
                    </TypographyP>
                  </div>
                  <div id="large">
                    <TypographyLarge themeData={themeData}>{getLargeTextExample()}</TypographyLarge>
                    <TypographyP
                      dir={getTextDirection()}
                      style={typographyDescriptionStyles}
                      themeData={themeData}
                    >
                      {getTypographyDescription(
                        'large',
                        getFontLabel(themeData?.typography?.fontBody) || 'Inter',
                        themeData?.typography?.large?.fontSize || '1.125rem',
                        '400',
                        themeData?.typography?.large?.lineHeight || '1.2',
                      )}
                    </TypographyP>
                  </div>
                  <div id="small">
                    <TypographySmall themeData={themeData}>Email address</TypographySmall>
                    <TypographyP
                      dir={getTextDirection()}
                      style={typographyDescriptionStyles}
                      themeData={themeData}
                    >
                      {getTypographyDescription(
                        'small',
                        getFontLabel(themeData?.typography?.fontBody) || 'Inter',
                        themeData?.typography?.small?.fontSize ||
                          themeData?.typography?.textSm ||
                          '0.875rem',
                        '400',
                        themeData?.typography?.small?.lineHeight || '1.2',
                      )}
                    </TypographyP>
                  </div>
                  <div id="muted">
                    <TypographyMuted themeData={themeData}>
                      Enter your email address.
                    </TypographyMuted>
                    <TypographyP
                      dir={getTextDirection()}
                      style={typographyDescriptionStyles}
                      themeData={themeData}
                    >
                      {getTypographyDescription(
                        'muted',
                        getFontLabel(themeData?.typography?.fontBody) || 'Inter',
                        themeData?.typography?.muted?.fontSize ||
                          themeData?.typography?.textSm ||
                          '0.875rem',
                        '400',
                        themeData?.typography?.muted?.lineHeight || '1.2',
                      )}
                    </TypographyP>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <aside className="w-64 flex-shrink-0 border-l border-neutral-200 dark:border-neutral-700">
          <div className="fixed top-0 p-4">
            <div className="font-semibold mb-2">On This Page</div>
            <ul className="space-y-1">
              {typographyLinks.map((link) => (
                <li key={link.href}>
                  <a
                    className={cn(
                      'text-sm hover:underline block transition-colors duration-200',
                      activeLink === link.href
                        ? 'text-primary font-medium'
                        : 'text-on-page hover:text-color-secondary',
                    )}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    style={{
                      color: activeLink === link.href ? 'var(--color-primary)' : undefined,
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}

const LayoutContent = () => {
  const [themeData, setThemeData] = useState<any>(null)

  useEffect(() => {
    async function fetchTheme() {
      try {
        const data = await getClientTheme()
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

  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl border border-neutral-200 p-4 md:p-10 dark:border-neutral-700">
        <h1 className="text-3xl font-bold mb-8">Layout & Spacing</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Layout Grid</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                {/* Get max width size from theme data */}
                <label className="text-sm font-medium">Container Width</label>
                <input
                  className="w-full p-2 border rounded bg-gray-100"
                  readOnly
                  type="text"
                  value={themeData?.layout?.maxWidth ? `${themeData.layout.maxWidth}px` : '1280px'}
                />
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
    <a className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal" href="#">
      <div className="h-8 w-8 shrink-0">
        <svg
          fill="none"
          height="28"
          viewBox="0 0 348 344"
          width="28"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fill-primary"
            d="M334.974 109.247C317.709 113.038 301.421 119.405 286.525 127.904C291.885 141.586 294.876 156.453 294.876 172.001C294.876 230.105 253.86 278.614 199.22 290.223C200.464 308.94 204.64 326.856 211.333 343.5C289.22 326.412 347.531 257.054 347.531 174.044C347.531 151.122 343.059 129.267 334.974 109.247Z"
          />
          <path
            className="fill-primary"
            d="M294.869 172.001C294.869 156.423 291.878 141.557 286.518 127.904C234.129 157.756 198.799 214.083 198.799 278.703C198.799 282.582 198.977 286.403 199.213 290.193C253.853 278.584 294.869 230.075 294.869 171.971V172.001Z"
          />
          <path
            className="fill-primary"
            d="M53.1244 172.001C53.1244 156.423 56.1154 141.557 61.4757 127.904C46.5499 119.405 30.2617 113.038 13.0259 109.247C4.94107 129.267 0.469238 151.122 0.469238 174.044C0.469238 257.054 58.7808 326.412 136.668 343.5C143.361 326.856 147.566 308.94 148.78 290.223C94.1409 278.614 53.1244 230.105 53.1244 172.001Z"
          />
          <path
            className="fill-primary"
            d="M61.4852 127.874C56.1249 141.556 53.1338 156.423 53.1338 171.971C53.1338 230.075 94.1503 278.584 148.79 290.193C149.027 286.373 149.204 282.552 149.204 278.702C149.204 214.083 113.874 157.756 61.4852 127.904V127.874Z"
          />
          <path
            className="fill-primary"
            d="M262.38 89.6109C277.602 81.3188 291.432 70.8352 303.455 58.545C271.679 22.9184 225.48 0.5 174.009 0.5C125.441 0.5 81.5516 20.49 50.0415 52.6517C61.5024 65.4749 74.8291 76.5508 89.6069 85.5241C111.403 64.2607 141.166 51.1413 174.009 51.1413C208.895 51.1413 240.346 65.9487 262.409 89.6109H262.38Z"
          />
          <path
            className="fill-primary"
            d="M262.378 89.6111C240.315 65.9489 208.893 51.1415 173.977 51.1415C141.135 51.1415 111.342 64.2608 89.5752 85.5243C115.814 101.457 146.554 110.667 179.486 110.667C209.515 110.667 237.738 103.027 262.378 89.5815V89.6111Z"
          />
        </svg>
      </div>
      <motion.span
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-on-page"
        initial={{ opacity: 0 }}
      >
        Theme Config
      </motion.span>
    </a>
  )
}

export const LogoIcon = () => {
  return (
    <a className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal" href="#">
      <div className="h-8 w-8 shrink-0">
        <svg
          fill="none"
          height="26"
          viewBox="0 0 348 344"
          width="26"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fill-primary"
            d="M334.974 109.247C317.709 113.038 301.421 119.405 286.525 127.904C291.885 141.586 294.876 156.453 294.876 172.001C294.876 230.105 253.86 278.614 199.22 290.223C200.464 308.94 204.64 326.856 211.333 343.5C289.22 326.412 347.531 257.054 347.531 174.044C347.531 151.122 343.059 129.267 334.974 109.247Z"
          />
          <path
            className="fill-primary"
            d="M294.869 172.001C294.869 156.423 291.878 141.557 286.518 127.904C234.129 157.756 198.799 214.083 198.799 278.703C198.799 282.582 198.977 286.403 199.213 290.193C253.853 278.584 294.869 230.075 294.869 171.971V172.001Z"
          />
          <path
            className="fill-primary"
            d="M53.1244 172.001C53.1244 156.423 56.1154 141.557 61.4757 127.904C46.5499 119.405 30.2617 113.038 13.0259 109.247C4.94107 129.267 0.469238 151.122 0.469238 174.044C0.469238 257.054 58.7808 326.412 136.668 343.5C143.361 326.856 147.566 308.94 148.78 290.223C94.1409 278.614 53.1244 230.105 53.1244 172.001Z"
          />
          <path
            className="fill-primary"
            d="M61.4852 127.874C56.1249 141.556 53.1338 156.423 53.1338 171.971C53.1338 230.075 94.1503 278.584 148.79 290.193C149.027 286.373 149.204 282.552 149.204 278.702C149.204 214.083 113.874 157.756 61.4852 127.904V127.874Z"
          />
          <path
            className="fill-primary"
            d="M262.38 89.6109C277.602 81.3188 291.432 70.8352 303.455 58.545C271.679 22.9184 225.48 0.5 174.009 0.5C125.441 0.5 81.5516 20.49 50.0415 52.6517C61.5024 65.4749 74.8291 76.5508 89.6069 85.5241C111.403 64.2607 141.166 51.1413 174.009 51.1413C208.895 51.1413 240.346 65.9487 262.409 89.6109H262.38Z"
          />
          <path
            className="fill-primary"
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
        'mx-auto flex w-full flex-1 flex-col rounded-md border border-neutral-200 md:flex-row dark:border-neutral-700',
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
