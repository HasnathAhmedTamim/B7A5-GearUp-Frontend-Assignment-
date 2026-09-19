"use client";

import { useEffect, useRef } from "react";

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
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<ReviewFormData>({
        resolver: zodResolver(reviewSchema) as never,
        defaultValues: {
            gearId,
            rating: 0,
            comment: "",
        },
    });

    const rating = watch("rating");

    useEffect(() => {
        setValue("gearId", gearId);
    }, [gearId, setValue]);

    useEffect(() => {
        if (!open) return;

        closeButtonRef.current?.focus();

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [open, onClose]);

    const { mutate, isPending } = useMutation({
        mutationFn: createReview,
        onSuccess: () => {
            toast.success("Review submitted successfully.");
            queryClient.invalidateQueries({ queryKey: ["my-rentals"] });
            queryClient.invalidateQueries({ queryKey: ["gear-reviews", gearId] });
            reset({
                gearId,
                rating: 0,
                comment: "",
            });
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
                role="dialog"
                aria-modal="true"
                aria-labelledby="review-dialog-title"
                className="w-full max-w-lg rounded-2xl border bg-card shadow-lg"
                onClick={(event) => event.stopPropagation()}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex items-center justify-between border-b px-5 py-4">
                        <h2 id="review-dialog-title" className="text-lg font-semibold text-foreground">
                            Leave a review
                        </h2>
                        <Button
                            ref={closeButtonRef}
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            aria-label="Close review dialog"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    <div className="space-y-6 p-5">
                        <input type="hidden" {...register("gearId")} />

                        <div>
                            <p id="rating-label" className="mb-3 block text-sm font-medium text-foreground">
                                Rating
                            </p>
                            <div className="flex gap-2" role="group" aria-labelledby="rating-label">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        aria-label={`${star} star${star === 1 ? "" : "s"}`}
                                        aria-pressed={star === rating}
                                        className="rounded-md p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        onClick={() => {
                                            setValue("rating", star, {
                                                shouldValidate: true,
                                            });
                                        }}
                                    >
                                        <Star
                                            className={
                                                star <= rating
                                                    ? "h-8 w-8 fill-amber-400 text-amber-400"
                                                    : "h-8 w-8 text-muted-foreground/40"
                                            }
                                            aria-hidden="true"
                                        />
                                    </button>
                                ))}
                            </div>
                            {errors.rating && (
                                <p className="mt-2 text-sm text-destructive">{errors.rating.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="review-comment" className="mb-2 block text-sm font-medium text-foreground">
                                Comment
                            </label>
                            <Textarea
                                id="review-comment"
                                rows={5}
                                placeholder="Share how the gear performed."
                                aria-invalid={!!errors.comment}
                                {...register("comment")}
                            />
                            {errors.comment && (
                                <p className="mt-2 text-sm text-destructive">{errors.comment.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t p-5 sm:flex-row sm:justify-end">
                        <Button type="button" variant="outline" className="h-11" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending} aria-busy={isPending} className="h-11">
                            {isPending ? "Submitting..." : "Submit review"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
