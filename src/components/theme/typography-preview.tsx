'use client'
import React, { useState } from 'react'

import { getFontDefinition } from '../../utils/typography/font-definitions'
import {
  getFontSize as getResponsiveFontSize,
  getLineHeight as getResponsiveLineHeight,
} from '../../utils/typography/getResponsiveValue'
import { useResponsiveValue } from '../../utils/typography/useResponsiveValue'
import {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyInlineCode,
  TypographyLarge,
  TypographyLead,
  TypographyMuted,
  TypographyP,
  TypographySmall,
} from './typography'

const BREAKPOINTS = [
  {
    name: 'Large Desktop',
    description: '1920px+',
    icon: '🖥️',
    maxWidth: 'max-w-none',
    value: 'largeDesktop',
    width: 'w-full',
  },
  {
    name: 'Desktop',
    description: '1024px - 1919px',
    icon: '💻',
    maxWidth: 'max-w-6xl',
    value: 'desktop',
    width: 'w-4/5',
  },
  {
    name: 'Tablet',
    description: '768px - 1023px',
    icon: '📱',
    maxWidth: 'max-w-2xl',
    value: 'tablet',
    width: 'w-2/3',
  },
  {
    name: 'Mobile',
    description: '320px - 767px',
    icon: '📱',
    maxWidth: 'max-w-sm',
    value: 'mobile',
    width: 'w-full',
  },
]

interface TypographyPreviewProps {
  bodyFont?: string
  headingFont?: string
  themeData?: any
}

