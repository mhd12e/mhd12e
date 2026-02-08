import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "New Project",
    description: "Create a new portfolio project.",
};

export default function NewProjectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
