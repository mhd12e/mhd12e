import { prisma } from "@/lib/prisma";
import { EmptyState } from "@/components/EmptyState";
import { ProjectCard } from "@/components/ProjectCard";
import type { Metadata } from 'next';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Projects",
    description: "A comprehensive collection of professional projects and technical experiments by Mohamed Elsayed.",
};

export default async function ProjectsPage() {
    const projects = await prisma.project.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        include: { relatedPost: true }
    });

    return (
        <div className="container mx-auto px-4 py-24">
            <div className="space-y-4 mb-16 max-w-3xl">
                <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight">Archive</h1>
                <p className="text-muted-foreground text-xl italic font-serif">A comprehensive collection of my professional projects and technical experiments.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project: any) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
                {projects.length === 0 && (
                    <div className="col-span-full">
                        <EmptyState
                            title="No projects in the archive yet"
                            description="I'm currently working on some exciting new things. Check back soon!"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
