"use client";

import { useAuthContext } from "@/providers/AuthProvider";
import AdminStats from "@/components/dashboard/admin/AdminStats";

export default function DashboardPage() {
    const { user } = useAuthContext();

    if (!user) {
        return null;
    }

    // Admin Dashboard
    if (user.role === "ADMIN") {
        return <AdminStats />;
    }

    // Customer & Provider Dashboard
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-6xl rounded-xl bg-white p-8 shadow">
                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>

                <p className="mt-6 text-lg">
                    Welcome,
                    <span className="ml-2 font-semibold text-blue-600">
                        {user.name}
                    </span>
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border p-6">
                        <h2 className="font-semibold">Email</h2>
                        <p>{user.email}</p>
                    </div>

                    <div className="rounded-lg border p-6">
                        <h2 className="font-semibold">Role</h2>
                        <p>{user.role}</p>
                    </div>

                    <div className="rounded-lg border p-6">
                        <h2 className="font-semibold">Status</h2>
                        <p>{user.status}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}