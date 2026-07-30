import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PaymentCancelPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
                <XCircle className="mx-auto h-20 w-20 text-red-600" />

                <h1 className="mt-6 text-3xl font-bold">
                    Payment Cancelled
                </h1>

                <p className="mt-3 text-gray-600">
                    Your payment was cancelled.
                </p>

                <Link
                    href="/dashboard/customer/rentals"
                    className="mt-8 inline-block rounded-lg bg-red-600 px-6 py-3 text-white transition hover:bg-red-700"
                >
                    Back to Rentals
                </Link>
            </div>
        </div>
    );
}