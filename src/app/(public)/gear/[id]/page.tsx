"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ShieldCheck, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import RentalForm from "@/components/forms/RentalForm";
import GearReviews from "@/components/gear/GearReviews";
import { QueryErrorState } from "@/components/shared/QueryState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getSingleGear } from "@/services/gear/gear.api";
import { IGear } from "@/types/gear";

export default function GearDetailsPage() {
    const params = useParams();
    const gearId = params.id as string;

    const {
        data: gear,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery<IGear>({
        queryKey: ["gear", gearId],
        queryFn: () => getSingleGear(gearId),
        enabled: !!gearId,
    });

    if (isLoading) {
        return (
            <>
                <Navbar />
                <main className="py-8 sm:py-12">
                    <Container>
                        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                            <div className="space-y-4">
                                <Skeleton className="h-[280px] w-full rounded-2xl sm:h-[420px]" />
                                <div className="grid gap-3 sm:grid-cols-3">
                                    <Skeleton className="h-20 rounded-2xl" />
                                    <Skeleton className="h-20 rounded-2xl" />
                                    <Skeleton className="h-20 rounded-2xl" />
                                </div>
                            </div>
                            <Skeleton className="h-[420px] rounded-2xl" />
                        </div>
                    </Container>
                </main>
                <Footer />
            </>
        );
    }

    if (isError) {
        return (
            <>
                <Navbar />
                <main className="py-10 sm:py-16">
                    <Container>
                        <QueryErrorState
                            title="Unable to load gear"
                            description={(error as Error)?.message || "Something went wrong while loading this item."}
                            onRetry={() => refetch()}
                        />
                        <div className="mt-4 text-center">
                            <Button asChild variant="link">
                                <Link href="/gear">Back to browse gear</Link>
                            </Button>
                        </div>
                    </Container>
                </main>
                <Footer />
            </>
        );
    }

    if (!gear) {
        return (
            <>
                <Navbar />
                <main className="py-10 sm:py-16">
                    <Container>
                        <QueryErrorState
                            title="Gear not found"
                            description="This item no longer exists or is unavailable."
                        />
                        <div className="mt-4 text-center">
                            <Button asChild variant="outline" className="h-11">
                                <Link href="/gear">Browse available gear</Link>
                            </Button>
                        </div>
                    </Container>
                </main>
                <Footer />
            </>
        );
    }

    const available = Boolean(gear.availability && gear.stock > 0);
    const reviews = gear.reviews ?? [];
    const averageRating =
        reviews.length > 0
            ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
            : null;

    return (
        <>
            <Navbar />

            <main className="py-8 sm:py-10 lg:py-14">
                <Container>
                    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
                        <Link
                            href="/gear"
                            className="inline-flex min-h-11 items-center gap-2 rounded-md hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                            Browse gear
                        </Link>
                    </nav>

                    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
                        <div className="space-y-5">
                            <div className="overflow-hidden rounded-2xl border bg-card">
                                <Image
                                    src={gear.image}
                                    alt={`${gear.title} rental photo`}
                                    width={900}
                                    height={640}
                                    priority
                                    className="aspect-[4/3] h-auto w-full object-cover sm:aspect-[16/10]"
                                />
                            </div>

                            <div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <Badge variant="secondary">{gear.category.name}</Badge>
                                    <Badge
                                        variant={available ? "secondary" : "destructive"}
                                        className={available ? "bg-emerald-50 text-emerald-800" : undefined}
                                    >
                                        {available ? "Available to rent" : "Currently unavailable"}
                                    </Badge>
                                </div>

                                <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                                    {gear.title}
                                </h1>

                                {averageRating ? (
                                    <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
                                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                                        {averageRating} from {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
                                    </p>
                                ) : (
                                    <p className="mt-3 text-sm text-muted-foreground">No reviews yet</p>
                                )}

                                <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">{gear.description}</p>
                            </div>

                            <dl className="grid gap-3 sm:grid-cols-3">
                                <InfoTile label="Brand" value={gear.brand} />
                                <InfoTile label="Daily rate" value={`৳ ${gear.pricePerDay}`} />
                                <InfoTile label="Stock" value={`${gear.stock} units`} />
                            </dl>

                            {gear.provider?.name && (
                                <div className="flex items-center justify-between gap-4 rounded-2xl border bg-card px-4 py-3">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Provider</p>
                                        <p className="mt-1 font-medium text-foreground">{gear.provider.name}</p>
                                    </div>
                                    <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                                        <ShieldCheck className="h-4 w-4 text-emerald-700" aria-hidden="true" />
                                        Listed provider
                                    </p>
                                </div>
                            )}
                        </div>

                        <div id="rent" className="lg:sticky lg:top-24">
                            <RentalForm
                                gearId={gear.id}
                                pricePerDay={Number(gear.pricePerDay)}
                                stock={gear.stock}
                                available={available}
                            />
                        </div>
                    </div>

                    <div className="mt-12 lg:mt-16">
                        <GearReviews gearId={gear.id} />
                    </div>
                </Container>
            </main>

            <Footer />
        </>
    );
}

function InfoTile({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-2xl border bg-card p-4">
            <dt className="text-xs uppercase tracking-[0.08em] text-muted-foreground">{label}</dt>
            <dd className="mt-2 font-semibold text-foreground">{value}</dd>
        </div>
    );
}
