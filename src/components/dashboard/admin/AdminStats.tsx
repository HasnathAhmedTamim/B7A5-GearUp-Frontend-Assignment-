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

export default function AdminStats() {
    const { data, isLoading } = useQuery({
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
            value: `৳ ${data.totalRevenue}`,
            icon: DollarSign,
        },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className="rounded-xl border bg-white p-6 shadow-sm"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <Icon className="h-8 w-8 text-blue-600" />
                            </div>

                            <h3 className="text-sm text-gray-500">{item.title}</h3>

                            <p className="mt-2 text-3xl font-bold">{item.value}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}