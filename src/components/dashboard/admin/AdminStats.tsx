"use client";

import { useQuery } from "@tanstack/react-query";
import {
    Users,
    UserCheck,
    Briefcase,
    Package,
    ShoppingBag,
    DollarSign,
} from "lucide-react";

import { getDashboardStats } from "@/services/admin/admin.api";
import RecentRentals from "./RecentRentals";

export default function AdminStats() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["admin-stats"],
        queryFn: getDashboardStats,
    });

    if (isLoading) {
        return (
            <div className="py-10 text-center text-gray-500">
                Loading dashboard...
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-600">
                Failed to load dashboard data.
            </div>
        );
    }

    const stats = [
        {
            title: "Total Users",
            value: data.totalUsers,
            icon: Users,
        },
        {
            title: "Customers",
            value: data.totalCustomers,
            icon: UserCheck,
        },
        {
            title: "Providers",
            value: data.totalProviders,
            icon: Briefcase,
        },
        {
            title: "Gear",
            value: data.totalGear,
            icon: Package,
        },
        {
            title: "Rentals",
            value: data.totalRentals,
            icon: ShoppingBag,
        },
        {
            title: "Revenue",
            value: `৳ ${Number(data.totalRevenue).toLocaleString()}`,
            icon: DollarSign,
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Overview of users, providers, rentals and revenue.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {stats.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className="rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">{item.title}</p>
                                    <h2 className="mt-2 text-3xl font-bold">{item.value}</h2>
                                </div>

                                <div className="rounded-full bg-blue-100 p-3">
                                    <Icon className="h-7 w-7 text-blue-600" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Rentals */}
            <RecentRentals />
        </div>
    );
}