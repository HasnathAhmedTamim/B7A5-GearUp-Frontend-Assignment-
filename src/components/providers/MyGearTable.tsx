"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { deleteGear, getMyGear } from "@/services/gear/gear.api";
import { IGear } from "@/types/gear";

export default function MyGearTable() {
    const queryClient = useQueryClient();

    const {
        data: gears = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["my-gear"],
        queryFn: getMyGear,
    });

    const { mutate: removeGear, isPending } = useMutation({
        mutationFn: deleteGear,

        onSuccess: (res) => {
            toast.success(res.message);

            queryClient.invalidateQueries({
                queryKey: ["my-gear"],
            });
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || "Failed to delete gear."
            );
        },
    });

    if (isLoading) {
        return (
            <div className="rounded-xl border bg-white p-6 text-center">
                Loading...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-xl border bg-white p-6 text-center text-red-500">
                Failed to load gears.
            </div>
        );
    }

    if (gears.length === 0) {
        return (
            <div className="rounded-xl border bg-white p-10 text-center">
                <h2 className="text-xl font-semibold">
                    No Gear Found
                </h2>

                <p className="mt-2 text-gray-500">
                    Add your first gear.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-xl border bg-white shadow">
            <table className="min-w-full">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-5 py-3 text-left">Image</th>
                        <th className="px-5 py-3 text-left">Title</th>
                        <th className="px-5 py-3 text-left">Brand</th>
                        <th className="px-5 py-3 text-left">Category</th>
                        <th className="px-5 py-3 text-left">Price</th>
                        <th className="px-5 py-3 text-left">Stock</th>
                        <th className="px-5 py-3 text-left">Status</th>
                        <th className="px-5 py-3 text-center">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {gears.map((gear: IGear) => (
                        <tr
                            key={gear.id}
                            className="border-t"
                        >
                            <td className="px-5 py-4">
                                <img
                                    src={gear.image}
                                    alt={gear.title}
                                    className="h-14 w-14 rounded object-cover"
                                />
                            </td>

                            <td className="px-5 py-4 font-medium">
                                {gear.title}
                            </td>

                            <td className="px-5 py-4">
                                {gear.brand}
                            </td>

                            <td className="px-5 py-4">
                                {gear.category?.name}
                            </td>

                            <td className="px-5 py-4">
                                ৳ {gear.pricePerDay}
                            </td>

                            <td className="px-5 py-4">
                                {gear.stock}
                            </td>

                            <td className="px-5 py-4">
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${gear.availability
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {gear.availability ? "Available" : "Unavailable"}
                                </span>
                            </td>

                            <td className="px-5 py-4">
                                <div className="flex justify-center gap-3">
                                    <Link
                                        href={`/dashboard/provider/my-gear/edit/${gear.id}`}
                                        className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
                                    >
                                        <Pencil size={18} />
                                    </Link>

                                    <button
                                        disabled={isPending}
                                        onClick={() => removeGear(gear.id)}
                                        className="rounded bg-red-500 p-2 text-white hover:bg-red-600 disabled:opacity-50"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}