"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FolderKanban,
    PenTool,
    LogOut,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
    {
        name: "Overview",
        href: "/admin",
        icon: LayoutDashboard
    },
    {
        name: "Projects",
        href: "/admin/projects",
        icon: FolderKanban
    },
    {
        name: "Journal",
        href: "/admin/journal",
        icon: PenTool
    },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-72 bg-background border-r flex flex-col h-screen fixed left-0 top-0 overflow-y-auto z-40 transition-all duration-300">
            <div className="pt-24"></div>

            <nav className="flex-1 px-4 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className={cn("w-5 h-5", isActive ? "text-primary-foreground" : "text-primary/60 group-hover:text-primary")} />
                                <span>{item.name}</span>
                            </div>
                            {isActive && <ChevronRight className="w-4 h-4 text-primary-foreground/50" />}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 border-t bg-muted/20">
                <Link
                    href="/api/auth/signout"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                </Link>
            </div>
        </aside>
    );
}
