"use client";

import { useQuery } from "@tanstack/react-query";

import GearCard from "@/components/gear/GearCard";
import GearCardSkeleton from "@/components/shared/GearCardSkeleton";
import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

import { getAllGear } from "@/services/gear/gear.api";
import { IGear } from "@/types/gear";

export default function GearPage() {
    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["all-gear"],
        queryFn: getAllGear,
    });

    const gears: IGear[] = data?.data ?? [];

    return (
        <>
            <Navbar />

            <main className="py-12 sm:py-14 lg:py-16">
                <Container>
                    {/* Heading */}

                    <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
                        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                            All Sports Gear
                        </h1>

                        <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                            Browse all available sports and outdoor equipment
                            for rent.
                        </p>
                    </div>

                    {/* Loading */}

                    {isLoading && (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <GearCardSkeleton key={index} />
                            ))}
                        </div>
                    )}

                    {/* Error */}

                    {!isLoading && isError && (
                        <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-red-200 bg-red-50">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-red-600">
                                    Failed to Load Gear
                                </h2>

                                <p className="mt-2 text-gray-600">
                                    {(error as Error)?.message ||
                                        "Something went wrong."}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Empty */}

                    {!isLoading && !isError && gears.length === 0 && (
                        <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-dashed">
                            <div className="text-center">
                                <h2 className="text-2xl font-semibold">
                                    No Gear Found
                                </h2>

                                <p className="mt-2 text-gray-500">
                                    Please check back later.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Gear Grid */}

                    {!isLoading && !isError && gears.length > 0 && (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {gears.map((gear) => (
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