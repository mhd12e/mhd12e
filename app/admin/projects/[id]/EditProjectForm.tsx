"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Globe, Image as ImageIcon, Tag, Link as LinkIcon, Github, FileText, AlertCircle, Loader2, Send, Save } from "lucide-react";
import { ArticleSelect } from "@/components/admin/ArticleSelect";
import type { ActionResult } from "@/app/actions/project";
import { useState } from "react";

interface EditProjectFormProps {
    project: {
        id: string;
        title: string;
        description: string;
        link: string | null;
        githubLink: string | null;
        relatedPostId: string | null;
        imageUrl: string | null;
        tags: string[];
        published: boolean;
    };
    action: (prevState: ActionResult | null, formData: FormData) => Promise<ActionResult>;
}

export default function EditProjectForm({ project, action }: EditProjectFormProps) {
    const [state, formAction, isPending] = useActionState(action, null);
    const [isPublished, setIsPublished] = useState(project.published);

    return (
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
                        defaultValue={project.title}
                        className="h-14 pl-12 text-lg font-serif bg-background/50 border-primary/10 focus-visible:ring-primary focus-visible:border-primary"
                    />
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-sm font-bold uppercase tracking-widest text-primary/60 ml-1">Detailed Description</label>
                <Textarea
                    name="description"
                    required
                    defaultValue={project.description}
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
                        defaultValue={project.imageUrl || ""}
                        className="h-14 font-mono bg-background/50 border-primary/10"
                    />
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-bold uppercase tracking-widest text-primary/60 ml-1 leading-none flex items-center gap-2">
                        <LinkIcon className="w-4 h-4" /> Live Project Link
                    </label>
                    <Input
                        name="link"
                        defaultValue={project.link || ""}
                        className="h-14 font-mono bg-background/50 border-primary/10"
                    />
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-bold uppercase tracking-widest text-primary/60 ml-1 leading-none flex items-center gap-2">
                        <Github className="w-4 h-4" /> GitHub Repository
                    </label>
                    <Input
                        name="githubLink"
                        defaultValue={project.githubLink || ""}
                        className="h-14 font-mono bg-background/50 border-primary/10"
                    />
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-bold uppercase tracking-widest text-primary/60 ml-1 leading-none flex items-center gap-2">
                        <FileText className="w-4 h-4" /> Related Article
                    </label>
                    <ArticleSelect
                        defaultValue={project.relatedPostId || ""}
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
                    defaultValue={project.tags.join(", ")}
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
                <label htmlFor="published" className="text-sm font-medium">Published (visible on portfolio)</label>
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
                            Update & Publish
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4" />
                            Update Draft
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
}
