import React from "react";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
    icon?: LucideIcon;
    title: string;
    description?: string;
    className?: string;
}

export function EmptyState({ icon: Icon, title, description, className = "" }: EmptyStateProps) {
    return (
        <div className={`text-center py-20 border-2 border-dashed border-primary/10 rounded-2xl flex flex-col items-center justify-center p-8 bg-card/10 backdrop-blur-sm ${className}`}>
            {Icon && (
                <div className="w-16 h-16 border-2 border-primary/20 rounded-full flex items-center justify-center mb-4 text-primary/40">
                    <Icon className="w-8 h-8" />
                </div>
            )}
            <p className="text-xl font-serif italic text-muted-foreground mb-2">
                {title}
            </p>
            {description && (
                <p className="text-sm text-muted-foreground/60 max-w-md mx-auto italic">
                    {description}
                </p>
            )}
        </div>
    );
}
