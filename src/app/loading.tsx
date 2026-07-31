import { LoaderCircle } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center">

            <div className="flex items-center gap-3 text-gray-500">

                <LoaderCircle className="animate-spin" />

                <span>
                    Loading...
                </span>

            </div>

        </div>
    );
}