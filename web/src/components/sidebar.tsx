"use client"

import { useState } from "react"
import { FileText, ChevronLeft, ChevronRight, X, PenBoxIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
    isMobile: boolean
}

const sidebarItems = [
    // {
    //     title: "Home",
    //     icon: Home,
    //     href: "/",
    // },
    // {
    //     title: "Dashboard",
    //     icon: BarChart3,
    //     href: "/dashboard",
    // },
    {
        title: "Notes",
        icon: FileText,
        href: "/notes",
    },
    {
        title: "Editor",
        icon: PenBoxIcon,
        href: "/editor",
    },
]

export function Sidebar({ isOpen, onClose, isMobile }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false)

    const toggleCollapsed = () => {
        setIsCollapsed(!isCollapsed)
    }

    if (isMobile) {
        return (
            <>
                {/* Mobile overlay (starts below navbar) */}
                {isOpen && (
                    <div
                        className="fixed inset-x-0 top-16 bottom-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
                        onClick={onClose}
                    />
                )}

                {/* Mobile sidebar (starts below navbar) */}
                <aside
                    className={cn(
                        "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 transform bg-sidebar border-r transition-transform duration-300 ease-in-out md:hidden",
                        isOpen ? "translate-x-0" : "-translate-x-full",
                    )}
                >
                    <div className="flex h-16 items-center justify-between px-4 border-b">
                        <span className="text-lg font-semibold text-sidebar-foreground">Menu</span>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                    <ScrollArea className="flex-1 px-3 py-4">
                        <nav className="space-y-2">
                            {sidebarItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                    onClick={onClose}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.title}</span>
                                </a>
                            ))}
                        </nav>
                    </ScrollArea>
                </aside>
            </>
        )
    }

    // Desktop sidebar (sticky below navbar, independent from page scroll)
    return (
        <aside
            className={cn(
                "hidden md:flex md:sticky md:top-16 md:h-[calc(100vh-65px)] bg-sidebar border-r transition-all duration-300 ease-in-out",
                isCollapsed ? "w-16" : "w-64",
            )}
        >
            <div className="flex flex-col w-full">
                {/* Navigation */}
                <ScrollArea className="flex-1 px-3 py-4">
                    {/* Small inline collapse toggle placed above the first cell */}
                    <div className="mb-2 flex items-center justify-end">
                        <Button variant="ghost" size="icon" onClick={toggleCollapsed} className="h-8 w-8">
                            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                        </Button>
                    </div>
                    <nav className="space-y-2">
                        {sidebarItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center rounded-lg px-3 py-2 text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                                    isCollapsed ? "justify-center" : "space-x-3",
                                )}
                                title={isCollapsed ? item.title : undefined}
                            >
                                <item.icon className="h-5 w-5 flex-shrink-0" />
                                {!isCollapsed && <span>{item.title}</span>}
                            </a>
                        ))}
                    </nav>
                </ScrollArea>
            </div>
        </aside>
    )
}
