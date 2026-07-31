"use client";

import { useState } from "react";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import {
    getAllUsers,
    updateUserStatus,
} from "@/services/admin/admin.api";

import TableSkeleton from "@/components/shared/TableSkeleton";
import { getErrorMessage } from "@/utils/getErrorMessage";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";



export default function AdminUsers() {


    const queryClient = useQueryClient();


    const [selectedUser, setSelectedUser] = useState<{
        id: string;
        status: "ACTIVE" | "SUSPENDED";
    } | null>(null);



    const {
        data: users = [],
        isLoading,
    } = useQuery({

        queryKey: ["admin-users"],

        queryFn: getAllUsers,

    });



    const {
        mutate,
        isPending,
    } = useMutation({

        mutationFn: ({
            id,
            status,
        }: {
            id: string;
            status: "ACTIVE" | "SUSPENDED";
        }) => updateUserStatus(id, status),


        onSuccess: () => {

            toast.success(
                "User status updated successfully."
            );


            queryClient.invalidateQueries({
                queryKey: ["admin-users"]
            });


            setSelectedUser(null);

        },


        onError: (error) => {

            toast.error(
                getErrorMessage(error)
            );

        }

    });




    const handleStatusChange = () => {

        if (!selectedUser) return;


        mutate({

            id: selectedUser.id,

            status:
                selectedUser.status === "ACTIVE"
                    ? "SUSPENDED"
                    : "ACTIVE"

        });

    };




    if (isLoading) {

        return (
            <TableSkeleton
                rows={6}
                columns={5}
            />
        );

    }



    return (

        <div className="space-y-6">


            <div>

                <h1 className="text-2xl font-bold sm:text-3xl">
                    Users
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Manage platform users.
                </p>

            </div>



            {/* Desktop Table */}

            <div
                className="
        hidden
        overflow-hidden
        rounded-xl
        border
        bg-white
        shadow-sm
        lg:block
    "
            >

                <table className="w-full">


                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">
                                Name
                            </th>

                            <th className="p-4 text-left">
                                Email
                            </th>

                            <th className="p-4 text-left">
                                Role
                            </th>

                            <th className="p-4 text-left">
                                Status
                            </th>

                            <th className="p-4 text-center">
                                Action
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {users.map((user: any) => (

                            <tr
                                key={user.id}
                                className="border-t hover:bg-gray-50"
                            >

                                <td className="p-4 font-medium">
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
                                        className={`
                                            rounded-full
                                            px-3
                                            py-1
                                            text-sm
                                            font-medium

                                            ${user.status === "ACTIVE"
                                                ?
                                                "bg-green-100 text-green-700"
                                                :
                                                "bg-red-100 text-red-700"
                                            }
                                        `}
                                    >

                                        {user.status}

                                    </span>

                                </td>


                                <td className="p-4 text-center">


                                    {
                                        user.role === "ADMIN"

                                            ?

                                            <span className="text-gray-400">
                                                Protected
                                            </span>

                                            :

                                            <button
                                                onClick={() => setSelectedUser({
                                                    id: user.id,
                                                    status: user.status
                                                })}
                                                disabled={isPending}
                                                className={`
                                                rounded-lg
                                                px-4
                                                py-2
                                                text-white

                                                ${user.status === "ACTIVE"
                                                        ?
                                                        "bg-red-500 hover:bg-red-600"
                                                        :
                                                        "bg-green-600 hover:bg-green-700"
                                                    }
                                            `}
                                            >

                                                {
                                                    user.status === "ACTIVE"
                                                        ?
                                                        "Block"
                                                        :
                                                        "Activate"
                                                }

                                            </button>
                                    }


                                </td>


                            </tr>

                        ))}

                    </tbody>


                </table>

            </div>

            <div className="space-y-4 lg:hidden">

                {users.map((user: any) => (

                    <div
                        key={user.id}
                        className="
                rounded-xl
                border
                bg-white
                p-5
                shadow-sm
            "
                    >

                        {/* Name */}

                        <div className="flex justify-between border-b pb-3">

                            <span className="text-sm text-gray-500">
                                Name
                            </span>

                            <span className="font-semibold">
                                {user.name}
                            </span>

                        </div>



                        {/* Email */}

                        <div className="mt-3 flex justify-between border-b pb-3">

                            <span className="text-sm text-gray-500">
                                Email
                            </span>

                            <span className="max-w-[180px] break-all text-right text-sm">
                                {user.email}
                            </span>

                        </div>



                        {/* Role */}

                        <div className="mt-3 flex justify-between border-b pb-3">

                            <span className="text-sm text-gray-500">
                                Role
                            </span>

                            <span className="font-medium">
                                {user.role}
                            </span>

                        </div>



                        {/* Status */}

                        <div className="mt-3 flex items-center justify-between">

                            <span className="text-sm text-gray-500">
                                Status
                            </span>


                            <span
                                className={`
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-semibold

                        ${user.status === "ACTIVE"
                                        ?
                                        "bg-green-100 text-green-700"
                                        :
                                        "bg-red-100 text-red-700"
                                    }
                    `}
                            >
                                {user.status}
                            </span>


                        </div>



                        {/* Action */}

                        <div className="mt-5">


                            {
                                user.role === "ADMIN"

                                    ?

                                    <div
                                        className="
                            rounded-lg
                            bg-gray-100
                            py-2
                            text-center
                            text-sm
                            text-gray-500
                        "
                                    >
                                        Protected User
                                    </div>


                                    :

                                    <button
                                        disabled={isPending}
                                        onClick={() =>
                                            setSelectedUser({
                                                id: user.id,
                                                status: user.status,
                                            })
                                        }
                                        className={`
                            w-full
                            rounded-lg
                            py-2
                            text-white

                            ${user.status === "ACTIVE"
                                                ?
                                                "bg-red-500 hover:bg-red-600"
                                                :
                                                "bg-green-600 hover:bg-green-700"
                                            }
                        `}
                                    >

                                        {
                                            user.status === "ACTIVE"
                                                ?
                                                "Block User"
                                                :
                                                "Activate User"
                                        }

                                    </button>

                            }


                        </div>


                    </div>

                ))}



                {!users.length && (

                    <div
                        className="
                rounded-xl
                border
                bg-white
                p-8
                text-center
                text-gray-500
            "
                    >
                        No users found.
                    </div>

                )}

            </div>




            {/* Alert Dialog */}

            <AlertDialog
                open={!!selectedUser}
                onOpenChange={() => setSelectedUser(null)}
            >

                <AlertDialogContent>


                    <AlertDialogHeader>

                        <AlertDialogTitle>
                            Are you sure?
                        </AlertDialogTitle>


                        <AlertDialogDescription>

                            {
                                selectedUser?.status === "ACTIVE"

                                    ?

                                    "This user will be blocked and cannot access the system."

                                    :

                                    "This user will be activated again."
                            }

                        </AlertDialogDescription>

                    </AlertDialogHeader>




                    <AlertDialogFooter>


                        <AlertDialogCancel>
                            Cancel
                        </AlertDialogCancel>



                        <AlertDialogAction
                            disabled={isPending}
                            onClick={handleStatusChange}
                            className={
                                selectedUser?.status === "ACTIVE"
                                    ?
                                    "bg-red-500 hover:bg-red-600"
                                    :
                                    ""
                            }
                        >

                            {
                                isPending

                                    ?

                                    "Updating..."

                                    :

                                    selectedUser?.status === "ACTIVE"

                                        ?

                                        "Block User"

                                        :

                                        "Activate User"
                            }

                        </AlertDialogAction>


                    </AlertDialogFooter>


                </AlertDialogContent>


            </AlertDialog>


        </div>

    );
}