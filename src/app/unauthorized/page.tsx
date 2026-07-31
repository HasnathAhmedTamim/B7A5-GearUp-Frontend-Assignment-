import Link from "next/link";
import { ShieldX } from "lucide-react";


export default function UnauthorizedPage() {

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">

            <div className="rounded-full bg-red-100 p-5">
                <ShieldX className="h-12 w-12 text-red-600" />
            </div>


            <h1 className="mt-6 text-4xl font-bold">
                Access Denied
            </h1>


            <p className="mt-3 max-w-md text-gray-500">
                You don&apos;t have permission to access this page.
            </p>


            <Link
                href="/dashboard"
                className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
                Back To Dashboard
            </Link>


        </div>
    );
}