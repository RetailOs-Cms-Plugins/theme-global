import { useCallback, useState } from "react"

import { cn } from "../../../utils/cn"
import { getFontDefinition } from "../../../utils/typography/font-definitions"
import { useTheme } from "../../theme/ThemeProvider"
import { Typography } from "../../theme/typography"
import TypographyPreview from "../../theme/typography-preview"

export default function TypographyContent() {
    const [activeLink, setActiveLink] = useState<string>('')
    const themeData = useTheme()
  
    const getFontLabel = useCallback(
      (value: string | undefined): null | string => {
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
      },
      [themeData],
    )
  
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
            <Typography tagType="h1" themeData={themeData}>Typography</Typography>
  
            <div className="space-y-12">
              <section>
                <Typography className="mt-4" tagType="h3" themeData={themeData}>
                  Selected Font Families
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
                    <Typography tagType="h3" themeData={themeData}>Body Font</Typography>
                    <Typography className="mt-1 text-2xl" tagType="p" themeData={themeData}>
                      {getFontLabel(themeData?.typography?.fontBody) || 'Inter'}
                    </Typography>
                  </div>
                  <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
                    <Typography tagType="h3" themeData={themeData}>Heading Font</Typography>
                    <Typography className="mt-1 text-2xl" tagType="p" themeData={themeData}> 
                      {getFontLabel(themeData?.typography?.fontHeading) || 'Poppins'}
                    </Typography>
                  </div>
                </div>
              </section>
  
              <section className="space-y-8">
                <div>
                  <Typography tagType="h3" themeData={themeData}>Typography Scale</Typography>
                  <TypographyPreview themeData={themeData} />
                </div>
              </section>
            </div>
          </div>
          <aside className="hidden xl:block w-64 flex-shrink-0 border-l border-neutral-200 dark:border-neutral-700">
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