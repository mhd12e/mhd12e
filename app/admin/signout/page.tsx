"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LogOut } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SignOutPage() {
    const [countdown, setCountdown] = useState(5);

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
            {/* Background gradient effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-primary/10 via-transparent to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            {/* Grid pattern overlay - dark mode only */}
            <div className="absolute inset-0 hidden dark:block bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

            <div className="relative z-10 w-full max-w-md px-4">
                {/* Header Section */}
                <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-destructive/10 border border-destructive/20 mb-4">
                        <LogOut className="w-8 h-8 text-destructive" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">
                        Sign <span className="text-destructive">Out</span>
                    </h1>
                    <p className="text-muted-foreground mt-2 text-sm">
                        Are you sure you want to leave?
                    </p>
                </div>

                {/* Card */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                    <div className="relative group">
                        {/* Card glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-destructive/20 via-destructive/10 to-destructive/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Main card */}
                        <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-8 dark:shadow-2xl">
                            <div className="space-y-4">
                                <Button
                                    size="lg"
                                    onClick={() => signOut({ callbackUrl: "/" })}
                                    className="w-full h-12 rounded-xl bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold text-base group transition-all duration-200 shadow-lg shadow-destructive/20"
                                >
                                    <div className="flex items-center gap-2">
                                        <LogOut className="w-4 h-4" />
                                        Yes, Sign Out
                                    </div>
                                </Button>

                                <Link href="/admin" className="block">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="w-full h-12 rounded-xl border-border/50 hover:bg-muted/50 font-medium text-base transition-all duration-200"
                                    >
                                        <div className="flex items-center gap-2">
                                            <ArrowLeft className="w-4 h-4" />
                                            Return to Dashboard
                                        </div>
                                    </Button>
                                </Link>
                            </div>

                            {/* Footer inside card */}
                            <div className="mt-6 pt-6 border-t border-border/30">
                                <p className="text-center text-xs text-muted-foreground">
                                    Your session will be securely terminated
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom decorative text */}
                <p className="text-center text-muted-foreground/50 text-xs mt-8 animate-in fade-in duration-1000 delay-500">
                    Mohamed Elsayed • Portfolio Admin
                </p>
            </div>
        </div>
    );
}
