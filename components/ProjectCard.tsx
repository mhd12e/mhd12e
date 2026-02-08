"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { SpotlightCard } from "@/components/SpotlightCard";
import { Globe, Github, FileText } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
    project: {
        id: string;
        title: string;
        description: string;
        imageUrl?: string | null;
        link?: string | null;
        githubLink?: string | null;
        tags: string[];
        relatedPost?: {
            slug: string;
        } | null;
    };
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="block group h-full">
            <SpotlightCard mode="auto" className="border-primary/10 bg-card hover:border-primary/30 transition-colors duration-300 flex flex-col h-full">
                <div className="aspect-video relative bg-muted/50 overflow-hidden shrink-0">
                    {project.imageUrl ? (
                        <div className="w-full h-full bg-primary/5 flex items-center justify-center text-muted-foreground group-hover:scale-105 transition-transform duration-500">
                            <img src={project.imageUrl} alt={project.title} className="object-cover w-full h-full" />
                        </div>
                    ) : (
                        <div className="w-full h-full bg-primary/5 flex flex-col items-center justify-center text-muted-foreground">
                            <div className="w-16 h-16 border-2 border-primary/20 rounded-full flex items-center justify-center mb-2">
                                <svg className="w-8 h-8 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <span className="text-xs uppercase tracking-widest font-medium opacity-40">Preview</span>
                        </div>
                    )}
                </div>
                <CardHeader className="space-y-4 p-6 flex flex-col flex-grow">
                    <CardTitle className="text-2xl font-serif">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-2 text-base leading-relaxed">{project.description}</CardDescription>
                    <div className="flex flex-wrap gap-2 mt-auto pt-2">
                        {project.tags.map((tag: string) => (
                            <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-none rounded-sm px-2 py-0">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </CardHeader>
                <CardFooter className="pt-0 px-6 pb-6 shrink-0">
                    <div className="flex flex-wrap gap-3 w-full">
                        {project.link && (
                            <Button asChild variant="outline" size="sm" className="gap-2 border-primary/20 hover:bg-primary/5">
                                <a href={project.link} target="_blank" rel="noopener noreferrer">
                                    <Globe className="w-4 h-4" />
                                    Live Demo
                                </a>
                            </Button>
                        )}
                        {project.githubLink && (
                            <Button asChild variant="outline" size="sm" className="gap-2 border-primary/20 hover:bg-primary/5">
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                    <Github className="w-4 h-4" />
                                    Code
                                </a>
                            </Button>
                        )}
                        {project.relatedPost && (
                            <Button asChild variant="outline" size="sm" className="gap-2 border-primary/20 hover:bg-primary/5">
                                <Link href={`/journal/${project.relatedPost.slug}`}>
                                    <FileText className="w-4 h-4" />
                                    Read Article
                                </Link>
                            </Button>
                        )}
                    </div>
                </CardFooter>
            </SpotlightCard>
        </div>
    );
}
