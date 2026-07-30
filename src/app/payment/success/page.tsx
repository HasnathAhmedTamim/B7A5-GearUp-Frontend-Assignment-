import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccessPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
                <CheckCircle className="mx-auto h-20 w-20 text-green-600" />

                <h1 className="mt-6 text-3xl font-bold">
                    Payment Successful
                </h1>

                <p className="mt-3 text-gray-600">
                    Your payment has been completed successfully.
                </p>

                <Link
                    href="/dashboard/customer/rentals"
                    className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
                >
                    Go to My Rentals
                </Link>
            </div>
        </div>
    );
}