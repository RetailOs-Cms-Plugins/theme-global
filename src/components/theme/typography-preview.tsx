'use client'
import React from 'react'

const TYPOGRAPHY_ELEMENTS = [
  {
    name: 'h1',
    className: 'text-4xl font-bold tracking-tight',
    description: 'Main page titles and hero sections',
    label: 'Heading 1',
  },
  {
    name: 'h2',
    className: 'text-3xl font-semibold tracking-tight',
    description: 'Section headers and major content divisions',
    label: 'Heading 2',
  },
  {
    name: 'h3',
    className: 'text-2xl font-semibold tracking-tight',
    description: 'Subsection headers and content grouping',
    label: 'Heading 3',
  },
  {
    name: 'h4',
    className: 'text-xl font-semibold tracking-tight',
    description: 'Minor section headers and emphasis',
    label: 'Heading 4',
  },
  {
    name: 'p',
    className: 'text-base leading-relaxed',
    description: 'Main content and readable text',
    label: 'Paragraph',
  },
  {
    name: 'blockquote',
    className: 'mt-6 border-l-2 pl-6 italic',
    description: 'Quotes and cited text',
    label: 'Blockquote',
  },
  {
    name: 'table',
    className: 'my-6 w-full',
    description: 'Tabular data',
    label: 'Table',
  },
  {
    name: 'list',
    className: 'my-6 ml-6 list-disc [&>li]:mt-2',
    description: 'Unordered list items',
    label: 'List',
  },
  {
    name: 'code',
    className: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm',
    description: 'Code snippets and technical terms',
    label: 'Inline Code',
  },
  {
    name: 'lead',
    className: 'text-xl leading-relaxed',
    description: 'Introductory paragraphs and summaries',
    label: 'Lead Paragraph',
  },
  {
    name: 'large',
    className: 'text-lg leading-relaxed',
    description: 'Emphasized body text and highlights',
    label: 'Large Text',
  },
  {
    name: 'small',
    className: 'text-sm leading-relaxed',
    description: 'Captions, metadata, and secondary information',
    label: 'Small Text',
  },
  {
    name: 'muted',
    className: 'text-sm text-muted-foreground leading-relaxed',
    description: 'Subtle text for less important information',
    label: 'Muted Text',
  },
]

interface TypographyPreviewProps {
  bodyFont?: string
  headingFont?: string
}

