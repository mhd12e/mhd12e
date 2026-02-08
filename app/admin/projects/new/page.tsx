"use client";

import { useState, useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createProject } from "@/app/actions/project";
import type { ActionResult } from "@/app/actions/project";
import Link from "next/link";
import { ArrowLeft, PlusCircle, Globe, Image as ImageIcon, Tag, Link as LinkIcon, Save, Send, Github, FileText, AlertCircle, Loader2 } from "lucide-react";
import { ArticleSelect } from "@/components/admin/ArticleSelect";

export default function NewProjectPage() {
    const [isPublished, setIsPublished] = useState(false);
    const [state, formAction, isPending] = useActionState(createProject, null);

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <div className="flex items-center justify-between mb-12">
                <div className="space-y-2">
                    <Link href="/admin" className="text-primary hover:underline flex items-center gap-2 text-sm font-medium mb-4 group">
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-5xl font-serif font-bold tracking-tight flex items-center gap-4">
                        <PlusCircle className="w-10 h-10 text-primary/40" />
                        Add Project
                    </h1>
                </div>
            </div>

            <div className="bg-card border border-primary/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
                <form action={formAction} className="space-y-8">
                    {state?.error && (
                        <div className="bg-destructive/10 border border-destructive/30 text-destructive rounded-xl p-4 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                            <p className="text-sm font-medium">{state.error}</p>
                        </div>
                    )}

                    <div className="space-y-3">
                        <label className="text-sm font-bold uppercase tracking-widest text-primary/60 ml-1">Project Title</label>
                        <div className="relative group">
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                                name="title"
                                required
                                placeholder="E-commerce Plattform Revolution..."
                                className="h-14 pl-12 text-lg font-serif bg-background/50 border-primary/10 focus-visible:ring-primary focus-visible:border-primary"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold uppercase tracking-widest text-primary/60 ml-1">Detailed Description</label>
                        <Textarea
                            name="description"
                            required
                            placeholder="A brief but compelling description of what you built, why you built it, and the impact it had..."
                            className="min-h-[200px] text-lg leading-relaxed bg-background/50 border-primary/10 focus-visible:ring-primary focus-visible:border-primary p-6"
                        />
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        <div className="space-y-3">
                            <label className="text-sm font-bold uppercase tracking-widest text-primary/60 ml-1 leading-none flex items-center gap-2">
                                <ImageIcon className="w-4 h-4" /> Showcase Image URL
                            </label>
                            <Input
                                name="imageUrl"
                                required
                                placeholder="https://unsplash.com/photos/..."
                                className="h-14 font-mono bg-background/50 border-primary/10"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-bold uppercase tracking-widest text-primary/60 ml-1 leading-none flex items-center gap-2">
                                <LinkIcon className="w-4 h-4" /> Live Project Link
                            </label>
                            <Input
                                name="link"
                                placeholder="https://my-awesome-project.com"
                                className="h-14 font-mono bg-background/50 border-primary/10"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-bold uppercase tracking-widest text-primary/60 ml-1 leading-none flex items-center gap-2">
                                <Github className="w-4 h-4" /> GitHub Repository
                            </label>
                            <Input
                                name="githubLink"
                                placeholder="https://github.com/username/repo"
                                className="h-14 font-mono bg-background/50 border-primary/10"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-bold uppercase tracking-widest text-primary/60 ml-1 leading-none flex items-center gap-2">
                                <FileText className="w-4 h-4" /> Related Article
                            </label>
                            <ArticleSelect
                                name="relatedPostId"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold uppercase tracking-widest text-primary/60 ml-1 flex items-center gap-2">
                            <Tag className="w-4 h-4" /> Tech Stack Tags (comma separated)
                        </label>
                        <Input
                            required
                            name="tags"
                            placeholder="Next.js, Prisma, PostgreSQL, Docker"
                            className="h-14 bg-background/50 border-primary/10"
                        />
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                        <input
                            type="checkbox"
                            name="published"
                            id="published"
                            checked={isPublished}
                            onChange={(e) => setIsPublished(e.target.checked)}
                            disabled={isPending}
                            className="w-5 h-5 rounded border-primary/20 bg-background text-primary focus:ring-primary disabled:opacity-50"
                        />
                        <label htmlFor="published" className="text-sm font-medium">Publish immediately (visible on portfolio)</label>
                    </div>

                    <div className="pt-6">
                        <Button
                            type="submit"
                            size="lg"
                            disabled={isPending}
                            className="w-full h-14 rounded-full text-lg gap-2 shadow-lg shadow-primary/20"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Saving...
                                </>
                            ) : isPublished ? (
                                <>
                                    <Send className="w-4 h-4" />
                                    Publish Project
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Save Draft
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
