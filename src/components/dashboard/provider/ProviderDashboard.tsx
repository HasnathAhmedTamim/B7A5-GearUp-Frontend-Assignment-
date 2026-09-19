"use client";

import { useQuery } from "@tanstack/react-query";
import { Package, Clock, ShoppingBag, Wallet } from "lucide-react";

import { QueryErrorState } from "@/components/shared/QueryState";
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/Motion";
import { Skeleton } from "@/components/ui/skeleton";
import { getProviderDashboard } from "@/services/dashboard/dashboard.api";

export default function ProviderDashboard() {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["provider-dashboard"],
        queryFn: getProviderDashboard,
    });

    if (isLoading) {
        return (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} className="h-36 rounded-2xl" />
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <QueryErrorState
                title="Failed to load provider dashboard"
                onRetry={() => refetch()}
            />
        );
    }

    const cards = [
        { title: "Total gear", value: data?.totalGear ?? 0, icon: Package },
        { title: "Pending orders", value: data?.pendingOrders ?? 0, icon: Clock },
        { title: "Active rentals", value: data?.activeRentals ?? 0, icon: ShoppingBag },
        { title: "Total earnings", value: `৳ ${data?.totalEarnings ?? 0}`, icon: Wallet },
    ];

    return (
        <div className="space-y-8">
            <FadeIn>
                <h1 className="text-3xl font-semibold tracking-tight">Provider dashboard</h1>
                <p className="mt-2 text-muted-foreground">Track inventory, orders, and earnings.</p>
            </FadeIn>

            <Stagger className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {cards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <StaggerItem key={card.title}>
                            <div className="rounded-2xl border bg-card p-6 shadow-sm">
                                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Icon size={22} />
                                </div>
                                <p className="text-sm text-muted-foreground">{card.title}</p>
                                <p className="mt-2 text-3xl font-semibold">{card.value}</p>
                            </div>
                        </StaggerItem>
                    );
                })}
            </Stagger>
        </div>
    );
}
