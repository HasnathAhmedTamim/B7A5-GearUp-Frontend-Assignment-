import Link from "next/link";
import { XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function PaymentCancelPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border bg-card p-6 text-center sm:p-8">
                <XCircle className="mx-auto h-14 w-14 text-destructive" aria-hidden="true" />
                <h1 className="mt-5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    Payment cancelled
                </h1>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    No charge was made. You can return to My Rentals and try checkout again when you are ready.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button asChild className="h-11">
                        <Link href="/dashboard/customer/rentals">Back to rentals</Link>
                    </Button>
                    <Button asChild variant="outline" className="h-11">
                        <Link href="/gear">Browse gear</Link>
                    </Button>
                </div>
            </div>
        </main>
    );
}
