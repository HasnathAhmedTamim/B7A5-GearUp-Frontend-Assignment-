"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { PackageSearch } from "lucide-react";

import PaymentButton from "@/components/dashboard/customer/PaymentButton";
import ReviewButton from "@/components/dashboard/customer/ReviewButton";
import EmptyState from "@/components/shared/EmptyState";
import { QueryErrorState } from "@/components/shared/QueryState";
import SectionHeader from "@/components/shared/SectionHeader";
import StatusBadge, { getRentalNextStep } from "@/components/shared/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getMyRentals } from "@/services/rental/rental.api";
import { IMyRental } from "@/types/rental";

export default function MyRentals() {
    const {
        data: rentals = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery<IMyRental[]>({
        queryKey: ["my-rentals"],
        queryFn: getMyRentals,
    });

    const summaryCards = [
        {
            label: "Total rentals",
            value: rentals.length,
        },
        {
            label: "Active",
            value: rentals.filter((r) => ["PLACED", "CONFIRMED", "PAID", "PICKED_UP"].includes(r.status)).length,
        },
        {
            label: "Returned",
            value: rentals.filter((r) => r.status === "RETURNED").length,
        },
        {
            label: "Paid",
            value: rentals.filter((r) => r.payment !== null).length,
        },
    ];

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-16 w-full max-w-md" />
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={index} className="h-24 rounded-2xl" />
                    ))}
                </div>
                <div className="grid gap-4 xl:grid-cols-2">
                    <Skeleton className="h-64 rounded-2xl" />
                    <Skeleton className="h-64 rounded-2xl" />
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <QueryErrorState
                title="Unable to load rentals"
                description={(error as Error)?.message || "Something went wrong while loading your rentals."}
                onRetry={() => refetch()}
            />
        );
    }

    if (!rentals.length) {
        return (
            <div className="space-y-6">
                <SectionHeader
                    eyebrow="Dashboard"
                    title="My rentals"
                    description="Track booking status, payments, and reviews in one place."
                />
                <EmptyState
                    icon={PackageSearch}
                    title="No rentals yet"
                    description="You haven't booked any gear yet. Browse the catalog and start your first rental."
                    action={
                        <Button asChild className="h-11">
                            <Link href="/gear">Browse gear</Link>
                        </Button>
                    }
                />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <SectionHeader
                eyebrow="Dashboard"
                title="My rentals"
                description="Follow each booking from request to return, then pay or review when the status allows it."
                action={
                    <Badge variant="secondary" className="w-fit">
                        {rentals.length} total bookings
                    </Badge>
                }
            />

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {summaryCards.map((card) => (
                    <div key={card.label} className="rounded-2xl border bg-card p-4">
                        <p className="text-sm text-muted-foreground">{card.label}</p>
                        <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">{card.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
                {rentals.map((r) => {
                    const showPayment = Boolean(r.payment) || r.status === "CONFIRMED" || r.status === "PLACED";
                    const showReview = r.status === "RETURNED";

                    return (
                    <Card key={r.id} className="overflow-hidden">
                        <CardHeader className="pb-0">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex min-w-0 items-center gap-3">
                                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                                        <Image
                                            src={r.gear.image}
                                            alt={`${r.gear.title} rental photo`}
                                            fill
                                            sizes="64px"
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="min-w-0">
                                        <h2 className="truncate text-base font-semibold text-foreground">{r.gear.title}</h2>
                                        <p className="text-sm text-muted-foreground">{r.gear.category.name}</p>
                                        <Link
                                            href={`/gear/${r.gearId}`}
                                            className="mt-1 inline-flex text-sm font-medium text-foreground underline-offset-4 hover:underline"
                                        >
                                            View gear
                                        </Link>
                                    </div>
                                </div>
                                <StatusBadge status={r.status} />
                            </div>
                        </CardHeader>

                        <CardContent className="pt-4">
                            <p className="mb-4 rounded-xl bg-muted/50 px-3 py-2 text-sm leading-6 text-muted-foreground">
                                {getRentalNextStep(r.status, Boolean(r.payment))}
                            </p>
                            <div className="grid gap-3 sm:grid-cols-2">
                                <Info label="Start date" value={new Date(r.startDate).toLocaleDateString()} />
                                <Info label="End date" value={new Date(r.endDate).toLocaleDateString()} />
                                <Info label="Quantity" value={r.quantity} />
                                <Info label="Total" value={`৳ ${r.totalAmount}`} />
                                <Info
                                    label="Payment"
                                    value={r.payment ? "Paid" : r.status === "CONFIRMED" ? "Awaiting payment" : "Pending"}
                                />
                                <Info
                                    label="Review"
                                    value={r.reviewed ? "Submitted" : r.status === "RETURNED" ? "Available" : "After return"}
                                />
                            </div>
                        </CardContent>

                        {(showPayment || showReview) && (
                            <CardFooter className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
                                <PaymentButton rental={r} />
                                <ReviewButton rental={r} />
                            </CardFooter>
                        )}
                    </Card>
                    );
                })}
            </div>
        </div>
    );
}

function Info({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="rounded-xl border bg-background px-3 py-2.5">
            <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">{label}</p>
            <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
        </div>
    );
}
