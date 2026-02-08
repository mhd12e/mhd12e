import { getProjectById, updateProject } from "@/app/actions/project";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, PlusCircle } from "lucide-react";
import EditProjectForm from "./EditProjectForm";
import type { ActionResult } from "@/app/actions/project";

interface EditProjectPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
    const { id } = await params;

    if (!id) {
        notFound();
    }

    const project = await getProjectById(id);

    if (!project) {
        notFound();
    }

    // Create a wrapper action that binds the id
    async function updateProjectAction(prevState: ActionResult | null, formData: FormData): Promise<ActionResult> {
        "use server";
        return updateProject(id, prevState, formData);
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <div className="flex items-center justify-between mb-12">
                <div className="space-y-2">
                    <Link href="/admin/projects" className="text-primary hover:underline flex items-center gap-2 text-sm font-medium mb-4 group">
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Archive
                    </Link>
                    <h1 className="text-5xl font-serif font-bold tracking-tight flex items-center gap-4">
                        <PlusCircle className="w-10 h-10 text-primary/40" />
                        Edit Project
                    </h1>
                </div>
            </div>

            <div className="bg-card border border-primary/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
                <EditProjectForm project={project} action={updateProjectAction} />
            </div>
        </div>
    );
}
