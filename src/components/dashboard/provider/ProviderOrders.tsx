"use client";

import { useQuery } from "@tanstack/react-query";
import { getProviderOrders } from "@/services/rental/rental.api";

export default function ProviderOrders() {
    const {
        data: orders,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["provider-orders"],
        queryFn: getProviderOrders,
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
                Failed to load orders.
            </div>
        );
    }

    if (!orders?.length) {
        return (
            <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
                <h2 className="text-2xl font-semibold">
                    No Rental Orders
                </h2>

                <p className="mt-2 text-gray-500">
                    No customer has rented your gear yet.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">
                Rental Orders
            </h1>

            <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left">
                                    Customer
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Gear
                                </th>

                                <th className="px-6 py-4 text-center">
                                    Qty
                                </th>

                                <th className="px-6 py-4 text-center">
                                    Total
                                </th>

                                <th className="px-6 py-4 text-center">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-center">
                                    Payment
                                </th>

                                <th className="px-6 py-4 text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((order: any) => (
                                <tr
                                    key={order.id}
                                    className="border-t hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-semibold">
                                                {order.customer.name}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                {order.customer.email}
                                            </p>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={order.gear.image}
                                                alt={order.gear.title}
                                                className="h-14 w-14 rounded object-cover"
                                            />

                                            <div>
                                                <p className="font-semibold">
                                                    {order.gear.title}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    {order.gear.category.name}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        {order.quantity}
                                    </td>

                                    <td className="px-6 py-4 text-center font-semibold">
                                        ৳ {order.totalAmount}
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                            {order.status}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        {order.payment ? (
                                            <span className="text-green-600">
                                                Paid
                                            </span>
                                        ) : (
                                            <span className="text-red-600">
                                                Unpaid
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        {/* পরের ধাপে এখানে Status Update Button থাকবে */}
                                        -
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