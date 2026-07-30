"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthContext } from "@/providers/AuthProvider";

interface Props {
    children: React.ReactNode;
}

export default function ProtectedRoute({
    children,
}: Props) {
    const router = useRouter();

    const { user, loading } = useAuthContext();

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login");
        }
    }, [loading, user, router]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!user) return null;

    return <>{children}</>;
}