"use client";

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Star, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
    reviewSchema,
    ReviewFormData,
} from "@/validation/review.validation";

import { createReview } from "@/services/review/review.api";
import { getErrorMessage } from "@/utils/getErrorMessage";

interface ReviewModalProps {
    open: boolean;
    onClose: () => void;
    gearId: string;
}

export default function ReviewModal({
    open,
    onClose,
    gearId,
}: ReviewModalProps) {
    const queryClient = useQueryClient();

    const [rating, setRating] = useState(0);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm<ReviewFormData>({
       resolver: zodResolver(reviewSchema) as any,
        defaultValues: {
            gearId,
            rating: 0,
            comment: "",
        },
    });

    useEffect(() => {
        setValue("gearId", gearId);
    }, [gearId, setValue]);

    const { mutate, isPending } = useMutation({
        mutationFn: createReview,

        onSuccess: () => {
            toast.success("Review submitted successfully.");

            queryClient.invalidateQueries({
                queryKey: ["my-rentals"],
            });

            queryClient.invalidateQueries({
                queryKey: ["gear-reviews", gearId],
            });

            reset({
                gearId,
                rating: 0,
                comment: "",
            });

            setRating(0);

            onClose();
        },

        onError: (error) => {
            toast.error(getErrorMessage(error));
        },
    });

    if (!open) return null;

    const onSubmit = (data: ReviewFormData) => {
        mutate(data);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-lg rounded-xl bg-white shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Header */}
                    <div className="flex items-center justify-between border-b p-5">
                        <h2 className="text-xl font-semibold">
                            Leave a Review
                        </h2>

                        <button
                            type="button"
                            onClick={onClose}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="space-y-6 p-5">
                        <input
                            type="hidden"
                            {...register("gearId")}
                        />

                        {/* Rating */}
                        <div>
                            <label className="mb-3 block text-sm font-medium">
                                Rating
                            </label>

                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => {
                                            setRating(star);

                                            setValue("rating", star, {
                                                shouldValidate: true,
                                            });
                                        }}
                                    >
                                        <Star
                                            size={32}
                                            className={
                                                star <= rating
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-gray-300"
                                            }
                                        />
                                    </button>
                                ))}
                            </div>

                            <p className="mt-2 text-sm text-red-500">
                                {errors.rating?.message}
                            </p>
                        </div>

                        {/* Comment */}
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Comment
                            </label>

                            <Textarea
                                rows={5}
                                placeholder="Write your experience..."
                                {...register("comment")}
                            />

                            <p className="mt-2 text-sm text-red-500">
                                {errors.comment?.message}
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 border-t p-5">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending
                                ? "Submitting..."
                                : "Submit Review"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}