const TypographyPreview = ({ bodyFont, headingFont, themeData }: TypographyPreviewProps) => {
  const [selectedBreakpoint, setSelectedBreakpoint] = useState(0)
  const { getFontSize: getWindowFontSize, getLineHeight: getWindowLineHeight } =
    useResponsiveValue()

  // Custom functions that use the selected breakpoint instead of window breakpoint
  const getFontSize = (obj: Record<string, any> | undefined): string => {
    const breakpoints = ['largeDesktop', 'desktop', 'tablet', 'mobile']
    const breakpoint = breakpoints[selectedBreakpoint]

    const result = getResponsiveFontSize(obj, breakpoint) || ''
    return result
  }

  const getLineHeight = (obj: Record<string, any> | undefined): string => {
    const breakpoints = ['largeDesktop', 'desktop', 'tablet', 'mobile']
    const breakpoint = breakpoints[selectedBreakpoint]

    const result = getResponsiveLineHeight(obj, breakpoint) || ''
    return result
  }

  // Utility functions from parent component
  const getTextDirection = (): 'auto' | 'ltr' | 'rtl' => {
    return themeData?.typography?.direction || 'auto'
  }

  const getFontLabel = (value: null | string): null | string => {
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
        blockquote: `ציטוט - גופן: ${font}, גודל: ${size}, משקל: ${weight}${lineHeight ? `, גובה שורה: ${lineHeight}` : ''}`,
        code: `קוד - גופן: ${font}, גודל: ${size}, משקל: ${weight}${lineHeight ? `, גובה שורה: ${lineHeight}` : ''}`,
        h1: `כותרת ראשית - גופן: ${font}, גודל: ${size}, משקל: ${weight}${lineHeight ? `, גובה שורה: ${lineHeight}` : ''}`,
        h2: `כותרת משנית - גופן: ${font}, גודל: ${size}, משקל: ${weight}${lineHeight ? `, גובה שורה: ${lineHeight}` : ''}`,
        h3: `כותרת שלישית - גופן: ${font}, גודל: ${size}, משקל: ${weight}${lineHeight ? `, גובה שורה: ${lineHeight}` : ''}`,
        h4: `כותרת רביעית - גופן: ${font}, גודל: ${size}, משקל: ${weight}${lineHeight ? `, גובה שורה: ${lineHeight}` : ''}`,
        large: `טקסט גדול - גופן: ${font}, גודל: ${size}, משקל: ${weight}${lineHeight ? `, גובה שורה: ${lineHeight}` : ''}`,
        lead: `פסקת פתיחה - גופן: ${font}, גודל: ${size}, משקל: ${weight}${lineHeight ? `, גובה שורה: ${lineHeight}` : ''}`,
        muted: `טקסט משני - גופן: ${font}, גודל: ${size}, משקל: ${weight}${lineHeight ? `, גובה שורה: ${lineHeight}` : ''}`,
        p: `טקסט גוף - גופן: ${font}, גודל: ${size}, משקל: ${weight}${lineHeight ? `, גובה שורה: ${lineHeight}` : ''}`,
        small: `טקסט קטן - גופן: ${font}, גודל: ${size}, משקל: ${weight}${lineHeight ? `, גובה שורה: ${lineHeight}` : ''}`,
      }
      return descriptions[type as keyof typeof descriptions] || type
    }
    const descriptions = {
      blockquote: `Blockquote - Font: ${font}, Size: ${size}, Weight: ${weight}${lineHeight ? `, Line Height: ${lineHeight}` : ''}`,
      code: `Code - Font: ${font}, Size: ${size}, Weight: ${weight}${lineHeight ? `, Line Height: ${lineHeight}` : ''}`,
      h1: `Main Heading - Font: ${font}, Size: ${size}, Weight: ${weight}${lineHeight ? `, Line Height: ${lineHeight}` : ''}`,
      h2: `Secondary Heading - Font: ${font}, Size: ${size}, Weight: ${weight}${lineHeight ? `, Line Height: ${lineHeight}` : ''}`,
      h3: `Third Heading - Font: ${font}, Size: ${size}, Weight: ${weight}${lineHeight ? `, Line Height: ${lineHeight}` : ''}`,
      h4: `Fourth Heading - Font: ${font}, Size: ${size}, Weight: ${weight}${lineHeight ? `, Line Height: ${lineHeight}` : ''}`,
      large: `Large Text - Font: ${font}, Size: ${size}, Weight: ${weight}${lineHeight ? `, Line Height: ${lineHeight}` : ''}`,
      lead: `Lead Paragraph - Font: ${font}, Size: ${size}, Weight: ${weight}${lineHeight ? `, Line Height: ${lineHeight}` : ''}`,
      muted: `Muted Text - Font: ${font}, Size: ${size}, Weight: ${weight}${lineHeight ? `, Line Height: ${lineHeight}` : ''}`,
      p: `Body Text - Font: ${font}, Size: ${size}, Weight: ${weight}${lineHeight ? `, Line Height: ${lineHeight}` : ''}`,
      small: `Small Text - Font: ${font}, Size: ${size}, Weight: ${weight}${lineHeight ? `, Line Height: ${lineHeight}` : ''}`,
    }
    return descriptions[type as keyof typeof descriptions] || type
  }

  const getElementTypographyInfo = (elementName: string) => {
    const isHeading = ['h1', 'h2', 'h3', 'h4'].includes(elementName)
    const fontFamily = isHeading
      ? getFontLabel(themeData?.typography?.fontHeading) || 'Poppins'
      : getFontLabel(themeData?.typography?.fontBody) || 'Inter'

    let fontSize = '1rem'
    let fontWeight = '400'
    let lineHeight = '1.5'

    switch (elementName) {
      case 'blockquote':
        fontSize = getFontSize(themeData?.typography?.blockquote?.fontSize) || '1.125rem'
        fontWeight = '400'
        lineHeight = getLineHeight(themeData?.typography?.blockquote?.lineHeight) || '1.5'
        break
      case 'code':
        fontSize =
          getFontSize(themeData?.typography?.inlineCode?.fontSize) ||
          getFontSize(themeData?.typography?.textSm) ||
          '0.875rem'
        fontWeight = '600'
        lineHeight = getLineHeight(themeData?.typography?.inlineCode?.lineHeight) || '1.2'
        break
      case 'h1':
        fontSize =
          getFontSize(themeData?.typography?.h1?.fontSize) ||
          getFontSize(themeData?.typography?.text3xl) ||
          '2.25rem'
        fontWeight = '800'
        lineHeight = getLineHeight(themeData?.typography?.h1?.lineHeight) || '1.2'
        break
      case 'h2':
        fontSize =
          getFontSize(themeData?.typography?.h2?.fontSize) ||
          getFontSize(themeData?.typography?.text2xl) ||
          '1.875rem'
        fontWeight = '600'
        lineHeight = getLineHeight(themeData?.typography?.h2?.lineHeight) || '1.2'
        break
      case 'h3':
        fontSize =
          getFontSize(themeData?.typography?.h3?.fontSize) ||
          getFontSize(themeData?.typography?.textXl) ||
          '1.5rem'
        fontWeight = '600'
        lineHeight = getLineHeight(themeData?.typography?.h3?.lineHeight) || '1.2'
        break
      case 'h4':
        fontSize =
          getFontSize(themeData?.typography?.h4?.fontSize) ||
          getFontSize(themeData?.typography?.textLg) ||
          '1.25rem'
        fontWeight = '600'
        lineHeight = getLineHeight(themeData?.typography?.h4?.lineHeight) || '1.2'
        break
      case 'large':
        fontSize = getFontSize(themeData?.typography?.large?.fontSize) || '1.125rem'
        fontWeight = '400'
        lineHeight = getLineHeight(themeData?.typography?.large?.lineHeight) || '1.5'
        break
      case 'lead':
        fontSize = getFontSize(themeData?.typography?.lead?.fontSize) || '1.25rem'
        fontWeight = '400'
        lineHeight = getLineHeight(themeData?.typography?.lead?.lineHeight) || '1.75'
        break
      case 'list':
        fontSize = getFontSize(themeData?.typography?.list?.fontSize) || '1rem'
        fontWeight = '400'
        lineHeight = getLineHeight(themeData?.typography?.list?.lineHeight) || '1.5'
        break
      case 'muted':
        fontSize =
          getFontSize(themeData?.typography?.muted?.fontSize) ||
          getFontSize(themeData?.typography?.textSm) ||
          '0.875rem'
        fontWeight = '400'
        lineHeight = getLineHeight(themeData?.typography?.muted?.lineHeight) || '1.5'
        break
      case 'p':
        fontSize =
          getFontSize(themeData?.typography?.p?.fontSize) ||
          getFontSize(themeData?.typography?.textBase) ||
          '1rem'
        fontWeight = '400'
        lineHeight = getLineHeight(themeData?.typography?.p?.lineHeight) || '1.5'
        break
      case 'small':
        fontSize =
          getFontSize(themeData?.typography?.small?.fontSize) ||
          getFontSize(themeData?.typography?.textSm) ||
          '0.875rem'
        fontWeight = '400'
        lineHeight = getLineHeight(themeData?.typography?.small?.lineHeight) || '1.5'
        break
      case 'table':
        fontSize = getFontSize(themeData?.typography?.table?.fontSize) || '1rem'
        fontWeight = '400'
        lineHeight = getLineHeight(themeData?.typography?.table?.lineHeight) || '1.5'
        break
      default:
        fontSize = '1rem'
        fontWeight = '400'
        lineHeight = '1.5'
    }

    return getTypographyDescription(elementName, fontFamily, fontSize, fontWeight, lineHeight)
  }

  const currentBreakpoint = BREAKPOINTS[selectedBreakpoint]
  const breakpointNames = ['largeDesktop', 'desktop', 'tablet', 'mobile'] as const
  const selectedBreakpointName: (typeof breakpointNames)[number] =
    breakpointNames[selectedBreakpoint]

  return (
    <div className="space-y-8">
      {/* Responsive Preview Controls */}
      <section className="bg-card text-card rounded-xl p-6 border border-blue-100">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-gray-800">
          <span className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
            <span aria-label="Responsive Preview" className="text-lg" role="img">
              📱
            </span>
          </span>
          Responsive Preview
        </h3>

        {/* Breakpoint Selector */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">
            Select a breakpoint to preview how typography will appear at different screen sizes:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {BREAKPOINTS.map((breakpoint, index) => (
              <button
                aria-label={`Select ${breakpoint.name} breakpoint`}
                aria-pressed={selectedBreakpoint === index}
                className={`
                  group relative flex flex-col items-center gap-1 px-2 py-2 rounded-lg border text-xs font-medium transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-1
                  ${
                    selectedBreakpoint === index
                      ? 'bg-indigo-50 border-indigo-400 text-indigo-700 shadow-sm'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-indigo-200'
                  }
                `}
                key={breakpoint.name}
                onClick={() => setSelectedBreakpoint(index)}
                title={`${breakpoint.name} (${breakpoint.description})`}
              >
                {/* Active indicator */}
                {selectedBreakpoint === index && (
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-indigo-400 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                )}
                <span
                  aria-hidden="true"
                  className={`text-lg transition-transform duration-200 ${
                    selectedBreakpoint === index ? 'scale-105' : 'group-hover:scale-105'
                  }`}
                >
                  {breakpoint.icon}
                </span>
                <span
                  className={`font-semibold text-xs ${selectedBreakpoint === index ? 'text-indigo-700' : 'text-gray-700'}`}
                >
                  {breakpoint.name}
                </span>
                <span
                  className={`text-[10px] ${selectedBreakpoint === index ? 'text-indigo-500' : 'text-gray-400'}`}
                >
                  {breakpoint.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Preview Container */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Device frame indicator */}
            <div className="absolute -top-7 left-1/2 transform -translate-x-1/2">
              <div className="bg-gray-700 text-white px-2 py-0.5 rounded text-xs font-medium shadow">
                {currentBreakpoint.name}
              </div>
            </div>
            <div
              className={`
                ${currentBreakpoint.width} ${currentBreakpoint.maxWidth}
                transition-all duration-500 ease-in-out
                border border-gray-200 rounded-lg p-4
                bg-gradient-to-br from-white to-gray-50/60
                shadow
                relative overflow-hidden
              `}
            >
              {/* Responsive indicator */}
              <div className="absolute top-2 right-2">
                <div className="flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full text-[10px] font-medium">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"></span>
                  {currentBreakpoint.description}
                </div>
              </div>
              <div className="space-y-3" id="typography-preview">
                {/* Sample Content for Preview */}
                <div>
                  <TypographyH1 breakpoint={selectedBreakpointName} themeData={themeData}>
                    {getDirectionalText('heading')}
                  </TypographyH1>
                  <TypographyH3 breakpoint={selectedBreakpointName} themeData={themeData}>
                    {getDirectionalText('heading')}
                  </TypographyH3>
                  <TypographyP breakpoint={selectedBreakpointName} themeData={themeData}>
                    {getDirectionalText('paragraph')}
                  </TypographyP>
                  <TypographySmall breakpoint={selectedBreakpointName} themeData={themeData}>
                    {getDirectionalText('paragraph')}
                  </TypographySmall>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typography Scale */}
      <section>
        <h4 className="text-xl font-bold mb-6 flex items-center gap-3 text-gray-800">
          <span className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg">
            <span aria-label="Typography Scale" className="text-lg" role="img">
              📝
            </span>
          </span>
          Typography Scale
        </h4>
        <div className="grid gap-6">
          {/* H1 */}
          <div
            className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
            id="h1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex flex-col">
                <span className="font-mono text-xs text-gray-500 uppercase tracking-wide mb-1">
                  h1
                </span>
                <span className="text-sm text-gray-600">Main Heading</span>
              </div>
              <span className="flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-all duration-200 text-sm text-card bg-card">
                {getElementTypographyInfo('h1')}
              </span>
            </div>
            <TypographyH1 breakpoint={selectedBreakpointName} themeData={themeData}>
              {getDirectionalText('heading')}
            </TypographyH1>
          </div>

          {/* H2 */}
          <div
            className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
            id="h2"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex flex-col">
                <span className="font-mono text-xs text-gray-500 uppercase tracking-wide mb-1">
                  h2
                </span>
                <span className="text-sm text-gray-600">Secondary Heading</span>
              </div>
              <span className="flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-all duration-200 text-sm text-card bg-card">
                {getElementTypographyInfo('h2')}
              </span>
            </div>
            <TypographyH2 breakpoint={selectedBreakpointName} themeData={themeData}>
              {getDirectionalText('heading')}
            </TypographyH2>
          </div>

          {/* H3 */}
          <div
            className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
            id="h3"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex flex-col">
                <span className="font-mono text-xs text-gray-500 uppercase tracking-wide mb-1">
                  h3
                </span>
                <span className="text-sm text-gray-600">Third Heading</span>
              </div>
              <span className="flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-all duration-200 text-sm text-card bg-card">
                {getElementTypographyInfo('h3')}
              </span>
            </div>
            <TypographyH4 breakpoint={selectedBreakpointName} themeData={themeData}>
              {getDirectionalText('heading')}
            </TypographyH4>
          </div>

          {/* H4 */}
          <div
            className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
            id="h4"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex flex-col">
                <span className="font-mono text-xs text-gray-500 uppercase tracking-wide mb-1">
                  h4
                </span>
                <span className="text-sm text-gray-600">Fourth Heading</span>
              </div>
              <span className="flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-all duration-200 text-sm text-card bg-card">
                {getElementTypographyInfo('h4')}
              </span>
            </div>
            <TypographyH4 breakpoint={selectedBreakpointName} themeData={themeData}>
              {getDirectionalText('heading')}
            </TypographyH4>
          </div>

          {/* Paragraph */}
          <div
            className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
            id="p"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex flex-col">
                <span className="font-mono text-xs text-gray-500 uppercase tracking-wide mb-1">
                  p
                </span>
                <span className="text-sm text-gray-600">Body Text</span>
              </div>
              <span className="flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-all duration-200 text-sm text-card bg-card">
                {getElementTypographyInfo('p')}
              </span>
            </div>
            <TypographyP breakpoint={selectedBreakpointName} themeData={themeData}>
              {getDirectionalText('paragraph')}
            </TypographyP>
          </div>

          {/* Blockquote */}
          <div
            className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
            id="blockquote"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex flex-col">
                <span className="font-mono text-xs text-gray-500 uppercase tracking-wide mb-1">
                  blockquote
                </span>
                <span className="text-sm text-gray-600">Quote Text</span>
              </div>
              <span className="flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-all duration-200 text-sm text-card bg-card">
                {getElementTypographyInfo('blockquote')}
              </span>
            </div>
            <TypographyBlockquote breakpoint={selectedBreakpointName} themeData={themeData}>
              {getDirectionalText('blockquote')}
            </TypographyBlockquote>
          </div>

          {/* Small */}
          <div
            className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
            id="small"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex flex-col">
                <span className="font-mono text-xs text-gray-500 uppercase tracking-wide mb-1">
                  small
                </span>
                <span className="text-sm text-gray-600">Small Text</span>
              </div>
              <span className="flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-all duration-200 text-sm text-card bg-card">
                {getElementTypographyInfo('small')}
              </span>
            </div>
            <TypographySmall breakpoint={selectedBreakpointName} themeData={themeData}>
              {getDirectionalText('paragraph')}
            </TypographySmall>
          </div>

          {/* Muted */}
          <div
            className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
            id="muted"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex flex-col">
                <span className="font-mono text-xs text-gray-500 uppercase tracking-wide mb-1">
                  muted
                </span>
                <span className="text-sm text-gray-600">Muted Text</span>
              </div>
              <span className="flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-all duration-200 text-sm text-card bg-card">
                {getElementTypographyInfo('muted')}
              </span>
            </div>
            <TypographyMuted breakpoint={selectedBreakpointName} themeData={themeData}>
              {getDirectionalText('paragraph')}
            </TypographyMuted>
          </div>

          {/* Lead */}
          <div
            className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
            id="lead"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex flex-col">
                <span className="font-mono text-xs text-gray-500 uppercase tracking-wide mb-1">
                  lead
                </span>
                <span className="text-sm text-gray-600">Lead Paragraph</span>
              </div>
              <span className="flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-all duration-200 text-sm text-card bg-card">
                {getElementTypographyInfo('lead')}
              </span>
            </div>
            <TypographyLead breakpoint={selectedBreakpointName} themeData={themeData}>
              {getLeadParagraphText()}
            </TypographyLead>
          </div>

          {/* Large */}
          <div
            className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
            id="large"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex flex-col">
                <span className="font-mono text-xs text-gray-500 uppercase tracking-wide mb-1">
                  large
                </span>
                <span className="text-sm text-gray-600">Large Text</span>
              </div>
              <span className="flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-all duration-200 text-sm text-card bg-card">
                {getElementTypographyInfo('large')}
              </span>
            </div>
            <TypographyLarge breakpoint={selectedBreakpointName} themeData={themeData}>
              {getLargeTextExample()}
            </TypographyLarge>
          </div>

          {/* Inline Code */}
          <div
            className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
            id="inline-code"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex flex-col">
                <span className="font-mono text-xs text-gray-500 uppercase tracking-wide mb-1">
                  code
                </span>
                <span className="text-sm text-gray-600">Inline Code</span>
              </div>
              <span className="flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-all duration-200 text-sm text-card bg-card">
                {getElementTypographyInfo('code')}
              </span>
            </div>
            <TypographyInlineCode breakpoint={selectedBreakpointName} themeData={themeData}>
              const example = "code snippet"
            </TypographyInlineCode>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TypographyPreview
