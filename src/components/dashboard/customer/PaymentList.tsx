"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, CreditCard } from "lucide-react";

import EmptyState from "@/components/shared/EmptyState";
import { QueryErrorState } from "@/components/shared/QueryState";
import SectionHeader from "@/components/shared/SectionHeader";
import StatusBadge from "@/components/shared/StatusBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { getMyPayments } from "@/services/payment/payment.api";

type PaymentItem = {
    id: string;
    amount: number;
    provider?: string;
    transactionId?: string;
    paidAt?: string | null;
    status: string;
    rentalOrder?: {
        gear?: {
            title?: string;
            image?: string;
        };
    };
};

export default function PaymentList() {
    const {
        data: payments = [],
        isLoading,
        isError,
        refetch,
    } = useQuery<PaymentItem[]>({
        queryKey: ["my-payments"],
        queryFn: getMyPayments,
    });

    if (isLoading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-16 w-72" />
                <Skeleton className="h-64 rounded-2xl" />
            </div>
        );
    }

    if (isError) {
        return (
            <QueryErrorState
                title="Failed to load payments"
                description="Your payment history could not be retrieved."
                onRetry={() => refetch()}
            />
        );
    }

    if (!payments.length) {
        return (
            <div className="space-y-6">
                <SectionHeader
                    eyebrow="Billing"
                    title="Payments"
                    description="Checkout history for confirmed rentals appears here."
                />
                <EmptyState
                    icon={CreditCard}
                    title="No payments yet"
                    description="Once you complete Stripe checkout, receipts will show in this list."
                />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <SectionHeader
                eyebrow="Billing"
                title="Payments"
                description="Review amounts, providers, and transaction status."
            />

            <div className="hidden overflow-hidden rounded-2xl border bg-card xl:block">
                <table className="w-full text-sm">
                    <thead className="bg-muted/60 text-left text-muted-foreground">
                        <tr>
                            <th className="p-4 font-medium">Gear</th>
                            <th className="p-4 font-medium">Amount</th>
                            <th className="p-4 font-medium">Provider</th>
                            <th className="p-4 font-medium">Transaction</th>
                            <th className="p-4 font-medium">Date</th>
                            <th className="p-4 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment.id} className="border-t">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-muted">
                                            {payment.rentalOrder?.gear?.image && (
                                                <Image
                                                    src={payment.rentalOrder.gear.image}
                                                    alt={`${payment.rentalOrder.gear.title ?? "Gear"} payment photo`}
                                                    fill
                                                    className="object-cover"
                                                    sizes="48px"
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium">{payment.rentalOrder?.gear?.title}</p>
                                            <p className="text-xs text-muted-foreground">Rental payment</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 font-semibold">৳ {Number(payment.amount).toFixed(2)}</td>
                                <td className="p-4">{payment.provider}</td>
                                <td className="max-w-[180px] break-all p-4 text-muted-foreground">{payment.transactionId || "—"}</td>
                                <td className="p-4">
                                    <span className="inline-flex items-center gap-2">
                                        <CalendarDays size={14} />
                                        {payment.paidAt ? new Date(payment.paidAt).toLocaleDateString() : "Not paid"}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <StatusBadge status={payment.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="grid gap-4 xl:hidden">
                {payments.map((payment) => (
                    <article key={payment.id} className="rounded-2xl border bg-card p-4">
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <h2 className="truncate font-semibold">{payment.rentalOrder?.gear?.title}</h2>
                                <p className="mt-1 text-sm text-muted-foreground">{payment.provider}</p>
                            </div>
                            <StatusBadge status={payment.status} />
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                            <p className="text-muted-foreground">Amount</p>
                            <p className="text-right font-medium">৳ {Number(payment.amount).toFixed(2)}</p>
                            <p className="text-muted-foreground">Date</p>
                            <p className="text-right">{payment.paidAt ? new Date(payment.paidAt).toLocaleDateString() : "Not paid"}</p>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
