import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">

            <div className="rounded-full bg-blue-100 p-5">
                <SearchX className="h-12 w-12 text-blue-600" />
            </div>


            <h1 className="mt-6 text-6xl font-bold text-gray-900">
                404
            </h1>


            <h2 className="mt-3 text-2xl font-semibold">
                Page Not Found
            </h2>


            <p className="mt-2 max-w-md text-gray-500">
                Sorry, the page you are looking for does not exist
                or has been moved.
            </p>


            <Link
                href="/"
                className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
            >
                Back To Home
            </Link>

        </div>
    );
}