"use client";

import { useQuery } from "@tanstack/react-query";
import Container from "../layout/Container";
import { getFeaturedGear } from "@/services/gear/gear.api";

export default function FeaturedGear() {
    const { data: gears, isLoading } = useQuery({
        queryKey: ["featured-gear"],
        queryFn: getFeaturedGear,
    });
    console.log(gears);
    if (isLoading) {
        return (
            <section className="py-20">
                <Container>
                    <h2 className="text-4xl font-bold text-center">
                        Featured Gear
                    </h2>

                    <p className="text-center mt-4 text-gray-500">
                        Loading...
                    </p>
                </Container>
            </section>
        );
    }

    return (
        <section className="py-20">
            <Container>
                <div className="text-center">
                    <h2 className="text-4xl font-bold">
                        Featured Gear
                    </h2>

                    <p className="mt-4 text-gray-600">
                        Browse our most popular rental equipment.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {gears?.map((gear: any) => (
                        <div
                            key={gear.id}
                            className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg"
                        >
                            <img
                                src={gear.image}
                                alt={gear.title}
                                className="h-56 w-full object-cover"
                            />

                            <div className="p-5">
                                <span className="rounded bg-blue-100 px-3 py-1 text-xs text-blue-600">
                                    {gear.category?.name}
                                </span>

                                <h3 className="mt-3 text-xl font-semibold">
                                    {gear.title}
                                </h3>

                                <p className="mt-2 text-gray-500">
                                    Brand: {gear.brand}
                                </p>

                                <div className="mt-4 flex items-center justify-between">
                                    <p className="text-lg font-bold text-blue-600">
                                        ৳{gear.pricePerDay}/day
                                    </p>

                                    <span
                                        className={`rounded px-3 py-1 text-sm ${gear.availability
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {gear.availability ? "Available" : "Unavailable"}
                                    </span>
                                </div>

                                <button className="mt-5 w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}