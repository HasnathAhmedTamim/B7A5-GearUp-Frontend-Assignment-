"use client";

import { useEffect, useMemo, useState } from "react";
import { PackageSearch, Search, SlidersHorizontal, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import GearCard from "@/components/gear/GearCard";
import EmptyState from "@/components/shared/EmptyState";
import GearCardSkeleton from "@/components/shared/GearCardSkeleton";
import { QueryErrorState } from "@/components/shared/QueryState";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/Motion";

import { useCategories } from "@/hooks/category/useCategories";
import { getAllGear } from "@/services/gear/gear.api";
import { ICategory } from "@/types/category";
import { IGear } from "@/types/gear";

export default function GearPage() {
    const [searchInput, setSearchInput] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [categoryId, setCategoryId] = useState("");

    const { data: categories = [] as ICategory[] } = useCategories();

    useEffect(() => {
        const timeout = window.setTimeout(() => {
            setDebouncedSearch(searchInput.trim());
        }, 300);

        return () => window.clearTimeout(timeout);
    }, [searchInput]);

    const filters = useMemo(
        () => ({
            searchTerm: debouncedSearch || undefined,
            categoryId: categoryId || undefined,
            limit: 12,
        }),
        [debouncedSearch, categoryId],
    );

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["all-gear", filters.searchTerm, filters.categoryId],
        queryFn: () => getAllGear(filters),
    });

    const gears: IGear[] = data?.data ?? [];
    const totalResults = data?.meta?.total ?? gears.length;
    const hasFilters = Boolean(searchInput || categoryId);

    const clearFilters = () => {
        setSearchInput("");
        setDebouncedSearch("");
        setCategoryId("");
    };

    return (
        <>
            <Navbar />

            <main className="py-8 sm:py-10 lg:py-14">
                <Container>
                    <FadeIn className="mb-6 max-w-3xl sm:mb-8">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                            Browse gear
                        </p>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Find outdoor gear you can rent today
                        </h1>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                            Search by name, filter by category, then open an item to choose dates and request a rental.
                        </p>
                    </FadeIn>

                    <div className="mb-6 rounded-2xl border bg-card p-4 sm:mb-8 sm:p-5">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <div className="relative w-full sm:flex-1">
                                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="gear-search"
                                    value={searchInput}
                                    onChange={(event) => setSearchInput(event.target.value)}
                                    placeholder="Search tents, bikes, cameras..."
                                    className="h-11 rounded-xl pl-9"
                                    aria-label="Search gear"
                                />
                            </div>

                            <div className="flex items-center justify-between gap-2 sm:justify-end">
                                <Badge variant="outline" className="h-8 gap-1.5 px-3 text-muted-foreground">
                                    <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
                                    {isLoading ? "Searching" : `${totalResults} results`}
                                </Badge>

                                {hasFilters && (
                                    <Button type="button" variant="ghost" onClick={clearFilters} className="h-11 gap-1.5">
                                        <X className="h-4 w-4" />
                                        Clear filters
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div className="-mx-1 mt-4 overflow-x-auto pb-1">
                            <div className="flex min-w-max gap-2 px-1 sm:min-w-0 sm:flex-wrap">
                                <Button
                                    type="button"
                                    variant={categoryId ? "outline" : "secondary"}
                                    size="sm"
                                    className="h-9 rounded-full px-3"
                                    aria-pressed={!categoryId}
                                    onClick={() => setCategoryId("")}
                                >
                                    All gear
                                </Button>

                                {categories.map((category) => (
                                    <Button
                                        key={category.id}
                                        type="button"
                                        variant={categoryId === category.id ? "default" : "outline"}
                                        size="sm"
                                        className="h-9 rounded-full px-3"
                                        aria-pressed={categoryId === category.id}
                                        onClick={() => setCategoryId(category.id)}
                                    >
                                        {category.name}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {isLoading && (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <GearCardSkeleton key={index} />
                            ))}
                        </div>
                    )}

                    {!isLoading && isError && (
                        <QueryErrorState
                            title="Failed to load gear"
                            description={(error as Error)?.message || "Something went wrong while loading the rental catalog."}
                            onRetry={() => refetch()}
                        />
                    )}

                    {!isLoading && !isError && gears.length === 0 && (
                        <EmptyState
                            icon={PackageSearch}
                            title={hasFilters ? "No gear matches your search" : "No gear listed yet"}
                            description={
                                hasFilters
                                    ? "Try a different keyword or clear the filters to browse the full catalog."
                                    : "Check back soon for sports and outdoor equipment."
                            }
                            action={
                                hasFilters ? (
                                    <Button type="button" variant="outline" className="h-11" onClick={clearFilters}>
                                        Show all gear
                                    </Button>
                                ) : undefined
                            }
                        />
                    )}

                    {!isLoading && !isError && gears.length > 0 && (
                        <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
                            {gears.map((gear) => (
                                <StaggerItem key={gear.id}>
                                    <GearCard gear={gear} />
                                </StaggerItem>
                            ))}
                        </Stagger>
                    )}
                </Container>
            </main>

            <Footer />
        </>
    );
}
