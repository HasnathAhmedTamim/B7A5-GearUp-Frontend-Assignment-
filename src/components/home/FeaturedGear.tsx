"use client";

import { useQuery } from "@tanstack/react-query";

import Container from "../layout/Container";
import GearCard from "../gear/GearCard";

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
            <section className="py-20">
                <Container>
                    <div className="text-center">
                        <h2 className="text-4xl font-bold">
                            Featured Gear
                        </h2>

                        <p className="mt-4 text-gray-500">
                            Loading...
                        </p>
                    </div>
                </Container>
            </section>
        );
    }

    if (isError) {
        return (
            <section className="py-20">
                <Container>
                    <div className="text-center">
                        <h2 className="text-4xl font-bold">
                            Featured Gear
                        </h2>

                        <p className="mt-4 text-red-500">
                            {(error as Error).message || "Failed to load featured gear."}
                        </p>
                    </div>
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