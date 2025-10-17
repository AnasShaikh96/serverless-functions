'use client';
import React, { useEffect, useState } from 'react'
import { ThemeProvider } from '../ui/theme-provider'
import { SidebarProvider } from '../ui/sidebar-context'
import { Navbar01 } from '../ui/navbar'
import { DashboardLayout } from '../ui/dashboard-layout'
import { usePathname } from 'next/navigation'
import { authPath } from '@/lib/constants';

const BodyLayout = ({ children }: { children: React.ReactNode }) => {

    const [isAuthenticatedPath, setIsAuthenticatedPath] = useState<boolean | null>(null);
    const pathname = usePathname();
    const splitPath = pathname.split('/')[1]

    useEffect(() => {
        setIsAuthenticatedPath(authPath.includes(splitPath))
    }, [pathname])

    if (isAuthenticatedPath) {
        return <>{children}</>
    } else {
        return (
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <SidebarProvider>
                    <Navbar01 />
                    <DashboardLayout>
                        {children}
                    </DashboardLayout>
                </SidebarProvider>
            </ThemeProvider>
        )
    }
}

export default BodyLayout