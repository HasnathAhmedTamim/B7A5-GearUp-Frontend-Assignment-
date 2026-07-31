"use client";

import { useQuery } from "@tanstack/react-query";

import Container from "../layout/Container";
import GearCard from "../gear/GearCard";
import GearCardSkeleton from "../shared/GearCardSkeleton";

import { getFeaturedGear } from "@/services/gear/gear.api";
import { Gear } from "@/types/gear";

export default function FeaturedGear() {
    const {
        data: gears = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["featured-gear"],
        queryFn: getFeaturedGear,
    });

    if (isLoading) {
        return (
            <section className="py-14 sm:py-16 lg:py-20">
                <Container>
                    <div className="text-center">
                        <h2 className="text-3xl font-bold sm:text-4xl">
                            Featured Gear
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-600 sm:text-base">
                            Browse our most popular rental equipment.
                        </p>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <GearCardSkeleton key={index} />
                        ))}
                    </div>
                </Container>
            </section>
        );
    }

    if (isError) {
        return (
            <section className="py-14 sm:py-16 lg:py-20">
                <Container>
                    <div className="text-center">
                        <h2 className="text-3xl font-bold sm:text-4xl">
                            Featured Gear
                        </h2>

                        <p className="mt-4 text-red-500">
                            {(error as Error).message ||
                                "Failed to load featured gear."}
                        </p>
                    </div>
                </Container>
            </section>
        );
    }

    return (
        <section className="py-14 sm:py-16 lg:py-20">
            <Container>
                <div className="text-center">
                    <h2 className="text-3xl font-bold sm:text-4xl">
                        Featured Gear
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-600 sm:text-base">
                        Browse our most popular rental equipment.
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {gears.map((gear: Gear) => (
                        <GearCard
                            key={gear.id}
                            gear={gear}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
}