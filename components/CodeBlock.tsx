import React from 'react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
    className?: string;
}

export function CodeBlock({ className }: CodeBlockProps) {
    return (
        <div className={cn("relative group", className)}>
            <div className="absolute inset-0 bg-primary/30 dark:bg-primary/60 rounded-xl opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

            <div className="relative font-mono text-xs sm:text-sm leading-relaxed overflow-hidden rounded-xl border-2 border-primary/20 bg-card shadow-2xl">
                {/* Editor Header */}
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border-b border-primary/10 bg-muted/5">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80 ring-1 ring-black/5" />
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80 ring-1 ring-black/5" />
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80 ring-1 ring-black/5" />
                    </div>
                    <div className="flex-1 text-center text-[10px] sm:text-xs text-muted-foreground/60 font-sans">
                        portfolio.ts
                    </div>
                </div>

                {/* Editor Content */}
                <div className="p-3 sm:p-6">
                    <pre className="text-foreground whitespace-pre-wrap break-words">
                        <code>
                            <span className="text-muted-foreground italic">// Software Engineer</span>
                            {'\n'}
                            <span className="text-purple-600 dark:text-purple-400">const</span> <span className="text-blue-600 dark:text-blue-400">developer</span> <span className="text-foreground">=</span> {'{'}
                            {'\n'}
                            {'  '}<span className="text-sky-600 dark:text-sky-300">name</span>: <span className="text-green-600 dark:text-green-400">'Mohamed Elsayed'</span>,
                            {'\n'}
                            {'  '}<span className="text-sky-600 dark:text-sky-300">skills</span>: [<span className="text-green-600 dark:text-green-400">'React'</span>, <span className="text-green-600 dark:text-green-400">'Nest.js'</span>, <span className="text-green-600 dark:text-green-400">'PostgreSQL'</span>],
                            {'\n'}
                            {'  '}<span className="text-sky-600 dark:text-sky-300">focuses</span>: [<span className="text-green-600 dark:text-green-400">'Full-Stack'</span>, <span className="text-green-600 dark:text-green-400">'UI/UX'</span>],
                            {'\n'}
                            {'  '}<span className="text-sky-600 dark:text-sky-300">learning</span>: <span className="text-green-600 dark:text-green-400">'Always'</span>
                            {'\n'}
                            {'}'};
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
}
