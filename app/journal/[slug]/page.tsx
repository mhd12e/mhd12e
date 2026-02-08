import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { ContactButton } from '@/components/ContactButton';
import type { Metadata } from 'next';

export const dynamic = "force-dynamic";

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;

    const post = await prisma.post.findUnique({
        where: { slug },
    });

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: post.title,
        description: post.excerpt || post.content.substring(0, 160),
        openGraph: {
            title: post.title,
            description: post.excerpt || post.content.substring(0, 160),
            type: 'article',
            url: `https://mhd12.dev/journal/${post.slug}`,
            images: [{
                url: 'https://mhd12.dev/og-image.png',
                width: 1200,
                height: 630,
                alt: post.title,
            }],
            publishedTime: post.createdAt.toISOString(),
            authors: ['Mohamed Elsayed'],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt || post.content.substring(0, 160),
            images: ['https://mhd12.dev/og-image.png'],
        },
    };
}



export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;

    if (!slug) {
        notFound();
    }

    const post = await prisma.post.findUnique({
        where: { slug },
    });

    if (!post || !post.published) {
        notFound();
    }

    // Estimate read time
    const wordsPerMinute = 200;
    const wordCount = post.content.split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

    return (
        <div className="relative">
            {/* Background Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[50vh] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            <article className="container mx-auto px-4 py-20 max-w-3xl">
                <div className="mb-16 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <Link href="/journal" className="text-primary hover:underline flex items-center gap-2 text-sm font-bold uppercase tracking-widest group">
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Journal
                    </Link>

                    <div className="space-y-6 border-l-4 border-primary pl-8 py-4">
                        <div className="flex flex-wrap items-center gap-6 text-sm font-mono text-muted-foreground opacity-70">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {readTime} min read
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-tight">
                            {post.title}
                        </h1>
                    </div>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-strong:text-foreground prose-img:rounded-3xl prose-img:shadow-2xl prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-primary/10 prose-code:before:content-none prose-code:after:content-none prose-table:border-collapse prose-th:border prose-th:border-primary/20 prose-th:px-4 prose-th:py-2 prose-th:bg-primary/5 prose-td:border prose-td:border-primary/10 prose-td:px-4 prose-td:py-2 animate-in fade-in duration-1000 delay-200">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw, rehypeHighlight]}
                    >
                        {post.content}
                    </ReactMarkdown>
                </div>

                <div className="mt-20 pt-12 border-t border-primary/10 flex flex-col items-center gap-8 text-center">
                    <p className="text-muted-foreground italic font-serif text-lg">Thanks for reading. If you enjoyed this piece, feel free to reach out.</p>
                    <div className="flex gap-4">
                        <ContactButton />
                        <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
                            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://mhd12.dev/journal/${post.slug}`)}`} target="_blank" rel="noopener noreferrer">
                                Share Story
                            </a>
                        </Button>
                    </div>
                </div>
            </article>
        </div>
    );
}
