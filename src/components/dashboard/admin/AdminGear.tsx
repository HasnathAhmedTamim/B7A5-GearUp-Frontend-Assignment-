"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import { getAllGear } from "@/services/admin/admin.api";

export default function AdminGear() {
    const { data: gear = [], isLoading } = useQuery({
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

    console.log("All Gear:", gear);

    return (
        <div>
            <h1 className="mb-6 text-3xl font-bold">
                Gear Management
            </h1>

            <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-left">Image</th>
                            <th className="p-4 text-left">Title</th>
                            <th className="p-4 text-left">Category</th>
                            <th className="p-4 text-left">Provider</th>
                            <th className="p-4 text-left">Price</th>
                            <th className="p-4 text-left">Stock</th>
                        </tr>
                    </thead>

                    <tbody>
                        {gear.map((item: any) => {
                            console.log(
                                "Gear:",
                                item.title,
                                "Image URL:",
                                item.image
                            );

                            return (
                                <tr key={item.id} className="border-t">
                                    <td className="p-4">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            width={60}
                                            height={60}
                                            className="rounded-lg object-cover"
                                        />
                                    </td>

                                    <td className="p-4 font-medium">
                                        {item.title}
                                    </td>

                                    <td className="p-4">
                                        {item.category?.name}
                                    </td>

                                    <td className="p-4">
                                        {item.provider?.name}
                                    </td>

                                    <td className="p-4">
                                        ৳{item.price}
                                    </td>

                                    <td className="p-4">
                                        {item.stock}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}