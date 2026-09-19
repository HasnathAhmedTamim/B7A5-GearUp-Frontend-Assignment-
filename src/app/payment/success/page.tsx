import Link from "next/link";
import { CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function PaymentSuccessPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border bg-card p-6 text-center sm:p-8">
                <CheckCircle className="mx-auto h-14 w-14 text-emerald-700" aria-hidden="true" />
                <h1 className="mt-5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    Payment successful
                </h1>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Your rental is now marked as paid. Check My Rentals for pickup status and next steps.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button asChild className="h-11">
                        <Link href="/dashboard/customer/rentals">Go to my rentals</Link>
                    </Button>
                    <Button asChild variant="outline" className="h-11">
                        <Link href="/gear">Browse more gear</Link>
                    </Button>
                </div>
            </div>
        </main>
    );
}