const TypographyPreview = ({ bodyFont, headingFont }: TypographyPreviewProps) => {
  const getStyle = (elementName: string) => {
    const isHeading = ['h1', 'h2', 'h3', 'h4'].includes(elementName)

    if (isHeading && headingFont) {
      return { fontFamily: headingFont }
    }

    if (bodyFont) {
      return { fontFamily: bodyFont }
    }

    return {}
  }

  return (
    <div className="space-y-8">
      {/* Typography Scale */}
      <section>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span aria-label="Typography Scale" role="img">
            📝
          </span>
          Typography Scale
        </h3>
        <div className="space-y-6">
          {TYPOGRAPHY_ELEMENTS.map((element) => (
            <div
              className="border rounded-lg p-4 bg-white/80 shadow-sm"
              id={element.name}
              key={element.name}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex flex-col">
                  <span className="font-mono text-xs text-gray-500 uppercase tracking-wide">
                    {element.name}
                  </span>
                  <span className="text-sm text-gray-600">{element.description}</span>
                </div>
                <span className="font-mono text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                  {element.className}
                </span>
              </div>
              <div className={element.className} style={getStyle(element.name)}>
                {element.name === 'h1' && 'The quick brown fox jumps over the lazy dog'}
                {element.name === 'h2' && 'The quick brown fox jumps over the lazy dog'}
                {element.name === 'h3' && 'The quick brown fox jumps over the lazy dog'}
                {element.name === 'h4' && 'The quick brown fox jumps over the lazy dog'}
                {element.name === 'p' &&
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'}
                {element.name === 'blockquote' &&
                  '"This is a blockquote. It is used to offset text from the main content."'}
                {element.name === 'table' && (
                  <table className="w-full text-start">
                    <thead>
                      <tr>
                        <th className="border p-2">Header 1</th>
                        <th className="border p-2">Header 2</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">Data 1</td>
                        <td className="border p-2">Data 2</td>
                      </tr>
                    </tbody>
                  </table>
                )}
                {element.name === 'list' && (
                  <ul>
                    <li>List item one</li>
                    <li>List item two</li>
                  </ul>
                )}
                {element.name === 'small' && 'This is small text used for captions and metadata.'}
                {element.name === 'muted' && 'This is muted text for less important information.'}
                {element.name === 'lead' &&
                  'This is a lead paragraph that introduces the main content. It should be slightly larger and more prominent than regular body text.'}
                {element.name === 'large' &&
                  'This is large text that provides emphasis and draws attention to important content.'}
                {element.name === 'code' && 'const example = "code snippet"'}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography Best Practices */}
      <section>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span aria-label="Best Practices" role="img">
            ✨
          </span>
          Typography Best Practices
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4 bg-white/80 shadow-sm">
            <h4 className="font-semibold mb-2">Heading Hierarchy</h4>
            <div className="space-y-2 text-sm">
              <p>• Use H1 for main page titles only</p>
              <p>• Maintain logical heading order (H1 → H2 → H3)</p>
              <p>• Don't skip heading levels</p>
              <p>• Use semantic meaning, not just visual styling</p>
            </div>
          </div>
          <div className="border rounded-lg p-4 bg-white/80 shadow-sm">
            <h4 className="font-semibold mb-2">Readability</h4>
            <div className="space-y-2 text-sm">
              <p>• Optimal line length: 45-75 characters</p>
              <p>• Line height: 1.5-1.7 for body text</p>
              <p>• Adequate contrast ratios (4.5:1 minimum)</p>
              <p>• Consistent spacing between elements</p>
            </div>
          </div>
          <div className="border rounded-lg p-4 bg-white/80 shadow-sm">
            <h4 className="font-semibold mb-2">Font Selection</h4>
            <div className="space-y-2 text-sm">
              <p>• Choose readable fonts for body text</p>
              <p>• Limit to 2-3 font families maximum</p>
              <p>• Consider loading performance</p>
              <p>• Provide fallback fonts</p>
            </div>
          </div>
          <div className="border rounded-lg p-4 bg-white/80 shadow-sm">
            <h4 className="font-semibold mb-2">Responsive Typography</h4>
            <div className="space-y-2 text-sm">
              <p>• Use relative units (rem, em)</p>
              <p>• Scale text appropriately on mobile</p>
              <p>• Test readability across devices</p>
              <p>• Consider touch targets for mobile</p>
            </div>
          </div>
        </div>
      </section>

      {/* Font Variables Display */}
      <section>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span aria-label="Font Variables" role="img">
            🔤
          </span>
          Font Variables
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: '--font-family-base', label: 'Base Font Family' },
            { name: '--font-family-heading', label: 'Heading Font Family' },
            { name: '--font-size-base', label: 'Base Font Size' },
            { name: '--font-size-sm', label: 'Small Font Size' },
            { name: '--font-size-lg', label: 'Large Font Size' },
            { name: '--font-size-xl', label: 'Extra Large Font Size' },
            { name: '--font-weight-normal', label: 'Normal Font Weight' },
            { name: '--font-weight-medium', label: 'Medium Font Weight' },
            { name: '--font-weight-semibold', label: 'Semibold Font Weight' },
            { name: '--font-weight-bold', label: 'Bold Font Weight' },
            { name: '--line-height-tight', label: 'Tight Line Height' },
            { name: '--line-height-normal', label: 'Normal Line Height' },
            { name: '--line-height-relaxed', label: 'Relaxed Line Height' },
          ].map((fontVar) => (
            <div
              className="flex items-center gap-4 p-3 rounded border bg-white/80 shadow-sm"
              key={fontVar.name}
            >
              <div className="flex flex-col">
                <span className="font-mono text-xs text-gray-700">{fontVar.label}</span>
                <span className="font-mono text-xs text-gray-400">{fontVar.name}</span>
                <span className="font-mono text-xs text-gray-900">
                  {typeof window !== 'undefined'
                    ? getComputedStyle(document.documentElement)
                        .getPropertyValue(fontVar.name)
                        .trim() || 'Not set'
                    : 'Loading...'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default TypographyPreview
