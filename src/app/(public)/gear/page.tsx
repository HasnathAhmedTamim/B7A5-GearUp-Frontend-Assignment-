"use client";

import { useQuery } from "@tanstack/react-query";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";

import { getAllGear } from "@/services/gear/gear.api";
import { Gear } from "@/types/gear";

export default function GearPage() {
    const {
        data: gears = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["all-gear"],
        queryFn: getAllGear,
    });

    if (isLoading) {
        return (
            <>
                <Navbar />
                <Container>
                    <div className="py-20 text-center">Loading...</div>
                </Container>
                <Footer />
            </>
        );
    }

    if (isError) {
        return (
            <>
                <Navbar />
                <Container>
                    <div className="py-20 text-center">
                        Failed to load gear.
                    </div>
                </Container>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <Container>
                <section className="py-16">
                    <h1 className="mb-10 text-center text-4xl font-bold">
                        All Sports Gear
                    </h1>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {gears.map((gear: Gear) => (
                            <div
                                key={gear.id}
                                className="overflow-hidden rounded-xl border bg-white shadow"
                            >
                                <img
                                    src={gear.image}
                                    alt={gear.title}
                                    className="h-56 w-full object-cover"
                                />

                                <div className="space-y-2 p-5">
                                    <h2 className="text-xl font-semibold">
                                        {gear.title}
                                    </h2>

                                    <p className="text-gray-500">
                                        {gear.brand}
                                    </p>

                                    <p className="text-sm text-blue-600">
                                        {gear.category.name}
                                    </p>

                                    <p className="font-semibold">
                                        ${gear.pricePerDay}/day
                                    </p>

                                    <p
                                        className={
                                            gear.availability
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }
                                    >
                                        {gear.availability
                                            ? "Available"
                                            : "Unavailable"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </Container>

            <Footer />
        </>
    );
}