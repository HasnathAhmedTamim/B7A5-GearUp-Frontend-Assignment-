"use client";

import { useQuery } from "@tanstack/react-query";

import GearCard from "@/components/gear/GearCard";
import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

import { getAllGear } from "@/services/gear/gear.api";
import { Gear } from "@/types/gear";

export default function GearPage() {
    const {
        data: gears = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["all-gear"],
        queryFn: getAllGear,
    });

    if (isLoading) {
        return (
            <>
                <Navbar />

                <Container>
                    <div className="flex min-h-[60vh] items-center justify-center">
                        <p className="text-lg font-medium">Loading gear...</p>
                    </div>
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
                    <div className="flex min-h-[60vh] items-center justify-center">
                        <p className="text-red-500">
                            {(error as Error).message || "Failed to load gear."}
                        </p>
                    </div>
                </Container>

                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="py-16">
                <Container>
                    <div className="mb-10 text-center">
                        <h1 className="text-4xl font-bold">All Sports Gear</h1>

                        <p className="mt-3 text-gray-500">
                            Browse all available sports equipment for rent.
                        </p>
                    </div>

                    {gears.length === 0 ? (
                        <div className="py-20 text-center">
                            <h2 className="text-2xl font-semibold">
                                No Gear Found
                            </h2>
                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {gears.map((gear: Gear) => (
                                <GearCard
                                    key={gear.id}
                                    gear={gear}
                                />
                            ))}
                        </div>
                    )}
                </Container>
            </main>

            <Footer />
        </>
    );
}