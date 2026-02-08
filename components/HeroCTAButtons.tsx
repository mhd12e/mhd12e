"use client";

import { Button } from "@/components/ui/button";
import { SmoothScrollLink } from "@/components/SmoothScrollLink";

export function HeroCTAButtons() {
    return (
        <>
            <Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                <SmoothScrollLink href="/#projects">View Projects</SmoothScrollLink>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 border-primary text-primary hover:bg-primary/5" asChild>
                <SmoothScrollLink href="/#contact">Contact Me</SmoothScrollLink>
            </Button>
        </>
    );
}
