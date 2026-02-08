"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { getAllPostsForSelect } from "@/app/actions/post";

interface ArticleSelectProps {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    name?: string;
}

export function ArticleSelect({ value: controlledValue, defaultValue, onChange, name }: ArticleSelectProps) {
    const [open, setOpen] = React.useState(false);
    const [posts, setPosts] = React.useState<{ id: string; title: string; slug: string }[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [internalValue, setInternalValue] = React.useState(defaultValue || "");

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const handleSelect = (newValue: string) => {
        const finalValue = newValue === value ? "" : newValue;
        if (!isControlled) {
            setInternalValue(finalValue);
        }
        onChange?.(finalValue);
        setOpen(false);
    };

    React.useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getAllPostsForSelect();
                setPosts(data);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const selectedPost = posts.find((post) => post.id === value);

    return (
        <div>
            <input type="hidden" name={name} value={value || ""} />
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between h-14 bg-background/50 border-primary/10 font-normal text-lg"
                        disabled={loading}
                    >
                        {value
                            ? selectedPost?.title || "Select related article..."
                            : "Select related article..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                    <Command>
                        <CommandInput placeholder="Search article..." />
                        <CommandList>
                            <CommandEmpty>No article found.</CommandEmpty>
                            <CommandGroup>
                                {posts.map((post) => (
                                    <CommandItem
                                        key={post.id}
                                        value={post.title}
                                        onSelect={() => handleSelect(post.id)}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === post.id ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {post.title}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
