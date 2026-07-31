"use client";

import { useState } from "react";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

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


import {
    getAllUsers,
    updateUserStatus,
} from "@/services/admin/admin.api";


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
                queryKey: ["admin-users"],
            });


            setSelectedUser(null);

        },



        onError: (error: any) => {

            toast.error(
                error?.response?.data?.message ||
                "Failed to update user."
            );

        },

    });




    const handleStatusChange = () => {

        if (!selectedUser) return;


        mutate({

            id: selectedUser.id,

            status:
                selectedUser.status === "ACTIVE"
                    ? "SUSPENDED"
                    : "ACTIVE",

        });

    };




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

                        {
                            users.map((user: any) => (

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


                                        {
                                            user.role === "ADMIN"

                                                ?

                                                <span className="text-gray-400">
                                                    Protected
                                                </span>


                                                :

                                                <button

                                                    disabled={isPending}

                                                    onClick={() => setSelectedUser({
                                                        id: user.id,
                                                        status: user.status,
                                                    })}

                                                    className={`rounded-lg px-4 py-2 text-white ${user.status === "ACTIVE"
                                                            ? "bg-red-500 hover:bg-red-600"
                                                            : "bg-green-600 hover:bg-green-700"
                                                        }`}
                                                >

                                                    {
                                                        user.status === "ACTIVE"
                                                            ? "Block"
                                                            : "Activate"
                                                    }

                                                </button>
                                        }


                                    </td>


                                </tr>

                            ))
                        }


                    </tbody>


                </table>

            </div>




            <AlertDialog
                open={!!selectedUser}
                onOpenChange={() => {
                    setSelectedUser(null);
                }}
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
                                    ? "bg-red-500 hover:bg-red-600"
                                    : ""
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