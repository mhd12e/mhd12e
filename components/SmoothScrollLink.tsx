"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

interface SmoothScrollLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
}

export function SmoothScrollLink({ href, children, className }: SmoothScrollLinkProps) {
    const pathname = usePathname();
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        // Extract hash from href (e.g., "/#contact" -> "#contact")
        const hash = href.includes('#') ? '#' + href.split('#')[1] : '';

        if (!hash) {
            // No hash, navigate normally
            router.push(href);
            return;
        }

        if (pathname !== '/') {
            // Navigate to home first, then scroll
            router.push('/' + hash);
        } else {
            // Already on home, just scroll
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <a href={href} onClick={handleClick} className={className}>
            {children}
        </a>
    );
}
