"use client";

import { useState, useEffect, useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlignLeft, AlertCircle, Loader2 } from "lucide-react";
import PublishToggle from "./PublishToggle";
import type { ActionResult } from "@/app/actions/post";

interface EditPostFormProps {
    post: {
        id: string;
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        published: boolean;
    };
    action: (prevState: ActionResult | null, formData: FormData) => Promise<ActionResult>;
}

export default function EditPostForm({ post, action }: EditPostFormProps) {
    const [title, setTitle] = useState(post.title);
    const [slug, setSlug] = useState(post.slug);
    const [state, formAction, isPending] = useActionState(action, null);

    // Auto-generate slug from title
    useEffect(() => {
        const generatedSlug = title
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');

        setSlug(generatedSlug);
    }, [title]);

    return (
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
                    defaultValue={post.excerpt}
                    placeholder="A short summary that appears in the blog list..."
                    className="min-h-[100px] text-lg bg-background/50 border-primary/10 focus-visible:ring-primary focus-visible:border-primary p-4"
                />
            </div>

            <div className="space-y-3">
                <label className="text-sm font-bold uppercase tracking-widest text-primary/60 ml-1">Content (Markdown)</label>
                <Textarea
                    name="content"
                    required
                    defaultValue={post.content}
                    className="min-h-[500px] text-lg font-mono bg-background/50 border-primary/10 focus-visible:ring-primary focus-visible:border-primary p-6"
                />
            </div>

            <PublishToggle initialPublished={post.published} isPending={isPending} />
        </form>
    );
}
