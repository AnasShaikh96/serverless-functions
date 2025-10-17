"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from 'next/navigation'
import { getAccessToken } from '@/lib/api'
import { Sidebar } from "./sidebar"
import { useMobile } from "@/hooks/use-mobile"
// Removed mobile toggle row; keeping imports clean
import { useSidebar } from "@/components/ui/sidebar-context"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isOpen: sidebarOpen, close: closeSidebar, setOpen } = useSidebar()
  const isMobile = useMobile()
  const router = useRouter()

  // Ensure sidebar default states per device
  useEffect(() => {
    // Mobile default closed, Desktop default open
    setOpen(!isMobile)
  }, [isMobile, setOpen])

  useEffect(() => {
    const token = getAccessToken()
    if (!token) {
      router.replace('/login')
    }
  }, [router])

  return (
    <div className="flex  bg-background">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} isMobile={isMobile} />

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile toggle row removed; handled in Navbar */}

        {/* Page content */}
        <main className="flex-1">
          <div >{children}</div>
        </main>
      </div>
    </div>
  )
}
