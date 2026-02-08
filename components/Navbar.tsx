"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { MobileSidebarTrigger } from '@/components/MobileSidebarTrigger';

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
        e.preventDefault();
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
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link
                    href="/"
                    className="text-xl font-serif font-bold tracking-tight"
                    onClick={handleScrollToTop}
                >
                    Mohamed <span className="text-primary">Elsayed.</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-8 items-center">
                    <a href="/#projects" onClick={(e) => handleHashClick(e, '#projects')} className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">Projects</a>
                    <Link href="/journal" className="text-sm font-medium hover:text-primary transition-colors">Journal</Link>
                    <a href="/#about" onClick={(e) => handleHashClick(e, '#about')} className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">About</a>
                    <a href="/#contact" onClick={(e) => handleHashClick(e, '#contact')} className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">Contact</a>
                    <div className="flex items-center gap-4 pl-4 border-l">
                        <ThemeToggle />
                        <Link href="/admin">
                            <Button size="sm" className="hidden lg:flex">Admin</Button>
                        </Link>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden flex items-center gap-4">
                    <ThemeToggle />
                    <MobileSidebarTrigger />
                </div>
            </div>
        </nav>
    );
}
