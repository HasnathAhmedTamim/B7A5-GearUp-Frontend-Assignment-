"use client";

import { useId } from "react";
import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInCalendarDays } from "date-fns";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createRental } from "@/services/rental/rental.api";

import {
    rentalSchema,
    RentalFormData,
} from "@/validation/rental.validation";

import { getErrorMessage } from "@/utils/getErrorMessage";

interface RentalFormProps {
    gearId: string;
    pricePerDay: number;
    stock: number;
    available?: boolean;
}

export default function RentalForm({
    gearId,
    pricePerDay,
    stock,
    available = true,
}: RentalFormProps) {
    const router = useRouter();
    const formId = useId();
    const today = new Date().toISOString().split("T")[0];
    const canRent = available && stock > 0;

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<z.input<typeof rentalSchema>, unknown, RentalFormData>({
        resolver: zodResolver(rentalSchema),
        defaultValues: {
            gearId,
            quantity: 1,
            startDate: "",
            endDate: "",
        },
    });

    const startDate = useWatch({ control, name: "startDate" });
    const endDate = useWatch({ control, name: "endDate" });
    const quantity = useWatch({ control, name: "quantity" });

    const totalDays = startDate && endDate
        ? Math.max(differenceInCalendarDays(new Date(endDate), new Date(startDate)), 0)
        : 0;

    const totalPrice = totalDays * pricePerDay * Number(quantity || 0);

    const { mutate, isPending } = useMutation({
        mutationFn: createRental,
        onSuccess: (res) => {
            toast.success(res.message || "Rental request submitted.");
            router.push("/dashboard/customer/rentals");
        },
        onError: (error) => {
            toast.error(getErrorMessage(error));
        },
    });

    const onSubmit = (data: RentalFormData) => {
        mutate(data);
    };

    const isSubmitDisabled = isPending || !canRent || !startDate || !endDate || totalDays <= 0;

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl border bg-card p-4 shadow-sm sm:p-6"
            noValidate
        >
            <div className="mb-5 border-b pb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Request this rental
                </p>
                <h2 className="mt-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                    Choose rental dates
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Submit a request first. After the provider confirms, you can pay from My Rentals.
                </p>
            </div>

            <input type="hidden" {...register("gearId")} />

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                <div>
                    <label htmlFor={`${formId}-start`} className="mb-2 block text-sm font-medium text-foreground">
                        Start date
                    </label>
                    <Input
                        id={`${formId}-start`}
                        type="date"
                        min={today}
                        disabled={!canRent}
                        className="h-11"
                        aria-invalid={!!errors.startDate}
                        aria-describedby={errors.startDate ? `${formId}-start-error` : undefined}
                        {...register("startDate")}
                    />
                    {errors.startDate && (
                        <p id={`${formId}-start-error`} className="mt-1 text-sm text-destructive">
                            {errors.startDate.message}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor={`${formId}-end`} className="mb-2 block text-sm font-medium text-foreground">
                        End date
                    </label>
                    <Input
                        id={`${formId}-end`}
                        type="date"
                        min={startDate || today}
                        disabled={!canRent}
                        className="h-11"
                        aria-invalid={!!errors.endDate}
                        aria-describedby={errors.endDate ? `${formId}-end-error` : undefined}
                        {...register("endDate")}
                    />
                    {errors.endDate && (
                        <p id={`${formId}-end-error`} className="mt-1 text-sm text-destructive">
                            {errors.endDate.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="mt-4">
                <label htmlFor={`${formId}-qty`} className="mb-2 block text-sm font-medium text-foreground">
                    Quantity
                </label>
                <Input
                    id={`${formId}-qty`}
                    type="number"
                    min={1}
                    max={stock}
                    disabled={!canRent}
                    className="h-11"
                    aria-invalid={!!errors.quantity}
                    aria-describedby={`${formId}-qty-help${errors.quantity ? ` ${formId}-qty-error` : ""}`}
                    {...register("quantity", { valueAsNumber: true })}
                />
                {errors.quantity && (
                    <p id={`${formId}-qty-error`} className="mt-1 text-sm text-destructive">
                        {errors.quantity.message}
                    </p>
                )}
                <p id={`${formId}-qty-help`} className="mt-2 text-sm text-muted-foreground">
                    {canRent ? `${stock} units available` : "This item is currently unavailable."}
                </p>
            </div>

            <div className="mt-6 rounded-2xl bg-muted/50 p-4" aria-live="polite">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Total days</span>
                    <span className="font-medium text-foreground">{totalDays || 0}</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-base font-semibold text-foreground">
                    <span>Estimated total</span>
                    <span>৳ {totalPrice || 0}</span>
                </div>
            </div>

            <Button
                type="submit"
                disabled={isSubmitDisabled}
                aria-busy={isPending}
                className="mt-6 h-11 w-full text-base font-semibold"
            >
                {isPending ? "Submitting request..." : canRent ? "Request rental" : "Unavailable"}
            </Button>
        </form>
    );
}
