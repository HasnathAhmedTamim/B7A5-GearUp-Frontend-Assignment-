"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import { getAllGear } from "@/services/admin/admin.api";


export default function AdminGear() {


    const {
        data: gear = [],
        isLoading,
    } = useQuery({

        queryKey: ["admin-gear"],

        queryFn: getAllGear,

    });



    if (isLoading) {

        return (
            <div className="py-10 text-center">
                Loading gear...
            </div>
        );

    }



    return (

        <div className="space-y-6">


            {/* Header */}

            <div>

                <h1 className="text-2xl font-bold sm:text-3xl">
                    Gear Management
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Manage all rental gears.
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
                    xl:block
                "
            >


                <table className="w-full">


                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">
                                Image
                            </th>


                            <th className="p-4 text-left">
                                Title
                            </th>


                            <th className="p-4 text-left">
                                Category
                            </th>


                            <th className="p-4 text-left">
                                Provider
                            </th>


                            <th className="p-4 text-left">
                                Price
                            </th>


                            <th className="p-4 text-left">
                                Stock
                            </th>


                        </tr>

                    </thead>



                    <tbody>


                        {gear.map((item: any) => (


                            <tr
                                key={item.id}
                                className="
                                    border-t
                                    hover:bg-gray-50
                                "
                            >


                                <td className="p-4">


                                    <Image

                                        src={item.image}

                                        alt={item.title}

                                        width={60}

                                        height={60}

                                        className="
                                            h-14
                                            w-14
                                            rounded-lg
                                            object-cover
                                        "

                                    />


                                </td>



                                <td className="p-4 font-medium">

                                    {item.title}

                                </td>



                                <td className="p-4">

                                    {item.category?.name ?? "N/A"}

                                </td>



                                <td className="p-4">

                                    {item.provider?.name ?? "N/A"}

                                </td>



                                <td className="p-4 font-semibold text-green-600">

                                    ৳
                                    {item.pricePerDay}

                                </td>



                                <td className="p-4">

                                    {item.stock}

                                </td>


                            </tr>


                        ))}


                    </tbody>


                </table>


            </div>





            {/* Tablet + Mobile Card */}

            <div
                className="
                    grid
                    gap-4
                    xl:hidden
                "
            >


                {gear.map((item: any) => (


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


                        <div className="flex gap-4">


                            <Image

                                src={item.image}

                                alt={item.title}

                                width={90}

                                height={90}

                                className="
                                    h-20
                                    w-20
                                    rounded-xl
                                    object-cover
                                "

                            />


                            <div className="min-w-0">


                                <h3 className="truncate text-lg font-semibold">

                                    {item.title}

                                </h3>


                                <p className="text-sm text-gray-500">

                                    {item.category?.name ?? "N/A"}

                                </p>


                            </div>


                        </div>




                        <div className="mt-5 space-y-3 text-sm">


                            <div className="flex justify-between">

                                <span className="text-gray-500">
                                    Provider
                                </span>

                                <span className="font-medium">
                                    {item.provider?.name ?? "N/A"}
                                </span>

                            </div>



                            <div className="flex justify-between">

                                <span className="text-gray-500">
                                    Price / Day
                                </span>

                                <span className="font-semibold text-green-600">
                                    ৳{item.pricePerDay}
                                </span>

                            </div>



                            <div className="flex justify-between">

                                <span className="text-gray-500">
                                    Stock
                                </span>

                                <span>
                                    {item.stock}
                                </span>

                            </div>


                        </div>



                    </div>


                ))}



                {!gear.length && (

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
                        No gear found.
                    </div>

                )}


            </div>



        </div>

    );
}