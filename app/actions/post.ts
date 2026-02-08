'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export type ActionResult = {
    success: boolean;
    error?: string;
}

async function checkAuth(): Promise<ActionResult | null> {
    const session = await getServerSession(authOptions)
    if (!session) {
        return { success: false, error: "Unauthorized" }
    }
    return null
}

function validateSlug(slug: string): ActionResult | null {
    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(slug)) {
        return { success: false, error: "Invalid slug: Only lowercase letters, numbers, and dashes are allowed." };
    }
    return null;
}

export async function createPost(prevState: ActionResult | null, formData: FormData): Promise<ActionResult> {
    const authError = await checkAuth()
    if (authError) return authError

    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const excerpt = formData.get("excerpt") as string
    const content = formData.get("content") as string
    const published = formData.get("published") === "on"

    const slugError = validateSlug(slug);
    if (slugError) return slugError;

    try {
        await prisma.post.create({
            data: {
                title,
                slug,
                excerpt,
                content,
                published
            }
        })
    } catch (error: any) {
        if (error.code === 'P2002') {
            return { success: false, error: "A post with this slug already exists." }
        }
        return { success: false, error: "Failed to create post. Please try again." }
    }

    revalidatePath("/journal")
    revalidatePath("/admin")
    redirect("/admin/journal")
}

export async function updatePost(id: string, prevState: ActionResult | null, formData: FormData): Promise<ActionResult> {
    const authError = await checkAuth()
    if (authError) return authError

    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const excerpt = formData.get("excerpt") as string
    const content = formData.get("content") as string
    const published = formData.get("published") === "on"

    const slugError = validateSlug(slug);
    if (slugError) return slugError;

    // Check if trying to unpublish a post that's connected to a project
    if (!published) {
        const existingPost = await prisma.post.findUnique({
            where: { id },
            include: { relatedProjects: true }
        });

        if (existingPost?.published && existingPost.relatedProjects.length > 0) {
            const projectNames = existingPost.relatedProjects.map(p => p.title).join(", ");
            return {
                success: false,
                error: `Cannot unpublish this article because it is connected to: ${projectNames}. Remove the connection first.`
            };
        }
    }

    try {
        await prisma.post.update({
            where: { id },
            data: {
                title,
                slug,
                excerpt,
                content,
                published
            }
        })
    } catch (error: any) {
        if (error.code === 'P2002') {
            return { success: false, error: "A post with this slug already exists." }
        }
        return { success: false, error: "Failed to update post. Please try again." }
    }

    revalidatePath("/journal")
    revalidatePath("/admin")
    redirect("/admin/journal")
}

export async function deletePost(id: string): Promise<ActionResult> {
    const authError = await checkAuth()
    if (authError) return authError

    try {
        // Check if post is connected to any projects
        const post = await prisma.post.findUnique({
            where: { id },
            include: { relatedProjects: true }
        });

        if (post?.relatedProjects.length && post.relatedProjects.length > 0) {
            const projectNames = post.relatedProjects.map(p => p.title).join(", ");
            return {
                success: false,
                error: `Cannot delete this article because it is connected to: ${projectNames}. Remove the connection first.`
            };
        }

        await prisma.post.delete({
            where: { id }
        })
    } catch (error) {
        return { success: false, error: "Failed to delete post. Please try again." }
    }

    revalidatePath("/journal")
    revalidatePath("/admin")
    return { success: true }
}

export async function getPostById(id: string) {
    if (!id) return null
    const authError = await checkAuth()
    if (authError) return null
    return prisma.post.findUnique({
        where: { id }
    })
}

export async function getAllPostsForSelect() {
    const authError = await checkAuth()
    if (authError) return []
    return prisma.post.findMany({
        where: { published: true },
        select: {
            id: true,
            title: true,
            slug: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}
