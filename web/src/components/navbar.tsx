'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Sun, Moon, User } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useMobile } from '@/hooks/use-mobile';
import { useSidebar } from '@/components/ui/sidebar-context';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Simple logo component for the navbar
const Logo = (props: React.SVGAttributes<SVGElement>) => {
    return (
        <svg width='1em' height='1em' viewBox='0 0 324 323' fill='currentColor' xmlns='http://www.w3.org/2000/svg' {...props}>
            <rect
                x='88.1023'
                y='144.792'
                width='151.802'
                height='36.5788'
                rx='18.2894'
                transform='rotate(-38.5799 88.1023 144.792)'
                fill='currentColor'
            />
            <rect
                x='85.3459'
                y='244.537'
                width='151.802'
                height='36.5788'
                rx='18.2894'
                transform='rotate(-38.5799 85.3459 244.537)'
                fill='currentColor'
            />
        </svg>
    );
};

// Hamburger icon component
const HamburgerIcon = ({ className, ...props }: React.SVGAttributes<SVGElement>) => (
    <svg
        className={cn('pointer-events-none', className)}
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M4 12L20 12"
            className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
        />
        <path
            d="M4 12H20"
            className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
        />
        <path
            d="M4 12H20"
            className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
        />
    </svg>
);

export interface Navbar01Props extends React.HTMLAttributes<HTMLElement> {
    logo?: React.ReactNode;
    logoHref?: string;
}

export const Navbar01 = React.forwardRef<HTMLElement, Navbar01Props>(
    (
        {
            className,
            logo = <Logo />,
            logoHref = '#',
            ...props
        },
        ref
    ) => {
        const { setTheme, theme } = useTheme();
        const isMobile = useMobile();
        const { isOpen: sidebarOpen, toggle: toggleSidebar } = useSidebar();

        return (
            <header
                ref={ref as React.RefObject<HTMLElement>}
                className={cn(
                    'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 [&_*]:no-underline',
                    className
                )}
                {...props}
            >
                <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
                    {/* Left side */}
                    <div className="flex items-center gap-2">
                        {/* Mobile hamburger left of logo */}
                        {isMobile && (
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-expanded={sidebarOpen}
                                aria-label="Toggle menu"
                                onClick={toggleSidebar}
                                className={cn(
                                    'group mr-1 transition-opacity duration-200',
                                    sidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
                                )}
                            >
                                <HamburgerIcon className="h-5 w-5" />
                            </Button>
                        )}

                        {/* Logo */}
                        <div className="flex items-center gap-6">
                            <button
                                onClick={(e) => e.preventDefault()}
                                className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer"
                            >
                                <div className="text-2xl">
                                    {logo}
                                </div>
                                <span className="hidden font-bold text-xl sm:inline-block">yapper</span>
                            </button>
                        </div>
                    </div>
                    {/* Right side */}
                    <div className="flex items-center space-x-2">
                        {/* Theme toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                        >
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>

                        {/* User dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="/diverse-user-avatars.png" alt="User" />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">John Doe</p>
                                        <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                {/* <DropdownMenuItem>
                                    <span>Settings</span>
                                </DropdownMenuItem> */}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>
        );
    }
);

Navbar01.displayName = 'Navbar01';

export { Logo, HamburgerIcon };