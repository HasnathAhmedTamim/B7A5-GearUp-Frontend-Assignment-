"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";

import { getGearReviews } from "@/services/review/review.api";

interface Props {
    gearId: string;
}

export default function GearReviews({
    gearId,
}: Props) {
    const {
        data,
        isLoading,
    } = useQuery({
        queryKey: ["gear-reviews", gearId],
        queryFn: () => getGearReviews(gearId),
    });

    const reviews = data?.data ?? [];

    if (isLoading) {
        return (
            <div className="mt-16 rounded-xl border bg-white p-6 text-center">
                Loading reviews...
            </div>
        );
    }

    const average =
        reviews.length > 0
            ? (
                reviews.reduce(
                    (sum: number, review: any) => sum + review.rating,
                    0
                ) / reviews.length
            ).toFixed(1)
            : "0.0";

    return (
        <section className="mt-16">

            <h2 className="text-2xl font-bold">
                Customer Reviews
            </h2>

            {/* Rating Summary */}

            <div className="mt-4 flex flex-wrap items-center gap-3">

                <span className="text-4xl font-bold">
                    {average}
                </span>

                <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            size={20}
                            className={
                                star <= Math.round(Number(average))
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                            }
                        />
                    ))}
                </div>

                <span className="text-gray-500">
                    ({reviews.length} Reviews)
                </span>

            </div>

            {/* Empty State */}

            {reviews.length === 0 && (
                <div className="mt-6 rounded-xl border bg-gray-50 p-6 text-center text-gray-500">
                    No reviews yet.
                </div>
            )}

            {/* Reviews */}

            <div className="mt-8 space-y-5">

                {reviews.map((review: any) => {

                    const avatar =
                        !review.customer.profile?.photo ||
                            review.customer.profile.photo.includes("/example/")
                            ? `https://ui-avatars.com/api/?background=2563eb&color=fff&size=200&name=${encodeURIComponent(
                                review.customer.name
                            )}`
                            : review.customer.profile.photo;

                    return (

                        <div
                            key={review.id}
                            className="rounded-xl border bg-white p-5 shadow-sm"
                        >

                            <div className="flex items-center gap-4">

                                <Image
                                    src={avatar}
                                    alt={review.customer.name}
                                    width={50}
                                    height={50}
                                    className="rounded-full object-cover"
                                />

                                <div className="flex-1">

                                    <h4 className="font-semibold">
                                        {review.customer.name}
                                    </h4>

                                    <div className="mt-1 flex">

                                        {[1, 2, 3, 4, 5].map((star) => (

                                            <Star
                                                key={star}
                                                size={16}
                                                className={
                                                    star <= review.rating
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-gray-300"
                                                }
                                            />

                                        ))}

                                    </div>

                                </div>

                            </div>

                            <p className="mt-4 leading-7 text-gray-600">
                                {review.comment}
                            </p>

                            <p className="mt-3 text-sm text-gray-400">
                                {new Date(
                                    review.createdAt
                                ).toLocaleDateString()}
                            </p>

                        </div>

                    );

                })}

            </div>

        </section>
    );
}