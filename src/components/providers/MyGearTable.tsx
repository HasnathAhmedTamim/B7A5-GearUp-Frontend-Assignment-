"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import {
    deleteGear,
    getMyGear,
} from "@/services/gear/gear.api";

import { IGear } from "@/types/gear";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { getErrorMessage } from "@/utils/getErrorMessage";



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





    const {
        mutate: removeGear,
        isPending,
    } = useMutation({

        mutationFn: deleteGear,


        onSuccess: (res) => {

            toast.success(
                res.message
            );


            queryClient.invalidateQueries({
                queryKey: ["my-gear"]
            });

        },


        onError: (error) => {

            toast.error(
                getErrorMessage(error)
            );

        }

    });






    if (isLoading) {

        return (
            <div className="
                rounded-xl
                border
                bg-white
                p-8
                text-center
            ">
                Loading gears...
            </div>
        );

    }




    if (isError) {

        return (
            <div className="
                rounded-xl
                border
                bg-white
                p-8
                text-center
                text-red-500
            ">
                Failed to load gears.
            </div>
        );

    }





    if (!gears.length) {

        return (

            <div className="
                rounded-xl
                border
                bg-white
                p-10
                text-center
            ">

                <h2 className="text-2xl font-semibold">
                    No Gear Found
                </h2>


                <p className="mt-2 text-gray-500">
                    Add your first gear to get started.
                </p>

            </div>

        );

    }





    return (

        <div className="space-y-5">





            {/* Desktop Table */}


            <div
                className="
                    hidden
                    overflow-hidden
                    rounded-xl
                    border
                    bg-white
                    shadow
                    xl:block
                "
            >


                <table className="w-full">


                    <thead className="bg-gray-100">


                        <tr>


                            <th className="px-5 py-4 text-left">
                                Image
                            </th>


                            <th className="px-5 py-4 text-left">
                                Title
                            </th>


                            <th className="px-5 py-4 text-left">
                                Brand
                            </th>


                            <th className="px-5 py-4 text-left">
                                Category
                            </th>


                            <th className="px-5 py-4 text-left">
                                Price
                            </th>


                            <th className="px-5 py-4 text-left">
                                Stock
                            </th>


                            <th className="px-5 py-4 text-left">
                                Status
                            </th>


                            <th className="px-5 py-4 text-center">
                                Actions
                            </th>


                        </tr>


                    </thead>





                    <tbody>


                        {
                            gears.map((gear: IGear) => (


                                <tr
                                    key={gear.id}
                                    className="
                                    border-t
                                    hover:bg-gray-50
                                "
                                >


                                    <td className="px-5 py-4">

                                        <img
                                            src={gear.image}
                                            alt={gear.title}
                                            className="
                                            h-14
                                            w-14
                                            rounded-lg
                                            border
                                            object-cover
                                        "
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

                                        <StatusBadge
                                            available={
                                                gear.availability
                                            }
                                        />

                                    </td>



                                    <td className="px-5 py-4">

                                        <Actions
                                            gear={gear}
                                            removeGear={removeGear}
                                            isPending={isPending}
                                        />

                                    </td>


                                </tr>


                            ))
                        }


                    </tbody>


                </table>


            </div>







            {/* Mobile + Tablet Card */}



            <div className="
                grid
                gap-4
                xl:hidden
            ">



                {
                    gears.map((gear: IGear) => (


                        <div
                            key={gear.id}
                            className="
                            rounded-xl
                            border
                            bg-white
                            p-5
                            shadow-sm
                        "
                        >



                            <div className="
                            flex
                            gap-4
                            border-b
                            pb-4
                        ">


                                <img
                                    src={gear.image}
                                    alt={gear.title}
                                    className="
                                    h-20
                                    w-20
                                    rounded-xl
                                    object-cover
                                "
                                />


                                <div className="min-w-0">

                                    <h3 className="truncate text-lg font-semibold">
                                        {gear.title}
                                    </h3>


                                    <p className="text-sm text-gray-500">
                                        {gear.category?.name}
                                    </p>


                                </div>


                            </div>





                            <div className="
                            mt-4
                            space-y-3
                            text-sm
                        ">


                                <Info
                                    label="Brand"
                                    value={gear.brand}
                                />


                                <Info
                                    label="Price / Day"
                                    value={`৳ ${gear.pricePerDay}`}
                                />


                                <Info
                                    label="Stock"
                                    value={gear.stock}
                                />



                                <div className="flex justify-between">

                                    <span className="text-gray-500">
                                        Status
                                    </span>


                                    <StatusBadge
                                        available={
                                            gear.availability
                                        }
                                    />

                                </div>


                            </div>





                            <div className="mt-5">

                                <Actions
                                    gear={gear}
                                    removeGear={removeGear}
                                    isPending={isPending}
                                />

                            </div>



                        </div>


                    ))
                }



            </div>


        </div>

    );

}







function Info({
    label,
    value,
}: {
    label: string;
    value: any;
}) {

    return (

        <div className="flex justify-between">

            <span className="text-gray-500">
                {label}
            </span>


            <span className="font-medium">
                {value}
            </span>

        </div>

    );

}







function StatusBadge({
    available,
}: {
    available: boolean;
}) {


    return (

        <span
            className={`
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold

                ${available
                    ?
                    "bg-green-100 text-green-700"
                    :
                    "bg-red-100 text-red-700"
                }
            `}
        >

            {
                available
                    ?
                    "Available"
                    :
                    "Unavailable"
            }

        </span>

    );

}







function Actions({
    gear,
    removeGear,
    isPending,
}: any) {


    return (

        <div className="
            flex
            justify-end
            gap-2
        ">


            <Link
                href={`/dashboard/provider/my-gear/edit/${gear.id}`}
                className="
                    rounded-lg
                    bg-blue-500
                    p-2
                    text-white
                    hover:bg-blue-600
                "
            >
                <Pencil size={18} />
            </Link>




            <AlertDialog>

                <AlertDialogTrigger asChild>

                    <button
                        className="
                            rounded-lg
                            bg-red-500
                            p-2
                            text-white
                            hover:bg-red-600
                        "
                    >

                        <Trash2 size={18} />

                    </button>

                </AlertDialogTrigger>




                <AlertDialogContent>

                    <AlertDialogHeader>

                        <AlertDialogTitle>
                            Delete Gear?
                        </AlertDialogTitle>


                        <AlertDialogDescription>

                            This action cannot be undone.
                            This gear will be permanently removed.

                        </AlertDialogDescription>


                    </AlertDialogHeader>




                    <AlertDialogFooter>

                        <AlertDialogCancel>
                            Cancel
                        </AlertDialogCancel>



                        <AlertDialogAction
                            disabled={isPending}
                            onClick={() => removeGear(gear.id)}
                        >

                            {
                                isPending
                                    ?
                                    "Deleting..."
                                    :
                                    "Delete"
                            }

                        </AlertDialogAction>


                    </AlertDialogFooter>


                </AlertDialogContent>


            </AlertDialog>



        </div>

    );

}