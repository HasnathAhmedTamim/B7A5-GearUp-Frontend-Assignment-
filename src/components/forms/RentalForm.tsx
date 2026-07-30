"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInCalendarDays } from "date-fns";
import { toast } from "sonner";

import { createRental } from "@/services/rental/rental.api";
import {
    rentalSchema,
    RentalFormData,
} from "@/validation/rental.validation";

interface RentalFormProps {
    gearId: string;
    pricePerDay: number;
    stock: number;
}

export default function RentalForm({
    gearId,
    pricePerDay,
    stock,
}: RentalFormProps) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RentalFormData>({
        resolver: zodResolver(rentalSchema),
        defaultValues: {
            gearId,
            quantity: 1,
            startDate: "",
            endDate: "",
        },
    });

    const startDate = watch("startDate");
    const endDate = watch("endDate");
    const quantity = watch("quantity");

    const totalDays = useMemo(() => {
        if (!startDate || !endDate) return 0;

        const days = differenceInCalendarDays(
            new Date(endDate),
            new Date(startDate)
        );

        return days > 0 ? days : 0;
    }, [startDate, endDate]);

    const totalPrice = totalDays * pricePerDay * quantity;

    const { mutate, isPending } = useMutation({
        mutationFn: createRental,

        onSuccess: (res) => {
            toast.success(res.message);

            router.push("/dashboard/customer/rentals");
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ||
                "Rental failed."
            );
        },
    });

    const onSubmit = (data: RentalFormData) => {
        mutate(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 rounded-xl border p-6"
        >
            <h2 className="mb-6 text-2xl font-bold">
                Rent This Gear
            </h2>

            <input
                type="hidden"
                {...register("gearId")}
            />

            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <label>Start Date</label>

                    <input
                        type="date"
                        {...register("startDate")}
                        className="mt-2 w-full rounded border p-3"
                    />

                    <p className="text-sm text-red-500">
                        {errors.startDate?.message}
                    </p>
                </div>

                <div>
                    <label>End Date</label>

                    <input
                        type="date"
                        {...register("endDate")}
                        className="mt-2 w-full rounded border p-3"
                    />

                    <p className="text-sm text-red-500">
                        {errors.endDate?.message}
                    </p>
                </div>
            </div>

            <div className="mt-5">
                <label>Quantity</label>

                <input
                    type="number"
                    min={1}
                    max={stock}
                    {...register("quantity", {
                        valueAsNumber: true,
                    })}
                    className="mt-2 w-full rounded border p-3"
                />

                <p className="text-sm text-red-500">
                    {errors.quantity?.message}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                    Available Stock: {stock}
                </p>
            </div>

            <div className="mt-8 rounded-lg bg-gray-100 p-5">
                <div className="flex justify-between">
                    <span>Total Days</span>

                    <span>{totalDays}</span>
                </div>

                <div className="mt-3 flex justify-between font-bold">
                    <span>Total Price</span>

                    <span>৳ {totalPrice}</span>
                </div>
            </div>

            <button
                disabled={isPending}
                className="mt-8 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white"
            >
                {isPending ? "Processing..." : "Rent Now"}
            </button>
        </form>
    );
}