"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import Container from "../layout/Container";
import GearCard from "../gear/GearCard";
import GearCardSkeleton from "../shared/GearCardSkeleton";
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/Motion";
import { QueryErrorState } from "@/components/shared/QueryState";
import { Button } from "@/components/ui/button";
import { getFeaturedGear } from "@/services/gear/gear.api";
import { IGear } from "@/types/gear";

export default function FeaturedGear() {
    const {
        data: gears = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery<IGear[]>({
        queryKey: ["featured-gear"],
        queryFn: getFeaturedGear,
    });

    return (
        <section className="bg-muted/40 py-16 sm:py-20">
            <Container>
                <FadeIn className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Popular now</p>
                        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Featured gear</h2>
                        <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
                            A snapshot of equipment customers rent most.
                        </p>
                    </div>
                    <Button asChild variant="outline">
                        <Link href="/gear">View catalog</Link>
                    </Button>
                </FadeIn>

                {isLoading && (
                    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <GearCardSkeleton key={index} />
                        ))}
                    </div>
                )}

                {isError && (
                    <div className="mt-10">
                        <QueryErrorState
                            title="Could not load featured gear"
                            description={(error as Error)?.message || "Please try again."}
                            onRetry={() => refetch()}
                        />
                    </div>
                )}

                {!isLoading && !isError && (
                    <Stagger className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {gears.map((gear) => (
                            <StaggerItem key={gear.id}>
                                <GearCard gear={gear} />
                            </StaggerItem>
                        ))}
                    </Stagger>
                )}
            </Container>
        </section>
    );
}
