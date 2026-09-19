"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, CreditCard, PackageCheck, Search } from "lucide-react";

import ProviderDashboard from "@/components/dashboard/provider/ProviderDashboard";
import AdminStats from "@/components/dashboard/admin/AdminStats";
import StatusBadge from "@/components/shared/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthContext } from "@/providers/AuthProvider";
import { getMyRentals } from "@/services/rental/rental.api";
import { IMyRental } from "@/types/rental";

export default function DashboardPage() {
    const { user } = useAuthContext();

    const { data: rentals = [], isLoading } = useQuery<IMyRental[]>({
        queryKey: ["my-rentals"],
        queryFn: getMyRentals,
        enabled: user?.role === "CUSTOMER",
    });

    if (!user) {
        return null;
    }

    if (user.role === "ADMIN") {
        return <AdminStats />;
    }

    if (user.role === "PROVIDER") {
        return <ProviderDashboard />;
    }

    const activeRentals = rentals.filter((rental) =>
        ["PLACED", "CONFIRMED", "PAID", "PICKED_UP"].includes(rental.status),
    ).length;
    const awaitingPayment = rentals.filter(
        (rental) => rental.status === "CONFIRMED" && !rental.payment,
    ).length;
    const latestRental = rentals[0];

    return (
        <div className="space-y-6">
            <section className="rounded-2xl border bg-card p-5 sm:p-6 lg:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                            Customer dashboard
                        </p>
                        <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                            Welcome back, {user.name}
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                            Browse gear, track rental status, and complete payment after a provider confirms your request.
                        </p>
                    </div>
                    <Badge variant="secondary" className="w-fit">
                        {user.status || "Active"}
                    </Badge>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <StatCard label="Total rentals" value={isLoading ? "—" : String(rentals.length)} />
                    <StatCard label="Active bookings" value={isLoading ? "—" : String(activeRentals)} />
                    <StatCard label="Awaiting payment" value={isLoading ? "—" : String(awaitingPayment)} />
                </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
                <div className="rounded-2xl border bg-card p-5 sm:p-6">
                    <h2 className="text-xl font-semibold text-foreground">Quick actions</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Continue the rental flow from browse to payment.
                    </p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                        <Button asChild className="h-auto min-h-11 justify-start rounded-2xl p-4 text-left">
                            <Link href="/gear" className="flex w-full items-center justify-between gap-3">
                                <span>
                                    <span className="block text-sm font-semibold">Browse gear</span>
                                    <span className="mt-1 block text-xs text-primary-foreground/80">Find something to rent</span>
                                </span>
                                <Search className="h-4 w-4" aria-hidden="true" />
                            </Link>
                        </Button>

                        <Button asChild variant="outline" className="h-auto min-h-11 justify-start rounded-2xl p-4 text-left">
                            <Link href="/dashboard/customer/rentals" className="flex w-full items-center justify-between gap-3">
                                <span>
                                    <span className="block text-sm font-semibold">My rentals</span>
                                    <span className="mt-1 block text-xs text-muted-foreground">Status and next steps</span>
                                </span>
                                <PackageCheck className="h-4 w-4" aria-hidden="true" />
                            </Link>
                        </Button>

                        <Button asChild variant="outline" className="h-auto min-h-11 justify-start rounded-2xl p-4 text-left">
                            <Link href="/dashboard/customer/payments" className="flex w-full items-center justify-between gap-3">
                                <span>
                                    <span className="block text-sm font-semibold">Payments</span>
                                    <span className="mt-1 block text-xs text-muted-foreground">Checkout history</span>
                                </span>
                                <CreditCard className="h-4 w-4" aria-hidden="true" />
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="rounded-2xl border bg-card p-5 sm:p-6">
                    <h2 className="text-xl font-semibold text-foreground">Latest rental</h2>
                    {isLoading && <Skeleton className="mt-5 h-32 rounded-2xl" />}
                    {!isLoading && !latestRental && (
                        <p className="mt-4 text-sm leading-6 text-muted-foreground">
                            No bookings yet. Start by browsing available gear.
                        </p>
                    )}
                    {!isLoading && latestRental && (
                        <div className="mt-4 rounded-2xl border bg-muted/30 p-4">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="truncate font-medium text-foreground">{latestRental.gear.title}</p>
                                    <p className="mt-1 text-sm text-muted-foreground">{latestRental.gear.category.name}</p>
                                </div>
                                <StatusBadge status={latestRental.status} />
                            </div>
                            <Button asChild variant="link" className="mt-3 h-auto px-0">
                                <Link href="/dashboard/customer/rentals" className="inline-flex items-center gap-1">
                                    View rental history
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

function StatCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-2xl border bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-3 text-2xl font-semibold text-foreground">{value}</p>
        </div>
    );
}
