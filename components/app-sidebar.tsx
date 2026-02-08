"use client"

import { Home, FolderOpen, PenTool, User, ShieldCheck, Mail } from "lucide-react"
import Link from "next/link"

import { usePathname, useRouter } from 'next/navigation';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"

// Menu items - same order as navbar: Projects, Journal, About, Contact, Admin
const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
        isHash: false,
    },
    {
        title: "Projects",
        url: "/#projects",
        icon: FolderOpen,
        isHash: true,
    },
    {
        title: "Journal",
        url: "/journal",
        icon: PenTool,
        isHash: false,
    },
    {
        title: "About",
        url: "/#about",
        icon: User,
        isHash: true,
    },
    {
        title: "Contact",
        url: "/#contact",
        icon: Mail,
        isHash: true,
    },
    {
        title: "Admin",
        url: "/admin",
        icon: ShieldCheck,
        isHash: false,
    },
]

export function AppSidebar() {
    const { setOpenMobile } = useSidebar()
    const pathname = usePathname()
    const router = useRouter()

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string, isHash: boolean) => {
        setOpenMobile(false)

        if (url === '/' && pathname === '/') {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
            return
        }

        if (isHash) {
            e.preventDefault()
            const hash = url.replace('/', '')
            if (pathname !== '/') {
                router.push('/' + hash)
            } else {
                const element = document.querySelector(hash)
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                }
            }
        }
    }

    return (
        <Sidebar
            side="left"
            collapsible="offcanvas"
            variant="sidebar"
            className="md:hidden border-r border-border bg-background"
        >
            <SidebarHeader className="!h-16 !min-h-16 !flex !flex-row !items-center !gap-0 !p-0 !px-4 border-b border-border">
                <Link
                    href="/"
                    onClick={(e) => handleLinkClick(e, '/', false)}
                    className="text-xl font-serif font-bold tracking-tight hover:opacity-80 transition-opacity"
                >
                    Mohamed <span className="text-primary">Elsayed.</span>
                </Link>
            </SidebarHeader>
            <SidebarContent className="p-2">
                <SidebarGroup className="p-1">
                    <SidebarGroupLabel className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-2 px-2">
                        Navigation
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        size="default"
                                        className="rounded-lg py-2 px-3 hover:bg-primary/10 hover:text-primary transition-colors font-sans"
                                    >
                                        <Link
                                            href={item.url}
                                            className="flex items-center gap-3"
                                            onClick={(e) => handleLinkClick(e, item.url, item.isHash)}
                                        >
                                            <item.icon className="w-5 h-5" />
                                            <span className="text-base font-medium">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
