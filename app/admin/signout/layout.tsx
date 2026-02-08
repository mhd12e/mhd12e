import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Sign Out",
    description: "Sign out of the admin dashboard.",
};

export default function SignoutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
