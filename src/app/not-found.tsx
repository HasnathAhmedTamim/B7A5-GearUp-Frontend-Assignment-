import Link from "next/link";
import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
            <div className="rounded-full bg-primary/10 p-5 text-primary">
                <SearchX className="h-10 w-10" />
            </div>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight">404</h1>
            <h2 className="mt-2 text-xl font-medium">Page not found</h2>
            <p className="mt-3 max-w-md text-muted-foreground">
                The page you are looking for does not exist or has been moved.
            </p>
            <Button asChild className="mt-8 h-11">
                <Link href="/">Back to home</Link>
            </Button>
        </main>
    );
}
