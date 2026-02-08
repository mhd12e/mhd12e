"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, FileText, Loader2 } from "lucide-react";

interface PublishToggleProps {
    initialPublished: boolean;
    isPending?: boolean;
}

export default function PublishToggle({ initialPublished, isPending = false }: PublishToggleProps) {
    const [isPublished, setIsPublished] = useState(initialPublished);

    return (
        <>
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
                <label htmlFor="published" className="text-sm font-medium">Published (visible to everyone)</label>
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
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Saving...
                        </>
                    ) : isPublished ? (
                        <>
                            <Send className="w-5 h-5" />
                            Update & Publish
                        </>
                    ) : (
                        <>
                            <FileText className="w-5 h-5" />
                            Update Draft
                        </>
                    )}
                </Button>
            </div>
        </>
    );
}
