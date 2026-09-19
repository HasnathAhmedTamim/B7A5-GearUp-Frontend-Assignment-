"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { MessageSquare, Star } from "lucide-react";

import EmptyState from "@/components/shared/EmptyState";
import { QueryErrorState } from "@/components/shared/QueryState";
import { Skeleton } from "@/components/ui/skeleton";
import { getGearReviews } from "@/services/review/review.api";
import { IReview } from "@/types/review";

interface Props {
    gearId: string;
}

export default function GearReviews({ gearId }: Props) {
    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["gear-reviews", gearId],
        queryFn: () => getGearReviews(gearId),
    });

    const reviews: IReview[] = data?.data ?? [];

    if (isLoading) {
        return (
            <section aria-labelledby="reviews-heading">
                <h2 id="reviews-heading" className="text-2xl font-bold tracking-tight text-foreground">
                    Customer reviews
                </h2>
                <div className="mt-5 space-y-4">
                    <Skeleton className="h-16 w-48" />
                    <Skeleton className="h-32 w-full rounded-2xl" />
                    <Skeleton className="h-32 w-full rounded-2xl" />
                </div>
            </section>
        );
    }

    if (isError) {
        return (
            <section aria-labelledby="reviews-heading">
                <h2 id="reviews-heading" className="mb-4 text-2xl font-bold tracking-tight text-foreground">
                    Customer reviews
                </h2>
                <QueryErrorState
                    title="Unable to load reviews"
                    description={(error as Error)?.message || "Something went wrong while loading reviews."}
                    onRetry={() => refetch()}
                />
            </section>
        );
    }

    const average =
        reviews.length > 0
            ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
            : "0.0";

    return (
        <section aria-labelledby="reviews-heading">
            <h2 id="reviews-heading" className="text-2xl font-bold tracking-tight text-foreground">
                Customer reviews
            </h2>

            <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="text-3xl font-bold text-foreground">{average}</span>
                <div className="flex" aria-label={`${average} out of 5 stars`}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            className={
                                star <= Math.round(Number(average))
                                    ? "h-5 w-5 fill-amber-400 text-amber-400"
                                    : "h-5 w-5 text-muted-foreground/40"
                            }
                            aria-hidden="true"
                        />
                    ))}
                </div>
                <span className="text-sm text-muted-foreground">
                    {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
                </span>
            </div>

            {reviews.length === 0 && (
                <div className="mt-6">
                    <EmptyState
                        icon={MessageSquare}
                        title="No reviews yet"
                        description="Rent this gear and leave the first review after you return it."
                    />
                </div>
            )}

            <div className="mt-6 space-y-4">
                {reviews.map((review) => {
                    const avatar =
                        !review.customer.profile?.photo ||
                        review.customer.profile.photo.includes("/example/")
                            ? `https://ui-avatars.com/api/?background=0f172a&color=fff&size=200&name=${encodeURIComponent(
                                  review.customer.name,
                              )}`
                            : review.customer.profile.photo;

                    return (
                        <article key={review.id} className="rounded-2xl border bg-card p-4 sm:p-5">
                            <div className="flex items-center gap-3">
                                <Image
                                    src={avatar}
                                    alt={`${review.customer.name} profile photo`}
                                    width={44}
                                    height={44}
                                    className="h-11 w-11 rounded-full object-cover"
                                />
                                <div className="min-w-0 flex-1">
                                    <h3 className="truncate font-semibold text-foreground">{review.customer.name}</h3>
                                    <div className="mt-1 flex" aria-label={`${review.rating} out of 5 stars`}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={
                                                    star <= review.rating
                                                        ? "h-4 w-4 fill-amber-400 text-amber-400"
                                                        : "h-4 w-4 text-muted-foreground/40"
                                                }
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <p className="mt-4 leading-7 text-muted-foreground">{review.comment}</p>
                            <p className="mt-3 text-sm text-muted-foreground">
                                {new Date(review.createdAt).toLocaleDateString()}
                            </p>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
