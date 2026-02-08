"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, Send } from "lucide-react";

export default function ProjectPublishToggle({ initialPublished }: { initialPublished: boolean }) {
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
                    className="w-5 h-5 rounded border-primary/20 bg-background text-primary focus:ring-primary"
                />
                <label htmlFor="published" className="text-sm font-medium">Published (visible on portfolio)</label>
            </div>

            <div className="pt-6">
                <Button type="submit" size="lg" className="w-full h-14 rounded-full text-lg gap-2 shadow-lg shadow-primary/20">
                    {isPublished ? (
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
        </>
    );
}
