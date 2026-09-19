"use client";

import { useQuery } from "@tanstack/react-query";
import { Users, UserCheck, Briefcase, Package, ShoppingBag, DollarSign } from "lucide-react";

import AdminStatsSkeleton from "./AdminStatsSkeleton";
import RecentRentals from "./RecentRentals";
import { QueryErrorState } from "@/components/shared/QueryState";
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/Motion";
import { getDashboardStats } from "@/services/admin/admin.api";

export default function AdminStats() {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["admin-stats"],
        queryFn: getDashboardStats,
    });

    if (isLoading) return <AdminStatsSkeleton />;

    if (isError || !data) {
        return (
            <QueryErrorState
                title="Failed to load dashboard data"
                description="Admin overview could not be retrieved."
                onRetry={() => refetch()}
            />
        );
    }

    const stats = [
        { title: "Total users", value: data.totalUsers, icon: Users },
        { title: "Customers", value: data.totalCustomers, icon: UserCheck },
        { title: "Providers", value: data.totalProviders, icon: Briefcase },
        { title: "Gear", value: data.totalGear, icon: Package },
        { title: "Rentals", value: data.totalRentals, icon: ShoppingBag },
        { title: "Revenue", value: `৳ ${Number(data.totalRevenue).toLocaleString()}`, icon: DollarSign },
    ];

    return (
        <div className="space-y-8">
            <FadeIn>
                <h1 className="text-3xl font-semibold tracking-tight">Admin dashboard</h1>
                <p className="mt-2 text-sm text-muted-foreground">Overview of users, providers, rentals and revenue.</p>
            </FadeIn>

            <Stagger className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {stats.map((item) => {
                    const Icon = item.icon;
                    return (
                        <StaggerItem key={item.title}>
                            <div className="rounded-2xl border bg-card p-6 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">{item.title}</p>
                                        <p className="mt-2 text-3xl font-semibold">{item.value}</p>
                                    </div>
                                    <div className="rounded-full bg-primary/10 p-3 text-primary">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                </div>
                            </div>
                        </StaggerItem>
                    );
                })}
            </Stagger>

            <RecentRentals />
        </div>
    );
}
