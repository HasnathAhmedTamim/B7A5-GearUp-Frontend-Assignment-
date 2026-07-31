"use client";

import { useQuery } from "@tanstack/react-query";
import { CalendarDays, Package, User } from "lucide-react";

import { getRecentRentals } from "@/services/admin/admin.api";

export default function RecentRentals() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["recent-rentals"],
        queryFn: getRecentRentals,
    });

    if (isLoading) {
        return (
            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <p className="text-center text-gray-500">
                    Loading recent rentals...
                </p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
                Failed to load recent rentals.
            </div>
        );
    }

    if (!data?.length) {
        return (
            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold">Recent Rentals</h2>

                <div className="py-12 text-center text-gray-500">
                    No recent rentals found.
                </div>
            </div>
        );
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "PLACED":
                return "bg-yellow-100 text-yellow-700";

            case "CONFIRMED":
                return "bg-green-100 text-green-700";

            case "RETURNED":
                return "bg-blue-100 text-blue-700";

            case "CANCELLED":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const getPaymentBadge = (status?: string) => {
        switch (status) {
            case "COMPLETED":
                return "bg-green-100 text-green-700";

            case "PENDING":
                return "bg-yellow-100 text-yellow-700";

            default:
                return "bg-red-100 text-red-700";
        }
    };

    return (
        <div className="rounded-xl border bg-white shadow-sm">
            <div className="border-b px-6 py-5">
                <h2 className="text-xl font-semibold">
                    Recent Rentals
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Latest rental orders across the platform.
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr className="text-left text-sm text-gray-600">
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Gear</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Rental</th>
                            <th className="px-6 py-4">Payment</th>
                            <th className="px-6 py-4">Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((rental: any) => (
                            <tr
                                key={rental.id}
                                className="border-t transition hover:bg-gray-50"
                            >
                                {/* Customer */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-blue-100 p-2">
                                            <User className="h-4 w-4 text-blue-600" />
                                        </div>

                                        <div>
                                            <p className="font-medium">
                                                {rental.customer.name}
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                {rental.customer.email}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Gear */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Package className="h-4 w-4 text-gray-500" />

                                        <span>{rental.gear.title}</span>
                                    </div>
                                </td>

                                {/* Amount */}
                                <td className="px-6 py-4 font-semibold text-green-600">
                                    ৳{" "}
                                    {Number(rental.totalAmount).toLocaleString()}
                                </td>

                                {/* Rental Status */}
                                <td className="px-6 py-4">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadge(
                                            rental.status
                                        )}`}
                                    >
                                        {rental.status}
                                    </span>
                                </td>

                                {/* Payment */}
                                <td className="px-6 py-4">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${getPaymentBadge(
                                            rental.payment?.status
                                        )}`}
                                    >
                                        {rental.payment?.status || "UNPAID"}
                                    </span>
                                </td>

                                {/* Date */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <CalendarDays className="h-4 w-4" />

                                        {new Date(
                                            rental.createdAt
                                        ).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}