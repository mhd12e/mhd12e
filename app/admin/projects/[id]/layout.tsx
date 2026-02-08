import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Edit Project",
    description: "Edit portfolio project.",
};

export default function EditProjectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
