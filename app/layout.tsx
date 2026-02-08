import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FooterWrapper from "@/components/FooterWrapper";
import { ThemeProvider } from "@/components/theme-provider";
import { MobileSidebarWrapper } from "@/components/MobileSidebarWrapper";
import { AuthProvider } from "@/components/auth-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mhd12.dev'),
  title: {
    default: "Mohamed Elsayed | Full-Stack Developer",
    template: "%s | Mohamed Elsayed",
  },
  description: "Mohamed Elsayed is a Full-Stack Developer specializing in React, Next.js, Nest.js, PostgreSQL, and modern web technologies. Building scalable web applications with TypeScript.",
  keywords: [
    "Mohamed Elsayed",
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Nest.js",
    "PostgreSQL",
    "Web Developer",
    "Software Engineer",
    "Portfolio",
  ],
  authors: [{ name: "Mohamed Elsayed", url: "https://mhd12.dev" }],
  creator: "Mohamed Elsayed",
  publisher: "Mohamed Elsayed",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mhd12.dev",
    siteName: "Mohamed Elsayed Portfolio",
    title: "Mohamed Elsayed | Full-Stack Developer",
    description: "Full-Stack Developer specializing in React, Next.js, Nest.js, and PostgreSQL. Building scalable web applications.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mohamed Elsayed - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Elsayed | Full-Stack Developer",
    description: "Full-Stack Developer specializing in React, Next.js, Nest.js, and PostgreSQL.",
    images: ["/og-image.png"],
    creator: "@mhd12e",
  },
  alternates: {
    canonical: "https://mhd12.dev",
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE", // Replace with actual code when you have it
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased text-foreground bg-background transition-colors duration-300`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <MobileSidebarWrapper>
              <div className="flex flex-col min-h-screen w-full">
                <Navbar />
                <main className="flex-grow pt-16">
                  {children}
                </main>
                <FooterWrapper />
              </div>
            </MobileSidebarWrapper>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
