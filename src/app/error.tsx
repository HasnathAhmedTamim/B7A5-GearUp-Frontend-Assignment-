"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
            <div className="rounded-full bg-destructive/10 p-5 text-destructive">
                <AlertTriangle className="h-10 w-10" />
            </div>
            <h1 className="mt-6 text-3xl font-semibold tracking-tight">Something went wrong</h1>
            <p className="mt-3 max-w-md text-muted-foreground">
                We could not complete your request. Please try again.
            </p>
            <Button type="button" className="mt-8 h-11" onClick={() => reset()}>
                Try again
            </Button>
        </main>
    );
}
