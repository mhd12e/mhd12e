"use client";

import { Button } from "@/components/ui/button";
import { SmoothScrollLink } from "@/components/SmoothScrollLink";

export function ContactButton() {
    return (
        <Button size="lg" className="rounded-full px-8" asChild>
            <SmoothScrollLink href="/#contact">Get in Touch</SmoothScrollLink>
        </Button>
    );
}
