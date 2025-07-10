'use client'
import { IconMenu2, IconX } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import React, { createContext, useContext, useState } from 'react'

import { cn } from '../../utils/cn'

interface Links {
  href: string
  icon: React.JSX.Element | React.ReactNode
  label: string
}

interface SidebarContextProps {
  animate: boolean
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined)

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

export const SidebarProvider = ({
  animate = true,
  children,
  open: openProp,
  setOpen: setOpenProp,
}: {
  animate?: boolean
  children: React.ReactNode
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [openState, setOpenState] = useState(false)

  const open = openProp !== undefined ? openProp : openState
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState

  return (
    <SidebarContext.Provider value={{ animate, open, setOpen }}>{children}</SidebarContext.Provider>
  )
}

export const Sidebar = ({
  animate,
  children,
  open,
  setOpen,
}: {
  animate?: boolean
  children: React.ReactNode
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <SidebarProvider animate={animate} open={open} setOpen={setOpen}>
      {children}
    </SidebarProvider>
  )
}

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<'div'>)} />
    </>
  )
}

export const DesktopSidebar = ({
  children,
  className,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { animate, open, setOpen } = useSidebar()
  return (
    <>
      <motion.div
        animate={{
          width: animate ? (open ? '300px' : '60px') : '300px',
        }}
        className={cn(
          'h-full px-4 py-4 hidden md:flex md:flex-col sticky top-0 w-[300px] shrink-0',
          className,
        )}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        style={{
          backgroundColor: 'var(--page-background)',
          color: 'var(--text-on-page)',
        }}
        {...props}
      >
        {children}
      </motion.div>
    </>
  )
}

export const MobileSidebar = ({ children, className, ...props }: React.ComponentProps<'div'>) => {
  const { open, setOpen } = useSidebar()
  return (
    <>
      <div
        className={cn(
          'h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full',
        )}
        {...props}
      >
        <div className="flex justify-end z-20 w-full">
          <IconMenu2 className="text-neutral-800 " onClick={() => setOpen(!open)} />
        </div>
        <AnimatePresence>
          {open && (
            <>
              {/* Overlay for click-to-close */}
              <motion.div
                animate={{ opacity: 1 }}
                className="fixed inset-0 bg-black/40 z-[99]"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              />
              {/* Sidebar content */}
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  'fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between',
                  className,
                )}
                exit={{ opacity: 0, x: '-100%' }}
                initial={{ opacity: 0, x: '-100%' }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                }}
              >
                <button
                  aria-label="Close sidebar"
                  className="absolute left-10 top-10 z-50 text-neutral-800  p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full"
                  onClick={() => setOpen(false)}
                >
                  <IconX />
                </button>
                {children}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export const SidebarLink = ({
  className,
  link,
  onClick,
  ...props
}: {
  className?: string
  link: Links
  onClick?: () => void
}) => {
  const { animate, open } = useSidebar()
  return (
    <a
      className={cn('flex items-center justify-start gap-2 group/sidebar py-2', className)}
      href={link.href}
      onClick={(e) => {
        e.preventDefault()
        onClick?.()
      }}
      {...props}
    >
      {link.icon}

      <motion.span
        animate={{
          display: animate ? (open ? 'inline-block' : 'none') : 'inline-block',
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
        style={{
          color: 'currentColor',
        }}
      >
        {link.label}
      </motion.span>
    </a>
  )
}
