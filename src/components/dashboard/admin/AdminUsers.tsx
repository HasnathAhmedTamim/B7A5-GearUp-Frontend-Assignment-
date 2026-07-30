"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
    getAllUsers,
    updateUserStatus,
} from "@/services/admin/admin.api";

export default function AdminUsers() {
    const queryClient = useQueryClient();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ["admin-users"],
        queryFn: getAllUsers,
    });

    const { mutate, isPending } = useMutation({
        mutationFn: ({
            id,
            status,
        }: {
            id: string;
            status: "ACTIVE" | "BLOCKED";
        }) => updateUserStatus(id, status),

        onSuccess: () => {
            toast.success("User status updated.");
            queryClient.invalidateQueries({
                queryKey: ["admin-users"],
            });
        },

        onError: () => {
            toast.error("Failed to update user.");
        },
    });

    if (isLoading) {
        return (
            <div className="py-10 text-center">
                Loading users...
            </div>
        );
    }

    return (
        <div>
            <h1 className="mb-6 text-3xl font-bold">
                Users
            </h1>

            <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-left">Name</th>
                            <th className="p-4 text-left">Email</th>
                            <th className="p-4 text-left">Role</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user: any) => (
                            <tr
                                key={user.id}
                                className="border-t"
                            >
                                <td className="p-4">
                                    {user.name}
                                </td>

                                <td className="p-4">
                                    {user.email}
                                </td>

                                <td className="p-4">
                                    {user.role}
                                </td>

                                <td className="p-4">
                                    <span
                                        className={`rounded-full px-3 py-1 text-sm font-medium ${user.status === "ACTIVE"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>

                                <td className="p-4 text-center">
                                    {user.role === "ADMIN" ? (
                                        <span className="text-gray-400">
                                            Protected
                                        </span>
                                    ) : (
                                        <button
                                            disabled={isPending}
                                            onClick={() =>
                                                mutate({
                                                    id: user.id,
                                                    status:
                                                        user.status === "ACTIVE"
                                                            ? "BLOCKED"
                                                            : "ACTIVE",
                                                })
                                            }
                                            className={`rounded-lg px-4 py-2 text-white ${user.status === "ACTIVE"
                                                    ? "bg-red-500 hover:bg-red-600"
                                                    : "bg-green-600 hover:bg-green-700"
                                                }`}
                                        >
                                            {user.status === "ACTIVE"
                                                ? "Block"
                                                : "Unblock"}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}