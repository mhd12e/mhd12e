import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { PlusCircle, FileText, LayoutGrid } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Admin dashboard for managing portfolio content.",
};

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);

    console.log("[ADMIN] Session check:", session ? "FOUND" : "NOT FOUND");
    console.log("[ADMIN] Session data:", JSON.stringify(session, null, 2));

    if (!session) {
        console.log("[ADMIN] Redirecting to login...");
        redirect("/admin/login");
    }

    const projectCount = await prisma.project.count({ where: { published: true } });
    const postCount = await prisma.post.count({ where: { published: true } });

    return (
        <div className="space-y-12 max-w-6xl">
            <div className="space-y-4">
                <h1 className="text-5xl font-serif font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground text-xl italic font-serif opacity-80">Welcome back, admin. Here's what's happening today.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Card className="border-primary/10 bg-card backdrop-blur-sm overflow-hidden group hover:border-primary/30 transition-all">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-lg font-serif font-bold">Total Projects</CardTitle>
                        <LayoutGrid className="w-5 h-5 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold tracking-tight text-primary">{projectCount}</div>
                        <p className="text-xs text-muted-foreground mt-1 tracking-widest uppercase">Live Showcase</p>
                    </CardContent>
                </Card>

                <Card className="border-primary/10 bg-card backdrop-blur-sm overflow-hidden group hover:border-primary/30 transition-all">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-lg font-serif font-bold">Total Articles</CardTitle>
                        <FileText className="w-5 h-5 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold tracking-tight text-primary">{postCount}</div>
                        <p className="text-xs text-muted-foreground mt-1 tracking-widest uppercase">Journal Entries</p>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <h2 className="text-3xl font-serif font-bold border-l-4 border-primary pl-6">Quick Actions</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="border-dashed border-primary/20 bg-transparent hover:border-primary/50 transition-colors">
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center text-center gap-4">
                                <PlusCircle className="w-12 h-12 text-primary/40" />
                                <div className="space-y-2">
                                    <h3 className="font-serif font-bold text-xl">New Project</h3>
                                    <p className="text-sm text-muted-foreground">Showcase your latest work to the world.</p>
                                </div>
                                <Link href="/admin/projects/new" className="w-full">
                                    <Button className="w-full rounded-full">Add Project</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-dashed border-primary/20 bg-transparent hover:border-primary/50 transition-colors">
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center text-center gap-4">
                                <PenTool className="w-12 h-12 text-primary/40" />
                                <div className="space-y-2">
                                    <h3 className="font-serif font-bold text-xl">New Article</h3>
                                    <p className="text-sm text-muted-foreground">Share your thoughts and tutorials.</p>
                                </div>
                                <Link href="/admin/journal/new" className="w-full">
                                    <Button variant="outline" className="w-full rounded-full border-primary text-primary hover:bg-primary/5">Write Post</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

// Reuse PenTool for simplicity since I already imported it in Sidebar but not here? 
// No, Sidebar is a different file. I'll import it correctly.
import { PenTool } from "lucide-react";
