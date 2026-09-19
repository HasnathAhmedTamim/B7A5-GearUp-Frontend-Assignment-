import Link from "next/link";
import { ShieldX } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
            <div className="rounded-full bg-destructive/10 p-5 text-destructive">
                <ShieldX className="h-10 w-10" />
            </div>
            <h1 className="mt-6 text-3xl font-semibold tracking-tight">Access denied</h1>
            <p className="mt-3 max-w-md text-muted-foreground">
                You don&apos;t have permission to view this page.
            </p>
            <Button asChild className="mt-8 h-11">
                <Link href="/dashboard">Back to dashboard</Link>
            </Button>
        </main>
    );
}
