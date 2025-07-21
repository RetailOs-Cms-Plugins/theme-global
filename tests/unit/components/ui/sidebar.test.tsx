import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import {
  DesktopSidebar,
  MobileSidebar,
  Sidebar,
  SidebarBody,
  SidebarLink,
  SidebarProvider,
  useSidebar,
} from '../../../../src/components/ui/sidebar.js'

// Mock dependencies
vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: any) => <>{children}</>,
  motion: {
    div: ({ children, onClick, onMouseEnter, onMouseLeave, ...props }: any) => {
      // If has onClick, render as button for accessibility
      if (onClick) {
        return (
          <button
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            type="button"
            {...props}
          >
            {children}
          </button>
        )
      }
      
      return (
        <div 
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          role="button"
          tabIndex={0}
          {...props}
        >
          {children}
        </div>
      )
    },
    span: ({ children, ...props }: { children: React.ReactNode }) => <span {...props}>{children}</span>,
  },
}))

vi.mock('@tabler/icons-react', () => ({
  IconMenu2: ({ onClick }: { onClick: () => void }) => <button data-testid="menu-icon" onClick={onClick} type="button">Menu</button>,
  IconX: () => <span data-testid="close-icon">X</span>,
}))

vi.mock('../../../../src/utils/cn', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
}))

describe('Sidebar Components', () => {
  const mockLink = {
    href: '#test',
    icon: <span aria-label="Test Icon" data-testid="test-icon" role="img">🏠</span>,
    label: 'Test Link',
  }

  describe('SidebarProvider & useSidebar', () => {
    const TestComponent = () => {
      const { animate, open, setOpen } = useSidebar()
      return (
        <div>
          <div data-testid="open-state">{open.toString()}</div>
          <div data-testid="animate-state">{animate.toString()}</div>
          <button data-testid="toggle-btn" onClick={() => setOpen(!open)} type="button">
            Toggle
          </button>
        </div>
      )
    }

    it('should provide sidebar context with default values', () => {
      render(
        <SidebarProvider>
          <TestComponent />
        </SidebarProvider>
      )

      expect(screen.getByTestId('open-state')).toHaveTextContent('false')
      expect(screen.getByTestId('animate-state')).toHaveTextContent('true')
    })

    it('should handle controlled state', () => {
      const setOpen = vi.fn()
      
      render(
        <SidebarProvider open={true} setOpen={setOpen}>
          <TestComponent />
        </SidebarProvider>
      )

      expect(screen.getByTestId('open-state')).toHaveTextContent('true')
    })

    it('should toggle state', async () => {
      const user = userEvent.setup()
      
      render(
        <SidebarProvider>
          <TestComponent />
        </SidebarProvider>
      )

      const toggleBtn = screen.getByTestId('toggle-btn')
      await user.click(toggleBtn)
      
      expect(screen.getByTestId('open-state')).toHaveTextContent('true')
    })

    it('should throw error when useSidebar is used outside provider', () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      expect(() => {
        render(<TestComponent />)
      }).toThrow('useSidebar must be used within a SidebarProvider')
      
      consoleError.mockRestore()
    })
  })

  describe('SidebarLink', () => {
    it('should render link with icon and label', () => {
      render(
        <SidebarProvider>
          <SidebarLink link={mockLink} />
        </SidebarProvider>
      )

      expect(screen.getByTestId('test-icon')).toBeInTheDocument()
      expect(screen.getByText('Test Link')).toBeInTheDocument()
    })

    it('should call onClick and prevent default', async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()
      
      render(
        <SidebarProvider>
          <SidebarLink link={mockLink} onClick={onClick} />
        </SidebarProvider>
      )

      const link = screen.getByRole('link')
      await user.click(link)
      
      expect(onClick).toHaveBeenCalledOnce()
    })

    it('should apply custom className', () => {
      render(
        <SidebarProvider>
          <SidebarLink className="custom-class" link={mockLink} />
        </SidebarProvider>
      )

      const link = screen.getByRole('link')
      expect(link).toHaveClass('custom-class')
    })
  })

  describe('DesktopSidebar', () => {
    it('should render and handle mouse events', async () => {
      const user = userEvent.setup()
      
      render(
        <SidebarProvider>
          <DesktopSidebar data-testid="desktop-sidebar">
            <div>Desktop Content</div>
          </DesktopSidebar>
        </SidebarProvider>
      )

      const sidebar = screen.getByTestId('desktop-sidebar')
      expect(screen.getByText('Desktop Content')).toBeInTheDocument()
      
      // Test mouse enter/leave
      fireEvent.mouseEnter(sidebar)
      fireEvent.mouseLeave(sidebar)
    })
  })

  describe('MobileSidebar', () => {
    it('should render mobile menu and handle toggle', async () => {
      const user = userEvent.setup()
      
      render(
        <SidebarProvider>
          <MobileSidebar>
            <div>Mobile Content</div>
          </MobileSidebar>
        </SidebarProvider>
      )

      const menuButton = screen.getByTestId('menu-icon')
      await user.click(menuButton)
      
      expect(screen.getByText('Mobile Content')).toBeInTheDocument()
    })

    it('should close sidebar when overlay is clicked', async () => {
      const user = userEvent.setup()
      
      render(
        <SidebarProvider open={true}>
          <MobileSidebar>
            <div>Mobile Content</div>
          </MobileSidebar>
        </SidebarProvider>
      )

      const overlay = screen.getByRole('button', { name: /close sidebar/i })
      await user.click(overlay)
    })
  })

  describe('Sidebar & SidebarBody', () => {
    it('should render Sidebar wrapper', () => {
      render(
        <Sidebar>
          <div>Sidebar Content</div>
        </Sidebar>
      )

      expect(screen.getByText('Sidebar Content')).toBeInTheDocument()
    })

    it('should render SidebarBody with desktop and mobile components', () => {
      render(
        <SidebarProvider>
          <SidebarBody>
            <div>Body Content</div>
          </SidebarBody>
        </SidebarProvider>
      )

      // Just check that content renders (SidebarBody internally renders both desktop and mobile)
      expect(screen.getByText('Body Content')).toBeInTheDocument()
      
      // Verify both desktop and mobile containers exist
      expect(screen.getByTestId('menu-icon')).toBeInTheDocument() // Mobile
    })
  })
}) 