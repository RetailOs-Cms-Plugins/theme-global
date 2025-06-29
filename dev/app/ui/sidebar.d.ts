import { motion } from 'framer-motion';
import React from 'react';
interface Links {
    href: string;
    icon: React.JSX.Element | React.ReactNode;
    label: string;
}
interface SidebarContextProps {
    animate: boolean;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export declare const useSidebar: () => SidebarContextProps;
export declare const SidebarProvider: ({ animate, children, open: openProp, setOpen: setOpenProp, }: {
    animate?: boolean;
    children: React.ReactNode;
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => React.JSX.Element;
export declare const Sidebar: ({ animate, children, open, setOpen, }: {
    animate?: boolean;
    children: React.ReactNode;
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => React.JSX.Element;
export declare const SidebarBody: (props: React.ComponentProps<typeof motion.div>) => React.JSX.Element;
export declare const DesktopSidebar: ({ children, className, ...props }: React.ComponentProps<typeof motion.div>) => React.JSX.Element;
export declare const MobileSidebar: ({ children, className, ...props }: React.ComponentProps<"div">) => React.JSX.Element;
export declare const SidebarLink: ({ className, link, onClick, ...props }: {
    className?: string;
    link: Links;
    onClick?: () => void;
}) => React.JSX.Element;
export {};
