import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log("[AUTH] authorize called with email:", credentials?.email);

                if (!credentials?.email || !credentials?.password) {
                    console.log("[AUTH] Missing credentials");
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                console.log("[AUTH] User found:", user ? user.email : "NOT FOUND");

                if (!user) {
                    console.log("[AUTH] No user found for email:", credentials.email);
                    return null;
                }

                console.log("[AUTH] Comparing password...");
                console.log("[AUTH] Hash from DB:", user.password.substring(0, 20) + "...");

                const isValid = await bcrypt.compare(credentials.password, user.password);

                console.log("[AUTH] Password valid:", isValid);

                if (!isValid) {
                    console.log("[AUTH] Invalid password");
                    return null;
                }

                console.log("[AUTH] Login successful for:", user.email);
                return { id: user.id, email: user.email };
            }
        })
    ],
    session: { strategy: "jwt" },
    pages: {
        signIn: '/admin/login', // Use admin/login for admin access
        signOut: '/admin/signout',
    },
    callbacks: {
        async jwt({ token, user }) {
            console.log("[JWT] jwt callback called");
            console.log("[JWT] user:", user ? user.email : "no user");
            console.log("[JWT] token.sub:", token.sub);
            if (user) {
                token.sub = user.id;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            console.log("[SESSION] session callback called");
            console.log("[SESSION] token:", JSON.stringify(token));
            if (session.user && token.sub) {
                session.user.email = token.email as string;
            }
            return session;
        }
    },
    cookies: {
        sessionToken: {
            name: `next-auth.session-token-v3`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: false // Force false for localhost debugging
            }
        }
    },
    debug: true, // Enable NextAuth debug mode
};
