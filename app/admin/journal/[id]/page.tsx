import { getPostById, updatePost } from "@/app/actions/post";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, PenTool } from "lucide-react";
import EditPostForm from "./EditPostForm";
import type { ActionResult } from "@/app/actions/post";

interface EditPostPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
    const { id } = await params;

    if (!id) {
        notFound();
    }

    const post = await getPostById(id);

    if (!post) {
        notFound();
    }

    // Cast post to include excerpt since Prisma schema has been updated but types might lag
    const typedPost = post as any;

    // Create a wrapper action that binds the id
    async function updatePostAction(prevState: ActionResult | null, formData: FormData): Promise<ActionResult> {
        "use server";
        return updatePost(id, prevState, formData);
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <div className="flex items-center justify-between mb-12">
                <div className="space-y-2">
                    <Link href="/admin/journal" className="text-primary hover:underline flex items-center gap-2 text-sm font-medium mb-4 group">
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Archive
                    </Link>
                    <h1 className="text-5xl font-serif font-bold tracking-tight flex items-center gap-4">
                        <PenTool className="w-10 h-10 text-primary/40" />
                        Edit Story
                    </h1>
                </div>
            </div>

            <div className="bg-card border border-primary/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
                <EditPostForm post={typedPost} action={updatePostAction} />
            </div>
        </div>
    );
}
