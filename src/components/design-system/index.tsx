'use client'

import React, { useState } from 'react'

import type { ThemeConfig } from '../../types'

import { cn } from '../../utils/cn'
import { ThemeProvider } from '../theme/ThemeProvider'
import { Sidebar, SidebarBody, SidebarLink } from '../ui/sidebar'
import { designSystemLinks } from './links'
import { Logo } from './Logo'
import ColorsContent from './tabs/ColorsContent'
import LayoutContent from './tabs/LayoutContent'
import TypographyContent from './tabs/TypographyContent'

const DesignSystemComponent = ({ themeData }: { themeData: ThemeConfig }) => {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('colors')

  return (
    <div
      className={cn(
        'mx-auto flex w-full flex-1 rounded-md border border-neutral-200 flex-row dark:border-neutral-700',
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
            <Logo isOpen={open} />
            <div className="mt-8 flex flex-col gap-2">
              {designSystemLinks.map((link) => (
                <SidebarLink
                  className={cn(
                    activeTab === link.id && 'bg-card text-on-card',
                    'hover:bg-card hover:text-on-card',
                  )}
                  key={link.id}
                  link={link}
                  onClick={() => setActiveTab(link.id)}
                />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>

      <div className="flex-1 overflow-auto w-full">
        <ThemeProvider themeData={themeData}>
          {activeTab === 'colors' && <ColorsContent />}
          {activeTab === 'typography' && <TypographyContent />}
          {activeTab === 'layout' && <LayoutContent />}
        </ThemeProvider>
      </div>
    </div>
  )
}

export default DesignSystemComponent
