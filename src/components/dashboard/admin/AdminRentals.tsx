"use client";

import { useQuery } from "@tanstack/react-query";

import { getAllRentals } from "@/services/admin/admin.api";
import TableSkeleton from "@/components/shared/TableSkeleton";


const statusStyles: Record<string, string> = {
    PLACED: "bg-yellow-100 text-yellow-700",
    CONFIRMED: "bg-blue-100 text-blue-700",
    PICKED_UP: "bg-purple-100 text-purple-700",
    PAID: "bg-green-100 text-green-700",
    RETURNED: "bg-gray-100 text-gray-700",
    CANCELLED: "bg-red-100 text-red-700",
};



export default function AdminRentals() {


    const {
        data: rentals = [],
        isLoading,
    } = useQuery({
        queryKey: ["admin-rentals"],
        queryFn: getAllRentals,
    });



    if (isLoading) {

        return (
            <TableSkeleton
                rows={8}
                columns={6}
            />
        );

    }



    return (

        <div className="space-y-6">


            {/* Header */}

            <div>

                <h1 className="text-2xl font-bold sm:text-3xl">
                    Rental Management
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Manage all rental orders.
                </p>

            </div>



            {/* Desktop Only Table */}

            <div className="
                hidden
                rounded-xl
                border
                bg-white
                shadow-sm
                xl:block
                overflow-hidden
            ">

                <table className="w-full">


                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">
                                Customer
                            </th>

                            <th className="p-4 text-left">
                                Gear
                            </th>

                            <th className="p-4 text-left">
                                Provider
                            </th>

                            <th className="p-4 text-center">
                                Qty
                            </th>

                            <th className="p-4 text-left">
                                Start
                            </th>

                            <th className="p-4 text-left">
                                End
                            </th>

                            <th className="p-4 text-right">
                                Total
                            </th>

                            <th className="p-4 text-center">
                                Status
                            </th>

                        </tr>

                    </thead>



                    <tbody>


                        {rentals.map((item: any) => (

                            <tr
                                key={item.id}
                                className="border-t hover:bg-gray-50"
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
                                    {new Date(
                                        item.startDate
                                    ).toLocaleDateString()}
                                </td>


                                <td className="p-4">
                                    {new Date(
                                        item.endDate
                                    ).toLocaleDateString()}
                                </td>


                                <td className="p-4 text-right font-semibold">
                                    ৳
                                    {Number(
                                        item.totalAmount
                                    ).toLocaleString()}
                                </td>


                                <td className="p-4 text-center">

                                    <span
                                        className={`
                                            rounded-full
                                            px-3
                                            py-1
                                            text-xs
                                            font-semibold
                                            ${statusStyles[item.status] ??
                                            "bg-gray-100 text-gray-700"}
                                        `}
                                    >
                                        {item.status.replace("_", " ")}
                                    </span>

                                </td>


                            </tr>

                        ))}


                    </tbody>


                </table>


            </div>





            {/* Tablet + Mobile Card */}

            <div className="grid gap-4 xl:hidden">


                {rentals.map((item: any) => (


                    <div
                        key={item.id}
                        className="
                            rounded-xl
                            border
                            bg-white
                            p-4
                            shadow-sm
                        "
                    >


                        <div className="flex justify-between gap-4 border-b pb-3">

                            <span className="text-sm text-gray-500">
                                Customer
                            </span>

                            <span className="font-semibold text-right">
                                {item.customer?.name ?? "N/A"}
                            </span>

                        </div>



                        <div className="mt-3 flex justify-between gap-4 border-b pb-3">

                            <span className="text-sm text-gray-500">
                                Gear
                            </span>

                            <span className="
                                max-w-[60%]
                                truncate
                                text-right
                                font-medium
                            ">
                                {item.gear?.title ?? "N/A"}
                            </span>

                        </div>



                        <div className="mt-3 flex justify-between gap-4 border-b pb-3">

                            <span className="text-sm text-gray-500">
                                Provider
                            </span>

                            <span className="text-right">
                                {item.gear?.provider?.name ?? "N/A"}
                            </span>

                        </div>



                        <div className="mt-3 flex justify-between border-b pb-3">

                            <span className="text-sm text-gray-500">
                                Quantity
                            </span>

                            <span>
                                {item.quantity}
                            </span>

                        </div>



                        <div className="mt-3 flex justify-between border-b pb-3">

                            <span className="text-sm text-gray-500">
                                Total
                            </span>

                            <span className="font-bold text-green-600">
                                ৳{Number(
                                    item.totalAmount
                                ).toLocaleString()}
                            </span>

                        </div>



                        <div className="mt-3 flex justify-between">

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
                                    ${statusStyles[item.status] ??
                                    "bg-gray-100 text-gray-700"}
                                `}
                            >
                                {item.status.replace("_", " ")}
                            </span>


                        </div>


                    </div>


                ))}



                {!rentals.length && (

                    <div className="
                        rounded-xl
                        border
                        bg-white
                        p-8
                        text-center
                        text-gray-500
                    ">
                        No rentals found.
                    </div>

                )}


            </div>



        </div>

    );
}