"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllRentals } from "@/services/admin/admin.api";

const statusStyles: Record<string, string> = {
    PLACED: "bg-yellow-100 text-yellow-700",
    CONFIRMED: "bg-blue-100 text-blue-700",
    PICKED_UP: "bg-purple-100 text-purple-700",
    PAID: "bg-green-100 text-green-700",
    RETURNED: "bg-gray-100 text-gray-700",
};

export default function AdminRentals() {
    const { data: rentals = [], isLoading } = useQuery({
        queryKey: ["admin-rentals"],
        queryFn: getAllRentals,
    });

    if (isLoading) {
        return (
            <div className="py-10 text-center">
                Loading rentals...
            </div>
        );
    }

    return (
        <div>
            <h1 className="mb-6 text-3xl font-bold">
                Rental Management
            </h1>

            <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-left">Customer</th>
                            <th className="p-4 text-left">Gear</th>
                            <th className="p-4 text-left">Provider</th>
                            <th className="p-4 text-center">Qty</th>
                            <th className="p-4 text-left">Start Date</th>
                            <th className="p-4 text-left">End Date</th>
                            <th className="p-4 text-right">Total</th>
                            <th className="p-4 text-center">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rentals.map((item: any) => (
                            <tr
                                key={item.id}
                                className="border-t hover:bg-gray-50 transition-colors"
                            >
                                <td className="p-4">
                                    {item.customer?.name ?? "N/A"}
                                </td>

                                <td className="p-4 font-medium">
                                    {item.gear?.title ?? "N/A"}
                                </td>

                                <td className="p-4">
                                    {item.gear?.provider?.name ?? "N/A"}
                                </td>

                                <td className="p-4 text-center">
                                    {item.quantity}
                                </td>

                                <td className="p-4">
                                    {new Date(item.startDate).toLocaleDateString()}
                                </td>

                                <td className="p-4">
                                    {new Date(item.endDate).toLocaleDateString()}
                                </td>

                                <td className="p-4 text-right font-semibold">
                                    ৳{Number(item.totalAmount).toLocaleString()}
                                </td>

                                <td className="p-4 text-center">
                                    <span
                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[item.status] ??
                                            "bg-gray-100 text-gray-700"
                                            }`}
                                    >
                                        {item.status.replace("_", " ")}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {!rentals.length && (
                    <div className="p-8 text-center text-gray-500">
                        No rentals found.
                    </div>
                )}
            </div>
        </div>
    );
}