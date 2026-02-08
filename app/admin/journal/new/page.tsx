"use client";

import { useState, useEffect, useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/app/actions/post";
import type { ActionResult } from "@/app/actions/post";
import Link from "next/link";
import { ArrowLeft, Send, PenTool, FileText, AlignLeft, AlertCircle, Loader2 } from "lucide-react";

export default function NewPostPage() {
    const [isPublished, setIsPublished] = useState(false);
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [state, formAction, isPending] = useActionState(createPost, null);

    // Auto-generate slug from title
    useEffect(() => {
        const generatedSlug = title
            .toLowerCase()
            .replace(/\s+/g, '-')      // Replace spaces with -
            .replace(/[^a-z0-9-]/g, '') // Remove non-alphanumeric except -
            .replace(/-+/g, '-')       // Replace multiple - with single -
            .replace(/^-+|-+$/g, '');   // Trim - from start and end

        setSlug(generatedSlug);
    }, [title]);

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <div className="flex items-center justify-between mb-12">
                <div className="space-y-2">
                    <Link href="/admin" className="text-primary hover:underline flex items-center gap-2 text-sm font-medium mb-4 group">
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-5xl font-serif font-bold tracking-tight flex items-center gap-4">
                        <PenTool className="w-10 h-10 text-primary/40" />
                        Write Story
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

                    <div className="grid gap-8 md:grid-cols-2">
                        <div className="space-y-3">
                            <label className="text-sm font-bold uppercase tracking-widest text-primary/60 ml-1">Article Title</label>
                            <Input
                                name="title"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="The Future of Web Development..."
                                className="h-14 text-lg font-serif bg-background/50 border-primary/10 focus-visible:ring-primary focus-visible:border-primary"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-bold uppercase tracking-widest text-primary/60 ml-1">URL Slug</label>
                            <Input
                                name="slug"
                                required
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                placeholder="future-of-web-development"
                                className="h-14 font-mono bg-background/50 border-primary/10 focus-visible:ring-primary focus-visible:border-primary"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold uppercase tracking-widest text-primary/60 ml-1 flex items-center gap-2">
                            <AlignLeft className="w-4 h-4" /> Brief Excerpt
                        </label>
                        <Textarea
                            name="excerpt"
                            required
                            placeholder="A short summary that appears in the blog list..."
                            className="min-h-[100px] text-lg bg-background/50 border-primary/10 focus-visible:ring-primary focus-visible:border-primary p-4"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold uppercase tracking-widest text-primary/60 ml-1">Content (Markdown)</label>
                        <Textarea
                            name="content"
                            required
                            className="min-h-[500px] text-lg font-mono bg-background/50 border-primary/10 focus-visible:ring-primary focus-visible:border-primary p-6"
                            placeholder="# Introduction..."
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
                        <label htmlFor="published" className="text-sm font-medium">Publish immediately (will be visible to everyone)</label>
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
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Saving...
                                </>
                            ) : isPublished ? (
                                <>
                                    <Send className="w-5 h-5" />
                                    Publish Article
                                </>
                            ) : (
                                <>
                                    <FileText className="w-5 h-5" />
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
