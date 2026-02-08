"use client"

import { Menu } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

export function MobileSidebarTrigger() {
    const { toggleSidebar, isMobile } = useSidebar()

    // Don't render on desktop
    if (!isMobile) {
        return null
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="size-9"
        >
            <Menu className="w-5 h-5" />
            <span className="sr-only">Toggle Menu</span>
        </Button>
    )
}
