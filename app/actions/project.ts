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

export async function createProject(prevState: ActionResult | null, formData: FormData): Promise<ActionResult> {
    const authError = await checkAuth()
    if (authError) return authError

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const link = formData.get("link") as string
    const githubLink = formData.get("githubLink") as string
    const relatedPostId = formData.get("relatedPostId") as string
    const imageUrl = formData.get("imageUrl") as string
    const tagsString = formData.get("tags") as string

    // Links are now optional as per user request
    if (!title || !description || !imageUrl || !tagsString) {
        return { success: false, error: "Please fill in all required fields: Title, Description, Image URL, and Tags." }
    }

    const tags = tagsString.split(",").map(t => t.trim())
    const published = formData.get("published") === "on"

    try {
        await prisma.project.create({
            data: {
                title,
                description,
                link: link || null,
                githubLink: githubLink || null,
                relatedPostId: relatedPostId || null,
                imageUrl,
                tags,
                published
            }
        })
    } catch (error: any) {
        return { success: false, error: "Failed to create project. Please try again." }
    }

    revalidatePath("/")
    revalidatePath("/projects")
    revalidatePath("/admin")
    redirect("/admin/projects")
}

export async function updateProject(id: string, prevState: ActionResult | null, formData: FormData): Promise<ActionResult> {
    const authError = await checkAuth()
    if (authError) return authError

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const link = formData.get("link") as string
    const githubLink = formData.get("githubLink") as string
    const relatedPostId = formData.get("relatedPostId") as string
    const imageUrl = formData.get("imageUrl") as string
    const tagsString = formData.get("tags") as string

    if (!title || !description || !imageUrl || !tagsString) {
        return { success: false, error: "Please fill in all required fields: Title, Description, Image URL, and Tags." }
    }

    const tags = tagsString.split(",").map(t => t.trim())
    const published = formData.get("published") === "on"

    try {
        await prisma.project.update({
            where: { id },
            data: {
                title,
                description,
                link: link || null,
                githubLink: githubLink || null,
                relatedPostId: relatedPostId || null,
                imageUrl,
                tags,
                published
            }
        })
    } catch (error: any) {
        return { success: false, error: "Failed to update project. Please try again." }
    }

    revalidatePath("/")
    revalidatePath("/projects")
    revalidatePath("/admin")
    redirect("/admin/projects")
}

export async function deleteProject(id: string): Promise<ActionResult> {
    const authError = await checkAuth()
    if (authError) return authError

    try {
        await prisma.project.delete({
            where: { id }
        })
    } catch (error) {
        return { success: false, error: "Failed to delete project. Please try again." }
    }

    revalidatePath("/")
    revalidatePath("/projects")
    revalidatePath("/admin")
    return { success: true }
}

export async function getProjectById(id: string) {
    if (!id) return null
    const authError = await checkAuth()
    if (authError) return null
    return prisma.project.findUnique({
        where: { id }
    })
}
