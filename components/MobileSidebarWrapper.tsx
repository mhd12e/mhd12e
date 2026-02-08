"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { useIsMobile } from "@/hooks/use-mobile"

export function MobileSidebarWrapper({ children }: { children: React.ReactNode }) {
    const isMobile = useIsMobile()

    // Always wrap with SidebarProvider to ensure context is available
    // But only render AppSidebar on mobile
    return (
        <SidebarProvider
            defaultOpen={false}
            style={{
                "--sidebar-width": "0rem",
                "--sidebar-width-mobile": "18rem",
            } as React.CSSProperties}
        >
            {isMobile && <AppSidebar />}
            {children}
        </SidebarProvider>
    )
}
