import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/EmptyState";
import type { Metadata } from 'next';

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Journal",
    description: "Thoughts on development, design, and life. Technical articles, insights, and experiences from Mohamed Elsayed.",
    openGraph: {
        title: "Journal | Mohamed Elsayed",
        description: "Thoughts on development, design, and life. Technical articles, insights, and experiences.",
        url: "https://mhd12.dev/journal",
        images: [{
            url: "https://mhd12.dev/og-image.png",
            width: 1200,
            height: 630,
            alt: "Mohamed Elsayed - Journal",
        }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Journal | Mohamed Elsayed",
        description: "Thoughts on development, design, and life. Technical articles and insights.",
        images: ["https://mhd12.dev/og-image.png"],
    },
};

export default async function BlogPage() {
    const posts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="container mx-auto px-4 py-24 max-w-4xl">
            <div className="space-y-4 mb-16">
                <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight">Journal</h1>
                <p className="text-muted-foreground text-xl italic font-serif">Thoughts on development, design, and life.</p>
            </div>

            <div className="space-y-16">
                {posts.map((post: any) => (
                    <article key={post.id} className="group relative flex flex-col items-start gap-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-primary/60">
                            {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                        <Link href={`/journal/${post.slug}`} className="group">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold group-hover:text-primary transition-colors leading-tight mb-4">
                                {post.title}
                            </h2>
                            <p className="text-muted-foreground text-lg leading-relaxed line-clamp-3 max-w-2xl mb-6">
                                {post.excerpt}
                            </p>
                            <div className="flex items-center gap-2 group-hover:text-primary transition-colors font-medium">
                                Read Story <span className="transition-transform group-hover:translate-x-1">→</span>
                            </div>
                        </Link>
                    </article>
                ))}
                {posts.length === 0 && (
                    <EmptyState
                        title="The journal is currently empty"
                        description="Check back soon for fresh technical articles and design thoughts!"
                    />
                )}
            </div>
        </div>
    );
}
