"use client";

import { getProviderDashboard } from "@/services/dashboard/dashboard.api";
import { useQuery } from "@tanstack/react-query";
import {
    Package,
    Clock,
    ShoppingBag,
    Wallet,
} from "lucide-react";



export default function ProviderDashboard() {

    const {
        data,
        isLoading,
    } = useQuery({
        queryKey: ["provider-dashboard"],
        queryFn: getProviderDashboard,
    });


    if (isLoading) {
        return (
            <div className="flex h-80 items-center justify-center">
                Loading dashboard...
            </div>
        );
    }


    const cards = [
        {
            title: "Total Gear",
            value: data?.totalGear ?? 0,
            icon: <Package size={24} />,
        },

        {
            title: "Pending Orders",
            value: data?.pendingOrders ?? 0,
            icon: <Clock size={24} />,
        },

        {
            title: "Active Rentals",
            value: data?.activeRentals ?? 0,
            icon: <ShoppingBag size={24} />,
        },

        {
            title: "Total Earnings",
            value: `৳ ${data?.totalEarnings ?? 0}`,
            icon: <Wallet size={24} />,
        },
    ];


    return (
        <div className="space-y-8">

            <div>
                <h1 className="text-3xl font-bold">
                    Provider Dashboard
                </h1>

                <p className="mt-2 text-gray-500">
                    Manage your gears and rental activities.
                </p>
            </div>


            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {cards.map((card) => (

                    <div
                        key={card.title}
                        className="rounded-xl border bg-white p-6 shadow-sm"
                    >

                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                            {card.icon}
                        </div>


                        <p className="text-sm text-gray-500">
                            {card.title}
                        </p>


                        <h2 className="mt-2 text-3xl font-bold">
                            {card.value}
                        </h2>

                    </div>

                ))}

            </div>

        </div>
    );
}