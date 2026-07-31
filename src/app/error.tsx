"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";


export default function Error({
    error,
    reset,
}: {
    error: Error & {
        digest?: string;
    };

    reset: () => void;
}) {


    useEffect(() => {
        console.error(error);
    }, [error]);



    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">


            <div className="rounded-full bg-red-100 p-5">
                <AlertTriangle className="h-12 w-12 text-red-600" />
            </div>



            <h1 className="mt-6 text-3xl font-bold">
                Something went wrong!
            </h1>



            <p className="mt-3 max-w-md text-gray-500">
                We could not complete your request.
                Please try again.
            </p>



            <button
                onClick={() => reset()}
                className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
            >
                Try Again
            </button>


        </div>
    );
}