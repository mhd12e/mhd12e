'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Mail, ArrowRight, Shield } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError("Invalid credentials");
            setIsLoading(false);
        } else if (res?.ok) {
            window.location.href = "/admin";
        }
    };

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
                {/* Logo/Brand Section */}
                <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
                        <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">
                        Admin <span className="text-primary">Portal</span>
                    </h1>
                    <p className="text-muted-foreground mt-2 text-sm">
                        Sign in to manage your portfolio
                    </p>
                </div>

                {/* Login Card */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                    <div className="relative group">
                        {/* Card glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Main card */}
                        <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-8 dark:shadow-2xl">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Email Field */}
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-primary" />
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="admin@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="h-12 bg-muted/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 rounded-xl pl-4 text-base transition-all duration-200"
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <label htmlFor="password" className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                                        <Lock className="w-4 h-4 text-primary" />
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="h-12 bg-muted/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 rounded-xl pl-4 text-base transition-all duration-200"
                                        />
                                    </div>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <p className="text-destructive text-sm text-center font-medium">
                                            {error}
                                        </p>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base group transition-all duration-200"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                            Signing in...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            Sign In
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    )}
                                </Button>
                            </form>

                            {/* Footer */}
                            <div className="mt-6 pt-6 border-t border-border/30">
                                <p className="text-center text-xs text-muted-foreground">
                                    Protected area • Authorized access only
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
