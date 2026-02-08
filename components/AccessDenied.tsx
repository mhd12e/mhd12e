import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AccessDenied() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
            <h1 className="text-2xl font-bold">Access Denied</h1>
            <p>You must be signed in to view this page.</p>
            <Link href="/admin/login">
                <Button>Go to Login</Button>
            </Link>
        </div>
    );
}
