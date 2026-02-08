"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

type ActionResult = {
    success: boolean;
    error?: string;
}

interface DeleteButtonProps {
    id: string;
    deleteAction: (id: string) => Promise<ActionResult>;
    itemName?: string;
}

export default function DeleteButton({ id, deleteAction, itemName = "item" }: DeleteButtonProps) {
    const [isPending, startTransition] = useTransition();
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleDelete = async () => {
        setError(null);
        startTransition(async () => {
            try {
                const result = await deleteAction(id);
                if (!result.success) {
                    setError(result.error || "Failed to delete item");
                    return;
                }
                setShowConfirm(false);
                router.refresh();
            } catch (err) {
                console.error("Failed to delete:", err);
                setError("Failed to delete item");
            }
        });
    };

    if (showConfirm) {
        return (
            <div className="flex flex-col gap-2">
                {error && (
                    <div className="flex items-center gap-2 text-destructive text-xs font-medium bg-destructive/10 px-2 py-1 rounded">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}
                <div className="flex items-center gap-2 animate-in fade-in zoom-in duration-200">
                    <span className="text-xs font-bold text-red-500">Sure?</span>
                    <Button
                        size="sm"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isPending}
                        className="h-8 rounded-full px-3"
                    >
                        {isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : "Yes"}
                    </Button>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => { setShowConfirm(false); setError(null); }}
                        disabled={isPending}
                        className="h-8 rounded-full px-3"
                    >
                        No
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-red-500/10 hover:text-red-500 transition-colors"
            title={`Delete ${itemName}`}
            onClick={() => setShowConfirm(true)}
        >
            <Trash2 className="w-4 h-4" />
        </Button>
    );
}
