"use client";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import {
    getProviderOrders,
    updateRentalStatus,
} from "@/services/rental/rental.api";

type RentalStatus = "CONFIRMED" | "PICKED_UP" | "RETURNED";

export default function ProviderOrders() {
    const queryClient = useQueryClient();

    const {
        data: orders,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["provider-orders"],
        queryFn: getProviderOrders,
    });

    const { mutate, isPending } = useMutation({
        mutationFn: ({
            id,
            status,
        }: {
            id: string;
            status: RentalStatus;
        }) => updateRentalStatus(id, status),

        onSuccess: (res) => {
            toast.success(res.message);

            queryClient.invalidateQueries({
                queryKey: ["provider-orders"],
            });
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ||
                "Failed to update rental status."
            );
        },
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
                                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                                Paid
                                            </span>
                                        ) : (
                                            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                                                Unpaid
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        {order.status === "PLACED" && (
                                            <button
                                                disabled={isPending}
                                                onClick={() =>
                                                    mutate({
                                                        id: order.id,
                                                        status: "CONFIRMED",
                                                    })
                                                }
                                                className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700 disabled:opacity-50"
                                            >
                                                Confirm
                                            </button>
                                        )}

                                        {order.status === "PAID" && (
                                            <button
                                                disabled={isPending}
                                                onClick={() =>
                                                    mutate({
                                                        id: order.id,
                                                        status: "PICKED_UP",
                                                    })
                                                }
                                                className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
                                            >
                                                Pick Up
                                            </button>
                                        )}

                                        {order.status === "PICKED_UP" && (
                                            <button
                                                disabled={isPending}
                                                onClick={() =>
                                                    mutate({
                                                        id: order.id,
                                                        status: "RETURNED",
                                                    })
                                                }
                                                className="rounded-lg bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700 disabled:opacity-50"
                                            >
                                                Returned
                                            </button>
                                        )}

                                        {(order.status === "CONFIRMED" ||
                                            order.status === "RETURNED") && (
                                                <span className="text-sm text-gray-500">
                                                    No Action
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