"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyRentals } from "@/services/rental/rental.api";

export default function MyRentals() {
    const {
        data: rentals,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["my-rentals"],
        queryFn: getMyRentals,
    });

    if (isLoading) {
        return (
            <div className="flex h-80 items-center justify-center">
                Loading...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex h-80 items-center justify-center text-red-500">
                Something went wrong.
            </div>
        );
    }

    if (!rentals?.length) {
        return (
            <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
                <h2 className="text-2xl font-semibold">
                    No Rentals Found
                </h2>

                <p className="mt-2 text-gray-500">
                    You haven't rented any gear yet.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">
                My Rentals
            </h1>

            <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Gear
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Rental Period
                                </th>

                                <th className="px-6 py-4 text-center text-sm font-semibold">
                                    Qty
                                </th>

                                <th className="px-6 py-4 text-center text-sm font-semibold">
                                    Total
                                </th>

                                <th className="px-6 py-4 text-center text-sm font-semibold">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-center text-sm font-semibold">
                                    Payment
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {rentals.map((r: any) => (
                                <tr
                                    key={r.id}
                                    className="border-t hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={r.gear.image}
                                                alt={r.gear.title}
                                                className="h-16 w-16 rounded-lg object-cover"
                                            />

                                            <div>
                                                <h3 className="font-semibold">
                                                    {r.gear.title}
                                                </h3>

                                                <p className="text-sm text-gray-500">
                                                    {r.gear.category.name}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <p>
                                            {new Date(
                                                r.startDate
                                            ).toLocaleDateString()}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            {new Date(
                                                r.endDate
                                            ).toLocaleDateString()}
                                        </p>
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        {r.quantity}
                                    </td>

                                    <td className="px-6 py-4 text-center font-semibold">
                                        ৳ {r.totalAmount}
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                            {r.status}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        {r.payment ? (
                                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                                Paid
                                            </span>
                                        ) : (
                                            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                                                Unpaid
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}