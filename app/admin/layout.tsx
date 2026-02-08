import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AdminSidebar } from "@/components/AdminSidebar";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    return (
        <>
            {/* Mobile Warning Overlay */}
            <div className="md:hidden min-h-screen flex flex-col items-center justify-center p-6 text-center bg-background space-y-6">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                    <ShieldAlert className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl font-serif font-bold">Desktop Only</h1>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                        The admin dashboard is optimized for larger screens to ensure the best management experience.
                    </p>
                </div>
                <Button asChild className="rounded-full">
                    <Link href="/">Return to Portfolio</Link>
                </Button>
            </div>

            {/* Desktop Admin Layout */}
            <div className="hidden md:flex min-h-screen bg-background transition-colors duration-300">
                {session && <AdminSidebar />}
                <main className={session ? "flex-1 ml-72 p-8 md:p-12 overflow-auto" : "flex-1 flex items-center justify-center"}>
                    {children}
                </main>
            </div>
        </>
    );
}
