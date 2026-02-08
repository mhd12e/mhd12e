import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteProject } from "@/app/actions/project";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, FolderKanban, Eye, Trash2, Tag, ExternalLink, PenTool } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from 'next';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Manage Projects",
    description: "Admin panel for managing portfolio projects.",
};

export default async function AdminProjectsPage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/admin/login");

    const projects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-12 max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                <div className="space-y-2">
                    <h1 className="text-5xl font-serif font-bold tracking-tight">Project Archive</h1>
                    <p className="text-muted-foreground text-xl italic font-serif opacity-80">Manage your showcase of technical expertise.</p>
                </div>
                <Link href="/admin/projects/new">
                    <Button size="lg" className="rounded-full px-8 gap-2 shadow-lg shadow-primary/20">
                        <PlusCircle className="w-5 h-5" />
                        Add New Project
                    </Button>
                </Link>
            </div>

            <div className="bg-card border border-primary/10 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-primary/10 bg-primary/5">
                                <th className="px-8 py-5 text-sm font-bold uppercase tracking-widest text-primary/60">Project</th>
                                <th className="px-8 py-5 text-sm font-bold uppercase tracking-widest text-primary/60">Status</th>
                                <th className="px-8 py-5 text-sm font-bold uppercase tracking-widest text-primary/60">Tags</th>
                                <th className="px-8 py-5 text-right text-sm font-bold uppercase tracking-widest text-primary/60">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-primary/5">
                            {projects.map((project: any) => (
                                <tr key={project.id} className="group hover:bg-primary/[0.02] transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-serif font-bold text-xl group-hover:text-primary transition-colors">{project.title}</span>
                                            <span className="text-xs text-muted-foreground opacity-70 line-clamp-1 max-w-xs">{project.description}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        {project.published ? (
                                            <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-none rounded-sm px-2 py-0">Published</Badge>
                                        ) : (
                                            <Badge variant="secondary" className="bg-primary/10 text-primary rounded-sm px-2 py-0 border-none">Draft</Badge>
                                        )}
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-wrap gap-1">
                                            {project.tags.map((tag: string) => (
                                                <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-none rounded-sm px-2 py-0 text-[10px] uppercase tracking-tighter">
                                                    {tag}
                                                </Badge>
                                            ))}
                                            {project.tags.length === 0 && <span className="text-muted-foreground italic text-xs">No tags</span>}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            {project.link && (
                                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary" asChild title="Visit Project">
                                                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                </Button>
                                            )}
                                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary" asChild title="Edit Project">
                                                <Link href={`/admin/projects/${project.id}`}>
                                                    <PenTool className="w-4 h-4" />
                                                </Link>
                                            </Button>
                                            <DeleteButton id={project.id} deleteAction={deleteProject} itemName="Project" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {projects.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <FolderKanban className="w-12 h-12 text-primary/20" />
                                            <p className="text-muted-foreground italic text-lg">No projects found in the archive.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
